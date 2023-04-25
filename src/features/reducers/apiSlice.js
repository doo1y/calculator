import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: "/",
	}),
	endpoints: (build) => ({
		getWindowConfiguration: build.query({
			query: () => "/windowConfig",
		}),
	}),
});

export const { useGetWindowConfigurationQuery } = api;
