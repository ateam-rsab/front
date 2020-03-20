define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanPasienBaruLamaCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'DateHelper', '$http', '$state', 'ReportPelayanan', 'ManageSdm',
        function (cacheHelper, $q, $rootScope, $scope, modelItemAkuntansi, DateHelper, $http, $state, ReportPelayanan, ManageSdm) {
            //Inisial Variable 
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.listStatus = [{id:1,status:'BARU'},{id:2,status:'LAMA'}]
            LoadDataCombo()
            LoadData ()

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
           
           function LoadDataCombo(){
                 //sdm service hanya sementara, nanti harus diganti pake service kasir !!
                ManageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function (dat) {
                    $scope.listPegawai = dat.data;
                });

                // ManageSdm.getItem("service/list-generic/?view=Ruangan&select=id,namaRuangan").then(function (dat) {
                //     $scope.listRuangan = dat.data;
                // });

                ManageSdm.getItem("service/list-generic/?view=KelompokPasien&select=*").then(function (dat) {
                    $scope.listPasien = dat.data;
                });

                // ManageSdm.getItem("service/list-generic/?view=Departemen&select=*").then(function (dat) {
                //     $scope.listDepartemen = dat.data;
                // });


                $scope.tglPelayanan = $scope.item.pelayanan;
                $scope.dokter = $scope.item.namaPegawai;
            
                //debugger;
                $scope.date = new Date();
                var tanggals = DateHelper.getDateTimeFormatted3($scope.date);

                //Tanggal Default
                $scope.item.tglawal = tanggals + " 00:00";
                $scope.item.tglakhir = tanggals + " 23:59";

                // Tanggal Inputan
                $scope.tglawal = $scope.item.tglawal;
                $scope.tglakhir = $scope.item.tglakhir;
                $scope.pegawai = modelItemAkuntansi.getPegawai();
           }

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
                // $scope.listPegawai = dat.data.dokter;
                $scope.listDepartemen = dat.departemen;
                // $scope.listPegawaiKasir = dat.data.kasir;
                //$scope.dataLogin = dat.data.datalogin[0];
                // $scope.listKelompokPasien = dat.data.kelompokpasien;
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
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');
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

                var status = "";
                if ($scope.item.Status != undefined) {
                    status = "&StatusPasien=" + $scope.item.Status.status;
                }


                var chacePeriode = {
                    0: tglAwal,
                    1: tglAkhir
                }
                cacheHelper.set('LaporanPasienBaruLamaCtrl', chacePeriode);

                modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-lap-pasien-baru-lama?"
                    + "tglAwal=" + tglAwal
                    + "&tglAkhir=" + tglAkhir
                    + tempDepartemenId
                    + tempRuanganId
                    + tempKelPasienId
                    +status).then(function (data) {
                        $scope.isLoadingData = false;
                        var datas = data.data;
                        $scope.sourceLaporan = new kendo.data.DataSource({
                            data: datas
                        });                      
                    })
            }

            $scope.Perbaharui = function () {
                $scope.ClearSearch();
            }

        $scope.formatTanggal = function (tanggal) {
            return moment(tanggal).format('DD-MMM-YYYY HH:mm');
        }
        $scope.formatRupiah = function (value, currency) {
            return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
        }

          
            $scope.ClearSearch = function () {
                $scope.item = {};
                $scope.item.tglawal = $scope.now;
                $scope.item.tglakhir = $scope.now;
                $scope.Search();
            }

            $scope.optionsGrid = {
                toolbar:["excel"],
                excel: {
                    fileName:"Daftar Pasien Baru Lama"+moment($scope.now).format( 'DD/MMM/YYYY'),
                    allPages: true,
                },
                selectable: 'row',
                pageable: true,
                editable: false,
                columns: [
                    {
                        "field": "tglregistrasi",
                        "title": "Tgl Registrasi",
                        "template": "<span class='style-left'>{{formatTanggal('#: tglregistrasi #')}}</span>",
                        "width": 120,
                    },
                    {
                        "field": "nocm",
                        "title": "No RM",
                    }, 
                    {
                        "field": "noregistrasi",
                        "title": "Noregistrasi",
                    }, 
                    {
                        "field": "namapasien",
                        "title": "Nama Pasien",
                        "width": 120,
                    },
                    {
                        "field": "statuspasien",
                        "title": "Status Pasien",
                    }, 
                    {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": 150,
                    },
                    {
                        "field": "kelompokpasien",
                        "title": "Tipe Pasien",
                        "width": 150,
                    }, 
                    {
                        "field": "penjaminpasien",
                        "title": "Penjamin Pasien",
                        "width": 150,
                    }
                ],

            };

        }
    ]);
});