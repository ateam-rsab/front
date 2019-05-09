define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('AdvokasiHukumCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', '$state', 'ManageSarpras',
        function ($q, $rootScope, $scope, ModelItem, DateHelper, $document, r, $state, ManageSarpras) {
            $scope.now = new Date();
            $scope.item = {};
            $scope.item.ruanganTujuan =[];
            $q.all([
                ManageSarpras.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan", true),
                ManageSarpras.getOrderList("advokasi-hukum-medicolegal/get-no-evaluasi", true)
            ]).then(function (data) {
                $scope.ListRuangan = data[0].data;
                $scope.listKasus = [{"id": 1, "nama": "Baru"}, {"id": 2, "nama": "Proses"}, {
                    "id": 3,
                    "nama": "Selesai"
                }];
                $scope.listPidana = [{"id": 1, "nama": "Pidana"}, {"id": 2, "nama": "Perdata"}];
                $scope.item.noKasus = data[1].data.data.noSurat;
            });
            var fileTypes = ['doc', 'docx']; //acceptable file types
            $scope.save = function () {
                var listRawRequired = [
                    "item.noKasus|ng-model|No Kasus",
                    "item.saran|ng-model|saran",
                    "item.isiKajian|ng-model|kajian",
                    "item.rekomendasi|ng-model|rekomendasi"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired); 
                if($scope.item.ruanganTujuan === undefined || $scope.item.pidana === undefined || $scope.item.kasus === undefined){
                    toastr.warning("Pidana, kasus dan ruangan harus terisi..");
                    return
                } 
                if (isValid.status) {
                    var files = document.getElementById("filePicker");
                    var file = files.files[0]; 
                    if (files && file) {
                        var reader = new FileReader();
                        var extension = file.name.split('.').pop().toLowerCase(), //file extension from input file
                            isSuccess = fileTypes.indexOf(extension) > -1;
                        console.log(isSuccess + " " + extension)
                        if (isSuccess) {
                            reader.onload = function(readerEvt) {
                                var binaryString = readerEvt.target.result; 
                                var paramSave = {
                                    "noUsulan": $scope.item.noKasus,
                                    "rekomendasi": $scope.item.rekomendasi, 
                                    "saran": $scope.item.saran,
                                    "isiKajian": $scope.item.isiKajian,
                                    "jenisKasusHukum": $scope.item.pidana.nama,
                                    "statusKasus": $scope.item.kasus.nama,
                                    "bodyFile": btoa(binaryString),
                                    "fileName":file.name,
                                    "tglUsulan": $scope.now 
                                }

                                console.log(JSON.stringify(paramSave));
                                ManageSarpras.saveDataSarPras(paramSave, "advokasi-hukum-medicolegal/save").then(function (e) {
                                    // window.location = "#/DaftarUsulanEvaluasiDanKajianOrganisasi";
                                });
                            };

                            reader.readAsBinaryString(file);
                        } //end success
                    }

                }

            }
        }
    ]);
});