import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Technique } from 'src/app/core/models/technique.interface';
import { updateTechnique } from 'src/app/store/actions/technique.actions';
import { selectTechniquesByIdForUpdate } from 'src/app/store/selectors/technique.selectors';

@Component({
  selector: 'app-update-technique',
  templateUrl: './update-technique.component.html',
  styleUrls: ['./update-technique.component.scss']
})
export class UpdateTechniqueComponent implements OnInit {

  techniqueId!: number;
  updatedTechniqueForm!: FormGroup;
  updatedForm$!: Observable<FormGroup>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.techniqueId = +this.route.snapshot.params['id'];

    this.updatedForm$ = this.store.select(selectTechniquesByIdForUpdate(this.techniqueId)).pipe(
      map(technique => this.updatedTechniqueForm = this.fb.group({
        name: [technique?.name, Validators.required],
        id: this.techniqueId,
        heroId: technique?.heroId
      }, {
        updateOn: 'blur'
      }))
    )

  }

  onSubmitUpdatedTechniqueForm() {
    let updatedTechnique: Technique = {
      name: this.updatedTechniqueForm.value.name,
      id: this.updatedTechniqueForm.value.id,
      heroId: this.updatedTechniqueForm.value.heroId
    };
    this.store.dispatch(updateTechnique({ updatedTechnique }));
    this.router.navigateByUrl(`protected/heroes/${this.updatedTechniqueForm.value.heroId}`);
  }

}
