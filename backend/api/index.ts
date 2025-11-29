import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
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

    expressApp.set('trust proxy', 1);

    nestApp.use(cookieParser());

    if (!process.env.FRONTEND_URL) {
        console.warn('WARNING: FRONTEND_URL is not set. CORS will block requests.');
    }

    nestApp.enableCors({
        origin: "*",
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        credentials: true,
    });

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
