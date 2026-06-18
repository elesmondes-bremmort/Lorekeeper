const fs = require("fs");
const path = require("path");
const AdmZip = require("adm-zip");

const root = path.resolve(__dirname, "..");
const distDir = path.join(root, "dist");
const stagingDir = path.join(distDir, "lorekeeper");
const zipPath = path.join(distDir, "lorekeeper.zip");
const moduleJsonPath = path.join(root, "module.json");

const packageItems = [
  "module.json",
  "README.md",
  "CHANGELOG.md",
  "LICENSE",
  "scripts",
  "styles",
  "templates",
  "lang",
  "tests"
];

function readModuleVersion() {
  const manifest = JSON.parse(fs.readFileSync(moduleJsonPath, "utf8"));
  if (!manifest.version) throw new Error("module.json is missing a version.");
  return manifest.version;
}

function copyRecursive(source, destination) {
  const stats = fs.statSync(source);
  if (stats.isDirectory()) {
    fs.mkdirSync(destination, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      copyRecursive(path.join(source, entry), path.join(destination, entry));
    }
    return;
  }
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(source, destination);
}

function stageFiles() {
  fs.rmSync(stagingDir, { recursive: true, force: true });
  fs.mkdirSync(stagingDir, { recursive: true });

  for (const item of packageItems) {
    const source = path.join(root, item);
    if (!fs.existsSync(source)) throw new Error(`Missing package item: ${item}`);
    copyRecursive(source, path.join(stagingDir, item));
  }
}

function createZip() {
  fs.rmSync(zipPath, { force: true });
  const zip = new AdmZip();
  for (const item of fs.readdirSync(stagingDir)) {
    const source = path.join(stagingDir, item);
    if (fs.statSync(source).isDirectory()) zip.addLocalFolder(source, item);
    else zip.addLocalFile(source);
  }
  zip.writeZip(zipPath);
}

function verifyZip() {
  const zip = new AdmZip(zipPath);
  const entries = zip.getEntries().map((entry) => entry.entryName);
  if (!entries.includes("module.json")) {
    throw new Error("Package verification failed: module.json is not at the zip root.");
  }
  const hasParentFolder = entries.some((entry) => entry.startsWith("Lorekeeper-main/") || entry.startsWith("Lorekeeper/"));
  if (hasParentFolder) {
    throw new Error("Package verification failed: zip contains a parent Lorekeeper folder.");
  }
}

function main() {
  const version = readModuleVersion();
  fs.mkdirSync(distDir, { recursive: true });
  stageFiles();
  createZip();
  verifyZip();
  console.log(`Lorekeeper ${version} packaged successfully: ${path.relative(root, zipPath)}`);
}

main();
