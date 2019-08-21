define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('NotaDanDisposisiCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras', 'DateHelper', '$state', '$window',
        function ($rootScope, $scope, ModelItem, ManageSarpras, DateHelper, $state, $window) {
            $scope.item = {};
            let dataUser = JSON.parse(localStorage.getItem('pegawai'));
            $scope.item.tanggal = new Date();
            $scope.listKategori = [
                { name: 'Nota Dinas', id: 1 },
                { name: 'Undangan', id: 2 }
            ];

            $scope.listJenisSurat = [
                { name: 'Biasa', id: 1 },
                { name: 'Penting', id: 2 }
            ];

            // $scope.item.formatSurat = ""
            $scope.simpan = function () {
                console.log($scope.item.formatSurat);
            }
            $scope.back = function () {
                window.history.back();
            }

            var init = function () {
                $scope.item.dari = dataUser.ruangan.lokasiruangan;
                ManageSarpras.getMaster('pegawai/get-form-pegawai-combo').then(res => {
                    $scope.listPegawai = res.data.data
                });

            }
            init();

            $scope.simpan = function () {
                let dataSave = {
                    "noSurat": $scope.item.noSurat.toString(),
                    "pegawaifk": dataUser.id.toString(),
                    "atasanfk": $scope.item.atasanPegawai.id.toString(),
                    "statusSurat": false.toString(),
                    "tglSurat": DateHelper.formatDate($scope.item.tanggal, 'YYYY-MM-DD'),
                    "ruanganfk": dataUser.ruangan.id.toString(),
                    "jenis": $scope.item.jenisSurat.id.toString(),
                    "kategori": $scope.item.kategoriSurat.id.toString(),
                    "keterangan": "-",
                    "hal": $scope.item.perihal,
                    "isi": $scope.item.formatSurat,
                    "tembusan1": $scope.item.tembusan1,
                    "tembusan2": $scope.item.tembusan2,
                    "tembusan3": $scope.item.tembusan3,

                    // "noSurat": "1234567890",
                    // "pegawaifk": "88",
                    // "atasanfk": "3",
                    // "statusSurat": "false",
                    // "tglSurat": "2019-08-20",
                    // "ruanganfk": "1",
                    // "kategori": "1",
                    // "jenis": "1",
                    // "hal": "Konfirmasi",
                    // "isi": "<p style=\"margin-bottom:15px;padding:0px;text-align:justify;font-family:'Open Sans', Arial, sans-serif;font-size:14px;background-color:#ffffff;\">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam efficitur diam a ipsum ultrices, vitae dignissim arcu semper. Nullam vel sollicitudin enim, sit amet vehicula tortor. Aliquam pulvinar, est eu vestibulum efficitur, eros dolor finibus orci, ac pellentesque ipsum orci id lorem. Cras et quam nec arcu dignissim aliquam sed sed nisi. Integer eget velit eu sem ultrices fringilla. Morbi semper, sem ac eleifend vulputate, leo ex tempus magna, vel tempor augue nisi at leo. Etiam quam elit, tristique at euismod eu, posuere et risus. Donec sodales nulla augue, non vulputate sem dignissim sit amet. Donec neque dui, facilisis in purus sed, sagittis feugiat turpis. Curabitur quis nunc ac tortor commodo eleifend at a turpis. Integer semper, orci sit amet interdum maximus, orci urna blandit sem, in porta velit risus rutrum tellus. In ornare justo at nunc finibus vestibulum.</p>",
                    // "keterangan": "tlng diperbaik untuk bagian ini",
                    // "tembusan1": "Arsip1",
                    // "tembusan2": "Arsip2",
                    // "tembusan3": "Arsip3"
                }
                console.log(dataSave);
                ManageSarpras.saveTransaksi('humas/save-pembuatan-surat/save', dataSave).then(res => {
                    console.log(res);
                })
            }

            $scope.preview = function () {
                $scope.item.showFormat = $scope.item.formatSurat;
                // let data = innerHtml($scope.item.showFormat)
                // console.log($scope.item.showFormat)
                $scope.popupPreview.center().open();
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