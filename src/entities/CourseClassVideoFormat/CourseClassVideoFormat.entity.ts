import { commonManagedAtColumns, commonManagedByColumns } from "../_utils/common";
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema";
import {
	CourseClassVideoFormat as CourseClassVideoFormatType,
	CourseClassVideoFormatColumns,
	CourseClassVideoFormatRelations,
} from "./CourseClassVideoFormat.entity.types";

export const courseClassVideoFormatColumns: CourseClassVideoFormatColumns = {
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
	url: {
		name: "url",
		type: "varchar",
		nullable: true,
	},

	createdAt: commonManagedAtColumns.createdAt,
	updatedAt: commonManagedAtColumns.updatedAt,
	deletedAt: commonManagedAtColumns.deletedAt,

	courseClassVideoQualityId: {
		name: "course_class_video_quality_id",
		type: "integer",
		nullable: true,
	},

	createdById: commonManagedByColumns.createdById,
	updatedById: commonManagedByColumns.updatedById,
	deletedById: commonManagedByColumns.deletedById,
};

export const courseClassVideoFormatRelations: CourseClassVideoFormatRelations = {
	courseClassVideoQuality: {
		type: "many-to-one",
		inverseSide: "courseClassVideoFormats",
		target: "course_class_video_quality",
		joinColumn: {
			name: "course_class_video_quality_id",
			referencedColumnName: "id",
		},
		name: "courseClassVideoQuality",
	},

	createdBy: {
		type: "many-to-one",
		inverseSide: "createdCourseClassVideoFormats",
		target: "user",
		joinColumn: {
			name: "created_by_id",
			referencedColumnName: "id",
		},
		name: "createdBy",
	},
	updatedBy: {
		type: "many-to-one",
		inverseSide: "updatedCourseClassVideoFormats",
		target: "user",
		joinColumn: {
			name: "updated_by_id",
			referencedColumnName: "id",
		},
		name: "updatedBy",
	},
	deletedBy: {
		type: "many-to-one",
		inverseSide: "deletedCourseClassVideoFormats",
		target: "user",
		joinColumn: {
			name: "deleted_by_id",
			referencedColumnName: "id",
		},
		name: "deletedBy",
	},
};

export const CourseClassVideoFormat: CourseClassVideoFormatType = createTypedEntitySchema<CourseClassVideoFormatType>({
	name: "course_class_video_format",
	columns: courseClassVideoFormatColumns,
	relations: courseClassVideoFormatRelations,
});
