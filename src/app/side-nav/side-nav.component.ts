import { Component, OnInit } from '@angular/core';
import { SideNavItem, UserType } from '../models/models';
import { ApiService } from '../services/api.service';

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
      title: 'My Order',
      link: 'users/order',
    },{
      title: 'Give Feedback',
      link: 'addfeedbacks',
    },
    {
      title: 'Verify Orders',
      link: 'verify/order'

    },
    {
      title: 'Add Vehicles',
      link: 'maintenance',
    },
    {
      title: 'Add Categories',
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
    },{
      title: 'View Feedbacks',
      link: 'feedbacks'
    }
  
  ]


  // sideNavContent: SideNavItem[] = [];
  // isLoggedIn: boolean = false;

  // constructor(private api: ApiService) {}

  // ngOnInit() {
  //   this.isLoggedIn = this.api.isLoggedIn();

  //   if (this.isLoggedIn) {
  //     this.updateSideNavContent();
  //   }
  // }

  // private updateSideNavContent() {
  //   try {
  //     // Check if the user is logged in
  //     if (!this.isLoggedIn) {
  //       console.log('User is not logged in.');
  //       return;
  //     }

  //     const user = this.api.getTokenUserInfo();
  //     console.log("user", user);

  //     if (user && user.userType === UserType.ADMIN) {
  //       console.log('User is an ADMIN');
  //       this.sideNavContent = [
  //         {
  //           title: 'View Vehicles',
  //           link: 'vehicles',
  //         },
  //         {
  //           title: 'My Order',
  //           link: 'users/order',
  //         },{
  //           title: 'Verify Orders',
  //           link: 'verify/order'
      
  //         },
  //         {
  //           title: 'Add Vehicles',
  //           link: 'maintenance',
  //         },
  //         {
  //           title: 'Add Categories',
  //           link: 'categories',
  //         },
  //         {
  //           title: 'Return Vehicle',
  //           link: 'return',
  //         },
  //         {
  //           title: 'View users',
  //           link: 'user/list',
  //         },
  //         {
  //           title: 'All Orders',
  //           link: 'user/all-orders',
  //         }
  //       ];
  //     } else if (user && user.userType === UserType.USER) {
  //       console.log('User is a USER');
  //       this.sideNavContent = [
  //         {
  //           title: 'View Vehicles',
  //           link: 'vehicles',
  //         },
  //         {
  //           title: 'My Order',
  //           link: 'users/order',
  //         }
  //       ];
  //     }
  //   } catch (error) {
  //     console.error('Error updating side navigation content:', error);
  //   }
  // }
}
