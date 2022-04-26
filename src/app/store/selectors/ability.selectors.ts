import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Ability } from 'src/app/core/models/ability.interface';
import { abilityFeatureKey } from '../reducers/ability.reducer';

export const selectAbilitiesState = createFeatureSelector<Ability[]>(abilityFeatureKey)

export const selectAbilities = createSelector(
    selectAbilitiesState,
    abilities => abilities
)

export const selectAbilitiesCount = createSelector(
    selectAbilities,
    abilities => abilities?.length ?? 0
)

export const selectAbilitiesByHeroId = (heroId: number) => createSelector(
    selectAbilities,
    abilities => abilities.find(ability => ability.heroId === heroId)
)