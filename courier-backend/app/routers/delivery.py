from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import crud, schemas
from app.security import verify_token

router = APIRouter(
    prefix="/deliveries",
    tags=["Delivery"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post(
    "/",
    response_model=schemas.DeliveryResponse,
    dependencies=[Depends(verify_token)]
)
def create_delivery(
    delivery: schemas.DeliveryCreate,
    db: Session = Depends(get_db)
):
    return crud.create_delivery(db, delivery)


@router.get(
    "/",
    response_model=list[schemas.DeliveryResponse],
    dependencies=[Depends(verify_token)]
)
def get_all_deliveries(
    db: Session = Depends(get_db)
):
    return crud.get_deliveries(db)


@router.put(
    "/{delivery_id}",
    response_model=schemas.DeliveryResponse,
    dependencies=[Depends(verify_token)]
)
def update_delivery(
    delivery_id: int,
    delivery: schemas.DeliveryCreate,
    db: Session = Depends(get_db)
):
    return crud.update_delivery(
        db,
        delivery_id,
        delivery
    )


@router.delete(
    "/{delivery_id}",
    dependencies=[Depends(verify_token)]
)
def delete_delivery(
    delivery_id: int,
    db: Session = Depends(get_db)
):
    return crud.delete_delivery(
        db,
        delivery_id
    )