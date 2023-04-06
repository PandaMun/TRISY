FROM python:latest

RUN apt-get update && apt-get install -y openjdk-11-jdk

COPY . .

RUN pip install -r requirements.txt

CMD uvicorn --host=0.0.0.0 --port 8000 main:app