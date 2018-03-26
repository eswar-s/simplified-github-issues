import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';

import { GithubService } from './github.service';
import { Issue } from '../models/github.models';

describe('GitHubService', () => {
  let http: HttpClient;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ], 
      providers: [ GithubService,
        {provide: HttpClient, useValue: jasmine.createSpyObj('HttpClient', {'get': of([]), 'post': of([])})}
      ]
    });
    http = TestBed.get(HttpClient);
  });

  it('should be created', inject([GithubService], (service: GithubService) => {
    expect(service).toBeTruthy();
  }));

  it('should invoke http get: getIssuesWithCount', inject([GithubService], (service: GithubService) => {
    http.get = jasmine.createSpy('get').and.returnValue({
      switchMap: jasmine.createSpy('switchMap').and.returnValue({
        switchMap: jasmine.createSpy('switchMap').and.returnValue({})
      })
    });
    service.getIssuesWithCount('angular', 'angular', 25, 1, 'open');
    expect(http.get).toHaveBeenCalledWith('https://api.github.com/repos/angular/angular/issues?per_page=25&page=1&state=open', { observe: 'response' });
  }));

  it('should invoke http get: getIssuesForPage', inject([GithubService], (service: GithubService) => {
    service.getIssuesForPage('angular', 'angular', 25, 1, 'open');
    expect(http.get).toHaveBeenCalledWith('https://api.github.com/repos/angular/angular/issues?per_page=25&page=1&state=open');
  }));

  it('should invoke http get: getSelectedIssue', inject([GithubService], (service: GithubService) => {
    http.get = jasmine.createSpy('get').and.returnValue({
      switchMap: jasmine.createSpy('switchMap').and.returnValue({})
    });
    service.getSelectedIssue('angular', 'angular', 12345);
    expect(http.get).toHaveBeenCalledWith('https://api.github.com/repos/angular/angular/issues/12345');
  }));

  it('should invoke http post: getMarkdownData', inject([GithubService], (service: GithubService) => {
    http.post = jasmine.createSpy('post').and.returnValue({
      switchMap: jasmine.createSpy('switchMap').and.returnValue({})
    });
    service.getMarkdownData({body: 'some text'} as Issue);
    let body = {
      text: 'some text',
      mode: "gfm",
      context: "github/gollum"
    }
    expect(http.post).toHaveBeenCalledWith('https://api.github.com/markdown', body, {responseType: 'text'});
  }));

});
