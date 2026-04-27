/* Trae herramientas que el service necesita para funcionar */
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Task , Taskstatus } from '../models/task.model';

/* Crear usa sola instancia para la aplicacion */
@Injectable({
  providedIn: 'root'
})
export class TaskService{
    /* Define la clave con la que se guardaran las tareas */
    private readonly STORAGE_KEY = 'task';
    /* Arreglo que guarda en memoria cuando la app esta activa (antes de guardarlo en el dispositivo) */
    private tasks: Task[] = [];

    /* Cargar desde almacenamiento local las tareas que se habian guardado antes. */
    async init(): Promise<void> {
        const {value} =await Preferences.get({key: this.STORAGE_KEY});
        this.tasks =value ? JSON.parse(value) : [];
    }
    /* Devuelve la lista de tareas */
    getTaks(): Task[] {
        return [...this.tasks];
    }

    /* Busca una tarea por su id */
    getTaskById(id: string): Task | undefined {
        return this.tasks.find(task => task.id === id);
    }

    /* Agrega una tarea nueva */
    async addTask(taskData: Omit<Task, 'id' | 'fechaCreacion' | 'completado'>): Promise<void> {
        const newTask: Task = {
            ...taskData,
            id: crypto.randomUUID(),
            fechaCreacion: new Date().toISOString(),
            completado: taskData.estado === 'listo'
        };
        this.tasks.unshift(newTask);
        await this.saveTask();
    }

    /* Actualiza la tarea existente */
    async updateTask(updateTask: Task): Promise<void> {
        const index = this.tasks.findIndex(task => task.id === updateTask.id);
        if (index=== -1) return

        updateTask.completado = updateTask.estado === 'listo';
        this.tasks[index] = {...updateTask};
        await this.saveTask();
    }
    
    /* Elimina la tarea existentes por id */
    async deleteTask(id: string): Promise<void> {
        this.tasks = this.tasks.filter(task => task.id !== id);
        await this.saveTask();
    }

    /* Cambia solo el estado de una tarea */
    async changeStatus (id: string, estado: Taskstatus): Promise<void> {
        const task = this.tasks.find(task => task.id === id);
        if (!task) return;

        task.estado = estado;
        task.completado = estado === 'listo';
        await this.saveTask();
    }

    /* Calcula estadisticas del arreglo de tareas */
    getSummary(){
        const total = this.tasks.length;
        const pendientes = this.tasks.filter(t => t.estado === 'pendiente').length;
        const enProgreso = this.tasks.filter(t => t.estado === 'en progreso').length;
        const listas = this.tasks.filter(t => t.estado === 'listo').length;

        const hoy = new Date();
        const vencidas = this.tasks.filter( t =>
            t.estado !== 'listo' && new Date(t.fechalimite) < hoy
        ).length;

        return {
            total,
            pendientes,
            enProgreso,
            listas,
            vencidas,
        };

    /* Guarda el arreglo tasks en el almacenamiento local */
    }
    private async saveTask(): Promise<void> {
        await Preferences.set({
            key:this.STORAGE_KEY,
            value:JSON.stringify(this.tasks)
        });
    }

}