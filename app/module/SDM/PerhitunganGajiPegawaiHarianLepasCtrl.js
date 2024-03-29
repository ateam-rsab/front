define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PerhitunganGajiPegawaiHarianLepasCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'NamaAsuransi', 'ManageSdm', 'ManageSdmNew', 'DateHelper',
        function ($rootScope, $scope, ModelItem, $state, NamaAsuransi, ManageSdm, ManageSdmNew, dateHelper) {
            $scope.now = new Date();
            $scope.dataVOloaded = true;
            $scope.item = {};


            $scope.pindah = function () {

                $state.go("RekamDataPegawai");

            }

            ManageSdmNew.getOrderList("pay-roll/find-status-pegawai-harianLepas", true).then(function (dat) {

                $scope.listpegawai = dat.data.data;
                $scope.item.testStatusPegawai = dat.data.data[0].detailKategoryPegawai;
                $scope.item.testStatusPegawai1 = dat.data.data[0].id;
                //debugger;
            });




            ManageSdmNew.getOrderList("pay-roll/find-jenis-gaji", true).then(function (dat) {

                $scope.listgaji = dat.data.data;





            });








            $scope.Proses = function () {


                var gaji = $scope.item.jenisPembayaran.id;
                var kerja = $scope.item.testStatusPegawai1;
                var period = moment($scope.item.periode).format("MM-YYYY");


                //debugger;	
                ManageSdmNew.getOrderList("pay-roll/get-harian-lepas-pegawai?idKategoryPegawai=" + kerja + "&idJenisGaji=" + gaji + "&periode=" + period).then(function (dat) {
                    $scope.sourceOrder = new kendo.data.DataSource({
                        data: dat.data.data
                    });

                    $scope.item.nomorGaji = dat.data.data[0].noGaji;




                });
            }





            $scope.pindah1 = function () {

                $state.go("DataKeluarga");

            }



            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };

            $scope.formatRupiah = function (value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }


            $scope.mainGridOptions = {
                columns: [{
                    "field": "namaLengkap",
                    "title": "Nama Pegawai",
                    "width": "200px"

                }, {
                    "field": "namaRuangan",
                    "title": "Unit Kerja"
                }, {
                    "field": "golonganPegawai",
                    "title": "Golongan"
                }, {
                    "field": "jumlahHadir",
                    "title": "Jumlah Kehadiran",
                    "width": "160px"
                }, {
                    "field": "tarif",
                    "title": "Tarif Per Hari",
                    "width": "160px",
                    "template": "{{formatRupiah('#: tarif #', 'Rp.')}}"
                }, {
                    "field": "jumlahUang",
                    "title": "Jumlah Uang",
                    "width": "160px",
                    "template": "{{formatRupiah('#:jumlahUang #', 'Rp.')}}"
                }, {
                    "field": "tarifUangMakanPerHari",
                    "title": "Tarif Uang Makan Per Hari",
                    "width": "180px",
                    "template": "{{formatRupiah('#: tarifUangMakanPerHari #', 'Rp.')}}"
                }, {
                    "field": "uangMakan",
                    "title": "Uang Makan",
                    "width": "160px",
                    "template": "{{formatRupiah('#:uangMakan#', 'Rp.')}}"
                }, {
                    "field": "jumlahKotor",
                    "title": "Jumlah Kotor",
                    "width": "140px",
                    "template": "{{formatRupiah('#:jumlahKotor#', 'Rp.')}}"
                }, {
                    "field": "pph",
                    "title": "Pph",
                    "width": "140px",
                    "template": "{{formatRupiah('#:pph#', 'Rp.')}}"
                }, {
                    "field": "jumlahBersih",
                    "title": "Jumlah Bersih",
                    "width": "140px",
                    "template": "{{formatRupiah('#:jumlahBersih#', 'Rp.')}}"

                }],
                pageable: true,
                sortable: false,
                selectable: "row",
                editable: "popup"
            };


            $scope.Save = function () {


                var detail = $scope.sourceOrder._data;
                var i = 0;
                var detailHVA = [];
                detail.forEach(function (data) {
                    var data = {


                        "namaLengkap": data.namaLengkap




                    }
                    detailHVA[i] = data;
                    i++;
                })



                ManageSdmNew.saveGajiPegawaiHarianLepas(detail, "pay-roll/save-pegawai-harian-lepas").then(function (e) {
                    //debugger;
                    //  $scope.item= {};
                    // init();  
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*/
                });


            }
































        }
    ]);
});
