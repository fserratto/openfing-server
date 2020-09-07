import { Connection } from "typeorm";

import { hasProperty } from "../../_utils/hasProperty";
import { identity } from "../../_utils/identity";
import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import { User, userColumns } from "../../entities/User";
import { UserRow } from "../../entities/User/User.entity.types";
import { UserRepository } from "./User.repository.types";

export const getUserRepository = (connection: Connection): UserRepository => {
	const repo = getTypedRepository(User, connection);

	const is: UserRepository["is"] = (user, options) => {
		if (hasProperty(options, "id") ? user.id !== options.id : user.email !== options.email) return false;

		return user.deletedAt === null;
	};

	return {
		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("u");

			const ids: number[] = [];
			const emails: string[] = [];

			options.forEach((i) => {
				if (hasProperty(i, "id")) ids.push(i.id);
				else emails.push(i.email);
			});

			queryBuilder.andWhere(`u.${userColumns.deletedAt.name} is null`);

			if (ids.length)
				queryBuilder.orWhere(
					`u.id in (:...ids)`,
					identity<{ ids: Array<UserRow["id"]> }>({ ids: [...new Set(ids)] })
				);

			if (emails.length)
				queryBuilder.orWhere(
					`u.email in (:...emails)`,
					identity<{ emails: Array<UserRow["email"]> }>({ emails: [...new Set(emails)] })
				);

			const users = await queryBuilder.getMany();

			return options.map((options) => users.find((user) => is(user, options)) || null);
		},

		is,

		create: (data) => ({
			...data,
			createdAt: data.createdAt || new Date(),
			updatedAt: data.updatedAt || null,
			deletedAt: data.deletedAt || null,
		}),

		save: (data) => repo.save(data),
	};
};
