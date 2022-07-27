import {NgModule} from "@angular/core";
import {UsersComponent} from "./users/users.component";
import {RouterModule, Routes} from "@angular/router";
import {MailServerComponent} from "./mail-server/mail-server.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ThisConfigurationComponent} from "./this-configuration.component";
import {GeneralModule} from "../../_metronic/partials/content/general/general.module";
import {CommonModule} from "@angular/common";
import {InlineSVGModule} from "ng-inline-svg";
import {CRUDTableModule} from "../../_metronic/shared/crud-table";
import {NgbDatepickerModule, NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import { DeleteUserModelComponent } from './delete-user-model/delete-user-model.component';
import { EditUserModelComponent } from './edit-user-model/edit-user-model.component';

export const routes:Routes=[
    {
        path:'',
        component:ThisConfigurationComponent,
        children:[
            {
                path:'users',
                component:UsersComponent,
            },
            {
                path:'mail-server',
                component:MailServerComponent,
            }
        ]
    }

]
@NgModule({
    //Modules
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        GeneralModule,

        FormsModule,
        ReactiveFormsModule,
        InlineSVGModule,
        CRUDTableModule,
        NgbModalModule,
        NgbDatepickerModule],
    //Components
    declarations:[
        ThisConfigurationComponent,
        UsersComponent,
        MailServerComponent,
        DeleteUserModelComponent,
        EditUserModelComponent,
    ],
    exports:[RouterModule]

})
export class ThisConfigurationModule {

}
