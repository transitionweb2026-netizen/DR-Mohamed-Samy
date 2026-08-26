import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/i18n/alternates";
import HeroContactBar, { type HeroContactBarContent } from "@/components/HeroContactBar";
import CtaBanner from "@/components/CtaBanner";
import { getGlobalContent, getPageContent, getPageSeo } from "@/lib/cms/queries";
import type { Locale } from "@/lib/cms/types";

type ButtonContent = { label: string; href: string };
type ImageContent = { url: string; mediaId: string | null; alt: string };
type CardItem = { id: string; icon: string; label: string; value: string; value2: string };
type CountryCodeItem = { id: string; flag: string; code: string };
type CountryItem = { id: string; flag: string; name: string };
type ProcedureItem = { id: string; label: string };

const WHATSAPP_ICON_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z";

function WhatsAppIcon({ className }: { className: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d={WHATSAPP_ICON_PATH}></path>
    </svg>
  );
}

type ContactContent = {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    backgroundImage: ImageContent;
    sendInquiry: ButtonContent;
    whatsappUs: ButtonContent;
  };
  connect: {
    title: string;
    mapImage: ImageContent;
    viewLocation: ButtonContent;
    cards: CardItem[];
    internationalNoteTitle: string;
    internationalNoteBody: string;
  };
  form: {
    title: string;
    fullName: string;
    fullNamePlaceholder: string;
    phone: string;
    phonePlaceholder: string;
    code: string;
    countryCodes: CountryCodeItem[];
    countryOfResidence: string;
    selectCountry: string;
    countries: CountryItem[];
    stateProvince: string;
    selectStateProvince: string;
    enterManually: string;
    procedureInterest: string;
    selectProcedure: string;
    procedures: ProcedureItem[];
    medicalNotes: string;
    medicalNotesPlaceholder: string;
    uploadVault: string;
    uploadDragDrop: string;
    uploadBrowse: string;
    uploadSupports: string;
    sampleFileName: string;
    sendViaEmail: string;
    whatsapp: ButtonContent;
  };
  cta: { label: string; title: string; callTheClinic: ButtonContent; whatsappUs: ButtonContent };
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = (await params) as { locale: Locale };
  const seo = await getPageSeo("contact", locale);
  return {
    title: seo?.seo_title,
    description: seo?.meta_description ?? undefined,
    alternates: { languages: localeAlternates("/contact"), canonical: seo?.canonical_url ?? undefined },
    robots:
      seo && (!seo.robots_index || !seo.robots_follow)
        ? { index: seo.robots_index, follow: seo.robots_follow }
        : undefined,
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: Locale };
  setRequestLocale(locale);

  const [content, global] = await Promise.all([
    getPageContent("contact", locale) as unknown as Promise<ContactContent>,
    getGlobalContent(locale),
  ]);
  const heroContactBarContent = global.contact as unknown as HeroContactBarContent;
  const { hero, connect, form, cta } = content;

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
              alt={hero.backgroundImage.alt}
              className="w-full h-full object-cover opacity-60 mix-blend-overlay"
              src={hero.backgroundImage.url}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dim/80 to-transparent"></div>
          </div>
          <div className="relative z-10 text-center max-w-3xl px-6">
            <span className="inline-block font-label-sm text-label-sm text-primary-container bg-inverse-surface/10 px-3 py-1 rounded-full mb-4 border border-primary-container/30 backdrop-blur-md uppercase tracking-widest">
              {hero.badge}
            </span>
            <h1 className="font-hero-headline text-hero-headline-mobile md:text-hero-headline text-on-surface mb-6 uppercase">
              {hero.title}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
              {hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                className="btn-primary text-on-primary px-8 py-4 rounded-full font-label-sm text-label-sm flex items-center gap-2 w-full sm:w-auto justify-center"
                href={hero.sendInquiry.href}
              >
                <span className="material-symbols-outlined">send</span>
                {hero.sendInquiry.label}
              </a>
              <a
                className="btn-secondary text-primary px-8 py-4 rounded-full font-label-sm text-label-sm flex items-center gap-2 w-full sm:w-auto justify-center bg-white/40"
                href={hero.whatsappUs.href}
              >
                <WhatsAppIcon className="w-5 h-5 fill-current" />
                {hero.whatsappUs.label}
              </a>
            </div>
          </div>
          <HeroContactBar content={heroContactBarContent} />
        </section>

        {/* 2. Contact & International Patient Hub */}
        <section className="w-full max-w-container-max mx-auto px-4 md:px-8 py-section-gap" id="form">
          <h2 className="font-section-title text-section-title text-center text-on-surface mb-12 uppercase tracking-wide">
            {connect.title}
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Left: Clinic Info & Map */}
            <div className="flex flex-col gap-6">
              <div className="glass-panel rounded-2xl p-2 relative overflow-hidden h-64 sm:h-80 group">
                <img
                  alt={connect.mapImage.alt}
                  className="w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                  src={connect.mapImage.url}
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    className="btn-primary text-on-primary px-6 py-2 rounded-full font-label-sm text-label-sm shadow-xl flex items-center gap-2"
                    href={connect.viewLocation.href}
                  >
                    <span className="material-symbols-outlined">map</span>
                    {connect.viewLocation.label}
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {connect.cards.map((card) => (
                  <div
                    key={card.id}
                    className="glass-panel p-6 rounded-2xl flex items-start gap-4 hover:bg-white/30 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined hologram-glow">{card.icon}</span>
                    </div>
                    <div>
                      <h4 className="font-card-title text-card-title text-on-surface mb-1">
                        {card.label}
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        {card.value}
                        {card.value2 && (
                          <>
                            <br />
                            {card.value2}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="glass-panel p-5 rounded-2xl border-s-4 border-s-primary-container bg-gradient-to-r from-surface-variant/50 to-transparent flex items-start gap-3">
                <span className="material-symbols-outlined text-primary-container mt-1">
                  flight
                </span>
                <div>
                  <h4 className="font-label-sm text-label-sm uppercase tracking-wide text-primary font-bold mb-1">
                    {connect.internationalNoteTitle}
                  </h4>
                  <p className="font-body-md text-[13px] text-on-surface-variant leading-tight">
                    {connect.internationalNoteBody}
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Inquiry Form */}
            <div className="glass-panel-deep p-8 md:p-10 rounded-3xl relative overflow-hidden">
              <div className="absolute -top-20 -end-20 w-64 h-64 bg-primary-container rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
              <h3 className="font-card-title text-[24px] text-white mb-8 border-b border-white/10 pb-4">
                {form.title}
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-label-sm text-label-sm text-inverse-on-surface mb-2">
                      {form.fullName}
                    </label>
                    <input
                      className="w-full input-glass rounded-xl px-4 py-3 font-body-md text-body-md"
                      placeholder={form.fullNamePlaceholder}
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-inverse-on-surface mb-2">
                      {form.phone}
                    </label>
                    <div className="flex gap-2">
                      <select className="input-glass rounded-xl px-2 py-3 font-body-md text-body-md w-32 appearance-none text-center cursor-pointer bg-surface-container-high text-on-surface-variant border-primary/30">
                        <option value="">{form.code}</option>
                        {form.countryCodes.map((c) => (
                          <option key={c.id} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <input
                        className="w-full input-glass rounded-xl px-4 py-3 font-body-md text-body-md flex-grow"
                        placeholder={form.phonePlaceholder}
                        type="tel"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-label-sm text-label-sm text-inverse-on-surface mb-2">
                      {form.countryOfResidence}
                    </label>
                    <select className="w-full input-glass rounded-xl px-4 py-3 font-body-md text-body-md appearance-none cursor-pointer bg-surface-container-high text-on-surface-variant border-primary/30">
                      <option value="">{form.selectCountry}</option>
                      {form.countries.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.flag} {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block font-label-sm text-label-sm text-inverse-on-surface mb-2">
                      {form.stateProvince}
                    </label>
                    <select className="w-full input-glass rounded-xl px-4 py-3 font-body-md text-body-md appearance-none cursor-pointer bg-surface-container-high text-on-surface-variant border-primary/30">
                      <option value="">{form.selectStateProvince}</option>
                      <option value="manual">{form.enterManually}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-inverse-on-surface mb-2">
                    {form.procedureInterest}
                  </label>
                  <select className="w-full input-glass rounded-xl px-4 py-3 font-body-md text-body-md appearance-none cursor-pointer bg-surface-container-high text-on-surface-variant border-primary/30">
                    <option>{form.selectProcedure}</option>
                    {form.procedures.map((p) => (
                      <option key={p.id}>{p.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-inverse-on-surface mb-2">
                    {form.medicalNotes}
                  </label>
                  <textarea
                    className="w-full input-glass rounded-xl px-4 py-3 font-body-md text-body-md h-32 resize-none"
                    placeholder={form.medicalNotesPlaceholder}
                  ></textarea>
                </div>
                <div>
                  <label className="block font-label-sm text-label-sm text-inverse-on-surface mb-2">
                    {form.uploadVault}
                  </label>
                  <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-primary-container/50 hover:bg-white/5 transition-all cursor-pointer group">
                    <span className="material-symbols-outlined text-4xl text-white/50 group-hover:text-primary-container mb-2 transition-colors">
                      cloud_upload
                    </span>
                    <p className="font-body-md text-body-md text-white/70">
                      {form.uploadDragDrop}{" "}
                      <span className="text-primary-container underline">
                        {form.uploadBrowse}
                      </span>
                    </p>
                    <p className="font-label-sm text-[11px] text-white/40 mt-1 uppercase tracking-wider">
                      {form.uploadSupports}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-3 flex-wrap">
                    <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-3 py-1 flex items-center gap-2 text-[12px] font-label-sm text-white">
                      <span className="material-symbols-outlined text-[14px] text-primary-container">
                        description
                      </span>{" "}
                      {form.sampleFileName}
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
                    {form.sendViaEmail}
                  </button>
                  <a
                    className="btn-secondary text-primary-container px-6 py-3 rounded-xl font-label-sm text-label-sm flex-grow sm:flex-grow-0 flex items-center justify-center gap-2"
                    href={form.whatsapp.href}
                  >
                    <WhatsAppIcon className="w-4 h-4 fill-current" />
                    {form.whatsapp.label}
                  </a>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* 3. Final Contact CTA */}
        <CtaBanner
          eyebrow={cta.label}
          primaryHref={cta.callTheClinic.href}
          primaryLabel={cta.callTheClinic.label}
          showPhone={false}
          title={cta.title}
          whatsappHref={cta.whatsappUs.href}
          whatsappLabel={cta.whatsappUs.label}
        />
      </main>
    </div>
  );
}
