from typing import Annotated
from schema.session.start_session import SessionDep
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select
from fastapi import APIRouter

task = APIRouter(
    prefix="/tasks",
)

class Task(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    userId: int | None = Field(default=None, index=True)
    title: str | None = Field(default=None, index=True)
    body: str | None = Field(default=None)

@task.post("/")
def create_hero(task: Task, session: SessionDep) -> Task:
    session.add(task)
    session.commit()
    session.refresh(task)
    return task


@task.get("/")
def read_tasks(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[Task]:
    heroes = session.exec(select(Task).offset(offset).limit(limit)).all()
    return heroes


@task.get("/{task_id}")
def read_task(task_id: int, session: SessionDep) -> Task:
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task


@task.delete("/{task_id}")
def delete_task(task_id: int, session: SessionDep):
    task = session.get(Task, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    session.delete(task)
    session.commit()
    return {"ok": True}

@task.put("/{task_id}")
def update_task(task_id: int, task: Task, session: SessionDep):
    db_task = session.exec(select(Task).where(Task.id == task_id)).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Hero not found")

    db_task.userId = task.userId
    db_task.title = task.title
    db_task.body = task.body

    session.add(db_task)
    session.commit()
    session.refresh(db_task)

    return db_task