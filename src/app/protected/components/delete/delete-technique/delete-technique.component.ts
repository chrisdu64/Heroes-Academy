import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Technique } from 'src/app/core/models/technique.interface';
import { deleteTechnique } from 'src/app/store/actions/technique.actions';
import { selectTechniqueByHeroId } from 'src/app/store/selectors/technique.selectors';

@Component({
  selector: 'app-delete-technique',
  templateUrl: './delete-technique.component.html',
  styleUrls: ['./delete-technique.component.scss']
})
export class DeleteTechniqueComponent implements OnInit {
  heroId!: number;
  techniques$!: Observable<Technique[]>;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) { }

  ngOnInit(): void {
    this.heroId = +this.route.snapshot.params['id'];

    this.techniques$ = this.store.select(selectTechniqueByHeroId(this.heroId));
  }
  onDeleteTechnique(id: number): void {
    if (confirm('Etes-vous sûr de vouloir supprimer cette technique ?')) {

      this.store.dispatch(deleteTechnique({ id }));
      this.router.navigateByUrl(`/protected/heroes/${this.heroId}`)
    }
  }
}
