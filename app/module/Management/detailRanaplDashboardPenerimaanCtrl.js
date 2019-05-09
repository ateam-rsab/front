define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('detailRanapDashboardPenerimaanCtrl', ['socket', 'ManageManegement', '$rootScope', '$scope', 'ModelItem', '$state','ManageLogistikPhp','DateHelper',
        function(socket, ManageManegement, $rootScope, $scope, ModelItem, $state,manageLogistikPhp, dateHelper) {
            $scope.now = new Date();
            $scope.from = $scope.now;
            $scope.until = $scope.now;
            $scope.item={};
            var seriesName ='';
            var dataChart1=[];
            var dataCat=[];
            var maxData=0;
            var maxDataVol=0;
            var totTarget=0;
            var volTarget=0;
            var totTotal=0;
            var volVolume=0;
            var maxData1=0;
            var maxDataVol1=0;
            var kategori=0;
            var jenis='';
            var kelompokPasien='';
            var unitKerja='';
            var ruangan='';
            var namaBulan='';
            var Data=[];
            var detail = '';
            $scope.isRouteLoading=false;
            Load();
           
            manageLogistikPhp.getDataTableTransaksi("managemen/get-combo").then(function(e) {
                $scope.listDepartemen = e.data.departemen
                $scope.listPegawai = e.data.pegawai
            });

            $scope.SearchData = function(){
                $scope.isRouteLoading=true;
                var tglAwal=moment($scope.from).format('YYYY-MM-DD');
                var tglAkhir=moment($scope.until).format('YYYY-MM-DD');
                manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-grid?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(dat) { 
                    Data = e.data.dataheader;
                    $scope.dataSource = dat.data.dataheader;
                    $scope.isRouteLoading=false;
                });
            };

            function Load(){
                if($state.params != undefined){
                        detail = $state.params.detail;
                        init()
                }else{
                    init()
                }
            }

            function init() {
                if (detail != '') {
                    if (detail == 'peristi') {

                            $scope.Datakinerja = function(){
                                $scope.Tbedah=false;
                                $scope.Ticu=false;
                                $scope.TPeristi=true;
                                $scope.Datakinerja = [];   
                                var periodeAwal= "01-01-" + moment($scope.from).format('YYYY');             
                                var tglAwal=periodeAwal;
                                var tglAkhir=moment($scope.until).format('YYYY-MM-DD');
                                manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-detail-peristi?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir+"&detail="+detail).then(function(dat) { 
                                   var datas = dat.data;
                                   var tot = 0;
                                   var subtot = 0;
                                   var sub = 0;
                                   totTarget=parseFloat(datas.datatarget[3].targetrupiah);
                                   volTarget=parseFloat(datas.datatarget[6].targetrupiah);
                                   subtot =parseFloat(datas.data[0].total);
                                   sub= parseFloat(datas.data[1].total);
                                   tot= subtot+sub;
                                   totTotal=totTarget+volTarget;
                                        var obj = {
                                            targetBLU : parseFloat(datas.datatarget[3].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetpasienBpjs : parseFloat(datas.datatarget[4].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetpasienNonBpjs : parseFloat(datas.datatarget[5].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetPRM : parseFloat(datas.datatarget[6].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetBPeg : parseFloat(datas.datatarget[2].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetBBrg : parseFloat(datas.datatarget[0].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetBMod : parseFloat(datas.datatarget[1].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            totalPend : parseFloat(totTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            proBPJS : parseFloat(datas.data[0].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            proNonBPJS : parseFloat(datas.data[1].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            totBLU : parseFloat(tot).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                        };
                                        $scope.Datakinerja.push(obj);
                                });
                        }

                        $scope.Datakinerja();
                    }

                    if (detail == 'bedah') {

                            $scope.Datakinerjas = function(){
                                $scope.Tbedah=true;
                                $scope.Ticu=false;
                                $scope.TPeristi=false;
                                $scope.Datakinerjas = [];   
                                var periodeAwal= "01-01-" + moment($scope.from).format('YYYY');             
                                var tglAwal=periodeAwal;
                                var tglAkhir=moment($scope.until).format('YYYY-MM-DD');
                                manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-detail-rehab?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir+"&detail="+detail).then(function(dat) { 
                                   var datas = dat.data;
                                   var tot = 0;
                                   var subtot = 0;
                                   var sub = 0;
                                   totTarget=parseFloat(datas.datatarget[3].targetrupiah);
                                   volTarget=parseFloat(datas.datatarget[4].targetrupiah);
                                   subtot =parseFloat(datas.data[0].total);
                                   sub= parseFloat(datas.data[1].total);
                                   tot= subtot+sub;
                                   totTotal=totTarget+volTarget;
                                        var obj = {
                                            targetBLU : parseFloat(datas.datatarget[3].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetpasienBpjs : parseFloat(datas.datatarget[6].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetpasienNonBpjs : parseFloat(datas.datatarget[5].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetPRM : parseFloat(datas.datatarget[4].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetBPeg : parseFloat(datas.datatarget[2].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetBBrg : parseFloat(datas.datatarget[0].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetBMod : parseFloat(datas.datatarget[1].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            totalPend : parseFloat(totTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            proBPJS : parseFloat(datas.data[0].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            proNonBPJS : parseFloat(datas.data[1].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            totBLU : parseFloat(tot).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                        };
                                        $scope.Datakinerjas.push(obj);
                                });
                        }

                        $scope.Datakinerjas();
                    }

                    if (detail == 'icu') {

                            $scope.Datakinerjass = function(){
                                $scope.Tbedah=false;
                                $scope.Ticu=true;
                                $scope.TPeristi=false;
                                $scope.Datakinerjass = [];   
                                var periodeAwal= "01-01-" + moment($scope.from).format('YYYY');             
                                var tglAwal=periodeAwal;
                                var tglAkhir=moment($scope.until).format('YYYY-MM-DD');
                                manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-detail-Radiologi?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir+"&detail="+detail).then(function(dat) { 
                                   var datas = dat.data;
                                   var tot = 0;
                                   var subtot = 0;
                                   var sub = 0;
                                   totTarget=parseFloat(datas.datatarget[3].targetrupiah);
                                   volTarget=parseFloat(datas.datatarget[4].targetrupiah);
                                   subtot =parseFloat(datas.data[0].total);
                                   sub= parseFloat(datas.data[1].total);
                                   tot= subtot+sub;
                                   totTotal=totTarget+volTarget;
                                        var obj = {
                                            targetBLU : parseFloat(datas.datatarget[3].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetpasienBpjs : parseFloat(datas.datatarget[6].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetpasienNonBpjs : parseFloat(datas.datatarget[5].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetPRM : parseFloat(datas.datatarget[4].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetBPeg : parseFloat(datas.datatarget[2].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetBBrg : parseFloat(datas.datatarget[0].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetBMod : parseFloat(datas.datatarget[1].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            totalPend : parseFloat(totTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            proBPJS : parseFloat(datas.data[0].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            proNonBPJS : parseFloat(datas.data[1].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            totBLU : parseFloat(tot).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                        };
                                        $scope.Datakinerjass.push(obj);
                                });
                        }

                        $scope.Datakinerjass();
                    }
                }  
            };

            // function Load(){
            //     $scope.isRouteLoading=true;
            //     var periodeAwal= "01-01-" + moment($scope.from).format('YYYY');
            //     var tglAwal= periodeAwal;
            //     var tglAkhir=moment($scope.until).format('YYYY-MM-DD');
            //     manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-grid-chart?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(dat) { 
            //         var datas= dat.data.dataIsi;
            //         for (var i = 0; i < datas.length; i++) {
            //             datas[i].no = i+1                         
            //             var bulan = datas[i].blnpelayanan;
            //             switch (bulan) {
            //                 case "01":
            //                     namaBulan="Januari";
            //                     break;
            //                 case "02":
            //                     namaBulan="Februari";
            //                     break; 
            //                 case "03":
            //                     namaBulan="Maret";
            //                     break; 
            //                 case "04":
            //                     namaBulan="April";
            //                     break;
            //                 case "05":
            //                     namaBulan="Mei";
            //                     break;
            //                 case "06":
            //                     namaBulan="Juni";
            //                     break; 
            //                 case "07":
            //                     namaBulan="Juli";
            //                     break; 
            //                 case "08":
            //                     namaBulan="Agustus";
            //                     break;
            //                 case "09":
            //                     namaBulan="September";
            //                     break;
            //                 case "10":
            //                     namaBulan="Oktober";
            //                     break; 
            //                 case "11":
            //                     namaBulan="November";
            //                     break; 
            //                 case "12":
            //                     namaBulan="Desember";
            //                     break; 
            //             }
            //             datas[i].bulan =namaBulan;
            //             maxData=Math.max(datas[i].total);
            //             maxDataVol=Math.max(datas[i].volume);
            //         }
            //         maxData1=(maxData*200)/100;
            //         maxDataVol1=(maxDataVol*200)/100;
            //         $scope.sourcechart=datas;
            //         $scope.sourcechart1=datas;
            //         $scope.isRouteLoading=false;   
            //         $scope.chart ={
            //             // title: {
            //             //     text: "Capaian Penerimaan"
            //             // },
            //             legend: {
            //                 position: "top"
            //             },
            //             seriesDefaults: {
            //                 type: "line"
            //             },
            //             series: [
            //             {
            //                 field: "pelayanan",
            //                 categoryField: "bulan",
            //                 name: "pelayanan",
            //                 color: "#41f4d9"
            //             }, 
            //             {
            //                 field: "totaltarget",
            //                 categoryField: "bulan",
            //                 name: "totaltarget",
            //                 color: "#6242f4"
            //             }, 
            //             {
            //                 field: "total",
            //                 categoryField: "bulan",
            //                 name: "total",
            //                 color: "#d3f441"
            //             }
            //             ],
            //             categoryAxis: {
            //                 categories: {
            //                     categoryField: "pelayanan"
            //                 },
            //                 labels: {
            //                     rotation: -90
            //                 },
            //                 crosshair: {
            //                     visible: true
            //                 }
            //             },
            //             valueAxis: {
            //                 type: "log",
            //                 labels: {
            //                     format: "N0"
            //                 },
            //                 minorGridLines: {
            //                     visible: true
            //                 }
            //             },
            //             tooltip: {
            //                 visible: true,
            //                 shared: true,
            //                 format: "NO",
            //                 // template: "#= field # - #= kendo.format('{0:P}', percentage) #"
            //             }
            //         };
            //         $scope.chart1 ={
            //             // title: {
            //             //     text: "Capaian Penerimaan"
            //             // },
            //             legend: {
            //                 position: "top"
            //             },
            //             seriesDefaults: {
            //                 type: "line"
            //             },
            //             series: [
            //             {
            //                 field: "pelayanan",
            //                 categoryField: "bulan",
            //                 name: "pelayanan",
            //                 color: "#bac136"
            //             }, 
            //             {
            //                 field: "volumetarget",
            //                 categoryField: "bulan",
            //                 name: "volumetarget",
            //                 color: "#758411"
            //             }, 
            //             {
            //                 field: "volume",
            //                 categoryField: "bulan",
            //                 name: "volume",
            //                 color: "#dbfc02"
            //             }
            //             ],
            //             categoryAxis: {
            //                 categories: {
            //                     categoryField: "pelayanan"
            //                 },
            //                 labels: {
            //                     rotation: -90
            //                 },
            //                 crosshair: {
            //                     visible: true
            //                 }
            //             },
            //             valueAxis: {
            //                 type: "log",
            //                 labels: {
            //                     format: "N0"
            //                 },
            //                 minorGridLines: {
            //                     visible: true
            //                 }
            //             },
            //             tooltip: {
            //                 visible: true,
            //                 shared: true,
            //                 format: "N0",
            //                 // template: "#= field # - #= kendo.format('{0:P}', percentage) #"
            //             }
            //         };                
            //     });
            // }

            $scope.detailGridOptions = function(dataItem) {
                return {
                        dataSource: new kendo.data.DataSource({
                        data: dataItem.detail
                        }),
                        columns: [
                           {
                                field: "pelayanantarget",
                                headerAttributes:{style:"align; text-align : center"},
                                title: "Pelayanan",
                                width: "120px"
                           },
                           {
                                title:"Target",
                                headerAttributes:{style:"align; text-align : center"},
                                columns:[
                                {
                                    field: "volumetarget",
                                    title: "Volume",
                                    template: '#= kendo.toString(volumetarget, "n") #',
                                    width: "120px"
                                },
                                {
                                    field: "totaltarget",
                                    title: "Total (Rp)",
                                    template: "<span class='style-right'>{{formatRupiah('#: totaltarget #', '')}}</span>",
                                    width: "120px"
                                }]
                           },
                           {
                                title:"Capaian",
                                headerAttributes:{style:"align; text-align : center"},
                                columns:[
                                {
                                    field: "volume",
                                    title: "Volume",
                                    template: '#= kendo.toString(volume, "n") #',
                                    width: "120px"
                                },
                                {
                                    field: "total",
                                    title: "Total (Rp)",
                                    template: "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>",
                                    width: "120px"
                                }
                                ]
                           }
                        ]
                }
            };

        $scope.back = function(){
            jenis = ''
            loadData()
        }

        $scope.columnNew = [
           {
                field: "pelayanan",
                headerAttributes:{style:"align; text-align : center"},
                title: "Pelayanan",
                width: "120px"
           },
           {
                title:"Target",
                headerAttributes:{style:"align; text-align : center"},
                columns:[
                {
                    field: "volumetarget",
                    title: "Volume",
                    template: '#= kendo.toString(volumetarget, "n") #',
                    width: "100px"
                },
                {
                    field: "totaltarget",
                    title: "Total (Rp)",
                    template: "<span class='style-right'>{{formatRupiah('#: totaltarget #', '')}}</span>",
                    width: "140px"
                }]
           },
           {
                title:"Capaian",
                headerAttributes:{style:"align; text-align : center"},
                columns:[
                {
                    field: "volume",
                    title: "Volume",
                    template: '#= kendo.toString(volume, "n") #',
                    width: "100px"
                },
                {
                    field: "total",
                    title: "Total (Rp)",
                    template: "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>",
                    width: "140px"
                }
                ]
           }
        ];

        $scope.formatRupiah = function(value, currency) {
             return currency  + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }
    }
    ]);
});