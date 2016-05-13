# -*- coding: utf-8 -*-
# @Author: Yinlong Su
# @Date:   2016-05-11 19:11:05
# @Last Modified by:   Yinlong Su
# @Last Modified time: 2016-05-12 18:47:29

import pandas

countryColumnName = 'countries_en'
categoryColumnName = 'main_category_en'

def dfQuery(df, country, category):
    if country == 'all':
        q1 = df
    else:
        q1 = df[df[countryColumnName].fillna('missing').str.contains(country)]

    if category == 'all':
        q2 = q1
    else:
        q2 = q1[q1[categoryColumnName].fillna('missing').str.contains(category)]
    print('  # dfQuery:', len(q2.index), '(country =', country, ', category =', category,')')
    return q2