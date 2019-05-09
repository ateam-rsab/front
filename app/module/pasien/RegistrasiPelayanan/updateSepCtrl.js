define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('updateSepCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien', 'FindPasien',
        function($rootScope, $scope, ModelItem, $state, DateHelper, managePasien, findPasien) {
            $scope.isRouteLoading = true;
            $scope.clear = function(){
                $scope.now = new Date();
                $scope.item = {
                    tglSep: $scope.now,
                    tglRujukan: $scope.now,
                };
                $scope.item.jenisPelayanan = $scope.jenisPelayanan[0];
                $scope.item.kelasRawat = $scope.kelasRawat[0];
                $scope.item.lakaLantas = $scope.lakaLantas[1];
                $scope.isRouteLoading = false;
            };
            $scope.jenisPelayanan = [{
                "id": 1, "name": "Rawat Inap", "value": 1
            },{
                "id": 2, "name": "Rawat Jalan", "value": 2
            }];
            $scope.kelasRawat = [{
                "id": 3, "name": "Kelas I", "value": 1
            },{
                "id": 4, "name": "Kelas II", "value": 2
            },{
                "id": 5, "name": "Kelas III", "value": 3
            }];
            $scope.lakaLantas = [{
                "id": 6, "name": "Ya", "value": 1
            },{
                "id": 7, "name": "Tidak", "value": 2
            }];
            $scope.clear();
            $scope.$watch('item.jenisPelayanan', function(e){
                if (!e) return;
                if (e.name.indexOf('Inap') >= 0) {
                    findPasien.getRuanganRI().then(function(data){
                        $scope.ruangans = data.data.data;
                    })
                } else {
                    findPasien.getRuanganRJ().then(function(data){
                        $scope.ruangans = data.data.data;
                    })
                     $scope.item.kelasRawat = $scope.kelasRawat[2];
                }
            })
            $scope.$watch('item.lakaLantas', function(e){
                if (!e) return;
                if (e.name.indexOf('Ya') >= 0) {
                    $scope.disableLokasi = false;
                    $scope.item.lokasiLaka = undefined;
                } else {
                    $scope.disableLokasi = true;
                }
            })
            $scope.generateSep = function(data){
                var listRawRequired = [
                    "item.noCm|ng-model|Nomor CM",
                    "item.noKartu|ng-model|Nomor kartu",
                    "item.tglSep|k-ng-model|Tanggal Sep",
                    "item.noRujukan|ng-model|Nomor Rujukan",
                    "item.tglRujukan|k-ng-model|Tanggal Rujukan",
                    // "item.jenisPelayanan|ng-model|Jenis Pelayanan",
                    "item.poliTujuan|k-ng-model|Poli Tujuan",
                    "item.diagnosa|ng-model|Diagnosa Awal",
                    // "item.kelasRawat|ng-model|Kelas Rawat",
                    // "item.lakaLantas|ng-model|Laka Lantas",
                ];
                if(data.lakaLantas.value === 1)
                    listRawRequired.push("item.lokasiLaka|ng-model|Lokasi Laka Lantas");
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    $scope.isRouteLoading = true;
                    var dataGenerate = {
                        noSep: data.noSep,
                        noKartu: data.noKartu,
                        tanggalRujukan: new moment(data.tglRujukan).format('YYYY-MM-DD HH:mm:ss'),
                        noRujukan: data.noRujukan,
                        ppkRujukan: '0901R001',
                        isRawatJalan: data.jenisPelayanan === 1 ? 'T' : 'F',
                        catatan: data.catatan === undefined ? '' : data.catatan,
                        kdDiagnosa: data.diagnosa,
                        poliTujuan: data.poliTujuan.id,
                        kelasRawat: data.kelasRawat.value,
                        lakaLantas: data.lakaLantas.value,
                        lokasiLaka: data.lokasiLaka === undefined ? '' : data.lokasiLaka,
                        tglSep: new moment(data.tglSep).format('YYYY-MM-DD HH:mm:ss'),
                        noCm: data.noCm
                    };
                    findPasien.updateSep(dataGenerate).then(function(e) {
                        document.getElementById("json").innerHTML = JSON.stringify(e.data.data, undefined, 4);
                    }).then(function(){
                        $scope.isRouteLoading = false;
                    })
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
        }
    ]);
});