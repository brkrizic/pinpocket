// hooks/useGroups.ts
import { useQuery } from "@apollo/client/react";
import { GET_USER_GROUPS } from "@/graphql/queries";

export function useGroups() {
  const { data, loading, error } = useQuery(GET_USER_GROUPS);

  // Always return an array to avoid `map` errors
  const groups = Array.isArray(data?.groups) ? data.groups : [];

  return { groups, loading, error };
}
