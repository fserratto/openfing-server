import { SafeOmit } from "../../_utils/utilTypes";
import { TypedRepository } from "../../entities/_utils/TypedRepository";
import { Course, CourseRow } from "../../entities/Course/Course.entity.types";

export type CourseAccessOptions = {
	includeHidden?: boolean;
	includeDisabled?: boolean;
};

export type CourseFindOneOptions = CourseAccessOptions &
	(
		| {
				id: CourseRow["id"];
		  }
		| {
				code: CourseRow["code"];
		  }
	);

export type SaveCourseData = SafeOmit<CourseRow, "id">;

export type CreateCourseData = SafeOmit<
	CourseRow,
	"id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById"
> &
	Partial<Pick<CourseRow, "id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById">>;

export type CourseRepository = {
	_typedRepository: TypedRepository<Course>;

	findAll: () => Promise<CourseRow[]>;
	findBatch: (options: readonly CourseFindOneOptions[]) => Promise<Array<CourseRow | null>>;

	is: (course: CourseRow, findOptions: CourseFindOneOptions) => boolean;

	create: (data: CreateCourseData) => SaveCourseData;
	save: (data: SaveCourseData) => Promise<CourseRow>;
};
