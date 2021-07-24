import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cliente } from './Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.apiServerUrl}/Cliente`);
  }

  public addCliente(Cliente: Cliente): Observable<Cliente>{
    return this.http.post<Cliente>(`${this.apiServerUrl}/Cliente/agregar`,Cliente);
  }
  public updateCliente(Cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${this.apiServerUrl}/Cliente/actualizar`,Cliente);
  }
  public deleteCliente(codigoCliente: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'body'
    };
    return this.http.post<any>(`${this.apiServerUrl}/Cliente/eliminar/${codigoCliente}`,httpOptions);
  }
}
