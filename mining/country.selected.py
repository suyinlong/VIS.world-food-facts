# -*- coding: utf-8 -*-
# @Author: Yinlong Su
# @Date:   2016-04-27 21:37:05
# @Last Modified by:   Yinlong Su
# @Last Modified time: 2016-04-27 23:41:41

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


def do_pca(data):
    A = array(data)
    matrix_pca = mlabPCA(A)
    matrix_pca_y = []

    for i in range(len(data)):
        matrix_pca_y.append([matrix_pca.Y[i, 0], matrix_pca.Y[i,1]])

    # return PCA result and the fracs vector
    return matrix_pca_y, matrix_pca.fracs.tolist()

def do_mds(data, metric, dim):
    matrix_mds_coords = []

    # construct the distance matrix
    similarities = squareform(pdist(data, metric))

    # get MDS object
    matrix_mds = manifold.MDS(n_components=dim, dissimilarity="precomputed", random_state=6)
    results = matrix_mds.fit(similarities)
    coords = results.embedding_

    for i in range(len(coords)):
        matrix_mds_coords.append([coords[i, 0], coords[i, 1]])
    return matrix_mds_coords

def do_isomap(data, dim):
    # get isomap object
    isomap = manifold.Isomap(n_neighbors=5, n_components=dim)
    results = isomap.fit(data)
    coords = results.embedding_

    matrix_isomap = []
    for i in range(len(coords)):
        matrix_isomap.append([coords[i, 0], coords[i, 1]])
    return matrix_isomap

def extract_matrix():
    listReport = []

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
            listReport.append({
                'column': column,
                'country': country,
                'normalized_average': normalized_average
                })
            #print(' ', column, country, normalized_average)
            a = getid(country, countryTag)
            b = getid(column, attributeColumnName)
            if a >= 0 and b >= 0:
                matrix[a][b] = float(normalized_average)
    return listReport, matrix

def report(listReport, matrix):
    matrix_row = len(matrix)
    matrix_col = len(matrix[0])

    print('Eigen extraction')
    print()

    print('# List of eigenvalues (column, country, normalized average)')
    for r in listReport:
        print(' ', r['column'], r['country'], r['normalized_average'])
    print()

    print('# Matrix of eigenvalues')
    print('  row =', matrix_row,'col =', matrix_col)
    for a in range(matrix_row):
        for b in range(matrix_col):
            print(matrix[a][b], end=' ')
        print()
    print()

def dump(countryTag, m1, m2, m3, m4, m5):
    print('# dump: countryTag')
    json_object = json.dumps(countryTag, default=json_util.default)
    print(json_object)
    print()

    print('# dump: matrix_pca_y')
    json_object = json.dumps(m1, default=json_util.default)
    print(json_object)
    print()

    print('# dump: matrix_mds_coords_euclidean')
    json_object = json.dumps(m2, default=json_util.default)
    print(json_object)
    print()

    print('# dump: matrix_mds_coords_cosine')
    json_object = json.dumps(m3, default=json_util.default)
    print(json_object)
    print()

    print('# dump: matrix_mds_coords_correlation')
    json_object = json.dumps(m4, default=json_util.default)
    print(json_object)
    print()

    print('# dump: matrix_isomap')
    json_object = json.dumps(m5, default=json_util.default)
    print(json_object)
    print()

def dump_per_country(matrix, mvalue):
    print('# dump per country')
    print()

    for i in range(len(countryTag)):
        print('  #', countryTag[i])
        print("dataset_original", countryTag[i], '=', end='')
        json_object = json.dumps(matrix[i], default=json_util.default)
        print(json_object, ';')
        print("dataset_normalized", countryTag[i], '=', end='')
        nor = []
        for j in range(len(attributeColumnName)):
            nor.append(matrix[i][j] / mvalue[j])
        json_object = json.dumps(nor, default=json_util.default)
        print(json_object, ';')
        print()

def main():
    lR, new_matrix = extract_matrix()

    matrix_pca_y, matrix_pca_fracs = do_pca(new_matrix)
    matrix_mds_coords_euclidean = do_mds(new_matrix, 'euclidean', 10)
    matrix_mds_coords_cosine = do_mds(new_matrix, 'cosine', 10)
    matrix_mds_coords_correlation = do_mds(new_matrix, 'correlation', 10)
    matrix_isomap = do_isomap(new_matrix, 10)

    mvc = maxvalue(new_matrix)

    report(lR, new_matrix)

    dump(countryTag, matrix_pca_y, matrix_mds_coords_euclidean, matrix_mds_coords_cosine, matrix_mds_coords_correlation, matrix_isomap)
    dump_per_country(new_matrix, mvc)

main()
