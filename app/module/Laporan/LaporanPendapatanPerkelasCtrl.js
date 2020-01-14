define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LaporanPendapatanPerkelasCtrl', ['CacheHelper', '$q', '$rootScope', '$scope', 'ModelItemAkuntansi', 'DateHelper', '$http', '$state', 'ReportPelayanan', 'ManageSdm', 'ManageTataRekening',
        function (cacheHelper, $q, $rootScope, $scope, modelItemAkuntansi, DateHelper, $http, $state, ReportPelayanan, ManageSdm, manageTataRekening) {
            //Inisial Variable 
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.dataSelected = {};
            $scope.item = {};


            $scope.CariData = function () {
                LoadData()
            }
            function LoadData() {

                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.item.tglawal).format('YYYY-MM-DD HH:mm');
                var tglAkhir = moment($scope.item.tglakhir).format('YYYY-MM-DD HH:mm');;
                


                // var tempDepartemenId = "";
                // if ($scope.item.departement != undefined) {
                //     tempDepartemenId = "&idDept=" + $scope.item.departement.id;
                // }
                var tempRuanganId = "";
                if ($scope.item.ruangan != undefined) {
                    tempRuanganId = "&idRuangan=" + $scope.item.ruangan.id;
                }
                var tempKelasId = "";
                if ($scope.item.kelas != undefined) {
                    tempKelasId = "&kelas=" + $scope.item.kelas.id;
                }
                var tempKelPasienId = "";
                if ($scope.item.KelompokPasien != undefined) {
                    tempKelPasienId = "&kelompokPasien=" + $scope.item.KelompokPasien.id;
                }


                var chacePeriode = {
                    0: tglAwal,
                    1: tglAkhir
                }
                cacheHelper.set('LaporanPendapatanPerkelasCtrl', chacePeriode);

                modelItemAkuntansi.getDataTableTransaksi("laporan/get-data-lap-pendapatan-perkelas?"
                    + "tglAwal=" + tglAwal
                    + "&tglAkhir=" + tglAkhir
                    // + tempDepartemenId
                    + tempRuanganId
                    + tempKelasId
                    + tempKelPasienId).then(function (data) {
                        var doubleTotal = 0;
                        var doubleKarcis = 0;
                        for (var i = 0; i < data.data.length; i++) {
                            doubleTotal = doubleTotal + parseFloat(data.data[i].total)
                            doubleKarcis = doubleKarcis + parseFloat(data.data[i].karcis)
                        }
                        $scope.item.karcis = doubleKarcis
                        $scope.item.total = doubleTotal
                        $scope.dataLaporanPerkelas = new kendo.data.DataSource({
                            data: data.data,
                            group: $scope.group,
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
            }

            $scope.click = function (dataPasienSelected) {
                var data = dataPasienSelected;
                //
            };
            $scope.formatTanggal = function (tanggal) {
                return moment(tanggal).format('DD-MMM-YYYY HH:mm');
            }
            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }

            $scope.selectedData = [];
             $scope.onClick = function(e){
                var element =$(e.currentTarget);
                
                var checked = element.is(':checked'),
                    row = element.closest('tr'),
                    grid = $("#kGrid").data("kendoGrid"),
                    dataItem = grid.dataItem(row);

                // $scope.selectedData[dataItem.noRec] = checked;
                if (checked) {
                    var result = $.grep($scope.selectedData, function(e) { 
                        return e.noregistrasi == dataItem.noregistrasi;
                    });
                    if (result.length == 0) {
                        $scope.selectedData.push(dataItem);
                    } else {
                        for (var i = 0; i < $scope.selectedData.length; i++)
                            if ($scope.selectedData[i].noregistrasi === dataItem.noregistrasi) {
                                $scope.selectedData.splice(i, 1);
                                break;
                            }
                        $scope.selectedData.push(dataItem);
                    }
                    row.addClass("k-state-selected");
                } else {
                    for (var i = 0; i < $scope.selectedData.length; i++)
                        if ($scope.selectedData[i].noregistrasi === dataItem.noregistrasi) {
                            $scope.selectedData.splice(i, 1);
                            break;
                        }
                    row.removeClass("k-state-selected");
                }
            }

            $scope.group = {
                field: "noregistrasi",
                aggregates: [{
                    field: "noregistrasi",
                    aggregate: "count"
                }, {
                    field: "noregistrasi",
                    aggregate: "count"
                }]
            };
            $scope.aggregate = [{
                field: "noregistrasi",
                aggregate: "count"
            }, {
                field: "noregistrasi",
                aggregate: "count"
            }]

            $scope.columnLaporanPerkelas = [
                {
                "template": "<input type='checkbox' class='checkbox' ng-click='onClick($event)' />",
                "width": 40
                },
                {
                    "field": "noregistrasi",
                    "title": "No Registrasi",
                    "width": "100px",
                    "template": "<span class='style-center'>#: noregistrasi #</span>"
                },
                {
                    "field": "nocm",
                    "title": "No RM",
                    "width": "80px"
                },
                {
                    "field": "namapasien",
                    "title": "Nama Pasien",
                    "width": "180px",

                },
                {
                    "field": "namaruangan",
                    "title": "Ruangan",
                    "width": "180px"
                },
                {
                    "field": "namakelas",
                    "title": "Kelas",
                    "width": "80px"
                 
                },
                {
                    "field": "namaproduk",
                    "title": "Nama Produk",
                    "width": "100px"
                },
                {
                    "field": "hargadiscount",
                    "title": "Diskon",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #','')}}</span>",
                },
                {
                    "field": "akomodasi",
                    "title": "Akomodasi",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: akomodasi #','')}}</span>",
                },
                {
                    "field": "volakomodasi",
                    "title": "Vol",
                    "width": "40px",

                },
                {
                    "field": "visit",
                    "title": "Visit",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: visit #','')}}</span>",
                },
                {
                    "field": "volvisit",
                    "title": "Vol",
                    "width": "40px",

                },
                {
                    "field": "sewaalat",
                    "title": "Sewa Alat",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: sewaalat #','')}}</span>",
                },
                {
                    "field": "volsewaalat",
                    "title": "Vol",
                    "width": "40px"
                },
                {
                    "field": "konsultasi",
                    "title": "Konsultasi",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: konsultasi #','')}}</span>",
                },
                {
                    "field": "volkonsultasi",
                    "title": "Vol",
                    "width": "100px"
                },
                {
                    "field": "tindakan",
                    "title": "Tindakan",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: tindakan #','')}}</span>",
                },
                {
                    "field": "voltindakan",
                    "title": "Vol",
                    "width": "100px"
                  
                },
                {
                    "field": "adm",
                    "title": "Admin",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: adm #','')}}</span>",
                },
                {
                    "field": "total",
                    "title": "Total",
                    "width": "100px",
                    "template": "<span class='style-right'>{{formatRupiah('#: total #','')}}</span>",
                },


            ];

            $scope.Perbaharui = function () {
                $scope.ClearSearch();
            }

            //fungsi clear kriteria search
            $scope.ClearSearch = function () {
                $scope.item = {};
                $scope.item.tglawal = $scope.now;
                $scope.item.tglakhir = $scope.now;
                $scope.CariLapPendapatanPoli();
            }


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
            manageTataRekening.getDataTableTransaksi("tatarekening/get-data-combo-daftarregpasien", false).then(function (data) {
                $scope.listDepartemen = data.data.departemen;
                $scope.listKelompokPasien = data.data.kelompokpasien;
                $scope.listKelas = data.data.kelas;

            })

            $scope.getIsiComboRuangan = function () {
                $scope.listRuangan = $scope.item.departement.ruangan
            }
            //sdm service hanya sementara, nanti harus diganti pake service kasir !!
            ManageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function (dat) {
                $scope.listPegawai = dat.data;
            });



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

            
            $scope.date = new Date();
            var tanggals = DateHelper.getDateTimeFormatted3($scope.date);

            //Tanggal Default
            $scope.item.tglawal = tanggals + " 00:00";
            $scope.item.tglakhir = tanggals + " 12:59";

            // Tanggal Inputan
            $scope.tglawal = $scope.item.tglawal;
            $scope.tglakhir = $scope.item.tglakhir;
            $scope.pegawai = modelItemAkuntansi.getPegawai();

            $scope.Cetak = function () {
                
                var daftarCetak = [];
                if($scope.selectedData.length > 0){
                    $scope.selectedData.forEach(function(items){
                        daftarCetak.push(items)
                    })
                    var resultCetak = daftarCetak.map(a => a.noregistrasi).join("|");
                }else{
                    var resultCetak = "";
                }
                $scope.dataLogin = JSON.parse(window.localStorage.getItem('pegawai'));
                if ($scope.item.tglawal == $scope.tglawal)
                    var tglawal = $scope.item.tglawal;
                else
                    var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
                if ($scope.item.tglakhir == $scope.tglakhir)
                    var tglakhir = $scope.item.tglakhir;
                else
                    var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

                // if ($scope.item.KelompokPasien == undefined)
                //     var kelompokPasien = "";
                // else
                //     var kelompokPasien = $scope.item.KelompokPasien.id;
                if ($scope.item.ruangan == undefined)
                    var ruangan = "";
                else
                    var ruangan = $scope.item.ruangan.id;
                if ($scope.item.departement == undefined)
                    var departement = "";
                else
                    var departement = $scope.item.departement.id;
                if ($scope.item.kelas == undefined)
                    var kelas = "";
                else
                   var kelas = $scope.item.kelas.id;
                // if ($scope.item.namaPegawai == undefined)
                //     var namaPegawai = "";
                // else
                //     var namaPegawai = $scope.item.namaPegawai.id;
                var stt = 'false'
                if (confirm('View Laporan Pendapatan Per Kelas? ')) {
                    // Save it!
                    stt = 'true';
                } else {
                    // Do nothing!
                    stt = 'false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-LaporanPendapatan-perkelas=1&tglAwal='
                    + tglawal + '&tglAkhir=' + tglakhir + '&strNoReg=' + resultCetak + '&strIdDepartemen=' + departement
                    + '&strIdRuangan=' + ruangan + '&strIdKelas=' + kelas + '&strIdPegawai=' + $scope.dataLogin.namaLengkap + '&view=' + stt, function (response) {
                    // do something with response
                });
            };
            $scope.CetakVolume = function() {
        // if($scope.item.format == undefined){
        //  alert('format file harus dipilih terlebih dahulu !!!')
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
            if ($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;
                var kelompokPasien = "";
            var stt = 'false'
            if (confirm('View Laporan Pendapatan Rawat Inap? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-LaporanPendapatanInap=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir
                +'&strIdDepartemen='+departement+ '&strIdRuangan=' + ruangan + '&strIdKelas=' + kelompokPasien 
                +'&strIdPegawai='+$scope.pegawai.namaLengkap+'&view='+ stt, function(response) {
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

        $scope.CetakRekap = function() {
        // if($scope.item.format == undefined){
        //  alert('format file harus dipilih terlebih dahulu !!!')
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
            if ($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;
            if ($scope.item.kelas == undefined)
                var kelas = "";
            else
               var kelas = $scope.item.kelas.id;
            var stt = 'false'
            if (confirm('View Laporan Rekap Pendapatan Rawat Inap? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-LaporanRekapPendapataninap=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir
                +'&strIdDepartemen='+departement+'&strIdRuangan=' + ruangan + '&strIdPegawai='+$scope.pegawai.namaLengkap+'&view='+ stt, function(response) {
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
        $scope.CetakVolumePerKelas = function() {
        // if($scope.item.format == undefined){
        //  alert('format file harus dipilih terlebih dahulu !!!')
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
            if ($scope.item.ruangan == undefined)
                var ruangan = "";
            else
                var ruangan = $scope.item.ruangan.id;
                var kelompokPasien = "";
            var kelasfk="";
            if ($scope.item.kelas != undefined) {
                kelasfk=$scope.item.kelas.id
            }
            var stt = 'false'
            if (confirm('View Laporan Pendapatan Rawat Inap? ')){
                // Save it!
                stt='true';
            }else {
                // Do nothing!
                stt='false'
            }
            var client = new HttpClient();        
            client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-LaporanPendapatanInapPerKelas=1&tglAwal='+tglawal+'&tglAkhir='+tglakhir
                +'&strIdDepartemen='+departement+ '&strIdRuangan=' + ruangan + '&idKelompok=' + kelompokPasien + '&kelasfk=' +  kelasfk
                +'&strIdPegawai='+$scope.pegawai.namaLengkap+'&view='+ stt, function(response) {
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


            // $scope.CetakDetail = function () {

            //     
            //     if ($scope.item.tglawal == $scope.tglawal)
            //         var tglawal = $scope.item.tglawal;
            //     else
            //         var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
            //     if ($scope.item.tglakhir == $scope.tglakhir)
            //         var tglakhir = $scope.item.tglakhir;
            //     else
            //         var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");

            //     if ($scope.item.KelompokPasien == undefined)
            //         var kelompokPasien = "";
            //     else
            //         var kelompokPasien = $scope.item.KelompokPasien.id;
            //     if ($scope.item.ruangan == undefined)
            //         var ruangan = "";
            //     else
            //         var ruangan = $scope.item.ruangan.id;
            //     if ($scope.item.departement == undefined)
            //         var departement = "";
            //     else
            //         var departement = $scope.item.departement.id;
            //     if ($scope.item.namaPegawai == undefined)
            //         var namaPegawai = "";
            //     else
            //         var namaPegawai = $scope.item.namaPegawai.id;
            //     var stt = 'false'
            //     if (confirm('View Laporan Pendapatan Poli? ')) {
            //         // Save it!
            //         stt = 'true';
            //     } else {
            //         // Do nothing!
            //         stt = 'false'
            //     }
            //     var client = new HttpClient();
            //     client.get('http://127.0.0.1:1237/printvb/laporanPelayanan?cetak-LaporanPendapatanPoli=1&tglAwal=' + tglawal + '&tglAkhir=' + tglakhir + '&strIdDepartemen=' + departement + '&strIdRuangan=' + ruangan + '&strIdKelompokPasien=' + kelompokPasien + '&strIdDokter=' + namaPegawai + '&strIdPegawai=' + $scope.pegawai.id + '&view=' + stt, function (response) {
            //         // do something with response
            //     });
            //     // if(client.status==0){
            //     //     if($scope.item.format == undefined){
            //     //         alert('format file harus dipilih terlebih dahulu !!!');
            //     //     }else{
            //     //         var urlLaporan = ReportPelayanan.open('preporting/lapPelayananPasien?startDate=''+tglawal+'+tglawal+'&tglAkhir='+tglakhir+'&strIdRuangan='+ruangan+'&strIdDepartement='+departement+'&strIdKelompokPasien='+kelompokPasien+'&strIdDokter='+namaPegawai+'&format='+$scope.item.format.format);
            //     //         window.open(urlLaporan, '_blank');
            //     //     }
            //     // }   
            // };

        }
    ]);
});