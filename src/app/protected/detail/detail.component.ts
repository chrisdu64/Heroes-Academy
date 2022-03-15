import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { HeroDto } from 'src/app/core/models/heroDto.interface';
import { HeroesDtoService } from 'src/app/core/services/heroes-dto.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {

  subHeroesDto!: Subscription;
  heroDto!: HeroDto | undefined;
  heroId!: number;

  constructor(
    private heroesDtoService: HeroesDtoService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.heroId = +this.route.snapshot.params['id'];

    this.subHeroesDto = this.heroesDtoService.getHeroesDto$().subscribe(
      heroesDto => this.heroDto = heroesDto.find(
        heroDto => heroDto.id === this.heroId
      )
    );
  }

  ngOnDestroy(): void {
    this.subHeroesDto.unsubscribe();
  }

  onReturn() {
    this.router.navigateByUrl('heroes');
  }


}
