import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getAbilities } from 'src/app/store/actions/ability.actions';
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
    private store: Store
  ) { }

  setHeroesDto$(): void {
    this.heroesDto$ = forkJoin([this.heroes$, this.abilities$, this.techniques$]).pipe(
      map(([heroes, abilities, techniques]) =>
        heroes.map(hero => ({
          ...hero,
          abilities: abilities.filter(
            ability => ability.heroId === hero.id),
          techniques: techniques.filter(
            technique => technique.heroId === hero.id)
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

  getHeroesDtoByHeroDtoName$(heroDtoName: string): Observable<HeroDto[]> {
    return this.getHeroesDto$().pipe(
      map(heroesDto => heroesDto.filter(
        heroDto => heroDto.name.toLowerCase().includes(heroDtoName.toLowerCase()))
      ));
  }

  getHeroesDtoByAbilityName$(abilityName: string): Observable<HeroDto[]> {
    return this.getHeroesDto$().pipe(
      map(heroesDto => heroesDto.filter(
        heroDto => heroDto.abilities.some(
          ability => ability.name.toLowerCase().includes(abilityName.toLowerCase())
        )
      ))
    )
  }

  getHeroesByTechniqueName$(techniqueName: string): Observable<HeroDto[]> {
    return this.getHeroesDto$().pipe(
      map(heroesDto => heroesDto.filter(
        heroDto => heroDto.techniques.some(
          technique => technique.name.toLowerCase().includes(techniqueName.toLowerCase())
        )
      ))
    )
  }

  getHeroesDtoBySearchTerm$(searchTerm: string): Observable<HeroDto[]> {
    return forkJoin([
      this.getHeroesDtoByHeroDtoName$(searchTerm),
      this.getHeroesDtoByAbilityName$(searchTerm),
      this.getHeroesByTechniqueName$(searchTerm)]).pipe(
        map(([
          searchByName,
          searchByAbility,
          searchByTechnique]) => ([
            ...searchByName,
            ...searchByAbility,
            ...searchByTechnique].reduce((acc, cur) => {
              if (!acc.some(heroDto => heroDto.id === cur.id)) acc = [...acc, cur]
              return acc;
            }, [] as HeroDto[]))
        ),
        map(searchResult => searchResult.sort(
          (a: HeroDto, b: HeroDto) => (a.name > b.name ? 1 : (
            a.name === b.name ? 0 : -1)))
        )
      );
  }
  // Il existe 2 autres façons d'écrire la condition if:
  // if (!acc.find(heroDto => heroDto.id === cur.id)) acc.push(cur)
  // if (acc.every(heroDto => heroDto.id !== cur.id)) acc.push(cur)

  // Alternative :
  // getHeroesDtoBySearchTerm$(searchTerm: string): Observable<HeroDto[]> {
  //   //   return this.getHeroesDto$().pipe(
  //   //     map(heroesDto => heroesDto.filter(
  //   //       heroDto => heroDto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   //         heroDto.abilities.some(
  //   //           ability => ability.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   //         ) ||
  //   //         heroDto.techniques.some(
  //   //           technique => technique.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   //         )
  //   //     ))
  //   //   );
  //   // }

  //   return forkJoin([this.heroesDto$, this.abilities$, this.techniques$]).pipe(
  //     map(([heroesDto, abilities, techniques]) =>
  //       heroesDto.filter(heroDto => ({
  //         ...heroDto,
  //         name: heroDto.name.toLowerCase().includes(searchTerm.toLowerCase()),
  //         abilities: abilities.some(
  //           ability => ability.name.toLowerCase().includes(searchTerm.toLowerCase())
  //         ),
  //         techniques: techniques.some(
  //           technique => technique.name.toLowerCase().includes(searchTerm.toLowerCase())
  //         )
  //       }))
  //     )
  //   );
  // }

}