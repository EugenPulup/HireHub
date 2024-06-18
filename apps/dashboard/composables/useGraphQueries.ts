const queries = {
  CAMPAIGN: {
    CREATE: gql`
      mutation CreateNewCampaign {
        createCampaign(
          createCampaignInput: {
            name: $name
            keyword: $keyword
            providers: $providers
            endType: $endType
          }
        ) {
          id
          name
          keyword
          providers
          status
          endType
        }
      }
    `,
  },
};

export const useGraphQueries = () => {
  return queries;
};
