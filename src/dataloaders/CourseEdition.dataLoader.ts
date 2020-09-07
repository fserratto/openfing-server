import DataLoader from "dataloader";
import { Connection } from "typeorm";

import { CourseEditionRow } from "../entities/CourseEdition/CourseEdition.entity.types";
import { getCourseEditionRepository } from "../repositories/CourseEdition";
import {
	CourseEditionFindAllOptions,
	CourseEditionFindOneOptions,
} from "../repositories/CourseEdition/CourseEdition.repository.types";

export type CourseEditionDataLoader = {
	findOne: (options: CourseEditionFindOneOptions) => Promise<CourseEditionRow | null>;
	findAll: (options: CourseEditionFindAllOptions) => Promise<CourseEditionRow[]>;
};

export const getCourseEditionDataLoader = (connection: Connection): CourseEditionDataLoader => {
	const repo = getCourseEditionRepository(connection);
	const loader = new DataLoader<CourseEditionFindOneOptions, CourseEditionRow | null>(repo.findBatch);

	const courseEditionById = new Map<CourseEditionRow["id"], CourseEditionRow | null>();

	return {
		findOne: async (options) => {
			const courseEdition = await loader.load(options);

			courseEditionById.set(options.id, courseEdition);

			return courseEdition;
		},

		findAll: async (options) => {
			const courseEditions = await repo.findAll(options);

			courseEditions.forEach((courseEdition) => {
				courseEditionById.set(courseEdition.id, courseEdition);
			});

			return courseEditions;
		},
	};
};
