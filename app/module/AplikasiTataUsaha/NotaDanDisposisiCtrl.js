define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('NotaDanDisposisiCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function ($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) { 
            $scope.item = {};
            // $('#idTextEditor').kendoEditor({ resizeble: {
            //     content:true,
            //     toolbar: true
            // }})
            $scope.item.formatSurat = ""
            $scope.simpan = function () {
                console.log($scope.item.formatSurat);
            }
        }
    ])
})

// function($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
//     //kondisi jabatan
//     $scope.item = {};
//     $scope.notaHeader = "NOTA DISPOSISI";
//     /* $scope.notaHeader ="NOTA DINAS";*/
//     $scope.item.asalNote = ModelItem.getPegawai().namaLengkap;
//     $scope.now = new Date();
//     $scope.item.tanggal = $scope.now;
//     $scope.item.tujuan = [];
//     $scope.listjenisSurat = [{
//         'name': 'Segera'
//     }, {
//         'name': 'Penting'
//     }, {
//         'name': 'Rahasia'
//     }]
//     ManageSarpras.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan", true).then(function(dat) {
//         $scope.ListRuangan = dat.data;
//     });

//     $scope.dataPenerima = new kendo.data.DataSource({
//         data: []
//     });

//     $scope.$watch('item.ruangan', function(e) {
//         $scope.listPegawai = [];
//         $scope.item.pegawai = '';
//         if (e === undefined) return;
//         if (e.id === undefined) return;
//         ManageSarpras.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap,jabatanInternal.id,jabatanInternal.namaJabatan,ruangan.id,ruangan.namaRuangan&criteria=ruangan.id&values=" + e.id, true).then(function(dat) {
//             $scope.listPegawai = dat.data;
//         });
//     });

//     $scope.$watch('item.pegawai', function(e) {
//         if (e === undefined) return;
//         if (e.id === undefined) return;
//         var stat = true;
//         if ($scope.dataPenerima !== undefined) {
//             angular.forEach($scope.dataPenerima._data, function(item) {
//                 if (e.id === item.id) {
//                     stat = false;
//                 }
//             });
//         }
//         if (stat === true) {
//             $scope.dataPenerima.add(e);
//             // toastr.info(e.jabatanInternal_namaJabatan + " telah di tambahkan"); 
//         } else {
//             toastr.warning(e.jabatanInternal_namaJabatan + " Sudah ada");
//         }
//         e = '';
//         $scope.item.pegawai = '';
//     });

//     $scope.removeRiwayat = function(e) {
//         e.preventDefault();
//         var grid = this;
//         var row = $(e.currentTarget).closest("tr");

//         var selectedItem = grid.dataItem(row);
//         $scope.dataPenerima.remove(selectedItem);
//     };

//     $scope.colDaftarPenerima = [{
//         "field": "ruangan_namaRuangan",
//         "title": "<h3 align=center>Ruangan<h3>"
//     }, {

//         "field": "jabatanInternal_namaJabatan",
//         "title": "<h3 align=center>Nama Jabatan<h3>"
//     }, {

//         "field": "namaLengkap",
//         "title": "<h3 align=center>Pegawai<h3>"
//     }, {
//         command: {
//             text: "Hapus",
//             click: $scope.removeRiwayat
//         },
//         title: "&nbsp;",
//         width: "110px"
//     }];


//     $scope.redirect = function() {
//         window.location = "#/ListNotaDinas";
//     }
//     getNoSurat();

//     function getNoSurat() {
//         ManageSarpras.getOrderList("nota-dinas/get-no-surat/", true).then(function(dat) {
//             $scope.item.noNote = dat.data.data.noSurat;
//         });
//     }
//     $scope.save = function() {
//         var notaDinasJabatan = [];
//         angular.forEach($scope.dataPenerima._data, function(item) {
//             var paramPenerima = {
//                 jabatan: {
//                     id: item.jabatanInternal_id
//                 },
//                 pegawai: {
//                     id: item.id
//                 },
//                 ruangan: {
//                     id: item.ruangan_id
//                 }

//             }
//             notaDinasJabatan.push(paramPenerima);
//         });

//         var param = {
//             "noSurat": $scope.item.noNote,
//             "hal": $scope.item.Perihal,
//             "isiSurat": $scope.item.lampiran,
//             "notaDinasJabatan": notaDinasJabatan,
//             "tanggal": $scope.item.tanggal,
//             "pegawaiPembuat": {
//                 id: ModelItem.getPegawai().id
//             },

//             "jenisSuratString": $scope.item.jenisSurat.name
//         };
//         //Save
//         ManageSarpras.saveSarpras(param, "nota-dinas/save-nota-dinas/").then(function(dat) {
//             // initializeData();
//         });
//     }
// }