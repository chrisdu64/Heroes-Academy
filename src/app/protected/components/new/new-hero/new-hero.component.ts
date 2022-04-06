import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Hero } from 'src/app/core/models/hero.interface';
import { HeroesService } from 'src/app/core/services/heroes.service';

@Component({
  selector: 'app-new-hero',
  templateUrl: './new-hero.component.html',
  styleUrls: ['./new-hero.component.scss']
})
export class NewHeroComponent implements OnInit {

  heroForm!: FormGroup;
  newHero$!: Observable<Hero>;
  urlVerify!: RegExp;

  constructor(
    private formBuiler: FormBuilder,
    private heroesService: HeroesService,
    private router: Router) { }

  ngOnInit(): void {

    this.urlVerify = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    this.heroForm = this.formBuiler.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      myImg: [null, [Validators.required, Validators.pattern(this.urlVerify)]]
    }, {
      updateOn: 'blur'
    });
    this.newHero$ = this.heroForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        id: 0
      }))
    )
  }

  onSubmitHeroForm() {
    this.heroesService.addHero$(this.heroForm.value).pipe(
      tap(() => this.router.navigateByUrl('protected/heroes'))
    ).subscribe();
  }

}
