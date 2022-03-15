import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HeroDto } from 'src/app/core/models/heroDto.interface';
import { HeroesDtoService } from 'src/app/core/services/heroes-dto.service';
@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss']
})
export class HeroesListComponent implements OnInit, OnDestroy {

  heroesDto$!: Observable<HeroDto[]>;
  // heroesDto!: HeroDto[];

  // subHeroesDto!: Subscription;

  constructor(
    private heroesDtoService: HeroesDtoService
  ) { }

  ngOnInit(): void {

    this.heroesDto$ = this.heroesDtoService.getHeroesDto$();
    // this.subHeroesDto = this.heroesDto$.subscribe(heroesDto => this.heroesDto = heroesDto);
  }

  ngOnDestroy(): void {
    // this.subHeroesDto.unsubscribe();
  }
}


