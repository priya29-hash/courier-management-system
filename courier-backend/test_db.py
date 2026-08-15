import pymysql

try:
    conn = pymysql.connect(
        host="127.0.0.1",
        user="root",
        password="priyaRam",
        database="courier_management"
    )

    print("Connected successfully!")

    conn.close()

except Exception as e:
    print("Error:", e)