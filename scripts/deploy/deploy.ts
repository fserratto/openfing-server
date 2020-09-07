import { ChildProcessWithoutNullStreams } from "child_process";
import path from "path";
import SSH2Promise from "ssh2-promise";

import { uploadRecursive } from "../_utils/uploadRecursive";
import { fs } from "../../src/_utils/fs";
import { projectPath } from "../../src/_utils/projectPath";
import { deployConfig } from "./deployConfig";

(async () => {
	const ssh = new SSH2Promise({
		host: deployConfig.sshHost,
		username: deployConfig.sshUsername,
		privateKey: Buffer.from(deployConfig.sshKey, "base64").toString("utf-8"),
	});

	await ssh.connect();
	const sftp = ssh.sftp();

	await ssh.exec(`mkdir -p ${deployConfig.destinationPath}`);

	const pm2Config = {
		apps: [
			{
				name: deployConfig.pm2ProcessName,
				script: "dist",
				max_restarts: 3,
				min_uptime: "1m",
				env: {
					NODE_ENV: "production",
				},
			},
		],
	};
	const pm2ConfigFilename = "pm2config.json";
	const pm2ConfigPath = path.resolve(projectPath, pm2ConfigFilename);
	await fs.writeFile(pm2ConfigPath, JSON.stringify(pm2Config, undefined, 2));

	const nodesToUpload: Array<string | { from: string; to: string }> = [
		"dist",
		"package.json",
		"package-lock.json",
		{ from: pm2ConfigPath, to: path.resolve(deployConfig.destinationPath, pm2ConfigFilename) },
	];

	await ssh.exec(`rm -rfv ${path.resolve(deployConfig.destinationPath, "dist")}`);

	await Promise.all(
		nodesToUpload.map(async (nodeToUpload) => {
			const pathToUpload = path.resolve(
				projectPath,
				typeof nodeToUpload === "string" ? nodeToUpload : nodeToUpload.from
			);

			await uploadRecursive({
				fromPath: pathToUpload,
				toPath: path.join(
					deployConfig.destinationPath,
					path.relative(projectPath, typeof nodeToUpload === "string" ? nodeToUpload : nodeToUpload.to)
				),
				sftp,
			});
		})
	);

	await fs.unlink(pm2ConfigPath);

	for (const command of [
		"rm -rf node_modules",
		`npm ci`,
		{
			command: `pm2 stop ${deployConfig.pm2ProcessName} && pm2 delete ${deployConfig.pm2ProcessName}`,
			ignore: true,
		},
		`pm2 start ${pm2ConfigFilename}`,
	])
		try {
			const commandSpawn: ChildProcessWithoutNullStreams = await ssh.spawn(
				[`cd ${deployConfig.destinationPath}`, typeof command === "string" ? command : command.command].join(
					" && "
				)
			);

			await new Promise((resolve, reject) => {
				commandSpawn.stdout.pipe(process.stdout);
				commandSpawn.stderr.pipe(process.stderr);

				commandSpawn.on("error", reject);
				commandSpawn.on("exit", resolve);
			});
		} catch (e) {
			console.log(e.toString("utf8"));

			if (typeof command === "string" || !command.ignore) throw e;
		}

	console.log("- done");
	ssh.close();
})().catch((e) => {
	console.log(e);
	process.exit(1);
});
