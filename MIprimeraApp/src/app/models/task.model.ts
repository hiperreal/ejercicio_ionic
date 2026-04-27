export type Taskstatus = 'pendiente' | 'en progreso' | 'listo';
export type Taskpriority = 'baja' | 'media' | 'alta'| 'urgente';

export interface Task {
    id: string;
    titulo: string;
    descripcion: string;
    fechaCreacion: string;
    fechalimite: string;
    estado: Taskstatus;
    prioridad: Taskpriority;
    categoria: string;
    completado: boolean;
}
