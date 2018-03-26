import { createSelector, Selector } from '@ngrx/store';

import { AppState, IssuesState, LoadingStatus } from '../app.state';
import * as issuesActions from './issues.actions';
import { Issue } from '../../models/github.models';

const initialState: IssuesState = {
    issues: [],
    loadingStatus: LoadingStatus.INITIAL,
    perPage: 0,
    currentPage: 0,
    totalCount: 0,
    selectedIssue: null
};

export function issuesReducer(state = initialState, action: issuesActions.All): IssuesState {
    switch (action.type) {
        case issuesActions.LOAD_ISSUES: {
            return { 
                ...state, 
                loadingStatus: LoadingStatus.LOADING,
                perPage: action.payload.perPage,
                currentPage: action.payload.page
            };
        }
        case issuesActions.LOAD_ISSUES_FOR_PAGE: {
            return { 
                ...state, 
                loadingStatus: LoadingStatus.LOADING,
                perPage: action.payload.perPage,
                currentPage: action.payload.page
            };
        }
        case issuesActions.LOAD_ISSUES_SUCCESS: {
            return { 
                ...state, 
                loadingStatus: LoadingStatus.SUCCESS, 
                issues: action.payload.issues,
                totalCount: action.payload.totalCount
            };
        }
        case issuesActions.LOAD_ISSUES_FOR_PAGE_SUCCESS: {
            return { 
                ...state, 
                loadingStatus: LoadingStatus.SUCCESS, 
                issues: action.payload
            };
        }
        case issuesActions.LOAD_SELECTED_ISSUE: {
            if (state.issues && state.issues.length > 0) {
                return { 
                    ...state, 
                    loadingStatus: LoadingStatus.LOADING,
                    selectedIssue: state.issues.find(issue => issue.number == action.payload.issueNumber)
                };
            }
            return {
                ...state,
                loadingStatus: LoadingStatus.LOADING,
                selectedIssue: null
            };
        }
        case issuesActions.LOAD_SELECTED_ISSUE_SUCCESS: {
            return { 
                ...state, 
                loadingStatus: LoadingStatus.SUCCESS, 
                selectedIssue: action.payload
            };
        }
        case issuesActions.LOAD_ISSUES_FAILURE: {
            return { ...state, loadingStatus: LoadingStatus.FAILURE };
        }
        default: {
            return state;
        }
    }
}

const getIssuesState: Selector<AppState, IssuesState> = (state: AppState) => state.issues;

export const getIssues: Selector<AppState, Issue[]> = createSelector(
    getIssuesState, (state: IssuesState) => state.issues);

export const getLoadingStatus: Selector<AppState, LoadingStatus> = createSelector(
    getIssuesState, (state: IssuesState) => state.loadingStatus);

export const getSelectedIssue: Selector<AppState, Issue> = createSelector(
    getIssuesState, (state: IssuesState) => state.selectedIssue);