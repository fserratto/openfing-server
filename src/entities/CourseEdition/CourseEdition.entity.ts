import { commonManagedAtColumns, commonManagedByColumns, commonVisibility } from "../_utils/common";
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema";
import {
	CourseEdition as CourseEditionType,
	CourseEditionColumns,
	CourseEditionRelations,
} from "./CourseEdition.entity.types";

export const CourseEditionVisibility = { ...commonVisibility };

export const courseEditionColumns: CourseEditionColumns = {
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
	semester: {
		name: "semester",
		type: "integer",
		nullable: false,
	},
	year: {
		name: "year",
		type: "integer",
		nullable: true,
	},
	visibility: {
		name: "visibility",
		type: "varchar",
		nullable: true,
	},

	createdAt: commonManagedAtColumns.createdAt,
	updatedAt: commonManagedAtColumns.updatedAt,
	deletedAt: commonManagedAtColumns.deletedAt,

	courseId: {
		name: "course_id",
		type: "integer",
		nullable: true,
	},

	createdById: commonManagedByColumns.createdById,
	updatedById: commonManagedByColumns.updatedById,
	deletedById: commonManagedByColumns.deletedById,
};

export const courseEditionRelations: CourseEditionRelations = {
	course: {
		type: "many-to-one",
		inverseSide: "courseEditions",
		target: "course",
		joinColumn: {
			name: "course_id",
			referencedColumnName: "id",
		},
		name: "course",
	},
	courseClassLists: {
		type: "one-to-many",
		inverseSide: "courseEdition",
		target: "course_class_list",
		name: "courseClassLists",
	},

	createdBy: {
		type: "many-to-one",
		inverseSide: "createdCourseEditions",
		target: "user",
		joinColumn: {
			name: "created_by_id",
			referencedColumnName: "id",
		},
		name: "createdBy",
	},
	updatedBy: {
		type: "many-to-one",
		inverseSide: "updatedCourseEditions",
		target: "user",
		joinColumn: {
			name: "updated_by_id",
			referencedColumnName: "id",
		},
		name: "updatedBy",
	},
	deletedBy: {
		type: "many-to-one",
		inverseSide: "deletedCourseEditions",
		target: "user",
		name: "deletedBy",
		joinColumn: {
			name: "deleted_by_id",
			referencedColumnName: "id",
		},
	},
};

export const CourseEdition: CourseEditionType = createTypedEntitySchema<CourseEditionType>({
	name: "course_edition",
	columns: courseEditionColumns,
	relations: courseEditionRelations,
});
