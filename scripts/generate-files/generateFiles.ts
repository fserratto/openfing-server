import { CodeFileLoader } from "@graphql-tools/code-file-loader";
import { loadSchema } from "@graphql-tools/load";
import chalk from "chalk";
import chokidar from "chokidar";
import { GraphQLSchema } from "graphql";
import debounce from "lodash/debounce";
import { IObservableValue, observable, when } from "mobx";
import path from "path";

import { fs } from "../../src/_utils/fs";
import { projectPath } from "../../src/_utils/projectPath";
import { generateFilesConfig } from "./generateFilesConfig";
import { generateGraphqlTypes } from "./generateGraphqlTypes";
import { generateResolvers } from "./generateResolvers";
import { generateTypeDefs } from "./generateTypeDefs";

(async () => {
	const schemaFilesGlob = path.resolve(projectPath, "src", "schemas", "*.schema.ts");
	const getSchema = () => loadSchema(schemaFilesGlob, { loaders: [new CodeFileLoader()] });

	await generateTypeDefs();
	await generateResolvers();

	if (!generateFilesConfig.watch) {
		const schema = await getSchema();

		await generateGraphqlTypes({
			schemaBox: observable.box(schema),
		});

		return;
	}

	const schemaBox = observable.box(await getSchema().catch(() => null));

	when(
		() => !!schemaBox.get(),
		() =>
			generateGraphqlTypes({
				schemaBox: schemaBox as IObservableValue<GraphQLSchema>,
			})
	);

	const updateSchema = async () => {
		const newSchema = await getSchema();

		if (newSchema) schemaBox.set(newSchema);
	};

	const debounceUpdateGraphqlGeneratedFilesContent = debounce(updateSchema, 3000);

	const graphqlFilesWatcher = chokidar.watch(schemaFilesGlob, {
		ignoreInitial: !!schemaBox.get(),
	});

	graphqlFilesWatcher.on("add", async (filePath) => {
		const generatedFilePath = filePath.replace(/\.ts$/, "") + ".generated.ts";

		debounceUpdateGraphqlGeneratedFilesContent();
		console.log(chalk.green(`generated: ${generatedFilePath}`));
	});

	graphqlFilesWatcher.on("change", async (filePath) => {
		debounceUpdateGraphqlGeneratedFilesContent();

		console.log(chalk.blue(`updated: ${filePath}`));
	});

	graphqlFilesWatcher.on("unlink", async (filePath) => {
		const generatedFilePath = filePath.replace(/\.ts$/, "") + ".generated.ts";
		let unlinked = true;
		debounceUpdateGraphqlGeneratedFilesContent();
		await fs.unlink(generatedFilePath).catch(() => (unlinked = false));

		if (unlinked) console.log(chalk.redBright(`unlink: ${generatedFilePath}`));
		else throw new Error(`Could not unlink file: ${generatedFilePath}`);
	});

	console.log("Watching...");
})().catch((e) => {
	console.error(e);
	process.exit(1);
});
