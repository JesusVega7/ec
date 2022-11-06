import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from 'src/nuevo componente/table/table.component';


const appRoutes: Routes = [
    {
        path: 'table',
        component: TableComponent
    },

];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });
