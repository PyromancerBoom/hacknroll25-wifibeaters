for backend

├── backend/ # Python Backend
│ ├── app/
│ │ ├── main.py # FastAPI app entry point
│ │ ├── routes.py # All API endpoints
│ │ ├── services.py # Core business logic
│ │ ├── utils.py # Utility functions (e.g., text processing)
│ │ ├── emotion_map.json # Maps emotions to predefined playlists
│ ├── requirements.txt # Backend dependencies
│ ├── .env # Environment variables

## Setup

To use `requirements.txt` with `virtualenv` and run the FastAPI server, follow these steps:

0.

```
cd backend
```

1. **Create a virtual environment**:
   Open a terminal and navigate to your project directory. Then, create a virtual environment using the following command:

```powershell
   python -m venv venv
```

2. **Activate the virtual environment**:
   On Windows, activate the virtual environment with:

```powershell
   .\venv\Scripts\activate
```

3. **Install dependencies from `requirements.txt`**:
   With the virtual environment activated, install the dependencies listed in `requirements.txt`:

```powershell
   pip install -r requirements.txt
```

4. **Run the FastAPI server**:
   Use the following command to run the FastAPI server:

```powershell
   uvicorn app.main:app --reload
```

This will start the FastAPI server, and you can access it at `http://127.0.0.1:8000`.

If you need to create a `requirements.txt` file, you can generate it using the following command:

```powershell
pip freeze > requirements.txt
```
