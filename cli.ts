import { $ } from "bun";
import path from "path";
import chalk from "chalk";

const layout =`import type { ReactNode } from "react";

type Props = { children: ReactNode }

export default function({ children }: Props) {
    return (
        <>
            {children}
        </>
    )
};
`
const page = (targetPath: string) => `export default function() {
    return (
        <main>
            <pre>${targetPath}/page.tsx</pre>
        </main>
    )
}`
async function parseInputPath(rawInput: string | undefined): Promise<string[]> {
  if (!rawInput || rawInput.trim() === "" || rawInput.startsWith("app")) {
    console.error(chalk.red("Provide a valid path argument (not starting with 'app')."));
    process.exit(1);
  }
  return rawInput.split("/");
}

async function createNextFiles(targetPath: string[]): Promise<void> {
  const dirPath = path.join("app", targetPath.join("/"));
  await $`mkdir -p ${dirPath}`;
  const pageFile = Bun.file(path.join(dirPath, "page.tsx"));
  const layoutFile = Bun.file(path.join(dirPath, "layout.tsx"));
  await Bun.write(pageFile, page(targetPath.join("/")));
  await Bun.write(layoutFile, layout);
  console.log(chalk.green("Created Next.js route files"));
}

async function appendToNavbarRoutes(targetPath: string): Promise<void> {
  const navbarFilePath = "components/navbar.tsx";
  const file = Bun.file(navbarFilePath);

  if (!(await file.exists())) {
    console.error(chalk.red("Internal error: navbat.tsx not found or deleted"));
    console.log(chalk.cyan("Ended the process only by creating the files"));
    return;
  }

  let content = await file.text();
  const pathSegments = targetPath.split("/");
  const lastSegment = pathSegments[pathSegments.length - 1];
  const labelName = lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  const keyName = targetPath.replace(/[^a-zA-Z0-9]/g, "_");
  const newEntry = `    "${keyName}": {\n        label: "${labelName}",\n        path: "/${targetPath}",\n        icon: HouseLineIcon, // Defaulting icon\n    },\n`;
  if (content.includes("const routes: Path = {")) {
    content = content.replace("const routes: Path = {", `const routes: Path = {\n${newEntry}`);
    await Bun.write(file, content);
    console.log(chalk.green("Added the route to the navbar"));
  } else {
    console.error(chalk.red("Internal error"));
  }
}

async function main(): Promise<void> {
    try {
        const rawInput = process.argv[2];
        const targetPath: string[] = await parseInputPath(rawInput);
        console.log(chalk.cyan("Processing the request"));
        await createNextFiles(targetPath);
        await appendToNavbarRoutes(targetPath.join("/"));
        console.log(chalk.green("Task completed successfully! Enjoy coding ^⁠_⁠^"));
    }
    catch (error) {
        console.error(chalk.red("❌ Error:"), error);
        process.exit(1);
    }
}

main().catch(console.error);