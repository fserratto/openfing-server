import path from "path";

import { projectPath } from "../../src/_utils/projectPath";

export const generateFilesConfig = {
	watch: process.argv.includes("-w"),
	generatedFolderPath: path.resolve(projectPath, "src", "generated"),
};
