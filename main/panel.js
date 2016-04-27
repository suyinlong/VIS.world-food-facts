/*
* @Author: Yinlong Su
* @Date:   2016-04-27 16:30:28
* @Last Modified by:   Yinlong Su
* @Last Modified time: 2016-04-27 18:37:49
*/

var div_mask;
var div_popup_panel;
var div_popup_panel_transition;
var div_popup_panel_show_action = 'add';

function $(id) { return document.getElementById(id); }

// click map popup
function clickMapPopup(id) {
    // first load the country data
    dataset = loadCountryData(id);
    // only show the panel when the country is valid
    if (dataset)
        showPopupPanel(id, dataset);
}

// show Popup Panel
function showPopupPanel(id, dataset) {
    // show mask
    div_mask.attr("class", "mask visible");
    // use resizing css class
    div_popup_panel.attr("class", "resizing-popup-panel visible");
    // start animation, 0 = enter
    div_popup_panel_transition = -2;
    alphaPopupPanel(id, dataset, 0);
}

// hide Popup Panel
function hidePopupPanel() {
    // hide mask
    div_mask.attr("class", "mask hidden");
    // use resizing css class
    div_popup_panel.attr("class", "resizing-popup-panel visible");
    // start animation, 1 = exit
    div_popup_panel_transition = -2;
    alphaPopupPanel(dataset, 1);
}

// enter/exit animation of Popup Panel
// type: 0 = enter, 1 = exit
//
// State 0: Left-bottom minimized
// State 1: Center popup panel
function alphaPopupPanel(id, dataset, type) {
    div_popup_panel_transition += 2;

    if (type == 0)
        k = div_popup_panel_transition / 100;
    else
        k = 1 - div_popup_panel_transition / 100;

    // just use shadow-popup-panel to help us accquire the auto margin adjustment
    h = document.body.clientHeight / 2;
    _left = ($('shadow-popup-panel').offsetLeft + 480) * k - 480;
    _top = ($('shadow-popup-panel').offsetTop - 250 - h) * k + 250 + h;

    scale = "scale(" + k + ", " + k + ")";

    div_popup_panel.attr("style", "opacity: " + k + "; transform: " + scale + "; left: " + _left + "px; top: " + _top + "px;");

    if (div_popup_panel_transition < 100)
        // continue animation
        setTimeout(alphaPopupPanel, 10, id, dataset, type);
    else {
        // finish animation, restore the css class and style attributes
        if (type == 0) {
            div_popup_panel.attr("class", "popup-panel visible")
                .attr("style", "");
            makeBarChart(id, div_popup_panel_show_action, dataset);
            div_popup_panel_show_action = 'change';
        } else {
            div_popup_panel.attr("class", "popup-panel hidden")
                .attr("style", "");
        }
    }

}

// load country data to the panel
function loadCountryData(id) {
    cInfo = countryInfo[id];
    if (cInfo) {
        d3.select(".popup-panel-picture")
            .attr("style", "background-image: url(" + cInfo['PIC'] + ");");
        $("popup-panel-location").innerHTML = cInfo['LAB'];
        $("popup-panel-description").innerHTML = cInfo['DES'];
        return cInfo['DAT'];
    }
    return cInfo;
}

// panel action: add comparing country
function doPanelAdd() {
    div_popup_panel_show_action = 'add';
    hidePopupPanel();
}

// panel action: remove comaring country
function doPanelRemove() {
    makeBarChart('empty', 'remove', dataset_10_empty);
}

// panel action: close panel
function doPanelClose() {
    hidePopupPanel();
}

// show panel tooltip (only for toolbox icons)
function showPanelTooltip(id, text) {
    icon = $(id).getBoundingClientRect();
    panel_tooltip.html(text)
        .style("left", (icon.left + 16 - 110) + "px")
        .style("top", (icon.top + 40) + "px")
        .style("opacity", 0.9);
}


// now create new object and register event listener
var panel_tooltip = d3.select("body")
        .append("div")
        .attr("class", "popup-panel-tooltip n")
        .style("opacity", 0.0);

div_mask = d3.select(".mask");
div_popup_panel = d3.select(".popup-panel");

// event for mask
div_mask.on("click", function() {
        hidePopupPanel();
    })
// event for toolbox icons
d3.select(".popup-panel-icon-location")
    .on("click", function() {
        //doPanelAdd();
    })
    .on("mouseover", function() {
        showPanelTooltip("popup-panel-icon-location", "Set as current location");
    })
    .on("mouseout", function() {
        panel_tooltip.style("opacity", 0.0);
    });
d3.select(".popup-panel-icon-add")
    .on("click", function() {
        doPanelAdd();
    })
    .on("mouseover", function() {
        showPanelTooltip("popup-panel-icon-add", "Add new comparing country");
    })
    .on("mouseout", function() {
        panel_tooltip.style("opacity", 0.0);
    });
d3.select(".popup-panel-icon-remove")
    .on("click", function() {
        doPanelRemove();
    })
    .on("mouseover", function() {
        showPanelTooltip("popup-panel-icon-remove", "Remove last country");
    })
    .on("mouseout", function() {
        panel_tooltip.style("opacity", 0.0);
    });
d3.select(".popup-panel-icon-browse")
    .on("click", function() {
        //doPanelAdd();
    })
    .on("mouseover", function() {
        showPanelTooltip("popup-panel-icon-browse", "Browse the food");
    })
    .on("mouseout", function() {
        panel_tooltip.style("opacity", 0.0);
    });
d3.select(".popup-panel-icon-close")
    .on("click", function() {
        doPanelClose();
    })
    .on("mouseover", function() {
        showPanelTooltip("popup-panel-icon-close", "Close panel");
    })
    .on("mouseout", function() {
        panel_tooltip.style("opacity", 0.0);
    });



