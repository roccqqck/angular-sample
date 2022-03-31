// mBankbg color
// '#009980','#C29900',
// '#3E747F','#F5AB00',
// '#1FA0C3','#DD6E1B',
// '#6C89C3','#D88E8D',
// '#8B6DAB','#C94040';,

var circledata = [
    {
        label: 'Green',
        data: 45,
        color: '#009980'
    },
    {
        label: 'Yellow',
        data: 80,
        color: '#C29900'
    },
    {
        label: 'Orange',
        data: 60,
        color: '#3E747F'
    },
    {
        label: 'Blue',
        data: 45,
        color: '#F5AB00'
    }
];
$.plot('#pieChart', circledata, {
    series: {
        pie: {
            show: true,
            radius: 1,
            label: {
                show: true,
                radius: 3 / 4,
                formatter: function (label, series) {
                    return '<div style=\"text-align:center;padding:5px;color:white;font-size:10px\">' + label + ' : ' + Math.round(series.percent) + '%</div>';
                },
                background: {
                    opacity: 0.8,
                    color: '#323232'
                }
            }
        }
    },
    legend: {
        show: false
    },
    tooltip: {
        show: true,
        content: '%p.0%, %s, n=%n', // show percentages, rounding to 2 decimal places
        shifts: {
            x: 20,
            y: 0
        },
        defaultTheme: false
    }
});
$.plot('#doughnutChart', circledata, {
    series: {
        pie: {
            innerRadius: 0.5,
            show: true,
            radius: 1,
            label: {
                show: true,
                radius: 3 / 4,
                formatter: function (label, series) {
                    return '<div style=\"text-align:center;padding:5px;color:white;font-size:10px\">' + label + ' : ' + Math.round(series.percent) + '%</div>';
                },
                background: {
                    opacity: 0.8,
                    color: '#323232'
                }
            }
        }
    },
    legend: {
        show: false
    },
    tooltip: {
        show: true,
        content: '%p.0%, %s, n=%n', // show percentages, rounding to 2 decimal places
        shifts: {
            x: 20,
            y: 0
        },
        defaultTheme: false
    }
});

var pageviews = [[13, 1700], [14, 1920], [15, 1870], [16, 1650], [17, 1500], [18, 1650], [19, 1436], [20, 1395], [21, 1479], [22, 1595], [23, 1509], [24, 1550], [25, 1480], [26, 1390], [27, 1550], [28, 1400], [29, 1590], [30, 1436]],
    visitor = [[13, 896], [14, 989], [15, 954], [16, 958], [17, 854], [18, 1056], [19, 1124], [20, 1183], [21, 1126], [22, 887], [23, 754], [24, 865], [25, 889], [26, 854], [27, 958], [28, 925], [29, 1056], [30, 984]];
var linePlot = $.plot('#lineChart', 
    [
        {
            label: 'Series1',
            data: pageviews,
            lines: {
                show: true,
                lineWidth: 2,
                fill: false
            },
            points: {
                show: true,
                radius: 4
            }
        },
        {
            label: 'Series2',
            data: visitor,
            lines: {
                show: true,
                lineWidth: 3,
                fill: false
            },
            points: {
                show: true,
                radius: 4
            }
        }
    ], {
    series: {
        lines: {
            show: true
        },
        points: {
            show: true
        },
        shadowSize: 0 // Drawing is faster without shadows
    },
    colors: ['#009980', '#C29900'],
    legend: {
        show: true,
        noColumns: 0,
        position: 'nw',
        backgroundColor: null,
        backgroundOpacity: 0
    },
    grid: {
        borderWidth: 0,
        hoverable: true,
        clickable: true
    },
    yaxis: {
        ticks: 5,
        tickColor: 'rgba(0,0,0,.1)'
    },
    xaxis: {
        ticks: 7,
        tickColor: 'transparent'
    },
    tooltip: {
        show: true,
        cssClass: 'flotTips',
        content: 'x: %x, y: %y'
    }
});
var areaPlot = $.plot('#areaChart', 
    [
        {
            label: 'Pageviews',
            data: pageviews,
            lines: {
                show: true,
                lineWidth: 0,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 0.5
                    }, {
                        opacity: 0.5
                    }]
                }
            },
            points: {
                show: false,
                radius: 2
            }
        },
        {
            label: 'Visitors',
            data: visitor,
            lines: {
                show: true,
                lineWidth: 0,
                fill: true,
                fillColor: {
                    colors: [{
                        opacity: 0.9
                    }, {
                        opacity: 0.9
                    }]
                }
            },
            points: {
                show: false,
                radius: 4
            }
        }
    ], {
    series: {
        lines: {
            show: true
        },
        points: {
            show: true
        },
        shadowSize: 0 // Drawing is faster without shadows
    },
    colors: ['#009980', '#C29900'],
    legend: {
        show: true,
        noColumns: 0,
        position: 'nw',
        backgroundColor: null,
        backgroundOpacity: 0
    },
    grid: {
        borderWidth: 0,
        hoverable: true,
        clickable: true
    },
    yaxis: {
        show: false,
        ticks: 5,
        tickColor: 'rgba(0,0,0,.1)'
    },
    xaxis: {
        show: false,
        ticks: 7,
        tickColor: 'transparent'
    },
    tooltip: {
        show: true,
        cssClass: 'flotTips',
        content: 'x: %x, y: %y'
    }
});
var barPlot = $.plot('#barChart', 
    [
        {
            label: 'Series1',
            data: [[1, 10], [2, 8], [3, 4], [4, 13], [5, 17], [6, 9], [7, 12], [8, 15], [9, 9], [10, 15]],
        },
        {
            label: 'Series2',
            data: [[1, 2], [2, 3], [3, 1], [4, 8], [5, 15], [6, 0], [7, 2], [8, 1], [9, 3], [10, 6]],
        }
    ], {
    series: {
        stack:true,
        bars: {
            show: true,
            barWidth: 0.6,
            align: "center",
            fill: true,
            fillColor: {
                colors: [{
                    opacity: 0.9
                }, {
                    opacity: 0.9
                }]
            }
        }
    },
    colors: ['#009980', '#C29900'],
    yaxis: {
        ticks: 5,
        tickColor: 'rgba(0,0,0,.1)'
    },
    xaxis: {
        ticks: 7,
        tickColor: 'transparent'
    },
    grid: {
        hoverable: true,
        clickable: true,
        tickColor: '#eeeeee',
        borderWidth: 0
    },
    legend: {
        show: true,
        noColumns: 0,
        position: 'nw',
        backgroundColor: null,
        backgroundOpacity: 0
    },
    tooltip: {
        show: true,
        cssClass: 'flotTips',
        content: 'x: %x, y: %y'
    }
});