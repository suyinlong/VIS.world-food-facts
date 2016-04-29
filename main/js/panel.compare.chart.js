/*
* @Author: Yinlong Su
* @Date:   2016-04-27 01:22:30
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-04-29 14:05:44
*/

var colorPicker = ['#2375F3', 'lightskyblue', 'gold', 'tomato', 'lightslategray', 'aqua', 'limegreen', 'darkorange', 'khaki', 'salmon'];
var compare_colorPicker = ['tomato', 'gold', 'lightskyblue'];

var compare_width = 580;
var compare_height = 470;
var compare_frame = 10;

var compare_barPadding = 10;

var compare_oldCountryCount, compare_countryCount, compare_currentIndex;
var compare_scaleY;
var compare_svg, compare_defs, compare_g0, compare_g1, compare_g2, compare_g3, compare_t;

function compare_clearSvg() {
    d3.select("#compare-chart")
        .selectAll("*").remove();
}

function compare_makeSvg() {
    compare_clearSvg();
    var newSvg = d3.select("#compare-chart")
        .append("svg")
        .attr("width", compare_width + 2 * compare_frame)
        .attr("height", compare_height + 2 * compare_frame);
    return newSvg;
}

function compare_makeGrid() {
    var grid = compare_svg.append("g")
        .attr("id", "grid")
        .attr("stroke", "#f0f0f0");
    grid.append("line")
        .attr("x1", compare_frame)
        .attr("x2", compare_width + compare_frame)
        .attr("y1", compare_frame)
        .attr("y2", compare_frame)
        .attr("class", "compare-chart-grid");
    grid.append("line")
        .attr("x1", compare_frame)
        .attr("x2", compare_width + compare_frame)
        .attr("y1", compare_frame + compare_height / 4)
        .attr("y2", compare_frame + compare_height / 4)
        .attr("class", "compare-chart-grid");
    grid.append("line")
        .attr("x1", compare_frame)
        .attr("x2", compare_width + compare_frame)
        .attr("y1", compare_frame + compare_height / 2)
        .attr("y2", compare_frame + compare_height / 2)
        .attr("class", "compare-chart-grid");
    grid.append("line")
        .attr("x1", compare_frame)
        .attr("x2", compare_width + compare_frame)
        .attr("y1", compare_frame + 3 * compare_height / 4)
        .attr("y2", compare_frame + 3 * compare_height / 4)
        .attr("class", "compare-chart-grid");
    grid.append("line")
        .attr("x1", compare_frame)
        .attr("x2", compare_width + compare_frame)
        .attr("y1", compare_height + compare_frame)
        .attr("y2", compare_height + compare_frame)
        .attr("class", "compare-chart-grid");
}

function compare_initPanelChart() {
    compare_scaleY = d3.scale.linear()
        .domain([0, 1])
        .range([0, compare_height]);

    compare_svg = compare_makeSvg();
    compare_makeGrid();
    compare_defs = compare_svg.append("defs");
    compare_g0 = compare_svg.append("g")
        .attr("id", "mainLine");
    compare_g1 = compare_svg.append("g")
        .attr("id", "mainBar1");
    compare_g2 = compare_svg.append("g")
        .attr("id", "mainBar2");
    compare_g3 = compare_svg.append("g")
        .attr("id", "mainBar3");
    compare_t = compare_svg.append("g")
        .attr("id", "text");

    compare_oldCountryCount = 0;
    compare_countryCount = 0;
    compare_currentIndex = 0;

    compare_initLineChart();
    compare_initBarChart();
}

function compare_initLineChart() {
    var dots = [];
    for (i = 0; i < dataset_normalized_world.length; i++) {
        dx = i * ((compare_width + compare_barPadding) / dataset_normalized_world.length) + compare_frame + ((compare_width + compare_barPadding) / dataset_normalized_world.length - compare_barPadding) / 2;
        dy = compare_height - compare_scaleY(dataset_normalized_world[i]) + compare_frame;
        dots.push({ x: dx, y: dy });
    }

    for (i = 0; i < dots.length - 1; i++) {
        compare_g0.append("path")
            .attr("stroke", "#ffd800")
            .attr("stroke-width", "5px")
            .attr("fill", "none")
            .attr("d", "M" + dots[i].x + "," + dots[i].y + "L" + dots[i+1].x + "," + dots[i+1].y);
    }
    for (i = 0; i < dots.length; i++) {
        compare_g0.append("circle")
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

function compare_initBarChart() {
    compare_makeBarGroup(1, dataset_length);
    compare_makeBarGroup(2, dataset_length);
    compare_makeBarGroup(3, dataset_length);
}

function compare_makeBarGroup(group, length) {
    var g = group == 1 ? compare_g1 : (group == 2 ? compare_g2 : compare_g3);

    barColor = compare_colorPicker[group - 1];
    ct = d3.hsl(barColor);
    if (ct.l < 0.5)
        barStopColor = ct.brighter().brighter().toString();
    else
        barStopColor = ct.darker().darker().toString();
    lg = compare_defs.append("linearGradient")
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

        barX = i * ((compare_width + compare_barPadding) / length) + compare_frame;
        barY = compare_height - compare_scaleY(d) + compare_frame;
        barWidth = (compare_width + compare_barPadding) / length - compare_barPadding;
        barHeight = compare_scaleY(d);

        f = compare_defs.append("filter")
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
            .attr("_fill", "url(#" + lg.attr("id") + ")")
            .attr("fill", "url(#" + lg.attr("id") + ")")
            .attr("filter", "url(#" + f.attr("id") + ")")
            .attr("pointlight", "f_g" + group + "n" + i + "_pointlight");

    }
}

function compare_adjustBarXAndWidth(g, group, length, delay) {
    for (i = 0; i < length; i++) {
        barX = i * ((compare_width + compare_barPadding) / length) + compare_frame;
        barWidth = (compare_width + compare_barPadding) / length - compare_barPadding;
        barWidth = barWidth / compare_countryCount;
        barX += (group - 1) * barWidth;

        rect = g.select("#rect_g" + group + "n" + i);
        rect.transition()
            .delay(delay)
            .duration(500)
            .attr("x", barX)
            .attr("width", barWidth);
        compare_defs.select("#" + rect.attr("pointlight"))
            .transition()
            .delay(delay)
            .attr("x", barX + barWidth / 2);
    }
}

function compare_updateBarChartPosition(length, delay) {
    // updateBarChartPosition: Country 1
    compare_adjustBarXAndWidth(compare_g1, 1, length, delay);

    // updateBarChartPosition: Country 2
    if (compare_countryCount >= 2)
        compare_adjustBarXAndWidth(compare_g2, 2, length, delay);

    // updateBarChartPosition: Country 3
    if (compare_countryCount >= 3)
        compare_adjustBarXAndWidth(compare_g3, 3, length, delay);

    compare_oldCountryCount = compare_countryCount;
}

function compare_updateBarChartValue(group, id, dataset, delay) {
    var g = group == 1 ? compare_g1 : (group == 2 ? compare_g2 : compare_g3);
    var d, l;
    for (i = 0; i < dataset.length; i++) {
        d = dataset[i];
        l = dataset_label[i];

        barY = compare_height - compare_scaleY(d) + compare_frame;
        barHeight = compare_scaleY(d);

        rect = g.select("#rect_g" + group + "n" + i);
        rect.attr("label", l)
            .attr("d", d)
            .on("mouseover", function() {
                compare_loadCountryData(id);
                compare_showBarDatatip(d3.select(this), id);
                d3.select(this).attr("fill", "orange");
            })
            .on("mouseout", function() {
                panel_compare_chart_datatip.style("opacity", 0.0);
                d3.select(this).attr("fill", d3.select(this).attr("_fill"));
            });
        rect.transition()
            .delay(delay)
            .duration(500)
            .attr("y", barY)
            .attr("height", barHeight);

        compare_defs.select("#" + rect.attr("pointlight"))
            .transition()
            .delay(delay)
            .attr("y", barY - 80);
    }

}

// show panel chart tooltip (only for bars)
function compare_showBarDatatip(rect, id) {

    _left = parseFloat($('shadow-compare').offsetLeft) + parseFloat(rect.attr("x")) + parseFloat(rect.attr("width") / 2) - 60 + 5;
    _top = parseFloat($('shadow-compare').offsetTop) + parseFloat(rect.attr("y")) - 80;
    panel_compare_chart_datatip.html(id + "<br/><strong>" + rect.attr("label") + "</strong><br/>" + parseFloat(rect.attr("d")).toFixed(2))
        .style("left", _left + "px")
        .style("top", _top + "px")
        .style("opacity", 0.9);
}

// load country data to the panel
function compare_loadCountryData(id) {
    cInfo = countryInfo[id];
    if (cInfo) {
        d3.select(".compare-picture")
            .attr("style", "background-image: url(" + cInfo['PIC'] + ");");
        $("compare-location").innerHTML = cInfo['LAB'];
        $("compare-description").innerHTML = cInfo['DES'];
        return cInfo['DAT'];
    }
    return cInfo;
}

function compare_makeBarChart(id, op) {
    if (compare_loadCountryData(id))
        dataset = countryInfo[id]['DAT'];
    else
        dataset = dataset_10_empty;

    if (op == 'change' && compare_countryCount > 0)
        compare_updateBarChartValue(compare_currentIndex, id, dataset, 0);
    else if (op == 'add' || op == 'change') {
        if (compare_countryCount == 3) {
            compare_updateBarChartValue(compare_currentIndex, id, dataset, 0);
        } else {
            compare_countryCount++;
            compare_currentIndex++;
            compare_updateBarChartPosition(dataset.length, 0);
            if (compare_countryCount == 1)
                compare_updateBarChartValue(compare_currentIndex, id, dataset, 0);
            else
                compare_updateBarChartValue(compare_currentIndex, id, dataset, 500);
        }
    } else if (op == 'remove' && compare_countryCount > 0) {
        compare_countryCount--;
        compare_updateBarChartValue(compare_currentIndex, id, dataset_10_empty, 0);
        compare_currentIndex--;
        if (compare_countryCount > 0)
            compare_updateBarChartPosition(dataset.length, 500);
    }
}

// panel action: add comparing country
function compare_doPanelAdd() {
    div_popup_panel_compare_show_action = 'add';
    hidePopupPanel();
}

// panel action: remove comaring country
function compare_doPanelRemove() {
    compare_makeBarChart('empty', 'remove', dataset_10_empty);
}

// panel action: close panel
function compare_doPanelClose() {
    hidePopupPanel();
}


var panel_compare_chart_datatip = d3.select("body")
        .append("div")
        .attr("class", "popup-panel-datatip n")
        .style("opacity", 0.0);

// event for toolbox icons
d3.select("#compare-icon-add")
    .on("click", function() {
        compare_doPanelAdd();
    })
    .on("mouseover", function() {
        showPanelTooltip("compare-icon-add", "Add new comparing country");
    })
    .on("mouseout", function() {
        hidePanelTooltip()
    });
d3.select("#compare-icon-remove")
    .on("click", function() {
        compare_doPanelRemove();
    })
    .on("mouseover", function() {
        showPanelTooltip("compare-icon-remove", "Remove last country");
    })
    .on("mouseout", function() {
        hidePanelTooltip()
    });
d3.select("#compare-icon-close")
    .on("click", function() {
        compare_doPanelClose();
    })
    .on("mouseover", function() {
        showPanelTooltip("compare-icon-close", "Close panel");
    })
    .on("mouseout", function() {
        hidePanelTooltip()
    });



compare_initPanelChart();