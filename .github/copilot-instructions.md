# Copilot Instructions for BuildGo Next.js Template

This document provides essential guidelines for AI coding agents to be productive in the BuildGo Next.js codebase. It covers the architecture, workflows, conventions, and integration points specific to this project.

## Project Overview

- **Framework**: This project is built using [Next.js](https://nextjs.org), leveraging its App Router for modern React-based development.
- **Purpose**: A construction and building template with multiple pages and components for various sections like services, portfolio, blog, and more.
- **Folder Structure**:
  - `app/`: Contains the main pages and routes, including dynamic routes like `[id]`.
  - `components/`: Reusable UI components, organized into subfolders like `layout`, `data`, and `pages`.
  - `public/`: Static assets such as images, fonts, and CSS files.

## Key Architectural Patterns

1. **Dynamic Routing**:
   - Dynamic routes are used extensively, e.g., `app/blog/[id]/page.jsx` for blog details.
   - Use `getStaticProps` or `getServerSideProps` for data fetching when required.

2. **Component Organization**:
   - Components are modular and categorized by their purpose (e.g., `layout`, `pages`, `data`).
   - Example: `components/layout/headers/header-one.jsx` defines a specific header layout.

3. **Data Handling**:
   - Static data is stored in `components/data/` (e.g., `blog-data.jsx`, `services-data.jsx`).
   - Update these files to modify the content displayed across the site.

4. **Styling**:
   - Global styles are in `app/globals.css`.
   - Additional styles are in `public/assets/css/`.

## Developer Workflows

### Running the Development Server

```bash
npm run dev
```

- Access the app at [http://localhost:3000](http://localhost:3000).
- Pages auto-update on save.

### Building for Production

```bash
npm run build
```

- Outputs are stored in the `.next/` directory.

### Debugging

- Use browser developer tools and Next.js debugging features.
- Check logs in the terminal for server-side errors.

## Project-Specific Conventions

- **File Naming**: Use `page.jsx` for route components and descriptive names for others (e.g., `header-one.jsx`).
- **Dynamic Routes**: Follow the `[param]` convention for dynamic segments.
- **Data Files**: Store reusable data in `components/data/`.

## Integration Points

- **External Libraries**:
  - `next/font`: Used for font optimization.
  - `react`: Core library for building components.
- **Deployment**:
  - Deploy on [Vercel](https://vercel.com) for seamless integration with Next.js.

## Examples

### Adding a New Page
1. Create a new folder in `app/` (e.g., `app/new-page/`).
2. Add a `page.jsx` file with the component logic.
3. Access the page at `/new-page`.

### Modifying a Header
1. Locate the header component in `components/layout/headers/`.
2. Update the JSX or styles as needed.
3. Test the changes in the browser.

---

For further details, refer to the [Next.js Documentation](https://nextjs.org/docs).