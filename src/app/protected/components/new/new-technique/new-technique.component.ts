import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Technique } from 'src/app/core/models/technique.interface';
import { TechniquesService } from 'src/app/core/services/techniques.service';
import { addTechnique } from 'src/app/store/actions/technique.actions';

@Component({
  selector: 'app-new-technique',
  templateUrl: './new-technique.component.html',
  styleUrls: ['./new-technique.component.scss']
})
export class NewTechniqueComponent implements OnInit {

  techniqueForm!: FormGroup;
  newTechnique$!: Observable<Technique>;
  heroId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private techniquesService: TechniquesService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.heroId = +this.route.snapshot.params['id'];

    this.techniqueForm = this.formBuilder.group({
      name: [null, Validators.required],
      heroId: [this.heroId]
    }, {
      updateOn: 'blur'
    });
    this.newTechnique$ = this.techniqueForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        id: 0
      }))
    )
  }

  onSubmitTechniqueForm(): void {
    let newTechnique: Technique = {
      name: this.techniqueForm.value.name,
      heroId: this.techniqueForm.value.heroId
    };
    this.store.dispatch(addTechnique({ newTechnique }));
    this.router.navigateByUrl(`protected/heroes/${this.heroId}`);
  }
}
