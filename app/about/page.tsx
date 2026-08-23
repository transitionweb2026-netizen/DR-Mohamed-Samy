"use client";

import { useEffect, useRef, useState } from "react";
import CertificateGallery from "./CertificateGallery";

const TIMELINE = [
  {
    period: "01 | 2020 - Present",
    role: "Lead Transplant Surgeon",
    place: "Dr. Liver Medical Center",
    dot: "bg-primary shadow-[0_0_15px_#18d5b8] group-hover:scale-125",
  },
  {
    period: "02 | 2012 - 2020",
    role: "Consultant Hepatobiliary Surgeon",
    place: "Advanced Surgical Institute",
    dot: "bg-primary/40 shadow-[0_0_10px_rgba(24,213,184,0.3)] group-hover:bg-primary group-hover:shadow-[0_0_15px_#18d5b8] group-hover:scale-125",
  },
  {
    period: "03 | 2008 - 2012",
    role: "Senior Surgical Fellow",
    place: "Global Transplant Academy",
    dot: "bg-primary/40 shadow-[0_0_10px_rgba(24,213,184,0.3)] group-hover:bg-primary group-hover:shadow-[0_0_15px_#18d5b8] group-hover:scale-125",
  },
  {
    period: "04 | 2005 - 2008",
    role: "Surgical Residency",
    place: "Central University Hospital",
    dot: "bg-primary/40 shadow-[0_0_10px_rgba(24,213,184,0.3)] group-hover:bg-primary group-hover:shadow-[0_0_15px_#18d5b8] group-hover:scale-125",
  },
];

const CONFERENCES = [
  {
    title: "Global Health Innovations Congress",
    location: "London, UK | 2023",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_ic0FcgaYbWg9VwdyLiXUcETwNWPElIq_6uy-UDM2P2T_YGXZd1LmM4t_ouGgXeO20qTSN5EUCubEiAsOTBcHPyDkmP_Rtku5CixmEudFxrV0nOScv0p1X0cFZAUqm7JWxVE7MxoP43OdAJ0p2gX0Kd5ZVtiW-0Qk6mbLXdjjdEF_zlTrmRN43ctkj3xdFC5bHUOmpwuFICDzwqijeYOH0c5NZjtvnmuc_gHp1R9e92xlk1eAE628",
  },
  {
    title: "Advances in Neuroscience",
    location: "Berlin, Germany | 2024",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA4BOCSJElut3dGe9gPW9a_8V1CoQwsGwkVI70e7gRuOhd1hdHbzLvcyYMqlOiJYxkchc89i3hcslb_l0iqTMajUSO4ek4x2KNFEktrjfoOcZ727CVzqrX0BGUmaanJ1zzq2UwN-2REIPWRzY6qBOa_4776thBXSFw1q2tsrkCQxN5k0mEKXH9eOYxzs6bag9ykF5vAj-I-GXCgCMV9eIQAT481HChSPbgUu5l1fxDoaT0tNVylvj43",
  },
  {
    title: "Global Innovations in Surgery",
    location: "New York, USA | 2022",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD3OMB5p7K-bK5F1r894DXzzD2A4KK_K21dBjKIG-W9JXrTZgBl95GbSCfwq9yFcA1ikD16hJOPYjpbY8q6bvCMRJCawllfiWBiEYq32OGfbCh-4U-2RMnYjgIYIa4Uxfnm0q0KXDe81v2xdQ5nC3HmRFJjPD14tbeCgjNf6imoBogsQfopnxB-sxH3ONxIJRr74wXQJkFeAZ6U-dfpdEPLdLZ1PA535umdiZrVNSfM4sI0L9fTL6mL",
  },
  {
    title: "Advanced Medicine Summit",
    location: "Tokyo, Japan | 2021",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDG16N8uLzVLj-yJphc24dZVB3cKmR3Kq2CGqwnd8kxzuZcebLBufaKYv5_XORd8wMULK0DkzInh5MtphckJVM7Y29DcHzL8aYU4NTIXzwIv6xy6_KiUMZb7d-UWsTLwD8x42GbzTc9bP_t-D28WMzU-da9o31BjUgJXLqSx483ezOSndphOGwS5cyz9Hl51NRC4yFHBCn2ohGStMHkm9Q9sT-rOSdnhnStNdwUWnVgVufsPbc_UoPm",
  },
];

type Conference = (typeof CONFERENCES)[number];

export default function AboutPage() {
  const [activeConference, setActiveConference] = useState<Conference | null>(
    null,
  );
  const gatewayRef = useRef<HTMLDivElement>(null);
  const [isGatewayRevealed, setIsGatewayRevealed] = useState(false);

  useEffect(() => {
    document.body.style.overflow = activeConference ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeConference]);

  useEffect(() => {
    const el = gatewayRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsGatewayRevealed(true);
        });
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const revealClass = (delay: string) =>
    `transition-all duration-700 ${delay} ${isGatewayRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`;

  return (
    <div className="route-about bg-background text-on-background antialiased selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      {/* 1. About Hero Section */}
      <section className="relative min-h-screen flex items-center pt-32 pb-section-gap overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div
            className="bg-cover bg-center w-full h-full mix-blend-overlay opacity-80"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAD0wqrfjQ9g2JRCSs7dSqzQMJ2tnTvwnLgQZqC8DlGLUodc2reAIPs4L7rh3gbjVEHIq5B3eLBvFmVUEma9c828HEyvPSt2FLoB0IEiBqP-XZUsafAwnQIKGnWZ1D7bqqXNtZo1dAb55V6rYwEycCtXQGmjSRAuIXzJyh93YEIkjgiP67VBBN9EikiAesFmw2RrbHuKZiqzcS6goqyltAMQAyIl92z9DNububL1KbVZ8XhMDG-Ji8W")',
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/40"></div>
        </div>
        <div className="max-w-container-max mx-auto px-4 md:px-glass-padding w-full relative z-10">
          <div className="max-w-3xl">
            <div className="inline-block glass-card px-4 py-2 rounded-full mb-6 border border-primary/30">
              <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold">
                Pioneering Liver Surgery
              </span>
            </div>
            <h1 className="font-hero-headline-mobile md:font-hero-headline text-hero-headline-mobile md:text-hero-headline text-primary mb-4 leading-tight">
              Dr. Mohamed Samy
              <br />
              Abdelwahid
            </h1>
            <p className="font-body-lg text-body-lg text-surface-container-lowest mb-10 max-w-2xl opacity-90">
              Consultant Hepatobiliary &amp; Liver Transplant Surgeon
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary-glass font-body-md text-body-md px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-bold">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  calendar_month
                </span>
                Book an Appointment
              </button>
              <button className="btn-secondary-glass font-body-md text-body-md px-8 py-4 rounded-xl flex items-center justify-center gap-2 font-bold">
                <span className="material-symbols-outlined icon-fill">
                  play_circle
                </span>
                Watch His Videos
              </button>
            </div>
            <div className="mt-16 inline-flex gap-4 glass-card p-3 rounded-2xl items-center">
              <span className="font-label-sm text-label-sm text-on-surface-variant px-2 font-bold">
                Connect:
              </span>
              <a
                className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center hover:bg-white/80 hover:text-primary transition-colors border border-white/60"
                href="#"
              >
                <span className="material-symbols-outlined text-primary">
                  link
                </span>
              </a>
              <a
                className="w-10 h-10 rounded-full bg-white/40 flex items-center justify-center hover:bg-white/80 hover:text-primary transition-colors border border-white/60"
                href="#"
              >
                <span className="material-symbols-outlined text-primary">
                  mail
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Certificates & Credentials */}
      <section className="py-section-gap relative overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden h-[600px] flex items-center justify-center -mt-20">
          <svg
            className="w-[200%] md:w-full h-full min-w-[2000px] drop-shadow-[0_0_15px_rgba(24,213,184,0.4)]"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 2000 200"
          >
            <path
              className="cable-path"
              d="M -100 100 Q 250 50, 500 100 T 1000 100 T 1500 100 T 2100 100"
              fill="none"
              id="main-cable"
              stroke="rgba(24, 213, 184, 0.2)"
              strokeLinecap="round"
              strokeWidth="12"
            />
            <path
              className="cable-path"
              d="M -100 100 Q 250 50, 500 100 T 1000 100 T 1500 100 T 2100 100"
              fill="none"
              id="core-cable"
              stroke="rgba(255, 255, 255, 0.5)"
              strokeLinecap="round"
              strokeWidth="4"
            />
            <path
              className="cable-path cable-pulse"
              d="M -100 100 Q 250 50, 500 100 T 1000 100 T 1500 100 T 2100 100"
              fill="none"
              id="pulse-cable"
              stroke="#18D5B8"
              strokeLinecap="round"
              strokeWidth="6"
              style={{ animationDuration: "4s" }}
            />
          </svg>
        </div>
        <CertificateGallery />
      </section>

      {/* 3. Meet Dr. Mohamed Samy Abdelwahid */}
      <section className="py-section-gap relative overflow-hidden bg-surface">
        <div className="max-w-container-max mx-auto px-4 md:px-glass-padding relative z-10">
          <div className="text-center mb-16">
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold block mb-4">
              BEHIND THE WHITE COAT
            </span>
            <h2 className="font-hero-headline text-5xl md:text-7xl liquid-text-embossed drop-shadow-[0_10px_20px_rgba(24,213,184,0.3)] text-primary">
              MEET DR. MOHAMED SAMY ABDELWAHID
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-32 bg-gradient-to-r from-transparent via-primary/10 to-transparent blur-3xl pointer-events-none z-0"></div>
            <div className="relative z-10">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden border-[8px] border-white/40 backdrop-blur-md shadow-[0_20px_50px_rgba(0,107,91,0.2),inset_0_0_40px_rgba(24,213,184,0.2)] relative group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-transparent to-white/30 pointer-events-none z-10"></div>
                <div className="w-full h-full bg-surface-container-highest flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-6xl opacity-40 group-hover:scale-110 transition-transform duration-500">
                    play_circle
                  </span>
                </div>
              </div>
            </div>
            <div className="relative z-10 flex flex-col items-start">
              <h3 className="font-hero-headline text-3xl text-primary mb-2">
                Dr. Mohamed Samy Abdelwahid
              </h3>
              <p className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold mb-6">
                CONSULTANT HEPATOBILIARY &amp; LIVER TRANSPLANT SURGEON
              </p>
              <p className="font-body-lg text-body-lg mb-8 opacity-90 leading-relaxed text-on-background">
                With over two decades of specialized experience in complex
                liver surgeries and transplants, Dr. Abdelwahid combines
                surgical precision with a compassionate, patient-centered
                approach. His commitment to pioneering minimally invasive
                techniques has transformed outcomes for hundreds of patients
                worldwide.
              </p>
              <button className="btn-primary-glass font-body-md text-body-md px-8 py-3 rounded-full flex items-center justify-center gap-2 font-bold">
                Discover His Experience
                <span className="material-symbols-outlined">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Career Journey */}
      <section
        className="py-section-gap relative bg-background overflow-hidden"
        style={{ perspective: "1000px" }}
      >
        <div className="max-w-container-max mx-auto px-glass-padding relative z-10">
          <div className="text-center mb-16">
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold block mb-4">
              A Journey Built on Experience
            </span>
            <h2 className="font-hero-headline text-5xl md:text-7xl liquid-text-embossed drop-shadow-[0_10px_20px_rgba(24,213,184,0.3)] text-primary">
              CAREER JOURNEY
            </h2>
          </div>
          <div className="relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-primary/20 -translate-y-1/2 z-0 overflow-hidden">
              <div className="h-full bg-primary w-1/4 animate-[pulse_3s_infinite] shadow-[0_0_15px_#18d5b8]"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
              {TIMELINE.map((item) => (
                <div
                  key={item.period}
                  className="group relative glass-panel p-8 rounded-[2rem] border border-white/60 hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
                >
                  <div
                    className={`absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full transition-all ${item.dot}`}
                  ></div>
                  <div className="text-center">
                    <span className="font-label-sm text-label-sm text-primary/60 block mb-2 font-bold">
                      {item.period}
                    </span>
                    <h3 className="font-card-title text-xl text-on-surface mb-1">
                      {item.role}
                    </h3>
                    <p className="font-body-md text-sm text-primary/80">
                      {item.place}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Scientific Conferences */}
      <section className="py-section-gap relative overflow-hidden bg-surface">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none"></div>
        <div className="max-w-container-max mx-auto px-4 md:px-glass-padding relative z-10">
          <div className="text-center mb-16">
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold block mb-4">
              KNOWLEDGE BEYOND THE OPERATING ROOM
            </span>
            <h2 className="font-hero-headline text-5xl md:text-7xl liquid-text-embossed drop-shadow-[0_10px_20px_rgba(24,213,184,0.3)] text-primary">
              SCIENTIFIC CONFERENCES
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CONFERENCES.map((conf) => (
              <div
                key={conf.title}
                className="straight-capsule flex flex-col h-[400px] group"
                onClick={() => setActiveConference(conf)}
              >
                <div className="h-2/3 w-full relative overflow-hidden">
                  <img
                    alt={conf.title}
                    className="w-full h-full object-cover relative z-0"
                    src={conf.img}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                </div>
                <div className="h-1/3 flex flex-col justify-center items-center p-4 text-center relative z-20 bg-white/10 backdrop-blur-sm border-t border-white/30">
                  <h3 className="font-card-title text-lg text-primary mb-1 group-hover:text-white transition-colors duration-300">
                    {conf.title}
                  </h3>
                  <p className="font-label-sm text-xs group-hover:text-white/80 transition-colors duration-300 text-surface-container-lowest">
                    {conf.location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Full-screen Conference Popup */}
        <div
          className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 ${activeConference ? "active" : ""}`}
          id="conference-popup"
        >
          <div
            className="absolute inset-0 bg-gradient-to-br from-surface/80 to-surface/90"
            onClick={() => setActiveConference(null)}
          ></div>
          <div className="popup-content relative w-full max-w-5xl bg-white/40 backdrop-blur-2xl rounded-3xl border border-white/60 shadow-[0_30px_60px_rgba(0,107,91,0.15),inset_0_0_40px_rgba(24,213,184,0.2)] overflow-hidden flex flex-col md:flex-row">
            <button
              className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-white/50 flex items-center justify-center hover:bg-white/80 text-primary transition-colors border border-white/60 shadow-lg"
              onClick={() => setActiveConference(null)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <div className="w-full md:w-3/5 h-[40vh] md:h-[70vh] relative">
              {activeConference && (
                <img
                  alt="Conference Details"
                  className="w-full h-full object-cover"
                  id="popup-image"
                  src={activeConference.img}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 pointer-events-none"></div>
            </div>
            <div className="w-full md:w-2/5 p-8 md:p-12 flex flex-col justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-br from-white/60 to-white/20 pointer-events-none -z-10"></div>
              <span
                className="font-label-sm text-sm text-primary tracking-widest uppercase font-bold mb-3 block"
                id="popup-location"
              >
                {activeConference?.location}
              </span>
              <h3
                className="font-hero-headline text-4xl text-primary mb-6 leading-tight"
                id="popup-title"
              >
                {activeConference?.title}
              </h3>
              <p className="font-body-md text-on-surface-variant opacity-90 leading-relaxed mb-8">
                Detailed presentation and symposium highlights from this
                prestigious medical gathering. Dr. Abdelwahid shared
                groundbreaking insights on minimally invasive surgical
                techniques, engaging with global experts to advance the
                field of hepatobiliary surgery.
              </p>
              <div className="flex gap-4 mt-auto">
                <button className="btn-primary-glass font-body-md text-sm px-6 py-3 rounded-xl flex-1 font-bold text-center">
                  View Full Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. A Word From The Doctor */}
      <section className="py-section-gap relative overflow-hidden bg-surface" id="doctor-philosophy">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>
        <div className="max-w-container-max mx-auto px-4 md:px-glass-padding relative z-10">
          <div className="text-center mb-16">
            <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold block mb-4">
              THE PHILOSOPHY BEHIND THE CARE
            </span>
            <h2 className="font-hero-headline text-5xl md:text-7xl liquid-text-embossed drop-shadow-[0_10px_20px_rgba(24,213,184,0.3)] text-primary">
              A WORD FROM THE DOCTOR
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-16 relative">
            <div className="w-full md:w-[45%] relative group">
              <div className="absolute -inset-8 z-0">
                <div className="absolute top-0 left-4 w-full h-full bg-white/10 backdrop-blur-sm border border-white/40 rounded-[3rem] transform -rotate-3 transition-transform duration-700 group-hover:-rotate-6"></div>
                <div className="absolute top-4 -left-4 w-full h-full bg-white/10 backdrop-blur-sm border border-white/40 rounded-[3rem] transform rotate-2 transition-transform duration-700 group-hover:rotate-4"></div>
                <div className="absolute -top-4 -right-4 w-full h-full bg-white/5 backdrop-blur-md border border-white/20 rounded-[3rem] transform rotate-1 transition-transform duration-700 group-hover:rotate-2"></div>
              </div>
              <div className="relative z-10 aspect-[3/4] rounded-[3rem] overflow-hidden border-[12px] border-white/60 shadow-[0_30px_60px_rgba(0,107,91,0.15),inset_0_0_40px_rgba(24,213,184,0.2)] backdrop-blur-md">
                <img
                  alt="Dr. Mohamed Samy Abdelwahid Portrait"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD0wqrfjQ9g2JRCSs7dSqzQMJ2tnTvwnLgQZqC8DlGLUodc2reAIPs4L7rh3gbjVEHIq5B3eLBvFmVUEma9c828HEyvPSt2FLoB0IEiBqP-XZUsafAwnQIKGnWZ1D7bqqXNtZo1dAb55V6rYwEycCtXQGmjSRAuIXzJyh93YEIkjgiP67VBBN9EikiAesFmw2RrbHuKZiqzcS6goqyltAMQAyIl92z9DNububL1KbVZ8XhMDG-Ji8W"
                />
                <div className="absolute inset-0 border-[1px] border-primary/30 rounded-[3rem] pointer-events-none shadow-[inset_0_0_30px_rgba(24,213,184,0.4)]"></div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
              </div>
            </div>
            <div className="w-full md:w-[55%] relative">
              <div className="absolute inset-0 -z-10 flex flex-col justify-around opacity-10 pointer-events-none select-none">
                <span className="font-hero-headline text-8xl text-primary transform -translate-x-10 transition-transform duration-1000 hover:translate-x-0">
                  UNDERSTANDING
                </span>
                <span className="font-hero-headline text-8xl text-primary self-end translate-x-10 transition-transform duration-1000 hover:-translate-x-0">
                  PRECISION
                </span>
                <span className="font-hero-headline text-8xl text-primary transform -translate-x-5 transition-transform duration-1000 hover:translate-x-5">
                  TRUST
                </span>
              </div>
              <div className="glass-panel p-12 rounded-[2.5rem] border border-white/80 relative overflow-hidden">
                <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold mb-6 block">
                  MY APPROACH TO PATIENT CARE
                </span>
                <blockquote className="font-body-lg text-2xl md:text-3xl text-on-surface leading-relaxed mb-10 italic">
                  &lsquo;Every patient is more than a diagnosis. The right
                  decision begins with understanding the whole story — then
                  choosing the safest, most precise path forward.&rsquo;
                </blockquote>
                <div className="mt-auto">
                  <div className="h-px w-32 bg-gradient-to-r from-primary to-transparent mb-4"></div>
                  <p className="font-hero-headline text-2xl text-primary">
                    Dr. Mohamed Samy Abdelwahid
                  </p>
                  <p className="font-label-sm text-label-sm text-surface-container-lowest uppercase tracking-widest">
                    Consultant Hepatobiliary &amp; Liver Transplant Surgeon
                  </p>
                </div>
                <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Glass Gateway CTA */}
      <section
        ref={gatewayRef}
        className="relative py-section-gap overflow-hidden bg-surface min-h-[60vh] flex items-center"
        id="glass-gateway"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-gradient-to-t from-primary/20 via-transparent to-transparent blur-[120px] opacity-60"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(24,213,184,0.15)_0%,_transparent_70%)]"></div>
        </div>
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute -left-4 top-0 h-full w-1/4 bg-white/10 backdrop-blur-2xl border-r-[8px] border-white/60 rounded-r-[10rem] transform -rotate-2 transition-transform duration-1000 group-hover:rotate-0 shadow-[20px_0_50px_rgba(24,213,184,0.1)]"></div>
          <div className="absolute -right-4 top-0 h-full w-1/4 bg-white/10 backdrop-blur-2xl border-l-[8px] border-white/60 rounded-l-[10rem] transform rotate-2 transition-transform duration-1000 group-hover:rotate-0 shadow-[-20px_0_50px_rgba(24,213,184,0.1)]"></div>
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-32 bg-gradient-to-t from-primary/30 to-transparent blur-3xl opacity-40 z-0"></div>
        <div className="max-w-container-max mx-auto px-4 md:px-glass-padding relative z-20 text-center">
          <div className="max-w-3xl mx-auto">
            <span className={`${revealClass("delay-100")} font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold block mb-6`}>
              YOUR NEXT STEP
            </span>
            <h2 className={`${revealClass("delay-300")} font-hero-headline text-4xl md:text-6xl text-primary mb-6 leading-tight`}>
              READY TO TAKE THE{" "}
              <span className="liquid-text-embossed">NEXT STEP</span> WITH
              CONFIDENCE?
            </h2>
            <p className={`${revealClass("delay-500")} font-body-lg text-body-lg mb-12 text-black`}>
              Get expert guidance and a personalized approach to your care.
            </p>
            <div className={`${revealClass("delay-700")} flex flex-col sm:flex-row justify-center gap-8`}>
              <button className="group relative px-10 py-5 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-white/40 backdrop-blur-md border-[4px] border-white/80 shadow-[0_20px_40px_rgba(0,107,91,0.1),inset_0_0_20px_rgba(24,213,184,0.2)]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 font-hero-headline text-xl text-primary flex items-center gap-3">
                  <span className="material-symbols-outlined">
                    calendar_month
                  </span>
                  BOOK AN APPOINTMENT
                </span>
              </button>
              <button className="group relative px-10 py-5 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-white/40 backdrop-blur-md border-[4px] border-white/80 shadow-[0_20px_40px_rgba(0,107,91,0.1),inset_0_0_20px_rgba(24,213,184,0.2)]"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <span className="relative z-10 font-hero-headline text-xl text-primary flex items-center gap-3">
                  <span className="material-symbols-outlined">chat</span>
                  WHATSAPP US
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
