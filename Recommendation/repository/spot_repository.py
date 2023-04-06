from setting import setting_db

def find_by_spot_id(spot_id_list):
    conn = setting_db.get_mariadb_cursor()
    cur = conn.cursor()

    my_str = ','.join(map(str, spot_id_list))
    sql = "SELECT * FROM tour_spot WHERE contentId IN ({})".format(my_str)
    cur.execute(sql)
    
    result = []
    
    for row in cur:
        # print(row)
        result.append(row)
        
    return result

def get_spot_list_by_region_id(region_id_list):
    conn = setting_db.get_mariadb_cursor()
    cur = conn.cursor()

    my_str = ','.join(map(str, region_id_list))
    sql = "SELECT contentId FROM tour_spot WHERE region_id IN ({})".format(my_str)
    cur.execute(sql)
    
    result = []
    
    for row in cur:
        result.append(row[0])

    return result

def get_spot_keyword_list_by_spot_id_list(spot_id_list):
    conn = setting_db.get_mariadb_cursor()
    cur = conn.cursor()
    
    my_str = ','.join(map(str, spot_id_list))
    sql = "SELECT * FROM keyword WHERE id IN ({})".format(my_str)
    cur.execute(sql)

    result = {}

    for row in cur:
        result[row[0]] = row[1]
        
    cur.close()
    conn.close()
    
    return result