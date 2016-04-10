# -*- coding: utf-8 -*-
# @Author: Yinlong Su
# @Date:   2016-04-09 18:50:03
# @Last Modified by:   Yinlong Su
# @Last Modified time: 2016-04-09 21:32:59

import math
import pandas
import numpy as np

numericAnalysis = [
    'additives_n',
    'energy_100g',
    'energy_from_fat_100g',
    'fat_100g',
    'saturated_fat_100g',
    'butyric_acid_100g',
    'caproic_acid_100g',
    'caprylic_acid_100g',
    'capric_acid_100g',
    'lauric_acid_100g',
    'myristic_acid_100g',
    'palmitic_acid_100g',
    'stearic_acid_100g',
    'arachidic_acid_100g',
    'behenic_acid_100g',
    'lignoceric_acid_100g',
    'cerotic_acid_100g',
    'montanic_acid_100g',
    'melissic_acid_100g',
    'monounsaturated_fat_100g',
    'polyunsaturated_fat_100g',
    'omega_3_fat_100g',
    'alpha_linolenic_acid_100g',
    'eicosapentaenoic_acid_100g',
    'docosahexaenoic_acid_100g',
    'omega_6_fat_100g',
    'linoleic_acid_100g',
    'arachidonic_acid_100g',
    'gamma_linolenic_acid_100g',
    'dihomo_gamma_linolenic_acid_100g',
    'omega_9_fat_100g',
    'oleic_acid_100g',
    'elaidic_acid_100g',
    'gondoic_acid_100g',
    'mead_acid_100g',
    'erucic_acid_100g',
    'nervonic_acid_100g',
    'trans_fat_100g',
    'cholesterol_100g',
    'carbohydrates_100g',
    'sugars_100g',
    'sucrose_100g',
    'glucose_100g',
    'fructose_100g',
    'lactose_100g',
    'maltose_100g',
    'maltodextrins_100g',
    'starch_100g',
    'polyols_100g',
    'fiber_100g',
    'proteins_100g',
    'casein_100g',
    'serum_proteins_100g',
    'nucleotides_100g',
    'salt_100g',
    'sodium_100g',
    'alcohol_100g',
    'vitamin_a_100g',
    'beta_carotene_100g',
    'vitamin_d_100g',
    'vitamin_e_100g',
    'vitamin_k_100g',
    'vitamin_c_100g',
    'vitamin_b1_100g',
    'vitamin_b2_100g',
    'vitamin_pp_100g',
    'vitamin_b6_100g',
    'vitamin_b9_100g',
    'vitamin_b12_100g',
    'biotin_100g',
    'pantothenic_acid_100g',
    'silica_100g',
    'bicarbonate_100g',
    'potassium_100g',
    'chloride_100g',
    'calcium_100g',
    'phosphorus_100g',
    'iron_100g',
    'magnesium_100g',
    'zinc_100g',
    'copper_100g',
    'manganese_100g',
    'fluoride_100g',
    'selenium_100g',
    'chromium_100g',
    'molybdenum_100g',
    'iodine_100g',
    'caffeine_100g',
    'taurine_100g',
    'ph_100g',
    'fruits_vegetables_nuts_100g',
    'collagen_meat_protein_ratio_100g',
    'cocoa_100g',
    'chlorophyl_100g',
    'carbon_footprint_100g',
    'nutrition_score_fr_100g',
    'nutrition_score_uk_100g'
]
textGroupAnalysis = [
    'creator',
    'brands',
    'brands_tags',
    'categories',
    'categories_tags',
    'origins',
    'origins_tags',
    'manufacturing_places',
    'manufacturing_places_tags',
    'countries',
    'countries_tags',
    'countries_en',
    'nutrition_grade_uk',
    'nutrition_grade_fr',
    'main_category_en'

]
textNullAnalysis = [
    'ingredients_text',
    'allergens_en',
    'traces_en',
    'serving_size',
    'no_nutriments',
    'additives_en'
]
textGroupForceAnalysis = [
    'countries_en'
]

def read_csv():
    print('Loading csv file...')
    df = pandas.read_csv('FoodFacts.csv')
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

"""
    numericAnalysis = ['height','weight','avg','HR']
    textGroupAnalysis = ['name']
    textNullAnalysis = ['name']
"""
def analysis(data):

    csvReport = {'row': len(data.index), 'col': len(data.columns)}
    numericReport = []
    textGroupReport = []
    textNullReport = []

    for n in numericAnalysis:
        print('Processing', n)
        count, _c = invp(data[n])
        numericReport.append({
            'tag': n,
            'min': min(_c) if len(_c) > 0 else float('NaN'),
            'max': max(_c) if len(_c) > 0 else float('NaN'),
            'inv': count
            })

    for tg in textGroupAnalysis:
        print('Processing', tg)
        count, _c = invp(data[tg])
        ccount, s = group(_c)
        textGroupReport.append({
            'tag': tg,
            'set': s,
            'cou': ccount,
            'inv': count
            })
    for tn in textNullAnalysis:
        print('Processing', tn)
        count, _c = invp(data[tn])
        textNullReport.append({
            'tag': tn,
            'inv': count
            })



    return csvReport, numericReport, textGroupReport, textNullReport


def report(csvReport, numericReport, textGroupReport, textNullReport):
    print()
    print('# CSV Report')
    print('  row =', csvReport['row'], 'col =', csvReport['col'])

    print()
    print('# Numeric columns')
    for r in numericReport:
        print(' ', r['tag'], ': min =', r['min'], 'max =', r['max'], 'inv =', r['inv'])

    print()
    print('# Text Group columns')
    for r in textGroupReport:
        print(' ', r['tag'], ': set =', r['set'] if r['cou'] < 10 else '(omitted)', 'cou =', r['cou'], 'inv =', r['inv'])

    print()
    print('# Text Null columns')
    for r in textNullReport:
        print(' ', r['tag'], 'inv =', r['inv'])

    print()
    print('# Text Group Result')
    for r in textGroupForceAnalysis:
        print(' ', r, ':')
        s = [w for w in textGroupReport if w['tag'] == r]
        for c in s[0]['set']:
            print('   ', c)

def main():
    print('Column Analysis of FoodFacts.csv')
    data = read_csv()
    cR, nR, tgR, tnR = analysis(data)
    report(cR, nR, tgR, tnR)

main()
