import { $ } from "bun";
import chalk from "chalk";

const route = process.argv[2];

if (!route || route.trim() === "") {
  console.error(chalk.red("Provide a proper route path (e.g., dashboard)"));
  process.exit(1);
}

let arr: string[] = []
route.includes("/") ? arr = route.split("/") : arr.push(route);

await $`cd app`;
for (const part of arr) {
    await $`mkdir -p ${part}`;
    await $`cd ${part}`;
}
const layout =`import type { ReactNode } from "react";

type Props = { children: ReactNode }

export default function({ children }: Props) {
    return <div>{children}</div>
};`

const page =`
export default function() {
    return <main></main>
}`

await $`echo "${layout}" > app/${route}/layout.tsx`;
await $`echo "${page}" > app/${route}/page.tsx`;