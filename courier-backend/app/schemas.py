from pydantic import BaseModel
from datetime import date
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field
from typing import Optional

from pydantic import BaseModel

# ==========================
# Employee
# ==========================

class EmployeeCreate(BaseModel):
    employee_id: str
    employee_name: str
    gender: Optional[str] = None
    dob: Optional[date] = None
    mobile: Optional[str] = None
    email: Optional[str] = None
    designation: Optional[str] = None
    branch: Optional[str] = None
    joining_date: Optional[date] = None
    salary: Optional[int] = None
    address: Optional[str] = None
    status: Optional[str] = None


class EmployeeResponse(EmployeeCreate):
    id: int

    class Config:
        from_attributes = True


# ==========================
# Branch
# ==========================

class BranchCreate(BaseModel):
    branch_code: str
    branch_name: str
    city: Optional[str] = None
    state: Optional[str] = None
    pincode: Optional[str] = None
    manager: Optional[str] = None
    mobile: Optional[str] = None
    email: Optional[str] = None
    status: Optional[str] = None



class BranchResponse(BranchCreate):
    id: int

    class Config:
        from_attributes = True


# ==========================
# Consignment
# ==========================

class ConsignmentCreate(BaseModel):
    awb_no: str
    sender_name: str
    sender_mobile: Optional[str] = None
    receiver_name: str
    receiver_mobile: Optional[str] = None
    from_branch: Optional[str] = None
    to_branch: Optional[str] = None
    weight: Optional[str] = None
    amount: Optional[int] = None
    booking_date: Optional[date] = None
    status: Optional[str] = None


class ConsignmentResponse(ConsignmentCreate):
    id: int

    class Config:
        from_attributes = True

  # ==========================
# Vehicle
# ==========================


class VehicleCreate(BaseModel):
    vehicle_no: str = Field(alias="vehicleNo")
    vehicle_type: Optional[str] = Field(default=None, alias="vehicleType")
    driver_name: Optional[str] = Field(default=None, alias="driverName")
    driver_mobile: Optional[str] = Field(default=None, alias="driverMobile")
    branch: Optional[str] = Field(default=None, alias="route")
    capacity: Optional[str] = None      # <-- CHANGE THIS
    status: Optional[str] = None

    model_config = {
        "populate_by_name": True
    }

class VehicleResponse(BaseModel):
    id: int
    vehicle_no: str
    vehicle_type: Optional[str] = None
    driver_name: Optional[str] = None
    driver_mobile: Optional[str] = None
    branch: Optional[str] = None
    capacity: Optional[str] = None
    status: Optional[str] = None

    model_config = {
        "from_attributes": True
    }
   # ==========================
# Bag Schema
# ==========================




class BagCreate(BaseModel):
    bag_no: str
    manifest_no: str
    from_branch: str
    to_branch: str
    seal_no: str
    status: str


class BagResponse(BagCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True   

        # ==========================
# Manifest Schema
# ==========================



class ManifestCreate(BaseModel):

    manifest_number: str

    vehicle_no: str

    from_branch: str

    to_branch: str

    manifest_date: date

    status: str



class ManifestResponse(BaseModel):

    id: int

    manifest_number: str

    vehicle_no: str

    from_branch: str

    to_branch: str

    manifest_date: date

    status: str


    class Config:
        from_attributes = True

        # ==========================
# Tracking Schema
# ==========================

from datetime import date


class TrackingCreate(BaseModel):
    awb_no: str
    current_branch: str
    current_location: str
    status: str
    updated_date: date
    remarks: str


class TrackingResponse(BaseModel):
    id: int
    awb_no: str
    current_branch: str
    current_location: str
    status: str
    updated_date: date
    remarks: str

    class Config:
        from_attributes = True

# ==========================
# Delivery Schema
# ==========================

class DeliveryCreate(BaseModel):

    awb_no: str

    delivery_person: str

    mobile: str

    delivery_date: date

    delivery_status: str

    receiver_name: str

    location: str

    remarks: str



class DeliveryResponse(BaseModel):

    id: int

    awb_no: str

    delivery_person: str

    mobile: str

    delivery_date: date

    delivery_status: str

    receiver_name: str

    location: str

    remarks: str


    class Config:
        from_attributes = True
        # ==========================
# Customer Schema
# ==========================

class CustomerCreate(BaseModel):
    customer_code: str
    customer_name: str
    mobile: str
    email: str
    address: str
    city: str
    state: str
    pincode: str


class CustomerResponse(BaseModel):
    id: int
    customer_code: str
    customer_name: str
    mobile: str
    email: str
    address: str
    city: str
    state: str
    pincode: str

    class Config:
        from_attributes = True

        # ==========================
# Authentication Schemas
# ==========================

class UserCreate(BaseModel):
    username: str
    password: str
    full_name: str
    role: str


class UserLogin(BaseModel):
    username: str
    password: str


class UserResponse(BaseModel):
    id: int
    username: str
    full_name: str
    role: str
    status: str

    class Config:
        from_attributes = True


class Token(BaseModel):
    access_token: str
    token_type: str

    # ==========================
# Document Schema
# ==========================



from datetime import date
from pydantic import BaseModel

class DocumentCreate(BaseModel):
    document_number: str
    awb_no: str
    document_type: str
    uploaded_by: str
    upload_date: date
    status: str
    document_name: str = ""


class DocumentResponse(BaseModel):
    id: int
    document_number: str
    awb_no: str
    document_type: str
    uploaded_by: str
    upload_date: date
    status: str
    document_name: str = ""

    class Config:
        from_attributes = True


# ==========================
# Payment Schema
# ==========================

class PaymentCreate(BaseModel):
    payment_id: str
    awb_no: str
    customer_name: str
    amount: float
    payment_date: date
    payment_mode: str
    payment_status: str
    remarks: str

class PaymentResponse(BaseModel):
    id: int
    payment_id: str
    awb_no: str
    customer_name: str
    amount: float
    payment_date: date
    payment_mode: str
    payment_status: str
    remarks: str

    class Config:
        from_attributes = True
        

from datetime import date, datetime
from pydantic import BaseModel


class BranchInscanCreate(BaseModel):

    inscan_date: date

    scan_type: str

    awb_no: str

    carton_no: int

    reason: str


class BranchInscanResponse(BaseModel):

    id: int

    inscan_date: date

    scan_type: str

    awb_no: str

    carton_no: int

    reason: str

    created_at: datetime | None = None

    class Config:
        from_attributes = True
