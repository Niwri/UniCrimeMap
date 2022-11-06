from flask import Flask, jsonify
from flask_cors import CORS
from filters import default_filter

app = Flask(__name__)
CORS(app)

CORS(app)

TMU_FILE = 'tmu_crimes.csv'
UOFT_FILE = 'uoft_crimes.csv'

@app.route("/tmu-incidents")
def tmu_incidents():
    return jsonify(default_filter(TMU_FILE))

@app.route("/uoft-incidents")
def uoft_incidents():
    return jsonify(default_filter(UOFT_FILE))

if __name__ == "__main__":
    app.run(debug=True)

    

