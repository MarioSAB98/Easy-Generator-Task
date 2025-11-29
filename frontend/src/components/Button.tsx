interface Props {
  text: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

export default function Button({ text, onClick, type = "button" }: Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
    >
      {text}
    </button>
  );
}