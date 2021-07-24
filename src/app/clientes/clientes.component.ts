import { HttpErrorResponse } from '@angular/common/http';
import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../Cliente';
import { ClientesService } from '../clientes.service';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  public clientes: Cliente[] = [];
  public cliente: Cliente | undefined;
  public clienteAEliminar: Cliente | undefined;

  @ViewChild('closeButton') closeButton : ElementRef;
  @ViewChild('closeButtonEditar') closeButtonEditar : ElementRef;
  @ViewChild('closeButtonEliminar') closeButtonEliminar : ElementRef;

  
  constructor(private clienteService: ClientesService){
  }

  ngOnInit(){
    this.getClientes();
  }

  public getClientes(): void {
    this.clienteService.getClientes().subscribe((response: Cliente[])=>{
      this.clientes = response;
    }, (error: HttpErrorResponse) => {
      alert(error.message);
    });
  }

  public onAgregarCliente(agregarForm: NgForm):void{
    document.getElementById('agregar-cliente-form')?.click();
    this.clienteService.addCliente(agregarForm.value).subscribe((response: Cliente)=>{
      console.log(response); 
      this.getClientes();
      this.closeButton.nativeElement.click();

;    },(error: HttpErrorResponse)=>{alert(error.message)});
    agregarForm.reset();
  }

  public onEditarCliente(cliente: Cliente):void{
    this.clienteService.updateCliente(cliente).subscribe((response: Cliente)=>{
      console.log(response);
      this.getClientes();
      this.closeButtonEditar.nativeElement.click();

;    },(error: HttpErrorResponse)=>{alert(error.message)});
  }

  public onEliminarCliente(clienteId: number):void{
    document.getElementById('agregar-cliente-form')?.click();
     this.clienteService.deleteCliente(clienteId).subscribe((response: void)=>{
      console.log(response);
       this.getClientes();
       this.closeButtonEliminar.nativeElement.click();
;    },(error: HttpErrorResponse)=>{alert(error.message)}); 
  }

  public onOpenModal(cliente: any, tipo: string):void{
    const btn = document.createElement('button');
    const container = document.getElementById('main-container');
    btn.type = 'button';
    btn.style.display = 'none';
    btn.setAttribute('data-toggle', 'modal');
    if(tipo == 'agregar'){
      btn.setAttribute('data-target', '#agregarClienteModal')
    }
    if(tipo == 'editar'){
      this.cliente = cliente;
      btn.setAttribute('data-target', '#editarClienteModal')
    }
    if(tipo == 'eliminar'){
      console.log(cliente);
      this.clienteAEliminar = cliente;
      btn.setAttribute('data-target', '#eliminarClienteModal')
    }

    container?.appendChild(btn);
    btn.click();

  }
}
