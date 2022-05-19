import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { AbilitiesService } from 'src/app/core/services/abilities.service';
import { addAbility, addAbilityError, deleteAbility, deleteAbilityError, deleteAbilitySuccess, getAbilities, getAbilitiesFailure, getAbilitiesSuccess, updateAbility, updateAbilityFailure } from '../actions/ability.actions';



@Injectable()
export class AbilityEffects {

  getAbilities$ = createEffect(() => this.actions$.pipe(
    ofType(getAbilities),
    switchMap(_ => this.abilitiesService.getAbilities$().pipe(
      map(abilities => getAbilitiesSuccess({ abilities: abilities })),
      catchError(failureResponse => of(getAbilitiesFailure({ failureResponse })))
    ))
  ))

  deleteAbility$ = createEffect(() => this.actions$.pipe(
    ofType(deleteAbility),
    switchMap(action => this.abilitiesService.deleteAbility$(action.id).pipe(
      map(_ => deleteAbilitySuccess({ id: action.id })),
      catchError(() => of(deleteAbilityError))
    )),
  ));

  addAbility$ = createEffect(() => this.actions$.pipe(
    ofType(addAbility),
    switchMap(action => this.abilitiesService.addAbility$(action.newAbility).pipe(
      map(_ => getAbilities()),
      catchError(() => of(addAbilityError))
    ))
  ))

  updateAbility$ = createEffect(() => this.actions$.pipe(
    ofType(updateAbility),
    mergeMap(action => this.abilitiesService.updateAbility$(action.updatedAbility).pipe(
      map(_ => getAbilities()),
      catchError(() => of(updateAbilityFailure)),
    )),
  ));
  constructor(
    private actions$: Actions,
    private abilitiesService: AbilitiesService,) { }

}
