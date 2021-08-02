import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent implements OnInit {

  public paginaActual: String = "productos";


  constructor() { }

  ngOnInit(): void {
  }

  
  public onLogout():void{
    this.deleteCookie('login');
    window.location.reload();
   }

  public onNavegar(pagina: String):void{
    this.paginaActual = pagina;
   }

   getCookie(c_name: string) {
    var i, x, y, ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name) {
            return unescape(y);
        }
    }
    return;
}

    deleteCookie( name: string) {
    if( this.getCookie( name ) ) {
      document.cookie = name + '=; Max-Age=0'
    }
  }
}
