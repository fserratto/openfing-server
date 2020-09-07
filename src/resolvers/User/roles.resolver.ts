import { Resolvers } from "../../generated/graphql.types";
import { getUserRoleParent } from "../UserRole/UserRole.parent";

const resolver: Resolvers["User"]["roles"] = async (parent, _, { dataLoaders }) => {
	return (await dataLoaders.userRole.findAll({ userId: parent.id })).map(getUserRoleParent);
};

export default resolver;
