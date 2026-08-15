from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import crud, schemas
from app.security import verify_token


router = APIRouter(
    prefix="/payments",
    tags=["Payment"]
)



def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



@router.post(
    "/",
    response_model=schemas.PaymentResponse,
    dependencies=[Depends(verify_token)]
)
def create_payment(
    payment: schemas.PaymentCreate,
    db: Session = Depends(get_db)
):

    return crud.create_payment(
        db,
        payment
    )




@router.get(
    "/",
    response_model=list[schemas.PaymentResponse],
    dependencies=[Depends(verify_token)]
)
def get_all_payments(
    db: Session = Depends(get_db)
):

    return crud.get_payments(db)




@router.put(
    "/{payment_id}",
    response_model=schemas.PaymentResponse,
    dependencies=[Depends(verify_token)]
)
def update_payment(
    payment_id:int,
    payment:schemas.PaymentCreate,
    db:Session=Depends(get_db)
):

    return crud.update_payment(
        db,
        payment_id,
        payment
    )




@router.delete(
    "/{payment_id}",
    dependencies=[Depends(verify_token)]
)
def delete_payment(
    payment_id:int,
    db:Session=Depends(get_db)
):

    return crud.delete_payment(
        db,
        payment_id
    )