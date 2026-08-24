import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localeAlternates } from "@/i18n/alternates";

const SURGICAL_PROCEDURE_IDS = [
  "liverTransplantation",
  "whippleProcedure",
  "liverResection",
  "liverTumorSurgery",
  "pancreaticSurgery",
  "biliaryTractSurgery",
  "complexGallbladder",
  "advHepatobiliary",
] as const;

const SURGICAL_PROCEDURE_IMAGES: Record<
  (typeof SURGICAL_PROCEDURE_IDS)[number],
  string
> = {
  liverTransplantation:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCYkoDWxYm9pmiQfT4Juo4vTOIym3nTyXBevciF8C2cXkUOFSBQ4wR3KuTour8KK7wnyybXPCZCbeogxFvGiMkUlOP9cuQrG32HywJboYRi3RY688nk1hWts7rmoXsPcEU2erx1TMkAL1daSEntVaM42JRcv9uZV69xgJ7az2G1skwjOWKitfw2J3gGMMjxJfnAzvK1TPRpLipFANpEO9b4GSu0dSCi8E5peVihWA9fIi9HjPWJ78xT",
  whippleProcedure:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBshnm5nKH3j7bLu9YLwPpVc0VU2ttuF5HjTG-mk2_x8OoNuMzndvnGQEgW7Et3mX2cyvMHTt7beeyUc65r57Qu7HuogTZxi1X4h_gam6SH3uOZmiYJlL5ZM7a-18SQ6S-eAD0S_wxZ1Vh59VZNvNL42d3vO34CHqmni4pImrbnG_oP_fe_z-Dbk7_x4cN7p0LhL7o5zOyMXNUKf6nvvfFbPB94OTrJ_8iap72k9AKVNT3DudYWCT6-",
  liverResection:
    "https://lh3.googleusercontent.com/aida/AP1WRLu6-ZyWk8_X0sF-Rj3deaTmlASOnQI3V-tzd2e2xvOoRUEJXu44rKlazhOXd6-wskJOKQbkPbnbai0-E2bZVUV_ZPiYQfSGHkpDAeW--gmHr-aCJj6KuRnZniE0wv8RuYp5WRBoSGRg6GBNRfH0SmjATfzeDR286J1P4G3tvLR8I_kv3MstjGzSIbGb8RogRIE3G6LQdyPJooUW60QIO5eabUGw3MPSD7ukyjJJ_7Mp-QkWf-vk7l2pGXg",
  liverTumorSurgery:
    "https://lh3.googleusercontent.com/aida/AP1WRLs9iBCjL-D7QPB7sv-KBdd7tn7NDCjs7eJDknFA7xtWqG7AN2nLgmVZ_YR40IE7asadbHxnI6DFxH6ZTx9N3NtidwGDjKXk7u4ORp8V2wLh6jrgHfNhdUJaDABdXQCN3g8yBltSDNjg7-w_VTuniNlKZtZu7G7sy5rrek6UbiNoYTkvvjjtwuO8lDDd6hdKJi6ARKkaVNyiCtnhTunmh1PwdEhlTWbd2zIND7NAgcN47gnxvXhKual2Llk",
  pancreaticSurgery:
    "https://lh3.googleusercontent.com/aida/AP1WRLv1SWE3jrbaedGpAG_db3F9ZOFxwOjun064pR-a-1sxkV1PQZ-5FjYrKRn39S7NMCNrnvg14ljEJ6s_4XXyxqU5mhrL7A-jtknWKOWjAtnSLLBUi36PcnAwwe301nlLuTLBglG6G3sn2uQbuyMleMqxyvFevJ0C85RUNjvGzHgTHuEvAcc6VHyM69EmRXQtIDJsfPmfqHWZBTXJ5gzdHUeKepuS3_yDlvmSIpuEd2YKJLQmgsKRzeGuI1g",
  biliaryTractSurgery:
    "https://lh3.googleusercontent.com/aida/AP1WRLuyA6p_ZrR-RO5osIZIWrNAdBWEXXT0_tqDEKREXvc6FqgXDc4ZU8A9wZUmsbHMLPXk6VsAdgOIHmP0eZc7-DuhqwnoaesTRYD-cgOcSIJmzL0BAffmat_kI-CutiZF5ho-Y8d8khblzB0Ix9-XmcNK_ZD-8QlvWsLJk3B2CYvdnDxvSxZsJoNRrgU7W4ckq6s5328SkommCQ0iRa7V6LaVoW0Ue5tFjbEn0g7A4GiOW7RDkfW9Zwoi_MA",
  complexGallbladder:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDYwohRGdYUsFwXQesTOseD6EbqpUmnyy9VPsRp83CeqoK-5ekHA5TMeXbYavzXJ0R41MzIUfsUQ4r_fs-qtS78CAzQVpI08ifR_SvAGhS2rravKlGlwHZu_if9WFVHXgaZcXFLJnswmTOXI7ROaOEPq-rdemDeaMtcSmvsIKo60CpgqnT_PGv-ZTik0Dw4gTbhLVnb_sWlQlwPhgAeMzRuNsVAO8TITRaEuG6yBHeRgMeu5P4lL8IZ",
  advHepatobiliary:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCPlGxkvnE9qvFPYI94_eHWaG9yV8nm_03gSdEIGsNIcFW7CUOmka1MecHrrQ-8N6PMzSI11kFJ_xg51FBd3tKbi1XVAzfLeW7jcDESvoOGJ0YpUvWWcP1-bwFJKxDmzy6hNOfeLt0lFKSvXoRpKuMEF8gG3_kzZVxIzpFPrE-XAhiNJS4ozbrrnUQtgPeTMlOJFlcoFlAFWBuS-P6lEfWJeojKe3y_FDPaEI0Ego9cybOcUx1eiV__",
};

const SPECIALIZED_TREATMENT_IDS = [
  "liverTumors",
  "liverCancer",
  "pancreaticCancer",
  "bileDuctTumors",
  "pancreaticTumors",
  "gallbladderTumors",
  "complexLiverDiseases",
  "hepatobiliaryConditions",
] as const;

const SPECIALIZED_TREATMENT_IMAGES: Record<
  (typeof SPECIALIZED_TREATMENT_IDS)[number],
  string
> = {
  liverTumors:
    "https://lh3.googleusercontent.com/aida/AP1WRLvqaH9gsagiS3FWqCA15KaK6b9lp9KFz_2heZZRdn_xUQCn_xHLI5vXqbd8NQmam9dylQIS3B3EwPqpG7-8N-BhiOC6CpBsa93jHxXaaAzwkuFLgop-Urr4SXKXpFwvm0hH1KtJ0YR-vbVVzc_Txl25ZFNkUS_z9ax-e37oFu62Ih8qI1TNJ_NjdYpTovhkZtJiw9FQ4TPUUDZ_SBJTGXKrL2t2oIWC6AL5oUCOXK7Azo1tD3yIxIpa0Hg",
  liverCancer:
    "https://lh3.googleusercontent.com/aida/AP1WRLt_A-YmBGMy-djlFnpuD2OT6rWJptYbcHKNwd61rChdX9CWg-eRlYwNa_g0xVpoZyFxcSGDtkLT5oYQ7vlHovVP7eeqtYgqGPQSrtWr8kVahLYK_kJ9tKgZ_3XEcLxAgTAdJnpSYkXHQTzXesb37JDYnd_0wTK8SvezQMXsq9qGz_f6tDgbpDeLagjrQxvbkh5fSp41AkMK75UqZnLgL0ty_P_2Qm2fiJPHQLKciA5Z5v4-rkYdB33qmw",
  pancreaticCancer:
    "https://lh3.googleusercontent.com/aida/AP1WRLswCfC7ZHXACjZT4uM7K9ZSzzd98a7smCLib_sUWc5iDsLamotyJNIxDLobE-p781iTETzbUJwhaRqYaI3YJGN_yHCec4qLYJou6RP9toBymF0HE5rj7rjJg9pl42KiJ-PU8oCJc0kK7lNu3VKNNHmuek8im09z1wTO-nSCXanZIiHQHEcVm5zORtP61Tv-P6yQ6-Vn1-6DHQzuxAEFbixpHFWuztdN9cMBIygI3fcDaAd0xuXTktqqEfM",
  bileDuctTumors:
    "https://lh3.googleusercontent.com/aida/AP1WRLtx6aFjwj1uLC1aKxpWpLstALK4NauFVaLdd8ILgdoi6UWNktZ4yh-FELn_NN2BBiF0Kf5zczJmXqlyGkBJT5S74Wy9e2wW4B4VdH_GOIqC3kMyB0TBvKPRNVfOIChqANZ8avAzkPFHaFxPtZwG6PRzpsm5Ios1oUVgrPidbr0P2gPUmb12QuxuE1Tb9s0y9oS6zrFBdfmkXVteLUvRO-Sw4gGihXLLYojpf2-TiWBn1X11pFBeOZschg",
  pancreaticTumors:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAxRzIthFOQ1wxRAEiFwNiSAPE1y0EB-VBAAOibsHaNO5tdij_25Uf1c3J2y8b_tJzzVCOEbPo_qvMGjUPSSUljrPNwvn41_D4oZaJfJnVJoLiGoE00IZayok-0QUhjurJq_w0067kkklbchnKdpHw3WK8KNYLy2p3n1fjfrnfqyNL59C94VuWqrUUPnOgvVV-0XaF8LupiSHlPdVEW_XdGSgI6SmOghCCdwwt4l9h3jB9U-bA2ijSs",
  gallbladderTumors:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA1-OysxlYeqn-kSiHRC94Z7-0lmIJDVKS2XrSUH4f3LIyzEWppgg15XOSt5OKCnzBjhIlW9oK9dbmZPkID-rwspzarU6Cw5ws8EP4r1jSAH94smYpL5dqOHfJC_p5NY10_48gnfEWh-1wvRBj3tL_vckjD88rzburkJ87GqmedbHWbqa2sS9gE_vx4J07WurCA3UMSkg9MWAc7fF6cqfXGt7Ln7uAynoMpRRNxsN9p5Y0wgfzVxKJB",
  complexLiverDiseases:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBvDfcd11dyBbeuKiOhbatvlI3n8T5Zs4U1fyHN8HKMJ9C3T1xLu9jy4uEJvnIdf1wl_iR9fVScU-zAHXmCBYKWBt8wKWzgDb4B6hVvYNOt3tDRNuMGDY3ajvYLFkDDmbgoXvvvPoES_cneY2XH_H4iWgkVwxYoaoZEpfAh18Ebsez8vG6dKsCdmdRm9YG_pHlit3wLZMtru_UX2KQk63N6iSbln7P8AzU6s7ROQi77k44NTQMK5UQd",
  hepatobiliaryConditions:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAArBDnEy6HK0Y3nmttdP6zRTzIYgcl5OuQAJKE-O--YDFaDZSbBwFSibJfrK8CUwpAuG5XcxpevVFAkk1EEzrgAIRoyqRIRFjkljfzJjJUmgoC46jbsM2xpZhhay4C8iEi5mXhHjj5l1KWO8tT_7d6xf7DOJfdHEyTOCKWrSXv-uxx4DM2t41H_WX3_mTws04G_oLyHsMswchQdTiBl0ctJXU-bp1rgnyPCX7ZEpKEOTCFKJmostPt",
};

function ServiceCard({
  title,
  desc,
  img,
  exploreLabel,
}: {
  title: string;
  desc: string;
  img: string;
  exploreLabel: string;
}) {
  return (
    <div className="glass-card rounded-3xl p-4 flex flex-col h-[450px] group cursor-pointer hover:-translate-y-2 transition-transform duration-500">
      <div className="relative w-full flex-1 rounded-2xl overflow-hidden mb-4 bg-black/5">
        <img
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          src={img}
        />
      </div>
      <h3 className="font-card-title text-card-title text-primary mb-2">
        {title}
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant line-clamp-2 mb-4">
        {desc}
      </p>
      <div className="mt-auto flex justify-between items-center text-primary font-label-sm text-label-sm uppercase tracking-widest border-t border-white/20 pt-4">
        <span>{exploreLabel}</span>
        <span className="material-symbols-outlined">add</span>
      </div>
    </div>
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
    title: t("services.title"),
    description: t("services.description"),
    alternates: { languages: localeAlternates("/services") },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <div className="route-services font-body-md text-on-background antialiased relative min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-[150px] pb-section-gap min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-white/30 backdrop-blur-sm z-0"></div>
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center mix-blend-overlay opacity-30 z-[-1]"
          style={{
            backgroundImage:
              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBFYpJdfsOtVmShSnLB7zvs_KZz0NlTMMlxgnZO7HaQVouILpI1_ONbF5XRE9E1Q7gxoyLI32Oj5uZlkFnmKXbPujw70tZcnxgGU_Aa61AMJ9S3ldw-M6pAv5OMg6yFhSleBY3gRmmnqrMB1VAZBHsuAnCstHGKReyB52KxB3xLG5ZiRnCnsgPfx0aCnvaPJTzUvAkrcgNYT2UPc4DwwVXmJEeaCRXizNs6YvRw0eTMDtVtn6cqvbVk")',
          }}
        ></div>
        <div className="max-w-container-max mx-auto px-6 w-full z-10 relative">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-1 rounded-full border border-primary-container text-primary-container font-label-sm text-label-sm uppercase tracking-[0.2em] mb-6 backdrop-blur-md bg-white/10">
              {t("hero.badge")}
            </span>
            <h1 className="font-hero-headline text-hero-headline text-primary mb-8 text-glow leading-tight">
              {t("hero.titleLine1")}
              <br />
              {t("hero.titleLine2")}
              <br />
              {t("hero.titleLine3")}
            </h1>
            <div className="flex flex-wrap gap-4 mt-10">
              <button className="primary-btn text-on-primary px-8 py-4 rounded-full font-label-sm text-label-sm uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-transform">
                {t("hero.exploreProcedures")}{" "}
                <span className="material-symbols-outlined text-[16px]">
                  arrow_downward
                </span>
              </button>
              <button className="glass-card text-primary px-8 py-4 rounded-full font-label-sm text-label-sm uppercase tracking-wider hover:bg-white/50 transition-colors">
                {t("hero.bookAppointment")}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Surgical Procedures */}
      <section className="py-section-gap relative z-10 max-w-container-max mx-auto w-full px-6">
        <div className="mb-12 text-center">
          <h2 className="font-section-title text-section-title text-primary">
            {t("surgicalProcedures.title")}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto mt-4">
            {t("surgicalProcedures.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap">
          {SURGICAL_PROCEDURE_IDS.map((id) => (
            <ServiceCard
              key={id}
              title={t(`surgicalProcedures.items.${id}.title`)}
              desc={t(`surgicalProcedures.items.${id}.desc`)}
              img={SURGICAL_PROCEDURE_IMAGES[id]}
              exploreLabel={t("surgicalProcedures.explore")}
            />
          ))}
        </div>
      </section>

      {/* Specialized Treatments */}
      <section className="py-section-gap relative z-10 max-w-container-max mx-auto w-full px-6">
        <div className="mb-12 text-center">
          <h2 className="font-section-title text-section-title text-primary">
            {t("specializedTreatments.title")}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto mt-4">
            {t("specializedTreatments.subtitle")}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-card-gap">
          {SPECIALIZED_TREATMENT_IDS.map((id) => (
            <ServiceCard
              key={id}
              title={t(`specializedTreatments.items.${id}.title`)}
              desc={t(`specializedTreatments.items.${id}.desc`)}
              img={SPECIALIZED_TREATMENT_IMAGES[id]}
              exploreLabel={t("surgicalProcedures.explore")}
            />
          ))}
        </div>
      </section>

      {/* Final CTA - The Decision Point */}
      <section className="relative py-24 min-h-[600px] flex items-center justify-center overflow-hidden mt-12">
        <div className="relative z-10 max-w-container-max mx-auto px-6 w-full text-center">
          <h2 className="font-hero-headline text-[48px] text-primary mb-16 text-glow leading-tight max-w-4xl mx-auto">
            {t("cta.titleLine1")}
            <br />
            {t("cta.titleLine2")}
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 max-w-5xl mx-auto">
            <button className="glass-card flex-1 rounded-[40px] p-8 flex flex-col items-center justify-center gap-4 hover:scale-105 transition-all duration-300 group border-primary/30 hover:border-primary">
              <span className="font-section-title text-4xl text-primary opacity-50 group-hover:opacity-100 transition-opacity">
                01
              </span>
              <span className="font-card-title text-card-title text-primary text-center">
                {t("cta.option1")}
              </span>
              <span className="material-symbols-outlined icon-rtl-flip text-primary mt-4">
                arrow_forward
              </span>
            </button>
            <button className="glass-card flex-1 rounded-[40px] p-8 flex flex-col items-center justify-center gap-4 hover:scale-105 transition-all duration-300 group border-primary/30 hover:border-primary">
              <span className="font-section-title text-4xl text-primary opacity-50 group-hover:opacity-100 transition-opacity">
                02
              </span>
              <span className="font-card-title text-card-title text-primary text-center">
                {t("cta.option2")}
              </span>
              <span className="material-symbols-outlined icon-rtl-flip text-primary mt-4">
                arrow_forward
              </span>
            </button>
            <button className="primary-btn flex-1 rounded-[40px] p-8 flex flex-col items-center justify-center gap-4 hover:scale-105 transition-all duration-300 group">
              <span className="font-section-title text-4xl text-on-primary opacity-70 group-hover:opacity-100 transition-opacity">
                03
              </span>
              <span className="font-card-title text-card-title text-on-primary text-center">
                {t("cta.option3")}
              </span>
              <span className="material-symbols-outlined text-on-primary mt-4">
                calendar_month
              </span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
