import { button, image, section, text, type SectionDef } from "../seed-helpers";

const IMG: Record<string, string> = {
  liverRegeneration:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA5IxPLlsWPN5HblFV09bDRv1AegDzCzDhM83M_pC4uO2YPxhay9B-h_X1Rj2xSc9SXjh_7fdWjKJ6MKbxE4RWMk6PG6bx5B_v4nbGJg2zLK14mpGFyuOdVmpT8qZYxhmYo0hRgjKWqJGJA272O2NJq28VTjj8PET12P2Lv2ZK64-b2oebyH3Uwb2wC32YBJv5eYiowrAzezoppDDaFgrW5vNLurDlJr1XjygJVB2rAPxVbRORqifzG",
  precisionRoboticSurgery:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD0ixiL_MU4DYrhYOn0ncpY8TBgOTrRGRIztsiJNlgwbDBYsEgBPFEP0jyGgttJRmTgyFbXRz2uoUNzk3wXWrh2-Wx1MwbOXJR1u5TLiHJg_fHhmgtQM358XOiE9lpPLPWeeIKz7Wwe21yEBpfKFCCMYbs627slDHNz0y_ypk2tAUtEzaIigytIXYYJveMUyGMPBuHwVH52PfnkTvxhP8F8xSdje9eQVF3-4PA0vlIOxduwXwg2cKbW",
  patientJourney:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuADdzZ1hlaq7l8YOZFpaVOwW3dXECW9MJReN0AuRjyPjxObOtjgECWY4R2sF7g7Mkf3YTPvIHwjBiU9BwtJG43gKQ_KT0Z5F-Dd2lpyqOZJw6fROoJ9_4cDRuTwdOUoLPz1YlW_7kugUgx2pWFk4jP2l6IBveyPJ9PhNUopd0CfHva-8dTHxV6e27Znb1G6IaLIu0FpDypgzrNLLOWttg19TYeXHI7Zm3CZAxvlCd3jgfiH2D87rghC",
  advancedDiagnostics:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA-q4_8Q-YYt6Vy5HIDcQ-8NVst1Qhe37NdLtRS9z0oVuIswNNmCnUuZYnWyDvz7vJLyuofe10XjuVcGuAqN3wab-ObF1IU3lQ3e4tOQ-buxOcIgErnd3vUANq-jKRaACzcww-s0GUAh8P1Jllf_OMeJPogBnnoLAD28904hWF-vZHmWDJbposYnqT6XlrenFEXqdpn1N087u_-nxOqntO0SoGrGDi1ecoJdRiaIbPDrmYEP_GE-lqM",
  meetTheTeam:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCZH3xJrpI7ub20YLBqZY2MLfjVGxgF8EsgIXBzC2fhUbjA0Jfem5PSvTFR1BzbRke4tDYm9nEpUV0VXNFgcE7P2f8xSuW-FkPTle8EyqXVT16XducIOlkrW4UfMW3L__2katZ6x0Eg2P7fgrh_W4yNH_B_l41sXx8z2bSh95FL56fxJf7LPGdEAl4twwsahM10uZ5IH7X1vqxSojcFfx7L42xKoThDnSvuMCgNzDyGY09bJZLijgCm",
  postOperativeNutrition:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCzPAquPX556dQo__s6tBs-FVdzKAD2VRdeuqQswoJzm6pt5I1kjp9qtIM4VmuYGu5eV09WosENUPoQv5MGg0zQjDX3WaCCgrgc1-0HdxX2TinsRKUqQS4RDH1xLoZUY55IV9u6Y8r3XQ1B5B2r7fmqsqfGW5BP_agNXSU2fku9ycFB1TIrGPVd5hfxS1MJ339gARI7pc_CesMtLLCICFabJUCpsOWGWb4vrAxYrSa74uzGd46xw4VW",
  immunosuppressionBasics:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCecuiUCEZh0Z8mu4IC3kw65U5N1TImdmO7QYFC4Hph_DpF3jEAWZtEWdP7OpfRZ3grTRdGhkkq5Il2RMqUdzuCiWH00Ojv3lQoCg7Ex0wNaMNqVBJzPCSpVaSIWSGbaGaNbOjRWQyCFi3VbU9nepxh8kXhQaJcG33SDBtskI-PpEzFOWRbb-GIx7N4t7xqwlhcKOPGx5AjFPkZYoeyNzbIJ2fcu5xQYauOKy_j25klQrr4JOjkvQEr",
  lifeAfterTransplant:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBPuDtDhH8DB4K-Cyrkr5uajIK5ZatvxSvPF7Djx_xrMgSRqKze-qvfdXzUuwkySWxUYI6pJXZSjklKfcNeVDgkCOZIIKxjwkZMtUJwWS-GQtlBF-X0By7uU8b3nsX5RSfckCt3rzSO8poKMXuwNsEdd1yHgPEO2lxWANgzxQ1UQVzfWIFgeBo-32ZRJn7Ybk347Di7WGifULMzhTLa9a39E4whxEmX9KRO-Ca8Flz2TOEodzzsZB08",
  internationalPatientCare:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAf0qL6469HiwRWmYmXa-typwrCy8cPWyHezwJI3HVOeur6HbXfaUN_8Q0c69HL9UwxEvjDkI0z7q-Znp3i57UKb5xJwbfPl7SYterAXFQh1EQIPiwExrysTN9dMcIpIutjdyl9EvwmpL2S0aRJzFVKwPpTi1sTv-BJxuXUJKGiNUuPMOVsU-pgcIUdV0s_5xe3bY68s5cpRKW7vs-KC8s84IPkdxHSbEDpX7B0XBKJGB5Iz2hcLxcS",
};

export const videosSections: SectionDef[] = [
  section(
    "hero",
    "Hero",
    { badge: "text", titleLine1: "text", titleLine2: "text", subtitle: "text", watchLatest: "button", bookAppointment: "button" },
    {
      badge: text("videos.hero.badge"),
      titleLine1: text("videos.hero.titleLine1"),
      titleLine2: text("videos.hero.titleLine2"),
      subtitle: text("videos.hero.subtitle"),
      watchLatest: button(text("videos.hero.watchLatest"), "#videos-grid"),
      bookAppointment: button(text("videos.hero.bookAppointment"), "/contact"),
    },
  ),
  section(
    "grid",
    "Videos Grid",
    {
      eyebrow: "text",
      title: "text",
      items: { type: "array", itemSchema: { image: "image", video: "video", title: "text", desc: "text" } },
    },
    {
      eyebrow: text("videos.grid.eyebrow"),
      title: text("videos.grid.title"),
      items: Object.keys(IMG).map((id) => ({
        id,
        image: image(IMG[id]!, text(`videos.grid.items.${id}.title`)),
        video: { url: "", mediaId: null },
        title: text(`videos.grid.items.${id}.title`),
        desc: text(`videos.grid.items.${id}.desc`),
      })),
    },
  ),
  section(
    "cta",
    "Final CTA",
    { badge: "text", title: "text", bookAppointment: "button", whatsappUs: "button" },
    {
      badge: text("videos.cta.badge"),
      title: text("videos.cta.title"),
      bookAppointment: button(text("videos.cta.bookAppointment"), "/contact"),
      whatsappUs: button(text("videos.cta.whatsappUs"), "https://wa.me/201234567890"),
    },
  ),
  section("modal", "Video Modal", { loading: "text" }, { loading: text("videos.modal.loading") }),
];
