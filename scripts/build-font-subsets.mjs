import { createHash } from "node:crypto";
import {
  copyFileSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = join(root, "public/fonts");
const allowedExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".jsx",
  ".json",
  ".ts",
  ".tsx",
]);

function collectFiles(path) {
  if (statSync(path).isFile()) return [path];
  return readdirSync(path, { withFileTypes: true }).flatMap((entry) => {
    const child = join(path, entry.name);
    return entry.isDirectory() ? collectFiles(child) : [child];
  });
}

const corpusFiles = [join(root, "src"), join(root, "index.html")]
  .flatMap(collectFiles)
  .filter((path) => allowedExtensions.has(extname(path)));
const safetyCharacters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789，。！？；：、“”‘’（）《》〈〉【】—…·～↗←→↑↓＋×ⅠⅡⅢⅣⅤⅥ";
const corpus =
  corpusFiles.map((path) => readFileSync(path, "utf8")).join("\n") +
  safetyCharacters;
const glyphs = [...new Set(corpus)].join("");

const faces = [
  {
    family: "Noto Sans SC",
    weight: 400,
    packageName: "noto-sans-sc",
    file: "noto-sans-sc-400-subset.woff2",
  },
  {
    family: "Noto Sans SC",
    weight: 600,
    packageName: "noto-sans-sc",
    file: "noto-sans-sc-600-subset.woff2",
  },
  {
    family: "Noto Sans SC",
    weight: 700,
    packageName: "noto-sans-sc",
    file: "noto-sans-sc-700-subset.woff2",
  },
  {
    family: "Noto Serif SC",
    weight: 400,
    packageName: "noto-serif-sc",
    file: "noto-serif-sc-400-subset.woff2",
  },
  {
    family: "Noto Serif SC",
    weight: 500,
    packageName: "noto-serif-sc",
    file: "noto-serif-sc-500-subset.woff2",
  },
];

mkdirSync(outputDir, { recursive: true });
for (const face of faces) {
  const input = join(
    root,
    "node_modules/@fontsource",
    face.packageName,
    "files",
    `${face.packageName}-chinese-simplified-${face.weight}-normal.woff2`,
  );
  const output = join(outputDir, face.file);
  const result = spawnSync(
    process.env.PYFTSUBSET || "pyftsubset",
    [
      input,
      `--text=${glyphs}`,
      `--output-file=${output}`,
      "--flavor=woff2",
      "--layout-features=*",
      "--name-IDs=*",
      "--name-legacy",
      "--name-languages=*",
      "--notdef-glyph",
      "--notdef-outline",
      "--recommended-glyphs",
    ],
    { encoding: "utf8" },
  );
  if (result.status !== 0) {
    throw new Error(result.stderr || `pyftsubset failed for ${face.file}`);
  }
}

copyFileSync(
  join(root, "node_modules/@fontsource/noto-sans-sc/LICENSE"),
  join(outputDir, "ofl-noto-sc.txt"),
);

const packages = Object.fromEntries(
  ["noto-sans-sc", "noto-serif-sc"].map((packageName) => {
    const metadata = JSON.parse(
      readFileSync(
        join(root, "node_modules/@fontsource", packageName, "metadata.json"),
        "utf8",
      ),
    );
    const packageJson = JSON.parse(
      readFileSync(
        join(root, "node_modules/@fontsource", packageName, "package.json"),
        "utf8",
      ),
    );
    return [
      packageName,
      {
        fontVersion: metadata.version,
        packageVersion: packageJson.version,
        source: metadata.source,
        license: metadata.license.type,
      },
    ];
  }),
);

const manifest = {
  corpus: corpusFiles.map((path) => relative(root, path)),
  packages,
  webEmbedding: "permitted under SIL Open Font License 1.1",
  licenseFile: "public/fonts/ofl-noto-sc.txt",
  faces: faces.map((face) => {
    const path = join(outputDir, face.file);
    const contents = readFileSync(path);
    return {
      family: face.family,
      weight: face.weight,
      path: `public/fonts/${face.file}`,
      bytes: contents.byteLength,
      sha256: createHash("sha256").update(contents).digest("hex"),
    };
  }),
};

writeFileSync(
  join(outputDir, "font-manifest.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);

for (const face of manifest.faces) {
  console.log(`${face.path}: ${face.bytes} bytes (${face.sha256})`);
}
