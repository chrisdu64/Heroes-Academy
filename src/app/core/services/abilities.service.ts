import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ability } from '../models/ability.interface';

@Injectable({
  providedIn: 'root'
})
export class AbilitiesService {
  abilities$!: Observable<Ability[]>;

  constructor(private http: HttpClient) { }

  getAbilities$(): Observable<Ability[]> {
    return this.http.get<Ability[]>(environment.apiUrl + '/abilities').pipe(
    );
  }

  addAbility$(formValue: { name: string, heroId: number }): Observable<Ability> {
    return this.getAbilities$().pipe(
      map(() => formValue),
      switchMap(newAbility => this.http.post<Ability>(environment.apiUrl + "/abilities/", newAbility))
    )
  }

  updateAbility$(formValue: { id: number, name: string, heroId: number }): Observable<Ability> {
    return this.getAbilities$().pipe(
      map(() => formValue),
      switchMap(updatedAbility => this.http.patch<Ability>(environment.apiUrl + `/abilities/${formValue.id}`, updatedAbility))
    )
  }

  deleteAbility$(id: number): Observable<Ability[]> {
    return this.http.delete<any>(environment.apiUrl + `/abilities/${id}`)
  }
}
