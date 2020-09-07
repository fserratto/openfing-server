import { ChildProcess, exec } from "child_process";
import chokidar from "chokidar";
import { debounce } from "lodash";
import path from "path";

import { projectPath } from "../../src/_utils/projectPath";

let childProcess: ChildProcess;

const watch = process.argv.includes("-w");

const run = () => {
	if (childProcess) {
		childProcess.kill();
		console.log("restarting");
	}

	childProcess = exec("node -r ./scripts/babel ./scripts/generate-files/generateFiles.ts" + (watch ? " -w" : ""));

	childProcess.stdout?.pipe(process.stdout);
	childProcess.stdin?.pipe(process.stdin);
	childProcess.stderr?.pipe(process.stderr);
};
run();

if (watch) {
	const graphqlFilesWatcher = chokidar.watch(path.resolve(projectPath, "scripts", "generate-files", "*"), {
		ignoreInitial: true,
	});

	const debounceRun = debounce(run, 3000);

	graphqlFilesWatcher.on("add", debounceRun);
	graphqlFilesWatcher.on("change", debounceRun);
	graphqlFilesWatcher.on("unlink", debounceRun);
}
