import { Sparkles } from "lucide-react";

export default function NewTemplateBanner() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-3 text-sm font-medium">
        <Sparkles className="h-4 w-4 animate-pulse" />
        <p>
          <span className="hidden sm:inline">Aggiorniamo costantemente la nostra libreria: </span>
          Nuovi design premium disponibili ogni settimana!
        </p>
      </div>
    </div>
  );
}