import {
	Column,
	EntityRow,
	OneToManyRelation,
	PrimaryColumn,
	TypedEntitySchema,
} from "../_utils/createTypedEntitySchema";
import { UserToUserRole } from "../UserToUserRole/UserToUserRole.entity.types";

export type UserRole_id = PrimaryColumn<{ name: "id"; type: "integer"; entity: UserRole }>;
export type UserRole_code = Column<{ name: "code"; type: "varchar"; nullable: false }>;

export type UserRoleToUserToUserRole_userToUserRoles = OneToManyRelation<{
	from: {
		entity: () => UserRole;
		primaryColumn: UserRole_id;
		relationName: "userToUserRoles";
	};
	to: {
		entity: () => UserToUserRole;
		columnName: "user_role_id";
		relationName: "userRole";
		nullable: false;
	};
}>;

export type UserRoleColumns = {
	id: UserRole_id;

	code: UserRole_code;
};

export type UserRoleRelations = {
	userToUserRoles: UserRoleToUserToUserRole_userToUserRoles["from"]["relation"];
};

export type UserRole = TypedEntitySchema<{
	name: "user_role";
	columns: UserRoleColumns;
	relations: UserRoleRelations;
}>;

export type UserRoleRow = EntityRow<UserRole>;
