import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { HeroDto } from 'src/app/core/models/heroDto.interface';
import { HeroesService } from 'src/app/core/services/heroes.service';
import { selectHeroesDtoAbilitiesCount } from 'src/app/store/selectors/hero-dto.selectors';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() heroDto!: HeroDto;

  numberOfAbilities!: number;
  abilitiesCount$!: Observable<number>;
  techniquesCount!: number;
  idHero!: number;


  constructor(
    private router: Router,
    private heroesService: HeroesService,
    private store: Store) {
  }

  ngOnInit(): void {
    this.idHero = this.heroDto.id;
    this.abilitiesCount$ = this.store.select(selectHeroesDtoAbilitiesCount(this.idHero));
    this.techniquesCount = this.heroDto.techniques.length;
  }

  onDeleteHero(idHero: number): void {
    this.heroesService.deleteHero$(idHero).subscribe(() => this.router.navigateByUrl('protected/delete'))
  }
}
