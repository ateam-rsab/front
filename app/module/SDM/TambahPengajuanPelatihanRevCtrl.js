define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('TambahPengajuanPelatihanRevCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm','ModelItemAkuntansi','CacheHelper','ManageServicePhp','DateHelper',
		function($rootScope, $scope, ModelItem, $state, ManageSdm, modelItemAkuntansi, cacheHelper, manageServicePhp, dateHelper ) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.isRouteLoading=false;
			$scope.now = new Date();
			var norecPlanning ='';
			var norecMonitoring='';
			var norecmonitoringDetail='';
			var noOrder='';
            var norecAgenda='';
			var data2=[];
            var data4=[];
			$scope.item.UnitKerjaId = undefined;
			$scope.item.UnitKerja = undefined;
			$scope.item.no = undefined;
			loadDataCombo();
			LoadCache();

			function loadDataCombo(){
				$scope.item.KapasitasPeserta = 5;
				$scope.item.tanggalAwal=moment($scope.now).format('YYYY-MM-DD HH:mm'),
				$scope.item.tanggalAkhir=moment($scope.now).format('YYYY-MM-DD HH:mm'),
				$scope.item.tanggalAgenda=moment($scope.now).format('YYYY-MM-DD HH:mm'),
				modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-pegawai-all", true, true, 20).then(function(data) {
	                $scope.listPegawai=data;
	            });

	            modelItemAkuntansi.getDataTableTransaksi("sdm-pelatihan/get-combo-pelatihan?", true).then(function(dat){
	            	var dataLogin = dat.datalogin[0];
	            	$scope.listSumberDana=dat.asalproduk;
	            	$scope.listJenisPelatihan=dat.jenispelatihan;
	            	$scope.listNarasumber=dat.narasumber;
	            	$scope.listRuangan=dat.ruanganpelatihan
	            	$scope.item.Ruangan={id: dat.ruanganpelatihan[0].id, namaruangan: dat.ruanganpelatihan[0].namaruangan}
	            	$scope.item.UnitKerjaId = dataLogin.objectunitkerjapegawaifk;
					$scope.item.UnitKerja = dataLogin.unitkerjapegawai;
	            });
		    }

			function LoadCache(){
               var chacePeriode = cacheHelper.get('TambahPengajuanPelatihanRevCtrl');
                if(chacePeriode != undefined){

                   norecPlanning = chacePeriode[0]
                   noOrder = chacePeriode[1]

                   init()
                   var chacePeriode ={ 0 : '' ,
                        1 : '',
                        2 : '',
                        3 : '', 
                        4 : '',
                        5 : '',
                        6 : ''
                    }
                    cacheHelper.set('TambahPengajuanPelatihanRevCtrl', chacePeriode);
               }else{
               	
               		init();
               
               }
           }

            function ClearAll(){
                $scope.item = {}; 
                $scope.dataGrid_1=undefined;
                $scope.item.KapasitasPeserta = 5;       
            }


            function init(){				
				if (noOrder != '') {
			   		if (noOrder == 'EditPengajuan') {
			   			manageServicePhp.getDataTableTransaksi("sdm-pelatihan/get-detail-pengajuan-pelatihan?norecOrder="+norecPlanning, true).then(function(data_ih){
                            $scope.isRouteLoading=false;
                            var data_head = data_ih.data.head[0];
                            $scope.item.namaPaketPelatihan = data_head.namaplanning;
                            $scope.item.penyelenggara = data_head.deskripsiplanning;
                            $scope.item.tanggalAwal = data_head.tglsiklusawal
                            $scope.item.tanggalAkhir = data_head.tglsiklusakhir
                            $scope.item.SumberDana = {id:data_head.asalprodukfk,asalproduk:data_head.asalproduk}
                            $scope.item.jenisPelatihan = {id:data_head.jenispelatihanfk,jenispelatihan:data_head.jenispelatihan}
                            norecAgenda = data_head.norecagenda;
                            norecMonitoring = data_head.norecmonitoring;
                            norecmonitoringDetail =  data_head.norecmonitoringdetail;
                            $scope.item.Narasumber1 = {id:data_head.narasumberfk,namalengkap:data_head.narasumber}                          
                            $scope.item.alasan = data_head.keteranganlainnya
                            $scope.item.TempatPelatihan =data_head.tempat
                            var dataik=[];
                            data4 = data_ih.data.detail
                            data2 = data_ih.data.agenda
                            var no=0
                            for (var i = 0; i < data2.length; i++) {
                                data2[i].no = i+1
                            }
                            for (var i = 0; i < data4.length; i++) {
                            	 var dataTemp ={ 
									"peserta": { id : data4[i].id,namalengkap : data4[i].namalengkap  }
								}
								dataik.push(dataTemp);
                   
                            }
                
                           $scope.dataGrid_1 = new kendo.data.DataSource({
								pageSize: 10,
								data: dataik,
								schema: {
									model: {
										fields: {
											peserta: { defaultValue: { id: null, namalengkap: "--Pilih Pegawai"}}
										}
									}
								}
						    });

                           $scope.dataGrid_2 = new kendo.data.DataSource({
                                pageSize: 10,
                                data: data2
                            });

                        });
			   		}
				}        

			};
						
			$scope.dropDownPegawai = function(container, options) {
				var editor = $('<input kendo-combo-box required k-data-text-field="\'namalengkap\'" k-data-value-field="\'id\'" k-filter="\'contains\'" k-data-source="listPegawai" data-bind="value:' + options.field + '"/>')
				.appendTo(container);
			};
			$scope.dataGrid_1 = new kendo.data.DataSource({
				pageSize: 10,
				data: [],
				schema: {
					model: {
						fields: {
							peserta: { defaultValue: { id: null, namalengkap: "--Pilih Pegawai"}}
						}
					}
				}
		    });

            $scope.mainGridOptions_1 = { 
				toolbar : [ {
							    name: "tambah",
				                text: "Tambah Peserta",
			              		template: '<button class="k-button k-button-icontext" ng-click="cekPeserta()">Tambah Peserta</button>'	 
							}, 
							"save"
						  ],
				pageable: true,
				columns: 
						[
							{
								field:"peserta",
								title:"Peserta",
								width:200,
								editor: $scope.dropDownPegawai, 
								template: "#=peserta.namalengkap#"
							}
						],
				editable: true
			};

			$scope.cekPeserta = function () {
				if ($scope.dataGrid_1._data.length >= parseFloat($scope.item.KapasitasPeserta)) {
					window.messageContainer.error('Kapasitas Peserta Sudah Penuh')
				} else {
					$("#kendoGrid").data("kendoGrid").addRow();
					init();
				}
			};

			$scope.mainGridOptions_2 = { 
				toolbar: [
                    {
                        name: "Tambah",
                        template: '<button ng-click="addJPL()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah</button>'
                    },
                    {
						name: "Hapus",
						template: '<button ng-click="delJPL()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-download"></span>Hapus</button>'
                    },
     //                {
					// 	name: "Batal",
					// 	template: '<button ng-click="batalJPL()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-cancel"></span>Batal</button>'
					// },
                ],
				pageable: true,
				editable: false,
				columns: [
				{ field:"no",title:"No",width:60 },
				{ field:"tanggalagenda",title:"Tanggal",width:100 },
				{ field:"sesi",title:"Sesi",width:150 },
				{ field:"keterangan",title:"Keterangan",width:200 },
				{ field:"jpl",title:"JPL",width:150 }]
			};

            $scope.delJPL = function(e){
            	if ($scope.dataSelected == undefined) {
                    alert("Data Belum Dipilih!")
                    return;
                };
                for (var i = data2.length - 1; i >= 0; i--) {
	                if (data2[i].no ==  $scope.dataSelected.no){                            	                    
	                    data2.splice(i, 1);	                    
	                    $scope.dataGrid_2 = new kendo.data.DataSource({
	                        data: data2
	                    });
                	}
                }
            	
            }

			$scope.addJPL = function () {
				if ($scope.item.tanggalAgenda == undefined) {
                    alert("Tanggal Kegiatan Tidak Boleh Kosong!!")
                    return
                }

                if ($scope.item.Sesi == undefined) {
                    alert("Sesi Kegiatan Tidak Boleh Kosong!!")
                    return
                }

                if ($scope.item.Keterangan == undefined) {
                    alert("Keterangan Tidak Boleh Kosong!!")
                    return
                }

				// if ($scope.item.Narasumber == undefined) {
    //                 alert("Pilih Narasumber Terlebih Dahulu!!")
    //                 return
    //             }

                if (moment($scope.item.tanggalAgenda).format('YYYY-MM-DD') > moment($scope.item.tanggalAkhir).format('YYYY-MM-DD')) {
                    alert("Tanggal Kegiatan Tidak Boleh Lebih Dari Tanggal Akhir Pelatihan!!")
                    return
                }

                // if (moment($scope.item.tanggalAwal).format('YYYY-MM-DD') < moment($scope.item.tanggalAgenda).format('YYYY-MM-DD')) {
                //     alert("Tanggal Kegiatan Tidak Boleh Lebih Dari Tanggal Akhir Pelatihan!!")
                //     return
                // }

                var nomor =0
	            if (data2 == undefined) {
	                nomor = 1
	            }else{
	                nomor = data2.length+1
	            }

                var data = {
                	"no": nomor,
                    "tanggalagenda": moment($scope.item.tanggalAgenda).format('YYYY-MM-DD HH:mm'),
                    "sesi":$scope.item.Sesi,
                    "keterangan": $scope.item.Keterangan,
                    "jpl": $scope.item.JPL
                    // "narasumberfk": $scope.item.Narasumber.id,
                    // "narasumber": $scope.item.Narasumber.namalengkap
                }
                data2.push(data)
                $scope.dataGrid_2 = new kendo.data.DataSource({
                    data: data2
                });
                Clear()
                // $scope.dataGrid_2.add(data)
            }

            function Clear(){
                $scope.item.tanggalAgenda = moment($scope.now).format('YYYY-MM-DD HH:mm');
                $scope.item.Sesi = undefined;  
                $scope.item.Keterangan = undefined;
                $scope.item.Narasumber = undefined;                    
            }

			$scope.simpan = function () {
				var tanggal = $scope.now;
                var TglAwal = new Date($scope.item.tanggalAwal);
                var umurzz = dateHelper.CountAge(TglAwal, tanggal);
                var range = umurzz.day 
                var range1 = umurzz.month 
                var sebulan = 30;
                var sebulan1 = 1;
				if ($scope.item.namaPaketPelatihan == undefined) {
                    alert("Nama Paket Pelatihan Tidak Boleh Kosong!!")
                    return
                }
                if ($scope.item.Ruangan == undefined) {
                    alert("Penyelenggara harus diisi!!")
                    return
                }
				if ($scope.item.SumberDana == undefined) {
                    alert("Pilih Sumber Dana Terlebih Dahulu!!")
                    return
                }
                if ($scope.item.jenisPelatihan == undefined) {
                    alert("Pilih Jenis Pelatihan Terlebih Dahulu!!")
                    return
                }
                if ($scope.item.Narasumber1 == undefined) {
                    alert("Pilih Narasumber Terlebih Dahulu!!")
                    return
                }
                if ($scope.item.alasan == undefined) {
                    alert("Alasan Belum Diisi!!")
                    return
                }
                if ($scope.item.TempatPelatihan == undefined) {
                    alert("Tempat Pelatihan Belum Diisi!!")
                    return
                }
                if ($scope.dataGrid_1 == undefined) {
                    alert("pegawai Harus Diisi!!")
                    return
                }
                if (parseFloat(range1) < parseFloat(sebulan1)) {
                    alert("pengajuan minimal 30 hari sebelum pelatihan!!")
                    return
                }

				var permintaanPelatihanDetail = []
				$scope.dataGrid_1._data.forEach(function (data) {
					var dataTemp ={ 
						"pegawaifk": data.peserta.id,
						"namalengkap": data.peserta.namalengkap
					}
					permintaanPelatihanDetail.push(dataTemp);
				});
				var strukplanning = {
                    norecagenda: norecAgenda,
                    norecnoplanning: norecPlanning,
                    norecmonitoring: norecMonitoring,
                    norecmonitoringdetail: norecmonitoringDetail,
                    namaplanning: $scope.item.namaPaketPelatihan,
                    deskripsiplanning: $scope.item.Ruangan.namaruangan, //$scope.item.penyelenggara,
                    objectruanganfk:  $scope.item.Ruangan.id,
                    jenispelatihan: $scope.item.jenisPelatihan.id,
                    tglpelatihanawal: moment($scope.item.tanggalAwal).format('YYYY-MM-DD HH:mm:ss'),
                    tglpelatihanakhir: moment($scope.item.tanggalAkhir).format('YYYY-MM-DD HH:mm:ss'),
                    tglpengajuan: moment($scope.now).format('YYYY-MM-DD HH:mm:ss'),
                    asalproduk: $scope.item.SumberDana.id,            
                    alasan: $scope.item.alasan,
                    tempat: $scope.item.TempatPelatihan,                    
                    unitkerjapegawifk: $scope.item.UnitKerjaId,
                    narasumber: $scope.item.Narasumber1.id
                   
                }
                var objSave = 
                {
                    strukplanning:strukplanning,
                    details:permintaanPelatihanDetail,
                    detailagenda:data2
                }
				
				manageServicePhp.savepengajuanpelatihan(objSave).then(function(e) {
                   ClearAll();
                });
			}

			$scope.batal = function () {
				ClearAll();
			}

		}
	]);
});