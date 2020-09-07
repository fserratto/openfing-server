import { SafeOmit } from "../../_utils/utilTypes";
import { CourseClassVideoFormatRow } from "../../entities/CourseClassVideoFormat/CourseClassVideoFormat.entity.types";
import { CourseClassVideoFormat } from "../../generated/graphql.types";

export type CourseClassVideoFormatParent = Required<
	SafeOmit<CourseClassVideoFormatRow, "createdAt" | "updatedAt" | "deletedAt">
> &
	Pick<Required<CourseClassVideoFormat>, "__typename" | "createdAt" | "updatedAt" | "deletedAt">;

export const getCourseClassVideoFormatParent = (
	courseClassVideoFormatRow: CourseClassVideoFormatRow
): CourseClassVideoFormatParent => ({
	__typename: "CourseClassVideoFormat",
	...courseClassVideoFormatRow,
	createdAt: courseClassVideoFormatRow.createdAt?.toISOString() || null,
	updatedAt: courseClassVideoFormatRow.updatedAt?.toISOString() || null,
	deletedAt: courseClassVideoFormatRow.deletedAt?.toISOString() || null,
});
