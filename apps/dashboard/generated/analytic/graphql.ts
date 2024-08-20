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
};

export enum Fields {
  Age = 'age',
  Position = 'position',
  Salary = 'salary',
  WorkLocation = 'workLocation',
  WorkTime = 'workTime',
  YearsOfExperience = 'yearsOfExperience'
}

export type GroupAnalyticInput = {
  field: Fields;
};

export type GroupByField = {
  __typename?: 'GroupByField';
  /** count of candidates */
  count: Scalars['Int']['output'];
  /** count of candidates */
  metric: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  GroupByField: Array<GroupByField>;
  candidateRangeAnalytic: Array<RangeAnalytic>;
};


export type QueryGroupByFieldArgs = {
  GroupAnalyticInput: GroupAnalyticInput;
};


export type QueryCandidateRangeAnalyticArgs = {
  range: Scalars['Int']['input'];
};

export type RangeAnalytic = {
  __typename?: 'RangeAnalytic';
  /** count of candidates */
  count: Scalars['Int']['output'];
  /** count of candidates */
  date: Scalars['String']['output'];
};

export type RangeAnalyticQueryVariables = Exact<{
  range: Scalars['Int']['input'];
}>;


export type RangeAnalyticQuery = { __typename?: 'Query', candidateRangeAnalytic: Array<{ __typename?: 'RangeAnalytic', date: string, count: number }> };

export type GroupByFieldQueryVariables = Exact<{
  groupAnalyticInput: GroupAnalyticInput;
}>;


export type GroupByFieldQuery = { __typename?: 'Query', GroupByField: Array<{ __typename?: 'GroupByField', metric: number, count: number }> };


export const RangeAnalyticDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"rangeAnalytic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"range"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"candidateRangeAnalytic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"range"},"value":{"kind":"Variable","name":{"kind":"Name","value":"range"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<RangeAnalyticQuery, RangeAnalyticQueryVariables>;
export const GroupByFieldDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GroupByField"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"groupAnalyticInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GroupAnalyticInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"GroupByField"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"GroupAnalyticInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"groupAnalyticInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metric"}},{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<GroupByFieldQuery, GroupByFieldQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export enum Fields {
  Age = 'age',
  Position = 'position',
  Salary = 'salary',
  WorkLocation = 'workLocation',
  WorkTime = 'workTime',
  YearsOfExperience = 'yearsOfExperience'
}

export type GroupAnalyticInput = {
  field: Fields;
};

export type GroupByField = {
  __typename?: 'GroupByField';
  /** count of candidates */
  count: Scalars['Int']['output'];
  /** count of candidates */
  metric: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  GroupByField: Array<GroupByField>;
  candidateRangeAnalytic: Array<RangeAnalytic>;
};


export type QueryGroupByFieldArgs = {
  GroupAnalyticInput: GroupAnalyticInput;
};


export type QueryCandidateRangeAnalyticArgs = {
  range: Scalars['Int']['input'];
};

export type RangeAnalytic = {
  __typename?: 'RangeAnalytic';
  /** count of candidates */
  count: Scalars['Int']['output'];
  /** count of candidates */
  date: Scalars['String']['output'];
};

export type RangeAnalyticQueryVariables = Exact<{
  range: Scalars['Int']['input'];
}>;


export type RangeAnalyticQuery = { __typename?: 'Query', candidateRangeAnalytic: Array<{ __typename?: 'RangeAnalytic', date: string, count: number }> };

export type GroupByFieldQueryVariables = Exact<{
  groupAnalyticInput: GroupAnalyticInput;
}>;


export type GroupByFieldQuery = { __typename?: 'Query', GroupByField: Array<{ __typename?: 'GroupByField', metric: number, count: number }> };
