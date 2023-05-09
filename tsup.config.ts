import { Options } from "tsup";

const options: Options = {
  entry: ["src", "!src/**/__tests__", "knexfile.ts", "database/migrations"],
  outDir: "dist",
  clean: true,
  minify: true,
};

export default options;
