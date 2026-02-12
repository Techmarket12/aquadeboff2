import React, { useEffect, useState } from 'react';
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
  Mail,
  Search,
  ScanEye,
  Activity,
  FileText
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
    'https://res.cloudinary.com/dw9jkwccj/image/upload/v1766673668/aquadeb_cgzzsg.png?stp=dst-jpg_s200x200_tt6&_nc_cat=110&ccb=1-7&_nc_sid=e99d92&_nc_ohc=fxUdz8CZDwIQ7kNvwFPE_mG&_nc_oc=AdmHXiZb_JPA4yegaOUXndoZ-eflzFNBiB-aRRMWSLmrOaDIiir48tn-cViJMfAbNEY&_nc_zt=24&_nc_ht=scontent-lga3-3.xx&_nc_gid=9JrntzsW-6BdH6ZD_wi9dA&oh=00_AfngjZ802_se1bD5T_Kna3ZxygdW341dHZwuMWQydKYtnw&oe=6947583C'
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
    const prompt = `Act as an expert in leak detection and pipe inspection. Analyze this customer issue: "${description}".
    Respond in JSON format ONLY.
    {
      "urgency": "Faible" | "Moyenne" | "Haute",
      "safety_tip": "Short immediate advice in French (e.g. Cut main water valve)",
      "service_detected": "Inspection Caméra" or "Détection Thermique" or "Gaz Traceur" or "écoute Acoustique",
      "estimated_intervention_time": "1h - 2h"
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
            <h3 className="text-xl font-bold">Diagnostic Fuite & Caméra</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {!result ? (
            <>
              <p className="text-slate-600 mb-4 font-medium">
                Fuite invisible ? Humidité anormale ? Besoin de localiser une canalisation ? Décrivez la situation.
              </p>
              <textarea
                className="w-full border-2 border-slate-200 rounded-xl p-4 min-h-[120px] focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none resize-none bg-slate-50 text-slate-800 font-medium"
                placeholder="Exemple : J'ai une tache d'humidité qui grandit au plafond mais je ne vois pas de tuyau..."
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
                {loading ? 'Analyse en cours...' : "Analyser le probléme"}
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
                <Phone className="w-6 h-6" /> Appeler l'Expert Fuite
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function InspectionCameraRechercheFuitesPage() {
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
        Recherche de fuite non destructive & Inspection caméra HD. Rapport pour assurance fourni.
      </div>

      <div className="bg-slate-900 text-slate-300 py-2 text-xs hidden lg:block border-b border-slate-800">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2 text-green-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Matériel Haute Technologie
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> Bruxelles, Wallonie & Flandre
            </span>
          </div>
          <div className="flex gap-4">
            <Link to="/contact" className="hover:text-white transition-colors">
              Demande d'intervention
            </Link>
            <span>|</span>
            <span className="flex items-center gap-1 text-orange-400 font-bold">
              <Star className="w-3 h-3 fill-current" /> 5/5 (Technologie de pointe)
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
              <div className="absolute inset-0 bg-blue-500 rounded-full blur opacity-20 group-hover:opacity-40 transition-opacity"></div>
              <img
                src={BRAND.logoUrl}
                alt="Aqua&Deb Logo"
                className="relative h-12 w-12 md:h-14 md:w-14 rounded-full object-cover border-2 border-white shadow-md"
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
              src="https://images.unsplash.com/photo-1599317933939-2a912e73f8a0?auto=format&fit=crop&q=80&w=2000"
              alt="Inspection caméra canalisation"
              className="w-full h-full object-cover object-center opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-900/60"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Search className="w-4 h-4" /> Détection de précision
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
              Inspection <span className="text-orange-500">Caméra</span> &
              <br />
              Recherche de Fuites
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl lg:max-w-2xl">
              Ne laissez pas une fuite invisible dégrader votre habitat. Nous localisons <strong>précisément</strong> l'origine du probléme
              sans casse inutile gréce é nos technologies de pointe (caméra endoscopique, thermique, gaz traceur).
              <strong>Rapport complet fourni pour votre assurance.</strong>
            </p>

            <div className="grid lg:grid-cols-3 gap-6 mt-10 max-w-3xl lg:max-w-4xl">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3 text-white font-black">
                  <ScanEye className="w-5 h-5 text-orange-300" /> Vision HD
                </div>
                <p className="text-slate-200 text-sm mt-2">
                  Inspection vidéo de vos canalisations pour détecter fissures, racines, affaissements et bouchons.
                </p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3 text-white font-black">
                  <ShieldCheck className="w-5 h-5 text-green-300" /> Sans Casse
                </div>
                <p className="text-slate-200 text-sm mt-2">
                  Nous trouvons la fuite sans démolir vos murs ou votre sol. Intervention chirurgicale uniquement si nécessaire.
                </p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3 text-white font-black">
                  <FileText className="w-5 h-5 text-cyan-300" /> Rapport Expert
                </div>
                <p className="text-slate-200 text-sm mt-2">
                  Dossier technique complet avec photos et localisation pour la prise en charge par votre assurance.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href={BRAND.phoneLink}
                className="bg-orange-600 hover:bg-orange-700 text-white font-black py-5 px-8 rounded-xl shadow-xl flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6" /> Appeler un expert
              </a>
              <button
                onClick={() => navigate('/contact')}
                className="bg-white/10 hover:bg-white/20 text-white font-bold py-5 px-8 rounded-xl"
              >
                Devis Inspection
              </button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black text-slate-900 mb-6 text-center">
              Voir l'<span className="text-blue-600">Invisible</span>
            </h2>
            <p className="text-slate-600 max-w-4xl mx-auto text-center text-lg leading-relaxed">
              Une surconsommation d'eau inexpliquée ? Une tache d'humidité qui s'étend ? Des mauvaises odeurs récurrentes ?
              Le probléme se cache souvent sous terre ou derriére un mur. Aqua&Deb utilise un arsenal technologique
              pour rendre l'invisible visible et diagnostiquer l'état de santé réel de vos réseaux.
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">
              Nos méthodes de <span className="text-blue-600">Détection</span>
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {['Inspection Caméra', 'Caméra Thermique', 'Gaz Traceur', 'écoute Acoustique'].map((item, i) => (
                <div key={i} className="bg-slate-50 rounded-2xl p-6 shadow-sm border border-slate-100">
                  <Activity className="w-8 h-8 text-blue-600 mb-4" />
                  <h3 className="font-black text-lg mb-2">{item}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Utilisation de technologie de pointe pour <strong>{item.toLowerCase()}</strong>.
                    Chaque méthode est adaptée é un type de fuite (eau chaude, canalisation enterrée, micro-fuite).
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 grid lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <h3 className="font-black text-lg text-slate-900 mb-3">Inspection Vidéo (Endoscopie)</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Nous insérons une caméra HD dans vos tuyaux (diamêtres 32mm é 200mm).
                  Cela permet de visualiser l'intérieur en temps réel et d'enregistrer la cause du probléme :
                  bouchon, calcaire, racine, cassure, contre-pente ou joint défectueux.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <h3 className="font-black text-lg text-slate-900 mb-3">Thermographie Infrarouge</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Idéal pour les fuites d'eau chaude ou de chauffage. La caméra thermique visualise les différences de température
                  dans les murs ou le sol, révélant le tracé exact de la fuite sans rien casser.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                <h3 className="font-black text-lg text-slate-900 mb-3">Traéage de Réseaux</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Vous ne savez pas oé passent vos tuyaux ou votre fosse septique ?
                  Gréce é nos sondes émettrices, nous pouvons cartographier précisément votre réseau d'égouttage
                  et marquer l'emplacement exact au sol (profondeur et direction).
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6">
                Pourquoi choisir une <span className="text-red-600">recherche de fuite</span> professionnelle ?
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Casser un mur ou un carrelage au hasard coéte cher et ne garantit pas de trouver la fuite.
                Notre approche est scientifique : nous localisons le point exact de la rupture pour minimiser
                les travaux de réparation.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                De plus, la plupart des contrats d'assurance habitation ("dégéts des eaux") couvrent les frais
                de recherche de fuite. Notre rapport détaillé facilite votre remboursement.
              </p>
              <ul className="space-y-4">
                {[
                  'Localisation précise au cm prés',
                  "économie de travaux de démolition",
                  'Rapport accepté par les experts',
                  'Intervention propre et rapide'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-green-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=1000"
                alt="écran de caméra thermique"
                className="rounded-2xl shadow-2xl w-full max-w-xl object-cover object-center mx-auto"
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">
              Déroulement de l'<span className="text-blue-600">inspection</span>
            </h2>
            <p className="text-slate-600 mb-12 max-w-3xl mx-auto">
              Une méthodologie rigoureuse pour ne rien laisser au hasard.
            </p>
            <div className="grid md:grid-cols-4 gap-8 text-left">
              {[
                {
                  t: 'Pré-diagnostic',
                  d: "Analyse de la situation (compteur, taches, pression). Choix de la méthode adaptée."
                },
                {
                  t: 'Investigation',
                  d: 'Déploiement du matériel (caméra, sonde, gaz). Localisation de la fuite.'
                },
                {
                  t: 'Marquage',
                  d: "Marquage physique de l'emplacement de la fuite ou du défaut au sol/mur."
                },
                {
                  t: 'Rapport & Devis',
                  d: "Rédaction du rapport pour l'assurance et devis pour la réparation ciblée."
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
              Quand demander une <span className="text-blue-600">inspection caméra</span> ?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {['Bouchons récurrents', 'Avant achat immobilier', 'Odeurs d\'égout'].map((item, i) => (
                <div key={i} className="p-8 bg-slate-50 rounded-2xl border border-slate-100">
                  <Camera className="w-10 h-10 text-blue-600 mx-auto mb-4" />
                  <h3 className="font-black text-lg mb-2">{item}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    L'inspection vidéo n'est pas réservée aux fuites. Elle est indispensable avant d'acheter une maison ancienne
                    pour vérifier l'état des évacuations, ou pour comprendre pourquoi un WC se bouche tous les mois.
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-12 max-w-4xl mx-auto bg-blue-50 border border-blue-100 rounded-2xl p-8 text-left">
              <h3 className="font-black text-slate-900 text-xl mb-3">La réparation post-détection</h3>
              <p className="text-slate-700 leading-relaxed">
                Une fois la fuite trouvée, nous ne vous laissons pas seul. Aqua&Deb peut procéder immédiatement é la réparation,
                souvent de maniére moins invasive gréce au diagnostic précis. Nous proposons des solutions de réparation
                ponctuelle ou de chemisage partiel.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black mb-6">Tarifs Inspection & Recherche</h2>
            <p className="text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Des forfaits clairs. La recherche de fuite est souvent remboursée par votre assurance habitation.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {["Passage Caméra", "Recherche Compléte", "Pack Recherche + Réparation"].map((t, i) => (
                <div key={i} className="bg-white/10 border border-white/10 rounded-2xl p-6 text-left">
                  <div className="flex items-center gap-3 font-black">
                    <Euro className="w-5 h-5 text-orange-400" /> {t}
                  </div>
                  <p className="text-slate-200 text-sm mt-2 leading-relaxed">
                    Tarif forfaitaire selon la complexité. Rapport écrit et photos inclus.
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 inline-flex items-center gap-3 bg-white/10 px-8 py-5 rounded-2xl">
              <Euro className="w-6 h-6 text-orange-500" />
              <span className="font-bold">Demandez votre devis gratuit</span>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-6">Zones d'intervention</h2>
            <p className="text-slate-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Nous intervenons pour les inspections et recherches de fuites partout en <strong>Belgique</strong>,
              en <strong>Wallonie</strong> et é <strong>Bruxelles</strong>.
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
                    q: "L'assurance rembourse-t-elle la recherche de fuite ?",
                    a: "Oui, la plupart des contrats habitation multirisques couvrent les frais de recherche de fuite, méme si la fuite elle-méme n'est pas couverte."
                  },
                  {
                    q: "Pouvez-vous trouver une fuite sous du béton ?",
                    a: "Oui, gréce au gaz traceur et é l'écoute électro-acoustique, nous pouvons localiser une fuite sous une dalle béton."
                  },
                  {
                    q: "Faut-il casser pour passer la caméra ?",
                    a: "Non, nous passons par les accés existants (regards, siphons, toilettes, toitures) pour inspecter les canalisations."
                  },
                  {
                    q: "Fournissez-vous un rapport écrit ?",
                    a: "Oui, un rapport détaillé avec photos et localisation est systématiquement fourni pour votre dossier d'assurance."
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
          <h2 className="text-3xl font-black mb-4">Une fuite introuvable ?</h2>
          <p className="mb-8 text-lg">Ne cassez rien avant d'avoir appelé Aqua&Deb.</p>
          <a
            href={BRAND.phoneLink}
            className="inline-flex items-center gap-3 bg-white text-orange-600 font-black px-10 py-5 rounded-xl shadow-xl"
          >
            <Phone className="w-6 h-6" /> {BRAND.phoneDisplay}
          </a>
        </section>

        <footer className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t-4 border-orange-600">
          <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={BRAND.logoUrl} alt="Aqua&Deb" className="h-12 w-12 rounded-full border-2 border-white shadow" />
                <span className="text-white font-extrabold text-lg">Aqua&Deb</span>
              </div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">
                À propos de nous
              </h4>
              <p className="text-sm leading-relaxed text-slate-500">
                Aqua&Deb est un partenaire de confiance pour la plomberie et le débouchage. Intervention rapide, garantie 12 mois,
                disponible 24h/24 et 7j/7.
              </p>
            </div>            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={BRAND.logoUrl} alt="Aqua&Deb" className="h-12 w-12 rounded-full border-2 border-white shadow" />
                <span className="text-white font-extrabold text-lg">Aqua&Deb</span>
              </div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">
                Nos services
              </h4>
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
            </div>            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={BRAND.logoUrl} alt="Aqua&Deb" className="h-12 w-12 rounded-full border-2 border-white shadow" />
                <span className="text-white font-extrabold text-lg">Aqua&Deb</span>
              </div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">
                Zones d'intervention
              </h4>
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
          </div>

          <div className="container mx-auto px-4 border-t border-slate-900 pt-8 text-xs text-center text-slate-600">
            <p>© 2025 Aqua&Deb. Tous droits réservés.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}











