from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud, schemas

router = APIRouter(
    prefix="/bags",
    tags=["Bags"]
)


@router.post("/")
def create_bag(
    bag: schemas.BagCreate,
    db: Session = Depends(get_db)
):
    return crud.create_bag(db, bag)


@router.get("/")
def read_bags(
    db: Session = Depends(get_db)
):
    return crud.get_bags(db)


@router.get("/{bag_id}")
def read_bag(
    bag_id: int,
    db: Session = Depends(get_db)
):
    return crud.get_bag(db, bag_id)


@router.delete("/{bag_id}")
def remove_bag(
    bag_id: int,
    db: Session = Depends(get_db)
):
    return crud.delete_bag(db, bag_id)


@router.put("/{bag_id}")
def update_bag(
    bag_id: int,
    bag: schemas.BagCreate,
    db: Session = Depends(get_db)
):
    return crud.update_bag(db, bag_id, bag)    