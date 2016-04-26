# -*- coding: utf-8 -*-
# @Author: Yinlong Su
# @Date:   2016-04-25 17:18:10
# @Last Modified by:   Yinlong Su
# @Last Modified time: 2016-04-25 23:32:15

import math
import pandas
import numpy as np
import json
from bson import json_util

csvPath = 'row.clean.csv'

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

countryColumnName = 'countries_en'
countryTag = [
    b'Romania',
    b'Malta',
    b'Kuwait',
    b'Sweden',
    b'United Kingdom',
    b'Iran',
    b'Norway',
    b'Hungary',
    b'Canada',
    b'France',
    b'Polska',
    b'Japan',
    b'Greece',
    b'Estonia',
    b'Senegal',
    b'Israel',
    b'Argentina',
    b'Morocco',
    b'Kazakhstan',
    b'Thailanda',
    b'Russia',
    b'Belize',
    b'South Korea',
    b'Mayotte',
    b'Cambodia',
    b'Spain',
    b'Albania',
    b'Hawaii',
    b'Dominican Republic',
    b'Egypt',
    b'South Africa',
    b'Bangladesh',
    b'Iraq',
    b'Kenya',
    b'An',
    b'Panama',
    b'Yemen',
    b'Switzerland',
    b'Tunisia',
    b'French Polynesia',
    b'Colombia',
    b'Syria',
    b'Luxembourg',
    b'New Zealand',
    b'Hong Kong',
    b'Mongolia',
    b'China',
    b'Turkey',
    b'Philippines',
    b'Nederland',
    b'Lebanon',
    b'French Guiana',
    b'Belarus',
    b'Italy',
    b'Mauritius',
    b'Croatia',
    b'Qatar',
    b'Irlande',
    b'Chile',
    b'Sri Lanka',
    b'Georgia',
    b'Republic of the Congo',
    b'Armenia',
    b'Martinique',
    b'Slovakia',
    b'Malaysia',
    b'Cyprus',
    b'Czech Republic',
    b'Lithuania',
    b'Burundi',
    b'Guatemala',
    b'Mexico',
    b'Algeria',
    b'Denmark',
    b'Germany',
    b'El Salvador',
    b'Cook Islands',
    b'Guadeloupe',
    b'European Union',
    b'United Arab Emirates',
    b'Guinea',
    b'Mozambique',
    b'Macau',
    b'Azerbaijan',
    b'Monaco',
    b'Australia',
    b'Brunei',
    b'Serbia',
    b'New Caledonia',
    b'Iceland',
    b'Austria',
    b'Ukraine',
    b'Burkina Faso',
    b'Portugal',
    b'Gabon',
    b'Mali',
    b'Peru',
    b'Andorra',
    b'Vanuatu',
    b'Pakistan',
    b'Ghana',
    b'Saint Pierre and Miquelon',
    b'Finland',
    b'Ireland',
    b'Latvia',
    b'Tanzania',
    b'Togo',
    b'Moldova',
    b'Poland',
    b'Venezuela',
    b'Aruba',
    b'Belgium',
    b'Brazil',
    b'Bahrain',
    b'Sint Maarten',
    b'Slovenia',
    b'United States',
    b'Singapore',
    b'Taiwan',
    b'Costa Rica',
    b'Cuba',
    b'Mauritania',
    b'Ecuador',
    b'Thailand',
    b'Netherlands',
    b'Vietnam',
    b'Scotland',
    b'Indonesia',
    b'Democratic Republic of the Congo',
    b'Niger',
    b'Saudi Arabia',
    b'Maldives',
    b'Bulgaria',
    b'Jordan',
    b'India'
]

def read_csv():
    #print('Loading csv file...')
    df = pandas.read_csv(csvPath)
    return df

def filter_and_clean(data, columnName, countryName=''):
    invcount = 0

    countryColumn = data[countryColumnName]
    numericColumn = data[columnName]
    _c = []
    for x in range(0, len(data.index)):
        country = countryColumn[x]
        number = numericColumn[x]
        if (countryName == '' or (isinstance(country, str) and country.find(countryName.decode('utf-8')) >= 0)):
            if (number == '' or (isinstance(number, float) and math.isnan(number))):
                invcount += 1
            elif (number < 0):
                invcount += 1
            else:
                _c.append(number)

    return invcount, _c

def stat(tag, sequence, inv):
    sequence.sort()

    SUM = sum(sequence)
    COU = len(sequence)
    INV = inv
    MIN = min(sequence) if COU > 0 else float('NaN')
    MAX = max(sequence) if COU > 0 else float('NaN')
    AVG = SUM / COU if COU > 0 else float('NaN')
    MED = sequence[COU // 2] if COU > 0 else float('NaN')

    sdsq = sum([(i - AVG) ** 2 for i in sequence])
    STDEV = (sdsq / (COU - 1))

    return {
        'tag': tag,
        'sum': SUM,
        'cou': COU,
        'inv': INV,
        'min': MIN,
        'max': MAX,
        'avg': AVG,
        'med': MED,
        'std': STDEV
    }

def normalize(cMin, cMax, cReport, cCountry):
    return {
        'reg': cCountry,
        'tag': cReport['tag'],
        'sum': cReport['sum'],
        'cou': cReport['cou'],
        'inv': cReport['inv'],
        'min': cReport['min'],
        'max': cReport['max'],
        'avg': cReport['avg'],
        'nav': (cReport['avg'] - cMin) / (cMax - cMin),
        'med': cReport['med'],
        'nme': (cReport['med'] - cMin) / (cMax - cMin),
        'std': cReport['std']
    }


def analysis(data):
    csvReport = {'row': len(data.index), 'col': len(data.columns)}
    numericReport = []
    eigenReport = []

    for n in attributeColumnName:
        count, _c = filter_and_clean(data, n)
        numericReport.append(stat(n, _c, count))

    for n in numericReport:
        for m in countryTag:
            count, _c = filter_and_clean(data, n['tag'], m)
            report = stat(n['tag'], _c, count)
            eigenReport.append(normalize(n['min'], n['max'], report, m))

    return csvReport, numericReport, eigenReport

def report(csvReport, numericReport, eigenReport):
    print()
    print('# CSV Report')
    print('  row =', csvReport['row'], 'col =', csvReport['col'])

    print()
    print('# Numeric columns')
    for r in numericReport:
        print(' ', r['tag'])
        print('    invalid:', r['inv'])
        print('    count:', r['cou'])
        print('    sum:', r['sum'])
        print('    min:', r['min'])
        print('    max:', r['max'])
        print('    average:', r['avg'])
        print('    median:', r['med'])
        print('    standard deviation:', r['std'])

    print()
    print('# Eigenvalues')
    for r in eigenReport:
        print(' ', r['tag'], r['reg'])
        print('    invalid:', r['inv'])
        print('    count:', r['cou'])
        print('    sum:', r['sum'])
        print('    min:', r['min'])
        print('    max:', r['max'])
        print('    average:', r['avg'])
        print('    median:', r['med'])
        print('    standard deviation:', r['std'])
        print('    normalized average:', r['nav'])
        print('    normalized median:', r['nme'])

def main():
    print('Country Eigens of row.clean.csv')

    data = read_csv()
    cR, nR, eR = analysis(data)
    report(cR, nR, eR)


main()
