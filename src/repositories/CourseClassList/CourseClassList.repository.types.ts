import { SafeOmit } from "../../_utils/utilTypes";
import { TypedRepository } from "../../entities/_utils/TypedRepository";
import { CourseClassList, CourseClassListRow } from "../../entities/CourseClassList/CourseClassList.entity.types";

export type CourseClassListAccessOptions = {
	includeHidden?: boolean;
	includeDisabled?: boolean;
};

export type CourseClassListFindOneOptions = CourseClassListAccessOptions &
	(
		| {
				id: CourseClassListRow["id"];
		  }
		| {
				code: Exclude<CourseClassListRow["code"], null>;
		  }
	);

export type CourseClassListFindAllOptions = CourseClassListAccessOptions & {
	courseEditionId: CourseClassListRow["courseEditionId"];
};

export type SaveCourseClassListData = SafeOmit<CourseClassListRow, "id">;

export type CreateCourseClassListData = SafeOmit<
	CourseClassListRow,
	"id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById"
> &
	Partial<Pick<CourseClassListRow, "id" | "createdAt" | "updatedAt" | "deletedAt" | "updatedById" | "deletedById">>;

export type CourseClassListRepository = {
	_typedRepository: TypedRepository<CourseClassList>;

	findAll: (options: CourseClassListFindAllOptions) => Promise<CourseClassListRow[]>;
	findBatch: (options: readonly CourseClassListFindOneOptions[]) => Promise<Array<CourseClassListRow | null>>;

	is: (courseClassList: CourseClassListRow, findOptions: CourseClassListFindOneOptions) => boolean;

	create: (data: CreateCourseClassListData) => SaveCourseClassListData;
	save: (data: SaveCourseClassListData) => Promise<CourseClassListRow>;
};
