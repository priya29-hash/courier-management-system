from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app.models import (
    Employee,
    Branch,
    BranchInscan,
    Payment,
    Consignment,
    Vehicle,
    Bag,
    Manifest,
    Tracking,
    Delivery,
    Document
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/counts")
def get_counts(db: Session = Depends(get_db)):
    return {
        "employees": db.query(Employee).count(),
        "branches": db.query(Branch).count(),
        "branch_inscan": db.query(BranchInscan).count(),
        "payments": db.query(Payment).count(),
        "consignments": db.query(Consignment).count(),
        "vehicles": db.query(Vehicle).count(),
        "bags": db.query(Bag).count(),
        "manifests": db.query(Manifest).count(),
        "tracking": db.query(Tracking).count(),
        "deliveries": db.query(Delivery).count(),
        "documents": db.query(Document).count()
    }