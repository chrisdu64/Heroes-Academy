import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Hero } from 'src/app/core/models/hero.interface';
import { heroFeatureKey } from '../reducers/hero.reducer';

export const selectHeroesState = createFeatureSelector<Hero[]>(heroFeatureKey)

export const selectHeroes = createSelector(
    selectHeroesState,
    heroes => heroes
);
export const selectHeroesCountForId = createSelector(
    selectHeroes,
    heroes => heroes.length + 1
);
export const selectHeroById = (id: number) => createSelector(
    selectHeroes,
    heroes => heroes.find(
        hero => hero.id === id)
);

