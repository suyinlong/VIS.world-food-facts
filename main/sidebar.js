/*
* @Author: Yinlong Su
* @Date:   2016-04-27 22:09:06
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-04-28 12:15:10
*/

function $(id) { return document.getElementById(id); }

var div_midmask;
var div_sidebar_panel;

function showSidebarSection() {
    div_midmask.attr("class", "midmask visible");
    div_sidebar_panel.attr("class", "sidebar-panel visible");
    d3.select(".sidebar-panel-link")
        .attr("class", "sidebar-panel-link visible");
}

function hideSidebarSection() {
    div_midmask.attr("class", "midmask hidden");
    div_sidebar_panel.attr("class", "sidebar-panel hidden");
    d3.select(".sidebar-panel-link")
        .attr("class", "sidebar-panel-link hidden");
}

// show panel tooltip (only for toolbox icons)
function showSidebarTooltip(id, text) {
    icon = $(id).getBoundingClientRect();
    sidebar_tooltip.html(text)
        .style("left", (icon.left + 160) + "px")
        .style("top", (icon.top + 40) + "px")
        .style("opacity", 0.9);
}


// now create new object and register event listener
var sidebar_tooltip = d3.select("body")
        .append("div")
        .attr("class", "sidebar-tooltip n")
        .style("opacity", 0.0);

div_midmask = d3.select(".midmask");
div_sidebar_panel = d3.select(".sidebar-panel");



// event for sidebar panel
div_midmask.on("click", function() {
    hideSidebarSection();
});

// event for sidebar button
$("sidebar-list-button-location").addEventListener("click", function() {
    //showPopupPanel('', null);
});
$("sidebar-list-button-location").addEventListener("mouseover", function() {
    showSidebarTooltip("sidebar-list-button-location", "Set my location");
});
$("sidebar-list-button-location").addEventListener("mouseout", function() {
    sidebar_tooltip.style("opacity", 0.0);
});

$("sidebar-list-button-info").addEventListener("click", function() {
    //showPopupPanel('', null);
});
$("sidebar-list-button-info").addEventListener("mouseover", function() {
    showSidebarTooltip("sidebar-list-button-info", "Show information of selected country");
});
$("sidebar-list-button-info").addEventListener("mouseout", function() {
    sidebar_tooltip.style("opacity", 0.0);
});

$("sidebar-list-button-compare").addEventListener("click", function() {
    showPopupPanel('', null);
});
$("sidebar-list-button-compare").addEventListener("mouseover", function() {
    showSidebarTooltip("sidebar-list-button-compare", "Compare between countries");
});
$("sidebar-list-button-compare").addEventListener("mouseout", function() {
    sidebar_tooltip.style("opacity", 0.0);
});

$("sidebar-list-button-link").addEventListener("click", function() {
    showSidebarSection();
});
$("sidebar-list-button-link").addEventListener("mouseover", function() {
    showSidebarTooltip("sidebar-list-button-link", "Show similarities between countries");
});
$("sidebar-list-button-link").addEventListener("mouseout", function() {
    sidebar_tooltip.style("opacity", 0.0);
});

$("sidebar-list-button-browse").addEventListener("click", function() {
    //showPopupPanel('', null);
});
$("sidebar-list-button-browse").addEventListener("mouseover", function() {
    showSidebarTooltip("sidebar-list-button-browse", "Browse the food");
});
$("sidebar-list-button-browse").addEventListener("mouseout", function() {
    sidebar_tooltip.style("opacity", 0.0);
});

$("sidebar-list-button-judge").addEventListener("click", function() {
    //showPopupPanel('', null);
});
$("sidebar-list-button-judge").addEventListener("mouseover", function() {
    showSidebarTooltip("sidebar-list-button-judge", "Balance my diet");
});
$("sidebar-list-button-judge").addEventListener("mouseout", function() {
    sidebar_tooltip.style("opacity", 0.0);
});