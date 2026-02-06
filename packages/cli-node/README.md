# create-nx-next

Scaffold Next.js projects with pre-configured templates in seconds.

## Usage

```bash
npx create-nx-next
```

Or install globally:

```bash
npm i -g create-nx-next
nx-next
```

## Templates

| Template | What's included |
|---|---|
| **Next.js Boilerplate (Clean)** | TypeScript, ESLint, Tailwind CSS |
| **Next.js + Shadcn UI** | Shadcn UI components, Tailwind CSS |
| **Next.js + Clerk Auth** | Clerk authentication, protected routes |
| **Next.js + Supabase** | Supabase client/server, auth flows, protected routes |

## How It Works

1. Run the command
2. Enter a project name
3. Pick a template
4. Template is downloaded from GitHub
5. Dependencies are installed automatically

```
$ npx create-nx-next

  create-nx-next - Next.js Boilerplate CLI

? Project name: my-app
? Choose a template:
  > Next.js Boilerplate (Clean) - Minimal Next.js starter
    Next.js + Shadcn UI - Next.js with Shadcn UI components
    Next.js + Clerk Auth - Next.js with Clerk authentication
    Next.js + Supabase - Next.js with Supabase backend

Downloading template...
Template downloaded.
Installing dependencies...

Project 'my-app' is ready!

  cd my-app
  pnpm dev
```

## Requirements

- Node.js >= 18
- pnpm (recommended) or npm

## Links

- [GitHub](https://github.com/zonaetmunna/nextjs-cli-based-boilerplate)
- [Report Issues](https://github.com/zonaetmunna/nextjs-cli-based-boilerplate/issues)

## License

ISC
