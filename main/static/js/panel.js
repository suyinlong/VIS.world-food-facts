/*
* @Author: Yinlong Su
* @Date:   2016-04-27 16:30:28
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-05-06 12:36:55
*/

var div_topmask;

var div_info;
var div_compare;

var div_popup_panel_transition;

var div_popup_panel;
var div_compare_show_action = 'add';

function $(id) { return document.getElementById(id); }

// click map popup
function clickMapPopup(id) {
    if (checkCountryData(id))
        showPopupPanel(id);
}

// show Popup Panel
function showPopupPanel(id) {
    name = div_popup_panel.attr("id");
    // show mask
    div_topmask.attr("class", "topmask visible");
    // show panel
    div_popup_panel.attr("class", "popup-panel " + name + " visible");
    // load panel data
    if (checkCountryData(id)) {
        if (div_popup_panel == div_info)
            setTimeout(info_makeAll, 500, id);
        else if (div_popup_panel = div_compare)
            setTimeout(compare_makeBarChart, 500, id, div_popup_panel_compare_show_action);
    }
    div_popup_panel_compare_show_action = 'change';
}

// hide Popup Panel
function hidePopupPanel() {
    name = div_popup_panel.attr("id");
    // hide mask
    div_topmask.attr("class", "topmask hidden");
    // hide panel
    div_popup_panel.attr("class", "popup-panel " + name + " hidden");
}

function checkCountryData(id) {
    cInfo = countryInfo[id];
    if (cInfo)
        return 1;
    else
        return 0;
}

// show panel tooltip (only for toolbox icons)
function showPanelTooltip(id, text) {
    icon = $(id).getBoundingClientRect();
    panel_tooltip.html(text)
        .attr("class", "popup-panel-tooltip n visible")
        .style("left", (icon.left + 16 - 110) + "px")
        .style("top", (icon.top + 40) + "px");
}

// hide panel tooltip
function hidePanelTooltip() {
    panel_tooltip.attr("class", "popup-panel-tooltip n hidden");
}


// now create new object and register event listener
var panel_tooltip = d3.select("body")
        .append("div")
        .attr("class", "popup-panel-tooltip n hidden");

div_topmask = d3.select(".topmask");
div_info = d3.select("#info");
div_compare = d3.select("#compare");

div_popup_panel = div_info;

// event for mask
div_topmask.on("click", function() {
        hidePopupPanel();
    })

