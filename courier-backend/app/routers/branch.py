from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import crud, schemas
from app.security import verify_token

router = APIRouter(
    prefix="/branches",
    tags=["Branches"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post(
    "/",
    response_model=schemas.BranchResponse
)
def create_branch(
    branch: schemas.BranchCreate,
    db: Session = Depends(get_db)
):
    return crud.create_branch(db, branch)


@router.get(
    "/",
    response_model=list[schemas.BranchResponse]
)
def get_branches(
    db: Session = Depends(get_db),
    user: dict = Depends(verify_token)
):
    return crud.get_branches(db)


@router.get(
    "/{branch_id}",
    response_model=schemas.BranchResponse
)
def get_branch(
    branch_id: int,
    db: Session = Depends(get_db),
    user: dict = Depends(verify_token)
):
    return crud.get_branch(db, branch_id)


@router.put(
    "/{branch_id}",
    response_model=schemas.BranchResponse
)
def update_branch(
    branch_id: int,
    branch: schemas.BranchCreate,
    db: Session = Depends(get_db),
    user: dict = Depends(verify_token)
):
    return crud.update_branch(db, branch_id, branch)


@router.delete("/{branch_id}")
def delete_branch(
    branch_id: int,
    db: Session = Depends(get_db),
    user: dict = Depends(verify_token)
):
    crud.delete_branch(db, branch_id)
    return {
        "message": "Branch deleted successfully"
    }