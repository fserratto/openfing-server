import {
	Column,
	EntityRow,
	OneToManyRelation,
	PrimaryColumn,
	TypedEntitySchema,
} from "../_utils/createTypedEntitySchema";
import { CourseToCourseEdition_courseEditions } from "../Course/Course.entity.types";
import { CourseClassList } from "../CourseClassList/CourseClassList.entity.types";
import {
	UserToCourseEdition_created,
	UserToCourseEdition_deleted,
	UserToCourseEdition_updated,
} from "../User/User.entity.types";

export type CourseEdition_id = PrimaryColumn<{ name: "id"; type: "integer"; entity: CourseEdition }>;
export type CourseEdition_name = Column<{ name: "name"; type: "varchar" }>;
export type CourseEdition_semester = Column<{ name: "semester"; type: "integer"; nullable: false }>;
export type CourseEdition_year = Column<{ name: "year"; type: "integer" }>;
export type CourseEdition_visibility = Column<{ name: "visibility"; type: "varchar" }>;
export type CourseEdition_createdAt = Column<{ name: "created_at"; type: "timestamp with time zone" }>;
export type CourseEdition_updatedAt = Column<{ name: "updated_at"; type: "timestamp with time zone" }>;
export type CourseEdition_deletedAt = Column<{ name: "deleted_at"; type: "timestamp with time zone" }>;

export type CourseEditionToCourseClassList_courseClassLists = OneToManyRelation<{
	from: {
		entity: () => CourseEdition;
		primaryColumn: CourseEdition_id;
		relationName: "courseClassLists";
	};
	to: {
		entity: () => CourseClassList;
		columnName: "course_edition_id";
		relationName: "courseEdition";
		nullable: true;
	};
}>;

export type CourseEditionColumns = {
	id: CourseEdition_id;

	name: CourseEdition_name;
	semester: CourseEdition_semester;
	year: CourseEdition_year;
	visibility: CourseEdition_visibility;

	createdAt: CourseEdition_createdAt;
	updatedAt: CourseEdition_updatedAt;
	deletedAt: CourseEdition_deletedAt;

	courseId: CourseToCourseEdition_courseEditions["to"]["column"];

	createdById: UserToCourseEdition_created["to"]["column"];
	updatedById: UserToCourseEdition_updated["to"]["column"];
	deletedById: UserToCourseEdition_deleted["to"]["column"];
};

export type CourseEditionRelations = {
	course: CourseToCourseEdition_courseEditions["to"]["relation"];
	courseClassLists: CourseEditionToCourseClassList_courseClassLists["from"]["relation"];

	createdBy: UserToCourseEdition_created["to"]["relation"];
	updatedBy: UserToCourseEdition_updated["to"]["relation"];
	deletedBy: UserToCourseEdition_deleted["to"]["relation"];
};

export type CourseEdition = TypedEntitySchema<{
	name: "course_edition";
	columns: CourseEditionColumns;
	relations: CourseEditionRelations;
}>;

export type CourseEditionRow = EntityRow<CourseEdition>;
