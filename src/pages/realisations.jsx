import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getServiceLink } from '../utils/serviceRoutes';
import {
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  Menu,
  X,
  Star,
  Wrench,
  Droplets,
  AlertTriangle,
  ChevronDown,
  Camera,
  Bath,
  FileText,
  Euro,
  Sparkles,
  Bot,
  Loader2,
  Siren,
  Send,
  Check,
  Mail,
  UploadCloud,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Maximize2
} from 'lucide-react';

// --- STYLES INJECTéS ---
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Montserrat:wght@400;500;600;700;800&display=swap');
  
  /* Animations existantes */
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-scroll {
    animation: scroll 40s linear infinite;
  }
  
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .animate-in {
    animation-duration: 300ms;
    animation-fill-mode: both;
  }
  .fade-in {
    animation-name: fadeIn;
  }
  .zoom-in-95 {
    animation-name: zoomIn95;
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes zoomIn95 {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;

// --- CONFIGURATION ---
const BRAND = {
  name: "Aqua&Deb",
  phoneDisplay: "0493 41 52 83",
  phoneLink: "tel:0493415283",
  email: "aquadeb22@gmail.com",
  logoUrl: "https://res.cloudinary.com/dw9jkwccj/image/upload/v1770971614/t%C3%A9l%C3%A9chargement_7_f8jwmb.png"
};

// --- IMAGES REALISATIONS ---
const REALIZATIONS = [
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142108/2025-07-29_vohdwv.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142108/2025-08-06_whopbd.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142108/2025-08-06_1_bzt1gn.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142108/2025-07-24_v2fniu.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142108/2025-08-03_qlmfhy.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142107/chauffe-eau-avant-apres_ncrzro.png",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142107/fuite-wc-avant-apres_pcejsa.png",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142107/2025-07-22_kvhscn.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142107/2025-07-24_2_yb3vi3.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142107/reparation-tuyauterie-avant-apres_xq3gnb.png"
];

// --- ICONS SOCIAL & CONTACT ---
const ICONS = {
  tiktok: "https://img.icons8.com/sf-regular-filled/48/tiktok.png",
  instagram: "https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/external-instagram-photo-and-video-sharing-social-networking-service-owned-by-facebook-logo-bold-tal-revivo.png",
  facebook: "https://img.icons8.com/ios-filled/50/facebook-new.png",
  phoneApple: "https://img.icons8.com/ios-filled/50/apple-phone.png",
  mapApple: "https://img.icons8.com/color/50/apple-map.png",
  mailApple: "https://img.icons8.com/ios-filled/50/new-post.png"
};

// --- DATA NAVIGATION ---
const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  {
    label: 'Nos Services',
    href: '/#services',
    type: 'mega',
    columns: [
      {
        title: 'Plomberie',
        desc: "Solutions complétes pour l'habitat",
        items: [
          'Dépannage fuites',
          'Dépannage sanitaires',
          'Dépannage chauffage',
          'Rénovation sanitaires',
          'Entretien',
          'Service de robinetterie',
          'Service de boiler / chauffe-eau',
          'Remplacement canalisation en grés',
          'Inspection caméra et recherche fuites'
        ]
      },
      {
        title: 'Débouchage',
        desc: 'Intervention haute pression',
        items: [
          'Débouchage WC & éviers',
          'Débouchage canalisations',
          'Inspection caméra',
          'Service de Débouchage égout',
          'Service de curage et entretien'
        ]
      }
    ]
  },
  { label: 'Réalisations', href: '/realisations' },
  {
    label: 'Zones',
    href: '/#zones',
    type: 'dropdown',
    items: [
      { label: 'Toutes nos zones', href: '/zones' },
      { label: 'Namur et alentours', href: '/zones/namur' },
      { label: 'Charleroi et alentours', href: '/zones/charleroi' },
      { label: 'Liége et alentours', href: '/zones/liege' },
      { label: 'Verviers et alentours', href: '/zones/verviers' },
      { label: 'Mons et alentours', href: '/zones/mons' },
      { label: 'Brabant Wallon & Flamand', href: '/zones/brabant-wallon-flamand' }
    ]
  },
  { label: 'Contact', href: '/contact' },
  { label: 'Urgence 24/7', href: BRAND.phoneLink, isButton: true }
];

// --- AI DIAGNOSTIC MODAL ---
const AiDiagnosticModal = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    const apiKey = "AIzaSyCaWqMWZSiZE1_0pOgpqHiRPwCMUxatiX8"; 
    const prompt = `Act as an expert plumber. Analyze this customer issue: "${description}".
    Respond in JSON format ONLY.
    
    You MUST suggest one or more specific page names from the exact list below that matches the user's problem.
    
    List of available service pages:
    - Dépannage fuites
    - Dépannage sanitaires
    - Dépannage chauffage
    - Rénovation sanitaires
    - Entretien
    - Service de robinetterie
    - Service de boiler / chauffe-eau
    - Remplacement de canalisation en grés
    - Inspection caméra et recherche de fuites
    - Débouchage WC & éviers
    - Débouchage de canalisations
    - Inspection caméra (Débouchage)
    - Service de débouchage d'égout

    JSON Response Schema:
    {
      "urgency": "Faible" | "Moyenne" | "Haute" | "Critique",
      "safety_tip": "Short immediate advice in French",
      "service_detected": "Name of the detected service in French",
      "estimated_intervention_time": "45 min",
      "suggested_services": ["Page Name 1", "Page Name 2"]
    }`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          }),
        }
      );
      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const jsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedResult = JSON.parse(jsonText);
      setResult(parsedResult);
    } catch (err) {
      setError("Une erreur est survenue.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6 text-cyan-300" />
            <h3 className="text-xl font-bold">Diagnostic Intelligent</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {!result ? (
            <>
              <p className="text-slate-600 mb-4 font-medium">
                Décrivez votre panne. L'IA vous dira quoi faire en attendant le technicien.
              </p>
              <textarea 
                className="w-full border-2 border-slate-200 rounded-xl p-4 min-h-[120px] focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none resize-none bg-slate-50 text-slate-800 font-medium"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <button 
                onClick={handleAnalyze}
                disabled={loading || !description.trim()}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg text-lg"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                {loading ? "Analyse en cours..." : "Lancer l'analyse"}
              </button>
            </>
          ) : (
            <div className="space-y-6">
              <div className={`p-5 rounded-xl border-l-8 ${result.urgency === 'Critique' || result.urgency === 'Haute' ? 'bg-red-50 border-red-600 text-red-900' : 'bg-green-50 border-green-600 text-green-900'}`}>
                <p className="text-3xl font-black">{result.urgency.toUpperCase()}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-slate-700 font-medium">{result.safety_tip}</p>
              </div>
              
              <div className="flex flex-col gap-3">
                <Link to="/contact" className="w-full bg-white border-2 border-slate-200 text-slate-800 hover:bg-slate-50 font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors text-lg">
                  <FileText className="w-5 h-5 text-blue-600" /> Demander un Devis Gratuit
                </Link>
                
                <a href={BRAND.phoneLink} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl animate-pulse text-xl">
                  <Phone className="w-6 h-6" /> Appeler le Technicien
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- LIGHTBOX COMPONENT ---
const Lightbox = ({ images = [], currentIndex, onClose, onPrev, onNext }) => {
  if (currentIndex === null || currentIndex === undefined) return null;
  const image = images[currentIndex];

  return (
    <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in">
      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full hover:bg-white/20 z-50"
      >
        <X className="w-8 h-8" />
      </button>

      <button
        onClick={onPrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 text-white p-3 rounded-full shadow-lg backdrop-blur z-50"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={onNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/25 text-white p-3 rounded-full shadow-lg backdrop-blur z-50"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      <div className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center">
        <img 
          src={image} 
          alt="Réalisation Fullscreen" 
          className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain animate-in zoom-in-95" 
        />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-white/80 bg-black/40 px-3 py-1 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

// --- 3D CAROUSEL COMPONENT ---
const Portfolio3D = ({ images, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(2); // Start middleish

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Auto-play (2500ms)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 2500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const getStyle = (index) => {
    let diff = (index - activeIndex);
    if (diff > images.length / 2) diff -= images.length;
    if (diff < -images.length / 2) diff += images.length;

    const isActive = diff === 0;
    const isPrev = diff === -1;
    const isNext = diff === 1;
    
    let style = {
      opacity: 0,
      transform: 'translateX(0) scale(0.5)',
      zIndex: 0,
      pointerEvents: 'none'
    };

    if (isActive) {
      style = {
        opacity: 1,
        transform: 'translateX(0) scale(1.1)',
        zIndex: 30,
        pointerEvents: 'auto',
        filter: 'brightness(1.1) contrast(1.1)'
      };
    } else if (isPrev) {
      style = {
        opacity: 0.6,
        transform: 'translateX(-110%) scale(0.85) perspective(1000px) rotateY(15deg)',
        zIndex: 20,
        pointerEvents: 'auto',
        filter: 'brightness(0.7) blur(1px)'
      };
    } else if (isNext) {
      style = {
        opacity: 0.6,
        transform: 'translateX(110%) scale(0.85) perspective(1000px) rotateY(-15deg)',
        zIndex: 20,
        pointerEvents: 'auto',
        filter: 'brightness(0.7) blur(1px)'
      };
    } else if (diff === -2) {
       style = {
        opacity: 0.3,
        transform: 'translateX(-200%) scale(0.7)',
        zIndex: 10,
        pointerEvents: 'none',
        filter: 'brightness(0.5) blur(2px)'
      };
    } else if (diff === 2) {
       style = {
        opacity: 0.3,
        transform: 'translateX(200%) scale(0.7)',
        zIndex: 10,
        pointerEvents: 'none',
        filter: 'brightness(0.5) blur(2px)'
      };
    }

    return { ...style, transition: 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)' };
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto h-[450px] md:h-[500px] flex items-center justify-center perspective-1000">
      <button onClick={(e) => { e.stopPropagation(); prevSlide(); }} className="absolute left-4 md:-left-12 top-1/2 -translate-y-1/2 z-40 bg-white/80 hover:bg-white text-slate-800 p-3 rounded-full shadow-xl transition-all hover:scale-110"><ChevronLeft className="w-6 h-6" /></button>
      <button onClick={(e) => { e.stopPropagation(); nextSlide(); }} className="absolute right-4 md:-right-12 top-1/2 -translate-y-1/2 z-40 bg-white/80 hover:bg-white text-slate-800 p-3 rounded-full shadow-xl transition-all hover:scale-110"><ChevronRight className="w-6 h-6" /></button>

      <div className="relative w-full h-full flex items-center justify-center">
        {images.map((img, index) => {
          const handleClick = () => {
             if (index === activeIndex) onSelect(index);
             else setActiveIndex(index);
          };
          return (
            <div key={index} className="absolute w-64 md:w-80 h-80 md:h-96 rounded-2xl shadow-2xl overflow-hidden cursor-pointer" style={getStyle(index)} onClick={handleClick}>
              <img src={img} alt={`Réalisation ${index}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center group">
                 <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 drop-shadow-lg" />
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="absolute -bottom-8 flex gap-2">
        {images.map((_, i) => (
          <button key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeIndex ? 'bg-orange-600 w-8' : 'bg-slate-300'}`} onClick={() => setActiveIndex(i)} />
        ))}
      </div>
    </div>
  );
};

// --- APP COMPONENT (REALISATIONS PAGE) ---
export default function RealisationsPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-slate-800 antialiased bg-slate-50 selection:bg-orange-500 selection:text-white">
      <style>{styles}</style>
      
      <AiDiagnosticModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />
      <Lightbox
        images={REALIZATIONS}
        currentIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onPrev={() =>
          setSelectedIndex((prev) =>
            prev === null ? null : (prev - 1 + REALIZATIONS.length) % REALIZATIONS.length
          )
        }
        onNext={() =>
          setSelectedIndex((prev) =>
            prev === null ? null : (prev + 1) % REALIZATIONS.length
          )
        }
      />

      {/* --- TOP BAR (Desktop) --- */}
      <div className="bg-slate-900 text-slate-300 py-2 text-xs hidden lg:block border-b border-slate-800">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2 text-green-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Agréé Toutes Assurances
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> Bruxelles, Wallonie & Flandre
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-4 border-r border-slate-700 pr-4 mr-4 items-center">
              <a href="#" className="hover:opacity-80 transition-opacity"><img src={ICONS.facebook} alt="FB" className="w-4 h-4 invert brightness-0 invert" /></a>
              <a href="#" className="hover:opacity-80 transition-opacity"><img src={ICONS.instagram} alt="IG" className="w-4 h-4 invert brightness-0 invert" /></a>
              <a href="#" className="hover:opacity-80 transition-opacity"><img src={ICONS.tiktok} alt="TK" className="w-4 h-4 invert brightness-0 invert" /></a>
            </div>
            <Link to="/contact" className="hover:text-white transition-colors">Devis Gratuit</Link>
            <span className="flex items-center gap-1 text-orange-400 font-bold">
              <Star className="w-3 h-3 fill-current" /> 4.9/5 (150+ Avis)
            </span>
          </div>
        </div>
      </div>

      {/* --- HEADER NAVIGATION --- */}
      <header className={`sticky top-0 z-50 transition-all duration-300 bg-white border-b border-slate-100 ${isScrolled ? 'shadow-lg py-2' : 'py-3 md:py-4'}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="relative">
              <img src={BRAND.logoUrl} alt="Aqua&Deb Logo" className="relative h-12 w-12 object-contain" />
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-6">
            {NAV_LINKS.map((link, idx) => {
              const isRouterLink = link.href.startsWith('/');
              const NavComponent = isRouterLink ? Link : 'a';

              if (!link.isButton) {
                return (
                  <div key={idx} className="relative group">
                    <NavComponent 
                      to={isRouterLink ? link.href : undefined} 
                      href={!isRouterLink ? link.href : undefined}
                      className={`flex items-center gap-1 font-bold text-sm uppercase tracking-wide transition-colors py-4 ${link.active ? 'text-blue-600' : 'text-slate-600 hover:text-blue-700'}`}
                    >
                      {link.label}
                      {(link.type === 'mega' || link.type === 'dropdown') && <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />}
                    </NavComponent>
                    {link.type === 'mega' && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-xl rounded-xl border border-slate-100 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-4 group-hover:translate-y-0 z-50 grid grid-cols-2 gap-8">
                        {link.columns.map((col, cIdx) => (
                          <div key={cIdx}>
                          <h4 className="text-blue-600 font-black uppercase text-xs tracking-wider mb-1">{col.title}</h4>
                          <p className="text-xs text-slate-400 mb-4">{col.desc}</p>
                          <ul className="space-y-2">
                             {col.items.map((item, iIdx) => (
                                  <li key={iIdx}>
                                    <Link
                                      to={getServiceLink(item)}
                                      className="text-sm font-medium text-slate-600 hover:text-blue-600 flex items-center gap-2 transition-colors"
                                    >
                                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200"></span>
                                      {item}
                                    </Link>
                                  </li>
                                ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                    )}
                    {link.type === 'dropdown' && (
                      <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-4 group-hover:translate-y-0 z-50">
                        {link.items.map((item, iIdx) => (
                           <a key={iIdx} href="#" className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">{item}</a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a key={idx} href={link.href} className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-black text-sm uppercase tracking-wide shadow-md transition-all hover:scale-105 flex items-center gap-2"><Phone className="w-4 h-4" /> {link.label}</a>
              );
            })}
          </nav>

          <button className="xl:hidden p-2 text-slate-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}><Menu className="w-8 h-8" /></button>
        </div>

        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl p-0 flex flex-col gap-0 xl:hidden max-h-[90vh] overflow-y-auto animate-in slide-in-from-top-5 z-40">
            {NAV_LINKS.map((link, idx) => {
              const isRouterLink = link.href.startsWith('/');
              const NavComponent = isRouterLink ? Link : 'a';

              return (
                <div key={idx} className="border-b border-slate-50 last:border-0">
                   {link.type === 'mega' ? (
                     <>
                      <button onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)} className="w-full flex items-center justify-between p-4 font-bold text-lg text-slate-700 bg-slate-50/50">{link.label}<ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`} /></button>
                    {activeDropdown === idx && (
                      <div className="px-4 pb-4 space-y-4 bg-slate-50">
                        {link.columns.map((col, cIdx) => (
                          <div key={cIdx}>
                            <h5 className="text-blue-600 font-bold uppercase text-xs mb-2">{col.title}</h5>
                            <ul className="space-y-2 border-l-2 border-slate-200 pl-4">
                              {col.items.map((item, iIdx) => (
                                <li key={iIdx} className="text-sm text-slate-600">
                                  <Link
                                    to={getServiceLink(item)}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-blue-700 font-semibold"
                                  >
                                    {item}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                     </>
                   ) : link.type === 'dropdown' ? (
                     <>
                      <button onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)} className="w-full flex items-center justify-between p-4 font-bold text-lg text-slate-700 bg-slate-50/50">{link.label}<ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`} /></button>
                      {activeDropdown === idx && (
                        <div className="px-4 pb-4 bg-slate-50"><ul className="space-y-2 border-l-2 border-slate-200 pl-4">{link.items.map((item, iIdx) => (<li key={iIdx} className="text-sm text-slate-600">
                                <a href={typeof item === 'string' ? '#' : item.href} className="text-blue-700 font-semibold">
                                  {typeof item === 'string' ? item : item.label}
                                </a>
                              </li>))}</ul></div>
                      )}
                     </>
                   ) : (
                    <NavComponent 
                      to={isRouterLink ? link.href : undefined} 
                      href={!isRouterLink ? link.href : undefined}
                      className={`block p-4 font-bold text-lg ${link.isButton ? 'bg-red-50 text-red-600' : 'text-slate-700'}`} 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </NavComponent>
                   )}
                </div>
              );
            })}
             <div className="p-4 bg-slate-50 space-y-3">
              <button onClick={() => { setIsAiModalOpen(true); setMobileMenuOpen(false); }} className="w-full bg-indigo-600 text-white py-4 rounded-xl text-center font-bold flex justify-center items-center gap-2 shadow-lg"><Sparkles className="w-5 h-5 text-yellow-300" /> Assistant IA</button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* --- HERO REALISATIONS --- */}
        <section className="relative bg-slate-900 py-24 text-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142108/2025-07-29_vohdwv.webp')] bg-cover bg-center opacity-20 filter contrast-125"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/20 border border-orange-400 text-orange-300 text-sm font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
              Savoir-Faire & Expertise
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 font-[Bebas_Neue] tracking-wide drop-shadow-2xl">
              Nos Derniéres <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Réalisations</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
              Découvrez la qualité de nos interventions en images. <br className="hidden md:block"/>
              Du débouchage express é la rénovation compléte.
            </p>
          </div>
        </section>

        {/* --- INTRO TEXT --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center max-w-4xl">
            <h2 className="text-3xl font-black text-slate-900 mb-6 font-[Montserrat]">Pourquoi choisir nos services ?</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              Chez <strong>Aqua&Deb</strong>, nous ne nous contentons pas de réparer : nous apportons des solutions durables. Chaque chantier est réalisé avec le plus grand soin, en respectant les normes de sécurité et de propreté. Que ce soit pour une <strong>recherche de fuite</strong> complexe ou l'installation d'un <strong>nouveau chauffe-eau</strong>, notre galerie témoigne de notre engagement envers l'excellence.
            </p>
          </div>
        </section>

        {/* --- PORTFOLIO 3D --- */}
        <section className="py-10 bg-slate-50 overflow-hidden border-y border-slate-200">
          <div className="container mx-auto px-4 mb-10 text-center">
             <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">Galerie Interactive</span>
             <h3 className="text-2xl font-black text-slate-900 mt-2">Cliquez pour agrandir</h3>
          </div>
          <Portfolio3D images={REALIZATIONS} onSelect={setSelectedIndex} />
        </section>

        {/* --- ETUDES DE CAS (DETAIL) --- */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center font-[Montserrat]">Interventions Récentes</h2>
            
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* Case 1: Chauffe-eau */}
              <div className="group bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="h-64 overflow-hidden relative">
                  <img src="https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142107/chauffe-eau-avant-apres_ncrzro.png" alt="Remplacement Chauffe-eau" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800">Namur</div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Remplacement Chauffe-eau</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Installation d'un nouveau boiler thermodynamique en remplacement d'un ancien modéle défectueux. Gain énergétique et eau chaude garantie.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Installation</span>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">économie</span>
                  </div>
                </div>
              </div>

              {/* Case 2: Fuite WC */}
              <div className="group bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="h-64 overflow-hidden relative">
                  <img src="https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142107/fuite-wc-avant-apres_pcejsa.png" alt="Réparation Fuite WC" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800">Liége</div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Réparation Fuite WC</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Détection et réparation d'une fuite encastrée sur un béti-support WC suspendu. Intervention rapide pour stopper le dégét des eaux.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">Urgence</span>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">Réparation</span>
                  </div>
                </div>
              </div>

              {/* Case 3: Tuyauterie */}
              <div className="group bg-white rounded-3xl border border-slate-100 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
                <div className="h-64 overflow-hidden relative">
                  <img src="https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142107/reparation-tuyauterie-avant-apres_xq3gnb.png" alt="Rénovation Tuyauterie" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-800">Bruxelles</div>
                </div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Rénovation Tuyauterie</h3>
                  <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                    Remplacement complet des canalisations en plomb par du multicouche. Mise aux normes et amélioration du débit d'eau.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">Rénovation</span>
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">Conformité</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- CTA FINAL --- */}
        <section className="py-20 bg-blue-900 relative overflow-hidden text-center text-white">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-6 font-[Montserrat]">Convaincu par notre travail ?</h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Ne laissez pas vos problémes de plomberie s'installer. Contactez des professionnels reconnus pour un résultat impeccable.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a href={BRAND.phoneLink} className="inline-flex items-center justify-center bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-transform hover:scale-105 gap-2 text-lg">
                <Phone className="w-6 h-6" /> Appeler maintenant
              </a>
              <Link to="/contact" className="inline-flex items-center justify-center bg-white hover:bg-blue-50 text-blue-900 font-bold py-4 px-8 rounded-xl shadow-lg transition-transform hover:scale-105 gap-2 text-lg">
                <FileText className="w-6 h-6" /> Demander un devis
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* --- FOOTER STRUCTURE 5 COLONNES (Identique Home) --- */}
      <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t-4 border-orange-600 mt-0">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
            
            {/* Col 1: À propos */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={BRAND.logoUrl} alt="Aqua&Deb" className="h-12 w-12 object-contain" />
                <span className="text-white font-extrabold text-lg">Aqua&Deb</span>
              </div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">À propos de nous</h4>
              <p className="text-sm leading-relaxed text-slate-500 mb-6">
                Aqua&Deb est un partenaire de confiance pour la plomberie et le débouchage. Intervention rapide, garantie 12 mois, disponible 24h/24 et 7j/7.
              </p>
              <div className="flex gap-4 items-center">
                <a href="#" className="hover:opacity-80 transition-opacity"><img src={ICONS.facebook} alt="FB" className="w-5 h-5 invert" /></a>
                <a href="#" className="hover:opacity-80 transition-opacity"><img src={ICONS.instagram} alt="IG" className="w-5 h-5 invert" /></a>
                <a href="#" className="hover:opacity-80 transition-opacity"><img src={ICONS.tiktok} alt="TK" className="w-6 h-6 invert" /></a>
              </div>
            </div>

            {/* Col 2: Nos services */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">Nos services</h4>
              <ul className="space-y-2 text-sm">
                {
  [
    { label: 'Services de plomberie', href: '/services/plomberie' },
    { label: 'Services de débouchage', href: '/services/debouchage' },
    { label: 'Dépannage plomberie', href: '/services/plomberie' },
    { label: 'Rénovation plomberie', href: '/renovation-sanitaires' },
    { label: 'Entretien plomberie', href: '/entretien' }
  ].map(({ label, href }, i) => (
    <li key={i}>
      <a href={href} className='hover:text-white transition-colors'>
        {label}
      </a>
    </li>
  ))
}
              </ul>
            </div>

            {/* Col 3: Zones d'intervention */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">Zones d'intervention</h4>
              <ul className="space-y-2 text-sm">
                {
  [
    { label: 'Liége', href: '/zones/liege' },
    { label: 'Namur', href: '/zones/namur' },
    { label: 'Charleroi', href: '/zones/charleroi' },
    { label: 'Mons', href: '/zones/mons' },
    { label: 'Verviers', href: '/zones/verviers' },
    { label: 'Brabant wallon et flamand', href: '/zones/brabant-wallon-flamand' },
    { label: 'Toutes les zones', href: '/zones' }
  ].map(({ label, href }, i) => (
    <li key={i}>
      <a href={href} className='hover:text-white transition-colors'>
        {label}
      </a>
    </li>
  ))
}
              </ul>
            </div>

            {/* Col 4: Contact */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                   <FileText className="w-4 h-4 text-slate-500" />
                   <Link to="/contact" className="hover:text-white transition-colors">Page contact</Link>
                </li>
                <li className="flex items-center gap-3">
                   <Phone className="w-4 h-4 text-orange-600" />
                   <a href={BRAND.phoneLink} className="text-white font-bold hover:text-orange-500 transition-colors">{BRAND.phoneDisplay}</a>
                </li>
                <li className="flex items-center gap-3">
                   <Mail className="w-4 h-4 text-slate-500" />
                   <a href={`mailto:${BRAND.email}`} className="hover:text-white transition-colors">{BRAND.email}</a>
                </li>
              </ul>
            </div>

            {/* Col 5: Informations légales */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">Informations légales</h4>
              <ul className="space-y-2 text-sm">
                {["Conditions générales", "Politique de confidentialité", "Mentions légales"].map((item, i) => (
                  <li key={i}><a href="#" className="hover:text-white transition-colors">{item}</a></li>
                ))}
              </ul>
            </div>

          </div>
          
          <div className="container mx-auto px-4 border-t border-slate-900 pt-8 text-xs text-center text-slate-600">
            <p>&copy; 2025 Aqua&Deb. Tous droits réservés.</p>
          </div>
      </footer>

      {/* --- STICKY MOBILE CTA (Optionnel pour page contact mais utile) --- */}
      <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-slate-200 shadow-[0_-5px_30px_rgba(0,0,0,0.15)] md:hidden z-50 flex gap-3 pb-safe">
          <a 
            href={BRAND.phoneLink} 
            className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-xl flex flex-col items-center justify-center py-3 active:scale-95 transition-transform shadow-lg animate-pulse-slow"
          >
            <span className="text-[10px] opacity-90 uppercase tracking-widest mb-0.5">Urgence 24h/24</span>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 fill-current" />
              <span className="text-xl leading-none">{BRAND.phoneDisplay}</span>
            </div>
          </a>
      </div>

    </div>
  );
}










