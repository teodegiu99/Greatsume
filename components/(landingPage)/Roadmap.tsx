import { Bot, Eye, Paintbrush } from "lucide-react";

export default function Roadmap() {
    return (
        <section className="py-24 dark:bg-slate-950 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                
                    <h2 className="mt-2 text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
                        Il futuro della tua carriera inizia da qui.
                    </h2>
                    <p className="mt-4 text-lg text-slate-600 dark:text-slate-400 max-w-2xl">
                        Greatsume è in continua evoluzione per offrirti gli strumenti migliori.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="group relative p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-violet-50 dark:hover:bg-slate-800/80 transition-colors border border-slate-100 dark:border-slate-800">
                        <div className="mb-4 inline-flex p-3 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                            <Bot className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                            Generatore di Lettere di Presentazione con AI.
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Basta fogli bianchi. Genera in automatico lettere di
                            presentazione personalizzate, basate sui dati del
                            tuo CV e modellate sull'offerta di lavoro.
                        </p>
                        <div className="mt-6">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-200">
                                In sviluppo
                            </span>
                        </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="group relative p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-violet-50 dark:hover:bg-slate-800/80 transition-colors border border-slate-100 dark:border-slate-800">
                        <div className="mb-4 inline-flex p-3 rounded-lg bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400">
                            <Eye className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                            Analitiche avanzate per scoprire quando i recruiter aprono il tuo link.
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Hai inviato il link del tuo CV? Scopri esattamente
                            quando un recruiter lo apre e lo visualizza grazie
                            alla nostra dashboard di analytics integrata.
                        </p>
                        <div className="mt-6">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                                Prossimamente
                            </span>
                        </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="group relative p-8 rounded-2xl bg-slate-50 dark:bg-slate-900 hover:bg-violet-50 dark:hover:bg-slate-800/80 transition-colors border border-slate-100 dark:border-slate-800">
                        <div className="mb-4 inline-flex p-3 rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400">
                            <Paintbrush className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                            Builder avanzato con palette personalizzate.
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                            Nuovi font, palette di colori personalizzate e
                            componenti drag-and-drop per darti ancora più
                            controllo sul design finale del tuo curriculum.
                        </p>
                        <div className="mt-6">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-300">
                                Pianificato
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
