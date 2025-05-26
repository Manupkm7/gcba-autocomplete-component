const path = require("path");
const resolve = require("@rollup/plugin-node-resolve").default;
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const terser = require("@rollup/plugin-terser").default;
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const dts = require("rollup-plugin-dts").default;
const alias = require("@rollup/plugin-alias");
const postcss = require("rollup-plugin-postcss");

const packageJson = require("./package.json");

const projectRootDir = path.resolve(__dirname);

module.exports = [
  {
    input: "src/index.tsx",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    external: ["react", "react-dom", "axios", "lucide-react"],
    plugins: [
      peerDepsExternal(),
      alias({
        entries: [
          { find: "@", replacement: path.resolve(projectRootDir, "src") },
        ],
      }),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.build.json" }),
      terser(),
      postcss({
        extract: "style.css",
        plugins: [require("@tailwindcss/postcss")(), require("autoprefixer")],
      }),
    ],
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
