import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema";
import { identityMap } from "../../_utils/identityMap";
import { UserRole as UserRoleType, UserRoleColumns, UserRoleRelations } from "./UserRole.entity.types";

export const UserRoleCode = identityMap<"admin" | "user">({
	admin: "",
	user: "",
});

export const userRoleColumns: UserRoleColumns = {
	id: {
		name: "id",
		type: "integer",
		primary: true,
		generated: "increment",
	},

	code: {
		name: "code",
		type: "varchar",
		nullable: false,
	},
};

export const userRoleRelations: UserRoleRelations = {
	userToUserRoles: {
		name: "userToUserRoles",
		type: "one-to-many",
		inverseSide: "userRole",
		target: "user_to_user_role",
	},
};

export const UserRole: UserRoleType = createTypedEntitySchema<UserRoleType>({
	name: "user_role",
	columns: userRoleColumns,
	relations: userRoleRelations,
});
