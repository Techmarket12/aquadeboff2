import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getServiceLink } from '../utils/serviceRoutes';
import {
  Phone,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Camera,
  Euro,
  ChevronDown,
  Menu,
  X,
  Star,
  Sparkles,
  Bot,
  Loader2,
  Send,
  Mail
} from 'lucide-react';

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

const BRAND = {
  name: 'Aqua&Deb',
  phoneDisplay: '0493 41 52 83',
  phoneLink: 'tel:0493415283',
  email: 'aquadeb22@gmail.com',
  logoUrl:
    'https://res.cloudinary.com/dw9jkwccj/image/upload/v1770971614/t%C3%A9l%C3%A9chargement_7_f8jwmb.png'
};

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

const AiDiagnosticModal = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    const apiKey = '';
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
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        }
      );
      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      const jsonText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsedResult = JSON.parse(jsonText);
      setResult(parsedResult);
    } catch (err) {
      setError('Une erreur est survenue.');
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
                placeholder="Décrivez votre probléme ici..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              {error ? <p className="mt-3 text-sm text-red-600 font-bold">{error}</p> : null}
              <button
                onClick={handleAnalyze}
                disabled={loading || !description.trim()}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg text-lg"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                {loading ? 'Analyse en cours...' : "Lancer l'analyse"}
              </button>
            </>
          ) : (
            <div className="space-y-6">
              <div
                className={`p-5 rounded-xl border-l-8 ${
                  result.urgency === 'Critique' || result.urgency === 'Haute'
                    ? 'bg-red-50 border-red-600 text-red-900'
                    : 'bg-green-50 border-green-600 text-green-900'
                }`}
              >
                <p className="text-3xl font-black">{String(result.urgency || '').toUpperCase()}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-slate-700 font-medium">{result.safety_tip}</p>
              </div>
              <a
                href={BRAND.phoneLink}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl text-xl"
              >
                <Phone className="w-6 h-6" /> Appeler le Technicien
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function DepannageFuitesPage() {
  const navigate = useNavigate();
  const primarySectionVideoSrc =
    'https://res.cloudinary.com/dw9jkwccj/video/upload/q_auto:eco,f_mp4,vc_h264,w_960/v1770972332/251C49AE-D4FB-4FF7-B142-C390B6E52ABC_gd6vcl.mp4';
  const fallbackSectionVideoSrc =
    'https://res.cloudinary.com/dw9jkwccj/video/upload/v1770972332/251C49AE-D4FB-4FF7-B142-C390B6E52ABC_gd6vcl.mp4';
  const leakSectionRef = useRef(null);
  const leakVideoRef = useRef(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

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
      const el = leakSectionRef.current;
      if (!el) return false;
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
    };

    const triggerPlayIfVisible = () => {
      if (isSectionVisible()) playIfPossible(leakVideoRef.current);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) triggerPlayIfVisible();
        });
      },
      { threshold: 0.25 }
    );

    if (leakSectionRef.current) observer.observe(leakSectionRef.current);

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
            const vid = leakVideoRef.current;
            if (vid) {
              const playPromise = vid.play();
              if (playPromise?.catch) playPromise.catch(() => {});
            }
          }
        });
      },
      { threshold: 0.4 }
    );

    if (leakSectionRef.current) observer.observe(leakSectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="font-sans text-slate-800 antialiased bg-white selection:bg-orange-500 selection:text-white">
      <style>{styles}</style>
      <AiDiagnosticModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />

      <div className="bg-red-600 text-white text-center py-2 px-4 text-xs md:text-sm font-bold">
        Techniciens disponibles immédiatement dans votre secteur. Arrivée en 45 min garantie.
      </div>

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
            <Link to="/contact" className="hover:text-white transition-colors">
              Devis Gratuit
            </Link>
            <span>|</span>
            <span className="flex items-center gap-1 text-orange-400 font-bold">
              <Star className="w-3 h-3 fill-current" /> 4.9/5 (150+ Avis)
            </span>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 bg-white border-b border-slate-100 ${
          isScrolled ? 'shadow-lg py-2' : 'py-3 md:py-4'
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img
                src={BRAND.logoUrl}
                alt="Aqua&Deb Logo"
                className="relative h-12 w-12 md:h-14 md:w-14 object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xl md:text-2xl font-black text-slate-900 leading-none tracking-tighter">
                AQUA<span className="text-blue-600">&</span>DEB
              </span>
              <span className="text-[10px] md:text-xs font-bold text-red-600 uppercase tracking-widest">
                Urgence 24h/24
              </span>
            </div>
          </Link>

          <nav className="hidden xl:flex items-center gap-6">
            {NAV_LINKS.map((link, idx) => {
              const isRouterLink = String(link.href || '').startsWith('/');
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
                      {(link.type === 'mega' || link.type === 'dropdown') ? (
                        <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />
                      ) : null}
                    </NavComponent>

                    {link.type === 'mega' ? (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-xl rounded-xl border border-slate-100 p-6 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-4 group-hover:translate-y-0 z-50 grid grid-cols-2 gap-8">
                        {link.columns.map((col, cIdx) => (
                          <div key={cIdx}>
                            <h4 className="text-blue-600 font-black uppercase text-xs tracking-wider mb-1">
                              {col.title}
                            </h4>
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
                    ) : null}

                    {link.type === 'dropdown' ? (
                      <div className="absolute top-full left-0 w-64 bg-white shadow-xl rounded-xl border border-slate-100 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-4 group-hover:translate-y-0 z-50">
                        {link.items.map((item, iIdx) => (
                          <a
                            key={iIdx}
                            href={typeof item === 'string' ? '#' : item.href}
                            className="block px-4 py-3 text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            {typeof item === 'string' ? item : item.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              }

              return (
                <a
                  key={idx}
                  href={link.href}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-black text-sm uppercase tracking-wide shadow-md transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> {link.label}
                </a>
              );
            })}
          </nav>

          <button className="xl:hidden p-2 text-slate-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>

        {mobileMenuOpen ? (
          <div className="absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl p-0 flex flex-col gap-0 xl:hidden max-h-[90vh] overflow-y-auto animate-in slide-in-from-top-5 z-40">
            {NAV_LINKS.map((link, idx) => {
              const isRouterLink = String(link.href || '').startsWith('/');
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
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {activeDropdown === idx ? (
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
                      ) : null}
                    </>
                  ) : link.type === 'dropdown' ? (
                    <>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === idx ? null : idx)}
                        className="w-full flex items-center justify-between p-4 font-bold text-lg text-slate-700 bg-slate-50/50"
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-5 h-5 transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`}
                        />
                      </button>
                      {activeDropdown === idx ? (
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
                      ) : null}
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
              <button
                onClick={() => {
                  setIsAiModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-indigo-600 text-white py-4 rounded-xl text-center font-bold flex justify-center items-center gap-2 shadow-lg"
              >
                <Sparkles className="w-5 h-5" /> Assistant IA
              </button>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section className="relative pt-16 pb-24 bg-slate-900 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142107/fuite-wc-avant-apres_pcejsa.png"
              alt="Dépannage fuite d'eau"
              className="w-full h-full object-cover object-center opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-900/60"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <AlertTriangle className="w-4 h-4" /> Urgence fuite d'eau 24h/24
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
              Dépannage <span className="text-orange-500">fuite d'eau</span>
              <br />
              intervention immédiate
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl lg:max-w-2xl">
              Une <strong>fuite d'eau</strong> non traitée peut provoquer des <strong>dégéts des eaux</strong>, une
              surconsommation et des moisissures. Nos plombiers spécialisés interviennent en <strong>urgence</strong>
              pour toute <strong>recherche de fuite</strong> et <strong>réparation</strong>, avec un diagnostic précis et une
              solution durable.
            </p>

            <div className="grid lg:grid-cols-3 gap-6 mt-10 max-w-3xl lg:max-w-4xl">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3 text-white font-black">
                  <Clock className="w-5 h-5 text-orange-300" /> Arrivée rapide
                </div>
                <p className="text-slate-200 text-sm mt-2">
                  Un technicien disponible prés de chez vous. Intervention possible en <strong>45 minutes</strong> selon votre zone.
                </p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3 text-white font-black">
                  <ShieldCheck className="w-5 h-5 text-green-300" /> Agréé assurances
                </div>
                <p className="text-slate-200 text-sm mt-2">
                  Dossier clair, photos si nécessaire, et intervention réalisée selon les bonnes pratiques pour votre assurance.
                </p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3 text-white font-black">
                  <CheckCircle2 className="w-5 h-5 text-cyan-300" /> Réparation garantie
                </div>
                <p className="text-slate-200 text-sm mt-2">
                  Solution propre, matériaux adaptés, et conseils de prévention aprés réparation de la <strong>fuite</strong>.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href={BRAND.phoneLink}
                className="bg-orange-600 hover:bg-orange-700 text-white font-black py-5 px-8 rounded-xl shadow-xl flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6" /> Appeler un plombier
              </a>
              <button
                onClick={() => navigate('/contact')}
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-5 px-8 rounded-xl"
              >
                Demande de devis gratuit
              </button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black text-slate-900 mb-6 text-center">
              Dépannage <span className="text-blue-600">fuite d'eau</span> en Belgique
            </h2>
            <p className="text-slate-600 max-w-4xl mx-auto text-center text-lg leading-relaxed">
              Aqua&Deb intervient pour tout <strong>dépannage plomberie</strong> lié é une <strong>fuite d'eau</strong> dans une maison,
              un appartement, un commerce ou un immeuble. Nous traitons les fuites visibles et les <strong>fuites invisibles</strong>
              (infiltrations, humidité, baisse de pression) avec une approche technique et rapide.
              Notre objectif est simple, stopper la fuite, limiter les dégéts, sécuriser l'installation et remettre votre réseau
              en état avec une solution durable.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">
              Types de <span className="text-blue-600">fuites d'eau</span> prises en charge
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {['Fuite WC', 'Fuite robinet', 'Fuite canalisation', 'Fuite chauffe-eau'].map((item, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 shadow-sm border border-slate-100">
                  <Droplets className="w-8 h-8 text-blue-600 mb-4" />
                  <h3 className="font-black text-lg mb-2">{item}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Intervention rapide pour <strong>{item.toLowerCase()}</strong>. contrôle des joints, flexibles, mécanismes,
                    raccords et piéces d'usure. Réparation immédiate ou remplacement si nécessaire.
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <h3 className="font-black text-lg text-slate-900 mb-3">Signes d'une fuite invisible</h3>
                <ul className="space-y-3 text-slate-600 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Compteur qui tourne alors que tout est fermé</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Humidité, taches, cloques de peinture, odeurs persistantes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Baisse de pression ou bruit d'eau dans les murs</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <h3 className="font-black text-lg text-slate-900 mb-3">Que faire en attendant</h3>
                <ul className="space-y-3 text-slate-600 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Coupez l'arrivée d'eau au compteur ou é la vanne principale</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Coupez l'électricité si l'eau atteint des prises ou un tableau</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Protégez le sol et prenez des photos pour votre assurance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <h3 className="font-black text-lg text-slate-900 mb-3">Cas fréquents</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Fuite sous évier, fuite au niveau d'un siphon, fuite sur tuyauterie cuivre ou multicouche,
                  infiltration aprés gel, fuite de chasse d'eau, fuite sur groupe de sécurité,
                  fuite chauffe eau, joint usé, raccord desserré.
                  Dans tous les cas, un <strong>diagnostic</strong> précis évite des travaux inutiles.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50" ref={leakSectionRef}>
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6">
                Pourquoi réparer une <span className="text-red-600">fuite d'eau</span> sans attendre
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Une <strong>fuite d'eau invisible</strong> peut rapidement entraéner une surconsommation, des moisissures
                et des dégéts structurels. Plus vous attendez, plus le risque de <strong>dégéts des eaux</strong> augmente
                (plafond, murs, parquet, isolation). Nos experts utilisent des techniques modernes pour une
                <strong>détection de fuite sans casse</strong> quand c'est possible, puis une réparation ciblée.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Nous intervenons aussi sur les fuites liées é la pression, aux tuyaux vieillissants, aux joints,
                aux raccords et aux installations sanitaires. Chaque intervention inclut un contrôle de sécurité
                et des conseils pour éviter une récidive.
              </p>
              <ul className="space-y-4">
                {[
                  'éviter les dégéts des eaux',
                  "Réduire votre facture d'eau",
                  'Préserver votre habitation',
                  'Intervention propre et garantie'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-green-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative flex justify-center">
              <video
                ref={leakVideoRef}
                className="rounded-2xl shadow-2xl w-full max-w-xl object-cover object-center mx-auto"
                controls
                muted
                defaultMuted
                autoPlay
                loop
                playsInline
                preload="auto"
                crossOrigin="anonymous"
                src={primarySectionVideoSrc}
                onError={(e) => {
                  const vid = e.currentTarget;
                  if (vid.dataset.fallbackApplied) return;
                  vid.dataset.fallbackApplied = '1';
                  vid.src = fallbackSectionVideoSrc;
                  vid.load();
                }}
                onStalled={(e) => {
                  const vid = e.currentTarget;
                  vid.load();
                }}
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">
              Comment se passe une <span className="text-blue-600">intervention</span>
            </h2>
            <p className="text-slate-600 mb-12 max-w-3xl mx-auto">
              Nous suivons une méthode simple et efficace pour que votre <strong>dépannage fuite d'eau</strong> soit rapide,
              clair et sans surprise.
            </p>
            <div className="grid md:grid-cols-4 gap-8 text-left">
              {[
                {
                  t: 'Appel et diagnostic',
                  d: "Vous décrivez la situation. On vous guide pour sécuriser et limiter les dégéts."
                },
                {
                  t: 'Arrivée du technicien',
                  d: 'Un plombier se déplace rapidement selon votre zone. contrôle et localisation de la fuite.'
                },
                {
                  t: 'Devis clair',
                  d: "Annonce du prix avant travaux. Vous décidez, puis on réalise l'intervention."
                },
                {
                  t: 'Réparation et conseils',
                  d: "Réparation durable, contrôle final, conseils d'entretien et prévention."
                }
              ].map((s, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-black flex items-center justify-center mb-4">
                    {i + 1}
                  </div>
                  <h3 className="font-black text-lg text-slate-900 mb-2">{s.t}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-12">
              Nos méthodes de <span className="text-blue-600">recherche de fuite</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {['Inspection caméra', 'Test de pression', 'Détection thermique'].map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
                  <Camera className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-black text-lg mb-2">{item}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Technologie avancée pour localiser précisément la <strong>fuite d'eau</strong> et réduire les travaux
                    inutiles. Objectif, réparer vite et proprement.
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 max-w-4xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-8 text-left">
              <h3 className="font-black text-slate-900 text-xl mb-3">Détection sans casse</h3>
              <p className="text-slate-700 leading-relaxed">
                Quand c'est possible, nous privilégions une <strong>recherche de fuite sans casse</strong>.
                Cela permet de limiter les coéts, de préserver vos murs et votre sol, et d'intervenir plus rapidement.
                Si une ouverture est nécessaire, elle est ciblée et expliquée clairement.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black mb-6">Tarifs transparents</h2>
            <p className="text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Nos prix sont annoncés avant intervention. Pour un <strong>dépannage fuite d'eau</strong>, le tarif dépend
              de la localisation de la fuite, de l'accessibilité et des piéces é remplacer. Vous recevez un <strong>devis</strong>
              clair avant travaux, sans surprise.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {["Déplacement et diagnostic", "Réparation ciblée", "Garantie et conseils"].map((t, i) => (
                <div key={i} className="bg-white/10 border border-white/10 rounded-2xl p-6 text-left">
                  <div className="flex items-center gap-3 font-black">
                    <Euro className="w-5 h-5 text-orange-400" /> {t}
                  </div>
                  <p className="text-slate-200 text-sm mt-2 leading-relaxed">
                    Devis détaillé. Matériel adapté. Intervention propre. Priorité é la solution durable.
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 inline-flex items-center gap-3 bg-white/10 px-8 py-5 rounded-2xl">
              <Euro className="w-6 h-6 text-orange-500" />
              <span className="font-bold">Devis gratuit avant travaux</span>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-6">Zones d'intervention</h2>
            <p className="text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Nos plombiers interviennent rapidement partout en <strong>Belgique</strong>, en <strong>Wallonie</strong>, é
              <strong>Bruxelles</strong> et selon les disponibilités en Flandre. Nous privilégions la proximité pour réduire
              le temps d'attente.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Namur', 'Liége', 'Charleroi', 'Bruxelles', 'Mons', 'Verviers', 'Wavre', 'Nivelles', 'Waterloo'].map((city, i) => (
                <span
                  key={i}
                  className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full font-medium"
                >
                  <MapPin className="w-4 h-4 text-blue-600" /> {city}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl font-black text-slate-900 mb-10 text-center">Questions fréquentes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    q: "Combien de temps pour intervenir",
                    a: "Nous faisons le maximum pour intervenir rapidement. Le délai dépend de votre zone et de la charge."
                  },
                  {
                    q: "Réparez vous les fuites sur chauffe eau",
                    a: "Oui, fuite sur groupe de sécurité, raccords, soupape, flexible et remplacement possible selon le cas."
                  },
                  {
                    q: "Faites vous de la recherche de fuite sans casser",
                    a: "Quand c'est possible, oui. Nous privilégions les méthodes de détection pour limiter les dégéts."
                  },
                  {
                    q: "Puis je faire marcher mon assurance",
                    a: "Selon votre contrat, oui. Nous vous conseillons sur les informations utiles et pouvons documenter l'intervention."
                  }
                ].map((f, i) => (
                  <div key={i} className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm text-left">
                    <h3 className="font-black text-slate-900 mb-2">{f.q}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{f.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-orange-600 text-white text-center">
          <h2 className="text-3xl font-black mb-4">Fuite d'eau ? Agissez maintenant</h2>
          <p className="mb-8 text-lg">Un plombier Aqua&Deb intervient au plus vite pour stopper la fuite et limiter les dégéts.</p>
          <a
            href={BRAND.phoneLink}
            className="inline-flex items-center gap-3 bg-white text-orange-600 font-black px-10 py-5 rounded-xl shadow-xl"
          >
            <Phone className="w-6 h-6" /> {BRAND.phoneDisplay}
          </a>
        </section>

                <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t-4 border-orange-600">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">

            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={BRAND.logoUrl} alt="Aqua&Deb" className="h-12 w-12 object-contain" />
                <span className="text-white font-extrabold text-lg">Aqua&Deb</span>
              </div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">À propos de nous</h4>
              <p className="text-sm leading-relaxed text-slate-500">
                Aqua&Deb est un partenaire de confiance pour la plomberie et le débouchage. Intervention rapide, garantie 12 mois,
                disponible 24h/24 et 7j/7.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">Nos services</h4>
              <ul className="space-y-2 text-sm">
                {[
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
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">Zones d'intervention</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: 'Liège', href: '/zones/liege' },
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
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">Contact</h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <Send className="w-4 h-4 text-slate-500" />
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

            <div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">Informations légales</h4>
              <ul className="space-y-2 text-sm">
                {['Conditions générales', 'Politique de confidentialité', 'Mentions légales'].map((item, i) => (
                  <li key={i}>
                    <a href="#" className="hover:text-white transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          <div className="container mx-auto px-4 border-t border-slate-900 pt-8 text-xs text-center text-slate-600">
            <p>&copy; 2025 Aqua&Deb. Tous droits réservés.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}











