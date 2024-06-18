const queries = {
  CAMPAIGN: {
    CREATE: gql`
      mutation CreateNewCampaign {
        createCampaign(
          createCampaignInput: {
            name: "Summer Sale"
            keyword: "summer2024"
            providers: ["WORKUA"]
            createdAt: "2024-06-18T12:00:00Z"
            updatedAt: "2024-06-18T12:00:00Z"
            status: "ACTIVE"
            endType: "DATE"
            endValue: 30
          }
        ) {
          id
          name
          keyword
          providers
          createdAt
          updatedAt
          status
          endType
          endValue
        }
      }
    `,
  },
};

export const useGraphQueries = () => {
  return queries;
};
