/*
* @Author: Yinlong Su
* @Date:   2016-04-27 11:43:33
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-05-12 12:54:33
*/

var dataset_length = 10;
var dataset_5_empty = [0.0, 0.0, 0.0, 0.0, 0.0];
var dataset_10_empty = [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0];

var dataset_label = ['Additives', 'Energy', 'Fat', 'Carbohydrates', 'Sugars', 'Fiber', 'Proteins', 'Salt', 'Sodium', 'Alcohol'];

var country_label = [ 'ALB', 'AND', 'ARG', 'AUS', 'AUT', 'BEL', 'BRA', 'KHM', 'CAN', 'CHL', 'CHN', 'CUB', 'CZE', 'DNK', 'FIN', 'FRA', 'GUF', 'DEU', 'GRC', 'GLP', 'HKG', 'HUN', 'IND', 'IRL', 'ISR', 'ITA', 'LUX', 'MLT', 'MTQ', 'MAR', 'NLD', 'NZL', 'NOR', 'POL', 'PRT', 'ROU', 'RUS', 'SPM', 'SGP', 'SVN', 'ZAF', 'KOR', 'ESP', 'SWE', 'SWZ', 'TWN', 'THA', 'TUN', 'GBR', 'USA'];

dataset_original_world = [1.74594631733, 1075.39137535, 13.0283514557, 27.9300049328, 12.8910212857, 2.81519170076, 7.40563119677, 1.11924555502, 0.439556969784, 8.50136378669];

dataset_original_ALB = [0.285714285714, 1083.6, 6.24, 36.73, 9.95, 1.66666666667, 10.13, 0.22716236, 0.089434, 6.75];
dataset_original_AND = [0.2, 2090.0, 30.0, 50.5, 47.0, 8.6, 6.0, 0.0254, 0.01, 12.5];
dataset_original_ARG = [1.90909090909, 913.75, 6.6, 34.983, 8.61, 1.1125, 2.45666666667, 0.382868, 0.15085, 7.3625];
dataset_original_AUS = [0.579684763573, 1021.21604598, 11.0505189573, 29.8243317865, 15.8399766265, 3.6258677686, 6.65298543689, 1.28917190709, 0.507602277496, 12.4833333333];
dataset_original_AUT = [0.618556701031, 1087.91025641, 10.0560810811, 36.7944594595, 13.5816326531, 3.48947368421, 6.12402777778, 6.45665170732, 2.54198886115, 14.2117647059];
dataset_original_BEL = [1.88571428571, 1143.24052555, 14.2396367692, 30.9556552833, 15.1115684932, 3.5245771167, 6.17476764706, 0.981050584694, 0.386223259414, 5.51832061069];
dataset_original_BRA = [0.898876404494, 1294.97530864, 12.5040657895, 44.4390123457, 22.051, 4.195, 6.43434177215, 2.97373653038, 1.17057322785, 3.11111111111];
dataset_original_KHM = [0.222222222222, 887.625, 11.66, 23.9857142857, 11.6, 1.275, 8.24285714286, 0.793497428571, 0.312614285714, 5.0];
dataset_original_CAN = [1.84745762712, 1050.96551724, 10.6495901639, 31.1192166667, 18.3071186441, 2.55922222222, 5.47238032787, 1.15174489655, 0.453681106435, 2.25];
dataset_original_CHL = [3.5, 1014.66666667, 6.66666666667, 20.0133333333, 0.25, 0.0, 31.025, 0.664929666667, 0.261783333333, 0.0];
dataset_original_CHN = [1.2, 1512.66666667, 13.25, 44.0625, 1.3, 10.0, 8.4, 3.11948688889, 1.22814444444, 6.0];
dataset_original_CUB = [1.83333333333, 1158.661, 16.5, 30.675, 5.625, 2.7, 2.0, 0.75719, 0.298115, 40.0];
dataset_original_CZE = [1.26666666667, 729.46, 8.02, 21.34, 18.9615384615, 1.55, 3.73333333333, 0.268492307692, 0.10570563295, 2.7];
dataset_original_DNK = [1.59124087591, 1250.25308642, 16.4646706587, 29.9093865031, 17.3485294118, 3.15950819672, 7.72520858896, 1.28390955265, 0.505440710862, 18.4941176471];
dataset_original_FIN = [0.416666666667, 1822.25, 18.425, 61.275, 32.0666666667, 2.3, 4.1, 0.510016, 0.200793700787, 6.6];
dataset_original_FRA = [1.93042170524, 1076.45522006, 12.9444572019, 27.9146946542, 12.6656616263, 2.71212227995, 7.56512888524, 1.09740710495, 0.430572628449, 8.47487643159];
dataset_original_GUF = [1.79545454545, 906.182459016, 8.84459375, 27.4792295082, 11.9588125, 3.16383333333, 7.54475409836, 0.751151991304, 0.295741266689, 3.2215];
dataset_original_DEU = [0.777923211169, 1095.33026899, 13.9830740918, 26.0718836433, 13.1042978506, 4.09185765878, 8.51453742154, 1.12881245123, 0.444413557199, 6.13173652695];
dataset_original_GRC = [1.11111111111, 1145.72727273, 12.2454545455, 30.5444444444, 12.5272727273, 2.65, 7.91111111111, 0.568147272727, 0.223680028633, 6.68333333333];
dataset_original_GLP = [1.67484662577, 862.383781513, 8.36958333333, 25.4899159664, 13.1033663366, 2.23456790123, 6.38663865546, 0.763561357917, 0.300645629757, 14.15];
dataset_original_HKG = [1.375, 758.9375, 14.125, 23.2375, 8.625, 2.001, 2.939375, 0.90640625, 0.35675, 0.5];
dataset_original_HUN = [0.538461538462, 1571.625, 23.825, 31.725, 3.5, 3.85, 9.2125, 0.43, 0.169291338583, 7.08333333333];
dataset_original_IND = [2.0, 511.2575, 13.425, 40.95, 16.7, 2.66666666667, 8.45, 0.258445, 0.10175, 0.0];
dataset_original_IRL = [0.714285714286, 1809.25, 39.6571428571, 33.85, 10.5, 2.28, 5.98, 0.856104285714, 0.337034308211, 2.425];
dataset_original_ISR = [1.0, 1013.66666667, 13.8666666667, 26.6666666667, 1.25, 0.0, 2.46666666667, 1.51976666667, 0.598333333333, 5.0];
dataset_original_ITA = [0.919075144509, 1219.84042105, 12.1539071685, 38.7376408451, 15.1953452586, 3.21446428571, 7.40736462094, 1.02650420087, 0.404135503289, 11.338];
dataset_original_LUX = [2.19230769231, 1058.45833333, 14.7875, 23.1833333333, 14.802173913, 1.03, 6.90416666667, 0.955366390909, 0.376115615605, 6.04];
dataset_original_MLT = [1.33333333333, 835.0, 8.8, 26.0, 2.3, 1.5, 4.2, 1.2, 0.472440944882, 12.5];
dataset_original_MTQ = [1.54545454545, 508.333333333, 7.976, 18.9866666667, 15.3933333333, 2.71, 3.82, 0.285015384615, 0.112210781345, 2.5];
dataset_original_MAR = [3.375, 1282.22222222, 13.8277777778, 40.1744444444, 24.7957142857, 2.00833333333, 5.34666666667, 0.55214, 0.217377952756, 5.4];
dataset_original_NLD = [1.57142857143, 1310.11111111, 12.7073170732, 44.7277310924, 22.705047619, 3.99117647059, 7.01213114754, 2.24688918367, 0.884610075526, 5.9];
dataset_original_NZL = [2.66071428571, 1307.27272727, 13.2381818182, 38.2509090909, 21.3145454545, 4.87272727273, 7.66, 0.987138545455, 0.388636363636, 6.225];
dataset_original_NOR = [1.57142857143, 1404.33333333, 12.9666666667, 49.2666666667, 23.0333333333, 1.46666666667, 4.46666666667, 0.561, 0.220866141732, 5.2];
dataset_original_POL = [2.31081081081, 931.405660377, 12.1932075472, 22.4698113208, 15.4025641026, 2.01875, 5.38113207547, 1.51883420976, 0.597969143461, 16.0];
dataset_original_PRT = [1.82994923858, 1148.4925641, 12.5307741935, 33.6894805195, 14.570942029, 2.63393518519, 6.99751633987, 1.422246881, 0.559931394181, 12.7166666667];
dataset_original_ROU = [1.76923076923, 1522.05041667, 13.7565217391, 56.321, 22.1942105263, 2.60714285714, 7.29454545455, 0.521384977778, 0.20526967629, 2.3];
dataset_original_RUS = [0.125, 1574.0, 25.175, 34.3057142857, 2.76666666667, 0.866666666667, 9.255, 0.822266666667, 0.323727034121, 11.68];
dataset_original_SPM = [2.43243243243, 1072.53125, 14.9706060606, 30.0517241379, 12.949, 2.59333333333, 4.60379310345, 0.468059047619, 0.18424671916, 0.0];
dataset_original_SGP = [1.0, 606.857142857, 7.19666666667, 19.45, 5.425, 1.508, 4.90333333333, 2.98091666667, 1.17356666667, 5.0];
dataset_original_SVN = [0.25, 1666.0, 15.5, 54.4, 21.84, 4.53333333333, 7.74, 0.6028, 0.237322834646, 4.9];
dataset_original_ZAF = [1.72727272727, 1495.53846154, 28.7784615385, 19.7615384615, 7.74, 2.80909090909, 7.0, 0.400146666667, 0.157533333333, 0.0];
dataset_original_KOR = [2.0, 1528.33333333, 13.3333333333, 54.0, 5.0, 0.0, 7.33333333333, 2.06586666667, 0.813333333333, 0.0];
dataset_original_ESP = [0.930323846909, 1011.1210753, 13.2993763324, 24.8223532069, 10.4804053272, 3.7674492242, 5.79250996377, 1.06692757338, 0.420051444445, 5.2214953271];
dataset_original_SWE = [0.181818181818, 1175.6, 10.105, 35.94, 19.7052631579, 7.74615384615, 8.145, 0.507125263158, 0.199655615416, 4.84545454545];
dataset_original_SWZ = [1.71836734694, 1123.83511294, 13.3502079002, 30.1243541667, 13.6653684211, 2.39851744186, 7.29127083333, 1.10546824173, 0.435215263389, 1.64210526316];
dataset_original_TWN = [0.0, 232.75, 0.266666666667, 5.7, 5.9, 0.0, 0.966666666667, 0.081153, 0.03195, 0.0];
dataset_original_THA = [0.689655172414, 768.8, 7.27210526316, 26.9185, 8.34789473684, 1.77429411765, 7.03111111111, 6.29194631579, 2.47754736842, 2.5];
dataset_original_TUN = [2.24615384615, 1586.78087805, 23.936744186, 44.0793181818, 28.9778947368, 2.04193333333, 6.27222222222, 0.513586236364, 0.202212727273, 0.0];
dataset_original_GBR = [1.25900900901, 1120.85108793, 14.1113954717, 28.1188956588, 16.7165829384, 2.04485249237, 7.068, 0.804670458626, 0.317271480441, 12.3637130802];
dataset_original_USA = [2.18060836502, 1176.28953743, 13.6380515807, 35.392071607, 16.605625789, 3.00091263158, 6.57787573468, 1.49081063691, 0.586705399872, 7.31158536585];


dataset_normalized_world = [0.49884180495285385, 0.5145413279188292, 0.32852471249929893, 0.4558140339915373, 0.2742770486319441, 0.28151917007469374, 0.2386988298720395, 0.17334767395783818, 0.17291852710367253, 0.21253409466729303];

dataset_normalized_ALB = [0.0816326530613761, 0.5184688995208917, 0.1573487031698101, 0.5994288045712666, 0.21170212765958635, 0.16666666666635066, 0.32651087832321396, 0.03518268760608963, 0.03518268760608963, 0.16875000000013768];
dataset_normalized_AND = [0.05714285714303755, 1.0, 0.7564841498543664, 0.8241534067737065, 1.0, 0.8599999999963975, 0.19339242546369453, 0.003933927545015277, 0.003933927545015277, 0.31250000000107075];
dataset_normalized_ARG = [0.5454545454563013, 0.437200956938555, 0.1664265129682153, 0.5709179926571423, 0.1831914893617216, 0.1112499999993838, 0.07918345420379455, 0.059298227216781366, 0.059343297016555455, 0.18406249999996252];
dataset_normalized_AUS = [0.16562421816395892, 0.4886201176926341, 0.27865141463120224, 0.48672920092404054, 0.3370207792864188, 0.3625867768574856, 0.214439498369051, 0.1996657037625194, 0.19968705813540027, 0.3120833333326307];
dataset_normalized_AUT = [0.17673048600901922, 0.5205312231638284, 0.253575531583131, 0.6004807745329487, 0.2889709075117329, 0.34894736841903684, 0.1973900975918224, 1.0, 1.0, 0.3552941176471395];
dataset_normalized_BEL = [0.538775510205825, 0.5470050361481097, 0.35906865052146464, 0.505192252686085, 0.3215227338973746, 0.35245771166842454, 0.19902554865644995, 0.15194417000720614, 0.15193743187343156, 0.13795801526727045];
dataset_normalized_BRA = [0.25682182985604807, 0.6196054108333489, 0.31530425261621825, 0.7252388795711308, 0.46917021276707116, 0.4194999999978575, 0.20739216026313972, 0.4605694507293573, 0.46049502644965595, 0.07777777777791375];
dataset_normalized_KHM = [0.0634920634922557, 0.424700956937838, 0.29402017290919785, 0.3914437255942229, 0.2468085106378986, 0.1274999999993364, 0.2656843559344193, 0.12289611776216418, 0.12298019495355805, 0.12499999999993881];
dataset_normalized_CAN = [0.5278450363212225, 0.5028543144698742, 0.2685415387165946, 0.5078615531087726, 0.38951316264004143, 0.2559222222206165, 0.17638615077757316, 0.1783811406840161, 0.1784748601257654, 0.05625000000004589];
dataset_normalized_CHL = [1.0, 0.48548644338107805, 0.16810758885678057, 0.3266149870811022, 0.005319148936165459, 0.0, 1.0, 0.10298366658246046, 0.10298366658246046, 0.0];
dataset_normalized_CHN = [0.3428571428577796, 0.7237639553425659, 0.33411383285298185, 0.7190942472475172, 0.02765957446819443, 1.0, 0.27074939564917233, 0.48314312592400005, 0.48314312592400005, 0.1500000000001224];
dataset_normalized_CUB = [0.523809523810868, 0.5543832535880193, 0.41606628242117494, 0.5006119951036727, 0.1196808510637787, 0.2699999999984832, 0.06446414182123152, 0.11727285818165868, 0.11727628100822293, 1.0];
dataset_normalized_CZE = [0.361904761905434, 0.3490239234459758, 0.20223342939470626, 0.3482660138720201, 0.4034369885432344, 0.1549999999996208, 0.12033306473296548, 0.04158383011252795, 0.04158383011252795, 0.06749999999995716];
dataset_normalized_DNK = [0.4546402502621561, 0.5982072183837055, 0.4151754128624115, 0.488117282792096, 0.3691176470591882, 0.31595081967033395, 0.24899947103833225, 0.19885067537287388, 0.19883671348321239, 0.46235294117755615];
dataset_normalized_FIN = [0.11904761904765443, 0.8718899521539005, 0.46460734870203235, 1.0, 0.682269503546562, 0.22999999999867277, 0.1321514907335939, 0.07899078703915349, 0.07899078703915349, 0.16500000000008566];
dataset_normalized_FRA = [0.5515490586402616, 0.5150503445263662, 0.326409223390335, 0.4555641722434016, 0.26948216226194355, 0.27121222799374956, 0.24383977067701665, 0.1699653558365869, 0.16938415231851497, 0.2118719107896094];
dataset_normalized_GUF = [0.5129870129881514, 0.4335801239315241, 0.22302649945938496, 0.4484574379144993, 0.25444281914906963, 0.31638333333225194, 0.24318304910126717, 0.11633769720816622, 0.1163424715225566, 0.08053749999998706];
dataset_normalized_DEU = [0.22226377462034932, 0.5240814684195357, 0.35259913055493675, 0.42548973714083005, 0.27881484788428496, 0.40918576587645333, 0.2744411739418252, 0.17482938563151146, 0.17482907340433684, 0.15329341317372303];
dataset_normalized_GRC = [0.317460317460907, 0.5481948673338709, 0.30878307571251823, 0.49848134548247075, 0.26653771760077305, 0.2649999999988624, 0.2549914943150011, 0.08799410259091645, 0.08799410259091645, 0.16708333333347508];
dataset_normalized_GLP = [0.4785276073632529, 0.4126238189055508, 0.21104857108534802, 0.4159921006358662, 0.2787950284394977, 0.22345679012209912, 0.2058545900232537, 0.118259647961243, 0.1182718124189527, 0.3537500000004191];
dataset_normalized_HKG = [0.39285714285815104, 0.3631279904303326, 0.356177953891356, 0.37923296613713864, 0.1835106382979876, 0.2000999999989875, 0.09474214343293405, 0.1403833273170045, 0.14034286516842, 0.01249999999999388];
dataset_normalized_HUN = [0.153846153846611, 0.7519736842104573, 0.600774495676837, 0.5177478580178494, 0.07446808510631643, 0.3849999999982936, 0.29693795326319006, 0.06659798599841713, 0.06659798599841713, 0.17708333333345064];
dataset_normalized_IND = [0.5714285714303755, 0.24462081339760758, 0.338526657059638, 0.6682986536120622, 0.35531914893705907, 0.2666666666654027, 0.27236099919459916, 0.040027712770530445, 0.040027712770530445, 0.0];
dataset_normalized_IRL = [0.20408163265344023, 0.8656698564602182, 1.0, 0.5524275805797163, 0.2234042553191727, 0.22799999999901405, 0.19274778404530202, 0.13259260751894816, 0.13258685486864213, 0.06062500000006578];
dataset_normalized_ISR = [0.28571428571481633, 0.48500797448217264, 0.34966378482208316, 0.43519651842885404, 0.026595744680939, 0.0, 0.0795057749127136, 0.2353799981099496, 0.2353799981099496, 0.12499999999993881];
dataset_normalized_ITA = [0.2625928984320645, 0.5836557038524901, 0.30647460439115537, 0.6321932410472398, 0.32330521826939607, 0.3214464285696565, 0.23875470172275998, 0.15898398231736088, 0.1589839788307209, 0.2834499999990199];
dataset_normalized_LUX = [0.6263736263752754, 0.506439393939014, 0.37288364553247694, 0.37834897320772104, 0.31493987049003347, 0.10299999999996208, 0.22253558957849304, 0.14796622680236246, 0.14796115803388873, 0.1509999999999731];
dataset_normalized_MLT = [0.38095238095383127, 0.39952153110030336, 0.22190201729086884, 0.4243166054671118, 0.04893617021285627, 0.149999999999052, 0.13537469782444755, 0.1858548446464344, 0.1858548446464344, 0.31250000000107075];
dataset_normalized_MTQ = [0.44155844156000446, 0.24322169058944446, 0.20112391930814114, 0.309859921121834, 0.32751773049609867, 0.27099999999878654, 0.12312651087859375, 0.044142908358078194, 0.044142908358078194, 0.062499999999969406];
dataset_normalized_MAR = [0.964285714290755, 0.6135034556086053, 0.3486831572200381, 0.6556416882008851, 0.5275683890579285, 0.20083333333279613, 0.17233413913545328, 0.08551491160258579, 0.08551491160258579, 0.13499999999991433];
dataset_normalized_NLD = [0.4489795918383114, 0.6268474215854287, 0.320429465100107, 0.7299507318233435, 0.4830861195546258, 0.399117647056604, 0.22601550838186277, 0.3479960334742791, 0.3479991942709776, 0.14750000000000613];
dataset_normalized_NZL = [0.7602040816336006, 0.6254893431923096, 0.3338158239458965, 0.6242498423645217, 0.45350096711877164, 0.487272727270159, 0.24689766317530282, 0.15288706750830522, 0.1528867295902234, 0.15562500000007803];
dataset_normalized_NOR = [0.4489795918383114, 0.6719298245625382, 0.32696926032670687, 0.8040255677956177, 0.4900709219856904, 0.14666666666597147, 0.1439699167339451, 0.0868871398720763, 0.0868871398720763, 0.1299999999999266];
dataset_normalized_POL = [0.6602316602332577, 0.44564864132965537, 0.30746560817835533, 0.3667043871192379, 0.3277141298416306, 0.2018749999987913, 0.17344503063601882, 0.23523558008136944, 0.235236728453042, 0.399999999999021];
dataset_normalized_PRT = [0.5228426395957223, 0.5495179732559824, 0.3159777354271253, 0.5498079236162862, 0.31002004317099047, 0.26339351851725784, 0.22554444286461475, 0.2202762275982918, 0.22027295348874426, 0.3179166666663169];
dataset_normalized_ROU = [0.5054945054959015, 0.7282537878794046, 0.34688635509312715, 0.9191513667907536, 0.47221724524090125, 0.26071428571320227, 0.23511830635153827, 0.08075160337136002, 0.08075160337136002, 0.05749999999998165];
dataset_normalized_RUS = [0.03571428571437061, 0.7531100478463468, 0.6348162824211749, 0.5598647782247512, 0.058865248226942425, 0.08666666666625586, 0.2983078162782443, 0.12735186965947023, 0.12735186965947023, 0.2919999999989916];
dataset_normalized_SPM = [0.6949806949827285, 0.5131728468905445, 0.3775008732851775, 0.4904402144105074, 0.27551063829832717, 0.25933333333205666, 0.14838978576814932, 0.0724925346504601, 0.0724813243582218, 0.0];
dataset_normalized_SGP = [0.28571428571481633, 0.2903622693101518, 0.18147214217069607, 0.31742146062877036, 0.11542553191498037, 0.15079999999948426, 0.15804458769839283, 0.4616815033245528, 0.4616726235924875, 0.12499999999993881];
dataset_normalized_SVN = [0.07142857142874122, 0.7971291866030071, 0.3908501440926961, 0.887800897594227, 0.4646808510638792, 0.4533333333311845, 0.2494762288480412, 0.09336108362750052, 0.09336108362750052, 0.1225000000000673];
dataset_normalized_ZAF = [0.4935064935081529, 0.7155686418841487, 0.7256816670352665, 0.32250572764703794, 0.16468085106387922, 0.28090909090760857, 0.22562449637417167, 0.06197433047433949, 0.061972471925676204, 0.0];
dataset_normalized_KOR = [0.5714285714303755, 0.731259968101974, 0.33621517771305176, 0.8812729498171817, 0.1063829787233092, 0.0, 0.2363685200111822, 0.31995944032777807, 0.31995944032777807, 0.0];
dataset_normalized_ESP = [0.2658068134035023, 0.4837899881830459, 0.3353589132803797, 0.40509756355614773, 0.22298734738642798, 0.37674492241796786, 0.18670459190264116, 0.16524471533206034, 0.165245194762564, 0.13053738317750796];
dataset_normalized_SWE = [0.05194805194822271, 0.5624880382775521, 0.2548090778082731, 0.5865361077114888, 0.41926091825238504, 0.7746153846116217, 0.2625302175668856, 0.07854307250019792, 0.07854307250019792, 0.12113636363636754];
dataset_normalized_SWZ = [0.4909620991264885, 0.5377201497308253, 0.3366406891267401, 0.4916255269961962, 0.29075251959737136, 0.23985174418529107, 0.23501275852825368, 0.1712138569403896, 0.1712105312657066, 0.04105263157893707];
dataset_normalized_TWN = [0.0, 0.11136363636364086, 0.0067243035542610356, 0.09302325581404844, 0.12553191489368357, 0.0, 0.031157668546859262, 0.012568898506323811, 0.012568898506323811, 0.0];
dataset_normalized_THA = [0.19704433497599155, 0.36784688995241355, 0.18337441225527265, 0.4393064055485812, 0.17761478163496572, 0.17742941176386473, 0.22662727191377013, 0.9744905875352009, 0.9746491836707551, 0.062499999999969406];
dataset_normalized_TUN = [0.6417582417602337, 0.7592253005014243, 0.6035922525304365, 0.7193687177772116, 0.6165509518484699, 0.20419333333233655, 0.20216671143379505, 0.07954374180991677, 0.07954902177719166, 0.0];
dataset_normalized_GBR = [0.3597168597177135, 0.5362923865686842, 0.3558349002213023, 0.458896705979252, 0.3556719774121655, 0.20448524923654718, 0.2278162771960409, 0.12462658589962483, 0.12481230161546257, 0.30909282700544266];
dataset_normalized_USA = [0.6230309614355515, 0.5628179604907159, 0.3438989951894487, 0.5775939878744326, 0.3533111869998248, 0.3000912631560955, 0.21201855712120243, 0.23089531610003608, 0.23080565333656633, 0.18278963414634852];

var countryInfo = {
    'world': {
        'DAT': dataset_normalized_world,
        'ORI': dataset_original_world,
        'LAB': 'World'
    },
    'ALB': {
        'DAT': dataset_normalized_ALB,
        'ORI': dataset_original_ALB,
        'LAB': 'Albania',
        'FLG': '006.gif',
        'GLO': ''
    },
    'AND': {
        'DAT': dataset_normalized_AND,
        'ORI': dataset_original_AND,
        'LAB': 'Andorra',
        'FLG': '001.gif',
        'GLO': ''
    },
    'ARG': {
        'DAT': dataset_normalized_ARG,
        'ORI': dataset_original_ARG,
        'LAB': 'Argentina',
        'FLG': '010.gif',
        'GLO': ''
    },
    'AUS': {
        'DAT': dataset_normalized_AUS,
        'ORI': dataset_original_AUS,
        'LAB': 'Australia',
        'FLG': '043.gif',
        'GLO': ''
    },
    'AUT': {
        'DAT': dataset_normalized_AUT,
        'ORI': dataset_original_AUT,
        'LAB': 'Austria',
        'FLG': '032.gif',
        'GLO': ''
    },
    'BEL': {
        'DAT': dataset_normalized_BEL,
        'ORI': dataset_original_BEL,
        'LAB': 'Belgium',
        'FLG': '120.gif',
        'GLO': ''
    },
    'BRA': {
        'DAT': dataset_normalized_BRA,
        'ORI': dataset_original_BRA,
        'LAB': 'Brazil',
        'FLG': '169.gif',
        'GLO': ''
    },
    'KHM': {
        'DAT': dataset_normalized_KHM,
        'ORI': dataset_original_KHM,
        'LAB': 'Cambodia',
        'FLG': '242.gif',
        'GLO': ''
    },
    'CAN': {
        'DAT': dataset_normalized_CAN,
        'ORI': dataset_original_CAN,
        'LAB': 'Canada',
        'FLG': '176.gif',
        'GLO': ''
    },
    'CHL': {
        'DAT': dataset_normalized_CHL,
        'ORI': dataset_original_CHL,
        'LAB': 'Chile',
        'FLG': '184.gif',
        'GLO': ''
    },
    'CHN': {
        'DAT': dataset_normalized_CHN,
        'ORI': dataset_original_CHN,
        'LAB': 'China',
        'FLG': '186.gif',
        'GLO': ''
    },
    'CUB': {
        'DAT': dataset_normalized_CUB,
        'ORI': dataset_original_CUB,
        'LAB': 'Cuba',
        'FLG': '190.gif',
        'GLO': ''
    },
    'CZE': {
        'DAT': dataset_normalized_CZE,
        'ORI': dataset_original_CZE,
        'LAB': 'Czech Republic',
        'FLG': '194.gif',
        'GLO': ''
    },
    'DNK': {
        'DAT': dataset_normalized_DNK,
        'ORI': dataset_original_DNK,
        'LAB': 'Denmark',
        'FLG': '197.gif',
        'GLO': ''
    },
    'FIN': {
        'DAT': dataset_normalized_FIN,
        'ORI': dataset_original_FIN,
        'LAB': 'Finland',
        'FLG': '210.gif',
        'GLO': ''
    },
    'FRA': {
        'DAT': dataset_normalized_FRA,
        'ORI': dataset_original_FRA,
        'LAB': 'France',
        'FLG': '215.gif',
        'GLO': ''
    },
    'GUF': {
        'DAT': dataset_normalized_GUF,
        'ORI': dataset_original_GUF,
        'LAB': 'French Guiana',
        'FLG': '243.gif',
        'GLO': ''
    },
    'DEU': {
        'DAT': dataset_normalized_DEU,
        'ORI': dataset_original_DEU,
        'LAB': 'Germany',
        'FLG': '195.gif',
        'GLO': ''
    },
    'GRC': {
        'DAT': dataset_normalized_GRC,
        'ORI': dataset_original_GRC,
        'LAB': 'Greece',
        'FLG': '227.gif',
        'GLO': ''
    },
    'GLP': {
        'DAT': dataset_normalized_GLP,
        'ORI': dataset_original_GLP,
        'LAB': 'Guadeloupe',
        'FLG': '244.gif',
        'GLO': ''
    },
    'HKG': {
        'DAT': dataset_normalized_HKG,
        'ORI': dataset_original_HKG,
        'LAB': 'Hong Kong',
        'FLG': '233.gif',
        'GLO': ''
    },
    'HUN': {
        'DAT': dataset_normalized_HUN,
        'ORI': dataset_original_HUN,
        'LAB': 'Hungary',
        'FLG': '001.gif',
        'GLO': ''
    },
    'IND': {
        'DAT': dataset_normalized_IND,
        'ORI': dataset_original_IND,
        'LAB': 'India',
        'FLG': '012.gif',
        'GLO': ''
    },
    'IRL': {
        'DAT': dataset_normalized_IRL,
        'ORI': dataset_original_IRL,
        'LAB': 'Ireland',
        'FLG': '239.gif',
        'GLO': ''
    },
    'ISR': {
        'DAT': dataset_normalized_ISR,
        'ORI': dataset_original_ISR,
        'LAB': 'Israel',
        'FLG': '011.gif',
        'GLO': ''
    },
    'ITA': {
        'DAT': dataset_normalized_ITA,
        'ORI': dataset_original_ITA,
        'LAB': 'Italy',
        'FLG': '017.gif',
        'GLO': ''
    },
    'LUX': {
        'DAT': dataset_normalized_LUX,
        'ORI': dataset_original_LUX,
        'LAB': 'Luxembourg',
        'FLG': '042.gif',
        'GLO': ''
    },
    'MLT': {
        'DAT': dataset_normalized_MLT,
        'ORI': dataset_original_MLT,
        'LAB': 'Malta',
        'FLG': '061.gif',
        'GLO': ''
    },
    'MTQ': {
        'DAT': dataset_normalized_MTQ,
        'ORI': dataset_original_MTQ,
        'LAB': 'Martinique',
        'FLG': '245.gif',
        'GLO': ''
    },
    'MAR': {
        'DAT': dataset_normalized_MAR,
        'ORI': dataset_original_MAR,
        'LAB': 'Morocco',
        'FLG': '046.gif',
        'GLO': ''
    },
    'NLD': {
        'DAT': dataset_normalized_NLD,
        'ORI': dataset_original_NLD,
        'LAB': 'Netherlands',
        'FLG': '075.gif',
        'GLO': ''
    },
    'NZL': {
        'DAT': dataset_normalized_NZL,
        'ORI': dataset_original_NZL,
        'LAB': 'New Zealand',
        'FLG': '081.gif',
        'GLO': ''
    },
    'NOR': {
        'DAT': dataset_normalized_NOR,
        'ORI': dataset_original_NOR,
        'LAB': 'Norway',
        'FLG': '172.gif',
        'GLO': ''
    },
    'POL': {
        'DAT': dataset_normalized_POL,
        'ORI': dataset_original_POL,
        'LAB': 'Poland',
        'FLG': '090.gif',
        'GLO': ''
    },
    'PRT': {
        'DAT': dataset_normalized_PRT,
        'ORI': dataset_original_PRT,
        'LAB': 'Portugal',
        'FLG': '095.gif',
        'GLO': ''
    },
    'ROU': {
        'DAT': dataset_normalized_ROU,
        'ORI': dataset_original_ROU,
        'LAB': 'Romania',
        'FLG': '120.gif',
        'GLO': ''
    },
    'RUS': {
        'DAT': dataset_normalized_RUS,
        'ORI': dataset_original_RUS,
        'LAB': 'Russia',
        'FLG': '101.gif',
        'GLO': ''
    },
    'SPM': {
        'DAT': dataset_normalized_SPM,
        'ORI': dataset_original_SPM,
        'LAB': 'Saint Pierre and Miquelon',
        'FLG': '246.gif',
        'GLO': ''
    },
    'SGP': {
        'DAT': dataset_normalized_SGP,
        'ORI': dataset_original_SGP,
        'LAB': 'Singapore',
        'FLG': '110.gif',
        'GLO': ''
    },
    'SVN': {
        'DAT': dataset_normalized_SVN,
        'ORI': dataset_original_SVN,
        'LAB': 'Slovenia',
        'FLG': '112.gif',
        'GLO': ''
    },
    'ZAF': {
        'DAT': dataset_normalized_ZAF,
        'ORI': dataset_original_ZAF,
        'LAB': 'South Africa',
        'FLG': '161.gif',
        'GLO': ''
    },
    'KOR': {
        'DAT': dataset_normalized_KOR,
        'ORI': dataset_original_KOR,
        'LAB': 'South Korea',
        'FLG': '029.gif',
        'GLO': ''
    },
    'ESP': {
        'DAT': dataset_normalized_ESP,
        'ORI': dataset_original_ESP,
        'LAB': 'Spain',
        'FLG': '207.gif',
        'GLO': ''
    },
    'SWE': {
        'DAT': dataset_normalized_SWE,
        'ORI': dataset_original_SWE,
        'LAB': 'Sweden',
        'FLG': '065.gif',
        'GLO': ''
    },
    'SWZ': {
        'DAT': dataset_normalized_SWZ,
        'ORI': dataset_original_SWZ,
        'LAB': 'Swaziland',
        'FLG': '240.gif',
        'GLO': ''
    },
    'TWN': {
        'DAT': dataset_normalized_TWN,
        'ORI': dataset_original_TWN,
        'LAB': 'Taiwan',
        'FLG': '139.gif',
        'GLO': ''
    },
    'THA': {
        'DAT': dataset_normalized_THA,
        'ORI': dataset_original_THA,
        'LAB': 'Thailand',
        'FLG': '128.gif',
        'GLO': ''
    },
    'TUN': {
        'DAT': dataset_normalized_TUN,
        'ORI': dataset_original_TUN,
        'LAB': 'Tunisia',
        'FLG': '134.gif',
        'GLO': ''
    },
    'GBR': {
        'DAT': dataset_normalized_GBR,
        'ORI': dataset_original_GBR,
        'LAB': 'United Kingdom',
        'FLG': '241.gif',
        'GLO': ''
    },
    'USA': {
        'DAT': dataset_normalized_USA,
        'ORI': dataset_original_USA,
        'LAB': 'United States of America',
        'FLG': '145.gif',
        'GLO': ''
    },
};
