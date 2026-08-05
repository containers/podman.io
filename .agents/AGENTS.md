# Podman.io Workspace Guidelines

The following rules and guidelines have been extracted from the project's README.md and must be strictly followed when making any changes to the repository:

## Tech Stack
- **Framework**: Built using Docusaurus 2.
- **Styling**: Tailwind CSS.
- **Icons**: Iconify.

## Development & Build Rules
- **Pre-merge Requirement**: `yarn build` MUST be run locally before any merges to the main branch.

## Code and Content Structure
- **Content Data**: Most page data (text/images) is stored in `static/data/<page-name>`. 
- **Global Data**: Files like `static/data/global.ts`, `testimonials.ts`, and `meetings.ts` are designed for easy updating by non-coders.
- **Component Organization**:
  - `src/components/content`: Self-sufficient components, large page content, or temporary components.
  - `src/components/layout`: Headers, grids, and sections that organize content.
  - `src/components/shapes`: SVG components (e.g., wave borders).
  - `src/components/ui`: Reusable, presentational components with little to no data by default.
  - `src/components/utilities`: Buttons, links, and small reusable elements.

## Markdown & HTML Rendering
- **Markdown Strings**: If you are rendering markdown from strings, you MUST use the custom `<Markdown text="..." styles="..." />` component from `components/utilities/`. This wraps `react-markdown` and handles lazy loading properly.
- **Injected HTML**: For rendering HTML (like from WordPress), you MUST use `html-react-parser` to prevent XSS vulnerabilities.

## Typescript
- **Base Types**: Stored in `types.d.ts`. Keep these base types minimal and extend them when needed for props.

## CSS and Styling
- **Tailwind Config**: Podman themes and custom radial gradients are defined in `tailwind.config.js`.
- **Global CSS**: Changes to default styles belong in `src/assets/css/main.css`.
- **Fonts**: Default fonts are set inside `@layer base {}` in `main.css` using Tailwind's `@apply` syntax.

## Package Management
- Use `yarn up <package-name>` (instead of `yarn upgrade`) to upgrade packages like docusaurus and tailwind.

## PR and Open Source Contribution Rules
- **Verify Issue Status**: Before starting any work on an issue, verify that it is NOT already assigned to someone else. Check if anyone has commented that they are working on it, or if there is already an open PR linked to the issue. DO NOT work on issues that are already claimed to avoid duplicated efforts.
- **Commit Sign-off**: You MUST certify the patch by signing all commits (`git commit -s`). The author email must match the sign-off email address.
- **Issue References**: Reference issues using `Fixes: #00000` in the commit message (if applicable).
- **Human-Written Text**: PR descriptions, commit messages, and GitHub comments must be human-written (not raw LLM output).
- **Screenshots/Recordings**: Include "Before" and "After" screenshots or screen recordings for any UI changes.
