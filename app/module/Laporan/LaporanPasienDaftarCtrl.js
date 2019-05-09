define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanPasienDaftarCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'DateHelper', '$http', '$state', 'ReportPelayanan', 'ManageSdm',
        function (cacheHelper, $q, $rootScope, $scope, modelItemAkuntansi, DateHelper, $http, $state, ReportPelayanan, ManageSdm) {
            //Inisial Variable 
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {};
            $scope.isRouteLoading = false;
            
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
            // ManageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function (dat) {
            //     $scope.listPegawai = dat.data;
            // });

            // ManageSdm.getItem("service/list-generic/?view=Ruangan&select=id,namaRuangan").then(function (dat) {
            //     $scope.listRuangan = dat.data;
            // });

            // ManageSdm.getItem("service/list-generic/?view=KelompokPasien&select=*").then(function (dat) {
            //     $scope.listPasien = dat.data;
            // });

            // ManageSdm.getItem("service/list-generic/?view=Departemen&select=*").then(function (dat) {
            //     $scope.listDepartemen = dat.data;
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

            //debugger;
            $scope.date = new Date();
            var tanggals = DateHelper.getDateTimeFormatted3($scope.date);

            //Tanggal Default
            $scope.item.tglawal = tanggals + " 00:00";
            $scope.item.tglakhir = tanggals + " 12:59";

            // Tanggal Inputan
            $scope.tglawal = $scope.item.tglawal;
            $scope.tglakhir = $scope.item.tglakhir;
            $scope.pegawai = modelItemAkuntansi.getPegawai();

            $scope.CetakPasienDaftar = function () {
                // if($scope.item.format == undefined){
                // 	alert('format file harus dipilih terlebih dahulu !!!')
                // }
                //debugger;
                if ($scope.item.tglawal == $scope.tglawal)
                    var tglawal = $scope.item.tglawal;
                else
                    var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
                if ($scope.item.tglakhir == $scope.tglakhir)
                    var tglakhir = $scope.item.tglakhir;
                else
                    var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

                if ($scope.item.KelompokPasien == undefined)
                    var kelompokPasien = "";
                else
                    var kelompokPasien = $scope.item.KelompokPasien.id;
                if ($scope.item.ruangan == undefined)
                    var ruangan = "";
                else
                    var ruangan = $scope.item.ruangan.id;
                if ($scope.item.departement == undefined)
                    var departement = "";
                else
                    var departement = $scope.item.departement.id;
                var stt = 'false'
                if (confirm('View Laporan Pasien Daftar? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-pasiendaftar=1&tglAwal=' + tglawal + '&tglAkhir=' + tglakhir + '&strIdRuangan=' + ruangan + '&strIdDepartement=' + departement + '&strIdKelompokPasien=' + kelompokPasien + '&strIdPegawai=' + $scope.pegawai.id + '&view=' + stt, function (response) {
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
            };

            modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-combo-laporan", true).then(function (dat) {
                debugger;
                // $scope.listPegawai = dat.data.dokter;
                $scope.listDepartemen = dat.departemen;
                // $scope.listPegawaiKasir = dat.data.kasir;
                //$scope.dataLogin = dat.data.datalogin[0];
                $scope.listPasien = dat.kelompokpasien;
                // $scope.listJenisLap = [{ id: 1, names: "Laporan Penerimaan Kasir Harian" },
                // { id: 2, names: "Laporan Penerimaan Kasir Perusahaan" }];
            });
            $scope.getIsiComboRuangan = function () {
                $scope.listRuangan = $scope.item.departement.ruangan
            }

            $scope.Search = function () {
             $scope.isLoadingData = true;
                LoadData()
              
            }
            function LoadData() {
             
                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');;
                //debugger;

                var tempDepartemenId = "";
                if ($scope.item.departement != undefined) {
                    tempDepartemenId = "&idDept=" + $scope.item.departement.id;
                }
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
                cacheHelper.set('LaporanPasienDaftarCtrl', chacePeriode);

                modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-lap-pasien-daftar-new?"
                    + "tglAwal=" + tglAwal
                    + "&tglAkhir=" + tglAkhir
                    + tempDepartemenId
                    + tempRuanganId
                    + tempKelPasienId).then(function (data) {
                        $scope.isLoadingData = false;
                        var datas = data;
                        $scope.sourceLaporan = new kendo.data.DataSource({
                            data: datas,
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

                        $scope.dataExcel = data.data;
                    })
            }


              $("#kGrid").kendoGrid({
                toolbar: ["excel"],
                    // , "pdf"],

                    excel: {
                        fileName: "LaporanPasienDaftar.xlsx",
                        allPages: true,

                    },
                // pdf: {
                //     fileName: "LaporanPasienMasuk.pdf",
                //     allPages: true,
                // },

                dataSource: $scope.dataExcel,
                sortable: true,
                // reorderable: true,
                // filterable: true,
                pageable: true,
                // groupable: true,
                // columnMenu: true,
                resizable: true,
                excelExport: function(e) {
                    var rows = e.workbook.sheets[0].rows;
                    rows.unshift({
                        cells: [ { value: "Pasien Daftar", background: "#fffff" } ]
                    });
                },
            columns: [
                       {
                    "field": "tglregistrasi",
                    "title": "Tgl Masuk",
                    "width": "150px",
                    // "template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>"
                },
                {
                    "field": "noregistrasi",
                    "title": "No Registrasi",
                    "width": "100px",
                    "template": "<span class='style-center'>#: noregistrasi #</span>"
                },
                {
                    "field": "namapasien",
                    "title": "Nama Pasien",
                    "width": "180px",

                },

                {
                    "field": "ruangandaftar",
                    "title": "Unit Layanan",
                    "width": "100px"
                },
                {
                    "field": "nocm",
                    "title": "No Rm",
                    "width": "80px"

                },
                {
                    "field": "kelompokpasien",
                    "title": "Tipe Pasien",
                    "width": "100px"
                },
                {
                    "field": "namarekanan",
                    "title": "Penjamin",
                    "width": "150px"
                },
                {
                    "field": "jk",
                    "title": "JK",
                    "width": "50px"
                },
                {
                    "field": "tgllahir",
                    "title": "Tgl Lahir",
                    "width": "100px",
                    // "template": "<span class='style-left'>{{formatTanggal('#: tgllahir #')}}</span>"
                },
                {
                    "field": "umur",
                    "title": "Umur",
                    "width": "100px"
                },
                {
                    "field": "namakelas",
                    "title": "Kelas",
                    "width": "100px"
                },
                {
                    "field": "dokterapd",
                    "title": "Dokter",
                    "width": "100px"
                },
                // {
                //     "field": "asalrujukan",
                //     "title": "Asal Pasien",
                //     "width": "100px"
                // },
                {
                    "field": "tglpulang",
                    "title": "Tgl Keluar",
                    "width": "150px",
                    // "template": "<span class='style-left'>{{formatTanggal('#: tglpulang #')}}</span>"
                },
                // {
                //     "field": "kondisipasien",
                //     "title": "Keadaan",
                //     "width": "100px"
                // },
                {
                    "field": "alamatlengkap",
                    "title": "Alamat",
                    "width": "400px"
                }
              ]
             });
            

         

            $scope.Perbaharui = function () {
                $scope.ClearSearch();
            }

          
            $scope.ClearSearch = function () {
                $scope.item = {};
                $scope.item.tglawal = $scope.now;
                $scope.item.tglakhir = $scope.now;
                $scope.Search();
            }


        }
    ]);
});