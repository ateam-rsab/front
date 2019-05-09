define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('PermintaanPerbaikandariRuanganRevCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageIPSRS', 'IPSRSService', '$state', '$location', '$mdDialog', 'DateHelper', 'ManagePhp', 'ModelItemAkuntansi',
		function ($rootScope, $scope, ModelItem, ManageIPSRS, IPSRSService, $state, $location, $mdDialog, DateHelper, ManagePhp, modelItemAkuntansi) {
			var data2 = [];
			ModelItem.get("IP3RS/PermintaanPerbaikandariRuangan").then(function (data) {
				$scope.item = data;
				$scope.item.tanggalPesan = new Date();
				$scope.dataVOloaded = true;
				$scope.mapUserLoginToRuangan = JSON.parse(localStorage.getItem('mapUserLoginToRuangan'))
				$scope.userLogin = JSON.parse(localStorage.getItem('pegawai'))
				$scope.item.userPelapor = $scope.userLogin.namaLengkap
				$scope.item.userPelaporId = $scope.userLogin.id
				$scope.Nongedung = true;
				$scope.tombolSimpanVis = true;

				modelItemAkuntansi.getDataDummyPHP("pasien/get-produk-combos", true, true, 10).then(function(data) {
                     $scope.listproduk= data;
               		  });
					ManagePhp.getMaster("ip3rs/get-data-combobox", true).then(function (dat) {
						$scope.listKategoriPerbaikan = dat.data.kategoriperbaikan;
						$scope.listRuangan = dat.data.ruangan;
						$scope.listproduk = dat.data.registrasiaset;
						$scope.item.ruanganTujuan = $scope.listRuangan[0]	
						$scope.item.ruanganAsal = $scope.mapUserLoginToRuangan[0]
					});

					$scope.$watch('item.ruanganAsal', function(newValue, oldValue) {
			            // if (newValue != oldValue  ) {
			            	var data = []
			                for (var i = $scope.listproduk.length - 1; i >= 0; i--) {
			                	if ($scope.listproduk[i].idruangan == newValue.id) {
			                		data.push($scope.listproduk[i])
			                	}
			                }
			                for (var i = data.length - 1; i >= 0; i--) {
			                	data[i].id =data[i].idproduk 
			                }
			                $scope.listRegAset = data
			            // }
			        });

			        // DATAGRID
			        $scope.columnGrid = [
			        {
			            "field": "no",
			            "title": "No",
			            "width" : "30px",
			        },
			        {
			            "field": "tglorder",
			            "title": "Tanggal Order",
			            "width" : "70px",
			        },
			        {
			            "field": "kategoriperbaikan",
			            "title": "Kategori Perbaikan",
			            "width" : "100px",
			        },
			        {
			            "field": "kerusakan",
			            "title": "kerusakanalt/gdg",
			            "width" : "60px",
			        },
			        {
			            "field": "ruanganasal",
			            "title": "Ruangan Asal",
			            "width" : "80px",
			        },
			        {
			            "field": "ruangantujuan",
			            "title": "Ruangan Tujuan",
			            "width" : "80px",
			        },
			        {
			            "field": "userpelapor",
			            "title": "User Pelapor",
			            "width" : "70px",
			        },
			        {
			            "field": "deskpermintaan",
			            "title": " Ket Kerusakan/Keluhan",
			            "width" : "100px",
			        }
			        ];
			        // END DATAGRID

			        // KLIK GRID
			    $scope.klikGrid = function(dataSelected){
		            var dataProduk =[];            
		            $scope.item.noUrut = dataSelected.no
		            $scope.item.KategoriPerbaikan = {
			            id: dataSelected.kategoriperbaikanId,
			            kategoriperbaikan: dataSelected.kategoriperbaikan
			        }
			         $scope.item.ruanganAsal = {
		            	id: dataSelected.ruanganasalId,
			            namaruangan: dataSelected.ruanganasal
		            }
		            $scope.item.namaProduk = {
		            	id: parseInt(dataSelected.kerusakanId),
			            namaproduk: dataSelected.kerusakan
		            }
		          
		            $scope.item.ruangantujuan = {
		            	id: dataSelected.ruangantujuanId,
			            ruanganasal: dataSelected.ruangantujuan
		            }
		            $scope.item.userPelapor = dataSelected.userpelapor
		            $scope.item.deskPermintaan = dataSelected.deskpermintaan
        		}

        // END KLIK GRID
			    $scope.tambah = function () {
		            if ($scope.item.KategoriPerbaikan == undefined) {
		                alert("Kategori Perbaikan harus di isi!")
		                return;
		            }
		            if ($scope.item.namaProduk == undefined) {
		                alert("Kerusakan Peralatan/Gedung harus di isi!")
		                return;
		            }
		            if ($scope.item.ruanganAsal == 0) {
		                alert("Ruangan Asal tidak ada harus di isi!")
		                return;
		            }
		            var nomor = $scope.item.noUrut
			            if ($scope.dataGrid == undefined) {
			                nomor = 1
			            }else{
			                nomor = data2.length+1
			            }
		            var data ={};
		            if ($scope.item.noUrut != undefined){
		                for (var i = data2.length - 1; i >= 0; i--) {
		                    if (data2[i].no ==  $scope.item.noUrut){
		                       data.no = nomor
		                       data.tglorder = moment($scope.item.tanggalPesan).format('YYYY-MM-DD hh:mm:ss')
		                       data.kategoriperbaikan=$scope.item.KategoriPerbaikan.kategoriperbaikan
		                       data.kategoriperbaikanId=$scope.item.KategoriPerbaikan.id
		                       data.kerusakan=$scope.item.namaProduk.namaproduk
		                       data.kerusakanId=$scope.item.namaProduk.id
		                       data.ruanganasal=$scope.item.ruanganAsal.namaruangan
		                       data.ruanganasalId=$scope.item.ruanganAsal.id
		                       data.ruangantujuan=$scope.item.ruanganTujuan.namaruangan
		                       data.ruangantujuanId=$scope.item.ruanganTujuan.id
		                       data.userpelapor=$scope.item.userPelapor
		                       data.userpelaporId=$scope.item.userPelaporId
		                       data.deskpermintaan=$scope.item.deskPermintaan

		                        data2[i] = data;
		                        $scope.dataGrid = new kendo.data.DataSource({
		                            data: data2
		                        });
		                    }
		                }

		            }else{
		                data={
		                       no:nomor,
		                       tglorder:moment($scope.item.tanggalPesan).format('YYYY-MM-DD hh:mm:ss'),
		                       kategoriperbaikan:String($scope.item.KategoriPerbaikan.kategoriperbaikan),
		                       kategoriperbaikanId:String($scope.item.KategoriPerbaikan.id),
		                       kerusakan:String($scope.item.namaProduk.namaproduk),
		                       kerusakanId:String($scope.item.namaProduk.id),
		                       ruanganasal:String($scope.item.ruanganAsal.namaruangan),
		                       ruanganasalId:String($scope.item.ruanganAsal.id),
		                       ruangantujuan:String($scope.item.ruanganTujuan.namaruangan),
		                       ruangantujuanId:String($scope.item.ruanganTujuan.id),
		                       userpelapor:String($scope.item.userPelapor),
		                       userpelaporId:String($scope.item.userPelaporId),
		                       deskpermintaan:String($scope.item.deskPermintaan)
		                    }
		                data2.push(data)
		                $scope.dataGrid = new kendo.data.DataSource({
		                    data: data2
		                });
		            }
		            $scope.clear()
        }
        		// SIMPAN
        		$scope.simpan=function(){
        			var objSave = {
		                       detail:data2
	                        }
	                
	                ManagePhp.postOrderIP3RS(objSave).then(function(e) {
	                	$scope.tombolSimpanVis = false
	                })
        		}
            // END SIMPAN

            	// HAPUS
            	$scope.hapus = function(){
                var data ={};
                if ($scope.item.noUrut != undefined){
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no ==  $scope.item.noUrut){
                            data2.splice(i, 1);
                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2
                            });
                            }
                            $scope.clear()
                        }
                    }
                }
            	// END HAPUS

				$scope.clear = function () {
					// body...
					$scope.item.KategoriPerbaikan = undefined
					$scope.item.namaProduk = undefined
					$scope.item.deskPermintaan = ""
				}

			}, function errorCallBack(err) { });
		}
	]);
});
