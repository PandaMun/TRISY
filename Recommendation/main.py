from typing import Union
from fastapi import FastAPI
from service import spot_service
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    word : str
    area : int = 0

class Recommend_Info(BaseModel):
    user_test : str
    si_name : str
    gu_gun_name : str = None

class Tour_spot:
    def __init__(self, id: int, spot_info: str, image_url: str, main_address: str, lat: float, lng: float, thumbnail_url: str, spot_name: str):
        self.id = id
        # self.contentId = contentId 1
        self.spot_info = spot_info
        self.image_url = image_url
        self.main_address = main_address
        self.lat = lat
        self.lng = lng
        # self.sub_address = sub_address 7
        self.thumbnail_url = thumbnail_url
        self.spot_name = spot_name
        # self.zipcode = zipcode 10
        # self.region_id = region_id 11
        # self.theme_id = theme_id 12
        self.date = '0'

@app.post("/fast/recommendation")
async def root(recommend_info: Recommend_Info):
    # print(recommend_info.user_test)
    # print(recommend_info.si_name)
    # print(recommend_info.gu_gun_name)
    # spot_list = spot_service.get_recommend("학교 역사 휴양 백화점 시장 공예 가족 휴식 바다 편의 공원", "서울시", "은평구")
    spot_list = spot_service.get_recommend(recommend_info.user_test, recommend_info.si_name, recommend_info.gu_gun_name)
    
    result = []
    
    for row in spot_list:
        print(row)
        result.append(Tour_spot(row[0], row[2], row[3] , row[4], row[5],row[6], row[8], row[9]))

    return {'result': result, 'message': '', 'code': 200}



@app.post("/test")
async def root(item: Item):
    if item.word is None:
        return {'result': 'no value', 'message': 'Unprocessable Entity ', 'code': 422}
    
    response = spot_service_fastapi.test_service(None)
    return {'result': response, 'message': '', 'code': 200}

# @app.post("/test")
# async def root():
#     response = spot_service_fastapi.test_service(None)
#     return {'result': response, 'message': '', 'code': 200}
@app.get("/")
async def root():
    return {"message": "Hello World"}