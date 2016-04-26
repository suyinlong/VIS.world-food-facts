var total = 65503
var dataset = [{"tag": "code", "inv": 17}, {"tag": "url", "inv": 17}, {"tag": "creator", "inv": 68}, {"tag": "created_t", "inv": 3}, {"tag": "created_datetime", "inv": 7}, {"tag": "last_modified_t", "inv": 0}, {"tag": "last_modified_datetime", "inv": 0}, {"tag": "product_name", "inv": 5230}, {"tag": "generic_name", "inv": 31290}, {"tag": "quantity", "inv": 9218}, {"tag": "packaging", "inv": 15425}, {"tag": "packaging_tags", "inv": 15425}, {"tag": "brands", "inv": 9303}, {"tag": "brands_tags", "inv": 9304}, {"tag": "categories", "inv": 15608}, {"tag": "categories_tags", "inv": 15623}, {"tag": "categories_en", "inv": 15607}, {"tag": "origins", "inv": 50138}, {"tag": "origins_tags", "inv": 50175}, {"tag": "manufacturing_places", "inv": 44435}, {"tag": "manufacturing_places_tags", "inv": 44441}, {"tag": "labels", "inv": 40756}, {"tag": "labels_tags", "inv": 40709}, {"tag": "labels_en", "inv": 40693}, {"tag": "emb_codes", "inv": 46138}, {"tag": "emb_codes_tags", "inv": 46141}, {"tag": "first_packaging_code_geo", "inv": 53278}, {"tag": "cities", "inv": 65487}, {"tag": "cities_tags", "inv": 52241}, {"tag": "purchase_places", "inv": 28271}, {"tag": "stores", "inv": 33419}, {"tag": "countries", "inv": 211}, {"tag": "countries_tags", "inv": 211}, {"tag": "countries_en", "inv": 211}, {"tag": "ingredients_text", "inv": 21822}, {"tag": "allergens", "inv": 51966}, {"tag": "allergens_en", "inv": 65486}, {"tag": "traces", "inv": 50631}, {"tag": "traces_tags", "inv": 50649}, {"tag": "traces_en", "inv": 50633}, {"tag": "serving_size", "inv": 44329}, {"tag": "no_nutriments", "inv": 65503}, {"tag": "additives_n", "inv": 21839}, {"tag": "additives", "inv": 21857}, {"tag": "additives_tags", "inv": 41838}, {"tag": "additives_en", "inv": 41838}, {"tag": "ingredients_from_palm_oil_n", "inv": 21839}, {"tag": "ingredients_from_palm_oil", "inv": 65503}, {"tag": "ingredients_from_palm_oil_tags", "inv": 63122}, {"tag": "ingredients_that_may_be_from_palm_oil_n", "inv": 21839}, {"tag": "ingredients_that_may_be_from_palm_oil", "inv": 65503}, {"tag": "ingredients_that_may_be_from_palm_oil_tags", "inv": 60981}, {"tag": "nutrition_grade_uk", "inv": 65503}, {"tag": "nutrition_grade_fr", "inv": 34209}, {"tag": "pnns_groups_1", "inv": 12997}, {"tag": "pnns_groups_2", "inv": 11087}, {"tag": "states", "inv": 88}, {"tag": "states_tags", "inv": 88}, {"tag": "states_en", "inv": 88}, {"tag": "main_category", "inv": 15640}, {"tag": "main_category_en", "inv": 15640}, {"tag": "image_url", "inv": 4304}, {"tag": "image_small_url", "inv": 4304}, {"tag": "energy_100g", "inv": 29129}, {"tag": "energy_from_fat_100g", "inv": 64770}, {"tag": "fat_100g", "inv": 29141}, {"tag": "saturated_fat_100g", "inv": 33074}, {"tag": "butyric_acid_100g", "inv": 65503}, {"tag": "caproic_acid_100g", "inv": 65503}, {"tag": "caprylic_acid_100g", "inv": 65502}, {"tag": "capric_acid_100g", "inv": 65502}, {"tag": "lauric_acid_100g", "inv": 65500}, {"tag": "myristic_acid_100g", "inv": 65502}, {"tag": "palmitic_acid_100g", "inv": 65502}, {"tag": "stearic_acid_100g", "inv": 65502}, {"tag": "arachidic_acid_100g", "inv": 65486}, {"tag": "behenic_acid_100g", "inv": 65487}, {"tag": "lignoceric_acid_100g", "inv": 65503}, {"tag": "cerotic_acid_100g", "inv": 65503}, {"tag": "montanic_acid_100g", "inv": 65503}, {"tag": "melissic_acid_100g", "inv": 65503}, {"tag": "monounsaturated_fat_100g", "inv": 63946}, {"tag": "polyunsaturated_fat_100g", "inv": 63933}, {"tag": "omega_3_fat_100g", "inv": 64976}, {"tag": "alpha_linolenic_acid_100g", "inv": 65374}, {"tag": "eicosapentaenoic_acid_100g", "inv": 65470}, {"tag": "docosahexaenoic_acid_100g", "inv": 65446}, {"tag": "omega_6_fat_100g", "inv": 65366}, {"tag": "linoleic_acid_100g", "inv": 65406}, {"tag": "arachidonic_acid_100g", "inv": 65498}, {"tag": "gamma_linolenic_acid_100g", "inv": 65486}, {"tag": "dihomo_gamma_linolenic_acid_100g", "inv": 65487}, {"tag": "omega_9_fat_100g", "inv": 65487}, {"tag": "oleic_acid_100g", "inv": 65496}, {"tag": "elaidic_acid_100g", "inv": 65503}, {"tag": "gondoic_acid_100g", "inv": 65495}, {"tag": "mead_acid_100g", "inv": 65503}, {"tag": "erucic_acid_100g", "inv": 65503}, {"tag": "nervonic_acid_100g", "inv": 65503}, {"tag": "trans_fat_100g", "inv": 64275}, {"tag": "cholesterol_100g", "inv": 64112}, {"tag": "carbohydrates_100g", "inv": 29438}, {"tag": "sugars_100g", "inv": 32864}, {"tag": "sucrose_100g", "inv": 65495}, {"tag": "glucose_100g", "inv": 65498}, {"tag": "fructose_100g", "inv": 65483}, {"tag": "lactose_100g", "inv": 65362}, {"tag": "maltose_100g", "inv": 65501}, {"tag": "maltodextrins_100g", "inv": 65496}, {"tag": "starch_100g", "inv": 65287}, {"tag": "polyols_100g", "inv": 65253}, {"tag": "fiber_100g", "inv": 42957}, {"tag": "proteins_100g", "inv": 29573}, {"tag": "casein_100g", "inv": 65488}, {"tag": "serum_proteins_100g", "inv": 65495}, {"tag": "nucleotides_100g", "inv": 65500}, {"tag": "salt_100g", "inv": 32595}, {"tag": "sodium_100g", "inv": 32605}, {"tag": "alcohol_100g", "inv": 63084}, {"tag": "vitamin_a_100g", "inv": 64142}, {"tag": "beta_carotene_100g", "inv": 65494}, {"tag": "vitamin_d_100g", "inv": 64921}, {"tag": "vitamin_e_100g", "inv": 64746}, {"tag": "vitamin_k_100g", "inv": 65444}, {"tag": "vitamin_c_100g", "inv": 63595}, {"tag": "vitamin_b1_100g", "inv": 64632}, {"tag": "vitamin_b2_100g", "inv": 64782}, {"tag": "vitamin_pp_100g", "inv": 64772}, {"tag": "vitamin_b6_100g", "inv": 64800}, {"tag": "vitamin_b9_100g", "inv": 64766}, {"tag": "vitamin_b12_100g", "inv": 64912}, {"tag": "biotin_100g", "inv": 65310}, {"tag": "pantothenic_acid_100g", "inv": 65096}, {"tag": "silica_100g", "inv": 65475}, {"tag": "bicarbonate_100g", "inv": 65441}, {"tag": "potassium_100g", "inv": 65006}, {"tag": "chloride_100g", "inv": 65397}, {"tag": "calcium_100g", "inv": 62554}, {"tag": "phosphorus_100g", "inv": 64913}, {"tag": "iron_100g", "inv": 63650}, {"tag": "magnesium_100g", "inv": 64706}, {"tag": "zinc_100g", "inv": 65258}, {"tag": "copper_100g", "inv": 65407}, {"tag": "manganese_100g", "inv": 65418}, {"tag": "fluoride_100g", "inv": 65448}, {"tag": "selenium_100g", "inv": 65429}, {"tag": "chromium_100g", "inv": 65488}, {"tag": "molybdenum_100g", "inv": 65498}, {"tag": "iodine_100g", "inv": 65388}, {"tag": "caffeine_100g", "inv": 65467}, {"tag": "taurine_100g", "inv": 65487}, {"tag": "ph_100g", "inv": 65468}, {"tag": "fruits_vegetables_nuts_100g", "inv": 64474}, {"tag": "collagen_meat_protein_ratio_100g", "inv": 65394}, {"tag": "cocoa_100g", "inv": 65071}, {"tag": "chlorophyl_100g", "inv": 65503}, {"tag": "carbon_footprint_100g", "inv": 65323}, {"tag": "nutrition_score_fr_100g", "inv": 34209}, {"tag": "nutrition_score_uk_100g", "inv": 34209}];

var numericColor = 'palegreen';
var urlColor = 'lightskyblue';
var textColor = 'gold';
var timeColor = 'tomato';
var unknownColor = 'lightslategray'

var legends = [
    {"legend": "Numeric columns", "color": numericColor},
    {"legend": "Text columns", "color": textColor},
    {"legend": "Time columns", "color": timeColor},
    {"legend": "URL columns", "color": urlColor},
    {"legend": "Unknown columns", "color": unknownColor}
];

var columnColor = {
    'code': numericColor,
    'url': urlColor,
    'creator': textColor,
    'created_t': timeColor,
    'created_datetime': timeColor,
    'last_modified_t': timeColor,
    'last_modified_datetime': timeColor,
    'product_name': textColor,
    'generic_name': textColor,
    'quantity': textColor,
    'packaging': textColor,
    'packaging_tags': textColor,
    'brands': textColor,
    'brands_tags': textColor,
    'categories': textColor,
    'categories_tags': textColor,
    'categories_en': textColor,
    'origins': textColor,
    'origins_tags': textColor,
    'manufacturing_places': textColor,
    'manufacturing_places_tags': textColor,
    'labels': textColor,
    'labels_tags': textColor,
    'labels_en': textColor,
    'emb_codes': textColor,
    'emb_codes_tags': textColor,
    'first_packaging_code_geo': textColor,
    'cities': textColor,
    'cities_tags': textColor,
    'purchase_places': textColor,
    'stores': textColor,
    'countries': textColor,
    'countries_tags': textColor,
    'countries_en': textColor,
    'ingredients_text': textColor,
    'allergens': textColor,
    'allergens_en': textColor,
    'traces': textColor,
    'traces_tags': textColor,
    'traces_en': textColor,
    'serving_size': textColor,
    'no_nutriments': unknownColor,
    'additives_n': numericColor,
    'additives': textColor,
    'additives_tags': textColor,
    'additives_en': textColor,
    'ingredients_from_palm_oil_n': numericColor,
    'ingredients_from_palm_oil': textColor,
    'ingredients_from_palm_oil_tags': textColor,
    'ingredients_that_may_be_from_palm_oil_n': numericColor,
    'ingredients_that_may_be_from_palm_oil': textColor,
    'ingredients_that_may_be_from_palm_oil_tags': textColor,
    'nutrition_grade_uk': textColor,
    'nutrition_grade_fr': textColor,
    'pnns_groups_1': textColor,
    'pnns_groups_2': textColor,
    'states': textColor,
    'states_tags': textColor,
    'states_en': textColor,
    'main_category': textColor,
    'main_category_en': textColor,
    'image_url': urlColor,
    'image_small_url': urlColor,
    'energy_100g': numericColor,
    'energy_from_fat_100g': numericColor,
    'fat_100g': numericColor,
    'saturated_fat_100g': numericColor,
    'butyric_acid_100g': numericColor,
    'caproic_acid_100g': numericColor,
    'caprylic_acid_100g': numericColor,
    'capric_acid_100g': numericColor,
    'lauric_acid_100g': numericColor,
    'myristic_acid_100g': numericColor,
    'palmitic_acid_100g': numericColor,
    'stearic_acid_100g': numericColor,
    'arachidic_acid_100g': numericColor,
    'behenic_acid_100g': numericColor,
    'lignoceric_acid_100g': numericColor,
    'cerotic_acid_100g': numericColor,
    'montanic_acid_100g': numericColor,
    'melissic_acid_100g': numericColor,
    'monounsaturated_fat_100g': numericColor,
    'polyunsaturated_fat_100g': numericColor,
    'omega_3_fat_100g': numericColor,
    'alpha_linolenic_acid_100g': numericColor,
    'eicosapentaenoic_acid_100g': numericColor,
    'docosahexaenoic_acid_100g': numericColor,
    'omega_6_fat_100g': numericColor,
    'linoleic_acid_100g': numericColor,
    'arachidonic_acid_100g': numericColor,
    'gamma_linolenic_acid_100g': numericColor,
    'dihomo_gamma_linolenic_acid_100g': numericColor,
    'omega_9_fat_100g': numericColor,
    'oleic_acid_100g': numericColor,
    'elaidic_acid_100g': numericColor,
    'gondoic_acid_100g': numericColor,
    'mead_acid_100g': numericColor,
    'erucic_acid_100g': numericColor,
    'nervonic_acid_100g': numericColor,
    'trans_fat_100g': numericColor,
    'cholesterol_100g': numericColor,
    'carbohydrates_100g': numericColor,
    'sugars_100g': numericColor,
    'sucrose_100g': numericColor,
    'glucose_100g': numericColor,
    'fructose_100g': numericColor,
    'lactose_100g': numericColor,
    'maltose_100g': numericColor,
    'maltodextrins_100g': numericColor,
    'starch_100g': numericColor,
    'polyols_100g': numericColor,
    'fiber_100g': numericColor,
    'proteins_100g': numericColor,
    'casein_100g': numericColor,
    'serum_proteins_100g': numericColor,
    'nucleotides_100g': numericColor,
    'salt_100g': numericColor,
    'sodium_100g': numericColor,
    'alcohol_100g': numericColor,
    'vitamin_a_100g': numericColor,
    'beta_carotene_100g': numericColor,
    'vitamin_d_100g': numericColor,
    'vitamin_e_100g': numericColor,
    'vitamin_k_100g': numericColor,
    'vitamin_c_100g': numericColor,
    'vitamin_b1_100g': numericColor,
    'vitamin_b2_100g': numericColor,
    'vitamin_pp_100g': numericColor,
    'vitamin_b6_100g': numericColor,
    'vitamin_b9_100g': numericColor,
    'vitamin_b12_100g': numericColor,
    'biotin_100g': numericColor,
    'pantothenic_acid_100g': numericColor,
    'silica_100g': numericColor,
    'bicarbonate_100g': numericColor,
    'potassium_100g': numericColor,
    'chloride_100g': numericColor,
    'calcium_100g': numericColor,
    'phosphorus_100g': numericColor,
    'iron_100g': numericColor,
    'magnesium_100g': numericColor,
    'zinc_100g': numericColor,
    'copper_100g': numericColor,
    'manganese_100g': numericColor,
    'fluoride_100g': numericColor,
    'selenium_100g': numericColor,
    'chromium_100g': numericColor,
    'molybdenum_100g': numericColor,
    'iodine_100g': numericColor,
    'caffeine_100g': numericColor,
    'taurine_100g': numericColor,
    'ph_100g': numericColor,
    'fruits_vegetables_nuts_100g': numericColor,
    'collagen_meat_protein_ratio_100g': numericColor,
    'cocoa_100g': numericColor,
    'chlorophyl_100g': numericColor,
    'carbon_footprint_100g': numericColor,
    'nutrition_score_fr_100g': numericColor,
    'nutrition_score_uk_100g': numericColor,
};

var width = 1000;
var height = 600;

var barPadding = 1;

function clearSvg() {
    d3.select("#chart")
        .selectAll("*").remove();
}

function makeSvg() {
    clearSvg();
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width )
        .attr("height", height);
    return svg;
}

function makeLegend(svg) {
    for (i = 0; i < legends.length; i++) {
        svg.append("rect")
            .attr("x", 3 * width / 4 - 1)
            .attr("y", height / 8 + i * 30 - 1)
            .attr("width", 22)
            .attr("height", 22)
            .attr("stroke", "black")
            .attr("fill", "none");
        svg.append("rect")
            .attr("x", 3 * width / 4)
            .attr("y", height / 8 + i * 30)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", legends[i]['color']);
        svg.append("text")
            .text(legends[i]['legend'])
            .attr("x", 3 * width / 4 + 30)
            .attr("y", height / 8 + i * 30 + 14)
            .attr("fill", "black")
            .attr("font-family", "sans-serif")
            .attr("font-size", "13px");
    }
}

function makeBarChart(dataset) {
    var color = d3.scale.category20b();
    scaleY = d3.scale.linear()
        .domain([0, total])
        .range([0, height]);

    var svg = makeSvg();
    //makeGrid(svg);
    svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("x", function(d, i) {
            return i * (width / dataset.length);
        })
        .attr("y", function(d) {
            return scaleY(d['inv']);
        })
        .attr("width", width / dataset.length - barPadding)
        .attr("height", function(d) {
            return height - scaleY(d['inv']);
        })
        .attr("fill", function(d) {
            return columnColor[d['tag']];
        });
    makeLegend(svg);
}

makeBarChart(dataset);