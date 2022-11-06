from flask import Flask, jsonify
from flask_cors import CORS
from filters import default_filter

app = Flask(__name__)
CORS(app)

CORS(app)

TMU_FILE = 'tmu_crimes.csv'
UOFT_FILE = 'uoft_crimes.csv'

TMU_GEO_FILE = 'tmu_geocode.csv'
UOFT_GEO_FILE = 'uoft_geocode.csv'


@app.route("/tmu-geocodes")
def tmu_incidents():
    return jsonify(default_filter(TMU_GEO_FILE))

@app.route("/uoft-geocodes")
def uoft_incidents():
    return jsonify(default_filter(UOFT_GEO_FILE))


if __name__ == "__main__":
    app.run(debug=True)

    

