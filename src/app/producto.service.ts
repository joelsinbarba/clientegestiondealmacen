import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './producto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getProductos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.apiServerUrl}/producto`);
  }

  public addProducto(producto: Producto): Observable<Producto>{
    return this.http.post<Producto>(`${this.apiServerUrl}/producto/agregar`,producto);
  }
  public updateProducto(producto: Producto): Observable<Producto>{
    return this.http.put<Producto>(`${this.apiServerUrl}/producto/actualizar`,producto);
  }
  public deleteProducto(codigoProducto: number): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      observe: 'response' as 'body'
    };
    return this.http.post<any>(`${this.apiServerUrl}/producto/eliminar/${codigoProducto}`,httpOptions);
  }
}
