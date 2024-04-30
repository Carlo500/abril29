import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductosService } from '../../_servicio/productos.service';
import { Producto } from '../../_modelo/producto';

@Component({
  selector: 'app-alta-producto',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './alta-producto.component.html',
  styleUrl: './alta-producto.component.css'
})
export class AltaProductoComponent {
  form:FormGroup;
  id:number = 0;
  edicion:boolean=false;

  constructor(
        private route:ActivatedRoute,
        private router: Router,
        private servicio: ProductosService
  ){this.form = new FormGroup({
    'product_id': new FormControl(0),
    'product_name': new FormControl(''),
    'supplier_id': new FormControl(0),
    'category_id':new FormControl(0),
    'quantity_per_unit': new FormControl(''),
    'unit_price': new FormControl(0),
    'units_in_stock': new FormControl(0),
    'units_on_order': new FormControl(0),
    'reorder_level': new FormControl(0),
    'discount':new FormControl(0)
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
            'product_id': new FormControl(data.product_id),
            'product_name': new FormControl(data.product_name),
            'supplier_id': new FormControl(data.supplier_id),
            'category_id': new FormControl(data.category_id),
            'quantity_per_unit': new FormControl(data.quantity_per_unit),
            'unit_price': new FormControl(data.unit_price),
            'units_in_stock': new FormControl(data.units_in_stock),
            'units_on_order': new FormControl(data.units_on_order),
            'reorder_level': new FormControl(data.reorder_level),
            'discontinued':new FormControl(data.discontinued)
          });
        })
    }
  }
  
operar(){
  let e:Producto = {
    'product_id': this.form.value['product_id'],
    'product_name' : this.form.value['product_name'],
    'supplier_id': this.form.value['supplier_id'],
    'category_id': this.form.value['category_id'],
    'quantity_per_unit': this.form.value['quantity_per_unit'],
    'unit_price': this.form.value['unit_price'],
    'units_in_stock': this.form.value['units_in_stock'],
    'units_on_order': this.form.value['units_on_order'],
    'reorder_level': this.form.value['reorder_level'],
    'discontinued':this.form.value['discontinued']
  }
  if(this.edicion){
   console.log(e.product_name);
    this.servicio.modificar(e)
      .subscribe(()=>{
        this.servicio.listar()
          .subscribe(data=>{
            this.servicio.productoCambio.next(data);
          });
      });
  }else{
    this.servicio.alta(e)
      .subscribe(()=>{
        this.servicio.listar()
          .subscribe(data => {
            this.servicio.productoCambio.next(data);
          });
      });
  }
  this.router.navigate([''])
}
}
