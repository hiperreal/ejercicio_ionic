import { Component } from '@angular/core';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonToast,
  ToastController,
} from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';
import { Taskpriority, Taskstatus } from '../models/task.model';

@Component({
  selector: 'app-tab2',
  templateUrl:  'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonButton,
    IonItem,
    IonInput,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    IonLabel,
    IonHeader, 
    IonToolbar,
    IonTitle,
    IonContent,
    IonToast,
    ExploreContainerComponent]
})
export class Tab2Page {
  mostrarToast = false;
  mensajeToast = '';


  form : {
    titulo: string,
    descripcion: string;
    fechalimite: string;
    estado: Taskstatus;
    prioridad: Taskpriority;
    categoria: string;
  }={
    titulo: '',
    descripcion: '',
    fechalimite: '',
    estado: 'pendiente',
    prioridad: 'media',
    categoria: '',
  };

  constructor(
    private taskService: TaskService,
    private toastController: ToastController
  ) {}

  async guardar ():Promise<void>{
    if(!this.form.titulo.trim() || !this.form.fechalimite){
      this.mensajeToast = 'El titulo y la fecha son obligatorios.'
      this.mostrarToast = true;
      return;
    }

    await this.taskService.addTask({
      titulo: this.form.titulo,
      descripcion: this.form.descripcion,
      fechalimite: this.form.fechalimite,
      estado: this.form.estado,
      prioridad: this.form.prioridad,
      categoria: this.form.categoria,
    });

    this.form = {
      titulo: '',
    descripcion: '',
    fechalimite: '',
    estado: 'pendiente',
    prioridad: 'media',
    categoria: '',
    };

    this.mensajeToast = 'Tarea guardada correctamente';
    this.mostrarToast = true;

  }

}
