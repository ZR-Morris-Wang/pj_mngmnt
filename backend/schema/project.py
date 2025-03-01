from typing import Annotated
from schema.session.start_session import SessionDep
from fastapi import Depends, FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Field, Session, SQLModel, create_engine, select
from fastapi import APIRouter

project = APIRouter(
    prefix="/projects",
)

class Project(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    # projectId: int | None = Field(default=None, index=True)
    projectName: str | None = Field(default=None, index=True)

@project.post("/")
def create_hero(project: Project, session: SessionDep) -> Project:
    session.add(project)
    session.commit()
    session.refresh(project)
    return project


@project.get("/")
def read_projects(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
) -> list[Project]:
    heroes = session.exec(select(Project).offset(offset).limit(limit)).all()
    return heroes


@project.get("/{project_id}")
def read_project(project_id: int, session: SessionDep) -> Project:
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@project.delete("/{project_id}")
def delete_project(project_id: int, session: SessionDep):
    project = session.get(Project, project_id)
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    session.delete(project)
    session.commit()
    return {"ok": True}

@project.put("/{project_id}")
def update_project(project_id: int, project: Project, session: SessionDep):
    db_project = session.exec(select(Project).where(Project.id == project_id)).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Hero not found")

    db_project.userId = project.userId
    db_project.title = project.title
    db_project.body = project.body

    session.add(db_project)
    session.commit()
    session.refresh(db_project)

    return db_project