import { ActionReducerMap } from '@ngrx/store';

import { Issue } from '../models/github.models';
import { issuesReducer } from './issues/issues.reducer';

export enum LoadingStatus {
    INITIAL,
    LOADING,
    SUCCESS,
    FAILURE
}

export interface AppState {
    issues: IssuesState;
}

export interface IssuesState {
    issues: Array<Issue>;
    loadingStatus: LoadingStatus;
    perPage: number;
    currentPage: number;
    totalCount: number;
    selectedIssue: Issue;
}