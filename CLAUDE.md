## Profile Dashboard - Mobile Application

**Objective:** Create a comprehensive mobile application for managing a profile dashboard with sections for Profile, Experience, Projects, Education, Skills, and Certifications.

**Target Platform:** Mobile Application (iOS and Android)

**Target Audience:** Professionals looking to manage and showcase their career profile.

### **Core Features:**

#### **1. Profile Management:**
- **Personal Information:** Name, contact details, social links
- **Professional Summary:** Bio/summary section
- **Profile Picture:** Upload and manage profile image

#### **2. Experience Tracking:**
- **Add/Edit Experience:** Title, company, dates, responsibilities
- **Duration Calculation:** Automatic calculation of years worked
- **Multiple Experiences:** Support for multiple past and current jobs

#### **3. Project Showcase:**
- **Project Details:** Project name, description, technologies used
- **Project Links:** GitHub, live demo, or portfolio links
- **Featured Projects:** Option to highlight key projects

#### **4. Education Section:**
- **Academic History:** Institution, degree, field of study, dates
- **GPA/Grades:** Display academic achievements
- **Multiple Degrees:** Support for bachelor's, master's, certifications

#### **5. Skills Management:**
- **Skill Categories:** Technical skills, soft skills, languages
- **Skill Proficiency:** Visual representation of skill level (e.g., 1-5 stars)
- **Add/Remove Skills:** Easy management of skill set

#### **6. Certification Tracking:**
- **Certification Details:** Name, issuing organization, date obtained
- **Certification Links:** Links to verify or view certificates
- **Expiration Tracking:** Optional expiration date tracking

### **Technical Requirements:**

#### **Technology Stack:**
- **Framework:** Expo (React Native)
- **Language:** TypeScript
- **Styling:** Nativewind or StyleSheet with Tailwind utility classes
- **Navigation:** Expo Router
- **Data Storage:** AsyncStorage for local storage (or Supabase for cloud sync if specified later)
- **Icons:** Expo Vector Icons or FontAwesome

#### **Project Structure:**
- Root directory: `src/`
- Components: `src/components/`
- Screens: `src/screens/`
- Navigation: `src/navigation/`
- Utilities: `src/utils/`

#### **UI/UX Requirements:**
- **Mobile First Design:** Optimized for phone screens (750px width)
- **Responsive:** Adjusts to different screen sizes
- **Dark Mode Support:** Themeable interface
- **Smooth Animations:** Subtle transitions between screens
- **Form Validation:** Clear error messages for all forms

### **Component Requirements:**

#### **Global Components:**
- **AppTabs:** Bottom tab navigation with 5 tabs (Profile, Experience, Projects, Education, Skills)
- **ThemedView:** Reusable view component with theme support
- **ThemedText:** Reusable text component with theme support
- **AnimatedSplashOverlay:** Custom splash screen with animation

#### **Section Components:**
- **ProfileCard:** Displays personal information and summary
- **ExperienceItem:** Card for individual experience entries
- **ProjectCard:** Displays project details and links
- **EducationItem:** Displays educational achievements
- **SkillPill:** Badge-style display for skills with proficiency indicator
- **CertificationCard:** Displays certification details
- **FloatingActionButton:** For adding new items to sections

### **Workflow Guidelines:**

1. Create the Expo project with Expo Router and TypeScript
2. Set up the project structure and global components
3. Implement bottom tab navigation with:
   - Profile tab
   - Experience tab
   - Projects tab
   - Education tab
   - Skills tab
4. Create form components for each section
5. Implement local data storage and retrieval
6. Add responsive styling and animations
7. Test thoroughly on both iOS and Android emulators

### **Design System:**
- **Primary Color:** Flexible (let the AI choose a professional palette)
- **Spacing:** Use multiples of 4px (e.g., 4, 8, 16, 24)
- **Border Radius:** Consistent rounding for all cards and buttons
- **Typography:** Sans-serif fonts (e.g., Inter, Roboto)

This comprehensive specification will guide the development of a professional profile dashboard application.

---

## Design Rules (Constraints, Not Suggestions)

You are building a production mobile interface. When a rule conflicts with what you were about to generate, the rule wins.

The goal is not "avoid a list of things." It is to make a deliberate choice in each place where the default would be decoration. If you remove a banned element and put nothing considered in its place, the result is worse, not better.

### 1. Colour

- Choose ONE accent colour. Everything else is neutral: a single family of greys with a consistent temperature (all warm or all cool, never mixed).
- A second colour is allowed only when it carries meaning: destructive, success, warning. Never for variety.
- Banned: blue to purple and indigo to violet gradients, anywhere. Backgrounds, buttons, headings, logos, icons, borders, blurred blobs.
- Banned: gradient text. Headings are one solid colour.
- Banned: giving each section or feature its own hue. Colour encodes meaning; it is not decoration.
- Do not use a framework's default palette untouched. Define your own tokens.
- Accent usage target: under 10% of the visible surface.

### 2. Depth and Separation

- Banned: drop shadows on anything not genuinely floating. Cards, inputs, badges, and static buttons get no shadow.
- Shadows only on true overlays: dropdowns, modals, toasts. Keep them tight: `0 1px 2px rgba(0,0,0,.06)`.
- Separate blocks with a 1px border, a background step, or whitespace. Whitespace is the best separator.
- Do not stack multiple shadows on one element.
- One border-radius value. One border colour. Used everywhere.

### 3. Icons and Emoji

- Banned: sparkle icons and every "AI shimmer" glyph in any UI surface. If a feature uses AI, say so in words.
- Banned: emoji as UI. Not in headings, buttons, lists, badges, or navigation. Emoji are user content, never interface.
- Banned: any container around an icon. No tinted square, no circle, no bordered box. The icon sits directly on the background.
- Use one icon set (Lucide, Heroicons, or Phosphor) at one stroke weight. Monochrome, inheriting currentColor.
- If a feature is clear from its label, it does not need an icon.

### 4. Typography and Copy

- Banned words: unleash, supercharge, elevate, transform, revolutionise, empower, seamless, effortless, cutting-edge, game-changing, next-level, unlock, harness, robust, leverage, powerful, delve, paradigm, synergy.
- Banned: the em dash (--) in UI copy. Write two sentences, or use a comma.
- Say what the product does in concrete nouns and real numbers.
- One type family (two at most: UI and mono). Scale: 12 / 14 / 16 / 20 / 24 / 32 / 48. No sizes between steps.
- Body text is left-aligned. Centre only short headings. Cap measure at ~70 characters.
- Sentence case for headings and buttons. No Title Case Everywhere.

### 5. Motion

- Banned: arrows that animate on hover or on their own. No bouncing chevrons. No looping idle motion.
- Banned: hover/press glow. No scale() above 1.02. No lift effect on cards or buttons.
- Press states change background or border colour only, at 120-160ms ease-out.
- Animate opacity and transform only. 120-200ms for UI feedback, up to 300ms for entering elements.
- No scroll-triggered fade-ins on every section. No parallax. No typewriter effects.
- Honour `prefers-reduced-motion` and disable non-essential motion inside it.

### 6. Scale and Proportion

- Hero headline: 40-56px equivalent on large screens, 28-34px on mobile. Never 72px+.
- Body text 15-16px. Secondary text 13-14px. Nothing below 12px.
- Buttons 36-44px tall, padding sized to the label. Never full-width when it can be avoided.
- Section padding 64-96px vertical (desktop equivalent), 40-56px on mobile. Not 160px+.
- Inline icons 16-20px, standalone icons 24px. No 48px+ decorative icons.
- Every spacing value is a multiple of 4.

### 7. Layout and Structure

- Banned: the eyebrow badge. No pill reading "New", "AI-Powered", or "Introducing" above a heading.
- Build only the sections this product actually needs, in the order a real user needs them.
- Not everything is centred. Not everything is a card. Not every corner is fully rounded.
- One spacing scale (4px base). Vertical rhythm must be visibly consistent.

### 8. Placeholder Content

- Mockup content is fine. Do not leave sections empty waiting for real copy.
- Make placeholder content specific, not generic. Named entries, not "Company A". Precise numbers, not round 10,000+.
- Placeholder copy still obeys section 4. No hype adjectives, no em dashes, no emoji.
- Write real empty states, error states, and loading states.

### 9. Code Craft

- Semantic structure. A touchable container replacing a button is a bug.
- Real, visible focus styles. Keyboard/screen-reader order must match visual order.
- Every image has meaningful alt text; decorative images get `alt=""`.
- Colour contrast at least 4.5:1 for body text, 3:1 for large text.
- Reuse components. If the same markup appears three times, extract it.
- Use design tokens, not one-off arbitrary values per element.
- No dead code, no commented-out blocks, no unused imports, no placeholder TODOs in a delivered file.

### Before Marking Anything Done

1. Any blue to purple or indigo to violet gradient left, anywhere?
2. Any gradient text?
3. Does anything not floating still have a shadow?
4. Any sparkle glyph, anywhere?
5. Any emoji used as interface?
6. Does any icon sit inside a tinted square, circle, or box?
7. Any em dash in the copy?
8. Any hits from the banned word list?
9. Does each feature or category have its own colour?
10. Does any button contain a moving arrow?
11. Does anything glow, lift, or scale on press?
12. Is there a badge above a heading that says nothing important?
13. Is any text oversized, or any section padding over 96px?
14. Does any element look oversized next to the text beside it?

If a reviewer could tell this was generated in under five seconds, find the specific thing that gave it away and fix that.
