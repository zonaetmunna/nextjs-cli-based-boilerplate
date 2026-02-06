#!/usr/bin/env node

import prompts from "prompts";
import { downloadTemplate } from "giget";
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";

const REPO = "zonaetmunna/nextjs-cli-based-boilerplate";

const TEMPLATES = [
  {
    title: "Next.js Boilerplate (Clean)",
    value: "next-js-boilerplate",
    description: "Minimal Next.js starter",
  },
  {
    title: "Next.js + Shadcn UI",
    value: "nextjs-shadcnui",
    description: "Next.js with Shadcn UI components",
  },
  {
    title: "Next.js + Clerk Auth",
    value: "nextjs-cleark-auth-starter-template",
    description: "Next.js with Clerk authentication",
  },
  {
    title: "Next.js + Supabase",
    value: "nextjs-supabase-app",
    description: "Next.js with Supabase backend",
  },
];

console.log("\n  create-nx-next - Next.js Boilerplate CLI\n");

const response = await prompts([
  {
    type: "text",
    name: "projectName",
    message: "Project name:",
    validate: (v) => (v.length > 0 ? true : "Project name is required"),
  },
  {
    type: "select",
    name: "template",
    message: "Choose a template:",
    choices: TEMPLATES,
  },
]);

if (!response.projectName || response.template === undefined) {
  console.log("\nCancelled.");
  process.exit(0);
}

const { projectName, template } = response;
const destPath = path.resolve(process.cwd(), projectName);

if (fs.existsSync(destPath)) {
  console.error(`\nDirectory already exists: ${destPath}`);
  process.exit(1);
}

console.log(`\nDownloading template...`);

try {
  await downloadTemplate(`gh:${REPO}/apps/templates/${template}`, {
    dir: destPath,
    force: true,
  });
} catch (err) {
  console.error(`\nFailed to download template: ${err.message}`);
  process.exit(1);
}

console.log("Template downloaded.");

// Install dependencies
console.log("Installing dependencies...\n");
await execa("pnpm", ["install"], { cwd: destPath, stdio: "inherit" });

console.log(`\nProject '${projectName}' is ready!\n`);
console.log(`  cd ${projectName}`);
console.log("  pnpm dev\n");
