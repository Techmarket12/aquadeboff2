import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getServiceLink } from '../utils/serviceRoutes';
import {
  Phone,
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
  Home,
  Bath,
  Droplets,
  Wrench,
  Ruler,
  Paintbrush,
  Shield,
  CalendarClock
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

const AiRenovationModal = ({ isOpen, onClose }) => {
  const [description, setDescription] = useState('');
  const [budget, setBudget] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!description.trim()) return;
    setLoading(true);
    setError('');
    setResult(null);

    const apiKey = '';
    const prompt = `Act as an expert bathroom renovation contractor in Belgium. The user wants to renovate sanitary areas.
Return JSON only.
User project: ${description}
Budget range: ${budget || 'not specified'}
Return:
{
  "project_type": "Salle de bain"|"WC"|"Douche"|"Baignoire"|"Multiple",
  "recommended_scope": "Short plan in French",
  "materials_tip": "Short tip in French",
  "estimated_duration": "X jours",
  "next_step": "Short CTA in French"
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
      const jsonText = String(rawText || '').replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(jsonText);
      setResult(parsed);
    } catch (e) {
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
            <h3 className="text-xl font-bold">Assistant Rénovation</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {!result ? (
            <>
              <p className="text-slate-600 mb-4 font-medium">
                Décrivez votre projet et on vous propose un plan simple. Cela aide é préparer le devis.
              </p>
              <textarea
                className="w-full border-2 border-slate-200 rounded-xl p-4 min-h-[120px] focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none resize-none bg-slate-50 text-slate-800 font-medium"
                placeholder="Ex: salle de bain 6m2, douche é l'italienne, meubles, carrelage, remplacement tuyauterie, WC suspendu..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <input
                className="w-full mt-4 border-2 border-slate-200 rounded-xl p-4 focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none bg-slate-50 text-slate-800 font-medium"
                placeholder="Budget approximatif (optionnel)"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              />
              {error ? <p className="mt-3 text-sm text-red-600 font-bold">{error}</p> : null}
              <button
                onClick={handleAnalyze}
                disabled={loading || !description.trim()}
                className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg text-lg"
              >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : <Sparkles className="w-6 h-6" />}
                {loading ? 'Analyse en cours...' : "Obtenir un plan"}
              </button>
            </>
          ) : (
            <div className="space-y-6">
              <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                <p className="text-xs font-black text-blue-700 uppercase tracking-wider">Type de projet</p>
                <p className="text-2xl font-black text-slate-900 mt-1">{result.project_type}</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <p className="text-slate-700 font-medium">{result.recommended_scope}</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="text-slate-800 font-bold">Conseil matériaux</p>
                <p className="text-slate-600 text-sm mt-1">{result.materials_tip}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="text-slate-500 text-xs font-bold">Durée estimée</p>
                  <p className="text-slate-900 font-black text-lg">{result.estimated_duration}</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200">
                  <p className="text-slate-500 text-xs font-bold">Prochaine étape</p>
                  <p className="text-slate-900 font-black text-sm">{result.next_step}</p>
                </div>
              </div>
              <a
                href={BRAND.phoneLink}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-xl text-xl"
              >
                <Phone className="w-6 h-6" /> Appeler pour un devis
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function RenovationSanitairePage() {
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

  const zones = useMemo(
    () => [
      'Bruxelles',
      'Anderlecht',
      'Schaerbeek',
      'Molenbeek',
      'Uccle',
      'Etterbeek',
      'Ixelles',
      'Saint Gilles',
      'Woluwe',
      'Namur',
      'Liége',
      'Charleroi',
      'Mons',
      'La Louviére',
      'Tournai',
      'Nivelles',
      'Wavre',
      'Waterloo',
      'Huy',
      'Seraing',
      'Verviers',
      'Dinant',
      'Ciney',
      'Gembloux'
    ],
    []
  );

  return (
    <div className="font-sans text-slate-800 antialiased bg-white selection:bg-orange-500 selection:text-white">
      <style>{styles}</style>
      <AiRenovationModal isOpen={isAiModalOpen} onClose={() => setIsAiModalOpen(false)} />

      <div className="bg-slate-900 text-white text-center py-2 px-4 text-xs md:text-sm font-bold">
        Rénovation sanitaire en Belgique. Salle de bain, douche, WC. Devis gratuit.
      </div>

      <div className="bg-slate-900 text-slate-300 py-2 text-xs hidden lg:block border-b border-slate-800">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2 text-green-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Garantie sur les travaux
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
                Devis rénovation
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
                <Sparkles className="w-5 h-5" /> Assistant projet
              </button>
            </div>
          </div>
        ) : null}
      </header>

      <main>
        <section className="relative pt-16 pb-24 bg-slate-900 overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-900/60"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-200 px-4 py-2 rounded-full text-sm font-bold mb-6">
              <Home className="w-4 h-4" /> Projet salle de bain et WC
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
              Rénovation <span className="text-orange-500">sanitaire</span>
              <br />
              salle de bain, douche, WC
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl lg:max-w-2xl">
              Aqua&Deb réalise votre <strong>rénovation sanitaire</strong> avec un résultat propre et durable.
              Modernisation de <strong>salle de bain</strong>, remplacement de <strong>WC</strong>, création de <strong>douche é l'italienne</strong>,
              mise é niveau de la <strong>plomberie</strong>, évacuations, robinetterie et finitions.
              Devis clair, conseils, planning et exécution maétrisée.
            </p>

            <div className="grid lg:grid-cols-3 gap-6 mt-10 max-w-3xl lg:max-w-4xl">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3 text-white font-black">
                  <CalendarClock className="w-5 h-5 text-orange-300" /> Planning clair
                </div>
                <p className="text-slate-200 text-sm mt-2">
                  Visite technique, devis, puis exécution avec étapes définies pour éviter les retards.
                </p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3 text-white font-black">
                  <ShieldCheck className="w-5 h-5 text-green-300" /> Travail garanti
                </div>
                <p className="text-slate-200 text-sm mt-2">
                  étanchéité, raccordements, finitions. Des matériaux adaptés et une pose soignée.
                </p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3 text-white font-black">
                  <CheckCircle2 className="w-5 h-5 text-cyan-300" /> Devis transparent
                </div>
                <p className="text-slate-200 text-sm mt-2">
                  Prix annoncé avant travaux. Pas de frais cachés. Options selon budget et besoins.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href={BRAND.phoneLink}
                className="bg-orange-600 hover:bg-orange-700 text-white font-black py-5 px-8 rounded-xl shadow-xl flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6" /> Appeler pour un devis
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
                <Sparkles className="w-5 h-5" /> Plan projet
              </button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black text-slate-900 mb-6 text-center">
              Travaux de <span className="text-blue-600">rénovation sanitaire</span> en Belgique
            </h2>
            <p className="text-slate-600 max-w-5xl mx-auto text-center text-lg leading-relaxed">
              Une <strong>rénovation sanitaire</strong> réussie, ce n'est pas seulement remplacer un meuble.
              C'est optimiser l'usage au quotidien, sécuriser l'<strong>étanchéité</strong>, moderniser la <strong>plomberie</strong>,
              améliorer les évacuations et obtenir des finitions propres.
              Aqua&Deb intervient sur maison, appartement, commerce et immeuble.
              Nous réalisons la rénovation compléte ou partielle, selon l'état des installations et votre budget.
            </p>

            <div className="mt-12 grid lg:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100">
                <h3 className="font-black text-lg text-slate-900 mb-3">Quand rénover</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Salle de bain vieillissante, joints noircis, fuites récurrentes, mauvaise ventilation, carrelage abémé,
                  WC instable, évacuation lente ou travaux aprés achat.
                  La rénovation permet de repartir sur une base saine.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100">
                <h3 className="font-black text-lg text-slate-900 mb-3">Objectif confort</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Douches plus pratiques, baignoire adaptée, rangements, robinetterie moderne,
                  meilleure circulation, finitions propres et entretien plus simple.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100">
                <h3 className="font-black text-lg text-slate-900 mb-3">Objectif valeur</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Une salle de bain rénovée valorise le logement, rassure é la revente et réduit les risques de dégéts des eaux.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">
              Prestations incluses dans la rénovation
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  t: 'Salle de bain compléte',
                  d: 'Dépose, plomberie, douche ou baignoire, meubles, robinetterie, finitions.',
                  icon: <Bath className="w-8 h-8 text-blue-600 mb-4" />
                },
                {
                  t: 'WC et sanitaires',
                  d: "WC suspendu, béti support, remplacement mécanisme, arrivée d'eau et évacuation.",
                  icon: <Droplets className="w-8 h-8 text-blue-600 mb-4" />
                },
                {
                  t: "Douche é l'italienne",
                  d: "Receveur, pente, évacuation, parois, étanchéité, joints et finitions.",
                  icon: <Home className="w-8 h-8 text-blue-600 mb-4" />
                },
                {
                  t: 'Plomberie sanitaire',
                  d: "Remise é niveau du réseau, multicouche, cuivre, raccordements et tests.",
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
              {[{
                h: 'étanchéité et protections',
                p: "Traitement des zones d'eau, joints, siphons, contrôle des infiltrations."
              }, {
                h: 'évacuations et pentes',
                p: "Optimisation des évacuations pour éviter les odeurs, refoulements et bouchons."
              }, {
                h: 'Robinetterie et finitions',
                p: "Mitigeurs, flexibles, accessoires, réglages et finition propre."
              }].map((b, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-7 shadow-sm">
                  <h3 className="font-black text-lg text-slate-900 mb-3">{b.h}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{b.p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black text-slate-900 mb-6">
                Pourquoi une rénovation bien faite évite les <span className="text-red-600">problémes</span>
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Beaucoup de soucis viennent d'une mauvaise étanchéité, d'une évacuation mal dimensionnée,
                ou de raccordements mal faits.
                Une <strong>rénovation sanitaire</strong> doit être pensée comme un ensemble.
                Nous faisons un contrôle technique, puis une exécution propre avec tests.
              </p>
              <ul className="space-y-4">
                {[
                  "Réduction des risques de fuite",
                  'évacuation fluide et sans odeurs',
                  'Finitions plus durables',
                  'Confort et entretien simplifié'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-bold">
                    <CheckCircle2 className="w-5 h-5 text-green-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
              <h3 className="font-black text-slate-900 text-xl mb-3">Checklist avant travaux</h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>Mesures et plan, contraintes techniques, emplacement évacuation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>Choix des équipements, robinetterie, meubles, carrelage et accessoires</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                  <span>étanchéité zones d'eau, ventilation, évacuations et pentes</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Comment se passe votre projet</h2>
            <p className="text-slate-600 mb-12 max-w-4xl mx-auto">
              Méthode simple, orientée résultat.
              Visite technique, devis, planning, réalisation et réception.
            </p>
            <div className="grid md:grid-cols-4 gap-8 text-left">
              {[
                { t: 'Visite et mesures', d: 'Analyse, mesures, contraintes, état plomberie et évacuations.' },
                { t: 'Devis clair', d: "Devis détaillé, choix des options, validation du planning." },
                { t: 'Travaux', d: "Dépose, plomberie, pose équipements, étanchéité et finitions." },
                { t: 'Réception', d: "Tests, réglages, explications et conseils d'entretien." }
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

        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black mb-6">Budget et tarifs</h2>
            <p className="text-slate-300 mb-10 max-w-5xl mx-auto leading-relaxed">
              Une <strong>rénovation sanitaire</strong> dépend de la surface, de la complexité, des matériaux et des équipements.
              Nous annonéons un <strong>devis</strong> avant travaux.
              Vous gardez le contrôle sur les options.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                { t: 'Visite et chiffrage', d: 'Analyse technique et devis détaillé.' },
                { t: 'Fourniture et pose', d: 'Pose équipements, plomberie, étanchéité et finitions.' },
                { t: 'Garantie', d: "contrôle, tests et conseils. Travail soigné." }
              ].map((b, i) => (
                <div key={i} className="bg-white/10 border border-white/10 rounded-2xl p-6 text-left">
                  <div className="flex items-center gap-3 font-black">
                    <Euro className="w-5 h-5 text-orange-400" /> {b.t}
                  </div>
                  <p className="text-slate-200 text-sm mt-2 leading-relaxed">{b.d}</p>
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
              Aqua&Deb intervient pour votre <strong>rénovation sanitaire</strong> dans toute la <strong>Belgique</strong>.
              Nous couvrons <strong>Bruxelles</strong> et la <strong>Wallonie</strong> (Namur, Liége, Charleroi, Mons, Verviers,
              Brabant wallon). Intervention possible selon disponibilités en Flandre.
              Pour un projet de <strong>rénovation salle de bain</strong> ou <strong>rénovation WC</strong>, appelez maintenant.
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
              {zones.map((city, i) => (
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
                    q: 'Faites vous rénovation compléte salle de bain',
                    a: "Oui. Dépose, plomberie, évacuations, étanchéité, pose douche ou baignoire, WC, finitions." 
                  },
                  {
                    q: "Pouvez vous faire douche é l'italienne",
                    a: "Oui. contrôle pentes, étanchéité, receveur ou chape, évacuation et parois." 
                  },
                  {
                    q: 'Combien de temps dure une rénovation',
                    a: "Selon la complexité et les finitions. Aprés visite, on vous donne un planning clair." 
                  },
                  {
                    q: 'Vous intervenez dans ma ville',
                    a: "Nous couvrons Bruxelles, Wallonie et alentours. Appelez et on confirme la disponibilité." 
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
          <h2 className="text-3xl font-black mb-4">Rénovation sanitaire, demandez votre devis</h2>
          <p className="mb-8 text-lg">
            Aqua&Deb planifie votre chantier et vous propose une solution claire pour votre salle de bain, douche et WC.
          </p>
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
                Aqua&Deb est un partenaire de confiance pour la plomberie et le débouchage.
                Devis rénovation, chantier propre, finitions soignées, accompagnement complet.
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












