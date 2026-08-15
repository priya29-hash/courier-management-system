from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import SessionLocal
from app import crud, schemas
from app.security import verify_token

router = APIRouter(
    prefix="/manifests",
    tags=["Manifest"]
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post(
    "/",
    response_model=schemas.ManifestResponse,
    dependencies=[Depends(verify_token)]
)
def create_manifest(
    manifest: schemas.ManifestCreate,
    db: Session = Depends(get_db)
):
    return crud.create_manifest(db, manifest)


@router.get(
    "/",
    response_model=list[schemas.ManifestResponse],
    dependencies=[Depends(verify_token)]
)
def get_all_manifests(
    db: Session = Depends(get_db)
):
    return crud.get_manifests(db)


@router.put(
    "/{manifest_id}",
    response_model=schemas.ManifestResponse,
    dependencies=[Depends(verify_token)]
)
def update_manifest(
    manifest_id: int,
    manifest: schemas.ManifestCreate,
    db: Session = Depends(get_db)
):
    return crud.update_manifest(
        db,
        manifest_id,
        manifest
    )


@router.delete(
    "/{manifest_id}",
    dependencies=[Depends(verify_token)]
)
def delete_manifest(
    manifest_id: int,
    db: Session = Depends(get_db)
):
    return crud.delete_manifest(
        db,
        manifest_id
    )