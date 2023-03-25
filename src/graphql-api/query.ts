import { gql } from "graphql-request";

export const pageQuery = gql`
query ($page: Int) {
  Page (page: $page, perPage: 20) {
    pageInfo {
      total
      currentPage
      lastPage
      hasNextPage
      perPage
    }
    media (type: ANIME, genre_in: ["Action"], sort:START_DATE, startDate_greater:20200000) {
      id
      title {
        native
      }
      siteUrl
    }
  }
}
`;
