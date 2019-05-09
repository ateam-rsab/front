define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('CoreDashboard2Ctrl', ['socket', 'ManageManegement', '$rootScope', '$scope', 'ModelItem', '$state','ManageLogistikPhp',
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
                if (jenis == '') {
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-dashboard4?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(e) {
                        // chart1 =e.data.chart1
                        dataChart1=e.data.data
                        maxData=e.data.maxdata
                        $(document).ready(createChart);
                        $(document).bind("kendo:skinChange", createChart);  
                        $scope.gridShow =false 
                    })  
                }
                if (jenis == 'Detail Kelompok') {
                     manageLogistikPhp.getDataTableTransaksi("managemen/get-dashboard-unitkerja?tglAwal="+tglAwal+
                    "&tglAkhir="+tglAkhir+
                    '&kelompokPasien='+kelompokPasien).then(function(e) {
                        dataChart1=e.data.data
                        maxData=e.data.maxdata
                        // dataCat=e.data.dataCat
                        dataCat=['']
                        $(document).ready(createChart);
                        $(document).bind("kendo:skinChange", createChart);  
                        $scope.gridShow =false 
                        
                    }) 
                }

                if (jenis == 'Detail UnitKerja') {
                     manageLogistikPhp.getDataTableTransaksi("managemen/get-dashboard-ruangan?tglAwal="+tglAwal+
                    "&tglAkhir="+tglAkhir+
                    '&kelompokPasien='+kelompokPasien+
                    '&namadepartemen='+unitKerja).then(function(e) {
                        dataChart1=e.data.data
                        maxData=e.data.maxdata
                        // dataCat=e.data.dataCat
                        dataCat=['']
                        $(document).ready(createChart);
                        $(document).bind("kendo:skinChange", createChart);  
                        $scope.gridShow =false 
                        
                    }) 
                }
                if (jenis == 'Detail tindakan') {
                    $scope.gridShow =true
                     manageLogistikPhp.getDataTableTransaksi("managemen/get-dashboard-detail-ruangan?tglAwal="+tglAwal+
                    "&tglAkhir="+tglAkhir+
                    '&kelompokPasien='+kelompokPasien+
                    '&namaruangan='+ruangan).then(function(e) {
                        var subTotal=0
                        for (var i = e.data.data.length - 1; i >= 0; i--) {
                            e.data.data[i].no = i+1
                            if (e.data.data[i].hargasatuan == undefined) {
                                e.data.data[i].hargasatuan = 0
                            }
                            e.data.data[i].total = parseFloat(e.data.data[i].qty) * parseFloat(e.data.data[i].hargasatuan)
                            subTotal = parseFloat(subTotal) + parseFloat(e.data.data[i].total)
                        }
                        $scope.item.subTotal1 =  parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                        $scope.dataGrid1=e.data.data

                        subTotal=0
                        for (var i = e.data.dataDokter.length - 1; i >= 0; i--) {
                            e.data.dataDokter[i].no = i+1
                            if (e.data.dataDokter[i].hargasatuan == undefined) {
                                e.data.dataDokter[i].hargasatuan = 0
                            }
                            e.data.dataDokter[i].total = parseFloat(e.data.dataDokter[i].qty) * parseFloat(e.data.dataDokter[i].hargasatuan)
                            subTotal = parseFloat(subTotal) + parseFloat(e.data.dataDokter[i].total)
                        }
                        $scope.item.subTotal2 = parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                        $scope.dataGrid2=e.data.dataDokter
                        
                    }) 
                }
            }

        function createChart() {
            if (jenis == '') {
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
            if (jenis == 'Detail Kelompok' || jenis == 'Detail UnitKerja') {
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
                        categories: dataCat,
                        line: {
                            visible: false
                        },
                        labels: {
                            rotation: "auto"
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
        }
        function onSeriesClick(e) {
            // kendoConsole.log(kendo.format("Series click :: {0} ({1}): {2}",
            //     e.series.name, e.category, e.value));
            //alert(e.series.name +' ' + e.category + ' ' + e.value)
            if (jenis == '') {
                kelompokPasien = e.series.name
                jenis = 'Detail Kelompok'
                loadData()   
                return
            }
            if (jenis == 'Detail Kelompok') {
                unitKerja = e.series.name
                jenis = 'Detail UnitKerja'
                loadData()      
                return
            }
            if (jenis == 'Detail UnitKerja' || jenis == 'Detail tindakan') {
                ruangan = e.series.name
                jenis = 'Detail tindakan'
                loadData()      
                return
            }
        }
        $scope.back = function(){
            jenis = ''
            loadData()
        }
        
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
            return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }

            

            


//________________________________________________________________________________
        }
    ]);
});