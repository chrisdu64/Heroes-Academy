import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ability } from '../models/ability.interface';

@Injectable({
  providedIn: 'root'
})
export class AbilitiesService {
  abilities$!: Observable<Ability[]>;
  // abilities: Ability[] = [
  //   { id: 1, heroId: 1, name: 'Chakra de Kyubi' },
  //   { id: 2, heroId: 1, name: 'Pouvoir du sage des 6 chemins' },
  //   { id: 3, heroId: 1, name: 'Maîtrise du vent' },
  //   { id: 4, heroId: 2, name: 'Sharingan' },
  //   { id: 5, heroId: 2, name: 'Maniement du sabre' },
  //   { id: 6, heroId: 2, name: 'Maîtrise du feu' },
  //   { id: 7, heroId: 2, name: 'Maîtrise de la foudre' },
  //   { id: 8, heroId: 3, name: 'Soin' },
  //   { id: 9, heroId: 3, name: 'Force exceptionnelle' }
  // ]
  constructor(private http: HttpClient) { }

  getAbilities(): Observable<Ability[]> {
    return this.http.get<Ability[]>(environment.apiUrl + '/abilities');
  }

  // getAbilitiesByHeroId(heroId: number): Observable<Ability[]> {

  //   return this.http.get<Ability[]>(environment.apiUrl + "/abilities?heroId=" + heroId)
  // }

  // lengthAbilities(heroId: number): number {
  //   return this.getAbilitiesByHeroId(heroId).length;
  // }


  // getAbilities(): Ability[] {
  //   return this.abilities;
  // }
}
