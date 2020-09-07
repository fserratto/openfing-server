import { SafeOmit } from "../../_utils/utilTypes";
import { CourseClassListRow } from "../../entities/CourseClassList/CourseClassList.entity.types";
import { CourseClassList } from "../../generated/graphql.types";

export type CourseClassListParent = Required<
	SafeOmit<CourseClassListRow, "code" | "createdAt" | "updatedAt" | "deletedAt">
> &
	Pick<Required<CourseClassList>, "__typename" | "code" | "createdAt" | "updatedAt" | "deletedAt">;

export const getCourseClassListParent = (courseClassListRow: CourseClassListRow): CourseClassListParent => ({
	__typename: "CourseClassList",
	...courseClassListRow,
	code: courseClassListRow.code || "", // TODO: Fix
	createdAt: courseClassListRow.createdAt?.toISOString() || null,
	updatedAt: courseClassListRow.updatedAt?.toISOString() || null,
	deletedAt: courseClassListRow.deletedAt?.toISOString() || null,
});
