from fastapi import FastAPI 
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel 

class Memo(BaseModel):
    id:int
    content:str
    
memos = []

app = FastAPI()


# create
@app.post("/memos")
def create_memo(memo:Memo):
    memos.append(memo)
    return "200"

# read
@app.get("/memos")
def read_memo():
    return memos

#update
@app.put("/memos/{id}")
def update_memo(req_memo:Memo):
    for memo in memos:
        if memo.id == req_memo.id:
            
            memo.content = req_memo.content
            return "success"
    return "fail"

#delete
@app.delete("/memos/{memo_id}")
def delete_memo(memo_id):
    for index, memo in enumerate(memos):
        if memo.id == int(memo_id):
            print(1)
            memos.pop(index)
            return "sucess"  
    return "fail"


app.mount("/",StaticFiles(directory="Static", html=True), name="Static")
