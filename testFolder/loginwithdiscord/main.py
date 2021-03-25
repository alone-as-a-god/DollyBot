import requests
API_ENDPOINT = 'https://discord.com/api/oauth2/token'
CLIENT_ID = '803277270596583466'
CLIENT_SECRET = 'nXIxbix83w9NL1K5JjMOWIuBfMtHnSM0'
REDIRECT_URI = 'https://colitics.de'

def exchange_code(code):
  data = {
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
    'grant_type': 'authorization_code',
    'code': code,
    'redirect_uri': REDIRECT_URI,
    'scope': 'identify email connections guilds'
  }
  headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  r = requests.post(API_ENDPOINT, data=data, headers=headers)
  r.raise_for_status()
  return r.json()


print(exchange_code('jfAwLeBYDlRAe6zbur6ZgUEByFt0t7'))
