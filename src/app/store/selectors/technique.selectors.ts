import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Technique } from 'src/app/core/models/technique.interface';
import { techniqueFeatureKey } from '../reducers/technique.reducer';

export const selectTechniquesState = createFeatureSelector<Technique[]>(techniqueFeatureKey)

export const selectTechniques = createSelector(
    selectTechniquesState,
    techniques => techniques
);

export const selectTechniqueByHeroId = (heroId: number) => createSelector(
    selectTechniques,
    techniques => techniques.filter(technique => technique.heroId === heroId)
);

export const selectTechniquesByIdForUpdate = (id: number) => createSelector(
    selectTechniques,
    techniques => techniques.find(technique => technique.id === id)
);