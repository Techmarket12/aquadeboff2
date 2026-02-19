import React, { useState, useEffect, useCallback, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
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
  Facebook,
  Instagram,
  Mail,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  Maximize2
} from 'lucide-react';
import CloudinaryUploader, { uploadFiles } from './components/CloudinaryUploader';
import ContactPage from './pages/contact';
import RealisationsPage from './pages/realisations';
import DepannageFuitesPage from './pages/depannage_fuites';
import DepannageSanitairesPage from './pages/depannage_sanitaire';
import DepannageChauffagePage from './pages/depannage_chauffage';
import RenovationSanitairePage from './pages/renovation_sanitaire';
import EntretienPage from './pages/entretien';
import DebouchageWCEviersPage from './pages/wc_evier_debouchage';
import GoogleAdsTracking from './components/GoogleAdsTracking';
import NamurPage from './pages/Namur';
import CharleroiPage from './pages/Charleroi';
import MonsPage from './pages/mons';
import BruxellesPage from './pages/Bruxelles';
import BrabantWallonFlamandPage from './pages/braband_wallon_flamand';
import LiegePage from './pages/Liege';
import VerviersPage from './pages/Verviers';
import ServiceRobinetteriePage from './pages/service_robinetterie';
import RemplacementCanalisationGresPage from './pages/remplacement_canalisation_gres';
import InspectionCameraRechercheFuitesPage from './pages/inspection_camera_recherche_fuites';
import { getServiceLink } from './utils/serviceRoutes';
import useSEO from './utils/useSEO';
import { SEO_CONFIG } from './seoConfig';

// --- STYLES INJECTÉS POUR LES ANIMATIONS ---
const styles = `
  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  .animate-scroll {
    animation: scroll 40s linear infinite;
  }
  .animate-scroll:hover {
    animation-play-state: paused;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .perspective-1000 {
    perspective: 1000px;
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
const WHATSAPP_LINK = "https://wa.me/32493415283";
const WHATSAPP_LOGO_URL = "https://res.cloudinary.com/dw9jkwccj/image/upload/v1771494010/whatsapp-logo-whatsapp-logo-transparent-whatsapp-icon-transparent-free-free-png_ihikuo.webp";

// --- DATA ---
const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  {
    label: 'Nos Services',
    href: '/#services',
    type: 'mega',
    columns: [
      {
        title: 'Plomberie',
        desc: "Solutions complètes pour l'habitat",
        items: [
          'Dépannage fuites',
          'Dépannage sanitaires',
          'Dépannage chauffage',
          'Rénovation sanitaires',
          'Entretien',
          'Service de robinetterie',
          'Service de boiler / chauffe-eau',
          'Remplacement canalisation en grès',
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
      { label: 'Liège et alentours', href: '/zones/liege' },
      { label: 'Verviers et alentours', href: '/zones/verviers' },
      { label: 'Mons et alentours', href: '/zones/mons' },
      { label: 'Brabant Wallon & Flamand', href: '/zones/brabant-wallon-flamand' }
    ]
  },
  { label: 'Contact', href: '/contact' },
  { label: 'Urgence 24/7', href: BRAND.phoneLink, isButton: true }
];

const REALIZATIONS = [
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1770494649/Afficher_les_photos_re%CC%81centes_vltw1p.png",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142108/2025-07-29_vohdwv.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142108/2025-08-06_whopbd.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142108/2025-08-06_1_bzt1gn.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142108/2025-07-24_v2fniu.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142108/2025-08-03_qlmfhy.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142107/chauffe-eau-avant-apres_ncrzro.png",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142107/2025-07-24_2_yb3vi3.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142107/reparation-tuyauterie-avant-apres_xq3gnb.png",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1770374845/WhatsApp_Image_2026-02-06_at_11.45.01_d8hhwo.jpg",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1770374736/2025-10-23_xfspng.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1770374736/2025-10-13_iagd72.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1770374736/2025-07-19_gfrqxz.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1770375099/WhatsApp_Image_2026-02-06_at_11.50.48_soe8fv.jpg",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1770385254/WhatsApp_Image_2026-02-06_at_12.38.28_cvuspk.jpg",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1770385254/IMG_3469.jpg_ycgn8m.jpg",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1770385235/IMG_3491.jpg_fuvui5.jpg",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1770385235/Image_tk9vwd.jpg",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1770385234/IMG_3489_utycd7.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1770971064/ddnzdezfsekbdwzqw2ew.webp",
  "https://res.cloudinary.com/dw9jkwccj/image/upload/v1770971017/xrbhx7sj6huwccqkrxbp.webp"
];

const REVIEWS = [
  { name: "Jean Dupont", text: "Intervention rapide pour une fuite d'eau importante. Le technicien était très pro.", rating: 5, date: "Il y a 3 jours", avatar: "https://i.pravatar.cc/150?img=11" },
  { name: "Marie Laurent", text: "WC débouché en 30 minutes. Travail propre et prix correct. Je recommande.", rating: 5, date: "Il y a 1 semaine", avatar: "https://i.pravatar.cc/150?img=5" },
  { name: "Pierre Van Hout", text: "Remplacement de chauffe-eau effectué le jour même. Service impeccable.", rating: 5, date: "Il y a 2 semaines", avatar: "https://i.pravatar.cc/150?img=3" },
  { name: "Sophie Martin", text: "Très satisfaite du service. Ils sont venus un dimanche pour une urgence.", rating: 5, date: "Il y a 3 semaines", avatar: "https://i.pravatar.cc/150?img=9" },
  { name: "Ahmed Benali", text: "Plombier sympa et efficace. Il m'a bien expliqué le problème.", rating: 4, date: "Il y a 1 mois", avatar: "https://i.pravatar.cc/150?img=13" },
  { name: "Chantal Dubois", text: "Je recommande cette société pour leur réactivité et leur gentillesse.", rating: 5, date: "Il y a 1 mois", avatar: "https://i.pravatar.cc/150?img=20" },
  { name: "Marc Lambert", text: "Problème d'égout bouché réglé en un rien de temps. Merci !", rating: 5, date: "Il y a 2 mois", avatar: "https://i.pravatar.cc/150?img=15" },
];

const ZONES_INTERVENTION_LIST = [
  "Namur", "Charleroi", "Liège", "Mons", "Bruxelles", "Wavre", "Nivelles", "Waterloo", "Verviers"
];

const SEOManager = () => {
  const location = useLocation();
  const meta = SEO_CONFIG[location.pathname] || SEO_CONFIG["/"];
  useSEO({ path: location.pathname, ...meta });
  return null;
};

const WhatsAppFloatingButton = () => (
  <a
    href={WHATSAPP_LINK}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Contacter AquaDeb sur WhatsApp"
    className="fixed right-4 bottom-24 md:bottom-6 z-[70] hover:scale-105 transition-transform"
  >
    <img
      src={WHATSAPP_LOGO_URL}
      alt="WhatsApp AquaDeb"
      className="w-20 h-20 md:w-24 md:h-24 object-contain"
      loading="lazy"
    />
  </a>
);

// --- AI DIAGNOSTIC MODAL ---
const AiDiagnosticModal = ({ isOpen, onClose, onPhoneClick }) => {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setError("");
    setResult(null);

    const apiKey = ""; 
    const prompt = `Act as an expert plumber. Analyze this customer issue: "${description}".
    Respond in JSON format ONLY.
    {
      "urgency": "Faible" | "Moyenne" | "Haute" | "Critique",
      "safety_tip": "Short immediate advice in French",
      "service_detected": "Name of the service in French",
      "estimated_intervention_time": "45 min"
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
                placeholder="Décrivez votre problème ici..."
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
              <a href={BRAND.phoneLink} onClick={onPhoneClick} className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl animate-pulse text-xl">
                <Phone className="w-6 h-6" /> Appeler le Technicien
              </a>
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
    <div className="fixed inset-0 z-[120] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-300">
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
          className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain animate-in zoom-in-95 duration-300"
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

  // Auto-play un peu plus rapide (2500ms)
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 2500);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const getStyle = (index) => {
    // Calculate distance from active index, handling array wrapping
    let diff = (index - activeIndex);
    // Adjust diff to find shortest path in circular array
    if (diff > images.length / 2) diff -= images.length;
    if (diff < -images.length / 2) diff += images.length;

    const isActive = diff === 0;
    const isPrev = diff === -1;
    const isNext = diff === 1;
     
    // Default hidden/back style
    let style = {
      opacity: 0,
      transform: 'translateX(0) scale(0.5)',
      zIndex: 0,
      pointerEvents: 'none'
    };

    if (isActive) {
      style = {
        opacity: 1,
        transform: 'translateX(0) scale(1.1)', // Bigger center
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
       // Far left
       style = {
        opacity: 0.3,
        transform: 'translateX(-200%) scale(0.7)',
        zIndex: 10,
        pointerEvents: 'none',
        filter: 'brightness(0.5) blur(2px)'
      };
    } else if (diff === 2) {
       // Far right
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
      
      {/* Navigation Buttons */}
      <button 
        onClick={(e) => { e.stopPropagation(); prevSlide(); }}
        className="absolute left-4 md:-left-12 top-1/2 -translate-y-1/2 z-40 bg-white/80 hover:bg-white text-slate-800 p-3 rounded-full shadow-xl transition-all hover:scale-110"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={(e) => { e.stopPropagation(); nextSlide(); }}
        className="absolute right-4 md:-right-12 top-1/2 -translate-y-1/2 z-40 bg-white/80 hover:bg-white text-slate-800 p-3 rounded-full shadow-xl transition-all hover:scale-110"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Images */}
      <div className="relative w-full h-full flex items-center justify-center">
        {images.map((img, index) => {
          // Wrap onClick to handle center vs side clicks
          const handleClick = () => {
             const diff = (index - activeIndex + images.length) % images.length;
             if (index === activeIndex) {
               onSelect(index); // Open lightbox if active
             } else {
               setActiveIndex(index); // Just slide if not active
             }
          };

          return (
            <div 
              key={index}
              className="absolute w-64 md:w-80 h-80 md:h-96 rounded-2xl shadow-2xl overflow-hidden cursor-pointer"
              style={getStyle(index)}
              onClick={handleClick}
            >
              <img src={img} alt={`Réalisation ${index}`} className="w-full h-full object-cover" />
              {/* Overlay for icon on hover/active */}
              <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center group">
                 <Maximize2 className="text-white opacity-0 group-hover:opacity-100 transition-opacity w-10 h-10 drop-shadow-lg" />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Dots Indicator */}
      <div className="absolute -bottom-8 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-2.5 h-2.5 rounded-full transition-all ${i === activeIndex ? 'bg-orange-600 w-8' : 'bg-slate-300'}`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};


// --- APP ---

function HomePage() {
  const primaryVideoSrc = "https://res.cloudinary.com/dw9jkwccj/video/upload/q_auto:eco,f_mp4,vc_h264,w_960/v1770495352/img-3504-2_arpybAyG_jkpvml.mp4";
  const fallbackVideoSrc = "https://res.cloudinary.com/dw9jkwccj/video/upload/v1770495352/img-3504-2_arpybAyG_jkpvml.mp4";
  const sectionRef = useRef(null);
  const mobileVideoRef = useRef(null);
  const desktopVideoRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const navigate = useNavigate();
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const handlePhoneClick = useCallback(() => {
    if (typeof window !== 'undefined' && window.gtag_report_conversion) {
      window.gtag_report_conversion();
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Ensure autoplay works on mobile when the section is visible
  useEffect(() => {
    const playIfPossible = (vid) => {
      if (!vid) return;
      vid.muted = true;
      vid.defaultMuted = true;
      vid.playsInline = true;
      const playPromise = vid.play();
      if (playPromise?.catch) playPromise.catch(() => {});
    };

    const isSectionVisible = () => {
      const el = sectionRef.current;
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
    };

    const triggerPlayIfVisible = () => {
      if (isSectionVisible()) {
        playIfPossible(mobileVideoRef.current);
        playIfPossible(desktopVideoRef.current);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) triggerPlayIfVisible();
        });
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    // Fallback for browsers requiring a user gesture (mobile Safari)
    const gestureHandler = () => triggerPlayIfVisible();
    window.addEventListener('touchstart', gestureHandler, { once: true });
    window.addEventListener('click', gestureHandler, { once: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('touchstart', gestureHandler);
      window.removeEventListener('click', gestureHandler);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            [mobileVideoRef.current, desktopVideoRef.current].forEach((vid) => {
              if (vid) {
                const playPromise = vid.play();
                if (playPromise?.catch) playPromise.catch(() => {});
              }
            });
          }
        });
      },
      { threshold: 0.4 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-sans text-slate-800 antialiased bg-white selection:bg-orange-500 selection:text-white">
      <style>{styles}</style>
      
      <AiDiagnosticModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} onPhoneClick={handlePhoneClick} />
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

      {/* --- FLASH INFO BAR --- */}
      <div className="bg-red-600 text-white text-center py-2 px-4 text-xs md:text-sm font-bold animate-pulse">
        Techniciens disponibles immédiatement dans votre secteur. Arrivée en 45 min garantie.
      </div>

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
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-white transition-colors">Devis Gratuit</Link>
            <span>|</span>
            <span className="flex items-center gap-1 text-orange-400 font-bold">
              <Star className="w-3 h-3 fill-current" /> 4.9/5 (150+ Avis)
            </span>
          </div>
        </div>
      </div>

      {/* --- HEADER NAVIGATION --- */}
      <header className={`sticky top-0 z-50 transition-all duration-300 bg-white border-b border-slate-100 ${isScrolled ? 'shadow-lg py-2' : 'py-3 md:py-4'}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img src={BRAND.logoUrl} alt="Aqua&Deb Logo" className="relative h-12 w-12 md:h-14 md:w-14 object-contain" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-slate-900 leading-none tracking-tighter">AQUA<span className="text-blue-600">&</span>DEB</span>
              <span className="text-[10px] md:text-xs font-bold text-red-600 uppercase tracking-widest">Urgence 24h/24</span>
            </div>
          </Link>

          {/* Desktop Nav */}
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
                      className="flex items-center gap-1 text-slate-600 hover:text-blue-700 font-bold text-sm uppercase tracking-wide transition-colors py-4"
                    >
                      {link.label}
                      {(link.type === 'mega' || link.type === 'dropdown') && <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />}
                    </NavComponent>

                    {/* Mega Menu Services */}
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
                                      <span className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-blue-500"></span>
                                      {item}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                    )}

                    {/* Dropdown Zones */}
                    {link.type === 'dropdown' && (
                      <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-4 group-hover:translate-y-0 z-50">
                        {link.items.map((item, iIdx) => (
                           <a key={iIdx} href={typeof item === 'string' ? '#' : item.href} className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                             {typeof item === 'string' ? item : item.label}
                           </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <a 
                  key={idx}
                  href={link.href}
                  onClick={handlePhoneClick}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-black text-sm uppercase tracking-wide shadow-md transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> {link.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button + Status */}
          <div className="xl:hidden flex items-center gap-3">
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
              <div className="h-6 w-6 rounded-full bg-green-600 text-white flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <span className="text-[10px] leading-none">Ouvert aujourd'hui</span>
            </div>
            <button className="p-2 text-slate-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl p-0 flex flex-col gap-0 xl:hidden max-h-[90vh] overflow-y-auto animate-in slide-in-from-top-5 z-40">
            {NAV_LINKS.map((link, idx) => {
              const isRouterLink = link.href.startsWith('/');
              const NavComponent = isRouterLink ? Link : 'a';

              return (
                <div key={idx} className="border-b border-slate-50 last:border-0">
                   {link.type === 'mega' ? (
                     <>
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-4 font-bold text-lg text-slate-700 bg-slate-50/50"
                      >
                        {link.label}
                        <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`} />
                      </button>
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
                                    onClick={() => { if (link.isButton) handlePhoneClick(); setMobileMenuOpen(false); }}
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
                      <button 
                        onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-4 font-bold text-lg text-slate-700 bg-slate-50/50"
                      >
                        {link.label}
                        <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === idx && (
                        <div className="px-4 pb-4 bg-slate-50">
                          <ul className="space-y-2 border-l-2 border-slate-200 pl-4">
                            {link.items.map((item, iIdx) => (
                              <li key={iIdx} className="text-sm text-slate-600">
                                <a href={typeof item === 'string' ? '#' : item.href} className="text-blue-700 font-semibold">
                                  {typeof item === 'string' ? item : item.label}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                     </>
                   ) : (
                    <NavComponent 
                      to={isRouterLink ? link.href : undefined} 
                      href={!isRouterLink ? link.href : undefined}
                      className={`block p-4 font-bold text-lg ${link.isButton ? 'bg-red-50 text-red-600' : 'text-slate-700'}`} 
                      onClick={() => { if (link.isButton) handlePhoneClick(); setMobileMenuOpen(false); }}
                    >
                      {link.label}
                    </NavComponent>
                   )}
                </div>
              );
            })}
             <div className="p-4 bg-slate-50 space-y-3">
              <button onClick={() => { setIsAiModalOpen(true); setMobileMenuOpen(false); }} className="w-full bg-indigo-600 text-white py-4 rounded-xl text-center font-bold flex justify-center items-center gap-2 shadow-lg">
                <Sparkles className="w-5 h-5 text-yellow-300" /> Assistant IA
              </button>
            </div>
          </div>
        )}
      </header>

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative pt-8 pb-16 lg:pt-20 lg:pb-32 bg-slate-900 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" 
              alt="Plombier Urgence" 
              className="w-full h-full object-cover opacity-20 filter contrast-125"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/95 to-slate-900/60"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                <div className="inline-flex flex-wrap justify-center lg:justify-start gap-3 animate-in slide-in-from-top-4 duration-700">
                  <div className="bg-green-500/10 border border-green-500/20 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center gap-2 text-green-400 font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4" /> Agréé Assurances
                  </div>
                  <div className="bg-orange-500/10 border border-orange-500/20 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-wider">
                    <Clock className="w-4 h-4" /> Chez vous en 45 min
                  </div>
                </div>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-2xl">
                  Votre plombier :{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-orange-400">
                    Local
                  </span>
                </h1>

                <img
                  src="https://res.cloudinary.com/dw9jkwccj/image/upload/v1771493893/Capture_d_%C3%A9cran_2026-02-19_103432_edtm63.jpg"
                  alt="Intervention plomberie Aqua&Deb"
                  className="w-full max-w-2xl mx-auto lg:mx-0 rounded-2xl border border-white/20 shadow-2xl object-cover"
                  loading="eager"
                />

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                  <a 
                    href={BRAND.phoneLink}
                    onClick={handlePhoneClick}
                    className="group relative overflow-hidden bg-orange-600 hover:bg-orange-700 text-white text-xl font-black py-5 px-8 rounded-xl shadow-2xl shadow-orange-600/40 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 w-full sm:w-auto"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></span>
                    <Phone className="w-6 h-6 animate-pulse" />
                    APPELER MAINTENANT
                  </a>
                  
                  <button 
                    onClick={() => setIsAiModalOpen(true)}
                    className="bg-indigo-600/80 hover:bg-indigo-600 text-white border border-indigo-500/50 backdrop-blur-md text-lg font-bold py-5 px-8 rounded-xl shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto"
                  >
                    <Sparkles className="w-6 h-6 text-yellow-300" />
                    Diagnostic IA Gratuit
                  </button>
                </div>
              </div>

              {/* Formulaire Express Desktop */}
              <div className="lg:col-span-5 hidden lg:block">
                <div className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-slate-800/10 transform rotate-2 hover:rotate-0 transition-all duration-500">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-black text-slate-900">Rappel Gratuit</h3>
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  </div>
                  
                  <p className="text-slate-600 mb-6 font-medium">Laissez votre numéro, un technicien vous rappelle dans <span className="text-red-600 font-bold underline">2 minutes</span>.</p>
                  
                  <form
                    className="space-y-4"
                    action="https://formspree.io/f/movneogw"
                    method="POST"
                  >
                    <input type="hidden" name="_subject" value="Demande de rappel express" />
                    <div>
                       <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Votre Urgence</label>
                      <select
                        name="urgence"
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-800 focus:border-blue-500 outline-none transition-colors"
                      >
                        <option>Fuite d'eau</option>
                        <option>WC Bouché</option>
                        <option>Canalisation bouchée</option>
                        <option>Panne Chauffe-eau</option>
                        <option>? Autre</option>
                      </select>
                    </div>
                    <div>
                       <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Votre Numéro</label>
                      <input
                        name="phone"
                        type="tel"
                        placeholder="04XX XX XX XX"
                        required
                        className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-800 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 flex justify-center items-center gap-2">
                      <Phone className="w-5 h-5" /> Être rappelé
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- FORMULAIRE COMPLET (déplacé ici, avant Notre Expertise) --- */}
        <section id="contact" className="py-20 bg-blue-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
              <div className="p-8 md:p-10 bg-white">
                <h3 className="text-3xl font-black text-slate-900 text-center mb-2">Devis gratuit en ligne</h3>
                
                <form
                  className="space-y-5 mt-6"
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const form = e.currentTarget;
                    setUploadingPhotos(true);
                    setUploadedUrls([]);
                    try {
                      const formData = new FormData(form);

                      // Upload des fichiers sur Cloudinary avant l'envoi Formspree
                      if (selectedFiles && selectedFiles.length > 0) {
                        const urls = await uploadFiles(selectedFiles);
                        urls.forEach((url, index) => {
                          formData.append(`photos[${index + 1}]`, url);
                        });
                        setUploadedUrls(urls);
                      }

                      const res = await fetch('https://formspree.io/f/movneogw', {
                        method: 'POST',
                        headers: { Accept: 'application/json' },
                        body: formData
                      });
                      if (!res.ok) {
                        const txt = await res.text();
                        throw new Error(`Envoi Formspree échoué (${res.status}) ${txt}`);
                      }

                      form.reset();
                      setSelectedFiles(null);
                      alert('Message envoyé !');
                    } catch (err) {
                      console.error(err);
                      alert("Impossible d'envoyer le formulaire. Réessayez.");
                    } finally {
                      setUploadingPhotos(false);
                    }
                  }}
                >
                  <input type="hidden" name="_subject" value="Formulaire contact - page Accueil" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600 uppercase">Nom Complet</label>
                      <input
                        name="name"
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:border-blue-500 outline-none transition-colors"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600 uppercase">Téléphone <span className="text-red-500">*</span></label>
                      <input
                        name="phone"
                        type="tel"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:border-blue-500 outline-none transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600 uppercase">Code Postal / Ville</label>
                      <input
                        name="location"
                        type="text"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:border-blue-500 outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-600 uppercase">Type de Service</label>
                      <select
                        name="service"
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:border-blue-500 outline-none transition-colors text-slate-700"
                      >
                        <option>Débouchage Urgent</option>
                        <option>Fuite d'eau</option>
                        <option>Installation Sanitaire</option>
                        <option>Chauffage / Boiler</option>
                        <option>Autre demande</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 uppercase">Détails du problème</label>
                    <textarea
                      name="message"
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:border-blue-500 outline-none transition-colors h-24 resize-none"
                      required
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 uppercase flex items-center justify-between">
                      <span>Photos du problème (Optionnel)</span>
                    </label>
                    <CloudinaryUploader onFilesChange={setSelectedFiles} />
                  </div>

                  <button 
                    type="submit"
                    disabled={uploadingPhotos}
                    className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 flex justify-center items-center gap-2"
                  >
                    <Send className="w-5 h-5" /> {uploadingPhotos ? "Upload des photos..." : "Envoyer ma demande"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* --- NOS REALISATIONS (3D CAROUSEL) --- */}
        <section id="realisations" className="py-24 bg-white overflow-hidden">
          <div className="container mx-auto px-4 mb-16 flex flex-col items-center text-center">
             <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">Portfolio</span>
             <h2 className="text-4xl font-black text-slate-900 mt-2 mb-4">Nos Réalisations</h2>
             <p className="text-slate-600 max-w-2xl">
               Découvrez la qualité de nos interventions. Cliquez sur l'image centrale pour agrandir.
             </p>
          </div>

          <Portfolio3D images={REALIZATIONS} onSelect={setSelectedIndex} />
          
        </section>

        {/* --- AVIS CLIENTS (PREMIUM GOOGLE STYLE) --- */}
        <section className="py-24 bg-slate-50 overflow-hidden">
          <div className="container mx-auto px-4 mb-16 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Avis Clients Certifiés</h2>
            <div className="inline-flex items-center gap-3 bg-white px-6 py-2 rounded-full shadow-sm border border-slate-200">
               <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-6" />
               <div className="flex text-orange-400">
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
                  <Star className="w-5 h-5 fill-current" />
               </div>
               <span className="font-bold text-slate-700">4.9/5 Excellent</span>
            </div>
          </div>
          
          <div className="relative w-full">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
            
            <div className="flex animate-scroll gap-6 w-max px-4">
              {[...REVIEWS, ...REVIEWS].map((review, idx) => (
                <div key={idx} className="w-[350px] bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex-shrink-0">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full" />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm">{review.name}</h4>
                        <p className="text-xs text-slate-400">{review.date}</p>
                      </div>
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="G" className="w-5 h-5" />
                  </div>
                  <div className="flex text-orange-400 mb-3 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'fill-current' : 'text-slate-200'}`} />
                    ))}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">{review.text}</p>
                  <div className="mt-4 flex items-center gap-1 text-xs text-blue-600 font-medium">
                    <CheckCircle2 className="w-3 h-3" /> Avis vérifié
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FORMULAIRE RAPPEL MOBILE (avant Notre Expertise) --- */}
        <section className="py-12 bg-white lg:hidden">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-2xl p-6 border border-slate-200/70">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-black text-slate-900">Rappel Gratuit</h3>
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <p className="text-slate-600 mb-4 font-medium">
                Laissez votre numéro, un technicien vous rappelle dans <span className="text-red-600 font-bold underline">2 minutes</span>.
              </p>

              <form
                className="space-y-4"
                action="https://formspree.io/f/movneogw"
                method="POST"
              >
                <input type="hidden" name="_subject" value="Demande de rappel express (mobile)" />
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Votre Urgence</label>
                  <select
                    name="urgence"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-800 focus:border-blue-500 outline-none transition-colors"
                  >
                    <option>Fuite d'eau</option>
                    <option>WC Bouché</option>
                    <option>Canalisation bouchée</option>
                    <option>Panne Chauffe-eau</option>
                    <option>? Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Votre Numéro</label>
                  <input
                    name="phone"
                    type="tel"
                    required
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 font-bold text-slate-800 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-transform active:scale-95 flex justify-center items-center gap-2">
                  <Phone className="w-5 h-5" /> Être rappelé
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* --- NOTRE SAVOIR FAIRE (égouttage & Canalisations) --- */}
        <section id="services" className="py-20 bg-slate-50" ref={sectionRef}>
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-blue-600 font-black uppercase tracking-widest text-sm mb-2 block">NOTRE SAVOIR FAIRE</span>
                <h2 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight">
                  Travaux d'égouttage et canalisations
                </h2>
                <p className="text-blue-700 font-bold text-lg mt-2 mb-6 uppercase tracking-wider">un diagnostic précis, des solutions durables.</p>
                {/* Vidéo mobile placée juste après le sous-titre */}
                <video
                  ref={mobileVideoRef}
                  className="block lg:hidden w-full rounded-2xl shadow-2xl h-64 object-cover mb-6"
                  controls
                  muted
                  defaultMuted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  crossOrigin="anonymous"
                  src={primaryVideoSrc}
                  onError={(e) => {
                    const vid = e.currentTarget;
                    if (vid.dataset.fallbackApplied) return;
                    vid.dataset.fallbackApplied = "1";
                    vid.src = fallbackVideoSrc;
                    vid.load();
                  }}
                  onStalled={(e) => {
                    const vid = e.currentTarget;
                    vid.load();
                  }}
                />
                <div className="space-y-6 text-lg text-slate-600">
                  <p>
                    Chez <strong>Aqua&Deb</strong>, nous intervenons bien au-delà du simple dépannage. Nous sommes spécialisés dans les travaux d'égouttage, le remplacement de canalisations et l'inspection par caméra afin d'identifier précisément l'origine des problèmes et d'y apporter une solution fiable et durable.
                  </p>
                  <p>
                    Grâce à nos équipements de diagnostic de dernière génération, nous localisons fissures, affaissements, obstructions ou ruptures sans travaux inutiles. Chaque intervention commence par une analyse claire de la situation, suivie d'une proposition adaptée à l'installation et au budget du client.
                  </p>
                  <p>
                    Nous intervenons sur l'ensemble de la <strong>Wallonie et Bruxelles</strong>, aussi bien pour des habitations privées que pour des immeubles ou locaux professionnels, avec la même exigence de qualité et de propreté.
                  </p>
                  <ul className="space-y-3 mt-6">
                    {[
                      "Inspection des canalisations par caméra haute définition",
                      "Travaux d'égouttage complets et réparations ciblées",
                      "Remplacement de canalisations défectueuses ou obsolètes",
                      "Diagnostic précis avant toute intervention",
                      "Devis clair et détaillé avant travaux",
                      "Respect total de l'habitation et de l'environnement"
                    ].map((item, i) => (
                       <li key={i} className="flex items-center font-bold text-slate-800">
                         <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center mr-3 shrink-0">
                           <CheckCircle2 className="w-4 h-4" />
                         </div>
                         {item}
                       </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="relative group hidden lg:block">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-3xl opacity-20 transform rotate-3 group-hover:rotate-6 transition-transform duration-700"></div>
                <video
                  ref={desktopVideoRef}
                  className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover transition-all duration-700"
                  controls
                  muted
                  defaultMuted
                  autoPlay
                  loop
                  playsInline
                  preload="auto"
                  crossOrigin="anonymous"
                  src={primaryVideoSrc}
                  onError={(e) => {
                    const vid = e.currentTarget;
                    if (vid.dataset.fallbackApplied) return;
                    vid.dataset.fallbackApplied = "1";
                    vid.src = fallbackVideoSrc;
                    vid.load();
                  }}
                  onStalled={(e) => {
                    const vid = e.currentTarget;
                    vid.load();
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* --- FOOTER STRUCTURE 5 COLONNES --- */}
        <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t-4 border-orange-600">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
             
            {/* Col 1: À propos */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={BRAND.logoUrl} alt="Aqua&Deb" className="h-12 w-12 object-contain" />
                <span className="text-white font-extrabold text-lg">Aqua&Deb</span>
              </div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">À propos de nous</h4>
              <p className="text-sm leading-relaxed text-slate-500">
                Aqua&Deb est un partenaire de confiance pour la plomberie et le débouchage. Intervention rapide, garantie 12 mois, disponible 24h/24 et 7j/7.
              </p>
            </div>

            {/* Col 2: Nos services */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">Nos services</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Services de plomberie", href: "/services/plomberie" },
                  { label: "Services de débouchage", href: "/services/debouchage" },
                  { label: "Dépannage plomberie", href: "/services/plomberie" },
                  { label: "Rénovation plomberie", href: "/renovation-sanitaires" },
                  { label: "Entretien plomberie", href: "/entretien" },
                ].map(({ label, href }, i) => (
                  <li key={i}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>

            {/* Col 3: Zones d'intervention */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">Zones d'intervention</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Liège", href: "/zones/liege" },
                  { label: "Namur", href: "/zones/namur" },
                  { label: "Charleroi", href: "/zones/charleroi" },
                  { label: "Mons", href: "/zones/mons" },
                  { label: "Verviers", href: "/zones/verviers" },
                  { label: "Brabant wallon et flamand", href: "/zones/brabant-wallon-flamand" },
                  { label: "Toutes les zones", href: "/zones" },
                ].map(({ label, href }, i) => (
                  <li key={i}><a href={href} className="hover:text-white transition-colors">{label}</a></li>
                ))}
              </ul>
            </div>

            {/* Col 4: Contact */}
            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                   <Send className="w-4 h-4 text-slate-500" />
                   <Link to="/contact" className="hover:text-white transition-colors">Page contact</Link>
                </li>
                <li className="flex items-center gap-3">
                   <Phone className="w-4 h-4 text-orange-600" />
                   <a href={BRAND.phoneLink} onClick={handlePhoneClick} className="text-white font-bold hover:text-orange-500 transition-colors">{BRAND.phoneDisplay}</a>
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

        {/* --- STICKY MOBILE CTA --- */}
        <div className="fixed bottom-0 left-0 right-0 p-3 bg-white border-t border-slate-200 shadow-[0_-5px_30px_rgba(0,0,0,0.15)] md:hidden z-50 flex gap-3 pb-safe">
          <a 
            href={BRAND.phoneLink}
            onClick={handlePhoneClick}
            className="flex-1 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold rounded-xl flex flex-col items-center justify-center py-3 active:scale-95 transition-transform shadow-lg animate-pulse-slow"
          >
            <span className="text-[10px] opacity-90 uppercase tracking-widest mb-0.5">Urgence 24h/24</span>
            <div className="flex items-center gap-2">
              <Phone className="w-5 h-5 fill-current" />
              <span className="text-xl leading-none">{BRAND.phoneDisplay}</span>
            </div>
          </a>
          <button 
            onClick={() => setIsAiModalOpen(true)}
            className="flex-none bg-indigo-600 text-white font-bold rounded-xl px-4 flex items-center justify-center active:scale-95 transition-transform shadow-lg"
          >
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </button>
        </div>

      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <GoogleAdsTracking />
      <SEOManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/realisations" element={<RealisationsPage />} />
        <Route path="/services/plomberie" element={<DepannageFuitesPage />} />
        <Route path="/depannage-sanitaires" element={<DepannageSanitairesPage />} />
        <Route path="/depannage-chauffage" element={<DepannageChauffagePage />} />
        <Route path="/renovation-sanitaires" element={<RenovationSanitairePage />} />
        <Route path="/entretien" element={<EntretienPage />} />
        <Route path="/services/debouchage" element={<DebouchageWCEviersPage />} />
        <Route path="/service-robinetterie" element={<ServiceRobinetteriePage />} />
        <Route path="/remplacement-canalisation-gres" element={<RemplacementCanalisationGresPage />} />
        <Route path="/inspection-camera-recherche-fuites" element={<InspectionCameraRechercheFuitesPage />} />
        {/* Service boiler : en attendant une page dédiée, on pointe vers chauffage (boiler) */}
        <Route path="/service-boiler-chauffe-eau" element={<DepannageChauffagePage />} />
        {/* Zones */}
        <Route path="/zones" element={<HomePage />} />
        <Route path="/zones/namur" element={<NamurPage />} />
        <Route path="/zones/charleroi" element={<CharleroiPage />} />
        <Route path="/zones/liege" element={<LiegePage />} />
        <Route path="/zones/verviers" element={<VerviersPage />} />
        <Route path="/zones/mons" element={<MonsPage />} />
        <Route path="/zones/brabant-wallon-flamand" element={<BrabantWallonFlamandPage />} />
        <Route path="/zones/bruxelles" element={<BruxellesPage />} />
      </Routes>
      <WhatsAppFloatingButton />
    </Router>
  );
}
