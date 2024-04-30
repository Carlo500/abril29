import { Component, OnInit } from '@angular/core';
import { Producto } from '../_modelo/producto';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductosService } from '../_servicio/productos.service';
import { AltaProductoComponent } from './alta-producto/alta-producto.component';

@Component({
  selector: 'app-lista-empleados',
  standalone: true,
  imports: [AltaProductoComponent,RouterModule],
  templateUrl: './lista-productos.component.html',
  styleUrl: './lista-productos.component.css'
})
export class ListaProductosComponent {
  
  constructor(private servicio:ProductosService){}
  productos:Producto[] = [];

  ngOnInit(): void {
    this.servicio.productoCambio
    .subscribe((data) => {this.productos = data}
    )
    
    this.servicio.listar()
       .subscribe(datos => {
          this.productos = datos;
          console.log("entra");

       })

    

  }

  eliminar(id:number){
    this.servicio.eliminar(id)
      .subscribe(()=>
        {
          this.servicio.listar()
            .subscribe(data=>this.servicio.productoCambio.next(data))
        })

  }

  recibirAviso(listaActualizada:Observable<Producto[]>){
      console.warn("regresa el padre ----")
      //listaActualizada.subscribe(data => this.empleados = data);
      this.servicio.listar()
      .subscribe(datos => {
         this.productos = datos;
         console.log("entra");

      })
  }

}
