import { SafeOmit } from "../../_utils/utilTypes";
import { CourseRow } from "../../entities/Course/Course.entity.types";
import { Course } from "../../generated/graphql.types";

export type CourseParent = Required<SafeOmit<CourseRow, "name" | "createdAt" | "updatedAt" | "deletedAt">> &
	Pick<Required<Course>, "__typename" | "name" | "createdAt" | "updatedAt" | "deletedAt">;

export const getCourseParent = (courseRow: CourseRow): CourseParent => ({
	...courseRow,
	__typename: "Course",
	name: courseRow.name || "", // TODO: Fix
	createdAt: courseRow.createdAt?.toISOString() || null,
	updatedAt: courseRow.updatedAt?.toISOString() || null,
	deletedAt: courseRow.deletedAt?.toISOString() || null,
});
