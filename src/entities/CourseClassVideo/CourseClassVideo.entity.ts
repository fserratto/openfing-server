import { commonManagedAtColumns, commonManagedByColumns, commonVisibility } from "../_utils/common";
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema";
import {
	CourseClassVideo as CourseClassVideoType,
	CourseClassVideoColumns,
	CourseClassVideoRelations,
} from "./CourseClassVideo.entity.types";

export const CourseClassVideoVisibility = { ...commonVisibility };

export const courseClassVideoColumns: CourseClassVideoColumns = {
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
	position: {
		name: "position",
		type: "smallint",
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

	courseClassId: {
		name: "course_class_id",
		type: "integer",
		nullable: true,
	},

	createdById: commonManagedByColumns.createdById,
	updatedById: commonManagedByColumns.updatedById,
	deletedById: commonManagedByColumns.deletedById,
};

export const courseClassVideoRelations: CourseClassVideoRelations = {
	courseClass: {
		type: "many-to-one",
		inverseSide: "courseClassVideos",
		target: "course_class",
		joinColumn: {
			name: "course_class_id",
			referencedColumnName: "id",
		},
		name: "courseClass",
	},
	courseClassVideoQualities: {
		type: "one-to-many",
		inverseSide: "courseClassVideo",
		target: "course_class_video_quality",
		name: "courseClassVideoQualities",
	},

	createdBy: {
		type: "many-to-one",
		inverseSide: "createdCourseClassVideos",
		target: "user",
		joinColumn: {
			name: "created_by_id",
			referencedColumnName: "id",
		},
		name: "createdBy",
	},
	updatedBy: {
		type: "many-to-one",
		inverseSide: "updatedCourseClassVideos",
		target: "user",
		joinColumn: {
			name: "updated_by_id",
			referencedColumnName: "id",
		},
		name: "updatedBy",
	},
	deletedBy: {
		type: "many-to-one",
		inverseSide: "deletedCourseClassVideos",
		target: "user",
		joinColumn: {
			name: "deleted_by_id",
			referencedColumnName: "id",
		},
		name: "deletedBy",
	},
};

export const CourseClassVideo: CourseClassVideoType = createTypedEntitySchema<CourseClassVideoType>({
	name: "course_class_video",
	columns: courseClassVideoColumns,
	relations: courseClassVideoRelations,
});
