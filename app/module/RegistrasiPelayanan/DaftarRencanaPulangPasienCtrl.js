/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
define(['initialize'], function(initialize) {

    'use strict';
    initialize.controller('DaftarRencanaPulangPasienCtrl', ['$state', 'FindPasien', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'CacheHelper', 'ManagePasien', 'ManageServicePhp',
        function($state, findPasien, $rootScope, $scope, ModelItem, dateHelper, cacheHelper,ManagePasien, manageServicePhp) {
            $scope.title = "Daftar Rencana Pulang Pasien";
            $scope.dataVOloaded = false;
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.ruanganLast = "";
            $scope.dataVOloaded = true;
            LoadCache();
            // ModelItem.get("DaftarPasienMasukRawatInap").then(function(data) {
            //     $scope.item = data;
            //     $scope.dataVOloaded = true;
            // }, function errorCallBack(err) {});


            function LoadCache(){
                var chacePeriode = cacheHelper.get('DaftarRencanaPulangPasienCtrl');
                if(chacePeriode != undefined){
                   //var arrPeriode = chacePeriode.split(':');
                    $scope.item.tglawal = new Date(chacePeriode[0]);
                    $scope.item.tglakhir = new Date(chacePeriode[1]);
                   
                    init();
                }else{
                   $scope.item.tglawal=moment($scope.now).format('YYYY-MM-DD 00:00');
                   $scope.item.tglakhir=moment($scope.now).format('YYYY-MM-DD 23:59');    
                   init();
                }
            }

            function init() {
                $scope.isRouteLoading=true;
                var noCm =""
                if ($scope.item.NoCm != undefined){
                    var noCm ="&noCm=" +$scope.item.NoCm
                }
                var noReg =""
                if ($scope.item.Noregistrasi != undefined){
                    var noReg ="&noReg=" +$scope.item.Noregistrasi
                }
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD 00:00');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD 23:59');
                manageServicePhp.getDataTableTransaksi("registrasi/get-daftar-pasien-rencana-pulang?"+
                    "tglAwal=" + tglAwal + 
                    "&tglAkhir=" + tglAkhir +
                    noCm+noReg, true).then(function(dat){
                    $scope.isRouteLoading=false;
                    for (var i = 0; i < dat.data.daftar.length; i++) {
                        dat.data.daftar[i].no = i+1
                        if (dat.data.daftar[i].statusorder == 3) {
                            dat.data.daftar[i].status ="Pengajuan Pulang";
                        }else if (dat.data.daftar[i].statusorder == 4) {
                            dat.data.daftar[i].status ="Sudah Dipulangkan";
                        }                          
                        
                    }
                    $scope.listDaftar = new kendo.data.DataSource({
                        data: dat.data.daftar,
                        pageSize: 10,
                        total: dat.data.daftar.length,
                        serverPaging: false,
                        schema:  {
                            model: {
                                fields: {
                                }}}  
                    });
                });

                var chacePeriode ={ 0 : tglAwal ,
                    1 : tglAkhir,
                    2 : '',
                    3 : '', 
                    4 : '',
                    5 : '',
                    6 : ''
                }
                cacheHelper.set('DaftarRencanaPulangPasienCtrl', chacePeriode);                
            }

            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }

            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }


            $scope.mainGridOptions = {
                dataBound: function() {}
            };

            $scope.pindah = function() {

                if ($scope.data == undefined) {
                    toastr.warning('Pilih data dulu', 'Informasi');
                } 

                if ($scope.data.status === "Pengajuan Pulang")  {                 
                    manageServicePhp.getDataTableTransaksi("pindahpasien/get-ruangan-last?norec_pd=" + $scope.data.norec_pd).then(function (e) {
                        $scope.item.ruanganLast = e.data.data[0].objectruanganlastfk
                        if ($scope.item.ruanganLast != undefined) {
                            $state.go('PulangPasien', {
                                norecPD: $scope.data.norec_pd,
                                norecAPD: $scope.data.norec_apd,
                                norecSO: $scope.data.norec_so  
                            });
                            var CachePindah = $scope.item.ruanganLast
                            cacheHelper.set('CachePindah', CachePindah);
                        }
                    })
                }else{
                  toastr.warning('Pasien Sudah Dipulangkan', 'Informasi');
                }
                   
                    // $state.go('PindahKamar', {
                    //     noRec:  $scope.data.noRecPasienDaftar,
                    //     noRecAntrian:  $scope.data.noRecAntrian,
                    //     noRecAdmisi : $scope.data.noRecAdmisi,
                    //     noCm : $scope.data.noCm,
                    // })
                
            }

            $scope.group = {
                field: "ruanganTujuan.namaRuangan",
                aggregates: [{
                    field: "pasien",
                    aggregate: "count"
                }, {
                    field: "ruanganTujuan.namaRuangan",
                    aggregate: "count"
                }]
            };

            $scope.findData = function() {
               init();
                // findPasien.getDaftarPindahRuanganAll(DateHelper.formatDate($scope.startDate, 'YYYY-MM-DD'), DateHelper.formatDate($scope.endDate, 'YYYY-MM-DD')).then(function(data) {
                //     debugger;
                //     $scope.sourceDaftarPindah = data.data.data.listData;
                //     // $scope.sourceDaftarPindah.forEach(function(data){
                //     //     var date = new Date(data.tglKeluarRencana);
                //     //     data.tanggalPindah = DateHelper.getTanggalFormatted(date);
                //     // });
                //     $scope.listDaftar = new kendo.data.DataSource({
                //         pageSize : 10,
                //         data: $scope.sourceDaftarPindah
                //     });
                // });
            }

            $scope.findData();

            /*if (unit.namaRuangan== null) {
                    unit.namaRuangan = "kosong"
                }*/

            $scope.mainGridOptions = {
                selectable: 'row',
                pageable: true,
                columns: [
                    {
                        "field": "no",
                        "title": "No",
                        headerAttributes: { style: "text-align : center" },
                        "width":"25px",
                        // "template": "<span class='style-center'>#:  #</span>"
                    },
                    {
                        "field": "nocm",
                        "title": "No Rekam Medis",
                        headerAttributes: { style: "text-align : center" },
                        "width":"110px",
                        "template": "<span class='style-center'>#: nocm #</span>"
                    },
                    {
                        "field": "noregistrasi",
                        "title": "No Registrasi",
                        headerAttributes: { style: "text-align : center" },
                        "width":"110px",
                        "template": "<span class='style-center'>#: noregistrasi #</span>"
                    },                   
                    {
                        "field": "namapasien",
                        "title": "Nama Pasien",
                        headerAttributes: { style: "text-align : center" },
                        "width":"150px",
                        "template": "<span class='style-left'>#: namapasien #</span>"
                    },
                    {
                        "field": "",
                        "title": "Ruangan Asal",
                        headerAttributes: { style: "text-align : center" },
                        "width":"150px",
                        "template": "<span class='style-left'>#: namaruangan #</span>"
                    },
                    {
                        "field": "namakelas",
                        "title": "Kelas Perawatan",
                        headerAttributes: { style: "text-align : center" },
                        "width":"100px",                 
                        "template": "<span class='style-left'>#: namakelas #</span>"       
                    },
                    {
                        "field": "kelompokpasien",
                        "title": "Tipe Pembayaran",
                        headerAttributes: { style: "text-align : center" },
                        "width":"100px",
                        "template": "<span class='style-left'>#: kelompokpasien #</span>"                       
                    },
                    {                        
                        "title": "Rencana Pindah",
                        headerAttributes: { style: "text-align : center" },
                        columns: [
                            {
                                "field": "ruanganrencana",
                                "title": "Ruangan Rencana",
                                headerAttributes: { style: "text-align :  center" },
                                "width":"150px",
                                "template": "<span class='style-left'>#: ruanganrencana #</span>"
                            },
                            {
                                "field": "tglrencana",
                                "title": "Tgl Rencana",
                                headerAttributes: { style: "text-align : center" },
                                "width":"80px",
                                "template": "<span class='style-left'>{{formatTanggal('#: tglrencana #')}}</span>"
                            },
                        ]
                    },
                    {
                        "field": "status",
                        "title": "Status",
                        headerAttributes: { style: "text-align : center" },
                        "width":"85px",                        
                    }
                ]
            };

            $scope.Page = {
                refresh: true,
                buttonCount: 5
            }


        }
    ]);

});