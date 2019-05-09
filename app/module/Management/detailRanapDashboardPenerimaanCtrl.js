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
            var TargetAja = 0 ;
            var total = 0;
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
                initsearch();
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
                var periodeAwal= "01-01-" + moment($scope.from).format('YYYY');             
                var tglAwal=moment(periodeAwal).format('YYYY-MM-DD');
                var periodeakhir="12-31-" + moment($scope.from).format('YYYY');
                var tglAkhir=moment(periodeakhir).format('YYYY-MM-DD');
                if (detail != '') {
                    if (detail == 'peristi') {

                            $scope.Datakinerja = function(){
                                $scope.Tbedah=false;
                                $scope.Ticu=false;
                                $scope.TPeristi=true;
                                $scope.Datakinerja = [];   
                                manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-detail-peristi?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir+"&detail="+detail).then(function(dat) { 
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
                                        $scope.Datakinerja.push(obj);
                                });
                        }
                        manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-detailchart-peristi?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(dat) { 
                                    var datas= dat.data.bpjs;
                                    var datasu= dat.data.nonbpjs;
                                    var bulantemp=[];
                                    var temp=[];
                                    var totaltargetNonBpjs =0;
                                    var volumetargetNonBpjs =0;
                                    var totalNonBpjs =0;
                                    var volumeNonBpjs =0;

                                    for (var i = 0; i < datas.length; i++) {
                                    if(datas[i].blnpelayanan==datasu[i].blnpelayanan){
                                        totaltargetNonBpjs = datasu[i].totaltarget;
                                        volumetargetNonBpjs= datasu[i].volumetarget;
                                        totalNonBpjs = datasu[i].total;
                                        volumeNonBpjs = datasu[i].volume;                      
                                    }
                                    var bulan = parseInt(datas[i].blnpelayanan);
                                    bulantemp.push(bulan);
                                    totTotal = parseFloat(datas[i].totaltarget/12)
                                    var tot = parseFloat(datas[i].totaltarget)
                                    TargetAja= parseFloat(totaltargetNonBpjs/12)
                                    total=parseFloat(datas[i].totaltarget)+parseFloat(totaltargetNonBpjs)
                                    datas[i].blnpelayanan=bulan;
                                    datas[i].totaltarget1=totTotal;
                                    datas[i].totaltargetnonbpjs=totaltargetNonBpjs;
                                    datas[i].totaltargetnonbpjs1=TargetAja;
                                    datas[i].volumetargetnonbpjs=volumetargetNonBpjs;
                                    datas[i].totalnonbpjs=totalNonBpjs;
                                    datas[i].volumenonbpjs=volumeNonBpjs;
                                    datas[i].totaltargetreal=total;
                                }

                                var countbulan = 0;
                                for(var i = bulantemp.length; 12 - i; i++ ){
                                    if(countbulan == 0){
                                       countbulan += (bulantemp.length + 1)
                                    }else{
                                        countbulan += 1
                                    }
                                    var datatemp ={
                                        // "id": datas[0].id,
                                        "blnpelayanan": countbulan,
                                        "pelayanan": datas[0].pelayanan,
                                        "totaltarget": datas[0].totaltarget,
                                        "totaltarget1": datas[0].totaltarget1,
                                        "volumetarget": datas[0].volumetarget,
                                        "totaltargetnonbpjs": datas[0].totaltargetnonbpjs,
                                        "totaltargetnonbpjs1": datas[0].totaltargetnonbpjs1,
                                        "volumetargetinap":datas[0].volumetargetinap,
                                        "totaltargetreal": datas[0].totaltargetreal,
                                        "totalnonbpjs":0,
                                        "volumenonbpjs":0,
                                        "total": 0,
                                        "volume": 0
                                    }
                                    datas.push(datatemp);
                                }
                                maxData1=parseFloat(datas[0].volumetarget * 150/100);
                                maxData=parseFloat(datas[0].totaltargetreal);
                                $scope.sourcechart=datas;
                                $scope.isRouteLoading=false;   
                                $scope.chart ={
                                     title: {
                                     text: "Detail Penerimaan Instalasi Perinatal Risiko Tinggi (PERISTI)"
                                    },
                                    legend: {
                                        position: "bottom"
                                    },
                                    seriesDefaults: {
                                            },
                                            seriesColors: ["#3f51b5","#89f442","#4caf50","#f9ce1d","#ff9800","#ff5722"],
                                            series: [                               
                                            // {
                                            //     field: "totaltarget1",
                                            //     name: "Target Pasien BPJS",
                                            //     type: "area",
                                            // },
                                            {
                                                field: "totaltargetnonbpjs1",
                                                name: "Target Pasien Non BPJS",
                                                type: "area",
                                            }, 
                                            {
                                                field: "totalnonbpjs",
                                                name: "Capaian Pasien Non BPJS",
                                                type: "line"
                                            }, 
                                            {
                                                field: "total",
                                                name: "Capaian Pasien BPJS",
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

                        $scope.Datakinerja();
                    }

                    if (detail == 'bedah') {

                            $scope.Datakinerjass = function(){
                                $scope.Tbedah=true;
                                $scope.Ticu=false;
                                $scope.TPeristi=false;
                                $scope.Datakinerjass = [];   
                                manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-detail-bedah?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir+"&detail="+detail).then(function(dat) { 
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
                                            targetpasienBpjs : parseFloat(datas.datatarget[5].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetpasienNonBpjs : parseFloat(datas.datatarget[6].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
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

                        manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-detailchart-rrs?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(dat) { 
                                    var datas= dat.data.bpjs;
                                    var datasu= dat.data.nonbpjs;
                                    var bulantemp=[];
                                    var temp=[];
                                    var totaltargetNonBpjs =0;
                                    var volumetargetNonBpjs =0;
                                    var totalNonBpjs =0;
                                    var volumeNonBpjs =0;

                                    for (var i = 0; i < datas.length; i++) {
                                    if(datas[i].blnpelayanan==datasu[i].blnpelayanan){
                                        totaltargetNonBpjs = datasu[i].totaltarget;
                                        volumetargetNonBpjs= datasu[i].volumetarget;
                                        totalNonBpjs = datasu[i].total;
                                        volumeNonBpjs = datasu[i].volume;                      
                                    }
                                    var bulan = parseInt(datas[i].blnpelayanan);
                                    bulantemp.push(bulan);
                                    totTotal = parseFloat(datas[i].totaltarget/12)
                                    var tot = parseFloat(datas[i].totaltarget)
                                    TargetAja= parseFloat(totaltargetNonBpjs/12)
                                    total=parseFloat(datas[i].totaltarget)+parseFloat(totaltargetNonBpjs)
                                    datas[i].blnpelayanan=bulan;
                                    datas[i].totaltargetreal=total;
                                    datas[i].totaltarget1=totTotal;
                                    datas[i].totaltargetnonbpjs=totaltargetNonBpjs;
                                    datas[i].totaltargetnonbpjs1=TargetAja;
                                    datas[i].volumetargetnonbpjs=volumetargetNonBpjs;
                                    datas[i].totalnonbpjs=totalNonBpjs;
                                    datas[i].volumenonbpjs=volumeNonBpjs;
                                }

                                var countbulan = 0;
                                for(var i = bulantemp.length; 12 - i; i++ ){
                                    if(countbulan == 0){
                                       countbulan += (bulantemp.length + 1)
                                    }else{
                                        countbulan += 1
                                    }
                                    var datatemp ={
                                        // "id": datas[0].id,
                                        "blnpelayanan": countbulan,
                                        "pelayanan": datas[0].pelayanan,
                                        "totaltarget": datas[0].totaltarget,
                                        "totaltarget1": datas[0].totaltarget1,
                                        "volumetarget": datas[0].volumetarget,
                                        "totaltargetnonbpjs": datas[0].totaltargetnonbpjs,
                                        "totaltargetnonbpjs1": datas[0].totaltargetnonbpjs1,
                                        "totaltargetreal": datas[0].totaltargetreal,
                                        "volumetargetinap":datas[0].volumetargetinap,
                                        "totalnonbpjs":0,
                                        "volumenonbpjs":0,
                                        "total": 0,
                                        "volume": 0
                                    }
                                    datas.push(datatemp);
                                }
                                $scope.sourcechart=datas;
                                maxData1=parseFloat(datas[0].volumetarget * 150/100);
                                maxData=parseFloat(datas[0].totaltargetreal);
                                $scope.isRouteLoading=false;   
                                $scope.chart ={
                                     title: {
                                     text: "Detail Penerimaan Bedah Sentral"
                                    },
                                    legend: {
                                        position: "bottom"
                                    },
                                    seriesDefaults: {                                       
                                            },
                                            seriesColors: ["#3f51b5","#89f442","#4caf50","#f9ce1d","#ff9800","#ff5722"],
                                            series: [                               
                                            // {
                                            //     field: "totaltarget1",
                                            //     name: "Target Pasien BPJS",
                                            //     type: "area",
                                            // },
                                            {
                                                field: "totaltargetnonbpjs1",
                                                name: "Target Pasien Non BPJS",
                                                type: "area",
                                            }, 
                                            {
                                                field: "totalnonbpjs",
                                                name: "Capaian Pasien Non BPJS",
                                                type: "line"
                                            }, 
                                            {
                                                field: "total",
                                                name: "Capaian Pasien BPJS",
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

                        $scope.Datakinerjass();
                    }

                    if (detail == 'icu') {
                            $scope.Datakinerjas = function(){
                                $scope.Tbedah=false;
                                $scope.TPeristi=false;
                                $scope.Ticu=true;
                                $scope.Datakinerjas = [];   
                                manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-detail-icu?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir+"&detail="+detail).then(function(dat) { 
                                   var datas = dat.data;
                                   var tot = 0;
                                   var subtot = 0;
                                   var sub = 0;
                                   totTarget=parseFloat(datas.datatarget[5].targetrupiah);
                                   volTarget=parseFloat(datas.datatarget[6].targetrupiah);
                                   subtot =parseFloat(datas.data[0].total);
                                   sub= parseFloat(datas.data[1].total);
                                   tot= subtot+sub;
                                   totTotal=totTarget+volTarget;
                                        var obj = {
                                            targetBLU : parseFloat(datas.datatarget[5].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetpasienBpjs : parseFloat(datas.datatarget[3].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetpasienNonBpjs : parseFloat(datas.datatarget[4].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetPRM : parseFloat(datas.datatarget[6].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
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

                        manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-detailchart-icu?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(dat) { 
                                    var datas= dat.data.bpjs;
                                    var datasu= dat.data.nonbpjs;
                                    var bulantemp=[];
                                    var temp=[];
                                    var totaltargetNonBpjs =0;
                                    var volumetargetNonBpjs =0;
                                    var totalNonBpjs =0;
                                    var volumeNonBpjs =0;

                                    for (var i = 0; i < datas.length; i++) {
                                    if(datas[i].blnpelayanan==datasu[i].blnpelayanan){
                                        totaltargetNonBpjs = datasu[i].totaltarget;
                                        volumetargetNonBpjs= datasu[i].volumetarget;
                                        totalNonBpjs = datasu[i].total;
                                        volumeNonBpjs = datasu[i].volume;                      
                                    }
                                    var bulan = parseInt(datas[i].blnpelayanan);
                                    bulantemp.push(bulan);
                                    totTotal = parseFloat(datas[i].totaltarget/12)
                                    var tot = parseFloat(datas[i].totaltarget)
                                    TargetAja= parseFloat(totaltargetNonBpjs/12)
                                    total=parseFloat(datas[i].totaltarget)+parseFloat(totaltargetNonBpjs)
                                    datas[i].blnpelayanan=bulan;
                                    datas[i].totaltargetreal=total;
                                    datas[i].totaltarget1=totTotal;
                                    datas[i].totaltargetnonbpjs=totaltargetNonBpjs;
                                    datas[i].totaltargetnonbpjs1=TargetAja;
                                    datas[i].volumetargetnonbpjs=volumetargetNonBpjs;
                                    datas[i].totalnonbpjs=totalNonBpjs;
                                    datas[i].volumenonbpjs=volumeNonBpjs;
                                }

                                var countbulan = 0;
                                for(var i = bulantemp.length; 12 - i; i++ ){
                                    if(countbulan == 0){
                                       countbulan += (bulantemp.length + 1)
                                    }else{
                                        countbulan += 1
                                    }
                                    var datatemp ={
                                        // "id": datas[0].id,
                                        "blnpelayanan": countbulan,
                                        "pelayanan": datas[0].pelayanan,
                                        "totaltarget": datas[0].totaltarget,
                                        "totaltarget1": datas[0].totaltarget1,
                                        "volumetarget": datas[0].volumetarget,
                                        "totaltargetnonbpjs": datas[0].totaltargetnonbpjs,
                                        "totaltargetnonbpjs1": datas[0].totaltargetnonbpjs1,
                                        "volumetargetinap":datas[0].volumetargetinap,
                                        "totaltargetreal": datas[0].totaltargetreal,
                                        "totalnonbpjs":0,
                                        "volumenonbpjs":0,
                                        "total": 0,
                                        "volume": 0
                                    }
                                    datas.push(datatemp);
                                }
                                $scope.sourcechart=datas;
                                maxData1=parseFloat(datas[0].volumetarget * 150/100);
                                maxData=parseFloat(datas[0].totaltargetreal);
                                $scope.isRouteLoading=false;   
                                $scope.chart ={
                                     title: {
                                     text: "Detail Penerimaan Instalasi Care Unit (ICU)"
                                    },
                                    legend: {
                                        position: "bottom"
                                    },
                                    seriesDefaults: {
                                            },
                                            seriesColors: ["#3f51b5","#89f442","#4caf50","#f9ce1d","#ff9800","#ff5722"],
                                            series: [                               
                                            // {
                                            //     field: "totaltarget1",
                                            //     name: "Target Pasien BPJS",
                                            //     type: "area",
                                            // },
                                            {
                                                field: "totaltargetnonbpjs1",
                                                name: "Target Pasien Non BPJS",
                                                type: "area",
                                            }, 
                                            {
                                                field: "totalnonbpjs",
                                                name: "Capaian Pasien Non BPJS",
                                                type: "line"
                                            }, 
                                            {
                                                field: "total",
                                                name: "Capaian Pasien BPJS",
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

                        $scope.Datakinerjas();
                    }
                }  
            };


            function initsearch() {
                // var periodeAwal= "01-01-" + moment($scope.from).format('YYYY');             
                var tglAwal=moment($scope.from).format('YYYY-MM-DD');
                var tglAkhir=moment($scope.until).format('YYYY-MM-DD');
                if (detail != '') {
                    if (detail == 'peristi') {

                            $scope.Datakinerja = function(){
                                $scope.Tbedah=false;
                                $scope.Ticu=false;
                                $scope.TPeristi=true;
                                $scope.Datakinerja = [];   
                                manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-detail-peristi?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir+"&detail="+detail).then(function(dat) { 
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
                                        $scope.Datakinerja.push(obj);
                                });
                        }
                        manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-detailchart-peristi?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(dat) { 
                                    var datas= dat.data.bpjs;
                                    var datasu= dat.data.nonbpjs;
                                    var bulantemp=[];
                                    var temp=[];
                                    var totaltargetNonBpjs =0;
                                    var volumetargetNonBpjs =0;
                                    var totalNonBpjs =0;
                                    var volumeNonBpjs =0;

                                    for (var i = 0; i < datas.length; i++) {
                                    if(datas[i].blnpelayanan==datasu[i].blnpelayanan){
                                        totaltargetNonBpjs = datasu[i].totaltarget;
                                        volumetargetNonBpjs= datasu[i].volumetarget;
                                        totalNonBpjs = datasu[i].total;
                                        volumeNonBpjs = datasu[i].volume;                      
                                    }
                                    var bulan = parseInt(datas[i].blnpelayanan);
                                    bulantemp.push(bulan);
                                    totTotal = parseFloat(datas[i].totaltarget/12)
                                    var tot = parseFloat(datas[i].totaltarget)
                                    TargetAja= parseFloat(totaltargetNonBpjs/12)
                                    total=parseFloat(datas[i].totaltarget)+parseFloat(totaltargetNonBpjs)
                                    datas[i].blnpelayanan=bulan;
                                    datas[i].totaltarget1=totTotal;
                                    datas[i].totaltargetnonbpjs=totaltargetNonBpjs;
                                    datas[i].totaltargetnonbpjs1=TargetAja;
                                    datas[i].volumetargetnonbpjs=volumetargetNonBpjs;
                                    datas[i].totalnonbpjs=totalNonBpjs;
                                    datas[i].volumenonbpjs=volumeNonBpjs;
                                    datas[i].totaltargetreal=total;
                                }

                                var countbulan = 0;
                                for(var i = bulantemp.length; 12 - i; i++ ){
                                    if(countbulan == 0){
                                       countbulan += (bulantemp.length + 1)
                                    }else{
                                        countbulan += 1
                                    }
                                    var datatemp ={
                                        // "id": datas[0].id,
                                        "blnpelayanan": countbulan,
                                        "pelayanan": datas[0].pelayanan,
                                        "totaltarget": datas[0].totaltarget,
                                        "totaltarget1": datas[0].totaltarget1,
                                        "volumetarget": datas[0].volumetarget,
                                        "totaltargetnonbpjs": datas[0].totaltargetnonbpjs,
                                        "totaltargetnonbpjs1": datas[0].totaltargetnonbpjs1,
                                        "volumetargetinap":datas[0].volumetargetinap,
                                        "totaltargetreal": datas[0].totaltargetreal,
                                        "totalnonbpjs":0,
                                        "volumenonbpjs":0,
                                        "total": 0,
                                        "volume": 0
                                    }
                                    datas.push(datatemp);
                                }
                                maxData1=parseFloat(datas[0].volumetarget * 150/100);
                                maxData=parseFloat(datas[0].totaltargetreal);
                                $scope.sourcechart=datas;
                                $scope.isRouteLoading=false;   
                                $scope.chart ={
                                     title: {
                                     text: "Detail Penerimaan Instalasi Perinatal Risiko Tinggi (PERISTI)"
                                    },
                                    legend: {
                                        position: "bottom"
                                    },
                                    seriesDefaults: {
                                            },
                                            seriesColors: ["#3f51b5","#89f442","#4caf50","#f9ce1d","#ff9800","#ff5722"],
                                            series: [                               
                                            // {
                                            //     field: "totaltarget1",
                                            //     name: "Target Pasien BPJS",
                                            //     type: "area",
                                            // },
                                            {
                                                field: "totaltargetnonbpjs1",
                                                name: "Target Pasien Non BPJS",
                                                type: "area",
                                            }, 
                                            {
                                                field: "totalnonbpjs",
                                                name: "Capaian Pasien Non BPJS",
                                                type: "line"
                                            }, 
                                            {
                                                field: "total",
                                                name: "Capaian Pasien BPJS",
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

                        $scope.Datakinerja();
                    }

                    if (detail == 'bedah') {

                            $scope.Datakinerjass = function(){
                                $scope.Tbedah=true;
                                $scope.Ticu=false;
                                $scope.TPeristi=false;
                                $scope.Datakinerjass = [];   
                                manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-detail-bedah?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir+"&detail="+detail).then(function(dat) { 
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
                                            targetpasienBpjs : parseFloat(datas.datatarget[5].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetpasienNonBpjs : parseFloat(datas.datatarget[6].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
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

                        manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-detailchart-rrs?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(dat) { 
                                    var datas= dat.data.bpjs;
                                    var datasu= dat.data.nonbpjs;
                                    var bulantemp=[];
                                    var temp=[];
                                    var totaltargetNonBpjs =0;
                                    var volumetargetNonBpjs =0;
                                    var totalNonBpjs =0;
                                    var volumeNonBpjs =0;

                                    for (var i = 0; i < datas.length; i++) {
                                    if(datas[i].blnpelayanan==datasu[i].blnpelayanan){
                                        totaltargetNonBpjs = datasu[i].totaltarget;
                                        volumetargetNonBpjs= datasu[i].volumetarget;
                                        totalNonBpjs = datasu[i].total;
                                        volumeNonBpjs = datasu[i].volume;                      
                                    }
                                    var bulan = parseInt(datas[i].blnpelayanan);
                                    bulantemp.push(bulan);
                                    totTotal = parseFloat(datas[i].totaltarget/12)
                                    var tot = parseFloat(datas[i].totaltarget)
                                    TargetAja= parseFloat(totaltargetNonBpjs/12)
                                    total=parseFloat(datas[i].totaltarget)+parseFloat(totaltargetNonBpjs)
                                    datas[i].blnpelayanan=bulan;
                                    datas[i].totaltargetreal=total;
                                    datas[i].totaltarget1=totTotal;
                                    datas[i].totaltargetnonbpjs=totaltargetNonBpjs;
                                    datas[i].totaltargetnonbpjs1=TargetAja;
                                    datas[i].volumetargetnonbpjs=volumetargetNonBpjs;
                                    datas[i].totalnonbpjs=totalNonBpjs;
                                    datas[i].volumenonbpjs=volumeNonBpjs;
                                }

                                var countbulan = 0;
                                for(var i = bulantemp.length; 12 - i; i++ ){
                                    if(countbulan == 0){
                                       countbulan += (bulantemp.length + 1)
                                    }else{
                                        countbulan += 1
                                    }
                                    var datatemp ={
                                        // "id": datas[0].id,
                                        "blnpelayanan": countbulan,
                                        "pelayanan": datas[0].pelayanan,
                                        "totaltarget": datas[0].totaltarget,
                                        "totaltarget1": datas[0].totaltarget1,
                                        "volumetarget": datas[0].volumetarget,
                                        "totaltargetnonbpjs": datas[0].totaltargetnonbpjs,
                                        "totaltargetnonbpjs1": datas[0].totaltargetnonbpjs1,
                                        "totaltargetreal": datas[0].totaltargetreal,
                                        "volumetargetinap":datas[0].volumetargetinap,
                                        "totalnonbpjs":0,
                                        "volumenonbpjs":0,
                                        "total": 0,
                                        "volume": 0
                                    }
                                    datas.push(datatemp);
                                }
                                $scope.sourcechart=datas;
                                maxData1=parseFloat(datas[0].volumetarget * 150/100);
                                maxData=parseFloat(datas[0].totaltargetreal);
                                $scope.isRouteLoading=false;   
                                $scope.chart ={
                                     title: {
                                     text: "Detail Penerimaan Bedah Sentral"
                                    },
                                    legend: {
                                        position: "bottom"
                                    },
                                    seriesDefaults: {                                       
                                            },
                                            seriesColors: ["#3f51b5","#89f442","#4caf50","#f9ce1d","#ff9800","#ff5722"],
                                            series: [                               
                                            // {
                                            //     field: "totaltarget1",
                                            //     name: "Target Pasien BPJS",
                                            //     type: "area",
                                            // },
                                            {
                                                field: "totaltargetnonbpjs1",
                                                name: "Target Pasien Non BPJS",
                                                type: "area",
                                            }, 
                                            {
                                                field: "totalnonbpjs",
                                                name: "Capaian Pasien Non BPJS",
                                                type: "line"
                                            }, 
                                            {
                                                field: "total",
                                                name: "Capaian Pasien BPJS",
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

                        $scope.Datakinerjass();
                    }

                    if (detail == 'icu') {
                            $scope.Datakinerjas = function(){
                                $scope.Tbedah=false;
                                $scope.TPeristi=false;
                                $scope.Ticu=true;
                                $scope.Datakinerjas = [];   
                                manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-detail-icu?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir+"&detail="+detail).then(function(dat) { 
                                   var datas = dat.data;
                                   var tot = 0;
                                   var subtot = 0;
                                   var sub = 0;
                                   totTarget=parseFloat(datas.datatarget[5].targetrupiah);
                                   volTarget=parseFloat(datas.datatarget[6].targetrupiah);
                                   subtot =parseFloat(datas.data[0].total);
                                   sub= parseFloat(datas.data[1].total);
                                   tot= subtot+sub;
                                   totTotal=totTarget+volTarget;
                                        var obj = {
                                            targetBLU : parseFloat(datas.datatarget[5].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetpasienBpjs : parseFloat(datas.datatarget[3].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetpasienNonBpjs : parseFloat(datas.datatarget[4].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
                                            targetPRM : parseFloat(datas.datatarget[6].targetrupiah).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,"),
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

                        manageLogistikPhp.getDataTableTransaksi("managemen/get-data-penerimaan-detailchart-icu?tglAwal="+tglAwal+"&tglAkhir="+tglAkhir).then(function(dat) { 
                                    var datas= dat.data.bpjs;
                                    var datasu= dat.data.nonbpjs;
                                    var bulantemp=[];
                                    var temp=[];
                                    var totaltargetNonBpjs =0;
                                    var volumetargetNonBpjs =0;
                                    var totalNonBpjs =0;
                                    var volumeNonBpjs =0;

                                    for (var i = 0; i < datas.length; i++) {
                                    if(datas[i].blnpelayanan==datasu[i].blnpelayanan){
                                        totaltargetNonBpjs = datasu[i].totaltarget;
                                        volumetargetNonBpjs= datasu[i].volumetarget;
                                        totalNonBpjs = datasu[i].total;
                                        volumeNonBpjs = datasu[i].volume;                      
                                    }
                                    var bulan = parseInt(datas[i].blnpelayanan);
                                    bulantemp.push(bulan);
                                    totTotal = parseFloat(datas[i].totaltarget/12)
                                    var tot = parseFloat(datas[i].totaltarget)
                                    TargetAja= parseFloat(totaltargetNonBpjs/12)
                                    total=parseFloat(datas[i].totaltarget)+parseFloat(totaltargetNonBpjs)
                                    datas[i].blnpelayanan=bulan;
                                    datas[i].totaltargetreal=total;
                                    datas[i].totaltarget1=totTotal;
                                    datas[i].totaltargetnonbpjs=totaltargetNonBpjs;
                                    datas[i].totaltargetnonbpjs1=TargetAja;
                                    datas[i].volumetargetnonbpjs=volumetargetNonBpjs;
                                    datas[i].totalnonbpjs=totalNonBpjs;
                                    datas[i].volumenonbpjs=volumeNonBpjs;
                                }

                                var countbulan = 0;
                                for(var i = bulantemp.length; 12 - i; i++ ){
                                    if(countbulan == 0){
                                       countbulan += (bulantemp.length + 1)
                                    }else{
                                        countbulan += 1
                                    }
                                    var datatemp ={
                                        // "id": datas[0].id,
                                        "blnpelayanan": countbulan,
                                        "pelayanan": datas[0].pelayanan,
                                        "totaltarget": datas[0].totaltarget,
                                        "totaltarget1": datas[0].totaltarget1,
                                        "volumetarget": datas[0].volumetarget,
                                        "totaltargetnonbpjs": datas[0].totaltargetnonbpjs,
                                        "totaltargetnonbpjs1": datas[0].totaltargetnonbpjs1,
                                        "volumetargetinap":datas[0].volumetargetinap,
                                        "totaltargetreal": datas[0].totaltargetreal,
                                        "totalnonbpjs":0,
                                        "volumenonbpjs":0,
                                        "total": 0,
                                        "volume": 0
                                    }
                                    datas.push(datatemp);
                                }
                                $scope.sourcechart=datas;
                                maxData1=parseFloat(datas[0].volumetarget * 150/100);
                                maxData=parseFloat(datas[0].totaltargetreal);
                                $scope.isRouteLoading=false;   
                                $scope.chart ={
                                     title: {
                                     text: "Detail Penerimaan Instalasi Care Unit (ICU)"
                                    },
                                    legend: {
                                        position: "bottom"
                                    },
                                    seriesDefaults: {
                                            },
                                            seriesColors: ["#3f51b5","#89f442","#4caf50","#f9ce1d","#ff9800","#ff5722"],
                                            series: [                               
                                            // {
                                            //     field: "totaltarget1",
                                            //     name: "Target Pasien BPJS",
                                            //     type: "area",
                                            // },
                                            {
                                                field: "totaltargetnonbpjs1",
                                                name: "Target Pasien Non BPJS",
                                                type: "area",
                                            }, 
                                            {
                                                field: "totalnonbpjs",
                                                name: "Capaian Pasien Non BPJS",
                                                type: "line"
                                            }, 
                                            {
                                                field: "total",
                                                name: "Capaian Pasien BPJS",
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

                        $scope.Datakinerjas();
                    }
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