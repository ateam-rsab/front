define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DashboardPenerimaan2Ctrl', ['socket', 'ManageManegement', '$rootScope', '$scope', 'ModelItem', '$state','ManageLogistikPhp','DateHelper',
        function(socket, ManageManegement, $rootScope, $scope, ModelItem, $state,manageLogistikPhp, dateHelper) {
            $scope.now = new Date();
            $scope.from = $scope.now;
            $scope.until = $scope.now;
            $scope.rajal = 1;
            $scope.ranap = 2;
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
            var TargetRanap=0;
            var TargetRajal=0;
            var kategori=0;
            var jenis='';
            var kelompokPasien='';
            var unitKerja='';
            var ruangan='';
            var namaBulan='';
            var Data=[];
            $scope.isRouteLoading=false;
            init();
           
            manageLogistikPhp.getDataTableTransaksi("managemen/get-combo").then(function(e) {
                $scope.listDepartemen = e.data.departemen
                $scope.listPegawai = e.data.pegawai
            }) 

            $scope.SearchData = function(){
                initSearch();
            }

            function initSearch(){
                var tglAwal=moment($scope.from).format('YYYY-MM-DD');
                var tglAkhir=moment($scope.until).format('YYYY-MM-DD');
                manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-grid-chart?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(dat) { 
                    var bulantemp=[];
                    var temp=[];
                    var datas= dat.data.Rajal;
                    var datasu= dat.data.Ranap;
                    var totaltargetinap =0;
                    var volumetargetinap =0;
                    var totalinap =0;
                    var volumeinap =0;
                    for (var i = 0; i < datas.length; i++) {
                        if(datas[i].blnpelayanan==datasu[i].blnpelayanan){
                            totaltargetinap = datasu[i].totaltargetinap;
                            volumetargetinap= datasu[i].volumetargetinap;
                            totalinap = datasu[i].totalinap;
                            volumeinap = datasu[i].volumeinap;                        
                        }
                        var bulan = parseInt(datas[i].blnpelayanan);
                        bulantemp.push(bulan);
                        totTotal = parseFloat(datas[i].totaltarget/12)
                        var tot = parseFloat(datas[i].totaltarget)
                        TargetRanap= parseFloat(totaltargetinap/12)
                        datas[i].blnpelayanan=bulan;
                        // datas[i].totaltarget=tot;
                        datas[i].totaltarget1=totTotal;
                        datas[i].totaltargetinap=totaltargetinap;
                        datas[i].totaltargetinap1=TargetRanap;
                        datas[i].volumetargetinap=volumetargetinap;
                        datas[i].totalinap=totalinap;
                        datas[i].volumeinap=volumeinap;

                    }

                    var countbulan = 0;
                    for(var i = bulantemp.length; 12 - i; i++ ){
                        if(countbulan == 0){
                           countbulan += (bulantemp.length + 1)
                        }else{
                            countbulan += 1
                        }
                        var datatemp ={
                            "id": datas[0].id,
                            "blnpelayanan": countbulan,
                            "pelayanan": datas[0].pelayanan,
                            "totaltarget": datas[0].totaltarget,
                            "totaltarget1": datas[0].totaltarget1,
                            "volumetarget": datas[0].volumetarget,
                            "totaltargetinap": datas[0].totaltargetinap,
                            "totaltargetinap1": datas[0].totaltargetinap1,
                            "volumetargetinap":datas[0].volumetargetinap,
                            "totalinap":0,
                            "volumeinap":0,
                            "total": 0,
                            "volume": 0
                        }
                        datas.push(datatemp);
                    }
                    maxData1=parseFloat(datas[0].volumetarget * 150/100);
                    maxData=parseFloat(datas[0].totaltarget1 * 350/100);
                    $scope.sourcechart=datas;
                    // $scope.sourcechart1=datasu;
                    $scope.isRouteLoading=false;   
                    $scope.chart ={
                         title: {
                        },
                        legend: {
                            position: "bottom"
                        },
                        seriesDefaults: {
                                },
                                seriesColors: ["#3f51b5","#89f442","#4caf50","#f9ce1d","#ff9800","#ff5722"],
                                series: [                               
                                {
                                    field: "totaltargetinap1",
                                    name: "Target Rawat inap",
                                    type: "area",
                                    template: "<span>{{formatRupiah('#: total #', '')}}</span>",
                                },
                                {
                                    field: "totaltarget1",
                                    name: "Target Rawat Jalan",
                                    type: "area",
                                }, 
                                {
                                    field: "totalinap",
                                    name: "Capaian Rawat Inap",
                                    type: "line"
                                }, 
                                {
                                    field: "total",
                                    name: "Capaian Rawat Jalan",
                                    type: "line"
                                }
                                ],
                                valueAxis: {
                                    labels: {
                                        // format: "{0}%"
                                    },
                                    line: {
                                        visible: false
                                    },
                                    axisCrossingValue: 0,
                                    max: maxData
                                },
                                categoryAxis: {
                                    categories: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
                                    
                                    majorGridLines: {
                                        visible: false
                                    },
                                    labels: {
                                        rotation: "auto"
                                    }
                                },
                                tooltip: {
                                    visible: true,
                                    // format: "{0}%",
                                    template: "#= series.name #: #= value #"
                                }
                    };
                });
                $scope.Datakinerja = function(){
                    $scope.isRouteLoading=true;
                    $scope.Datakinerja = [];   
                    $scope.Datakinerja1 = []; 
                    $scope.Datakinerja2 = [];
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-grid?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(dat) { 
                       var datas = dat.data.datajalan;
                       var dataInap = dat.data.datainap;
                       var totaltargetrajal=datas[0].totaltarget;
                       var totaltargetrnap=dataInap[0].totaltarget;
                       var totalrajal=datas[0].total;
                       var totalranap=dataInap[0].total;
                       totTarget=parseFloat(totaltargetrajal)+parseFloat(totaltargetrnap);
                       totTotal=parseFloat(totalrajal)+parseFloat(totalranap);
                            for (var i = 0; i < datas.length; i++) {
                            var obj = {
                                pelayanan : datas[i].pelayanan,
                                volumetargetdetailbpjs : parseFloat(datas[i].detail[0].volumetarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaltargetdetailbpjs : parseFloat(datas[i].detail[0].totaltarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumetarget :  parseFloat(datas[i].volumetarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaltarget : parseFloat(datas[i].totaltarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumedetailbpjs  : parseFloat(datas[i].detail[0].volume).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaldetailbpjs : parseFloat(datas[i].detail[0].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volume : parseFloat(datas[i].volume).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                total : parseFloat(datas[i].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumedetailumum  : parseFloat(datas[i].detail[1].volumetarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaldetailumum : parseFloat(datas[i].detail[1].totaltarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumetrgetumum : parseFloat(datas[i].detail[1].volume).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaltrgetumum : parseFloat(datas[i].detail[1].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            };

                            $scope.Datakinerja.push(obj);
                        }

                        for (var i = 0; i < dataInap.length; i++) {
                            var obj = {
                                pelayananInap : dataInap[i].pelayanan,
                                volumetargetdetailbpjsInap : parseFloat(dataInap[i].detail[0].volumetarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaltargetdetailbpjsInap : parseFloat(dataInap[i].detail[0].totaltarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumetargetInap :  parseFloat(dataInap[i].volumetarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaltargetInap : parseFloat(dataInap[i].totaltarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumedetailbpjsInap  : parseFloat(dataInap[i].detail[0].volume).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaldetailbpjsInap : parseFloat(dataInap[i].detail[0].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumeInap : parseFloat(dataInap[i].volume).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totalInap : parseFloat(dataInap[i].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumedetailumumInap  : parseFloat(dataInap[i].detail[1].volumetarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaldetailumumInap : parseFloat(dataInap[i].detail[1].totaltarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumetrgetumumInap : parseFloat(dataInap[i].detail[1].volume).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaltrgetumumInap : parseFloat(dataInap[i].detail[1].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            };
                            $scope.Datakinerja1.push(obj);
                        }   
                            var obj = {
                                totaltargetall: parseFloat(totTarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                totalall: parseFloat(totTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                
                            };
                            $scope.Datakinerja2.push(obj);
                            $scope.isRouteLoading=false;
                    });
                }

                $scope.Datakinerja();
            };

            function init(){
                $scope.isRouteLoading=true;
                var periodeAwal= "01-01-" + moment($scope.from).format('YYYY');
                var tglAwal= periodeAwal;
                var periodeakhir="12-31-" + moment($scope.from).format('YYYY');
                var tglAkhir=periodeakhir;
                manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-grid-chart?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(dat) { 
                    var bulantemp=[];
                    var temp=[];
                    var datas= dat.data.Rajal;
                    var datasu= dat.data.Ranap;
                    var totaltargetinap =0;
                    var volumetargetinap =0;
                    var totalinap =0;
                    var volumeinap =0;
                    for (var i = 0; i < datas.length; i++) {
                        if(datas[i].blnpelayanan==datasu[i].blnpelayanan){
                            totaltargetinap = datasu[i].totaltargetinap;
                            volumetargetinap= datasu[i].volumetargetinap;
                            totalinap = datasu[i].totalinap;
                            volumeinap = datasu[i].volumeinap;                        
                        }
                        var bulan = parseInt(datas[i].blnpelayanan);
                        bulantemp.push(bulan);
                        totTotal = parseFloat(datas[i].totaltarget/12)
                        var tot = parseFloat(datas[i].totaltarget)
                        TargetRanap= parseFloat(totaltargetinap/12)
                        datas[i].blnpelayanan=bulan;
                        // datas[i].totaltarget=tot;
                        datas[i].totaltarget1=totTotal;
                        datas[i].totaltargetinap=totaltargetinap;
                        datas[i].totaltargetinap1=TargetRanap;
                        datas[i].volumetargetinap=volumetargetinap;
                        datas[i].totalinap=totalinap;
                        datas[i].volumeinap=volumeinap;

                    }

                    var countbulan = 0;
                    for(var i = bulantemp.length; 12 - i; i++ ){
                        if(countbulan == 0){
                           countbulan += (bulantemp.length + 1)
                        }else{
                            countbulan += 1
                        }
                        var datatemp ={
                            "id": datas[0].id,
                            "blnpelayanan": countbulan,
                            "pelayanan": datas[0].pelayanan,
                            "totaltarget": datas[0].totaltarget,
                            "totaltarget1": datas[0].totaltarget1,
                            "volumetarget": datas[0].volumetarget,
                            "totaltargetinap": datas[0].totaltargetinap,
                            "totaltargetinap1": datas[0].totaltargetinap1,
                            "volumetargetinap":datas[0].volumetargetinap,
                            "totalinap":0,
                            "volumeinap":0,
                            "total": 0,
                            "volume": 0
                        }
                        datas.push(datatemp);
                    }
                    maxData1=parseFloat(datas[0].volumetarget * 150/100);
                    maxData=parseFloat(datas[0].totaltarget1 * 350/100);
                    $scope.sourcechart=datas;
                    // $scope.sourcechart1=datasu;
                    $scope.isRouteLoading=false;   
                    $scope.chart ={
                         title: {
                        },
                        legend: {
                            position: "bottom"
                        },
                        seriesDefaults: {
                                },
                                seriesColors: ["#3f51b5","#89f442","#4caf50","#f9ce1d","#ff9800","#ff5722"],
                                series: [                               
                                {
                                    field: "totaltargetinap1",
                                    name: "Target Rawat inap",
                                    type: "area",
                                    template: "<span>{{formatRupiah('#: total #', '')}}</span>",
                                },
                                {
                                    field: "totaltarget1",
                                    name: "Target Rawat Jalan",
                                    type: "area",
                                }, 
                                {
                                    field: "totalinap",
                                    name: "Capaian Rawat Inap",
                                    type: "line"
                                }, 
                                {
                                    field: "total",
                                    name: "Capaian Rawat Jalan",
                                    type: "line"
                                }
                                ],
                                valueAxis: {
                                    labels: {
                                        // format: "{0}%"
                                    },
                                    line: {
                                        visible: false
                                    },
                                    axisCrossingValue: 0,
                                    max: maxData
                                },
                                categoryAxis: {
                                    categories: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
                                    
                                    majorGridLines: {
                                        visible: false
                                    },
                                    labels: {
                                        rotation: "auto"
                                    }
                                },
                                tooltip: {
                                    visible: true,
                                    // format: "{0}%",
                                    template: "#= series.name #: #= value #"
                                }
                    };
                });
                $scope.Datakinerja = function(){
                    $scope.isRouteLoading=true;
                    $scope.Datakinerja = [];   
                    $scope.Datakinerja1 = []; 
                    $scope.Datakinerja2 = [];                
                    manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-grid?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(dat) { 
                       var datas = dat.data.datajalan;
                       var dataInap = dat.data.datainap;
                       var totaltargetrajal=datas[0].totaltarget;
                       var totaltargetrnap=dataInap[0].totaltarget;
                       var totalrajal=datas[0].total;
                       var totalranap=dataInap[0].total;
                       totTarget=parseFloat(totaltargetrajal)+parseFloat(totaltargetrnap);
                       totTotal=parseFloat(totalrajal)+parseFloat(totalranap);
                            for (var i = 0; i < datas.length; i++) {
                            var obj = {
                                pelayanan : datas[i].pelayanan,
                                volumetargetdetailbpjs : parseFloat(datas[i].detail[0].volumetarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaltargetdetailbpjs : parseFloat(datas[i].detail[0].totaltarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumetarget :  parseFloat(datas[i].volumetarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaltarget : parseFloat(datas[i].totaltarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumedetailbpjs  : parseFloat(datas[i].detail[0].volume).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaldetailbpjs : parseFloat(datas[i].detail[0].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volume : parseFloat(datas[i].volume).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                total : parseFloat(datas[i].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumedetailumum  : parseFloat(datas[i].detail[1].volumetarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaldetailumum : parseFloat(datas[i].detail[1].totaltarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumetrgetumum : parseFloat(datas[i].detail[1].volume).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaltrgetumum : parseFloat(datas[i].detail[1].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            };

                            $scope.Datakinerja.push(obj);
                        }

                        for (var i = 0; i < dataInap.length; i++) {
                            var obj = {
                                pelayananInap : dataInap[i].pelayanan,
                                volumetargetdetailbpjsInap : parseFloat(dataInap[i].detail[0].volumetarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaltargetdetailbpjsInap : parseFloat(dataInap[i].detail[0].totaltarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumetargetInap :  parseFloat(dataInap[i].volumetarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaltargetInap : parseFloat(dataInap[i].totaltarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumedetailbpjsInap  : parseFloat(dataInap[i].detail[0].volume).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaldetailbpjsInap : parseFloat(dataInap[i].detail[0].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumeInap : parseFloat(dataInap[i].volume).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totalInap : parseFloat(dataInap[i].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumedetailumumInap  : parseFloat(dataInap[i].detail[1].volumetarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaldetailumumInap : parseFloat(dataInap[i].detail[1].totaltarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                volumetrgetumumInap : parseFloat(dataInap[i].detail[1].volume).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, ","),
                                totaltrgetumumInap : parseFloat(dataInap[i].detail[1].total).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            };
                            $scope.Datakinerja1.push(obj);
                        }   
                            var obj = {
                                totaltargetall: parseFloat(totTarget).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                totalall: parseFloat(totTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                                
                            };
                            $scope.Datakinerja2.push(obj);
                            $scope.isRouteLoading=false;
                    });
                }

            $scope.Datakinerja();
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

        $scope.DRajal = function() {
            $state.go('detailDashboardPenerimaan', {
                detail:'Rawatjalan'
            });
        }

        $scope.DRanap = function() {
            $state.go('detailDashboardPenerimaan', {
                detail:'RawatInap'
            });
        }

        $scope.farmasi = function() {
            $state.go('detailDashboardPenerimaan', {
                detail:'farmasi'
            });
        }

        $scope.UshaLainnya = function() {
            $state.go('detailDashboardPenerimaan', {
                detail:'UshaLainnya'
            });
        }

        $scope.DataRajal = function(test) {
            if(test == 1){
                $state.go('detailDashboardPenerimaan', {
                    detail:'Rawatjalan'
                });
            }else{
                $state.go('detailDashboardPenerimaan', {
                    detail:'RawatInap'
                });
            }
             
        }
    }
    ]);
});