import { SafeOmit } from "../../_utils/utilTypes";
import { TypedRepository } from "../../entities/_utils/TypedRepository";
import { CourseClassVideo, CourseClassVideoRow } from "../../entities/CourseClassVideo/CourseClassVideo.entity.types";

export type CourseClassVideoAccessOptions = {
	includeHidden?: boolean;
	includeDisabled?: boolean;
};

export type CourseClassVideoFindOneOptions = CourseClassVideoAccessOptions & {
	id: CourseClassVideoRow["id"];
};

export type CourseClassVideoFindAllOptions = CourseClassVideoAccessOptions & {
	courseClassId: CourseClassVideoRow["courseClassId"];
};

export type SaveCourseClassVideoData = SafeOmit<CourseClassVideoRow, "id">;

export type CreateCourseClassVideoData = SafeOmit<
	CourseClassVideoRow,
	"id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById"
> &
	Partial<Pick<CourseClassVideoRow, "id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById">>;

export type CourseClassVideoRepository = {
	_typedRepository: TypedRepository<CourseClassVideo>;

	findAll: (options: CourseClassVideoFindAllOptions) => Promise<CourseClassVideoRow[]>;
	findBatch: (options: readonly CourseClassVideoFindOneOptions[]) => Promise<Array<CourseClassVideoRow | null>>;

	is: (courseClassVideo: CourseClassVideoRow, findOptions: CourseClassVideoFindOneOptions) => boolean;

	create: (data: CreateCourseClassVideoData) => SaveCourseClassVideoData;
	save: (data: SaveCourseClassVideoData) => Promise<CourseClassVideoRow>;
};
