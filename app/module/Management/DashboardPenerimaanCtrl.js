define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DashboardPenerimaanCtrl', ['socket', 'ManageManegement', '$rootScope', '$scope', 'ModelItem', '$state','ManageLogistikPhp',
        function(socket, ManageManegement, $rootScope, $scope, ModelItem, $state,manageLogistikPhp) {
            $scope.now = new Date();
            $scope.from = $scope.now;
            $scope.until = $scope.now;
            $scope.item={}
            var seriesName =''
            var dataChart1=[]
            var dataCat=[]
            var maxData=0
            var jenis=''
            var kelompokPasien=''
            var unitKerja=''
            var ruangan=''

            $scope.listKategori =[
                    {id:1,nama:'KATEGORI LAYANAN'},//#
                    {id:1,nama:'KATEGORI TINDAKAN'},
                    {id:1,nama:'TINGKAT'},
                    {id:1,nama:'JENIS PEMBAYARAN'},//#
                    {id:1,nama:'KLASIFIKASI LAYANAN'},//#
                    {id:1,nama:'JENIS PEMBAYARAN JASA'}//#
                ]
            $scope.item.kategori = {id:1,nama:'KATEGORI LAYANAN'}

            manageLogistikPhp.getDataTableTransaksi("managemen/get-combo").then(function(e) {
                $scope.listDepartemen = e.data.departemen
                $scope.listPegawai = e.data.pegawai
            }) 

            
            // ManageManegement.getListDashboard($state.params.module).then(function(e) {
            //     $scope.listData = e.data.data.items;
            //     $scope.refresh();
            // })
            // socket.on('Dashboard', function(data) {
            //     $rootScope.doneLoad = false;
            //     ManageManegement.getListDashboard($state.params.module).then(function(e) {
            //         $scope.listData = e.data.data.items;
            //         $scope.refresh();
            //         $rootScope.doneLoad = true;
            //     })
            // });
            $scope.$watch('from', function(e) {

                if (e === undefined) return;
                // $scope.start = moment(e).format('YYYY-MM-DD');
                // $scope.refresh();
                loadData()
            });
            $scope.$watch('until', function(e) {
                if (e === undefined) return;
                // $scope.end = moment(e).format('YYYY-MM-DD');
                // $scope.refresh();
                loadData()
            });
            $scope.$watch('item.kategori', function(e) {
                if (e === undefined) return;
                // $scope.end = moment(e).format('YYYY-MM-DD');
                // $scope.refresh();
                loadData()
            });
            // });
            // $scope.refresh = function() {

            //     var arr = [];
            //     for (var key in $scope.listData) {
            //         if ($scope.listData.hasOwnProperty(key)) {
            //             var element = $scope.listData[key];
            //             element.url = 'management/get-detail-dashboard/' + element.noRec.trim() + '/' + $scope.start + '/' + $scope.end
            //             arr.push(element);
            //         }
            //     }
            //     $scope.listData = arr;
            // }
            $scope.loadCari = function(){
                loadData()
            }

            var chart1 ={}
            //loadData()
            function loadData(){
                
                var tglAwal=moment($scope.from).format('YYYY-MM-DD');
                var tglAkhir=moment($scope.until).format('YYYY-MM-DD');
                // manageLogistikPhp.getDataTableTransaksi("logistik/get-dashboard3?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(e) {
                //     chart1 =e.data.chart1
                //     $(document).ready(createChart(chart1));
                //     $(document).bind("kendo:skinChange", createChart(chart1));  
                    
                // })  
                if ($scope.item.kategori.nama == 'KATEGORI LAYANAN') {
                    jenis = 'Column'
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-dashboard-penerimaan-satu?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(e) {
                        // chart1 =e.data.chart1
                        dataChart1=e.data.data
                        maxData=e.data.maxdata
                        $(document).ready(createChart);
                        $(document).bind("kendo:skinChange", createChart);  
                        $scope.gridShow =false 
                    })  
                    $scope.detailShow=true
                     manageLogistikPhp.getDataTableTransaksi("managemen/get-dashboard-penerimaan-detail-all?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(e) { 
                        $scope.dataGridDetail = e.data.data  
                    })  
                }
                if ($scope.item.kategori.nama == 'JENIS PEMBAYARAN JASA') {
                    jenis = 'Column'
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-dashboard-penerimaan-JenisPembayaranJasa?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(e) {
                        // chart1 =e.data.chart1
                        dataChart1=e.data.data
                        maxData=e.data.maxdata
                        $(document).ready(createChart);
                        $(document).bind("kendo:skinChange", createChart);  
                        $scope.gridShow =false 
                    }) 
                    $scope.detailShow=false
                    $scope.dataGridDetail =[]
                }
                if ($scope.item.kategori.nama == 'KATEGORI TINDAKAN') {
                    jenis = 'Column'
                    // manageLogistikPhp.getDataTableTransaksi("managemen/get-dashboard-penerimaan-klasifikasi-byr?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(e) {
                        // chart1 =e.data.chart1
                        dataChart1=[]//e.data.data
                        maxData=0//e.data.maxdata
                        $(document).ready(createChart);
                        $(document).bind("kendo:skinChange", createChart);  
                        $scope.gridShow =false 
                    // }) 
                    $scope.detailShow=false
                    $scope.dataGridDetail =[]
                }
                if ($scope.item.kategori.nama == 'TINGKAT') {
                    jenis = 'Column'
                    // manageLogistikPhp.getDataTableTransaksi("managemen/get-dashboard-penerimaan-klasifikasi-byr?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(e) {
                        // chart1 =e.data.chart1
                        dataChart1=[]//=e.data.data
                        maxData=0//e.data.maxdata
                        $(document).ready(createChart);
                        $(document).bind("kendo:skinChange", createChart);  
                        $scope.gridShow =false 
                    // }) 
                    $scope.detailShow=false
                    $scope.dataGridDetail =[]
                }
                if ($scope.item.kategori.nama == 'KLASIFIKASI LAYANAN') {
                    jenis = 'Column'
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-dashboard-penerimaan-klasifikasi-byr?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(e) {
                        // chart1 =e.data.chart1
                        dataChart1=e.data.data
                        maxData=e.data.maxdata
                        $(document).ready(createChart);
                        $(document).bind("kendo:skinChange", createChart);  
                        $scope.gridShow =false 
                    }) 
                    $scope.detailShow=false
                    $scope.dataGridDetail =[]
                }
                if ($scope.item.kategori.nama == 'JENIS PEMBAYARAN') {
                    jenis = 'Column'
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-dashboard-penerimaan-JenisPembayaran?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(e) {
                        // chart1 =e.data.chart1
                        dataChart1=e.data.data
                        maxData=e.data.maxdata
                        $(document).ready(createChart);
                        $(document).bind("kendo:skinChange", createChart);  
                        $scope.gridShow =false 
                    })  
                    $scope.detailShow=false
                    $scope.dataGridDetail =[]
                }
            }

        function createChart() {
            if (jenis == 'Column') {
                $("#chart").kendoChart({
                    legend: {
                        position: "bottom"
                    },
                    seriesDefaults: {
                        type: "column"
                    },
                    series: dataChart1,
                    seriesColors : ["#F91717", "#F9E417", "#28F917", "#1769F9", "#F617F9",
                                "#F98817", "#38C176", "#6F1BCD", "#F756A2", "#AE1006"],
                    valueAxis: {
                        labels: {
                            format: "{0%}",
                            template: "#= series.name #: #= value #"
                        },
                        line: {
                            visible: false
                        },
                        axisCrossingValue: 0
                    },
                    valueAxes: [{
                        name: "jml",
                        color: "#007eff",
                        min: 0,
                        max: maxData + (maxData * 30/100)
                    }],
                    categoryAxis: {
                        categories: [''],
                        line: {
                            visible: false
                        }
                    },
                    tooltip: {
                        visible: true,
                        format: "{0}",
                        template: "#= series.name #: #= value #"
                    },
                    seriesClick: onSeriesClick,
                });
            }
            if (jenis == 'PIE') {
                $("#chart").kendoChart({
                    title: {
                        position: "bottom",
                        // text: "Share of Internet Population Growth, 2007 - 2012"
                    },
                    legend: {
                        visible: false
                    },
                    chartArea: {
                        background: ""
                    },
                    seriesDefaults: {
                        labels: {
                            visible: true,
                            background: "transparent",
                            template: "#= category #: \n #= value#%"
                        }
                    },
                    series: dataChart1,
                    tooltip: {
                        visible: true,
                        format: "{0}%"
                    }
                });
            }
        }
        function onSeriesClick(e) {
             
            var tglAwal=moment($scope.from).format('YYYY-MM-DD');
            var tglAkhir=moment($scope.until).format('YYYY-MM-DD');
            if ($scope.item.kategori.nama == 'KATEGORI LAYANAN') { 
                $scope.detailShow=true
                 manageLogistikPhp.getDataTableTransaksi("managemen/get-dashboard-penerimaan-detail-all?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir+'&deptId='+e.series.name).then(function(e) { 
                    $scope.dataGridDetail = e.data.data  
                })  
            }
        }
        $scope.back = function(){
            jenis = ''
            loadData()
        }
        $scope.columnGridDetail = [
            // {
            //     "field": "q",
            //     "title": "No",
            //     "width" : "30px",
            // },
            {
                "field": "title",
                "title": "Jenis Layanan",
                "width" : "130px",
            },
            {
                "field": "desc",
                "title": "''",
                "width" : "80px",
            },
            {
                "field": "satuan",
                "title": "Satuan",
                "width" : "80px",
            },
            {
                "title": "Target",
                "columns" : [
                    {
                        "field": "t_BPJS",
                        "title": "BPJS",
                        "width": 60,
                        "template": "<span class='style-right'>{{formatRupiah('#: t_BPJS #', '')}}</span>"
                    },{
                        "field": "t_NonBPJS",
                        "title": "Non BPJS",
                        "width": 60,
                        "template": "<span class='style-right'>{{formatRupiah('#: t_NonBPJS #', '')}}</span>"
                    },{
                        "field": "t_Total",
                        "title": "Total",
                        "width": 60,
                        "template": "<span class='style-right'>{{formatRupiah('#: t_Total #', '')}}</span>"
                    }
                ]
            },
            {
                "title": "Realisasi",
                "columns" : [
                    {
                        "field": "r_BPJS",
                        "title": "BPJS",
                        "width": 70,
                        "template": "<span class='style-right'>{{formatRupiah('#: r_BPJS #', '')}}</span>"
                    },{
                        "field": "r_NonBPJS",
                        "title": "Non BPJS",
                        "width": 70,
                        "template": "<span class='style-right'>{{formatRupiah('#: r_NonBPJS #', '')}}</span>"
                    },{
                        "field": "r_Total",
                        "title": "Total",
                        "width": 70,
                        "template": "<span class='style-right'>{{formatRupiah('#: r_Total #', '')}}</span>"
                    }
                ]
            },
            {
                "title": "CAPAIAN KINERJA (%)",
                "columns" : [
                    {
                        "field": "c_BPJS",
                        "title": "BPJS",
                        "width": 60,
                        "template": "<span class='style-right'>{{formatRupiah('#: c_BPJS #', '')}}</span>"
                    },{
                        "field": "c_NonBPJS",
                        "title": "Non BPJS",
                        "width": 60,
                        "template": "<span class='style-right'>{{formatRupiah('#: c_NonBPJS #', '')}}</span>"
                    },{
                        "field": "c_Total",
                        "title": "Total",
                        "width": 60,
                        "template": "<span class='style-right'>{{formatRupiah('#: c_Total #', '')}}</span>"
                    }
                ]
            }
        ];
        
        $scope.columnGrid1 = [
            {
                "field": "no",
                "title": "No",
                "width" : "30px",
            },
            {
                "field": "namaproduk",
                "title": "Item",
                "width" : "130px",
            },
            {
                "field": "qty",
                "title": "Jumlah",
                "width" : "80px",
            },
            {
                "field": "hargasatuan",
                "title": "Tarif",
                "width" : "80px",
            },
            {
                "field": "total",
                "title": "Total",
                "width" : "80px",
            }
        ];
        $scope.columnGrid2 = [
            {
                "field": "no",
                "title": "No",
                "width" : "30px",
            },
            {
                "field": "namalengkap",
                "title": "Pegawai",
                "width" : "130px",
            },
            {
                "field": "namaproduk",
                "title": "Item",
                "width" : "130px",
            },
            {
                "field": "qty",
                "title": "Jumlah",
                "width" : "80px",
            },
            {
                "field": "hargasatuan",
                "title": "Tarif",
                "width" : "80px",
            },
            {
                "field": "total",
                "title": "Total",
                "width" : "80px",
            }
        ];
        $scope.formatRupiah = function(value, currency) {
             return currency  + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            //return value
        }

            

            


//________________________________________________________________________________
        }
    ]);
});