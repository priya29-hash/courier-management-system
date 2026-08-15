from fastapi import APIRouter, Depends

from app.security import verify_token


router = APIRouter(
    prefix="/reports",
    tags=["Reports"]
)


@router.get("/")
def get_reports(
    token: dict = Depends(verify_token)
):

    return {
        "total_consignment": 0,
        "delivered": 0,
        "pending": 0,
        "returned": 0,
        "message": "Reports API Working"
    }