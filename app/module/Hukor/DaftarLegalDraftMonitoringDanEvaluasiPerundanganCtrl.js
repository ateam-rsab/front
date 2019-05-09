define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarLegalDraftMonitoringDanEvaluasiPerundanganCtrl', ['$rootScope', '$scope', 'ModelItem','$state',
        function ($rootScope, $scope, ModelItem, $state) {

            ModelItem.get("Hukor/DaftarLegalDraftMonitoringDanEvaluasiPerundangan").then(function (data) {
                $scope.item = data;
                $scope.now = new Date();
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) { });

            $scope.daftarLegalDraft = new kendo.data.DataSource({
                data: [
                    {
                        "noPeraturan": "1",
                        "userId": "Budi",
                        "tanggal": "1 Oktober 2016",
                        "namaPeraturan" : "Peraturan Kehadiran",
                        "evaluasiPeraturan": "peraturan belum berjalan semestinya",
                        "draftPeraturan": "test",
                        "tanggalBerlaku": "30 Oktober 2016",
                        "penanggungJawab": "Adi",
                        "tujuanKirim": "Pengadministrasi Umum",
                        "koreksi": "test test",
                        "keterangan" : "verifikasi"
                    }
                ]
            });

             $scope.show = function(){
                if($state.current.name == "DaftarLegalDraftMonitoringDanEvaluasiPerundanganTujuan")
                    return false;
                else 
                    return true;
            }

             $scope.navToKoreksiLegalDraft = function () {	
                console.log("Asdsd")			
                $state.go('KoreksiLegalDraftMonitoring', {
                    // id: selectedData.id

                });
				// console.log(selectedData.id)
            };

            $scope.columnLegalDraft = [
                {
                    "template": "<input type=\"checkbox\" ng-click=\"klik()\">",
                    "width": 30
                },
                {
                    "field": "userId",
                    "title": "User ID",
                    "width": "100px"
                },
                {
                    "field": "noPeraturan",
                    "title": "No. Peraturan",
                    "width": "100px"
                },            
                {
                    "field": "namaPeraturan",
                    "title": "Nama Peraturan",
                    "width": "150px"
                },
                {
                    "field": "evaluasiPeraturan",
                    "title": "Evaluasi Peraturan",
                    "width": "200px"
                },
                {
                    "field": "tujuanKirim",
                    "title": "Tujuan Kirim",
                    "width": "150px"
                },
                {
                    "field": "tanggalBerlaku",
                    "title": "Tanggal Berlaku / Disahkan",
                    "width": "150px"
                },                           
                {
                    "field": "koreksi",
                    "title": "Koreksi",
                    "width": "150px"
                },
                {
                    "field": "keterangan",
                    "title": "Keterangan",
                    "width": "100px"
                }
            ];                       
        }
    ]);
});