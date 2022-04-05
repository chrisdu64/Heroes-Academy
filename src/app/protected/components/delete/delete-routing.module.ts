import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DeleteAbilityComponent } from "./delete-ability/delete-ability.component";
import { DeletePageComponent } from "./delete-page/delete-page.component";
import { DeleteTechniqueComponent } from "./delete-technique/delete-technique.component";

const routes: Routes = [
    { path: '', component: DeletePageComponent },
    { path: 'ability/:id', component: DeleteAbilityComponent },
    { path: 'technique/:id', component: DeleteTechniqueComponent }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeleteRoutingModule { }