/*
* @Author: Yinlong Su
* @Date:   2016-04-26 17:42:43
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-04-27 18:26:20
*/

var map = new Datamap({
    scope: 'world',
    element: document.getElementById("views"),
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

