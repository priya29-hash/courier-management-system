from sqlalchemy import Column, Integer, String, Date, DateTime, Float
from datetime import datetime
from sqlalchemy.sql import func
from app.database import Base


# ==========================
# Employee Model
# ==========================

class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(String(20), unique=True, nullable=False)
    employee_name = Column(String(100), nullable=False)
    gender = Column(String(10))
    dob = Column(Date)
    mobile = Column(String(10))
    email = Column(String(100))
    designation = Column(String(100))
    branch = Column(String(100))
    joining_date = Column(Date)
    salary = Column(Integer)
    address = Column(String(255))
    status = Column(String(20))


# ==========================
# Branch Model
# ==========================

class Branch(Base):
    __tablename__ = "branches"

    id = Column(Integer, primary_key=True, index=True)
    branch_code = Column(String(20), unique=True, nullable=False)
    branch_name = Column(String(100), nullable=False)
    city = Column(String(100))
    state = Column(String(100))
    pincode = Column(String(10))
    manager = Column(String(100))
    mobile = Column(String(10))
    email = Column(String(100))
    status = Column(String(20))

# ==========================
# Consignment Model
# ==========================

class Consignment(Base):
    __tablename__ = "consignments"

    id = Column(Integer, primary_key=True, index=True)

    awb_no = Column(String(30), unique=True, nullable=False)
    booking_date = Column(DateTime)

    sender_name = Column(String(100), nullable=False)
    receiver_name = Column(String(100), nullable=False)

    from_branch = Column(String(100), nullable=False)
    to_branch = Column(String(100), nullable=False)

    weight = Column(String(20))
    status = Column(String(30))


# ==========================
# Vehicle Model
# ==========================

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    vehicle_no = Column(String(20), unique=True, nullable=False)
    vehicle_type = Column(String(50))
    driver_name = Column(String(100))
    driver_mobile = Column(String(10))
    capacity = Column(String(50))
    branch = Column(String(100))
    status = Column(String(20))
    created_at = Column(DateTime)

# ==========================
# Bag Model
# ==========================
class Bag(Base):
    __tablename__ = "bags"

    id = Column(Integer, primary_key=True, index=True)
    bag_no = Column(String(30), unique=True)
    manifest_no = Column(String(30))
    from_branch = Column(String(100))
    to_branch = Column(String(100))
    seal_no = Column(String(30))
    status = Column(String(30))
    created_at = Column(DateTime)
# Manifest Model
# ==========================

class Manifest(Base):

    __tablename__ = "manifests"

    id = Column(Integer, primary_key=True, index=True)

    manifest_number = Column(
        String(30),
        unique=True
    )

    vehicle_no = Column(String(20))

    from_branch = Column(String(100))

    to_branch = Column(String(100))

    manifest_date = Column(DateTime)

    total_bags = Column(Integer)

    status = Column(String(30))

    created_at = Column(DateTime)

# Tracking Model
# ==========================

class Tracking(Base):
    __tablename__ = "tracking"

    id = Column(Integer, primary_key=True, index=True)

    awb_no = Column(String(30))

    current_branch = Column(String(100))

    current_location = Column(String(100))

    status = Column(String(30))

    updated_date = Column(DateTime)

    remarks = Column(String(255))

    # ==========================
# Delivery Model
# ==========================

class Delivery(Base):

    __tablename__ = "deliveries"

    id = Column(Integer, primary_key=True, index=True)

    awb_no = Column(String(30))

    delivery_person = Column(String(100))

    mobile = Column(String(10))

    delivery_date = Column(Date)

    delivery_status = Column(String(30))

    receiver_name = Column(String(100))

    location = Column(String(100))

    remarks = Column(String(255))

    created_at = Column(DateTime)

    


# ==========================

class Customer(Base):
    __tablename__ = "customers"

    id = Column(Integer, primary_key=True, index=True)
    customer_code = Column(String(20), unique=True)
    customer_name = Column(String(100))
    mobile = Column(String(10))
    email = Column(String(100))
    address = Column(String(255))
    city = Column(String(100))
    state = Column(String(100))
    pincode = Column(String(10))

  # ==========================
# User Model
# ==========================

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True)
    password = Column(String(255))
    full_name = Column(String(100))
    role = Column(String(30))
    status = Column(String(20))
    # ==========================
# Document
# ==========================
# ==========================
# Document Model
# ==========================

class Document(Base):

    __tablename__ = "documents"

    id = Column(Integer, primary_key=True, index=True)

    document_number = Column(String(30), unique=True, nullable=False)

    awb_no = Column(String(30), nullable=False)

    document_type = Column(String(50))

    uploaded_by = Column(String(100))

    upload_date = Column(Date)

    status = Column(String(30))

    document_name = Column(String(255))

    created_at = Column(DateTime, default=datetime.utcnow)



class Payment(Base):

    __tablename__ = "payments"

    id = Column(Integer, primary_key=True, index=True)

    payment_id = Column(String(30), unique=True)

    awb_no = Column(String(30))

    customer_name = Column(String(100))

    amount = Column(Float)

    payment_date = Column(Date)

    payment_mode = Column(String(30))

    payment_status = Column(String(30))

    remarks = Column(String(255))

    created_at = Column(DateTime)

class BranchInscan(Base):

    __tablename__ = "branch_inscan"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    inscan_date = Column(Date)

    scan_type = Column(String(20))

    awb_no = Column(String(50))

    carton_no = Column(Integer)

    reason = Column(String(255))

    created_at = Column(DateTime)

