import { SafeOmit } from "../../_utils/utilTypes";
import { TypedRepository } from "../../entities/_utils/TypedRepository";
import {
	CourseClassVideoQuality,
	CourseClassVideoQualityRow,
} from "../../entities/CourseClassVideoQuality/CourseClassVideoQuality.entity.types";

export type CourseClassVideoQualityFindOneOptions = {
	id: CourseClassVideoQualityRow["id"];
};

export type CourseClassVideoQualityFindAllOptions = {
	courseClassVideoId: CourseClassVideoQualityRow["courseClassVideoId"];
};

export type SaveCourseClassVideoQualityData = SafeOmit<CourseClassVideoQualityRow, "id">;

export type CreateCourseClassVideoQualityData = SafeOmit<
	CourseClassVideoQualityRow,
	"id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById"
> &
	Partial<
		Pick<CourseClassVideoQualityRow, "id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById">
	>;

export type CourseClassVideoQualityRepository = {
	_typedRepository: TypedRepository<CourseClassVideoQuality>;

	findAll: (options: CourseClassVideoQualityFindAllOptions) => Promise<CourseClassVideoQualityRow[]>;
	findBatch: (
		options: readonly CourseClassVideoQualityFindOneOptions[]
	) => Promise<Array<CourseClassVideoQualityRow | null>>;

	is: (
		courseClassVideoQuality: CourseClassVideoQualityRow,
		findOptions: CourseClassVideoQualityFindOneOptions
	) => boolean;

	create: (data: CreateCourseClassVideoQualityData) => SaveCourseClassVideoQualityData;
	save: (data: SaveCourseClassVideoQualityData) => Promise<CourseClassVideoQualityRow>;
};
