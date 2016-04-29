/*
* @Author: Yinlong Su
* @Date:   2016-04-27 22:09:06
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-04-28 22:42:21
*/

function $(id) { return document.getElementById(id); }

var div_midmask;
var div_sidebar_panel;

function showSidebarSection(className) {
    div_midmask.attr("class", "midmask visible");
    div_sidebar_panel.attr("class", "sidebar-panel visible");
    d3.select("." + className)
        .attr("class", className + " visible");
}

function hideSidebarSection() {
    div_midmask.attr("class", "midmask hidden");
    div_sidebar_panel.attr("class", "sidebar-panel hidden");

    d3.select(".sidebar-panel-link-sub").attr("class", "sidebar-panel-link-sub hidden");
    d3.select(".sidebar-panel-link").attr("class", "sidebar-panel-link hidden");
}

// show sidebar tooltip
function showSidebarTooltip(id, text) {
    icon = $(id).getBoundingClientRect();
    sidebar_tooltip.html(text)
        .attr("class", "sidebar-tooltip n visible")
        .style("left", (icon.left + 160) + "px")
        .style("top", (icon.top + 40) + "px");
}

// hide sidebar tooltip
function hideSidebarTooltip() {
    sidebar_tooltip.attr("class", "sidebar-tooltip n hidden");
}

function showTreeGraph(dataset) {
    showSidebarSection("sidebar-panel-link-sub");
    link_makeTreeGraph(dataset);
}

// now create new object and register event listener
var sidebar_tooltip = d3.select("body")
        .append("div")
        .attr("class", "sidebar-tooltip n hidden");

div_midmask = d3.select(".midmask");
div_sidebar_panel = d3.select(".sidebar-panel");



// event for sidebar panel
div_midmask.on("click", function() {
    hideSidebarSection();
});

// event for sidebar button
d3.select("#sidebar-list-button-location").on("click", function() {
    alert("lo");
})

d3.select("#sidebar-list-button-location")
    .on("click", function() {
        //showPopupPanel('', null);
    })
    .on("mouseover", function() {
        showSidebarTooltip("sidebar-list-button-location", "Set my location");
    })
    .on("mouseout", function() {
        hideSidebarTooltip();
    });

d3.select("#sidebar-list-button-info")
    .on("click", function() {
        //showPopupPanel('', null);
    })
    .on("mouseover", function() {
        showSidebarTooltip("sidebar-list-button-info", "Show information of selected country");
    })
    .on("mouseout", function() {
        hideSidebarTooltip();
    });

d3.select("#sidebar-list-button-compare")
    .on("click", function() {
        showPopupPanel('', null);
    })
    .on("mouseover", function() {
        showSidebarTooltip("sidebar-list-button-compare", "Compare between countries");
    })
    .on("mouseout", function() {
        hideSidebarTooltip();
    });

d3.select("#sidebar-list-button-link")
    .on("click", function() {
        showSidebarSection('sidebar-panel-link');
    })
    .on("mouseover", function() {
        showSidebarTooltip("sidebar-list-button-link", "Show similarities between countries");
    })
    .on("mouseout", function() {
        hideSidebarTooltip();
    });

d3.select("#sidebar-list-button-browse")
    .on("click", function() {
        //showPopupPanel('', null);
    })
    .on("mouseover", function() {
        showSidebarTooltip("sidebar-list-button-browse", "Browse the food");
    })
    .on("mouseout", function() {
        hideSidebarTooltip();
    });

d3.select("#sidebar-list-button-judge")
    .on("click", function() {
        //showPopupPanel('', null);
    })
    .on("mouseover", function() {
        showSidebarTooltip("sidebar-list-button-judge", "Balance my diet");
    })
    .on("mouseout", function() {
        hideSidebarTooltip();
    });