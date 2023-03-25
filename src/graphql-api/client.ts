import { useQuery } from "react-query";
import {GraphQLClient } from "graphql-request";
import { Page } from "./types";
import { pageQuery } from "./query";

// Its a public api therefore its okay to have the usr here instead of a .env file
var endpoint = "https://graphql.anilist.co";

let client = new GraphQLClient(endpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

// Wrap react-query in func the returns anime Page type
export const GetAnime = (page: number) => {
  return useQuery(["page", page], async () => {
    const { Page } = await client.request<Page>(
      pageQuery,
      { page },
    );
    return Page;
  });
}
