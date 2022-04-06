import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HeroDto } from 'src/app/core/models/heroDto.interface';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() heroDto!: HeroDto;

  numberOfTechniques!: number;
  numberOfAbilities!: number;
  idHero!: number;


  constructor(
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit(): void {
    this.idHero = this.heroDto.id;
    this.numberOfTechniques = this.heroDto.techniques.length;
    this.numberOfAbilities = this.heroDto.abilities.length;
  }

  onDeleteHero(idHero: number): void {
    this.http.delete(environment.apiUrl + `/heroes/${idHero}`).subscribe(() => this.router.navigateByUrl('protected/delete'))

  }
}
