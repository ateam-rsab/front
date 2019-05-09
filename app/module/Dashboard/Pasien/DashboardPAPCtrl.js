define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DashboardPAPCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper', 'ManagePasien', 'FindPasien', 'CacheHelper',
        function($rootScope, $scope, ModelItem, $state, DateHelper, managePasien, findPasien, cacheHelper) {

            $scope.noCM = $state.params.noCM;
            $scope.tglRegistrasi = $state.params.tglRegistrasi;
            $scope.noRec = $state.params.noRec;
            $scope.ruangana = $state.params.ruangana;
            $scope.pasienId = $state.params.pasienId;
            findPasien.getListRiwayatPap($scope.noCM).then(function(data){
                $scope.sourcePAP = new kendo.data.DataSource({
                    data: data.data.data.listData,
                    pageSize: 10,
                    // change: function(e) {
                    //     console.log('action : ' + e.action);
                    // }
                });
            })
            $scope.kl = function(current) {
                $scope.current = current;
                $state.params.kdPap = current.kdPap;
                $state.params.noRecRiwayatPap = current.noRec;
                $scope.noRecRiwayatPap = $scope.current.noRec;
            }
            $scope.mainGridOptions = {
                pageable: true,
                columns: [{
                    "field": "kdPap",
                    "title": "Kode PAP",
                    "width": "100px"
                }, {
                    "field": "tglRegistrasi",
                    "title": "Tgl Pengkajian Awal",
                    "width": "100px",
                    template: "#= new moment(tglRegistrasi).format(\'DD-MM-YYYY\') #",
                }, {
                    "field": "namaRuangan",
                    "title": "Ruangan",
                    "width": "200px"
                }]
            };
            
            $scope.Lihat = function(){
                // $scope.item.noRecRiwayatPap = window.localStorage.getItem('noRecRiwayatPap');
                localStorage.removeItem('activeMenuDashboardPAP'); // remove cache activeMenuDashboardPAP
                localStorage.removeItem('activeMenuSkriningUmum'); // remove cache activeMenuSkriningUmum
                localStorage.removeItem('activeMenuSkriningKhusus'); // remove cache activeMenuSkriningKhusus
                cacheHelper.set('noRecPap', $scope.noRecRiwayatPap);
                if ($scope.noRecRiwayatPap) {
                    debugger;
                    $state.go('dashboardpasien.pengkajianUtama', {
                        noCM: $scope.noCM,
                        tanggal: moment(new Date($scope.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                        noRec: $scope.noRec,
                        ruangana: $scope.ruangana,
                        noRecRiwayatPap: $scope.noRecRiwayatPap,
                        pasienId: $scope.item.pasien.id,
                        kdPap: $scope.current.kdPap
                    });
                } else {
                    window.messageContainer.error('Riwayat PAP belum dipilih')
                }
            }
            $scope.create = function() {
                var tmp = {
                    "tglRegistrasi": DateHelper.getPeriodeFormatted(new Date()),
                    "pasien": {
                        "id": $scope.item.pasien.id
                    },
                    "ruangan": {
                        "id": $scope.item.ruangan.id
                    },
                    "noRegistrasi": {
                        "noRec": $scope.item.noRec
                    }
                }
                managePasien.saveRiwayatPAP(tmp).then(function(response){
                    // $scope.noRecRiwayatPap = response.data.data.noRec;
                    cacheHelper.set('noRecPap', response.data.data.noRec);
                    $state.go('dashboardpasien.pengkajianUtama', {
                        noCM: $scope.noCM,
                        tanggal: $scope.tglRegistrasi,
                        noRec: $scope.noRec,
                        ruangana: $scope.ruangana,
                        noRecRiwayatPap: $scope.noRecRiwayatPap,
                        pasienId: $scope.pasienId //,
                        // kdPap: $scope.current.kdPap
                        // minta backend kirim respon berupa kdPap saat buat PAP baru
                    });

                })
            }
        }
        ]);
});