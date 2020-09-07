import { SafeOmit } from "../../_utils/utilTypes";
import { UserRow } from "../../entities/User/User.entity.types";
import { User } from "../../generated/graphql.types";

export type UserParent = Required<SafeOmit<UserRow, "createdAt" | "updatedAt" | "deletedAt">> &
	Pick<Required<User>, "__typename" | "createdAt" | "updatedAt" | "deletedAt">;

export const getUserParent = (userRow: UserRow): UserParent => ({
	__typename: "User",
	...userRow,
	createdAt: userRow.createdAt?.toISOString() || null,
	updatedAt: userRow.updatedAt?.toISOString() || null,
	deletedAt: userRow.deletedAt?.toISOString() || null,
});
