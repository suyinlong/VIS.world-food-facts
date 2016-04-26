/*
* @Author: Yinlong Su
* @Date:   2016-04-26 00:16:15
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-04-26 02:28:33
*/

var total = 65486;
var dataset = [
    {"tag": "Additives", "count": 21822, "avg": 1469},
    {"tag": "Energy", "count": 29112, "avg": 7573},
    {"tag": "Fat", "count": 29124, "avg": 3757},
    {"tag": "Carbohydrates", "count": 29421, "avg": 5912},
    {"tag": "Sugars", "count": 32849, "avg": 4033},
    {"tag": "Fiber", "count": 42949, "avg": 1278},
    {"tag": "Proteins", "count": 29556, "avg": 2547},
    {"tag": "Salt", "count": 32578, "avg": 144},
    {"tag": "Sodium", "count": 32588, "avg": 143},
    {"tag": "Alcohol", "count": 63607, "avg": 5476}
];

var colorPicker = ['palegreen', 'lightskyblue', 'gold', 'tomato', 'lightslategray', 'aqua', 'limegreen', 'darkorange', 'khaki', 'salmon'];

var legends = [
    {"legend": "Additives", "color": colorPicker[0]},
    {"legend": "Energy", "color": colorPicker[1]},
    {"legend": "Fat", "color": colorPicker[2]},
    {"legend": "Carbohydrates", "color": colorPicker[3]},
    {"legend": "Sugars", "color": colorPicker[4]},
    {"legend": "Fiber", "color": colorPicker[5]},
    {"legend": "Proteins", "color": colorPicker[6]},
    {"legend": "Salt", "color": colorPicker[7]},
    {"legend": "Sodium", "color": colorPicker[8]},
    {"legend": "Alcohol", "color": colorPicker[9]}
];

var columnColor = {
    "Additives": colorPicker[0],
    "Energy": colorPicker[1],
    "Fat": colorPicker[2],
    "Carbohydrates": colorPicker[3],
    "Sugars": colorPicker[4],
    "Fiber": colorPicker[5],
    "Proteins": colorPicker[6],
    "Salt": colorPicker[7],
    "Sodium": colorPicker[8],
    "Alcohol": colorPicker[9]
};

var width = 600;
var height = 600;

var barPadding = 10;

function clearSvg() {
    d3.select("#chart")
        .selectAll("*").remove();
}

function makeSvg() {
    clearSvg();
    var svg = d3.select("#chart")
        .append("svg")
        .attr("width", width + 200)
        .attr("height", height);
    return svg;
}

function makeLegend(svg) {
    for (i = 0; i < legends.length; i++) {
        svg.append("rect")
            .attr("x", 3 * width / 4 - 1 + 200)
            .attr("y", height / 4 + i * 30 - 1)
            .attr("width", 22)
            .attr("height", 22)
            .attr("stroke", "black")
            .attr("fill", "none");
        svg.append("rect")
            .attr("x", 3 * width / 4 + 200)
            .attr("y", height / 4 + i * 30)
            .attr("width", 20)
            .attr("height", 20)
            .attr("fill", legends[i]['color']);
        svg.append("text")
            .text(legends[i]['legend'])
            .attr("x", 3 * width / 4 + 30 + 200)
            .attr("y", height / 4 + i * 30 + 14)
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

    defs = svg.append("defs");
    g1 = svg.append("g")
        .attr("id", "mainBar");
    g2 = svg.append("g")
        .attr("id", "subBar");
    t = svg.append("g")
        .attr("id", "text");


    for (i = 0; i < dataset.length; i++) {
        d = dataset[i];
        barX = i * (width / dataset.length);
        barY = height - scaleY(d['count']);
        barWidth = width / dataset.length - barPadding;
        barHeight = scaleY(d['count']);
        barColor = columnColor[d['tag']];

        p1 = (d['count'] / total * 100).toFixed(2) + "%";
        p2 = (d['avg'] / total * 100).toFixed(2) + "%";

        ct = d3.hsl(barColor);
        if (ct.l < 0.5)
            barStopColor = ct.brighter().brighter().toString();
        else
            barStopColor = ct.darker().darker().toString();

        subBarX = barX;
        subBarY = height - scaleY(d['avg']);
        subBarWidth = barWidth;
        subBarHeight = scaleY(d['avg']);

        lg = defs.append("linearGradient")
            .attr("id", "lg" + i)
            .attr("x1", "50%")
            .attr("y1", "50%")
            .attr("x2", "100%")
            .attr("y2", "0%");
        lg.append("stop")
            .attr("offset", "0%")
            .style("stop-color", barColor);
        lg.append("stop")
            .attr("offset", "100%")
            .style("stop-color", barStopColor);

        f = defs.append("filter")
            .attr("id", "f" + i)
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", "200%")
            .attr("height", "200%");
        f.append("feGaussianBlur")
            .attr("stdDeviation", 5)
            .attr("in", "SourceAlpha")
            .attr("result", "BLUR");
        s = f.append("feSpecularLighting")
            .attr("surfaceScale", 6)
            .attr("specularConstant", 1)
            .attr("specularExponent", 50)
            .attr("lighting-color", "#white")
            .attr("in", "BLUR")
            .attr("result", "SPECULAR");
        s.append("fePointLight")
            .attr("x", barX)
            .attr("y", barY - barHeight / 2)
            .attr("z", "200");
        f.append("feComposite")
            .attr("operator", "in")
            .attr("in", "SPECULAR")
            .attr("in2", "SourceAlpha")
            .attr("result", "COMPOSITE");
        m = f.append("feMerge");
        m.append("feMergeNode")
            .attr("in", "SourceGraphic");
        m.append("feMergeNode")
            .attr("in", "COMPOSITE");

        g1.append("rect")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("x", barX)
            .attr("y", barY)
            .attr("width", barWidth)
            .attr("height", barHeight)
            .attr("fill", "url(#" + lg.attr("id") + ")")
            .attr("filter", "url(#" + f.attr("id") + ")");

        g2.append("rect")
            .attr("rx", 10)
            .attr("ry", 10)
            .attr("x", subBarX)
            .attr("y", subBarY)
            .attr("width", subBarWidth)
            .attr("height", subBarHeight)
            .attr("fill", barStopColor)
            .attr("opacity", "0.3")
            .attr("filter", "url(#" + f.attr("id") + ")");

        t.append("text")
            .attr("x", barX + barWidth / 2)
            .attr("y", barY - 5)
            .attr("font-family", "sans-serif")
            .attr("font-size", "13px")
            .attr("text-anchor", "middle")
            .text(p1);

        t.append("text")
            .attr("x", barX + barWidth / 2)
            .attr("y", subBarY - 5)
            .attr("font-family", "sans-serif")
            .attr("font-size", "13px")
            .attr("text-anchor", "middle")
            .attr("stroke", "white")
            .attr("stroke-width", "2.3px")
            .attr("opacity", "0.5")
            .attr("fill", "black")
            .text(p2);
        t.append("text")
            .attr("x", barX + barWidth / 2)
            .attr("y", subBarY - 5)
            .attr("font-family", "sans-serif")
            .attr("font-size", "13px")
            .attr("text-anchor", "middle")
            .attr("fill", "black")
            .text(p2);

    }

    makeLegend(svg);
}
makeBarChart(dataset);