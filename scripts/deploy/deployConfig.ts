const { SSH_KEY, SSH_HOST, SSH_USERNAME, DESTINATION_PATH, PM2_PROCESS_NAME } = process.env;

if (!SSH_KEY) throw new Error("SSH_KEY required");
if (!SSH_HOST) throw new Error("SSH_HOST required");
if (!SSH_USERNAME) throw new Error("SSH_USERNAME required");
if (!DESTINATION_PATH) throw new Error("DESTINATION_PATH required");
if (!PM2_PROCESS_NAME) throw new Error("No valid pm2 process name defined");

export const deployConfig = {
	sshKey: SSH_KEY,
	sshHost: SSH_HOST,
	sshUsername: SSH_USERNAME,
	destinationPath: DESTINATION_PATH,
	pm2ProcessName: PM2_PROCESS_NAME,
};
