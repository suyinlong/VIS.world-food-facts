/*
* @Author: Yinlong Su
* @Date:   2016-04-28 10:52:12
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-05-11 23:38:18
*/

var link_width = 980;
var link_height = 800;
var link_frame = 50;

var link_type = 'PCA';
var link_duration = 100;

var link_svg;
var link_minX, link_maxX, link_minY, link_maxY, link_scaleX, link_scaleY;

function link_clearSvg() {
    d3.select("#sidebar-panel-link-sub-chart")
        .selectAll("*").remove();
}

function link_makeSvg() {
    link_clearSvg();
    var newSvg = d3.select("#sidebar-panel-link-sub-chart")
        .append("svg")
        .attr("width", link_width + 2 * link_frame)
        .attr("height", link_height + 2 * link_frame);
    return newSvg;
}

function link_makeTreeGraph(dataset) {

    var lineQueue = [];

    minX = d3.min(dataset, function(d) { return d[0]; });

    minX = d3.min(dataset, function(d) { return d[0]; });
    maxX = d3.max(dataset, function(d) { return d[0]; });
    minY = d3.min(dataset, function(d) { return d[1]; });
    maxY = d3.max(dataset, function(d) { return d[1]; });

    var color = d3.scale.category20();

    scaleX = d3.scale.linear()
        .range([0, link_width])
        .domain([minX, maxX]);
    scaleY = d3.scale.linear()
        .range([link_height, 0])
        .domain([minY, maxY]);

    link_svg = link_makeSvg();

    var cSet = new Set();
    cSet.add(0);
    while (cSet.size != dataset.length) {
        k1 = 0;
        k2 = 0;
        d = Number.MAX_VALUE;
        for (let i of cSet.keys()) {
            for (j = 0; j < dataset.length; j++) {
                if (cSet.has(j) == false &&
                    Math.pow(dataset[i][0] - dataset[j][0], 2) + Math.pow(dataset[i][1] - dataset[j][1], 2) < d) {
                    d = Math.pow(dataset[i][0] - dataset[j][0], 2) + Math.pow(dataset[i][1] - dataset[j][1], 2);
                    k1 = i;
                    k2 = j;
                }
            }
        }
        lineQueue.push({ s: k1, t: k2});
        cSet.add(k2);
    }

    // draw all the lines first

    for (i = 0; i < lineQueue.length; i++) {
        k1 = lineQueue[i].s;
        k2 = lineQueue[i].t;

        x1 = scaleX(dataset[k1][0]) + link_frame;
        y1 = scaleY(dataset[k1][1]) + link_frame;
        x2 = scaleX(dataset[k2][0]) + link_frame;
        y2 = scaleY(dataset[k2][1]) + link_frame;

        line_ds = "M" + x1 + "," + y1 + "L" + x1 + "," + y1;
        line_dt = "M" + x1 + "," + y1 + "L" + x2 + "," + y2;
        link_svg.append("path")
            .attr("stroke", "#ffd800")
            .attr("stroke-width", "5px")
            .attr("fill", "none")
            .attr("d", line_ds)
            .transition()
            .delay((i + 1) * link_duration)
            .duration(link_duration)
            .attr("d", line_dt);
    }

    // draw all the dots then
    // first draw dot 0

    for (i = 0; i < lineQueue.length + 1; i++) {
        if (i == 0)
            k = 0;
        else
            k = lineQueue[i - 1].t;
        link_svg.append("circle")
            .attr("cx", function() {
                return scaleX(dataset[k][0]) + link_frame;
            })
            .attr("cy", function() {
                return scaleY(dataset[k][1]) + link_frame;
            })
            .attr("r", 0)
            .attr("fill", color(k))
            .attr("opacity", "1.0")
            .transition()
            .delay(i * link_duration)
            .duration(link_duration)
            .attr("r", 10);
    }

    // draw text label
    for (i = 0; i < lineQueue.length + 1; i++) {
        if (i == 0)
            k = 0;
        else
            k = lineQueue[i - 1].t;
        link_svg.append("text")
            .attr("x", function() {
                return scaleX(dataset[k][0]) + link_frame + 10;
            })
            .attr("y", function() {
                return scaleY(dataset[k][1]) + link_frame + 5;
            })
            .attr("font-family", "Verdana")
            .attr("font-size", "12px")
            .attr("stroke", "white")
            .attr("stroke-width", "1.3px")
            .attr("opacity", "0.0")
            .text(link_legends[k])
            .transition()
            .delay((i + 1) * link_duration)
            .duration(link_duration)
            .attr("opacity", "0.5");
        link_svg.append("text")
            .attr("x", function() {
                return scaleX(dataset[k][0]) + link_frame + 10;
            })
            .attr("y", function() {
                return scaleY(dataset[k][1]) + link_frame + 5;
            })
            .attr("font-family", "Verdana")
            .attr("font-size", "12px")
            .attr("line-height", "1")
            .attr("opacity", "0.0")
            .text(link_legends[k])
            .transition()
            .delay((i + 1) * link_duration)
            .duration(link_duration)
            .attr("opacity", "1.0");
    }

}

function link_setType(type, element) {
    link_type = type;

    d3.select("#sidebar-panel-link-type-pca")
        .attr("class", "sidebar-panel-link-type-pca");
    d3.select("#sidebar-panel-link-type-mds-euclidean")
        .attr("class", "sidebar-panel-link-type-mds-euclidean");
    d3.select("#sidebar-panel-link-type-mds-cosine")
        .attr("class", "sidebar-panel-link-type-mds-cosine");
    d3.select("#sidebar-panel-link-type-mds-correlation")
        .attr("class", "sidebar-panel-link-type-mds-correlation");
    d3.select("#sidebar-panel-link-type-isomap")
        .attr("class", "sidebar-panel-link-type-isomap");

    d3.select("#" + element)
        .attr("class", element + " selected");
}

function link_showTreeGraph() {
    if (link_type == 'PCA')
        link_makeTreeGraph(link_dataset_pca);
    else if (link_type == 'MDS - Euclidean')
        link_makeTreeGraph(link_dataset_mds_euclidean);
    else if (link_type == 'MDS - Cosine')
        link_makeTreeGraph(link_dataset_mds_cosine);
    else if (link_type == 'MDS - Correlation')
        link_makeTreeGraph(link_dataset_mds_correlation);
    else if (link_type == 'ISOMAP')
        link_makeTreeGraph(link_dataset_isomap);
}

d3.select("#sidebar-panel-link-type-pca")
    .on("click", function() {
        link_setType('PCA', 'sidebar-panel-link-type-pca');
    });
d3.select("#sidebar-panel-link-type-mds-euclidean")
    .on("click", function() {
        link_setType('MDS - Euclidean', 'sidebar-panel-link-type-mds-euclidean');
    });
d3.select("#sidebar-panel-link-type-mds-cosine")
    .on("click", function() {
        link_setType('MDS - Cosine', 'sidebar-panel-link-type-mds-cosine');
    });
d3.select("#sidebar-panel-link-type-mds-correlation")
    .on("click", function() {
        link_setType('MDS - Correlation', 'sidebar-panel-link-type-mds-correlation');
    });
d3.select("#sidebar-panel-link-type-isomap")
    .on("click", function() {
        link_setType('ISOMAP', 'sidebar-panel-link-type-isomap');
    });


d3.select("#sidebar-panel-link-button")
    .on("click", function() {
        showTreeGraph();
    });

link_setType('PCA', 'sidebar-panel-link-type-pca');