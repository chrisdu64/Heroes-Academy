import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HeroDto } from '../models/heroDto.interface';
import { AbilitiesService } from './abilities.service';
import { HeroesService } from './heroes.service';
import { TechniquesService } from './techniques.service';

@Injectable({
  providedIn: 'root'
})
export class HeroesDtoService {

  heroes$ = this.heroesService.getHeroes$();
  abilities$ = this.abilitiesService.getAbilities$();
  techniques$ = this.techniquesService.getTechniques$();

  heroesDto$!: Observable<HeroDto[]>;

  constructor(
    private heroesService: HeroesService,
    private abilitiesService: AbilitiesService,
    private techniquesService: TechniquesService,
    private http: HttpClient
  ) { }

  setHeroesDto$(): void {
    this.heroesDto$ = forkJoin([this.heroes$, this.abilities$, this.techniques$]).pipe(
      map(([heroes, abilities, techniques]) =>
        heroes.map(hero => ({
          ...hero,
          abilities: abilities.filter(ability => ability.heroId === hero.id),
          techniques: techniques.filter(technique => technique.heroId === hero.id)
        }))
      )
    );
  }

  getHeroesDto$(): Observable<HeroDto[]> {
    if (this.heroesDto$ === undefined) {
      this.setHeroesDto$();
    };
    return this.heroesDto$;
  }

  getHeroesDtoBySearchTerm$(searchTerm: string): Observable<HeroDto[]> {
    return this.getHeroesDto$().pipe(
      map(heroesDto => heroesDto.filter(heroDto => heroDto.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      ))
  }


  // addHeroDto$(formValue: { name: string, description: string, myImg: string }): Observable<HeroDto> {

  //   return this.getHeroesDto$().pipe(
  //     map(heroesDto => [...heroesDto].sort((a: HeroDto, b: HeroDto) => a.id - b.id)),
  //     map(sortedHeroesDto => sortedHeroesDto[sortedHeroesDto.length - 1]),
  //     map(previousHeroDto => ({
  //       ...formValue,
  //       id: previousHeroDto.id + 1,
  //       abilities: previousHeroDto.abilities = [],
  //       techniques: previousHeroDto.techniques = []
  //     })),
  //     switchMap(newHeroDto => this.http.post<HeroDto>(environment.apiUrl + "heroes", newHeroDto))
  //   )
  // }

  // getHeroesDtoById$(heroId: number): Observable<HeroDto> {
  //   return this.http.get<HeroDto>(`http://localhost:3200/heroes/${heroId}`)
  // }

}