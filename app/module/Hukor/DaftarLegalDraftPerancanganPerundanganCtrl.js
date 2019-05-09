define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('DaftarLegalDraftPerancanganPerundanganCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
        function ($rootScope, $scope, ModelItem, $state) {

            ModelItem.get("Hukor/DaftarLegalDraftPerancanganPerundangan").then(function (data) {
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
                        "draftPeraturan": "test",
                        "tanggalBerlaku": "30 Oktober 2016",
                        "penanggungJawab": "Adi",
                        "tujuanKirim": "Pengadministrasi Umum",
                        "koreksiDraft": "test test",
                        "keterangan" : "verifikasi"
                    }
                ]
            });

            $scope.show = function () {
                if ($state.current.name == "DaftarLegalDraftPerancanganPerundanganTujuan")
                    return false;
                else
                    return true;
            }

            $scope.navToKoreksiDraft = function () {
                console.log("Asdsd")
                $state.go('KoreksiDraft', {
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
                    "field": "noPeraturan",
                    "title": "No. Peraturan",
                    "width": "100px"
                },
                {
                    "field": "userId",
                    "title": "User ID",
                    "width": "100px"
                },
                {
                    "field": "tanggal",
                    "title": "Tanggal",
                    "width": "100px"
                },
                {
                    "field": "draftPeraturan",
                    "title": "Draft Peraturan",
                    "width": "100px"
                },
                {
                    "field": "tanggalBerlaku",
                    "title": "Tanggal Berlaku / Disahkan",
                    "width": "150px"
                },
                {
                    "field": "penanggungJawab",
                    "title": "Penanggung Jawab",
                    "width": "100px"
                },
                {
                    "field": "tujuanKirim",
                    "title": "Tujuan Kirim",
                    "width": "100px"
                },
                {
                    "field": "koreksiDraft",
                    "title": "Koreksi Draft",
                    "width": "100px"
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