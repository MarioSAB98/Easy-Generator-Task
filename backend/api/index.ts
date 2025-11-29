import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { rateLimit } from 'express-rate-limit';
import cookieParser from 'cookie-parser';

import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const expressApp = express();
let cachedApp;

async function createApp() {
    if (cachedApp) {
        return cachedApp;
    }

    const nestApp = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressApp),
        {
            logger: WinstonModule.createLogger({
                transports: [new winston.transports.Console()],
            }),
        },
    );

    // Trust proxy - required for Vercel
    expressApp.set('trust proxy', 1);

    nestApp.use(cookieParser());

    if (!process.env.FRONTEND_URL) {
        console.warn('WARNING: FRONTEND_URL is not set. CORS will block requests.');
    }

    // CORS configuration
    nestApp.enableCors({
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    });

    // Rate limiting configured for serverless/proxy environment
    nestApp.use(
        rateLimit({
            windowMs: 60 * 1000,
            max: 100,
            standardHeaders: true,
            legacyHeaders: false,
            // Use X-Forwarded-For header from Vercel proxy
            keyGenerator: (req) => {
                return req.headers['x-forwarded-for'] as string || req.ip || 'unknown';
            },
        }),
    );

    nestApp.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    const config = new DocumentBuilder()
        .setTitle('Auth API')
        .setVersion('1.0')
        .addCookieAuth('jwt')
        .build();
    const document = SwaggerModule.createDocument(nestApp, config);
    SwaggerModule.setup('api', nestApp, document);

    await nestApp.init();
    cachedApp = nestApp;
    return nestApp;
}

export default async (req, res) => {
    await createApp();
    expressApp(req, res);
};
