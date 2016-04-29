# -*- coding: utf-8 -*-
# @Author: Yinlong Su
# @Date:   2016-04-29 00:21:23
# @Last Modified by:   Yinlong Su
# @Last Modified time: 2016-04-29 00:36:19

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

def maxvalue(matrix):
    mvc = []
    for j in range(len(attributeColumnName)):
        lmax = matrix[0][j]
        for i in range(len(countryTag)):
            if lmax < matrix[i][j]:
                lmax = matrix[i][j]
        mvc.append(lmax)
    return mvc


def make_matrix():
    phase = 0
    t = 0

    column = ''
    country = ''

    matrix_row = len(countryTag)
    matrix_col = len(attributeColumnName)
    vector = [0 for i in range(matrix_col)]
    matrix = [[0 for i in range(matrix_col)] for i in range(matrix_row)]

    for line in open(eigenPath):
        if phase == 0:
            if line.find("max: ") == 4:
                world_max = float(line[9:-1])
            if line.find("average: ") == 4:
                world_average = float(line[13:-1])
                vector[t] = world_average / world_max
                t += 1
        else:
            k = line.find("b'")
            if k > 0:
                column = line[2:k-1]
                country = line[k+2:-2]
            if line.find("normalized average: ") > 0:
                normalized_average = line[24:-1]
                a = getid(country, countryTag)
                b = getid(column, attributeColumnName)
                if a >= 0 and b >= 0:
                    matrix[a][b] = float(normalized_average)
        if t == 10:
            phase = 1
    return vector, matrix

def dump_per_country(matrix, mvc):
    print('# dump per country')
    print()

    for i in range(len(countryTag)):
        print("".join(["dataset_normalized_", countryShort[i], ' = ']), end='')

        nor = []
        for j in range(len(matrix[i])):
            nor.append(matrix[i][j] / mvc[j])

        json_object = json.dumps(nor, default=json_util.default)
        print("".join([json_object, ';']))

def dump_world(vector, mvc):
    print('# dump world')
    print()

    nor = []
    for j in range(len(vector)):
        nor.append(vector[j] / mvc[j])

    json_object = json.dumps(nor, default=json_util.default)
    print("".join(['dataset_normalized_world = ', json_object, ';']))
    print()

def main():
    v, m = make_matrix()
    mvc = maxvalue(m)

    dump_world(v, mvc)
    dump_per_country(m, mvc)


main()
