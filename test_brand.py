import urllib.request
import urllib.error
import urllib.parse

names = [
    "hurricane fabric.png",
    "infinity rack.png",
    "StruXure.png",
    "struxure.png",
    "StruXure/logo.png",
    "struxure/logo.png"
]
base = "https://agcxxpjkqckqqefkhazp.supabase.co/storage/v1/object/public/archivos/brands%20(logos)/"

for name in names:
    url = base + urllib.parse.quote(name)
    try:
        req = urllib.request.urlopen(url)
        print(f"{url} 200")
    except urllib.error.HTTPError as e:
        # print(f"{url} {e.code}")
        pass
    except Exception as e:
        pass
