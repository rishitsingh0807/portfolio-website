import { ArrowUpRight, X, MousePointerClick } from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";

interface Project {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "HV Pulse Generator",
    category: "Hardware",
    imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?q=80&w=800&auto=format&fit=crop",
    description: "A compact high-voltage pulse generator built for fast-rising edge applications. Features adjustable amplitude, repetition rate, and integrated safety interlocks for benchtop characterization.",
  },
  {
    id: 2,
    title: "Laser Interferometer",
    category: "Optics",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    description: "A precision Michelson-style interferometer for displacement and vibration measurements. Stabilized laser source, fine pitch alignment stages, and real-time fringe analysis.",
  },
  {
    id: 3,
    title: "PCB Motor Driver",
    category: "Hardware",
    imageUrl: "https://images.unsplash.com/photo-1555664424-778a69032054?q=80&w=800&auto=format&fit=crop",
    description: "A compact three-phase brushless motor driver with current sensing, over-temperature protection, and a digital control interface for embedded motion systems.",
  },
  {
    id: 4,
    title: "Fiber Coupling Rig",
    category: "Optics",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
    description: "A stable optomechanical rig for aligning single-mode fiber to laser diodes and waveguides. Sub-micron positioners, vibration damping, and beam profiling feedback.",
  },
];

// Repeat the list so the helix always has cards in flight.
const helixItems = [...projects, ...projects, ...projects];

function ProjectCard({
  project,
  onSelect,
  onHoverChange,
}: {
  project: Project;
  onSelect: (project: Project) => void;
  onHoverChange: (hovered: boolean) => void;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onSelect(project)}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
      onFocus={() => onHoverChange(true)}
      onBlur={() => onHoverChange(false)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect(project);
        }
      }}
      className="group/card relative h-[180px] w-[220px] cursor-pointer overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-white/10 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)] transition-shadow duration-300 hover:ring-white/40 hover:shadow-[0_0_60px_-5px_rgba(255,255,255,0.25)] md:h-[210px] md:w-[280px]"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover/card:scale-110"
        style={{ backgroundImage: `url(${project.imageUrl})` }}
      />

      {/* Bottom gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, transparent 35%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.95) 100%)",
        }}
      />

      {/* Category tag */}
      <div className="absolute left-3 top-3 z-20">
        <span className="rounded-full border border-white/10 bg-white/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-md">
          {project.category}
        </span>
      </div>

      {/* Arrow icon */}
      <div className="absolute right-3 top-3 z-20 translate-x-2 opacity-0 transition-all duration-300 ease-out group-hover/card:translate-x-0 group-hover/card:opacity-100">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black">
          <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
        </div>
      </div>

      {/* Title */}
      <div className="absolute bottom-0 left-0 z-20 w-full p-4">
        <h3 className="text-base font-semibold leading-tight text-white md:text-lg">
          {project.title}
        </h3>
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md transition-colors hover:bg-white/20"
          aria-label="Close project details"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        <div className="relative h-56 w-full overflow-hidden md:h-72">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${project.imageUrl})` }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, transparent 0%, transparent 50%, rgba(9,9,11,0.9) 100%)",
            }}
          />
        </div>

        <div className="relative z-10 -mt-12 px-6 pb-8 md:px-10 md:pb-10">
          <span className="inline-block rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white backdrop-blur-md">
            {project.category}
          </span>
          <h2
            id="project-modal-title"
            className="mt-4 text-2xl font-semibold tracking-tight text-white md:text-3xl"
          >
            {project.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400 md:text-lg">
            {project.description}
          </p>
        </div>
      </div>
    </div>
  );
}

// Helix geometry
const BASE_SPEED = 0.035; // turns per second at rest
const MAX_SPEED = 0.6;
const HOVER_SPEED_FACTOR = 0.18; // slow, never stop
const SCROLL_INTENSITY = 0.0016;
const MAX_EVENT_DELTA = 120; // clamp a single wheel tick so bursts don't spike
const FRICTION = 1.4; // how fast the scroll target decays back to idle
const BOOST_SMOOTHING = 4.5; // how quickly actual speed chases the target
const HOVER_SMOOTHING = 3.5; // eases the slow-down when hovering a card

export function SelectedProjects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const slotRefs = useRef<Array<HTMLDivElement | null>>([]);

  const phaseRef = useRef(0); // turns travelled
  const boostRef = useRef(0); // current extra turns/sec (smoothed)
  const boostTargetRef = useRef(0); // where the wheel wants the speed to be
  const hoverRef = useRef(false);
  const hoverEaseRef = useRef(0); // 0 -> 1 eased hover amount
  const pausedRef = useRef(false);

  pausedRef.current = selectedProject !== null;

  const setHovered = useCallback((hovered: boolean) => {
    hoverRef.current = hovered;
  }, []);

  // Wheel sets a velocity *target*; the loop eases toward it.
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const raw = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1);
      const dy = Math.max(-MAX_EVENT_DELTA, Math.min(MAX_EVENT_DELTA, raw));
      // Diminishing returns near the cap keeps fast flicks from saturating instantly.
      const next = boostTargetRef.current + dy * SCROLL_INTENSITY;
      boostTargetRef.current = MAX_SPEED * Math.tanh(next / MAX_SPEED);
    };
    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  // Animation loop
  useEffect(() => {
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      // Target relaxes back to idle, actual speed eases toward the target.
      boostTargetRef.current *= Math.exp(-FRICTION * dt);
      if (Math.abs(boostTargetRef.current) < 0.0005) boostTargetRef.current = 0;

      const kBoost = 1 - Math.exp(-BOOST_SMOOTHING * dt);
      boostRef.current += (boostTargetRef.current - boostRef.current) * kBoost;
      if (Math.abs(boostRef.current) < 0.0002 && boostTargetRef.current === 0) {
        boostRef.current = 0;
      }

      // Ease the hover slow-down instead of snapping between speeds.
      const kHover = 1 - Math.exp(-HOVER_SMOOTHING * dt);
      hoverEaseRef.current += ((hoverRef.current ? 1 : 0) - hoverEaseRef.current) * kHover;

      const slowdown = 1 + (HOVER_SPEED_FACTOR - 1) * hoverEaseRef.current;
      const speed = pausedRef.current ? 0 : (BASE_SPEED + boostRef.current) * slowdown;
      phaseRef.current += speed * dt;


      const isMobile = window.innerWidth < 768;
      const radius = isMobile ? 110 : 300;
      const depth = isMobile ? 110 : 300;
      const span = viewportRef.current?.clientHeight ?? 700;
      const travel = span + (isMobile ? 60 : 80);
      const count = helixItems.length;

      for (let i = 0; i < count; i++) {
        const node = slotRefs.current[i];
        if (!node) continue;

        // u in [0,1): position along the descent, staggered per card
        let u = (phaseRef.current + i / count) % 1;
        if (u < 0) u += 1;

        const y = u * travel - travel / 2;
        // Two full turns of the screw across one descent
        const angle = u * Math.PI * 2 * 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * depth - depth;
        const front = (Math.cos(angle) + 1) / 2; // 1 = nearest viewer
        const scale = 0.78 + front * 0.34;
        const rotY = -Math.cos(angle) * 26;
        const brightness = 0.6 + front * 0.55;
        // fade near the top/bottom edges of the viewport
        const edge = Math.min(1, Math.min(u, 1 - u) / 0.12);

        node.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) scale(${scale})`;
        node.style.filter = `brightness(${brightness})`;
        node.style.opacity = `${edge}`;
        node.style.zIndex = `${Math.round(front * 20)}`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-black py-20">
      {/* Section header */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4 px-6 md:px-12">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
            Portfolio
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-white md:text-4xl">
            Selected Projects
          </h2>
        </div>
        <p className="flex items-center gap-2 text-xs text-zinc-500">
          <MousePointerClick className="h-4 w-4" strokeWidth={1.75} />
          Scroll to drive the helix · hover to slow it down
        </p>
      </div>

      {/* Helix viewport */}
      <div
        ref={viewportRef}
        className="relative mx-auto h-[560px] w-full max-w-6xl overflow-hidden md:h-[720px]"
        style={{ perspective: "1400px" }}
      >
        {/* Top fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 z-40 h-24 w-full md:h-40"
          style={{
            background:
              "linear-gradient(to bottom, rgb(0,0,0) 0%, rgba(0,0,0,0.85) 40%, transparent 100%)",
          }}
        />
        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 z-40 h-24 w-full md:h-40"
          style={{
            background:
              "linear-gradient(to top, rgb(0,0,0) 0%, rgba(0,0,0,0.85) 40%, transparent 100%)",
          }}
        />

        {/* Central screw axis */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255,255,255,0.14), transparent)",
          }}
        />

        {/* Helix stage */}
        <div
          className="absolute left-1/2 top-1/2 h-0 w-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {helixItems.map((project, index) => (
            <div
              key={`helix-${project.id}-${index}`}
              ref={(node) => {
                slotRefs.current[index] = node;
              }}
              className="absolute will-change-transform"
              style={{ transformStyle: "preserve-3d", left: 0, top: 0 }}
            >
              <div className="-translate-x-1/2 -translate-y-1/2">
                <ProjectCard
                  project={project}
                  onSelect={setSelectedProject}
                  onHoverChange={setHovered}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
