import { Request, Response } from "express";
import { Connection } from "typeorm";

import { DataLoaders } from "./dataloaders";
import { UserRow } from "./entities/User/User.entity.types";

export type Context = {
	ormConnection: Connection;
	req: Request;
	res: Response;
	currentUser?: UserRow;
	includeHidden?: boolean;

	dataLoaders: DataLoaders;
};
