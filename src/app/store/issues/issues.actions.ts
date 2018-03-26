import { Action } from '@ngrx/store';

import { Issue } from '../../models/github.models';

export const LOAD_ISSUES = '[load] - [issues]';
export const LOAD_ISSUES_FOR_PAGE = '[load] - [issues] - [page]';
export const LOAD_ISSUES_SUCCESS = '[load] - [issues] - [success]';
export const LOAD_ISSUES_FOR_PAGE_SUCCESS = '[load] - [issues] - [page] - [success]';
export const LOAD_SELECTED_ISSUE = '[load] - [selected] - [issue]';
export const LOAD_SELECTED_ISSUE_SUCCESS = '[load] - [selected] - [issue] - [success]';
export const LOAD_ISSUES_FAILURE = '[load] - [issues] - [failure]';

export class LoadIssues implements Action {
  readonly type = LOAD_ISSUES;

  constructor(public payload: {owner: string, repo: string, perPage: number, page: number, state: string}) { }
}

export class LoadIssuesForPage implements Action {
    readonly type = LOAD_ISSUES_FOR_PAGE;
    constructor(public payload: {owner: string, repo: string, perPage: number, page: number, state: string}) { }
}

export class LoadIssuesSuccess implements Action {
    readonly type = LOAD_ISSUES_SUCCESS;

    constructor(public payload: {
        issues: Array<Issue>,
        totalCount: number
    }) { }
}

export class LoadIssuesForPageSuccess implements Action {
    readonly type = LOAD_ISSUES_FOR_PAGE_SUCCESS;
    constructor(public payload: Array<Issue>) { }
}

export class LoadSelectedIssue implements Action {
    readonly type = LOAD_SELECTED_ISSUE;
    constructor(public payload: {owner: string, repo: string, issueNumber: number}) { }
}

export class LoadSelectedIssueSuccess implements Action {
    readonly type = LOAD_SELECTED_ISSUE_SUCCESS;
    constructor(public payload: Issue) { }
}

export class LoadIssuesFailure implements Action {
    readonly type = LOAD_ISSUES_FAILURE;
}

export type All = LoadIssues | LoadIssuesForPage 
    | LoadIssuesSuccess | LoadIssuesForPageSuccess
    | LoadSelectedIssue | LoadSelectedIssueSuccess 
    | LoadIssuesFailure