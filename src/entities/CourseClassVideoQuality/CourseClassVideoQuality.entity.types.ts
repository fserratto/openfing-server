import {
	Column,
	EntityRow,
	OneToManyRelation,
	PrimaryColumn,
	TypedEntitySchema,
} from "../_utils/createTypedEntitySchema";
import { CourseClassVideoToCourseClassVideoQuality_qualities } from "../CourseClassVideo/CourseClassVideo.entity.types";
import { CourseClassVideoFormat } from "../CourseClassVideoFormat/CourseClassVideoFormat.entity.types";
import {
	UserToCourseClassVideoQuality_created,
	UserToCourseClassVideoQuality_deleted,
	UserToCourseClassVideoQuality_updated,
} from "../User/User.entity.types";

export type CourseClassVideoQuality_id = PrimaryColumn<{
	name: "id";
	type: "integer";
	entity: CourseClassVideoQuality;
}>;
export type CourseClassVideoQuality_width = Column<{ name: "width"; type: "integer" }>;
export type CourseClassVideoQuality_height = Column<{ name: "height"; type: "integer" }>;
export type CourseClassVideoQuality_createdAt = Column<{ name: "created_at"; type: "timestamp with time zone" }>;
export type CourseClassVideoQuality_updatedAt = Column<{ name: "updated_at"; type: "timestamp with time zone" }>;
export type CourseClassVideoQuality_deletedAt = Column<{ name: "deleted_at"; type: "timestamp with time zone" }>;

export type CourseClassVideoQualityToCourseClassVideoFormat_courseClassVideoFormats = OneToManyRelation<{
	from: {
		entity: () => CourseClassVideoQuality;
		primaryColumn: CourseClassVideoQuality_id;
		relationName: "courseClassVideoFormats";
	};
	to: {
		entity: () => CourseClassVideoFormat;
		columnName: "course_class_video_quality_id";
		relationName: "courseClassVideoQuality";
		nullable: true;
	};
}>;

export type CourseClassVideoQualityColumns = {
	id: CourseClassVideoQuality_id;

	width: CourseClassVideoQuality_width;
	height: CourseClassVideoQuality_height;

	createdAt: CourseClassVideoQuality_createdAt;
	updatedAt: CourseClassVideoQuality_updatedAt;
	deletedAt: CourseClassVideoQuality_deletedAt;

	courseClassVideoId: CourseClassVideoToCourseClassVideoQuality_qualities["to"]["column"];

	createdById: UserToCourseClassVideoQuality_created["to"]["column"];
	updatedById: UserToCourseClassVideoQuality_updated["to"]["column"];
	deletedById: UserToCourseClassVideoQuality_deleted["to"]["column"];
};

export type CourseClassVideoQualityRelations = {
	courseClassVideo: CourseClassVideoToCourseClassVideoQuality_qualities["to"]["relation"];
	courseClassVideoFormats: CourseClassVideoQualityToCourseClassVideoFormat_courseClassVideoFormats["from"]["relation"];

	createdBy: UserToCourseClassVideoQuality_created["to"]["relation"];
	updatedBy: UserToCourseClassVideoQuality_updated["to"]["relation"];
	deletedBy: UserToCourseClassVideoQuality_deleted["to"]["relation"];
};

export type CourseClassVideoQuality = TypedEntitySchema<{
	name: "course_class_video_quality";
	columns: CourseClassVideoQualityColumns;
	relations: CourseClassVideoQualityRelations;
}>;

export type CourseClassVideoQualityRow = EntityRow<CourseClassVideoQuality>;
