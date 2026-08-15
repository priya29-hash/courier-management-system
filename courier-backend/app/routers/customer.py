from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import crud, schemas
from app.security import verify_token

router = APIRouter(
    prefix="/customers",
    tags=["Customer"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post(
    "/",
    response_model=schemas.CustomerResponse,
    dependencies=[Depends(verify_token)]
)
def create_customer(
    customer: schemas.CustomerCreate,
    db: Session = Depends(get_db)
):
    return crud.create_customer(db, customer)


@router.get(
    "/",
    response_model=list[schemas.CustomerResponse],
    dependencies=[Depends(verify_token)]
)
def get_all_customers(
    db: Session = Depends(get_db)
):
    return crud.get_customers(db)


@router.put(
    "/{customer_id}",
    response_model=schemas.CustomerResponse,
    dependencies=[Depends(verify_token)]
)
def update_customer(
    customer_id: int,
    customer: schemas.CustomerCreate,
    db: Session = Depends(get_db)
):
    return crud.update_customer(
        db,
        customer_id,
        customer
    )


@router.delete(
    "/{customer_id}",
    dependencies=[Depends(verify_token)]
)
def delete_customer(
    customer_id: int,
    db: Session = Depends(get_db)
):
    return crud.delete_customer(
        db,
        customer_id
    )