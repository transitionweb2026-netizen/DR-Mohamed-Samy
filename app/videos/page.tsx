"use client";

import { useState } from "react";

const VIDEOS = [
  {
    title: "Understanding Liver Regeneration",
    desc: "A deep dive into the fascinating capacity of the human liver to regenerate after partial removal.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA5IxPLlsWPN5HblFV09bDRv1AegDzCzDhM83M_pC4uO2YPxhay9B-h_X1Rj2xSc9SXjh_7fdWjKJ6MKbxE4RWMk6PG6bx5B_v4nbGJg2zLK14mpGFyuOdVmpT8qZYxhmYo0hRgjKWqJGJA272O2NJq28VTjj8PET12P2Lv2ZK64-b2oebyH3Uwb2wC32YBJv5eYiowrAzezoppDDaFgrW5vNLurDlJr1XjygJVB2rAPxVbRORqifzG",
  },
  {
    title: "Precision Robotic Surgery",
    desc: "How advanced robotics are minimizing risk and improving outcomes in complex hepatic procedures.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD0ixiL_MU4DYrhYOn0ncpY8TBgOTrRGRIztsiJNlgwbDBYsEgBPFEP0jyGgttJRmTgyFbXRz2uoUNzk3wXWrh2-Wx1MwbOXJR1u5TLiHJg_fHhmgtQM358XOiE9lpPLPWeeIKz7Wwe21yEBpfKFCCMYbs627slDHNz0y_ypk2tAUtEzaIigytIXYYJveMUyGMPBuHwVH52PfnkTvxhP8F8xSdje9eQVF3-4PA0vlIOxduwXwg2cKbW",
  },
  {
    title: "The Patient Journey",
    desc: "Step-by-step walk-through of what to expect from initial consultation to post-operative care.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuADdzZ1hlaq7l8YOZFpaVOwW3dXECW9MJReN0AuRjyPjxObOtjgECWY4R2sF7g7Mkf3YTPvIHwjBiU9BwtJG43gKQ_KT0Z5F-Dd2lpyqOZJw6fROoJ9_4cDRuTwdOUoLPz1YlW_7kugUgx2pWFk4jP2l6IBveyPJ9PhNUopd0CfHva-8dTHxV6e27Znb1G6IaLIu0FpDypgzrNLLOWttg19TYeXHI7Zm3CZAxvlCd3jgfiH2D87rghC",
  },
  {
    title: "Advanced Diagnostics",
    desc: "Exploring the cutting-edge imaging technologies used to map out precise surgical paths.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA-q4_8Q-YYt6Vy5HIDcQ-8NVst1Qhe37NdLtRS9z0oVuIswNNmCnUuZYnWyDvz7vJLyuofe10XjuVcGuAqN3wab-ObF1IU3lQ3e4tOQ-buxOcIgErnd3vUANq-jKRaACzcww-s0GUAh8P1Jllf_OMeJPogBnnoLAD28904hWF-vZHmWDJbposYnqT6XlrenFEXqdpn1N087u_-nxOqntO0SoGrGDi1ecoJdRiaIbPDrmYEP_GE-lqM",
  },
  {
    title: "Meet the Team",
    desc: "Get to know the world-class specialists dedicated to your liver health and recovery.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZH3xJrpI7ub20YLBqZY2MLfjVGxgF8EsgIXBzC2fhUbjA0Jfem5PSvTFR1BzbRke4tDYm9nEpUV0VXNFgcE7P2f8xSuW-FkPTle8EyqXVT16XducIOlkrW4UfMW3L__2katZ6x0Eg2P7fgrh_W4yNH_B_l41sXx8z2bSh95FL56fxJf7LPGdEAl4twwsahM10uZ5IH7X1vqxSojcFfx7L42xKoThDnSvuMCgNzDyGY09bJZLijgCm",
  },
  {
    title: "Post-Operative Nutrition",
    desc: "Essential dietary guidelines for optimal recovery following liver transplantation surgery.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCzPAquPX556dQo__s6tBs-FVdzKAD2VRdeuqQswoJzm6pt5I1kjp9qtIM4VmuYGu5eV09WosENUPoQv5MGg0zQjDX3WaCCgrgc1-0HdxX2TinsRKUqQS4RDH1xLoZUY55IV9u6Y8r3XQ1B5B2r7fmqsqfGW5BP_agNXSU2fku9ycFB1TIrGPVd5hfxS1MJ339gARI7pc_CesMtLLCICFabJUCpsOWGWb4vrAxYrSa74uzGd46xw4VW",
  },
  {
    title: "Immunosuppression Basics",
    desc: "Understanding the medications required to maintain graft health and prevent rejection.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCecuiUCEZh0Z8mu4IC3kw65U5N1TImdmO7QYFC4Hph_DpF3jEAWZtEWdP7OpfRZ3grTRdGhkkq5Il2RMqUdzuCiWH00Ojv3lQoCg7Ex0wNaMNqVBJzPCSpVaSIWSGbaGaNbOjRWQyCFi3VbU9nepxh8kXhQaJcG33SDBtskI-PpEzFOWRbb-GIx7N4t7xqwlhcKOPGx5AjFPkZYoeyNzbIJ2fcu5xQYauOKy_j25klQrr4JOjkvQEr",
  },
  {
    title: "Life After Transplant",
    desc: "Real stories and practical advice for navigating long-term health and wellness.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBPuDtDhH8DB4K-Cyrkr5uajIK5ZatvxSvPF7Djx_xrMgSRqKze-qvfdXzUuwkySWxUYI6pJXZSjklKfcNeVDgkCOZIIKxjwkZMtUJwWS-GQtlBF-X0By7uU8b3nsX5RSfckCt3rzSO8poKMXuwNsEdd1yHgPEO2lxWANgzxQ1UQVzfWIFgeBo-32ZRJn7Ybk347Di7WGifULMzhTLa9a39E4whxEmX9KRO-Ca8Flz2TOEodzzsZB08",
  },
  {
    title: "International Patient Care",
    desc: "Our comprehensive support system for patients traveling from abroad for specialized care.",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAf0qL6469HiwRWmYmXa-typwrCy8cPWyHezwJI3HVOeur6HbXfaUN_8Q0c69HL9UwxEvjDkI0z7q-Znp3i57UKb5xJwbfPl7SYterAXFQh1EQIPiwExrysTN9dMcIpIutjdyl9EvwmpL2S0aRJzFVKwPpTi1sTv-BJxuXUJKGiNUuPMOVsU-pgcIUdV0s_5xe3bY68s5cpRKW7vs-KC8s84IPkdxHSbEDpX7B0XBKJGB5Iz2hcLxcS",
  },
];

export default function VideosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="route-videos font-body-md text-on-surface antialiased flex flex-col min-h-screen">
      {/* Videos Hero */}
      <header className="relative pt-[120px] pb-16 px-4 md:px-8 max-w-container-max mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12 mt-4">
        <div className="absolute inset-0 z-[-1] overflow-hidden rounded-3xl opacity-20">
          <div className="absolute w-[800px] h-[800px] bg-primary-container/30 rounded-full blur-[100px] -top-[200px] -right-[200px]"></div>
          <div className="absolute w-[600px] h-[600px] bg-tertiary-container/20 rounded-full blur-[80px] bottom-0 left-0"></div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-start z-10">
          <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase mb-4 glass-card px-4 py-2 rounded-full inline-block">
            Medical Insights
          </span>
          <h1 className="font-hero-headline-mobile md:font-hero-headline text-hero-headline-mobile md:text-hero-headline text-primary mb-6 glow-text">
            WATCH. LEARN.
            <br />
            UNDERSTAND.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-md">
            Educational medical content focused on liver health and surgical
            excellence. Explore our library to understand your journey
            better.
          </p>
          <div className="flex flex-wrap gap-4 mb-8">
            <a
              className="bg-gradient-to-r from-secondary to-primary text-on-primary px-8 py-3 rounded-full font-label-sm text-label-sm shadow-[0_0_20px_rgba(24,213,184,0.3)] border-t border-white/50 hover:scale-105 transition-transform flex items-center gap-2"
              href="#videos-grid"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_circle
              </span>
              Watch Latest Videos
            </a>
            <a
              className="glass-card text-secondary px-8 py-3 rounded-full font-label-sm text-label-sm hover:bg-white/50 transition-colors"
              href="#"
            >
              Book an Appointment
            </a>
          </div>
          <div className="flex gap-4 items-center">
            <a
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-primary hover:text-primary-container transition-colors shadow-sm"
              href="#"
            >
              <span className="material-symbols-outlined">call</span>
            </a>
            <a
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-primary hover:text-primary-container transition-colors shadow-sm"
              href="#"
            >
              <span className="material-symbols-outlined">mail</span>
            </a>
            <a
              className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-primary hover:text-primary-container transition-colors shadow-sm"
              href="#"
            >
              <span className="material-symbols-outlined">share</span>
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-center z-10 relative">
          <div className="w-full max-w-md aspect-square rounded-full glass-card flex items-center justify-center relative overflow-hidden border-2 border-white/60 p-4">
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container to-surface-dim opacity-50"></div>
            <span
              className="material-symbols-outlined text-[120px] text-primary/30 absolute z-0"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              medical_information
            </span>
            <div className="w-3/4 h-3/4 rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-inner flex items-center justify-center z-10 relative animate-pulse">
              <span
                className="material-symbols-outlined text-[80px] text-primary-container drop-shadow-[0_0_15px_rgba(24,213,184,0.8)]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Videos Section */}
      <section
        className="py-16 px-4 md:px-8 max-w-container-max mx-auto w-full flex-grow z-10 relative"
        id="videos-grid"
      >
        <div className="text-center mb-16">
          <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase mb-2 block">
            Latest Medical Content
          </span>
          <h2 className="font-section-title text-section-title text-primary">
            OUR VIDEOS
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {VIDEOS.map((video) => (
            <div
              key={video.title}
              className="video-pod glass-card rounded-2xl overflow-hidden aspect-[9/16] relative cursor-pointer group"
              onClick={() => setIsModalOpen(true)}
            >
              <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-black/5 transition-colors"></div>
              <img
                alt={video.title}
                className="thumbnail absolute inset-0 w-full h-full object-cover z-0"
                src={video.img}
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-surface/90 via-surface/40 to-transparent">
                <span
                  className="material-symbols-outlined play-btn text-white text-5xl mb-4 drop-shadow-md"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_circle
                </span>
                <h3 className="font-card-title text-card-title text-primary mb-2">
                  {video.title}
                </h3>
                <p className="font-label-sm text-label-sm text-on-surface-variant line-clamp-2">
                  {video.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4 md:px-8 relative overflow-hidden flex flex-col items-center justify-center text-center mt-auto z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 pointer-events-none z-[-1] flex items-center justify-center">
          <span
            className="material-symbols-outlined text-[600px] text-primary"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            play_arrow
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-secondary tracking-widest uppercase mb-4 glass-card px-4 py-2 rounded-full inline-block">
          The Playback Path
        </span>
        <h2 className="font-section-title text-section-title text-primary mb-8 max-w-2xl mx-auto">
          FROM INFORMATION TO THE RIGHT DECISION.
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <a
            className="bg-gradient-to-r from-secondary to-primary text-on-primary px-10 py-4 rounded-full font-label-sm text-label-sm shadow-[0_0_20px_rgba(24,213,184,0.3)] border-t border-white/50 hover:scale-105 transition-transform"
            href="#"
          >
            Book an Appointment
          </a>
          <a
            className="glass-card text-secondary px-10 py-4 rounded-full font-label-sm text-label-sm hover:bg-white/50 transition-colors flex items-center gap-2"
            href="#"
          >
            <span className="material-symbols-outlined">chat</span>
            WhatsApp Us
          </a>
        </div>
      </section>

      {/* Video Modal */}
      <div
        className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-on-background/80 backdrop-blur-sm transition-opacity duration-300 ${isModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <div
          className={`glass-card w-full max-w-4xl rounded-3xl p-2 relative shadow-2xl transition-all duration-300 ${isModalOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
        >
          <button
            className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-lg hover:scale-110 transition-transform z-10"
            onClick={() => setIsModalOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
          <div className="w-full aspect-video bg-black rounded-2xl flex items-center justify-center overflow-hidden">
            <span className="text-white/50 font-body-md">
              Video Player Loading...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
