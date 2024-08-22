
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
