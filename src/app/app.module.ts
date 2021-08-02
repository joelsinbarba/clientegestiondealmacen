import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductoService } from './producto.service';
import { LoginComponent } from './login/login.component';
import { ProductosComponent } from './productos/productos.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { ContenidoComponent } from './contenido/contenido.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductosComponent,
    ClientesComponent,
    ProveedoresComponent,
    ContenidoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ProductoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
