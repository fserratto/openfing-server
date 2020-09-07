import {
	Column,
	EntityRow,
	OneToManyRelation,
	PrimaryColumn,
	TypedEntitySchema,
} from "../_utils/createTypedEntitySchema";
import { CourseClassToCourseClassVideo_videos } from "../CourseClass/CourseClass.entity.types";
import { CourseClassVideoQuality } from "../CourseClassVideoQuality/CourseClassVideoQuality.entity.types";
import {
	UserToCourseClassVideo_created,
	UserToCourseClassVideo_deleted,
	UserToCourseClassVideo_updated,
} from "../User/User.entity.types";

export type CourseClassVideo_id = PrimaryColumn<{ name: "id"; type: "integer"; entity: CourseClassVideo }>;
export type CourseClassVideo_name = Column<{ name: "name"; type: "varchar" }>;
export type CourseClassVideo_position = Column<{ name: "position"; type: "smallint" }>;
export type CourseClassVideo_visibility = Column<{ name: "visibility"; type: "varchar" }>;
export type CourseClassVideo_createdAt = Column<{ name: "created_at"; type: "timestamp with time zone" }>;
export type CourseClassVideo_updatedAt = Column<{ name: "updated_at"; type: "timestamp with time zone" }>;
export type CourseClassVideo_deletedAt = Column<{ name: "deleted_at"; type: "timestamp with time zone" }>;

export type CourseClassVideoToCourseClassVideoQuality_qualities = OneToManyRelation<{
	from: {
		entity: () => CourseClassVideo;
		primaryColumn: CourseClassVideo_id;
		relationName: "courseClassVideoQualities";
	};
	to: {
		entity: () => CourseClassVideoQuality;
		columnName: "course_class_video_id";
		relationName: "courseClassVideo";
		nullable: true;
	};
}>;

export type CourseClassVideoColumns = {
	id: CourseClassVideo_id;

	name: CourseClassVideo_name;
	position: CourseClassVideo_position;
	visibility: CourseClassVideo_visibility;

	createdAt: CourseClassVideo_createdAt;
	updatedAt: CourseClassVideo_updatedAt;
	deletedAt: CourseClassVideo_deletedAt;

	courseClassId: CourseClassToCourseClassVideo_videos["to"]["column"];

	createdById: UserToCourseClassVideo_created["to"]["column"];
	updatedById: UserToCourseClassVideo_updated["to"]["column"];
	deletedById: UserToCourseClassVideo_deleted["to"]["column"];
};

export type CourseClassVideoRelations = {
	courseClass: CourseClassToCourseClassVideo_videos["to"]["relation"];
	courseClassVideoQualities: CourseClassVideoToCourseClassVideoQuality_qualities["from"]["relation"];

	createdBy: UserToCourseClassVideo_created["to"]["relation"];
	updatedBy: UserToCourseClassVideo_updated["to"]["relation"];
	deletedBy: UserToCourseClassVideo_deleted["to"]["relation"];
};

export type CourseClassVideo = TypedEntitySchema<{
	name: "course_class_video";
	columns: CourseClassVideoColumns;
	relations: CourseClassVideoRelations;
}>;

export type CourseClassVideoRow = EntityRow<CourseClassVideo>;
