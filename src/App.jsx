import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const NAV = ["Beranda", "Fasilitas", "Lapangan", "Jadwal", "Harga", "Kontak"];

const FACILITIES = [
  { icon: "🏟️", title: "6 Lapangan Premium", desc: "Lapangan panoramic glass standar internasional WPT" },
  { icon: "💡", title: "Lampu LED 2000 Lux", desc: "Pencahayaan superior untuk sesi malam yang nyaman" },
  { icon: "🚿", title: "Loker & Kamar Mandi", desc: "Fasilitas mandi & loker personal dengan kunci digital" },
  { icon: "🏋️", title: "Gym & Fitness", desc: "Area pemanasan & latihan fisik lengkap untuk atlet" },
  { icon: "🍃", title: "Resto & Juice Bar", desc: "Menu sehat & minuman segar pasca pertandingan" },
  { icon: "📹", title: "Video Analysis", desc: "Rekaman otomatis HD untuk review teknik permainan" },
  { icon: "🅿️", title: "Parkir 200 Slot", desc: "Area parkir luas, aman, CCTV 24 jam" },
  { icon: "👨‍🏫", title: "Pelatih Bersertifikat", desc: "Instruktur berlisensi FIP siap tingkatkan level Anda" },
];

const COURTS = [
  { id: 1, name: "Court Alpha", type: "Indoor Panoramic", features: ["Kaca Panoramic 360°", "AC Central", "Lantai Greenset Pro", "Kapasitas 50 penonton"], available: true },
  { id: 2, name: "Court Beta", type: "Indoor Premium", features: ["Dinding Kaca Tinggi", "Ventilasi Udara", "Lantai AstroTurf", "Kapasitas 30 penonton"], available: true },
  { id: 3, name: "Court Gamma", type: "Semi-Outdoor", features: ["Atap Transparan", "Angin Alami", "Lantai Sand Turf", "View Taman Kota"], available: false },
  { id: 4, name: "Court Delta", type: "VIP Suite", features: ["Private Lounge", "AC Eksklusif", "Lantai Premium Felt", "Kapasitas 80 penonton"], available: true },
];

const DAYS = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
const SLOTS_BASE = [
  { time: "06:00", label: "Open Play" },
  { time: "08:00", label: "Latihan Pagi" },
  { time: "10:00", label: "Open Play" },
  { time: "12:00", label: "Open Play" },
  { time: "14:00", label: "Kelas Pemula" },
  { time: "16:00", label: "Open Play" },
  { time: "18:00", label: "Turnamen Mini" },
  { time: "20:00", label: "Open Play" },
  { time: "22:00", label: "Late Night" },
];
const STATUS_PATTERN = {
  Senin:   ["tersedia","penuh","tersedia","tersedia","penuh","tersedia","penuh","tersedia","tersedia"],
  Selasa:  ["tersedia","tersedia","penuh","tersedia","tersedia","penuh","tersedia","penuh","tersedia"],
  Rabu:    ["tersedia","tersedia","penuh","tersedia","tersedia","tersedia","penuh","tersedia","tersedia"],
  Kamis:   ["tersedia","penuh","tersedia","tersedia","tersedia","penuh","tersedia","penuh","tersedia"],
  Jumat:   ["tersedia","tersedia","penuh","tersedia","tersedia","penuh","tersedia","penuh","tersedia"],
  Sabtu:   ["penuh","penuh","penuh","tersedia","penuh","penuh","tersedia","penuh","tersedia"],
  Minggu:  ["tersedia","penuh","penuh","tersedia","tersedia","penuh","tersedia","tersedia","tersedia"],
};

const PRICING = [
  {
    name: "Reguler", badge: null, weekday: "100.000", weekend: "130.000", unit: "/ jam / lapangan",
    highlight: false,
    features: ["Akses lapangan 1 jam", "Loker gratis", "Air mineral", "Parkir included", "WiFi gratis"],
    cta: "Booking Sekarang",
  },
  {
    name: "Member", badge: "TERPOPULER", weekday: "75.000", weekend: "95.000", unit: "/ jam / lapangan",
    highlight: true,
    features: ["Akses lapangan prioritas", "Loker pribadi tersimpan", "Diskon 25% semua sesi", "1x coaching gratis/bulan", "Analisis video bulanan", "Akses gym & fitness"],
    cta: "Daftar Member",
  },
  {
    name: "Korporat", badge: null, weekday: "Hubungi", weekend: "Kami", unit: "paket kustom",
    highlight: false,
    features: ["Booking blok 10+ jam/bulan", "Dedicated account manager", "Branding di lapangan", "Invoice bulanan", "Turnamen internal", "Free peralatan rental"],
    cta: "Konsultasi Gratis",
  },
];

function CourtDiagram() {
  return (
    <svg viewBox="0 0 280 180" style={{width:"100%",height:"auto",borderRadius:"8px"}} xmlns="http://www.w3.org/2000/svg">
      <rect width="280" height="180" fill="#044d3e" rx="6"/>
      <rect x="20" y="20" width="240" height="140" fill="none" stroke="#c8f059" strokeWidth="2.5" rx="3"/>
      <line x1="140" y1="20" x2="140" y2="160" stroke="#f7fee6" strokeWidth="2.5"/>
      <line x1="20" y1="83" x2="140" y2="83" stroke="rgba(247,254,230,0.6)" strokeWidth="1.5"/>
      <line x1="140" y1="97" x2="260" y2="97" stroke="rgba(247,254,230,0.6)" strokeWidth="1.5"/>
      <line x1="80" y1="20" x2="80" y2="160" stroke="rgba(247,254,230,0.35)" strokeWidth="1" strokeDasharray="5,4"/>
      <line x1="200" y1="20" x2="200" y2="160" stroke="rgba(247,254,230,0.35)" strokeWidth="1" strokeDasharray="5,4"/>
      <rect x="10" y="10" width="260" height="160" fill="none" stroke="rgba(200,240,89,0.2)" strokeWidth="7" rx="6"/>
      <circle cx="139" cy="90" r="7" fill="#c8f059"/>
    </svg>
  );
}

function HeroArt() {
  return (
    <svg viewBox="0 0 420 360" style={{width:"100%",maxWidth:"460px",height:"auto"}} xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="210" cy="330" rx="170" ry="22" fill="rgba(6,99,80,0.13)"/>
      <rect x="50" y="50" width="320" height="220" fill="#066350" rx="10"/>
      <rect x="50" y="50" width="320" height="220" fill="none" stroke="#c8f059" strokeWidth="3" rx="10"/>
      <line x1="210" y1="50" x2="210" y2="270" stroke="#f7fee6" strokeWidth="3.5"/>
      <line x1="50" y1="148" x2="210" y2="148" stroke="rgba(247,254,230,0.6)" strokeWidth="2"/>
      <line x1="210" y1="172" x2="370" y2="172" stroke="rgba(247,254,230,0.6)" strokeWidth="2"/>
      <line x1="130" y1="50" x2="130" y2="270" stroke="rgba(247,254,230,0.4)" strokeWidth="1.5" strokeDasharray="7,5"/>
      <line x1="290" y1="50" x2="290" y2="270" stroke="rgba(247,254,230,0.4)" strokeWidth="1.5" strokeDasharray="7,5"/>
      <rect x="40" y="40" width="340" height="240" fill="none" stroke="rgba(200,240,89,0.18)" strokeWidth="10" rx="10"/>
      <g transform="translate(100,155) rotate(-30)">
        <ellipse cx="0" cy="0" rx="22" ry="29" fill="#c8f059" stroke="#066350" strokeWidth="2"/>
        <line x1="0" y1="29" x2="0" y2="58" stroke="#7b5c38" strokeWidth="6" strokeLinecap="round"/>
        <line x1="-14" y1="-10" x2="14" y2="-10" stroke="rgba(6,99,80,0.45)" strokeWidth="1.5"/>
        <line x1="-16" y1="0" x2="16" y2="0" stroke="rgba(6,99,80,0.45)" strokeWidth="1.5"/>
        <line x1="-14" y1="10" x2="14" y2="10" stroke="rgba(6,99,80,0.45)" strokeWidth="1.5"/>
        <line x1="-6" y1="-20" x2="-6" y2="22" stroke="rgba(6,99,80,0.45)" strokeWidth="1.5"/>
        <line x1="6" y1="-20" x2="6" y2="22" stroke="rgba(6,99,80,0.45)" strokeWidth="1.5"/>
      </g>
      <g transform="translate(320,165) rotate(25)">
        <ellipse cx="0" cy="0" rx="22" ry="29" fill="#f7fee6" stroke="#066350" strokeWidth="2"/>
        <line x1="0" y1="29" x2="0" y2="58" stroke="#7b5c38" strokeWidth="6" strokeLinecap="round"/>
        <line x1="-14" y1="-10" x2="14" y2="-10" stroke="rgba(6,99,80,0.45)" strokeWidth="1.5"/>
        <line x1="-16" y1="0" x2="16" y2="0" stroke="rgba(6,99,80,0.45)" strokeWidth="1.5"/>
        <line x1="-14" y1="10" x2="14" y2="10" stroke="rgba(6,99,80,0.45)" strokeWidth="1.5"/>
        <line x1="-6" y1="-20" x2="-6" y2="22" stroke="rgba(6,99,80,0.45)" strokeWidth="1.5"/>
        <line x1="6" y1="-20" x2="6" y2="22" stroke="rgba(6,99,80,0.45)" strokeWidth="1.5"/>
      </g>
      <circle cx="209" cy="160" r="11" fill="#c8f059"/>
      <path d="M201 153 Q209 160 217 153" fill="none" stroke="#fff" strokeWidth="1.5"/>
      <path d="M201 167 Q209 160 217 167" fill="none" stroke="#fff" strokeWidth="1.5"/>
      <circle cx="38" cy="38" r="6" fill="#c8f059" opacity="0.5"/>
      <circle cx="382" cy="38" r="6" fill="#c8f059" opacity="0.5"/>
      <circle cx="38" cy="302" r="6" fill="#c8f059" opacity="0.5"/>
      <circle cx="382" cy="302" r="6" fill="#c8f059" opacity="0.5"/>
      <circle cx="210" cy="38" r="4" fill="rgba(247,254,230,0.4)"/>
      <circle cx="210" cy="282" r="4" fill="rgba(247,254,230,0.4)"/>
    </svg>
  );
}

export default function App() {
  const [activeDay, setActiveDay] = useState("Senin");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroIllRef = useRef(null);
  const heroHeadRef = useRef(null);
  const heroSubRef = useRef(null);
  const heroBtnRef = useRef(null);
  const facilRef = useRef(null);
  const courtRef = useRef(null);
  const schedRef = useRef(null);
  const priceRef = useRef(null);
  const ctaRef = useRef(null);

  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    { url: "/hero/slide1.png", title: "PADEL", accent: "PRO", tag: "PROFESSIONAL ARENA" },
    { url: "/hero/slide2.png", title: "LOUNGE", accent: "EXC", tag: "EXCLUSIVE COMFORT" },
    { url: "/hero/slide3.png", title: "GEAR", accent: "UP", tag: "PREMIUM EQUIPMENT" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    // Fade in/out logic for carousel slides
    gsap.fromTo(`.hero-slide-${activeSlide}`, 
      { opacity: 0, scale: 1.1 }, 
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
    );
  }, [activeSlide]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(".nav-wrap", { y: -60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7 })
      .fromTo(".hero-tag", { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, "-=0.3")
      .fromTo(heroHeadRef.current, { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, "-=0.4")
      .fromTo(heroSubRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, "-=0.6")
      .fromTo(heroBtnRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, "-=0.5")
      .fromTo(".hero-stat", { y: 30, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.5 }, "-=0.4")
      .fromTo(heroIllRef.current, { x: 80, opacity: 0, rotate: 8 }, { x: 0, opacity: 1, rotate: 0, duration: 1.1, ease: "power3.out" }, "-=1");

    gsap.to(heroIllRef.current, { y: -16, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });

    const reveal = (sel, trigger, extra = {}) => gsap.fromTo(sel, { y: 60, opacity: 0, scale: 0.96 }, { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, scrollTrigger: { trigger, start: "top 78%" }, ...extra });
    reveal(".fac-card", facilRef.current);
    reveal(".crt-card", courtRef.current);
    reveal(".price-card", priceRef.current);
    gsap.fromTo(".sched-slot", { x: -20, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.05, duration: 0.4, scrollTrigger: { trigger: schedRef.current, start: "top 75%" } });
    gsap.fromTo(".cta-wrap", { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, scrollTrigger: { trigger: ctaRef.current, start: "top 82%" } });
    gsap.utils.toArray(".sec-title").forEach(el => gsap.fromTo(el, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: el, start: "top 88%" } }));
  }, []);

  const go = (id) => {
    const m = { Beranda: "hero", Fasilitas: "fasilitas", Lapangan: "lapangan", Jadwal: "jadwal", Harga: "harga", Kontak: "kontak" };
    document.getElementById(m[id])?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  const G = "#066350", L = "#c8f059", C = "#f7fee6";

  return (
    <div style={{ fontFamily: "'DM Sans',sans-serif", background: C, color: "#1a2e1a", overflowX: "hidden" }}>

      {/* NAV */}
      <header className="nav-wrap" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: 68, padding: "0 clamp(1.5rem,4vw,4rem)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(6,99,80,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "background 0.4s, box-shadow 0.4s",
        boxShadow: scrolled ? "0 2px 24px rgba(0,0,0,0.18)" : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: L, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🎾</div>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.45rem", letterSpacing: "0.1em", color: scrolled ? C : G }}>SMASHZONE</span>
        </div>
        <nav style={{ display: "flex", alignItems: "center", gap: "1.6rem" }} className="desk-nav">
          {NAV.filter(n => n !== "Kontak").map(n => (
            <button key={n} onClick={() => go(n)} style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "0.93rem", fontWeight: 500, color: scrolled ? "rgba(247,254,230,0.85)" : G, transition: "color 0.2s" }}>{n}</button>
          ))}
          <button onClick={() => go("Kontak")} style={{ background: L, color: G, border: "none", borderRadius: "7px", padding: "0.55rem 1.25rem", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.88rem", cursor: "pointer", letterSpacing: "0.04em", transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.background = "#d4f570"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.background = L; }}>Booking</button>
        </nav>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="ham" style={{ display: "none", background: "none", border: "none", cursor: "pointer", fontSize: "1.6rem", color: scrolled ? C : G }}>
          {mobileOpen ? "✕" : "☰"}
        </button>
      </header>

      {/* MOBILE NAV */}
      <div style={{ position: "fixed", top: 68, left: 0, right: 0, zIndex: 199, background: G, padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "0.6rem", transform: mobileOpen ? "translateY(0)" : "translateY(-130%)", transition: "transform 0.4s cubic-bezier(.77,0,.175,1)" }}>
        {NAV.map(n => <button key={n} onClick={() => go(n)} style={{ background: "none", border: "none", borderBottom: "1px solid rgba(247,254,230,0.1)", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontSize: "1.25rem", fontWeight: 600, color: C, textAlign: "left", padding: "0.6rem 0" }}>{n}</button>)}
      </div>

      {/* HERO */}
      <section id="hero" style={{
        minHeight: "100vh", padding: "7rem clamp(1.5rem,4vw,4rem) 3rem",
        display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "2rem",
        position: "relative", overflow: "hidden",
        background: "#031209", // Dark base for loading
      }}>
        {/* CAROUSEL BACKGROUND */}
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {slides.map((s, i) => (
            <div key={i} className={`hero-slide-${i}`} style={{
              position: "absolute", inset: 0,
              backgroundImage: `url(${s.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: activeSlide === i ? 1 : 0,
              transition: "opacity 1.5s ease-in-out",
              zIndex: activeSlide === i ? 1 : 0,
            }}>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(3,18,9,0.9) 10%, rgba(3,18,9,0.3) 50%, rgba(3,18,9,0.8) 90%)" }} />
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 20% 50%, transparent 0%, rgba(3,18,9,0.4) 100%)" }} />
            </div>
          ))}
        </div>

        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `linear-gradient(rgba(200,240,89,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(200,240,89,.05) 1px,transparent 1px)`, backgroundSize: "60px 60px", zIndex: 1 }} />

        <div style={{ zIndex: 10, position: "relative" }}>
          <div className="hero-tag" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(200,240,89,.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(200,240,89,.25)", padding: "0.5rem 1.2rem", borderRadius: "30px", marginBottom: "1.5rem" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: L, display: "inline-block", animation: "blink 2s infinite" }} />
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: L, letterSpacing: "0.12em" }}>{slides[activeSlide].tag} · BUKA 06.00–24.00</span>
          </div>

          <h1 ref={heroHeadRef} style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(4.5rem,10vw,10.5rem)", lineHeight: 0.85, letterSpacing: "-0.01em", color: C, marginBottom: "1.8rem", textShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
            READY<br /><span style={{ color: L }}>{slides[activeSlide].title}</span><br />LEVEL <span style={{ WebkitTextStroke: "1px " + C, color: "transparent" }}>UP</span>
          </h1>

          <p ref={heroSubRef} style={{ fontSize: "1.1rem", fontWeight: 300, color: "rgba(247,254,230,0.9)", lineHeight: 1.8, maxWidth: 480, marginBottom: "3rem", textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}>
            Pengalaman padel paling eksklusif di Jakarta. 6 lapangan panoramic internasional, fasilitas bintang 5, dan komunitas elit yang siap menyambut Anda.
          </p>

          <div ref={heroBtnRef} style={{ display: "flex", gap: "1.2rem", flexWrap: "wrap" }}>
            <button onClick={() => go("Kontak")} style={{
              padding: "1.1rem 2.8rem", border: "none", borderRadius: "12px",
              background: L, color: G,
              fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: "1rem",
              letterSpacing: "0.04em", cursor: "pointer", transition: "all 0.3s",
              boxShadow: `0 10px 25px rgba(200,240,89,0.3)`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.background = "#d4f570"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.background = L; }}
            >Booking Sekarang</button>
            
            <button onClick={() => go("Lapangan")} style={{
              padding: "1.1rem 2.8rem", border: `2px solid rgba(247,254,230,0.3)`, borderRadius: "12px",
              background: "rgba(247,254,230,0.08)", color: C,
              backdropFilter: "blur(12px)",
              fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "1rem",
              letterSpacing: "0.04em", cursor: "pointer", transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.background = "rgba(247,254,230,0.15)"; e.currentTarget.style.borderColor = C; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.background = "rgba(247,254,230,0.08)"; e.currentTarget.style.borderColor = "rgba(247,254,230,0.3)"; }}
            >Lihat Fasilitas</button>
          </div>

          <div style={{ display: "flex", gap: "3rem", marginTop: "4rem", flexWrap: "wrap" }}>
            {[["6", "Courts"], ["500+", "Members"], ["4.9★", "Google"], ["24/7", "Hours"]].map(([n, l]) => (
              <div key={l} className="hero-stat" style={{ padding: "1rem 1.5rem", background: "rgba(247,254,230,0.05)", backdropFilter: "blur(10px)", border: "1px solid rgba(247,254,230,0.1)", borderRadius: "16px" }}>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.4rem", color: L, letterSpacing: "0.02em", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(247,254,230,0.6)", fontWeight: 700, letterSpacing: "0.1em", marginTop: "0.3rem" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        <div ref={heroIllRef} style={{ zIndex: 10, display: "flex", justifyContent: "center", alignItems: "center", pointerEvents: "none" }}>
          {/* Keep a subtle floating element or just leave empty for clean photography look */}
          <div style={{ width: "100%", height: "100%", position: "relative", display: "flex", justifyContent: "center" }}>
            <div style={{ width: 400, height: 400, border: `1px solid rgba(200,240,89,0.15)`, borderRadius: "50%", position: "absolute", animation: "pulse 4s infinite" }} />
            <div style={{ width: 300, height: 300, border: `1px solid rgba(200,240,89,0.25)`, borderRadius: "50%", position: "absolute", top: "12%", animation: "pulse 4s infinite 1s" }} />
          </div>
        </div>

        <div style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", color: L, fontSize: "0.8rem", fontWeight: 700, letterSpacing: "0.2em", zIndex: 10 }}>
          EXPLORE <div style={{ width: 2, height: 50, background: `linear-gradient(${L},transparent)`, animation: "scrollAnim 2s ease-in-out infinite" }} />
        </div>
      </section>

      {/* FASILITAS */}
      <section id="fasilitas" ref={facilRef} style={{ padding: "7rem clamp(1.5rem,4vw,4rem)", background: G }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="sec-title" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1.5rem", marginBottom: "4rem" }}>
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.22em", color: L, marginBottom: "0.7rem" }}>FASILITAS</div>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.5rem,5vw,4.2rem)", color: C, letterSpacing: "0.02em", lineHeight: 1 }}>STANDAR DUNIA<br />UNTUK ANDA</h2>
            </div>
            <p style={{ fontSize: "1rem", color: "rgba(247,254,230,.6)", maxWidth: 380, lineHeight: 1.75, fontWeight: 300 }}>Fasilitas lengkap dirancang untuk mendukung performa terbaik di setiap sesi.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "1.1rem" }}>
            {FACILITIES.map((f, i) => (
              <div key={i} className="fac-card" style={{ background: "rgba(247,254,230,.05)", border: "1px solid rgba(247,254,230,.1)", borderRadius: "14px", padding: "1.8rem", transition: "all 0.3s", cursor: "default" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(200,240,89,.1)"; e.currentTarget.style.borderColor = L; e.currentTarget.style.transform = "translateY(-6px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "rgba(247,254,230,.05)"; e.currentTarget.style.borderColor = "rgba(247,254,230,.1)"; e.currentTarget.style.transform = ""; }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.25rem", color: C, letterSpacing: "0.05em", marginBottom: "0.5rem" }}>{f.title}</h3>
                <p style={{ fontSize: "0.88rem", color: "rgba(247,254,230,.58)", lineHeight: 1.65, fontWeight: 300 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAPANGAN */}
      <section id="lapangan" ref={courtRef} style={{ padding: "7rem clamp(1.5rem,4vw,4rem)", background: C }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div className="sec-title" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.22em", color: G, marginBottom: "0.7rem" }}>LAPANGAN</div>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.5rem,5vw,4.2rem)", color: G, letterSpacing: "0.02em" }}>PILIH LAPANGAN<br />ANDA</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(270px,1fr))", gap: "1.5rem" }}>
            {COURTS.map(c => (
              <div key={c.id} className="crt-card" style={{ background: G, borderRadius: "18px", overflow: "hidden", boxShadow: "0 4px 24px rgba(6,99,80,.14)", transition: "all 0.3s", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px) scale(1.01)"; e.currentTarget.style.boxShadow = "0 22px 52px rgba(6,99,80,.26)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 4px 24px rgba(6,99,80,.14)"; }}>
                <div style={{ padding: "1.4rem 1.4rem 0" }}><CourtDiagram /></div>
                <div style={{ padding: "1.4rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                    <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.4rem", color: C, letterSpacing: "0.05em" }}>{c.name}</span>
                    <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", padding: "0.22rem 0.6rem", borderRadius: "20px", background: c.available ? L : "rgba(247,254,230,.15)", color: c.available ? G : "rgba(247,254,230,.5)" }}>{c.available ? "TERSEDIA" : "PENUH"}</span>
                  </div>
                  <div style={{ fontSize: "0.83rem", color: "rgba(247,254,230,.65)", marginBottom: "1rem" }}>{c.type}</div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.2rem" }}>
                    {c.features.map((f, i) => <li key={i} style={{ fontSize: "0.87rem", color: "rgba(247,254,230,.82)", display: "flex", gap: "0.5rem" }}><span style={{ color: L, fontWeight: 700 }}>✓</span>{f}</li>)}
                  </ul>
                  <button style={{ width: "100%", background: c.available ? L : "rgba(247,254,230,.08)", color: c.available ? G : "rgba(247,254,230,.35)", border: "none", borderRadius: "8px", padding: "0.75rem", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.9rem", cursor: c.available ? "pointer" : "not-allowed", transition: "all 0.2s" }}
                    onMouseEnter={e => { if (c.available) { e.currentTarget.style.background = "#d4f570"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.background = c.available ? L : "rgba(247,254,230,.08)"; e.currentTarget.style.transform = ""; }}>
                    {c.available ? "Booking Court Ini" : "Tidak Tersedia"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* JADWAL */}
      <section id="jadwal" ref={schedRef} style={{ padding: "7rem clamp(1.5rem,4vw,4rem)", background: "#041a10" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="sec-title" style={{ textAlign: "center", marginBottom: "3rem" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.22em", color: L, marginBottom: "0.7rem" }}>JADWAL</div>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.5rem,5vw,4.2rem)", color: C, letterSpacing: "0.02em" }}>CEK KETERSEDIAAN<br />SESI</h2>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", paddingBottom: "1rem", marginBottom: "2rem", scrollbarWidth: "none" }}>
            {DAYS.map(d => (
              <button key={d} onClick={() => setActiveDay(d)} style={{ flexShrink: 0, padding: "0.6rem 1.4rem", borderRadius: "8px", border: "none", cursor: "pointer", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: "0.93rem", transition: "all 0.2s", background: activeDay === d ? L : "rgba(247,254,230,.07)", color: activeDay === d ? G : "rgba(247,254,230,.55)" }}>{d}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(195px,1fr))", gap: "0.8rem" }}>
            {SLOTS_BASE.map((sl, i) => {
              const avail = STATUS_PATTERN[activeDay][i] === "tersedia";
              return (
                <div key={i} className="sched-slot" style={{ background: avail ? "rgba(200,240,89,.07)" : "rgba(247,254,230,.03)", border: `1px solid ${avail ? "rgba(200,240,89,.28)" : "rgba(247,254,230,.07)"}`, borderRadius: "10px", padding: "1rem 1.2rem", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: avail ? "pointer" : "not-allowed", transition: "all 0.2s" }}
                  onMouseEnter={e => { if (avail) { e.currentTarget.style.background = "rgba(200,240,89,.14)"; e.currentTarget.style.transform = "scale(1.02)"; } }}
                  onMouseLeave={e => { e.currentTarget.style.background = avail ? "rgba(200,240,89,.07)" : "rgba(247,254,230,.03)"; e.currentTarget.style.transform = ""; }}>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.35rem", color: C, letterSpacing: "0.06em" }}>{sl.time}</div>
                    <div style={{ fontSize: "0.8rem", color: "rgba(247,254,230,.5)", marginTop: "0.1rem" }}>{sl.label}</div>
                  </div>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.08em", padding: "0.22rem 0.6rem", borderRadius: "20px", background: avail ? L : "rgba(247,254,230,.1)", color: avail ? G : "rgba(247,254,230,.35)", textTransform: "uppercase" }}>{avail ? "tersedia" : "penuh"}</span>
                </div>
              );
            })}
          </div>
          <p style={{ textAlign: "center", marginTop: "2rem", color: "rgba(247,254,230,.35)", fontSize: "0.82rem", fontWeight: 300 }}>* Jadwal diperbarui real-time. Klik slot tersedia untuk booking langsung.</p>
        </div>
      </section>

      {/* HARGA */}
      <section id="harga" ref={priceRef} style={{ padding: "7rem clamp(1.5rem,4vw,4rem)", background: C }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="sec-title" style={{ textAlign: "center", marginBottom: "4rem" }}>
            <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.22em", color: G, marginBottom: "0.7rem" }}>HARGA</div>
            <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.5rem,5vw,4.2rem)", color: G, letterSpacing: "0.02em" }}>PAKET YANG TEPAT<br />UNTUK ANDA</h2>
            <p style={{ color: "#4a6a4a", marginTop: "1rem", fontWeight: 300, lineHeight: 1.7, fontSize: "1rem" }}>Weekday: Senin–Jumat · Weekend: Sabtu–Minggu & Hari Libur</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(290px,1fr))", gap: "1.5rem", alignItems: "start" }}>
            {PRICING.map((p, i) => (
              <div key={i} className="price-card" style={{
                background: p.highlight ? L : i === 2 ? "#044d3e" : G,
                borderRadius: "20px", padding: "2.2rem", position: "relative", overflow: "hidden",
                boxShadow: p.highlight ? "0 22px 60px rgba(6,99,80,.22)" : "0 4px 20px rgba(0,0,0,.07)",
                transform: p.highlight ? "scale(1.04)" : "scale(1)", transition: "all 0.3s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = p.highlight ? "scale(1.07) translateY(-4px)" : "translateY(-6px)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = p.highlight ? "scale(1.04)" : ""; }}>
                {p.badge && <div style={{ position: "absolute", top: "1.2rem", right: "1.2rem", background: G, color: L, fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.12em", padding: "0.28rem 0.7rem", borderRadius: "20px" }}>{p.badge}</div>}
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.15rem", letterSpacing: "0.1em", marginBottom: "0.8rem", color: p.highlight ? G : C }}>{p.name}</div>
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2.8rem", color: p.highlight ? G : C, letterSpacing: "0.02em", lineHeight: 1 }}>{p.weekday === "Hubungi" ? "Hubungi" : `Rp ${p.weekday}`}</div>
                {p.weekday !== "Hubungi" && <div style={{ fontSize: "0.83rem", color: p.highlight ? "rgba(6,99,80,.65)" : "rgba(247,254,230,.5)", marginTop: "0.3rem", fontWeight: 300 }}>Weekend: Rp {p.weekend} {p.unit}</div>}
                <div style={{ fontSize: "0.78rem", color: p.highlight ? "rgba(6,99,80,.55)" : "rgba(247,254,230,.4)", marginBottom: "1.5rem", letterSpacing: "0.04em" }}>{p.weekday !== "Hubungi" ? `Weekday ${p.unit}` : "Disesuaikan kebutuhan"}</div>
                <div style={{ borderTop: `1px solid ${p.highlight ? "rgba(6,99,80,.18)" : "rgba(247,254,230,.12)"}`, paddingTop: "1.2rem", marginBottom: "1.5rem" }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", gap: "0.55rem", marginBottom: "0.62rem", alignItems: "flex-start" }}>
                      <span style={{ color: p.highlight ? G : L, fontWeight: 700, flexShrink: 0 }}>✓</span>
                      <span style={{ fontSize: "0.88rem", fontWeight: 300, color: p.highlight ? "#1a3a1a" : "rgba(247,254,230,.8)", lineHeight: 1.5 }}>{f}</span>
                    </div>
                  ))}
                </div>
                <button style={{ width: "100%", padding: "0.9rem", background: p.highlight ? G : L, color: p.highlight ? C : G, border: "none", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontWeight: 700, fontSize: "0.93rem", letterSpacing: "0.04em", cursor: "pointer", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = "0.87"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = ""; }}>{p.cta}</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAK */}
      <section id="kontak" ref={ctaRef} style={{ padding: "7rem clamp(1.5rem,4vw,4rem)", background: G, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: `radial-gradient(circle at 18% 50%,rgba(200,240,89,.07) 0%,transparent 48%),radial-gradient(circle at 82% 50%,rgba(200,240,89,.05) 0%,transparent 48%)` }} />
        <div className="cta-wrap" style={{ maxWidth: 980, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <div>
              <div style={{ fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.22em", color: L, marginBottom: "0.8rem" }}>BOOKING & KONTAK</div>
              <h2 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(2.5rem,5vw,4.2rem)", color: C, letterSpacing: "0.02em", lineHeight: 1.05, marginBottom: "2rem" }}>SIAP BERMAIN<br />SEKARANG?</h2>
              {[["📍", "Lokasi", "Jl. Sudirman No. 100\nJakarta Selatan 12920"], ["⏰", "Jam Buka", "Setiap Hari · 06.00 – 24.00 WIB"], ["📱", "WhatsApp", "+62 812 9988 7766"], ["📧", "Email", "booking@smashzone.id"]].map(([ic, lb, vl]) => (
                <div key={lb} style={{ display: "flex", gap: "1rem", alignItems: "flex-start", marginBottom: "1.2rem" }}>
                  <span style={{ fontSize: "1.2rem", flexShrink: 0, marginTop: 2 }}>{ic}</span>
                  <div>
                    <div style={{ fontSize: "0.73rem", fontWeight: 700, letterSpacing: "0.12em", color: L, marginBottom: "0.15rem" }}>{lb}</div>
                    <div style={{ fontSize: "0.93rem", color: "rgba(247,254,230,.78)", fontWeight: 300, lineHeight: 1.55, whiteSpace: "pre-line" }}>{vl}</div>
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", gap: "0.8rem", marginTop: "1.5rem" }}>
                {["Instagram", "TikTok", "YouTube"].map(s => (
                  <button key={s} style={{ background: "rgba(247,254,230,.07)", border: "1px solid rgba(247,254,230,.2)", color: "rgba(247,254,230,.7)", padding: "0.5rem 1rem", borderRadius: "7px", fontFamily: "'DM Sans',sans-serif", fontSize: "0.83rem", cursor: "pointer", transition: "all 0.2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = L; e.currentTarget.style.color = L; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(247,254,230,.2)"; e.currentTarget.style.color = "rgba(247,254,230,.7)"; }}>{s}</button>
                ))}
              </div>
            </div>

            <div style={{ background: "rgba(247,254,230,.06)", border: "1px solid rgba(247,254,230,.1)", borderRadius: "18px", padding: "2rem" }}>
              <h3 style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.6rem", color: C, letterSpacing: "0.06em", marginBottom: "1.5rem" }}>FORM BOOKING</h3>
              {[{ ph: "Nama Lengkap", tp: "text" }, { ph: "Nomor WhatsApp", tp: "tel" }, { ph: "Tanggal Main", tp: "date" }].map(({ ph, tp }) => (
                <input key={ph} type={tp} placeholder={ph} style={{ width: "100%", padding: "0.88rem 1.1rem", marginBottom: "1rem", background: "rgba(247,254,230,.07)", border: "1px solid rgba(247,254,230,.15)", borderRadius: "8px", color: C, fontFamily: "'DM Sans',sans-serif", fontSize: "0.93rem", outline: "none", display: "block" }}
                  onFocus={e => e.target.style.borderColor = L}
                  onBlur={e => e.target.style.borderColor = "rgba(247,254,230,.15)"} />
              ))}
              <select style={{ width: "100%", padding: "0.88rem 1.1rem", marginBottom: "1rem", background: "rgba(247,254,230,.07)", border: "1px solid rgba(247,254,230,.15)", borderRadius: "8px", color: C, fontFamily: "'DM Sans',sans-serif", fontSize: "0.93rem", outline: "none" }}>
                <option value="">Pilih Lapangan</option>
                {COURTS.map(c => <option key={c.id}>{c.name} — {c.type}</option>)}
              </select>
              <select style={{ width: "100%", padding: "0.88rem 1.1rem", marginBottom: "1.5rem", background: "rgba(247,254,230,.07)", border: "1px solid rgba(247,254,230,.15)", borderRadius: "8px", color: C, fontFamily: "'DM Sans',sans-serif", fontSize: "0.93rem", outline: "none" }}>
                <option value="">Pilih Jam Sesi</option>
                {["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00", "22:00"].map(t => <option key={t}>{t} WIB</option>)}
              </select>
              <button style={{ width: "100%", padding: "1rem", background: L, color: G, border: "none", borderRadius: "10px", fontFamily: "'DM Sans',sans-serif", fontWeight: 800, fontSize: "1rem", letterSpacing: "0.05em", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#d4f570"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 8px 22px rgba(200,240,89,.3)`; }}
                onMouseLeave={e => { e.currentTarget.style.background = L; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>Konfirmasi Booking →</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#031209", padding: "2.2rem clamp(1.5rem,4vw,4rem)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: L, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem" }}>🎾</div>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.25rem", letterSpacing: "0.1em", color: C }}>SMASHZONE PADEL</span>
        </div>
        <span style={{ fontSize: "0.82rem", color: "rgba(247,254,230,.3)", fontWeight: 300 }}>© 2024 SmashZone Padel. Hak Cipta Dilindungi.</span>
        <div style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}>
          <span style={{ fontSize: "0.82rem", color: "rgba(247,254,230,.3)" }}>Made with ❤️ in Jakarta</span>
        </div>
      </footer>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(.8)} }
        @keyframes scrollAnim { 0%,100%{opacity:1;transform:scaleY(1)} 50%{opacity:.4;transform:scaleY(.55)} }
        @keyframes pulse { 0% { transform: scale(1); opacity: 0.3; } 50% { transform: scale(1.1); opacity: 0.1; } 100% { transform: scale(1); opacity: 0.3; } }
        ::-webkit-scrollbar{width:5px;height:5px} ::-webkit-scrollbar-thumb{background:#066350;border-radius:3px}
        select option{background:#066350;color:#f7fee6}
        input::placeholder{color:rgba(247,254,230,.38)}
        @media(max-width:900px){.desk-nav button:not(:last-child){display:none!important}.ham{display:flex!important}}
        @media(max-width:768px){
          #hero{grid-template-columns:1fr!important;text-align:center}
          #hero>div:first-of-type>div:nth-child(5){justify-content:center}
          #hero>div:first-of-type>div:nth-child(4){justify-content:center}
          .cta-wrap>div{grid-template-columns:1fr!important;gap:2.5rem!important}
        }
      `}</style>
    </div>
  );
}
