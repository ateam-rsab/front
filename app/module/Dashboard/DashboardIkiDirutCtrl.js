define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DashboardIkiDirutCtrl', ['socket', 'ManageManegement', '$rootScope', '$scope', 'ModelItem', '$state','ManageLogistikPhp', 'DateHelper',
        function(socket, ManageManegement, $rootScope, $scope, ModelItem, $state,manageLogistikPhp,dateHelper) {
            $scope.now = new Date();
            $scope.from = $scope.now;
            $scope.until = $scope.now;
            $scope.item={};
            var seriesName ='';
            var dataChart1=[];
            var dataCat=[];
            var maxData=0;
            var jenis='';
            var kelompokPasien='';
            var unitKerja='';
            var ruangan='';
            $scope.isRouteLoading=false;

            $scope.listKategori =[
                    // {id:1,nama:'KATEGORI LAYANAN'},//#
                    {id:1,nama:'CLINICAL PATHWAY'},
                    // {id:1,nama:'FORNAS'},//#
                    {id:1,nama:'KEMATIAN KARENA PENDARAHAN'},//#
                    {id:1,nama:'KEMATIAN KARENA SEPSIS'},
                    // {id:1,nama:'VENTILATOR ASSOCIATED PHEUMONIA (VAP)'},//#
                    // {id:1,nama:'PRESENTASI KEJADIAN PASIEN JATUH'},//#
                    {id:1,nama:'TINDAKAN OPERASI RUANGAN NICU'},
                    {id:1,nama:'WAKTU TUNGGU RAWAT JALAN (WTRJ)'},
                    {id:1,nama:'WAKTU TUNGGU RADIOLOGI (WTPR)'},
                    {id:1,nama:'WAKTU TUNGGU LABORATORIUM (WTPL)'},
                    {id:1,nama:'KENDALI DOKUMEN REKAM MEDIS'},
                    
                ]
            // $scope.item.kategori = {id:1,nama:'VISITE DOKTER'}

            manageLogistikPhp.getDataTableTransaksi("managemen/get-combo").then(function(e) {
                $scope.listDepartemen = e.data.departemen;
                $scope.listPegawai = e.data.pegawai;
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
            // $scope.$watch('item.kategori', function(e) {
            //     if (e === undefined) return;
            //     // $scope.end = moment(e).format('YYYY-MM-DD');
            //     // $scope.refresh();
            //     loadData()
            // });

            $scope.SearchData = function(){
                loadData()
            }
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
            function loadData(){
                
                var tglAwal=moment($scope.from).format('YYYY-MM-DD');
                var tglAkhir=moment($scope.until).format('YYYY-MM-DD');
                if ($scope.item.kategori.nama == 'TINDAKAN OPERASI RUANGAN NICU') {
                    $scope.isRouteLoading=true;
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-nicu?").then(function(e) {
                        var datas = e.data.data; 
                        $scope.sourcechart=datas;
                        $scope.chart0 =true;
                        $scope.chart11 =false;
                        // $scope.chart1 ={
                        //      title: {
                        //         // text: "Pengelompokan " 
                        //     },
                        //     legend: {
                        //         position: "top"
                        //     },
                        //     seriesDefaults: {
                        //         labels: {
                        //             template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                        //             position: "outsideEnd",
                        //             visible: true,
                        //             background: "transparent"
                        //         }
                        //     },
                        //     series: [{
                        //         type: "column",
                        //         field:"total",
                        //         categoryField:"namaproduk"
                        //     }],
                        //     tooltip: {
                        //         visible: true,
                        //         template: "#= category # - #= kendo.format('{0:P}', percentage) #"
                        //     }
                        // };  
                        $scope.gridShow=false 
                        $scope.gridShow5=false
                        $scope.gridShow2=false
                        $scope.gridShow3=false
                        $scope.gridShow6=false
                        $scope.gridShow7=false
                        $scope.gridShow8=false
                    })  
                     $scope.detailShow=true
                     manageLogistikPhp.getDataTableTransaksi("managemen/get-data-nicu-grid?"
                        // + "tglAwal=" + tglAwal
                        // + "&tglAkhir=" + tglAkhir
                        ).then(function (data) {
                        for (var i = 0; i < data.data.length; i++) {
                            data.data.data[i].no = i + 1
                        }
                        $scope.dataGridVisite = new kendo.data.DataSource({
                        data: data.data.data,
                        group: $scope.group,
                        pageSize: 10,
                        total: data.data.data.length,
                        serverPaging: false,
                        schema: {
                            model: {
                                fields: {
                                }
                            }
                        }
                    });
                        $scope.isRouteLoading=false;
                    })  
                }
                if ($scope.item.kategori.nama == 'KENDALI DOKUMEN REKAM MEDIS') {
                    $scope.isRouteLoading=true;
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-kendalirekammedis?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(e) {
                        var datas = e.data.data;
                        $scope.sourcechart=datas;
                        $scope.chart0 =true;
                        $scope.chart11 =false;
                        $scope.chart1 ={
                            title: {
                        },
                        legend: {
                            position: "top"
                        },
                        seriesDefaults: {
                            labels: {
                                template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                                position: "outsideEnd",
                                visible: true,
                                background: "transparent"
                            }
                        },
                        series: [{
                            type: "column",
                            field:"total",
                            categoryField:"keterangan",
                            seriesColors : ["#4286f4","#dff441"],
                        }],
                        tooltip: {
                            visible: true,
                            template: "#= category # - #= kendo.format('{0:P}', percentage) #"
                        }
                    };
                        $scope.gridShow5=false
                        $scope.gridShow2=false 
                        $scope.detailShow=false
                        $scope.gridShow3=false
                        $scope.gridShow6=false
                        $scope.gridShow7=false
                        $scope.gridShow8=false
                    }) 
                    $scope.gridShow=true
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-kendalirekammedis-grid?"
                            + "tglAwal=" + tglAwal
                            + "&tglAkhir=" + tglAkhir
                            ).then(function (data) {
                            for (var i = 0; i < data.data.length; i++) {
                            data.data.data[i].no = i + 1
                            }
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
                        $scope.isRouteLoading=false;
                    })  
                }
                if ($scope.item.kategori.nama == 'WAKTU TUNGGU RAWAT JALAN (WTRJ)') {
                    $scope.isRouteLoading=true;
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-wtrj?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(e) {
                        var datas = e.data.data;
                        $scope.sourcechart=datas;
                        $scope.chart0 =true;
                        $scope.chart11 =false;
                        $scope.chart1 ={
                            title: {
                        },
                        legend: {
                            position: "top"
                        },
                        seriesDefaults: {
                            labels: {
                                template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                                position: "outsideEnd",
                                visible: true,
                                background: "transparent"
                            }
                        },
                        series: [{
                            type: "column",
                            field:"total",
                            categoryField:"jeniskegiatan",
                            seriesColors : ["#4286f4","#dff441"],
                        }],
                        tooltip: {
                            visible: true,
                            template: "#= category # - #= kendo.format('{0:P}', percentage) #"
                        }
                    };
                         $scope.detailShow=false
                         $scope.gridShow2=false 
                         $scope.gridShow=false 
                         $scope.gridShow3=false
                         $scope.gridShow6=false
                         $scope.gridShow7=false
                         $scope.gridShow8=false
                    })

                    $scope.gridShow5=true   
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-wtrj-grid?"
                            + "tglAwal=" + tglAwal
                            + "&tglAkhir=" + tglAkhir
                            ).then(function (data) {
                            var datas= data.data.data
                            for (var i = 0; i < datas.length; i++) {
                            datas[i].no = i + 1
                            }
                            // $scope.dataGridVisite = e.data.data  
                            $scope.dataGrid5 = new kendo.data.DataSource({
                            data: datas,
                            group: $scope.groupos,
                            pageSize: 10,
                            total: datas.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                    }
                                }
                            }
                        });
                        $scope.isRouteLoading=false;
                    })  
                }
                if ($scope.item.kategori.nama == 'WAKTU TUNGGU RADIOLOGI (WTPR)') {
                    $scope.isRouteLoading=true;
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-wtpr?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(e) {
                        var datas = e.data.data;
                        $scope.sourcechart=datas;
                        $scope.chart0 =true;
                        $scope.chart11 =false;
                        $scope.chart1 = {
                                title: {
                                // text: "Pengelompokan " 
                            },
                            legend: {
                                position: "top"
                            },
                            seriesDefaults: {
                                labels: {
                                    template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                                    position: "outsideEnd",
                                    visible: true,
                                    background: "transparent"
                                }
                            },
                            series: [{
                                type: "column",
                                field:"total",
                                categoryField:"jeniskegiatan",
                                seriesColors : ["#4286f4","#dff441"],
                            }],
                            tooltip: {
                                visible: true,
                                template: "#= category # - #= kendo.format('{0:P}', percentage) #"
                            }
                        };
                        $scope.detailShow=false
                        $scope.gridShow5=false
                        $scope.gridShow6=false  
                        $scope.gridShow=false  
                        $scope.gridShow3=false
                        $scope.gridShow7=false
                        $scope.gridShow8=false
                    })
                    $scope.gridShow2=true
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-wtpr-grid?"
                            + "tglAwal=" + tglAwal
                            + "&tglAkhir=" + tglAkhir
                            ).then(function (data) {
                            for (var i = 0; i < data.data.length; i++) {
                            data.data.data[i].no = i + 1
                            }
                            // $scope.dataGridVisite = e.data.data  
                            $scope.dataGrid3 = new kendo.data.DataSource({
                            data: data.data.data,
                            group: $scope.groupssi,
                            pageSize: 10,
                            total: data.data.data.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                }
                            }
                        }
                    });
                    $scope.isRouteLoading=false;
                })                 
            }
            if ($scope.item.kategori.nama == 'WAKTU TUNGGU LABORATORIUM (WTPL)') {
                    $scope.isRouteLoading=true;
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-wtpl?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(e) {
                        var datas = e.data.data;
                        $scope.sourcechart=datas;
                        $scope.chart0 =true;
                        $scope.chart11 =false;
                        $scope.chart1 = {
                                title: {
                                // text: "Pengelompokan " 
                            },
                            legend: {
                                position: "top"
                            },
                            seriesDefaults: {
                                labels: {
                                    template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                                    position: "outsideEnd",
                                    visible: true,
                                    background: "transparent"
                                }
                            },
                            series: [{
                                type: "column",
                                field:"total",
                                categoryField:"jeniskegiatan",
                                seriesColors : ["#4286f4","#dff441"],
                            }],
                            tooltip: {
                                visible: true,
                                template: "#= category # - #= kendo.format('{0:P}', percentage) #"
                            }
                        };
                        $scope.detailShow=false
                        $scope.gridShow5=false
                        $scope.gridShow6=false  
                        $scope.gridShow=false  
                        $scope.gridShow2=false
                        $scope.gridShow7=false
                        $scope.gridShow8=false
                    })
                    $scope.gridShow3=true
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-wtpl-grid?"
                            + "tglAwal=" + tglAwal
                            + "&tglAkhir=" + tglAkhir
                            ).then(function (data) {
                            for (var i = 0; i < data.data.length; i++) {
                            data.data.data[i].no = i + 1
                            }
                            // $scope.dataGridVisite = e.data.data  
                            $scope.dataGrid4 = new kendo.data.DataSource({
                            data: data.data.data,
                            group: $scope.groupsesi,
                            pageSize: 10,
                            total: data.data.data.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                }
                            }
                        }
                    });
                    $scope.isRouteLoading=false;
                })                 
            }

            if ($scope.item.kategori.nama == 'KEMATIAN KARENA PENDARAHAN') {
                    $scope.isRouteLoading=true;
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-kematianpendarahan?").then(function(e) {
                        var datas = e.data.data;
                        $scope.sourcechart=datas;
                        $scope.chart0 =true;
                        $scope.chart11 =false;
                        $scope.chart1 = {
                                title: {
                                // text: "Pengelompokan " 
                            },
                            legend: {
                                position: "top"
                            },
                            seriesDefaults: {
                                labels: {
                                    template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                                    position: "outsideEnd",
                                    visible: true,
                                    background: "transparent"
                                }
                            },
                            series: [{
                                type: "column",
                                field:"count",
                                categoryField:"kddiagnosatindakan",
                                seriesColors : ["#4286f4","#dff441"],
                            }],
                            tooltip: {
                                visible: true,
                                template: "#= category # - #= kendo.format('{0:P}', percentage) #"
                            }
                        };
                        $scope.detailShow=false
                        $scope.gridShow5=false  
                        $scope.gridShow=false  
                        $scope.gridShow2=false
                        $scope.gridShow3=false
                        $scope.gridShow6=false
                        $scope.gridShow8=false
                    })
                    $scope.gridShow7=true
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-kematianpendarahan-grid?"
                            ).then(function (data) {
                            var datas = data.data;
                            for (var i = 0; i < datas.length; i++) {
                            datas[i].no = i + 1
                            }
                            // $scope.dataGridVisite = e.data.data  
                            $scope.dataGrid7 = new kendo.data.DataSource({
                            data: datas,
                            // group: $scope.groupss,
                            pageSize: 10,
                            total: datas.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                }
                            }
                        }
                    });
                    $scope.isRouteLoading=false;
                })                 
            }

            if ($scope.item.kategori.nama == 'CLINICAL PATHWAY') {
                    $scope.isRouteLoading=true;
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-clincalpathway?").then(function(e) {
                        var datas = e.data.data;
                        $scope.sourcechart=datas;
                        $scope.chart0 =true;
                        $scope.chart11 =false;
                        $scope.chart1 = {
                                title: {
                                // text: "Pengelompokan " 
                            },
                            legend: {
                                position: "top"
                            },
                            seriesDefaults: {
                                labels: {
                                    template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                                    position: "outsideEnd",
                                    visible: true,
                                    background: "transparent"
                                }
                            },
                            series: [{
                                type: "column",
                                field:"count",
                                categoryField:"kddiagnosatindakan",
                                seriesColors : ["#4286f4","#dff441"],
                            }],
                            tooltip: {
                                visible: true,
                                template: "#= category # - #= kendo.format('{0:P}', percentage) #"
                            }
                        };
                        $scope.detailShow=false
                        $scope.gridShow5=false  
                        $scope.gridShow=false  
                        $scope.gridShow2=false
                        $scope.gridShow3=false
                        $scope.gridShow7=false
                        $scope.gridShow8=false
                    })
                    $scope.gridShow6=true
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-clincalpathway-grid?"
                            ).then(function (data) {
                            var datas = data.data;
                            for (var i = 0; i < datas.length; i++) {
                            datas[i].no = i + 1
                            }
                            // $scope.dataGridVisite = e.data.data  
                            $scope.dataGrid6 = new kendo.data.DataSource({
                            data: datas,
                            // group: $scope.groupss,
                            pageSize: 10,
                            total: datas.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                }
                            }
                        }
                    });
                    $scope.isRouteLoading=false;
                })                 
            }

            if ($scope.item.kategori.nama == 'KEMATIAN KARENA SEPSIS') {
                    $scope.isRouteLoading=true;
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-kematian-sepsis?").then(function(e) {
                        var datas = e.data.data;
                        $scope.sourcechart=datas;
                        $scope.chart0 =true;
                        $scope.chart11 =false;
                        $scope.chart1 = {
                                title: {
                                // text: "Pengelompokan " 
                            },
                            legend: {
                                position: "top"
                            },
                            seriesDefaults: {
                                labels: {
                                    template: "#= category # - #= kendo.format('{0:P}', percentage)#",
                                    position: "outsideEnd",
                                    visible: true,
                                    background: "transparent"
                                }
                            },
                            series: [{
                                type: "column",
                                field:"count",
                                categoryField:"kddiagnosatindakan",
                                seriesColors : ["#4286f4","#dff441"],
                            }],
                            tooltip: {
                                visible: true,
                                template: "#= category # - #= kendo.format('{0:P}', percentage) #"
                            }
                        };
                        $scope.detailShow=false
                        $scope.gridShow5=false  
                        $scope.gridShow=false  
                        $scope.gridShow2=false
                        $scope.gridShow3=false
                        $scope.gridShow7=false
                    })
                    $scope.gridShow8=true
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-kematian-sepsis-grid?"
                            ).then(function (data) {
                            var datas = data.data;
                            for (var i = 0; i < datas.length; i++) {
                            datas[i].no = i + 1
                            }
                            // $scope.dataGridVisite = e.data.data  
                            $scope.dataGrid8 = new kendo.data.DataSource({
                            data: datas,
                            // group: $scope.groupss,
                            pageSize: 10,
                            total: datas.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                }
                            }
                        }
                    });
                    $scope.isRouteLoading=false;
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
                    seriesColors : ["#DDDC8D","#f9de17","#009933","#28F917", "#1769F9", "#F617F9","#66ccff",
                                    "#F98817", "#38C176", "#6F1cBCD", "#F756A2", "#AE1006", "#800000",
                                    "#0033cc","#00ff00","#339933","#006699","#3366ff","#0000cc","#99cc00",
                                    "#99cc00","#33cc33","#006600","#999966","#6600cc","#003399"],
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
                field: "namaproduk",
                aggregates: [
                {
                    field: "namaproduk",
                    aggregate: "count"
                }]
            };
            $scope.aggregate = [{
                field: "namaproduk",
                aggregate: "count"
                },
                {
                    field: "namaproduk",
                    aggregate: "count"
                }]
        $scope.columnGridVisite = [
            {
                "field": "no",
                "title": "No",
                "width" : "30px",
            },
             {
                "field": "tglregistrasi",
                "title": "Tgl Daftar",
                 template: "#= new moment(new Date(tglregistrasi)).format('DD-MM-YYYY HH:mm') #",
                "width" : "80px",
            },
            {
                "field": "nocm",
                "title": "No CM",
                "width" : "80px",
            },
            {
                "field": "noregistrasi",
                "title": "No Registrasi",
                "width" : "80px",
            },
            {
                "field": "namapasien",
                "title": "Nama Pasien",
                "width" : "80px",
            },
            {
               
                field: "namaproduk",
                title: "Jenis Layanan",
                aggregates: ["count"],
                groupHeaderTemplate: "Layanan #= value # (Jumlah: #= count#)"
            }
        ];

        $scope.groups = {
                field: "keterangan",
                aggregates: [
                {
                    field: "keterangans",
                    aggregate: "count"
                }]
            };
             $scope.aggregates = [{
                field: "keterangan",
                aggregates: "count"
                },
                {
                    field: "keterangan",
                    aggregates: "count"
                }]
        $scope.columnGrid1 = [
            {
                "field": "tglregistrasi",
                "title": "Tgl Registrasi",
                "width" : "100px",
            },
            {
                "field": "noregistrasi",
                "title": "No Registrasi",
                "width" : "100px",
            },
            {
                "field": "namapasien",
                "title": "Nama Pasien",
                "width" : "130px",
            },
            {
                "field": "tglkeluar",
                "title": "Tgl Keluar Dokumen",
                "width" : "100px",
            },
            {
                "field": "tglkembali",
                "title": "Tgl Keluar Dokumen",
                "width" : "100px",
            },
            {
                "field": "statusdokumen",
                "title": "Status Dokumen",
                "width" : "130px",
            },
            {
                hidden: true,
                field: "keterangan",
                title: "keterangan",
                aggregates: ["count"],
                groupHeaderTemplate: "keterangan #= value # (Jumlah: #= count#)"
            }
        ];

       $scope.groupses = {
                field: "intervals",
                aggregates: [
                {
                    field: "intervals",
                    aggregate: "count"
                }]
            };
             $scope.aggregateses = [{
                field: "intervals",
                aggregateses: "count"
                },
                {
                    field: "intervals",
                    aggregateses: "count"
                }]
        $scope.columnGrid2 = [
            {
                "field": "tglregistrasi",
                "title": "Tgl Daftar",
                "template": "#= new moment(new Date(tglregistrasi)).format('DD-MM-YYYY HH:mm') #",
                "width" : "80px",
            },
            {
                "field": "nocm",
                "title": "No CM",
                "width" : "80px",
            },
            {
                "field": "noregistrasi",
                "title": "No Registrasi",
                "width" : "100px",
            },
            {
                "field": "namapasien",
                "title": "Nama Pasien",
                "width" : "130px",
            },
            {
                "field": "tgldipanggilsuster",
                "title": "Tgl Masuk Ruangan",
                "template": "#= new moment(new Date(tgldipanggilsuster)).format('DD-MM-YYYY HH:mm') #",
                "width" : "80px",
            },
            {
                hidden: true,
                field: "intervals",
                title: "intervals",
                aggregateses: ["count"],
                groupHeaderTemplate: "intervals #= value # (Jumlah: #= count#)"
            }
        ];
        
        $scope.groupssi = {
                field: "keterangan",
                aggregates: [
                {
                    field: "keterangan",
                    aggregate: "count"
                }]
            };
             $scope.aggregateesi = [{
                field: "keterangan",
                aggregateesi: "count"
                },
                {
                    field: "keterangan",
                    aggregateesi: "count"
                }]
        $scope.columnGrid3 = [
            {
                "field": "tglregistrasi",
                "title": "Tgl Daftar",
                 template: "#= new moment(new Date(tglregistrasi)).format('DD-MM-YYYY HH:mm') #",
                "width" : "80px",
            },
            {
                "field": "noregistrasi",
                "title": "No Registrasi",
                "width" : "100px",
            }, 
            {
                "field": "namadokter",
                "title": "Nama Dokter",
                "width" : "130px",
            },           
            {
                "field": "tglstruk",
                "title": "Tgl Masuk Ruangan",
                template: "#= new moment(new Date(tglstruk)).format('DD-MM-YYYY HH:mm') #",
                "width" : "80px",
            },
            {
                "field": "interval",
                "title": "interval",
                "width" : "100px",
            },
            {
                hidden: true,
                field: "keterangan",
                title: "keterangan",
                aggregateesi: ["count"],
                groupHeaderTemplate: "keterangan #= value # (Jumlah: #= count#)"
            }
        ];

        $scope.groupsesi = {
                field: "keterangan",
                aggregates: [
                {
                    field: "keterangan",
                    aggregate: "count"
                }]
            };
             $scope.aggregateses = [{
                field: "keterangan",
                aggregateses: "count"
                },
                {
                    field: "keterangan",
                    aggregateses: "count"
                }]
        $scope.columnGrid4 = [
            {
                "field": "tglregistrasi",
                "title": "Tgl Daftar",
                 template: "#= new moment(new Date(tglregistrasi)).format('DD-MM-YYYY HH:mm') #",
                "width" : "80px",
            },
            {
                "field": "noregistrasi",
                "title": "No Registrasi",
                "width" : "100px",
            }, 
            {
                "field": "namadokter",
                "title": "Nama Dokter",
                "width" : "130px",
            },           
            {
                "field": "tglstruk",
                "title": "Tgl Masuk Ruangan",
                template: "#= new moment(new Date(tglstruk)).format('DD-MM-YYYY HH:mm') #",
                "width" : "80px",
            },
            {
                "field": "interval",
                "title": "interval",
                "width" : "100px",
            },
            {
                hidden: true,
                field: "keterangan",
                title: "keterangan",
                aggregateesi: ["count"],
                groupHeaderTemplate: "keterangan #= value # (Jumlah: #= count#)"
            }
        ];

        $scope.groupos = {
                field: "lamapelayanan",
                aggregates: [
                {
                    field: "lamapelayanan",
                    aggregate: "count"
                }]
            };
             $scope.aggregateo = [{
                field: "lamapelayanan",
                aggregateo: "count"
                },
                {
                    field: "lamapelayanan",
                    aggregateo: "count"
                }]
        $scope.columnGrid5 = [
            {
                "field": "tglregistrasi",
                "title": "Tgl Daftar",
                "template": "#= new moment(new Date(tglregistrasi)).format('DD-MM-YYYY HH:mm') #",
                "width" : "80px",
            },
            {
                "field": "noregistrasi",
                "title": "No Registrasi",
                "width" : "100px",
            },
            {
                "field": "namapasien",
                "title": "Nama Pasien",
                "width" : "130px",
            },
            {
                "field": "tgldipanggilsuster",
                "title": "Tgl Masuk Ruangan",
                template: "#= new moment(new Date(tgldipanggilsuster)).format('DD-MM-YYYY HH:mm') #",
                "width" : "80px",
            },
            {
                "field": "namadokter",
                "title": "Dokter",
                "width" : "80px",
            },
            {
                "field": "interval",
                "title": "Interval",
                "width" : "80px",
            },
            {
                hidden:true,
                field:"lamapelayanan",
                title:"Keterangan",
                // "width" : "150px",
                aggregateo: ["count"],
                groupHeaderTemplate: "lamapelayanan #= value # (Jumlah: #= count#)"
            }
        ];

        $scope.groupis = {
                field: "intervals",
                aggregates: [
                {
                    field: "intervals",
                    aggregate: "count"
                }]
            };
             $scope.aggregatee = [{
                field: "statusdokumen",
                aggregatee: "count"
                },
                {
                    field: "statusdokumen",
                    aggregatee: "count"
                }]
        $scope.columnGrid10 = [
            {
                "field": "no",
                "title": "No",
                "width" : "60px",
            },
            {
                "field": "kddiagnosatindakan",
                "title": "Kde Diagnosa",
                "width" : "80px",
            },
            {
                "field": "namadiagnosatindakan",
                "title": "Nama Diagnosa",
                "width" : "100px",
            },
            {
                "field": "totalperdokter",
                "title": "Realisasi Per Dokter",
                "template": '#=kendo.format("{0:p}", totalperdokter / 100)#',
                "width" : "50px",
            },
            {
                "field": "totaldiagnosa",
                "title": "Realisasi Per Diagnosa",
                "template": '#=kendo.format("{0:p}", totaldiagnosa / 100)#',
                "width" : "50px",
            }
            // ,{
            //     hidden: true,
            //     field: "intervals",
            //     title: "intervals",
            //     aggregatee: ["count"],
            //     groupHeaderTemplate: "intervals #= value # (Jumlah: #= count#)"
            // }
        ];

        $scope.groupis = {
                field: "intervals",
                aggregates: [
                {
                    field: "intervals",
                    aggregate: "count"
                }]
            };
             $scope.aggregatee = [{
                field: "statusdokumen",
                aggregatee: "count"
                },
                {
                    field: "statusdokumen",
                    aggregatee: "count"
                }]
        $scope.columnGrid11 = [
            {
                "field": "no",
                "title": "No",
                "width" : "60px",
            },
            {
                "field": "kddiagnosa",
                "title": "Kde Diagnosa",
                "width" : "80px",
            },
            {
                "field": "namadiagnosa",
                "title": "Nama Diagnosa",
                "width" : "100px",
            },
            {
                "field": "totalperdokter",
                "title": "Realisasi Per Dokter",
                "template": '#=kendo.format("{0:p}", totalperdokter / 100)#',
                "width" : "50px",
            },
            {
                "field": "totaldiagnosa",
                "title": "Realisasi Per Diagnosa",
                "template": '#=kendo.format("{0:p}", totaldiagnosa / 100)#',
                "width" : "50px",
            }
            // ,{
            //     hidden: true,
            //     field: "intervals",
            //     title: "intervals",
            //     aggregatee: ["count"],
            //     groupHeaderTemplate: "intervals #= value # (Jumlah: #= count#)"
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