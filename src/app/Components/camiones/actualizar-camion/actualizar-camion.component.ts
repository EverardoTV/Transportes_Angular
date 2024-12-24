import { Component, ElementRef, ViewChild } from '@angular/core';
import { CamionesService } from '../../../Services/camiones.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-actualizar-camion',
  imports: [],
  templateUrl: './actualizar-camion.component.html',
  styleUrl: './actualizar-camion.component.css'
})
export class ActualizarCamionComponent {
private id_param: any; //variable que recibirá el valor desde la URL
public ID_Camion: number = 0; //variable para almacenar el ID del camión
selectFile: File | null = null; // variable para almacenar un archivo

  //referencias a los elementos HTML
  //tanto '@ViewChild' como 'ElementRef' se importan desde '@angular/core'
@ViewChild('matricula') private matricula!: ElementRef;
@ViewChild('capacidad') private capacidad!: ElementRef;
@ViewChild('marca') private marca!: ElementRef;
@ViewChild('modelo') private modelo!: ElementRef;
@ViewChild('disponibilidad') private disponibilidad!: ElementRef;
@ViewChild('kilometraje') private kilometraje!: ElementRef;
@ViewChild('tipo_Camion') private tipo_camion!: ElementRef;

//Constructor que haga referencia al servicio que consumirá las APIs de la imagenes y los camiones

constructor(private service: CamionesService, private router:ActivatedRoute){
  //En cuanto inicie mi componente invoco al servicio que consume la api de recuperar el camión by ID
  this.id_param = this.router.params.subscribe((params) => {
    console.log('ID Recuperado: ' + params['id']);//imprimo en consola el valor del parámetro
    this.ID_Camion = params['id'];//Recupero y asigno el valor del parámetro que me envían
    this.service.getCamion(this.ID_Camion);//invoco al servicio que consume la API de recuperar el camión by ID
  })
}
//Creo una instancia Singleton del objeto que se llena al invocar el servicio de recuperar el camión by ID

get camion(){
  return this.service.camion;
}




//Método para manejar la imagen seleccionada desde el formulario
onFileSelected(event: any){
  this.selectFile = event.target.files[0]; //
}

guardar(){
  //Valido si existe o no una imagen
  if(this.selectFile){
    //Indicamos que hay una imagen, creo el FormData para enviarla al servidor
    const formData = new FormData();
    //agrego la imagen a mi FormData
    formData.append('image', this.selectFile);
    //Invoco al servicio que insertará la imagen en el servidor, creando una promesa
    //para retomar la respuesta (uniqueFileName) y asignarla a la UrlFoto del camión
    this.service.uploadImage(formData).subscribe((response: any) => {
      //Asignar los valores de las variables que se enviarán en la petición
const matricula = this.matricula.nativeElement.value;
const capacidad = this.capacidad.nativeElement.value;
const marca = this.marca.nativeElement.value;
const modelo = this.modelo.nativeElement.value;
const disponibilidad = this.disponibilidad.nativeElement.value;
const kilometraje = this.kilometraje.nativeElement.value;
const tipo_Camion = this.tipo_camion.nativeElement.value;
const urlFoto = response; //url de la imagen subida al servidor
//llamo al servicio que inserta el camión, pasando los parámetros
this.service.actualizarcamion(
this.ID_Camion,
matricula,
tipo_Camion,
marca,
modelo,
capacidad,
kilometraje,
urlFoto,
disponibilidad
);
  });
    }else{
     //Asignar los valores de las variables que se enviarán en la petición
     const matricula = this.matricula.nativeElement.value;
     const capacidad = this.capacidad.nativeElement.value;
     const marca = this.marca.nativeElement.value;
     const modelo = this.modelo.nativeElement.value;
     const disponibilidad = this.disponibilidad.nativeElement.value;
     const kilometraje = this.kilometraje.nativeElement.value;
     const tipo_Camion = this.tipo_camion.nativeElement.value;
     const urlFoto = this.service.camion.urlFoto; //url de la imagen subida al servidor
     //llamo al servicio que inserta el camión, pasando los parámetros
     this.service.actualizarcamion(
     this.ID_Camion,
     matricula,
     tipo_Camion,
     marca,
     modelo,
     capacidad,
     kilometraje,
     urlFoto,
     disponibilidad
     );
    }
  }
}
