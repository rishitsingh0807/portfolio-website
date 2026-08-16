const projects = [
  {
    id: 1,
    title: "HV Pulse Generator",
    category: "Hardware",
    imageUrl: "https://images.unsplash.com/photo-1581092921461-eab62e97a782?q=80&w=800&auto=format&fit=crop",
    description: "A compact high-voltage pulse generator built for fast-rising edge applications. Features adjustable amplitude, repetition rate, and integrated safety interlocks."
  },
  {
    id: 2,
    title: "Laser Interferometer",
    category: "Optics",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
    description: "A precision Michelson-style interferometer for displacement and vibration measurements. Stabilized laser source and real-time fringe analysis."
  },
  {
    id: 3,
    title: "PCB Motor Driver",
    category: "Hardware",
    imageUrl: "https://images.unsplash.com/photo-1555664424-778a69032054?q=80&w=800&auto=format&fit=crop",
    description: "A compact three-phase brushless motor driver with current sensing, over-temperature protection, and digital control interface."
  },
  {
    id: 4,
    title: "Fiber Coupling Rig",
    category: "Optics",
    imageUrl: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=800&auto=format&fit=crop",
    description: "A stable optomechanical rig for aligning single-mode fiber to laser diodes and waveguides. Sub-micron positioners and beam profiling feedback."
  }
];

const helixItems = [...projects, ...projects, ...projects];

const BASE_SPEED = 0.035;
const MAX_SPEED = 0.6;
const HOVER_SPEED_FACTOR = 0.18;
const SCROLL_INTENSITY = 0.0016;
const MAX_EVENT_DELTA = 120;
const FRICTION = 1.4;
const BOOST_SMOOTHING = 4.5;
const HOVER_SMOOTHING = 3.5;

document.addEventListener('DOMContentLoaded', () => {
    const stage = document.getElementById('helix-stage');
    const viewport = document.getElementById('helix-viewport');
    
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalImage = document.getElementById('modal-image');
    const modalCategory = document.getElementById('modal-category');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    
    let phase = 0;
    let boost = 0;
    let boostTarget = 0;
    let hoverEase = 0;
    let isHovered = false;
    let lastTime = performance.now();

    let radius = window.innerWidth < 768 ? 140 : 260;
    let travel = window.innerWidth < 768 ? 600 : 800;
    let depth = window.innerWidth < 768 ? 150 : 250;

    window.addEventListener('resize', () => {
        radius = window.innerWidth < 768 ? 140 : 260;
        travel = window.innerWidth < 768 ? 600 : 800;
        depth = window.innerWidth < 768 ? 150 : 250;
    });

    const slots = [];
    helixItems.forEach((item, i) => {
        const slot = document.createElement('div');
        slot.className = 'helix-card-slot';
        
        const card = document.createElement('div');
        card.className = 'helix-card';
        
        card.addEventListener('mouseenter', () => isHovered = true);
        card.addEventListener('mouseleave', () => isHovered = false);
        card.addEventListener('click', () => openModal(item));

        card.innerHTML = `
            <div class="helix-card-image" style="background-image: url('${item.imageUrl}')"></div>
            <div class="helix-card-gradient"></div>
            <div class="helix-card-content">
                <div class="helix-card-top">
                    <span class="helix-card-category">${item.category}</span>
                    <div class="helix-card-arrow">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                    </div>
                </div>
                <h3 class="helix-card-title">${item.title}</h3>
            </div>
        `;
        
        slot.appendChild(card);
        stage.appendChild(slot);
        slots.push(slot);
    });

    function openModal(item) {
        modalImage.style.backgroundImage = `url('${item.imageUrl}')`;
        modalCategory.textContent = item.category;
        modalTitle.textContent = item.title;
        modalDescription.textContent = item.description;
        modal.hidden = false;
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.hidden = true;
        document.body.style.overflow = '';
    }

    modalClose.addEventListener('click', closeModal);
    modal.querySelector('.project-modal-backdrop').addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) closeModal();
    });

    viewport.addEventListener('wheel', (e) => {
        e.preventDefault();
        let delta = e.deltaY;
        if (delta > MAX_EVENT_DELTA) delta = MAX_EVENT_DELTA;
        if (delta < -MAX_EVENT_DELTA) delta = -MAX_EVENT_DELTA;
        
        boostTarget += delta * SCROLL_INTENSITY;
        boostTarget = MAX_SPEED * Math.tanh(boostTarget / MAX_SPEED);
    }, { passive: false });

    function animate(time) {
        const dt = Math.min((time - lastTime) / 1000, 0.1);
        lastTime = time;

        boostTarget *= Math.exp(-FRICTION * dt);
        boost += (boostTarget - boost) * (1 - Math.exp(-BOOST_SMOOTHING * dt));
        hoverEase += ((isHovered ? 1 : 0) - hoverEase) * (1 - Math.exp(-HOVER_SMOOTHING * dt));
        
        const speed = (BASE_SPEED + boost) * (1 + (HOVER_SPEED_FACTOR - 1) * hoverEase);
        phase += speed * dt;

        const N = slots.length;
        for (let i = 0; i < N; i++) {
            let u = (phase + i / N) % 1;
            if (u < 0) u += 1;
            
            const y = u * travel - travel / 2;
            const angle = u * Math.PI * 2 * 2;
            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * depth - depth;
            const front = (Math.cos(angle) + 1) / 2;
            const scale = 0.78 + front * 0.34;
            const rotY = -Math.cos(angle) * 26;
            const brightness = 0.6 + front * 0.55;
            const edge = Math.min(1, Math.min(u, 1 - u) / 0.12);
            
            const slot = slots[i];
            slot.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) scale(${scale})`;
            slot.style.filter = `brightness(${brightness})`;
            slot.style.opacity = edge;
            slot.style.zIndex = Math.round(front * 100);
        }

        requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
});
