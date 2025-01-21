import psycopg2 as psycopg

DB_HOST = "localhost"      
DB_PORT = 5433           
DB_NAME = "music_composer" 
DB_USER = "username" # nosec
DB_PASSWORD = "password" # nosec  

try:
    # Connect to the PostgreSQL database
    with psycopg.connect(
        host=DB_HOST,
        port=DB_PORT,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    ) as connection:
        # Open a cursor object
        with connection.cursor() as cursor:
            # Define the SQL query to create a 'users' table
            create_users_table_query = """
            CREATE TABLE IF NOT EXISTS users (
                user_id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
            """

            # Execute the SQL query
            cursor.execute(create_users_table_query)
            connection.commit()  # Commit the transaction

            print("Table 'users' created successfully!")

except Exception as e:
    print(f"Error: {e}")
