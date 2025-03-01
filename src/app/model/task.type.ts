import { NumberValueAccessor } from "@angular/forms";

export type Task = {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export type TaskInput = {
    userId: number;
    title: string;
    body: string;
}

export type Project = {
    id: number;
    projectId: number;      // Holder for future systematic project ID
    projectName: string;
}

export type ProjectInput = {
    projectName: string | undefined;
}