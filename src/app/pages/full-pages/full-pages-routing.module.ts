import { Role } from 'app/shared/Models/RoleModel';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GalleryPageComponent } from "./gallery/gallery-page.component";
import { InvoicePageComponent } from "./invoice/invoice-page.component";
import { HorizontalTimelinePageComponent } from "./timeline/horizontal/horizontal-timeline-page.component";
import { UserProfilePageComponent } from "./user-profile/user-profile-page.component";
import { SearchComponent } from './search/search.component';
import { FaqComponent } from './faq/faq.component';
import { TimelineVerticalCenterPageComponent } from './timeline/vertical/timeline-vertical-center-page/timeline-vertical-center-page.component';
import { TimelineVerticalLeftPageComponent } from './timeline/vertical/timeline-vertical-left-page/timeline-vertical-left-page.component';
import { TimelineVerticalRightPageComponent } from './timeline/vertical/timeline-vertical-right-page/timeline-vertical-right-page.component';
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

const routes: Routes = [
  {
    path: '',
    children: [

      {
        path: 'gallery',
        component: GalleryPageComponent,
        data: {
          title: 'Gallery Page'
        }
      },
      {
        path: 'invoice',
        component: InvoicePageComponent,
        data: {
          title: 'Invoice Page'
        }
      },
      {
        path: 'horizontaltimeline',
        component: HorizontalTimelinePageComponent,
        data: {
          title: 'Horizontal Timeline Page'
        }
      },
      {
        path: 'timeline-vertical-center',
        component: TimelineVerticalCenterPageComponent,
        data: {
          title: 'Timeline Vertical Center Page'
        }
      },
      {
        path: 'timeline-vertical-left',
        component: TimelineVerticalLeftPageComponent,
        data: {
          title: 'Timeline Vertical Left Page'
        }
      },
      {
        path: 'timeline-vertical-right',
        component: TimelineVerticalRightPageComponent,
        data: {
          title: 'Timeline Vertical Right Page'
        }
      },
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
        path: 'search',
        component: SearchComponent,
        data: {
          title: 'Search'
        }
      },
      {
        path: 'faq',
        component: FaqComponent,
        data: {
          title: 'FAQ'
        }
      },
      {
        path: 'kb',
        loadChildren: () => import('./knowledge-base/knowledge-base.module').then(m => m.KnowledgeBaseModule)
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
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FullPagesRoutingModule { }
