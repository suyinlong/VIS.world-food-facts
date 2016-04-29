# -*- coding: utf-8 -*-
# @Author: Yinlong Su
# @Date:   2016-04-29 17:15:00
# @Last Modified by:   Yinlong Su
# @Last Modified time: 2016-04-29 17:21:07

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

def main():
    for i in range(len(countryShort)):
        print("".join(["    '", countryShort[i], "': {"]))
        print("".join(["        'DAT': dataset_normalized_", countryShort[i], ","]))
        print("".join(["        'ORI': dataset_original_", countryShort[i]]))
        print("    },")



main()
