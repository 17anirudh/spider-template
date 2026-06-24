import Pic from "@/components/image/Pic";

export default function Home() {
  return (
    <main>
      <div className="flex flex-wrap justify-center items-center gap-6">
        <Pic id="logo" src="/image.png" alt="Logo" look="avatar" className="rounded-full" />
        <h1>Starter Pack</h1>
      </div>
      <p>
        This is a starter template for Next.js 16 prebuild with compatible add-ons and custom components
      </p>
      <h3>Dependencies</h3>
      <ul>
        <li>Next.js v16.2.9</li>
        <li>Shadcn UI v4.11.0</li>
        <li>Phosper Icons v2.1.10</li>
        <li>Tanstack React Query v5.101.1</li>
        <li>React v19.2.7</li>
        <li>Zod v4.4.3</li>
        <li>Base UI v1.6.0</li>
      </ul>
      <h3>Dev Dependencies</h3>
      <ul>
        <li>Biome v2.5.1</li>
        <li>Tailwind/postcss v4</li>
        <li>TypeScript v6.0.3</li>
        <li>Bun.js v1.3.14</li>
      </ul>
      <h3>Type-safe and responsive components</h3>
      <ul>
        <li>Declarative next/image wrapper</li>
        <li>Declarative React hook form with zod validation wrapper</li>
        <li>Declarative navbar</li>
      </ul>
      <h3>Next.js app router helper script</h3>
      <p className="flex flex-col">
        <span>Run</span>
        <code>bun run create &lt;page-name&gt;</code>
        <span>to create a new page with router specific files</span>
      </p>
    </main>
  );
}
