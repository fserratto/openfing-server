import { executeCodegen } from "@graphql-codegen/cli";
import * as typescriptPlugin from "@graphql-codegen/typescript";
import * as typescriptResolversPlugin from "@graphql-codegen/typescript-resolvers";
import chokidar from "chokidar";
import { glob } from "glob";
import { GraphQLSchema, printSchema } from "graphql";
import debounce from "lodash/debounce";
import { autorun, IObservableValue } from "mobx";
import path from "path";

import { writeFormattedFile } from "../_utils/writeFormattedFile";
import { projectPath } from "../../src/_utils/projectPath";
import { generateFilesConfig } from "./generateFilesConfig";

export type GenerateGraphqlOptions = {
	schemaBox: IObservableValue<GraphQLSchema>;
};

export const generateGraphqlTypes = async (options: GenerateGraphqlOptions) => {
	const typesFilePath = path.resolve(generateFilesConfig.generatedFolderPath, "graphql.types.ts");
	const parentFilesGlob = path.resolve(projectPath, "src", "resolvers", "**", "*.parent.ts");

	const run = async () => {
		const schema = printSchema(options.schemaBox.get());
		const parentFilesPaths = (
			await new Promise<string[]>((resolve, reject) =>
				glob(parentFilesGlob, (error, files) => {
					if (error) reject(error);
					else resolve(files);
				})
			)
		).sort();

		const parentFilesMetadata = parentFilesPaths.map((parentFilePath) => {
			return {
				importPath: path.relative(path.resolve(typesFilePath, ".."), parentFilePath.replace(/\.[^.]+$/, "")),
				symbolName: path.basename(parentFilePath).replace(".parent.ts", "") + "Parent",
			};
		});

		const codegenResult = await executeCodegen({
			silent: true,
			schema,
			pluginLoader: (name) => {
				if (name.endsWith("typescript")) return typescriptPlugin;
				if (name.endsWith("typescriptResolvers")) return typescriptResolversPlugin;

				throw new Error(name + " not found");
			},
			generates: {
				[typesFilePath]: {
					plugins: [
						{
							typescript: {
								nonOptionalTypename: true,
							},
						},
						{
							typescriptResolvers: {
								contextType: "../Context#Context",
								avoidOptionals: true,
								mappers: {
									...parentFilesMetadata.reduce(
										(prev, value) => ({
											...prev,
											[value.symbolName.replace(
												/Parent$/,
												""
											)]: `${value.importPath}#${value.symbolName}`,
										}),
										{}
									),
								},
							},
						},
					],
				},
			},
		});

		await Promise.all(
			codegenResult.map((result) =>
				writeFormattedFile(
					result.filename,
					`import { OptionalUndefinedKeys, SafeOmit } from "${path.relative(
						path.resolve(result.filename, ".."),
						path.resolve(projectPath, "src", "_utils", "utilTypes")
					)}";\n` +
						result.content.replace(/\bResolvers\b/g, "_Resolvers") +
						`\n` +
						`export type ResolversByParent<TResolvers, TParent> = OptionalUndefinedKeys<
						{
							[TResolverKey in keyof TResolvers]: TResolverKey extends keyof TParent
								? TResolvers[TResolverKey] extends Resolver<infer TResolverValueType, any, any, any>
									? TParent[TResolverKey] extends TResolverValueType
										? TResolvers[TResolverKey] | undefined
										: TResolvers[TResolverKey]
									: TResolvers[TResolverKey]
								: TResolvers[TResolverKey];
						}
					>;\n\n` +
						`export type CustomResolvers = {\n${parentFilesMetadata
							.map(
								(metadata) =>
									`${metadata.symbolName.replace(
										/Parent$/,
										""
									)}: ResolversByParent<_Resolvers["${metadata.symbolName.replace(
										/Parent$/,
										""
									)}"], ${metadata.symbolName}>;`
							)
							.join("\n")}\n};` +
						"\n\n" +
						`export type Resolvers = SafeOmit<_Resolvers, keyof CustomResolvers> & CustomResolvers;\n`
				)
			)
		);
	};

	if (!generateFilesConfig.watch) {
		await run();
		return;
	}

	autorun(run);

	const debounceRun = debounce(run, 3000);

	const graphqlFilesWatcher = chokidar.watch(parentFilesGlob, {
		ignoreInitial: true,
	});

	graphqlFilesWatcher.on("add", debounceRun);
	graphqlFilesWatcher.on("change", debounceRun);
	graphqlFilesWatcher.on("unlink", debounceRun);
};
