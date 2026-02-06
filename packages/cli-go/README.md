# nx-next (Go CLI)

A Go-based CLI to scaffold Next.js projects with pre-configured templates.

## Installation

### From GitHub Releases

Download the binary for your platform from [Releases](https://github.com/zonaetmunna/nextjs-cli-based-boilerplate/releases).

### From Source

```bash
go install github.com/zonaetmunna/nextjs-cli-based-boilerplate/packages/cli-go@latest
```

### Build Locally

```bash
git clone https://github.com/zonaetmunna/nextjs-cli-based-boilerplate.git
cd nextjs-cli-based-boilerplate
pnpm cli:go:build
```

## Usage

```bash
# Interactive (flags required)
nx-next -n my-app -t clean

# With template selection
nx-next --name my-app --template shadcn
```

### Available Flags

| Flag | Short | Description | Required |
|---|---|---|---|
| `--name` | `-n` | Project name | Yes |
| `--template` | `-t` | Template to use (default: `clean`) | No |

### Template Keys

| Key | Template |
|---|---|
| `clean` | Next.js Boilerplate (Clean) |
| `shadcn` | Next.js + Shadcn UI |
| `clerk` | Next.js + Clerk Auth |
| `supabase` | Next.js + Supabase |

## Example

```bash
$ nx-next -n my-app -t shadcn

Template copied to ./my-app
Installing dependencies...

Project 'my-app' created with 'shadcn' template!

  cd my-app
  pnpm dev
```

## Cross-Platform Build

```bash
# Windows
GOOS=windows GOARCH=amd64 go build -o nx-next-windows.exe main.go

# Linux
GOOS=linux GOARCH=amd64 go build -o nx-next-linux main.go

# macOS
GOOS=darwin GOARCH=amd64 go build -o nx-next-macos main.go
```

## Requirements

- pnpm installed on the system (for dependency installation)

## License

ISC
