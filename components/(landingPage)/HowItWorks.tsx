import { UserPlus, FormInput, Share2 } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Registrati gratis",
    description: "Crea il tuo account gratuito. I tuoi progressi vengono salvati automaticamente, così puoi aggiornare il tuo CV in qualsiasi momento e da qualsiasi dispositivo.",
    icon: UserPlus,
  },
  {
    id: 2,
    title: "Compila il form",
    description: "Inserisci le tue esperienze. Nessun layout da sistemare, vedi l'anteprima del CV aggiornarsi in tempo reale.",
    icon: FormInput,
  },
  {
    id: 3,
    title: "Esporta o Condividi in Sicurezza",
    description: "Scarica un PDF impeccabile. Vuoi condividerlo online? Genera un link pubblico e usa la Privacy Mode per nascondere i tuoi dati sensibili su internet.",
    icon: Share2,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            Crea, Personalizza, Candidati. In 3 semplici passaggi.
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
            Dimentica Word o Canva. Pensa solo ai contenuti, al design ci pensa Greatsume.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative">
          {/* Linea di connessione (visibile solo su desktop) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-200 dark:bg-slate-800" />

          {steps.map((step) => (
            <div key={step.id} className="relative flex flex-col items-center text-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white dark:bg-slate-800 shadow-xl z-10 border-4 border-slate-50 dark:border-slate-900">
                <step.icon className="h-10 w-10 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                {step.id}. {step.title}
              </h3>
              <p className="mt-3 text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}