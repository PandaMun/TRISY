import pymysql

myria_db_url = 'J8C202.p.ssafy.io'
username = 'root'
password = '12345678'
dbname = 's08p22c202'
# conn = pymysql.connect(host=myria_db_url, port=3306, user=username, passwd=password, db=dbname, charset='utf8')

hostname='J8C202.p.ssafy.io'
# rd = redis.StrictRedis(host=hostname, port=6379, db=0, charset="utf-8", decode_responses=True)


def get_mariadb_cursor():
    return pymysql.connect(host=myria_db_url, port=3306, user=username, passwd=password, db=dbname, charset='utf8')