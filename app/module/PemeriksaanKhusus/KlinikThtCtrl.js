define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KlinikThtCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'GetPostOnPengkajianAwal', 'FindPegawai','ManagePasien',
        function($rootScope, $scope, ModelItem, $state, findPasien, getPostOnPengkajianAwal, findPegawai,ManagePasien) {
            $scope.tanggal = $state.params.tanggal;
            $scope.noCM = $state.params.noCM;
            debugger;
            $scope.listData = [{

                    id: 1,
                    antrianPasienDiperiksa:{
                        "noRec":$state.params.noRec
                    },
                    title: "Telinga",
                    image: "images/tht/telinga.PNG",
                    children: [{
                            id: 1,
                            item: "Aurikula",
                            title: "Dextra"
                        },
                        {
                            id: 2,
                            item: "Aurikula",
                            title: "Sinitra"
                        },
                        {
                            id: 3,
                            item: "Liang Telinga",
                            title: "Dextra"
                        },
                        {
                            id: 4,
                            item: "Liang Telinga",
                            title: "Sinitra"
                        },
                        {
                            id: 5,
                            item: "Membran Timpani",
                            title: "Dextra"
                        },
                        {
                            id: 6,
                            item: "Membran Timpani",
                            title: "Sinitra"
                        },
                        {
                            id: 7,
                            item: "Area Retroaurikular",
                            title: "Dextra"
                        },
                        {
                            id: 8,
                            item: "Area Retroaurikular",
                            title: "Sinitra"
                        }
                    ]
                },
                {
                    id: 1,
                    title: "Hidung",
                    antrianPasienDiperiksa:{
                        "noRec":$state.params.noRec
                    },
                    image: "images/tht/noise.png",
                    children: [{
                            id: 9,
                            item: "Kavum Nasi",
                            title: "Dextra"
                        },
                        {
                            id: 10,
                            item: "Kavum Nasi",
                            title: "Sinitra"
                        },
                        {
                            id: 11,
                            item: "Konka Inferior",
                            title: "Dextra"
                        },
                        {
                            id: 12,
                            item: "Konka Inferior",
                            title: "Sinitra"
                        },
                        {
                            id: 13,
                            item: "Septum Lainnya",
                            title: "Dextra"
                        },
                        {
                            id: 14,
                            item: "Septum Lainnya",
                            title: "Sinitra"
                        }
                    ]
                },
                {
                    id: 3,
                    antrianPasienDiperiksa:{
                        "noRec":$state.params.noRec
                    },
                    title: "Rongga Mulut dan Tengkorak",
                    image: "images/tht/rongga.png",
                    children: [{
                            id: 15,
                            item: "Palatum",
                            title: ""
                        },
                        {
                            id: 16,
                            item: "Uvula",
                            title: ""
                        },
                        {
                            id: 17,
                            item: "Tonsil",
                            title: ""
                        },
                        {
                            id: 18,
                            item: "Faring",
                            title: ""
                        },
                        {
                            id: 19,
                            item: "Lainnya",
                            title: ""
                        }
                    ]
                },
                {
                    id: 4,
                    antrianPasienDiperiksa:{
                        "noRec":$state.params.noRec
                    },
                    title: "LARYNX",
                    image: "images/tht/rynx.png",
                    children: [{
                            id: 20,
                            item: "Epiglotis",
                            title: ""
                        },
                        {
                            id: 21,
                            item: "Plika Vokalis",
                            title: ""
                        },
                        {
                            id: 22,
                            item: "Plika Ventrikularis",
                            title: ""
                        },
                        {
                            id: 23,
                            item: "Aritenoid",
                            title: ""
                        },
                        {
                            id: 24,
                            item: "Rima glotis",
                            title: ""
                        }
                    ]
                },
                {
                    id: 5,
                    antrianPasienDiperiksa:{
                        "noRec":$state.params.noRec
                    },
                    title: "Kepala Leher",
                    image: "images/tht/r.png",
                    children: [{
                        id: 25,
                        item: "Keterangan",
                        title: ""
                    }]
                },
                {
                    id: 6,
                    antrianPasienDiperiksa:{
                        "noRec":$state.params.noRec
                    },
                    title: "Tes Pendengaran",
                    children: [{
                            id: 26,
                            item: "Garpu Tala",
                            title: ""
                        },
                        {
                            id: 27,
                            item: "Otoacoustic Emission",
                            title: ""
                        }
                    ]
                }
            ];
            getPostOnPengkajianAwal.getListTht($scope.noCM, $scope.tanggal).then(function(e) {

            });
            $scope.model = $scope.listData
            $scope.Save = function() {
                 console.log($scope.model);
                ManagePasien.saveTHT(ModelItem.beforePost($scope.model)).then(function(e) {
                    /*$scope.item = undefined;*/
                    /*$scope.isNext = true;*/
                    console.log($scope.listData);
                });
            }
        }
    ]);
});