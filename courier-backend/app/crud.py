from sqlalchemy.orm import Session
from app import models, schemas

from app.security import hash_password

from app.models import (
    Employee,
    Branch,
    Consignment,
    Vehicle,
    Bag,
    Manifest,
    Tracking,
    Delivery,
    Customer,
    User,
    Document,
    Payment,
    BranchInscan
)
from app.schemas import (
    EmployeeCreate,
    BranchCreate,
    ConsignmentCreate,
    VehicleCreate,
    BagCreate,
    ManifestCreate,
    TrackingCreate,
    DeliveryCreate,
    CustomerCreate,
    UserCreate,
    DocumentCreate,
    PaymentCreate
)
# =====================================================
# Employee CRUD
# =====================================================

def create_employee(db: Session, employee: EmployeeCreate):
    db_employee = Employee(**employee.model_dump())
    db.add(db_employee)
    db.commit()
    db.refresh(db_employee)
    return db_employee


def get_employees(db: Session):
    return db.query(Employee).all()


def update_employee(
    db: Session,
    employee_id: int,
    employee: EmployeeCreate
):
    db_employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if db_employee:
        for key, value in employee.model_dump().items():
            setattr(db_employee, key, value)

        db.commit()
        db.refresh(db_employee)

    return db_employee


def delete_employee(
    db: Session,
    employee_id: int
):
    db_employee = db.query(Employee).filter(
        Employee.id == employee_id
    ).first()

    if db_employee:
        db.delete(db_employee)
        db.commit()

    return db_employee


# =====================================================
# Branch CRUD
# =====================================================

def create_branch(
    db: Session,
    branch: BranchCreate
):
    db_branch = Branch(**branch.model_dump())
    db.add(db_branch)
    db.commit()
    db.refresh(db_branch)
    return db_branch


def get_branches(db: Session):
    return db.query(Branch).all()


def update_branch(
    db: Session,
    branch_id: int,
    branch: BranchCreate
):
    db_branch = db.query(Branch).filter(
        Branch.id == branch_id
    ).first()

    if db_branch:
        for key, value in branch.model_dump().items():
            setattr(db_branch, key, value)

        db.commit()
        db.refresh(db_branch)

    return db_branch


def delete_branch(
    db: Session,
    branch_id: int
):
    db_branch = db.query(Branch).filter(
        Branch.id == branch_id
    ).first()

    if db_branch:
        db.delete(db_branch)
        db.commit()

    return db_branch


# =====================================================
# Consignment CRUD
# =====================================================

def create_consignment(
    db: Session,
    consignment: ConsignmentCreate
):
    db_consignment = Consignment(**consignment.model_dump())
    db.add(db_consignment)
    db.commit()
    db.refresh(db_consignment)
    return db_consignment


def get_consignments(db: Session):
    return db.query(Consignment).all()


def update_consignment(
    db: Session,
    consignment_id: int,
    consignment: ConsignmentCreate
):
    db_consignment = db.query(Consignment).filter(
        Consignment.id == consignment_id
    ).first()

    if db_consignment:
        for key, value in consignment.model_dump().items():
            setattr(db_consignment, key, value)

        db.commit()
        db.refresh(db_consignment)

    return db_consignment


def delete_consignment(
    db: Session,
    consignment_id: int
):
    db_consignment = db.query(Consignment).filter(
        Consignment.id == consignment_id
    ).first()

    if db_consignment:
        db.delete(db_consignment)
        db.commit()

    return db_consignment


# =====================================================
# Vehicle CRUD
# =====================================================

def create_vehicle(
    db: Session,
    vehicle: VehicleCreate
):
    db_vehicle = Vehicle(**vehicle.model_dump())
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle


def get_vehicles(db: Session):
    return db.query(Vehicle).all()


def update_vehicle(
    db: Session,
    vehicle_id: int,
    vehicle: VehicleCreate
):
    db_vehicle = db.query(Vehicle).filter(
        Vehicle.id == vehicle_id
    ).first()

    if db_vehicle:
        for key, value in vehicle.model_dump().items():
            setattr(db_vehicle, key, value)

        db.commit()
        db.refresh(db_vehicle)

    return db_vehicle


def delete_vehicle(
    db: Session,
    vehicle_id: int
):
    db_vehicle = db.query(Vehicle).filter(
        Vehicle.id == vehicle_id
    ).first()

    if db_vehicle:
        db.delete(db_vehicle)
        db.commit()

    return db_vehicle


# =====================================================
# Bag CRUD
# =====================================================

def create_bag(
    db: Session,
    bag: BagCreate
):
    db_bag = Bag(**bag.model_dump())
    db.add(db_bag)
    db.commit()
    db.refresh(db_bag)
    return db_bag


def get_bags(db: Session):
    return db.query(Bag).all()


def update_bag(
    db: Session,
    bag_id: int,
    bag: BagCreate
):
    db_bag = db.query(Bag).filter(
        Bag.id == bag_id
    ).first()

    if db_bag:
        for key, value in bag.model_dump().items():
            setattr(db_bag, key, value)

        db.commit()
        db.refresh(db_bag)

    return db_bag


def delete_bag(
    db: Session,
    bag_id: int
):
    db_bag = db.query(Bag).filter(
        Bag.id == bag_id
    ).first()

    if db_bag:
        db.delete(db_bag)
        db.commit()

    return db_bag

    # =====================================================
# Manifest CRUD
# =====================================================

def create_manifest(
    db: Session,
    manifest: ManifestCreate
):

    db_manifest = Manifest(

        manifest_number=manifest.manifest_number,

        vehicle_no=manifest.vehicle_no,

        from_branch=manifest.from_branch,

        to_branch=manifest.to_branch,

        manifest_date=manifest.manifest_date,

        status=manifest.status

    )


    db.add(db_manifest)

    db.commit()

    db.refresh(db_manifest)

    return db_manifest

def get_manifests(db: Session):
    return db.query(Manifest).all()

def update_manifest(
    db: Session,
    manifest_id: int,
    manifest: ManifestCreate
):

    db_manifest = db.query(Manifest).filter(
        Manifest.id == manifest_id
    ).first()


    if db_manifest:

        db_manifest.manifest_number = manifest.manifest_number
        db_manifest.vehicle_no = manifest.vehicle_no
        db_manifest.from_branch = manifest.from_branch
        db_manifest.to_branch = manifest.to_branch
        db_manifest.manifest_date = manifest.manifest_date
        db_manifest.status = manifest.status


        db.commit()

        db.refresh(db_manifest)


    return db_manifest


def delete_manifest(
    db: Session,
    manifest_id: int
):
    db_manifest = db.query(Manifest).filter(
        Manifest.id == manifest_id
    ).first()

    if db_manifest:
        db.delete(db_manifest)
        db.commit()

    return db_manifest


# =====================================================
# Tracking CRUD
# =====================================================

def create_tracking(
    db: Session,
    tracking: TrackingCreate
):
    db_tracking = Tracking(**tracking.model_dump())
    db.add(db_tracking)
    db.commit()
    db.refresh(db_tracking)
    return db_tracking


def get_trackings(db: Session):
    return db.query(Tracking).all()


def update_tracking(
    db: Session,
    tracking_id: int,
    tracking: TrackingCreate
):
    db_tracking = db.query(Tracking).filter(
        Tracking.id == tracking_id
    ).first()

    if db_tracking:
        for key, value in tracking.model_dump().items():
            setattr(db_tracking, key, value)

        db.commit()
        db.refresh(db_tracking)

    return db_tracking


def delete_tracking(
    db: Session,
    tracking_id: int
):
    db_tracking = db.query(Tracking).filter(
        Tracking.id == tracking_id
    ).first()

    if db_tracking:
        db.delete(db_tracking)
        db.commit()

    return db_tracking


# =====================================================
# Delivery CRUD
# =====================================================

def create_delivery(
    db: Session,
    delivery: DeliveryCreate
):
    db_delivery = Delivery(**delivery.model_dump())
    db.add(db_delivery)
    db.commit()
    db.refresh(db_delivery)
    return db_delivery


def get_deliveries(db: Session):
    return db.query(Delivery).all()


def update_delivery(
    db: Session,
    delivery_id: int,
    delivery: DeliveryCreate
):
    db_delivery = db.query(Delivery).filter(
        Delivery.id == delivery_id
    ).first()

    if db_delivery:
        for key, value in delivery.model_dump().items():
            setattr(db_delivery, key, value)

        db.commit()
        db.refresh(db_delivery)

    return db_delivery


def delete_delivery(
    db: Session,
    delivery_id: int
):
    db_delivery = db.query(Delivery).filter(
        Delivery.id == delivery_id
    ).first()

    if db_delivery:
        db.delete(db_delivery)
        db.commit()

    return db_delivery


# =====================================================
# Customer CRUD
# =====================================================

def create_customer(
    db: Session,
    customer: CustomerCreate
):
    db_customer = Customer(**customer.model_dump())
    db.add(db_customer)
    db.commit()
    db.refresh(db_customer)
    return db_customer


def get_customers(db: Session):
    return db.query(Customer).all()


def update_customer(
    db: Session,
    customer_id: int,
    customer: CustomerCreate
):
    db_customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if db_customer:
        for key, value in customer.model_dump().items():
            setattr(db_customer, key, value)

        db.commit()
        db.refresh(db_customer)

    return db_customer


def delete_customer(
    db: Session,
    customer_id: int
):
    db_customer = db.query(Customer).filter(
        Customer.id == customer_id
    ).first()

    if db_customer:
        db.delete(db_customer)
        db.commit()

    return db_customer


# =====================================================
# User CRUD
# =====================================================

def create_user(
    db: Session,
    user: UserCreate
):
    existing_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if existing_user:
        return None

    db_user = User(
        username=user.username,
        password=hash_password(user.password),
        full_name=user.full_name,
        role=user.role,
        status="Active"
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def get_user_by_username(
    db: Session,
    username: str
):
    return db.query(User).filter(
        User.username == username
    ).first()


# =====================================================
# Document CRUD
# =====================================================

    # ---------------- BAG CRUD ----------------

def create_bag(db: Session, bag: schemas.BagCreate):
    db_bag = models.Bag(
        bag_no=bag.bag_no,
        manifest_no=bag.manifest_no,
        from_branch=bag.from_branch,
        to_branch=bag.to_branch,
        seal_no=bag.seal_no,
        status=bag.status
    )

    db.add(db_bag)
    db.commit()
    db.refresh(db_bag)

    return db_bag


def get_bags(db: Session):
    return db.query(models.Bag).all()


def get_bag(db: Session, bag_id: int):
    return db.query(models.Bag).filter(
        models.Bag.id == bag_id
    ).first()


def delete_bag(db: Session, bag_id: int):
    bag = db.query(models.Bag).filter(
        models.Bag.id == bag_id
    ).first()

    if bag:
        db.delete(bag)
        db.commit()

    return bag

def update_bag(db: Session, bag_id: int, bag: schemas.BagCreate):

    db_bag = db.query(models.Bag).filter(
        models.Bag.id == bag_id
    ).first()


    if db_bag:

        db_bag.bag_no = bag.bag_no

        db_bag.manifest_no = bag.manifest_no

        db_bag.from_branch = bag.from_branch

        db_bag.to_branch = bag.to_branch

        db_bag.seal_no = bag.seal_no

        db_bag.status = bag.status


        db.commit()

        db.refresh(db_bag)


    return db_bag




  # =====================================================
# Document CRUD
# =====================================================

def create_document(
    db: Session,
    document: DocumentCreate
):
    db_document = Document(**document.model_dump())

    db.add(db_document)
    db.commit()
    db.refresh(db_document)

    return db_document


def get_documents(db: Session):
    return db.query(Document).all()


def update_document(
    db: Session,
    document_id: int,
    document: DocumentCreate
):

    db_document = db.query(Document).filter(
        Document.id == document_id
    ).first()

    if db_document:

        for key, value in document.model_dump().items():
            setattr(db_document, key, value)

        db.commit()
        db.refresh(db_document)

    return db_document


def delete_document(
    db: Session,
    document_id: int
):

    db_document = db.query(Document).filter(
        Document.id == document_id
    ).first()

    if db_document:
        db.delete(db_document)
        db.commit()

    return db_document  

# ==========================
# Payment CRUD
# ==========================

from app.models import Payment


def create_payment(
    db: Session,
    payment: PaymentCreate
):

    db_payment = Payment(
        **payment.model_dump()
    )

    db.add(db_payment)
    db.commit()
    db.refresh(db_payment)

    return db_payment



def get_payments(
    db: Session
):

    return db.query(Payment).all()



def update_payment(
    db: Session,
    payment_id: int,
    payment: PaymentCreate
):

    db_payment = db.query(Payment).filter(
        Payment.id == payment_id
    ).first()


    if db_payment:

        for key, value in payment.model_dump().items():

            setattr(
                db_payment,
                key,
                value
            )


        db.commit()
        db.refresh(db_payment)


    return db_payment




def delete_payment(
    db: Session,
    payment_id: int
):

    db_payment = db.query(Payment).filter(
        Payment.id == payment_id
    ).first()


    if db_payment:

        db.delete(db_payment)
        db.commit()


    return db_payment    



from sqlalchemy.orm import Session

from app import schemas
from app.models import BranchInscan


def create_branch_inscan(
    db: Session,
    branch: schemas.BranchInscanCreate
):

    db_branch = BranchInscan(
        **branch.model_dump()
    )

    db.add(db_branch)
    db.commit()
    db.refresh(db_branch)

    return db_branch


def get_branch_inscan(
    db: Session
):

    return db.query(
        BranchInscan
    ).all()


def get_branch_inscan_by_id(
    db: Session,
    branch_id: int
):

    return db.query(
        BranchInscan
    ).filter(
        BranchInscan.id == branch_id
    ).first()


def update_branch_inscan(
    db: Session,
    branch_id: int,
    branch: schemas.BranchInscanCreate
):

    db_branch = db.query(
        BranchInscan
    ).filter(
        BranchInscan.id == branch_id
    ).first()

    if db_branch:

        for key, value in branch.model_dump().items():

            setattr(
                db_branch,
                key,
                value
            )

        db.commit()
        db.refresh(db_branch)

    return db_branch


def delete_branch_inscan(
    db: Session,
    branch_id: int
):

    db_branch = db.query(
        BranchInscan
    ).filter(
        BranchInscan.id == branch_id
    ).first()

    if db_branch:

        db.delete(db_branch)
        db.commit()

    return db_branch