import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HabitacionesPage } from './habitaciones';

@NgModule({
  declarations: [
    HabitacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(HabitacionesPage),
  ],
})
export class HabitacionesPageModule {}
