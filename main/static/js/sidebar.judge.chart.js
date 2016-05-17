/*
* @Author: Yinlong Su
* @Date:   2016-05-12 14:57:23
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-05-16 23:33:39
*/

// all animation duration
var judge_duration = 500;

// judge request addresses
var judge_queryAddress = '/query';
var judge_calculateAddress = '/calc';
var judge_suggestAddress = '/sug';

// auto update switch
var judge_update = 0;

// current country & category
var judge_country = 'all';
var judge_category = 'all';

// shopping list image size
var judge_list_image_width = 100;
var judge_list_image_height = 100;

// shopping cart image size
var judge_cart_image_width = 50;
var judge_cart_image_height = 50;

// detail columns
var judge_details_columns = ['brands', 'origins', 'manufacturing_places', 'labels', 'cities', 'ingredients_text', 'allergens_en', 'additives_en', 'energy_100g'];

// shopping cart
var judge_cart = [];
var judge_std_dataset = dataset_normalized_world;
var judge_cart_ori_dataset;
var judge_cart_nor_dataset;

// bar chart dataset labels
var judge_bar_dataset_label = ['Additives', 'Energy', 'Fat', 'Carbohydrates', 'Sugars', 'Fiber', 'Proteins', 'Salt', 'Sodium', 'Alcohol'];

// bar chart setting: width, height, frame, width scaler
var judge_bar_width = 320;
var judge_bar_height = 400;
var judge_bar_frame = 0;
var judge_bar_scaleW;

// bar chart transform -> move to spare some space
var judge_bar_transform = "translate(" + judge_bar_frame + ", " + (judge_bar_frame + 10) + ")";

// svg group def
var judge_bar_svg, judge_bar_g, judge_bar_data_g, judge_bar_std_g;

function $(id) { return document.getElementById(id); }

// clear judge svg layer
function judge_clearSvg(id) {
    d3.select("#" + id)
        .selectAll("*").remove();
}

// make new judge svg
function judge_makeSvg(id, width, height, frame) {
    judge_clearSvg(id);
    var newSvg = d3.select("#" + id)
        .append("svg")
        .attr("width", width + 2 * frame)
        .attr("height", height + 2 * frame);
    return newSvg;
}

// init bar chart to 0
function judge_initBarChart() {
    judge_cart_ori_dataset = dataset_10_empty;
    judge_cart_nor_dataset = dataset_10_empty;

    judge_bar_svg = judge_makeSvg("judge-body-data", judge_bar_width, judge_bar_height, judge_bar_frame);
    judge_bar_back_g = judge_bar_svg.append("g")
        .attr("id", "jbarBackGroup")
        .attr("transform", judge_bar_transform);
    judge_bar_g = judge_bar_svg.append("g")
        .attr("id", "jbarGroup")
        .attr("transform", judge_bar_transform);
    judge_bar_std_g = judge_bar_svg.append("g")
        .attr("id", "jbarStdGroup")
        .attr("transform", judge_bar_transform);
    judge_bar_text_g = judge_bar_svg.append("g")
        .attr("id", "jbarTextGroup")
        .attr("transform", judge_bar_transform);
    judge_bar_data_g = judge_bar_svg.append("g")
        .attr("id", "jbarDataGroup")
        .attr("transform", judge_bar_transform);
    judge_bar_scaleW = d3.scale.linear()
        .domain([0, 1])
        .range([0, judge_bar_width]);

    for (i = 0; i < judge_bar_dataset_label.length; i++) {
        judge_bar_text_g.append("text")
            .attr("x", 0)
            .attr("y", 40 * i)
            .text(judge_bar_dataset_label[i]);
        judge_bar_data_g.append("text")
            .attr("x", judge_bar_width)
            .attr("y", 40 * i)
            .attr("text-anchor", "end")
            .attr("id", "jl" + i)
            .text(dataset_10_empty[i].toFixed(2));
        judge_bar_back_g.append("rect")
            .attr("x", 0)
            .attr("y", 10 + 40 * i)
            .attr("width", judge_bar_scaleW(1))
            .attr("height", 10)
            .attr("class", "judge-body-data-bar-back");
    }

    judge_bar_g.selectAll("rect")
        .data(dataset_10_empty)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", function(d, i) {
            return 10 + 40 * i;
        })
        .attr("width", function(d) {
            return judge_bar_scaleW(d);
        })
        .attr("height", 10)
        .attr("fill", function(d, i) {
            return judge_barColor(d, i);
        })
        .attr("class", "judge-body-data-bar")
        .on("mouseover", function(d, i) {
            d3.select(this).transition().duration(judge_duration / 2).attr("fill", "orange");
        })
        .on("mouseout", function(d, i) {
            d3.select(this).transition().duration(judge_duration / 2).attr("fill", judge_barColor(d, i));
        });

    judge_bar_std_g.selectAll("rect")
        .data(dataset_normalized_world)
        .enter()
        .append("rect")
        .attr("id", function(d, i) {
            return "jb" + i;
        })
        .attr("x", function(d) {
            return judge_bar_scaleW(d) -5;
        })
        .attr("y", function(d, i) {
            return 10 + 40 * i;
        })
        .attr("width", 10)
        .attr("height", 10)
        .attr("class", "judge-body-data-bar-world")
        .on("mouseover", function(d, i) {
            //info_showPanelDatatip("b" + i, "World avg: " + dataset_original_world[i].toFixed(2));
        })
        .on("mouseout", function() {
            //info_hidePanelDatatip();
        });

}

// make/update bar chart
function judge_makeBarChart(ori_dataset, nor_dataset) {
    judge_bar_g.selectAll("rect").data(nor_dataset).transition()
        .duration(judge_duration)
        .ease("bounce")
        .attr("width", function(d) {
            return judge_bar_scaleW(d);
        })
        .attr("fill", function(d, i) {
            return judge_barColor(d, i);
        });
    for (i = 0; i < judge_bar_dataset_label.length; i++) {
        judge_bar_data_g.select("#jl" + i)
            .text(ori_dataset[i].toFixed(2));
    }
    //$('info-country-label').innerHTML = label + " .vs. World";
}

// update standard bars
function judge_makeCStandard(dataset) {
    judge_bar_std_g.selectAll("rect").data(dataset).transition()
        .duration(judge_duration)
        .ease("bounce")
        .attr("x", function(d) {
            return judge_bar_scaleW(d) -5;
        })
        .attr("y", function(d, i) {
            return 10 + 40 * i;
        });
}

// bar chart color picker
// set color according to the world average
function judge_barColor(d, i) {
    std_avg = judge_std_dataset[i];
    if (d >= std_avg - 0.2 && d <= std_avg + 0.2)
        return "limegreen";
    if (d < std_avg - 0.2)
        return "dodgerblue";
    if (d > std_avg + 0.2)
        return "orangered";
}



function judge_setCountry(country, element) {
    judge_country = country;

    for (i = 0; i < country_label.length; i++) {
        d3.select("#judge-country-" + i)
            .attr("class", "");
    }
    d3.select("#judge-country-world")
        .attr("class", "");

    d3.select("#" + element)
        .attr("class", "selected");

    $('judge-country-text').innerHTML = country;
    var cInfo = countryInfo[d3.select("#" + element).attr("short")];
    d3.select("#sidebar-panel-judge-sub-scales-left")
        .attr("style", "background-image: url(" + country_balladdress + cInfo['GLO'] + ");");

    if (judge_update == 1) {
        if (judge_category != 'suggest')
            judge_query();
        else
            judge_suggest();
    }

    judge_std_dataset = cInfo['DAT'];
    judge_makeCStandard(cInfo['DAT']);
    judge_makeBarChart(judge_cart_ori_dataset, judge_cart_nor_dataset);
}

function judge_setCategory(category, element) {
    judge_category = category;

    for (i = 0; i < categoryInfo.length; i++) {
        d3.select("#judge-category-" + i)
            .attr("class", "");
    }
    d3.select("#judge-category-all")
        .attr("class", "");

    d3.select("#" + element)
        .attr("class", "selected");

    //$('judge-category-text').innerHTML = category;
    if (judge_update == 1) {
        if (judge_category != 'suggest')
            judge_query();
        else
            judge_suggest();
    }
}

function judge_showHideDetails(idx) {
    sectionName = "judge-foodlist-body-section-" + idx;
    section = d3.select("#" + sectionName);
    if (section.attr("class") == "hidden") {
        section.attr("class","visible");
    } else {
        section.attr("class","hidden");
    }
}

function judge_initCountry() {
    var ul = d3.select("#judge-country")
        .append("ul");
    var li = ul.append("li")
        .attr("short", "world")
        .attr("label", "all")
        .attr("title", "World")
        .attr("id", "judge-country-world")
        .attr("style", "margin-left: auto; margin-right: auto; width: 68px; height: 48px; background-image: url(" + country_flagaddress + "000.gif); display: block;");
    li.on("click", function() {
        judge_setCountry(d3.select(this).attr("label"), d3.select(this).attr("id"));
    });

    for (i = 0; i < country_label.length; i++) {
        var li = ul.append("li")
            .attr("short", country_label[i])
            .attr("label", countryInfo[country_label[i]]['LAB'])
            .attr("title", countryInfo[country_label[i]]['LAB'])
            .attr("id", "judge-country-" + i)
            .attr("style", "background-image: url(" + country_flagaddress + countryInfo[country_label[i]]['FLG'] + ");");
        li.on("click", function() {
            judge_setCountry(d3.select(this).attr("label"), d3.select(this).attr("id"));
        });
    }
}


function judge_initCategory() {
    var ul = d3.select("#judge-category")
        .append("ul");
    var li = ul.append("li")
        .attr("label", "all")
        .attr("title", "All")
        .attr("id", "judge-category-all")
        .attr("style", "background-image: url(" + category_iconaddress + "category-00.png); margin-bottom: 20px;");
    li.on("click", function() {
        judge_setCategory(d3.select(this).attr("label"), d3.select(this).attr("id"));
    });
    for (i = 0; i < categoryInfo.length; i++) {
        var li = ul.append("li")
            .attr("label", categoryInfo[i]['LAB'])
            .attr("title", categoryInfo[i]['LAB'])
            .attr("id", "judge-category-" + i)
            .attr("style", "background-image: url(" + category_iconaddress + categoryInfo[i]['ICO'] + ");");
        li.on("click", function() {
            judge_setCategory(d3.select(this).attr("label"), d3.select(this).attr("id"));
        });
    }

    var li = ul.append("li")
        .attr("label", "suggest")
        .attr("title", "Suggestion")
        .attr("id", "judge-category-suggest")
        .attr("style", "background-image: url(" + category_iconaddress + "category-11.png); margin-top: 20px;");
    li.on("click", function() {
        judge_setCategory(d3.select(this).attr("label"), d3.select(this).attr("id"));
    });
}

function judge_query() {
    $('judge-foodlist-title').innerHTML = "- Waiting for the reply -";
    $('judge-foodlist-body').innerHTML = "Loading...";

    json_object = {'country': judge_country, 'category': judge_category};
    var fetchResponse = fetch(judge_queryAddress, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json_object)
    });

    fetchResponse.then((res) => res.json()).then(function(res) {
        judge_updateList(res);
    });
}

function judge_suggest() {
    $('judge-foodlist-title').innerHTML = "- Waiting for the reply -";
    $('judge-foodlist-body').innerHTML = "Loading...";

    cartCode = [];
    for (i = 0; i < judge_cart.length; i++)
        cartCode.push(judge_cart[i]['COD']);
    json_object = {'country': judge_country, 'cart': cartCode};

    var fetchResponse = fetch(judge_suggestAddress, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json_object)
    });

    fetchResponse.then((res) => res.json()).then(function(res) {
        judge_updateList(res);
    });
}

function judge_updateList(data) {
    //u = "<h1>Search Result: " + data.length + "</h1>";
    //u += "<h3>Country: " + browse_country + " Category: " + browse_category + "</h3>";
    u = ""
    for (i = 0; i < data.length; i++) {
        sectionName = "judge-foodlist-body-section-" + i;

        u += "<table>";
        u += "<tr height='" + judge_list_image_height + "'>";
        u += "<td width='" + judge_list_image_width + "'";
        if (data[i]['image_url'] != null)
            u += " style='background-image: url(" + data[i]['image_url'] + "); background-size: 100% 100%;'";
        u += "></td><td>";

        if (data[i]['product_name'] != null)
            u += "<strong>" + data[i]['product_name'] + "</strong>";
        u += "<ul>";
        //if (data[i]['categories_en'] != null)
        //    u += "<li>Categories: " + data[i]['categories_en'] + "</li>";
        if (data[i]['countries_en'] != null)
            u += "<li>Countries: " + data[i]['countries_en'] + "</li>";
        if (data[i]['nutrition_score_fr_100g'] != null)
            u += "<li>Nutrition Score: " + data[i]['nutrition_score_fr_100g'] + "</li>";


        u += "</ul>";

        u += "<a href='#' onclick='judge_addCart(\"" + data[i]['code'] + "\",\"" + data[i]['product_name'] + "\",\"" + data[i]['image_url'] + "\");'>Add to cart</a>";
        u += "<a href='#' onclick='judge_showHideDetails(" + i + ");'>Show/Hide details</a>";
        u += "</td></tr></table>";

        u += "<section class='hidden' id='" + sectionName + "'>";
        u += "<ul>";

        for (j = 0; j < judge_details_columns.length; j++) {
            if (data[i][judge_details_columns[j]] != null)
                u += "<li>" + judge_details_columns[j] + ": " + data[i][judge_details_columns[j]] + "</li>";
        }


        u += "</ul>";
        u += "</section>";
    }
    $('judge-foodlist-title').innerHTML = data.length;
    $('judge-foodlist-body').innerHTML = u;
}

function judge_addCart(code, name, url) {
    judge_cart.push({'COD': code, 'PRO': name, 'IMG': url});
    judge_updateCart();
}

function judge_delCart(idx) {
    judge_cart.splice(idx, 1);
    judge_updateCart();
}

function judge_updateCart() {
    u = ""
    for (i = 0; i < judge_cart.length; i++) {
        sectionName = "judge-foodcart-body-section-" + i;

        u += "<table>";
        u += "<tr height='" + judge_cart_image_height + "'>";
        u += "<td width='" + judge_cart_image_width + "'";
        if (judge_cart[i]['IMG'] != null)
            u += " style='background-image: url(" + judge_cart[i]['IMG'] + "); background-size: 100% 100%;'";
        u += "></td><td>";

        if (judge_cart[i]['PRO'] != null)
            u += "<strong>" + judge_cart[i]['PRO'] + "</strong>";
        u += "<a href='#' onclick='judge_delCart(" + i + ");'>[Remove]</a>"
        u += "</td></tr></table>";
    }
    $('judge-foodcart-title').innerHTML = judge_cart.length;
    $('judge-foodcart-body').innerHTML = u;

    judge_calculate();
}

function judge_calculate() {
    json_object = [];
    for (i = 0; i < judge_cart.length; i++)
        json_object.push(judge_cart[i]['COD']);

    var fetchResponse = fetch(judge_calculateAddress, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json_object)
    });

    fetchResponse.then((res) => res.json()).then(function(res) {
        judge_updateBarChart(res);
    });
}

function judge_updateBarChart(data) {
    judge_cart_ori_dataset = data['ORI'];
    judge_cart_nor_dataset = data['NOR'];
    judge_makeBarChart(data['ORI'], data['NOR']);

    $('judge-body-text').innerHTML = data['TYP'];
}

judge_initBarChart();


judge_initCountry();
judge_initCategory();
judge_setCountry('United States', 'judge-country-49');
judge_setCategory('Plant-based foods and beverages', 'judge-category-0');
judge_update = 1;
judge_query();
