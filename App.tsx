
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Rocket,
  LayoutDashboard,
  Smartphone,
  Search,
  CheckCircle2,
  Zap,
  TrendingUp,
  Globe,
  Scale,
  MessageSquareQuote,
  Activity,
  Camera,
  Layers,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis
} from 'recharts';

// --- Components ---

const SlideWrapper: React.FC<{ children: React.ReactNode; active: boolean }> = ({ children, active }) => (
  <div className={`absolute inset-0 transition-all duration-700 ease-in-out transform ${active ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95 pointer-events-none'}`}>
    <div className="h-full w-full flex flex-col items-center justify-center p-8 md:p-16">
      {children}
    </div>
  </div>
);

const PricingTier: React.FC<{ units: string; price: string; active?: boolean }> = ({ units, price, active }) => (
  <div className={`p-6 rounded-xl border transition-all duration-300 flex justify-between items-center ${active ? 'bg-blue-600/20 border-blue-500 scale-105 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'bg-white/5 border-white/10 opacity-70'}`}>
    <div>
      <div className="text-xs uppercase font-bold text-gray-500 mb-1 tracking-widest">{units} boliger</div>
      <div className="text-sm font-medium text-gray-400 italic">Integreret i Dashboard</div>
    </div>
    <div className="text-right">
      <div className="text-3xl font-black">{price},-</div>
      <div className="text-[10px] uppercase font-bold text-gray-600">kr / måned</div>
    </div>
  </div>
);

const DenmarkMap: React.FC<{ step: number }> = ({ step }) => {
  const cities = [
    { id: 1, name: 'Aalborg', x: '42%', y: '18%', active: step >= 1 },
    { id: 2, name: 'Aarhus', x: '46%', y: '45%', active: step >= 2 },
    { id: 3, name: 'København', x: '88%', y: '58%', active: step >= 3 },
  ];

  return (
    <div className="relative w-full max-w-lg aspect-[1/1] mx-auto group">
      <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full group-hover:bg-blue-500/10 transition-colors duration-1000" />
      <svg viewBox="0 0 600 500" className="w-full h-full fill-white/5 stroke-white/20 stroke-[1.2] transition-all duration-500 drop-shadow-2xl">
        <path d="M187,485 L145,475 L110,450 L105,420 L115,380 L100,340 L110,310 L95,280 L110,240 L100,210 L115,180 L105,140 L120,110 L110,80 L130,50 L160,30 L200,35 L230,20 L270,30 L285,60 L260,90 L275,120 L250,150 L265,180 L255,210 L270,240 L260,270 L280,300 L265,330 L285,360 L270,390 L285,420 L260,450 L230,470 Z" />
        <path d="M130,50 L170,15 L220,10 L270,30 L250,55 L210,65 L170,55 L130,50" />
        <path d="M310,360 L350,345 L380,365 L375,410 L330,425 L300,400 Z" />
        <path d="M430,280 L480,270 L520,290 L550,330 L530,380 L510,430 L450,440 L410,410 L400,350 L415,310 Z" />
        <path d="M420,450 L480,445 L500,470 L460,485 L415,475 Z" />
        <path d="M510,445 L540,460 L525,490 L500,475 Z" />
      </svg>
      {cities.map((city) => (
        <div 
          key={city.id}
          className={`absolute transition-all duration-1000 transform -translate-x-1/2 -translate-y-1/2 ${city.active ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
          style={{ left: city.x, top: city.y }}
        >
          <div className="relative">
            <div className={`absolute -inset-6 rounded-full animate-ping opacity-10 ${city.id === 1 ? 'bg-blue-400' : city.id === 2 ? 'bg-blue-300' : 'bg-blue-600'}`} />
            <div className={`w-5 h-5 rounded-full border-2 border-white shadow-[0_0_15px_rgba(59,130,246,0.5)] ${city.id === 1 ? 'bg-blue-500' : city.id === 2 ? 'bg-blue-400' : city.id === 2 ? 'bg-blue-400' : city.id === 7 ? 'bg-blue-700' : 'bg-blue-700'}`} />
            <div className="absolute left-7 top-1/2 -translate-y-1/2">
              <span className="whitespace-nowrap font-black text-sm tracking-tighter bg-black/80 px-3 py-1.5 rounded-lg border border-white/20 backdrop-blur-xl shadow-2xl flex items-center gap-2">
                {city.name}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- App Main ---

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mapStep, setMapStep] = useState(0);

  const slidesCount = 12;

  const nextSlide = useCallback(() => setCurrentSlide(s => Math.min(s + 1, slidesCount - 1)), []);
  const prevSlide = useCallback(() => setCurrentSlide(s => Math.max(s - 1, 0)), []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  useEffect(() => {
    if (currentSlide === 5) { // Map Slide
        let step = 0;
        let timer = setInterval(() => {
            step++;
            setMapStep(step > 3 ? 1 : step);
        }, 2000);
        return () => clearInterval(timer);
    }
  }, [currentSlide]);

  const tractionData = [
    { name: 'Jan 25', pilot: 2 },
    { name: 'Mar 25', pilot: 5 },
    { name: 'Maj 25', pilot: 9 },
    { name: 'Jul 25', pilot: 14 },
    { name: 'Sep 25', pilot: 22 },
    { name: 'Dec 25', pilot: 35 },
  ];

  return (
    <div className="h-screen w-screen relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] -mr-64 -mt-64" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[150px] -ml-64 -mb-64" />

      {/* Slide Navigation Header */}
      <div className="fixed top-0 left-0 right-0 p-6 flex justify-between items-center z-50 glass border-b-0">
        <div className="flex items-center gap-3">
          <span className="font-bold tracking-tight text-xl uppercase text-white">Tell Management</span>
        </div>
        <div className="flex gap-2 text-xs font-mono text-gray-400">
          {Array.from({ length: slidesCount }).map((_, i) => (
            <div 
              key={i} 
              className={`h-1 w-6 rounded-full transition-all duration-300 ${i === currentSlide ? 'bg-blue-500 w-10' : i < currentSlide ? 'bg-blue-900' : 'bg-white/10'}`}
            />
          ))}
        </div>
        <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
          {currentSlide + 1} / {slidesCount}
        </div>
      </div>

      {/* Main Slides Content */}
      <div className="h-full w-full relative">
        
        {/* 1. COVER */}
        <SlideWrapper active={currentSlide === 0}>
          <div className="max-w-4xl text-center space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-semibold uppercase tracking-wider mb-4 animate-pulse">
              Aalborg Investor Summit 2026
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter leading-tight text-gradient">
              Fremtidens <br/><span className="text-blue-500">Udlejnings-økosystem</span>
            </h1>
            <p className="text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Started Q1 2025: Vi transformerer fragmenteret administration til et integreret økosystem.
            </p>
            <div className="flex justify-center gap-12 pt-8 text-sm text-gray-500 font-medium">
              <div>Aalborg, Danmark</div>
              <div>www.tellmanagement.dk</div>
            </div>
          </div>
        </SlideWrapper>

        {/* 2. THE VISION */}
        <SlideWrapper active={currentSlide === 1}>
          <div className="max-w-4xl text-center space-y-12">
            <Zap className="w-20 h-20 text-blue-500 mx-auto opacity-80" />
            <h2 className="text-5xl md:text-7xl font-bold leading-snug">
              Fra fragmenteret administration til <span className="text-blue-500 underline decoration-blue-500/30 underline-offset-8">automatiseret værdi</span>.
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Vi forbinder udlejere, administratorer og lejere i et integreret økosystem, hvor data og automation fjerner manuelt arbejde.
            </p>
          </div>
        </SlideWrapper>

        {/* 3. THE PROBLEM */}
        <SlideWrapper active={currentSlide === 2}>
          <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl w-full">
            <div className="space-y-6">
              <h3 className="text-blue-400 font-mono text-sm uppercase tracking-widest">Markedsudfordringer</h3>
              <h2 className="text-5xl font-bold leading-tight">Ejendomsbranchen drukner i manuelle processer.</h2>
              <ul className="space-y-6 pt-4">
                {[
                  { t: 'Fragmenteret software', d: 'Excel og isolerede systemer skaber datatab.' },
                  { t: 'Dårlig lejerrejse', d: 'Lejere forventer digitale løsninger, men møder analoge barrierer.' },
                  { t: 'Manglende Churn Indsigt', d: 'Hvorfor flytter lejerne? Beslutninger træffes uden feedback.' }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center shrink-0">!</div>
                    <div>
                      <h4 className="font-bold text-white">{item.t}</h4>
                      <p className="text-sm text-gray-500">{item.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="glass p-10 rounded-3xl border-l-4 border-blue-500 relative overflow-hidden">
               <Activity className="absolute top-0 right-0 p-4 opacity-5" size={120} />
              <p className="italic text-2xl text-gray-300 leading-relaxed">
                "Uden data på hvorfor lejere flytter, og uden automatisk opfølgning på tomgang, taber udlejere millioner hver måned."
              </p>
              <p className="mt-8 text-blue-400 font-bold">— Roadmap 2026</p>
            </div>
          </div>
        </SlideWrapper>

        {/* 4. THE SOLUTION: 3 PILLARS */}
        <SlideWrapper active={currentSlide === 3}>
          <div className="max-w-6xl w-full space-y-12">
            <div className="text-center">
              <h2 className="text-5xl font-bold mb-4">Løsningen: Tell-Økosystemet</h2>
              <p className="text-gray-400 text-xl">Integreret workflow fra udlejning til churn management.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-2xl border-t-4 border-blue-600">
                <LayoutDashboard className="w-10 h-10 text-blue-500 mb-6" />
                <h4 className="text-xl font-bold mb-3">Investor Dashboard</h4>
                <p className="text-sm text-gray-400">Datadrevne beslutninger, churn overvågning, tomgangskontrol og GDPR-håndtering.</p>
              </div>
              <div className="glass p-8 rounded-2xl border-t-4 border-blue-400">
                <Smartphone className="w-10 h-10 text-blue-400 mb-6" />
                <h4 className="text-xl font-bold mb-3">Homebase</h4>
                <p className="text-sm text-gray-400">Lejerens digitale hverdag. Affiliate indtægter på el, internet og forsikring.</p>
              </div>
              <div className="glass p-8 rounded-2xl border-t-4 border-blue-200">
                <Search className="w-10 h-10 text-blue-200 mb-6" />
                <h4 className="text-xl font-bold mb-3">Bolighunt</h4>
                <p className="text-sm text-gray-400">Konverteringsmotoren. AI Match, virtuelle indretninger og foto-bestilling.</p>
              </div>
            </div>
          </div>
        </SlideWrapper>

        {/* 5. DASHBOARD: PRICING & VALUE */}
        <SlideWrapper active={currentSlide === 4}>
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-600 rounded-lg"><LayoutDashboard size={32} /></div>
                <h2 className="text-4xl font-bold">Dashboard Prismodel</h2>
              </div>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {[
                  { icon: TrendingUp, text: 'Datadrevne beslutninger' },
                  { icon: MessageSquareQuote, text: 'Lejer feedback (Churn årsager)' },
                  { icon: Activity, text: 'Churn rate & Tomgang' },
                  { icon: Zap, text: 'Automatisk opfølgning' },
                  { icon: ShieldCheck, text: 'GDPR Håndtering' },
                  { icon: Globe, text: 'Homebase Integration' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm text-gray-300">
                    <item.icon size={16} className="text-blue-500" />
                    {item.text}
                  </div>
                ))}
              </div>
              <div className="p-8 bg-blue-600/10 rounded-3xl border border-blue-500/30 flex justify-between items-center group hover:bg-blue-600/20 transition-all">
                <div>
                  <div className="text-xs uppercase font-bold text-blue-400 mb-2 tracking-widest">Implementeringsgebyr</div>
                  <div className="text-4xl font-black">5.000,-</div>
                  <div className="text-xs text-gray-500 mt-1 italic">Engangsbeløb per projekt</div>
                </div>
                <div className="p-4 bg-white/5 rounded-full"><Rocket className="text-blue-400" /></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-bold text-gray-500 tracking-widest mb-4">Volumenbaseret licens</h3>
              <PricingTier units="1-50" price="500" />
              <PricingTier units="51-150" price="900" active />
              <PricingTier units="151-300" price="1.400" />
              <PricingTier units="301+" price="2.000" />
            </div>
          </div>
        </SlideWrapper>

        {/* 6. BOLIGHUNT: SUCCESS MODEL */}
        <SlideWrapper active={currentSlide === 5}>
           <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-200 rounded-lg"><Search size={32} className="text-black" /></div>
                <h2 className="text-4xl font-bold">Bolighunt AI Engine</h2>
              </div>
              <p className="text-gray-400 text-lg leading-relaxed">
                Gør din udlejning passiv med AI-drevet kundeservice og matchmaking.
              </p>
              <div className="space-y-4">
                {[
                  { icon: UserCheck, t: 'AI Match', d: 'Finder de rigtige lejere til dine boliger' },
                  { icon: Camera, t: 'Foto integration', d: 'Bestil professionelle billeder direkte.' },
                  { icon: Layers, t: 'Virtuel Indretning', d: 'Gør tomme boliger attraktive digitalt.' },
                  { icon: Scale, t: 'AI Jura & Support', d: 'Svar på lejekontrakt & husorden automatisk.' }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="p-3 bg-white/5 rounded-xl group-hover:bg-blue-500/20 transition-all"><item.icon size={20} className="text-blue-400" /></div>
                    <div>
                      <h4 className="font-bold">{item.t}</h4>
                      <p className="text-sm text-gray-500">{item.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass p-12 rounded-[3rem] border-blue-200/20 text-center space-y-8 relative overflow-hidden">
               <div className="absolute inset-0 bg-blue-200/5 blur-[80px]" />
               <h3 className="text-2xl font-black uppercase tracking-widest text-blue-200">No Cure No Pay</h3>
               <div className="space-y-2">
                 <div className="text-8xl font-black text-white">200,-</div>
                 <div className="text-sm uppercase font-bold text-gray-500 tracking-[0.3em]">Per fundet lejer</div>
               </div>
               <p className="text-gray-400 text-sm italic max-w-xs mx-auto">
                 Fuldstændig risikofrit for udlejeren. Vi tager kun betaling, når boligen er udlejet.
               </p>
               <div className="pt-4">
                 <div className="inline-block px-6 py-2 bg-white/5 rounded-full border border-white/10 text-xs font-bold text-blue-200">
                   INKL. AI KUNDESERVICE
                 </div>
               </div>
            </div>
          </div>
        </SlideWrapper>

        {/* 7. HOMEBASE: THE ECOSYSTEM PROFIT */}
        <SlideWrapper active={currentSlide === 6}>
           <div className="max-w-4xl text-center space-y-12">
            <Smartphone className="w-20 h-20 text-blue-400 mx-auto opacity-50" />
            <h2 className="text-6xl font-black">Homebase: Lejer-økonomi</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass p-8 rounded-2xl space-y-4">
                <Zap className="text-yellow-400 mx-auto" />
                <h4 className="font-bold">EL-Affiliate</h4>
                <p className="text-xs text-gray-500 italic">Automatisk skift ved indflytning.</p>
              </div>
              <div className="glass p-8 rounded-2xl space-y-4">
                <Globe className="text-blue-400 mx-auto" />
                <h4 className="font-bold">Internet</h4>
                <p className="text-xs text-gray-500 italic">Gør lejeren "ready to surf" dag 1.</p>
              </div>
              <div className="glass p-8 rounded-2xl space-y-4">
                <ShieldCheck className="text-emerald-400 mx-auto" />
                <h4 className="font-bold">Forsikring</h4>
                <p className="text-xs text-gray-500 italic">Sikrer både lejer og udlejers tryghed.</p>
              </div>
            </div>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Homebase samler alle nødvendige services i én app, hvilket skaber både tilfredse lejere og løbende affiliate-indtægter til platformen.
            </p>
          </div>
        </SlideWrapper>

        {/* 8. VALIDATION & PROGRESS */}
        <SlideWrapper active={currentSlide === 7}>
          <div className="max-w-6xl w-full grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-bold leading-tight">Udvikling startet Q1 2025.</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="glass p-6 rounded-2xl">
                  <div className="text-3xl font-black text-blue-500">10+</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500">Pilot Kunder</div>
                </div>
                <div className="glass p-6 rounded-2xl">
                  <div className="text-3xl font-black text-blue-500">2026</div>
                  <div className="text-[10px] uppercase font-bold text-gray-500">Scale Target</div>
                </div>
              </div>
              <div className="space-y-4">
                 <p className="text-gray-400">Integrationer og partnere bekræftet:</p>
                 <div className="flex flex-wrap gap-3">
                    {['A. Enggaard', 'Nobis', 'Koncenton', 'Din Mægler'].map(name => (
                      <span key={name} className="px-4 py-2 bg-white/5 rounded-full text-xs font-bold border border-white/10 text-gray-300">{name}</span>
                    ))}
                  </div>
              </div>
            </div>
            <div className="h-[300px] glass p-8 rounded-3xl border border-white/10">
               <p className="text-xs uppercase font-bold text-gray-500 mb-6 tracking-widest">Growth Roadmap 2025-2026</p>
               <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={tractionData}>
                  <defs>
                    <linearGradient id="colorPilot" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                  <Area type="monotone" dataKey="pilot" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPilot)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </SlideWrapper>

        {/* 9. MARKET OPPORTUNITY */}
        <SlideWrapper active={currentSlide === 8}>
           <div className="max-w-4xl text-center space-y-12">
            <Globe className="w-20 h-20 text-blue-400 mx-auto opacity-50" />
            <h2 className="text-6xl font-black">2026: Markedslederskab.</h2>
            <div className="grid grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="text-4xl font-black text-blue-500">Nordic</div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Expansion Potential</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-black text-blue-500">SaaS</div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Pure Play Model</p>
              </div>
              <div className="space-y-2">
                <div className="text-4xl font-black text-blue-500">AI</div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">First Mover Advantage</p>
              </div>
            </div>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Vi bygger fundamentet nu for at dominere den digitale udlejning i hele Norden inden udgangen af 2026.
            </p>
          </div>
        </SlideWrapper>

        {/* 10. COMPETITION: THE INTEGRATOR */}
        <SlideWrapper active={currentSlide === 9}>
          <div className="max-w-5xl w-full space-y-12">
            <h2 className="text-5xl font-bold text-center">Hvorfor vi vinder</h2>
            <div className="relative h-[400px] glass rounded-3xl p-12 overflow-hidden border border-white/10">
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-5">
                <div className="border-r border-b border-white" />
                <div className="border-b border-white" />
                <div className="border-r border-white" />
                <div />
              </div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] uppercase font-bold text-gray-600 tracking-[0.3em]">Fragmenteret Fokus</div>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase font-bold text-gray-600 tracking-[0.3em]">Holistisk Fokus (Tell)</div>
              
              <div className="absolute top-1/4 left-1/4 p-3 glass rounded text-xs opacity-40">Boligportaler (Kun Listing)</div>
              <div className="absolute top-1/3 right-1/4 p-3 glass rounded text-xs opacity-40">ERP Systemer (Kun Administration)</div>
              
              <div className="absolute bottom-12 right-12 bg-blue-600 p-8 rounded-3xl shadow-[0_0_60px_rgba(37,99,235,0.4)] animate-bounce-slow">
                <div className="font-black text-2xl mb-1">Tell Management</div>
                <div className="text-[10px] uppercase font-bold opacity-80 tracking-widest text-blue-100">Full Cycle 2026</div>
              </div>
            </div>
          </div>
        </SlideWrapper>

        {/* 11. STRATEGY & MILESTONES 2026 */}
        <SlideWrapper active={currentSlide === 10}>
          <div className="max-w-6xl w-full space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-5xl font-bold">Mål for 2026</h2>
              <p className="text-gray-400">Aggressiv skalering baseret på Q1 2025 fundamentet.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="glass p-10 rounded-3xl space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Rocket className="text-blue-500" /> Roadmap
                </h3>
                <ul className="space-y-4">
                  {[
                    'Q1 2025: Udvikling påbegyndes',
                    'Q3 2025: Fuld Dashboard Integration',
                    'Q1 2026: Landsdækkende Bolighunt (No Cure No Pay)',
                    'Q4 2026: 5.000+ aktive lejemål i økosystemet'
                  ].map((m, i) => (
                    <li key={i} className="flex gap-3 text-sm text-gray-400">
                      <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" /> {m}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass p-10 rounded-3xl space-y-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <TrendingUp className="text-blue-500" /> Hvorfor nu?
                </h3>
                <div className="space-y-6 pt-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <h5 className="font-bold text-blue-400 mb-1">Markedsmodning</h5>
                    <p className="text-xs text-gray-500 italic">Ejendomsbranchen er den sidste analoge bastion klar til AI.</p>
                  </div>
                  <div className="p-6 bg-blue-600/20 rounded-2xl border border-blue-500/30 text-center">
                    <span className="text-xs uppercase font-bold tracking-widest text-blue-400 block mb-2">Hovedmål 2026</span>
                    <span className="text-2xl font-black">Markedsledende SaaS Platform</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SlideWrapper>

        {/* 12. THE ASK */}
        <SlideWrapper active={currentSlide === 11}>
           <div className="max-w-4xl text-center space-y-12">
            <h2 className="text-7xl font-black text-gradient">Investér i fremtiden.</h2>
            <p className="text-2xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
              Vi søger strategiske partnere til at realisere vores 2026 vision. Kontakt os for en dybdegående gennemgang af teknologi og pilot-data.
            </p>
            <div className="pt-8">
               <button className="px-12 py-5 bg-blue-600 hover:bg-blue-500 rounded-full font-black text-xl transition-all shadow-[0_0_40px_rgba(37,99,235,0.3)] hover:scale-105">
                 Book Investor-møde
               </button>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-12 border-t border-white/10 max-w-md mx-auto">
               <div className="text-center">
                 <div className="text-sm text-gray-500 uppercase font-bold tracking-widest mb-1">Kontakt</div>
                 <div className="font-bold">hi@tellmanagement.dk</div>
               </div>
               <div className="text-center">
                 <div className="text-sm text-gray-500 uppercase font-bold tracking-widest mb-1">Lokation</div>
                 <div className="font-bold">Aalborg, DK</div>
               </div>
            </div>
          </div>
        </SlideWrapper>

      </div>

      {/* Navigation Controls */}
      <div className="fixed bottom-0 left-0 right-0 p-8 flex justify-between items-center z-50 pointer-events-none">
        <button 
          onClick={prevSlide}
          className={`p-4 rounded-full glass border border-white/10 transition-all pointer-events-auto ${currentSlide === 0 ? 'opacity-0' : 'opacity-100 hover:bg-white/10'}`}
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <div className="pointer-events-auto flex gap-4">
          <button className="px-6 py-2 rounded-full glass border border-white/10 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
            Copy Link
          </button>
          <button className="px-6 py-2 rounded-full bg-blue-600 text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">
            Get Pitch Deck PDF
          </button>
        </div>

        <button 
          onClick={nextSlide}
          className={`p-4 rounded-full glass border border-white/10 transition-all pointer-events-auto ${currentSlide === slidesCount - 1 ? 'opacity-0' : 'opacity-100 hover:bg-white/10'}`}
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      <style>{`
        @keyframes grow {
          0% { width: 0%; }
          50% { width: 85%; }
          100% { width: 85%; }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(1deg); }
        }
      `}</style>
    </div>
  );
}
