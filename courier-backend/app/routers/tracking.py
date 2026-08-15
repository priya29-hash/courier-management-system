from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import crud, schemas
from app.security import verify_token

router = APIRouter(
    prefix="/tracking",
    tags=["Tracking"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post(
    "/",
    response_model=schemas.TrackingResponse,
    dependencies=[Depends(verify_token)]
)
def create_tracking(
    tracking: schemas.TrackingCreate,
    db: Session = Depends(get_db)
):
    return crud.create_tracking(db, tracking)


@router.get(
    "/",
    response_model=list[schemas.TrackingResponse],
    dependencies=[Depends(verify_token)]
)
def get_all_trackings(
    db: Session = Depends(get_db)
):
    return crud.get_trackings(db)


@router.put(
    "/{tracking_id}",
    response_model=schemas.TrackingResponse,
    dependencies=[Depends(verify_token)]
)
def update_tracking(
    tracking_id: int,
    tracking: schemas.TrackingCreate,
    db: Session = Depends(get_db)
):
    return crud.update_tracking(
        db,
        tracking_id,
        tracking
    )


@router.delete(
    "/{tracking_id}",
    dependencies=[Depends(verify_token)]
)
def delete_tracking(
    tracking_id: int,
    db: Session = Depends(get_db)
):
    return crud.delete_tracking(
        db,
        tracking_id
    )