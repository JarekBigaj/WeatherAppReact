

export interface QueryParams {
  days?: string;
  longitude?: string;
  latitude?: string;
  city?: string;
}

export const getQueryParams = (search: string): QueryParams => {
  const queryParams = new URLSearchParams(search);

  return Array.from(queryParams.entries()).reduce(
    (params: QueryParams, [key, value]) => ({
      ...params,
      [key]: value,
    }),
    {}
  );
};