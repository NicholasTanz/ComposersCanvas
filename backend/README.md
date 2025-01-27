# ComposersCanvas Backend

This is the backend for the ComposersCanvas project, built using Flask.

## Requirements

- Python 3.x
- Flask
- A `.env` file containing the database URI

## Setup

1. Clone the repository:
    ```sh
    git clone https://github.com/NicholasTanz/ComposersCanvas.git
    cd ComposersCanvas/backend
    ```

2. Create a virtual environment and activate it:
    ```sh
    python -m venv venv
    source venv/bin/activate  # On Windows use `venv\Scripts\activate`
    ```

3. Install the required packages:
    ```sh
    pip install -r requirements.txt
    ```

4. Create a `.env` file in the backend directory and add your database URL:
    ```env
    DATABASE_URL=your_database_url_here
    ```