# Developer Instructions

## General Guidelines

1. **Prefer Nuxt UI components** - Always use components from https://ui.nuxt.com instead of writing custom HTML. This project uses `@nuxt/ui` which provides a comprehensive component library.

2. **Use existing patterns** - Before writing new code, look at existing components in the codebase to understand conventions, naming patterns, and used libraries.

3. **Check package.json** - Always verify available dependencies before importing or using external libraries.

4. **Run lint/typecheck** - After making changes, run the appropriate typecheck commands to ensure code quality (`npm run typecheck`).

5. **Read README.md** - Make sure to read the README file in the project root.

## Project-Specific Knowledge

- Dependencies are managed by npm (don't puse pnpm etc.)
- This is a Nuxt 4 application with `@nuxt/content` for content management
- Blog articles are stored in `content/blog-articles/` with date prefixes in filenames (e.g., `20230816.bolt-karta-s-lnbits.md`)
- The collection is defined in `content.config.ts`, check it when working with content files and keep correct frontmatter fields structure.
- When querying blog articles, use `id` for ordering (contains date in filename)
- Production environment is hosted on the Cloudflare Workers
- Do not execute write actions for GIT - no `git commit`, `git push`, `git merge`, `git rebase`, `git reset` etc.
