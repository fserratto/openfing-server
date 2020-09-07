import { Resolvers } from "../../generated/graphql.types";
import { getUserRoleParent } from "../UserRole/UserRole.parent";

const resolver: Resolvers["Query"]["userRoles"] = async (_, __, { dataLoaders }) =>
	(await dataLoaders.userRole.findAll({})).map(getUserRoleParent);

export default resolver;
