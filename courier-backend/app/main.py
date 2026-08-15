from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app.models import Base

from app.routers.employee import router as employee_router
from app.routers.branch import router as branch_router
from app.routers.consignment import router as consignment_router
from app.routers.vehicle import router as vehicle_router
from app.routers.bag import router as bag_router
from app.routers.manifest import router as manifest_router
from app.routers.tracking import router as tracking_router
from app.routers.delivery import router as delivery_router
from app.routers.customer import router as customer_router
from app.routers.document import router as document_router
from app.routers.auth import router as auth_router
from app.routers.dashboard import router as dashboard_router
from app.routers.payment import router as payment_router
from app.routers.branch_inscan import router as branch_inscan_router

app = FastAPI(
    title="Courier Management System API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Routers
app.include_router(employee_router)
app.include_router(branch_router)
app.include_router(consignment_router)
app.include_router(vehicle_router)
app.include_router(bag_router)
app.include_router(manifest_router)
app.include_router(tracking_router)
app.include_router(delivery_router)
app.include_router(customer_router)
app.include_router(document_router)
app.include_router(auth_router)
app.include_router(dashboard_router)
app.include_router(payment_router)
app.include_router(branch_inscan_router)

print(Base.metadata.tables.keys())
# Create Database Tables
Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {
        "message": "Courier Management System Backend Running Successfully"
    }