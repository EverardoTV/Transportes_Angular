import { Routes } from '@angular/router';
import { CamionesComponent } from './Components/camiones/camiones.component';
import { InsertarCamionComponent } from './Components/camiones/insertar-camion/insertar-camion.component';
import { ActualizarCamionComponent } from './Components/camiones/actualizar-camion/actualizar-camion.component';

export const routes: Routes = [
    //ruta vacía o por default
    { path: '', component: CamionesComponent },
    //Ruta declarada
    { path: 'listarcamiones', component: CamionesComponent },
    { path: 'insertarcamion', component: InsertarCamionComponent },
    { path: 'actualizarcamion/:id', component: ActualizarCamionComponent },
];
