/*
* @Author: Yinlong Su
* @Date:   2016-04-29 00:52:38
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-05-06 14:01:26
*/

// all animation duration
var info_duration = 500;

// current country id
var info_id;

// dataset setting: length, colors, labels, index (to dataset)
var info_pie_dataset_length = 5;
var info_pie_colors = ['lightskyblue', 'gold', 'tomato', 'aqua', 'limegreen', 'darkorange', 'khaki', 'salmon'];
var info_pie_dataset_label = ['Fat', 'Carbohydrates', 'Sugars', 'Fiber', 'Proteins'];
var info_pie_dataset_index = [2, 3, 4, 5, 6];

// pie chart setting: width, height, frame, pie outter radius, pie inner radius
var info_pie_width = 500;
var info_pie_height = 500;
var info_pie_frame = 45;
var info_pie_outerRadius = info_pie_width / 2.5;
var info_pie_innerRadius = info_pie_width / 4;

// fixed pie transform -> move to center
var info_pie_transform = "translate(" + (info_pie_width / 2 + info_pie_frame) + ", " + (info_pie_height / 2 + info_pie_frame) + ")";

// pie chart layout, arc wrapper and hover arc wrapper
var info_pie;
var info_arc;
var info_hover_arc;

// bar chart dataset labels
var info_bar_dataset_label = ['Additives', 'Energy', 'Fat', 'Carbohydrates', 'Sugars', 'Fiber', 'Proteins', 'Salt', 'Sodium', 'Alcohol'];

// bar chart setting: width, height, frame, width scaler
var info_bar_width = 380;
var info_bar_height = 510;
var info_bar_frame = 20;
var info_bar_scaleW;

// bar chart transform -> move to spare some space
var info_bar_transform = "translate(" + info_bar_frame + ", " + (info_bar_frame + 10) + ")";

// svg group def
var info_pie_svg, info_pie_g, info_pie_arcs;
var info_bar_svg, info_bar_g, info_bar_data_g;


// clear info svg layer
function info_clearSvg(id) {
    d3.select("#" + id)
        .selectAll("*").remove();
}

// make new info svg
function info_makeSvg(id, width, height, frame) {
    info_clearSvg();
    var newSvg = d3.select("#" + id)
        .append("svg")
        .attr("width", width + 2 * frame)
        .attr("height", height + 2 * frame);
    return newSvg;
}

// init the pie chart to world original dataset
function info_initPieChart() {
    info_pie_svg = info_makeSvg("info-body-chart", info_pie_width, info_pie_height, info_pie_frame);

    info_pie = d3.layout.pie().value(function(d) {return d;}).sort(null);
    info_arc = d3.svg.arc()
        .outerRadius(info_pie_outerRadius)
        .innerRadius(info_pie_innerRadius);
    info_hover_arc = d3.svg.arc()
        .outerRadius(info_pie_outerRadius + 35)
        .innerRadius(info_pie_innerRadius - 15);

    info_pie_g = info_pie_svg.append("g")
        .attr("id", "pieArcGroup")
        .attr("transform", info_pie_transform);

    info_pie_arcs = info_pie_g.selectAll("path")
        .data(info_pie(info_makePieDataset(dataset_original_world)))
        .enter()
        .append("path")
        .attr("fill", function(d, i) {
            return info_pie_colors[i];
        })
        .attr("dn", info_arc)
        .attr("dh", info_hover_arc)
        .attr("d", info_arc)
        .on("mouseover", function() {
            d3.select(this).transition().duration(info_duration).ease("bounce").attr("d", d3.select(this).attr("dh"));
        })
        .on("mouseout", function() {
            d3.select(this).transition().duration(info_duration).ease("bounce").attr("d", d3.select(this).attr("dn"));
        })
        .each(function(d) {
            this.do = d;
        });

    var info_pie_legend_g = info_pie_svg.append("g")
        .attr("id", "pieLegendGroup")
        .attr("transform", info_pie_transform);
    for (i = 0; i < info_pie_dataset_length; i++) {
        info_pie_legend_g.append("rect")
            .attr("fill", info_pie_colors[i])
            .attr("stroke", "black")
            .attr("stroke-width", "1px")
            .attr("x", -50)
            .attr("y", -70 + 30 * i)
            .attr("width", 15)
            .attr("height", 15);
        info_pie_legend_g.append("text")
            .attr("x", -20)
            .attr("y", -55 + 30 * i)
            .text(info_pie_dataset_label[i]);
    }
}

// make/update pie chart
function info_makePieChart(dataset) {
    info_pie_arcs = info_pie_arcs.data(info_pie(dataset));
    info_pie_arcs.transition().duration(info_duration).attrTween("d", info_arcTween);
    info_pie_arcs.attr("dn", info_arc)
        .attr("dh", info_hover_arc);
}

// pie chart update animation
function info_arcTween(a) {
    var i = d3.interpolate(this.do, a);
    this.do = i(0);
    return function(t) {
        return info_arc(i(t));
    };
}

// init bar chart to world original dataset
function info_initBarChart() {
    info_bar_svg = info_makeSvg("info-body-data", info_bar_width, info_bar_height, info_bar_frame);
    info_bar_back_g = info_bar_svg.append("g")
        .attr("id", "barBackGroup")
        .attr("transform", info_bar_transform);
    info_bar_g = info_bar_svg.append("g")
        .attr("id", "barGroup")
        .attr("transform", info_bar_transform);
    info_bar_world_g = info_bar_svg.append("g")
        .attr("id", "barWorldGroup")
        .attr("transform", info_bar_transform);
    info_bar_text_g = info_bar_svg.append("g")
        .attr("id", "barTextGroup")
        .attr("transform", info_bar_transform);
    info_bar_data_g = info_bar_svg.append("g")
        .attr("id", "barDataGroup")
        .attr("transform", info_bar_transform);
    info_bar_scaleW = d3.scale.linear()
        .domain([0, 1])
        .range([0, info_bar_width]);

    for (i = 0; i < info_bar_dataset_label.length; i++) {
        info_bar_text_g.append("text")
            .attr("x", 20)
            .attr("y", 50 * i)
            .text(info_bar_dataset_label[i]);
        info_bar_data_g.append("text")
            .attr("x", info_bar_width - 20)
            .attr("y", 50 * i)
            .attr("text-anchor", "end")
            .attr("id", "l" + i)
            .text(dataset_original_world[i].toFixed(2));
        info_bar_back_g.append("rect")
            .attr("x", 0)
            .attr("y", 10 + 50 * i)
            .attr("width", info_bar_scaleW(1))
            .attr("height", 20)
            .attr("class", "info-body-data-bar-back");
    }

    info_bar_g.selectAll("rect")
        .data(dataset_normalized_world)
        .enter()
        .append("rect")
        .attr("x", 0)
        .attr("y", function(d, i) {
            return 10 + 50 * i;
        })
        .attr("width", function(d) {
            return info_bar_scaleW(d);
        })
        .attr("height", 20)
        .attr("fill", function(d, i) {
            return info_barColor(d, i);
        })
        .attr("class", "info-body-data-bar")
        .on("mouseover", function(d, i) {
            d3.select(this).transition().duration(info_duration / 2).attr("fill", "orange");
        })
        .on("mouseout", function(d, i) {
            d3.select(this).transition().duration(info_duration / 2).attr("fill", info_barColor(d, i));
        });

    info_bar_world_g.selectAll("rect")
        .data(dataset_normalized_world)
        .enter()
        .append("rect")
        .attr("id", function(d, i) {
            return "b" + i;
        })
        .attr("x", function(d) {
            return info_bar_scaleW(d) -5;
        })
        .attr("y", function(d, i) {
            return 10 + 50 * i;
        })
        .attr("width", 10)
        .attr("height", 20)
        .attr("class", "info-body-data-bar-world")
        .on("mouseover", function(d, i) {
            info_showPanelDatatip("b" + i, "World avg: " + dataset_original_world[i].toFixed(2));
        })
        .on("mouseout", function() {
            info_hidePanelDatatip();
        });

}

// make/update bar chart
function info_makeBarChart(label, ori_dataset, nor_dataset) {
    info_bar_g.selectAll("rect").data(nor_dataset).transition()
        .duration(info_duration)
        .ease("bounce")
        .attr("width", function(d) {
            return info_bar_scaleW(d);
        })
        .attr("fill", function(d, i) {
            return info_barColor(d, i);
        });
    for (i = 0; i < info_bar_dataset_label.length; i++) {
        info_bar_data_g.select("#l" + i)
            .text(ori_dataset[i].toFixed(2));
    }
    $('info-country-label').innerHTML = label + " .vs. World";
}

// bar chart color picker
// set color according to the world average
function info_barColor(d, i) {
    world_avg = dataset_normalized_world[i];
    if (d >= world_avg - 0.2 && d <= world_avg + 0.2)
        return "limegreen";
    if (d < world_avg - 0.2)
        return "dodgerblue";
    if (d > world_avg + 0.2)
        return "orangered";
}

// get pie dataset
// we only use 5 attributes out of 10 attributes
// so this function return those 5 attrs
function info_makePieDataset(dataset) {
    var pie_dataset = [];
    for (i = 0; i < info_pie_dataset_index.length; i++)
        pie_dataset.push(dataset[info_pie_dataset_index[i]]);
    return pie_dataset;
}

// make all panel charts
function info_makeAll(id) {
    info_id = id;
    var pie_dataset = info_makePieDataset(countryInfo[id]['ORI']);
    info_makePieChart(pie_dataset);
    info_makeBarChart(countryInfo[id]['LAB'], countryInfo[id]['ORI'], countryInfo[id]['DAT']);
}

// show info panel datatip
function info_showPanelDatatip(id, text) {
    icon = $(id).getBoundingClientRect();
    info_datatip.html(text)
        .attr("class", "popup-panel-tooltip n visible")
        .style("left", (icon.left - 105) + "px")
        .style("top", (icon.top + 40) + "px");
}

// hide info panel datatip
function info_hidePanelDatatip() {
    info_datatip.attr("class", "popup-panel-tooltip n hidden");
}

function info_compare_doPanelAdd() {
    compare_makeBarChart('empty', 'remove');
    compare_makeBarChart('empty', 'remove');
    compare_makeBarChart('empty', 'remove');
    compare_makeBarChart(info_id, 'add');
    div_popup_panel_compare_show_action = 'add';
    hidePopupPanel();
    div_popup_panel = div_compare;
}

// now create new object and register event listener
var info_datatip = d3.select("body")
        .append("div")
        .attr("class", "popup-panel-tooltip n hidden");

// event for toolbox icons
d3.select("#info-icon-location")
    .on("click", function() {
        //doPanelAdd();
    })
    .on("mouseover", function() {
        showPanelTooltip("info-icon-location", "Set as current location");
    })
    .on("mouseout", function() {
        hidePanelTooltip()
    });
d3.select("#info-icon-add")
    .on("click", function() {
        info_compare_doPanelAdd();
    })
    .on("mouseover", function() {
        showPanelTooltip("info-icon-add", "Add new comparing country");
    })
    .on("mouseout", function() {
        hidePanelTooltip()
    });
d3.select("#info-icon-browse")
    .on("click", function() {
        //doPanelAdd();
    })
    .on("mouseover", function() {
        showPanelTooltip("info-icon-browse", "Browse the food");
    })
    .on("mouseout", function() {
        hidePanelTooltip()
    });
d3.select("#info-icon-close")
    .on("click", function() {
        compare_doPanelClose();
    })
    .on("mouseover", function() {
        showPanelTooltip("info-icon-close", "Close panel");
    })
    .on("mouseout", function() {
        hidePanelTooltip()
    });


info_id = 'world';
info_initPieChart();
info_initBarChart();