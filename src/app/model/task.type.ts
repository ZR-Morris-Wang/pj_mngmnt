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