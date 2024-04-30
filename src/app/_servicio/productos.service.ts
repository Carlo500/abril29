import { Injectable } from '@angular/core';
import { Producto } from '../_modelo/producto';
import { Subject } from 'rxjs/internal/Subject';
import { entorno } from '../_entorno/entorno';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private url:string=`${entorno.HOST}/producto`;
  productoCambio=new Subject<Producto[]>();
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  alta(e: Producto) {
    console.log('a llegado al servicio'+e.units_on_order)
    return this.http.post(this.url,e);
  }
  listar():Observable<Producto[]> {
    return this.http.get<Producto[]>(this.url)
    .pipe(map(data =>{return data.sort((a,b)=>a.product_id-b.product_id);
    }
    ))
  }
  modificar(e: Producto) {
    console.log(e.product_name);
    return this.http.put(this.url,e);
  }
  listarPorId(id: number) {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  constructor(private http:HttpClient) { }
}
