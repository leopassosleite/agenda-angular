import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageClientComponent } from './manage-client/manage-client.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManagerCalendarComponent } from './manager-calendar/manager-calendar.component';



export const MaterialRoutes: Routes = [
    {
        path: 'client',
        component: ManageClientComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin']
        }
    },
    {
        path: 'calendar',
        component: ManagerCalendarComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin']
        }
    },
    {
        path: 'product',
        component: ManageProductComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin']
        }
    },
    {
        path: 'order',
        component: ManageOrderComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin', 'user']
        }
    }
];
