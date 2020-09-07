import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema";
import {
	UserToUserRole as UserToUserRoleType,
	UserToUserRoleColumns,
	UserToUserRoleRelations,
} from "./UserToUserRole.entity.types";

export const userToUserRoleColumns: UserToUserRoleColumns = {
	id: {
		name: "id",
		type: "integer",
		primary: true,
		generated: "increment",
	},

	userId: {
		name: "user_id",
		type: "integer",
		nullable: false,
	},
	userRoleId: {
		name: "user_role_id",
		type: "integer",
		nullable: false,
	},
};

export const userToUserRoleRelations: UserToUserRoleRelations = {
	user: {
		name: "user",
		type: "many-to-one",
		inverseSide: "userToUserRoles",
		target: "user",
		joinColumn: {
			name: "user_id",
			referencedColumnName: "id",
		},
	},
	userRole: {
		type: "many-to-one",
		inverseSide: "userToUserRoles",
		target: "user_role",
		name: "userRole",
		joinColumn: {
			name: "user_role_id",
			referencedColumnName: "id",
		},
	},
};

export const UserToUserRole: UserToUserRoleType = createTypedEntitySchema<UserToUserRoleType>({
	name: "user_to_user_role",
	columns: userToUserRoleColumns,
	relations: userToUserRoleRelations,
});
