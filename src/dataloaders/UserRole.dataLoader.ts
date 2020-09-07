import { Connection } from "typeorm";

import { UserRoleRow } from "../entities/UserRole/UserRole.entity.types";
import { getUserRoleRepository } from "../repositories/UserRole";
import { UserRoleFindAllOptions } from "../repositories/UserRole/UserRole.repository.types";

export type UserRoleDataLoader = {
	findAll: (options: UserRoleFindAllOptions) => Promise<UserRoleRow[]>;
};

export const getUserRoleDataLoader = (connection: Connection): UserRoleDataLoader => {
	const repo = getUserRoleRepository(connection);

	return {
		findAll: async (options) => repo.findAll(options),
	};
};
