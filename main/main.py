import query
import calc
import pandas
import json
from bson import json_util
from bson.json_util import dumps
from flask import Flask, request, Response, render_template

data = None
csvFileLocation = '../preprocessing/row.clean.csv'

app = Flask(__name__)

def init():
    global data
    data = pandas.read_csv(csvFileLocation, dtype={'code': str})
    print('[World Food Facts] Data has been buffered')

def df_to_json(df):
    return df.to_json(orient='records')

def to_json(data):
    json_object = json.dumps(data, default=json_util.default)
    return json_object

@app.route("/")
def index():
    return render_template("worldmap.html")

# query
@app.route("/query", methods=['POST'])
def app_query():
    json_object = request.json
    return df_to_json(query.dfQuery(data, json_object['country'], json_object['category']))

# calc
@app.route("/calc", methods=['POST'])
def app_calc():
    json_object = request.json
    return to_json(calc.cartCalc(data, json_object))

# suggestion
@app.route("/sug", methods=['POST'])
def app_sug():
    json_object = request.json
    return df_to_json(calc.sugCalc(data, json_object['country'], json_object['cart']))

init()

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=61173)
