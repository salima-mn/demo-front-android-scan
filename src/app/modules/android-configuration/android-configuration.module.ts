import {NgModule} from "@angular/core";
import {ImeisComponent} from "./imeis/imeis.component";
import {RouterModule, Routes} from "@angular/router";
import {TokenComponent} from "./token/token.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {AndroidConfigurationComponent} from "./android-configuration.component";
import {GeneralModule} from "../../_metronic/partials/content/general/general.module";
import {InlineSVGModule} from "ng-inline-svg";
import {CRUDTableModule} from "../../_metronic/shared/crud-table";
import {NgbDatepickerModule, NgbModalModule} from "@ng-bootstrap/ng-bootstrap";
import { EditImeiModalComponent } from './edit-imei-modal/edit-imei-modal.component';
import { DeleteImeiModalComponent } from './delete-imei-modal/delete-imei-modal.component';
import { SendMailModalComponent } from './send-mail-modal/send-mail-modal.component';

const routes: Routes=[
    {
        path:'',
        component:AndroidConfigurationComponent,
        children: [
            {
                path:'imeis',
                component: ImeisComponent,
            },
            {
                path:'token',
                component:TokenComponent,
            }

        ]
    }

]
@NgModule({
    //Components
    declarations:[AndroidConfigurationComponent, ImeisComponent, TokenComponent, EditImeiModalComponent, DeleteImeiModalComponent, SendMailModalComponent],
    //Modules
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        CommonModule,
        GeneralModule,
        ReactiveFormsModule,
        InlineSVGModule,
        CRUDTableModule,
        NgbModalModule,
        NgbDatepickerModule
    ],
    exports:[RouterModule],
    entryComponents:[
        EditImeiModalComponent,
        DeleteImeiModalComponent,
        SendMailModalComponent
    ]
})
export class AndroidConfigurationModule {

}
