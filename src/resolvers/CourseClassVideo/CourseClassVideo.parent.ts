import { SafeOmit } from "../../_utils/utilTypes";
import { CourseClassVideoRow } from "../../entities/CourseClassVideo/CourseClassVideo.entity.types";
import { CourseClassVideo } from "../../generated/graphql.types";

export type CourseClassVideoParent = Required<SafeOmit<CourseClassVideoRow, "createdAt" | "updatedAt" | "deletedAt">> &
	Pick<Required<CourseClassVideo>, "__typename" | "createdAt" | "updatedAt" | "deletedAt">;

export const getCourseClassVideoParent = (courseClassVideoRow: CourseClassVideoRow): CourseClassVideoParent => ({
	__typename: "CourseClassVideo",
	...courseClassVideoRow,
	createdAt: courseClassVideoRow.createdAt?.toISOString() || null,
	updatedAt: courseClassVideoRow.updatedAt?.toISOString() || null,
	deletedAt: courseClassVideoRow.deletedAt?.toISOString() || null,
});
