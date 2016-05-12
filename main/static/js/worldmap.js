/*
* @Author: Yinlong Su
* @Date:   2016-04-26 17:42:43
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-05-11 19:52:46
*/

var worldmap_color_pairs = [
    { a: d3.rgb("Pink"), b: d3.rgb("Crimson")},
    { a: d3.rgb("LightCyan"), b: d3.rgb("MidnightBlue")},
    { a: d3.rgb("LightGreen"), b: d3.rgb("DarkGreen")},
    { a: d3.rgb("LightYellow"), b: d3.rgb("DarkGoldenrod")},
];

var worldmap_color_index = 0;
var worldmap_colors;

var worldmap_duration = 10;
var worldmap_update_timer;

var worldmap_autoplay_time = 3000;
var worldmap_autoplay_on = 0;
var worldmap_autoplay_timer;

var worldmap_legend_view = 0;
var worldmap_legend_view_items = ['legend-view-item-additives', 'legend-view-item-energy', 'legend-view-item-fat', 'legend-view-item-carbohydrates', 'legend-view-item-sugars', 'legend-view-item-fiber', 'legend-view-item-proteins', 'legend-view-item-salt', 'legend-view-item-sodium', 'legend-view-item-alcohol']

var worldmap_attr = 0;

var map = new Datamap({
    scope: 'world',
    element: document.getElementById("map-view"),
    projection: 'mercator',
    height: 700,
    fills: {
        defaultFill: '#FFFFFF',
    },
    geographyConfig: {
        borderColor: '#333333',
        borderOpacity: 1.0,
        popupTemplate: function(geography, data) {
            var tip = '<div class="map-tip"><strong>' + geography.properties.name + '</strong>';

            if (countryInfo[geography.id]) {
                tip += '<br/>' + dataset_label[worldmap_attr] + ': ';
                tip += countryInfo[geography.id]['DAT'][worldmap_attr].toFixed(2);
            }
            tip += '</div>';
            return tip;
        }
    },
    done: function(datamap) {
        callbackMap(datamap);
    }
});

function callbackMap(datamap) {
    datamap.svg.selectAll('.datamaps-subunit')
        .on('click', function(geography) {
            //alert(geography.properties.name);
            clickMapPopup(geography.id);
        });

}

function fillMapRegion(i, attr) {
    countryName = country_label[i];
    if (countryInfo[countryName]) {
        d = countryInfo[countryName]['DAT'][attr];
        item = {};
        item[countryName] = worldmap_colors[worldmap_color_index](d);
        map.updateChoropleth(item);
    }

    if (i < country_label.length)
        worldmap_update_timer = setTimeout(fillMapRegion, worldmap_duration, i + 1, attr);
}

function updateMap(attr) {
    clearTimeout(worldmap_update_timer);
    worldmap_attr = attr;
    worldmap_legend_view = attr;

    for (i = 0; i < worldmap_legend_view_items.length; i++) {
        d3.select("#" + worldmap_legend_view_items[i]).attr("class", "legend-view-item");
    }
    d3.select("#" + worldmap_legend_view_items[attr]).attr("class", "legend-view-item legend-view-item-selected");
    fillMapRegion(0, attr);
}

function updateMapNextAttribute() {
    worldmap_legend_view = (worldmap_legend_view + 1) % worldmap_legend_view_items.length;
    updateMap(worldmap_legend_view);
}

function switchAutoplay() {
    if (worldmap_autoplay_on == 1) {
        worldmap_autoplay_on = 0;
        clearInterval(worldmap_autoplay_timer);
        d3.select("#legend-view-autoplay")
            .attr("class", "legend-view-autoplay");
    } else {
        worldmap_autoplay_on = 1;
        worldmap_autoplay_timer =  setInterval(updateMapNextAttribute, worldmap_autoplay_time);
        d3.select("#legend-view-autoplay")
            .attr("class", "legend-view-autoplay selected");
    }
}



function initWorldMap() {
    worldmap_colors = [];
    for (i = 0; i < worldmap_color_pairs.length; i++) {
        worldmap_colors.push(d3.interpolate(worldmap_color_pairs[i].a, worldmap_color_pairs[i].b));
    }

    worldmap_color_index = 0;
    worldmap_legend_view = 0;
    updateMap(worldmap_legend_view);
    switchAutoplay();
}




d3.select("#legend-view-item-additives").on("click", function() {
    updateMap(0);
});
d3.select("#legend-view-item-energy").on("click", function() {
    updateMap(1);
});
d3.select("#legend-view-item-fat").on("click", function() {
    updateMap(2);
});
d3.select("#legend-view-item-carbohydrates").on("click", function() {
    updateMap(3);
});
d3.select("#legend-view-item-sugars").on("click", function() {
    updateMap(4);
});
d3.select("#legend-view-item-fiber").on("click", function() {
    updateMap(5);
});
d3.select("#legend-view-item-proteins").on("click", function() {
    updateMap(6);
});
d3.select("#legend-view-item-salt").on("click", function() {
    updateMap(7);
});
d3.select("#legend-view-item-sodium").on("click", function() {
    updateMap(8);
});
d3.select("#legend-view-item-alcohol").on("click", function() {
    updateMap(9);
});

d3.select("#legend-view-autoplay").on("click", function() {
    switchAutoplay();
})


initWorldMap();
