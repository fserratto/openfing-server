import chokidar from "chokidar";
import { glob } from "glob";
import { debounce } from "lodash";
import path from "path";

import { writeFormattedFile } from "../_utils/writeFormattedFile";
import { dangerousKeysOf } from "../../src/_utils/dangerousKeysOf";
import { projectPath } from "../../src/_utils/projectPath";
import { generateFilesConfig } from "./generateFilesConfig";

export const generateResolvers = async () => {
	const resolversFilePath = path.resolve(generateFilesConfig.generatedFolderPath, "resolvers.ts");
	const generatedTypesFilePath = path.resolve(generateFilesConfig.generatedFolderPath, "graphql.types.ts");
	const resolversFolderPath = path.resolve(projectPath, "src", "resolvers");
	const resolverFilesGlob = path.resolve(resolversFolderPath, "**", "*.resolver.ts");

	const run = async () => {
		const resolverFilesPaths = (
			await new Promise<string[]>((resolve, reject) =>
				glob(resolverFilesGlob, (error, files) => {
					if (error) reject(error);
					else resolve(files);
				})
			)
		).sort();

		type FieldResolverMetadata = {
			type: "field-resolver";
			filePath: string;
			symbolName: string;
			resolverName: string;
			parent: string;
		};

		type ScalarResolverMetadata = {
			type: "scalar-resolver";
			filePath: string;
			symbolName: string;
			resolverName: string;
		};

		const resolverMetadatas: Array<FieldResolverMetadata | ScalarResolverMetadata> = resolverFilesPaths.map(
			(filePath) => {
				const isFieldResolver = path.relative(resolversFolderPath, filePath).split(path.sep).length === 2;

				return isFieldResolver
					? {
							type: "field-resolver",
							filePath,
							symbolName: `${path
								.relative(resolversFolderPath, filePath)
								.replace(".resolver.ts", "")
								.replace("/", "_")}Resolver`,
							parent: path.basename(path.resolve(filePath, "..")),
							resolverName: path.basename(filePath).replace(".resolver.ts", ""),
					  }
					: {
							type: "scalar-resolver",
							filePath,
							symbolName: `${path
								.relative(resolversFolderPath, filePath)
								.replace(".resolver.ts", "")
								.replace("/", "_")}Resolver`,
							resolverName: path.basename(filePath).replace(".resolver.ts", ""),
					  };
			}
		);

		const relativeImport = (relativePath: string) =>
			relativePath.startsWith(".") ? relativePath : "./" + relativePath;

		const imports = [
			`import { Resolvers } from "${relativeImport(
				path.relative(path.resolve(resolversFilePath, ".."), generatedTypesFilePath.replace(/\.[^.]+$/, ""))
			)}";`,
			...resolverMetadatas.map(
				(fileMetadata) =>
					`import ${fileMetadata.symbolName} from "${path.relative(
						path.resolve(resolversFilePath, ".."),
						fileMetadata.filePath.replace(/\.[^.]+$/, "")
					)}";`
			),
		];

		const printObject = (fieldResolverMetadatas: FieldResolverMetadata[]): string => {
			return `{\n ${fieldResolverMetadatas
				.map((metadata) => `${metadata.resolverName}: ${metadata.symbolName}`)
				.join(",\n")} \n}`;
		};

		const parsedFileMetadataMap: Record<string, FieldResolverMetadata[] | ScalarResolverMetadata> = {};

		resolverMetadatas.forEach((metadata) => {
			if (metadata.type === "scalar-resolver") parsedFileMetadataMap[metadata.resolverName] = metadata;
			else if (parsedFileMetadataMap[metadata.parent])
				(parsedFileMetadataMap[metadata.parent] as FieldResolverMetadata[]).push(metadata);
			else parsedFileMetadataMap[metadata.parent] = [metadata];
		});

		await writeFormattedFile(
			resolversFilePath,
			`${imports.join("\n")}\n\n` +
				`export const resolvers: Resolvers = {\n${dangerousKeysOf(parsedFileMetadataMap)
					.map((key) => {
						const value = parsedFileMetadataMap[key];

						return `${key}: ${Array.isArray(value) ? printObject(value) : value.symbolName}`;
					})
					.join(",")}\n};`
		);
	};

	if (!generateFilesConfig.watch) {
		await run();
		return;
	}

	const debounceRun = debounce(run, 3000);

	const graphqlFilesWatcher = chokidar.watch(resolverFilesGlob, {
		ignoreInitial: false,
	});

	graphqlFilesWatcher.on("add", debounceRun);
	graphqlFilesWatcher.on("change", debounceRun);
	graphqlFilesWatcher.on("unlink", debounceRun);
};
