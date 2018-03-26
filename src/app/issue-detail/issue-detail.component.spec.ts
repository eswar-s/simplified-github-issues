import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AppState } from '../store/app.state';
import { reducers } from '../store/app.reducers';
import { GithubService } from '../services/github.service';
import { IssueDetailComponent } from './issue-detail.component';

describe('IssueDetailComponent', () => {
  let component: IssueDetailComponent;
  let fixture: ComponentFixture<IssueDetailComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [ IssueDetailComponent ],
      providers: [
        {
          provide: GithubService,
          useClass: class {
            getIssuesWithCount = jasmine.createSpy('GithubService.getIssuesWithCount');;
            getIssuesForPage = jasmine.createSpy('GithubService.getIssuesForPage');
            getSelectedIssue = jasmine.createSpy('GithubService.getSelectedIssue');
            getMarkdownData =  jasmine.createSpy('GithubService.getMarkdownData');;
          }
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
