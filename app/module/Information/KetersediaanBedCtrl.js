define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KetersediaanBedCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'BedInformation',
        function($rootScope, $scope, ModelItem, $state, bedInformation) {
            $scope.isDetail = $state.params.kodeKelas !== '-';
            $scope.detailBed = {
                title: "Kelas III",
                ruangans: [{
                    namaRuangan: "Ruangan Gambir",
                    bedAvaible: 236,
                    bedEmpty: 46,
                    kamars: [{
                        namaKamar: "400",
                        bed: [{
                            no: "01",
                            namaPasien: "Junaedi",
                            status: 0
                        }, {
                            no: "02",
                            namaPasien: "Burhan",
                            status: 1
                        }, {
                            no: "03",
                            namaPasien: "Juned",
                            status: 3
                        }, {
                            no: "04",
                            namaPasien: "",
                            status: 4
                        }]
                    }]
                }, {
                    namaRuangan: "Ruangan Anggrek",
                    bedAvaible: 236,
                    bedEmpty: 46,
                    kamars: [{
                        namaKamar: "400",
                        bed: [{
                            no: "01",
                            namaPasien: "Junaedi",
                            status: 0
                        }, {
                            no: "02",
                            namaPasien: "Burhan",
                            status: 1
                        }, {
                            no: "03",
                            namaPasien: "Juned",
                            status: 3
                        }, {
                            no: "04",
                            namaPasien: "",
                            status: 4
                        }]
                    }]
                }]
            }
            $scope.listBed = [{
                kelas: "Kelas III",
                bedAvaible: 236,
                bedEmpty: 46
            }, {
                kelas: "Kelas II",
                bedAvaible: 12,
                bedEmpty: 5
            }, {
                kelas: "Kelas I",
                bedAvaible: 12,
                bedEmpty: 5
            }, {
                kelas: "Kelas VIP",
                bedAvaible: 12,
                bedEmpty: 5
            }, {
                kelas: "Unit Stroke",
                bedAvaible: 12,
                bedEmpty: 5
            }, {
                kelas: "NICU",
                bedAvaible: 12,
                bedEmpty: 5
            }, {
                kelas: "PICU",
                bedAvaible: 12,
                bedEmpty: 5
            }, {
                kelas: "HCU",
                bedAvaible: 12,
                bedEmpty: 5
            }];
            $rootScope.isOpen = true;
        }
    ]);
});