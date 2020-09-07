import DataLoader from "dataloader";
import { Connection } from "typeorm";

import { hasProperty } from "../_utils/hasProperty";
import { UserRow } from "../entities/User/User.entity.types";
import { getUserRepository } from "../repositories/User";
import { UserFindOneOptions } from "../repositories/User/User.repository.types";

export type UserDataLoader = {
	findOne: (options: UserFindOneOptions) => Promise<UserRow | null>;
};

export const getUserDataLoader = (connection: Connection): UserDataLoader => {
	const repo = getUserRepository(connection);
	const loader = new DataLoader<UserFindOneOptions, UserRow | null>(repo.findBatch);

	const userById = new Map<UserRow["id"], UserRow | null>();
	const userByEmail = new Map<UserRow["email"], UserRow | null>();

	return {
		findOne: async (options) => {
			const user = await loader.load(options);

			if (user) {
				userById.set(user.id, user);
				userByEmail.set(user.email, user);
			} else if (hasProperty(options, "id")) userById.set(options.id, null);
			else if (hasProperty(options, "code")) userByEmail.set(options.email, null);

			return user;
		},
	};
};
