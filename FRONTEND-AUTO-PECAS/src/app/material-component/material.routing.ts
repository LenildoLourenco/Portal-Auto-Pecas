import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageSupplierComponent } from './manage-supplier/manage-supplier.component';



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
    }
];
