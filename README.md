# nextjs-cli-based-boilerplate

A CLI tool to scaffold Next.js projects with pre-configured templates. Available in Node.js, Go, and Rust.

## Quick Start

```bash
npx create-nx-next
```

You'll be prompted to choose a project name and a template:

```
? Project name: my-app
? Choose a template:
  > Next.js Boilerplate (Clean)
    Next.js + Shadcn UI
    Next.js + Clerk Auth
    Next.js + Supabase
```

The CLI downloads the template from GitHub, installs dependencies, and you're ready to go.

## Templates

| Template | Description |
|---|---|
| **Next.js Boilerplate (Clean)** | Minimal Next.js starter with TypeScript, ESLint, Tailwind CSS |
| **Next.js + Shadcn UI** | Next.js with Shadcn UI component library pre-configured |
| **Next.js + Clerk Auth** | Next.js with Clerk authentication setup |
| **Next.js + Supabase** | Next.js with Supabase backend, auth flows, and protected routes |

## Project Structure

```
nextjs-cli-based-boilerplate/
├── apps/
│   └── templates/              # All project templates
│       ├── next-js-boilerplate/
│       ├── nextjs-shadcnui/
│       ├── nextjs-cleark-auth-starter-template/
│       └── nextjs-supabase-app/
├── packages/
│   ├── cli-node/               # Node.js CLI (published to npm)
│   ├── cli-go/                 # Go CLI
│   └── cli-rust/               # Rust CLI
├── biome.json                  # Linter & formatter config
├── turbo.json                  # Turborepo config
├── pnpm-workspace.yaml         # pnpm workspace config
└── package.json
```

## Tech Stack

- **Monorepo**: Turborepo + pnpm workspaces
- **Linting/Formatting**: Biome
- **Node CLI**: prompts, giget, execa
- **Go CLI**: Cobra
- **Rust CLI**: Clap, dialoguer

## Available Scripts

Run from the root directory:

```bash
# Linting & Formatting
pnpm lint              # Check lint errors
pnpm lint:fix          # Fix lint errors
pnpm format            # Format all files

# Node CLI
pnpm cli:node          # Run Node CLI locally
pnpm cli:node:publish  # Publish to npm

# Go CLI
pnpm cli:go:build      # Build Go binary
pnpm cli:go:run        # Run Go CLI locally

# Rust CLI
pnpm cli:rust:build    # Build Rust binary (release)
pnpm cli:rust:run      # Run Rust CLI locally
```

## Contributing

### Prerequisites

- [Node.js](https://nodejs.org/) >= 18
- [pnpm](https://pnpm.io/) >= 10
- [Go](https://go.dev/) >= 1.21 (for Go CLI)
- [Rust](https://www.rust-lang.org/) >= 1.75 (for Rust CLI)

### Setup

1. **Clone the repo**

```bash
git clone https://github.com/zonaetmunna/nextjs-cli-based-boilerplate.git
cd nextjs-cli-based-boilerplate
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Run the CLI locally**

```bash
pnpm cli:node
```

### Adding a New Template

1. Create a new folder inside `apps/templates/` with your Next.js project
2. Make sure it has a `package.json` with a `dev` script
3. Update the template list in:
   - `packages/cli-node/bin/nx-next.js` — add to `TEMPLATES` array
   - `packages/cli-go/main.go` — add to `templates` map
   - `packages/cli-rust/src/main.rs` — add to `get_templates()` and `template_keys`
4. Commit and push — the CLI downloads templates directly from GitHub

### Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes
4. Run lint: `pnpm lint`
5. Commit: `git commit -m "feat: add my feature"`
6. Push: `git push origin feature/my-feature`
7. Open a Pull Request

### Commit Convention

Use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — new feature
- `fix:` — bug fix
- `docs:` — documentation changes
- `refactor:` — code refactoring
- `chore:` — maintenance tasks

## License

ISC
