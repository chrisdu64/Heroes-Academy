import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Ability } from 'src/app/core/models/ability.interface';
import { abilityFeatureKey } from '../reducers/ability.reducer';

export const selectAbilitiesState = createFeatureSelector<Ability[]>(abilityFeatureKey)

export const selectAbilities = createSelector(
    selectAbilitiesState,
    abilities => abilities
);

export const selectAbilitiesByHeroId = (heroId: number) => createSelector(
    selectAbilities,
    abilities => abilities.filter(ability => ability.heroId === heroId)
);

export const selectAbilitiesByIdForUpdate = (id: number) => createSelector(
    selectAbilities,
    abilities => abilities.find(ability => ability.id === id)
);
export const selectAbilityByHeroIdForUpdate = (heroId: number) => createSelector(
    selectAbilities,
    abilities => abilities.find(ability => ability.heroId === heroId)
);

export const selectAbilitiesCountForId = createSelector(
    selectAbilities,
    abilities => abilities.length + 1
);

export const selectAbilityValuesForUpdate = (id: number) => createSelector(
    selectAbilities,
    abilities => abilities.map(ability => ({ name: ability.name, id: ability.id, heroId: ability.heroId })).filter(
        ability => ability.id === id
    )
);
export const selectAbilityId = (id: number) => createSelector(
    selectAbilities,
    abilities => {
        let abilityId = 0
        abilities.forEach(
            ability => {
                if (ability.heroId === id) {
                    abilityId = ability.id
                    return;
                }
            }
        )
        return abilityId
    }
)