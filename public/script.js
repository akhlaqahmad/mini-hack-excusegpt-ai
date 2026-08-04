        import React, { useState, useEffect, useRef } from 'react';
        import { createRoot } from 'react-dom/client';
        import { motion, AnimatePresence } from 'framer-motion';
        import { 
            Zap, 
            Shield, 
            MessageCircle,
            RefreshCw, 
            Download, 
            Copy,
            Check,
            Share2,
            Sparkles,
            Mail,
            ChevronRight,
            Heart,
            Star
        } from 'lucide-react';

        // --- Components ---
        const Navbar = ({ onOpenPricing }) => (
            <div className="sticky top-0 z-50">
                <nav className="bg-white border-b-[2.5px] border-[#1B1430] shadow-[0_4px_0_#1B1430]">
                    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="flex items-center gap-3 flex-shrink-0">
                            <div className="w-10 h-10 eg-sticker bg-[#FF4FB0] flex items-center justify-center">
                                <Zap size={20} className="text-white fill-current" />
                            </div>
                            <span className="display text-xl tracking-tighter uppercase italic leading-none">EXCUSE<span className="text-[#FF4FB0]">GPT</span></span>
                        </div>
                        <div className="flex items-center gap-6 text-[10px] mono font-black text-[#756C8C]">
                            <button onClick={onOpenPricing} className="hover:text-[#1B1430] transition-colors uppercase tracking-widest">Pricing</button>
                            <button className="eg-chip px-6 py-2 text-[10px] uppercase">Login</button>
                        </div>
                    </div>
                </nav>
                <div className="eg-ticker">
                    <div className="flex whitespace-nowrap animate-marquee">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="flex items-center px-4">
                                <span className="text-[10px] font-black mono uppercase tracking-[0.2em] text-white">CLOUDFLARE MINI HACKATHON KL 2026</span>
                                <div className="star4 bg-white scale-50 mx-6"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );

        const ExcuseCard = ({ excuse, index, mode, onShare }) => {
            const [copied, setCopied] = useState(false);
            
            const handleCopy = () => {
                navigator.clipboard.writeText(typeof excuse === 'string' ? excuse : excuse.text || '');
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            };

            const content = typeof excuse === 'string' ? excuse : excuse.text;
            const subtext = typeof excuse === 'object' ? excuse.subtext : null;
            const type = typeof excuse === 'object' ? excuse.type : 'Social';

            return (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, type: 'spring', stiffness: 200 }}
                    className="eg-sticker p-6 group transition-all bg-white"
                >
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3">
                                <div className={`px-2 py-0.5 rounded-full border-2 border-[#1B1430] text-[9px] font-black mono uppercase ${
                                    index === 0 ? 'bg-[#FF4FB0] text-white' : 'bg-[#F4E6D2] text-[#1B1430]'
                                }`}>
                                    {index === 0 ? 'Your Pick' : `Route #${index + 1}`}
                                </div>
                                <div className="text-[9px] font-black mono text-[#756C8C] uppercase tracking-wider">
                                     {type}
                                </div>
                            </div>
                            <p className="text-xl leading-tight font-bold text-[#1B1430]">
                                "{content}"
                            </p>
                            {subtext && (
                                <div className="mt-4 p-3 bg-[#FBF6EF] rounded-xl border-2 border-[#1B1430] border-dashed text-[11px] text-[#756C8C] italic flex items-start gap-2 leading-relaxed">
                                    <Sparkles size={12} className="mt-0.5 flex-shrink-0 text-[#FF4FB0]" />
                                    <span>{subtext}</span>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-3">
                            <button onClick={handleCopy} className="w-10 h-10 eg-sticker flex items-center justify-center bg-white hover:bg-[#F4E6D2] transition-colors">
                                {copied ? <Check size={16} className="text-[#B6F23D]" /> : <Copy size={16} />}
                            </button>
                            <button onClick={() => onShare(excuse)} className="w-10 h-10 eg-sticker flex items-center justify-center bg-white hover:bg-[#F4E6D2] transition-colors">
                                <Share2 size={16} />
                            </button>
                        </div>
                    </div>
                </motion.div>
            );
        };

        const ShareModal = ({ excuse, onClose }) => {
            return (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#1B1430]/80 backdrop-blur-sm">
                    <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="max-w-sm w-full">
                        <div className="aspect-square w-full p-8 eg-sticker bg-[#3D6BFF] relative overflow-hidden flex flex-col justify-between" style={{ borderRadius: '40px' }}>
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                            <div className="relative z-10">
                                <div className="flex items-center gap-2 mb-8">
                                    <div className="w-8 h-8 eg-sticker bg-white text-[#3D6BFF] flex items-center justify-center font-black text-sm">E</div>
                                    <span className="display text-white text-sm tracking-tighter uppercase italic">EXCUSEGPT.IO</span>
                                </div>
                                <h2 className="text-2xl font-black text-white leading-tight display uppercase italic">
                                    "{typeof excuse === 'string' ? excuse : excuse.text}"
                                </h2>
                            </div>
                            <div className="relative z-10 flex justify-between items-end">
                                <div className="mono text-[9px] text-white/80 leading-relaxed font-bold">
                                    BYPASS ENABLED <br/>
                                    STATUS: VERIFIED
                                </div>
                                <div className="w-12 h-12 eg-sticker bg-white/20 flex items-center justify-center">
                                    <Zap size={24} className="text-white fill-current" />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 flex gap-3">
                            <button onClick={onClose} className="flex-1 eg-glossy eg-fill-ink py-4 text-xs">Cancel</button>
                            <button className="flex-1 eg-glossy eg-fill-accent py-4 text-xs shadow-[4px_4px_0_#1B1430]">Download</button>
                        </div>
                    </motion.div>
                </div>
            );
        };

        const PricingSection = ({ onClose }) => (
            <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#FBF1E3] p-6 pt-20">
                <button onClick={onClose} className="fixed top-6 right-6 w-12 h-12 eg-sticker bg-white flex items-center justify-center"><Zap size={24}/></button>
                <div className="max-w-xl mx-auto">
                    <h2 className="text-5xl display uppercase italic tracking-tighter text-center mb-12 eg-chrome">Upgrade Gear</h2>
                    <div className="grid gap-8">
                        <div className="eg-sticker p-8 bg-white">
                            <h3 className="display text-2xl mb-2">Free Rider</h3>
                            <div className="text-4xl font-black mb-6">$0<span className="text-sm font-bold text-muted">/mo</span></div>
                            <ul className="space-y-4 mb-8">
                                {['5 Excuses / day', 'Standard Tones', 'Watermarked'].map(item => (
                                    <li key={item} className="flex items-center gap-2 text-sm font-bold"><Check size={16} className="text-[#B6F23D]"/> {item}</li>
                                ))}
                            </ul>
                            <button className="w-full eg-glossy eg-fill-ink opacity-50 cursor-default">Current Plan</button>
                        </div>
                        <div className="eg-sticker p-8 bg-white border-[#FF4FB0] border-[4px] relative">
                             <div className="absolute -top-4 right-8 bg-[#FF4FB0] text-white text-[10px] font-black px-4 py-1 eg-sticker rounded-full">POPULAR</div>
                            <h3 className="display text-2xl mb-2">Ghoster Pro</h3>
                            <div className="text-4xl font-black mb-6 text-[#FF4FB0]">$9.99<span className="text-sm font-bold text-muted">/mo</span></div>
                            <ul className="space-y-4 mb-8">
                                {['Unlimited Excuses', 'Chaos & Unhinged', 'HD Evidence', 'No Ads'].map(item => (
                                    <li key={item} className="flex items-center gap-2 text-sm font-bold"><Check size={16} className="text-[#FF4FB0]"/> {item}</li>
                                ))}
                            </ul>
                            <button className="w-full eg-glossy eg-fill-accent">Get Pro Access</button>
                        </div>
                    </div>
                </div>
            </div>
        );

        const App = () => {
            const [scenario, setScenario] = useState('');
            const [tone, setTone] = useState('Professional');
            const [loading, setLoading] = useState(false);
            const [results, setResults] = useState([]);
            const [mode, setMode] = useState('generator'); 
            const [selectedExcuse, setSelectedExcuse] = useState(null);
            const [showPricing, setShowPricing] = useState(false);
            const resultsRef = useRef(null);

            useEffect(() => {
                if (results.length > 0 && resultsRef.current) {
                    setTimeout(() => {
                        resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            }, [results]);

            const generateExcuse = async () => {
                if (!scenario) return;
                setLoading(true);
                try {
                    const response = await fetch('./api/generate', {
                        method: 'POST',
                        body: JSON.stringify({ scenario, tone, vibe: 50, mode }),
                        headers: { 'Content-Type': 'application/json' }
                    });
                    const data = await response.json();
                    setResults(data.excuses || []);
                } catch (err) {
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };

            return (
                <div className="min-h-screen pb-32">
                    <Navbar onOpenPricing={() => setShowPricing(true)} />
                    
                    <main className="max-w-xl mx-auto px-6 mt-12">
                        <header className="text-center mb-16">
                            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                                <h1 className="text-7xl mb-4 eg-chrome uppercase italic tracking-tighter">EXCUSEGPT</h1>
                                <p className="text-xs font-black text-[#756C8C] mono flex items-center justify-center gap-3">
                                    <span className="star4 bg-[#FF4FB0] scale-50"></span>
                                    AI-POWERED SOCIAL ENGINEERING
                                    <span className="star4 bg-[#3D6BFF] scale-50"></span>
                                </p>
                            </motion.div>
                        </header>

                        <div className="flex justify-center mb-10">
                            <div className="eg-sticker p-1.5 bg-white/50 backdrop-blur-md flex gap-1 rounded-full">
                                {[
                                    { id: 'generator', icon: Zap, label: 'Make' },
                                    { id: 'reply', icon: MessageCircle, label: 'Reply' },
                                    { id: 'evidence', icon: Shield, label: 'Proof' }
                                ].map((m) => (
                                    <button
                                        key={m.id}
                                        onClick={() => { setMode(m.id); setResults([]); }}
                                        className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all text-xs font-black mono uppercase tracking-widest ${
                                            mode === m.id ? 'bg-[#1B1430] text-white shadow-[2px_2px_0_#000]' : 'text-[#1B1430] hover:bg-black/5'
                                        }`}
                                    >
                                        <m.icon size={14} />
                                        <span>{m.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <motion.div layout className="eg-sticker p-8 mb-12 bg-white">
                            <div className="space-y-8">
                                <div>
                                    <label className="block text-[10px] font-black mono uppercase mb-3 text-[#756C8C]">001 // Input Scenario</label>
                                    <textarea 
                                        value={scenario}
                                        onChange={(e) => setScenario(e.target.value)}
                                        placeholder={mode === 'generator' ? "e.g. 9 AM Monday sync..." : "Paste message here..."}
                                        className="eg-input min-h-[140px] resize-none text-lg placeholder-[#756C8C]/30"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black mono uppercase mb-4 text-[#756C8C]">002 // Tone Module</label>
                                    <div className="flex flex-wrap gap-2">
                                        {['Professional', 'Casual', 'Dramatic', 'Chaos'].map((t) => (
                                            <button
                                                key={t}
                                                onClick={() => setTone(t)}
                                                className={`eg-chip ${tone === t ? 'is-on' : ''}`}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <button onClick={generateExcuse} disabled={loading || !scenario} className="w-full eg-glossy eg-fill-accent py-5">
                                    {loading ? <RefreshCw className="animate-spin" /> : <Zap size={22} className="fill-current" />}
                                    <span className="text-xl">INITIATE BYPASS</span>
                                </button>
                            </div>
                        </motion.div>

                        <AnimatePresence>
                            {results.length > 0 && (
                                <motion.div 
                                    ref={resultsRef}
                                    initial={{ opacity: 0, y: 20 }} 
                                    animate={{ opacity: 1, y: 0 }} 
                                    className="space-y-6 pt-10 scroll-mt-32"
                                >
                                    <h2 className="text-2xl display uppercase italic tracking-tighter text-[#1B1430] flex items-center gap-3">
                                        <div className="star4 bg-[#FF4FB0] scale-75"></div>
                                        Escape Routes
                                    </h2>
                                    <div className="grid gap-6">
                                        {results.map((excuse, i) => (
                                            <ExcuseCard key={i} excuse={excuse} index={i} mode={mode} onShare={setSelectedExcuse} />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <section className="mt-32 grid grid-cols-2 gap-4">
                             <div className="eg-sticker p-6 bg-white text-center">
                                <div className="text-2xl display text-[#3D6BFF]">1.2M+</div>
                                <div className="text-[9px] mono font-black text-muted uppercase">Generated</div>
                             </div>
                             <div className="eg-sticker p-6 bg-white text-center">
                                <div className="text-2xl display text-[#B6F23D]">99%</div>
                                <div className="text-[9px] mono font-black text-muted uppercase">Success</div>
                             </div>
                        </section>

                        <footer className="mt-32 pt-12 border-t-2 border-[#1B1430] text-center text-[#756C8C] text-[9px] mono">
                            <p>© 2026 EXCUSEGPT • SURVIVAL MODE: ON • CLOUDFLARE HACKATHON</p>
                        </footer>
                    </main>

                    {selectedExcuse && <ShareModal excuse={selectedExcuse} onClose={() => setSelectedExcuse(null)} />}
                    {showPricing && <PricingSection onClose={() => setShowPricing(false)} />}
                </div>
            );
        };

        const root = createRoot(document.getElementById('root'));
        root.render(<App />);
