/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Campaign = {
  __typename?: 'Campaign';
  createdAt: Scalars['DateTime']['output'];
  endType: Scalars['String']['output'];
  endValue?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  keyword: Scalars['String']['output'];
  name: Scalars['String']['output'];
  providers: Array<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Candidate = {
  __typename?: 'Candidate';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  /** Name of candidate */
  name: Scalars['String']['output'];
  /** Position of candidate */
  position: Scalars['String']['output'];
  /** Salary expectation of candidate */
  salary: Scalars['Int']['output'];
  /** Sum of Candidate experience in years */
  yearsOfExperience: Scalars['Int']['output'];
};

export type Count = {
  __typename?: 'Count';
  count: Scalars['Int']['output'];
};

export type CreateCampaignInput = {
  endType: Scalars['String']['input'];
  endValue?: InputMaybe<Scalars['Int']['input']>;
  keyword: Scalars['String']['input'];
  name: Scalars['String']['input'];
  providers: Array<Scalars['String']['input']>;
};

export type ListCampaignInput = {
  filterKey?: InputMaybe<Scalars['String']['input']>;
  filterValue?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  sortKey?: InputMaybe<Scalars['String']['input']>;
  sortValue?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCampaign: Campaign;
  removeCampaign: Scalars['Boolean']['output'];
  removeCandidate: Scalars['Boolean']['output'];
  updateCampaign: Campaign;
};


export type MutationCreateCampaignArgs = {
  createCampaignInput: CreateCampaignInput;
};


export type MutationRemoveCampaignArgs = {
  id: Array<Scalars['String']['input']>;
};


export type MutationRemoveCandidateArgs = {
  id: Array<Scalars['String']['input']>;
};


export type MutationUpdateCampaignArgs = {
  id: Scalars['String']['input'];
  updateCampaignInput: UpdateCampaignInput;
};

export type Query = {
  __typename?: 'Query';
  campaign: Array<Campaign>;
  campaignById: Campaign;
  campaignCount: Count;
  candidate: Candidate;
  candidates: Array<Candidate>;
  candidatesCount: Count;
};


export type QueryCampaignArgs = {
  ListCampaignInput: ListCampaignInput;
};


export type QueryCampaignByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCandidateArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCandidatesArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};

export type UpdateCampaignInput = {
  endType?: InputMaybe<Scalars['String']['input']>;
  endValue?: InputMaybe<Scalars['Int']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  providers?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateCampaignMutationVariables = Exact<{
  createCampaignInput: CreateCampaignInput;
}>;


export type CreateCampaignMutation = { __typename?: 'Mutation', createCampaign: { __typename?: 'Campaign', endType: string, keyword: string, name: string, providers: Array<string> } };

export type UpdateCampaignMutationVariables = Exact<{
  id: Scalars['String']['input'];
  updateCampaignInput: UpdateCampaignInput;
}>;


export type UpdateCampaignMutation = { __typename?: 'Mutation', updateCampaign: { __typename?: 'Campaign', endType: string, keyword: string, name: string, providers: Array<string> } };

export type RemoveCampaignMutationVariables = Exact<{
  removeCampaignId: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type RemoveCampaignMutation = { __typename?: 'Mutation', removeCampaign: boolean };

export type CampaignQueryVariables = Exact<{
  listCampaignInput: ListCampaignInput;
}>;


export type CampaignQuery = { __typename?: 'Query', campaign: Array<{ __typename?: 'Campaign', name: string, keyword: string, status: string, providers: Array<string>, endType: string, endValue?: number | null, id: string }>, campaignCount: { __typename?: 'Count', count: number } };

export type CampaignByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type CampaignByIdQuery = { __typename?: 'Query', campaignById: { __typename?: 'Campaign', name: string, keyword: string, status: string, providers: Array<string>, endType: string, endValue?: number | null, id: string } };

export type CandidatesQueryVariables = Exact<{
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type CandidatesQuery = { __typename?: 'Query', candidates: Array<{ __typename?: 'Candidate', id: string, name: string, position: string, salary: number, yearsOfExperience: number, createdAt: any }>, candidatesCount: { __typename?: 'Count', count: number } };

export type RemoveCandidateMutationVariables = Exact<{
  removeCandidate: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type RemoveCandidateMutation = { __typename?: 'Mutation', removeCandidate: boolean };


export const CreateCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCampaignInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCampaignInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCampaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCampaignInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCampaignInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endType"}},{"kind":"Field","name":{"kind":"Name","value":"keyword"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"providers"}}]}}]}}]} as unknown as DocumentNode<CreateCampaignMutation, CreateCampaignMutationVariables>;
export const UpdateCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateCampaignInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateCampaignInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateCampaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"updateCampaignInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateCampaignInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endType"}},{"kind":"Field","name":{"kind":"Name","value":"keyword"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"providers"}}]}}]}}]} as unknown as DocumentNode<UpdateCampaignMutation, UpdateCampaignMutationVariables>;
export const RemoveCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeCampaignId"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCampaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeCampaignId"}}}]}]}}]} as unknown as DocumentNode<RemoveCampaignMutation, RemoveCampaignMutationVariables>;
export const CampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Campaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"listCampaignInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ListCampaignInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ListCampaignInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"listCampaignInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"keyword"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"providers"}},{"kind":"Field","name":{"kind":"Name","value":"endType"}},{"kind":"Field","name":{"kind":"Name","value":"endValue"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"campaignCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<CampaignQuery, CampaignQueryVariables>;
export const CampaignByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CampaignById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaignById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"keyword"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"providers"}},{"kind":"Field","name":{"kind":"Name","value":"endType"}},{"kind":"Field","name":{"kind":"Name","value":"endValue"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CampaignByIdQuery, CampaignByIdQueryVariables>;
export const CandidatesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Candidates"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"candidates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"position"}},{"kind":"Field","name":{"kind":"Name","value":"salary"}},{"kind":"Field","name":{"kind":"Name","value":"yearsOfExperience"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"candidatesCount"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<CandidatesQuery, CandidatesQueryVariables>;
export const RemoveCandidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveCandidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"removeCandidate"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeCandidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"removeCandidate"}}}]}]}}]} as unknown as DocumentNode<RemoveCandidateMutation, RemoveCandidateMutationVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: { input: any; output: any; }
};

export type Campaign = {
  __typename?: 'Campaign';
  createdAt: Scalars['DateTime']['output'];
  endType: Scalars['String']['output'];
  endValue?: Maybe<Scalars['Int']['output']>;
  id: Scalars['String']['output'];
  keyword: Scalars['String']['output'];
  name: Scalars['String']['output'];
  providers: Array<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Candidate = {
  __typename?: 'Candidate';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  /** Name of candidate */
  name: Scalars['String']['output'];
  /** Position of candidate */
  position: Scalars['String']['output'];
  /** Salary expectation of candidate */
  salary: Scalars['Int']['output'];
  /** Sum of Candidate experience in years */
  yearsOfExperience: Scalars['Int']['output'];
};

export type Count = {
  __typename?: 'Count';
  count: Scalars['Int']['output'];
};

export type CreateCampaignInput = {
  endType: Scalars['String']['input'];
  endValue?: InputMaybe<Scalars['Int']['input']>;
  keyword: Scalars['String']['input'];
  name: Scalars['String']['input'];
  providers: Array<Scalars['String']['input']>;
};

export type ListCampaignInput = {
  filterKey?: InputMaybe<Scalars['String']['input']>;
  filterValue?: InputMaybe<Scalars['String']['input']>;
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
  sortKey?: InputMaybe<Scalars['String']['input']>;
  sortValue?: InputMaybe<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCampaign: Campaign;
  removeCampaign: Scalars['Boolean']['output'];
  removeCandidate: Scalars['Boolean']['output'];
  updateCampaign: Campaign;
};


export type MutationCreateCampaignArgs = {
  createCampaignInput: CreateCampaignInput;
};


export type MutationRemoveCampaignArgs = {
  id: Array<Scalars['String']['input']>;
};


export type MutationRemoveCandidateArgs = {
  id: Array<Scalars['String']['input']>;
};


export type MutationUpdateCampaignArgs = {
  id: Scalars['String']['input'];
  updateCampaignInput: UpdateCampaignInput;
};

export type Query = {
  __typename?: 'Query';
  campaign: Array<Campaign>;
  campaignById: Campaign;
  campaignCount: Count;
  candidate: Candidate;
  candidates: Array<Candidate>;
  candidatesCount: Count;
};


export type QueryCampaignArgs = {
  ListCampaignInput: ListCampaignInput;
};


export type QueryCampaignByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryCandidateArgs = {
  id: Scalars['Int']['input'];
};


export type QueryCandidatesArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};

export type UpdateCampaignInput = {
  endType?: InputMaybe<Scalars['String']['input']>;
  endValue?: InputMaybe<Scalars['Int']['input']>;
  keyword?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  providers?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateCampaignMutationVariables = Exact<{
  createCampaignInput: CreateCampaignInput;
}>;


export type CreateCampaignMutation = { __typename?: 'Mutation', createCampaign: { __typename?: 'Campaign', endType: string, keyword: string, name: string, providers: Array<string> } };

export type UpdateCampaignMutationVariables = Exact<{
  id: Scalars['String']['input'];
  updateCampaignInput: UpdateCampaignInput;
}>;


export type UpdateCampaignMutation = { __typename?: 'Mutation', updateCampaign: { __typename?: 'Campaign', endType: string, keyword: string, name: string, providers: Array<string> } };

export type RemoveCampaignMutationVariables = Exact<{
  removeCampaignId: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type RemoveCampaignMutation = { __typename?: 'Mutation', removeCampaign: boolean };

export type CampaignQueryVariables = Exact<{
  listCampaignInput: ListCampaignInput;
}>;


export type CampaignQuery = { __typename?: 'Query', campaign: Array<{ __typename?: 'Campaign', name: string, keyword: string, status: string, providers: Array<string>, endType: string, endValue?: number | null, id: string }>, campaignCount: { __typename?: 'Count', count: number } };

export type CampaignByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type CampaignByIdQuery = { __typename?: 'Query', campaignById: { __typename?: 'Campaign', name: string, keyword: string, status: string, providers: Array<string>, endType: string, endValue?: number | null, id: string } };

export type CandidatesQueryVariables = Exact<{
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type CandidatesQuery = { __typename?: 'Query', candidates: Array<{ __typename?: 'Candidate', id: string, name: string, position: string, salary: number, yearsOfExperience: number, createdAt: any }>, candidatesCount: { __typename?: 'Count', count: number } };

export type RemoveCandidateMutationVariables = Exact<{
  removeCandidate: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type RemoveCandidateMutation = { __typename?: 'Mutation', removeCandidate: boolean };
