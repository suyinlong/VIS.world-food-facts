# -*- coding: utf-8 -*-
# @Author: Yinlong Su
# @Date:   2016-04-25 22:02:32
# @Last Modified by:   Yinlong Su
# @Last Modified time: 2016-04-26 12:27:27

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

def temp_clean(matrix):
    matrix_row = len(matrix)
    matrix_col = len(matrix[0])
    new_matrix = []
    fix_row = 0
    fix_col = 0
    labels = []
    for a in range(matrix_row):
        invcount = 0
        for b in range(matrix_col):
            if math.isnan(matrix[a][b]):
                invcount += 1
        if (invcount <= 5):
            row = []
            for b in range(matrix_col):
                if math.isnan(matrix[a][b]):
                    row.append(float(0.0))
                    fix_col += 1
                else:
                    row.append(matrix[a][b])
            new_matrix.append(row)
            labels.append(countryTag[a])
        else:
            fix_row +=1
    cleanReport = {
        'matrix_row': matrix_row,
        'matrix_col': matrix_col,
        'fix_row': fix_row,
        'fix_col': fix_col
    }
    return cleanReport, new_matrix, labels


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

def report(listReport, cleanReport, matrix):
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

    # print('# Latex of eigenvalues')
    # for a in range(matrix_row):
    #     print(countryTag[a], end='')
    #     for b in range(matrix_col):
    #         print('&', round(matrix[a][b], 2), end='')
    #     print('\\\\')
    # print()

    print('# Fixed matrix of eigenvalues')
    print('  row =', cleanReport['matrix_row'], 'col =', cleanReport['matrix_col'])
    print('  fix row =', cleanReport['fix_row'], 'fix col =', cleanReport['fix_col'])
    print()


def main():
    lR, matrix = extract_matrix()
    cR, new_matrix, labels = temp_clean(matrix)
    matrix_pca_y, matrix_pca_fracs = do_pca(new_matrix)
    matrix_mds_coords_euclidean = do_mds(new_matrix, 'euclidean', 10)
    matrix_mds_coords_cosine = do_mds(new_matrix, 'cosine', 10)
    matrix_mds_coords_correlation = do_mds(new_matrix, 'correlation', 10)
    matrix_isomap = do_isomap(new_matrix, 10)

    report(lR, cR, matrix)

    #json_object = json.dumps(labels, default=json_util.default)
    #print(json_object)

main()
