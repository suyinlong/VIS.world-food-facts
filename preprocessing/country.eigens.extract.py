# -*- coding: utf-8 -*-
# @Author: Yinlong Su
# @Date:   2016-04-25 22:02:32
# @Last Modified by:   Yinlong Su
# @Last Modified time: 2016-04-26 00:18:31

import math
import pandas
import numpy as np
import json
from bson import json_util

csvPath = 'row.clean.csv'
eigenPath = 'country.eigens.txt'

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
    'Romania',
    'Malta',
    'Kuwait',
    'Sweden',
    'United Kingdom',
    'Iran',
    'Norway',
    'Hungary',
    'Canada',
    'France',
    'Polska',
    'Japan',
    'Greece',
    'Estonia',
    'Senegal',
    'Israel',
    'Argentina',
    'Morocco',
    'Kazakhstan',
    'Thailanda',
    'Russia',
    'Belize',
    'South Korea',
    'Mayotte',
    'Cambodia',
    'Spain',
    'Albania',
    'Hawaii',
    'Dominican Republic',
    'Egypt',
    'South Africa',
    'Bangladesh',
    'Iraq',
    'Kenya',
    'An',
    'Panama',
    'Yemen',
    'Switzerland',
    'Tunisia',
    'French Polynesia',
    'Colombia',
    'Syria',
    'Luxembourg',
    'New Zealand',
    'Hong Kong',
    'Mongolia',
    'China',
    'Turkey',
    'Philippines',
    'Nederland',
    'Lebanon',
    'French Guiana',
    'Belarus',
    'Italy',
    'Mauritius',
    'Croatia',
    'Qatar',
    'Irlande',
    'Chile',
    'Sri Lanka',
    'Georgia',
    'Republic of the Congo',
    'Armenia',
    'Martinique',
    'Slovakia',
    'Malaysia',
    'Cyprus',
    'Czech Republic',
    'Lithuania',
    'Burundi',
    'Guatemala',
    'Mexico',
    'Algeria',
    'Denmark',
    'Germany',
    'El Salvador',
    'Cook Islands',
    'Guadeloupe',
    'European Union',
    'United Arab Emirates',
    'Guinea',
    'Mozambique',
    'Macau',
    'Azerbaijan',
    'Monaco',
    'Australia',
    'Brunei',
    'Serbia',
    'New Caledonia',
    'Iceland',
    'Austria',
    'Ukraine',
    'Burkina Faso',
    'Portugal',
    'Gabon',
    'Mali',
    'Peru',
    'Andorra',
    'Vanuatu',
    'Pakistan',
    'Ghana',
    'Saint Pierre and Miquelon',
    'Finland',
    'Ireland',
    'Latvia',
    'Tanzania',
    'Togo',
    'Moldova',
    'Poland',
    'Venezuela',
    'Aruba',
    'Belgium',
    'Brazil',
    'Bahrain',
    'Sint Maarten',
    'Slovenia',
    'United States',
    'Singapore',
    'Taiwan',
    'Costa Rica',
    'Cuba',
    'Mauritania',
    'Ecuador',
    'Thailand',
    'Netherlands',
    'Vietnam',
    'Scotland',
    'Indonesia',
    'Democratic Republic of the Congo',
    'Niger',
    'Saudi Arabia',
    'Maldives',
    'Bulgaria',
    'Jordan',
    'India'
]

def getid(str, strarray):
    for x in range(len(strarray)):
        if strarray[x] == str:
            return x
    return -1

def main():
    print('Eigen extraction')
    print()

    print('# List of eigenvalues (column, country, normalized average)')
    column = ''
    country = ''
    normalized_average = ''

    matrix_row = len(countryTag)
    matrix_col = len(attributeColumnName)
    matrix = [[0 for i in range(matrix_col)] for i in range(matrix_row)]

    for line in open(eigenPath):
        k = line.find("b'")
        if k > 0:
            column = line[2:k-1]
            country = line[k+2:-2]
        k = line.find("normalized average: ")
        if k > 0:
            normalized_average = line[24:-1]
            print(' ', column, country, normalized_average)
            a = getid(country, countryTag)
            b = getid(column, attributeColumnName)
            if a >= 0 and b >= 0:
                matrix[a][b] = float(normalized_average)
    print()

    print('# Matrix of eigenvalues')
    for a in range(matrix_row):
        for b in range(matrix_col):
            print(matrix[a][b], end=' ')
        print()
    print()

    # print('# Latex of eigenvalues')
    # for a in range(matrix_row):
    #     print(countryTag[a], end='')
    #     for b in range(matrix_col):
    #         print('&', round(matrix[a][b], 2), end='')
    #     print('\\\\')
    # print()

main()
