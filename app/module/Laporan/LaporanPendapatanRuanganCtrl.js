define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanPendapatanRuanganCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'ManageLogistikPhp', 'DateHelper', '$http', '$state', 'ReportPelayanan', 'ManageSdm', 'CetakHelper',
        function (cacheHelper, $q, $rootScope, $scope, modelItemAkuntansi, manageLogistikPhp, DateHelper, $http, $state, ReportPelayanan, ManageSdm, cetakHelper) {
            //Inisial Variable 
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {};
            // $scope.bg = {};
            // $scope.isRouteLoading = false;
            Combo()

            function Combo() {
                var chacePeriode = cacheHelper.get('LaporanPendapatanRuanganCtrl');
                if(chacePeriode != undefined){
                    //debugger;
                    // var arrPeriode = chacePeriode.split('~');
                    $scope.item.tglawal = new Date(chacePeriode[0]);
                    $scope.item.tglakhir = new Date(chacePeriode[1]);                
                }else{
                    $scope.item.tglawal = $scope.now;
                    $scope.item.tglakhir = $scope.now;                 
                }
                manageLogistikPhp.getDataTableTransaksi("humas/get-daftar-combo", true).then(function (dat) {
                    $scope.listDepartemen = dat.data.datadept;
                    $scope.listKelompokPasien = dat.data.kelompokpasien;
                });

                modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-pegawai", true, true, 20).then(function(data) {
                    $scope.listPegawai = data;
                });
            }
           
            $scope.getIsiComboRuangan = function(){
                $scope.listRuangan = $scope.item.departement.ruangan
            }

            $scope.CariData = function () {
                LoadData()
            }

            function LoadData() {
                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');
                //debugger
                var tempDepartemen = "";
                // if ($scope.item.departement != undefined) {
                //     tempDepartemen = "&idDept=" + $scope.item.departement.id;
                // }
                var tempRuanganId = "";
                if ($scope.item.ruangan != undefined) {
                    tempRuanganId = "&idRuangan=" + $scope.item.ruangan.id;
                }

                var tempKelPasienId = "";
                if ($scope.item.KelompokPasien != undefined) {
                    tempKelPasienId = "&kelompokPasien=" + $scope.item.KelompokPasien.id;
                }


                var chacePeriode = {
                    0: tglAwal,
                    1: tglAkhir
                }
                cacheHelper.set('LaporanPendapatanRuanganCtrl', chacePeriode);
                var ttladministrasi = 0
                var ttlvisite = 0
                var ttlkonsul = 0
                var ttlakomodasi = 0
                var ttlalatcanggih = 0
                var ttltindakan = 0
                var ttlobatalkes = 0
                var ttldiskon = 0
                var ttldeposit = 0

                var ttladministrasij = 0
                var ttlvisitej = 0
                var ttlkonsulj = 0
                var ttlakomodasij = 0
                var ttlalatcanggihj = 0
                var ttltindakanj = 0
                var ttlobatalkesj = 0
                var ttldiskonj = 0
                var ttldepositj = 0

                var ttlALL = 0

                $scope.item.ttlKarcis = parseFloat(ttladministrasi).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlVisite = parseFloat(ttlvisite).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlKonsul = parseFloat(ttlkonsul).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlAkomodasi = parseFloat(ttlakomodasi).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlAlatCanggih = parseFloat(ttlalatcanggih).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlTindakan = parseFloat(ttltindakan).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlObatAlkes = parseFloat(ttlobatalkes).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlDiskon = parseFloat(ttldiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlDeposit = parseFloat(ttldeposit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")


                $scope.item.ttlKarcisJ = parseFloat(ttladministrasij).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlVisiteJ = parseFloat(ttlvisitej).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlKonsulJ = parseFloat(ttlkonsulj).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlAkomodasiJ = parseFloat(ttlakomodasij).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlAlatCanggihJ = parseFloat(ttlalatcanggihj).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlTindakanJ = parseFloat(ttltindakanj).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlObatAlkesJ = parseFloat(ttlobatalkesj).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlDiskonJ = parseFloat(ttldiskonj).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                $scope.item.ttlDepositJ = parseFloat(ttldepositj).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                // var arrrrrr ='';
                modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-lap-pendapatan-ruangan?"
                    + "tglAwal=" + tglAwal
                    + "&tglAkhir=" + tglAkhir
                    + tempDepartemen
                    + tempRuanganId
                    + tempKelPasienId).then(function (data) {
                        $scope.isRouteLoading = false;
                        var total = 0;
                        for (var i = 0; i < data.data.length; i++) {
                            ttladministrasi = ttladministrasi + parseFloat(data.data[i].administrasi) 
                            ttlvisite = ttlvisite + parseFloat(data.data[i].visite) 
                            ttlkonsul = ttlkonsul + parseFloat(data.data[i].konsultasi) 
                            ttlakomodasi = ttlakomodasi + parseFloat(data.data[i].akomodasi) 
                            ttlalatcanggih = ttlalatcanggih + parseFloat(data.data[i].alatcanggih) 
                            ttltindakan = ttltindakan + parseFloat(data.data[i].tindakan) 
                            ttlobatalkes = ttlobatalkes + parseFloat(data.data[i].obatalkes) 
                            ttldiskon = ttldiskon + parseFloat(data.data[i].diskon) 
                            ttldeposit = ttldeposit + parseFloat(data.data[i].deposit) 

                            ttladministrasij = ttladministrasij + parseFloat(data.data[i].administrasij) 
                            ttlvisitej = ttlvisitej + parseFloat(data.data[i].visitej) 
                            ttlkonsulj = ttlkonsulj + parseFloat(data.data[i].konsultasij) 
                            ttlakomodasij = ttlakomodasij + parseFloat(data.data[i].akomodasij) 
                            ttlalatcanggihj = ttlalatcanggihj + parseFloat(data.data[i].alatcanggihj) 
                            ttltindakanj = ttltindakanj + parseFloat(data.data[i].tindakanj) 
                            if (data.data[i].obatalkesj != null) {
                                ttlobatalkesj = ttlobatalkesj + parseFloat(data.data[i].obatalkesj) 
                            }
                            ttldiskonj = ttldiskonj + parseFloat(data.data[i].diskonj) 
                            ttldepositj = ttldepositj + parseFloat(data.data[i].depositj) 

                            // arrrrrr = arrrrrr + ' ' + data.data[i].obatalkesj + ' ' + data.data[i].nocm

                            // ttlALL =  ttladministrasi + ttlvisite + ttlkonsul + ttlakomodasi
                            // + ttlalatcanggih + ttltindakan + ttlobatalkes - ttldiskon
                            ttlALL =  parseFloat(data.data[i].administrasi) + parseFloat(data.data[i].visite) + parseFloat(data.data[i].konsultasi) + parseFloat(data.data[i].akomodasi)
                            + parseFloat(data.data[i].alatcanggih) + parseFloat(data.data[i].tindakan) + parseFloat(data.data[i].obatalkes) - parseFloat(data.data[i].diskon)
                            data.data[i].total = parseFloat(ttlALL) 
                            // total = parseFloat(data.data[i].karcis) + parseFloat(data.data[i].embos)  + parseFloat(data.data[i].konsul)  + parseFloat(data.data[i].tindakan) - parseFloat(data.data[i].diskon)                   
                            // data.data[i].total = total
                       }
                       $scope.item.ttlKarcis = parseFloat(ttladministrasi).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                       $scope.item.ttlVisite = parseFloat(ttlvisite).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                       $scope.item.ttlKonsul = parseFloat(ttlkonsul).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                       $scope.item.ttlAkomodasi = parseFloat(ttlakomodasi).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                       $scope.item.ttlAlatCanggih = parseFloat(ttlalatcanggih).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                       $scope.item.ttlTindakan = parseFloat(ttltindakan).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                       $scope.item.ttlObatAlkes = parseFloat(ttlobatalkes).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                       $scope.item.ttlDiskon = parseFloat(ttldiskon).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                       $scope.item.ttlDeposit = parseFloat(ttldeposit).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")


                       $scope.item.ttlKarcisJ = parseFloat(ttladministrasij).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                       $scope.item.ttlVisiteJ = parseFloat(ttlvisitej).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                       $scope.item.ttlKonsulJ = parseFloat(ttlkonsulj).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                       $scope.item.ttlAkomodasiJ = parseFloat(ttlakomodasij).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                       $scope.item.ttlAlatCanggihJ = parseFloat(ttlalatcanggihj).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                       $scope.item.ttlTindakanJ = parseFloat(ttltindakanj).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                       $scope.item.ttlObatAlkesJ = parseFloat(ttlobatalkesj).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                       $scope.item.ttlDiskonJ = parseFloat(ttldiskonj).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                       $scope.item.ttlDepositJ = parseFloat(ttldepositj).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")

                       if (parseFloat(ttladministrasi) != parseFloat(ttladministrasij)) {
                            $scope.item.ttlKarcisJ = 'xx ' + $scope.item.ttlKarcisJ + ' xx'
                       }
                       if (parseFloat(ttlvisite) != parseFloat(ttlvisitej)) {
                            $scope.item.ttlVisiteJ = 'xx ' + $scope.item.ttlVisiteJ + ' xx'
                       }
                       if (parseFloat(ttlkonsul) != parseFloat(ttlkonsulj)) {
                            $scope.item.ttlKonsulJ = 'xx ' + $scope.item.ttlKonsulJ + ' xx'
                       }
                       if (parseFloat(ttlakomodasi) != parseFloat(ttlakomodasij)) {
                            $scope.item.ttlAkomodasiJ = 'xx ' + $scope.item.ttlAkomodasiJ + ' xx'
                       }
                       if (parseFloat(ttlalatcanggih) != parseFloat(ttlalatcanggihj)) {
                            $scope.item.ttlAlatCanggihJ = 'xx ' + $scope.item.ttlAlatCanggihJ + ' xx'
                       }
                       if (parseFloat(ttltindakan) != parseFloat(ttltindakanj)) {
                            $scope.item.ttlTindakanJ = 'xx ' + $scope.item.ttlTindakanJ + ' xx'
                       }
                       if (parseFloat(ttlobatalkes) != parseFloat(ttlobatalkesj)) {
                            $scope.item.ttlObatAlkesJ = 'xx ' + $scope.item.ttlObatAlkesJ + ' xx'
                       }

                        $scope.dataPendapatanRuangan = new kendo.data.DataSource({
                            data: data.data,
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
                        $scope.dataPendapatanRuangan2 = new kendo.data.DataSource({
                            data: data.dataselisih,
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
                $scope.columnPendapatanRuangan = {
                    toolbar:["excel"],
                    excel: {
                        fileName:"Data Laporan Pendapatan Per Ruangan"+ moment($scope.item.tglawal).format( 'DD/MMM/YYYY') + "-"
                            + moment($scope.item.tglakhir).format( 'DD/MMM/YYYY')+".xlsx",
                        allPages: true,
                    },
                    selectable: 'row',
                    pageable: true,
                    editable: false,
                    columns: [
                        // {
                        //     "field": "noregistrasi",
                        //     "title": "Noregistrasi",
                        //     "width": "110px",
                        
                        // },
                        {
                            "field": "namapasien",
                            "title": "Nama Pasien",
                            "width": "200px",
                        
                        },
                        // {
                        //     "field": "namaruangan",
                        //     "title": "Ruangan",
                        //     "width": "200px",
                        
                        // },
                        // {
                        //     "field": "namalengkap",
                        //     "title": "Dokter",
                        //     "width": "200px",
                        
                        // },
                        // {
                        //     "field": "kelompokpasien",
                        //     "title": "Tipe Pasien",
                        //     "width": "120px",

                        // },
                        {
                            "field": "volkarcis",
                            "title": "Vol",
                            "width": "85px",

                        },
                        {
                            "field": "karcis",
                            "title": "Administrasi",
                            "width": "100px",
                            "template": "<span class='style-left'>{{formatRupiah('#: karcis #','')}}</span>"
                        },
                        {
                            "field": "volkonsul",
                            "title": "Vol",
                            "width": "85px"
                        },
                        {
                            "field": "konsul",
                            "title": "Konsul",
                            "width": "100px",
                            "template": "<span class='style-right'>{{formatRupiah('#: konsul #','')}}</span>",
                        },
                        {
                            "field": "voltindakan",
                            "title": "Vol",
                            "width": "110px",
                        },
                        {
                            "field": "tindakan",
                            "title": "Akomodasi",
                            "width": "100px",
                            "template": "<span class='style-right'>{{formatRupiah('#: tindakan #','')}}</span>",
                        },
                        {
                            "field": "tindakan",
                            "title": "Alat Canggih",
                            "width": "100px",
                            "template": "<span class='style-right'>{{formatRupiah('#: tindakan #','')}}</span>",
                        },
                        {
                            "field": "tindakan",
                            "title": "Tindakan",
                            "width": "100px",
                            "template": "<span class='style-right'>{{formatRupiah('#: tindakan #','')}}</span>",
                        },
                        {
                            "field": "diskon",
                            "title": "Farmasi",
                            "width": "100px",
                            "template": "<span class='style-right'>{{formatRupiah('#: diskon #','')}}</span>",
                        },
                        {
                            "field": "diskon",
                            "title": "Diskon",
                            "width": "100px",
                            "template": "<span class='style-right'>{{formatRupiah('#: diskon #','')}}</span>",
                        },
                        {
                            "field": "total",
                            "title": "Total",
                            "width": "100px",
                            "template": "<span class='style-right'>{{formatRupiah('#: total #','')}}</span>",
                        }

                    ],

                };
            }

            $scope.columnPendapatanRuangan2 = {
                toolbar:["excel"],
                excel: {
                    fileName:"Data Laporan Pendapatan Per Ruangan"+ moment($scope.item.tglawal).format( 'DD/MMM/YYYY') + "-"
                        + moment($scope.item.tglakhir).format( 'DD/MMM/YYYY')+".xlsx",
                    allPages: true,
                },
                selectable: 'row',
                pageable: true,
                editable: false,
                columns: [
                    {
                        "field": "noregistrasi",
                        "title": "Noregistrasi",
                        "width": "110px",
                    
                    },
                    {
                        "field": "namapasien",
                        "title": "Nama Pasien",
                        "width": "200px",
                    
                    },
                    {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "200px",
                    
                    },
                    {
                        "field": "namalengkap",
                        "title": "Dokter",
                        "width": "200px",
                    
                    },
                    {
                        "field": "kelompokpasien",
                        "title": "Tipe Pasien",
                        "width": "120px",

                    },
                    // {
                    //     "field": "volkarcis",
                    //     "title": "Vol",
                    //     "width": "85px",

                    // },
                    {
                        "field": "administrasi",
                        "title": "Administrasi",
                        "width": "100px",
                        "template": "<span class='style-left'>{{formatRupiah('#: administrasi #','')}}</span>"
                    },
                    // {
                    //     "field": "volembos",
                    //     "title": "Vol",
                    //     "width": "85px"
                    // },

                    {
                        "field": "visite",
                        "title": "Visite",
                        "width": "100px",
                        "template": "<span class='style-left'>{{formatRupiah('#: visite #','')}}</span>"
                    },
                    // {
                    //     "field": "volkonsul",
                    //     "title": "Vol",
                    //     "width": "85px"
                    // },
                    {
                        "field": "konsultasi",
                        "title": "Konsul",
                        "width": "100px",
                        "template": "<span class='style-right'>{{formatRupiah('#: konsultasi #','')}}</span>",
                    },
                    {
                        "field": "akomodasi",
                        "title": "Akomodasi",
                        "width": "100px",
                        "template": "<span class='style-right'>{{formatRupiah('#: akomodasi #','')}}</span>",
                    },
                    {
                        "field": "alatcanggih",
                        "title": "AltCanggih",
                        "width": "100px",
                        "template": "<span class='style-right'>{{formatRupiah('#: alatcanggih #','')}}</span>",
                    },
                    // {
                    //     "field": "voltindakan",
                    //     "title": "Vol",
                    //     "width": "110px",
                    // },
                    {
                        "field": "tindakan",
                        "title": "Tindakan",
                        "width": "100px",
                        "template": "<span class='style-right'>{{formatRupiah('#: tindakan #','')}}</span>",
                    },
                    {
                        "field": "obatalkes",
                        "title": "Obat Alkes",
                        "width": "100px",
                        "template": "<span class='style-right'>{{formatRupiah('#: obatalkes #','')}}</span>",
                    },
                    {
                        "field": "diskon",
                        "title": "Diskon",
                        "width": "100px",
                        "template": "<span class='style-right'>{{formatRupiah('#: diskon #','')}}</span>",
                    }

                ],

            };


            $scope.click = function (dataPasienSelected) {
                var data = dataPasienSelected;
                ////debugger
            };
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }
            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            // $scope.columnPendapatanRuangan = [
            //     {
            //         "field": "noregistrasi",
            //         "title": "Noregistrasi",
            //         "width": "110px",
                
            //     },
            //     {
            //         "field": "namapasien",
            //         "title": "Nama Pasien",
            //         "width": "200px",
                
            //     },
            //     {
            //         "field": "namaruangan",
            //         "title": "Ruangan",
            //         "width": "200px",
                
            //     },
            //     {
            //         "field": "namalengkap",
            //         "title": "Dokter",
            //         "width": "200px",
                
            //     },
            //     {
            //         "field": "kelompokpasien",
            //         "title": "Tipe Pasien",
            //         "width": "120px",

            //     },
            //     {
            //         "field": "volkarcis",
            //         "title": "Vol Karcis",
            //         "width": "85px",

            //     },
            //     {
            //         "field": "karcis",
            //         "title": "Karcis",
            //         "width": "100px",
            //         "template": "<span class='style-left'>{{formatRupiah('#: karcis #','')}}</span>"
            //     },
            //     {
            //         "field": "volembos",
            //         "title": "Vol Embos",
            //         "width": "85px"
            //     },

            //     {
            //         "field": "embos",
            //         "title": "Embos",
            //         "width": "100px",
            //         "template": "<span class='style-left'>{{formatRupiah('#: embos #','')}}</span>"
            //     },
            //     {
            //         "field": "volkonsul",
            //         "title": "Vol Konsul",
            //         "width": "85px"
            //     },
            //     {
            //         "field": "konsul",
            //         "title": "Konsul",
            //         "width": "100px",
            //         "template": "<span class='style-right'>{{formatRupiah('#: konsul #','')}}</span>",
            //     },
            //     {
            //         "field": "voltindakan",
            //         "title": "Vol Tindakan",
            //         "width": "110px",
            //     },
            //     {
            //         "field": "tindakan",
            //         "title": "Tindakan",
            //         "width": "100px",
            //         "template": "<span class='style-right'>{{formatRupiah('#: tindakan #','')}}</span>",
            //     },
            //     {
            //         "field": "diskon",
            //         "title": "Diskon",
            //         "width": "100px",
            //         "template": "<span class='style-right'>{{formatRupiah('#: diskon #','')}}</span>",
            //     },
            //     {
            //         "field": "total",
            //         "title": "Total",
            //         "width": "100px",
            //         "template": "<span class='style-right'>{{formatRupiah('#: total #','')}}</span>",
            //     }

            // ];

             $scope.columnPendapatanRuangan = {
                toolbar:["excel"],
                excel: {
                    fileName:"Data Laporan Pendapatan Per Ruangan"+ moment($scope.item.tglawal).format( 'DD/MMM/YYYY') + "-"
                        + moment($scope.item.tglakhir).format( 'DD/MMM/YYYY')+".xlsx",
                    allPages: true,
                },
                selectable: 'row',
                pageable: true,
                editable: false,
                columns: [
                    {
                        "field": "noregistrasi",
                        "title": "Noregistrasi",
                        "width": "110px",
                    
                    },
                    {
                        "field": "namapasien",
                        "title": "Nama Pasien",
                        "width": "200px",
                    
                    },
                    {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "200px",
                    
                    },
                    {
                        "field": "namalengkap",
                        "title": "Dokter",
                        "width": "200px",
                    
                    },
                    {
                        "field": "kelompokpasien",
                        "title": "Tipe Pasien",
                        "width": "120px",

                    },
                    // {
                    //     "field": "volkarcis",
                    //     "title": "Vol",
                    //     "width": "85px",

                    // },
                    {
                        "field": "administrasi",
                        "title": "Administrasi",
                        "width": "100px",
                        "template": "<span class='style-left'>{{formatRupiah('#: administrasi #','')}}</span>"
                    },
                    // {
                    //     "field": "volembos",
                    //     "title": "Vol",
                    //     "width": "85px"
                    // },

                    {
                        "field": "visite",
                        "title": "Visite",
                        "width": "100px",
                        "template": "<span class='style-left'>{{formatRupiah('#: visite #','')}}</span>"
                    },
                    // {
                    //     "field": "volkonsul",
                    //     "title": "Vol",
                    //     "width": "85px"
                    // },
                    {
                        "field": "konsultasi",
                        "title": "Konsul",
                        "width": "100px",
                        "template": "<span class='style-right'>{{formatRupiah('#: konsultasi #','')}}</span>",
                    },
                    {
                        "field": "akomodasi",
                        "title": "Akomodasi",
                        "width": "100px",
                        "template": "<span class='style-right'>{{formatRupiah('#: akomodasi #','')}}</span>",
                    },
                    {
                        "field": "alatcanggih",
                        "title": "AltCanggih",
                        "width": "100px",
                        "template": "<span class='style-right'>{{formatRupiah('#: alatcanggih #','')}}</span>",
                    },
                    // {
                    //     "field": "voltindakan",
                    //     "title": "Vol",
                    //     "width": "110px",
                    // },
                    {
                        "field": "tindakan",
                        "title": "Tindakan",
                        "width": "100px",
                        "template": "<span class='style-right'>{{formatRupiah('#: tindakan #','')}}</span>",
                    },
                    {
                        "field": "obatalkes",
                        "title": "Obat Alkes",
                        "width": "100px",
                        "template": "<span class='style-right'>{{formatRupiah('#: obatalkes #','')}}</span>",
                    },
                    {
                        "field": "diskon",
                        "title": "Diskon",
                        "width": "100px",
                        "template": "<span class='style-right'>{{formatRupiah('#: diskon #','')}}</span>",
                    },
                    {
                        "field": "total",
                        "title": "Total",
                        "width": "100px",
                        "template": "<span class='style-right'>{{formatRupiah('#: total #','')}}</span>",
                    }

                ],

            };


            $scope.Perbaharui = function () {
                $scope.ClearSearch();
            }

            //fungsi clear kriteria search
            $scope.ClearSearch = function () {
                $scope.item = {};
                $scope.item.tglawal = $scope.now;
                $scope.item.tglakhir = $scope.now;
                $scope.CariData();
            }


            //--            
            var HttpClient = function () {
                this.get = function (aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function () {
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open("GET", aUrl, true);
                    anHttpRequest.send(null);
                }
            }
            //sdm service hanya sementara, nanti harus diganti pake service kasir !!

            // ManageSdm.getItem("service/list-generic/?view=Ruangan&select=id,reportDisplay").then(function (dat) {
            //     $scope.listRuangan = dat.data;
            // });

            // ManageSdm.getItem("service/list-generic/?view=KelompokPasien&select=*").then(function (dat) {
            //     $scope.listPasien = dat.data;
            // });


            $scope.tglPelayanan = $scope.item.pelayanan;
            $scope.dokter = $scope.item.namaPegawai;

            $scope.listDataFormat = [

                {
                    "id": 1, "format": "pdf"
                },
                {
                    "id": 2, "format": "xls"
                }

            ]

            //debugger
            $scope.date = new Date();
            var tanggals = DateHelper.getDateTimeFormatted3($scope.date);

            //Tanggal Default
            $scope.item.tglawal = tanggals + " 00:00";
            $scope.item.tglakhir = tanggals + " 23:59";

            // Tanggal Inputan
            $scope.tglawal = $scope.item.tglawal;
            $scope.tglakhir = $scope.item.tglakhir;
            $scope.pegawai = modelItemAkuntansi.getPegawai();

            $scope.Cetak = function () {
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD');

                // var dokter = ''
                // if ($scope.item.namaPegawai != undefined) {
                //   dokter = $scope.item.namaPegawai.id
                // }
                // var departemen = ''
                // if ($scope.item.departement != undefined) {
                //   departemen = $scope.item.departement.id
                // }
                // var ruanganId = ''
                // if ($scope.item.ruangan != undefined) {
                //   ruanganId = $scope.item.ruangan.id
                // }
                // var kelompokPasien = ''
                // if ($scope.item.KelompokPasien != undefined) {
                //   kelompokPasien = $scope.item.KelompokPasien.id
                // }


                // var stt = 'false'
                // if (confirm('View Laporan Pendapatan Ruangan? ')) {
                //     // Save it!
                //     stt = 'true';
                // } else {
                //     // Do nothing!
                //     stt = 'false'
                // }
                // var client = new HttpClient();
                // client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-pendapatanruangan=1&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idDepartemen=' + departemen + '&strIdRuangan=' + ruanganId + '&strIdKelompokPasien=' + kelompokPasien + '&strIdPegawai=' + dokter + '&view=' + stt, function (response) {
                //     // do something with response
                // });

                // https://smart.rsabhk.co.id:2222/reporting-rsabhk-service/lap-pendapatan-ruangan/2021-01-01/2021-01-31

                cetakHelper.openURLReportingNew(`lap-pendapatan-ruangan/${tglAwal}/${tglAkhir}`, '?');
            };

            $scope.CetakDetail = function () {
               var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm:ss');

                var dokter = ''
                if ($scope.item.namaPegawai != undefined) {
                  dokter = $scope.item.namaPegawai.id
                }
                var departemen = ''
                if ($scope.item.departement != undefined) {
                  departemen = $scope.item.departement.id
                }
                var ruanganId = ''
                if ($scope.item.ruangan != undefined) {
                  ruanganId = $scope.item.ruangan.id
                }
                var kelompokPasien = ''
                if ($scope.item.KelompokPasien != undefined) {
                  kelompokPasien = $scope.item.KelompokPasien.id
                }


                var stt = 'false'
                if (confirm('View Laporan Pendapatan Ruangan? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-detailpendapatanruangan=1&tglAwal=' + tglAwal + '&tglAkhir=' + tglAkhir + '&idDepartemen=' + departemen + '&strIdRuangan=' + ruanganId + '&strIdKelompokPasien=' + kelompokPasien + '&strIdPegawai=' + dokter + '&view=' + stt, function (response) {
                    // do something with response
                });
            };


        }
    ]);
});