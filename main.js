import gsap from 'https://cdn.skypack.dev/gsap';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

// ─── LOADER ───
window.addEventListener('load', () => {
    const tl = gsap.timeline({
        onComplete: () => {
            document.getElementById('loader').classList.add('done');
            initHeroAnimation();
        }
    });

    tl.to('.loader-bar', { width: '100%', duration: 0.8, ease: 'power4.inOut' })
        .to('.loader-name span', { y: -20, opacity: 0, stagger: 0.03, ease: 'power4.in' }, '+=0.1')
        .to('.loader', { opacity: 0, duration: 0.5, ease: 'expo.inOut' });
});

// ─── HERO REVEAL ───
function initHeroAnimation() {
    const heroTl = gsap.timeline();
    heroTl.from('.hero-badge', { y: 20, opacity: 0, duration: 0.8, ease: 'power4.out' })
        .from('.hero-name', { y: 40, opacity: 0, duration: 1, ease: 'power4.out' }, '-=0.4')
        .from('.hero-title', { y: 20, opacity: 0, duration: 0.8, ease: 'power4.out' }, '-=0.6')
        .from('.hero-tags .hero-tag', { y: 10, opacity: 0, stagger: 0.1, duration: 0.5, ease: 'power2.out' }, '-=0.4')
        .from('.hero-actions .btn', { scale: 0.9, opacity: 0, stagger: 0.2, duration: 0.6, ease: 'back.out(1.7)' }, '-=0.2')
        .from('.hero-right', { x: 40, opacity: 0, duration: 1.2, ease: 'power4.out' }, '-=1');
}

// ─── MAGNETIC ELEMENTS ───
document.querySelectorAll('.btn, .nav-cta, .si-dot').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.35, y: y * 0.35, duration: 0.5, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
    });
});

// ─── SCROLL REVEALS ───
document.querySelectorAll('.reveal, .exp-item, .cert-card').forEach(el => {
    gsap.set(el, { opacity: 0, y: 35 });
    gsap.to(el, {
        scrollTrigger: {
            trigger: el,
            start: 'top 88%',
            toggleActions: 'play none none none'
        },
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power3.out'
    });
});

// ─── SKILL BARS ───
document.querySelectorAll('.skill-fill').forEach(fill => {
    gsap.set(fill, { scaleX: 0 });
    gsap.to(fill, {
        scrollTrigger: {
            trigger: fill,
            start: 'top 92%',
        },
        scaleX: 1,
        duration: 1.8,
        ease: 'power4.out',
        delay: 0.3
    });
});

// ─── PARALLAX DECO ───
gsap.to('.hero-deco', {
    scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
    },
    y: 120,
    opacity: 0.05
});

// ─── PROJECT CARDS 3D ───
document.querySelectorAll('.project-card:not(.featured)').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
            rotationY: x * 8,
            rotationX: -y * 8,
            y: -5,
            boxShadow: '0 25px 60px rgba(0,0,0,0.12)',
            duration: 0.5,
            ease: 'power2.out'
        });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            rotationY: 0,
            rotationX: 0,
            y: 0,
            boxShadow: '0 1px 1px rgba(0,0,0,0.08)',
            duration: 0.8,
            ease: 'power2.out'
        });
    });
});

// ─── ESSENTIAL UTILS ───
window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (nav) nav.style.boxShadow = window.scrollY > 50 ? '0 4px 30px rgba(0,0,0,0.05)' : '';

    const bar = document.getElementById('scroll-progress');
    if (bar) bar.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100 + '%';
});

// Section dots
document.querySelectorAll('.si-dot').forEach(dot => {
    dot.addEventListener('click', () => {
        const st = document.getElementById(dot.getAttribute('data-target'));
        if (st) st.scrollIntoView({ behavior: 'smooth' });
    });
});

// Active section
const secObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const dots = document.querySelectorAll('.si-dot');
            const navLinks = document.querySelectorAll('.nav-link');
            const sections = ['home', 'experience', 'skills', 'projects', 'education', 'contact'];
            const idx = sections.indexOf(entry.target.id);
            dots.forEach((d, i) => d.classList.toggle('active', i === idx));
            navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
        }
    });
}, { threshold: 0.4 });
['home', 'experience', 'skills', 'projects', 'education', 'contact'].forEach(id => {
    const el = document.getElementById(id);
    if (el) secObs.observe(el);
});
