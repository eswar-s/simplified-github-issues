import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';

import { AppState } from '../store/app.state';
import { reducers } from '../store/app.reducers';
import { IssuesComponent } from './issues.component';
import { Issue, User } from '../models/github.models';

describe('IssuesComponent', () => {
  let component: IssuesComponent;
  let fixture: ComponentFixture<IssuesComponent>;
  let store: Store<AppState>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(reducers),
      ],
      declarations: [ IssuesComponent ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get state icon', () => {
    let icon = component.getStateIcon({state: 'open'} as Issue);
    expect(icon).toBe('issue-opened');
  });

  it('should get issue info', () => {
    let info = component.getIssueInfo({state: 'open', number: 12345, created_at: '2013-11-18T23:30:35Z', user: {login: 'loginName'} as User} as Issue);
    let dateDifference = component.getDays('2013-11-18T23:30:35Z')
    expect(info).toBe(`#12345 opened ${dateDifference} days ago by loginName`);
  });
});
