/*
* @Author: Yinlong Su
* @Date:   2016-04-27 11:43:33
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-04-28 19:28:04
*/

var dataset_length = 10;
var dataset_10_empty = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

var dataset_label = [
    'Additives',
    'Energy',
    'Fat',
    'Carbohydrates',
    'Sugars',
    'Fiber',
    'Proteins',
    'Salt',
    'Sodium',
    'Alcohol'
];

var country_label = [
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

dataset_original_world = [1.74594631733, 1075.39137535, 13.0283514557, 27.9300049328, 12.8910212857, 2.81519170076, 7.40563119677, 1.11924555502, 0.439556969784, 8.50136378669];
dataset_normalized_world = [0.49884180495285385, 0.5145413279188292, 0.32852471249929893, 0.4558140339915373, 0.2742770486319441, 0.28151917007469374, 0.2386988298720395, 0.17334767395783818, 0.17291852710367253, 0.21253409466729303];

dataset_original_CHN = [0.0461538461538, 0.365908724399, 0.131188118812, 0.316996402878, 0.012380952381, 0.105485232068, 0.0976744186047, 0.0122814444444, 0.0122814444444, 0.0612870275792] ;
dataset_normalized_CHN = [0.3428571428577796, 0.7237639553425659, 0.33411383285298185, 0.7190942472475172, 0.02765957446819443, 1.0, 0.27074939564917233, 0.48314312592400005, 0.48314312592400005, 0.1500000000001224] ;

dataset_original_USA = [0.0838695525007, 0.284540284815, 0.13503021367, 0.254619220194, 0.158148817038, 0.0316551965356, 0.0764869271474, 0.00586933321618, 0.00586705399872, 0.0746842223274] ;
dataset_normalized_USA = [0.6230309614355515, 0.5628179604907159, 0.3438989951894487, 0.5775939878744326, 0.3533111869998248, 0.3000912631560955, 0.21201855712120243, 0.23089531610003608, 0.23080565333656633, 0.18278963414634852] ;

dataset_original_FRA =[0.0742469886629, 0.260390716028, 0.128162942593, 0.200825141397, 0.120625348822, 0.0286088848096, 0.0879666149447, 0.00432050041318, 0.00430572628449, 0.0865666642654] ;
dataset_normalized_FRA =[0.5515490586402616, 0.5150503445263662, 0.326409223390335, 0.4555641722434016, 0.26948216226194355, 0.27121222799374956, 0.24383977067701665, 0.1699653558365869, 0.16938415231851497, 0.2118719107896094] ;


var countryInfo = {
    'CHN': {
        'LAB': 'China, ASIA',
        'PIC': "images/CHN.jpg",
        'DES': "<h1>Note</h1>According to the United Nations' Food and Agriculture Organization, China's per capita food consumption has increased from less than 1700 kcal in 1960 to 2570 kcal per day in 1995.",
        'DAT': dataset_normalized_CHN,
        'ORI': dataset_original_CHN
    },
    'USA': {
        'LAB': 'USA, North America',
        'PIC': "images/USA.jpg",
        'DES': "<h1>Note</h1>Some food facts",
        'DAT': dataset_normalized_USA,
        'ORI': dataset_original_USA
    },
    'FRA': {
        'LAB': 'FRANCE, Euro',
        'PIC': "images/FRA.jpg",
        'DES': "<h1>Note</h1>Some food facts",
        'DAT': dataset_normalized_FRA,
        'ORI': dataset_original_FRA
    },

};

