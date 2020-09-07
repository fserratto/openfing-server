import { Connection } from "typeorm";

import { FaqRow } from "../entities/Faq/Faq.entity.types";
import { getFaqRepository } from "../repositories/Faq";

export type FaqDataLoader = {
	findAll: () => Promise<FaqRow[]>;
};

export const getFaqDataLoader = (connection: Connection): FaqDataLoader => {
	const repo = getFaqRepository(connection);

	return {
		findAll: async () => repo.findAll(),
	};
};
