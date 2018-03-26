import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IssuesComponent } from './issues/issues.component';
import { IssueDetailComponent } from './issue-detail/issue-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/repos/angular/angular/issues', pathMatch: 'full' },
  { path: 'repos/:owner/:repo/issues', component: IssuesComponent },
  { path: 'repos/:owner/:repo/issues/:number', component: IssueDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
