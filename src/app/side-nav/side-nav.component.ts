import { Component } from '@angular/core';
import { SideNavItem } from '../models/models';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  sideNavContent: SideNavItem [] = [
    {
      title: 'View Vehicles',
      link: 'vehicles',
    },
    {
      title: 'Manage Vehicles',
      link: 'maintenance',
    },
    {
      title: 'Manage Categories',
      link: 'categories',
    },
    {
      title: 'Return Vehicle',
      link: 'return',
    },
    {
      title: 'View users',
      link: 'user/list',
    },
    {
      title: 'All Orders',
      link: 'user/all-orders',
    },
    {
      title: 'My Order',
      link: 'user/order',
    },
  
  ]
}
