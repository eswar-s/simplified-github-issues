import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { PageEvent } from '@angular/material';

import { AppState, LoadingStatus } from '../store/app.state';
import * as IssuesActions from '../store/issues/issues.actions';
import { Issue } from '../models/github.models';

@Component({
  selector: 'ds-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {

  issues$: Observable<Array<Issue>>;
  perPage$: Observable<number>;
  currentPage$: Observable<number>;
  totalCount$: Observable<number>;
  loadingStatus$: Observable<LoadingStatus>;

  owner: string;
  repo: string;
  state: string;

  constructor(public store: Store<AppState>, private route: ActivatedRoute) {
    this.cookDefaultValuesFromStorage();
    this.issues$ = this.store.select('issues').select('issues');
    this.perPage$ = this.store.select('issues').select('perPage');
    this.currentPage$ = this.store.select('issues').select('currentPage');
    this.totalCount$ = this.store.select('issues').select('totalCount');
    this.loadingStatus$ = this.store.select('issues').select('loadingStatus');
  }

  private cookDefaultValuesFromStorage() {
    this.state = 'open';
    this.owner = 'angular';
    this.repo = 'angular';
    let state = localStorage.getItem('state');
    let owner = localStorage.getItem('owner');
    let repo = localStorage.getItem('repo');
    if (state) {
      this.state = state;
    }
    if (owner) {
      this.owner = owner;
    }
    if (repo) {
      this.repo = repo;
    }
  }

  ngOnInit() {
    this.store.dispatch(new IssuesActions.LoadIssues({
      owner: this.owner,
      repo: this.repo,
      perPage: 10,
      page: 1,
      state: this.state
    }));
  }

  changeRepo() {
    this.state = 'open';
    localStorage.setItem('state', this.state);
    localStorage.setItem('owner', this.owner);
    localStorage.setItem('repo', this.repo);

    this.store.dispatch(new IssuesActions.LoadIssues({
      owner: this.owner,
      repo: this.repo,
      perPage: 10,
      page: 1,
      state: this.state
    }));
  }

  getStateIcon(issue: Issue): string {
    if (issue.pull_request) {
      return 'pull-request';
    } else if (issue.state == 'open') {
      return 'issue-opened';
    } else if (issue.state == 'closed') {
      return 'issue-closed';
    }
  }

  getIssueInfo(issue: Issue): string {
    if (issue.state == 'closed') {
      return `#${issue.number} by ${issue.user.login} was ${issue.state} ${this.getDays(issue.closed_at)} days ago`
    } else if (issue.state == 'open') {
      return `#${issue.number} opened ${this.getDays(issue.created_at)} days ago by ${issue.user.login}`
    }
  }

  paginatorChanges(event: PageEvent) {
    this.store.dispatch(new IssuesActions.LoadIssuesForPage({
      owner: this.owner,
      repo: this.repo,
      perPage: event.pageSize,
      page: event.pageIndex + 1,
      state: this.state
    }));
  }

  changeState() {
    localStorage.setItem('state', this.state);
    this.store.dispatch(new IssuesActions.LoadIssues({
      owner: this.owner,
      repo: this.repo,
      perPage: 10,
      page: 1,
      state: this.state
    }));
  }

  getDays(date: string) {
    return Math.ceil(Math.abs(new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24));
  }

}
