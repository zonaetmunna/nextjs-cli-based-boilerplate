use clap::Parser;
use dialoguer::{Input, Select};
use fs_extra::dir::{copy, CopyOptions};
use std::collections::HashMap;
use std::path::PathBuf;
use std::process::Command;

#[derive(Parser)]
#[command(name = "nx-next", about = "CLI to scaffold Next.js boilerplate projects")]
struct Args {
    /// Name of the project
    #[arg(short, long)]
    name: Option<String>,

    /// Template to use (clean, shadcn, clerk, supabase)
    #[arg(short, long)]
    template: Option<String>,
}

fn get_templates() -> HashMap<&'static str, &'static str> {
    HashMap::from([
        ("clean", "next-js-boilerplate"),
        ("shadcn", "nextjs-shadcnui"),
        ("clerk", "nextjs-cleark-auth-starter-template"),
        ("supabase", "nextjs-supabase-app"),
    ])
}

fn main() {
    let args = Args::parse();
    let templates = get_templates();
    let template_keys: Vec<&str> = vec!["clean", "shadcn", "clerk", "supabase"];

    // Step 1: Project name
    let project_name = match args.name {
        Some(name) => name,
        None => Input::new()
            .with_prompt("Project name")
            .interact_text()
            .unwrap(),
    };

    // Step 2: Template selection
    let template_key = match args.template {
        Some(t) => t,
        None => {
            let selection = Select::new()
                .with_prompt("Choose a template")
                .items(&template_keys)
                .default(0)
                .interact()
                .unwrap();
            template_keys[selection].to_string()
        }
    };

    // Step 3: Resolve template folder
    let template_dir = match templates.get(template_key.as_str()) {
        Some(dir) => dir,
        None => {
            eprintln!("Unknown template '{}'. Valid: {:?}", template_key, template_keys);
            std::process::exit(1);
        }
    };

    // Step 4: Resolve paths
    let mut template_path = PathBuf::from(env!("CARGO_MANIFEST_DIR"));
    template_path.push("../../apps/templates");
    template_path.push(template_dir);

    let dest_path = PathBuf::from(&project_name);

    if !template_path.exists() {
        eprintln!("Template not found: {}", template_path.display());
        std::process::exit(1);
    }

    if dest_path.exists() {
        eprintln!("Directory already exists: {}", dest_path.display());
        std::process::exit(1);
    }

    // Step 5: Copy template folder
    let mut options = CopyOptions::new();
    options.copy_inside = true;

    copy(&template_path, &dest_path, &options).expect("Failed to copy template");

    println!("\nTemplate copied to {}", project_name);

    // Step 6: Run pnpm install
    let status = Command::new("pnpm")
        .arg("install")
        .current_dir(&dest_path)
        .status()
        .expect("Failed to run pnpm install");

    if status.success() {
        println!(
            "\nProject '{}' created with '{}' template!",
            project_name, template_key
        );
        println!("\n  cd {}\n  pnpm dev\n", project_name);
    } else {
        eprintln!("pnpm install failed");
        std::process::exit(1);
    }
}
