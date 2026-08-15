from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import crud, schemas

router = APIRouter(
    prefix="/branch-inscan",
    tags=["Branch Inscan"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post(
    "/",
    response_model=schemas.BranchInscanResponse
)
def create_branch_inscan(
    branch: schemas.BranchInscanCreate,
    db: Session = Depends(get_db)
):
    return crud.create_branch_inscan(
        db,
        branch
    )


@router.get(
    "/",
    response_model=list[schemas.BranchInscanResponse]
)
def get_all_branch_inscan(
    db: Session = Depends(get_db)
):
    return crud.get_branch_inscan(db)


@router.put(
    "/{branch_id}",
    response_model=schemas.BranchInscanResponse
)
def update_branch_inscan(
    branch_id: int,
    branch: schemas.BranchInscanCreate,
    db: Session = Depends(get_db)
):
    return crud.update_branch_inscan(
        db,
        branch_id,
        branch
    )


@router.delete(
    "/{branch_id}"
)
def delete_branch_inscan(
    branch_id: int,
    db: Session = Depends(get_db)
):
    return crud.delete_branch_inscan(
        db,
        branch_id
    )