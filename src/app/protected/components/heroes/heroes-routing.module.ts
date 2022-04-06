import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DetailComponent } from "./detail/detail.component";
import { HeroesListComponent } from "./heroes-list/heroes-list.component";
import { HeroesComponent } from "./heroes.component";

const routes: Routes = [
    {
        path: '',
        component: HeroesComponent,
        children: [
            { path: '', component: HeroesListComponent },
            { path: ':id', component: DetailComponent },
            { path: 'search/:searchTerm', component: HeroesListComponent },
        ]
    }

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class HeroesRoutingModule { }