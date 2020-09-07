import { commonManagedAtColumns } from "../_utils/common";
import { createTypedEntitySchema } from "../_utils/createTypedEntitySchema";
import { User as UserType, UserColumns, UserRelations } from "./User.entity.types";

export const userColumns: UserColumns = {
	id: {
		name: "id",
		type: "integer",
		primary: true,
		generated: "increment",
	},

	email: {
		name: "email",
		type: "varchar",
		nullable: false,
	},
	uid: {
		name: "uid",
		type: "varchar",
		nullable: true,
	},
	password: {
		name: "password",
		type: "text",
		nullable: false,
	},
	name: {
		name: "name",
		type: "varchar",
		nullable: true,
	},

	createdAt: commonManagedAtColumns.createdAt,
	updatedAt: commonManagedAtColumns.updatedAt,
	deletedAt: commonManagedAtColumns.deletedAt,
};

export const userRelations: UserRelations = {
	createdCourses: {
		name: "createdCourses",
		type: "one-to-many",
		inverseSide: "createdBy",
		target: "course",
	},
	updatedCourses: {
		type: "one-to-many",
		inverseSide: "updatedBy",
		target: "course",
		name: "updatedCourses",
	},
	deletedCourses: {
		type: "one-to-many",
		inverseSide: "deletedBy",
		target: "course",
		name: "deletedCourses",
	},

	createdCourseEditions: {
		type: "one-to-many",
		inverseSide: "createdBy",
		target: "course_edition",
		name: "createdCourseEditions",
	},
	updatedCourseEditions: {
		type: "one-to-many",
		inverseSide: "updatedBy",
		target: "course_edition",
		name: "updatedCourseEditions",
	},
	deletedCourseEditions: {
		type: "one-to-many",
		inverseSide: "deletedBy",
		target: "course_edition",
		name: "deletedCourseEditions",
	},

	createdCourseClassLists: {
		type: "one-to-many",
		inverseSide: "createdBy",
		target: "course_class_list",
		name: "createdCourseClassLists",
	},
	updatedCourseClassLists: {
		type: "one-to-many",
		inverseSide: "updatedBy",
		target: "course_class_list",
		name: "updatedCourseClassLists",
	},
	deletedCourseClassLists: {
		type: "one-to-many",
		inverseSide: "deletedBy",
		target: "course_class_list",
		name: "deletedCourseClassLists",
	},

	createdCourseClasses: {
		type: "one-to-many",
		inverseSide: "createdBy",
		target: "course_class",
		name: "createdCourseClasses",
	},
	updatedCourseClasses: {
		type: "one-to-many",
		inverseSide: "updatedBy",
		target: "course_class",
		name: "updatedCourseClasses",
	},
	deletedCourseClasses: {
		type: "one-to-many",
		inverseSide: "deletedBy",
		target: "course_class",
		name: "deletedCourseClasses",
	},

	createdCourseClassVideos: {
		type: "one-to-many",
		inverseSide: "createdBy",
		target: "course_class_video",
		name: "createdCourseClassVideos",
	},
	updatedCourseClassVideos: {
		type: "one-to-many",
		inverseSide: "updatedBy",
		target: "course_class_video",
		name: "updatedCourseClassVideos",
	},
	deletedCourseClassVideos: {
		type: "one-to-many",
		inverseSide: "deletedBy",
		target: "course_class_video",
		name: "deletedCourseClassVideos",
	},

	createdCourseClassVideoQualities: {
		type: "one-to-many",
		inverseSide: "createdBy",
		target: "course_class_video_quality",
		name: "createdCourseClassVideoQualities",
	},
	updatedCourseClassVideoQualities: {
		type: "one-to-many",
		inverseSide: "updatedBy",
		target: "course_class_video_quality",
		name: "updatedCourseClassVideoQualities",
	},
	deletedCourseClassVideoQualities: {
		type: "one-to-many",
		inverseSide: "deletedBy",
		target: "course_class_video_quality",
		name: "deletedCourseClassVideoQualities",
	},

	createdCourseClassVideoFormats: {
		type: "one-to-many",
		inverseSide: "createdBy",
		target: "course_class_video_format",
		name: "createdCourseClassVideoFormats",
	},
	updatedCourseClassVideoFormats: {
		type: "one-to-many",
		inverseSide: "updatedBy",
		target: "course_class_video_format",
		name: "updatedCourseClassVideoFormats",
	},
	deletedCourseClassVideoFormats: {
		type: "one-to-many",
		inverseSide: "deletedBy",
		target: "course_class_video_format",
		name: "deletedCourseClassVideoFormats",
	},

	createdFaqs: {
		type: "one-to-many",
		inverseSide: "createdBy",
		target: "faq",
		name: "createdFaqs",
	},
	updatedFaqs: {
		type: "one-to-many",
		inverseSide: "updatedBy",
		target: "faq",
		name: "updatedFaqs",
	},
	deletedFaqs: {
		type: "one-to-many",
		inverseSide: "deletedBy",
		target: "faq",
		name: "deletedFaqs",
	},

	userToUserRoles: {
		type: "one-to-many",
		inverseSide: "user",
		target: "user_to_user_role",
		name: "userToUserRoles",
	},
};

export const User: UserType = createTypedEntitySchema<UserType>({
	name: "user",
	columns: userColumns,
	relations: userRelations,
});
