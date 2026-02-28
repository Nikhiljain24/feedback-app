import sys
import os

# Add the parent directory to sys.path to import from app
sys.path.append(os.getcwd())

try:
    from app.auth import get_password_hash
    print("Testing get_password_hash...")
    hashed = get_password_hash("testpassword")
    print(f"Success: {hashed}")
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
