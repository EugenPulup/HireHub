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

export type CreateCampaignInput = {
  endType: Scalars['String']['input'];
  endValue?: InputMaybe<Scalars['Int']['input']>;
  keyword: Scalars['String']['input'];
  name: Scalars['String']['input'];
  providers: Array<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCampaign: Campaign;
  removeCampaign: Campaign;
  updateCampaign: Campaign;
};


export type MutationCreateCampaignArgs = {
  createCampaignInput: CreateCampaignInput;
};


export type MutationRemoveCampaignArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateCampaignArgs = {
  updateCampaignInput: UpdateCampaignInput;
};

export type Query = {
  __typename?: 'Query';
  campaign: Array<Campaign>;
  campaignById: Campaign;
};


export type QueryCampaignArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryCampaignByIdArgs = {
  id: Scalars['String']['input'];
};

export type UpdateCampaignInput = {
  endType?: InputMaybe<Scalars['String']['input']>;
  endValue?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  keyword?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  providers?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateCampaignMutationVariables = Exact<{
  createCampaignInput: CreateCampaignInput;
}>;


export type CreateCampaignMutation = { __typename?: 'Mutation', createCampaign: { __typename?: 'Campaign', endType: string, keyword: string, name: string, providers: Array<string> } };

export type CampaignQueryVariables = Exact<{
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type CampaignQuery = { __typename?: 'Query', campaign: Array<{ __typename?: 'Campaign', name: string, keyword: string, status: string, providers: Array<string>, endType: string, endValue?: number | null, id: string }> };


export const CreateCampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCampaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"createCampaignInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateCampaignInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createCampaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"createCampaignInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"createCampaignInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"endType"}},{"kind":"Field","name":{"kind":"Name","value":"keyword"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"providers"}}]}}]}}]} as unknown as DocumentNode<CreateCampaignMutation, CreateCampaignMutationVariables>;
export const CampaignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Campaign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"campaign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"keyword"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"providers"}},{"kind":"Field","name":{"kind":"Name","value":"endType"}},{"kind":"Field","name":{"kind":"Name","value":"endValue"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CampaignQuery, CampaignQueryVariables>;
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

export type CreateCampaignInput = {
  endType: Scalars['String']['input'];
  endValue?: InputMaybe<Scalars['Int']['input']>;
  keyword: Scalars['String']['input'];
  name: Scalars['String']['input'];
  providers: Array<Scalars['String']['input']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCampaign: Campaign;
  removeCampaign: Campaign;
  updateCampaign: Campaign;
};


export type MutationCreateCampaignArgs = {
  createCampaignInput: CreateCampaignInput;
};


export type MutationRemoveCampaignArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateCampaignArgs = {
  updateCampaignInput: UpdateCampaignInput;
};

export type Query = {
  __typename?: 'Query';
  campaign: Array<Campaign>;
  campaignById: Campaign;
};


export type QueryCampaignArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};


export type QueryCampaignByIdArgs = {
  id: Scalars['String']['input'];
};

export type UpdateCampaignInput = {
  endType?: InputMaybe<Scalars['String']['input']>;
  endValue?: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['String']['input'];
  keyword?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  providers?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CreateCampaignMutationVariables = Exact<{
  createCampaignInput: CreateCampaignInput;
}>;


export type CreateCampaignMutation = { __typename?: 'Mutation', createCampaign: { __typename?: 'Campaign', endType: string, keyword: string, name: string, providers: Array<string> } };

export type CampaignQueryVariables = Exact<{
  offset: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
}>;


export type CampaignQuery = { __typename?: 'Query', campaign: Array<{ __typename?: 'Campaign', name: string, keyword: string, status: string, providers: Array<string>, endType: string, endValue?: number | null, id: string }> };
