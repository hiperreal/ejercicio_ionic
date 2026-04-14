export type Taskstatus = 'pendiente' | 'en-progreso' | 'Listo';
export type Taskpriority = 'baja' | 'media' | 'alta'| 'urgente';

export interface Task {
    id: string;
    titulo: string;
    descripcion: string;
    fechaCreacion: Date;
    fechaLimite: Date;
    estado: Taskstatus;
    prioridad: Taskpriority;
    categoria: string;
    completada: boolean;
}
