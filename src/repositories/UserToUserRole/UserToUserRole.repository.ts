import { Connection } from "typeorm";

import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import { UserToUserRole } from "../../entities/UserToUserRole";
import { UserToUserRoleRepository } from "./UserToUserRole.repository.types";

export const getUserToUserRoleRepository = (connection: Connection): UserToUserRoleRepository => {
	const repo = getTypedRepository(UserToUserRole, connection);

	return {
		findAll: () => repo.find(),

		create: (data) => data,

		save: (data) => repo.save(data),
	};
};
