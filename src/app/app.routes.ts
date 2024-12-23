import { Routes } from '@angular/router';
import { CamionesComponent } from './Components/camiones/camiones.component';

export const routes: Routes = [
    //ruta vacía o por default
    { path: '', component: CamionesComponent },
    //Ruta declarada
    { path: 'listarcamiones', component: CamionesComponent },

];
