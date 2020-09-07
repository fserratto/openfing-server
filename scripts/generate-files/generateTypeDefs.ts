import chokidar from "chokidar";
import { glob } from "glob";
import { debounce } from "lodash";
import path from "path";

import { writeFormattedFile } from "../_utils/writeFormattedFile";
import { projectPath } from "../../src/_utils/projectPath";
import { generateFilesConfig } from "./generateFilesConfig";

export const generateTypeDefs = async () => {
	const typeDefsFilePath = path.resolve(generateFilesConfig.generatedFolderPath, "typeDefs.ts");
	const schemaFilesGlob = path.resolve(projectPath, "src", "schemas", "*.schema.ts");

	const run = async () => {
		const files = await new Promise<string[]>((resolve, reject) =>
			glob(schemaFilesGlob, (error, files) => {
				if (error) reject(error);
				else resolve(files);
			})
		);

		const getSymbolFromFilePath = (filePath: string) => `${path.basename(filePath).replace(".schema.ts", "")}Doc`;

		const imports = [
			`import { DocumentNode } from "graphql";\n`,
			...files.map(
				(file) =>
					`import ${getSymbolFromFilePath(file)} from "${path.relative(
						path.resolve(typeDefsFilePath, ".."),
						file.replace(/\.[^.]+$/, "")
					)}";`
			),
		];

		await writeFormattedFile(
			typeDefsFilePath,
			`${imports.join("\n")}\n\n` +
				`export const typeDefs: DocumentNode[] = [${files
					.map((filePath) => getSymbolFromFilePath(filePath))
					.join(",")}]`
		);
	};

	if (!generateFilesConfig.watch) {
		await run();
		return;
	}

	const debounceRun = debounce(run, 3000);

	const graphqlFilesWatcher = chokidar.watch(schemaFilesGlob, {
		ignoreInitial: true,
	});

	graphqlFilesWatcher.on("add", debounceRun);
	graphqlFilesWatcher.on("change", debounceRun);
	graphqlFilesWatcher.on("unlink", debounceRun);
};
