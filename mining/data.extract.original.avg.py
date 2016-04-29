# -*- coding: utf-8 -*-
# @Author: Yinlong Su
# @Date:   2016-04-28 23:53:17
# @Last Modified by:   Yinlong Su
# @Last Modified time: 2016-04-29 00:27:37

import math
import pandas
import numpy as np
import json
from bson import json_util
from matplotlib.mlab import PCA as mlabPCA
from numpy import mean, cov, double, cumsum, dot, linalg, array, rank, vstack
from bson import json_util
from bson.json_util import dumps
from scipy.spatial.distance import squareform, pdist
from sklearn import manifold

csvPath = 'row.clean.csv'
eigenPath = '../preprocessing/country.eigens.txt'

attributeColumnName = [
    'additives_n',
    'energy_100g',
    'fat_100g',
    'carbohydrates_100g',
    'sugars_100g',
    'fiber_100g',
    'proteins_100g',
    'salt_100g',
    'sodium_100g',
    'alcohol_100g'
]

countryTag = [
    'Albania',
    'Andorra',
    'Argentina',
    'Australia',
    'Austria',
    'Belgium',
    'Brazil',
    'Cambodia',
    'Canada',
    'Chile',
    'China',
    'Cuba',
    'Czech Republic',
    'Denmark',
    'Finland',
    'France',
    'French Guiana',
    'Germany',
    'Greece',
    'Guadeloupe',
    'Hong Kong',
    'Hungary',
    'India',
    'Ireland',
    'Israel',
    'Italy',
    'Luxembourg',
    'Malta',
    'Martinique',
    'Morocco',
    'Netherlands',
    'New Zealand',
    'Norway',
    'Poland',
    'Portugal',
    'Romania',
    'Russia',
    'Saint Pierre and Miquelon',
    'Singapore',
    'Slovenia',
    'South Africa',
    'South Korea',
    'Spain',
    'Sweden',
    'Switzerland',
    'Taiwan',
    'Thailand',
    'Tunisia',
    'United Kingdom',
    'United States'
]

countryShort = [
    'ALB',
    'AND',
    'ARG',
    'AUS',
    'AUT',
    'BEL',
    'BRA',
    'KHM',
    'CAN',
    'CHL',
    'CHN',
    'CUB',
    'CZE',
    'DNK',
    'FIN',
    'FRA',
    'GUF',
    'DEU',
    'GRC',
    'GLP',
    'HKG',
    'HUN',
    'IND',
    'IRL',
    'ISR',
    'ITA',
    'LUX',
    'MLT',
    'MTQ',
    'MAR',
    'NLD',
    'NZL',
    'NOR',
    'POL',
    'PRT',
    'ROU',
    'RUS',
    'SPM',
    'SGP',
    'SVN',
    'ZAF',
    'KOR',
    'ESP',
    'SWE',
    'SWZ',
    'TWN',
    'THA',
    'TUN',
    'GBR',
    'USA'
]

def getid(str, strarray):
    for x in range(len(strarray)):
        if strarray[x] == str:
            return x
    return -1

def make_matrix():
    phase = 0
    t = 0
    column = ''
    country = ''
    average = ''

    matrix_row = len(countryTag)
    matrix_col = len(attributeColumnName)
    vector = [0 for i in range(matrix_col)]
    matrix = [[0 for i in range(matrix_col)] for i in range(matrix_row)]

    for line in open(eigenPath):
        if phase == 0:
            if line.find("average: ") > 0:
                average = float(line[13:-1])
                vector[t] = average
                t += 1
        else:
            k = line.find("b'")
            if k > 0:
                column = line[2:k-1]
                country = line[k+2:-2]
            if line.find("average: ") == 4:
                average = line[13:-1]
                a = getid(country, countryTag)
                b = getid(column, attributeColumnName)
                if a >= 0 and b >= 0:
                    matrix[a][b] = float(average)
        if t == 10:
            phase = 1
    return vector, matrix

def dump_per_country(matrix):
    print('# dump per country')
    print()

    for i in range(len(countryTag)):
        print("".join(["dataset_original_", countryShort[i], ' = ']), end='')
        json_object = json.dumps(matrix[i], default=json_util.default)
        print("".join([json_object, ';']))

def dump_world(vector):
    print('# dump world')
    print()

    json_object = json.dumps(vector, default=json_util.default)
    print("".join(['dataset_original_world = ', json_object, ';']))
    print()

def main():
    v, m = make_matrix()
    dump_world(v)
    dump_per_country(m)



main()
