import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Issue } from '../models/github.models';

@Injectable()
export class GithubService {

  private gitHubApiUrl = 'https://api.github.com';

  constructor(private http: HttpClient) { }

  getIssuesWithCount(owner: string, repo: string, perPage: number, page: number, state: string): Observable<{issues: Issue[], count: number}> {
    let url = `${this.gitHubApiUrl}/repos/${owner}/${repo}/issues?per_page=${perPage}&page=${page}&state=${state}`;
    return this.http.get<Issue[]>(url, { observe: 'response' })
      .switchMap((response: HttpResponse<Issue[]>) => {
        let linkHeaders = response.headers.get('link').split(', ').map(val => {
          let split = val.split('; ')
          return split[0].slice(1, -1);
        });
        return Observable.of({lastPage: linkHeaders[linkHeaders.length - 1], issues: response.body});
      }).switchMap((data : {lastPage: string, issues: Issue[]}) => {
        return this.http.get<Issue[]>(data.lastPage).switchMap(lastPageIssues => {
          let lastPageNumber = +this.getParameterByName('page', data.lastPage);
          let lastPageCount = lastPageIssues.length;
          let totalCount = (perPage * (lastPageNumber - 1)) + lastPageCount;
          return Observable.of({issues: data.issues, count: totalCount});
        })
      })
  }

  getIssuesForPage(owner: string, repo: string, perPage: number, page: number, state: string): Observable<Issue[]> {
    let url = `${this.gitHubApiUrl}/repos/${owner}/${repo}/issues?per_page=${perPage}&page=${page}&state=${state}`;
    return this.http.get<Issue[]>(url);
  }

  getSelectedIssue(owner: string, repo: string, issueNumber: number): Observable<Issue> {
    let url = `${this.gitHubApiUrl}/repos/${owner}/${repo}/issues/${issueNumber}`;
    return this.http.get<Issue>(url).switchMap((issue: Issue) => this.getMarkdownData(issue));
  }

  getMarkdownData(issue: Issue): Observable<Issue> {
    let url = `${this.gitHubApiUrl}/markdown`;
    let body = {
      text: issue.body,
      mode: "gfm",
      context: "github/gollum"
    }
    return this.http.post(url, body, {responseType: 'text'}).switchMap((value: string) => {
      issue.mark_down = value;
      return Observable.of(issue);
    });
  }

  private getParameterByName(name: string, url: string) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(url);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }
}
