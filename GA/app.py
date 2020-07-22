from flask import Flask, request, Response
from redis import Redis
from secrets import token_hex
import json


KEY_LENGTH=8

with open("./secrets.json", "r") as secrets:
   data = json.loads(secrets.read());
   REDIS_HOST=data["REDIS_URL"]
   REDIS_PORT=data["REDIS_PORT"]
   REDIS_PASSWORD=data["REDIS_PASSWORD"]

r = Redis(host=REDIS_HOST, port=REDIS_PORT, password=REDIS_PASSWORD, decode_responses=False)

if r.ping():
   print("Connection to redis server " + str(REDIS_HOST) + " established")
else:
   print("Connection error!")
   exit(1)

app = Flask(__name__)

@app.route('/initialise-bridge', methods=['GET', 'POST'])
def generate_bridge():
   files = ["first.mid", "VampireKillerCV1.mid", "samba.mid"]
   content = [None]*len(files)

   # Stub and simulate pulling the info
   for i in range(len(files)):
      with open("./midis/"+files[i], "rb") as file:
         content[i] = file.read()


   # This can all be greatly cleaned up with
   # Lambdas and reason but leaving verbose for now since
   # it'll have to change later when we stop stubbing
   out = [None]*len(files)
   for i in range(len(files)):
      key = "midi-"+token_hex(KEY_LENGTH)
      r.set(key, content[i])
      out[i] = key;

   resp = Response(json.dumps(out), mimetype='application/json')
   resp.headers['Access-Control-Allow-Origin'] = '*'

   return resp

@app.route('/midi/<key>', methods=["GET"])
def get_midi(key = None):
   if key is None:
      return Response("404 Not Found", 404);

   val = r.get(key)

   resp = Response(val, mimetype="audio/midi")
   resp.headers['Access-Control-Allow-Origin'] = '*'

   return resp

@app.route('/midi-save')
def save_midi():
   print(request)

   resp = Response("HELLO")
   resp.headers['Access-Control-Allow-Origin'] = '*'
   return resp

@app.route('/')
def test_route():
   return "Hello World!"

if __name__ == '__main__':
    app.run()