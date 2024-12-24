import { Component, ViewChild, ElementRef } from '@angular/core';
import { CamionesService } from '../../../Services/camiones.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-insertar-camion',
  imports: [],
  templateUrl: './insertar-camion.component.html',
  styleUrl: './insertar-camion.component.css'
})
export class InsertarCamionComponent {
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

constructor(private service: CamionesService){}

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
this.service.insertcamion(
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
    //Sweet Alert
    Swal.fire('Error', 'No se han selecionado ninguna imagen', 'error');
    }
  }

}