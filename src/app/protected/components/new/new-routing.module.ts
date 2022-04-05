import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NewAbilityComponent } from "./new-ability/new-ability.component";
import { NewHeroComponent } from "./new-hero/new-hero.component";
import { NewTechniqueComponent } from "./new-technique/new-technique.component";

const routes: Routes = [
    { path: 'hero', component: NewHeroComponent },
    { path: 'ability/:id', component: NewAbilityComponent },
    { path: 'technique/:id', component: NewTechniqueComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class NewRoutingModule { }