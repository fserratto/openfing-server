import { commonManagedAtColumns, commonManagedByColumns } from "../_utils/common";
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema";
import {
	CourseClassVideoQuality as CourseClassVideoQualityType,
	CourseClassVideoQualityColumns,
	CourseClassVideoQualityRelations,
} from "./CourseClassVideoQuality.entity.types";

export const courseClassVideoQualityColumns: CourseClassVideoQualityColumns = {
	id: {
		name: "id",
		type: "integer",
		primary: true,
		generated: "increment",
	},

	width: {
		name: "width",
		type: "integer",
		nullable: true,
	},
	height: {
		name: "height",
		type: "integer",
		nullable: true,
	},

	createdAt: commonManagedAtColumns.createdAt,
	updatedAt: commonManagedAtColumns.updatedAt,
	deletedAt: commonManagedAtColumns.deletedAt,

	courseClassVideoId: {
		name: "course_class_video_id",
		type: "integer",
		nullable: true,
	},

	createdById: commonManagedByColumns.createdById,
	updatedById: commonManagedByColumns.updatedById,
	deletedById: commonManagedByColumns.deletedById,
};

export const courseClassVideoQualityRelations: CourseClassVideoQualityRelations = {
	courseClassVideo: {
		type: "many-to-one",
		inverseSide: "courseClassVideoQualities",
		target: "course_class_video",
		joinColumn: {
			name: "course_class_video_id",
			referencedColumnName: "id",
		},
		name: "courseClassVideo",
	},
	courseClassVideoFormats: {
		type: "one-to-many",
		inverseSide: "courseClassVideoQuality",
		target: "course_class_video_format",
		name: "courseClassVideoFormats",
	},

	createdBy: {
		type: "many-to-one",
		inverseSide: "createdCourseClassVideoQualities",
		target: "user",
		joinColumn: {
			name: "created_by_id",
			referencedColumnName: "id",
		},
		name: "createdBy",
	},
	updatedBy: {
		type: "many-to-one",
		inverseSide: "updatedCourseClassVideoQualities",
		target: "user",
		joinColumn: {
			name: "updated_by_id",
			referencedColumnName: "id",
		},
		name: "updatedBy",
	},
	deletedBy: {
		type: "many-to-one",
		inverseSide: "deletedCourseClassVideoQualities",
		target: "user",
		joinColumn: {
			name: "deleted_by_id",
			referencedColumnName: "id",
		},
		name: "deletedBy",
	},
};

export const CourseClassVideoQuality: CourseClassVideoQualityType = createTypedEntitySchema<
	CourseClassVideoQualityType
>({
	name: "course_class_video_quality",
	columns: courseClassVideoQualityColumns,
	relations: courseClassVideoQualityRelations,
});
