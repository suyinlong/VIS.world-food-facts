/*
* @Author: Yinlong Su
* @Date:   2016-04-27 01:22:30
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-04-27 13:44:12
*/




var colorPicker = ['#2375F3', 'lightskyblue', 'gold', 'tomato', 'lightslategray', 'aqua', 'limegreen', 'darkorange', 'khaki', 'salmon'];


var colorComparePicker = ['tomato', 'gold', 'lightskyblue'];

var frame = 10;
var width = 580;
var height = 470;

var barPadding = 10;

var oldCountryCount, countryCount, currentIndex;
var scaleY;
var svg, defs, g0, g1, g2, g3, t;

function clearSvg() {
    d3.select("#popup-panel-chart")
        .selectAll("*").remove();
}

function makeSvg() {
    clearSvg();
    var newSvg = d3.select("#popup-panel-chart")
        .append("svg")
        .attr("width", width + 2 * frame)
        .attr("height", height + 2 * frame);
    return newSvg;
}

function makeGrid() {
    grid = svg.append("g")
        .attr("id", "grid")
        .attr("stroke", "#f0f0f0");
    grid.append("line")
        .attr("x1", frame)
        .attr("x2", width + frame)
        .attr("y1", frame)
        .attr("y2", frame)
        .attr("class", "popup-panel-chart-grid");
    grid.append("line")
        .attr("x1", frame)
        .attr("x2", width + frame)
        .attr("y1", frame + height / 4)
        .attr("y2", frame + height / 4)
        .attr("class", "popup-panel-chart-grid");
    grid.append("line")
        .attr("x1", frame)
        .attr("x2", width + frame)
        .attr("y1", frame + height / 2)
        .attr("y2", frame + height / 2)
        .attr("class", "popup-panel-chart-grid");
    grid.append("line")
        .attr("x1", frame)
        .attr("x2", width + frame)
        .attr("y1", frame + 3 * height / 4)
        .attr("y2", frame + 3 * height / 4)
        .attr("class", "popup-panel-chart-grid");
    grid.append("line")
        .attr("x1", frame)
        .attr("x2", width + frame)
        .attr("y1", height + frame)
        .attr("y2", height + frame)
        .attr("class", "popup-panel-chart-grid");
}

function initPanelChart() {
    scaleY = d3.scale.linear()
        .domain([0, 1])
        .range([0, height]);

    svg = makeSvg();
    makeGrid();
    defs = svg.append("defs");
    g0 = svg.append("g")
        .attr("id", "mainLine");
    g1 = svg.append("g")
        .attr("id", "mainBar1");
    g2 = svg.append("g")
        .attr("id", "mainBar2");
    g3 = svg.append("g")
        .attr("id", "mainBar3");
    t = svg.append("g")
        .attr("id", "text");

    oldCountryCount = 0;
    countryCount = 0;
    currentIndex = 0;

    initLineChart();
    initBarChart();
}

function initLineChart() {
    var dots = [];
    for (i = 0; i < dataset_world.length; i++) {
        dx = i * ((width + barPadding) / dataset_world.length) + frame + ((width + barPadding) / dataset_world.length - barPadding) / 2;
        dy = height - scaleY(dataset_world[i]) + frame;
        dots.push({ x: dx, y: dy });
    }

    for (i = 0; i < dots.length - 1; i++) {
        g0.append("path")
            .attr("stroke", "#ffd800")
            .attr("stroke-width", "5px")
            .attr("fill", "none")
            .attr("d", "M" + dots[i].x + "," + dots[i].y + "L" + dots[i+1].x + "," + dots[i+1].y);
    }
    for (i = 0; i < dots.length; i++) {
        g0.append("circle")
            .attr("cx", dots[i].x)
            .attr("cy", dots[i].y)
            .attr("r", 10)
            .attr("fill", "#ffd800")
            .on("mouseover", function() {
                d3.select(this).transition().duration(200).attr("r", 20).attr("fill", "orange");
            })
            .on("mouseout", function() {
                d3.select(this).transition().duration(200).attr("r", 10).attr("fill", "#ffd800");
            });
    }
}

function initBarChart() {
    makeBarGroup(1, dataset_length);
    makeBarGroup(2, dataset_length);
    makeBarGroup(3, dataset_length);
}

function makeBarGroup(group, length) {
    var g = group == 1 ? g1 : (group == 2 ? g2 : g3);

    barColor = colorComparePicker[group - 1];
    ct = d3.hsl(barColor);
    if (ct.l < 0.5)
        barStopColor = ct.brighter().brighter().toString();
    else
        barStopColor = ct.darker().darker().toString();
    lg = defs.append("linearGradient")
        .attr("id", "lg_g" + group)
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

    for (i = 0; i < length; i++) {
        d = 0; // should be 0

        barX = i * ((width + barPadding) / length) + frame;
        barY = height - scaleY(d) + frame;
        barWidth = (width + barPadding) / length - barPadding;
        barHeight = scaleY(d);



        f = defs.append("filter")
            .attr("id", "f_g" + group + "n" + i)
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
            .attr("id", "f_g" + group + "n" + i + "_pointlight")
            .attr("x", barX + barWidth / 2)
            .attr("y", barY - 80)
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

        g.append("rect")
            .attr("id", "rect_g" + group + "n" + i)
            .attr("rx", 3)
            .attr("ry", 3)
            .attr("x", barX)
            .attr("y", barY)
            .attr("width", barWidth)
            .attr("height", barHeight)
            .attr("opacity", "0.7")
            .attr("fill", "url(#" + lg.attr("id") + ")")
            .attr("filter", "url(#" + f.attr("id") + ")")
            .attr("pointlight", "f_g" + group + "n" + i + "_pointlight");

    }
}

function adjustBarXAndWidth(g, group, length, delay) {
    for (i = 0; i < length; i++) {
        barX = i * ((width + barPadding) / length) + frame;
        barWidth = (width + barPadding) / length - barPadding;
        barWidth = barWidth / countryCount;
        barX += (group - 1) * barWidth;

        rect = g.select("#rect_g" + group + "n" + i);
        rect.transition()
            .delay(delay)
            .duration(500)
            .attr("x", barX)
            .attr("width", barWidth);
        defs.select("#" + rect.attr("pointlight"))
            .transition()
            .delay(delay)
            .attr("x", barX + barWidth / 2);
    }
}

function updateBarChartPosition(length, delay) {
    // updateBarChartPosition: Country 1
    adjustBarXAndWidth(g1, 1, length, delay);

    // updateBarChartPosition: Country 2
    if (countryCount >= 2)
        adjustBarXAndWidth(g2, 2, length, delay);

    // updateBarChartPosition: Country 3
    if (countryCount >= 3)
        adjustBarXAndWidth(g3, 3, length, delay);

    oldCountryCount = countryCount;
}

function updateBarChartValue(group, dataset, delay) {
    var g = group == 1 ? g1 : (group == 2 ? g2 : g3);

    for (i = 0; i < dataset.length; i++) {
        d = dataset[i];

        barY = height - scaleY(d) + frame;
        barHeight = scaleY(d);

        rect = g.select("#rect_g" + group + "n" + i);
        rect.transition()
            .delay(delay)
            .duration(500)
            .attr("y", barY)
            .attr("height", barHeight);

        defs.select("#" + rect.attr("pointlight"))
            .transition()
            .delay(delay)
            .attr("y", barY - 80);
    }

}


function makeBarChart(op, dataset) {
    if (op == 'change' && countryCount > 0)
        updateBarChartValue(currentIndex, dataset, 0);
    else if (op == 'add' || op == 'change') {
        if (countryCount == 3) {
            updateBarChartValue(currentIndex, dataset, 0);
        } else {
            countryCount++;
            currentIndex++;
            updateBarChartPosition(dataset.length, 0);
            if (countryCount == 1)
                updateBarChartValue(currentIndex, dataset, 0);
            else
                updateBarChartValue(currentIndex, dataset, 500);
        }
    } else if (op == 'remove' && countryCount > 0) {
        countryCount--;
        updateBarChartValue(currentIndex, dataset_10_empty, 0);
        currentIndex--;
        if (countryCount > 0)
            updateBarChartPosition(dataset.length, 500);
    }
}
initPanelChart();