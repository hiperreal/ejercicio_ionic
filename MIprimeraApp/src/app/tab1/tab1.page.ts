import { Component, OnInit } from '@angular/core';
import {
 IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonList,
  IonItem, 
  IonLabel,
  IonButton,
  IonButtons,
  IonIcon,
  IonBadge,
  IonSelect,
  IonSelectOption } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { CommonModule } from '@angular/common';
import { TaskService } from '../services/task.service';
import { Task, Taskstatus } from '../models/task.model';
import { trash, create, checkmarkDone } from 'ionicons/icons';
import { addIcons } from 'ionicons';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  imports: [
     IonHeader,
     IonToolbar, 
     IonTitle, 
     IonContent,
     CommonModule,
     IonList,
     IonItem,
     IonLabel,
     IonButton,
     IonButtons,
     IonIcon,
     IonSelect,
     IonSelectOption
    ],
})
export class Tab1Page implements OnInit{
  task: Task[] =[]
  constructor(private TaskService: TaskService) {
    addIcons({trash, create, checkmarkDone})
  }
  ngOnInit(): void {
    this.cargarTareas();
  }
  ionViewWillEnter(): void{
    this.cargarTareas();
  }
  cargarTareas(): void {
    this.task =this.TaskService.getTasks();
  }
  async eliminar(id: string): Promise<void>{
    await this.TaskService.deleteTask(id);
    this.cargarTareas();
  }
  async cambiarEstado(id: string,estado:Taskstatus): Promise<void>{
    await this.TaskService.changeStatus(id, estado);
    this.cargarTareas();    
  }

}
