define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DashboardVisiteDokterCtrl', ['socket', 'ManageManegement', '$rootScope', '$scope', 'ModelItem', '$state','ManageLogistikPhp',
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
                    // {id:1,nama:'KATEGORI LAYANAN'},//#
                    {id:1,nama:'VISITE DOKTER'},
                    {id:1,nama:'KENDALI DOKUMEN REKAM MEDIS'},
                    {id:1,nama:'SISTEM ANTRIAN PASIEN ONLINE'},//#
                    {id:1,nama:'KETERSEDIAAN TEMPAT TIDUR'},//#
                    // {id:1,nama:'JENIS PEMBAYARAN JASA'}//#
                ]
            // $scope.item.kategori = {id:1,nama:'VISITE DOKTER'}

            manageLogistikPhp.getDataTableTransaksi("managemen/get-combo").then(function(e) {
                $scope.listDepartemen = e.data.departemen
                $scope.listPegawai = e.data.pegawai
            }) 
                    
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
            // $scope.$watch('item.kategori', function(e) {
            //     if (e === undefined) return;
            //     // $scope.end = moment(e).format('YYYY-MM-DD');
            //     // $scope.refresh();
            //     loadData()
            // });
            $scope.SearchData = function(){
                loadData()
            }

            $scope.loadCari = function(){
                loadData()
            }

            var chart1 ={}
            //loadData()
            function loadData(){
                
                var tglAwal=moment($scope.from).format('YYYY-MM-DD');
                var tglAkhir=moment($scope.until).format('YYYY-MM-DD');

                if ($scope.item.kategori.nama == 'VISITE DOKTER') {
                    // jenis = 'Column'
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-visite?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(e) {                    
                        var datas = e.data;
                        $scope.sourcechart=datas;
                        $scope.chart1 = {
                            title: {
                            },
                                legend: {
                                    position: "top"
                            },
                            seriesDefaults: {
                                labels: {
                                    // template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                                    position: "outsideEnd",
                                    visible: true,
                                    background: "transparent"
                                }
                            },
                            series: [{
                                type: "column",
                                field:"total",
                                categoryField:"keterangan",
                            }],
                            seriesColors : ["#3f51b5","#89f442","#4caf50","#f9ce1d","#ff9800","#ff5722"],
                            tooltip: {
                                visible: true,
                                // format: "{0}",
                                template: "#= category #: #= value #"
                            }
                        };

                        $scope.chart2 = {
                            title: {
                            },
                                legend: {
                                    position: "top"
                            },
                            seriesDefaults: {
                                labels: {
                                    position: "outsideEnd",
                                    visible: true,
                                    background: "transparent"
                                }
                            },
                            seriesColors : ["#3f51b5","#89f442","#4caf50","#f9ce1d","#ff9800","#ff5722"],
                            series: [{
                                type: "pie",
                                field:"total",
                                categoryField:"keterangan",
                            }],
                            tooltip: {
                                visible: true,
                                template: "#= category # - #= kendo.format('{0:P}', percentage) #"                                
                            }
                        };
                        // dataChart1=e.data.data
                        // maxData=e.data.maxdata
                        // $(document).ready(createChart);
                        // $(document).bind("kendo:skinChange", createChart);  
                        $scope.gridShow =false
                        $scope.gridShow1=false
                        $scope.gridShow2=false
                    })  
                     $scope.detailShow=true
                     manageLogistikPhp.getDataTableTransaksi("managemen/get-data-visite-grid?"
                        + "tglAwal=" + tglAwal
                        + "&tglAkhir=" + tglAkhir
                        ).then(function (data) {
                            var dataGrid= data.data
                            
                            for (var i = 0; i < dataGrid.length; i++) {
                                dataGrid[i].no = i + 1
                            }

                            $scope.dataGridVisite = new kendo.data.DataSource({
                                data: dataGrid,
                                group: $scope.group,
                                pageSize: 10,
                                total: data.length,
                                serverPaging: false,
                                schema: {
                                    model: {
                                        fields: {
                                        }
                                    }
                                }
                            });
                    })  
                }
                if ($scope.item.kategori.nama == 'KENDALI DOKUMEN REKAM MEDIS') {
                    jenis = 'Column'
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-kendalirekammedis?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(e) {
                        var datas = e.data.data;
                        $scope.sourcechart=datas;
                        // chart1 =e.data.chart1
                        dataChart1=e.data.data
                        maxData=e.data.maxdata
                        $(document).ready(createChart);
                        $(document).bind("kendo:skinChange", createChart);  
                        $scope.gridShow1=false
                        $scope.detailShow=false
                        $scope.gridShow2=false
                    }) 
                    $scope.gridShow=true
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-kendalirekammedis-grid?"
                            + "tglAwal=" + tglAwal
                            + "&tglAkhir=" + tglAkhir
                            ).then(function (data) {
                            for (var i = 0; i < data.data.length; i++) {
                            data.data.data[i].no = i + 1
                            }
                            // $scope.dataGridVisite = e.data.data  
                            $scope.dataGrid1 = new kendo.data.DataSource({
                            data: data.data.data,
                            group: $scope.groups,
                            pageSize: 10,
                            total: data.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                    }
                                }
                            }
                        });
                    })  
                }
                if ($scope.item.kategori.nama == 'SISTEM ANTRIAN PASIEN ONLINE') {
                    // jenis = 'Column'
                    // manageLogistikPhp.getDataTableTransaksi("managemen/get-data-kendalirekammedis?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(e) {
                    //     // chart1 =e.data.chart1
                    //     dataChart1=e.data.data
                    //     maxData=e.data.maxdata
                    //     $(document).ready(createChart);
                    //     $(document).bind("kendo:skinChange", createChart);  
                    //     $scope.detailShow=false
                    //     $scope.gridShow2=false
                    //     $scope.gridShow1=false
                    // }) 
                
                    // $scope.gridShow=true
                    // manageLogistikPhp.getDataTableTransaksi("managemen/get-data-kendalirekammedis-grid?"
                    //         + "tglAwal=" + tglAwal
                    //         + "&tglAkhir=" + tglAkhir
                    //         ).then(function (data) {
                    //         for (var i = 0; i < data.data.length; i++) {
                    //         data.data.data[i].no = i + 1
                    //         }
                    //         // $scope.dataGridVisite = e.data.data  
                    //         $scope.dataGrid3 = new kendo.data.DataSource({
                    //         data: data.data.data,
                    //         group: $scope.groupps,
                    //         pageSize: 10,
                    //         total: data.length,
                    //         serverPaging: false,
                    //         schema: {
                    //             model: {
                    //                 fields: {
                    //                 }
                    //             }
                    //         }
                    //     });
                    // })  
                }
                if ($scope.item.kategori.nama == 'KETERSEDIAAN TEMPAT TIDUR') {
                    jenis = 'Column'
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-statusbed?").then(function(e) {
                        // chart1 =e.data.chart1
                        dataChart1=e.data.data
                        maxData=e.data.maxdata
                        $(document).ready(createChart);
                        $(document).bind("kendo:skinChange", createChart);  
                        $scope.detailShow=false
                        $scope.gridShow1=false
                        $scope.gridShow=false
                       
                    })
                    $scope.gridShow2=true
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-statusbed-grid?"
                            // + "tglAwal=" + tglAwal
                            // + "&tglAkhir=" + tglAkhir
                            ).then(function (data) {
                            for (var i = 0; i < data.data.length; i++) {
                            data.data.data[i].no = i + 1
                            }
                            // $scope.dataGridVisite = e.data.data  
                            $scope.dataGrid2 = new kendo.data.DataSource({
                            data: data.data.data,
                            group: $scope.groupss,
                            pageSize: 10,
                            total: data.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                }
                            }
                        }
                    });
                })                 
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
                    seriesColors :["#DDDC8D","#f9de17","#009933","#1769F9","#F617F9","#66ccff",
                                    "#F98817","#38C176", "#6F1BCD","#F756A2",
                                    "#0033cc","#00ff00","#339933","#006699","#3366ff","#0000cc","#99cc00",
                                    "#33cc33","#006600","#999966","#6600cc","#003399"],
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
        $scope.group = {
                field: "keterangan",
                aggregates: [
                {
                    field: "keterangan",
                    aggregate: "count"
                }]
            };
            $scope.aggregate = [{
                field: "keterangan",
                aggregate: "count"
                },
                {
                    field: "keterangan",
                    aggregate: "count"
                }]
        $scope.columnGridVisite = [
            {
                "field": "no",
                "title": "No",
                "width" : "30px",
            },
            {
                "field": "namalengkap",
                "title": "Dokter",
                "width" : "80px",
            },
            {
                "field": "tglpelayanan",
                "title": "Waktu Layanan",
                 template: "#= new moment(new Date(tglpelayanan)).format('DD-MM-YYYY HH:mm') #",
                "width" : "80px",
            },
            {
                "field": "namaruangan",
                "title": "Nama Ruang",
                "width" : "130px",
            },
            {
                hidden: true,
                field: "keterangan",
                title: "Jenis Layanan",
                aggregates: ["count"],
                groupHeaderTemplate: "Layanan #= value # (Jumlah: #= count#)"
            }
        ];

        $scope.groups = {
                field: "statusdokumen",
                aggregates: [
                {
                    field: "statusdokumen",
                    aggregate: "count"
                }]
            };
             $scope.aggregates = [{
                field: "statusdokumen",
                aggregates: "count"
                },
                {
                    field: "statusdokumen",
                    aggregates: "count"
                }]
        $scope.columnGrid1 = [
            // {
            //     "field": "no",
            //     "title": "No",
            //     "width" : "30px",
            // },
            {
                "field": "tglupdate",
                "title": "Tgl Update Dokumen",
                "width" : "100px",
            },
            // {
            //     "field": "statusdokumen",
            //     "title": "Status Dokumen",
            //     "width" : "130px",
            // },
            {
                "field": "tglkembali",
                "title": "Tgl Kembali Dokumen",
                "width" : "100px",
            },
            {
                "field": "indikator",
                "title": "Indikator",
                "width" : "130px",
            },
            {
                hidden: true,
                field: "statusdokumen",
                title: "statusdokumen",
                aggregates: ["count"],
                groupHeaderTemplate: "statusdokumen #= value # (Jumlah: #= count#)"
            }
        ];
        $scope.groupss = {
                field: "namaruangan",
                aggregates: [
                {
                    field: "namaruangan",
                    aggregate: "count"
                }
                // {
                //     field: "statusbed",
                //     aggregate: "count"
                // },
                // {
                //     field: "namakelas",
                //     aggregate: "count"
                // }
                ]
            };
            $scope.aggregatesss = [{
                field: "namaruangan",
                aggregatesss: "count"
                },
                {
                    field: "namaruangan",
                    aggregatesss: "count"
                }]
        $scope.columnGrid2 = [
            {
                "field": "no",
                "title": "No",
                "width" : "30px",
            },
            {
                "field": "namakamar",
                "title": "Nama Kamar",
                "width" : "130px",
            },
            // {
            //     "field": "namaruangan",
            //     "title": "Nama Ruangan",
            //     "width" : "130px",
            // },
            {
                "field": "statusbed",
                "title": "Status",
                "width" : "80px",
            },
            // {
            //     "field": "",
            //     "title": "Tarif",
            //     "width" : "80px",
            // },
            // {
            //     "field": "",
            //     "title": "Total",
            //     "width" : "80px",
            // },
            {
                hidden: true,
                field: "namaruangan",
                title: "namaruangan",
                aggregatesss: ["count"],
                groupHeaderTemplate: "namaruangan #= value # (Jumlah: #= count#)"
            }
            // {
            //     hidden: true,
            //     field: "namakelas",
            //     title: "namakelas",
            //     aggregatesss: ["count"],
            //     groupHeaderTemplate: "namakelas #= value # (Jumlah: #= count#)"
            // },
            // {
            //     hidden: true,
            //     field: "statusbed",
            //     title: "statusbed",
            //     aggregatesss: ["count"],
            //     groupHeaderTemplate: "statusbed #= value # (Jumlah: #= count#)"
            // }

        ];
        $scope.formatRupiah = function(value, currency) {
             return currency  + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            //return value
        }

            

            


//________________________________________________________________________________
        }
    ]);
});