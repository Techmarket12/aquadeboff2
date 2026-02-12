import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServiceLink } from '../utils/serviceRoutes';
import CloudinaryUploader, { uploadFiles } from '../components/CloudinaryUploader';
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
  
  /* Style inputs focus */
  input:focus, textarea:focus, select:focus {
    border-color: #f97316;
    box-shadow: 0 0 0 4px rgba(249, 115, 22, 0.1);
  }
`;

// --- CONFIGURATION ---
const BRAND = {
  name: "Aqua&Deb",
  phoneDisplay: "0493 41 52 83",
  phoneLink: "tel:0493415283",
  email: "aquadeb22@gmail.com",
  logoUrl: "https://res.cloudinary.com/dw9jkwccj/image/upload/v1766673668/aquadeb_cgzzsg.png"
};

// --- NOUVELLES ICONS (Liens fournis) ---
const ICONS = {
  tiktok: "https://img.icons8.com/sf-regular-filled/48/tiktok.png",
  instagram: "https://img.icons8.com/external-tal-revivo-bold-tal-revivo/24/external-instagram-photo-and-video-sharing-social-networking-service-owned-by-facebook-logo-bold-tal-revivo.png",
  facebook: "https://img.icons8.com/ios-filled/50/facebook-new.png",
  phoneApple: "https://img.icons8.com/ios-filled/50/apple-phone.png",
  mapApple: "https://img.icons8.com/color/50/apple-map.png",
  mailApple: "https://img.icons8.com/ios-filled/50/new-post.png"
};

// --- DATA NAVIGATION (Identique Home) ---
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

// --- APP COMPONENT ---
export default function ContactPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="font-sans text-slate-800 antialiased bg-white selection:bg-orange-500 selection:text-white">
      <style>{styles}</style>

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

      {/* --- HEADER NAVIGATION (Identique Home) --- */}
      <header className={`sticky top-0 z-50 transition-all duration-300 bg-white border-b border-slate-100 ${isScrolled ? 'shadow-lg py-2' : 'py-3 md:py-4'}`}>
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
            <div className="relative">
              <img src={BRAND.logoUrl} alt="Aqua&Deb Logo" className="relative h-12 w-auto object-contain" />
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
                      className={`flex items-center gap-1 font-bold text-sm uppercase tracking-wide transition-colors py-4 ${link.active ? 'text-blue-600' : 'text-slate-600 hover:text-blue-700'}`}
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
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-black text-sm uppercase tracking-wide shadow-md transition-all hover:scale-105 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4" /> {link.label}
                </a>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button className="xl:hidden p-2 text-slate-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
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
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {link.label}
                    </NavComponent>
                   )}
                </div>
              );
            })}
          </div>
        )}
      </header>

      <main>
        {/* --- HERO CONTACT --- */}
        <section className="relative bg-slate-900 py-24 text-center text-white overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 filter contrast-125"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-slate-900/50"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 border border-blue-400 text-blue-300 text-sm font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
              Disponible 24h/24 & 7j/7
            </span>
            <h1 className="text-5xl md:text-7xl font-black mb-6 font-[Bebas_Neue] tracking-wide drop-shadow-2xl">
              Contactez <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">Aqua&Deb</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed">
              Une urgence plomberie ? Une rénovation en vue ? <br className="hidden md:block"/>
              Notre équipe d'experts est préte é intervenir partout en Belgique. 
            </p>
          </div>
        </section>

        {/* --- SECTION CONTENU SEO AVANT FORMULAIRE (IMAGE A DROITE) --- */}
        <section className="py-20 bg-white relative z-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              
              {/* Texte SEO é gauche */}
              <div className="space-y-6">
                <span className="text-orange-600 font-bold uppercase tracking-wider text-sm">Pourquoi nous choisir ?</span>
                <h2 className="text-4xl font-black text-slate-900 font-[Montserrat] leading-tight">
                  Service Rapide & <br/> <span className="text-blue-600">Devis Transparent.</span>
                </h2>
                <div className="text-lg text-slate-600 space-y-4 leading-relaxed font-medium">
                  <p>
                    Chez <strong>Aqua&Deb</strong>, nous savons que chaque minute compte lors d'une <strong>fuite d'eau</strong> ou d'un <strong>débouchage urgent</strong>. C'est pourquoi nous avons mis en place un service client ultra-réactif.
                  </p>
                  <p>
                    Que vous habitiez é <strong>Bruxelles</strong>, <strong>Namur</strong>, <strong>Liége</strong>, <strong>Charleroi</strong> ou <strong>Mons</strong>, nos techniciens sont géolocalisés pour intervenir en moins de 45 minutes.
                  </p>
                  <p>
                    Remplissez le formulaire ci-dessous pour obtenir un <strong>devis gratuit</strong> et sans engagement pour tous vos travaux de plomberie, chauffage et débouchage.
                  </p>
                </div>
                <div className="pt-4 flex items-center gap-4 text-sm font-bold text-slate-500">
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Agréé Assurances</span>
                  <span className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-green-500" /> Garantie 12 mois</span>
                </div>
              </div>

              {/* Image é droite */}
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600 to-orange-400 rounded-3xl opacity-20 transform rotate-3"></div>
                <img 
                  src="https://res.cloudinary.com/dw9jkwccj/image/upload/v1766142108/2025-08-06_whopbd.webp" 
                  alt="Plombier Aqua&Deb Intervention" 
                  className="relative rounded-2xl shadow-2xl w-full h-[400px] object-cover" 
                />
              </div>

            </div>
          </div>
        </section>

        {/* --- MAIN CONTACT SECTION (FORM + INFO) --- */}
        <section className="pb-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              
              {/* --- INFO CARD SIMPLE (Gauche) --- */}
              <div className="lg:col-span-4">
                <div className="bg-slate-50 rounded-3xl p-8 sticky top-32 border border-slate-100">
                  <h3 className="text-2xl font-black text-slate-900 mb-8 font-[Montserrat]">Nos Coordonnées</h3>
                  
                  <div className="space-y-8">
                    {/* Phone */}
                    <div className="flex items-center gap-4">
                      <img src={ICONS.phoneApple} alt="Téléphone" className="w-10 h-10 object-contain" />
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Appelez-nous</p>
                        <a href={BRAND.phoneLink} className="text-xl font-bold text-slate-900 hover:text-orange-600 transition-colors">
                          {BRAND.phoneDisplay}
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-center gap-4">
                      <img src={ICONS.mailApple} alt="Email" className="w-10 h-10 object-contain" />
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">écrivez-nous</p>
                        <a href={`mailto:${BRAND.email}`} className="text-base font-bold text-slate-900 hover:text-orange-600 transition-colors break-all">
                          {BRAND.email}
                        </a>
                      </div>
                    </div>

                    {/* Map */}
                    <div className="flex items-center gap-4">
                      <img src={ICONS.mapApple} alt="Zone" className="w-10 h-10 object-contain" />
                      <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Siége Social</p>
                        <p className="text-base font-bold text-slate-900">
                          Av. des dessus de Lives 2,<br/>5101 Namur
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-slate-200">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-4 text-center tracking-widest">Suivez notre actualité</p>
                    <div className="flex justify-center gap-6">
                      <a href="#" className="hover:scale-110 transition-transform duration-300 opacity-80 hover:opacity-100">
                        <img src={ICONS.facebook} alt="Facebook" className="w-8 h-8" />
                      </a>
                      <a href="#" className="hover:scale-110 transition-transform duration-300 opacity-80 hover:opacity-100">
                        <img src={ICONS.instagram} alt="Instagram" className="w-6 h-6 mt-1" />
                      </a>
                      <a href="#" className="hover:scale-110 transition-transform duration-300 opacity-80 hover:opacity-100">
                        <img src={ICONS.tiktok} alt="TikTok" className="w-8 h-8" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* --- FORMULAIRE (Droite) --- */}
              <div className="lg:col-span-8">
                <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/60 p-8 md:p-12 border border-slate-100">
                  <div className="mb-10">
                    <h2 className="text-3xl font-black text-slate-900 mb-2 font-[Montserrat]">Envoyez-nous un message</h2>
                    <p className="text-slate-600">Détaillez votre demande pour recevoir un devis précis rapidement.</p>
                  </div>

                  <form
                    className="space-y-8"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const form = e.currentTarget;
                      setUploadingPhotos(true);
                      setUploadedUrls([]);
                      try {
                        const formDataToSend = new FormData(form);

                        if (selectedFiles && selectedFiles.length > 0) {
                          const urls = await uploadFiles(selectedFiles);
                          urls.forEach((url) => formDataToSend.append('photos[]', url));
                          setUploadedUrls(urls);
                        }

                        const res = await fetch('https://formspree.io/f/movneogw', {
                          method: 'POST',
                          headers: { Accept: 'application/json' },
                          body: formDataToSend
                        });

                        if (!res.ok) {
                          const txt = await res.text();
                          throw new Error(`Envoi Formspree échoué (${res.status}) ${txt}`);
                        }

                        form.reset();
                        setSelectedFiles(null);
                        setFormData({ name: '', phone: '', email: '', message: '' });
                        alert('Message envoyé !');
                      } catch (err) {
                        console.error(err);
                        alert("Impossible d'envoyer le formulaire. Réessayez.");
                      } finally {
                        setUploadingPhotos(false);
                      }
                    }}
                  >
                    <input type="hidden" name="_subject" value="Formulaire contact - page Contact" />
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-800 uppercase tracking-wide">Nom & Prénom <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:bg-white outline-none transition-all font-medium text-slate-800"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-800 uppercase tracking-wide">Téléphone <span className="text-red-500">*</span></label>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:bg-white outline-none transition-all font-medium text-slate-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-800 uppercase tracking-wide">Email <span className="text-red-500">*</span></label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:bg-white outline-none transition-all font-medium text-slate-800"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-800 uppercase tracking-wide">Description du probléme <span className="text-red-500">*</span></label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 focus:bg-white outline-none transition-all font-medium h-40 resize-none text-slate-800"
                      ></textarea>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center justify-between">
                        <span>Photos du probléme (Optionnel)</span>
                      </label>
                      <CloudinaryUploader onFilesChange={setSelectedFiles} />
                      {uploadingPhotos && (
                        <p className="text-xs text-slate-500">Upload des photos en cours...</p>
                      )}
                      {uploadedUrls.length > 0 && (
                        <p className="text-xs text-green-600 font-semibold">
                          {uploadedUrls.length} photo(s) prétes é être envoyées.
                        </p>
                      )}
                    </div>

                    <button 
                      type="submit" 
                      disabled={uploadingPhotos}
                      className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-slate-300 text-white font-bold text-lg py-5 rounded-xl shadow-xl shadow-orange-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-3 mt-4"
                    >
                      <Send className="w-5 h-5" /> {uploadingPhotos ? "Upload en cours..." : "Envoyer ma demande"}
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- NOUVELLE SECTION: ENGAGEMENT QUALITé (APRéS FORMULAIRE) --- */}
        <section className="py-20 bg-slate-900 text-white text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black mb-12 font-[Montserrat]">Notre engagement qualité</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 border border-slate-800 rounded-2xl bg-slate-800/50">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-black">1</div>
                <h3 className="text-xl font-bold mb-3">Réponse Rapide</h3>
                <p className="text-slate-400">Nous traitons votre demande dés réception et vous contactons dans les plus brefs délais.</p>
              </div>
              <div className="p-6 border border-slate-800 rounded-2xl bg-slate-800/50">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-black">2</div>
                <h3 className="text-xl font-bold mb-3">Expertise Certifiée</h3>
                <p className="text-slate-400">Nos techniciens sont qualifiés et équipés du matériel le plus performant du marché.</p>
              </div>
              <div className="p-6 border border-slate-800 rounded-2xl bg-slate-800/50">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-black">3</div>
                <h3 className="text-xl font-bold mb-3">Suivi Personnalisé</h3>
                <p className="text-slate-400">Un interlocuteur unique suit votre dossier de la demande de devis jusqu'é la fin des travaux.</p>
              </div>
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
                <img src={BRAND.logoUrl} alt="Aqua&Deb" className="h-12 w-12 rounded-full border-2 border-white shadow" />
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














