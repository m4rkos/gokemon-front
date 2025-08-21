import { Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';

export const routes: Routes = [
    {path: "", component: CatalogComponent},
    {path: ":id", component: CatalogComponent},
];
