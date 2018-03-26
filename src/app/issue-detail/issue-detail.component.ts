import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { DomSanitizer } from '@angular/platform-browser';

import { AppState, LoadingStatus } from '../store/app.state';
import * as IssuesActions from '../store/issues/issues.actions';
import { getSelectedIssue, getLoadingStatus } from '../store/issues/issues.reducer';
import { Issue } from '../models/github.models';
import { GithubService } from '../services/github.service';

@Component({
  selector: 'ds-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {

  selectedIssue: Issue;
  loadingStatus$: Observable<LoadingStatus>;

  constructor(public store: Store<AppState>, private route: ActivatedRoute, private githubService: GithubService, private sanitizer: DomSanitizer) {
    this.store.select(getSelectedIssue).subscribe(issue => this.selectedIssue = issue);
    this.loadingStatus$ = this.store.select(getLoadingStatus);
  }

  ngOnInit() {
    this.store.dispatch(new IssuesActions.LoadSelectedIssue({
      owner: this.route.snapshot.paramMap.get('owner'),
      repo: this.route.snapshot.paramMap.get('repo'),
      issueNumber: +this.route.snapshot.paramMap.get('number')
    }));
  }

  getMarkDown(text: string){
    if (text) {
      return this.sanitizer.bypassSecurityTrustHtml(text);
    }
    return '';
  }

}
