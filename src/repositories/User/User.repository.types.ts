import { SafeOmit } from "../../_utils/utilTypes";
import { UserRow } from "../../entities/User/User.entity.types";

export type UserFindOneOptions =
	| {
			id: UserRow["id"];
	  }
	| {
			email: UserRow["email"];
	  };

export type SaveUserData = SafeOmit<UserRow, "id">;

export type CreateUserData = SafeOmit<UserRow, "id" | "createdAt" | "updatedAt" | "deletedAt"> &
	Partial<Pick<UserRow, "id" | "createdAt" | "updatedAt" | "deletedAt">>;

export type UserRepository = {
	findBatch: (options: readonly UserFindOneOptions[]) => Promise<Array<UserRow | null>>;

	is: (user: UserRow, findOptions: UserFindOneOptions) => boolean;

	create: (data: CreateUserData) => SaveUserData;
	save: (data: SaveUserData) => Promise<UserRow>;
};
