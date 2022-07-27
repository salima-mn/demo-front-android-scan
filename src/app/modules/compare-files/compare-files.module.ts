import {NgModule} from "@angular/core";
import {CompareFilesComponent} from "./compare-files.component";
import {RouterModule} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {CommonModule} from "@angular/common";

@NgModule({
    declarations:[
        CompareFilesComponent
    ],
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: CompareFilesComponent
            }
        ]),
        MatFormFieldModule,
        MatSelectModule,
        CommonModule
    ],
    exports:[
        RouterModule
    ]
})
export class CompareFilesModule {


}
