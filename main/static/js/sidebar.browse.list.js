/*
* @Author: Yinlong Su
* @Date:   2016-05-11 19:51:57
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-05-12 19:22:39
*/

var browse_queryaddress = '/query';

var browse_country = 'all';
var browse_category = 'all';

var browse_image_width = 160;
var browse_image_height = 160;

var browse_details_columns = ['brands', 'origins', 'manufacturing_places', 'labels', 'cities', 'ingredients_text', 'allergens_en', 'additives_en', 'energy_100g'];

function $(id) { return document.getElementById(id); }

function browse_setCountry(country, element) {
    browse_country = country;

    for (i = 0; i < country_label.length; i++) {
        d3.select("#browse-country-" + i)
            .attr("class", "");
    }
    d3.select("#browse-country-world")
        .attr("class", "");

    d3.select("#" + element)
        .attr("class", "selected");

    $('browse-country-text').innerHTML = country;
}

function browse_setCategory(category, element) {
    browse_category = category;

    for (i = 0; i < categoryInfo.length; i++) {
        d3.select("#browse-category-" + i)
            .attr("class", "");
    }
    d3.select("#browse-category-all")
        .attr("class", "");

    d3.select("#" + element)
        .attr("class", "selected");

    $('browse-category-text').innerHTML = category;
}

function browse_showHideDetails(idx) {
    sectionName = "browse-foodlist-body-section-" + idx;
    section = d3.select("#" + sectionName);
    if (section.attr("class") == "hidden") {
        section.attr("class","visible");
    } else {
        section.attr("class","hidden");
    }
}

function browse_update(data) {
    //u = "<h1>Search Result: " + data.length + "</h1>";
    //u += "<h3>Country: " + browse_country + " Category: " + browse_category + "</h3>";
    u = ""
    for (i = 0; i < data.length; i++) {
        sectionName = "browse-foodlist-body-section-" + i;


        u += "<table>";
        u += "<tr height='" + browse_image_height + "'>";
        u += "<td width='" + browse_image_width + "'";
        if (data[i]['image_url'] != null)
            u += " style='background-image: url(" + data[i]['image_url'] + "); background-size: 100% 100%;'";
        u += "></td><td>";

        if (data[i]['product_name'] != null)
            u += "<strong>" + data[i]['product_name'] + "</strong>";
        u += "<ul>";
        if (data[i]['categories_en'] != null)
            u += "<li>Categories: " + data[i]['categories_en'] + "</li>";
        if (data[i]['countries_en'] != null)
            u += "<li>Countries: " + data[i]['countries_en'] + "</li>";
        if (data[i]['nutrition_score_fr_100g'] != null)
            u += "<li>Nutrition Score: " + data[i]['nutrition_score_fr_100g'] + "</li>";


        u += "</ul>";

        u += "<a href='#' onclick='browse_showHideDetails(" + i + ");'>Show/Hide details</a>";
        u += "</td></tr></table>";

        u += "<section class='hidden' id='" + sectionName + "'>";
        u += "<ul>";

        for (j = 0; j < browse_details_columns.length; j++) {
            if (data[i][browse_details_columns[j]] != null)
                u += "<li>" + browse_details_columns[j] + ": " + data[i][browse_details_columns[j]] + "</li>";
        }


        u += "</ul>";
        u += "</section>";
    }
    $('browse-foodlist-title').innerHTML = data.length;
    $('browse-foodlist-body').innerHTML = u;
}

function browse_query() {
    $('browse-foodlist-title').innerHTML = "- Waiting for the reply -";
    $('browse-foodlist-body').innerHTML = "Loading...";
    showSidebarSection("sidebar-panel-browse-sub");

    json_object = {'country': browse_country, 'category': browse_category};
    var fetchResponse = fetch(browse_queryaddress, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json_object)
    });

    fetchResponse.then((res) => res.json()).then(function(res) {
        browse_update(res);
    });
}

function browse_initCountry() {
    var ul = d3.select("#browse-country")
        .append("ul");
    var li = ul.append("li")
        .attr("label", "all")
        .attr("title", "World")
        .attr("id", "browse-country-world")
        .attr("style", "margin-left: auto; margin-right: auto; width: 68px; height: 48px; background-image: url(" + country_flagaddress + "000.gif); display: block;");
    li.on("click", function() {
        browse_setCountry(d3.select(this).attr("label"), d3.select(this).attr("id"));
    });

    for (i = 0; i < country_label.length; i++) {
        var li = ul.append("li")
            .attr("label", countryInfo[country_label[i]]['LAB'])
            .attr("title", countryInfo[country_label[i]]['LAB'])
            .attr("id", "browse-country-" + i)
            .attr("style", "background-image: url(" + country_flagaddress + countryInfo[country_label[i]]['FLG'] + ");");
        li.on("click", function() {
            browse_setCountry(d3.select(this).attr("label"), d3.select(this).attr("id"));
        });
    }
}

function browse_initCategory() {
    var ul = d3.select("#browse-category")
        .append("ul");
    var li = ul.append("li")
        .attr("label", "all")
        .attr("title", "All")
        .attr("id", "browse-category-all")
        .attr("style", "background-image: url(" + category_iconaddress + "category-00.png); display: block;");
    li.on("click", function() {
        browse_setCategory(d3.select(this).attr("label"), d3.select(this).attr("id"));
    });
    for (i = 0; i < categoryInfo.length; i++) {
        var li = ul.append("li")
            .attr("label", categoryInfo[i]['LAB'])
            .attr("title", categoryInfo[i]['LAB'])
            .attr("id", "browse-category-" + i)
            .attr("style", "background-image: url(" + category_iconaddress + categoryInfo[i]['ICO'] + ");");
        li.on("click", function() {
            browse_setCategory(d3.select(this).attr("label"), d3.select(this).attr("id"));
        });
    }
}

d3.select("#sidebar-panel-browse-button")
    .on("click", function() {
        browse_query();
    });

browse_initCountry();
browse_initCategory();
browse_setCategory('Plant-based foods and beverages', 'browse-category-0');
browse_setCountry('United States', 'browse-country-49');