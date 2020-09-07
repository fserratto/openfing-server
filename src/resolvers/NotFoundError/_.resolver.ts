import { Resolvers } from "../../generated/graphql.types";

const resolver: Resolvers["NotFoundError"]["_"] = () => null;

export default resolver;
