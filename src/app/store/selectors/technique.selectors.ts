import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Technique } from 'src/app/core/models/technique.interface';
import { techniqueFeatureKey } from '../reducers/technique.reducer';

export const selectTechniquesState = createFeatureSelector<Technique[]>(techniqueFeatureKey)

export const selectTechniques = createSelector(
    selectTechniquesState,
    techniques => techniques
)