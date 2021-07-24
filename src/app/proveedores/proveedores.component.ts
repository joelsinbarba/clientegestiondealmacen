import { HttpErrorResponse } from '@angular/common/http';
import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proveedor } from '../proveedor';
import { ProveedorService } from '../proveedor.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {

  public proveedores: Proveedor[] = [];
  public proveedor: Proveedor | undefined;
  public proveedorAEliminar: Proveedor | undefined;

  @ViewChild('closeButton') closeButton : ElementRef;
  @ViewChild('closeButtonEditar') closeButtonEditar : ElementRef;
  @ViewChild('closeButtonEliminar') closeButtonEliminar : ElementRef;

  
  constructor(private proveedorService: ProveedorService){
  }

  ngOnInit(){
    this.getProveedores();
  }

  public getProveedores(): void {
    this.proveedorService.getProveedors().subscribe((response: Proveedor[])=>{
      this.proveedores = response;
    }, (error: HttpErrorResponse) => {
      alert(error.message);
    });
  }

  public onAgregarProveedor(agregarForm: NgForm):void{
    document.getElementById('agregar-proveedor-form')?.click();
    this.proveedorService.addProveedor(agregarForm.value).subscribe((response: Proveedor)=>{
      console.log(response); 
      this.getProveedores();
      this.closeButton.nativeElement.click();

;    },(error: HttpErrorResponse)=>{alert(error.message)});
    agregarForm.reset();
  }

  public onEditarProveedor(proveedor: Proveedor):void{
    this.proveedorService.updateProveedor(proveedor).subscribe((response: Proveedor)=>{
      console.log(response);
      this.getProveedores();
      this.closeButtonEditar.nativeElement.click();

;    },(error: HttpErrorResponse)=>{alert(error.message)});
  }

  public onEliminarProveedor(proveedorId: number):void{
    document.getElementById('agregar-proveedor-form')?.click();
     this.proveedorService.deleteProveedor(proveedorId).subscribe((response: void)=>{
      console.log(response);
       this.getProveedores();
       this.closeButtonEliminar.nativeElement.click();
;    },(error: HttpErrorResponse)=>{alert(error.message)}); 
  }

  public onOpenModal(proveedor: any, tipo: string):void{
    const btn = document.createElement('button');
    const container = document.getElementById('main-container');
    btn.type = 'button';
    btn.style.display = 'none';
    btn.setAttribute('data-toggle', 'modal');
    if(tipo == 'agregar'){
      btn.setAttribute('data-target', '#agregarProveedorModal')
    }
    if(tipo == 'editar'){
      this.proveedor = proveedor;
      btn.setAttribute('data-target', '#editarProveedorModal')
    }
    if(tipo == 'eliminar'){
      console.log(proveedor);
      this.proveedorAEliminar = proveedor;
      btn.setAttribute('data-target', '#eliminarProveedorModal')
    }

    container?.appendChild(btn);
    btn.click();

  }
}
