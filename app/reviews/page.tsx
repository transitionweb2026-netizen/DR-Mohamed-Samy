import ScrollRevealInit from "@/components/ScrollRevealInit";

const REVIEWS = [
  {
    tag: "Liver Transplant",
    quote:
      "\"The level of care and precision was extraordinary. I felt completely safe in Dr. Samy's hands. A truly life-saving experience.\"",
    name: "Ahmed Hassan",
    stars: 5,
  },
  {
    tag: "Complex Resection",
    quote:
      '"My family and I are forever grateful. The facility is like stepping into the future of medicine."',
    name: "Sarah M.",
    stars: 5,
  },
  {
    tag: "Donor Surgery",
    quote:
      '"The technological approach and the warm human touch made a terrifying process feel manageable."',
    name: "Tarek E.",
    stars: 4.5,
  },
  {
    tag: "Consultation",
    quote:
      "\"Unmatched expertise. I travelled from Dubai just to consult with Dr. Samy's team.\"",
    name: "Omar R.",
    stars: 5,
  },
  {
    tag: "Biliary Care",
    quote:
      '"The attention to detail in my biliary treatment was world-class. I felt like a priority at every stage of my recovery."',
    name: "Laila K.",
    stars: 5,
  },
  {
    tag: "Liver Resection",
    quote:
      "\"Dr. Samy's surgical precision is legendary for a reason. My resection was successful beyond my highest expectations.\"",
    name: "Hassan B.",
    stars: 5,
  },
  {
    tag: "Pancreatic Surgery",
    quote:
      '"A complex procedure made simple by a team of experts. The post-operative care was compassionate and thorough."',
    name: "Monica G.",
    stars: 5,
  },
  {
    tag: "Complex Oncology",
    quote:
      '"Navigating a cancer diagnosis is daunting, but the clinical excellence here gave me the confidence to fight and win."',
    name: "James W.",
    stars: 5,
  },
  {
    tag: "Hepatobiliary Care",
    quote:
      "\"The most advanced medical technology paired with a deeply human touch. I couldn't have asked for better care.\"",
    name: "Fatma A.",
    stars: 5,
  },
  {
    tag: "Liver Transplant",
    quote:
      "\"A second chance at life. The transplant team's expertise is matched only by their dedication to patient outcomes.\"",
    name: "Robert S.",
    stars: 5,
  },
  {
    tag: "Tumor Resection",
    quote:
      '"Precision and care defined my experience. The recovery plan was tailored perfectly to my needs and lifestyle."',
    name: "Chen L.",
    stars: 5,
  },
  {
    tag: "Gallbladder Surgery",
    quote:
      '"Efficient, professional, and highly skilled. I was back on my feet much sooner than I expected thanks to Dr. Samy."',
    name: "David M.",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  const full = Math.floor(count);
  const half = count % 1 !== 0;
  return (
    <div className="flex text-tertiary-container">
      {Array.from({ length: full }).map((_, i) => (
        <span
          key={`full-${i}`}
          className="material-symbols-outlined text-[16px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      ))}
      {half && (
        <span
          className="material-symbols-outlined text-[16px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star_half
        </span>
      )}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <div className="route-reviews">
      <ScrollRevealInit />
      <main>
        {/* 1. Hero */}
        <section className="relative pt-40 pb-20 min-h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="bg-cover bg-center w-full h-full opacity-60"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuABr8RCHWKBGb15XK8fhMDDQKv5UcHug3V8XtPhlXI0s4rhORdhQz247lRzV5bsTJbg10jjHrvgRUzqWWkYdjMHK2J1A-FByH8v6TuIiVdky7tKi_bNAg5wGSy9l-_buPuiDu4MCmcARmIoiB_l1kNc2emu1P3mfv2oq-_MgRm2ikxRe2FpsH_OE93flQx8TeCOoYa1UeDVG-ccO0EWlYfRGYlLDpWtzBDzwYKUmMwRKbNpVivqzDTK')",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-surface-container/80 via-background/60 to-background backdrop-blur-[10px]"></div>
          </div>
          <div className="relative z-10 w-full max-w-[1450px] mx-auto px-glass-padding text-center">
            <span className="inline-block font-label-sm text-label-sm text-secondary tracking-widest uppercase mb-4 px-4 py-1 rounded-full bg-surface-container border border-white/50 backdrop-blur-md">
              REAL EXPERIENCES. REAL TRUST.
            </span>
            <h1 className="font-hero-headline-mobile md:font-hero-headline text-hero-headline-mobile md:text-hero-headline text-on-surface mb-6 max-w-4xl mx-auto drop-shadow-sm">
              STORIES THAT SPEAK FOR THEMSELVES.
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10">
              Real experiences from patients who trusted their care to Dr.
              Mohamed Samy Abdelwahid.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn-primary font-label-sm text-label-sm px-8 py-4 rounded-full w-full sm:w-auto flex items-center justify-center gap-2">
                Book an Appointment
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  arrow_forward
                </span>
              </button>
              <button className="btn-secondary font-label-sm text-label-sm px-8 py-4 rounded-full w-full sm:w-auto">
                Contact Us
              </button>
            </div>
          </div>
          <div className="absolute right-glass-padding top-1/2 -translate-y-1/2 flex flex-col gap-3 z-20 hidden lg:flex glass-panel rounded-full p-2">
            <a
              className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm"
              href="#"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                qr_code_2
              </span>
            </a>
            <a
              className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm"
              href="#"
            >
              <span className="material-symbols-outlined">photo_camera</span>
            </a>
            <a
              className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm"
              href="#"
            >
              <span className="material-symbols-outlined">music_note</span>
            </a>
            <a
              className="w-10 h-10 rounded-full bg-white/50 flex items-center justify-center text-primary hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-sm"
              href="#"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                call
              </span>
            </a>
          </div>
        </section>

        {/* 2. Reviews Gallery */}
        <section className="py-section-gap px-4 sm:px-8 max-w-[1450px] mx-auto relative z-10">
          <div className="text-center mb-16 reveal-on-scroll is-visible">
            <span className="font-label-sm text-label-sm text-primary mb-2 block uppercase tracking-widest">
              PATIENT EXPERIENCES
            </span>
            <h2 className="font-section-title text-section-title text-on-surface">
              PATIENT REVIEWS
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap">
            {REVIEWS.map((review, i) => (
              <div
                key={review.name}
                className="glass-capsule p-8 flex flex-col h-full reveal-on-scroll"
                style={{ transitionDelay: `${(i % 4) * 100}ms` }}
              >
                <div className="waveform-bg"></div>
                <div className="hologram-quote">&quot;</div>
                <div className="relative z-10 flex-grow">
                  <div className="inline-block px-3 py-1 bg-surface-container-high rounded-full border border-white/40 font-label-sm text-[10px] text-secondary mb-4">
                    {review.tag}
                  </div>
                  <p className="font-body-md text-body-md text-on-surface-variant italic mb-6">
                    {review.quote}
                  </p>
                </div>
                <div className="relative z-10 mt-auto pt-4 border-t border-white/30 flex items-center justify-between">
                  <div>
                    <p className="font-card-title text-card-title text-on-surface text-sm">
                      {review.name}
                    </p>
                    <p className="font-label-sm text-label-sm text-primary flex items-center gap-1 text-[10px]">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>{" "}
                      Verified Patient
                    </p>
                  </div>
                  <Stars count={review.stars} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center reveal-on-scroll is-visible">
            <button className="btn-secondary font-label-sm text-label-sm px-6 py-2 rounded-full">
              Load More Stories
            </button>
          </div>
        </section>

        {/* 3. Final CTA */}
        <section className="py-section-gap px-4 sm:px-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-surface-container-high/30 z-0"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10 glass-panel rounded-glass p-12 md:p-20">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[200px] font-hero-headline text-white opacity-20 pointer-events-none drop-shadow-lg">
              &quot;
            </div>
            <span className="font-label-sm text-label-sm text-secondary mb-4 block tracking-widest uppercase">
              YOUR STORY STARTS HERE
            </span>
            <h2 className="font-section-title text-section-title text-on-surface mb-4">
              READY TO TAKE THE NEXT STEP?
            </h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mx-auto mb-10">
              Get the guidance you need and start your care journey with
              confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-20">
              <button className="btn-primary font-label-sm text-label-sm px-8 py-4 rounded-full w-full sm:w-auto flex items-center justify-center gap-2 group text-on-surface">
                Book an Appointment
                <span
                  className="material-symbols-outlined group-hover:translate-x-1 transition-transform"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  arrow_forward
                </span>
              </button>
              <button className="btn-secondary font-label-sm text-label-sm px-8 py-4 rounded-full w-full sm:w-auto flex items-center justify-center gap-2 bg-white/80 hover:bg-white border-primary-container text-primary">
                <span className="material-symbols-outlined text-green-500">
                  chat
                </span>
                WhatsApp Us
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
