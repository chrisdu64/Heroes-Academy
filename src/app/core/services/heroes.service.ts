import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Hero } from '../models/hero.interface';
// import { AbilitiesService } from './abilities.service';
// import { TechniquesService } from './techniques.service';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  // abilities$!: Observable<Ability[]>;
  // abilities$ = this.abilitiesService.getAbilities();
  // techniques$!: Observable<Technique[]>;
  // techniques$ = this.techniquesService.getTechniques();
  // heroes$!: Observable<Hero[]>;

  constructor(private http: HttpClient) { }

  getHeroes$(): Observable<Hero[]> {
    return this.http.get<Hero[]>(environment.apiUrl + '/heroes');
  }

  getHeroesById$(id: number): Observable<Hero> {
    return this.http.get<Hero>(environment.apiUrl + "/heroes/" + id)
  }

  addHero$(formValue: { name: string, description: string, myImg: string }): Observable<Hero> {

    return this.getHeroes$().pipe(
      map(heroes => [...heroes].sort((a: Hero, b: Hero) => a.id - b.id)),
      map(sortedHeroes => sortedHeroes[sortedHeroes.length - 1]),
      map(previousHero => ({
        ...formValue,
        id: previousHero.id + 1
      })),
      switchMap(newHero => this.http.post<Hero>(environment.apiUrl + "/heroes/", newHero)),
    )
  }

}
  // getHeroesById(heroId: number): Hero {
  //   const hero = this.heroes.find(hero => hero.id === heroId);
  //   if (!hero) {
  //     throw new Error("Hero not found");
  //   } else {
  //     return hero;
  //   }
  // }

  // getAllHeroes(): Hero[] {
  //   return this.heroes;
  // }

  //  Les abilities //




  // getTechniquesByHeroId(heroId: number): Technique[] {
  //   const techniquesByHeroId: any = [];

  //   this.techniques.forEach(technique => technique.heroId === heroId ? techniquesByHeroId.push(technique) : null
  //   );
  //   return techniquesByHeroId;
  // }


  // getAbilitiesByHeroId(heroId: number): Ability[] {

  //   const abilitiesByHeroId = [];
  //   const aL = this.abilities.length;

  //   for (let i = 0; i < aL; i++) {

  //     if (this.abilities[i].heroId === heroId) {
  //       abilitiesByHeroId.push(this.abilities[i]);
  //     }
  //   }
  //   return abilitiesByHeroId;
  // }

  // lengthAbilities(heroId: number): number {
  //   return this.getAbilitiesByHeroId(heroId).length;
  // }

  // Les techniques //

  //  1ère méthode : boucle for ------ //

  // getTechniquesByHeroId(heroId: number): Technique[] {

  //   const techniquesByHeroId = [];
  //   const tL = this.techniquesService.techniques.length;

  //   for (let i = 0; i < tL; i++) {
  //     if (this.techniquesService.techniques[i].heroId === heroId) {
  //       techniquesByHeroId.push(this.techniquesService.techniques[i])
  //     }
  //   }
  //   return techniquesByHeroId;
  // }

  // 2ème méthode: forEach ----- //

  // getTechniquesByHeroId(heroId: number): Technique[] {
  //   const techniquesByHeroId: any = [];

  //   this.techniques.forEach(technique => technique.heroId === heroId ? techniquesByHeroId.push(technique) : null
  //   );
  //   return techniquesByHeroId;
  // }

  // lengthTechniques(heroId: number): number {

  //   return this.getTechniquesByHeroId(heroId).length;
  // }

  // Obtenir l'id //


