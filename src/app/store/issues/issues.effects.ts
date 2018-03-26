import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { withLatestFrom, map, switchMap, catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material';

import { GithubService } from '../../services/github.service';
import { AppState, IssuesState } from '../app.state';
import * as IssuesActions from './issues.actions';
import { Issue } from '../../models/github.models';


@Injectable()
export class IssuesEffects {

    // MARK: - Constructor

    constructor(
        public githubService: GithubService,
        public store: Store<AppState>,
        private actions$: Actions,
        private snackBar: MatSnackBar
    ) { }

    @Effect() loadIssues$ = this.actions$.ofType(IssuesActions.LOAD_ISSUES)
        .pipe(
            withLatestFrom(this.store.select('issues')),
            switchMap(([action, issueState]: [IssuesActions.LoadIssues, IssuesState]) => {
                return this.githubService.getIssuesWithCount(action.payload.owner, action.payload.repo, action.payload.perPage, action.payload.page, action.payload.state)
            }),
            map((response: {issues: Issue[], count: number}) => {
                return new IssuesActions.LoadIssuesSuccess({
                    issues: response.issues,
                    totalCount: response.count
                })
            }),
            catchError((error, caught) => {
                this.snackBar.open('Sorry! Facing issues with GitHub API', 'Ok', {
                    duration: 5000,
                });
                return Observable.of(new IssuesActions.LoadIssuesFailure())
            })
        );

    @Effect() loadIssuesForPage$ = this.actions$.ofType(IssuesActions.LOAD_ISSUES_FOR_PAGE)
        .pipe(
            withLatestFrom(this.store.select('issues')),
            switchMap(([action, issueState]: [IssuesActions.LoadIssues, IssuesState]) => {
                return this.githubService.getIssuesForPage(action.payload.owner, action.payload.repo, action.payload.perPage, action.payload.page, action.payload.state)
            }),
            map((issues: Issue[]) => {
                return new IssuesActions.LoadIssuesForPageSuccess(issues);
            }),
            catchError((error, caught) => {
                this.snackBar.open('Sorry! Facing issues with GitHub API', 'Ok', {
                    duration: 5000,
                });
                return Observable.of(new IssuesActions.LoadIssuesFailure())
            })
            
        );

    @Effect() loadSelectedIssue$ = this.actions$.ofType(IssuesActions.LOAD_SELECTED_ISSUE)
        .pipe(
            switchMap((action: IssuesActions.LoadSelectedIssue) => {
                return this.githubService.getSelectedIssue(action.payload.owner, action.payload.repo, action.payload.issueNumber)
            }),
            map((issue: Issue) => {
                return new IssuesActions.LoadSelectedIssueSuccess(issue);
            }),
            catchError((error, caught) => {
                this.snackBar.open('Sorry! Facing issues with GitHub API', 'Ok', {
                    duration: 5000,
                });
                return Observable.of(new IssuesActions.LoadIssuesFailure())
            })
            
        );
}
