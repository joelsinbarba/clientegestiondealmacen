import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Producto } from './producto';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public productos: Producto[] = [];
  public producto: Producto | undefined;
  public productoAEliminar: Producto | undefined;

  constructor(private productoService: ProductoService){
  }

  ngOnInit(){
    this.getProductos();
  }

  public getProductos(): void {
    this.productoService.getProductos().subscribe((response: Producto[])=>{
      this.productos = response;
    }, (error: HttpErrorResponse) => {
      alert(error.message);
    });
  }

  public onAgregarProducto(agregarForm: NgForm):void{
    document.getElementById('agregar-producto-form')?.click();
    this.productoService.addProducto(agregarForm.value).subscribe((response: Producto)=>{console.log(response);    this.getProductos();
;    },(error: HttpErrorResponse)=>{alert(error.message)});
    agregarForm.reset();
  }

  public onEditarProducto(producto: Producto):void{
    this.productoService.updateProducto(producto).subscribe((response: Producto)=>{console.log(response);    this.getProductos();
;    },(error: HttpErrorResponse)=>{alert(error.message)});
  }

  public onEliminarProducto(productoId: number):void{
    document.getElementById('agregar-producto-form')?.click();
    this.productoService.deleteProducto(productoId).subscribe((response: void)=>{console.log(response);     this.getProductos();
;    },(error: HttpErrorResponse)=>{alert(error.message)});
  }

  public onOpenModal(producto: any, tipo: string):void{
    const btn = document.createElement('button');
    const container = document.getElementById('main-container');
    btn.type = 'button';
    btn.style.display = 'none';
    btn.setAttribute('data-toggle', 'modal');
    if(tipo == 'agregar'){
      btn.setAttribute('data-target', '#agregarProductoModal')
    }
    if(tipo == 'editar'){
      this.producto = producto;
      btn.setAttribute('data-target', '#editarProductoModal')
    }
    if(tipo == 'eliminar'){
      this.productoAEliminar = producto;
      btn.setAttribute('data-target', '#eliminarProductoModal')
    }

    container?.appendChild(btn);
    btn.click();

  }
}
