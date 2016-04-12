# -*- coding: utf-8 -*-
# @Author: Yinlong Su
# @Date:   2016-04-10 12:30:38
# @Last Modified by:   Yinlong Su
# @Last Modified time: 2016-04-10 13:28:33

import math
import pandas
import numpy as np
import json
from bson import json_util

columnAnalysis = [
    'code',
    'url',
    'creator',
    'created_t',
    'created_datetime',
    'last_modified_t',
    'last_modified_datetime',
    'product_name',
    'generic_name',
    'quantity',
    'packaging',
    'packaging_tags',
    'brands',
    'brands_tags',
    'categories',
    'categories_tags',
    'categories_en',
    'origins',
    'origins_tags',
    'manufacturing_places',
    'manufacturing_places_tags',
    'labels',
    'labels_tags',
    'labels_en',
    'emb_codes',
    'emb_codes_tags',
    'first_packaging_code_geo',
    'cities',
    'cities_tags',
    'purchase_places',
    'stores',
    'countries',
    'countries_tags',
    'countries_en',
    'ingredients_text',
    'allergens',
    'allergens_en',
    'traces',
    'traces_tags',
    'traces_en',
    'serving_size',
    'no_nutriments',
    'additives_n',
    'additives',
    'additives_tags',
    'additives_en',
    'ingredients_from_palm_oil_n',
    'ingredients_from_palm_oil',
    'ingredients_from_palm_oil_tags',
    'ingredients_that_may_be_from_palm_oil_n',
    'ingredients_that_may_be_from_palm_oil',
    'ingredients_that_may_be_from_palm_oil_tags',
    'nutrition_grade_uk',
    'nutrition_grade_fr',
    'pnns_groups_1',
    'pnns_groups_2',
    'states',
    'states_tags',
    'states_en',
    'main_category',
    'main_category_en',
    'image_url',
    'image_small_url',
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

def read_csv():
    #print('Loading csv file...')
    df = pandas.read_csv('../data/FoodFacts.csv')
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

def row_clean(data):
    new_data = data[data.code.notnull()]

    return new_data



def main():
    data = read_csv()
    new_data = row_clean(data)
    new_data.to_csv('row.clean.csv', index=False, encoding='utf-8')
    print('old:', len(data.index), 'new:', len(new_data.index))

main()
