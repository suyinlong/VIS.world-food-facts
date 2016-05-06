/*
* @Author: Yinlong Su
* @Date:   2016-04-27 01:22:30
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-05-06 15:57:00
*/

// all animation duration
var compare_duration = 500;

// compare contry id, old count, current count and current index
var compare_id = ['', '', ''];
var compare_oldCountryCount, compare_countryCount, compare_currentIndex;

// dataset setting: colors
//var colorPicker = ['#2375F3', 'lightskyblue', 'gold', 'tomato', 'lightslategray', 'aqua', 'limegreen', 'darkorange', 'khaki', 'salmon'];
var compare_colorPicker = ['tomato', 'gold', 'lightskyblue'];

// bar chart setting: width, height, frame, padding, Y scaler
var compare_bar_width = 940;
var compare_bar_height = 570;
var compare_bar_frame = 30;
var compare_bar_padding = 10;
var compare_scaleY;

// leg chart setting: width, height, frame
var compare_leg_width = 160;
var compare_leg_height = 550;
var compare_leg_frame = 20;

// svg group def
var compare_bar_svg, compare_bar_defs, compare_bar_g0, compare_bar_g1, compare_bar_g2, compare_bar_g3, compare_bar_t;
var compare_leg_svg, compare_leg_g;

// clear compare svg layer
function compare_clearSvg(id) {
    d3.select("#" + id)
        .selectAll("*").remove();
}

// make new compare svg
function compare_makeSvg(id, width, height, frame) {
    compare_clearSvg(id);
    var newSvg = d3.select("#" + id)
        .append("svg")
        .attr("width", width + 2 * frame)
        .attr("height", height + 2 * frame);
    return newSvg;
}

// make grid on bar chart
function compare_makeGrid() {
    var grid = compare_bar_svg.append("g")
        .attr("id", "grid")
        .attr("stroke", "#f0f0f0");
    grid.append("line")
        .attr("x1", compare_bar_frame)
        .attr("x2", compare_bar_width + compare_bar_frame)
        .attr("y1", compare_bar_frame)
        .attr("y2", compare_bar_frame)
        .attr("class", "compare-chart-grid");
    grid.append("line")
        .attr("x1", compare_bar_frame)
        .attr("x2", compare_bar_width + compare_bar_frame)
        .attr("y1", compare_bar_frame + compare_bar_height / 4)
        .attr("y2", compare_bar_frame + compare_bar_height / 4)
        .attr("class", "compare-chart-grid");
    grid.append("line")
        .attr("x1", compare_bar_frame)
        .attr("x2", compare_bar_width + compare_bar_frame)
        .attr("y1", compare_bar_frame + compare_bar_height / 2)
        .attr("y2", compare_bar_frame + compare_bar_height / 2)
        .attr("class", "compare-chart-grid");
    grid.append("line")
        .attr("x1", compare_bar_frame)
        .attr("x2", compare_bar_width + compare_bar_frame)
        .attr("y1", compare_bar_frame + 3 * compare_bar_height / 4)
        .attr("y2", compare_bar_frame + 3 * compare_bar_height / 4)
        .attr("class", "compare-chart-grid");
    grid.append("line")
        .attr("x1", compare_bar_frame)
        .attr("x2", compare_bar_width + compare_bar_frame)
        .attr("y1", compare_bar_height + compare_bar_frame)
        .attr("y2", compare_bar_height + compare_bar_frame)
        .attr("class", "compare-chart-grid");
}

// init compare panel chart
function compare_initPanelChart() {
    compare_scaleY = d3.scale.linear()
        .domain([0, 1])
        .range([0, compare_bar_height]);

    compare_bar_svg = compare_makeSvg("compare-body-chart", compare_bar_width, compare_bar_height, compare_bar_frame);
    compare_makeGrid();
    compare_bar_defs = compare_bar_svg.append("defs");
    compare_bar_g0 = compare_bar_svg.append("g")
        .attr("id", "mainLine");
    compare_bar_g1 = compare_bar_svg.append("g")
        .attr("id", "mainBar1");
    compare_bar_g2 = compare_bar_svg.append("g")
        .attr("id", "mainBar2");
    compare_bar_g3 = compare_bar_svg.append("g")
        .attr("id", "mainBar3");
    compare_bar_t = compare_bar_svg.append("g")
        .attr("id", "text");

    compare_oldCountryCount = 0;
    compare_countryCount = 0;
    compare_currentIndex = 0;
    compare_id = ['', '', ''];

    compare_initLineChart();
    compare_initBarChart();
    compare_initXLegend();
    compare_makeGLegend();
}

// X axis legends
function compare_initXLegend() {
    for (i = 0; i < dataset_label.length; i++) {
        tx = i * ((compare_bar_width + compare_bar_padding) / dataset_normalized_world.length) + compare_bar_frame + ((compare_bar_width + compare_bar_padding) / dataset_normalized_world.length - compare_bar_padding) / 2;
        compare_bar_t.append("text")
            .attr("x", tx)
            .attr("y", 620)
            .attr("text-anchor", "middle")
            .text(dataset_label[i]);
    }
}

function compare_makeGLegend() {
    compare_leg_svg = compare_makeSvg("compare-body-data", compare_leg_width, compare_leg_height, compare_leg_frame);
    compare_leg_g = compare_leg_svg.append("g")
        .attr("id", "legendGroup")
        .attr("transform", "translate(10, 200)");
    compare_leg_g.append("circle")
        .attr("cx", 20)
        .attr("cy", 20)
        .attr("r", 10)
        .attr("fill", "#ffd800");
    compare_leg_g.append("rect")
        .attr("x", 0)
        .attr("y", 18)
        .attr("width", 40)
        .attr("height", 4)
        .attr("fill", "#ffd800");
    compare_leg_g.append("text")
        .attr("x", 50)
        .attr("y", 26)
        .text("World Average");

    for (i = 0; i < compare_countryCount; i++) {
        leg_countryName = countryInfo[compare_id[i]]['LAB'];
        compare_leg_g.append("rect")
            .attr("fill", compare_colorPicker[i])
            .attr("stroke", "black")
            .attr("stroke-width", "1px")
            .attr("x", 12)
            .attr("y", 70 + 30 * i)
            .attr("width", 15)
            .attr("height", 15);
        compare_leg_g.append("text")
            .attr("x", 50)
            .attr("y", 82 + 30 * i)
            .text(leg_countryName);
    }
}

// init line chart -> world average dataset
function compare_initLineChart() {
    var dots = [];
    for (i = 0; i < dataset_normalized_world.length; i++) {
        dx = i * ((compare_bar_width + compare_bar_padding) / dataset_normalized_world.length) + compare_bar_frame + ((compare_bar_width + compare_bar_padding) / dataset_normalized_world.length - compare_bar_padding) / 2;
        dy = compare_bar_height - compare_scaleY(dataset_normalized_world[i]) + compare_bar_frame;
        dots.push({ x: dx, y: dy });
    }

    for (i = 0; i < dots.length - 1; i++) {
        compare_bar_g0.append("path")
            .attr("stroke", "#ffd800")
            .attr("stroke-width", "5px")
            .attr("fill", "none")
            .attr("d", "M" + dots[i].x + "," + dots[i].y + "L" + dots[i+1].x + "," + dots[i+1].y);
    }
    for (i = 0; i < dots.length; i++) {
        compare_bar_g0.append("circle")
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

// make 3 groups of bars
function compare_initBarChart() {
    compare_makeBarGroup(1, dataset_length);
    compare_makeBarGroup(2, dataset_length);
    compare_makeBarGroup(3, dataset_length);
}

// make one group of bars
function compare_makeBarGroup(group, length) {
    var g = group == 1 ? compare_bar_g1 : (group == 2 ? compare_bar_g2 : compare_bar_g3);

    barColor = compare_colorPicker[group - 1];
    ct = d3.hsl(barColor);
    if (ct.l < 0.5)
        barStopColor = ct.brighter().brighter().toString();
    else
        barStopColor = ct.darker().darker().toString();
    lg = compare_bar_defs.append("linearGradient")
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

        barX = i * ((compare_bar_width + compare_bar_padding) / length) + compare_bar_frame;
        barY = compare_bar_height - compare_scaleY(d) + compare_bar_frame;
        barWidth = (compare_bar_width + compare_bar_padding) / length - compare_bar_padding;
        barHeight = compare_scaleY(d);

        f = compare_bar_defs.append("filter")
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

// update bar X and width (when add/remove countries)
function compare_adjustBarXAndWidth(g, group, length, delay) {
    for (i = 0; i < length; i++) {
        barX = i * ((compare_bar_width + compare_bar_padding) / length) + compare_bar_frame;
        barWidth = (compare_bar_width + compare_bar_padding) / length - compare_bar_padding;
        barWidth = barWidth / compare_countryCount;
        barX += (group - 1) * barWidth;

        rect = g.select("#rect_g" + group + "n" + i);
        rect.transition()
            .delay(delay)
            .duration(500)
            .attr("x", barX)
            .attr("width", barWidth);
        compare_bar_defs.select("#" + rect.attr("pointlight"))
            .transition()
            .delay(delay)
            .attr("x", barX + barWidth / 2);
    }
}

// update bar X and width in sequence
function compare_updateBarChartPosition(length, delay) {
    // updateBarChartPosition: Country 1
    compare_adjustBarXAndWidth(compare_bar_g1, 1, length, delay);

    // updateBarChartPosition: Country 2
    if (compare_countryCount >= 2)
        compare_adjustBarXAndWidth(compare_bar_g2, 2, length, delay);

    // updateBarChartPosition: Country 3
    if (compare_countryCount >= 3)
        compare_adjustBarXAndWidth(compare_bar_g3, 3, length, delay);

    compare_oldCountryCount = compare_countryCount;
}

// update bar chart values
function compare_updateBarChartValue(group, id, dataset, delay) {
    var g = group == 1 ? compare_bar_g1 : (group == 2 ? compare_bar_g2 : compare_bar_g3);
    compare_id[group - 1] = id;
    var d, l;
    for (i = 0; i < dataset.length; i++) {
        d = dataset[i];
        l = dataset_label[i];
        if (countryInfo[id])
            ori_d = countryInfo[id]['ORI'][i];
        else
            ori_d = 0;

        barY = compare_bar_height - compare_scaleY(d) + compare_bar_frame;
        barHeight = compare_scaleY(d);

        rect = g.select("#rect_g" + group + "n" + i);
        rect.attr("label", l)
            .attr("d", ori_d)
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
            .duration(compare_duration)
            .attr("y", barY)
            .attr("height", barHeight);

        compare_bar_defs.select("#" + rect.attr("pointlight"))
            .transition()
            .delay(delay)
            .attr("y", barY - 80);
    }

}

// show panel chart tooltip (only for bars)
function compare_showBarDatatip(rect, id) {
    _left = parseFloat($('compare').offsetLeft) + parseFloat(rect.attr("x")) + parseFloat(rect.attr("width") / 2) - 60;
    _top = parseFloat($('compare').offsetTop) + parseFloat(rect.attr("y")) - 10;
    panel_compare_chart_datatip.html(id + "<br/><strong>" + rect.attr("label") + "</strong><br/>" + parseFloat(rect.attr("d")).toFixed(2))
        .style("left", _left + "px")
        .style("top", _top + "px")
        .style("opacity", 0.9);
}

// load country data to the panel
function compare_loadCountryData(id) {
    cInfo = countryInfo[id];
    if (cInfo)
        return cInfo['DAT'];
    return cInfo;
}

// main function for bar chart
// id = country id
// op = operation ['add', 'change', 'remove']
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
    compare_makeGLegend();
}

// panel action: add comparing country
function compare_doPanelAdd() {
    div_popup_panel_compare_show_action = 'add';
    hidePopupPanel();
}

// panel action: remove comaring country
function compare_doPanelRemove() {
    compare_makeBarChart('empty', 'remove');
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