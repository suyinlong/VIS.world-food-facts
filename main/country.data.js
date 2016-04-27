/*
* @Author: Yinlong Su
* @Date:   2016-04-27 11:43:33
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-04-27 12:54:26
*/
var dataset_length = 10;
var dataset_10_empty = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];
var dataset_CHN = [0.65, 0.2, 0.7, 0.4, 0.5, 0.1, 0.7, 0.2, 0.9, 0.6];
var dataset_USA = [0.3, 0.4, 0.5, 0.1, 0.7, 0.2, 0.9, 0.8, 0.1, 0.5];

var countryInfo = {
    'CHN': {
        'LAB': 'China, ASIA',
        'PIC': "images/CHN.jpg",
        'DES': "<h1>Note</h1>According to the United Nations' Food and Agriculture Organization, China's per capita food consumption has increased from less than 1700 kcal in 1960 to 2570 kcal per day in 1995.",
        'DAT': dataset_CHN
    },
    'USA': {
        'LAB': 'USA, North America',
        'PIC': "images/USA.jpg",
        'DES': "<h1>Note</h1>Some food facts",
        'DAT': dataset_USA
    },
    'FRA': {
        'LAB': 'FRANCE, Euro',
        'PIC': "images/FRA.jpg",
        'DES': "<h1>Note</h1>Some food facts",
        'DAT': dataset_CHN
    },

};

