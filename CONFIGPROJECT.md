# Payload CMS Web Template — Configuration Improvements

I created a new Payload CMS project using the official website template with the following versions:

- **Payload CMS:** 3.90.2
- **Next.js:** 16.4.0
- **React:** 19.2.6
- **TypeScript:** 6.0.3
- **tailwindcss:** 4.3.3
- **ESLint:** 10.12.0

While going through the generated code, I found a few configuration improvements that could be useful for new projects.
These changes focus on cleaning up legacy code, improving formatting and linting, and updating Tailwind CSS to v4.

## 1. Remove the Old SCSS File

Remove the old SCSS file:

`src/app/(payload)/custom.scss`

Also remove its imports from the following files:

- `(payload)/layout.tsx`
- `AdminBar/index.tsx`
- `BeforeDashboard/index.tsx`
- `SeedButton/index.tsx`

## 2. Improve `.editorconfig`

You can simplify the `.editorconfig` file and remove `max_line_length = null`. Using `null` for this setting can cause
an error.
Since Prettier configuration already has "printWidth": 80, I'd recommend removing max_line_length entirely to avoid
duplicating formatting rules.

Use the following configuration:

```ini
# EditorConfig is awesome: https://editorconfig.org

# Top-most EditorConfig file
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```

## 3. Update `.gitignore`

Consider updating `.gitignore` to exclude IDE-specific files and directories, such as:

- `.idea/`
- `.vscode/`

Adjust these entries according to your team's workflow. If your team shares VS Code workspace settings, you may want to
ignore only local or personal settings rather than the entire `.vscode/` directory.

## 4. Configure Prettier

Add the following entries to `.prettierignore`:

```gitignore
.next/
.turbo/
pnpm-lock.yaml
.pnpm-store/
```

Install Prettier and the Tailwind CSS plugin:

```bash
pnpm add --save-dev --save-exact prettier
pnpm install --save-dev prettier-plugin-tailwindcss
```

Create a `.prettierrc.json` file with the following configuration:

```json
{
  "endOfLine": "lf",
  "semi": false,
  "singleQuote": false,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "plugins": [
    "prettier-plugin-tailwindcss"
  ],
  "tailwindStylesheet": "src/app/(frontend)/globals.css",
  "tailwindFunctions": [
    "cn",
    "cva"
  ]
}
```

This configuration keeps formatting consistent and enables automatic Tailwind CSS class sorting.

**Note:** Ensure the `tailwindStylesheet` path matches your actual stylesheet location.

## 5. Configure ESLint and Prettier Together

When ESLint and Prettier are used in the same project, their rules can conflict. You can prevent these conflicts by
using `eslint-config-prettier`.

Install it:

```bash
pnpm add -D eslint-config-prettier
```

### Important considerations

- `.eslintignore` is deprecated when using flat ESLint configuration. Move ignore patterns into `eslint.config.mjs`.
- Avoid relying on `FlatCompat` to convert legacy Next.js configurations if you encounter circular-reference errors.
  Prefer the native flat configurations provided by your installed `eslint-config-next` version.
- Keep your ESLint, Next.js, TypeScript, and related plugin versions compatible. Check compatibility before upgrading
  further.

### Example `eslint.config.mjs`

```js
import { globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import prettier from "eslint-config-prettier/flat"

const eslintConfig = [
  // Next.js configs
  ...nextVitals,
  ...nextTs,

  // Prettier
  prettier,

  {
    settings: {
      react: {
        version: "19.2.6", // Use your actual React version
      },
    },
  },

  // Custom rules
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      "@typescript-eslint/ban-ts-comment": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: false,
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^(_|ignore)",
        },
      ],
    },
  },

  globalIgnores([
    // Default ignores of eslint-config-next
    "out/**",
    "build/**",
    "next-env.d.ts",
    ".next/**",
    "node_modules/**",
    "src/payload-types.ts",
    "src/payload-generated-schema.ts",
  ]),
]

export default eslintConfig
```

### Example development dependencies

The versions I found in my setup were:

```json
{
  "eslint-config-next": "16.3.3",
  "eslint-config-prettier": "^10.1.8",
  "prettier": "^3.9.10",
  "prettier-plugin-tailwindcss": "^0.8.1"
}
```

These are the versions I tried, not a guarantee that every combination is compatible with the versions listed at the
beginning. Check the installed package compatibility before copying them directly.

Also You can inspect your ESLint configuration using:

```bash
pnpm dlx eslint --inspect-config
```

## 6. Update `tsconfig.json`

Remove the deprecated `baseUrl` option:

```json
"baseUrl": "."
```

TypeScript 6 warns about this option, and the planned TypeScript 7 removal makes it worth addressing early.

When removing `baseUrl`, double-check your `paths` configuration. For the current template, the following aliases may be
sufficient:

```json
{
  "paths": {
    "@payload-config": [
      "./src/payload.config.ts"
    ],
    "react": [
      "./node_modules/@types/react"
    ],
    "@/*": [
      "./src/*"
    ]
  }
}
```

Review the actual paths in your project and update imports wherever errors appear. Don't assume every existing alias
will behave identically after changing the configuration.

## 7. Upgrade Tailwind CSS to v4

The template already includes a recent Tailwind CSS version, but some configuration and coding patterns may still come
from v3.

Start with the official upgrade tool:

[[Official Tailwind CSS Upgrade Guide](https://tailwindcss.com/docs/upgrade-guide)](https://tailwindcss.com/docs/upgrade-guide)

```bash
npx @tailwindcss/upgrade
```

After the upgrade tool run, you have to review the remaining code manually.

### Migrate custom utilities

For example, a custom container previously defined under `@layer utilities`:

```css
@layer utilities {
  .container {
    width: 100%;
    margin-inline: auto;
    padding-inline: 1rem;
  }
}
```

Can be migrated to Tailwind v4's utility style:

```css
@utility container {
  width: 100%;
  margin-inline: auto;
  padding-inline: 1rem;
}
```

However, Tailwind v4 already provides a native `container` utility. If the default behavior is sufficient, use the
built-in utility instead of recreating it.

### Remove `tailwind.config.mjs`

The goal is to use Tailwind v4's CSS-first configuration rather than retain the legacy JavaScript configuration file.

Before deleting it, migrate any configuration you still depend on, including custom theme values, colors, plugins, and
other settings.

### Update fonts in `layout.tsx`

For example:

```tsx
import { Geist_Mono, Geist_Pixel } from "next/font/google"

const fontMono = Geist_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-mono",
})

const fontSans = Geist_Pixel({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-sans",
})
```

Apply the font variables to the HTML element:

```tsx
<html
  className={cn("antialiased", fontSans.variable, fontMono.variable)}
  lang="en"
  suppressHydrationWarning
>
```

Then configure the corresponding font variables in `globals.css`.

Because the variables are already named `--font-mono` and `--font-sans`, don't redefine them as self-referencing
variables inside `@theme`. Use the font-variable references appropriate to your chosen Tailwind v4 setup.

### Create your own theme

I recommend using **shadcn/ui**, which is already included in the project.

You can do manually or you can generate a theme using [[tweakcn](https://tweakcn.com/)](https://tweakcn.com/) and import
the resulting CSS.

## 8. Final `globals.css` Baseline

The following is the final baseline without the theme data. You can add your theme variables through shadcn/ui.

```css
@import "tailwindcss";
@import "tw-animate-css";

@plugin "@tailwindcss/typography";

@custom-variant dark (&:is([data-theme="dark"] *));

@theme {
  --font-mono: var(--font-mono);
  --font-sans: var(--font-sans);
}

@layer base {
  * {
    border-color: var(--border);
    outline-color: color-mix(in oklab, var(--ring) 50%, transparent);
  }

  body {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: var(--background);
    color: var(--foreground);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: unset;
    font-size: unset;
  }

  html {
    opacity: 0;
  }

  html[data-theme="dark"],
  html[data-theme="light"] {
    opacity: initial;
  }
}
```

**Important:** This is the baseline from website template. The actual `@theme` values should reference the font
variables provided by `next/font`, and the semantic color variables must be defined by your theme.

## 9. Verify the Migration

After applying these changes:

1. Run the development server and confirm Payload Admin and the frontend both load.
2. Run ESLint and Prettier.
3. Check the TypeScript configuration and resolve import errors.
4. Verify light and dark themes.
5. Inspect responsive layouts and fix any styling changes introduced by the Tailwind migration.

The migration may introduce styling differences, but fixing them early is generally easier than carrying legacy
configuration into future development.

You can replace tailwind-merge and clsx with cn today. It's a drop-in replacement.
Here's a command to migrate:

````text
npx shadcn@latest migrate cn
````

also do this ->
1. changed from radix to base ui lib
2. remove entire custom theme toggle. (you can use next-theme or more simple ui component for this.)

if you ever see a white page for the frontend don't panic :) just go to the global.css file
and remove opacity: 0 from "@layer base{}". and if you follow above steps and remove all the previous styles, the ui
will be broken. keep that in mind.

And you may find some Issues related to useEffect, those are code errors that need to fix seperatly.
---

That's what I've found so far. I'll update this document if I discover anything else. Let me know if these changes help
with your setup, and feel free to share any issues or improvements you find.
