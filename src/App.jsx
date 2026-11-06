import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, Link, useNavigate, useLocation, useParams } from 'react-router-dom';
import { 
  Download, Mail, Smartphone, Zap, Shield, Globe, ArrowRight, Menu, X,
  CheckCircle2, MessageSquare, ShieldCheck, Scale, Activity, Star, Play,
  ChevronDown, Sparkles, Timer, Dumbbell, LineChart, Target, Camera,
  TrendingUp, Award, Calendar, BarChart3, Image, Trophy, Flame,
  Phone, MapPin, Instagram, Linkedin, Users, Eye, Heart, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useInView } from 'framer-motion';
import { posts } from './blog/posts.jsx';

const CONTACT_EMAIL = "info@emke.app";
const EFFECTIVE_DATE = "01/30/2026";
const PRIVACY_EFFECTIVE_DATE = "November 6, 2026";
const PRIVACY_EFFECTIVE_DATE_TR = "6 Kasım 2026";
const STEEL_EFFECTIVE_DATE = "11/06/2026";
const THICKET_EFFECTIVE_DATE = "09/18/2026";

// Trackr Logo - uses image
const TrackrLogo = ({ className = "w-12 h-12" }) => (
  <img src="/trackr-logo.png" alt="Trackr" className={`${className} object-contain`} />
);

// Game icons are full bleed, so they sit smaller than the box to match Trackr's padded logo
const GameIcon = ({ src, alt }) => (
  <div className="w-14 h-14 mb-6 flex items-center justify-center">
    <img src={src} alt={alt} width="256" height="256" className="w-11 h-11 rounded-[10px] shadow-lg shadow-black/40" />
  </div>
);

// Apple Store Button with accurate logo
const APP_STORE_URL = "https://apps.apple.com/app/id6759034748";
const PLAY_STORE_URL = "https://play.google.com/store/apps/details?id=app.emkellc.trackr";

const THICKET_STORE_URL = "https://apps.apple.com/app/id6813253249";
const STEEL_STORE_URL = "https://apps.apple.com/app/id6812870342";

const AppStoreButton = ({ className = "", href = APP_STORE_URL, app = "Trackr" }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`Download ${app} on the App Store`} className={`flex items-center gap-3 bg-white text-black px-6 py-4 rounded-2xl font-bold hover:bg-zinc-100 hover:-translate-y-0.5 active:translate-y-0 transition-transform duration-200 ${className}`}>
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
    </svg>
    <div className="text-left">
      <div className="text-[10px] leading-tight opacity-60">Download on the</div>
      <div className="text-lg font-bold leading-tight -mt-0.5">App Store</div>
    </div>
  </a>
);

// Google Play Button with accurate colorful logo
const PlayStoreButton = ({ className = "" }) => (
  <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" aria-label="Get Trackr on Google Play" className={`flex items-center gap-3 bg-white text-black px-6 py-4 rounded-2xl font-bold hover:bg-zinc-100 hover:-translate-y-0.5 active:translate-y-0 transition-transform duration-200 ${className}`}>
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
  </a>
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
        <span className="text-green-300 text-sm font-semibold">4 kg lost</span>
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
  const navLinks = [{ name: 'Apps', id: 'apps', path: '/apps' }, { name: 'Vision', id: 'vision', path: '/vision' }, { name: 'Trackr', id: 'trackr', path: '/trackr' }, ...(posts.length ? [{ name: 'Blog', id: 'blog', path: '/blog' }] : [])];

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
                <Link key={link.id} to={link.path} className={`relative px-5 py-2 text-[13px] font-semibold transition-all duration-300 rounded-full ${activePage === link.id ? 'text-black' : 'text-zinc-400 hover:text-white'}`}>
                  {activePage === link.id && <motion.div layoutId="navPill" className="absolute inset-0 bg-green-500 rounded-full" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />}
                  <span className="relative z-10">{link.name}</span>
                </Link>
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
        <p className="text-xl text-zinc-500 mb-10 max-w-xl mx-auto">Start tracking your progress with precision.</p>
        <MagneticButton onClick={() => navigate('/trackr')} className="px-10 py-5 bg-green-500 text-black font-bold rounded-full text-lg hover:bg-green-400 transition-colors inline-flex items-center gap-3">Get Started <ArrowRight size={20} /></MagneticButton>
      </motion.div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-2">
          <span className="text-3xl font-black tracking-tight text-white">emke<span className="text-green-500">.</span></span>
          <p className="text-zinc-500 max-w-sm font-medium leading-relaxed mt-6 text-lg">Building the next generation of minimalist performance tools.</p>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-sm">Platform</h4>
          <ul className="space-y-3">{['Trackr App', 'Our Vision', 'Partner With Us'].map((item, i) => <li key={i}><Link to={['/trackr', '/vision', '/contact'][i]} className="text-zinc-500 hover:text-green-400 cursor-pointer transition-colors">{item}</Link></li>)}</ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-6 text-sm">Legal</h4>
          <ul className="space-y-3">{['Privacy Policy', 'Gizlilik Politikası (TR)', 'Terms of Service', 'Support'].map((item, i) => <li key={i}><Link to={['/privacy', '/privacy/tr', '/terms', '/support'][i]} className="text-zinc-500 hover:text-green-400 cursor-pointer transition-colors">{item}</Link></li>)}</ul>
          <h4 className="text-white font-bold mb-4 mt-8 text-sm">Contact</h4>
          <ul className="space-y-2">
            <li className="text-zinc-500 text-sm">+1 (775) 770-0677</li>
            <li className="text-zinc-500 text-sm">{CONTACT_EMAIL}</li>
          </ul>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-zinc-600 text-sm">© 2026 EMKE Seismic Isolation LLC. All rights reserved.</p>
        <div className="flex gap-4">
          {[
            { label: 'Instagram', href: 'https://instagram.com/emkeapp' },
            { label: 'LinkedIn', href: 'https://linkedin.com/company/emkeapp' },
            { label: 'TikTok', href: 'https://tiktok.com/@emkeapp' },
            { label: 'Twitter', href: 'https://x.com/emkeapp' },
            { label: 'Facebook', href: 'https://www.facebook.com/share/1B6dcYk5xv/?mibextid=wwXIfr' },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-green-400 cursor-pointer transition-colors text-sm">{s.label}</a>
          ))}
        </div>
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
                {['Automatic weight tagging on photos', 'Side by side comparison view', 'Premium: Cloud backup for switching phones', 'Export & share your journey'].map((item, i) => (
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
            <div className="flex items-center justify-between mb-8"><div><h3 className="text-2xl font-bold text-white">Weight Journey</h3><p className="text-zinc-300">Your transformation over time</p></div><div className="flex items-center gap-2 px-4 py-2 bg-green-500/25 rounded-full border border-green-500/40"><TrendingUp size={16} className="text-green-400" /><span className="text-green-400 font-bold">4 kg lost</span></div></div>
            <WeightTimeline />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 border-y border-white/5 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[{ value: '★ 5.0', label: 'App Store Rating' }, { value: 'Photos', label: 'Weight logged with pictures' }, { value: 'Every set', label: 'Workout tracking built in' }, { value: '1 Score', label: 'Your overall fitness, one number' }].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-4xl md:text-6xl font-black text-white mb-2">{stat.value}</div>
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
                {[{ icon: <Camera size={18} />, text: 'Photo progress with weight sync' }, { icon: <Scale size={18} />, text: 'Smart weight tracking' }, { icon: <Trophy size={18} />, text: 'Overall fitness score' }, { icon: <BarChart3 size={18} />, text: 'Exercise by exercise analytics' }].map((item, i) => (
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
                  <div className="w-56 h-56 md:w-64 md:h-64 rounded-[40px] bg-black shadow-2xl border border-white/10 flex items-center justify-center overflow-hidden"><img src="/icon_center.png" alt="Trackr" className="w-48 h-48 md:w-56 md:h-56 object-contain" /></div>
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
            <div className="relative"><div className="absolute inset-0 bg-gradient-to-br from-green-500/30 via-transparent to-emerald-500/30 rounded-[60px] blur-3xl" /><div className="relative aspect-[3/4] max-w-md mx-auto rounded-[60px] bg-gradient-to-br from-zinc-800 to-zinc-900 p-3 shadow-2xl border border-white/10"><div className="w-full h-full rounded-[52px] bg-black overflow-hidden flex items-center justify-center"><img src="/icon_center.png" alt="Trackr" className="w-64 h-64 md:w-80 md:h-80 object-contain" /></div><div className="absolute top-6 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full" /></div></div>
          </motion.div>
        </div>
      </div>
    </section>

    {/* Founder transformation — the real story behind Trackr */}
    <section className="py-32 px-6 relative bg-gradient-to-b from-black via-zinc-950 to-zinc-900/40 border-y border-white/10">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/25 border border-green-500/40 rounded-full text-green-400 text-sm font-semibold mb-6"><Trophy size={14} /> Why we built Trackr</span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">120 kg to 72 kg.<br className="hidden md:block" /> One photo at a time.</h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">Our founder lost 48 kg by tracking every weight entry and every progress photo. Trackr is the tool he wished he had the whole way.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Before / After */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-2 gap-4">
            {[{ src: '/founder-before.jpg', tag: 'Before', kg: '120 kg', tone: 'text-zinc-300 bg-black/60 border-white/15', pos: 'object-[22%_38%]' }, { src: '/founder-after.jpg', tag: 'After', kg: '72 kg', tone: 'text-green-400 bg-green-500/15 border-green-500/40', pos: 'object-center' }].map((img, i) => (
              <div key={i} className="relative rounded-[28px] overflow-hidden border border-white/10 shadow-2xl">
                <img src={img.src} alt={`Founder ${img.tag}`} className={`w-full h-full object-cover aspect-[3/4] ${img.pos}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4"><span className="px-3 py-1 rounded-full bg-black/60 border border-white/15 text-white text-xs font-bold uppercase tracking-wide">{img.tag}</span></div>
                <div className="absolute bottom-4 left-4"><span className={`px-3 py-1.5 rounded-full border text-sm font-black ${img.tone}`}>{img.kg}</span></div>
              </div>
            ))}
          </motion.div>

          {/* Founder quote */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="flex">
            <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur-xl rounded-[36px] border border-white/15 p-10 flex flex-col justify-center shadow-2xl w-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/15 border border-green-500/30"><TrendingUp size={16} className="text-green-400" /><span className="text-green-400 font-black">48 kg lost</span></div>
              </div>
              <p className="text-2xl md:text-3xl text-white font-semibold leading-snug mb-8">"I went from 120 kg to 72 kg by staying consistent and tracking my progress. Trackr is everything I needed in one place, so you can do it too."</p>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-green-500 text-black font-black flex items-center justify-center text-lg">E</div>
                <div><div className="text-white font-bold">Kerim Efe Ozcanli</div><div className="text-zinc-400 text-sm">Founder, Trackr</div></div>
              </div>
              <div className="flex flex-wrap gap-4">
                <AppStoreButton />
                <PlayStoreButton />
              </div>
            </div>
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
          <div className="flex items-center justify-between mb-8"><div><h3 className="text-2xl font-bold text-white">Weight Journey</h3><p className="text-zinc-300">Track bodyweight</p></div><div className="flex items-center gap-2 px-4 py-2 bg-green-500/25 rounded-full border border-green-500/40"><TrendingUp size={16} className="text-green-400" /><span className="text-green-400 font-bold">4 kg lost</span></div></div>
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
        <p>At <span className="text-white font-bold">emke</span>, we believe technology should be an <span className="text-green-400">invisible partner</span> in your growth. Never the distraction, always the foundation.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
          {[
            { title: 'Decade of Experience', desc: 'Built by athletes and engineers who actually understand what it takes to measure real progress.', icon: <Award size={24} className="text-green-400" /> },
            { title: 'Minimalist Philosophy', desc: "If a feature doesn't directly help you improve, it has no place in our apps.", icon: <Target size={24} className="text-green-400" /> },
            { title: 'Privacy First', desc: 'Your data belongs to you. Photos stay on your device, and we will never sell your information.', icon: <Shield size={24} className="text-green-400" /> },
            { title: 'Data Over Noise', desc: 'Clean, powerful analytics that tell you exactly where you stand and where you\'re going.', icon: <BarChart3 size={24} className="text-green-400" /> },
          ].map((item, i) => (
            <GlowingBorder key={i}><div className="p-10 rounded-[32px] bg-zinc-900/50 border border-white/5 h-full">
              <div className="mb-4">{item.icon}</div>
              <h4 className="text-white font-bold text-xl mb-4">{item.title}</h4>
              <p className="text-zinc-500">{item.desc}</p>
            </div></GlowingBorder>
          ))}
        </div>

        <div className="py-8">
          <h3 className="text-3xl font-black text-white mb-6">The Problem We Solve</h3>
          <p>Fitness apps today are bloated with social features, gamification gimmicks, and data you don't need. They're designed to keep you scrolling, not to keep you lifting. We took a different approach. <span className="text-green-400">Strip everything down to what actually matters</span>: your weight, your photos, your exercises, your progress.</p>
        </div>

        <div className="py-8">
          <h3 className="text-3xl font-black text-white mb-6">Where We're Going</h3>
          <p>Trackr is just the beginning. We're building an ecosystem of minimalist performance tools, each one focused on a single goal. No feature bloat, no unnecessary complexity. Just <span className="text-white font-semibold">clean, private, powerful</span> tools that help you become the best version of yourself.</p>
        </div>

        <GlowingBorder><div className="p-10 rounded-[32px] bg-zinc-900/50 border border-white/5 text-center">
          <p className="text-2xl text-white font-bold mb-4">"Build tools that disappear into the background<br/>and let performance speak."</p>
          <p className="text-zinc-500">The EMKE Philosophy</p>
        </div></GlowingBorder>

        <p>Building a <span className="text-white font-semibold">new standard</span> for performance data. <span className="text-green-400">Clean. Private. Powerful.</span></p>
      </motion.div>
    </div></section>
  </div>
);

const TURNSTILE_SITEKEY = '0x4AAAAAAE5yIWcOa7V9n5ik';

// Gorunmez Turnstile. Sayfaya hicbir sey cizmez, arka planda token uretir. Bu token
// olmadan /api/contact 403 doner, yani sayfayi hic acmayan bot oradan gecemez.
// callback her zaman tetiklenmiyor, dogru okuma yolu getResponse.
const useTurnstile = (containerRef) => {
  const widgetId = useRef(null);
  const token = useRef('');

  useEffect(() => {
    let cancelled = false;
    const render = () => {
      if (cancelled || !containerRef.current || !window.turnstile || widgetId.current !== null) return;
      widgetId.current = window.turnstile.render(containerRef.current, {
        sitekey: TURNSTILE_SITEKEY,
        callback: (t) => { token.current = t; },
        'error-callback': () => { token.current = ''; },
        'expired-callback': () => {
          token.current = '';
          if (widgetId.current !== null) window.turnstile.reset(widgetId.current);
        },
      });
    };
    if (window.turnstile) {
      render();
    } else if (!document.getElementById('cf-turnstile-script')) {
      const s = document.createElement('script');
      s.id = 'cf-turnstile-script';
      s.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onEmkeTurnstileLoad&render=explicit';
      s.async = true;
      s.defer = true;
      window.onEmkeTurnstileLoad = render;
      document.head.appendChild(s);
    } else {
      window.onEmkeTurnstileLoad = render;
    }
    return () => { cancelled = true; };
  }, [containerRef]);

  return () => new Promise((resolve) => {
    if (!window.turnstile || widgetId.current === null) return resolve(token.current || '');
    let tries = 0;
    const poll = () => {
      let t = '';
      try { t = window.turnstile.getResponse(widgetId.current) || ''; } catch (e) { t = ''; }
      if (t) return resolve(t);
      if (token.current) return resolve(token.current);
      if (tries === 0) { try { window.turnstile.execute(widgetId.current); } catch (e) { /* yoksay */ } }
      if (++tries > 60) return resolve('');
      setTimeout(poll, 100);
    };
    poll();
  });
};

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '', website: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const loadedAt = useRef(Date.now());
  const tsRef = useRef(null);
  const getTurnstileToken = useTurnstile(tsRef);
  // Turkish browsers get the privacy notice in Turkish, linking the KVKK text.
  // Decided after mount so the prerendered HTML and the first client render match.
  const [isTr, setIsTr] = useState(false);
  useEffect(() => {
    try { setIsTr(/^tr\b/i.test(navigator.language || (navigator.languages && navigator.languages[0]) || '')); } catch (_) {}
  }, []);

  const clear = () => setFormData({ name: '', email: '', message: '', website: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Bota hata gosterme, sessizce basarili gibi davran. Ayni kontroller sunucuda da var.
    if (formData.website.trim() !== '' || Date.now() - loadedAt.current < 4000) {
      setSubmitted(true); clear(); return;
    }
    if (formData.message.trim().length < 20 || formData.name.trim().length < 2) {
      setError('Please add a little more detail so we can reply properly.'); return;
    }
    setSending(true);
    try {
      // Hedef adres artik sayfada degil, api/contact.js icinde.
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          // Formdaki tum sorularin adi ve sirasi; bos birakilanlar da bildirimde gorunsun.
          field_order: ['name', 'email', 'message'],
          elapsed_ms: Date.now() - loadedAt.current,
          turnstile_token: await getTurnstileToken(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (response.ok && result.ok === true) { setSubmitted(true); clear(); }
      else setError('That did not go through. Please email ' + CONTACT_EMAIL + ' directly.');
    } catch (err) {
      setError('That did not go through. Please email ' + CONTACT_EMAIL + ' directly.');
    } finally {
      setSending(false);
    }
  };

  return (
  <div className="relative min-h-screen"><GridPattern /><FloatingOrb size={600} className="top-40 right-0" />
    <section className="pt-40 pb-32 px-6"><div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20">
      <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }}>
        <h1 className="text-6xl md:text-7xl font-black text-white tracking-tight mb-8 leading-[0.95]"><AnimatedText text="Let's build together." delay={0.2} /></h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-xl text-zinc-400 mb-12">Have an app idea? Want to partner with us? We're always open to collaborations.</motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="space-y-6">
          <a href="tel:+17757700677" className="flex items-center gap-5 text-white group"><div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-green-500/10 group-hover:border-green-500/30 transition-colors"><Phone size={24} /></div><div><span className="text-lg font-semibold group-hover:text-green-400 transition-colors block">+1 (775) 770-0677</span><span className="text-zinc-500 text-sm">Mon to Fri, 9AM to 6PM PST</span></div></a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-5 text-white group"><div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-green-500/10 group-hover:border-green-500/30 transition-colors"><Mail size={24} /></div><div><span className="text-lg font-semibold group-hover:text-green-400 transition-colors block">{CONTACT_EMAIL}</span><span className="text-zinc-500 text-sm">We respond within 24 to 48 business hours</span></div></a>
          <div className="flex items-center gap-5 text-white group cursor-pointer"><div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-green-500/10 group-hover:border-green-500/30 transition-colors"><MapPin size={24} /></div><div><span className="text-lg font-semibold group-hover:text-green-400 transition-colors block">Reno, Nevada</span><span className="text-zinc-500 text-sm">Serving users worldwide</span></div></div>
        </motion.div>
        
        {/* Social Media */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-12">
          <h3 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4">Follow Us</h3>
          <div className="flex gap-3">
            {[
              { icon: <Instagram size={20} />, label: 'Instagram', href: 'https://instagram.com/emkeapp' },
              { icon: <Linkedin size={20} />, label: 'LinkedIn', href: 'https://linkedin.com/company/emkeapp' },
              { icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.56a8.18 8.18 0 0 0 4.77 1.52V6.69h-1.01z"/></svg>, label: 'TikTok', href: 'https://tiktok.com/@emkeapp' },
              { icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>, label: 'X', href: 'https://x.com/emkeapp' },
              { icon: <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>, label: 'Facebook', href: 'https://www.facebook.com/share/1B6dcYk5xv/?mibextid=wwXIfr' },
            ].map((social, i) => (
              <a key={i} href={social.href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-green-400 hover:bg-green-500/10 hover:border-green-500/30 transition-all" title={social.label}>{social.icon}</a>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
        <GlowingBorder><div className="bg-zinc-900/50 backdrop-blur-xl p-10 md:p-14 rounded-[40px] border border-white/5">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={40} className="text-green-400" /></div>
              <h3 className="text-3xl font-black text-white mb-4">Message Sent!</h3>
              <p className="text-zinc-400">Thank you! We'll get back to you within 24 to 48 business hours.</p>
              <button onClick={() => setSubmitted(false)} className="mt-8 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-zinc-400 hover:text-white transition-colors">Send Another</button>
            </div>
          ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" value={formData.website} onChange={e => setFormData({...formData, website: e.target.value})} style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }} />
            <div ref={tsRef} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2"><label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Name</label><input type="text" name="name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-600 focus:border-green-500/50 outline-none transition-all" placeholder="John Doe" required /></div>
              <div className="space-y-2"><label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Email</label><input type="email" name="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-600 focus:border-green-500/50 outline-none transition-all" placeholder="john@example.com" required /></div>
            </div>
            <div className="space-y-2"><label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Message</label><textarea rows={5} name="message" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-black/50 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-600 focus:border-green-500/50 outline-none transition-all resize-none" placeholder="Tell us about your project or idea..." required /></div>
            {error && <p className="text-red-400 text-sm text-center">{error}</p>}
            <button type="submit" disabled={sending} className="block w-full py-5 bg-green-500 text-black font-bold rounded-2xl hover:bg-green-400 transition-colors text-lg text-center disabled:opacity-60">{sending ? 'Sending...' : 'Send Message'}</button>
            <p className="text-zinc-500 text-xs text-center">Your message goes directly to our team. We respond within 24 to 48 business hours.</p>
            <p className="text-zinc-500 text-xs text-center">
              {isTr
                ? <>Bu formu göndererek adının, e-postanın ve mesajının sana cevap vermek için işlenmesini kabul edersin. Mesajlar 12 ay saklanır. <Link to="/privacy/tr" className="text-green-400 hover:underline">Gizlilik politikası ve KVKK aydınlatma metni</Link>.</>
                : <>By sending this form you agree that we process your name, email and message to reply to you. Messages are kept for 12 months. <Link to="/privacy" className="text-green-400 hover:underline">Privacy policy</Link>.</>}
            </p>
          </form>
          )}
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
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} onClick={() => navigate('/steelsurvivor')} className="cursor-pointer group">
          <GlowingBorder><div className="p-10 rounded-[40px] bg-zinc-900/50 border border-white/5 h-full overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[100px] group-hover:bg-amber-500/20 transition-all duration-500" />
            <div className="relative z-10">
              <GameIcon src="/steelsurvivor-icon.png" alt="Steel Survivor" />
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-xs font-semibold mb-4"><CheckCircle2 size={12} />Out now on the App Store</div>
              <h3 className="text-3xl font-black text-white mb-4">Steel Survivor</h3>
              <p className="text-zinc-500 mb-4">One tank against a field full of them. Twelve missions, three stars each, and a build you put together one card at a time.</p>
              <div className="flex flex-wrap gap-2 mb-6">{['Campaign', 'Roguelite', 'Offline'].map((tag, i) => <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-zinc-400 text-xs">{tag}</span>)}</div>
              <span className="inline-flex items-center gap-2 text-green-500 font-semibold group-hover:gap-4 transition-all">Learn more <ArrowRight size={18} /></span>
            </div>
          </div></GlowingBorder>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} onClick={() => navigate('/thicket')} className="cursor-pointer group">
          <GlowingBorder><div className="p-10 rounded-[40px] bg-zinc-900/50 border border-white/5 h-full overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[100px] group-hover:bg-green-500/20 transition-all duration-500" />
            <div className="relative z-10">
              <GameIcon src="/thicket-icon.png" alt="Thicket" />
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-xs font-semibold mb-4"><CheckCircle2 size={12} />Out now on the App Store</div>
              <h3 className="text-3xl font-black text-white mb-4">Thicket</h3>
              <p className="text-zinc-500 mb-4">A stealth game about standing very still. Twenty four mazes, guards who draw their sight on the floor, and tall grass that hides you as long as you hold your breath.</p>
              <div className="flex flex-wrap gap-2 mb-6">{['Stealth', 'Puzzle', 'Offline'].map((tag, i) => <span key={i} className="px-3 py-1 bg-white/5 rounded-full text-zinc-400 text-xs">{tag}</span>)}</div>
              <span className="inline-flex items-center gap-2 text-green-500 font-semibold group-hover:gap-4 transition-all">Learn more <ArrowRight size={18} /></span>
            </div>
          </div></GlowingBorder>
        </motion.div>
      </div>
    </div></section>
  </div>
  );
};

const STEEL_SHOTS = [
  { src: '/steelsurvivor-campaign.jpg', alt: 'Steel Survivor campaign map with twelve missions and stars' },
  { src: '/steelsurvivor-fight.jpg', alt: 'Steel Survivor gameplay, a tank surrounded by enemy armour' },
  { src: '/steelsurvivor-cards.jpg', alt: 'Steel Survivor upgrade cards between waves' },
];

const SteelSurvivorPage = () => (
  <div className="relative min-h-screen"><GridPattern />
    <section className="pt-40 pb-24 px-6"><div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-xs font-semibold mb-6">
          <CheckCircle2 size={12} />Out now on the App Store
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">Steel Survivor</h1>
        <p className="text-xl text-zinc-500 max-w-2xl mx-auto">One tank against a field full of them. Twelve missions, three stars each, and a build you put together one card at a time.</p>
        <div className="flex justify-center mt-8"><AppStoreButton href={STEEL_STORE_URL} app="Steel Survivor" /></div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24 max-w-4xl mx-auto">
        {STEEL_SHOTS.map((shot, i) => (
          <div key={i} className="rounded-[28px] overflow-hidden border border-white/10 bg-zinc-900/50">
            <img src={shot.src} alt={shot.alt} width="620" height="1347" loading={i === 0 ? 'eager' : 'lazy'} className="w-full h-auto block" />
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {[
          { icon: <Target size={28} />, title: 'Cover is real', body: 'Enemy armour cannot see you through a wall, and you cannot shoot them through one either. Drive into the open and the whole line wakes up at once.' },
          { icon: <Trophy size={28} />, title: 'Three stars a mission', body: 'One for clearing it, one for finishing with half your hull, one for finishing without calling a repair. Stars open the next sector.' },
          { icon: <Flame size={28} />, title: 'A different tank every run', body: 'You start with a single gun and pick one card between waves. Weapons evolve. Nothing carries over except what you bought in the garage.' },
          { icon: <Shield size={28} />, title: 'No internet, no account', body: 'The whole game runs on the device. Nothing to sign up for, nothing to wait for. Play it on a plane.' },
        ].map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <div className="p-8 rounded-[32px] bg-zinc-900/50 border border-white/5 h-full">
              <div className="text-amber-500 mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-zinc-500 leading-relaxed">{f.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-20">
        <Link to="/steelsurvivor/privacy" className="text-zinc-500 hover:text-amber-500 transition-colors text-sm font-semibold">Steel Survivor privacy policy</Link>
      </div>
    </div></section>
  </div>
);

const LegalPage = ({ title, icon, date = EFFECTIVE_DATE, dateLabel = 'Effective Date', children }) => (
  <div className="relative min-h-screen"><GridPattern />
    <section className="pt-40 pb-32 px-6"><div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className="flex items-center gap-4 mb-6"><div className="text-green-500">{icon}</div><h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{title}</h1></div>
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-zinc-900 border border-white/10 text-xs font-semibold text-zinc-500">{dateLabel}: {date}</div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-8 text-zinc-400 leading-relaxed">{children}</motion.div>
    </div></section>
  </div>
);

const PROCESSORS = [
  { name: 'Google Firebase (Authentication, Firestore, Cloud Storage, Cloud Functions)', where: 'United States', what: 'Accounts and sign in, your cloud data, progress photos when Cloud Backup is on, and the automatic cleanup that runs when you delete your account.' },
  { name: 'Mixpanel', where: 'United States', what: 'Usage analytics: which features are used and when, tied to a pseudonymous user ID. Your name, email, weight and photos are never sent. You can turn this off in the App.' },
  { name: 'RevenueCat', where: 'United States', what: 'Subscription status for Trackr Pro, keyed by your user ID. Payment itself is handled by Apple or Google; we never see card numbers.' },
  { name: 'Apple (Sign in with Apple, App Store, Apple Health on your device)', where: 'United States', what: 'Optional sign in, purchases and refunds. Apple Health data stays on your device unless you turn sync on, and we never receive Health data from Apple.' },
  { name: 'Google (Google sign in, Google Play)', where: 'United States', what: 'Optional sign in, purchases and refunds on Android.' },
  { name: 'Vercel', where: 'United States', what: 'Hosting for the Website and the serverless endpoint behind the contact form.' },
  { name: 'Google Analytics 4', where: 'United States', what: 'Website traffic statistics. Loads only after you accept cookies if you are in the EEA, the UK, Switzerland or Turkey.' },
  { name: 'Cloudflare Turnstile', where: 'United States', what: 'Bot check on the contact form. Sees connection data such as your IP address to decide whether the sender is a person.' },
  { name: 'Resend', where: 'United States', what: 'Delivers contact form messages to our inbox at info@emke.app.' },
];

const PrivacyPage = () => (
  <LegalPage title="Privacy Policy" icon={<ShieldCheck size={36} />} date={PRIVACY_EFFECTIVE_DATE}>
    <p className="text-sm"><Link to="/privacy/tr" className="text-green-400 hover:underline font-semibold">Türkçe sürüm: Gizlilik Politikası ve KVKK Aydınlatma Metni</Link></p>
    <p className="text-white font-semibold text-lg">EMKE Seismic Isolation LLC</p>
    <p>This Privacy Policy explains how EMKE Seismic Isolation LLC ("we", "us", "our") collects, uses, shares and protects your information when you use the Trackr mobile application (the "App") and the emke.app website (the "Website"). Steel Survivor and Thicket have their own, shorter policies, linked from their pages.</p>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">1. Who is responsible</h3>
    <p>EMKE Seismic Isolation LLC, Reno, Nevada, United States, is the data controller for the App and the Website. Contact: <strong className="text-green-400">{CONTACT_EMAIL}</strong>.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">2. Information we collect in the App</h3>
    <h4 className="text-green-400 font-semibold">Information you give us</h4>
    <ul className="list-disc pl-6 space-y-2">
      <li>Your name (optional) and email address, and a password that Firebase stores as a hash we cannot read</li>
      <li>Body weight entries, workouts, sets, reps and personal records, notes and daily goals</li>
      <li>Progress photos. By default they stay on your device only; with Cloud Backup they are uploaded to Firebase Storage</li>
      <li>Messages or feedback you send to us</li>
    </ul>
    <h4 className="text-green-400 font-semibold mt-4">Information from Apple or Google sign in</h4>
    <ul className="list-disc pl-6 space-y-2">
      <li>The account identifier, name and email that Apple or Google return when you choose to sign in with them. Apple may give us a private relay address instead of your real email</li>
    </ul>
    <h4 className="text-green-400 font-semibold mt-4">Information collected automatically</h4>
    <ul className="list-disc pl-6 space-y-2">
      <li>Your Firebase user ID, which also serves as your Mixpanel and RevenueCat identifier</li>
      <li>Device model, operating system version, app version, language and country or region taken from your device settings. We do not collect GPS location</li>
      <li>Which features you use and when (for example "workout completed" or "entry created"), sent to Mixpanel unless you turn usage data sharing off</li>
      <li>Subscription status, trial start and purchase events from RevenueCat, Apple and Google. We never receive card numbers or billing addresses</li>
    </ul>
    <p>We do not collect precise location, contacts, browsing history, advertising identifiers or crash reports. The App contains no crash reporting or advertising software.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">3. How we use your information</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li>To provide the App: store your entries, show charts, calculate your progress and fitness score</li>
      <li>To sync your data across devices when you turn on Cloud Backup</li>
      <li>To manage your subscription and restore purchases</li>
      <li>To answer your support requests</li>
      <li>To understand which features are used so we can improve the App (usage analytics, optional)</li>
      <li>To keep the service secure and prevent abuse</li>
      <li>To meet legal obligations</li>
    </ul>
    <GlowingBorder><div className="p-6 bg-zinc-900/50 rounded-3xl border border-white/5 mt-4"><p className="text-green-400 font-bold">We do not sell, rent or trade your personal data, and we do not share it with advertisers or data brokers.</p></div></GlowingBorder></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">4. Service providers and where your data is stored</h3>
    <p>We run the App and the Website on the services below. Each one processes data only on our instructions, under a data processing agreement, and only to provide its service to us.</p>
    <ul className="list-disc pl-6 space-y-3">
      {PROCESSORS.map((p, i) => (
        <li key={i}><strong className="text-white">{p.name}</strong>, {p.where}. {p.what}</li>
      ))}
    </ul>
    <p><strong className="text-white">All of your data is stored in the United States.</strong> If you use Trackr or the Website from outside the United States, including the European Union, the United Kingdom or Turkey, your data is transferred to and stored in the United States. For users in the EEA and the UK the transfer relies on the providers' standard contractual clauses and, where applicable, the EU-US Data Privacy Framework. For users in Turkey the transfer relies on your explicit consent and on the fact that it is necessary to perform the service you asked for; the details are in the <Link to="/privacy/tr" className="text-green-400 hover:underline">Turkish KVKK text</Link>.</p>
    <p>Beyond these providers we disclose data only when the law requires it (for example a valid subpoena), to protect our rights and the safety of users, or as part of a merger or sale of the business, in which case you will be told before your data changes hands.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">5. Photo storage</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong className="text-white">By default</strong> progress photos are stored on your device only and never leave it</li>
      <li><strong className="text-white">With Cloud Backup</strong> (Trackr Pro) photos are uploaded to Firebase Storage in the United States, encrypted in transit and at rest, and readable only by your signed in account</li>
      <li>Photos are never shared with other users, used for marketing, or used to train any model</li>
      <li>You can delete any photo in the App at any time. Deleting your account deletes every photo in the cloud</li>
    </ul></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">6. Your analytics choices</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong className="text-white">In the App:</strong> Profile, then "Share anonymous usage data". It is on by default. Turning it off stops Mixpanel immediately, including on the current session</li>
      <li><strong className="text-white">On the Website:</strong> the cookie banner. In the EEA, the UK, Switzerland and Turkey analytics cookies stay off until you accept. Everywhere else they are on by default and the banner lets you decline. Your choice is stored in your browser and can be changed by clearing site data</li>
    </ul></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">7. Security</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li>All connections between the App, the Website and our providers use TLS</li>
      <li>Data in Firebase is encrypted at rest by Google Cloud</li>
      <li>Firestore and Storage rules allow each account to read and write only its own data</li>
      <li>Payment details are handled by Apple and Google and never reach us</li>
      <li>Access to production data is limited to the owner of the company</li>
    </ul></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">8. How long we keep data</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong className="text-white">Account data</strong> (profile, entries, workouts, photos in the cloud) is kept while your account exists. When you delete your account a Cloud Function removes your Firebase account, your user record, workouts, backups and photos right away; residual copies in provider backups are gone within 30 days</li>
      <li><strong className="text-white">Cloud Backup data</strong> is deleted 3 days after a subscription or trial ends without renewal. Your local data on the device is not affected</li>
      <li><strong className="text-white">Usage analytics events</strong> in Mixpanel are kept for up to 24 months. You can ask us to delete your analytics profile sooner and we will do so within 30 days</li>
      <li><strong className="text-white">Subscription records</strong> in RevenueCat are deleted with your account. Apple and Google keep their own purchase records under their own policies</li>
      <li><strong className="text-white">Contact form messages</strong> are kept in our mailbox for 12 months, then deleted</li>
      <li><strong className="text-white">Website analytics</strong> in Google Analytics is kept for up to 14 months</li>
    </ul></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">9. Your rights</h3>
    <p>Wherever you live, you can:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong className="text-white">Access</strong> and receive a copy of your personal data</li>
      <li><strong className="text-white">Correct</strong> inaccurate data, in the App or by writing to us</li>
      <li><strong className="text-white">Delete</strong> your account and all data in the App: Profile, then Delete Account. For security you may be asked to sign in again first. If you signed in with Apple, we also revoke your Sign in with Apple tokens</li>
      <li><strong className="text-white">Export</strong> your entries in CSV from the App, or ask us for a copy</li>
      <li><strong className="text-white">Object to or restrict</strong> processing based on our legitimate interest, and <strong className="text-white">withdraw consent</strong> at any time (usage analytics, cookies, Cloud Backup, Apple Health sync)</li>
      <li><strong className="text-white">Complain</strong> to your data protection authority if you are in the EEA or the UK, or to the Personal Data Protection Authority (KVKK) if you are in Turkey</li>
    </ul>
    <p>Write to <strong className="text-green-400">{CONTACT_EMAIL}</strong>. We answer within 30 days and may ask you to confirm the email on your account before acting. We do not sell personal information, so there is nothing to opt out of under US state privacy laws.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">10. Children</h3>
    <p>Trackr is not intended for children under 13 (or under 16 where that is the age of digital consent). We do not knowingly collect personal information from children. If we learn that we have, we delete it promptly.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">11. Apple Health</h3>
    <p>If you turn on Apple Health sync, the App writes your weight entries and completed workouts into Apple Health on your device. The App does not read Health data back, and nothing from Apple Health is sent to our servers. Apple's privacy policy governs how Health data is stored on your device and in iCloud.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">12. The Website (emke.app)</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong className="text-white">Cookies.</strong> Google Analytics 4 sets the _ga and _ga_* cookies to count visits and pages. Your cookie choice is stored in your browser under the key cookie_consent and nowhere else. The Website sets no advertising cookies</li>
      <li><strong className="text-white">Consent.</strong> Google Consent Mode is set to "denied" by default for visitors in the EEA, the UK, Switzerland and Turkey, so Google Analytics receives nothing until you accept</li>
      <li><strong className="text-white">Contact form.</strong> When you send the form, your name, email address and message, together with technical anti-spam signals (time spent on the page, a Cloudflare Turnstile token and your IP address), go through our endpoint on Vercel to Resend, which delivers them to info@emke.app. We use them only to reply to you. Messages are kept for 12 months</li>
      <li><strong className="text-white">Server logs.</strong> Vercel keeps short lived request logs (IP address, user agent, URL) for operating and securing the service</li>
    </ul></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">13. Changes to this policy</h3>
    <p>When we change this policy in a meaningful way we update the effective date above and tell you in the App or by email. Continued use after the change means you accept the updated policy.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">14. Contact</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li>Email: {CONTACT_EMAIL}</li>
      <li>Phone: +1 (775) 770-0677</li>
      <li>Post: EMKE Seismic Isolation LLC, Reno, Nevada, United States</li>
    </ul></div>
  </LegalPage>
);

const PROCESSORS_TR = [
  { name: 'Google Firebase (Authentication, Firestore, Cloud Storage, Cloud Functions)', where: 'ABD', what: 'Hesap ve giriş, bulut verilerin, Bulut Yedekleme açıkken ilerleme fotoğrafların ve hesabını sildiğinde çalışan otomatik temizlik.' },
  { name: 'Mixpanel', where: 'ABD', what: 'Kullanım analizi: hangi özelliğin ne zaman kullanıldığı, takma ad niteliğindeki kullanıcı kimliğine bağlı. Adın, e-postan, kilon ve fotoğrafların hiç gönderilmez. Uygulamadan kapatabilirsin.' },
  { name: 'RevenueCat', where: 'ABD', what: 'Trackr Pro abonelik durumu, kullanıcı kimliğine bağlı. Ödemeyi Apple veya Google alır; kart bilgisi bize ulaşmaz.' },
  { name: 'Apple (Apple ile Giriş, App Store, cihazındaki Apple Sağlık)', where: 'ABD', what: 'İsteğe bağlı giriş, satın alma ve iade. Apple Sağlık verisi sen senkronizasyonu açmadıkça cihazında kalır; Apple’dan bize Sağlık verisi gelmez.' },
  { name: 'Google (Google ile Giriş, Google Play)', where: 'ABD', what: 'Android’de isteğe bağlı giriş, satın alma ve iade.' },
  { name: 'Vercel', where: 'ABD', what: 'Sitenin ve iletişim formunun arkasındaki sunucusuz uç noktanın barındırılması.' },
  { name: 'Google Analytics 4', where: 'ABD', what: 'Site trafik istatistikleri. Türkiye, AEA, Birleşik Krallık ve İsviçre’de yalnızca çerezleri kabul ettikten sonra yüklenir.' },
  { name: 'Cloudflare Turnstile', where: 'ABD', what: 'İletişim formunda bot kontrolü. Gönderenin insan olup olmadığına karar vermek için IP adresi gibi bağlantı verilerini görür.' },
  { name: 'Resend', where: 'ABD', what: 'İletişim formu mesajlarını info@emke.app kutumuza iletir.' },
];

const PrivacyTrPage = () => (
  <LegalPage title="Gizlilik Politikası ve KVKK Aydınlatma Metni" icon={<ShieldCheck size={36} />} date={PRIVACY_EFFECTIVE_DATE_TR} dateLabel="Yürürlük Tarihi">
    <p className="text-sm"><Link to="/privacy" className="text-green-400 hover:underline font-semibold">English version: Privacy Policy</Link></p>
    <p className="text-white font-semibold text-lg">EMKE Seismic Isolation LLC</p>
    <p>Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) 10. maddesi uyarınca hazırlanmıştır ve Trackr mobil uygulaması ("Uygulama") ile emke.app sitesi ("Site") üzerinden işlenen kişisel verilerini açıklar. İngilizce politika ile aynı içeriği taşır; iki metin arasında fark olursa Türkiye’deki kullanıcılar için bu metin esas alınır.</p>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">1. Veri Sorumlusu</h3>
    <p>EMKE Seismic Isolation LLC, Reno, Nevada, Amerika Birleşik Devletleri. E-posta: <strong className="text-green-400">{CONTACT_EMAIL}</strong>. Şirket Türkiye’de yerleşik değildir; KVKK kapsamındaki tüm başvurular bu e-posta adresi üzerinden alınır.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">2. İşlenen Kişisel Veriler</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong className="text-white">Kimlik:</strong> ad (isteğe bağlı)</li>
      <li><strong className="text-white">İletişim:</strong> e-posta adresi; Apple ile girişte Apple’ın verdiği gizli aktarma adresi olabilir</li>
      <li><strong className="text-white">Hesap bilgileri:</strong> Firebase kullanıcı kimliği, şifrenin bizim okuyamadığımız özeti, Apple veya Google hesap kimliği</li>
      <li><strong className="text-white">Sağlık ve fitness verileri (özel nitelikli):</strong> kilo girişleri, antrenmanlar, set, tekrar ve rekorlar, notlar, günlük hedefler</li>
      <li><strong className="text-white">Görsel veriler:</strong> ilerleme fotoğrafları; varsayılan olarak yalnızca cihazında, Bulut Yedekleme açıksa Firebase Storage’da</li>
      <li><strong className="text-white">Cihaz ve işlem güvenliği:</strong> cihaz modeli, işletim sistemi sürümü, uygulama sürümü, dil, cihaz ayarlarından alınan ülke veya bölge. GPS konumu toplanmaz</li>
      <li><strong className="text-white">Kullanım verileri:</strong> hangi özelliğin ne zaman kullanıldığı (Mixpanel); Uygulamadan kapatılabilir</li>
      <li><strong className="text-white">Abonelik ve satın alma:</strong> abonelik durumu, deneme başlangıcı ve satın alma olayları (RevenueCat, Apple, Google); kart bilgisi veya fatura adresi bize ulaşmaz</li>
      <li><strong className="text-white">Site:</strong> analitik çerez verileri, iletişim formunda ad, e-posta, mesaj ve bot kontrolü için sayfada geçirilen süre, Turnstile belirteci ve IP adresi</li>
      <li><strong className="text-white">Destek yazışmaları:</strong> bize gönderdiğin mesajlar ve geri bildirimler</li>
    </ul>
    <p>Hassas konum, rehber, tarama geçmişi, reklam kimliği ve çökme raporu toplanmaz. Uygulamada çökme raporlama veya reklam yazılımı yoktur.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">3. İşleme Amaçları</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li>Uygulamanın sunulması: girişlerin saklanması, grafikler, ilerleme ve fitness puanının hesaplanması</li>
      <li>Bulut Yedekleme açıkken verilerin cihazlar arasında senkronizasyonu</li>
      <li>Abonelik yönetimi ve satın almaların geri yüklenmesi</li>
      <li>Destek taleplerinin cevaplanması</li>
      <li>Hangi özelliklerin kullanıldığının anlaşılması ve Uygulamanın iyileştirilmesi (isteğe bağlı kullanım analizi)</li>
      <li>Hizmetin güvenliği ve kötüye kullanımın önlenmesi</li>
      <li>Hukuki yükümlülüklerin yerine getirilmesi</li>
    </ul>
    <GlowingBorder><div className="p-6 bg-zinc-900/50 rounded-3xl border border-white/5 mt-4"><p className="text-green-400 font-bold">Kişisel verilerin satılmaz, kiralanmaz, reklam verenlerle veya veri aracılarıyla paylaşılmaz.</p></div></GlowingBorder></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">4. Hukuki Sebepler (KVKK m.5 ve m.6)</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong className="text-white">Sözleşmenin kurulması ve ifası (m.5/2-c):</strong> hesap, girişler, senkronizasyon, abonelik yönetimi, destek</li>
      <li><strong className="text-white">Hukuki yükümlülük (m.5/2-ç):</strong> yasal taleplerin karşılanması</li>
      <li><strong className="text-white">Meşru menfaat (m.5/2-f):</strong> güvenlik, kötüye kullanımın önlenmesi; kullanım analizi için ayrıca Uygulamada kapatma seçeneği sunulur</li>
      <li><strong className="text-white">Açık rıza (m.5/1, m.6/2 ve m.9):</strong> kilo ve antrenman gibi sağlık verilerinin işlenmesi, fotoğrafların buluta yedeklenmesi, Apple Sağlık senkronizasyonu, Sitede analitik çerezler ve verilerin yurt dışına aktarılması. Açık rızanı dilediğin an geri alabilirsin; sağlık verileri için en kesin yol hesabını silmektir</li>
    </ul></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">5. Toplama Yöntemi</h3>
    <p>Veriler, Uygulama içindeki formlar ve girişler, Apple veya Google ile giriş, Uygulamanın ve cihazın otomatik olarak ürettiği teknik kayıtlar, Sitedeki çerezler ve iletişim formu aracılığıyla; tamamen veya kısmen otomatik yollarla elektronik ortamda toplanır.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">6. Aktarım ve Yurt Dışına Aktarım (m.8 ve m.9)</h3>
    <p>Uygulama ve Site aşağıdaki hizmet sağlayıcılar üzerinde çalışır. Her biri verileri yalnızca bizim talimatımızla, veri işleme sözleşmesi kapsamında ve yalnızca bize hizmet sunmak için işler.</p>
    <ul className="list-disc pl-6 space-y-3">
      {PROCESSORS_TR.map((p, i) => (
        <li key={i}><strong className="text-white">{p.name}</strong>, {p.where}. {p.what}</li>
      ))}
    </ul>
    <p><strong className="text-white">Veri sorumlusu ABD’de yerleşiktir ve tüm veriler ABD’de saklanır.</strong> Uygulamayı veya Siteyi Türkiye’den kullandığında kişisel verilerin ABD’ye aktarılır. Bu aktarım KVKK m.9 kapsamında açık rızana ve talep ettiğin hizmetin ifası için zorunlu olmasına dayanır. Bunun dışında veriler yalnızca hukuken zorunlu olduğunda yetkili kamu kurum ve kuruluşlarına, haklarımızı ve kullanıcıların güvenliğini korumak için ya da şirketin devri halinde (önceden bilgilendirilerek) aktarılır.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">7. Saklama Süreleri</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong className="text-white">Hesap verileri</strong> (profil, girişler, antrenmanlar, buluttaki fotoğraflar) hesabın var olduğu sürece saklanır. Hesabını sildiğinde bir Cloud Function Firebase hesabını, kullanıcı kaydını, antrenmanlarını, yedeklerini ve fotoğraflarını hemen siler; sağlayıcı yedeklerindeki kalıntı kopyalar en geç 30 gün içinde yok olur</li>
      <li><strong className="text-white">Bulut Yedekleme verileri</strong> abonelik veya deneme yenilenmeden sona erdiğinde 3 gün sonra silinir. Cihazındaki yerel veriler etkilenmez</li>
      <li><strong className="text-white">Kullanım analizi olayları</strong> Mixpanel’de en fazla 24 ay saklanır. Analiz profilinin daha erken silinmesini istersen 30 gün içinde sileriz</li>
      <li><strong className="text-white">Abonelik kayıtları</strong> RevenueCat’te hesabınla birlikte silinir. Apple ve Google kendi satın alma kayıtlarını kendi politikalarına göre tutar</li>
      <li><strong className="text-white">İletişim formu mesajları</strong> posta kutumuzda 12 ay saklanır, sonra silinir</li>
      <li><strong className="text-white">Site analitik verileri</strong> Google Analytics’te en fazla 14 ay saklanır</li>
    </ul></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">8. Haklarınız (KVKK m.11)</h3>
    <p>Veri sorumlusuna başvurarak:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Kişisel verilerinin işlenip işlenmediğini öğrenme ve işlenmişse buna ilişkin bilgi talep etme</li>
      <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
      <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
      <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
      <li>KVKK m.7’deki şartlar çerçevesinde silinmesini veya yok edilmesini isteme</li>
      <li>Düzeltme, silme ve yok etme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme</li>
      <li>Münhasıran otomatik sistemlerle analiz edilmesi sonucu aleyhine bir sonucun ortaya çıkmasına itiraz etme</li>
      <li>Kanuna aykırı işleme nedeniyle zarara uğraman halinde zararın giderilmesini talep etme</li>
    </ul>
    <p><strong className="text-white">Başvuru yolu:</strong> <strong className="text-green-400">{CONTACT_EMAIL}</strong> adresine, konu satırına "KVKK Başvurusu" yazarak, hesabında kayıtlı e-posta adresinden yazabilirsin. Başvurular Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ uyarınca en geç 30 gün içinde ücretsiz olarak cevaplanır; kimliğini doğrulamak için hesabındaki e-postayı teyit etmeni isteyebiliriz. Başvurun reddedilir, cevap yetersiz kalır veya süresinde cevaplanmazsa Kişisel Verileri Koruma Kurulu’na şikâyet hakkın vardır.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">9. Hesap Silme</h3>
    <p>Uygulamada Profil, ardından Hesabı Sil adımını izle ve onay adımlarını tamamla. Güvenlik için yeniden giriş yapman istenebilir. Apple ile giriş yaptıysan hesabın silinirken Apple ile Giriş belirteçlerin de iptal edilir. Silme işlemi Firebase hesabını, tüm girişlerini, antrenmanlarını, yedeklerini ve buluttaki fotoğraflarını kaldırır ve geri alınamaz. Uygulamaya erişemiyorsan aynı talebi {CONTACT_EMAIL} adresine yazarak yapabilirsin; 30 gün içinde yerine getirilir.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">10. Kullanım Analizi Tercihi</h3>
    <p>Uygulamada Profil, ardından "Anonim kullanım verisi paylaş" anahtarı. Varsayılan olarak açıktır. Kapattığında Mixpanel’e veri gönderimi o anda durur. Sitede çerez tercihin tarayıcında saklanır; Türkiye’den gelen ziyaretçiler için analitik çerezler sen kabul etmeden açılmaz.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">11. Fotoğraflar ve Güvenlik</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li>İlerleme fotoğrafları varsayılan olarak yalnızca cihazındadır. Bulut Yedekleme (Trackr Pro) açıkken ABD’deki Firebase Storage’a aktarılır, aktarımda ve beklemede şifrelenir ve yalnızca kendi hesabın tarafından okunabilir</li>
      <li>Fotoğraflar başka kullanıcılarla paylaşılmaz, pazarlamada veya herhangi bir modelin eğitiminde kullanılmaz</li>
      <li>Uygulama, Site ve sağlayıcılar arasındaki tüm bağlantılar TLS ile şifrelenir; Firebase’deki veriler Google Cloud tarafından beklemede şifrelenir</li>
      <li>Firestore ve Storage kuralları her hesabın yalnızca kendi verisine erişmesine izin verir; üretim verisine erişim şirket sahibiyle sınırlıdır</li>
    </ul></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">12. Çocuklar</h3>
    <p>Trackr 13 yaşın altındaki çocuklara yönelik değildir. Çocuklardan bilerek kişisel veri toplamayız; öğrendiğimiz takdirde derhal sileriz.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">13. Site (emke.app) ve Çerezler</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li><strong className="text-white">Çerezler:</strong> Google Analytics 4, ziyaret ve sayfa sayımı için _ga ve _ga_* çerezlerini kullanır. Çerez tercihin tarayıcında cookie_consent anahtarıyla saklanır. Sitede reklam çerezi yoktur</li>
      <li><strong className="text-white">Onay:</strong> Türkiye, AEA, Birleşik Krallık ve İsviçre’den gelen ziyaretçiler için Google Consent Mode varsayılan olarak "reddedildi" durumundadır; kabul etmeden Google Analytics’e hiçbir veri gitmez</li>
      <li><strong className="text-white">İletişim formu:</strong> gönderdiğin ad, e-posta ve mesaj, bot kontrolü sinyalleriyle (sayfada geçirilen süre, Cloudflare Turnstile belirteci, IP adresi) birlikte Vercel’deki uç noktamız üzerinden Resend’e ve oradan info@emke.app adresine iletilir. Yalnızca sana cevap vermek için kullanılır ve 12 ay saklanır</li>
      <li><strong className="text-white">Sunucu kayıtları:</strong> Vercel, hizmetin işletilmesi ve güvenliği için kısa süreli istek kayıtları (IP adresi, tarayıcı bilgisi, URL) tutar</li>
    </ul></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">14. Değişiklikler ve İletişim</h3>
    <p>Bu metinde önemli bir değişiklik yaptığımızda yukarıdaki yürürlük tarihini güncelleriz ve Uygulama içinden veya e-postayla bildiririz.</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>E-posta: {CONTACT_EMAIL}</li>
      <li>Telefon: +1 (775) 770-0677</li>
      <li>Adres: EMKE Seismic Isolation LLC, Reno, Nevada, ABD</li>
    </ul></div>
  </LegalPage>
);

const SteelSurvivorPrivacyPage = () => (
  <LegalPage title="Steel Survivor Privacy Policy" icon={<ShieldCheck size={36} />} date={STEEL_EFFECTIVE_DATE}>
    <p className="text-white font-semibold text-lg">EMKE Seismic Isolation LLC</p>
    <p>This policy covers the game Steel Survivor: Tank War. It is separate from the Trackr policy because the game collects far less.</p>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">The short version</h3>
    <p>Steel Survivor has no accounts, no login, and no ads. It does not ask for your name, your email, your contacts, your photos, or your location. It does not use the advertising identifier and it does not track you across other apps or websites.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">What the game records</h3>
    <p>So that we can tell whether people keep playing, the game sends a small set of gameplay events to a server we run:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>A device identifier the game generates by itself on first launch. It is a random value stored on your device. It is not the Apple advertising identifier, it is not your device serial number, and it cannot be connected to you as a person.</li>
      <li>Session and gameplay information: when the app was opened, which mission was started, which wave was reached, whether the run was won or lost, which upgrade cards were picked, and whether a purchase was made.</li>
      <li>Basic device information: app version, platform, device model, operating system version, system language, and country.</li>
    </ul>
    <p>That is the whole list. There is nothing else.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">What we do with it</h3>
    <p>We count how many people come back the day after they install, and where in the game people stop playing. That is the only use. The data is not sold, not shared with advertisers, and not given to any third party analytics company. There is no advertising network in this version of the game.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">Where it is stored, and for how long</h3>
    <p>On our own server, hosted on Cloudflare. Nobody outside EMKE Seismic Isolation LLC has access to it. Event data is kept for 24 months and then deleted. Records tied to a device are deleted on request within 30 days.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">Purchases</h3>
    <p>Purchases are handled entirely by Apple. We never see your payment details. We only record that a purchase of a given product happened, so that we can tell which items people want.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">Children</h3>
    <p>The game has no chat, no user generated content, and no way to contact another player.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">Your choices</h3>
    <p>Deleting the app removes the identifier the game generated, and a reinstall creates a new one. If you would like the records associated with your device removed, write to us at {CONTACT_EMAIL} and we will delete them within 30 days.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">Contact</h3>
    <p>{CONTACT_EMAIL}</p></div>
  </LegalPage>
);

const THICKET_SHOTS = [
  { src: '/thicket-grass.jpg', alt: 'Thicket gameplay, a figure hiding in tall grass while a guard\'s cone of sight sweeps past' },
  { src: '/thicket-hound.jpg', alt: 'Thicket gameplay, a hound with a circle of scent instead of a cone' },
  { src: '/thicket-levels.jpg', alt: 'Thicket level picker with stars' },
];

const ThicketPage = () => (
  <div className="relative min-h-screen"><GridPattern />
    <section className="pt-40 pb-24 px-6"><div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-green-500 text-xs font-semibold mb-6">
          <CheckCircle2 size={12} />Out now on the App Store
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6">Thicket</h1>
        <p className="text-xl text-zinc-500 max-w-2xl mx-auto">A game about standing very still. Twenty four mazes, guards who can see you, and tall grass that hides you as long as you hold your breath.</p>
        <div className="flex justify-center mt-8"><AppStoreButton href={THICKET_STORE_URL} app="Thicket" /></div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24 max-w-4xl mx-auto">
        {THICKET_SHOTS.map((shot, i) => (
          <div key={i} className="rounded-[28px] overflow-hidden border border-white/10 bg-zinc-900/50">
            <img src={shot.src} alt={shot.alt} width="620" height="1347" loading={i === 0 ? 'eager' : 'lazy'} className="w-full h-auto block" />
          </div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {[
          { icon: <Eye size={28} />, title: 'You see what they see', body: 'Every guard draws his cone of sight on the floor. It stops where walls stop. Stay out of it and he never knows you were there.' },
          { icon: <Shield size={28} />, title: 'Grass hides you', body: 'Standing in tall grass makes you invisible to eyes, even to a guard looking straight at you. Hold still and he walks right past. Run through it and it stays bent behind you.' },
          { icon: <Target size={28} />, title: 'No weapons', body: 'You can take a man down from behind, and then you have a body to hide. Or you can walk around him. Every level can be finished without touching anyone.' },
          { icon: <Trophy size={28} />, title: 'Twenty four levels, three stars each', body: 'Lanterns that light the grass, a messenger who runs for the bell, a hound that finds you by smell, rain that hides your feet and kills your tricks. Offline, no account.' },
        ].map((f, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
            <div className="p-8 rounded-[32px] bg-zinc-900/50 border border-white/5 h-full">
              <div className="text-green-500 mb-4">{f.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-zinc-500 leading-relaxed">{f.body}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-20">
        <Link to="/thicket/privacy" className="text-zinc-500 hover:text-green-500 transition-colors text-sm font-semibold">Thicket privacy policy</Link>
      </div>
    </div></section>
  </div>
);

const ThicketPrivacyPage = () => (
  <LegalPage title="Thicket Privacy Policy" icon={<ShieldCheck size={36} />} date={THICKET_EFFECTIVE_DATE}>
    <p className="text-white font-semibold text-lg">EMKE Seismic Isolation LLC</p>
    <p>This policy covers the game Thicket: Stealth Escape. It is separate from the Trackr policy because the game collects nothing at all.</p>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">What the game collects</h3>
    <p>Nothing. Thicket does not create an account, does not ask for your name, email or location, and does not contain analytics or advertising software. It does not send anything about you or your play to us or to anyone else.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">What stays on your device</h3>
    <p>Your progress, meaning levels cleared, stars, coins, tools and coats, is stored on your device only, in the app's own storage. Deleting the app deletes it. We cannot see it and cannot restore it for you.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">Purchases</h3>
    <p>Purchases are handled entirely by Apple through the App Store. Apple processes the payment and keeps the purchase record. We receive no payment details and no personal information from Apple; the app only learns which items your Apple ID owns so that it can unlock them and restore them on a new device. Apple's own privacy policy applies to that transaction.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">Children</h3>
    <p>The game has no chat, no user generated content, no way to contact another player, and collects no information from anyone.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">Changes</h3>
    <p>If a future version starts collecting anything, this page will say what and why before that version ships.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">Contact</h3>
    <p>{CONTACT_EMAIL}</p></div>
  </LegalPage>
);

const TermsPage = () => (
  <LegalPage title="Terms of Service" icon={<Scale size={36} />}>
    <p className="text-white font-semibold text-lg">EMKE Seismic Isolation LLC</p>
    <p>Welcome to Trackr. These Terms of Service ("Terms") govern your access to and use of the Trackr mobile application and related services (the "Service") provided by EMKE Seismic Isolation LLC. By using the Service, you agree to be bound by these Terms.</p>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">1. Acceptance of Terms</h3>
    <p>By downloading, installing, or using Trackr, you acknowledge that you have read, understood, and agree to these Terms. If you do not agree, you must not use the Service.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">2. Description of Service</h3>
    <p>Trackr is a fitness tracking application that allows users to:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Record and track body weight with progress photos</li>
      <li>Log exercises, sets, reps, and personal records</li>
      <li>Monitor an overall fitness score based on consistency and progress</li>
      <li>View analytics and trends over time</li>
      <li>Access premium features through paid subscriptions</li>
    </ul></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">3. Account Registration</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li>You must provide accurate and complete information when creating an account</li>
      <li>You are responsible for maintaining the security of your account credentials</li>
      <li>You must be at least 13 years of age to use the Service</li>
      <li>One person may not maintain more than one account</li>
    </ul></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">4. Subscriptions & Payments</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li>Free features are available without a subscription</li>
      <li>Premium features require a paid subscription (monthly or annual)</li>
      <li>Subscriptions are billed through Apple App Store or Google Play Store</li>
      <li>Subscriptions renew automatically unless cancelled at least 24 hours before the current period ends</li>
      <li>You can manage subscriptions through your device's app store settings</li>
      <li>Refunds are handled by Apple/Google per their respective refund policies</li>
    </ul></div>

    <GlowingBorder><div className="p-8 bg-zinc-900/50 rounded-3xl border border-white/5"><h3 className="text-green-400 text-lg font-bold mb-4">⚕️ Health Disclaimer</h3><p className="text-zinc-300">Trackr is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare professional before starting any exercise program or making changes to your diet. The fitness scores, analytics, and recommendations provided are for informational purposes only and should not be relied upon as medical advice. If you experience any pain, discomfort, or health concerns during exercise, stop immediately and seek medical attention.</p></div></GlowingBorder>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">5. User Content</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li>You retain ownership of all content you create (photos, data, logs)</li>
      <li>You grant us a limited license to store and process your data to provide the Service</li>
      <li>You are solely responsible for the content you upload</li>
      <li>We reserve the right to remove content that violates these Terms</li>
    </ul></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">6. Prohibited Uses</h3>
    <p>You agree not to:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>Use the Service for any unlawful purpose</li>
      <li>Attempt to reverse engineer, decompile, or hack the application</li>
      <li>Upload malicious content or interfere with the Service's operation</li>
      <li>Create accounts using false or misleading information</li>
      <li>Share your account credentials with others</li>
    </ul></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">7. Intellectual Property</h3>
    <p>All rights, title, and interest in the Trackr app, including its design, code, logos, and branding, are owned by EMKE Seismic Isolation LLC. You may not copy, modify, distribute, or create derivative works without our written consent.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">8. Limitation of Liability</h3>
    <p>To the maximum extent permitted by law, EMKE Seismic Isolation LLC shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service. Our total liability shall not exceed the amount you paid for the Service in the 12 months preceding the claim.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">9. Termination</h3>
    <ul className="list-disc pl-6 space-y-2">
      <li>You may delete your account at any time through the app settings</li>
      <li>We may suspend or terminate your account for violation of these Terms</li>
      <li>Upon termination, your right to use the Service ceases immediately</li>
      <li>Data deletion follows our Privacy Policy retention schedule</li>
    </ul></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">10. Changes to Terms</h3>
    <p>We reserve the right to modify these Terms at any time. Material changes will be communicated through the app or via email. Your continued use of the Service after changes constitutes acceptance.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">11. Governing Law</h3>
    <p>These Terms are governed by and construed in accordance with the laws of the State of Nevada, United States. Any disputes will be resolved through binding arbitration in Reno, Nevada.</p></div>

    <div className="space-y-4"><h3 className="text-white text-lg font-bold">12. Contact</h3>
    <p>Questions about these Terms? Contact us:</p>
    <ul className="list-disc pl-6 space-y-2">
      <li>📧 Email: {CONTACT_EMAIL}</li>
      <li>📞 Phone: +1 (775) 770-0677</li>
      <li>🌐 Website: emke.app</li>
    </ul></div>
  </LegalPage>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/10 rounded-2xl overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} aria-expanded={isOpen} className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors">
        <span className="text-white font-semibold pr-4">{question}</span>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={20} className="text-green-400 shrink-0" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        <div className="px-5 pb-5 text-zinc-400 leading-relaxed">{answer}</div>
      </motion.div>
    </div>
  );
};

const SUPPORT_EMAIL = "support@emke.app";

const SupportPage = () => {
  const navigate = useNavigate();
  return (
  <div className="relative min-h-screen"><GridPattern />
    <section className="pt-40 pb-32 px-6"><div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <div className="flex items-center gap-4 mb-6"><div className="text-green-500"><HelpCircle size={36} /></div><h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">Support</h1></div>
        <p className="text-zinc-400 text-lg mb-6">Trackr v1.0</p>
      </motion.div>

      {/* Contact info at top - Apple requirement */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <GlowingBorder><div className="p-8 bg-zinc-900/50 rounded-3xl border border-white/5 mb-12">
          <h2 className="text-white text-xl font-bold mb-4">Need help? Reach out to us directly.</h2>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="inline-flex items-center gap-3 text-green-400 text-lg font-semibold hover:underline mb-3"><Mail size={20} />{SUPPORT_EMAIL}</a>
          <p className="text-zinc-500">We typically respond within 24 to 48 hours.</p>
        </div></GlowingBorder>
      </motion.div>

      {/* FAQ Section */}
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="space-y-12">

        <div>
          <h3 className="text-white text-lg font-bold mb-4">Getting Started</h3>
          <div className="space-y-3">
            <FAQItem question="How do I track my weight?" answer="Tap the '+' button on the home screen, enter your weight, and optionally add a photo. Your entry will appear on your timeline and charts immediately." />
            <FAQItem question="How do I take progress photos?" answer="When adding a new entry, tap the camera icon to take a photo or choose one from your gallery. You can compare your photos side by side in the Timeline tab." />
            <FAQItem question="How do I change the language?" answer="Go to Profile, then Language, and select your preferred language. Trackr is available in English, Spanish, Turkish, German, and French." />
          </div>
        </div>

        <div>
          <h3 className="text-white text-lg font-bold mb-4">Trackr Pro</h3>
          <div className="space-y-3">
            <FAQItem question="What is included in Trackr Pro?" answer="Trackr Pro includes unlimited progress photo storage, cloud backup that syncs across devices, advanced body measurement tracking, detailed analytics, and priority support." />
            <FAQItem question="How do I cancel my subscription?" answer="Open Settings on your device, tap your name, then Subscriptions, then Trackr, then Cancel Subscription. You'll keep Pro access until the end of your billing period." />
            <FAQItem question="Can I restore my purchases on a new device?" answer="Yes. Sign in with the same account you used to subscribe and your Pro status will be restored automatically. If it doesn't restore right away, go to Profile, then tap Restore Purchases." />
            <FAQItem question="How does cloud backup work?" answer="Pro users can enable cloud backup in Profile, then Cloud Backup. Your data syncs automatically across all devices signed into the same account." />
          </div>
        </div>

        <div>
          <h3 className="text-white text-lg font-bold mb-4">Privacy & Account</h3>
          <div className="space-y-3">
            <FAQItem question="Is my data private?" answer="Yes. We never sell your personal data. Progress photos are stored locally on your device by default. Cloud data is encrypted at rest by Google Cloud. You can turn off usage analytics in Profile." />
            <FAQItem question="How do I delete my account?" answer="Go to Profile, then Delete Account. This permanently removes all your data from our servers. This action cannot be undone." />
          </div>
        </div>

        <div>
          <h3 className="text-white text-lg font-bold mb-4">Troubleshooting</h3>
          <div className="space-y-3">
            <FAQItem question="The app is not working properly. What should I do?" answer={<span>Try closing and reopening the app. If the issue persists, make sure you have the latest version installed. If you still need help, email us at <a href={`mailto:${SUPPORT_EMAIL}`} className="text-green-400 hover:underline">{SUPPORT_EMAIL}</a> with a description of the problem.</span>} />
          </div>
        </div>

        {/* Bottom contact */}
        <div className="pt-8 border-t border-white/10">
          <h3 className="text-white text-lg font-bold mb-4">Still need help?</h3>
          <p className="text-zinc-400 mb-4">If you couldn't find what you're looking for, we're happy to help.</p>
          <div className="space-y-3">
            <a href={`mailto:${SUPPORT_EMAIL}`} className="flex items-center gap-3 text-zinc-300 hover:text-green-400 transition-colors"><Mail size={18} />{SUPPORT_EMAIL}</a>
            <a href="tel:+17757700677" className="flex items-center gap-3 text-zinc-300 hover:text-green-400 transition-colors"><Phone size={18} />+1 (775) 770-0677</a>
          </div>
          <p className="text-zinc-500 text-sm mt-4">We typically respond within 24 to 48 hours.</p>
          <div className="flex gap-4 mt-8">
            <span onClick={() => navigate('/privacy')} className="text-zinc-500 hover:text-green-400 cursor-pointer transition-colors text-sm">Privacy Policy</span>
            <span onClick={() => navigate('/terms')} className="text-zinc-500 hover:text-green-400 cursor-pointer transition-colors text-sm">Terms of Service</span>
          </div>
        </div>
      </motion.div>
    </div></section>
  </div>
  );
};

const BlogPage = () => (
  <div className="relative min-h-screen"><GridPattern />
    <section className="pt-40 pb-32 px-6"><div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-16">
        <h1 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4">Blog<span className="text-green-500">.</span></h1>
        <p className="text-xl text-zinc-500">Notes on tracking progress, training smarter, and building better habits.</p>
      </motion.div>
      {posts.length === 0 ? (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-zinc-500">New articles are on the way. In the meantime, take a look at <Link to="/trackr" className="text-green-400 hover:underline">Trackr</Link>.</motion.p>
      ) : (
        <div className="space-y-6">
          {posts.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Link to={`/blog/${post.slug}`} className="block bg-zinc-900/60 hover:bg-zinc-900 rounded-3xl border border-white/10 hover:border-green-500/40 p-8 transition-colors">
                <div className="text-xs font-semibold text-zinc-500 mb-3">{post.date} · {post.readingMinutes} min read</div>
                <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
                <p className="text-zinc-400 leading-relaxed">{post.description}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div></section>
  </div>
);

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);
  if (!post) return <BlogPage />;
  return (
    <div className="relative min-h-screen"><GridPattern />
      <section className="pt-40 pb-32 px-6"><article className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <Link to="/blog" className="text-sm font-semibold text-green-400 hover:underline">← All posts</Link>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mt-6 mb-4">{post.title}</h1>
          <div className="text-sm text-zinc-500">{post.date} · {post.readingMinutes} min read</div>
        </motion.div>
        {post.cover && (
          <figure className="mb-12 overflow-hidden rounded-xl border border-white/10 bg-zinc-900 shadow-[0_1px_2px_rgba(0,0,0,0.4),0_8px_24px_-6px_rgba(0,0,0,0.55),0_24px_60px_-18px_rgba(34,197,94,0.14)]">
            <img
              src={`${post.cover.src}-1536.webp`}
              srcSet={`${post.cover.src}-800.webp 800w, ${post.cover.src}-1536.webp 1536w`}
              sizes="(min-width: 816px) 768px, calc(100vw - 48px)"
              width="1536"
              height="1024"
              alt={post.cover.alt}
              fetchpriority="high"
              decoding="async"
              className="block w-full h-auto"
            />
          </figure>
        )}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="space-y-6 text-zinc-400 leading-relaxed [&_h2]:text-white [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-10 [&_h3]:text-white [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-8 [&_a]:text-green-400 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6">
          {post.body}
        </motion.div>
      </article></section>
    </div>
  );
};

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
              <Route path="/steelsurvivor" element={<SteelSurvivorPage />} />
              <Route path="/steelsurvivor/privacy" element={<SteelSurvivorPrivacyPage />} />
              <Route path="/thicket" element={<ThicketPage />} />
              <Route path="/thicket/privacy" element={<ThicketPrivacyPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/privacy/tr" element={<PrivacyTrPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/support" element={<SupportPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
