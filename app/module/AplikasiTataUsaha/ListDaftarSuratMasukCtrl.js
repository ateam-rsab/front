define(['initialize'], function(initialize){
    'use strict';
    initialize.controller('ListDaftarSuratMasukCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.tanggalAwal = $scope.now;
            $scope.item.tanggalAkhir = $scope.now;
            $scope.idDocument;
            $scope.statTooltip = true;
            
            $scope.AmbilDataRuangan = function(){
              var ruangan = ModelItem.getPegawai().ruangan;
              $scope.item.ruangan = ruangan.namaRuangan;       
            }
            $scope.AmbilDataRuangan();
            


            $scope.redirect = function() {
                if ($scope.idDocument === undefined) {
                    toastr.warning("Pilih data terlebih dahulu..!!");
                    return;
                }
                $state.go("DistribusiSurat", { idDokumen: $scope.idDocument });
            }
            pencarianData();

            function pencarianData() {
                var ruangan = ModelItem.getPegawai().ruangan;
                var idRuangan = "";
                if (!_.isUndefined(ruangan.id)) {
                    idRuangan = ruangan.id;
                }
                var tglAwal = moment($scope.item.tanggalAwal).format('DD-MM-YYYY');
                /*var tglAkhir = moment($scope.item.tanggalAkhir).format('DD-MM-YYYY');*/
                 var tglAkhir = moment($scope.item.tanggalAkhir).add(1, 'day').format('DD-MM-YYYY');
                ManageSarpras.getOrderList("surat-masuk/get-surat-masuk-internal-eksternal-by-ruangan-periode/?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idRuangan=" + idRuangan, true).then(function(dat) {
                    debugger;
                    for (var i = 0; i < dat.data.data.length; i++) {
                        var element = dat.data.data[i];
                        element.tglDokumen = moment(dat.data.data[i].tglDokumen).format('DD-MM-YYYY'); // formatNumber(dat.data.data[i].noDokumen, 10);
                    }
                    $scope.gridDaftarSurat = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 10,
                        total: dat.data.length,
                        serverPaging: false
                    });
                });
            }


                $scope.detailGridOptions = function(dataItem) {

                    return {
                        dataSource: new kendo.data.DataSource({
                            data: dataItem.ruangans
                        }),
                        columns: [{
                            field: "namaRuangan",
                            title: "<h3 align=center>Nama Ruangan<h3>",
                            width: "40%"
                        }, {
                            field: "pegawaiPenerimaSuratNamaLengkap",
                            title: "<h3 align=center>Penerima Surat<h3>",
                            width: "40%"
                        }, {
                            field: "status",
                            title: "<h3 align=center>Status<h3>",
                            width: "20%"
                        }]
                    };

                };
       
            $scope.klik = function(current) {
                $scope.statTooltip = false;
                var selectedItem = current;
                $scope.idDocument = selectedItem.id;
            };

            function formatNumber(angka, panjang) {
                if (angka == null) {
                    return "";
                }
                if (panjang < 1) {
                    return angka;
                }
                var nol = "";
                var finalLength = panjang - angka.length;
                for (var i = 0; i < finalLength; i++) {
                    nol += "0";
                }
                return nol + angka;
            }
            $scope.cari = function() {
                pencarianData();
            }
            $scope.colGridDaftarSurat = {
                pageable: true,
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            startswith: "Dimulai dengan",
                            eq: "mengandung kata",
                            neq: "Tidak mengandung kata"
                        }
                    }
                },
                columns: [{
                    field: "tglDokumen",
                    title: "<h3 align=center>Tanggal<h3>",
                    width: "10%"
                }, {
                    field: "statusBerkas",
                    title: "<h3 align=center>Tipe Surat<h3>",
                    width: "10%"
                }, {
                    field: "judulDokumen",
                    title: "<h3 align=center>Nama Surat<h3>",
                    width: "20%"
                }, {
                    field: "noDokumen",
                    title: "<h3 align=center>Nomor Surat<h3>",
                    width: "10%"
                }, {
                    field: "ruanganPengirim",
                    title: "<h3 align=center>Ruangan Pengirim<h3>",
                    width: "10%"
                }, {
                    field: "sifatSurat",
                    title: "<h3 align=center>Sifat Surat<h3>",
                    width: "10%"
                }, {
                    field: "statusBerkas",
                    title: "<h3 align=center>Status Berkas<h3>",
                    width: "10%"
                }, {
                    field: "jenisSurat",
                    title: "<h3 align=center>Jenis Surat<h3>",
                    width: "10%"
                }]
            }

        }
    ])
})