import { ActionReducerMap } from '@ngrx/store';

import { issuesReducer } from './issues/issues.reducer';
import { AppState } from './app.state';

export const reducers: ActionReducerMap<AppState> = {
    issues: issuesReducer
};
