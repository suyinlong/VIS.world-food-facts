import query

import pandas
from flask import Flask, request, Response, render_template

data = None
csvFileLocation = '../preprocessing/row.clean.csv'

app = Flask(__name__)

def init():
    global data
    data = pandas.read_csv(csvFileLocation)
    print('[World Food Facts] Data has been buffered')

def to_json(df):
    return df.to_json(orient='records')

@app.route("/")
def index():
    return render_template("worldmap.html")

# query
@app.route("/query", methods=['POST'])
def app_query():
    json_object = request.json
    return to_json(query.dfQuery(data, json_object['country'], json_object['category']))

init()

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=61173,debug=True)
