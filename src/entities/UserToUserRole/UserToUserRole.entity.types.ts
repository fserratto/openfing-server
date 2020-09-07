import { EntityRow, PrimaryColumn, TypedEntitySchema } from "../_utils/createTypedEntitySchema";
import { UserToUserToUserRole_userToUserRoles } from "../User/User.entity.types";
import { UserRoleToUserToUserRole_userToUserRoles } from "../UserRole/UserRole.entity.types";

export type UserToUserRole_id = PrimaryColumn<{ name: "id"; type: "integer"; entity: UserToUserRole }>;

export type UserToUserRoleColumns = {
	id: UserToUserRole_id;

	userRoleId: UserRoleToUserToUserRole_userToUserRoles["to"]["column"];
	userId: UserToUserToUserRole_userToUserRoles["to"]["column"];
};

export type UserToUserRoleRelations = {
	userRole: UserRoleToUserToUserRole_userToUserRoles["to"]["relation"];
	user: UserToUserToUserRole_userToUserRoles["to"]["relation"];
};

export type UserToUserRole = TypedEntitySchema<{
	name: "user_to_user_role";
	columns: UserToUserRoleColumns;
	relations: UserToUserRoleRelations;
}>;

export type UserToUserRoleRow = EntityRow<UserToUserRole>;
