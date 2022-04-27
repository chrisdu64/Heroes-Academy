import { createReducer, on } from '@ngrx/store';
import { Technique } from 'src/app/core/models/technique.interface';
import { deleteTechniqueSuccess, getTechniquesFailure, getTechniquesSuccess } from '../actions/technique.actions';


export const techniqueFeatureKey = 'techniques';

export const initialState: Technique[] = [];

export const techniqueReducer = createReducer(
  initialState,
  on(getTechniquesSuccess, (state, { techniques }) => techniques),
  on(getTechniquesFailure, (state) => initialState),
  on(deleteTechniqueSuccess, (state, { id }) => state.filter(technique => technique.id !== id)),
);
