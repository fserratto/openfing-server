import DataLoader from "dataloader";
import { Connection } from "typeorm";

import { CourseClassRow } from "../entities/CourseClass/CourseClass.entity.types";
import { getCourseClassRepository } from "../repositories/CourseClass";
import {
	CourseClassFindAllOptions,
	CourseClassFindOneOptions,
} from "../repositories/CourseClass/CourseClass.repository.types";

export type CourseClassDataLoader = {
	findOne: (options: CourseClassFindOneOptions) => Promise<CourseClassRow | null>;
	findAll: (options: CourseClassFindAllOptions) => Promise<CourseClassRow[]>;
};

export const getCourseClassDataLoader = (connection: Connection): CourseClassDataLoader => {
	const repo = getCourseClassRepository(connection);
	const loader = new DataLoader<CourseClassFindOneOptions, CourseClassRow | null>(repo.findBatch);

	const courseEditionById = new Map<CourseClassRow["id"], CourseClassRow | null>();

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
