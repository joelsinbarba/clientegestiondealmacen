import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proveedor } from './proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getProveedors(): Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>(`${this.apiServerUrl}/proveedor`);
  }

  public addProveedor(proveedor: Proveedor): Observable<Proveedor>{
    return this.http.post<Proveedor>(`${this.apiServerUrl}/proveedor/agregar`,proveedor);
  }
  public updateProveedor(proveedor: Proveedor): Observable<Proveedor>{
    return this.http.put<Proveedor>(`${this.apiServerUrl}/proveedor/actualizar`,proveedor);
  }
  public deleteProveedor(codigoProveedor: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'body'
    };
    return this.http.post<any>(`${this.apiServerUrl}/proveedor/eliminar/${codigoProveedor}`,httpOptions);
  }
}
