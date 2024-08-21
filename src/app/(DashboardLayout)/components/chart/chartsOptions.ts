export const LineBarOptions = {
    credits: false,
    title: {
        text: null
    },
    xAxis: {
        gridLineWidth: 0,
        lineWidth: 0,
        labels: {
            enabled: false,
        },
        title: {
            enabled: false,
        },
    },
    yAxis: {
        gridLineWidth: 0,
        lineWidth: 0,
        labels: {
            enabled: false,
        },
        title: {
            enabled: false,
        },
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            dataLabels: {
                enabled: false,
                inside: true
            }
        }
    },
    chart: {
        type: 'bar',
        height: 200,
    },
    series: [
        {
            showInLegend: false,
            name: 'Capacidad Total',
            data: [2000],
            color: "#E8E8E8",
            zIndex: 3
        },
        {
            showInLegend: false,
            name: 'Pagos Pendiente',
            data: [2500],
            color: "#C2E6FA",
            zIndex: 2
        },
        {
            showInLegend: false,
            name: 'Pagos Recibidos',
            data: [5000],
            color: "#70E798",
            zIndex: 1
        },
    ]
};

export const LineOptions = {
    credits: false,
    loading: {
        hideDuration: 100,
        showDuration: 100,
        labelStyle: {color: '#AF11177F', fontWeight: 'bold', fontSize: '18px'},
        style: {opacity: 1, backgroundColor: "transparent",}
    },
    lang: {noData: "No hay información para mostrar", loading: "Cargando..."},
    title: {
        text: 'Mis Ventas en los ultimos 6 meses'
    },
    xAxis: {
        categories: []
    },
    yAxis: {
        title: {
            enabled: false,
        },
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    chart: {
        type: 'line',
        height: 315,
        backgroundColor: 'rgba(255,255,255,0.75)',
        color: '#fff',
        borderRadius: 4
    },
    series: []
};


export const StageOptions = {
    credits: false,
    lang: {noData: "No hay información para mostrar", loading: "Cargando..."},
    title: {
        text: 'Etapas'
    },
    xAxis: {
        type: 'category',
        gridLineWidth: 0,
        lineWidth: 0,
        labels: {
            enabled: false,
        },
        title: {
            enabled: false,
        },
    },
    yAxis: {
        gridLineWidth: 0,
        lineWidth: 0,
        labels: {
            enabled: false,
        },
        title: {
            enabled: false,
        },
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y} unidades'
            }
        }
    },
    chart: {
        type: 'column',
        height: 315,
        backgroundColor: 'rgba(255,255,255,0.75)',
        color: '#fff',
        borderRadius: 4
    },
    series: []
};





export const PieOptions = {
    credits: false,
    title: {
        text: null
    },
    xAxis: {
        gridLineWidth: 0,
        lineWidth: 0,
        labels: {
            enabled: false,
        },
        title: {
            enabled: false,
        },
    },
    yAxis: {
        gridLineWidth: 0,
        lineWidth: 0,
        labels: {
            enabled: false,
        },
        title: {
            enabled: false,
        },
    },
    tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<span style="font-size: 1.2em"><b>{point.name}</b>' +
                    '</span><br>' +
                    '<span style="opacity: 0.6">{point.percentage:.1f} ' +
                    '%</span>',
                connectorColor: 'rgba(128,128,128,0.5)'
            }
        }
    },
    chart: {
        height:350,
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    series: []
};
