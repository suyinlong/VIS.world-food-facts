# -*- coding: utf-8 -*-
# @Author: Yinlong Su
# @Date:   2016-04-24 15:59:43
# @Last Modified by:   Yinlong Su
# @Last Modified time: 2016-04-24 16:27:02

import math
import pandas
import numpy as np
import json
from bson import json_util

csvPath = 'row.clean.csv'
countryColumnName = 'countries_en'

countryTag = [
    b'Romania',
    b'Malta',
    b'Kuwait',
    b'Sweden',
    b'United Kingdom',
    b'Iran',
    b'Norway',
    b'fr:Angleterre',
    b'Hungary',
    b'Canada',
    b'France',
    b'Polska',
    b'Japan',
    b'Greece',
    b'Other-\xd8\xa7\xd9\x84\xd8\xb9\xd8\xb1\xd8\xa7\xd9\x82',
    b'Estonia',
    b"C\xc3\xb4te d'Ivoire",
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
    b'\xe6\x97\xa5\xe6\x9c\xac',
    b'Albania',
    b'Hawaii',
    b'Dominican Republic',
    b'Other-other-\xe6\x97\xa5\xe6\x9c\xac',
    b'Egypt',
    b'South Africa',
    b'Bangladesh',
    b'fr:Europe',
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
    b'Republique-de-chine',
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
    b'Other-turquie',
    b'Mozambique',
    b'Macau',
    b'Other-\xe6\x97\xa5\xe6\x9c\xac',
    b'Azerbaijan',
    b'Monaco',
    b'Australia',
    b'Brunei',
    b'Serbia',
    b'New Caledonia',
    b'Iceland',
    b'Austria',
    b'Ukraine',
    b'R\xc3\xa9union',
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
    b'es:Europe',
    b'Cuba',
    b'fr:\xe6\x97\xa5\xe6\x9c\xac',
    b'Mauritania',
    b'fr:Quebec',
    b'Ecuador',
    b'Thailand',
    b'Netherlands',
    b'Vietnam',
    b'Other-japon',
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

def ccount(c):
    countReport = []
    for t in countryTag:
        count = 0
        for cc in c:
            if isinstance(cc, str) and cc.find(t.decode('utf-8')) >= 0:
                count += 1
        countReport.append({
            'tag': t,
            'cou': count
            })
    return countReport

def main():
    print('Country Analysis of row.clean.csv')
    print()

    data = read_csv()
    print('# CSV Report')
    print('  row =', len(data.index), 'col =', len(data.columns))
    print()

    countReport = ccount(data[countryColumnName])
    countReport = sorted(countReport, key= lambda x:x['cou'], reverse=True)
    print('# Country Report')
    for r in countReport:
        f = round(r['cou'] / len(data.index) * 100, 2)
        print(' ', r['tag'],': count =', r['cou'], 'percent =', f, '%')





main()
