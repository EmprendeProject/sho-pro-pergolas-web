import urllib.request
import json
import urllib.error
import os

key = ""
with open(".env", "r") as f:
    for line in f:
        if line.startswith("VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY="):
            key = line.strip().split("=", 1)[1].strip('"\'')

url = "https://agcxxpjkqckqqefkhazp.supabase.co/storage/v1/object/list/archivos"

data = json.dumps({
    "prefix": "brands (logos)",
    "limit": 100,
    "offset": 0,
    "sortBy": {"column": "name", "order": "asc"}
}).encode('utf-8')

headers = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {key}'
}

req = urllib.request.Request(url, data=data, headers=headers, method='POST')

try:
    with urllib.request.urlopen(req) as response:
        res_data = response.read()
        print(res_data.decode('utf-8'))
except urllib.error.HTTPError as e:
    print(f"HTTPError: {e.code} {e.reason}")
    print(e.read().decode('utf-8'))
except Exception as e:
    print(f"Error: {e}")
