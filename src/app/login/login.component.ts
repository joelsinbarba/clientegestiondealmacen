import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: boolean = false;
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getCookie('login');
    if(this.getCookie('login') == 'si'){
      this.login = true;
    }else{
      this.login = false;
    }
  }

  ingresar(){
    var usuario = (<HTMLInputElement>document.getElementById('usuario')).value;
    var pass = (<HTMLInputElement>document.getElementById('password')).value;
    this.http.post(`${this.apiServerUrl}/usuario/login`,{
      "usuarioLog": usuario,
      "passLog": pass
    },{responseType: 'text'}).subscribe(res =>{
      if(res == null){
        console.log('no');
      }else{
        console.log(res);
         this.setCookie('login','si',2);
        window.location.reload();

      }
    });
  }

   setCookie(c_name: string, value: string, exdays: number) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
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

}
