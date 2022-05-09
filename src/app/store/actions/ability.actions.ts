import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Ability } from 'src/app/core/models/ability.interface';

export const getAbilities = createAction(
  '[Protected] Get Abilities'
);
export const getAbilitiesSuccess = createAction(
  '[Protected] Get Abilities Success',
  props<{ abilities: Ability[] }>()
);
export const getAbilitiesFailure = createAction(
  '[Protected] Get Abilities Failure',
  props<{ failureResponse: HttpErrorResponse }>()
);

// Ajouter une capacité:
export const addAbility = createAction(
  '[Protected] add Ability',
  props<{ newAbility: Ability }>()
);
export const addAbilityError = createAction(
  '[Protected] Add Ability Error',
  props<{ error: HttpErrorResponse }>()
);
// Update
export const updateAbility = createAction(
  '[Protected] Update Ability',
  props<{ updatedAbility: Ability }>()
);
export const updateAbilityFailure = createAction(
  '[Protected] Update Ability Failure',
  props<{ failureResponse: HttpErrorResponse }>()
);
// Supprimer une capacité:
export const deleteAbility = createAction(
  '[Protected] Delete Ability',
  props<{ id: number }>()
);
export const deleteAbilitySuccess = createAction(
  '[Protected] Delete Ability Success',
  props<{ id: number }>()
);
export const deleteAbilityError = createAction(
  '[Protected] Delete Ability Error',
  props<{ error: HttpErrorResponse }>()
);




