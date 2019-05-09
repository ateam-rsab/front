define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarSuratMasukDariInternaldanEksternalCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
            $scope.item = {};
            $scope.now = new Date();
            $scope.item.tanggalAwal = $scope.now;
            $scope.item.tanggalAkhir = $scope.now;
            $scope.idDocument = "";

            $scope.item.Ruangan = "Sub Bagian Tata Usaha";
            $scope.klik = function(current) {
                $scope.Document = current;
            };
            $scope.redirect = function() {
                if ($scope.Document === undefined) {
                    toastr.warning("Silahkan Pilih Dokumen Terlebih Dahulu !");
                    return;
                }
                if ($scope.Document.tipePengirimSuratId === 1) {
                    debugger
                    $state.go("SuratMasukInternal", { idDocument: $scope.Document.noRec });
                }
                if ($scope.Document.tipePengirimSuratId === 2) {
                    debugger
                    $state.go("SuratDariInternalKeEksternal", { idDocument: $scope.Document.noRec });
                }

            }

            pencarianData();
            $scope.cari = function() {
                pencarianData();
            }

            function pencarianData() {
                var ruangan = ModelItem.getPegawai().ruangan;
                var idRuangan = "";
                if (!_.isUndefined(ruangan.id)) {
                    idRuangan = ruangan.id;
                }
                var tglAwal = moment($scope.item.tanggalAwal).format('DD-MM-YYYY');
                var tglAkhir = moment($scope.item.tanggalAkhir).add(1, 'day').format('DD-MM-YYYY');
                var nomor = 1;
                //ManageSarpras.getOrderList("surat-masuk/get-surat-masuk-by-ruangan-periode-penomoran/?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idRuangan=" + idRuangan, true).then(function(dat) { 
                ManageSarpras.getOrderList("surat-masuk/get-surat-masuk-by-ruangan-periode-penomoran/?dateStart=" + tglAwal + "&dateEnd=" + tglAkhir + "&idRuangan="+304, true).then(function(dat) {
                    for (var i = 0; i < dat.data.data.length; i++) {
                        var element = dat.data.data[i];
                        element.noDokumen = formatNumber(dat.data.data[i].noDokumen, 10);
                        element.tglDokumen = moment(dat.data.data[i].tglDokumen).format('DD-MM-YYYY');
                        element.no = nomor+++"."


                    }
                    $scope.gridDaftarSuratMasuk = new kendo.data.DataSource({
                        data: dat.data.data,
                        pageSize: 10,
                        total: dat.data.length,
                        serverPaging: false
                    });

                });
            }

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
            $scope.colGridDaftarSuratMasuk = {
                pageable: true,
                toolbar : ['excel', 'pdf'],
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
                columns: [
                {
                    field: "no",
                    title: "<h3 align=center>No.<h3>",
                    width: "3%"
                },{
                    field: "noDokumen",
                    title: "<h3 align=center>Nomor Draft<h3>",
                    width: "10%"
                }, {
                    field: "judulDokumen",
                    title: "<h3 align=center>Nama Surat<h3>",
                    width: "15%"
                }, {
                    field: "status",
                    title: "<h3 align=center>Status<h3>",
                    width: "10%"
                }, {
                    field: "pembuatSurat",
                    title: "<h3 align=center>Nama Pengirim<h3>",
                    width: "15%"
                }, {
                    field: "ruanganAsal",
                    title: "<h3 align=center>Ruangan Asal<h3>",
                    width: "10%"
                }, {
                    field: "ruanganTujuan",
                    title: "<h3 align=center>Ruangan Tujuan<h3>",
                    width: "10%"
                }, {
                    field: "pegawaiPenerimaSurat",
                    title: "<h3 align=center>Penerima<h3>",
                    width: "10%"
                }, {
                    field: "tipePengirimSuratName",
                    title: "<h3 align=center>Tipe Pengiriman<h3>",
                    width: "10%"
                }]
            }

        }
    ])
})