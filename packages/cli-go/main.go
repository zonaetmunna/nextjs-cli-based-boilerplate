package main

import (
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
)

var templates = map[string]string{
	"clean":    "next-js-boilerplate",
	"shadcn":   "nextjs-shadcnui",
	"clerk":    "nextjs-cleark-auth-starter-template",
	"supabase": "nextjs-supabase-app",
}

func copyDir(src string, dest string) error {
	return filepath.Walk(src, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Skip node_modules and .next
		if info.IsDir() && (info.Name() == "node_modules" || info.Name() == ".next") {
			return filepath.SkipDir
		}

		relPath, err := filepath.Rel(src, path)
		if err != nil {
			return err
		}

		target := filepath.Join(dest, relPath)

		if info.IsDir() {
			return os.MkdirAll(target, info.Mode())
		}

		srcFile, err := os.Open(path)
		if err != nil {
			return err
		}
		defer srcFile.Close()

		destFile, err := os.Create(target)
		if err != nil {
			return err
		}
		defer destFile.Close()

		_, err = io.Copy(destFile, srcFile)
		return err
	})
}

func main() {
	var projectName string
	var templateKey string

	// Build valid template keys for help text
	var validKeys []string
	for k := range templates {
		validKeys = append(validKeys, k)
	}

	var rootCmd = &cobra.Command{
		Use:   "nx-next",
		Short: "CLI to scaffold Next.js boilerplate projects",
		RunE: func(cmd *cobra.Command, args []string) error {
			// Resolve template folder name
			templateDir, ok := templates[templateKey]
			if !ok {
				return fmt.Errorf("unknown template '%s'. Valid options: %s", templateKey, strings.Join(validKeys, ", "))
			}

			// Resolve paths relative to executable
			exePath, err := os.Executable()
			if err != nil {
				return fmt.Errorf("failed to resolve executable path: %w", err)
			}
			baseDir := filepath.Dir(exePath)
			templatePath := filepath.Join(baseDir, "../../apps/templates", templateDir)
			destPath := filepath.Join("./", projectName)

			// Check template exists
			if _, err := os.Stat(templatePath); os.IsNotExist(err) {
				return fmt.Errorf("template not found: %s", templatePath)
			}

			// Check dest doesn't exist
			if _, err := os.Stat(destPath); err == nil {
				return fmt.Errorf("directory already exists: %s", destPath)
			}

			err = copyDir(templatePath, destPath)
			if err != nil {
				return fmt.Errorf("error copying template: %w", err)
			}

			fmt.Println("Template copied to", destPath)

			// Run pnpm install
			cmdInstall := exec.Command("pnpm", "install")
			cmdInstall.Dir = destPath
			cmdInstall.Stdout = os.Stdout
			cmdInstall.Stderr = os.Stderr
			if err := cmdInstall.Run(); err != nil {
				return fmt.Errorf("pnpm install failed: %w", err)
			}

			fmt.Printf("\nProject '%s' created with '%s' template!\n", projectName, templateKey)
			fmt.Printf("\n  cd %s\n  pnpm dev\n\n", projectName)
			return nil
		},
	}

	rootCmd.Flags().StringVarP(&projectName, "name", "n", "", "Project name (required)")
	rootCmd.Flags().StringVarP(&templateKey, "template", "t", "clean", "Template: clean, shadcn, clerk, supabase")
	rootCmd.MarkFlagRequired("name")

	if err := rootCmd.Execute(); err != nil {
		os.Exit(1)
	}
}
