import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
      tap(res => console.log("les habilités: ", res))
    );
  }

  addAbility$(formValue: { name: string, heroId: number }): Observable<Ability> {
    return this.getAbilities$().pipe(
      map(() => formValue),
      switchMap(newAbility => this.http.post<Ability>(environment.apiUrl + "/abilities/", newAbility))
    )
  }

  deleteAbility$(id: number): Observable<Ability[]> {
    return this.http.delete<any>(environment.apiUrl + `/abilities/${id}`)
  }

  getAbilitiesByAbilityName$(abilityName: string): Observable<Ability[]> {

    return this.getAbilities$().pipe(
      map(abilities => abilities.filter(
        ability => ability.name.toLowerCase().includes(abilityName.toLowerCase())
      )
      ));
  }

}
  // deleteAbility$(heroId: number): Observable<Ability> {
  //   return this.getAbilities$().pipe(
  //     map(abilities => [...abilities]. )
  //   )
  //  return this.http.delete<Ability>(environment.apiUrl + "/abilities?heroId=" + heroId)
  // }

  // lengthAbilities(heroId: number): number {
  //   return this.getAbilitiesByHeroId(heroId).length;
  // }


  // getAbilities(): Ability[] {
  //   return this.abilities;
  // }
