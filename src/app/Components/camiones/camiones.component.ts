import { Component } from '@angular/core';
import { CamionesService } from '../../Services/camiones.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-camiones',
  imports: [CommonModule],
  templateUrl: './camiones.component.html',
  styleUrl: './camiones.component.css'
})
export class CamionesComponent {
//Crear un constructor que utilice una dependencia mi servicio (CamionesService)

constructor(private service: CamionesService){
  //En cuanto inicie mi componente llamo/invoco al servicio que consume la API
  this.service.getCamiones();
}

//Recupero la lista de camiones directamente del servicio, creando asi una instancia Singleton (Digase,
//de un objeto que se declara 1 unica vez y es utilizado/alcanzable por n cantidad de componentes)

get listacamiones(){
  return this.service.listacamiones;
  }
}
