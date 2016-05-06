# -*- coding: utf-8 -*-
"""
Created on Fri May  6 17:55:02 2016

@author: ningjiang
"""

# -*- coding: utf-8 -*-
# @Author: Yinlong Su
# @Date:   2016-05-06 14:40:05
# @Last Modified by:   Yinlong Su
# @Last Modified time: 2016-05-06 14:41:59

import math
import pandas
import numpy as np
import json
from bson import json_util
import collections

csvPath = 'row.clean.csv'
categoryColumnName = 'main_category_en'

def read_csv():
    #print('Loading csv file...')
    df = pandas.read_csv(csvPath)
    return df

def invp(c):
    count = 0
    _c = []
    for cc in c:
        if (cc == '' or (isinstance(cc, float) and math.isnan(cc))):
            count += 1
        else:
            _c.append(cc)
    return count, _c

def group(c):
    s = set()
    for cc in c:
        s.add(cc.encode('utf-8'))
    return len(s), s


def groupCounter(c):
    _s = []
    s = []
    for cc in c:
        _s.append(cc.encode('utf-8'))
    for ss in _s:
        d = ss.split(b',')
        for dd in d:
            s.append(dd)
    counter = collections.Counter(s)
    print(counter)

def disassemble(c):
    s = set()
    for cc in c:
        d = cc.split(b',')
        for dd in d:
            s.add(dd)
    return len(s), s

def main():
    print('Category Disassemble of row.clean.csv')
    print()

    data = read_csv()
    print('# CSV Report')
    print('  row =', len(data.index), 'col =', len(data.columns))
    print()

    print('# Column Report')
    invcount, _c = invp(data[categoryColumnName])
    print('  inv =', invcount)
    cmcount, categories_multivalue = group(_c)
    print('  Multivalue count =', cmcount)
    ccount, categories = disassemble(categories_multivalue)
    print('  Disassemble count =', ccount)
    print()

    print('# Group Result')
    print(' ', categoryColumnName, ':')
    for c in categories:
        print('   ', c, ',')
    print('# Group Result with counter')
    count = groupCounter(_c)
    print ('counter is', count)

main()
