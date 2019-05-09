/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



define(['initialize'], function(initialize) {

    'use strict';
    initialize.controller('PindahKamarCtrl', ['DateHelper','ManagePasien', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien',
        function(dateHelper,managePasien, $rootScope, $scope, ModelItem, $state, findPasien) {
            debugger;
            $scope.title = "Pindah Kamar";
            $scope.dataVOloaded = false;
            $rootScope.isOpen = true;
            $scope.item = {};
            findPasien.getPasienDaftar($state.params.noRec).then(function(e) {
                $scope.pasien = e.data.data;
                $scope.item.pasien = e.data.data.pasien;
                $scope.item.pasien.tglDaftarku = dateHelper.formatDate(e.data.data.pasien.tglDaftar, "DD-MM-YYYY")
                
            if ($scope.pasien !== undefined) {
                debugger;
                    findPasien.getPasienDaftarDua($scope.item.pasien.noCm).then(function(f) {
                
                $scope.item.pasiendua = f.data.data;
            })}
                
            })
            
            ModelItem.get("MasukKamar").then(function(data) {;
                $scope.item = data;
                $scope.dataVOloaded = true;
            }, function errorCallBack(err) {});

            var dataItem = ModelItem.kendoHttpSource('/registrasi-pelayanan/get-all-ruangan-rawat-inap');
            dataItem.fetch(function() {
                    $scope.namaRuang = dataItem._data;
                })

            $scope.$watch('item.ruangan', function(e) {
                if (e === undefined) return;
                var ruanganId = $scope.item.ruangan.id;
                findPasien.getKelasByRuangan(ruanganId).then(function(a) {
                    $scope.listKelas = a.data.data.listData;
                })
            });
            
            $scope.$watch('item.kelas', function(e) {
                if (e === undefined) return;
                var kelasId = $scope.item.kelas.id;
                var ruanganId = $scope.item.ruangan.id
                findPasien.getKamarByKelas(kelasId, ruanganId).then(function(a) {
                    $scope.listKamar = a.data.data.listData;
                })
            });
            $scope.$watch('item.kamar', function(e) {
                if (e === undefined) return;
                var kamarId = $scope.item.kamar.id;
                findPasien.getNoBed(kamarId).then(function(a) {
                    $scope.listNoBed = a.data.data.listData;
                })
            });


            $scope.Save = function() {
                debugger;
                managePasien.savePindahKamar({
                    "noRec": $state.params.noRecAdmisi,
                    "noBedRencana": $scope.item.nomorBed.nomorBed,
                    "kelasRencana":{
                        "id": $scope.item.kelas.id
                    },
                    "ruanganRencana":{
                        "id": $scope.item.ruangan.id
                    },
                    "kelasKamarRencana":{
                        "id":$scope.item.kamar.id
                    },
                    "tempatTidur":{
                        "id": $scope.item.nomorBed.id
                    }
                })
                debugger;
                $state.go('DaftarRencanaPindahPasien');

            }
        }
    ]);

});