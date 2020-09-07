import {
	Column,
	EntityRow,
	OneToManyRelation,
	PrimaryColumn,
	TypedEntitySchema,
} from "../_utils/createTypedEntitySchema";
import { CourseEdition } from "../CourseEdition/CourseEdition.entity.types";
import { UserToCourse_created, UserToCourse_deleted, UserToCourse_updated } from "../User/User.entity.types";

export type Course_id = PrimaryColumn<{ name: "id"; type: "integer"; entity: Course }>;
export type Course_name = Column<{ name: "name"; type: "varchar" }>;
export type Course_visibility = Column<{ name: "visibility"; type: "varchar" }>;
export type Course_code = Column<{ name: "code"; type: "varchar"; nullable: false }>;
export type Course_iconUrl = Column<{ name: "icon_url"; type: "varchar" }>;
export type Course_eva = Column<{ name: "eva"; type: "varchar" }>;
export type Course_createdAt = Column<{ name: "created_at"; type: "timestamp with time zone" }>;
export type Course_updatedAt = Column<{ name: "updated_at"; type: "timestamp with time zone" }>;
export type Course_deletedAt = Column<{ name: "deleted_at"; type: "timestamp with time zone" }>;

export type CourseToCourseEdition_courseEditions = OneToManyRelation<{
	from: {
		entity: () => Course;
		primaryColumn: Course_id;
		relationName: "courseEditions";
	};
	to: {
		entity: () => CourseEdition;
		columnName: "course_id";
		relationName: "course";
		nullable: true;
	};
}>;

export type CourseColumns = {
	id: Course_id;

	name: Course_name;
	visibility: Course_visibility;
	code: Course_code;
	iconUrl: Course_iconUrl;
	eva: Course_eva;

	createdAt: Course_createdAt;
	updatedAt: Course_updatedAt;
	deletedAt: Course_deletedAt;

	createdById: UserToCourse_created["to"]["column"];
	updatedById: UserToCourse_updated["to"]["column"];
	deletedById: UserToCourse_deleted["to"]["column"];
};

export type CourseRelations = {
	courseEditions: CourseToCourseEdition_courseEditions["from"]["relation"];

	createdBy: UserToCourse_created["to"]["relation"];
	updatedBy: UserToCourse_updated["to"]["relation"];
	deletedBy: UserToCourse_deleted["to"]["relation"];
};

export type Course = TypedEntitySchema<{
	name: "course";
	columns: CourseColumns;
	relations: CourseRelations;
}>;

export type CourseRow = EntityRow<Course>;
