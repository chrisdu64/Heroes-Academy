import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { Ability } from 'src/app/core/models/ability.interface';
import { Hero } from 'src/app/core/models/hero.interface';
import { HeroDto } from 'src/app/core/models/heroDto.interface';
import { AbilitiesService } from 'src/app/core/services/abilities.service';
import { HeroesService } from 'src/app/core/services/heroes.service';
import { map, tap } from 'rxjs/operators';
import { Technique } from 'src/app/core/models/technique.interface';
import { TechniquesService } from 'src/app/core/services/techniques.service';
import { HeroesDtoService } from 'src/app/core/services/heroes-dto.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit, OnDestroy {

  heroes$!: Observable<Hero[]>;
  heroes!: Hero[];

  heroesDto$!: Observable<HeroDto[]>;
  heroesDto!: HeroDto[];

  abilities$!: Observable<Ability[]>;
  abilities!: Ability[];

  techniques$!: Observable<Technique[]>;
  techniques!: Technique[];

  subHeroes!: Subscription;
  subHeroesDto!: Subscription;

  constructor(
    private heroesService: HeroesService,
    private abilitiesService: AbilitiesService,
    private techniquesService: TechniquesService,
    private heroesDtoService: HeroesDtoService
  ) { }

  // ngOnInit(): void {
  //   this.heroes = this.heroesService.getAllHeroes();
  // }

  ngOnInit(): void {
    this.heroes$ = this.heroesService.getHeroes();
    this.subHeroes = this.heroes$.subscribe(heroes => this.heroes = heroes);

    this.abilities$ = this.abilitiesService.getAbilities();

    this.techniques$ = this.techniquesService.getTechniques();


    this.heroesDto$ = forkJoin([this.heroes$, this.abilities$, this.techniques$]).pipe(
      tap(r => console.log("1", r)),
      map(([heroes, abilities, techniques]) =>
        heroes.map(hero => ({
          ...hero,
          abilities: abilities.filter(ability => ability.heroId === hero.id), techniques: techniques.filter(technique => technique.heroId === hero.id)
        }))
      ),
      tap(r => console.log("2", r)),
      tap(heroesDto => this.heroesDtoService.setHeroesDto(heroesDto))
    );

    this.subHeroesDto = this.heroesDto$.subscribe(heroesDto => this.heroesDto = heroesDto);

  }

  ngOnDestroy(): void {
    this.subHeroes.unsubscribe();
    this.subHeroesDto.unsubscribe();
  }
}


