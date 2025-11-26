import { build } from "esbuild";
import fs from "fs";
import { copyFolder } from "./src/utils/helper.js";

async function bundle() {
  // Create required folders
  fs.mkdirSync("dist", { recursive: true });
  fs.mkdirSync("dist/popup", { recursive: true });
  fs.mkdirSync("dist/assets", { recursive: true });
  copyFolder("src/assets", "dist/assets");

  // Copy static files
  fs.copyFileSync("src/popup/popup.html", "dist/popup/popup.html");
  fs.copyFileSync("src/content_style.css", "dist/content_style.css");
  fs.copyFileSync("src/manifest.json", "dist/manifest.json");

  // Bundle JS files
  await build({
    entryPoints: ["src/background.js", "src/content.js", "src/popup/popup.js"],
    outdir: "dist",
    bundle: true,
    format: "esm",
    target: "chrome120",
    minify: false,
  });

  console.log("Build complete!");
}

bundle();
