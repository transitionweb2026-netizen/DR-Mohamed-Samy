import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/i18n/alternates";
import HeroContactBar from "@/components/HeroContactBar";
import CtaBanner from "@/components/CtaBanner";

const COUNTRY_CODES = [
  { code: "+20", flag: "🇪🇬" },
  { code: "+971", flag: "🇦🇪" },
  { code: "+966", flag: "🇸🇦" },
  { code: "+1", flag: "🇺🇸" },
  { code: "+44", flag: "🇬🇧" },
  { code: "+33", flag: "🇫🇷" },
  { code: "+49", flag: "🇩🇪" },
  { code: "+91", flag: "🇮🇳" },
  { code: "+234", flag: "🇳🇬" },
  { code: "+27", flag: "🇿🇦" },
  { code: "+61", flag: "🇦🇺" },
  { code: "+81", flag: "🇯🇵" },
  { code: "+86", flag: "🇨🇳" },
  { code: "+55", flag: "🇧🇷" },
];

const COUNTRY_IDS = [
  "EG",
  "AE",
  "SA",
  "US",
  "GB",
  "FR",
  "DE",
  "IN",
  "NG",
  "ZA",
  "AU",
  "JP",
  "CN",
  "BR",
  "CA",
] as const;

const COUNTRY_FLAGS: Record<(typeof COUNTRY_IDS)[number], string> = {
  EG: "🇪🇬",
  AE: "🇦🇪",
  SA: "🇸🇦",
  US: "🇺🇸",
  GB: "🇬🇧",
  FR: "🇫🇷",
  DE: "🇩🇪",
  IN: "🇮🇳",
  NG: "🇳🇬",
  ZA: "🇿🇦",
  AU: "🇦🇺",
  JP: "🇯🇵",
  CN: "🇨🇳",
  BR: "🇧🇷",
  CA: "🇨🇦",
};

const PROCEDURE_IDS = [
  "liverTransplantEvaluation",
  "hepatobiliarySurgery",
  "secondOpinion",
  "generalConsultation",
] as const;

const WHATSAPP_ICON_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

function WhatsAppIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d={WHATSAPP_ICON_PATH}></path>
    </svg>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    title: t("contact.title"),
    description: t("contact.description"),
    alternates: { languages: localeAlternates("/contact") },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div
      className="route-contact font-body-md text-on-surface antialiased min-h-screen flex flex-col relative overflow-x-hidden"
      style={{
        backgroundColor: "rgb(228, 255, 251)",
        backgroundImage:
          "radial-gradient(at 0% 0%, rgba(24, 213, 184, 0.1) 0px, transparent 50%)",
        backgroundAttachment: "fixed",
        color: "rgb(0, 32, 30)",
      }}
    >
      <main className="flex-grow pt-[100px]">
        {/* 1. Contact Hero */}
        <section className="relative w-full max-w-container-max mx-auto px-4 md:px-8 py-section-gap min-h-[60vh] flex items-center justify-center mt-8">
          <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden glass-panel mx-4 md:mx-8">
            <img
              alt="A modern, high-tech medical consultation room with bright, daybreak clinical lighting. Soft luminous teal accents. A sense of pristine, world-class healthcare."
              className="w-full h-full object-cover opacity-60 mix-blend-overlay"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XAtVkhZ5wAhuvhtor1wxnqiGWPbPCiwDyTVOrYQgqjX103ysP6BPYCg5Hh0cIBQBVs-Mgsf3n9Owr0ImAPkYPTmNhM2joOSI28Lu7fzJhpY_4nyCscT-HEHj2l0H6BLp5oyOrkIBHAwjIfI31JFLYc01mgndhml9zpDhRHpQEUcGiApLgIeKLKg0ZVZHRnhs3S7_EX2RMTPv3SyNbsUoMb0wN8EDDfnyPxXg88epqYjbDPEZd7tS4E8Fo"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/80 to-transparent"></div>
          </div>
          <div className="relative z-10 text-center max-w-3xl px-6">
            <span className="inline-block font-label-sm text-label-sm text-primary-container bg-inverse-surface/10 px-3 py-1 rounded-full mb-4 border border-primary-container/30 backdrop-blur-md uppercase tracking-widest">
              {t("hero.badge")}
            </span>
            <h1 className="font-hero-headline text-hero-headline-mobile md:text-hero-headline text-on-surface mb-6 uppercase">
              {t("hero.title")}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
              {t("hero.subtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="btn-primary text-on-primary px-8 py-4 rounded-full font-label-sm text-label-sm flex items-center gap-2 w-full sm:w-auto justify-center">
                <span className="material-symbols-outlined">send</span>
                {t("hero.sendInquiry")}
              </button>
              <button className="btn-secondary text-primary px-8 py-4 rounded-full font-label-sm text-label-sm flex items-center gap-2 w-full sm:w-auto justify-center bg-white/40">
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                {t("hero.whatsappUs")}
              </button>
            </div>
          </div>
          <HeroContactBar />
        </section>

        {/* 2. Contact & International Patient Hub */}
        <section className="w-full max-w-container-max mx-auto px-4 md:px-8 py-section-gap">
          <h2 className="font-section-title text-section-title text-center text-on-surface mb-12 uppercase tracking-wide">
            {t("connect.title")}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: Clinic Info & Map */}
            <div className="flex flex-col gap-6">
              <div className="glass-panel rounded-2xl p-2 relative overflow-hidden h-64 sm:h-80 group">
                <img
                  alt="A stylized, luminous 3D map interface centered on Cairo, Egypt. Glassy topographical elements with glowing teal markers indicating a premium medical facility location. Futuristic UI aesthetic."
                  className="w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8srw1Lb4N7R_MBT75J4ZHOQ2jvVLE4_Xdrpss4YJaefSTcFE0hwNnr-r9Wr8QVAxwXHTd_lT3PzOXCrKchczWzpWauU-0jt8uN3Y55y67nH-esPxU2o5_fBrsBuK7ejTM14O7WnmRMzoj1B5Fwj6_2QJYsJ5DsTne3NJNiP7rEZs_eeAkKNX6x6SYKSIjAaNF_5thJumH9UvUDR0EmZQKlPl8rTzfnp2sQRXB7jSETtd3qNuN0CTX"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="btn-primary text-on-primary px-6 py-2 rounded-full font-label-sm text-label-sm shadow-xl flex items-center gap-2">
                    <span className="material-symbols-outlined">map</span>
                    {t("connect.viewLocation")}
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="glass-panel p-6 rounded-2xl flex items-start gap-4 hover:bg-white/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined hologram-glow">
                      location_on
                    </span>
                  </div>
                  <div>
                    <h4 className="font-card-title text-card-title text-on-surface mb-1">
                      {t("connect.address.label")}
                    </h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {t("connect.address.value")}
                    </p>
                  </div>
                </div>
                <div className="glass-panel p-6 rounded-2xl flex items-start gap-4 hover:bg-white/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined hologram-glow">
                      schedule
                    </span>
                  </div>
                  <div>
                    <h4 className="font-card-title text-card-title text-on-surface mb-1">
                      {t("connect.workingHours.label")}
                    </h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {t("connect.workingHours.value")}
                      <br />
                      {t("connect.workingHours.value2")}
                    </p>
                  </div>
                </div>
                <div className="glass-panel p-6 rounded-2xl flex items-start gap-4 hover:bg-white/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined hologram-glow">
                      call
                    </span>
                  </div>
                  <div>
                    <h4 className="font-card-title text-card-title text-on-surface mb-1">
                      {t("connect.phone.label")}
                    </h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {t("connect.phone.value")}
                    </p>
                  </div>
                </div>
                <div className="glass-panel p-6 rounded-2xl flex items-start gap-4 hover:bg-white/30 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined hologram-glow">
                      mail
                    </span>
                  </div>
                  <div>
                    <h4 className="font-card-title text-card-title text-on-surface mb-1">
                      {t("connect.email.label")}
                    </h4>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {t("connect.email.value")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="glass-panel p-5 rounded-2xl border-s-4 border-s-primary-container bg-gradient-to-r from-surface-variant/50 to-transparent flex items-start gap-3">
                <span className="material-symbols-outlined text-primary-container mt-1">
                  flight
                </span>
                <div>
                  <h4 className="font-label-sm text-label-sm uppercase tracking-wide text-primary font-bold mb-1">
                    {t("connect.internationalNote.title")}
                  </h4>
                  <p className="font-body-md text-[13px] text-on-surface-variant leading-tight">
                    {t("connect.internationalNote.body")}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Inquiry Form */}
            <div className="glass-panel-deep p-8 md:p-10 rounded-3xl relative overflow-hidden">
              <div className="absolute -top-20 -end-20 w-64 h-64 bg-primary-container rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
              <h3 className="font-card-title text-[24px] text-white mb-8 border-b border-white/10 pb-4">
                {t("form.title")}
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-label-sm text-label-sm text-inverse-on-surface mb-2">
                      {t("form.fullName")}
                    </label>
                    <input
                      className="w-full input-glass rounded-xl px-4 py-3 font-body-md text-body-md"
                      placeholder={t("form.fullNamePlaceholder")}
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-inverse-on-surface mb-2">
                      {t("form.phone")}
                    </label>
                    <div className="flex gap-2">
                      <select className="input-glass rounded-xl px-2 py-3 font-body-md text-body-md w-32 appearance-none text-center cursor-pointer bg-surface-container-high text-on-surface-variant border-primary/30">
                        <option value="">{t("form.code")}</option>
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <input
                        className="w-full input-glass rounded-xl px-4 py-3 font-body-md text-body-md flex-grow"
                        placeholder={t("form.phonePlaceholder")}
                        type="tel"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-label-sm text-label-sm text-inverse-on-surface mb-2">
                      {t("form.countryOfResidence")}
                    </label>
                    <select className="w-full input-glass rounded-xl px-4 py-3 font-body-md text-body-md appearance-none cursor-pointer bg-surface-container-high text-on-surface-variant border-primary/30">
                      <option value="">{t("form.selectCountry")}</option>
                      {COUNTRY_IDS.map((id) => (
                        <option key={id} value={id}>
                          {COUNTRY_FLAGS[id]} {t(`form.countries.${id}`)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-inverse-on-surface mb-2">
                      {t("form.stateProvince")}
                    </label>
                    <select className="w-full input-glass rounded-xl px-4 py-3 font-body-md text-body-md appearance-none cursor-pointer bg-surface-container-high text-on-surface-variant border-primary/30">
                      <option value="">{t("form.selectStateProvince")}</option>
                      <option value="manual">{t("form.enterManually")}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-inverse-on-surface mb-2">
                    {t("form.procedureInterest")}
                  </label>
                  <select className="w-full input-glass rounded-xl px-4 py-3 font-body-md text-body-md appearance-none cursor-pointer bg-surface-container-high text-on-surface-variant border-primary/30">
                    <option>{t("form.selectProcedure")}</option>
                    {PROCEDURE_IDS.map((id) => (
                      <option key={id}>{t(`form.procedures.${id}`)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-inverse-on-surface mb-2">
                    {t("form.medicalNotes")}
                  </label>
                  <textarea
                    className="w-full input-glass rounded-xl px-4 py-3 font-body-md text-body-md h-32 resize-none"
                    placeholder={t("form.medicalNotesPlaceholder")}
                  ></textarea>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-inverse-on-surface mb-2">
                    {t("form.uploadVault")}
                  </label>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-primary-container/50 hover:bg-white/5 transition-all cursor-pointer group">
                    <span className="material-symbols-outlined text-4xl text-white/50 group-hover:text-primary-container mb-2 transition-colors">
                      cloud_upload
                    </span>
                    <p className="font-body-md text-body-md text-white/70">
                      {t("form.uploadDragDrop")}{" "}
                      <span className="text-primary-container underline">
                        {t("form.uploadBrowse")}
                      </span>
                    </p>
                    <p className="font-label-sm text-[11px] text-white/40 mt-1 uppercase tracking-wider">
                      {t("form.uploadSupports")}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 flex items-center gap-2 text-[12px] font-label-sm text-white">
                      <span className="material-symbols-outlined text-[14px] text-primary-container">
                        description
                      </span>{" "}
                      {t("form.sampleFileName")}
                      <span className="material-symbols-outlined text-[14px] cursor-pointer hover:text-error transition-colors">
                        close
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-white/10">
                  <button
                    className="btn-primary text-on-primary px-6 py-3 rounded-xl font-label-sm text-label-sm flex-grow flex items-center justify-center gap-2"
                    type="button"
                  >
                    <span className="material-symbols-outlined">mail</span>
                    {t("form.sendViaEmail")}
                  </button>
                  <button
                    className="btn-secondary text-primary-container px-6 py-3 rounded-xl font-label-sm text-label-sm flex-grow sm:flex-grow-0 flex items-center justify-center gap-2"
                    type="button"
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    {t("form.whatsapp")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* 3. Final Contact CTA */}
        <CtaBanner
          eyebrow={t("cta.label")}
          primaryHref="tel:+201234567890"
          primaryLabel={t("cta.callTheClinic")}
          showPhone={false}
          title={t("cta.title")}
          whatsappLabel={t("cta.whatsappUs")}
        />
      </main>
    </div>
  );
}
