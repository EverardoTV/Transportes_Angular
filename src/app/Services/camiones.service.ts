import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CamionesService {

  //Creo una lista que recibirá cualquier tipo de datos
  public listacamiones: any[] = [];
  //dentro del constructor, genero una dependencia para consumir las APIs


  constructor(private http:HttpClient) {
    //Inicializo la lista
    this.listacamiones = [];
   }
   //metodo que consuma la API de la lista de camiones

   getCamiones(){
    //con mi cliente HTTP haré la petición de mi URL de listarcamiones
    //creando asi una promeda (subscribe) que espera cuaquier tipo de respuesta
    //(data:any) y finalmente, cuando obtenga dicha respuesta, la imprimo en consola
    //y lleno mi objeto listacamiones

    this.http.get('http://localhost:5104/api/Camiones/getCamiones')
      .subscribe((data:any) =>{
      console.log(data);
      this.listacamiones = data;
    } );
   }
}
