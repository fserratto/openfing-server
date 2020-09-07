import { Connection } from "typeorm";

import { hasProperty } from "../../_utils/hasProperty";
import { identity } from "../../_utils/identity";
import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import { CourseClassList, courseClassListColumns, CourseClassListVisibility } from "../../entities/CourseClassList";
import { CourseClassListRow } from "../../entities/CourseClassList/CourseClassList.entity.types";
import { CourseClassListRepository } from "./CourseClassList.repository.types";

export const getCourseClassListRepository = (connection: Connection): CourseClassListRepository => {
	const repo = getTypedRepository(CourseClassList, connection);

	const is: CourseClassListRepository["is"] = (courseClassList, options) => {
		if (hasProperty(options, "id") ? courseClassList.id !== options.id : courseClassList.code !== options.code)
			return false;

		return (
			courseClassList.deletedAt === null &&
			(options.includeHidden ||
				courseClassList.visibility === CourseClassListVisibility.public ||
				options.includeDisabled ||
				courseClassList.visibility === CourseClassListVisibility.disabled)
		);
	};

	return {
		_typedRepository: repo,

		findAll: (options) => {
			const queryBuilder = repo.createQueryBuilder("ccl");

			queryBuilder
				.andWhere(
					`ccl.${courseClassListColumns.courseEditionId.name} = :courseEditionId`,
					identity<{ courseEditionId: CourseClassListRow["courseEditionId"] }>({
						courseEditionId: options.courseEditionId,
					})
				)
				.andWhere(`ccl.${courseClassListColumns.deletedAt.name} is null`);

			if (!options.includeDisabled)
				queryBuilder.andWhere(
					`ccl.${courseClassListColumns.visibility.name} != :v1`,
					identity<{ v1: CourseClassListRow["visibility"] }>({
						v1: CourseClassListVisibility.disabled,
					})
				);

			if (!options.includeHidden)
				queryBuilder.andWhere(
					`ccl.${courseClassListColumns.visibility.name} != :v2`,
					identity<{ v2: CourseClassListRow["visibility"] }>({
						v2: CourseClassListVisibility.hidden,
					})
				);

			return queryBuilder.getMany();
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("ccl");

			const ids: number[] = [];
			const codes: string[] = [];

			options.forEach((i) => {
				if (hasProperty(i, "id")) ids.push(i.id);
				else codes.push(i.code);
			});

			queryBuilder.andWhere(`ccl.${courseClassListColumns.deletedAt.name} is null`);

			if (ids.length)
				queryBuilder.orWhere(
					`ccl.id in (:...ids)`,
					identity<{ ids: Array<CourseClassListRow["id"]> }>({ ids: [...new Set(ids)] })
				);

			if (codes.length)
				queryBuilder.orWhere(
					`ccl.code in (:...codes)`,
					identity<{ codes: Array<CourseClassListRow["code"]> }>({ codes: [...new Set(codes)] })
				);

			const courseClassLists = await queryBuilder.getMany();

			return options.map(
				(options) => courseClassLists.find((courseClassList) => is(courseClassList, options)) || null
			);
		},

		is,

		create: (data) => ({
			...data,
			createdAt: data.createdAt || new Date(),
			updatedAt: data.updatedAt || null,
			deletedAt: data.deletedAt || null,
			updatedById: data.updatedById || null,
			deletedById: data.deletedById || null,
		}),

		save: (data) => repo.save(data),
	};
};
