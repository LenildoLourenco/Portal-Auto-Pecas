import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageClientComponent } from './manage-client/manage-client.component';
import { ManageMechanicComponent } from './manage-mechanic/manage-mechanic.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageSupplierComponent } from './manage-supplier/manage-supplier.component';
import { ViewBillComponent } from './view-bill/view-bill.component';



export const MaterialRoutes: Routes = [
    {
        path: 'supplier',
        component: ManageSupplierComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['administrador']
        }
    },
    {
        path: 'product',
        component: ManageProductComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['administrador']
        }
    },
    {
        path: 'client',
        component: ManageClientComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['administrador']
        }
    },
    {
        path: 'mechanic',
        component: ManageMechanicComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['administrador']
        }
    },
    {
        path: 'order',
        component: ManageOrderComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['administrador','user']
        }
    },
    {
        path: 'bill',
        component: ViewBillComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['administrador','user']
        }
    }
];
