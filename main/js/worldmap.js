/*
* @Author: Yinlong Su
* @Date:   2016-04-26 17:42:43
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-04-28 15:48:40
*/

var map = new Datamap({
    scope: 'world',
    element: document.getElementById("map-view"),
    projection: 'mercator',
    height: 700,
    fills: {
        defaultFill: '#999999',
        available1: '#f0af0a',
        available2: 'lightskyblue',
        available3: 'tomato'
    },
    data: {
        USA: {fillKey: 'available1'},
        CHN: {fillKey: 'available3'},
        FRA: {fillKey: 'available2'}
    },
    done: function(datamap) {
        callback_map(datamap);
    }
});

function callback_map(datamap) {
    datamap.svg.selectAll('.datamaps-subunit')
        .on('click', function(geography) {
            //alert(geography.properties.name);
            clickMapPopup(geography.id);
        });
}

function update_map(attr) {
    alert(attr);
    var colors = d3.scale.category20();
    map.updateChoropleth({
        CHN: colors(Math.random() * 100),
        FRA: colors(Math.random() * 1000),
        USA: colors(Math.random() * 10000)
    });
}

d3.select("#legend-view-item-additives").on("click", function() {
    update_map('ADD');
});
d3.select("#legend-view-item-energy").on("click", function() {
    update_map('ENE');
});
d3.select("#legend-view-item-fat").on("click", function() {
    update_map('FAT');
});
d3.select("#legend-view-item-carbohydrates").on("click", function() {
    update_map('CAR');
});
d3.select("#legend-view-item-sugars").on("click", function() {
    update_map('SUG');
});
d3.select("#legend-view-item-fiber").on("click", function() {
    update_map('FIB');
});
d3.select("#legend-view-item-proteins").on("click", function() {
    update_map('PRO');
});
d3.select("#legend-view-item-salt").on("click", function() {
    update_map('SAL');
});
d3.select("#legend-view-item-sodium").on("click", function() {
    update_map('SOD');
});
d3.select("#legend-view-item-alcohol").on("click", function() {
    update_map('ALC');
});
