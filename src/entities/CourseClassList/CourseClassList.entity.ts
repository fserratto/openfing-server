import { commonManagedAtColumns, commonManagedByColumns, commonVisibility } from "../_utils/common";
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema";
import {
	CourseClassList as CourseClassListType,
	CourseClassListColumns,
	CourseClassListRelations,
} from "./CourseClassList.entity.types";

export const CourseClassListVisibility = { ...commonVisibility };

export const courseClassListColumns: CourseClassListColumns = {
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
	code: {
		name: "code",
		type: "varchar",
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

	courseEditionId: {
		name: "course_edition_id",
		type: "integer",
		nullable: true,
	},

	createdById: commonManagedByColumns.createdById,
	updatedById: commonManagedByColumns.updatedById,
	deletedById: commonManagedByColumns.deletedById,
};

export const courseClassListRelations: CourseClassListRelations = {
	courseEdition: {
		name: "courseEdition",
		type: "many-to-one",
		inverseSide: "courseClassLists",
		target: "course_edition",
		joinColumn: {
			name: "course_edition_id",
			referencedColumnName: "id",
		},
	},
	courseClasses: {
		name: "courseClasses",
		type: "one-to-many",
		inverseSide: "courseClassList",
		target: "course_class",
	},

	createdBy: {
		name: "createdBy",
		type: "many-to-one",
		inverseSide: "createdCourseClassLists",
		target: "user",
		joinColumn: {
			name: "created_by_id",
			referencedColumnName: "id",
		},
	},
	updatedBy: {
		name: "updatedBy",
		type: "many-to-one",
		inverseSide: "updatedCourseClassLists",
		target: "user",
		joinColumn: {
			name: "updated_by_id",
			referencedColumnName: "id",
		},
	},
	deletedBy: {
		name: "deletedBy",
		type: "many-to-one",
		inverseSide: "deletedCourseClassLists",
		target: "user",
		joinColumn: {
			name: "deleted_by_id",
			referencedColumnName: "id",
		},
	},
};

export const CourseClassList: CourseClassListType = createTypedEntitySchema<CourseClassListType>({
	name: "course_class_list",
	columns: courseClassListColumns,
	relations: courseClassListRelations,
});
