import { Column, EntityRow, PrimaryColumn, TypedEntitySchema } from "../_utils/createTypedEntitySchema";
import { CourseClassVideoQualityToCourseClassVideoFormat_courseClassVideoFormats } from "../CourseClassVideoQuality/CourseClassVideoQuality.entity.types";
import {
	UserToCourseClassVideoFormat_created,
	UserToCourseClassVideoFormat_deleted,
	UserToCourseClassVideoFormat_updated,
} from "../User/User.entity.types";

export type CourseClassVideoFormat_id = PrimaryColumn<{
	name: "id";
	type: "integer";
	entity: CourseClassVideoFormat;
}>;
export type CourseClassVideoFormat_name = Column<{ name: "name"; type: "varchar" }>;
export type CourseClassVideoFormat_url = Column<{ name: "url"; type: "varchar" }>;
export type CourseClassVideoFormat_createdAt = Column<{ name: "created_at"; type: "timestamp with time zone" }>;
export type CourseClassVideoFormat_updatedAt = Column<{ name: "updated_at"; type: "timestamp with time zone" }>;
export type CourseClassVideoFormat_deletedAt = Column<{ name: "deleted_at"; type: "timestamp with time zone" }>;

export type CourseClassVideoFormatColumns = {
	id: CourseClassVideoFormat_id;

	name: CourseClassVideoFormat_name;
	url: CourseClassVideoFormat_url;

	createdAt: CourseClassVideoFormat_createdAt;
	updatedAt: CourseClassVideoFormat_updatedAt;
	deletedAt: CourseClassVideoFormat_deletedAt;

	courseClassVideoQualityId: CourseClassVideoQualityToCourseClassVideoFormat_courseClassVideoFormats["to"]["column"];

	createdById: UserToCourseClassVideoFormat_created["to"]["column"];
	updatedById: UserToCourseClassVideoFormat_updated["to"]["column"];
	deletedById: UserToCourseClassVideoFormat_deleted["to"]["column"];
};

export type CourseClassVideoFormatRelations = {
	courseClassVideoQuality: CourseClassVideoQualityToCourseClassVideoFormat_courseClassVideoFormats["to"]["relation"];

	createdBy: UserToCourseClassVideoFormat_created["to"]["relation"];
	updatedBy: UserToCourseClassVideoFormat_updated["to"]["relation"];
	deletedBy: UserToCourseClassVideoFormat_deleted["to"]["relation"];
};

export type CourseClassVideoFormat = TypedEntitySchema<{
	name: "course_class_video_format";
	columns: CourseClassVideoFormatColumns;
	relations: CourseClassVideoFormatRelations;
}>;

export type CourseClassVideoFormatRow = EntityRow<CourseClassVideoFormat>;
