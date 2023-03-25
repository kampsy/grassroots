export interface Page {
    Page: {
      media: Array<Media>;
      pageInfo: PageInfo;
    };
  }
  
  export interface Media {
    id: number;
    title: Title;
    siteUrl: string;
  }
  
  export interface Title {
    native: string;
  }
  
  export interface PageInfo {
    currentPage: number;
    hasNextPage: boolean;
    lastPage: number;
    perPage: number;
    total: number;
  }
  