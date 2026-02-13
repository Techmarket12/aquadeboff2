import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getServiceLink } from '../utils/serviceRoutes';
import {
  Phone,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Euro,
  ChevronDown,
  Menu,
  X,
  Star,
  Sparkles,
  Bot,
  Loader2,
  Send,
  Mail,
  Flame,
  Thermometer,
  Heater,
  Wrench,
  Home,
  Droplets,
  Wind
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
    const prompt = `Act as an expert heating technician in Belgium. Analyze this customer issue: "${description}".
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
            <h3 className="text-xl font-bold">Diagnostic Chauffage</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {!result ? (
            <>
              <p className="text-slate-600 mb-4 font-medium">
                Décrivez votre panne chauffage. L'IA vous donne des conseils immédiats en attendant le technicien.
              </p>
              <textarea
                className="w-full border-2 border-slate-200 rounded-xl p-4 min-h-[120px] focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none resize-none bg-slate-50 text-slate-800 font-medium"
                placeholder="Ex: chaudiére en panne, plus de chauffage, radiateurs froids, pression basse, fuite sur chaudiére, code erreur..."
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

export default function DepannageChauffagePage() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-sans text-slate-800 antialiased bg-white selection:bg-orange-500 selection:text-white">
      <style>{styles}</style>
      <AiDiagnosticModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />

      <div className="bg-red-600 text-white text-center py-2 px-4 text-xs md:text-sm font-bold">
        Dépannage chauffage 24h/24. Chaudiére en panne, plus de chauffage, intervention rapide.
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
                      {link.type === 'mega' || link.type === 'dropdown' ? (
                        <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />
                      ) : null}
                    </NavComponent>

                    {link.type === 'mega' ? (
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
              src="https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142107/reparation-tuyauterie-avant-apres_xq3gnb.png"
              alt="Dépannage chauffage"
              className="w-full h-full object-cover object-center opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-900/60"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <AlertTriangle className="w-4 h-4" /> Urgence chauffage 24h/24
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
              Dépannage <span className="text-orange-500">chauffage</span>
              <br />
              chaudiére en panne, intervention rapide
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl lg:max-w-2xl">
              Plus de chauffage, plus d'eau chaude, radiateurs froids, pression instable, code erreur.
              Aqua&Deb intervient en <strong>urgence</strong> pour votre <strong>dépannage chauffage</strong>.
              Diagnostic clair, réparation ciblée, remise en service rapide, avec priorité é votre confort.
            </p>

            <div className="grid lg:grid-cols-3 gap-6 mt-10 max-w-3xl lg:max-w-4xl">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3 text-white font-black">
                  <Clock className="w-5 h-5 text-orange-300" /> Arrivée rapide
                </div>
                <p className="text-slate-200 text-sm mt-2">
                  Intervention possible en <strong>45 minutes</strong> selon votre zone et la disponibilité.
                </p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3 text-white font-black">
                  <ShieldCheck className="w-5 h-5 text-green-300" /> Intervention propre
                </div>
                <p className="text-slate-200 text-sm mt-2">
                  Sécurisation, contrôle, purge si nécessaire, et remise en service avec explications.
                </p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3 text-white font-black">
                  <CheckCircle2 className="w-5 h-5 text-cyan-300" /> Réparation durable
                </div>
                <p className="text-slate-200 text-sm mt-2">
                  Remplacement de piéces si nécessaire, réglages, tests de sécurité et conseils d'entretien.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href={BRAND.phoneLink}
                className="bg-orange-600 hover:bg-orange-700 text-white font-black py-5 px-8 rounded-xl shadow-xl flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6" /> Appeler un technicien
              </a>
              <button
                onClick={() => navigate('/contact')}
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-5 px-8 rounded-xl"
              >
                Demande de devis gratuit
              </button>
              <button
                onClick={() => setIsAiModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 px-8 rounded-xl flex items-center justify-center gap-2"
              >
                <Sparkles className="w-5 h-5" /> Diagnostic IA
              </button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black text-slate-900 mb-6 text-center">
              Plombier et chauffagiste pour <span className="text-blue-600">dépannage chauffage</span>
            </h2>
            <p className="text-slate-600 max-w-5xl mx-auto text-center text-lg leading-relaxed">
              Le <strong>dépannage chauffage</strong> concerne les pannes de <strong>chaudiére</strong>, de <strong>radiateurs</strong>,
              de circuit d'eau chaude, de pression, de vannes, de circulateurs et de réglages.
              Une chaudiére qui se met en sécurité peut venir d'une pression trop basse, d'air dans le circuit,
              d'un thermostat défaillant ou d'un manque d'entretien.
              Aqua&Deb intervient pour diagnostiquer, sécuriser et remettre votre installation en service avec une solution durable.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">
              Pannes de chauffage prises en charge
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  t: 'Chaudiére en panne',
                  d: 'Plus de chauffage ou eau chaude. Diagnostic, remise en route, contrôle sécurité et réglages.',
                  icon: <Flame className="w-8 h-8 text-blue-600 mb-4" />
                },
                {
                  t: 'Radiateurs froids',
                  d: "Purge, réglage, équilibrage, vérification circulateurs, thermostat et vannes thermostatiques.",
                  icon: <Heater className="w-8 h-8 text-blue-600 mb-4" />
                },
                {
                  t: 'Pression instable',
                  d: "contrôle manomêtre, vase d'expansion, appoint d'eau, recherche de micro fuite.",
                  icon: <Thermometer className="w-8 h-8 text-blue-600 mb-4" />
                },
                {
                  t: 'Code erreur',
                  d: "Lecture de l'erreur, contrôle combustion, capteurs, allumage, évacuation et sécurité.",
                  icon: <Wrench className="w-8 h-8 text-blue-600 mb-4" />
                }
              ].map((item, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 shadow-sm border border-slate-100">
                  {item.icon}
                  <h3 className="font-black text-lg mb-2">{item.t}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <h3 className="font-black text-lg text-slate-900 mb-3">Signes d'une panne chauffage</h3>
                <ul className="space-y-3 text-slate-600 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Chaudiére qui se met en sécurité, voyant rouge ou code erreur</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Radiateurs tiédes, chauffage irrégulier, bruits dans le circuit</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Pression basse, variations de température, eau chaude absente</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <h3 className="font-black text-lg text-slate-900 mb-3">Que faire en attendant</h3>
                <ul className="space-y-3 text-slate-600 text-sm">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Vérifiez le thermostat et la programmation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>contrôlez la pression, souvent entre 1 et 2 bars selon l'installation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    <span>Si odeur de gaz ou bruit anormal, coupez et appelez immédiatement</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <h3 className="font-black text-lg text-slate-900 mb-3">Causes fréquentes</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Pression basse, air dans les radiateurs, vase d'expansion fatigué, circulateur bloqué,
                  filtre encrassé, thermostat défectueux, sonde, sécurité surchauffe, manque d'entretien.
                  Un <strong>diagnostic</strong> précis évite des remplacements inutiles.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6">
                Pourquoi intervenir vite sur une <span className="text-red-600">panne chauffage</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Sans chauffage, le confort chute et le risque d'humidité augmente.
                Une chaudiére qui redémarre mal peut cacher un probléme de sécurité ou une fuite.
                Notre technicien contrôle la pression, les sécurités, les paramètres et l'état du circuit.
                Objectif, remise en service rapide, avec une réparation durable.
              </p>
              <ul className="space-y-4">
                {[
                  'Retrouver chauffage et eau chaude rapidement',
                  'éviter la détérioration du systéme',
                  'Limiter les surconsommations',
                  'contrôle sécurité et conseils'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-green-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative flex justify-center">
              <img
                src="https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142107/fuite-wc-avant-apres_pcejsa.png"
                alt="Technicien chauffage"
                className="rounded-2xl shadow-2xl w-full max-w-xl object-cover object-center mx-auto"
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">
              Déroulé de votre intervention
            </h2>
            <p className="text-slate-600 mb-12 max-w-4xl mx-auto">
              Méthode claire et orientée résultat. Diagnostic, devis, réparation, remise en route et conseils.
            </p>
            <div className="grid md:grid-cols-4 gap-8 text-left">
              {[
                { t: 'Appel', d: "Vous décrivez la panne. On vous guide sur les vérifications simples." },
                { t: 'contrôle sur place', d: "Pression, thermostat, sécurité, circuit, purge et réglages." },
                { t: 'Devis annoncé', d: 'Prix clair avant travaux. Aucune surprise.' },
                { t: 'Remise en service', d: "Réparation, tests, vérifications et conseils d'entretien." }
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
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">
                Services chauffage disponibles
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Flame className="w-7 h-7 text-blue-600" />,
                    t: 'Dépannage chaudiére',
                    d: "Panne, mise en sécurité, codes erreurs. contrôle et remise en service si possible."
                  },
                  {
                    icon: <Heater className="w-7 h-7 text-blue-600" />,
                    t: 'Radiateurs et circuit',
                    d: "Purge, équilibrage, réglage, contrôle des vannes et du circulateur."
                  },
                  {
                    icon: <Thermometer className="w-7 h-7 text-blue-600" />,
                    t: 'Pression et vase',
                    d: "Pression basse, variations. contrôle vase d'expansion et appoint d'eau."
                  },
                  {
                    icon: <Droplets className="w-7 h-7 text-blue-600" />,
                    t: 'Fuite sur chaudiére',
                    d: "Micro fuite, raccord, soupape. Diagnostic et réparation ciblée."
                  },
                  {
                    icon: <Wind className="w-7 h-7 text-blue-600" />,
                    t: 'Problémes de ventilation',
                    d: "Vérification évacuation, tirage, sécurité et fonctionnement global."
                  },
                  {
                    icon: <Home className="w-7 h-7 text-blue-600" />,
                    t: 'Optimisation confort',
                    d: "Réglages, conseils d'utilisation, réduction des pertes et optimisation de la température."
                  }
                ].map((c, i) => (
                  <div key={i} className="bg-slate-50 rounded-2xl p-7 border border-slate-100">
                    <div className="flex items-center gap-3 font-black text-slate-900">
                      {c.icon}
                      <span>{c.t}</span>
                    </div>
                    <p className="text-slate-600 text-sm mt-3 leading-relaxed">{c.d}</p>
                  </div>
                ))}
              </div>

              <div className="mt-12 max-w-5xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-8 text-left">
                <h3 className="font-black text-slate-900 text-xl mb-3">Conseil entretien</h3>
                <p className="text-slate-700 leading-relaxed">
                  Un entretien régulier réduit les pannes et prolonge la durée de vie du chauffage.
                  Purge des radiateurs, contrôle pression, vérification du thermostat.
                  En cas de panne répétée, un diagnostic complet permet de stabiliser l'installation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black mb-6">Tarifs transparents</h2>
            <p className="text-slate-300 mb-10 max-w-4xl mx-auto leading-relaxed">
              Pour un <strong>dépannage chauffage</strong>, le prix dépend du type de panne, des piéces nécessaires,
              du temps d'intervention et de l'accessibilité.
              Nous annonéons le tarif avant travaux et vous recevez un <strong>devis</strong> clair.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {['Déplacement et diagnostic', 'Réparation et réglages', 'contrôle sécurité et conseils'].map((t, i) => (
                <div key={i} className="bg-white/10 border border-white/10 rounded-2xl p-6 text-left">
                  <div className="flex items-center gap-3 font-black">
                    <Euro className="w-5 h-5 text-orange-400" /> {t}
                  </div>
                  <p className="text-slate-200 text-sm mt-2 leading-relaxed">
                    Devis détaillé. Priorité é la remise en service rapide et é la solution durable.
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
            <p className="text-slate-600 mb-10 max-w-5xl mx-auto leading-relaxed">
              Aqua&Deb intervient pour votre <strong>dépannage chauffage</strong> dans toute la <strong>Belgique</strong>.
              Nous couvrons <strong>Bruxelles</strong> et la <strong>Wallonie</strong> (Namur, Liége, Charleroi, Mons, Verviers,
              Brabant wallon). Intervention possible selon disponibilités en Flandre.
              Si vous cherchez un <strong>chauffagiste</strong> prés de chez vous, appelez maintenant.
            </p>

            <div className="mt-8 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
              <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" /> Bruxelles
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Bruxelles, Anderlecht, Schaerbeek, Molenbeek, Uccle, Etterbeek, Ixelles, Saint Gilles, Woluwe.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" /> Wallonie
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Namur, Liége, Charleroi, Mons, La Louviére, Tournai, Nivelles, Wavre, Waterloo, Huy, Seraing,
                  Verviers, Dinant, Ciney, Gembloux.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100">
                <h3 className="font-black text-slate-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" /> Autres zones
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Brabant wallon et flamand, et intervention possible selon planning vers Louvain, Malines, Anvers.
                  Appelez pour confirmer la disponibilité.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              {[
                'Namur',
                'Liége',
                'Charleroi',
                'Bruxelles',
                'Mons',
                'Verviers',
                'Wavre',
                'Nivelles',
                'Waterloo',
                'La Louviére',
                'Tournai',
                'Seraing',
                'Huy',
                'Dinant',
                'Ciney',
                'Gembloux'
              ].map((city, i) => (
                <span key={i} className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-full font-medium">
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
                    q: 'Chaudiére en panne, vous intervenez',
                    a: "Oui. Diagnostic, contrôle des sécurités, réglages et remise en service si possible."
                  },
                  {
                    q: 'Radiateurs froids, que faire',
                    a: "On vérifie pression, purge, thermostat et vannes. Ensuite on intervient si nécessaire."
                  },
                  {
                    q: "Pression basse, c'est grave",
                    a: "Souvent un appoint suffit, mais cela peut indiquer une fuite ou un vase d'expansion. Diagnostic conseillé." 
                  },
                  {
                    q: 'Quel délai pour intervenir',
                    a: "Le délai dépend de votre zone et des urgences. Nous faisons le maximum pour intervenir rapidement." 
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
          <h2 className="text-3xl font-black mb-4">Panne chauffage ? Appelez maintenant</h2>
          <p className="mb-8 text-lg">
            Un technicien Aqua&Deb intervient au plus vite pour rétablir votre chauffage et votre eau chaude.
          </p>
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











