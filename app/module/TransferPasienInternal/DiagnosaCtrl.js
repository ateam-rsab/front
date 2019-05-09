define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DiagnosaCtrl', ['$rootScope', '$scope', 'ModelItem', '$state',
    	function($rootScope, $scope, ModelItem, $state) {
	        $scope.title = "transfer Pasien Internal - Diagnosa";
            //dummy Ruang Perawatan Lanjut
            $scope.listRuangRawatLanjut = [
                { "id": "1", "name": "Ruang A"},
                { "id": "2", "name": "Ruang B"},
                { "id": "3", "name": "Ruang C"},
                { "id": "4", "name": "Ruang D"},
            ];
            $scope.item = {};
            $scope.item.ruangrawatlanjut = { "id": "1", "name": "Ruangan"};

            //dummy Dokter Penanggung Jawab
            $scope.listDPJP = [
                { "id": "1", "name": "Dr. Udin Osae"},
                { "id": "2", "name": "Dr. Hanafi"},
                { "id": "3", "name": "Dr. Oz"},
                { "id": "4", "name": "Dr. Hasan"},
            ];
            $scope.item.dpjp = { "id": "1", "name": "Dr. Udin Osae"};

            //dummy Dokter Jaga
            $scope.listDokterJagaRuang = [
                { "id": "1", "name": "Dr. Diana"},
                { "id": "2", "name": "Dr. Indra"},
                { "id": "3", "name": "Dr. Deni"},
                { "id": "4", "name": "Dr. Okky"},
            ];
            $scope.item.dokterjagaruang = { "id": "1", "name": "Dr. Diana"};

            //dummy Diagnosa Utama
            $scope.listDiagnosaUtama = [
                { "id": "1", "name": "ICD 10"},
                { "id": "1", "name": "ICD 9"},
            ];
            $scope.item.diagnosautama = { "id": "1", "name": "ICD 10"};

            //dummy Diagnosa Sekunder
            $scope.listDiagnosaSekunder = [
                { "id": "1", "name": "Vitamin B12 deficiency anemia"},
                { "id": "1", "name": "Vitamin C deficiency anemia"},
                { "id": "1", "name": "Vitamin D deficiency anemia"},
                { "id": "1", "name": "Vitamin A deficiency anemia"},
            ];
            $scope.item.diagnosasekunder = { "id": "1", "name": "Vitamin B12 deficiency anemia"};

    }]);
});
