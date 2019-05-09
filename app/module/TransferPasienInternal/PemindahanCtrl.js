define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PemindahanCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
    	function($rootScope, $scope, ModelItem, $state) {
	        $scope.title = "transfer Pasien Internal - Pemindahan";

            //dummy Kondisi Pasien
            $scope.listKondisiPasien = [
                { "id": "1", "name": "Baik"},
                { "id": "2", "name": "Tidak Baik"},
            ];
            $scope.item = {};
            $scope.item.kondisipasien = { "id": "1", "name": "Pilih Kondisi Pasien"};

            //dummy Fasilitas
            $scope.listFasilitas = [
                { "id": "1", "name": "Lengkap"},
                { "id": "2", "name": "Tidak Lengkap"},
            ];
            $scope.item.fasilitas = { "id": "1", "name": "Pilih Keterangan Fasilitas"};

            //dummy Tenaga
            $scope.listTenaga = [
                { "id": "1", "name": "Banyak"},
                { "id": "2", "name": "Sedikit"},
            ];
            $scope.item.tenaga = { "id": "1", "name": "Pilih Keterangan"};


            //dummy Petugas Pendamping
            $scope.listPetugasPendamping = [
                { "id": "1", "name": "Bpk. Nana"},
                { "id": "2", "name": "Ibu. Shella"},
            ];
            $scope.item.petugaspendamping = { "id": "1", "name": "Pilih Nama Petugas"};

            //dummy Hubungan
            $scope.listHubungan = [
                { "id": "1", "name": "Keluarga"},
                { "id": "2", "name": "Teman"},
            ];
            $scope.item.hubungan = { "id": "2", "name": "Teman"};

        }]);
});
