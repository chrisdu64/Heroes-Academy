import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    private techniquesService: TechniquesService
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
      map(heroesDto => heroesDto.filter(
        heroDto => heroDto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          heroDto.abilities.some(
            ability => ability.name.toLowerCase().includes(searchTerm.toLowerCase())
          ) ||
          heroDto.techniques.some(
            technique => technique.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
      ))
    );
  }


  // getHeroesDtoByHeroDtoName$(heroDtoName: string): Observable<HeroDto[]> {
  //   return this.getHeroesDto$().pipe(
  //     map(heroesDto => heroesDto.filter(
  //       heroDto => heroDto.name.toLowerCase().includes(heroDtoName.toLowerCase()))
  //     ));
  // }

  // getHeroesDtoByAbilityName$(abilityName: string): Observable<HeroDto[]> {
  //   console.log("le truc quon tape:", abilityName);

  //   return this.getHeroesDto$().pipe(
  //     map(heroesDto => heroesDto.filter(
  //       heroDto => heroDto.abilities.some(
  //         ability => ability.name.toLowerCase().includes(abilityName.toLowerCase())
  //       )
  //     ))
  //   )
  // }

  // getHeroesDtoByTechniqueName$(techniqueName: string): Observable<HeroDto[]> {
  //   return this.getHeroesDto$().pipe(
  //     map(heroesDto => heroesDto.filter(
  //       heroDto => heroDto.techniques.some(
  //         technique => technique.name.toLowerCase().includes(techniqueName.toLowerCase())
  //       )
  //     ))
  //   )
  // }


  //   return forkJoin([this.heroesDto$, this.abilities$, this.techniques$]).pipe(
  //     map(([heroesDto, abilities, techniques]) =>
  //       heroesDto.filter(heroDto => ({
  //         ...heroDto,
  //         abilities: abilities.some(ability => ability.name.toLowerCase().includes(searchTerm.toLowerCase())),
  //         techniques: techniques.some(technique => technique.name.toLowerCase().includes(searchTerm.toLowerCase()))
  //       })
  //       ))
  //   );
  // }
  // this.getHeroesDto$().pipe(

  //   // tap(res => console.log("RES 1: ", res)),
  //   tap(res => console.log("RES 1: ", res)),
  //   // filter((heroesDto: HeroDto[]) => heroesDto.map(
  //   //   (heroDto: HeroDto) => heroDto.abilities.filter(
  //   //     ability => ability.name.toLowerCase().includes(abilityName.toLowerCase())
  //   //   )
  //   // )),
  //   // tap(res => console.log("RES 2: ", res))),
  //   // map(heroesDto => heroesDto.filter(
  //   //   heroDto => heroDto.abilities.filter(
  //   //     ability => ability.name.toLowerCase().includes(abilityName.toLowerCase())
  //   //   )
  //   // )),
  //   // // tap(res => console.log("RES 1: ", res)),

  //   // // map(abilities => abilities.filter(
  //   // //   ability => ability.name.toLowerCase().includes(abilityName.toLowerCase())
  //   // // )),
  //   tap(res => console.log("RES 2: ", res)));
  // }

  // getHeroesDtoById$(heroId: number): Observable<HeroDto> {
  //   return this.http.get<HeroDto>(`http://localhost:3200/heroes/${heroId}`)
  // }

}