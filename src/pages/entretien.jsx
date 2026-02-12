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
  CalendarClock,
  Wrench,
  Droplets,
  Shield,
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

export default function EntretienPlomberiePage() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

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
      'Ixelles',
      'Etterbeek',
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

      <div className="bg-slate-900 text-white text-center py-2 px-4 text-xs md:text-sm font-bold">
        Services d'Entretien Plomberie en Belgique. Prévention, contrôle et longévité des installations.
      </div>

      <div className="bg-slate-900 text-slate-300 py-2 text-xs hidden lg:block border-b border-slate-800">
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex gap-6">
            <span className="flex items-center gap-2 text-green-400 font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Intervention planifiée
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
                Entretien plomberie
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
          <div className="absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-2xl p-0 flex flex-col gap-0 xl:hidden max-h-[90vh] overflow-y-auto z-40">
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
                        <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === idx ? (
                        <div className="px-4 pb-4 space-y-4 bg-slate-50">
                          {link.columns.map((col, cIdx) => (
                            <div key={cIdx}>
                              <h5 className="text-blue-600 font-bold uppercase text-xs mb-2">{col.title}</h5>
                              <ul className="space-y-2 border-l-2 border-slate-200 pl-4">
                                {col.items.map((item, iIdx) => (
                                  <li key={iIdx} className="text-sm text-slate-600">
                                <a href={typeof item === 'string' ? '#' : item.href} className="text-blue-700 font-semibold">
                                  {typeof item === 'string' ? item : item.label}
                                </a>
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
                        <ChevronDown className={`w-5 h-5 transition-transform ${activeDropdown === idx ? 'rotate-180' : ''}`} />
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
              <CalendarClock className="w-4 h-4" /> Maintenance préventive
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
              Services d'<span className="text-orange-500">Entretien Plomberie</span>
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl lg:max-w-2xl leading-relaxed">
              Les <strong>services d'entretien plomberie</strong> permettent de prévenir les <strong>fuites d'eau</strong>,
              les <strong>pannes</strong> et les <strong>dégéts des eaux</strong>. Aqua&Deb réalise un <strong>entretien de plomberie</strong>
              complet et professionnel pour sécuriser votre réseau, améliorer la performance des installations sanitaires
              et prolonger la durée de vie de la robinetterie, des évacuations, des WC et des équipements.
              Nous intervenons en <strong>Belgique</strong>, é <strong>Bruxelles</strong> et dans toute la <strong>Wallonie</strong>.
            </p>

            <div className="grid lg:grid-cols-3 gap-6 mt-10 max-w-3xl lg:max-w-4xl">
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3 text-white font-black">
                  <ShieldCheck className="w-5 h-5 text-green-300" /> Sécurité
                </div>
                <p className="text-slate-200 text-sm mt-2 leading-relaxed">
                  contrôle des points sensibles, prévention des fuites invisibles et réduction du risque de dégéts.
                </p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3 text-white font-black">
                  <Wrench className="w-5 h-5 text-orange-300" /> Prévention
                </div>
                <p className="text-slate-200 text-sm mt-2 leading-relaxed">
                  Nettoyage préventif, vérification des évacuations, contrôle de pression, réglages et conseils.
                </p>
              </div>
              <div className="bg-white/10 border border-white/10 rounded-2xl p-5 text-left">
                <div className="flex items-center gap-3 text-white font-black">
                  <CheckCircle2 className="w-5 h-5 text-cyan-300" /> Longévité
                </div>
                <p className="text-slate-200 text-sm mt-2 leading-relaxed">
                  Prolonge la durée de vie des installations sanitaires, limite l'usure et les réparations répétées.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <a
                href={BRAND.phoneLink}
                className="bg-orange-600 hover:bg-orange-700 text-white font-black py-5 px-8 rounded-xl shadow-xl flex items-center justify-center gap-3"
              >
                <Phone className="w-6 h-6" /> Planifier un entretien
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
              Entretien plomberie en Belgique
            </h2>
            <p className="text-slate-600 max-w-5xl mx-auto text-center text-lg leading-relaxed">
              Un <strong>entretien plomberie régulier</strong> est la meilleure stratégie pour éviter les urgences.
              Avec le temps, le calcaire, les dépéts et l'usure naturelle créent des micro fuites,
              une baisse de pression, des odeurs et des évacuations plus lentes.
              En anticipant, vous réduisez les risques de <strong>dégéts des eaux</strong> et vous gardez une installation
              saine. L'entretien est particuliérement utile pour les logements en location, les copropriétés,
              les commerces et les maisons anciennes.
            </p>
            <div className="mt-10 grid lg:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100">
                <h3 className="font-black text-lg text-slate-900 mb-3">Signes é surveiller</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Siphon qui sent, évacuation lente, robinet qui goutte, chasse d'eau qui se remplit en continu,
                  traces d'humidité, pression irréguliére, bruit dans les tuyaux. Ces signaux sont souvent
                  les premiers indicateurs d'un besoin d'entretien.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100">
                <h3 className="font-black text-lg text-slate-900 mb-3">Bénéfices réels</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Moins de pannes, moins de fuites, moins de bouchons. Un réseau entretenu offre une meilleure
                  performance et réduit les remplacements coéteux.
                </p>
              </div>
              <div className="bg-slate-50 rounded-2xl p-7 border border-slate-100">
                <h3 className="font-black text-lg text-slate-900 mb-3">Pour qui</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Propriétaires, bailleurs, syndics, gestionnaires de biens, commeréants.
                  Nous adaptons l'entretien é votre installation et é votre usage.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">
              Ce que comprend notre entretien plomberie
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  t: 'contrôle des points sensibles',
                  d: "Vérification des raccords, joints, vannes, flexibles, robinets et alimentation générale."
                },
                {
                  t: 'Sanitaires et robinetterie',
                  d: "Test des WC, mécanismes, chasses, mitigeurs, mousseurs et réglages anti fuite."
                },
                {
                  t: 'évacuations et siphons',
                  d: "Nettoyage préventif des siphons, contrôle des odeurs, vérification de la pente et du débit."
                },
                {
                  t: 'Conseils et prévention',
                  d: "Recommandations claires pour éviter les bouchons, réduire le calcaire et surveiller les signes."
                }
              ].map((item, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                  <Wrench className="w-8 h-8 text-blue-600 mb-4" />
                  <h3 className="font-black text-lg mb-2">{item.t}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 max-w-5xl mx-auto bg-white rounded-2xl border border-slate-100 p-8">
              <h3 className="font-black text-slate-900 text-xl mb-3">Entretien préventif et économies</h3>
              <p className="text-slate-600 leading-relaxed">
                L'objectif d'un <strong>entretien plomberie</strong> est simple. Réduire les risques avant qu'un probléme
                n'apparaisse. Un robinet qui goutte, une chasse qui fuit, un siphon encrassé ou une petite fuite sur un raccord
                peuvent coéter cher sur l'année et provoquer des dégéts. En intervenant tét, on limite les réparations,
                on évite les urgences et on prolonge la durée de vie du réseau.
              </p>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-4">Comment se passe une intervention</h2>
            <p className="text-slate-600 mb-12 max-w-4xl mx-auto">
              Méthode simple, claire et efficace. On contrôle, on nettoie, on sécurise, puis on vous explique.
            </p>
            <div className="grid md:grid-cols-4 gap-8 text-left">
              {[
                {
                  t: 'Prise de rendez vous',
                  d: 'Vous expliquez votre situation. Nous planifions selon votre zone et vos disponibilités.'
                },
                {
                  t: 'contrôle technique',
                  d: 'Inspection des points clés, vérification du débit, de la pression et des éléments é risque.'
                },
                {
                  t: 'Nettoyage et réglages',
                  d: 'Nettoyage préventif des siphons, contrôle des WC, réglage robinetterie et éléments sanitaires.'
                },
                {
                  t: 'Compte rendu',
                  d: "Conseils et recommandations pour éviter les fuites, les odeurs et les bouchons."
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

        <section className="py-20 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black mb-6">Tarifs transparents</h2>
            <p className="text-slate-300 mb-10 max-w-5xl mx-auto leading-relaxed">
              Pour un <strong>entretien plomberie</strong>, le prix dépend de la taille de l'installation,
              du nombre d'équipements et de l'état général.
              Nous annonéons un <strong>devis</strong> avant intervention. Pas de frais cachés.
              L'objectif est une prestation utile, concréte et rentable.
            </p>
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {['Déplacement et contrôle', 'Nettoyage préventif', 'Conseils et prévention'].map((t, i) => (
                <div key={i} className="bg-white/10 border border-white/10 rounded-2xl p-6 text-left">
                  <div className="flex items-center gap-3 font-black">
                    <Euro className="w-5 h-5 text-orange-400" /> {t}
                  </div>
                  <p className="text-slate-200 text-sm mt-2 leading-relaxed">
                    Intervention utile et ciblée. Priorité aux points é risque et aux causes réelles.
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-10 inline-flex items-center gap-3 bg-white/10 px-8 py-5 rounded-2xl">
              <Euro className="w-6 h-6 text-orange-500" />
              <span className="font-bold">Devis gratuit avant intervention</span>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-black text-slate-900 mb-6">Zones d'intervention</h2>
            <p className="text-slate-600 mb-10 max-w-5xl mx-auto leading-relaxed">
              Aqua&Deb intervient pour l'<strong>entretien plomberie</strong> dans toute la <strong>Belgique</strong>,
              en priorité é <strong>Bruxelles</strong> et en <strong>Wallonie</strong>.
              Nous privilégions la proximité pour un suivi régulier et des interventions planifiées.
              Namur, Liége, Charleroi, Mons, Verviers et alentours.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
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
                    q: 'é quelle fréquence faire un entretien plomberie',
                    a: "En général, une fois par an est recommandé. Pour un logement ancien ou une location, cela peut être plus régulier selon usage."
                  },
                  {
                    q: "L'entretien évite t il les fuites", 
                    a: "Il permet de détecter l'usure et les signes avant qu'une fuite importante n'apparaisse, ce qui réduit fortement le risque de dégéts."
                  },
                  {
                    q: 'Intervenez vous pour commerces et copropriétés',
                    a: "Oui. Nous adaptons l'entretien aux contraintes d'un local professionnel ou d'un immeuble et nous planifions selon horaires."
                  },
                  {
                    q: 'Que faire si je remarque une odeur ou une évacuation lente',
                    a: "C'est souvent un signe d'encrassement. Un entretien préventif permet de nettoyer et de vérifier la cause avant un bouchon."
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
          <h2 className="text-3xl font-black mb-4">Planifiez votre entretien plomberie</h2>
          <p className="mb-8 text-lg">Un entretien régulier aujourd'hui évite les urgences demain.</p>
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
                Aqua&Deb est un partenaire de confiance pour la plomberie et le débouchage. Intervention rapide, garantie,
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
            </div>            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={BRAND.logoUrl} alt="Aqua&Deb" className="h-12 w-12 rounded-full border-2 border-white shadow" />
                <span className="text-white font-extrabold text-lg">Aqua&Deb</span>
              </div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">
                Contact
              </h4>
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
            </div>            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={BRAND.logoUrl} alt="Aqua&Deb" className="h-12 w-12 rounded-full border-2 border-white shadow" />
                <span className="text-white font-extrabold text-lg">Aqua&Deb</span>
              </div>
              <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-wider border-b border-slate-800 pb-2 inline-block">
                Informations légales
              </h4>
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
            <p>© 2025 Aqua&Deb. Tous droits réservés.</p>
          </div>
        </footer>
      </main>
    </div>
  );
}











