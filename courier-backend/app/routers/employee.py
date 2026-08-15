from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import crud, schemas
from app.security import verify_token


router = APIRouter(
    prefix="/employees",
    tags=["Employees"]
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()



# ==========================
# CREATE EMPLOYEE
# ==========================

@router.post(
    "/",
    response_model=schemas.EmployeeResponse
)
def create_employee(
    employee: schemas.EmployeeCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):

    return crud.create_employee(
        db,
        employee
    )



# ==========================
# GET ALL EMPLOYEES
# ==========================

@router.get(
    "/",
    response_model=list[schemas.EmployeeResponse]
)
def get_all_employees(
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):

    return crud.get_employees(db)



# ==========================
# UPDATE EMPLOYEE
# ==========================

@router.put(
    "/{employee_id}",
    response_model=schemas.EmployeeResponse
)
def update_employee(
    employee_id: int,
    employee: schemas.EmployeeCreate,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):

    return crud.update_employee(
        db,
        employee_id,
        employee
    )



# ==========================
# DELETE EMPLOYEE
# ==========================

@router.delete("/{employee_id}")
def delete_employee(
    employee_id: int,
    db: Session = Depends(get_db),
    token: dict = Depends(verify_token)
):

    return crud.delete_employee(
        db,
        employee_id
    )