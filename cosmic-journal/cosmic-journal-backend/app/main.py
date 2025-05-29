from fastapi import FastAPI
from app.api.v1.endpoints import auth
from app.database.session import engine
from app.database.models import Base

app = FastAPI()

# Create database tables
Base.metadata.create_all(bind=engine)

# Include API routers
app.include_router(auth.router, prefix="/api/v1")

@app.get("/")
def read_root():
    return {"message": "Welcome to Cosmic Journal"}