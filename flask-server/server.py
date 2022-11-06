from flask import Flask, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/incidents")
def incidents():
    return {}

@app.route("/testIncident")
def testIncident():
    file = open('incident.json')
    incidents = (json.load(file))["incidents"]
    return jsonify(incidents)

if __name__ == "__main__":
    app.run(debug=True)

    

