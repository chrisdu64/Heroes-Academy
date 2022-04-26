import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Ability } from '../models/ability.interface';

@Injectable({
  providedIn: 'root'
})
export class AbilitiesService {
  abilities$!: Observable<Ability[]>;

  constructor(
    private http: HttpClient,
    private router: Router) { }

  getAbilities$(): Observable<Ability[]> {
    return this.http.get<Ability[]>(environment.apiUrl + '/abilities');
  }

  addAbility$(formValue: { name: string, heroId: number }): Observable<Ability> {
    return this.getAbilities$().pipe(
      map(abilities => [...abilities].sort((a: Ability, b: Ability) => a.id - b.id)),
      map(sortedAbilities => sortedAbilities[sortedAbilities.length - 1]),
      map(previousAbility => ({
        ...formValue,
        id: previousAbility.id + 1
      })),
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
