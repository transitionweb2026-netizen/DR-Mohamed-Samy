---
name: Aetheris Medicus
colors:
  surface: '#e4fffb'
  surface-dim: '#b3e4de'
  surface-bright: '#e4fffb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#ccfdf7'
  surface-container: '#c6f8f1'
  surface-container-high: '#c0f2ec'
  surface-container-highest: '#bbece6'
  on-surface: '#00201e'
  on-surface-variant: '#3b4a46'
  inverse-surface: '#003734'
  inverse-on-surface: '#c9faf4'
  outline: '#6b7a75'
  outline-variant: '#bacac4'
  surface-tint: '#006b5b'
  primary: '#006b5b'
  on-primary: '#ffffff'
  primary-container: '#18d5b8'
  on-primary-container: '#00574a'
  inverse-primary: '#2edec1'
  secondary: '#006b5e'
  on-secondary: '#ffffff'
  secondary-container: '#77f8e2'
  on-secondary-container: '#007164'
  tertiary: '#8c5000'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffab56'
  on-tertiary-container: '#724000'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#59fbdc'
  primary-fixed-dim: '#2edec1'
  on-primary-fixed: '#00201a'
  on-primary-fixed-variant: '#005144'
  secondary-fixed: '#77f8e2'
  secondary-fixed-dim: '#57dbc6'
  on-secondary-fixed: '#00201b'
  on-secondary-fixed-variant: '#005047'
  tertiary-fixed: '#ffdcbf'
  tertiary-fixed-dim: '#ffb874'
  on-tertiary-fixed: '#2d1600'
  on-tertiary-fixed-variant: '#6a3b00'
  background: '#e4fffb'
  on-background: '#00201e'
  surface-variant: '#bbece6'
typography:
  hero-headline:
    fontFamily: Anton
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  hero-headline-mobile:
    fontFamily: Anton
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
  section-title:
    fontFamily: Anton
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: 0.01em
  card-title:
    fontFamily: Anton
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.5'
  body-lg:
    fontFamily: Archivo Narrow
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Archivo Narrow
    fontSize: 15px
    fontWeight: '400'
    lineHeight: '1.6'
  label-sm:
    fontFamily: Be Vietnam Pro
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.4'
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1450px
  section-gap: 64px
  card-gap: 24px
  glass-padding: 40px
  stack-sm: 12px
  stack-md: 20px
---

## Brand & Style
The design system embodies a **Futuristic Liquid Glass 3D** aesthetic, specifically tailored for a high-stakes medical specialty. The brand personality is authoritative, clinical, and technologically advanced, aiming to inspire profound trust through precision and modernism. The target audience includes patients and families seeking world-class liver transplant expertise, where the UI must feel like a premium, life-saving sanctuary.

The visual style shifts from a nocturnal environment to a **Luminous Clinical Daybreak**. It utilizes **Glassmorphism** and **Tactile 3D** elements against a bright, airy backdrop. By utilizing heavy backdrop blurs (30px), luminous teal accents, and layered depth, the interface mimics a high-end medical workstation or a 3D holographic display in a sunlit facility. Every element must feel dimensional—not as flat pixels, but as physical glass objects floating in a pristine space.

## Colors
The palette is centered on the **"Luminous Life"** concept, using a range of teals and a bright environment to create a sense of hope and clinical excellence.

- **Environment:** The system utilizes a **light color mode**. The base background is driven by the neutral tone `#b4e5df`, providing a soft, minty-teal luminance that feels sterile and high-tech.
- **Surfaces:** Use `glass-surface` with high transparency (10%–30%) and `backdrop-filter: blur(30px)`.
- **Accents:** The primary color `#18d5b8` and secondary color `#0fae9b` are reserved for critical calls to action, highlights in typography, and the "pulse" of 3D holographic organs.
- **Gradients:** Apply linear gradients (Top-Left to Bottom-Right) on glass surfaces using a mix of `primary_color_hex` and `secondary_color_hex` to simulate light hitting the glass edge.

## Typography
This design system utilizes a high-contrast typographic pairing to balance medical authority with technical precision.

- **Headlines:** Uses **Anton** to command authority and attention. The condensed, bold nature of Anton provides a striking, high-impact presence for medical headers. Use the secondary teal (`#0fae9b`) for primary headings to ensure high legibility against the light background, but always highlight the most critical medical term (e.g., "Liver Transplant") in the primary teal (`#18d5b8`).
- **Body Text:** Uses **Archivo Narrow** to maintain a clean, technical feel. Its condensed proportions are optimized for reading complex medical information across all device sizes.
- **Optimization:** All tracking and leading are tuned for legibility. Ensure line heights are generous (minimum 1.4) to maintain the clean, airy clinical feel across all screen sizes.

## Layout & Spacing
The layout follows a **Fixed-Width Premium Grid** with a 1450px max-width to maintain a cinematic, controlled composition. 

- **Verticality:** A core rule of this system is that cards must be taller than they are wide. Never stretch content to fill horizontal space; instead, use generous "breathing room" margins to emphasize the lightness of the brand.
- **Symmetry:** Layouts should be centered or balanced symmetrically. In the Hero section, use a split 60/40 layout (Content/Hologram).
- **Responsive Flow:** 
  - **Desktop:** 12-column grid, 24px gutters.
  - **Tablet:** 8-column grid, shift to 2-column card layouts.
  - **Mobile:** 4-column grid, full-width cards with 16px side margins.

## Elevation & Depth
Depth is the defining characteristic of this design system, now adapted for a bright environment. It is achieved through three specific layers:

1.  **The Canvas (Base):** The bright, light-teal background (`#b4e5df`) that creates a sense of infinite, clean space.
2.  **Floating Glass (Mid):** Semi-transparent surfaces with a 30px backdrop blur. These surfaces receive a `border-glass` stroke. To simulate thickness, add a 1px inner-shadow at the top (white, 40% opacity) and a soft, wide-spread light teal shadow below to create "lift."
3.  **Holographic Focus (Top):** 3D elements like the liver model or primary buttons. These utilize luminous outer glows to appear as if they are emitting light onto the glass surfaces below them.

## Shapes
The shape language is sophisticated and "biological-tech." All glass containers use a base roundedness of **Level 2** to feel approachable yet structural. 

- **Glass Cards:** Always use `rounded-xl` (1.5rem / 24px) or higher.
- **Buttons:** Use a pill-shape for CTAs to contrast against the rectangular glass cards.
- **Interactive States:** On hover, card borders should transition from the soft neutral glass edge to a more intense `border-strong` using the primary teal.

## Components
### Buttons
- **Primary:** Gradient from `secondary_color_hex` to `primary_color_hex`. Includes a 1px white top-edge highlight and a soft outer glow. Tactile feel is achieved with a subtle inner-bevel.
- **Secondary:** Ghost style with a `border-glass` and `backdrop-filter`. Text uses the secondary teal for high contrast against the light background.

### Liquid Glass Cards
- **Structure:** Tall aspect ratio. 30px blur. 
- **Header:** Contains a glowing 3D icon or medical line-art.
- **Hover:** The background white-point increases, and the luminous border intensifies.

### Navigation Bar
- **Style:** Floating island design. Positioned 20px from the top. 
- **Effect:** High blur (40px) to ensure text legibility as the user scrolls over bright holographic elements.

### 3D Holograms
- Use for the liver model and the appointment calendar. These should feature orbital rings and a "base platform" of light to ground them in the 3D space.

### Input Fields
- Light teal-tinted background, `border-glass`, and secondary teal text. The focus state triggers a primary teal (`#18d5b8`) border glow.