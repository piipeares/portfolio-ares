"use client";

import { motion, useSpring, useMotionValue, useInView, useTransform, AnimatePresence } from "motion/react";
import { ArrowDown, Mail, Languages as LangIcon, Zap, X, ChevronRight, ChevronLeft, Maximize2 } from "lucide-react";
import { useState, useEffect, useMemo, useRef } from "react";

// --- Types & Translations ---

type Language = "es" | "en";

const translations = {
  es: {
    about: "Sobre Mí",
    contact: "Contacto",
    status: "Disponible para proyectos",
    title: "Felipe Ares",
    lastName: "ARES",
    role: "Desarrollador Multimedial",
    specs: ["Diseño UX/UI", "Desarrollo Web", "creatividad 3D"],
    cta: "Ver proyectos",
    scroll: "Bajar",
    engine: "MOTOR: ACTIVO",
    viewProject: "Ver proyecto completo",
    projectsTitle: "Proyectos Seleccionados",
    portfolioYear: "Portfolio / 2024",
    aboutTitle: "Conóceme mejor",
    aboutBio1: "Desarrollador Multimedial bilingüe con experiencia en análisis y mantenimiento de sistemas, DTP y creación de contenido. Manejo herramientas de diseño varias con conocimiento sólido en UX & UI y desarrollo web.",
    aboutBio2: "Actualmente cursando el cuarto año de la Licenciatura en Tecnología Multimedial en la Universidad Maimónides, combinando creatividad con precisión técnica.",
    aptitudesTitle: "Aptitudes",
    experienceTitle: "Experiencia",
    educationTitle: "Formación",
    contactTitle: "¿Tenés un proyecto en mente?",
    contactSub: "Estoy siempre abiertos a explorar nuevas ideas y colaboraciones creativas.",
    contactCta: "Hablemos",
    back: "Volver al portfolio",
    nextProject: "Siguiente proyecto",
    portfolio: "Portfolio",
    projectPrefix: "PROYECTO",
    viewInteractive: "Ver modelo interactivo",
    gallery: "Galería de capturas",
    allProjects: "Todos los proyectos",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com/in/felipeares",
  },
  en: {
    about: "About Me",
    contact: "Contact",
    status: "Available for projects",
    title: "Felipe Ares",
    lastName: "ARES",
    role: "Multimedia Developer",
    specs: ["UX/UI Design", "Web Development", "3D Creativity"],
    cta: "View Projects",
    scroll: "Scroll",
    engine: "ENGINE: ACTIVE",
    viewProject: "View full project",
    projectsTitle: "Selected Works",
    portfolioYear: "Portfolio / 2024",
    aboutTitle: "Get to know me",
    aboutBio1: "Bilingual Multimedia Developer with experience in systems analysis, DTP, and content creation. Solid knowledge in UX & UI and web development.",
    aboutBio2: "Currently in my fourth year of a Bachelor's in Multimedia Technology at Maimónides University, blending creativity with technical precision.",
    aptitudesTitle: "Skills",
    experienceTitle: "Experience",
    educationTitle: "Education",
    contactTitle: "Have a project in mind?",
    contactSub: "I'm always open to exploring new ideas and creative collaborations.",
    contactCta: "Let's talk",
    back: "Back to portfolio",
    nextProject: "Next project",
    portfolio: "Portfolio",
    projectPrefix: "PROJECT",
    viewInteractive: "View interactive model",
    gallery: "Project gallery",
    allProjects: "View all projects",
    githubUrl: "https://github.com",
    linkedinUrl: "https://linkedin.com/in/felipeares",
  }
};

const PROJECTS_DATA = [
  {
    id: "01",
    title: "Nintendo Switch",
    category: "3D Rendering",
    description: "Modelo 3D con materiales PBR y texturas de alta fidelidad. Creado en Autodesk Maya.",
    tools: ["Autodesk Maya", "Substance Painter"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=2070&auto=format&fit=crop",
      "https://static.wixstatic.com/media/765089_9c366ff1cc9e4a3c94f5c6600c92bb21~mv2.png/v1/fill/w_1344,h_756,al_c,q_90,usm_0.66_1.00_0.01,enc_auto/765089_9c366ff1cc9e4a3c94f5c6600c92bb21~mv2.png"
    ]
  },
  {
    id: "02",
    title: "Urban Reflections",
    category: "Photography",
    description: "Capturas de arquitectura urbana con contrastes de luz y sombra.",
    tools: ["Canon EOS R5", "Lightroom"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1449156001931-8283327360e3?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1449156001931-8283327360e3?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1444723121867-7a241cacace9?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    id: "03",
    title: "Vertex Identity",
    category: "Branding & UI",
    description: "Sistema de identidad visual para una startup tech.",
    tools: ["Illustrator", "Figma"],
    year: "2024",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop"
    ]
  },
  {
    id: "04",
    title: "Kinetic Type",
    category: "Motion Graphics",
    description: "Secuencia de títulos con tipografía cinética para corto animado.",
    tools: ["After Effects", "Cinema 4D"],
    year: "2023",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop"
    ]
  },
  {
    id: "05",
    title: "Umaiverse",
    category: "Full Project",
    description: "Proyecto final de carrera - Ecosistema digital interactivo.",
    tools: ["React", "Motion", "Three.js"],
    year: "2021",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop"
    ]
  }
];

// --- Components ---

const MagneticButton = ({ children, className, onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    x.set(0); y.set(0);
  };

  return (
    <motion.button
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

const BackgroundBlob = ({ color, initialPos, mousePos, speed = 20 }: { color: string, initialPos: { x: string, y: string }, mousePos: { x: number, y: number }, speed?: number }) => {
  const blobX = useMotionValue(0);
  const blobY = useMotionValue(0);
  const springX = useSpring(blobX, { stiffness: 30, damping: 25 });
  const springY = useSpring(blobY, { stiffness: 30, damping: 25 });

  useEffect(() => {
    const dx = (mousePos.x - window.innerWidth / 2) * 0.15;
    const dy = (mousePos.y - window.innerHeight / 2) * 0.15;
    blobX.set(dx);
    blobY.set(dy);
  }, [mousePos, blobX, blobY]);

  return (
    <motion.div
      style={{ x: springX, y: springY, left: initialPos.x, top: initialPos.y }}
      className={`absolute w-[40vw] h-[40vw] rounded-full blur-[100px] mix-blend-screen opacity-30 ${color}`}
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  );
};

const SkillBadge = ({ name }: { name: string }) => (
  <motion.span 
    whileHover={{ scale: 1.05, borderColor: "rgba(217,70,239,0.5)", backgroundColor: "rgba(217,70,239,0.05)" }}
    className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded-lg text-zinc-400 hover:text-white transition-colors cursor-default"
  >
    {name}
  </motion.span>
);

const InfoBlock = ({ title, subtitle, period, description }: { title: string, subtitle: string, period?: string, description?: string }) => (
  <div className="group border-l border-white/5 pl-6 py-4 hover:border-violet-500/50 transition-colors">
    <div className="flex justify-between items-start mb-1 gap-4">
      <h4 className="text-sm font-display font-bold uppercase tracking-tight group-hover:text-violet-400 transition-colors">{title}</h4>
      {period && <span className="text-[9px] font-mono text-zinc-600 mt-1">{period}</span>}
    </div>
    <p className="text-[10px] font-mono text-zinc-400 mb-2">{subtitle}</p>
    {description && <p className="text-xs text-zinc-500 leading-relaxed max-w-xl">{description}</p>}
  </div>
);

const SKILLS = {
  aptitudes: ["Comunicación Bilingüe", "Creatividad", "Atención al detalle", "Versatilidad", "Aprendizaje Rápido"],
  diseno: ["Adobe Creative Suite", "Figma", "Prototipado", "Principios de Accesibilidad", "Autodesk Maya"],
  dev: ["HTML / CSS", "JavaScript", "React / Next.js", "Three.js", "Tailwind CSS"]
};

const ProjectCard = ({ project, t, isLast, onClick }: { project: typeof PROJECTS_DATA[0], t: any, isLast: boolean, onClick: () => void }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      className="relative group overflow-hidden rounded-[2rem] bg-zinc-900/10 border border-white/[0.03] hover:border-fuchsia-500/30 transition-all duration-700 aspect-[16/10] cursor-pointer"
    >
      {/* Background Image - Clean Reveal */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.img 
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 2, ease: "circOut" }}
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover opacity-20 group-hover:opacity-40 transition-opacity grayscale group-hover:grayscale-0 duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      </div>

      <div className="relative z-10 h-full p-6 md:p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-mono font-black text-fuchsia-400/80 uppercase tracking-[0.2em]">{project.category}</span>
            <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">{project.year}</span>
          </div>
          <span className="text-xl font-display font-black text-white/5 group-hover:text-white/20 transition-colors tracking-tighter">
            PROJ_{project.id}
          </span>
        </div>

        <div className="w-full">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-extrabold tracking-tighter uppercase leading-none mb-4 group-hover:text-fuchsia-400 transition-colors duration-500">
            {project.title}
          </h3>
          
          <div className="flex flex-wrap gap-1.5 mb-6 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
            {project.tools.map(tool => (
              <span key={tool} className="text-[7.5px] font-black uppercase tracking-widest px-2 py-1 bg-white/5 border border-white/10 rounded text-zinc-400">
                {tool}
              </span>
            ))}
          </div>

          <div className="overflow-hidden">
            <motion.div 
               className="inline-flex items-center gap-3 px-5 py-2.5 bg-fuchsia-500 text-black rounded-full transition-all duration-500 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            >
              <span className="text-[9px] font-black uppercase tracking-[0.3em]">Ver proyecto</span>
              <ChevronRight size={14} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Shimmer Effect */}
      <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
    </motion.div>
  );
};

const ZoomImage = ({ src, alt, allowZoom = false, showIndicator = false }: { src: string, alt: string, allowZoom?: boolean, showIndicator?: boolean }) => {
  const [isZoomActive, setIsZoomActive] = useState(false);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const x = useTransform(mouseX, [0, 1], ["25%", "-25%"]);
  const y = useTransform(mouseY, [0, 1], ["25%", "-25%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isZoomActive || !allowZoom) return;
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  return (
    <div 
      className={`relative w-full h-full overflow-hidden transition-all duration-500 ${allowZoom ? (isZoomActive ? 'cursor-zoom-out' : 'cursor-zoom-in') : 'cursor-pointer'}`}
      onClick={(e) => {
        if (!allowZoom) return;
        e.stopPropagation();
        setIsZoomActive(!isZoomActive);
      }}
      onMouseMove={handleMouseMove}
    >
      <motion.img
        src={src}
        alt={alt}
        animate={{ scale: isZoomActive && allowZoom ? 2 : 1 }}
        style={{ x: isZoomActive && allowZoom ? x : 0, y: isZoomActive && allowZoom ? y : 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 25 }}
        className="w-full h-full object-cover origin-center"
      />
      
      {allowZoom && !isZoomActive && showIndicator && (
        <div className="absolute bottom-6 right-6 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Maximize2 size={12} className="text-fuchsia-500" />
          <span className="text-[9px] font-black uppercase tracking-widest">Click para zoom</span>
        </div>
      )}
    </div>
  );
};

const ProjectDetail = ({ project, onBack, onNext, t }: { project: typeof PROJECTS_DATA[0], onBack: () => void, onNext: () => void, t: any }) => {
  const [viewGalleryMode, setViewGalleryMode] = useState(false);
  const is3D = project.category === "3D Rendering";

  useEffect(() => {
    if (viewGalleryMode) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [viewGalleryMode]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[100] bg-black overflow-y-auto"
    >
      {/* Detail Header */}
      <header className="sticky top-0 z-[80] flex justify-between items-center px-6 md:px-16 py-6 md:py-8 bg-black/80 backdrop-blur-3xl border-b border-white/5">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors group"
        >
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-fuchsia-500 transition-all">
            <X size={14} />
          </div>
          <span>{t.back}</span>
        </button>
        <span className="text-[10px] font-mono text-zinc-700 tracking-[0.5em] hidden lg:block uppercase">{project.category} // {project.year}</span>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 md:py-20 flex flex-col gap-20">
        
        {/* TOP SECTION: Information First */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <div className="lg:col-span-5">
             <div className="flex items-center gap-4 mb-6 font-mono font-bold text-fuchsia-500 text-[10px] uppercase tracking-[0.5em]">
                <div className="w-8 h-[1px] bg-fuchsia-500/40" />
                INFO_DATA {project.id}
             </div>
             <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter leading-[0.85] mb-12">{project.title}</h2>
             
             <div className="flex flex-col gap-10">
                <div>
                   <h4 className="text-[9px] font-mono font-black text-zinc-700 uppercase tracking-[0.4em] mb-4">Technical Stack</h4>
                   <div className="flex flex-wrap gap-2">
                      {project.tools.map(tool => <SkillBadge key={tool} name={tool} />)}
                   </div>
                </div>
                
                <div>
                   <h4 className="text-[9px] font-mono font-black text-zinc-700 uppercase tracking-[0.4em] mb-4">Core Vision</h4>
                   <p className="text-zinc-400 text-lg leading-relaxed">{project.description}</p>
                </div>
             </div>
          </div>

          <div className="lg:col-span-7">
             <div className="flex flex-col gap-6">
                <div 
                  onClick={() => setViewGalleryMode(true)}
                  className="relative aspect-video rounded-[2.5rem] overflow-hidden bg-zinc-900 border border-white/5 group cursor-pointer"
                >
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 opacity-60 group-hover:opacity-80" />
                  
                  {/* Hover Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center bg-fuchsia-500/10 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-all duration-500">
                    <div className="flex flex-col items-center gap-4">
                       <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center bg-black/40">
                          <Maximize2 size={24} className="text-white" />
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white">Ver galería de fotos ({project.gallery?.length})</span>
                    </div>
                  </div>
                </div>

                {is3D && (
                   <div className="p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 flex flex-col gap-8">
                      <div className="flex justify-between items-end">
                         <div>
                            <h3 className="text-2xl font-display font-black uppercase tracking-tighter">Engine Visualizer</h3>
                            <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">Interactive 3D Asset Exploration</p>
                         </div>
                         <div className="w-12 h-12 rounded-full border border-violet-500/30 flex items-center justify-center text-violet-400">
                            <Zap size={18} />
                         </div>
                      </div>
                      <div className="aspect-video bg-black rounded-3xl border border-white/5 flex items-center justify-center">
                         <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-t-2 border-fuchsia-500 rounded-full animate-spin" />
                            <span className="text-[8px] font-mono text-zinc-800 uppercase tracking-[0.5em]">Starting WebGL Engine...</span>
                         </div>
                      </div>
                   </div>
                )}
             </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="mt-20 pt-20 border-t border-white/5 flex justify-between items-center bg-black">
          <button onClick={onBack} className="text-zinc-600 hover:text-white transition-colors flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
            <ChevronLeft size={16} />
            {t.portfolio}
          </button>
          
          <button onClick={onNext} className="flex items-center gap-8 group">
            <div className="text-right">
              <span className="block text-[8px] font-mono text-zinc-600 uppercase tracking-widest mb-1">{t.nextProject}</span>
              <span className="text-2xl md:text-5xl font-display font-black uppercase tracking-tighter group-hover:text-fuchsia-500 transition-all leading-none">
              {t.projectPrefix}_{t.nextProject}
            </span>
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-fuchsia-500 group-hover:border-fuchsia-500 group-hover:text-black transition-all">
              <ChevronRight size={24} />
            </div>
          </button>
        </div>
      </div>

      {/* OVERLAY GALLERY VIEWPORT (Page-like) */}
      <AnimatePresence>
        {viewGalleryMode && (
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-zinc-950 overflow-y-auto"
          >
            <header className="sticky top-0 z-[210] flex justify-between items-center px-6 md:px-16 py-8 bg-zinc-950/95 backdrop-blur-xl border-b border-white/5">
               <button 
                onClick={() => setViewGalleryMode(false)}
                className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-white transition-colors"
              >
                <ChevronLeft size={18} />
                <span>Cerrar galería</span>
              </button>
              <span className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-[0.5em]">{project.title} // Assets Gallery</span>
            </header>

            <div className="max-w-5xl mx-auto px-6 py-20 flex flex-col gap-12">
               {project.gallery?.map((img, i) => (
                 <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   className="flex flex-col gap-4 group"
                 >
                    <div className="aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900 group">
                       <ZoomImage src={img} alt={`Asset ${i}`} allowZoom={true} showIndicator={i === 0} />
                    </div>
                 </motion.div>
               ))}

               <div className="py-20 flex flex-col items-center gap-6">
                  <div className="w-12 h-[1px] bg-zinc-900" />
                  <button 
                    onClick={() => setViewGalleryMode(false)}
                    className="px-10 py-5 bg-white text-black rounded-2xl font-black uppercase text-[10px] tracking-[0.4em] hover:scale-105 transition-transform"
                  >
                    Volver a los detalles
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [lang, setLang] = useState<Language>("es");
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const projectsRef = useRef<HTMLElement>(null);

  const t = useMemo(() => translations[lang], [lang]);

  const selectedProject = useMemo(() => 
    PROJECTS_DATA.find(p => p.id === selectedProjectId),
  [selectedProjectId]);

  useEffect(() => {
    if (selectedProjectId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [selectedProjectId]);

  const handleNextProject = () => {
    if (!selectedProjectId) return;
    const currentIndex = PROJECTS_DATA.findIndex(p => p.id === selectedProjectId);
    const nextIndex = (currentIndex + 1) % PROJECTS_DATA.length;
    setSelectedProjectId(PROJECTS_DATA[nextIndex].id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleLang = () => setLang(prev => prev === "es" ? "en" : "es");

  const scrollToProjects = () => {
    projectsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white font-sans overflow-x-hidden flex flex-col relative selection:bg-violet-500/40">
      {/* 
        ORGANIC DYNAMIC BACKGROUND
      */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <BackgroundBlob color="bg-violet-600" initialPos={{ x: "15%", y: "10%" }} mousePos={mousePos} speed={15} />
        <BackgroundBlob color="bg-fuchsia-600" initialPos={{ x: "65%", y: "45%" }} mousePos={mousePos} speed={25} />
        <BackgroundBlob color="bg-violet-600/40" initialPos={{ x: "-5%", y: "55%" }} mousePos={mousePos} speed={30} />
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] mix-blend-overlay"></div>
      </div>

      {/* Navigation Header */}
      <header className="relative z-50 flex justify-between items-center px-6 md:px-16 py-8 md:py-12">
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="font-mono text-zinc-500 text-xs tracking-tighter"
        >
          <span className="text-violet-400/60">{"<"}</span>
          <span className="text-white font-black ml-1 uppercase">felipe /</span>
        </motion.div>

        <nav className="flex items-center gap-4 md:gap-10">
          <div className="hidden md:flex items-center gap-8 text-[10px] uppercase font-black tracking-[0.4em] text-zinc-500">
            <motion.button whileHover={{ color: "#fff" }} onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="transition-colors uppercase">{t.about}</motion.button>
            <button 
              onClick={toggleLang}
              className="flex items-center gap-2 hover:text-white transition-colors group"
            >
              <LangIcon size={14} className="text-fuchsia-500 group-hover:rotate-180 transition-transform duration-500" />
              <span className="text-[10px]">{lang === "es" ? "EN" : "ES"}</span>
            </button>
          </div>
          
          <MagneticButton className="flex items-center gap-2.5 bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20 hover:border-violet-500/40 px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-md transition-all active:scale-95 group">
            <Mail size={14} className="text-fuchsia-500" />
            <span>{t.contact}</span>
          </MagneticButton>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-start pt-16 md:pt-20 pb-10 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center w-full max-w-6xl flex flex-col items-center"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 bg-fuchsia-500/5 border border-fuchsia-500/10 px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm"
          >
            <div className="w-1.5 h-1.5 bg-fuchsia-500 rounded-full animate-pulse shadow-[0_0_8px_#D946EF]" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-300">{t.status}</span>
          </motion.div>

          {/* Main Title */}
          <div className="mb-6 relative flex flex-col items-center">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "circOut" }}
              className="relative"
            >
<h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-extrabold tracking-tighter leading-[0.8] mb-1 uppercase">
                FELIPE <br />
                <span className="text-stroke-white opacity-40">ARES</span>
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-2"
            >
              <h2 className="text-2xl md:text-3xl font-display font-extrabold uppercase tracking-tight bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 bg-[length:200%_auto] bg-clip-text text-transparent animate-gradient-x">
                {t.role}
              </h2>
          </motion.div>
          </div>

          {/* CTA + Scroll Indicator Container */}
          <div className="flex flex-col items-center gap-8 mt-6">
            <div className="relative group mx-auto w-fit">
<MagneticButton 
                onClick={scrollToProjects}
                className="relative z-10 flex items-center gap-5 bg-zinc-900/60 border border-white/20 hover:border-fuchsia-500/50 px-12 py-6 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] backdrop-blur-xl transition-all hover:shadow-[0_20px_100px_rgba(217,70,239,0.15)] group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-20 group-hover:text-white text-zinc-200 transition-colors uppercase">{t.cta}</span>
                <ArrowDown size={16} strokeWidth={3} className="text-fuchsia-500 group-hover:translate-y-1 transition-transform" />
              </MagneticButton>
            </div>

            {/* Scroll Interaction - Now below the CTA */}
            <div onClick={scrollToProjects} className="flex flex-col items-center gap-3 opacity-50 hover:opacity-80 transition-opacity cursor-pointer group">
              <span className="text-[9px] uppercase tracking-[1em] font-black text-zinc-400 ml-[1em]">{t.scroll}</span>
              <div className="w-[1px] h-10 bg-zinc-800 relative overflow-hidden">
                <motion.div 
                  animate={{ y: [-40, 40] }} 
                  transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-fuchsia-500/60 to-transparent"
                 />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section - Bento Grid */}
      <section ref={projectsRef} className="relative z-10 py-32 px-6 md:px-16 max-w-7xl mx-auto">
        <div className="mb-24 flex flex-col items-center">
            <span className="text-[10px] font-mono font-bold text-violet-400 uppercase tracking-[0.6em] mb-4">{t.portfolioYear}</span>
            <h2 className="text-4xl md:text-7xl font-display font-black uppercase tracking-tighter text-center">
              {t.projectsTitle}
            </h2>
            <div className="w-16 h-[1px] bg-white/10 mt-8" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
          {PROJECTS_DATA.map((project, idx) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              t={t} 
              isLast={idx === PROJECTS_DATA.length - 1} 
              onClick={() => setSelectedProjectId(project.id)}
            />
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-32 px-6 md:px-16 max-w-7xl mx-auto border-t border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="flex flex-col gap-6">
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-violet-500/10 border border-violet-500/20 w-fit rounded-full">
                <div className="w-1 h-1 bg-violet-400 rounded-full" />
                <span className="text-[8px] font-black uppercase tracking-widest text-violet-400">{t.about}</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase tracking-tighter leading-none">{t.aboutTitle}</h2>
              <div className="flex flex-col gap-8 mt-10">
                <p className="text-xl md:text-2xl font-medium text-zinc-300 leading-tight">
                  {t.aboutBio1}
                </p>
                <p className="text-sm text-zinc-500 leading-relaxed max-w-lg">
                  {t.aboutBio2}
                </p>
              </div>
            </motion.div>

            <div className="mt-20">
              <h3 className="text-[10px] font-mono font-black text-zinc-600 uppercase tracking-[0.5em] mb-10">{t.aptitudesTitle}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="flex flex-col gap-3">
                  <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">Base</span>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.aptitudes.map(s => <SkillBadge key={s} name={s} />)}
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-[8px] font-mono text-zinc-700 uppercase tracking-widest">Stack Dev</span>
                  <div className="flex flex-wrap gap-2">
                    {SKILLS.dev.map(s => <SkillBadge key={s} name={s} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-12 lg:pt-16">
            <div>
              <h3 className="text-[10px] font-mono font-black text-zinc-600 uppercase tracking-[0.5em] mb-8">{t.experienceTitle}</h3>
              <div className="flex flex-col gap-6">
                <InfoBlock 
                  title="Analista Funcional y Técnico" 
                  subtitle="Mercedes Benz - Boutique House" 
                  period="SEP 2023 - PRESENTE"
                  description="Análisis y mantenimiento de sistemas y páginas web."
                />
                <InfoBlock 
                  title="Especialista en DTP - Freelance" 
                  subtitle="Trusted Translations" 
                  period="JUL 2024 - JUN 2025"
                />
                <InfoBlock 
                  title="Asistente de Gestión de Proyectos" 
                  subtitle="Translated" 
                  period="MAR 2023 - AGO 2023"
                />
              </div>
            </div>

            <div>
              <h3 className="text-[10px] font-mono font-black text-zinc-600 uppercase tracking-[0.5em] mb-8">{t.educationTitle}</h3>
              <div className="flex flex-col gap-6">
                <InfoBlock 
                  title="Licenciatura en Tecnología Multimedial" 
                  subtitle="Universidad Maimónides" 
                  period="4TO AÑO EN CURSO"
                />
                <InfoBlock 
                  title="Certificaciones" 
                  subtitle="Cambridge B2 / UI UX Figma / Workshop Design"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-40 px-6 md:px-16 text-center border-t border-white/5 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative z-10"
        >
          <h2 className="text-5xl md:text-8xl font-display font-black uppercase tracking-tighter mb-8 leading-none">
            {t.contactTitle}
          </h2>
          <p className="text-zinc-500 max-w-md mx-auto mb-16 text-sm md:text-base leading-relaxed">
            {t.contactSub}
          </p>
          
          <div className="flex flex-col items-center gap-10">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200" />
              <MagneticButton className="relative flex items-center justify-center bg-black/60 border border-white/10 hover:border-fuchsia-500/50 px-20 py-10 rounded-[2.5rem] text-2xl font-display font-black uppercase tracking-tighter backdrop-blur-3xl transition-all group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                <span className="relative z-10 group-hover:text-fuchsia-500 transition-colors duration-500">
                  {t.contactCta}
                </span>
              </MagneticButton>
            </div>
            
            <div className="flex flex-col items-center gap-2">
               <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-[0.4em] mb-2">{t.contact}</span>
               <a href="mailto:felipearespacheco@gmail.com" className="text-sm font-mono text-white/40 hover:text-fuchsia-500 transition-colors">
                 felipearespacheco@gmail.com
               </a>
            </div>
          </div>
        </motion.div>
        
        {/* Decorative Background for Contact */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-violet-500/10 blur-[200px] rounded-full -z-10" />
      </section>

      {/* Simplified HUD / Footer */}
      <footer className="relative z-30 flex flex-col items-center py-20 gap-12 bg-black">
        <div className="flex items-center gap-12 text-[8px] font-mono font-bold text-zinc-800 uppercase tracking-[0.4em]">
          <div className="flex flex-col items-center gap-2">
            <span className="text-zinc-600">Built with</span>
            <span className="text-zinc-500">React + Next.js + Motion</span>
          </div>
          <div className="h-6 w-[1px] bg-zinc-900" />
          <div className="flex flex-col items-center gap-2">
            <span className="text-zinc-600">Location</span>
            <span className="text-zinc-500">BA / AR</span>
          </div>
        </div>
        
        <div className="flex flex-col items-center gap-4 text-zinc-500">
           <div className="flex gap-10 text-zinc-700">
<a href={t.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-1.5 1.5-1.5 1.5 0 2.5 2 2.5-1.25.08-2.45-.25-3.5-1.5-1.25 1.5-2 2.5-2 3.5 0 3.5 3 5.5 6 5.5-.4.4-.8 1-1 1.5H9c-.2 0-.5-.25-1-1.5-.5.5-1 1-1.5 1.5v4Z"/></svg>
              </a>
              <a href={t.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
             </a>
           </div>
           <span className="text-[6px] font-mono uppercase tracking-[0.5em] opacity-30 mt-4">© 2024 / FELIPE ARES PACHECO</span>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail 
            project={selectedProject} 
            t={t} 
            onBack={() => setSelectedProjectId(null)} 
            onNext={handleNextProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
}