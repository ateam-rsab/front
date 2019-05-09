define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPasienEmergencyCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper', 'socket',
        function($rootScope, $scope, ModelItem, $state, findPasien, dateHelper, socket) {
            // $scope.dataVOloaded = false;
            $rootScope.isOpen = true;
            // $scope.now = new Date();
            $scope.reset = function(){
                $scope.from = dateHelper.setJamAwal(new Date());
                $scope.until = dateHelper.setJamAkhir(new Date());
            }
            $scope.reset();
            $scope.lisREmergency = [];

            $scope.formatJam24 = {
                value: new Date(),			//set default value
                format: "dd-MM-yyyy HH:mm",	//set date format
                timeFormat: "HH:mm",		//set drop down time format to 24 hours
            }
            findPasien.getRuanganRJ().then(function(e){
                e.data.data.forEach(function(lis){
                    if (lis.departemenId === 24){
                        $scope.lisREmergency.push(lis)
                    }
                })
                $scope.loadDaftarAntrian();
            })
            
            $scope.gridAntrian = {
                sortable: true,
                pageable: true,
                selectable: "row",
                columns: [{
                    field: "noAntrian",
                    title: "No.",
                    width: 50
                }, {
                    field: "pasienDaftar.tglRegistrasi",
                    title: "Tgl Registrasi",
                    template: "#= new moment(new Date(pasienDaftar.tglRegistrasi)).format('DD-MM-YYYY HH:mm') #"
                }, {
                    field: "pasien.namaPasien",
                    title: "Nama Pasien"
                }, {
                    field: "pasien.noCm",
                    title: "No. Rekam Medis"
                }, {
                    field: "pasien.umur",
                    title: "Umur"
                }, {
                    field: "dokter",
                    title: "Dokter"
                }, {
                    field: "jenisKelamin",
                    title: "Jenis Kelamin"
                }, {
                    field: "kelompokPasien",
                    title: "Tipe Pembayaran"
                }, {
                    field: "kelas.namaKelas",
                    title: "Kelas"
                }, {
                    field: "statusAntrian",
                    title: "Status"
                }]
            }
            $scope.loadDaftarAntrian = function(){
                $scope.isRouteLoading = true;
                $scope.dataSource = new kendo.data.DataSource({
                    data: []
                });
                $scope.lisREmergency.forEach(function(lis){
                    findPasien.findQueue($scope.from, $scope.until, lis).then(function(e){
                        if(e.data.data.length > 0){
                            e.data.data.forEach(function(lis){
                                debugger;
                                $scope.dataSource.add(lis);
                            })
                        }
                    }, function(error){
                        alert('error get daftar antrian')
                    })
                }, function(error){
                    $scope.isRouteLoading = false;
                });
                var grid = $("#mainGrid").data("kendoGrid");
                grid.setDataSource($scope.dataSource);
                grid.refresh();
                $scope.isRouteLoading = false;
            }

            $scope.$watch('selectedData', function(e){
                if (!e) return;
                console.log(JSON.stringify($scope.selectedData.noRec));
            })

            $scope.pasienPulang = function() {
                if (!$scope.selectedData){
                    messageContainer.error('Anda belum memilih pasien di daftar antrian');
                    return;
                }
                if ($scope.selectedData.dokter === undefined) {
                    // $scope.cekDokter();
                    messageContainer.error('Dokter pemeriksa tidak boleh kosong, Data tidak dapat di proses')
                } else {
                    $state.go('dashboardpasien.pasienPulang', {
                        noCM: $scope.selectedData.pasien.noCm,
                        tanggal: moment(new Date($scope.selectedData.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                        noRec: $scope.selectedData.noRec,
                        noRecPasienDaftar: $scope.selectedData.pasienDaftar.noRec
                    });
                }
            }
        }
    ]);
});