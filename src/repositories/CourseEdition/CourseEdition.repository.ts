import { Connection } from "typeorm";

import { identity } from "../../_utils/identity";
import { getTypedRepository } from "../../entities/_utils/getTypedRepository";
import { CourseEdition, courseEditionColumns, CourseEditionVisibility } from "../../entities/CourseEdition";
import { CourseEditionRow } from "../../entities/CourseEdition/CourseEdition.entity.types";
import { CourseEditionRepository } from "./CourseEdition.repository.types";

export const getCourseEditionRepository = (connection: Connection): CourseEditionRepository => {
	const repo = getTypedRepository(CourseEdition, connection);

	const is: CourseEditionRepository["is"] = (courseEdition, options) => {
		return (
			courseEdition.id === options.id &&
			courseEdition.deletedAt === null &&
			(options.includeHidden ||
				courseEdition.visibility === CourseEditionVisibility.public ||
				options.includeDisabled ||
				courseEdition.visibility === CourseEditionVisibility.disabled)
		);
	};

	return {
		_typedRepository: repo,

		findAll: (options) => {
			const queryBuilder = repo.createQueryBuilder("ce");

			queryBuilder
				.andWhere(
					`ce.${courseEditionColumns.courseId.name} = :courseId`,
					identity<{ courseId: CourseEditionRow["courseId"] }>({
						courseId: options.courseId,
					})
				)
				.andWhere(`ce.${courseEditionColumns.deletedAt.name} is null`);

			if (!options.includeDisabled)
				queryBuilder.andWhere(
					`ce.${courseEditionColumns.visibility.name} != :v1`,
					identity<{ v1: CourseEditionRow["visibility"] }>({
						v1: CourseEditionVisibility.disabled,
					})
				);

			if (!options.includeHidden)
				queryBuilder.andWhere(
					`ce.${courseEditionColumns.visibility.name} != :v2`,
					identity<{ v2: CourseEditionRow["visibility"] }>({
						v2: CourseEditionVisibility.hidden,
					})
				);

			return queryBuilder.getMany();
		},

		findBatch: async (options) => {
			const queryBuilder = repo.createQueryBuilder("ce");

			queryBuilder
				.andWhere(`ce.${courseEditionColumns.deletedAt.name} is null`)
				.whereInIds(identity<Array<CourseEditionRow["id"]>>(options.map((o) => o.id)));

			const courseEditions = await queryBuilder.getMany();

			return options.map((options) => courseEditions.find((ce) => is(ce, options)) || null);
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
