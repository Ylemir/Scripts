import { rm, mkdir } from "fs/promises";
import path from "path";
import { minify } from "terser";
import { generateHTML } from "./template";

/* ── Config ── */

const CONFIG = {
  inputDir: "./bookmarklet",
  outputFile: "./dist/bookmarklet.html",
} as const;

/* ── Types ── */

interface BookmarkletResult {
  name: string;
  description: string;
  url: string;
}

/* ── Helpers ── */

/** Extract description from the first `//` comment line */
function parseDescription(code: string): string {
  const first = code.split("\n")[0]?.trim();
  return first?.startsWith("//") ? first.replace("//", "").trim() : "";
}

function fileNameToTitle(file: string): string {
  return path
    .basename(file, ".js")
    .replace(/[.-]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ── Build Pipeline ── */

async function buildBookmarklet(file: string): Promise<BookmarkletResult> {
  const code = await Bun.file(path.join(CONFIG.inputDir, file)).text();
  const description = parseDescription(code);

  const result = await minify(code, {
    mangle: { toplevel: true },
    compress: { drop_console: false },
    format: { comments: false },
  });

  if (!result.code) throw new Error("Minification returned empty result");

  const name = fileNameToTitle(file);
  const url = `javascript:${encodeURIComponent(`(function(){${result.code}})();`)}`;
  return { name, description, url };
}

async function build() {
  const start = performance.now();
  const distDir = path.dirname(CONFIG.outputFile);

  /* Clean & create output directory */
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  /* Discover source files */
  const glob = new Bun.Glob("*.js");
  const files: string[] = [];
  for await (const entry of glob.scan({ cwd: CONFIG.inputDir })) {
    if (!entry.endsWith(".config.js")) files.push(entry);
  }

  if (files.length === 0) {
    console.log("  No JS files found in %s", CONFIG.inputDir);
    return;
  }

  /* Build all bookmarklets (isolate per-file errors) */
  const results = await Promise.allSettled(files.map(buildBookmarklet));
  const bookmarklets: BookmarkletResult[] = [];

  for (let i = 0; i < results.length; i++) {
    const r = results[i];
    if (r.status === "fulfilled") {
      bookmarklets.push(r.value);
    } else {
      console.error("  ✗ Failed: %s — %s", files[i], r.reason);
    }
  }

  if (bookmarklets.length === 0) {
    console.log("  No bookmarklets were built successfully.");
    return;
  }

  /* Read version & generate output */
  const { version = "0.0.0" } = await Bun.file("package.json").json();

  const html = generateHTML(bookmarklets, version);
  await Bun.write(CONFIG.outputFile, html);

  const elapsed = ((performance.now() - start) / 1000).toFixed(2);
  const size = (Buffer.byteLength(html, "utf8") / 1024).toFixed(1);

  console.log("");
  console.log("  ✓ Built %d bookmarklet%s in %ss (%sKB)", bookmarklets.length, bookmarklets.length !== 1 ? "s" : "", elapsed, size);
  console.log("  → %s", CONFIG.outputFile);
  console.log("");
}

build().catch((err) => {
  console.error("Build failed:", err);
  process.exit(1);
});
