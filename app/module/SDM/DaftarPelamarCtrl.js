define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPelamarCtrl', ['FindSdm', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm',
        function(findSdm, $rootScope, $scope, ModelItem, $state, ManageSdm) {
            ModelItem.get("Humas/MonitoringStatusPks").then(function(data) {
                $scope.item = data;
                $scope.now = new Date();
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});


            // $scope.dataMonitoringStatusPKSdummy = new kendo.data.DataSource({
            //     data: [
            //         // {
            //         //     "noPendaftaran":"P001",
            //         //     "namaLengkap":"saya siapa yah",
            //         //     "sekolah":"Poltek Bandung Asik",
            //         //     "degree":"S1",
            //         //     "jurusan":"MIF",
            //         //     "nilai":70,
            //         //     "posisiLamar":"Tes",
            //         //     "lolos":true
            //         // }
            //     ]
            // });

            // findSdm.getDataPelamar().then(function(e) {
            //     $scope.dataMonitoringStatusPKS = new kendo.data.DataSource({
            //         data: e.data.data.items
            //     });
            // });
            // $scope.pindah = function() {
            //     if ($scope.item === undefined) {
            //         window.messageContainer.log('Pelamar belum di pilih');
            //         return;
            //     }

            //     $state.go("IsianPelamar", { noRec: JSON.stringify($scope.item) });

            // }
            $scope.InputNilai = function() {
                if ($scope.item === undefined) {
                    window.messageContainer.log('Pelamar belum di pilih');
                    return;
                }
                $state.go("NilaiTesPelamar", { noRec: JSON.stringify($scope.item) });

            }

            $scope.pindah1 = function() {
                //$scope.item yang berupa object rubah ke sebuath string, intinya JSON.stringify untuk menconversi object jadi sebuah string
                $state.go("BerkasLamaran", { noRec: JSON.stringify($scope.item) });
                //debugger;

            }

            // $scope.kl = function(current) {
            //     $scope.current = current;
            //     $scope.item = current;
            //     //debugger;

            // }

            $scope.columnMonitoringStatusPKS = [{
                    field: "pelamarId",
                    title: "No Peserta",
                    width: "15%",
                    headerAttributes: { style: "text-align : center" }
                },
                {
                    field: "namaPelamar",
                    title: "Nama Lengkap",
                    width: "20%",
                    headerAttributes: { style: "text-align : center" }
                },
                {
                    field: "universitas",
                    title: "Universitas",
                    width: "15%",
                    headerAttributes: { style: "text-align : center" }
                },
                {
                    field: "degree",
                    title: "Degree",
                    width: "15%",
                    headerAttributes: { style: "text-align : center" }
                },
                {
                    field: "jurusan",
                    title: "Jurusan",
                    width: "15%",
                    headerAttributes: { style: "text-align : center" }
                },
                {
                    field: "nilai",
                    title: "Nilai",
                    width: "15%",
                    headerAttributes: { style: "text-align : center" }
                },
                {
                    field: "posisiLamar",
                    title: "Posisi Lamar",
                    width: "15%",
                    headerAttributes: {style: "text-align: center" }
                    // "template": "  <md-checkbox ng-disabled='false' ng-model='dataItem.hasil' aria-label='Checkbox 1'></md-checkbox>",
                    // "width": "150px"

                },
                // {
                //     field:"lihat",
                //     title: "Lihat Dokumen",
                //     width: "15%",
                //     filterable: false,
                //     headerAttributes: { style: "text-align : center" }
                // },
                {
                // command: { 
                //     text: "Download",
                //     width:"50px", 
                //     align:"center",
                //     attributes: {align:"center"},
                //     click: $scope.download 
                // },
                // title: "Lihat Dokumen",
                // width: "15%"

                    field: "dokumens",
                    title: "Lihat Dokumen",
                    template: "<button class='c-button' ng-click='download()' style='width:100px'>Download</button>",
                    width:"15%"
                    // template: "<md-button class='md-fab md-mini md-warn md-ink-ripple' ng-click="export()">Download</md-button>",
                    // template: "<a href='' class='btn btn-primary' ng-click='downloadPdf()'>Download</a>",
                    // template: "<a class='k-button' href='" + Url.Action("Download","Document") + "/\\#='",
                },
                {
                    field: "isLulus",
                    title: "Lolos Administrasi",
                    width: "15%",
                    filterable: false,
                    headerAttributes: {style: "text-align: center" },
                    "template": "<md-checkbox ng-disabled='true' ng-model='item.isLulus' ng-checked='item.isLulus' aria-label='Checkbox 1'></md-checkbox>",
                    "width": "15%"

                },
                {
                    //tgl 05-jun-17 menambahkan field untuk id nya tapi di hidden
                    field: "posisiLamarId",
                    title: "Posisi Lamaran Id",
                    width: "5%",
                    hidden:true
                },
                {
                    field: "jenisPegawaiId",
                    title: "Jenis Pegawai Id",
                    width: "5%",
                    hidden: true
                },
                {
                    field: "jenisPegawai",
                    title: "Jenis Pegawai",
                    width: "5%",
                    hidden: true
                },
                {
                    field: "periode",
                    title: "Periode",
                    width: "5%",
                    hidden: true
                },
                {
                    field: "qtyPeserta",
                    title: "Jumlah Peserta",
                    width: "5%",
                    hidden: true
                }
            ];
            //adi penambahan option untuk digridnya
              $scope.optDataMonitoring = {
                scrollable:true,
                 filterable: {
                            extra: false,
                            operators: {
                                string: {
                                    startswith: "Dimulai dengan",
                                    eq: "mengandung kata",
                                    neq: "Tidak mengandung kata"
                                }
                            }
                 }
            };

            //adi detail grid / grid kebawah / grid hierarcy kayanya tgl 02-jun-17
            $scope.mainGridOptionsDetail = function(){
                return{
                      columns: [
                        {
                            field:"jenisTest",
                            title:"Jenis Test"
                        },
                        {
                            field:"nilai",
                            title:"Nilai"
                        }
                      ]
                }
            }

            //adi tgl-05-jun-17 coba nambahin data
             var init = function(){
             ManageSdm.getOrderList("rekrutmen/get-all-daftar-pelamar", true).then(function (dat) {
                 $scope.dataMonitoringStatusPKS = dat.data.data;
                 $scope.dwnDokumens = dat.data.data[0].dokumens;
                 //debugger;
            });
            }

            init();

            //ini saat diklik dulu ambil datanya dari row grid nya
                
                $scope.klik = function(current) {

                    $scope.current = current;
                    $scope.item = current;
                    
                    var id = $scope.dwnDokumens[0].dokumenId;
                    var selectedItem = current.dokumens;
                    $scope.idDocument = selectedItem[0].dokumenId;
                    // $scope.filePath = selectedItem[0].pathFile;
                    //debugger;

                    //ini function yang dipanggil button download yang ada di grid nya
                $scope.download = function() {
                    // e.preventDefault();
                    
                    if ($scope.idDocument === undefined) {
                        toastr.warning("Pilih data terlebih dahulu..!!");
                        return;
                    }
                    ManageSdm.downloadFile("rekrutmen/get-download-dokumen?dokumenId=" + $scope.idDocument, true); 
                    };

 
                };

                //adi tgl 20-jun-17 nambahin link biar ke

             $scope.pindahKe = function() {
                //$scope.item yang berupa object rubah ke sebuath string, intinya JSON.stringify untuk menconversi object jadi sebuah string
                $state.go("InputJadwalSeleksi");
                //debugger;

            }

                //debugger;

            //coba dummy path file
            // $scope.dokumenPathDownload = [
            //     {
            //         "filepath":"D:/download/tes.txt"
            //     }
            // ];



            //debugger;

            //adi tgl 19-jun-17 membuat function downloadnya

            



            // $scope.downloadPdf = function(){
            //     $scope.$emit('download-start');
            //     $http.get($attrs.url).then(function(response){
            //         $scope.$emit('downloaded', response.data);
            //     });
            // };


              //coba bikin template dulu
//         app.directive('pdfDownload', function() {
//         return {
//                 restrict: 'E',
//                 // templateUrl: '/path/to/pdfDownload.tpl.html',
//                 templateUrl: 'D:/download/tesPdf.pdf',
//                 scope: true,
//                 link: function(scope, element, attr) {
//                     var anchor = element.children()[0];

//         // When the download starts, disable the link
//         scope.$on('download-start', function() {
//             $(anchor).attr('disabled', 'disabled');
//         });

//         // When the download finishes, attach the data to the link. Enable the link and change its appearance.
//         scope.$on('downloaded', function(event, data) {
//             $(anchor).attr({
//                 href: 'data:application/pdf;base64,' + data,
//                 download: attr.filename
//             })
//                 .removeAttr('disabled')
//                 .text('Save')
//                 .removeClass('btn-primary')
//                 .addClass('btn-success');

//             // Also overwrite the download pdf function to do nothing.
//             scope.downloadPdf = function() {
//             };
//         });
//     }
// }
// });


        }






    ]);

  

    

});


