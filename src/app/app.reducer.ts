import * as appActions from './app.actions';
import {
    createFeatureSelector,
    createSelector,
    ActionReducerMap,
    combineReducers
} from '@ngrx/store';
import { InjectionToken } from '@angular/core';
export type Actions = appActions.All;

export interface AppFeatureModel {
    appFeatureModel: {
        app: State;
    };
}

export interface State {
    permissions: any[];
}

const initialState: State = {
    permissions: null
};

export function reducer(state: State = initialState, action: Actions): State {
    switch (action.type) {
        case appActions.GET_APP_PERMISSIONS_SUCCESS: {
            return { ...state, permissions: action.payload };
        }
        default:
            return state;
    }
}

export const reducers = combineReducers({ app: reducer });

export const reducersToken = new InjectionToken<
    ActionReducerMap<AppFeatureModel>
    >('Reducers');

export function getReducers() {
    return {
        appFeatureModel: reducers
    };
}

export const reducerProvider = [
    { provide: reducersToken, useFactory: getReducers }
];

export const selectAppState = createFeatureSelector<State>(
    'appFeatureModel'
);
// export const selectAuthStatusState = createSelector(
//   selectAppState,
//   (state: any) => {
//     console.log('Hey', state);
//     return state.appFeatureModel;
//   }
// );

export const getAppPermissions = createSelector(
    selectAppState,
    (state: any) => {
        console.warn('state', state);
        return state.app.permissions;
    }
);
