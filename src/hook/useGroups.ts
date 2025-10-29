// hooks/useGroups.ts
import { useQuery } from "@apollo/client/react";
import { GET_USER_GROUPS } from "@/graphql/queries";
import { IGroup } from "@/models/Group";

interface GetUserGroupsData {
  groups: IGroup[];
}

export function useGroups() {
  const { data, loading, error } = useQuery<GetUserGroupsData>(GET_USER_GROUPS);
  
  const groups: IGroup[] = Array.isArray(data?.groups) ? data.groups : [];

  return { groups, loading, error };
}
