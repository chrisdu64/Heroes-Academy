import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { TechniquesService } from 'src/app/core/services/techniques.service';
import { addTechnique, addTechniqueFailure, deleteTechnique, DeleteTechniqueError, deleteTechniqueSuccess, getTechniques, getTechniquesFailure, getTechniquesSuccess, updateTechnique, updateTechniqueFailure } from '../actions/technique.actions';



@Injectable()
export class TechniqueEffects {
  getTechniques$ = createEffect(() => this.actions$.pipe(
    ofType(getTechniques),
    switchMap(action => this.techniquesService.getTechniques$().pipe(
      map(techniques => getTechniquesSuccess({ techniques: techniques })),
      catchError(failureResponse => of(getTechniquesFailure({ failureResponse })))
    )),
  ));

  deleteTechnique$ = createEffect(() => this.actions$.pipe(
    ofType(deleteTechnique),
    switchMap(action => this.techniquesService.deleteTechnique$(action.id).pipe(
      map(_ => deleteTechniqueSuccess({ id: action.id })),
      catchError(() => of(DeleteTechniqueError))
    )),
  ));

  addTechnique$ = createEffect(() => this.actions$.pipe(
    ofType(addTechnique),
    switchMap(action => this.techniquesService.addTechnique$(action.newTechnique).pipe(
      map(_ => getTechniques()),
      catchError(() => of(addTechniqueFailure))
    )),
  ));

  updateTechnique$ = createEffect(() => this.actions$.pipe(
    ofType(updateTechnique),
    switchMap(action => this.techniquesService.updateTechnique$(action.updatedTechnique).pipe(
      map(_ => getTechniques()),
      catchError(() => of(updateTechniqueFailure)),
    )),
  ));

  constructor(
    private actions$: Actions,
    private techniquesService: TechniquesService) { }

}
