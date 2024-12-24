import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { stringify } from 'querystring';
import { map, Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CamionesService {

  //Creo una lista que recibirá cualquier tipo de datos
  public listacamiones: any[] = [];
  //un objeto que recibirá un único tipo de dato
  public camion: any;
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

   //Consumir la API que recupera 1 camión x ID

   getCamion(id: number){
    this.http.get('http://localhost:5104/api/Camiones/getCamion/'+id).subscribe((data: any) =>{
      console.log(data);
      this.camion = data;
    });
  }
  //Subir una imagen por medio de una API
  //Agrego la referencia desde RxJS (Reactive Extension for Javascript) para 'observarla'
  uploadImage(formData: FormData): Observable<string>{
    console.log(formData);
    //Hago una petición POST para enviar la imagen al Servidor
    return this.http.post('http://localhost:5104/api/Camiones/upload', formData).pipe(map((response: any) => {
      console.log(response);
      return response.uniqueFileName;
    })
   );
  }

  //Consumir la API que inserta un Camión
  insertcamion(
    matricula: string,
    tipo_camion: string,
    marca: string,
    modelo: string,
    capacidad: number,
    kilometraje: number,
    urlFoto: string,
    disponibilidad: string,

  ){
    //Convertir el valor de la disponibilidad a booleano
    let bool: boolean = true;
    bool = disponibilidad == '0' ? false : true;

    //Realizo mi petición POST
    this.http.post('http://localhost:5104/api/Camiones/insertCamion', {
      
        iD_Camion: 0,
        matricula: matricula,
        tipo_Camion: tipo_camion,
        marca: marca,
        modelo: modelo,
        capacidad: capacidad,
        kilometraje: kilometraje,
        urlFoto: urlFoto,
        disponibilidad: bool
      
    }).subscribe((response: any) =>{
      //Valido si tiene un error o no
      if(response.respuesta.toUpperCase().includes('ERROR')){
        //Sweet Alert
        //import Swal from 'sweetalert2';
        Swal.fire('Error', response.respuesta, 'error');
      }else{
        //Sweet Alert
        Swal.fire('Correcto!', response.respuesta, 'success').then(() => {
          window.location.replace('/listarcamiones');
        });
      }
    });
  }


//Consumir la API que actualiza un Camión
actualizarcamion(
  iD_Camion: number,
  matricula: string,
  tipo_camion: string,
  marca: string,
  modelo: string,
  capacidad: number,
  kilometraje: number,
  urlFoto: string,
  disponibilidad: string,

){
  //Convertir el valor de la disponibilidad a booleano
  let bool: boolean = true;
  bool = disponibilidad == '0' ? false : true;

  //Realizo mi petición POST
  this.http.put('http://localhost:5104/api/Camiones/updateCamion', {
    
      iD_Camion: iD_Camion,
      matricula: matricula,
      tipo_Camion: tipo_camion,
      marca: marca,
      modelo: modelo,
      capacidad: capacidad,
      kilometraje: kilometraje,
      urlFoto: urlFoto,
      disponibilidad: bool
    
  }).subscribe((response: any) =>{
    //Valido si tiene un error o no
    if(response.respuesta.toUpperCase().includes('ERROR')){
      //Sweet Alert
      //import Swal from 'sweetalert2';
      Swal.fire('Error', response.respuesta, 'error');
    }else{
      //Sweet Alert
      Swal.fire('Correcto!', response.respuesta, 'success').then(() => {
        window.location.replace('/listarcamiones');
      });
    }
  });
}

//Consumir la API que elimina un nuevo camión
deleteCamion(id: any) {
  const swalWithTailwindButtons = Swal.mixin({
    customClass: {
      confirmButton:
        'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded',
      cancelButton:
        'bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded',
    },
    buttonsStyling: false,
  });

  swalWithTailwindButtons
    .fire({
      title: 'Estás seguro?',
      text: 'Esta acción no se puede revertir',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Siuuuuuu',
      cancelButtonText: 'Nel :V',
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        // Llamada a la API para eliminar el camión
        this.http
          .delete('http://localhost:5104/api/Camiones/delete/' + id)
          .subscribe((response: any) => {
            console.log(response);
            if (response.respuesta.toUpperCase().includes('ERROR')) {
              swalWithTailwindButtons.fire({
                title: 'Error',
                text: response.respuesta,
                icon: 'error',
              });
            } else {
              if (
                response.respuesta.toUpperCase().includes('IDENTIFICADOR')
              ) {
                swalWithTailwindButtons.fire({
                  title: 'Ops!',
                  text: response.respuesta,
                  icon: 'info',
                });
              } else {
                swalWithTailwindButtons
                  .fire({
                    title: 'Eliminado',
                    text: response.respuesta,
                    icon: 'success',
                  })
                  .then(() => {
                    window.location.reload();
                  });
              }
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithTailwindButtons.fire({
          title: 'Cancelado',
          text: 'Tu operación ha sido cancelada',
          icon: 'info',
        });
      }
    });
  }
}