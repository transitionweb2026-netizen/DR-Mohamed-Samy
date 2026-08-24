import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/i18n/alternates";
import ShaderBackground from "./ShaderBackground";

const ARTICLE_IDS = [
  "understandingYourLiver",
  "biliaryTreeMapping",
  "roadToRecovery",
  "roboticAssistance",
  "advancedSterilization",
  "scientificConferences",
  "multidisciplinaryCare",
  "futureOfHepatology",
] as const;

const ARTICLE_IMAGES: Record<(typeof ARTICLE_IDS)[number], string> = {
  understandingYourLiver:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAVVZygLn3qRswzY1427qBP2JA6H7Hv7DNajCVKPjacNxB5TelKmu22iGUXNdqafwG09SpTBN21qtxVECPH7bjXRDatKix-e2nmRvLHenH2wWTTfa4TDen5rkmVKGGbUa9tCyln1pdSMTWZGgr2tylKECwjXC9NTqSKBFAqy2YhQeA_X04sdhYuFsWa5DZjfKetLA1zD8HRnabDI67vWZR2lnzMCBvp_RjrAuRG8-Xifp5B8Im1y7Xz",
  biliaryTreeMapping:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBm3XTmDg8IA2CfLP4is0IFpsJFTZ3ObC4bJV5otfDKgpIIrzKbWQWtsu8FO7iT-Yz9lL6NMf9u95gkCfvyeOsAlqv89dZpqhJ7BuLej9b-1TJvGTYrOWG8U3L3h57NAl2MnS2zWDlwyYgz1rHDrATxuRX1ccE3_KdX7IjF8oeQiiW1rrcB2FquepQbrjAmr7dti9jmJaRD4Bx6K-gs-Lqd_QTSbA8J0pnneZJ77N8NFL2YK9TP4cwX",
  roadToRecovery:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAjvBGwKa3vRwBMyX_OL4k1GtG_hPfF2fmV9yKVDsA9onRw81cQ9l9yGM-YDzoXVjfErooVrILD2kDvCi8rtCcWgZ8cqqcci4bG3rcQ2c1HDaVwL9mJ89Z8-yJH6LnFf766SWRdLoQAfHXmBFb1MC_zInQZzVkoFxu15PsnOXsaq5d-odCWrh4XsNY9BDDxwcsKjZUjF1NvO_g8alQOGqYDASPSYKyjvyjL-h8-7hn5_-2bCkKCzrYP",
  roboticAssistance:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBnTI3dIS82iU3FvcvwDJjUNXZ6LYba6OFgMREpvPd9qAUjpWM8BSbCmh51Qko-EBWC3iS01yb8fTUP4rZnvI5r8ESpsB0ge5h5T0iBgl9_aahdAzfLfUG4iU5NZLHKNsfUQmKHeQ4gXaQdH5A6_nPyfUaUDWG75C3gcwZBN0iz0zDL6snmOTOyIG1cn90b-TbC7WqJ7X8C6OV-hgyBE4woo4yn4rSMvxq_r2ZRHH4LNE-R3JHJX4dT",
  advancedSterilization:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA7aSa6ddeBmLAcZ6QK0Pw0-715_ZAp7Y7gaPJ5xKC9hlkMLNSrmU_V-oE_g9JeN7BLBAgB6_JS--iIFPm8fYQs5upncqfTO-fxzIp7mkY-tBvI3_S390xQSG5weOFyHoqh1GCIR7lNzHJs1_3nZbDvV6BghWwN1nmeBNTiYhhaVbCCE_VzZf44Ok2RsbqzYUFxYc1C6L7ekahWVDlFCurJPyq3wmfqocrSzWYT1lkUmLTseHK-_mdl",
  scientificConferences:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCILOmYD4hlsRfuFPxZ76fhp4hp_O4jalWck8pX8u_bDQjpjuVRLCxJyWa_3XLG_SWZ3KR1KTmh781K03zOvGLLOVnd2vPzetxHHxoyFLAzsq5QiPjEtNcIpqzgir-k2xajMOAHPbLdyTpX3jxsSO-HJ7vY_NaHANEFJvJKtZhHlRm8xK99V6caZTTrP8NRDg4Wd_sELGYH7g_JZUYEy5n-pYYPMe2VJA1WkcGliWGWpnnXWOy-dtNb",
  multidisciplinaryCare:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB0Nh8MrVcViOUgldhb86RIYVFSiVkaL2srthrPYHZWmhl1gjjfDiNTBl7Jsc1lGG2gX7spvOcVIlYoEJYhIH9QWtHAdagzI9cwkhtn7UVPeoSOZFc9uogbfwshYGZFBj7hwWozTE0pSFFdwhzTb7v5daDVzAHrGXlTAY4sesguH0K7lhl6NVIin2OchdiJBtkzB_sC-Q-4yTXRrqnG8K7Hq4flf_CO_DzoxgDxr2vg43Tnxhdz9DE1",
  futureOfHepatology:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAE4vIseia-EYulnu-dDGDb9RzxgV-4DUqZh_69wCKTi2kofrPP6eQq7wnQQM0CUdONfXn6mumyMQXWfUlbCUBAaI2BoYlHmhRP0IFZPpf4jlesqggbH6hSakYftwp3puvyjU7ojlbssxp-m8InTw8EHyu7WHyk6dWTFa83xTAPDDQI2sNn1i40fSAX--yEHlgqcR1KYHSEeKJhyNw_7BEUv2GWUEgYiIn4QCw6MSypXFPAFEPsUmsg",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("articles.title"),
    description: t("articles.description"),
    alternates: { languages: localeAlternates("/articles") },
  };
}

export default async function ArticlesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("articles");
  const tCommon = await getTranslations("common");

  return (
    <div className="route-articles bg-background text-on-surface font-body-md antialiased overflow-x-hidden selection:bg-primary-container selection:text-on-primary-container">
      <main>
        {/* Articles Hero */}
        <section className="relative min-h-[60vh] flex items-center pt-32 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              alt="Abstract representation of medical knowledge and research, featuring soft teal glowing lines intersecting like a digital neural network or advanced data visualization over a bright, clinical white background, conveying a sense of futuristic medical insights and cutting-edge healthcare technology."
              className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAE4vIseia-EYulnu-dDGDb9RzxgV-4DUqZh_69wCKTi2kofrPP6eQq7wnQQM0CUdONfXn6mumyMQXWfUlbCUBAaI2BoYlHmhRP0IFZPpf4jlesqggbH6hSakYftwp3puvyjU7ojlbssxp-m8InTw8EHyu7WHyk6dWTFa83xTAPDDQI2sNn1i40fSAX--yEHlgqcR1KYHSEeKJhyNw_7BEUv2GWUEgYiIn4QCw6MSypXFPAFEPsUmsg"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"></div>
          </div>
          <div className="max-w-[1450px] mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 lg:col-start-3 text-center space-y-6">
              <h1 className="font-hero-headline-mobile md:font-hero-headline text-primary text-glow uppercase leading-tight">
                {t("hero.title")}
              </h1>
              <p className="font-body-lg text-on-surface-variant max-w-2xl mx-auto">
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <a
                  className="bg-gradient-to-r from-secondary to-primary text-on-primary px-8 py-4 rounded-full font-body-lg hover:opacity-90 transition-opacity btn-primary-glow w-full sm:w-auto text-center"
                  href="#articles"
                >
                  {t("hero.exploreArticles")}
                </a>
                <a
                  className="glass-panel text-secondary px-8 py-4 rounded-full font-body-lg hover:bg-white/50 transition-colors w-full sm:w-auto text-center"
                  href="#"
                >
                  {t("hero.bookAppointment")}
                </a>
              </div>
            </div>
          </div>
          <div className="absolute end-6 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-4 z-20 glass-panel rounded-full py-6 px-3">
            <a
              aria-label="LinkedIn"
              className="text-primary hover:text-secondary transition-colors"
              href="#"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  clipRule="evenodd"
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                  fillRule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              aria-label="Twitter"
              className="text-primary hover:text-secondary transition-colors"
              href="#"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
              </svg>
            </a>
          </div>
        </section>

        {/* Articles Intro */}
        <section className="py-12" id="articles">
          <div className="max-w-[1450px] mx-auto px-6 text-center">
            <h2 className="font-section-title text-primary uppercase text-glow tracking-widest">
              {t("intro.title")}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-secondary to-primary mx-auto mt-4 rounded-full"></div>
          </div>
        </section>

        {/* Featured Hero Article */}
        <section className="py-8">
          <div className="max-w-[1450px] mx-auto px-6 relative min-h-[80vh] flex items-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-surface-container/20 backdrop-blur-[40px] rounded-[40%] rotate-12 z-0 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-hero-headline text-[120px] md:text-[240px] text-primary/5 select-none pointer-events-none z-0 uppercase tracking-widest">
              {t("featured.bgWord")}
            </div>
            <div className="relative w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
              <div className="lg:col-span-7 relative group">
                <div className="relative overflow-visible transition-transform duration-700 ease-out group-hover:scale-105">
                  <div className="rounded-[3rem] overflow-hidden border border-white/40 shadow-2xl">
                    <img
                      alt="Cinematic 3D medical visual of a human liver"
                      className="w-full h-full object-cover aspect-square lg:aspect-video"
                      src="https://lh3.googleusercontent.com/aida/AP1WRLvfpYDc6FcWRf7-8U3C022k5lqz6X4F33J3wNJWA3d3PJDmSIxDKF8YeLsDNDqENKK24a16X-efDIK0eC7DUEB4q--EjimQ5Kzy8S0-KdKwTBHGN3qI3lYTViUsgMsGfkhC1-qa8tZ259TOEJVmNtmEMrAHIGX1_Tsc99FrRKU1INWaoe-A4GqF3vTM1zfVH1YZ-8p2OZIfphx1Jsb2af_Kn9GdgCT-I_IoOpTWoxZfDC49dp8JH-YTS3k"
                    />
                  </div>
                  <div className="absolute -top-8 start-4 glass-panel px-6 py-2 rounded-full font-label-sm tracking-[0.2em] text-primary/40 z-20">
                    {t("featured.badge")}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-5 lg:-ms-24 relative z-20">
                <div className="space-y-6 transition-transform duration-500 hover:translate-x-2">
                  <span className="inline-block bg-primary-container/30 text-primary px-4 py-1 rounded-full font-label-sm uppercase tracking-wider border border-primary/20">
                    {t("featured.tag")}
                  </span>
                  <h3 className="font-hero-headline text-5xl md:text-7xl text-primary text-glow leading-[0.9] uppercase">
                    {t("featured.title")}
                  </h3>
                  <p className="font-body-lg text-on-surface-variant text-xl max-w-md">
                    {t("featured.desc")}
                  </p>
                  <a
                    className="inline-flex items-center gap-4 bg-gradient-to-r from-secondary to-primary text-on-primary px-10 py-5 rounded-full font-body-lg hover:opacity-90 transition-all btn-primary-glow group/btn"
                    href="#"
                  >
                    {t("featured.cta")}
                    <span className="material-symbols-outlined icon-rtl-flip transition-transform group-hover/btn:translate-x-2">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Article Grid */}
        <section className="py-16 mb-24">
          <div className="max-w-[1450px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {ARTICLE_IDS.map((id) => (
                <a key={id} className="group block h-full" href="#">
                  <div className="glass-panel rounded-xl overflow-hidden hover-lift h-full flex flex-col border-s-4 border-s-primary/50 hover:border-s-primary transition-all">
                    <div className="relative h-48 overflow-hidden p-2">
                      <div className="w-full h-full rounded-lg overflow-hidden relative">
                        <img
                          alt={t(`grid.items.${id}.title`)}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          src={ARTICLE_IMAGES[id]}
                        />
                        <div className="absolute inset-0 bg-secondary/10 group-hover:bg-transparent transition-colors"></div>
                      </div>
                    </div>
                    <div className="p-6 flex-grow flex flex-col">
                      <span className="font-label-sm text-secondary uppercase tracking-widest mb-2">
                        {t(`grid.items.${id}.tag`)}
                      </span>
                      <h4 className="font-card-title text-on-surface text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {t(`grid.items.${id}.title`)}
                      </h4>
                      <div className="mt-auto flex items-center text-sm text-outline group-hover:text-secondary transition-colors pt-4 border-t border-white/20">
                        {tCommon("readArticle")}{" "}
                        <span className="material-symbols-outlined icon-rtl-flip text-[16px] ms-1">
                          chevron_right
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="relative py-32 overflow-hidden flex items-center justify-center">
          <ShaderBackground />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center glass-panel rounded-3xl p-12 lg:p-16">
            <span className="font-label-sm text-secondary uppercase tracking-widest mb-4 block">
              {t("cta.label")}
            </span>
            <h2 className="font-hero-headline-mobile md:font-hero-headline text-primary text-glow uppercase leading-tight mb-8">
              {t("cta.titleLine1")}
              <br />
              {t("cta.titleLine2")}
            </h2>
            <a
              className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary to-primary text-on-primary px-10 py-4 rounded-full font-body-lg hover:opacity-90 transition-all hover:scale-105 btn-primary-glow"
              href="#"
            >
              {t("cta.cta")}
              <span className="material-symbols-outlined text-xl">
                calendar_month
              </span>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
