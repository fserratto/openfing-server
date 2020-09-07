import {
	Column,
	EntityRow,
	OneToManyRelation,
	PrimaryColumn,
	TypedEntitySchema,
} from "../_utils/createTypedEntitySchema";
import { CourseClass } from "../CourseClass/CourseClass.entity.types";
import { CourseEditionToCourseClassList_courseClassLists } from "../CourseEdition/CourseEdition.entity.types";
import {
	UserToCourseClassList_created,
	UserToCourseClassList_deleted,
	UserToCourseClassList_updated,
} from "../User/User.entity.types";

export type CourseClassList_id = PrimaryColumn<{ name: "id"; type: "integer"; entity: CourseClassList }>;
export type CourseClassList_name = Column<{ name: "name"; type: "varchar" }>;
export type CourseClassList_code = Column<{ name: "code"; type: "varchar" }>;
export type CourseClassList_visibility = Column<{ name: "visibility"; type: "varchar" }>;
export type CourseClassList_createdAt = Column<{ name: "created_at"; type: "timestamp with time zone" }>;
export type CourseClassList_updatedAt = Column<{ name: "updated_at"; type: "timestamp with time zone" }>;
export type CourseClassList_deletedAt = Column<{ name: "deleted_at"; type: "timestamp with time zone" }>;

export type CourseClassListToCourseClass_courseClasses = OneToManyRelation<{
	from: {
		entity: () => CourseClassList;
		primaryColumn: CourseClassList_id;
		relationName: "courseClasses";
	};
	to: {
		entity: () => CourseClass;
		columnName: "course_class_list_id";
		relationName: "courseClassList";
		nullable: true;
	};
}>;

export type CourseClassListColumns = {
	id: CourseClassList_id;

	name: CourseClassList_name;
	code: CourseClassList_code;
	visibility: CourseClassList_visibility;

	createdAt: CourseClassList_createdAt;
	updatedAt: CourseClassList_updatedAt;
	deletedAt: CourseClassList_deletedAt;

	courseEditionId: CourseEditionToCourseClassList_courseClassLists["to"]["column"];

	createdById: UserToCourseClassList_created["to"]["column"];
	updatedById: UserToCourseClassList_updated["to"]["column"];
	deletedById: UserToCourseClassList_deleted["to"]["column"];
};

export type CourseClassListRelations = {
	courseEdition: CourseEditionToCourseClassList_courseClassLists["to"]["relation"];
	courseClasses: CourseClassListToCourseClass_courseClasses["from"]["relation"];

	createdBy: UserToCourseClassList_created["to"]["relation"];
	updatedBy: UserToCourseClassList_updated["to"]["relation"];
	deletedBy: UserToCourseClassList_deleted["to"]["relation"];
};

export type CourseClassList = TypedEntitySchema<{
	name: "course_class_list";
	columns: CourseClassListColumns;
	relations: CourseClassListRelations;
}>;

export type CourseClassListRow = EntityRow<CourseClassList>;
