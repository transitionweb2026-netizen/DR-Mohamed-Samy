import type { Config } from "tailwindcss";
import forms from "@tailwindcss/forms";

// Design tokens copied verbatim from the original tailwind.config script
// embedded in every source page (Home1, about, services, reviews, videos,
// articles, contact all defined the identical token set/values).
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "on-tertiary-container": "#724000",
        "on-background": "#00201e",
        "on-secondary": "#ffffff",
        "surface-container-lowest": "#ffffff",
        "outline-variant": "#bacac4",
        "inverse-on-surface": "#c9faf4",
        "secondary-fixed-dim": "#57dbc6",
        "primary-container": "#18d5b8",
        "secondary-fixed": "#77f8e2",
        error: "#ba1a1a",
        "on-tertiary-fixed-variant": "#6a3b00",
        "on-primary-fixed-variant": "#005144",
        "on-primary-fixed": "#00201a",
        "inverse-primary": "#2edec1",
        primary: "#006b5b",
        "on-primary": "#ffffff",
        outline: "#6b7a75",
        "surface-variant": "#bbece6",
        "primary-fixed-dim": "#2edec1",
        "error-container": "#ffdad6",
        "secondary-container": "#77f8e2",
        "tertiary-fixed-dim": "#ffb874",
        "on-tertiary-fixed": "#2d1600",
        "on-secondary-container": "#007164",
        background: "#e4fffb",
        "on-error": "#ffffff",
        "surface-container": "#c6f8f1",
        "surface-dim": "#b3e4de",
        "on-error-container": "#93000a",
        "surface-container-high": "#c0f2ec",
        "on-surface-variant": "#3b4a46",
        "surface-container-low": "#ccfdf7",
        "on-primary-container": "#00574a",
        tertiary: "#8c5000",
        "inverse-surface": "#003734",
        "on-secondary-fixed": "#00201b",
        "tertiary-fixed": "#ffdcbf",
        "on-secondary-fixed-variant": "#005047",
        "surface-container-highest": "#bbece6",
        "tertiary-container": "#ffab56",
        "on-surface": "#00201e",
        surface: "#e4fffb",
        "surface-tint": "#006b5b",
        "primary-fixed": "#59fbdc",
        "on-tertiary": "#ffffff",
        "surface-bright": "#e4fffb",
        secondary: "#006b5e",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
      spacing: {
        "section-gap": "64px",
        "container-max": "1450px",
        "stack-sm": "12px",
        "stack-md": "20px",
        "glass-padding": "40px",
        "card-gap": "24px",
      },
      fontFamily: {
        // Indirected through --font-heading/-body/-label (defined in
        // globals.css) rather than the raw next/font variables directly, so
        // the Arabic locale can swap in Arabic-covering faces (Cairo /
        // Tajawal) without touching any of these token names or the
        // hundreds of className="font-hero-headline" etc. call sites.
        "hero-headline-mobile": ["var(--font-heading)"],
        "body-md": ["var(--font-body)"],
        "section-title": ["var(--font-heading)"],
        "hero-headline": ["var(--font-heading)"],
        "card-title": ["var(--font-heading)"],
        "label-sm": ["var(--font-label)"],
        "body-lg": ["var(--font-body)"],
      },
      fontSize: {
        "hero-headline-mobile": [
          "40px",
          { lineHeight: "1.2", fontWeight: "400" },
        ],
        "body-md": ["15px", { lineHeight: "1.6", fontWeight: "400" }],
        "section-title": [
          "32px",
          { lineHeight: "1.4", letterSpacing: "0.01em", fontWeight: "400" },
        ],
        "hero-headline": [
          "64px",
          { lineHeight: "1.2", letterSpacing: "0.02em", fontWeight: "400" },
        ],
        "card-title": ["18px", { lineHeight: "1.5", fontWeight: "400" }],
        "label-sm": [
          "12px",
          { lineHeight: "1.4", letterSpacing: "0.05em", fontWeight: "500" },
        ],
        "body-lg": ["17px", { lineHeight: "1.6", fontWeight: "400" }],
      },
    },
  },
  plugins: [forms],
};

export default config;
