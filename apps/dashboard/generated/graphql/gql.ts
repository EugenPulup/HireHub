/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation CreateCampaign($createCampaignInput: CreateCampaignInput!) {\n  createCampaign(createCampaignInput: $createCampaignInput) {\n    endType\n    keyword\n    name\n    providers\n  }\n}\n\nmutation UpdateCampaign($id: String!, $updateCampaignInput: UpdateCampaignInput!) {\n  updateCampaign(id: $id, updateCampaignInput: $updateCampaignInput) {\n    endType\n    keyword\n    name\n    providers\n  }\n}\n\nmutation RemoveCampaign($removeCampaignId: [String!]!) {\n  removeCampaign(id: $removeCampaignId)\n}\n\nquery Campaign($listCampaignInput: ListCampaignInput!) {\n  campaign(ListCampaignInput: $listCampaignInput) {\n    name\n    keyword\n    status\n    providers\n    endType\n    endValue\n    id\n  }\n  campaignCount {\n    count\n  }\n}\n\nquery CampaignById($id: String!) {\n  campaignById(id: $id) {\n    name\n    keyword\n    status\n    providers\n    endType\n    endValue\n    id\n  }\n}": types.CreateCampaignDocument,
    "query Candidates($offset: Int!, $limit: Int!) {\n  candidates(offset: $offset, limit: $limit) {\n    id\n    name\n    position\n    salary\n    yearsOfExperience\n    createdAt\n  }\n  candidatesCount {\n    count\n  }\n}\n\nmutation RemoveCandidate($removeCandidate: [String!]!) {\n  removeCandidate(id: $removeCandidate)\n}": types.CandidatesDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateCampaign($createCampaignInput: CreateCampaignInput!) {\n  createCampaign(createCampaignInput: $createCampaignInput) {\n    endType\n    keyword\n    name\n    providers\n  }\n}\n\nmutation UpdateCampaign($id: String!, $updateCampaignInput: UpdateCampaignInput!) {\n  updateCampaign(id: $id, updateCampaignInput: $updateCampaignInput) {\n    endType\n    keyword\n    name\n    providers\n  }\n}\n\nmutation RemoveCampaign($removeCampaignId: [String!]!) {\n  removeCampaign(id: $removeCampaignId)\n}\n\nquery Campaign($listCampaignInput: ListCampaignInput!) {\n  campaign(ListCampaignInput: $listCampaignInput) {\n    name\n    keyword\n    status\n    providers\n    endType\n    endValue\n    id\n  }\n  campaignCount {\n    count\n  }\n}\n\nquery CampaignById($id: String!) {\n  campaignById(id: $id) {\n    name\n    keyword\n    status\n    providers\n    endType\n    endValue\n    id\n  }\n}"): (typeof documents)["mutation CreateCampaign($createCampaignInput: CreateCampaignInput!) {\n  createCampaign(createCampaignInput: $createCampaignInput) {\n    endType\n    keyword\n    name\n    providers\n  }\n}\n\nmutation UpdateCampaign($id: String!, $updateCampaignInput: UpdateCampaignInput!) {\n  updateCampaign(id: $id, updateCampaignInput: $updateCampaignInput) {\n    endType\n    keyword\n    name\n    providers\n  }\n}\n\nmutation RemoveCampaign($removeCampaignId: [String!]!) {\n  removeCampaign(id: $removeCampaignId)\n}\n\nquery Campaign($listCampaignInput: ListCampaignInput!) {\n  campaign(ListCampaignInput: $listCampaignInput) {\n    name\n    keyword\n    status\n    providers\n    endType\n    endValue\n    id\n  }\n  campaignCount {\n    count\n  }\n}\n\nquery CampaignById($id: String!) {\n  campaignById(id: $id) {\n    name\n    keyword\n    status\n    providers\n    endType\n    endValue\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Candidates($offset: Int!, $limit: Int!) {\n  candidates(offset: $offset, limit: $limit) {\n    id\n    name\n    position\n    salary\n    yearsOfExperience\n    createdAt\n  }\n  candidatesCount {\n    count\n  }\n}\n\nmutation RemoveCandidate($removeCandidate: [String!]!) {\n  removeCandidate(id: $removeCandidate)\n}"): (typeof documents)["query Candidates($offset: Int!, $limit: Int!) {\n  candidates(offset: $offset, limit: $limit) {\n    id\n    name\n    position\n    salary\n    yearsOfExperience\n    createdAt\n  }\n  candidatesCount {\n    count\n  }\n}\n\nmutation RemoveCandidate($removeCandidate: [String!]!) {\n  removeCandidate(id: $removeCandidate)\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;