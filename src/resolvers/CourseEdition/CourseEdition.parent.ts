import { SafeOmit } from "../../_utils/utilTypes";
import { CourseEditionRow } from "../../entities/CourseEdition/CourseEdition.entity.types";
import { CourseEdition } from "../../generated/graphql.types";

export type CourseEditionParent = Required<SafeOmit<CourseEditionRow, "createdAt" | "updatedAt" | "deletedAt">> &
	Pick<Required<CourseEdition>, "__typename" | "createdAt" | "updatedAt" | "deletedAt">;

export const getCourseEditionParent = (courseEditionRow: CourseEditionRow): CourseEditionParent => ({
	__typename: "CourseEdition",
	...courseEditionRow,
	createdAt: courseEditionRow.createdAt?.toISOString() || null,
	updatedAt: courseEditionRow.updatedAt?.toISOString() || null,
	deletedAt: courseEditionRow.deletedAt?.toISOString() || null,
});
