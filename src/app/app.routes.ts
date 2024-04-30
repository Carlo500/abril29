import { Routes } from '@angular/router';
import { AltaProductoComponent } from './lista-productos/alta-producto/alta-producto.component';
import { ListaProductosComponent } from './lista-productos/lista-productos.component';

export const routes: Routes = [
    {path:'',component:ListaProductosComponent,children:[
        {path:'alta',component:AltaProductoComponent},
        {path:'edicion/:id',component:AltaProductoComponent}
    ]}
];
