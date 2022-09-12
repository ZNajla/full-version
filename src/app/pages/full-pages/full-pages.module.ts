import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { FullPagesRoutingModule } from "./full-pages-routing.module";
import { ChartistModule } from "ng-chartist";
import { AgmCoreModule } from "@agm/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NgSelectModule } from "@ng-select/ng-select";
import { SwiperModule } from "ngx-swiper-wrapper";
import { PipeModule } from "app/shared/pipes/pipe.module";

import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { AccountSettingsComponent } from "./account-settings/account-settings.component";
import { UsersListComponent } from "./users/users-list/users-list.component";
import { UsersViewComponent } from "./users/users-view/users-view.component";
import { UsersEditComponent } from "./users/users-edit/users-edit.component";

import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { UsersAddComponent } from './users/users-add/users-add.component';
import { RolesListComponent } from './roles/roles-list/roles-list.component';
import { RolesEditComponent } from './roles/roles-edit/roles-edit.component';
import { AddRoleModalComponent } from './roles/roles-list/add-role-modal/add-role-modal.component';
import { AddWorkflowComponent } from './workflow/add-workflow/add-workflow.component';
import { ListWorkflowComponent } from './workflow/list-workflow/list-workflow.component';
import { ListTypesComponent } from './types/list-types/list-types.component';
import { AddDocumentComponent } from './document/list-document/add-document/add-document.component';
import { ListDocumentComponent } from './document/list-document/list-document.component';
import { ArchwizardModule } from "angular-archwizard";
import { ViewDetailsComponent } from './workflow/view-details/view-details.component';
import { ListTasksComponent } from './tasks/list-tasks/list-tasks.component';
import { ViewDocumentComponent } from './document/view-document/view-document.component';
import { NgApexchartsModule } from "ng-apexcharts";
import { MyDocumentComponent } from './document/my-document/my-document.component';
import { AddTypeComponent } from './types/add-type/add-type.component';
import { ViewTaskComponent } from './tasks/view-task/view-task.component';
import { MatchHeightModule } from "app/shared/directives/match-height.directive";
import { ViewTypeComponent } from './types/view-type/view-type.component';
import { DraftDocumentComponent } from './document/draft-document/draft-document.component';

@NgModule({
  imports: [
    CommonModule,
    FullPagesRoutingModule,
    FormsModule,
    ArchwizardModule,
    ReactiveFormsModule,
    ChartistModule,
    AgmCoreModule,
    NgSelectModule,
    NgbModule,
    SwiperModule,
    PipeModule,
    NgApexchartsModule,
    NgxDatatableModule,
    MatchHeightModule
  ],
  declarations: [
    UserProfilePageComponent,
    AccountSettingsComponent,
    UsersListComponent,
    UsersViewComponent,
    UsersEditComponent,
    UsersAddComponent,
    RolesListComponent,
    RolesEditComponent,
    AddRoleModalComponent,
    AddWorkflowComponent,
    ListWorkflowComponent,
    ListTypesComponent,
    AddDocumentComponent,
    ListDocumentComponent,
    ViewDetailsComponent,
    ListTasksComponent,
    ViewDocumentComponent,
    MyDocumentComponent,
    AddTypeComponent,
    ViewTaskComponent,
    ViewTypeComponent,
    DraftDocumentComponent,
  ],
})
export class FullPagesModule {}
