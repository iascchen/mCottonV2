/**
 * Created by chenhao on 16/6/20.
 */
import React from 'react';

const WidgetList = [
    ///////////////////////
    // Output

    {
        title: "Led", widget: "MLed", image: "url", widgetType: "o", cols: 1, rows: 2
    },
    {
        title: "Label", widget: "MLabel", image: "url", widgetType: "o", cols: 2, rows: 1
    },
    {
        title: "Output", widget: "MOutput", image: "url", widgetType: "o", cols: 4, rows: 2
    },

    ///////////////////////
    // Input
    {
        title: "Button", widget: "MButton", image: "url", widgetType: "i", cols: 1, rows: 2
    },
    {
        title: "Toggle", widget: "MToggle", image: "url", widgetType: "i", cols: 1, rows: 2
    },
    {
        title: "Input", widget: "MInput", image: "url", widgetType: "i", cols: 4, rows: 1
    },
    {
        title: "Slider", widget: "MSlider", image: "url", widgetType: "i", cols: 4, rows: 1
    },
    {
        title: "Range Slider", widget: "MRangeSlider", image: "url", widgetType: "i", cols: 4, rows: 1
    },
    {
        title: "Time", widget: "MTimePicker", image: "url", widgetType: "i", cols: 4, rows: 1
    },
    {
        title: "Date", widget: "MDatePicker", image: "url", widgetType: "i", cols: 4, rows: 1
    },
    {
        title: "Color(Simple)", widget: "MColor", image: "url", widgetType: "i", cols: 4, rows: 2
    },
    {
        title: "Color(Complex)", widget: "MColorChrome", image: "url", widgetType: "i", cols: 4, rows: 4
    },
    {
        title: "Selector", widget: "MSelector", image: "url", widgetType: "i", cols: 4, rows: 1
    },

    ///////////////////////
    // Input / Output

    {
        title: "Terminal", widget: "MTerminal", image: "url", widgetType: "io", cols: 4, rows: 4
    },
]

export default WidgetList;