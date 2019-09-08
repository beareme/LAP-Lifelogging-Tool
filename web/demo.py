from flask import Flask
from flask import render_template
import pandas as pd
import numpy as np
from functools import wraps
from flask import request, Response
import datetime
from flask import jsonify

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/week')
def timeline():
    return render_template('timeline.html')


@app.route('/upload')
def upload():
    return render_template('upload.html')

@app.route('/details/<day>/<bar>')
def timelineHello(day, bar):
    bar = float(bar)
    samples = []
    if day == 'monday':
        root = '../../static/img/morris/21_Crop_Crop/'
        data = './static/data/dia0.csv'
    if day == 'tuesday':
        root = '../../static/img/morris/23_Crop_Crop/'
        data = './static/data/dia1.csv'
    if day == 'wednesday':
        root = '../../static/img/morris/24_Crop_Crop/'
        data = './static/data/dia2.csv'
    if day == 'thursday':
        root = '../../static/img/morris/25_Crop_Crop/'
        data = './static/data/dia3.csv'
    if day == 'friday':
        root = '../../static/img/morris/26_Crop_Crop/'
        data = './static/data/dia4.csv'
    if day == 'saturday':
        root = '../../static/img/morris/27_Crop_Crop/'
        data = './static/data/dia5.csv'
    if day == 'sunday':
        root = '../../static/img/morris/28_Crop_Crop/'
        data = './static/data/dia6.csv'

    df = pd.read_csv(data, sep=',')
    dt = np.asarray(df[np.logical_and(df['time']>=6+0.15*bar, df['time']<6+0.15*(bar+1))])
    for i in dt:
        sample = []
        sample.append(root + i[4].split(".")[0] + '.jpg') #0
        sample.append(i[1]) #1
        sample.append(i[2]) #2
        sample.append(i[3]) #3
        sample.append(str(i[4].split(".")[0][0:2])+':'+str(i[4].split(".")[0][2:4])+':'+str(i[4].split(".")[0][4:6])) #4
        samples.append(sample)
    return render_template('details.html', abr = day.title()[0:2], day_name = day, nbar = bar, samples = samples, Dayname = day.title())
