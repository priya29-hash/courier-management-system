from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import crud, schemas
from app.security import verify_token

router = APIRouter(
    prefix="/consignments",
    tags=["Consignments"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post(
    "/",
    response_model=schemas.ConsignmentResponse,
    dependencies=[Depends(verify_token)]
)
def create_consignment(
    consignment: schemas.ConsignmentCreate,
    db: Session = Depends(get_db)
):
    return crud.create_consignment(db, consignment)


@router.get(
    "/",
    response_model=list[schemas.ConsignmentResponse],
    dependencies=[Depends(verify_token)]
)
def get_all_consignments(
    db: Session = Depends(get_db)
):
    return crud.get_consignments(db)


@router.put(
    "/{consignment_id}",
    response_model=schemas.ConsignmentResponse,
    dependencies=[Depends(verify_token)]
)
def update_consignment(
    consignment_id: int,
    consignment: schemas.ConsignmentCreate,
    db: Session = Depends(get_db)
):
    return crud.update_consignment(
        db,
        consignment_id,
        consignment
    )


@router.delete(
    "/{consignment_id}",
    dependencies=[Depends(verify_token)]
)
def delete_consignment(
    consignment_id: int,
    db: Session = Depends(get_db)
):
    return crud.delete_consignment(
        db,
        consignment_id
    )