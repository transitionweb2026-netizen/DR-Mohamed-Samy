import { button, image, section, text, type SectionDef } from "../seed-helpers";

const COUNTRY_CODES: { id: string; flag: string; code: string }[] = [
  { id: "eg", flag: "🇪🇬", code: "+20" },
  { id: "ae", flag: "🇦🇪", code: "+971" },
  { id: "sa", flag: "🇸🇦", code: "+966" },
  { id: "us", flag: "🇺🇸", code: "+1" },
  { id: "gb", flag: "🇬🇧", code: "+44" },
  { id: "fr", flag: "🇫🇷", code: "+33" },
  { id: "de", flag: "🇩🇪", code: "+49" },
  { id: "in", flag: "🇮🇳", code: "+91" },
  { id: "ng", flag: "🇳🇬", code: "+234" },
  { id: "za", flag: "🇿🇦", code: "+27" },
  { id: "au", flag: "🇦🇺", code: "+61" },
  { id: "jp", flag: "🇯🇵", code: "+81" },
  { id: "cn", flag: "🇨🇳", code: "+86" },
  { id: "br", flag: "🇧🇷", code: "+55" },
];

const COUNTRY_FLAGS: Record<string, string> = {
  EG: "🇪🇬", AE: "🇦🇪", SA: "🇸🇦", US: "🇺🇸", GB: "🇬🇧", FR: "🇫🇷", DE: "🇩🇪",
  IN: "🇮🇳", NG: "🇳🇬", ZA: "🇿🇦", AU: "🇦🇺", JP: "🇯🇵", CN: "🇨🇳", BR: "🇧🇷", CA: "🇨🇦",
};

const PROCEDURE_IDS = [
  "liverTransplantEvaluation",
  "hepatobiliarySurgery",
  "secondOpinion",
  "generalConsultation",
] as const;

const mapImageAlt = {
  en: "A stylized, luminous 3D map interface centered on Cairo, Egypt, indicating the clinic's location.",
  ar: "واجهة خريطة ثلاثية الأبعاد مضيئة وأنيقة تتمحور حول القاهرة، مصر، تشير إلى موقع العيادة.",
  fr: "Une interface de carte 3D stylisée et lumineuse centrée sur Le Caire, en Égypte, indiquant l'emplacement de la clinique.",
};
const heroBgAlt = {
  en: "A modern, high-tech medical consultation room with bright, daybreak clinical lighting and soft luminous teal accents.",
  ar: "غرفة استشارات طبية حديثة وعالية التقنية بإضاءة سريرية مشرقة وأصداء تركوازية ناعمة ومضيئة.",
  fr: "Une salle de consultation médicale moderne et high-tech avec un éclairage clinique lumineux et de douces touches turquoise lumineuses.",
};

export const contactSections: SectionDef[] = [
  section(
    "hero",
    "Hero",
    { badge: "text", title: "text", subtitle: "text", backgroundImage: "image", sendInquiry: "button", whatsappUs: "button" },
    {
      badge: text("contact.hero.badge"),
      title: text("contact.hero.title"),
      subtitle: text("contact.hero.subtitle"),
      backgroundImage: image(
        "https://lh3.googleusercontent.com/aida/AEtjO1XAtVkhZ5wAhuvhtor1wxnqiGWPbPCiwDyTVOrYQgqjX103ysP6BPYCg5Hh0cIBQBVs-Mgsf3n9Owr0ImAPkYPTmNhM2joOSI28Lu7fzJhpY_4nyCscT-HEHj2l0H6BLp5oyOrkIBHAwjIfI31JFLYc01mgndhml9zpDhRHpQEUcGiApLgIeKLKg0ZVZHRnhs3S7_EX2RMTPv3SyNbsUoMb0wN8EDDfnyPxXg88epqYjbDPEZd7tS4E8Fo",
        heroBgAlt,
      ),
      sendInquiry: button(text("contact.hero.sendInquiry"), "#form"),
      whatsappUs: button(text("contact.hero.whatsappUs"), "https://wa.me/201234567890"),
    },
  ),
  section(
    "connect",
    "Connect With Our Team",
    {
      title: "text",
      mapImage: "image",
      viewLocation: "button",
      cards: {
        type: "array",
        itemSchema: { icon: "icon", label: "text", value: "textarea", value2: "text" },
      },
      internationalNoteTitle: "text",
      internationalNoteBody: "textarea",
    },
    {
      title: text("contact.connect.title"),
      mapImage: image(
        "https://lh3.googleusercontent.com/aida-public/AB6AXuB8srw1Lb4N7R_MBT75J4ZHOQ2jvVLE4_Xdrpss4YJaefSTcFE0hwNnr-r9Wr8QVAxwXHTd_lT3PzOXCrKchczWzpWauU-0jt8uN3Y55y67nH-esPxU2o5_fBrsBuK7ejTM14O7WnmRMzoj1B5Fwj6_2QJYsJ5DsTne3NJNiP7rEZs_eeAkKNX6x6SYKSIjAaNF_5thJumH9UvUDR0EmZQKlPl8rTzfnp2sQRXB7jSETtd3qNuN0CTX",
        mapImageAlt,
      ),
      viewLocation: button(text("contact.connect.viewLocation"), "#"),
      cards: [
        { id: "address", icon: "location_on", label: text("contact.connect.address.label"), value: text("contact.connect.address.value"), value2: { en: "", ar: "", fr: "" } },
        { id: "workingHours", icon: "schedule", label: text("contact.connect.workingHours.label"), value: text("contact.connect.workingHours.value"), value2: text("contact.connect.workingHours.value2") },
        { id: "phone", icon: "call", label: text("contact.connect.phone.label"), value: text("contact.connect.phone.value"), value2: { en: "", ar: "", fr: "" } },
        { id: "email", icon: "mail", label: text("contact.connect.email.label"), value: text("contact.connect.email.value"), value2: { en: "", ar: "", fr: "" } },
      ],
      internationalNoteTitle: text("contact.connect.internationalNote.title"),
      internationalNoteBody: text("contact.connect.internationalNote.body"),
    },
  ),
  section(
    "form",
    "Inquiry Form",
    {
      title: "text",
      fullName: "text",
      fullNamePlaceholder: "text",
      phone: "text",
      phonePlaceholder: "text",
      code: "text",
      countryCodes: { type: "array", itemSchema: { flag: "text", code: "text" } },
      countryOfResidence: "text",
      selectCountry: "text",
      countries: { type: "array", itemSchema: { flag: "text", name: "text" } },
      stateProvince: "text",
      selectStateProvince: "text",
      enterManually: "text",
      procedureInterest: "text",
      selectProcedure: "text",
      procedures: { type: "array", itemSchema: { label: "text" } },
      medicalNotes: "text",
      medicalNotesPlaceholder: "text",
      uploadVault: "text",
      uploadDragDrop: "text",
      uploadBrowse: "text",
      uploadSupports: "text",
      sampleFileName: "text",
      sendViaEmail: "text",
      whatsapp: "button",
    },
    {
      title: text("contact.form.title"),
      fullName: text("contact.form.fullName"),
      fullNamePlaceholder: text("contact.form.fullNamePlaceholder"),
      phone: text("contact.form.phone"),
      phonePlaceholder: text("contact.form.phonePlaceholder"),
      code: text("contact.form.code"),
      countryCodes: COUNTRY_CODES.map((c) => ({ id: c.id, flag: c.flag, code: c.code })),
      countryOfResidence: text("contact.form.countryOfResidence"),
      selectCountry: text("contact.form.selectCountry"),
      countries: Object.keys(COUNTRY_FLAGS).map((id) => ({
        id,
        flag: COUNTRY_FLAGS[id],
        name: text(`contact.form.countries.${id}`),
      })),
      stateProvince: text("contact.form.stateProvince"),
      selectStateProvince: text("contact.form.selectStateProvince"),
      enterManually: text("contact.form.enterManually"),
      procedureInterest: text("contact.form.procedureInterest"),
      selectProcedure: text("contact.form.selectProcedure"),
      procedures: PROCEDURE_IDS.map((id) => ({ id, label: text(`contact.form.procedures.${id}`) })),
      medicalNotes: text("contact.form.medicalNotes"),
      medicalNotesPlaceholder: text("contact.form.medicalNotesPlaceholder"),
      uploadVault: text("contact.form.uploadVault"),
      uploadDragDrop: text("contact.form.uploadDragDrop"),
      uploadBrowse: text("contact.form.uploadBrowse"),
      uploadSupports: text("contact.form.uploadSupports"),
      sampleFileName: text("contact.form.sampleFileName"),
      sendViaEmail: text("contact.form.sendViaEmail"),
      whatsapp: button(text("contact.form.whatsapp"), "https://wa.me/201234567890"),
    },
  ),
  section(
    "cta",
    "Final CTA",
    { label: "text", title: "text", callTheClinic: "button", whatsappUs: "button" },
    {
      label: text("contact.cta.label"),
      title: text("contact.cta.title"),
      callTheClinic: button(text("contact.cta.callTheClinic"), "tel:+201234567890"),
      whatsappUs: button(text("contact.cta.whatsappUs"), "https://wa.me/201234567890"),
    },
  ),
];
