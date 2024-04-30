import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmpleadosService } from '../../_servicio/empleados.service';
import { Empleado } from '../../_modelo/empleado';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-altaempleado',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './altaempleado.component.html',
  styleUrl: './altaempleado.component.css'
})
export class AltaempleadoComponent implements OnInit {

  form:FormGroup;
  id:number = 0;
  edicion:boolean=false;

  constructor(
        private route:ActivatedRoute,
        private router: Router,
        private servicio: EmpleadosService
  ){this.form = new FormGroup({
    'idEmpleado': new FormControl(0),
    'nombre': new FormControl(''),
    'dni': new FormControl(''),
    'sueldo':new FormControl(0)
  });}

  ngOnInit(): void {
    

    this.route.params
      .subscribe(data => {
      this.id = data['id'];
      this.edicion= data['id'] != null;
      this.formaFormulario();

  });
}
  formaFormulario() {
    if(this.edicion){
      this.servicio.listarPorId(this.id)
        .subscribe(data => {
          this.form = new FormGroup({
            'idEmpleado': new FormControl(data.idEmpleado),
            'nombre': new FormControl(data.nombreEmpleado),
            'dni': new FormControl(data.dni),
            'sueldo':new FormControl(data.sueldo)
          });
        })
    }
  }
  
operar(){
  let e:Empleado = {
    'idEmpleado': this.form.value['idEmpleado'],
    'nombreEmpleado' : this.form.value['nombre'],
    'dni': this.form.value['dni'],
    'sueldo':this.form.value['sueldo']
  }
  if(this.edicion){
   
    this.servicio.modificar(e)
      .subscribe(()=>{
        this.servicio.listar()
          .subscribe(data=>{
            this.servicio.empleadoCambio.next(data);
          });
      });
  }else{
    this.servicio.alta(e)
      .subscribe(()=>{
        this.servicio.listar()
          .subscribe(data => {
            this.servicio.empleadoCambio.next(data);
          });
      });
  }
  this.router.navigate([''])
}
  


}
