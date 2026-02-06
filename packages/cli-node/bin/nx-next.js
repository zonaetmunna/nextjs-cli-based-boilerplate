#!/usr/bin/env node

import prompts from "prompts";
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.resolve(__dirname, "../../../apps/templates");

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
    choices: [
      { title: "Next.js Boilerplate (Clean)", value: "next-js-boilerplate" },
      { title: "Next.js + Shadcn UI", value: "nextjs-shadcnui" },
      { title: "Next.js + Clerk Auth", value: "nextjs-cleark-auth-starter-template" },
      { title: "Next.js + Supabase", value: "nextjs-supabase-app" },
    ],
  },
]);

if (!response.projectName || response.template === undefined) {
  console.log("Cancelled.");
  process.exit(0);
}

const { projectName, template } = response;
const templatePath = path.join(TEMPLATES_DIR, template);
const destPath = path.resolve(process.cwd(), projectName);

if (!fs.existsSync(templatePath)) {
  console.error(`Template not found: ${templatePath}`);
  process.exit(1);
}

if (fs.existsSync(destPath)) {
  console.error(`Directory already exists: ${destPath}`);
  process.exit(1);
}

fs.copySync(templatePath, destPath, {
  filter: (src) => !src.includes("node_modules") && !src.includes(".next"),
});

console.log(`\nTemplate copied to ${projectName}`);

await execa("pnpm", ["install"], { cwd: destPath, stdio: "inherit" });

console.log(`\nProject '${projectName}' created with '${template}' template!`);
console.log(`\n  cd ${projectName}`);
console.log("  pnpm dev\n");
