from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import crud, schemas
from app.security import verify_token


router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", response_model=schemas.DocumentResponse)
def create_document(
    document: schemas.DocumentCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    return crud.create_document(
        db,
        document
    )


@router.get("/", response_model=list[schemas.DocumentResponse])
def get_all_documents(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    return crud.get_documents(db)


@router.put("/{document_id}", response_model=schemas.DocumentResponse)
def update_document(
    document_id: int,
    document: schemas.DocumentCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    return crud.update_document(
        db,
        document_id,
        document
    )


@router.delete("/{document_id}")
def delete_document(
    document_id: int,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):
    return crud.delete_document(
        db,
        document_id
    )