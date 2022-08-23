import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { UsersListComponent } from './users/users-list/users-list.component';
import { UsersViewComponent } from './users/users-view/users-view.component';
import { UsersEditComponent } from './users/users-edit/users-edit.component';
import { UsersAddComponent } from './users/users-add/users-add.component';
import { RolesListComponent } from './roles/roles-list/roles-list.component';
import { RolesEditComponent } from './roles/roles-edit/roles-edit.component';
import { ListWorkflowComponent } from './workflow/list-workflow/list-workflow.component';
import { AddWorkflowComponent } from './workflow/add-workflow/add-workflow.component';
import { ListDocumentComponent } from './document/list-document/list-document.component';
import { AddDocumentComponent } from './document/list-document/add-document/add-document.component';
import { ListTasksComponent } from './tasks/list-tasks/list-tasks.component';
import { ViewDocumentComponent } from './document/view-document/view-document.component';
import { MyDocumentComponent } from './document/my-document/my-document.component';
import { ListTypesComponent } from './types/list-types/list-types.component';

const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: {
          title: 'Account Settings Page'
        }
      },
      {
        path: 'profile',
        component: UserProfilePageComponent,
        data: {
          title: 'User Profile Page'
        }
      },
      {
        path: 'roles-list',
        component: RolesListComponent,
        data: {
          title: 'List',
          role : 'Admin',
        }
      },
      {
        path: 'roles-edit/:name',
        component: RolesEditComponent,
        data: {
          title: 'Edit',
          roles:  ['Admin']
        }
      },
      {
        path: 'users-add',
        component: UsersAddComponent,
        data: {
          title: 'Add',
          Role : 'Admin',
        }
      },
      {
        path: 'users-list',
        component: UsersListComponent,
        data: {
          title: 'List',
          roles:  ['Admin']
        }
      },
      {
        path: 'users-view',
        component: UsersViewComponent,
        data: {
          title: 'View',
          roles: ['Admin']
        }
      },
      {
        path: 'users-edit',
        component: UsersEditComponent,
        data: {
          title: 'Edit',
          roles: ['Admin']
        }
      },
      {
        path: 'workflow-list',
        component: ListWorkflowComponent,
        data: {
          title: 'List',
          roles: ['Admin']
        }
      },
      {
        path: 'add-workflow',
        component: AddWorkflowComponent,
        data: {
          title: 'Add',
          roles:  ['Admin']
        }
      },
      {
        path: 'doc-list',
        component: ListDocumentComponent,
        data: {
          title: 'List',
          roles:  ['Admin']
        }
      },
      {
        path: 'add-doc',
        component: AddDocumentComponent,
        data: {
          title: 'Add',
        }
      },
      {
        path: 'my-doc',
        component: MyDocumentComponent,
        data: {
          title: 'List',
        }
      },
      {
        path: 'tasks-list',
        component: ListTasksComponent,
        data: {
          title: 'List',
        }
      },
      {
        path: 'Document-view',
        component: ViewDocumentComponent,
        data: {
          title: 'List',
        }
      },
      {
        path: 'types-list',
        component: ListTypesComponent,
        data: {
          title: 'List',
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
