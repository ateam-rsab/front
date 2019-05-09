define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('JadwalMaintenanceIP3RSCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageIPSRS', 'IPSRSService', '$state', '$location', '$mdDialog', 'DateHelper', 'ManagePhp', 'ModelItemAkuntansi', 'CacheHelper',
		function ($rootScope, $scope, ModelItem, ManageIPSRS, IPSRSService, $state, $location, $mdDialog, DateHelper, managePhp, modelItemAkuntansi, cacheHelper) {
			var data2 = [];
			$scope.item = {};
			var daftarPeserta = [];
			var norecJadwal='';
            var IdJadwal='';
            var Norec=''; 
            var tglReal='';           
            $scope.now = new Date()
            FormLoad();
            LoadCache();	
	
				function FormLoad(){
					$scope.item.tglMaintenance = moment($scope.now).format('DD-MM-YYYY');
					modelItemAkuntansi.getDataDummyPHP("pasien/get-produk-combos", true, true, 10).then(function(data) {
	                     $scope.listproduk= data;
	               	});
	               	modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-pegawai-all", true, true, 20).then(function(data) {
		                $scope.listPegawai=data;
		            });
					managePhp.getData("ip3rs/get-ruangan-ip3rs?", true).then(function (dat) {
						$scope.listRuanganTujuan = dat.data.daftar
					});
				}
				
				function LoadCache(){				
	                var chacePeriode = cacheHelper.get('JadwalMaintenanceIP3RSCtrl');
	                if(chacePeriode != undefined){

	                   norecJadwal = chacePeriode[0]
	                   IdJadwal = chacePeriode[1]

	                   init()
	                   var chacePeriode ={ 0 : '' ,
	                        1 : '',
	                        2 : '',
	                        3 : '', 
	                        4 : '',
	                        5 : '',
	                        6 : ''
	                    }
	                    cacheHelper.set('JadwalMaintenanceIP3RSCtrl', chacePeriode);
	               }else{
	               	
	               		init();
	               
	               }
	            }


	            function init(){				
				if (IdJadwal != '') {
			   		if (IdJadwal == 'EditJadwal') {
			   			modelItemAkuntansi.getDataTableTransaksi("ip3rs/get-detail-jawdalmaintenance?norecOrder="+norecJadwal, true).then(function(data_ih){                            
                            $scope.isRouteLoading=false;
                            var dataik=[];
                            var data_head = data_ih.head[0];
                            var data_detail = data_ih.detail;
                            var data_petugas = data_ih.petugas;
                            Norec = data_head.norec;
                            $scope.item.noMaintenance=data_head.idmaintenance;
                            $scope.item.tglMaintenance=moment(data_head.jadwalmaintenanse).format('DD-MM-YYYY');
                            tglReal = moment(data_head.jadwalmaintenanse).format('YYYY-MM-DD HH:mm');
                            $scope.item.ruanganTujuan={id:data_head.objectruanganfk,namaruangan:data_head.namaruangan};
                            $scope.item.deskPenanganan=data_head.keterangan
   							data2 =data_detail;
                            var no=0
                            for (var i = 0; i < data2.length; i++) {
                                data2[i].no = i+1
                            }

                            $scope.dataGrid = new kendo.data.DataSource({
                             	data:data2
                            })

                            for (var i = 0; i < data_petugas.length; i++) {
                            	 var dataTemp ={ 
									"pegawai": { id : data_petugas[i].objectpegawaifk,namalengkap : data_petugas[i].namalengkap  }
								}
								dataik.push(dataTemp);
                   
                            }

			                $scope.GridPegawai = { 
								toolbar : [ {
											    name: "tambah",
								                text: "Tambah Pegawai",
							              		template: '<button class="k-button k-button-icontext" ng-click="tambahPegawai()">Tambah Pegawai</button>'	 
											},
											"save",								
										  ],
								pageable: true,
								columns: 
										[
											{
												field:"pegawai",
												title:"Pegawai",
												width:200,
												editor: $scope.dropDownPegawai, 
												template: "#=pegawai.namalengkap#"
											}
										],
								editable: true
							};
                
                            $scope.dataPegawai = new kendo.data.DataSource({
								pageSize: 10,
								data: dataik,
								schema: {
									model: {
										fields: {
											pegawai: { defaultValue: { id: null, namalengkap: "--Pilih Pegawai"}}
										}
									}
								}
						    });

                           $scope.dataPegawai = new kendo.data.DataSource({
                                pageSize: 10,
                                data: dataik
                            });

                        });
			   		}
				}        

			};

				$scope.dropDownPegawai = function(container, options) {
					var editor = $('<input kendo-combo-box required k-data-text-field="\'namalengkap\'" k-data-value-field="\'id\'" k-filter="\'contains\'" k-data-source="listPegawai" data-bind="value:' + options.field + '"/>')
					.appendTo(container);
				};
				$scope.dataPegawai = new kendo.data.DataSource({
					pageSize: 10,
					data: [],
					schema: {
						model: {
							fields: {
								pegawai: { defaultValue: { id: null, namalengkap: "--Pilih Pegawai"}}
							}
						}
					}
			    });
				$scope.GridPegawai = { 
					toolbar : [ {
								    name: "tambah",
					                text: "Tambah Pegawai",
				              		template: '<button class="k-button k-button-icontext" ng-click="tambahPegawai()">Tambah Pegawai</button>'	 
								},
								"save",								
							  ],
					pageable: true,
					columns: 
							[
								{
									field:"pegawai",
									title:"Pegawai",
									width:200,
									editor: $scope.dropDownPegawai, 
									template: "#=pegawai.namalengkap#"
								}
							],
					editable: true
				};

				$scope.tambahPegawai = function () {
					$("#kendoGrid").data("kendoGrid").addRow();
					// init();
				};

		        $scope.$watch('item.noRegisterAset', function(newValue, oldValue) {
		        	if (newValue != oldValue) {
		        		$scope.listRegisterAset =[]
		        		for (var i = $scope.listNoRegisterAset.length - 1; i >= 0; i--) {
			        		if ($scope.listNoRegisterAset[i].noregisteraset == newValue.noregisteraset) {
			        			$scope.listRegisterAset.push($scope.listNoRegisterAset[i])
			        		}
		        		}
		        	}		        	
		        });

		        $scope.$watch('item.registerAset', function(newValue, oldValue) {
		        	if (newValue != oldValue) {
		        		$scope.item.idProduk = $scope.item.registerAset.produkid;		        		
		        	}		        
		        });

		        // DATAGRID
		        $scope.columnGrid = {
		        	columns:[
				        {
				            "field": "no",
				            "title": "No",
				            "width" : "30px",
				        },
				        {
				            "field": "idproduk",
				            "title": "Id Produk",
				            "width" : "70px",
				        },
				        {
				            "field": "noregisteraset",
				            "title": "No Register Aset",
				            "width" : "60px",
				        },
				        {
				            "field": "namaproduk",
				            "title": "Nama Aset",
				            "width" : "100px",
				        },
				        {
				            "field": "keterangan",
				            "title": "Keterangan",
				            "width" : "120px",
				        }
		        	],
		        	toolbar: [
		                {
		                    "name": "add",
		                    "text": "Tambah",
		                    "template": '<a ng-click="onClick()" class="k-button k-button-icontext k-grid-upload">Tambah</a>'	
		                },
		                {
		                    "name": "del",
		                    "text": "Hapus",
		                    "template": '<a ng-click="hapus()" class="k-button k-button-icontext k-grid-upload">Hapus</a>'	
		                }
                	]
			    }
			    
			        // END DATAGRID
			    $scope.onClick = function(){
                	if ($scope.item.ruanganTujuan == "") {
                		alert("Ruangan Tujuan belum dipilih")
                		return
                	}
                	if ($scope.item.ruanganTujuan == undefined) {
                		alert("Ruangan Tujuan belum dipilih")
                		return
                	}
                	if ($scope.item.ruanganTujuan != undefined) {
                		$scope.winDialog.center().open();
                		managePhp.getData("ip3rs/get-aset-ip3rs?"+
                		"ruanganTujuan=" + $scope.item.ruanganTujuan.id, true).then(function (dat) {
						$scope.listNoRegisterAset = dat.data.daftar
					});
                	}
            	}

            	$scope.batal = function(){
                	$scope.winDialog.center().close();
            	}

            	$scope.tambah = function () {
	        		if ($scope.item.noRegisterAset == undefined) {
		                alert("No Register Aset harus di isi!")
		                return;
		            }
		            if ($scope.item.noRegisterAset == "") {
		                alert("No Register Aset harus di isi!")
		                return;
		            }
		            if ($scope.item.registerAset == undefined) {
		                alert("Nama Register Aset harus di isi!")
		                return;
		            }
		            if ($scope.item.registerAset == "") {
		                alert("Nama Register Aset harus di isi!")
		                return;
		            }
		            var nomor = $scope.item.noUrut
		            if ($scope.dataGrid2 == undefined) {
		                nomor = 1
		            }else{
		                nomor = data2.length+1
		            }

		            var data ={};
		            if ($scope.item.noUrut != undefined){
		                for (var i = data2.length - 1; i >= 0; i--) {
		                    if (data2[i].no ==  $scope.item.noUrut){
		                       data.no = nomor
		                       data.idproduk = $scope.item.idProduk
		                       data.noregisteraset = $scope.item.noRegisterAset.noregisteraset
		                       data.namaproduk = $scope.item.registerAset.namaproduk
		                       data.keterangan = $scope.item.keterangan

		                        data2[i] = data;
		                        $scope.dataGrid2 = new kendo.data.DataSource({
		                            data: data2
		                        });
		                    }
		                }

		            }else{
		                data={
		                       no:nomor,
		                       idproduk:$scope.item.idProduk,
		                       noregisteraset:String($scope.item.noRegisterAset.noregisteraset),
		                       namaproduk:String($scope.item.registerAset.namaproduk),
		                       keterangan:String($scope.item.keterangan)	                       
		                    }
		                data2.push(data)
		                $scope.dataGrid = new kendo.data.DataSource({
		                    data: data2
		                });
		            }
		            // $scope.clear()
		            Hapusah()
		            $scope.winDialog.close();
				}
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
        		// SIMPAN
        		$scope.simpan=function(){
        			var petugasMaintenance = []
					$scope.dataPegawai._data.forEach(function (data) {
						var dataTemp ={ 
							"pegawaifk": data.pegawai.id,
							"namalengkap": data.pegawai.namalengkap
						}
						petugasMaintenance.push(dataTemp);
					});
        	
        			if ($scope.item.ruanganTujuan == undefined) {
        				toastr.warning('Maaf Ruangan Tidak Boleh Kosong, Peringatan!');
        				return;
        			}

        			if ($scope.item.deskPenanganan == undefined) {
        				toastr.warning('Keterangan Maintenance tidak boleh kosong');
        				return;
        			}

        			if (data2.length == 0) {
        				toastr.warning('Pilih Aset Yang Akan Dimaintenance tidak boleh kosong');
        				return;
        			}

        			if (petugasMaintenance.length == 0) {
        				toastr.warning('Pilih Petugas Maintenance tidak boleh kosong');
        				return;
        			}

        			if (tglReal == undefined) {
        				tglReal = moment($scope.item.tglMaintenance).format('YYYY-MM-DD HH:mm')
        			}

        			var objSave = {
        				 norec:Norec,
        				 tglmaintenance:tglReal,
        				 ruangan:$scope.item.ruanganTujuan.id,
        				 keteranganhead:$scope.item.deskPenanganan,        				 
		                 detail:data2,
		                 petugas:petugasMaintenance
	                 }
	                
	                managePhp.postJadwalMaintenace(objSave).then(function(e) {
	                	$scope.tombolSimpanVis = false;
	                	ClearAll();
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
                            // $scope.clear()
                            Hapusah()
                        }
                    }
                }
            	// END HAPUS

            	function Hapusah(){
            		$scope.item.noUrut = undefined
					$scope.item.idProduk = undefined
					$scope.item.registerAset = undefined
					$scope.item.noregisteraset = undefined
					$scope.item.keterangan = undefined
            	}

				$scope.batal = function () {
					// body...
					$scope.item.noUrut = undefined
					$scope.item.idProduk = undefined
					$scope.item.registerAset = undefined
					$scope.item.noregisteraset = undefined
					$scope.item.keterangan = undefined
					$scope.item.deskPenanganan = undefined
					$scope.item.ruanganTujuan = undefined
					$scope.item.tglMaintenance = moment($scope.now).format('DD-MM-YYYY');
					$scope.item.noMaintenance = undefined
					$scope.dataGrid = new kendo.data.DataSource({
						data:[]
					});
					$scope.GridPegawai = { 
						toolbar : [ {
									    name: "tambah",
						                text: "Tambah Pegawai",
					              		template: '<button class="k-button k-button-icontext" ng-click="tambahPegawai()">Tambah Pegawai</button>'	 
									},
									"save",								
								  ],
						pageable: true,
						columns: 
								[
									{
										field:"pegawai",
										title:"Pegawai",
										width:200,
										editor: $scope.dropDownPegawai, 
										template: "#=pegawai.namalengkap#"
									}
								],
						editable: true
					};
				}

				function ClearAll(){
					// body...
					$scope.item.noUrut = undefined
					$scope.item.idProduk = undefined
					$scope.item.registerAset = undefined
					$scope.item.noregisteraset = undefined
					$scope.item.keterangan = undefined
					$scope.item.deskPenanganan = undefined
					$scope.item.ruanganTujuan = undefined
					$scope.item.tglMaintenance = moment($scope.now).format('DD-MM-YYYY');
					$scope.item.noMaintenance = undefined
					$scope.dataGrid = new kendo.data.DataSource({
						data:[]
					});
					$scope.GridPegawai = { 
						toolbar : [ {
									    name: "tambah",
						                text: "Tambah Pegawai",
					              		template: '<button class="k-button k-button-icontext" ng-click="tambahPegawai()">Tambah Pegawai</button>'	 
									},
									"save",								
								  ],
						pageable: true,
						columns: 
								[
									{
										field:"pegawai",
										title:"Pegawai",
										width:200,
										editor: $scope.dropDownPegawai, 
										template: "#=pegawai.namalengkap#"
									}
								],
						editable: true
					};
				}


		}
	]);
});
