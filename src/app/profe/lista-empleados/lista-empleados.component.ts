import { Component, OnInit } from '@angular/core';
import { EmpleadosService } from '../_servicio/empleados.service';
import { Empleado } from '../_modelo/empleado';
import { CommonModule } from '@angular/common';
import { AltaempleadoComponent } from './altaempleado/altaempleado.component';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-lista-empleados',
  standalone: true,
  imports: [AltaempleadoComponent, RouterModule],
 
  templateUrl: './lista-empleados.component.html',
  styleUrl: './lista-empleados.component.css'
})
export class ListaEmpleadosComponent implements OnInit{
  
  constructor(private servicio:EmpleadosService){}
  empleados:Empleado[] = [];

  ngOnInit(): void {
    this.servicio.empleadoCambio
    .subscribe((data) => {this.empleados = data}
    )
    
    this.servicio.listar()
       .subscribe(datos => {
          this.empleados = datos;
          console.log("entra");

       })

    

  }

  eliminar(id:number){
    this.servicio.eliminar(id)
      .subscribe(()=>
        {
          this.servicio.listar()
            .subscribe(data=>this.servicio.empleadoCambio.next(data))
        })

  }

  recibirAviso(listaActualizada:Observable<Empleado[]>){
      console.warn("regresa el padre ----")
      //listaActualizada.subscribe(data => this.empleados = data);
      this.servicio.listar()
      .subscribe(datos => {
         this.empleados = datos;
         console.log("entra");

      })
  }

}
