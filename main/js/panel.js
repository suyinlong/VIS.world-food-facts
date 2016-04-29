/*
* @Author: Yinlong Su
* @Date:   2016-04-27 16:30:28
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-04-29 14:05:03
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
    // use resizing css class
    div_popup_panel.attr("class", "popup-panel resizing-" + name + " visible");
    // start animation, 0 = enter
    div_popup_panel_transition = -2;
    alphaPopupPanel(id, 0);
}

// hide Popup Panel
function hidePopupPanel() {
    name = div_popup_panel.attr("id");
    // hide mask
    div_topmask.attr("class", "topmask hidden");
    // use resizing css class
    div_popup_panel.attr("class", "popup-panel resizing-" + name + " visible");
    // start animation, 1 = exit
    div_popup_panel_transition = -2;
    alphaPopupPanel('', null, 1);
}

// enter/exit animation of Popup Panel
// type: 0 = enter, 1 = exit
//
// State 0: Left-bottom minimized
// State 1: Center popup panel
function alphaPopupPanel(id, type) {
    name = div_popup_panel.attr("id");
    shadow_name = "shadow-" + name;

    div_popup_panel_transition += 2;

    if (type == 0)
        k = div_popup_panel_transition / 100;
    else
        k = 1 - div_popup_panel_transition / 100;

    // just use shadow-popup-panel to help us accquire the auto margin adjustment
    h = document.body.clientHeight / 2;
    _left = ($(shadow_name).offsetLeft + 480) * k - 480;
    _top = ($(shadow_name).offsetTop - 250 - h) * k + 250 + h;

    scale = "scale(" + k + ", " + k + ")";

    div_popup_panel.attr("style", "opacity: " + k + "; transform: " + scale + "; left: " + _left + "px; top: " + _top + "px;");

    if (div_popup_panel_transition < 100)
        // continue animation
        setTimeout(alphaPopupPanel, 10, id, type);
    else {
        // finish animation, restore the css class and style attributes
        if (type == 0) {
            div_popup_panel.attr("class", "popup-panel " + name + " visible")
                .attr("style", "");
            if (checkCountryData(id)) {
                if (div_popup_panel == div_info)
                    info_makeAll(id);
                else if (div_popup_panel = div_compare)
                    compare_makeBarChart(id, div_popup_panel_compare_show_action);
            }
            div_popup_panel_compare_show_action = 'change';
        } else {
            div_popup_panel.attr("class", "popup-panel " + name + " hidden")
                .attr("style", "");
        }
    }

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

