/*
* @Author: Yinlong Su
* @Date:   2016-05-12 14:57:23
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-05-12 19:35:41
*/
var judge_queryaddress = '/query';
var judge_update = 0;

var judge_country = 'all';
var judge_category = 'all';

var judge_list_image_width = 100;
var judge_list_image_height = 100;

var judge_cart_image_width = 50;
var judge_cart_image_height = 50;

var judge_details_columns = ['brands', 'origins', 'manufacturing_places', 'labels', 'cities', 'ingredients_text', 'allergens_en', 'additives_en', 'energy_100g'];

var judge_cart = [];

function $(id) { return document.getElementById(id); }

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
    var glo = countryInfo[d3.select("#" + element).attr("short")]['GLO'];
    d3.select("#sidebar-panel-judge-sub-scales-left")
        .attr("style", "background-image: url(" + country_balladdress + glo + ");");

    if (judge_update == 1)
        judge_query();
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
    if (judge_update == 1)
        judge_query();
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
}

function judge_query() {
    $('judge-foodlist-title').innerHTML = "- Waiting for the reply -";
    $('judge-foodlist-body').innerHTML = "Loading...";

    json_object = {'country': judge_country, 'category': judge_category};
    var fetchResponse = fetch(judge_queryaddress, {
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

        u += "<a href='#' onclick='judge_addCart(" + data[i]['code'] + ",\"" + data[i]['product_name'] + "\",\"" + data[i]['image_url'] + "\");'>Add to cart</a>";
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

        u += "</td></tr></table>";
    }
    $('judge-foodcart-title').innerHTML = judge_cart.length;
    $('judge-foodcart-body').innerHTML = u;
}

judge_initCountry();
judge_initCategory();
judge_setCountry('United States', 'judge-country-49');
judge_setCategory('Plant-based foods and beverages', 'judge-category-0');
judge_update = 1;
judge_query();