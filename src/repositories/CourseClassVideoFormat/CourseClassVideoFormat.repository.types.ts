import { SafeOmit } from "../../_utils/utilTypes";
import { TypedRepository } from "../../entities/_utils/TypedRepository";
import {
	CourseClassVideoFormat,
	CourseClassVideoFormatRow,
} from "../../entities/CourseClassVideoFormat/CourseClassVideoFormat.entity.types";

export type CourseClassVideoFormatFindOneOptions = {
	id: CourseClassVideoFormatRow["id"];
};

export type CourseClassVideoFormatFindAllOptions = {
	courseClassVideoQualityId: CourseClassVideoFormatRow["courseClassVideoQualityId"];
};

export type SaveCourseClassVideoFormatData = SafeOmit<CourseClassVideoFormatRow, "id">;

export type CreateCourseClassVideoFormatData = SafeOmit<
	CourseClassVideoFormatRow,
	"id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById"
> &
	Partial<
		Pick<CourseClassVideoFormatRow, "id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById">
	>;

export type CourseClassVideoFormatRepository = {
	_typedRepository: TypedRepository<CourseClassVideoFormat>;

	findAll: (options: CourseClassVideoFormatFindAllOptions) => Promise<CourseClassVideoFormatRow[]>;
	findBatch: (
		options: readonly CourseClassVideoFormatFindOneOptions[]
	) => Promise<Array<CourseClassVideoFormatRow | null>>;

	is: (
		courseClassVideoFormat: CourseClassVideoFormatRow,
		findOptions: CourseClassVideoFormatFindOneOptions
	) => boolean;

	create: (data: CreateCourseClassVideoFormatData) => SaveCourseClassVideoFormatData;
	save: (data: SaveCourseClassVideoFormatData) => Promise<CourseClassVideoFormatRow>;
};
