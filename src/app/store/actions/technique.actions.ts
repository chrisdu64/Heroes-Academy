import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { Technique } from 'src/app/core/models/technique.interface';

export const getTechniques = createAction(
  '[Technique] Get Techniques'
);
export const getTechniquesSuccess = createAction(
  '[Technique] Get Techniques Success',
  props<{ techniques: Technique[] }>()
);
export const getTechniquesFailure = createAction(
  '[Technique] Get Techniques Failure',
  props<{ failureResponse: HttpErrorResponse }>()
);




