const queries = {
  CAMPAIGN: {
    CREATE: gql`
      mutation CreateCampaign($createCampaignInput: CreateCampaignInput!) {
        createCampaign(createCampaignInput: $createCampaignInput) {
          endType
          keyword
          name
          providers
        }
      }
    `,
    LIST: gql`
      query Campaign($offset: Int!, $limit: Int!) {
        campaign(offset: $offset, limit: $limit) {
          name
          keyword
          status
          providers
          endType
          endValue
          id
        }
      }
    `,
  },
};

export const useGraphQueries = () => {
  return queries;
};
