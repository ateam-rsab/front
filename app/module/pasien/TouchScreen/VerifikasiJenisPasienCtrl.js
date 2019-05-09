define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('VerifikasiJenisPasienCtrl', ['ManagePasien', '$scope', 'ModelItem', '$rootScope', '$state', 'FindPasien', 'FindPegawai',
        function(managePasien, $scope, modelItem, $rootScope, $state, findPasien, findPegawai) { 
            
            function HeaderCtrl($scope) {
                $scope.cities = ["NY", "Amsterdam", "Barcelona"];
            }

            $scope.back = function() {
                window.history.back();
            }
            var HttpClient = function() {
                this.get = function(aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function() { 
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open( "GET", aUrl, true );            
                    anHttpRequest.send( null );
                }
            }
            // $scope.TESTCETAK = function(){

            //     var client = new HttpClient();
            //     client.get('http://localhost:2222/cetak-antrian?cetak=1&norec=ff8081815d9810c2015d984db6790010', function(response) {
            //         // do something with response
            //     });
            // }
            $scope.umum = function() {
                var antrian  = {
                    "jenis" : "A"
                };
                var client = new HttpClient();
                managePasien.getAntrianTouchScreen(antrian).then(function(e) {
                    client.get('http://127.0.0.1:1237/printvb/cetak-antrian?cetak=1&norec='+ e.data.data.noRec, function(response) {
                        // do something with response
                    });
                });
                // managePasien.getAntrianTouchScreen(antrian).then(function(e) {
                //     window.location = configuration.urlPrinting + "registrasi-pelayanan/slipAntrian?&noRec=" + e.data.data.noRec + "&X-AUTH-TOKEN=" + modelItem.getAuthorize();
                // });
                window.history.back();
            }
            $scope.bpjs = function() {
                var antrian  = {
                    "jenis" : "C"
                };
                var client = new HttpClient();
                managePasien.getAntrianTouchScreen(antrian).then(function(e) {
                    client.get('http://127.0.0.1:1237/printvb/cetak-antrian?cetak=1&norec='+ e.data.data.noRec, function(response) {
                        // do something with response
                    });
                });
                // managePasien.getAntrianTouchScreen(antrian).then(function(e) {
                //     window.location = configuration.urlPrinting + "registrasi-pelayanan/slipAntrian?noRec=" + e.data.data.noRec + "&X-AUTH-TOKEN=" + modelItem.getAuthorize();
                // });
                window.history.back();
            }
            $scope.asuransi = function() {
                var antrian  = {
                    "jenis" : "B"
                };
                var client = new HttpClient();
                managePasien.getAntrianTouchScreen(antrian).then(function(e) {
                    client.get('http://127.0.0.1:1237/printvb/cetak-antrian?cetak=1&norec='+ e.data.data.noRec, function(response) {
                        // do something with response
                    });
                });
                // managePasien.getAntrianTouchScreen(antrian).then(function(e) {
                //     window.location = configuration.urlPrinting + "registrasi-pelayanan/slipAntrian?noRec=" + e.data.data.noRec + "&X-AUTH-TOKEN=" + modelItem.getAuthorize();
                // });
                window.history.back();
            }
            $scope.online = function() {
                var antrian  = {
                    "jenis" : "D"
                };
                var client = new HttpClient();
                managePasien.getAntrianTouchScreen(antrian).then(function(e) {
                    client.get('http://127.0.0.1:1237/printvb/cetak-antrian?cetak=1&norec='+ e.data.data.noRec, function(response) {
                        // do something with response
                    });
                });
                // managePasien.getAntrianTouchScreen(antrian).then(function(e) {
                //     window.location = configuration.urlPrinting + "registrasi-pelayanan/slipAntrian?noRec=" + e.data.data.noRec + "&X-AUTH-TOKEN=" + modelItem.getAuthorize();
                // });
                window.history.back();
            }
            $scope.thalasemia = function() {
                var antrian  = {
                    "jenis" : "E"
                };
                var client = new HttpClient();
                managePasien.getAntrianTouchScreen(antrian).then(function(e) {
                    client.get('http://127.0.0.1:1237/printvb/cetak-antrian?cetak=1&norec='+ e.data.data.noRec, function(response) {
                        // do something with response
                    });
                });
                // managePasien.getAntrianTouchScreen(antrian).then(function(e) {
                //     window.location = configuration.urlPrinting + "registrasi-pelayanan/slipAntrian?noRec=" + e.data.data.noRec + "&X-AUTH-TOKEN=" + modelItem.getAuthorize();
                // });
                window.history.back();
            }

        }
    ]);
});