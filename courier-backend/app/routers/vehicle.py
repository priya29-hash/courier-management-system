from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import crud, schemas
from app.security import verify_token

router = APIRouter(
    prefix="/vehicles",
    tags=["Vehicles"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post(
    "/",
    response_model=schemas.VehicleResponse,
    dependencies=[Depends(verify_token)]
)
def create_vehicle(
    vehicle: schemas.VehicleCreate,
    db: Session = Depends(get_db)
):
    return crud.create_vehicle(db, vehicle)


@router.get(
    "/",
    response_model=list[schemas.VehicleResponse],
    dependencies=[Depends(verify_token)]
)
def get_all_vehicles(
    db: Session = Depends(get_db)
):
    return crud.get_vehicles(db)


@router.put(
    "/{vehicle_id}",
    response_model=schemas.VehicleResponse,
    dependencies=[Depends(verify_token)]
)
def update_vehicle(
    vehicle_id: int,
    vehicle: schemas.VehicleCreate,
    db: Session = Depends(get_db)
):
    return crud.update_vehicle(
        db,
        vehicle_id,
        vehicle
    )


@router.delete(
    "/{vehicle_id}",
    dependencies=[Depends(verify_token)]
)
def delete_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db)
):
    return crud.delete_vehicle(
        db,
        vehicle_id
    )