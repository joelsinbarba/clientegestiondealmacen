import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Producto } from './producto';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
  public paginaActual: String = "productos";

  constructor(){
  }

  ngOnInit(){
  }

  public onNavegar(pagina: String):void{
   this.paginaActual = pagina;
  }
}

