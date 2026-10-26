# AI Portfolio Studio

ROLE

Build this pprtflio according thus prompt and above resume content

Act as a world-class Senior UI/UX Designer, Creative Developer, Frontend Engineer, Motion Designer, and WebGL Specialist.



Your task is to transform my existing website into a premium, visually immersive SaaS product landing page inspired by the design, color palette, gradients, layout, interactions, and animations of the following reference website:



REFERENCE WEBSITE: https://jimo.ai/product/ai



The goal is to recreate the reference's visual language as closely as practical while building a fully functional, responsive, polished website using clean, maintainable code.



Do not produce a generic SaaS landing page. Study the reference website carefully and reproduce its actual visual characteristics rather than inventing an unrelated design.



---



1. FIRST — ANALYZE THE REFERENCE WEBSITE



Before writing code, inspect the reference website thoroughly.



Examine:



- The initial viewport and hero section.

- Background colors and gradient combinations.

- Gradient direction, shape, intensity, opacity, and placement.

- Main content width and page alignment.

- Typography, font weights, line heights, and letter spacing.

- Headings, subtitles, buttons, and navigation.

- Product screenshots and interface mockups.

- Cards, borders, shadows, and corner radii.

- The use of negative space.

- Section transitions and background changes.

- Scroll-triggered animations.

- Hover interactions and button effects.

- Cursor interactions, if present.

- Sticky sections and pinned content, if present.

- Mobile and tablet layouts.

- The overall balance between text, imagery, and product demonstrations.



Inspect the page at different scroll positions. Do not evaluate the design from the hero section alone.



If browser inspection or screenshots are available, use them to study the actual appearance of the reference. If the page contains interactive demonstrations, inspect their behavior where possible.



Important: Do not invent exact CSS values or claim to know the original source code. Derive the closest practical colors, gradients, dimensions, and animation behavior from the rendered reference.



If a particular animation cannot be inspected, create a restrained approximation consistent with the visible design.



---



2. PRIMARY DESIGN GOAL



Recreate the visual identity of the Jimo AI product page.



The website should feel:



- Premium and modern.

- AI-native and technology-focused.

- Minimal but visually rich.

- Elegant rather than overly decorative.

- Smooth and responsive.

- Professional enough for a real SaaS company.

- Visually consistent across every section.



Prioritize visual fidelity to the reference over adding unnecessary design effects.



Do not automatically introduce a purple-and-blue gradient, neon colors, excessive glassmorphism, or a dark theme unless those elements are supported by the reference.



The actual reference must guide the design decisions.



---



3. COLOR SYSTEM — MATCH THE REFERENCE



Color accuracy is one of the highest priorities.



Inspect the reference website and create a consistent color system based on the colors that are actually visible.



Identify and reproduce the closest practical equivalents for:



- Main page background.

- Alternate section backgrounds.

- Primary text.

- Secondary text.

- Muted text.

- Accent colors.

- Primary button background and text.

- Secondary button styling.

- Card backgrounds.

- Borders and dividers.

- Product interface backgrounds.

- Product interface text.

- Interactive elements.

- Shadows and ambient lighting.

- Gradient colors.

- Gradient highlights and transition zones.



Create reusable CSS variables for the resulting palette.



For example, organize the variables using this structure and replace the placeholder values with colors derived from the reference:



:root {

--color-background: /* sampled or visually matched background /;

--color-surface: / matched surface /;

--color-text-primary: / matched primary text /;

--color-text-secondary: / matched secondary text /;

--color-accent: / matched accent /;

--color-border: / matched border /;

--gradient-hero: / recreated reference gradient /;

--gradient-section: / recreated section gradient /;

--shadow-glow: / matched lighting effect */;

}



Do not leave placeholder values in the finished implementation.



Use the same design tokens throughout the website. Avoid introducing unrelated colors into individual components.



The final result should feel like one cohesive design system.



---



4. RECREATE THE GRADIENTS AS CLOSELY AS POSSIBLE



The gradient system is a central part of this project.



Do not use one generic gradient across the entire website.



Inspect the reference and identify the different gradient treatments used in each area.



Study:



1. The hero background gradient.

2. The gradient behind the main heading or product visual.

3. The gradient surrounding product mockups.

4. The gradients used in section transitions.

5. The gradients inside cards or feature demonstrations.

6. Any accent gradients used for buttons or interactive elements.

7. The gradient's appearance against light and dark surfaces.

8. The way gradients blend into the surrounding background.



For each gradient, reproduce the closest practical combination of:



- Color stops.

- Gradient direction.

- Radial or linear shape.

- Position.

- Size.

- Opacity.

- Blur.

- Blend mode.

- Transparency.

- Layering.

- Fade-out behavior.



Use layered CSS gradients when appropriate.



Example structural pattern:



.hero-background {

background:

radial-gradient(

ellipse at 50% 0%,

var(--hero-highlight),

transparent 60%

),

linear-gradient(

180deg,

var(--hero-base),

var(--page-background)

);

}



This is only a structural example. Do not assume these are the exact gradients used by Jimo.



Derive the final gradient composition from the reference.



Where the reference contains soft, atmospheric color transitions, reproduce them with carefully layered radial gradients rather than hard-edged shapes.



Where gradients extend beyond the viewport, ensure they fade naturally without visible boundaries.



Use CSS pseudo-elements when appropriate to position large gradient layers behind the content.



Keep all decorative layers behind the interface and ensure they do not interfere with clicks, text selection, or accessibility.



Avoid:



- Oversaturated gradients.

- Random neon effects.

- Harsh color transitions.

- Excessive glow.

- Unnecessary animated backgrounds.

- Gradient colors that do not appear in the reference.

- Visible seams between background sections.



The objective is to achieve a convincing visual match, not merely to add attractive gradients.



---



5. HERO SECTION



Build a visually compelling hero section inspired by the reference.



Include the appropriate elements based on the actual website:



- A clean navigation bar.

- A strong headline.

- A short supporting paragraph.

- A primary call-to-action button.

- A secondary action if present in the reference.

- A product demonstration or interface mockup.

- The appropriate background treatment and gradient lighting.



The hero must have a clear visual hierarchy.



Typography should feel deliberate, with the headline receiving the most attention.



Match the reference's:



- Headline width.

- Text alignment.

- Font scale.

- Line breaks.

- Spacing.

- Button proportions.

- Vertical rhythm.

- Background composition.



Avoid generic hero layouts if the reference uses a different structure.



The first viewport should feel polished and intentional.



Do not add unnecessary 3D objects or decorative illustrations unless the reference supports them.



---



6. PRODUCT MOCKUPS AND INTERFACE DEMONSTRATIONS



The product interface is essential to the design.



Recreate the product visuals shown in the reference as closely as possible.



Where appropriate, build realistic interface mockups containing:



- Application windows.

- Product navigation.

- Toolbars.

- Menus.

- Panels.

- Buttons.

- Notifications.

- Contextual assistance.

- AI-generated guidance.

- Cursor indicators.

- Product walkthroughs.

- Feature explanations.

- Small interface details.



The reference focuses on AI-powered product assistance, so represent relevant functionality where it matches the visible design.



Possible demonstration elements include:



- An AI assistant that provides contextual product guidance.

- A cursor that highlights an interface element.

- An instructional tooltip.

- A contextual help panel.

- A step-by-step walkthrough.

- A product interface showing a feature being explained.



These are possible implementation ideas, not mandatory additions. Use only the elements that fit the reference layout.



Do not substitute generic rectangles for detailed product mockups.



Create realistic spacing, alignment, typography, buttons, borders, and interface states.



If original assets are available in the project, reuse them where appropriate.



Do not invent company logos, customer logos, testimonials, statistics, or product claims.



If the original reference contains assets that cannot be retrieved, recreate the visible interface using HTML and CSS where practical.



---



7. NAVIGATION BAR



Build a polished navigation bar that follows the reference design.



Inspect the actual navigation before implementing it.



Match the appropriate:



- Background.

- Height.

- Horizontal spacing.

- Logo placement.

- Typography.

- Navigation links.

- Button design.

- Border treatment.

- Sticky or fixed behavior.



If the reference uses a transparent navigation bar over the hero, preserve that visual treatment.



If it uses a solid or subtly translucent background, reproduce it appropriately.



Add subtle hover and focus states.



On mobile, implement an accessible navigation menu that works correctly with touch and keyboard input.



Do not add unnecessary navigation links that are not required by the existing website.



---



8. TYPOGRAPHY



Typography must closely match the visual character of the reference.



Inspect:



- Font family.

- Font size.

- Font weight.

- Line height.

- Letter spacing.

- Heading width.

- Paragraph width.

- Text alignment.

- Text color.

- Responsive scaling.



Use the original font if it is identifiable and legally available.



Otherwise, select the closest suitable alternative using a reliable font source or a locally available font.



Create a consistent typography system for:



- Main headings.

- Section headings.

- Subheadings.

- Body text.

- Supporting text.

- Buttons.

- Navigation.

- Labels and metadata.

- Product interface text.



Use responsive font sizes with CSS clamp() where appropriate.



Avoid excessive bold text, inconsistent font sizes, and unnecessarily wide paragraphs.



Preserve readable line lengths and sufficient contrast.



---



9. SCROLL-BASED STORYTELLING



Analyze how the reference presents information as the user scrolls.



Recreate the visible section structure and transition behavior.



Potential sections may include:



- Hero.

- Product demonstration.

- Feature explanations.

- AI assistance workflow.

- Product use cases.

- Additional capabilities.

- Final call to action.

- Footer.



Treat this list as a planning guide, not a requirement to add sections that do not exist in the reference.



Each section should have a clear purpose and a consistent visual relationship with the surrounding sections.



Where the reference uses scroll-based storytelling, recreate the effect using appropriate techniques such as:



- Scroll-triggered reveals.

- Sticky product demonstrations.

- Pinned sections.

- Sequential feature highlights.

- Text and image transitions.

- Background color transitions.

- Parallax movement.

- Progressive interface demonstrations.



Do not apply every effect to every section.



Use animation to guide attention and explain the product.



The user should be able to scroll naturally without the interface feeling slow, confusing, or overly animated.



---



10. ANIMATION SYSTEM



Create a cohesive motion system inspired by the reference.



Inspect the speed, easing, distance, and timing of the visible animations.



Use the following only where appropriate:



Entrance animations



- Fade-in.

- Subtle upward movement.

- Staggered text appearance.

- Image or mockup reveal.

- Section reveal.



Product animations



- Cursor movement.

- Tooltip appearance.

- Interface highlighting.

- Panel expansion.

- Notification appearance.

- Step-by-step product demonstrations.

- Subtle floating movement when present in the reference.



Interaction animations



- Button hover transitions.

- Card hover effects.

- Navigation transitions.

- Focus indicators.

- Small interface feedback.



Scroll animations



- Sequential content reveals.

- Sticky demonstrations.

- Progress-based transitions.

- Subtle parallax.

- Section transitions.



Use consistent durations and easing curves.



Animations should feel smooth, controlled, and professional.



Avoid:



- Excessive bouncing.

- Aggressive zoom effects.

- Constant movement that distracts from the content.

- Large animations on every element.

- Unnecessary loading screens.

- Scroll hijacking.

- Animations that make text difficult to read.



Support "prefers-reduced-motion" and ensure the page remains usable when motion is reduced.



---



11. GSAP, FRAMER MOTION AND THREE.JS



Use animation libraries selectively.



Recommended technologies:



- React for component-based UI.

- Framer Motion, now commonly called Motion for React, for component and interface animations.

- GSAP with ScrollTrigger for complex scroll-based storytelling when required.

- Three.js or React Three Fiber only if the reference genuinely benefits from a 3D element.



Do not install all libraries automatically.



First determine which effects are necessary.



If simple CSS transitions can reproduce the reference accurately, prefer CSS.



If a sticky or pinned scroll demonstration requires GSAP, use it carefully.



If a 3D element is required, ensure it is visually relevant, optimized, and responsive.



Do not add Three.js simply to make the page look more impressive.



The reference's visual language must take priority over unnecessary technical complexity.



---



12. BACKGROUND EFFECTS AND LIGHTING



Recreate the reference's background treatment using the most appropriate technique.



Potential techniques include:



- Layered radial gradients.

- Linear gradients.

- CSS pseudo-elements.

- Soft blurred gradient layers.

- Subtle shadows.

- Transparent overlays.

- Carefully controlled blend modes.

- Lightweight animated background elements.



Match the actual reference rather than applying every effect.



If a glow appears behind a product mockup, reproduce its location, softness, color, and approximate intensity.



If a section uses a clean, flat background, preserve it.



Use background effects to establish depth without making the page visually noisy.



Keep decorative effects separate from the main content so they can be tuned easily.



---



13. CARDS, BUTTONS AND MICRO-INTERACTIONS



Recreate the reference's component styling.



For cards, inspect:



- Background color.

- Border color.

- Border thickness.

- Corner radius.

- Shadow.

- Internal padding.

- Spacing.

- Hover behavior.



For buttons, inspect:



- Shape.

- Height.

- Padding.

- Typography.

- Background.

- Text color.

- Border.

- Hover state.

- Focus state.

- Active state.



Avoid giving every card a dramatic glow or hover animation.



If the reference uses minimal borders and subtle interaction, reproduce that restraint.



Ensure all clickable elements have clear interactive states.



---



14. RESPONSIVE DESIGN



The website must work across:



- Desktop.

- Laptop.

- Tablet.

- Mobile phones.



Inspect the reference at different viewport widths if possible.



Implement appropriate responsive behavior for:



- Navigation.

- Hero typography.

- Main product mockups.

- Multi-column layouts.

- Feature cards.

- Sticky sections.

- Product demonstrations.

- Section spacing.

- Buttons.

- Background gradients.



Do not simply shrink the desktop design to fit a mobile screen.



Rearrange content intelligently.



On mobile:



- Keep headings readable.

- Prevent horizontal overflow.

- Ensure buttons are easy to tap.

- Simplify complex product demonstrations where necessary.

- Reduce excessive animation.

- Prevent oversized gradient effects from causing rendering problems.

- Preserve the most important visual characteristics of the reference.



Test at approximately:



- 1440px.

- 1280px.

- 1024px.

- 768px.

- 390px.

- 360px.



Fix all horizontal scrolling and layout issues.



---



15. ACCESSIBILITY



Follow practical WCAG accessibility principles.



Implement:



- Semantic HTML.

- Proper heading hierarchy.

- Accessible navigation.

- Keyboard-accessible controls.

- Visible focus indicators.

- Descriptive accessible names.

- Appropriate image alt text.

- Sufficient text contrast.

- Reduced-motion support.

- Accessible mobile navigation.

- Correct button and link behavior.



Do not rely solely on color to communicate important information.



Ensure decorative background layers do not block user interactions.



---



16. PERFORMANCE OPTIMIZATION



The page must look premium without becoming unnecessarily heavy.



Optimize:



- Image sizes.

- Image formats.

- Animation complexity.

- JavaScript bundle size.

- Font loading.

- 3D assets, if used.

- Scroll event handling.

- Rendering performance.



Prefer transform and opacity animations where possible.



Avoid expensive continuous animations that trigger unnecessary layout calculations.



Lazy-load below-the-fold images where appropriate.



Do not load large 3D libraries if the page does not need them.



Use appropriate loading behavior for fonts and assets.



The website should remain smooth on ordinary laptops and mobile devices.



---



17. TECHNICAL IMPLEMENTATION



First inspect my existing project.



Determine:



- The framework and build tool.

- The current folder structure.

- Existing components.

- Existing styling system.

- Installed dependencies.

- Existing routes.

- Available assets.

- Current functionality.



Preserve the existing project structure where practical.



If the project uses React and Vite, continue using React and Vite.



If it already uses Tailwind CSS, follow the existing Tailwind setup.



If it uses regular CSS, do not migrate the entire project unnecessarily.



Avoid rewriting unrelated features.



Use reusable components and clean code.



A possible component structure is:



src/

components/

Navbar.jsx

Hero.jsx

ProductDemo.jsx

FeatureSection.jsx

ProductFeature.jsx

CallToAction.jsx

Footer.jsx

styles/

global.css

variables.css

animations.css

App.jsx

main.jsx



Adapt this structure to the actual project instead of creating unnecessary files.



Keep the design system maintainable.



Centralize reusable colors, spacing, typography, radii, shadows, and animation settings.



Use semantic and descriptive component names.



Do not leave unused imports, broken routes, missing assets, placeholder components, or console errors.



---



18. ASSET AND IMAGE HANDLING



Inspect the reference and the existing project assets before creating replacements.



Reuse appropriate existing assets.



For missing visual elements:



- Recreate interface mockups with HTML and CSS when practical.

- Use suitable image assets when necessary.

- Avoid unrelated stock imagery.

- Do not invent customer logos or company endorsements.

- Do not use copyrighted assets in ways that violate applicable rights.

- Do not hotlink unstable assets without a reason.



If the reference includes a product interface, prioritize recreating that interface rather than replacing it with a generic image.



Ensure all images load correctly and have appropriate sizing behavior.



---



19. FUNCTIONALITY REQUIREMENTS



The website must not be a static visual mockup with broken interactions.



Implement appropriate functionality for:



- Navigation links.

- Mobile navigation.

- Primary calls to action.

- Secondary calls to action.

- Interactive product demonstrations.

- Buttons and controls.

- Scroll-based animations.

- Relevant links.

- Hover and focus states.



If a backend or external service is not configured, do not invent one.



For unavailable integrations, provide a clear placeholder implementation or preserve the existing project behavior.



Do not create fake success messages for actions that do not actually work.



Keep the experience functional and honest.



---



20. VISUAL FIDELITY VALIDATION



After implementing the website, compare it with the reference.



Do not stop when the page merely compiles.



Check the following:



Colors



- Are the background colors close to the reference?

- Are the accent colors consistent?

- Do the gradients resemble the original in shape and intensity?

- Are the transitions between gradient and background natural?

- Are the product mockup colors consistent with the reference?



Layout



- Is the hero composition similar?

- Are the content widths appropriate?

- Is the spacing consistent?

- Are the section heights and alignments convincing?

- Does the mobile layout preserve the visual identity?



Typography



- Are heading sizes and line breaks similar?

- Are the fonts visually appropriate?

- Are text widths and line heights consistent?



Components



- Are buttons, cards, borders, and shadows styled consistently?

- Do product demonstrations look realistic?

- Are the important visual details present?



Animation



- Do the animations feel similar to the reference?

- Are they smooth?

- Are they appropriately restrained?

- Do they work on mobile?



Technical quality



- Are there console errors?

- Are any assets missing?

- Are there broken links?

- Is horizontal overflow present?

- Are there accessibility issues?

- Does the page perform well?



If browser screenshots are available, capture screenshots of the implementation and compare them with the reference at matching viewport sizes.



Identify the largest visual differences and fix them iteratively.



Prioritize:



1. Background and gradient accuracy.

2. Hero composition.

3. Typography.

4. Product mockups.

5. Section layout.

6. Spacing.

7. Animation details.

8. Minor styling refinements.



Do not claim pixel-perfect reproduction unless it has actually been verified.



---



21. IMPORTANT RULES



Follow these rules throughout the implementation:



1. Study the reference before coding.

2. Recreate the actual visual language instead of inventing a generic SaaS design.

3. Pay special attention to the reference's gradients and background colors.

4. Use a consistent design-token system.

5. Do not guess exact source CSS values.

6. Do not add unnecessary colors or visual effects.

7. Do not overuse glassmorphism, neon, parallax, or 3D.

8. Do not use animations just because they are technically possible.

9. Preserve existing project functionality.

10. Do not rewrite unrelated files.

11. Do not leave unfinished sections.

12. Do not use placeholder text when appropriate real content already exists.

13. Do not invent statistics, testimonials, or product claims.

14. Make all important interactions work.

15. Make the website responsive and accessible.

16. Optimize performance.

17. Test the final implementation.

18. Fix visual inconsistencies before finishing.



---



22. EXECUTION WORKFLOW



Follow this workflow in order.



Phase 1 — Inspect



Analyze the reference website and inspect my existing codebase.



Phase 2 — Plan



Identify the required sections, design tokens, gradient system, components, animations, and responsive behavior.



Phase 3 — Implement



Build the complete page using the existing project stack and reusable components.



Phase 4 — Refine



Tune the gradients, colors, typography, spacing, shadows, and component styling against the reference.



Phase 5 — Animate



Implement only the necessary interactions and scroll effects.



Phase 6 — Optimize



Improve responsiveness, accessibility, loading performance, and code quality.



Phase 7 — Test



Run the project, inspect the page at different viewport sizes, and fix errors.



Phase 8 — Final visual pass



Compare the implementation against the reference and correct the most noticeable differences.



Do not stop after generating the initial code. Continue refining until the result is polished.



---



FINAL EXPECTATION



Deliver a complete, working, premium-quality website inspired by:



https://jimo.ai/product/ai



The final result must combine:



- Reference-inspired UI/UX.

- Closely matched background colors.

- Carefully recreated gradients.

- Consistent typography.

- High-quality product interface mockups.

- Smooth and meaningful animations.

- Thoughtful scroll-based storytelling.

- Responsive desktop and mobile layouts.

- Accessible interactions.

- Optimized performance.

- Clean, maintainable code.



The most important requirement is visual fidelity. The gradients, colors, composition, typography, spacing, and product presentation must feel consistent with the actual reference website.



Do not settle for a generic template. Inspect, implement, compare, refine, and test.



Begin by examining my existing project and the reference website. Then implement the complete experience directly in my project.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/50dff01e-582f-4ad4-bdc5-caae8b5969b1).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
