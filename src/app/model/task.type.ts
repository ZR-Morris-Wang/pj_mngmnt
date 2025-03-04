import { NumberValueAccessor } from "@angular/forms";

export type Task = {
    userId: number;
    id: number;
    title: string;
    projectId: number;
    body: string;
}

export type TaskInput = {
    userId: number | undefined;
    title: string;
    projectId: number | undefined;
    description: string;
}

export type Project = {
    id: number;
    // projectId: number;      // Holder for future systematic project ID
    projectName: string;
}

export type ProjectInput = {
    projectName: string | undefined;
}

export type testType = {
    id: number;
    title: string;
    description: string;
  }