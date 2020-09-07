import { SafeOmit } from "../../_utils/utilTypes";
import { CourseClassVideoQualityRow } from "../../entities/CourseClassVideoQuality/CourseClassVideoQuality.entity.types";
import { CourseClassVideoQuality } from "../../generated/graphql.types";

export type CourseClassVideoQualityParent = Required<
	SafeOmit<CourseClassVideoQualityRow, "createdAt" | "updatedAt" | "deletedAt">
> &
	Pick<Required<CourseClassVideoQuality>, "__typename" | "createdAt" | "updatedAt" | "deletedAt">;

export const getCourseClassVideoQualityParent = (
	courseClassVideoQualityRow: CourseClassVideoQualityRow
): CourseClassVideoQualityParent => ({
	__typename: "CourseClassVideoQuality",
	...courseClassVideoQualityRow,
	createdAt: courseClassVideoQualityRow.createdAt?.toISOString() || null,
	updatedAt: courseClassVideoQualityRow.updatedAt?.toISOString() || null,
	deletedAt: courseClassVideoQualityRow.deletedAt?.toISOString() || null,
});
