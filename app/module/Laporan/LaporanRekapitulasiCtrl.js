define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('LaporanRekapitulasiCtrl', ['CacheHelper','$q', '$rootScope', '$scope','ModelItemAkuntansi','DateHelper','$http','$state','ReportPelayanan','ManageSdm','ManageLogistikPhp', 'FindPasien', 'ManageTataRekening',
    function(cacheHelper,$q, $rootScope, $scope,modelItemAkuntansi,DateHelper,$http,$state,ReportPelayanan,ManageSdm,manageLogistikPhp,findPasien, manageTataRekening) {
    	//Inisial Variable 
        $scope.isRouteLoading=false;
        $scope.dataVOloaded = true;
        $scope.now = new Date();
        $scope.dataSelected={};
        $scope.item={};
        $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
        LoadCombo();
        // $scope.CariLapPasienPulang = function () {
        //     // $scope.isRouteLoading = true;
        //     LoadData()
        // }

        function LoadCombo(){
            manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", true).then(function(data) {
                $scope.listDepartemen = data.data.departemen;
                // $scope.listKelompokPasien = data.data.kelompokpasien;
            })
        }

        $scope.CariLapPasienPulang = function () {
            // $scope.isRouteLoading = true;
            LoadDataRekap();
            LoadDataNonRekap();
            LoadDataPencapaian();
        }

        function LoadDataRekap() {
            $scope.isRouteLoading = true;
            var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
            var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');;
            var tempRuanganId = "";
            if ($scope.item.ruangan != undefined) {
                tempRuanganId = "&idRuangan=" + $scope.item.ruangan.id;
            }
            var tempDepartemen = "";
            if ($scope.item.departement != undefined) {
                tempDepartemen = "&idDept=" + $scope.item.departement.id;
            }
            // var tempKelPasienId = "";
            // if ($scope.item.namaPenjamin != undefined) {
            //     tempKelPasienId = "&kelompokPasien=" + $scope.item.namaPenjamin.id;
            // }
            // var tempRekananId = "";
            // if ($scope.item.institusiAsalPasien != undefined) {
            //     tempRekananId = "&institusiAsalPasien=" + $scope.item.institusiAsalPasien.id;
            // }

            var chacePeriode = {
                0: tglAwal,
                1: tglAkhir
            }
            cacheHelper.set('LaporanRekapitulasiCtrl', chacePeriode);

            modelItemAkuntansi.getDataTableTransaksi("laporan/get-laporan-rekapitulasi?"
                + "tglAwal=" + tglAwal
                + "&tglAkhir=" + tglAkhir
                + tempDepartemen + tempRuanganId).then(function (data) {
                    $scope.isRouteLoading = false;
                    var datas = data.data;
                    $scope.dataPasienPulang = new kendo.data.DataSource({
                        data: datas,
                        // pageSize: 10,
                        total: datas.length,
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

        function LoadDataNonRekap() {
            $scope.isRouteLoading = true;
            var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
            var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');;
            var tempRuanganId = "";
            if ($scope.item.ruangan != undefined) {
                tempRuanganId = "&idRuangan=" + $scope.item.ruangan.id;
            }
            var tempDepartemen = "";
            if ($scope.item.departement != undefined) {
                tempDepartemen = "&idDept=" + $scope.item.departement.id;
            }

            var chacePeriode = {
                0: tglAwal,
                1: tglAkhir
            }
            cacheHelper.set('LaporanRekapitulasiCtrl', chacePeriode);

            modelItemAkuntansi.getDataTableTransaksi("laporan/get-laporan-pendapatan-realisasi?"
                + "tglAwal=" + tglAwal
                + "&tglAkhir=" + tglAkhir
                + tempDepartemen + tempRuanganId).then(function (data) {
                    $scope.isRouteLoading = false;
                    var datas = data.data;
                    $scope.dataPasienPulang1 = new kendo.data.DataSource({
                        data: datas,
                        group:$scope.group,
                        pageSize: 30,
                        total: datas.length,
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

        function LoadDataPencapaian() {
            $scope.isRouteLoading = true;
            var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
            var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');;
            var tempRuanganId = "";
            if ($scope.item.ruangan != undefined) {
                tempRuanganId = "&idRuangan=" + $scope.item.ruangan.id;
            }
            var tempDepartemen = "";
            if ($scope.item.departement != undefined) {
                tempDepartemen = "&idDept=" + $scope.item.departement.id;
            }

            var chacePeriode = {
                0: tglAwal,
                1: tglAkhir
            }
            cacheHelper.set('LaporanRekapitulasiCtrl', chacePeriode);

            modelItemAkuntansi.getDataTableTransaksi("laporan/get-laporan-pencapaian-realisasi?"
                + "tglAwal=" + tglAwal
                + "&tglAkhir=" + tglAkhir
                + tempDepartemen + tempRuanganId).then(function (data) {
                    $scope.isRouteLoading = false;
                    var datas = data.data;
                    $scope.dataPasienPulang2 = new kendo.data.DataSource({
                        data: datas,
                        group:$scope.groups,
                        // pageSize: 10,
                        total: datas.length,
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

        $scope.click = function (dataPasienSelected) {
            var data = dataPasienSelected;
            
        };
        $scope.formatTanggal = function (tanggal) {
            return moment(tanggal).format('DD-MMM-YYYY HH:mm');
        }
        $scope.formatRupiah = function (value, currency) {
            return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }

        $scope.columnPasienPulang = {
             toolbar:["excel"],
                excel: {
                    fileName:"Laporan Rekap Realisasi Pendapatan"+moment($scope.now).format( 'DD/MMM/YYYY'),
                    allPages: true,
                },
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with"
                        }
                    }
                },
                selectable: 'row',

                columns: [

                {
                    "field": "kelompokprodukbpjs",
                    "title": "Kegiatan",
                    "width":"200px",
                },
                {
                    "field": "",
                    "title": "Tarif",
                    headerAttributes:{style:"text-align : right"}, 
                    "width": "110px",
                },
                {
                    "title": "RBA TAHUN 2017",
                    "width": "300px",
                     headerAttributes:{style:"text-align : center"},  
                    "columns": [
                       {
                            "title": "BPJS",
                            "width": "150px",
                             headerAttributes:{style:"text-align : center"},  
                            "columns":[
                                {
                                    "field": "",
                                    "title": "JUMLAH",
                                     headerAttributes:{style:"text-align : center"},  
                                    "width": "150px",
                                    "columns":[
                                        {
                                            "field": "",
                                            "title": "VOL",
                                            headerAttributes:{style:"text-align : right"},
                                            "width": "150px",

                                        },
                                        {
                                            "field": "",
                                            "title": "Rupiah",
                                             headerAttributes:{style:"text-align : right"}, 
                                            "width": "150px",
                                        }

                                    ]
                                }
                            ]
                       },
                       {
                            "title": "NON BPJS",
                            "width": "150px",
                             headerAttributes:{style:"text-align : center"},  
                            "columns":[
                                {
                                    "field": "",
                                    "title": "JUMLAH",
                                     headerAttributes:{style:"text-align : center"},  
                                    "width": "150px",
                                    "columns":[
                                        {
                                            "field": "",
                                            "title": "VOL",
                                            headerAttributes:{style:"text-align : right"}, 
                                            "width": "75px",
                                        },
                                        {
                                            "field": "",
                                            "title": "Rupiah",
                                            headerAttributes:{style:"text-align : right"}, 
                                            "width": "150px",
                                        }

                                    ]
                                }
                            ]
                       } 
                    ]
                },
                {
                    "title": "REALISASI",
                    "width": "300px",
                     headerAttributes:{style:"text-align : center"},  
                    "columns": [
                       {
                            "title": "BPJS",
                            "width": "150px",
                             headerAttributes:{style:"text-align : center"},  
                            "columns":[
                                {                                    
                                    "title": "JUMLAH",
                                     headerAttributes:{style:"text-align : center"},  
                                    "width": "150px",
                                    "columns":[
                                        {
                                            "field": "VolBpjs",
                                            "title": "VOL",
                                            "width": "150px",
                                            headerAttributes:{style:"text-align : right"},
                                            template: "<span class='style-right'>#: VolBpjs #</span>",
                                            
                                        },
                                        {
                                            "field": "RupBpjs",
                                            "title": "Rupiah",
                                            "width": "150px",
                                            headerAttributes:{style:"text-align : right"}, 
                                            template: "<span class='style-right'>{{formatRupiah('#: RupBpjs #', 'Rp. ')}}</span>",  
                                        }

                                    ]
                                },
                                {
                                    "title": "PENCAPAIAN",
                                     headerAttributes:{style:"text-align : center"},  
                                    "width": "150px",
                                    "columns":[
                                        {
                                            "field": "",
                                            "title": "VOL",
                                            "width": "150px",
                                        },
                                        {
                                            "field": "",
                                            "title": "Rupiah",
                                            "width": "150px",
                                        }

                                    ]
                                }
                            ]
                       },
                       {
                            "title": "NON BPJS",
                            "width": "150px",
                            headerAttributes:{style:"text-align : center"},  
                            "columns":[
                                {
                                    "field": "",
                                    "title": "JUMLAH",
                                     headerAttributes:{style:"text-align : center"}, 
                                    "width": "150px",
                                    "columns":[
                                        {
                                            "field": "VolNonBpjs",
                                            "title": "VOL",
                                            "width": "150px",
                                            headerAttributes:{style:"text-align : right"}, 
                                            template: "<span class='style-right'>#: VolNonBpjs #</span>",
                                        },
                                        {
                                            "field": "RupNonBpjs",
                                            "title": "Rupiah",
                                            "width": "150px",
                                            headerAttributes:{style:"text-align : right"}, 
                                            template: "<span class='style-right'>{{formatRupiah('#: RupNonBpjs #', 'Rp. ')}}</span>",  
                                        }

                                    ]
                                },
                                {
                                    "title": "PENCAPAIAN",
                                     headerAttributes:{style:"text-align : center"},  
                                    "width": "150px",
                                    "columns":[
                                        {
                                            "field": "",
                                            "title": "VOL",
                                            headerAttributes:{style:"text-align : right"}, 
                                            "width": "150px",
                                        },
                                        {
                                            "field": "",
                                            "title": "Rupiah",
                                            headerAttributes:{style:"text-align : right"}, 
                                            "width": "150px",
                                        }

                                    ]
                                }
                            ]
                       } 
                    ]
                }
            ]
        }

            $scope.group =[
                {
                    field:"kelompokprodukbpjs", aggregates:[
                        {field:'kelompokprodukbpjs', aggregate:'sum'}
                    ]                            
                },
                {
                    field:"namaproduk", aggregates:[
                        {field:'namaproduk', aggregate:'sum'}
                    ]                            
                }                 
            ]
            $scope.aggregate = [{
                    field: "kelompokprodukbpjs",
                    aggregate: "count"
                },
                {
                    field: "namaproduk",
                    aggregate: "count"
                },
            ]

        $scope.columnPasienPulang1 = {
             toolbar:["excel"],
                excel: {
                    fileName:"Laporan Realisasi Pendapatan"+moment($scope.now).format( 'DD/MMM/YYYY'),
                    allPages: true,
                },
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with"
                        }
                    }
                },
                selectable: 'row',
                groupable: true,
                columns: [
                {
                    "field": "namakelas",
                    "title": "Kegiatan",
                    "width": "200px",
                },
                {
                    "field": "hargajual",
                    "title": "Tarif",
                    "width": "110px",
                    headerAttributes:{style:"text-align : right"},
                    // template: "<span class='style-right'>{{formatRupiah('#: hargajual #', 'Rp. ')}}</span>",  
                },
                {
                    "title": "RBA TAHUN 2017",
                    "width": "300px",
                     headerAttributes:{style:"text-align : center"},  
                    "columns": [
                       {
                            "title": "BPJS",
                            "width": "150px",
                             headerAttributes:{style:"text-align : center"},  
                            "columns":[
                                {
                                    "field": "",
                                    "title": "JUMLAH",
                                     headerAttributes:{style:"text-align : center"},  
                                    "width": "150px",
                                    "columns":[
                                        {
                                            "field": "",
                                            "title": "VOL",
                                             headerAttributes:{style:"text-align : right"},
                                            "width": "150px",

                                        },
                                        {
                                            "field": "",
                                            "title": "Rupiah",
                                             headerAttributes:{style:"text-align : right"}, 
                                            "width": "150px",
                                        }

                                    ]
                                }
                            ]
                       },
                       {
                            "title": "NON BPJS",
                            "width": "150px",
                             headerAttributes:{style:"text-align : center"},  
                            "columns":[
                                {
                                    "field": "",
                                    "title": "JUMLAH",
                                     headerAttributes:{style:"text-align : center"},  
                                    "width": "150px",
                                    "columns":[
                                        {
                                            "field": "",
                                            "title": "VOL",
                                             headerAttributes:{style:"text-align : right"}, 
                                            "width": "150px",
                                        },
                                        {
                                            "field": "",
                                            "title": "Rupiah",
                                             headerAttributes:{style:"text-align : right"}, 
                                            "width": "150px",
                                        }

                                    ]
                                }
                            ]
                       } 
                    ]
                },
                {
                    "title": "REALISASI",
                    "width": "300px",
                     headerAttributes:{style:"text-align : center"},  
                    "columns": [
                       {
                            "title": "BPJS",
                            "width": "150px",
                             headerAttributes:{style:"text-align : center"},  
                            "columns":[
                                {                                    
                                    "title": "JUMLAH",
                                     headerAttributes:{style:"text-align : center"},  
                                    "width": "150px",
                                    "columns":[
                                        {
                                            "field": "VolBpjs",
                                            "title": "VOL",
                                            "width": "150px",
                                            headerAttributes:{style:"text-align : right"},
                                            template: "<span class='style-right'>#: VolBpjs #</span>",
                                            
                                        },
                                        {
                                            "field": "RupBpjs",
                                            "title": "Rupiah",
                                            "width": "150px",
                                            headerAttributes:{style:"text-align : right"}, 
                                            template: "<span class='style-right'>{{formatRupiah('#: RupBpjs #', 'Rp. ')}}</span>",  
                                        }

                                    ]
                                },
                                {
                                    "title": "PENCAPAIAN",
                                     headerAttributes:{style:"text-align : center"},  
                                    "width": "150px",
                                    "columns":[
                                        {
                                            "field": "",
                                            "title": "VOL",
                                            "width": "150px",
                                        },
                                        {
                                            "field": "",
                                            "title": "Rupiah",
                                            "width": "150px",
                                        }

                                    ]
                                }
                            ]
                       },
                       {
                            "title": "NON BPJS",
                            "width": "150px",
                            headerAttributes:{style:"text-align : center"},  
                            "columns":[
                                {
                                    "title": "JUMLAH",
                                     headerAttributes:{style:"text-align : center"}, 
                                    "width": "150px",
                                    "columns":[
                                        {
                                            "field": "VolNonBpjs",
                                            "title": "VOL",
                                            "width": "150px",
                                            headerAttributes:{style:"text-align : right"}, 
                                            template: "<span class='style-right'>#: VolNonBpjs #</span>",
                                        },
                                        {
                                            "field": "RupNonBpjs",
                                            "title": "Rupiah",
                                            "width": "150px",
                                            headerAttributes:{style:"text-align : right"}, 
                                            template: "<span class='style-right'>{{formatRupiah('#: RupNonBpjs #', 'Rp. ')}}</span>",  
                                        }

                                    ]
                                },
                                {
                                    "title": "PENCAPAIAN",
                                     headerAttributes:{style:"text-align : center"},  
                                    "width": "150px",
                                    "columns":[
                                        {
                                            "field": "",
                                            "title": "VOL",
                                            headerAttributes:{style:"text-align : right"}, 
                                            "width": "150px",
                                        },
                                        {
                                            "field": "",
                                            "title": "Rupiah",
                                            headerAttributes:{style:"text-align : right"}, 
                                            "width": "150px",
                                        }

                                    ]
                                }
                            ]
                       } 
                    ]
                }
            ]
        }

            $scope.groups =[
                {
                    field:"kelompokprodukbpjs", aggregates:[
                        {field:'kelompokprodukbpjs', aggregate:'sum'}
                    ]                            
                }
            ]
            $scope.aggregatess = [{
                    field: "kelompokprodukbpjs",
                    aggregatess: "count"
                },
            ]

        $scope.columnPasienPulang2 = {
             toolbar:["excel"],
                excel: {
                    fileName:"Laporan Realisasi Pencapaian"+moment($scope.now).format( 'DD/MMM/YYYY'),
                    allPages: true,
                },
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with"
                        }
                    }
                },
                selectable: 'row',
                groupable: true,
                columns: [
                {
                    "field": "rangeumur",
                    "title": "Jenis Kegiatan",
                    "width": "100px",
                },
                {
                    "title": "RBA TAHUN 2017",
                    "width": "150px",
                     headerAttributes:{style:"text-align : center"},  
                    "columns": [                      
                        {
                            "field": "",
                            "title": "VOL",
                            "width": "75px",
                            headerAttributes:{style:"text-align : right"}, 
                            // template: "<span class='style-right'>{{formatRupiah('#: RupNonBpjs #', 'Rp. ')}}</span>", 

                        },
                        {
                            "field": "",
                            "title": "Rupiah",
                            "width": "75px",
                            headerAttributes:{style:"text-align : right"}, 
                            // template: "<span class='style-right'>{{formatRupiah('#: RupNonBpjs #', 'Rp. ')}}</span>", 
                        }

                    ]
                },
                {
                    "title": "REALISASI BPJS",
                    "width": "150px",
                     headerAttributes:{style:"text-align : center"},  
                    "columns": [
                        {
                            "field": "VolBpjs",
                            "title": "VOL",
                            "width": "75px",
                        },
                        {
                            "field": "RupBpjs",
                            "title": "Rupiah",
                            "width": "75px",
                            headerAttributes:{style:"text-align : right"}, 
                            template: "<span class='style-right'>{{formatRupiah('#: RupNonBpjs #', 'Rp. ')}}</span>", 
                        }
                    ]
                },
                {
                    "title": "REALISASI NON BPJS",
                    "width": "150px",
                     headerAttributes:{style:"text-align : center"},  
                    "columns": [
                        {
                            "field": "VolNonBpjs",
                            "title": "VOL",
                            "width": "75px",
                        },
                        {
                            "field": "RupNonBpjs",
                            "title": "Rupiah",
                            "width": "75px",
                            headerAttributes:{style:"text-align : right"}, 
                            template: "<span class='style-right'>{{formatRupiah('#: RupNonBpjs #', 'Rp. ')}}</span>", 
                        }
                    ]
                },
                {
                    "title": "JUMLAH",
                    "width": "150px",
                     headerAttributes:{style:"text-align : center"},  
                    "columns": [
                        {
                            "field": "",
                            "title": "VOL",
                            "width": "75px",
                        },
                        {
                            "field": "",
                            "title": "Rupiah",
                            "width": "75px",
                        }
                    ]
                },
                {
                    "title": "PENC(%) BPJS",
                    "width": "150px",
                     headerAttributes:{style:"text-align : center"},  
                    "columns": [
                        {
                            "field": "",
                            "title": "VOL",
                            "width": "75px",
                        },
                        {
                            "field": "",
                            "title": "Rupiah",
                            "width": "75px",
                        }
                    ]
                },
                {
                    "title": "PENC(%) NON BPJS",
                    "width": "150px",
                     headerAttributes:{style:"text-align : center"},  
                    "columns": [
                        {
                            "field": "",
                            "title": "VOL",
                            "width": "75px",
                        },
                        {
                            "field": "",
                            "title": "Rupiah",
                            "width": "75px",
                        }
                    ]
                }
                       
            ]
        }

        $scope.Perbaharui = function () {
            $scope.ClearSearch();
        }

        //fungsi clear kriteria search
        $scope.ClearSearch = function () {
            $scope.item = {};
            $scope.item.tglawal = $scope.now;
            $scope.item.tglakhir = $scope.now;
            $scope.CariLapPasienPulang();
        }

        var HttpClient = function() {
            this.get = function(aUrl, aCallback) {
                var anHttpRequest = new XMLHttpRequest();
                anHttpRequest.onreadystatechange = function() { 
                    if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                        aCallback(anHttpRequest.responseText);
                }

                anHttpRequest.open( "GET", aUrl, true );            
                anHttpRequest.send( null );
            }
        }
        //sdm service hanya sementara, nanti harus diganti pake service kasir !!

	    // ManageSdm.getItem("service/list-generic/?view=Ruangan&select=id,namaRuangan").then(function(dat) {
	    // $scope.listRuangan = dat.data;
	    // });

        $scope.getIsiComboRuangan = function(){
            $scope.listRuangan = $scope.item.departement.ruangan
        }

        // findPasien.getKelompokPasien().then(function(e) {
        //     $scope.kelompokPasiens = e.data.data
        // })

        // $scope.$watch('item.namaPenjamin', function(e){
        //     debugger;
        //     if (e === undefined) return;
        //     findPasien.getDataRekanan(e.id).then(function(data) {
        //         $scope.sourceDataRekanan = data.data.data.listData;
        //         $scope.item.institusiAsalPasien = $scope.sourceDataRekanan;
        //     });
        //     if(e.id==5 || e.id==3 ){
        //         $scope.Perusahaan=true
        //     }else{
        //         $scope.Perusahaan=false
        //         $scope.item.institusiAsalPasien=""
        //     }
        // })

        $scope.tglPelayanan = $scope.item.pelayanan;
        $scope.dokter = $scope.item.namaPegawai;

        $scope.listDataFormat = [
             {
             "id":1, "format":"pdf"
             },
             {
              "id":2, "format":"xls"
             }
		];
        
        
        $scope.date = new Date();
        var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
        
        //Tanggal Default
        $scope.item.tglawal = tanggals+" 00:00";
        $scope.item.tglakhir= tanggals+" 23:59";
       
        // Tanggal Inputan
        $scope.tglawal = $scope.item.tglawal;
        $scope.tglakhir = $scope.item.tglakhir;
        $scope.pegawai = modelItemAkuntansi.getPegawai();
		
        $scope.Cetak = function() {
        // if($scope.item.format == undefined){
        // 	alert('format file harus dipilih terlebih dahulu !!!')
        // }
            if($scope.item.tglawal == $scope.tglawal)
                var tglawal = $scope.item.tglawal;
            else
                var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            if($scope.item.tglakhir == $scope.tglakhir)
                var tglakhir = $scope.item.tglakhir;
            else
                var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
            if($scope.item.departement == undefined)
                var departement = "";
            else
                var departement = $scope.item.departement.id;
            if($scope.item.namaPenjamin == undefined)
                var kelompokPasien = "";
            else
                var kelompokPasien = $scope.item.namaPenjamin.id;
            if($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;
            if($scope.item.institusiAsalPasien == undefined || $scope.item.institusiAsalPasien.id == undefined)
                var perusahaan = "";
            else
                var perusahaan = $scope.item.institusiAsalPasien.id;
            var stt = 'false'
            if (confirm('View Laporan Pasien Pulang? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/kasir?cetak-LaporanPasienPulang=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir+'&strIdDepartement='+departement+'&strIdRuangan='+ruangan+'&strIdKelompokPasien='+kelompokPasien+'&strIdPegawai='+$scope.pegawai.id+'&strIdPerusahaan='+perusahaan+'&view='+ stt, function(response) {
                // do something with response
            });
            // if(client.status==0){
            //     if($scope.item.format == undefined){
            //         alert('format file harus dipilih terlebih dahulu !!!');
            //     }else{
            //         var urlLaporan = ReportPelayanan.open('preporting/lapPelayananPasien?startDate=''+tglawal+'+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdDepartement='+departement+'&strIdKelompokPasien='+kelompokPasien+'&strIdDokter='+namaPegawai+'&format='+$scope.item.format.format);
            //         window.open(urlLaporan, '_blank');
            //     }
            // }   
	    }
       
        }
    ]);
});