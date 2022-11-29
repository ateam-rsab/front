define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('PengkajianPasienCtrl', ['$rootScope', '$scope', '$state', 'DateHelper', 'ManagePhp', 'CacheHelper',
        function ($rootScope, $scope, $state, DateHelper, managePhp, cacheHelper) {
            $scope.onInit=()=>{
                var datauserlogin = JSON.parse(window.localStorage.getItem('pegawai'));
                (datauserlogin['id']=="320263") ? $scope.isVedika=true : $scope.isVedika=false;
            }
            $scope.onInit();
            $scope.isRouteLoading = false
          
            LoadCache();
            loadGrid();
            $scope.dataPegawaiLogin = JSON.parse(localStorage.getItem('pegawai'));
            function LoadCache() {
                var chacePeriode = cacheHelper.get('cachePengkajianPasien');
                if (chacePeriode != undefined) {
                    $scope.noCM = chacePeriode[0]
                    $scope.namaPasien = chacePeriode[1]
                    $scope.jenisKelamin = chacePeriode[2]
                    $scope.noregistrasi = chacePeriode[3]
                    $scope.umur = chacePeriode[4]
                    $scope.kelompokPasien = chacePeriode[5]
                    $scope.tglRegistrasi = chacePeriode[6]
                    $scope.norec_pd = chacePeriode[8]
                    $scope.idKelas = chacePeriode[9]
                    $scope.kelas = chacePeriode[10]
                    $scope.idRuangan = chacePeriode[11]
                    $scope.namaRuangan = chacePeriode[12]
                }
            }
            function loadGrid() {
                $scope.isRouteLoading = true
                managePhp.getData('rekam-medis/get-pengkajianpasien/' + $scope.noCM).then(function (data) {
                    $scope.isRouteLoading = false
                    $scope.sourcePAP = new kendo.data.DataSource({
                        data: data.data.data,
                        pageSize: 10,
                        // change: function(e) {
                        //     console.log('action : ' + e.action);
                        // }
                    });
                })
            }
            $scope.kl = function (current) {
                $scope.current = current;
                $state.params.kdPap = current.kdpap;
                $state.params.noRecRiwayatPap = current.norec;
                $scope.noRecRiwayatPap = $scope.current.norec;
                $scope.pasienId = $scope.current.objectpasienfk
            }
            if($scope.isVedika){
                $scope.mainGridOptions = {
                    filterable: {
                        extra: false,
                        operators: {
                            string: {
                                startswith: "Dimulai dengan",
                                contains: "mengandung kata",
                                neq: "Tidak mengandung kata"
                            }
                        }
                    },
                    pageable: true,
                    columns: [{
                        "field": "kdpap",
                        "title": "Kode PAP",
                        "width": "15%"
                    }, {
                        "field": "tglinput",
                        "title": "Tanggal Pengkajian Awal",
                        "width": "20%",
                        template: "#= new moment(tglinput).format(\'DD-MM-YYYY HH:mm\') #",
                    }, {
                        "field": "noregistrasi",
                        "title": "No Registrasi",
                        "width": "15%"
                    },
                    {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "25%"
                    },
                    {
                        "field": "namalengkap",
                        "title": "Petugas",
                        "width": "25%"
                    }]
                };
            }else{
                $scope.mainGridOptions = {
                    filterable: {
                        extra: false,
                        operators: {
                            string: {
                                startswith: "Dimulai dengan",
                                contains: "mengandung kata",
                                neq: "Tidak mengandung kata"
                            }
                        }
                    },
                    pageable: true,
                    columns: [{
                        "field": "kdpap",
                        "title": "Kode PAP",
                        "width": "15%"
                    }, {
                        "field": "tglinput",
                        "title": "Tanggal Pengkajian Awal",
                        "width": "20%",
                        template: "#= new moment(tglinput).format(\'DD-MM-YYYY HH:mm\') #",
                    }, {
                        "field": "noregistrasi",
                        "title": "No Registrasi",
                        "width": "15%"
                    },
                    {
                        "field": "namaruangan",
                        "title": "Ruangan",
                        "width": "25%"
                    },
                    {
                        "field": "namalengkap",
                        "title": "Petugas",
                        "width": "25%"
                    },
                    {
                        "command": [{
                            text: "Hapus",
                            click: hapusData,
                            imageClass: "k-icon k-delete"
                        }],
                        title: "",
                        width: "100px",
                    }]
                };
            }
            
            function hapusData(e) {
				// if (loginITI ==false){
				// 	toastr.error('Tidak Bisa Menghapus Data','Info')
				// 	return
				// }
				e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if (!dataItem) {
					toastr.error("Data Tidak Ditemukan");
					return;
				}
				var itemDelete = {
					"norec": dataItem.norec
				}

				managePhp.postData(itemDelete, 'rekam-medis/hapus-pengkajianpasien').then(function (e) {
					if (e.status === 201) {
                        loadGrid()

						grid.removeRow(row);
					}
				})

			}
            // $rootScope.$watch('showMenuPengkajian', function(e) {
            //     debugger
            //     if (e === undefined) return;
            //     $scope.showMenuPengkajian = e;
            // });
            $scope.showDaftarPengkajian = true
            $scope.Lihat = function () {
                localStorage.removeItem('activeMenuDashboardPAP'); // remove cache activeMenuDashboardPAP
                localStorage.removeItem('activeMenuSkriningUmum'); // remove cache activeMenuSkriningUmum
                localStorage.removeItem('activeMenuSkriningKhusus'); // remove cache activeMenuSkriningKhusus
                window.localStorage.setItem('activeMenuPengkajian', true);
                $scope.showMenuPengkajian = true
                $scope.showDaftarPengkajian = false
                cacheHelper.set('noRecPap', $scope.noRecRiwayatPap);
                if ($scope.noRecRiwayatPap) {

                    $state.go('RekamMedis.MenuPengkajian',{
                        norecAPD: $state.params.noRec,
                        noRec: $state.params.noRec,
                    })

                    // $state.go('dashboardpasien.pengkajianUtama', {
                    //     noCM: $scope.noCM,
                    //     tanggal: moment(new Date($scope.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    //     noRec: $state.params.norecAPD,
                    //     // ruangana: $scope.ruangana,
                    //     noRecRiwayatPap: $scope.noRecRiwayatPap,
                    //     pasienId: $scope.pasienId,
                    //     kdPap: $scope.current.kdpap
                    // });
                } else {
                    window.messageContainer.error('Riwayat PAP belum dipilih')
                }
            }

            $scope.create = function () {
                var tmp = {
                    "norec": '',
                    "tglregistrasi": DateHelper.getPeriodeFormatted(new Date()),
                    "nocm": $scope.noCM,
                    "objectruanganfk": $scope.idRuangan,
                    "noregistrasifk": $state.params.noRec,
                    "pegawaifk": $scope.dataPegawaiLogin.id
                }
                managePhp.postData(tmp, 'rekam-medis/save-pengkajianpasien').then(function (response) {
                    cacheHelper.set('noRecPap', response.data.pap.norec);
                    
                    $state.go('RekamMedis.MenuPengkajian', {
                        noRec:  $state.params.noRec,
           
                        // kdPap: $scope.current.kdPap
                        // minta backend kirim respon berupa kdPap saat buat PAP baru
                    });

                })
            }
        }
    ]);
});