/*
* @Author: Yinlong Su
* @Date:   2016-05-11 19:51:57
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-05-11 22:15:46
*/

var browse_queryaddress = '/query';

var browse_country = 'all';
var browse_category = 'all';

var browse_image_width = 150;
var browse_image_height = 150;

var browse_details_columns = ['brands', 'origins', 'manufacturing_places', 'labels', 'cities', 'ingredients_text', 'allergens_en', 'additives_en', 'energy_100g'];

function $(id) { return document.getElementById(id); }

function browse_setCountry(country) {
    browse_country = country;
}

function browse_setCategory(category) {
    browse_category = category;
}
function browse_showHideDetails(idx) {
    sectionName = "sidebar-panel-browse-sub-body-section-" + idx;
    section = d3.select("#" + sectionName);
    if (section.attr("class") == "hidden") {
        section.attr("class","visible");
    } else {
        section.attr("class","hidden");
    }

}
function browse_update(data) {
    u = "<h1>Search Result: " + data.length + "</h1>";
    //u += "<h3>Country: " + browse_country + " Category: " + browse_category + "</h3>";
    u += "<div class='sidebar-panel-browse-sub-body'>"
    for (i = 0; i < data.length; i++) {
        sectionName = "sidebar-panel-browse-sub-body-section-" + i;


        u += "<table>";
        u += "<tr height='" + browse_image_height + "'>";
        u += "<td width='" + browse_image_width + "'>";
        if (data[i]['image_url'] != null)
            u += "<img width='" + browse_image_width + "' height='" + browse_image_height + "' src='" + data[i]['image_url'] + "'/>";
        u += "</td><td>";

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
    u += "</div>"
    $('sidebar-panel-browse-sub').innerHTML = u;
}

function browse_query() {
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