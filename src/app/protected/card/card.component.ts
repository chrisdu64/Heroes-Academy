import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HeroDto } from 'src/app/core/models/heroDto.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() heroDto!: HeroDto;

  numberOfTechniques!: number;
  numberOfAbilities!: number;


  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.numberOfTechniques = this.heroDto.techniques.length;
    this.numberOfAbilities = this.heroDto.abilities.length;
  }
  // onViewHero() {
  //   this.router.navigateByUrl(`heroes/${this.heroDto.id}`);
  // }

}
