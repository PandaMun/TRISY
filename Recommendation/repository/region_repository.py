from setting import setting_db

def get_region_id(si_name, gugun_name):
    conn = setting_db.get_mariadb_cursor()
    cur = conn.cursor()

    if gugun_name is not None:
        sql = 'SELECT * FROM region WHERE si_name like %s and gu_gun_name like %s'
        vals = (si_name, gugun_name)

    else:
        sql = 'SELECT * FROM region WHERE si_name like %s'
        vals = (si_name)

    cur.execute(sql, vals)

    result = []
    
    for row in cur:
        result.append(row[0])
    
    return result