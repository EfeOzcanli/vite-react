import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Download, Mail, Smartphone, Zap, Shield, Globe, ArrowRight, Menu, X,
  CheckCircle2, MessageSquare, ShieldCheck, Scale, Activity, Star, Play,
  ChevronDown, Sparkles, Timer, Dumbbell, LineChart, Target, Camera,
  TrendingUp, Award, Calendar, BarChart3, Image, Trophy, Flame
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useInView } from 'framer-motion';

const CONTACT_EMAIL = "info@emke.app";
const EFFECTIVE_DATE = "01/30/2026";

// Trackr Logo - uses image
const TrackrLogo = ({ className = "w-12 h-12" }) => (
  <img src="/trackr-logo.png" alt="Trackr" className={`${className} object-contain`} />
);

// Apple Store Button with accurate logo
const AppStoreButton = ({ className = "" }) => (
  <button className={`flex items-center gap-3 bg-white text-black px-6 py-4 rounded-2xl font-bold hover:bg-zinc-100 transition-colors ${className}`}>
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
    <div className="text-left">
      <div className="text-[10px] leading-tight opacity-60">Download on the</div>
      <div className="text-lg font-bold leading-tight -mt-0.5">App Store</div>
    </div>
  </button>
);

// Google Play Button with accurate colorful logo
const PlayStoreButton = ({ className = "" }) => (
  <button className={`flex items-center gap-3 bg-white text-black px-6 py-4 rounded-2xl font-bold hover:bg-zinc-100 transition-colors ${className}`}>
    <svg viewBox="0 0 24 24" className="w-7 h-7">
      <path fill="#EA4335" d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92z"/>
      <path fill="#FBBC04" d="M17.556 8.238l-3.764 3.762L3.609 1.814l.02-.012c.332-.199.747-.2 1.08-.002l12.847 6.438z"/>
      <path fill="#4285F4" d="M17.556 15.762l-3.764-3.762 3.764-3.762 3.853 1.93c.632.316.632 1.352 0 1.668l-3.853 1.926z"/>
      <path fill="#34A853" d="M3.609 22.186L13.792 12l3.764 3.762-12.847 6.438c-.333.198-.748.197-1.08-.002l-.02-.012z"/>
    </svg>
    <div className="text-left">
      <div className="text-[10px] leading-tight opacity-60">GET IT ON</div>
      <div className="text-lg font-bold leading-tight -mt-0.5">Google Play</div>
    </div>
  </button>
);

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const update = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', update);
    return () => window.removeEventListener('mousemove', update);
  }, []);
  return mousePosition;
};

const FloatingOrb = ({ delay = 0, size = 400, color = "green", className = "" }) => (
  <motion.div
    className={`absolute rounded-full pointer-events-none ${className}`}
    style={{
      width: size, height: size,
      background: color === "green" 
        ? 'radial-gradient(circle, rgba(34,197,94,0.15) 0%, rgba(34,197,94,0) 70%)'
        : 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(16,185,129,0) 70%)',
      filter: 'blur(60px)',
    }}
    animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.1, 1] }}
    transition={{ duration: 8, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const GridPattern = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <div className="absolute inset-0 opacity-[0.03]" style={{
      backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
      backgroundSize: '80px 80px',
    }} />
  </div>
);

const GlowingBorder = ({ children, className = "" }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute -inset-[1px] bg-gradient-to-r from-green-500/50 via-emerald-500/50 to-green-500/50 rounded-[32px] opacity-0 group-hover:opacity-100 blur-sm transition-all duration-500" />
    {children}
  </div>
);

const Marquee = ({ children, speed = 30 }) => (
  <div className="overflow-hidden whitespace-nowrap">
    <motion.div className="inline-flex" animate={{ x: ['-50%', '0%'] }} transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}>
      {children}{children}
    </motion.div>
  </div>
);

const AnimatedText = ({ text, delay = 0 }) => (
  <span>
    {text.split(' ').map((word, i) => (
      <motion.span key={i} className="inline-block mr-[0.25em]"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: delay + i * 0.05, ease: [0.22, 1, 0.36, 1] }}>
        {word}
      </motion.span>
    ))}
  </span>
);

const MagneticButton = ({ children, className = "", onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const handleMouse = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (rect) { x.set((e.clientX - rect.left - rect.width/2) * 0.15); y.set((e.clientY - rect.top - rect.height/2) * 0.15); }
  };
  return (
    <motion.button ref={ref} className={className} onClick={onClick} onMouseMove={handleMouse} onMouseLeave={() => { x.set(0); y.set(0); }}
      style={{ x, y }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}>
      {children}
    </motion.button>
  );
};

const NumberCounter = ({ value, suffix = "", prefix = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (isInView) {
      let current = 0;
      const timer = setInterval(() => {
        current += value / 60;
        if (current >= value) { setCount(value); clearInterval(timer); } else setCount(Math.floor(current));
      }, 33);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
};

const ScoreRing = ({ score, size = 120, strokeWidth = 8 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth={strokeWidth} />
        <motion.circle cx={size/2} cy={size/2} r={radius} fill="none" stroke="url(#scoreGradient)" strokeWidth={strokeWidth} strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }} animate={{ strokeDashoffset: circumference - (score/100) * circumference }}
          transition={{ duration: 1.5, ease: "easeOut" }} style={{ strokeDasharray: circumference }} />
        <defs><linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#22c55e" /><stop offset="100%" stopColor="#10b981" /></linearGradient></defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center"><span className="text-3xl font-black text-white">{score}</span></div>
    </div>
  );
};

// Progress Photos with stock fitness images
const PhotoProgressCard = () => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
    <div className="bg-gradient-to-br from-zinc-700/90 to-zinc-800/90 backdrop-blur-xl rounded-[32px] border border-white/20 p-6 overflow-hidden shadow-2xl">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-green-500/30 flex items-center justify-center"><Camera size={20} className="text-green-400" /></div>
        <div><div className="text-white font-bold text-sm">Progress Photo</div><div className="text-zinc-300 text-xs">Jan 30, 2026</div></div>
        <div className="ml-auto px-3 py-1.5 bg-green-500/30 rounded-full border border-green-500/40"><span className="text-green-300 text-xs font-bold">78.5 kg</span></div>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/20 relative bg-gradient-to-b from-zinc-600 to-zinc-700">
          <div className="absolute inset-0 flex items-center justify-center"><div className="w-14 h-14 rounded-full bg-zinc-500/50 flex items-center justify-center"><Camera size={20} className="text-zinc-400" /></div></div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2"><span className="text-white text-xs font-bold">Week 1</span><div className="text-zinc-400 text-[10px]">82.5 kg</div></div>
        </div>
        <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/20 relative bg-gradient-to-b from-zinc-600 to-zinc-700">
          <div className="absolute inset-0 flex items-center justify-center"><div className="w-14 h-14 rounded-full bg-zinc-500/50 flex items-center justify-center"><Camera size={20} className="text-zinc-400" /></div></div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2"><span className="text-white text-xs font-bold">Week 4</span><div className="text-zinc-400 text-[10px]">80.2 kg</div></div>
        </div>
        <div className="aspect-[3/4] rounded-2xl overflow-hidden border-2 border-green-500/60 relative bg-gradient-to-b from-zinc-600 to-zinc-700">
          <div className="absolute inset-0 flex items-center justify-center"><div className="w-14 h-14 rounded-full bg-green-500/30 flex items-center justify-center"><Camera size={20} className="text-green-400" /></div></div>
          <div className="absolute top-2 right-2 px-2 py-1 bg-green-500 rounded-full"><span className="text-black text-[10px] font-bold">Latest</span></div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-2"><span className="text-white text-xs font-bold">Week 8</span><div className="text-green-400 text-[10px]">78.5 kg</div></div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2 bg-green-500/25 rounded-xl p-3 border border-green-500/40">
        <TrendingUp size={18} className="text-green-400" />
        <span className="text-green-300 text-sm font-semibold">-4 kg transformation</span>
      </div>
      <div className="mt-3 flex items-center gap-2 bg-blue-500/15 rounded-xl p-3 border border-blue-500/30">
        <Shield size={16} className="text-blue-400" />
        <span className="text-blue-300 text-xs">Stored on device • Premium: Cloud backup available</span>
      </div>
    </div>
  </motion.div>
);

const WeightTimeline = () => {
  const weights = [{ date: 'Week 1', weight: 82.5 }, { date: 'Week 2', weight: 81.8 }, { date: 'Week 3', weight: 80.9 }, { date: 'Week 4', weight: 79.5 }, { date: 'Week 5', weight: 78.5 }];
  return (
    <div className="space-y-3">
      {weights.map((w, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4">
          <div className="w-16 text-zinc-300 text-sm font-medium">{w.date}</div>
          <div className="flex-1 h-3 bg-zinc-600/50 rounded-full overflow-hidden">
            <motion.div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" initial={{ width: 0 }} whileInView={{ width: `${((82.5 - w.weight) / 4) * 100}%` }} viewport={{ once: true }} transition={{ duration: 0.8, delay: i * 0.1 }} />
          </div>
          <div className="w-20 text-right"><span className="text-white font-bold">{w.weight}</span><span className="text-zinc-300 text-sm"> kg</span></div>
        </motion.div>
      ))}
    </div>
  );
};

const ExerciseProgressCard = ({ name, current, previous, unit, icon }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-zinc-700/80 to-zinc-800/80 backdrop-blur-xl rounded-2xl border border-white/15 p-5 group hover:border-green-500/40 transition-all">
    <div className="flex items-center gap-3 mb-3">
      <div className="w-10 h-10 rounded-xl bg-green-500/25 flex items-center justify-center text-green-400 group-hover:bg-green-500/40 transition-colors">{icon}</div>
      <span className="text-white font-semibold">{name}</span>
    </div>
    <div className="flex items-end justify-between">
      <div><div className="text-3xl font-black text-white">{current}<span className="text-lg text-zinc-300 ml-1">{unit}</span></div><div className="text-zinc-400 text-sm">Previous: {previous} {unit}</div></div>
      <div className="flex items-center gap-1 text-green-400 bg-green-500/25 px-2 py-1 rounded-lg"><TrendingUp size={16} /><span className="font-bold">+{current - previous}</span></div>
    </div>
  </motion.div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const location = useLocation();
  const activePage = location.pathname === '/' ? 'home' : location.pathname.slice(1);
  useEffect(() => scrollY.onChange(latest => setScrolled(latest > 50)), [scrollY]);
  const navLinks = [{ name: 'Apps', id: 'apps', path: '/apps' }, { name: 'Vision', id: 'vision', path: '/vision' }, { name: 'Trackr', id: 'trackr', path: '/trackr' }];

  return (
    <>
      <motion.nav initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6 }} className={`fixed top-0 w-full z-50 transition-all duration-700 ${scrolled ? 'bg-black/80 backdrop-blur-2xl border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <motion.div className="flex items-center cursor-pointer group" onClick={() => navigate('/')} whileHover={{ scale: 1.02 }}>
            <span className="text-2xl font-black tracking-tight text-white">emke<span className="text-green-500 group-hover:text-green-400 transition-colors">.</span></span>
          </motion.div>
          <div className="hidden md:flex items-center">
            <div className="flex items-center gap-1 bg-white/5 backdrop-blur-xl rounded-full p-1.5 border border-white/10">
              {navLinks.map(link => (
                <button key={link.id} onClick={() => navigate(link.path)} className={`relative px-5 py-2 text-[13px] font-semibold transition-all duration-300 rounded-full ${activePage === link.id ? 'text-black' : 'text-zinc-400 hover:text-white'}`}>
                  {activePage === link.id && <motion.div layoutId="navPill" className="absolute inset-0 bg-green-500 rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                  <span className="relative z-10">{link.name}</span>
                </button>
              ))}
            </div>
            <MagneticButton onClick={() => navigate('/contact')} className="ml-6 px-6 py-2.5 rounded-full bg-white text-black text-[13px] font-bold hover:bg-green-400 transition-colors duration-300">Contact</MagneticButton>
          </div>
          <button className="md:hidden p-2.5 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10" onClick={() => setIsOpen(!isOpen)}>{isOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl md:hidden">
            <div className="flex flex-col items-center justify-center h-full gap-6">
              {navLinks.map((link, i) => <motion.button key={link.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} onClick={() => { navigate(link.path); setIsOpen(false); }} className="text-4xl font-black text-zinc-400 hover:text-white transition-colors uppercase">{link.name}</motion.button>)}
              <motion.button initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} onClick={() => { navigate('/contact'); setIsOpen(false); }} className="mt-8 px-10 py-4 bg-green-500 text-black text-xl font-black rounded-full">Contact Us</motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Footer = () => {
  const navigate = useNavigate();
  return (
  <footer className="relative bg-black border-t border-white/5 pt-24 pb-12 px-6 overflow-hidden">
    <FloatingOrb size={600} className="-bottom-64 left-1/2 -translate-x-1/2" />
    <div className="max-w-7xl mx-auto relative z-10">
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-24">
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">Ready to evolve<span className="text-green-500">?</span></h2>
        <p className="text-xl text-zinc-500 mb-10 max-w-xl mx-auto">Join thousands who track their progress with precision.</p>
        <MagneticButton onClick={() => navigate('/trackr')} className="px-10 py-5 bg-green-500 text-black font-bold rounded-full text-lg hover:bg-green-400 transition-colors inline-flex items-center gap-3">Get Started <ArrowRight size={20} /></MagneticButton>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <span className="text-3xl font-black tracking-tight text-white">emke<span className="text-green-500">.</span></span>
          <p className="text-zinc-500 max-w-sm font-medium leading-relaxed mt-6 text-lg">Building the next generation of minimalist performance tools.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-sm">Platform</h4>
          <ul className="space-y-3">{['Trackr App', 'Our Vision', 'Partner with us'].map((item, i) => <li key={i} onClick={() => navigate(['/trackr', '/vision', '/contact'][i])} className="text-zinc-500 hover:text-green-400 cursor-pointer transition-colors">{item}</li>)}</ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-sm">Legal</h4>
          <ul className="space-y-3">{['Privacy Policy', 'Terms of Service'].map((item, i) => <li key={i} onClick={() => navigate(['/privacy', '/terms'][i])} className="text-zinc-500 hover:text-green-400 cursor-pointer transition-colors">{item}</li>)}</ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-zinc-600 text-sm">© 2026 EMKE Seismic Isolation LLC. All rights reserved.</p>
        <div className="flex gap-6"><span className="text-zinc-600 hover:text-white cursor-pointer transition-colors">Twitter</span><span className="text-zinc-600 hover:text-white cursor-pointer transition-colors">Instagram</span></div>
      </div>
    </div>
  </footer>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);
  const mousePosition = useMousePosition();

  return (
    <div className="relative">
      <GridPattern />
      
      {/* Hero */}
      <section className="min-h-screen relative flex items-center justify-center overflow-hidden px-6">
        <FloatingOrb delay={0} size={600} className="top-0 right-0" />
        <FloatingOrb delay={2} size={400} color="emerald" className="bottom-0 left-0" />
        <motion.div className="fixed w-[800px] h-[800px] rounded-full pointer-events-none opacity-30" style={{ background: 'radial-gradient(circle, rgba(34,197,94,0.1) 0%, transparent 60%)', x: mousePosition.x - 400, y: mousePosition.y - 400 }} />
        <motion.div style={{ y: y1, opacity, scale }} className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-8">
            <Sparkles size={14} className="text-green-500" /><span className="text-sm text-zinc-400">Now with Photo Progress Tracking</span><ArrowRight size={14} className="text-zinc-500" />
          </motion.div>
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter text-white leading-[0.9] mb-8">
            <AnimatedText text="Track your" delay={0.3} /><br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-green-500"><AnimatedText text="evolution." delay={0.5} /></span>
          </h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto mb-12 leading-relaxed">
            Record your weight with every gym selfie. Never forget your progress again. <span className="text-zinc-300">Data over noise</span>.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <MagneticButton onClick={() => navigate('/trackr')} className="group px-8 py-5 bg-green-500 text-black font-bold rounded-full text-lg hover:bg-green-400 transition-all duration-300 flex items-center gap-3">
              <Play size={20} className="group-hover:scale-110 transition-transform" />Explore Trackr
            </MagneticButton>
            <MagneticButton onClick={() => navigate('/contact')} className="px-8 py-5 bg-white/5 backdrop-blur-xl text-white font-bold rounded-full text-lg border border-white/10 hover:bg-white/10 transition-all duration-300">Have an idea?</MagneticButton>
          </motion.div>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2 text-zinc-600">
            <span className="text-xs uppercase tracking-widest">Scroll</span><ChevronDown size={20} />
          </motion.div>
        </motion.div>
      </section>

      {/* Problem Statement */}
      <section className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-8">Tired of not knowing your weight<br /><span className="text-zinc-500">when you took that gym selfie?</span></h2>
            <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-12">We've all been there. Scrolling through old photos wondering "how much did I weigh here?" Trackr automatically links your weight to your progress photos.</p>
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <section className="py-12 border-y border-white/5 bg-zinc-950/50">
        <Marquee speed={40}>
          <div className="flex items-center gap-16 px-8">
            {['WEIGHT TRACKING', 'PHOTO PROGRESS', 'OVERALL SCORE', 'EXERCISE STATS', 'PR RECORDS'].map((word, i) => (
              <span key={i} className="text-2xl md:text-4xl font-black text-zinc-800 tracking-tight flex items-center gap-16">{word} <span className="text-green-500">✦</span></span>
            ))}
          </div>
        </Marquee>
      </section>

      {/* Features */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">Everything tracked<span className="text-green-500">.</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Photo Progress', desc: 'Every photo tagged with your weight automatically.', icon: <Camera />, badge: 'NEW' },
              { title: 'Weight Timeline', desc: 'Visualize your journey. Track trends and milestones.', icon: <Scale />, badge: 'NEW' },
              { title: 'Overall Score', desc: 'Your fitness score based on consistency and progress.', icon: <Trophy />, badge: 'NEW' },
              { title: 'Exercise Tracking', desc: 'Log every rep. Track PRs for each movement.', icon: <Dumbbell /> },
              { title: 'Progress Analytics', desc: 'Deep insights into your training volume.', icon: <BarChart3 /> },
              { title: 'Cloud Backup', desc: 'Photos stored securely on your phone. Premium users can enable cloud backup.', icon: <Shield /> },
            ].map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <GlowingBorder>
                  <div className="p-10 rounded-[32px] bg-zinc-900/50 border border-white/5 h-full group">
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-all">{feat.icon}</div>
                      {feat.badge && <span className="px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-500 text-xs font-bold">{feat.badge}</span>}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feat.title}</h3>
                    <p className="text-zinc-500">{feat.desc}</p>
                  </div>
                </GlowingBorder>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo + Weight - BRIGHTER */}
      <section className="py-32 px-6 relative overflow-hidden bg-gradient-to-b from-zinc-800/50 via-zinc-900/50 to-black">
        <FloatingOrb size={800} className="top-1/2 left-0 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/25 border border-green-500/40 rounded-full text-green-400 text-sm font-semibold mb-6"><Camera size={14} /> Photo Progress</span>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">Your weight, your photos,<br /><span className="text-zinc-300">perfectly synced.</span></h2>
              <p className="text-xl text-zinc-200 mb-8 leading-relaxed">Every time you take a progress photo, Trackr automatically records your current weight.</p>
              <div className="space-y-4">
                {['Automatic weight tagging on photos', 'Side-by-side comparison view', 'Premium: Cloud backup for switching phones', 'Export & share your journey'].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 text-zinc-100">
                    <CheckCircle2 size={20} className="text-green-400" /><span className="font-medium">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <PhotoProgressCard />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overall Score - BRIGHTER */}
      <section className="py-32 px-6 relative border-y border-white/10 bg-gradient-to-b from-zinc-800/60 via-zinc-900/60 to-zinc-950/60">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="order-2 lg:order-1">
              <div className="bg-gradient-to-br from-zinc-700/90 to-zinc-800/90 backdrop-blur-xl rounded-[40px] border border-white/25 p-10 shadow-2xl">
                <div className="flex items-center justify-between mb-8"><div><div className="text-zinc-300 text-sm font-semibold mb-1">YOUR SCORE</div><div className="text-white font-black text-3xl">Excellent</div></div><ScoreRing score={87} /></div>
                <div className="space-y-4">
                  {[{ label: 'Consistency', value: 92, color: 'bg-orange-500', icon: <Flame size={16} className="text-orange-400" /> }, { label: 'Progress', value: 85, color: 'bg-green-500', icon: <TrendingUp size={16} className="text-green-400" /> }, { label: 'Achievements', value: 78, color: 'bg-yellow-500', icon: <Trophy size={16} className="text-yellow-400" /> }].map((item, i) => (
                    <div key={i} className="flex items-center justify-between"><div className="flex items-center gap-3">{item.icon}<span className="text-zinc-200">{item.label}</span></div><div className="flex items-center gap-2"><div className="w-32 h-3 bg-zinc-600/50 rounded-full overflow-hidden"><motion.div className={`h-full ${item.color} rounded-full`} initial={{ width: 0 }} whileInView={{ width: `${item.value}%` }} viewport={{ once: true }} /></div><span className="text-white font-bold w-8">{item.value}</span></div></div>
                  ))}
                </div>
                <div className="mt-8 pt-6 border-t border-white/15"><div className="flex items-center justify-between text-sm"><span className="text-zinc-300">This week's workouts</span><span className="text-white font-bold">5 of 5 ✓</span></div></div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/25 border border-yellow-500/40 rounded-full text-yellow-400 text-sm font-semibold mb-6"><Trophy size={14} /> Overall Score</span>
              <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">Know your<br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">fitness score.</span></h2>
              <p className="text-xl text-zinc-200 mb-8 leading-relaxed">Combines consistency, progress, and achievements into one powerful metric.</p>
              <div className="grid grid-cols-3 gap-4">
                {[{ value: '12', label: 'Week Streak', icon: <Flame className="text-orange-400" /> }, { value: '24', label: 'PRs', icon: <Trophy className="text-yellow-400" /> }, { value: '156', label: 'Workouts', icon: <Dumbbell className="text-green-400" /> }].map((stat, i) => (
                  <div key={i} className="bg-zinc-700/50 rounded-2xl border border-white/15 p-4 text-center"><div className="flex justify-center mb-2">{stat.icon}</div><div className="text-2xl font-black text-white">{stat.value}</div><div className="text-zinc-300 text-xs">{stat.label}</div></div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Exercise Progress */}
      <section className="py-32 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">Track progress in every move<span className="text-green-500">.</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ExerciseProgressCard name="Bench Press" current={100} previous={95} unit="kg" icon={<Dumbbell size={20} />} />
            <ExerciseProgressCard name="Squat" current={140} previous={130} unit="kg" icon={<Activity size={20} />} />
            <ExerciseProgressCard name="Deadlift" current={180} previous={170} unit="kg" icon={<Zap size={20} />} />
            <ExerciseProgressCard name="OHP" current={65} previous={60} unit="kg" icon={<TrendingUp size={20} />} />
          </div>
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-16 bg-gradient-to-br from-zinc-700/80 to-zinc-800/80 backdrop-blur-xl rounded-[32px] border border-white/20 p-8">
            <div className="flex items-center justify-between mb-8"><div><h3 className="text-2xl font-bold text-white">Weight Journey</h3><p className="text-zinc-300">Your transformation over time</p></div><div className="flex items-center gap-2 px-4 py-2 bg-green-500/25 rounded-full border border-green-500/40"><TrendingUp size={16} className="text-green-400" /><span className="text-green-400 font-bold">-4 kg total</span></div></div>
            <WeightTimeline />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-y border-white/5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[{ value: 50000, suffix: '+', label: 'Active Users' }, { value: 2, suffix: 'M+', label: 'Photos Tracked' }, { value: 500, suffix: 'K+', label: 'PRs Recorded' }, { value: 4.9, suffix: '', label: 'App Store Rating', prefix: '★ ' }].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-4xl md:text-6xl font-black text-white mb-2"><NumberCounter value={stat.value} suffix={stat.suffix} prefix={stat.prefix} /></div>
                <div className="text-zinc-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="py-32 px-6 relative overflow-hidden">
        <FloatingOrb size={800} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-sm font-semibold mb-6"><Star size={14} /> Featured App</span>
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">Trackr<span className="text-green-500">.</span></h2>
              <p className="text-xl text-zinc-400 mb-8 leading-relaxed">Track weight, photos, exercises, and your overall score.</p>
              <div className="space-y-4 mb-10">
                {[{ icon: <Camera size={18} />, text: 'Photo progress with weight sync' }, { icon: <Scale size={18} />, text: 'Smart weight tracking' }, { icon: <Trophy size={18} />, text: 'Overall fitness score' }, { icon: <BarChart3 size={18} />, text: 'Exercise-by-exercise analytics' }].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 text-zinc-300">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-green-500">{item.icon}</div><span className="font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              <div className="flex flex-wrap gap-4">
                <AppStoreButton />
                <PlayStoreButton />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative">
              <div className="relative aspect-square rounded-[48px] bg-gradient-to-br from-zinc-900 to-zinc-950 border border-white/10 p-12 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10" />
                <motion.div animate={{ rotateY: [0, 10, 0, -10, 0], rotateX: [0, -5, 0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} style={{ transformStyle: 'preserve-3d', perspective: 1000 }}>
                  <div className="w-56 h-56 md:w-64 md:h-64 rounded-[40px] bg-black shadow-2xl border border-white/10 flex items-center justify-center overflow-hidden"><TrackrLogo className="w-28 h-28 md:w-36 md:h-36" /></div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

const TrackrPage = () => (
  <div className="relative min-h-screen">
    <GridPattern />
    <section className="pt-40 pb-20 px-6 relative overflow-hidden">
      <FloatingOrb size={600} className="top-0 right-0" />
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-sm font-semibold mb-8"><Dumbbell size={16} />Your Complete Fitness Tracker</motion.div>
            <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-8"><AnimatedText text="Trackr." delay={0.3} /></h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="text-xl md:text-2xl text-zinc-400 mb-10 leading-relaxed">Track your weight with photos, monitor progress in every exercise, and discover your overall fitness score.</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-wrap gap-4">
              <AppStoreButton />
              <PlayStoreButton />
            </motion.div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.8, rotateY: -15 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="relative">
            <div className="relative"><div className="absolute inset-0 bg-gradient-to-br from-green-500/30 via-transparent to-emerald-500/30 rounded-[60px] blur-3xl" /><div className="relative aspect-[3/4] max-w-md mx-auto rounded-[60px] bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 shadow-2xl border border-white/10"><div className="w-full h-full rounded-[52px] bg-black overflow-hidden flex items-center justify-center"><TrackrLogo className="w-32 h-32" /></div><div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full" /></div></div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Photo Progress - BRIGHTER */}
    <section className="py-32 px-6 relative bg-gradient-to-b from-zinc-800/50 via-zinc-900/50 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/25 border border-green-500/40 rounded-full text-green-400 text-sm font-semibold mb-6"><Camera size={14} /> Photo Progress</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">Tired of not knowing your weight when you took that gym selfie?</h2>
            <p className="text-xl text-zinc-200 mb-8 leading-relaxed">Trackr solves this forever. Every progress photo is automatically tagged with your current weight.</p>
            <div className="space-y-4">
              {['Automatic weight tagging', 'Before/after comparisons', 'Premium: Cloud backup available', 'Private & secure on device'].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 text-zinc-100"><CheckCircle2 size={20} className="text-green-400 shrink-0" /><span className="font-medium">{item}</span></motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><PhotoProgressCard /></motion.div>
        </div>
      </div>
    </section>

    {/* Overall Score - BRIGHTER */}
    <section className="py-32 px-6 relative bg-gradient-to-b from-zinc-800/60 via-zinc-900/60 to-zinc-950/60 border-y border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="order-2 lg:order-1">
            <div className="bg-gradient-to-br from-zinc-700/90 to-zinc-800/90 backdrop-blur-xl rounded-[40px] border border-white/25 p-10 shadow-2xl">
              <div className="flex items-center justify-between mb-8"><div><div className="text-zinc-300 text-sm font-semibold mb-1">YOUR SCORE</div><div className="text-white font-black text-3xl">Excellent</div></div><ScoreRing score={87} /></div>
              <div className="space-y-4 mb-6">
                {[{ label: 'Consistency', value: 92, color: 'bg-orange-500', icon: <Flame size={16} className="text-orange-400" /> }, { label: 'Progress', value: 85, color: 'bg-green-500', icon: <TrendingUp size={16} className="text-green-400" /> }, { label: 'Achievements', value: 78, color: 'bg-yellow-500', icon: <Trophy size={16} className="text-yellow-400" /> }].map((item, i) => (
                  <div key={i} className="flex items-center justify-between"><div className="flex items-center gap-3">{item.icon}<span className="text-zinc-200">{item.label}</span></div><div className="flex items-center gap-2"><div className="w-32 h-3 bg-zinc-600/50 rounded-full overflow-hidden"><motion.div className={`h-full ${item.color} rounded-full`} initial={{ width: 0 }} whileInView={{ width: `${item.value}%` }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.2 }} /></div><span className="text-white font-bold w-8">{item.value}</span></div></div>
                ))}
              </div>
              <div className="pt-6 border-t border-white/15"><div className="grid grid-cols-3 gap-4 text-center"><div><div className="text-2xl font-black text-white">12</div><div className="text-zinc-300 text-xs">Week Streak</div></div><div><div className="text-2xl font-black text-white">24</div><div className="text-zinc-300 text-xs">PRs</div></div><div><div className="text-2xl font-black text-white">156</div><div className="text-zinc-300 text-xs">Workouts</div></div></div></div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="order-1 lg:order-2">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500/25 border border-yellow-500/40 rounded-full text-yellow-400 text-sm font-semibold mb-6"><Trophy size={14} /> Overall Score</span>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">Learn your overall fitness score</h2>
            <p className="text-xl text-zinc-200 mb-8 leading-relaxed">Combines consistency, progress, and achievements into one powerful metric.</p>
            <div className="space-y-4">
              {['Consistency score', 'Progress score', 'Achievement score', 'Weekly trends'].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-center gap-3 text-zinc-100"><CheckCircle2 size={20} className="text-yellow-400 shrink-0" /><span className="font-medium">{item}</span></motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Exercise Progress */}
    <section className="py-32 px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-6">Track progress in every move</h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <ExerciseProgressCard name="Bench Press" current={100} previous={95} unit="kg" icon={<Dumbbell size={20} />} />
          <ExerciseProgressCard name="Squat" current={140} previous={130} unit="kg" icon={<Activity size={20} />} />
          <ExerciseProgressCard name="Deadlift" current={180} previous={170} unit="kg" icon={<Zap size={20} />} />
          <ExerciseProgressCard name="OHP" current={65} previous={60} unit="kg" icon={<TrendingUp size={20} />} />
        </div>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-gradient-to-br from-zinc-700/80 to-zinc-800/80 backdrop-blur-xl rounded-[32px] border border-white/20 p-8">
          <div className="flex items-center justify-between mb-8"><div><h3 className="text-2xl font-bold text-white">Weight Journey</h3><p className="text-zinc-300">Track bodyweight</p></div><div className="flex items-center gap-2 px-4 py-2 bg-green-500/25 rounded-full border border-green-500/40"><TrendingUp size={16} className="text-green-400" /><span className="text-green-400 font-bold">-4 kg</span></div></div>
          <WeightTimeline />
        </motion.div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-32 px-6 relative overflow-hidden">
      <FloatingOrb size={500} className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center relative z-10">
        <TrackrLogo className="w-16 h-16 mx-auto mb-8" />
        <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">Start tracking<span className="text-green-500">.</span></h2>
        <p className="text-xl text-zinc-500 mb-10">Download Trackr today.</p>
        <div className="flex flex-wrap gap-4 justify-center">
          <AppStoreButton className="!px-8 !py-5" />
          <PlayStoreButton className="!px-8 !py-5" />
        </div>
      </motion.div>
    </section>
  </div>
);

const VisionPage = () => (
  <div className="relative min-h-screen"><GridPattern />
    <section className="pt-40 pb-32 px-6"><div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}><h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-8"><AnimatedText text="Our Vision." delay={0.2} /></h1><div className="h-px w-32 bg-gradient-to-r from-green-500 to-transparent mb-16" /></motion.div>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="space-y-12 text-xl text-zinc-400 leading-relaxed">
        <p>At <span className="text-white font-bold">emke</span>, technology is an <span className="text-green-400">invisible partner</span> in your growth.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
          {[{ title: 'Decade of Experience', desc: 'Athletes and engineers refining performance.' }, { title: 'Minimalist Philosophy', desc: "If it doesn't help, it doesn't belong." }].map((item, i) => (
            <GlowingBorder key={i}><div className="p-10 rounded-[32px] bg-zinc-900/50 border border-white/5 h-full"><h4 className="text-white font-bold text-xl mb-4">{item.title}</h4><p className="text-zinc-500">{item.desc}</p></div></GlowingBorder>
          ))}
        </div>
        <p>Building a <span className="text-white font-semibold">standard</span> for performance data. <span className="text-green-400">Clean, private, powerful.</span></p>
      </motion.div>
    </div></section>
  </div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  const getMailtoLink = () => {
    const subject = encodeURIComponent(`Contact from ${formData.name || 'Website Visitor'}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
  <div className="relative min-h-screen"><GridPattern /><FloatingOrb size={600} className="top-40 right-0" />
    <section className="pt-40 pb-32 px-6"><div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
        <h1 className="text-6xl md:text-7xl font-black text-white tracking-tight mb-8 leading-[0.95]"><AnimatedText text="Let's build together." delay={0.2} /></h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-xl text-zinc-400 mb-16">Have an app idea? We're always open to collaborations.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="space-y-6">
          <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-5 text-white group"><div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-green-500/10 group-hover:border-green-500/30 transition-colors"><Mail size={24} /></div><span className="text-lg font-semibold group-hover:text-green-400 transition-colors">{CONTACT_EMAIL}</span></a>
          <div className="flex items-center gap-5 text-white group cursor-pointer"><div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-green-500/10 group-hover:border-green-500/30 transition-colors"><MessageSquare size={24} /></div><span className="text-lg font-semibold group-hover:text-green-400 transition-colors">@emke_ecosystem</span></div>
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
        <GlowingBorder><div className="bg-zinc-900/50 backdrop-blur-xl p-10 md:p-14 rounded-[40px] border border-white/5">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Name</label><input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-600 focus:border-green-500/50 outline-none transition-all" placeholder="John Doe" /></div>
              <div className="space-y-2"><label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Email</label><input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-600 focus:border-green-500/50 outline-none transition-all" placeholder="john@example.com" /></div>
            </div>
            <div className="space-y-2"><label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Message</label><textarea rows={5} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-600 focus:border-green-500/50 outline-none transition-all resize-none" placeholder="Tell us about your project..." /></div>
            <a href={getMailtoLink()} className="block w-full py-5 bg-green-500 text-black font-bold rounded-2xl hover:bg-green-400 transition-colors text-lg text-center">Send Message</a>
            <p className="text-zinc-500 text-xs text-center">Opens your email app with the message ready to send</p>
          </div>
        </div></GlowingBorder>
      </motion.div>
    </div></section>
  </div>
  );
};

const AppsPage = () => {
  const navigate = useNavigate();
  return (
  <div className="relative min-h-screen"><GridPattern />
    <section className="pt-40 pb-32 px-6"><div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tight mb-6"><AnimatedText text="Our Apps." delay={0.2} /></h1>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} onClick={() => navigate('/trackr')} className="cursor-pointer group">
          <GlowingBorder><div className="p-10 rounded-[40px] bg-zinc-900/50 border border-white/5 h-full overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[100px] group-hover:bg-green-500/20 transition-all duration-500" />
            <div className="relative z-10">
              <TrackrLogo className="w-14 h-14 mb-6" />
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-xs font-semibold mb-4"><Star size={12} />Featured</div>
              <h3 className="text-3xl font-black text-white mb-4">Trackr</h3>
              <p className="text-zinc-500 mb-4">Track your weight with photos, monitor every exercise, and discover your overall fitness score.</p>
              <div className="flex flex-wrap gap-2 mb-6">{['Photo Progress', 'Weight Sync', 'Overall Score'].map((tag, i) => <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-zinc-400 text-xs">{tag}</span>)}</div>
              <span className="inline-flex items-center gap-2 text-green-500 font-semibold group-hover:gap-4 transition-all">Learn more <ArrowRight size={18} /></span>
            </div>
          </div></GlowingBorder>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div className="p-10 rounded-[40px] bg-zinc-900/30 border border-dashed border-white/10 h-full flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-600 mb-6"><Sparkles size={32} /></div>
            <h3 className="text-2xl font-bold text-zinc-600 mb-4">Coming Soon</h3>
            <p className="text-zinc-700 max-w-xs">New tools to optimize your performance.</p>
          </div>
        </motion.div>
      </div>
    </div></section>
  </div>
  );
};

const LegalPage = ({ title, icon, children }) => (
  <div className="relative min-h-screen"><GridPattern />
    <section className="pt-40 pb-32 px-6"><div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className="flex items-center gap-4 mb-6"><div className="text-green-500">{icon}</div><h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{title}</h1></div>
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-500">Effective Date: {EFFECTIVE_DATE}</div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-8 text-zinc-400 leading-relaxed">{children}</motion.div>
    </div></section>
  </div>
);

const PrivacyPage = () => (
  <LegalPage title="Privacy Policy" icon={<ShieldCheck size={36} />}>
    <p className="text-white font-semibold text-lg">EMKE Seismic Isolation LLC</p>
    <p>This Privacy Policy explains how we collect, use, disclose, and protect your information.</p>
    <div className="space-y-4"><h3 className="text-white text-lg font-bold">1. Information We Collect</h3><p>Name, email, fitness data. Photos stored locally on your device.</p></div>
    <div className="space-y-4"><h3 className="text-white text-lg font-bold">2. How We Use Information</h3><p>To operate the Service and track your progress. <strong className="text-green-400">We do not sell your data.</strong></p></div>
    <div className="space-y-4"><h3 className="text-white text-lg font-bold">Contact</h3><p>📧 {CONTACT_EMAIL}</p></div>
  </LegalPage>
);

const TermsPage = () => (
  <LegalPage title="Terms of Service" icon={<Scale size={36} />}>
    <p className="text-white font-semibold text-lg">EMKE Seismic Isolation LLC</p>
    <p>By using the Service, you agree to these Terms.</p>
    <GlowingBorder><div className="p-8 bg-zinc-900/50 rounded-3xl border border-white/5"><h3 className="text-green-400 text-lg font-bold mb-4">Health Disclaimer</h3><p className="text-zinc-300">Not a substitute for professional medical advice. Consult a healthcare professional before starting any exercise program.</p></div></GlowingBorder>
    <div className="space-y-4"><h3 className="text-white text-lg font-bold">Contact</h3><p>📧 {CONTACT_EMAIL}</p></div>
  </LegalPage>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [pathname]);
  return null;
};

export default function EmkeWebsite() {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-black text-zinc-300 font-sans selection:bg-green-500 selection:text-black antialiased overflow-x-hidden">
      <ScrollToTop />
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <motion.div key={location.pathname} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/apps" element={<AppsPage />} />
              <Route path="/trackr" element={<TrackrPage />} />
              <Route path="/vision" element={<VisionPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
