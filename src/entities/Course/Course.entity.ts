import { commonManagedAtColumns, commonManagedByColumns, commonVisibility } from "../_utils/common";
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema";
import { Course as CourseType, CourseColumns, CourseRelations } from "./Course.entity.types";

export const CourseVisibility = { ...commonVisibility };

export const courseColumns: CourseColumns = {
	id: {
		name: "id",
		type: "integer",
		primary: true,
		generated: "increment",
	},

	name: {
		name: "name",
		type: "varchar",
		nullable: true,
	},
	visibility: {
		name: "visibility",
		type: "varchar",
		nullable: true,
	},
	code: {
		name: "code",
		type: "varchar",
		nullable: false,
	},
	iconUrl: {
		name: "icon_url",
		type: "varchar",
		nullable: true,
	},
	eva: {
		name: "eva",
		type: "varchar",
		nullable: true,
	},

	createdAt: commonManagedAtColumns.createdAt,
	updatedAt: commonManagedAtColumns.updatedAt,
	deletedAt: commonManagedAtColumns.deletedAt,

	createdById: commonManagedByColumns.createdById,
	updatedById: commonManagedByColumns.updatedById,
	deletedById: commonManagedByColumns.deletedById,
};

export const courseRelations: CourseRelations = {
	courseEditions: {
		type: "one-to-many",
		inverseSide: "course",
		target: "course_edition",
		name: "courseEditions",
	},

	createdBy: {
		type: "many-to-one",
		inverseSide: "createdCourses",
		target: "user",
		name: "createdBy",
		joinColumn: {
			name: "created_by_id",
			referencedColumnName: "id",
		},
	},
	updatedBy: {
		type: "many-to-one",
		inverseSide: "updatedCourses",
		target: "user",
		name: "updatedBy",
		joinColumn: {
			name: "updated_by_id",
			referencedColumnName: "id",
		},
	},
	deletedBy: {
		type: "many-to-one",
		inverseSide: "deletedCourses",
		target: "user",
		joinColumn: {
			name: "deleted_by_id",
			referencedColumnName: "id",
		},
		name: "deletedBy",
	},
};

export const Course: CourseType = createTypedEntitySchema<CourseType>({
	name: "course",
	columns: courseColumns,
	relations: courseRelations,
});
