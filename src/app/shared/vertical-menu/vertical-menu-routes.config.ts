import { RouteInfo } from './vertical-menu.metadata';

//Sidebar menu Routes and data
export const ROUTES: RouteInfo[] = [

  {
    path: '/dashboard-Admin', title: 'Dashboard', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], owner : 'Admin'
  },
  {
    path: '/dashboard-User', title: 'Dashboard', icon: 'ft-home', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], owner : 'User'
  },
  {
    path: '/users-list', title: 'Users', icon: 'ft-users', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], owner : 'Admin'
  },
  // {
  //   path: '/roles-list', title: 'Roles', icon: 'ft-clipboard', class: '', badge: '', badgeClass: '', isExternalLink: false ,  submenu: [], owner : 'Admin'
  // },
  {
    path: '/workflow-list', title: 'Workflows', icon: 'ft-briefcase', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], owner : 'Admin'
  },
  {
    path: '', title: 'Document', icon: 'ft-book', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
      { path: '/doc-list', title: 'All Documents', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] , owner :'Admin'},
      { path: '/my-doc', title: 'My Documents', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] , owner :'Admin'},
      { path: 'My-Draft-Document', title: 'Draft Documents', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] , owner :'Admin'},
      { path: 'types-list', title: 'Documents Types', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] , owner :'Admin'},
    ], owner : 'Admin'
  },
  {
    path: '/tasks-list', title: 'Tasks', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], owner : 'Admin'
  },
  {
    path: '', title: 'Document', icon: 'ft-book', class: 'has-sub', badge: '', badgeClass: '', isExternalLink: false, submenu: [
      { path: '/doc-list', title: 'All Documents', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] , owner :'User'},
      { path: '/my-doc', title: 'My Documents', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] , owner :'User'},
      { path: 'My-Draft-Document', title: 'Draft Documents', icon: 'ft-arrow-right submenu-icon', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [] , owner :'User'},
    ], owner : 'User'
  },
  {
    path: '/tasks-list', title: 'Tasks', icon: 'ft-file-text', class: '', badge: '', badgeClass: '', isExternalLink: false, submenu: [], owner : 'User'
  }
  ]; 