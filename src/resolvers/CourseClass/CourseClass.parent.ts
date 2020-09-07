import { SafeOmit } from "../../_utils/utilTypes";
import { CourseClassRow } from "../../entities/CourseClass/CourseClass.entity.types";
import { CourseClass } from "../../generated/graphql.types";

export type CourseClassParent = Required<SafeOmit<CourseClassRow, "createdAt" | "updatedAt" | "deletedAt">> &
	Pick<Required<CourseClass>, "__typename" | "createdAt" | "updatedAt" | "deletedAt">;

export const getCourseClassParent = (courseClassRow: CourseClassRow): CourseClassParent => ({
	__typename: "CourseClass",
	...courseClassRow,
	createdAt: courseClassRow.createdAt?.toISOString() || null,
	updatedAt: courseClassRow.updatedAt?.toISOString() || null,
	deletedAt: courseClassRow.deletedAt?.toISOString() || null,
});
