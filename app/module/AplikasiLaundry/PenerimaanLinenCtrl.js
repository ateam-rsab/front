define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenerimaanLinenCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageLaundry', 'FindLaundry', 'FindSarpras', '$timeout', '$window','$state',
		function($rootScope, $scope, ModelItem, DateHelper, ManageLaundry, FindLaundry, FindSarpras, $timeout, $window,$state) {
			$scope.item = {};
			ModelItem.get("Laundry/PenerimaanLinen").then(function(data) {
				$scope.item = data;
				// $scope.item.petugas = "admin";
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			$scope.now = new Date();

		    FindLaundry.getLaundry("psrsPermintaanPerbaikan/get-ruangan-by-user-login", true).then(function(dat){
				$scope.item.ruangan = dat.data.namaRuangan;
				$scope.item.idRuangan = dat.data.id;
			});

		    $scope.dataPenerimaanLinen = new kendo.data.DataSource({
				data: []
			});
			debugger
		    /*$scope.Norec = "2c90e3e56150489b01615062208e0008"*/
			$scope.Norec = $state.params.noRec;
			$scope.no=1;
			FindLaundry.getLaundry("laundry/get-order-laundry-sebelum-diterima-detail?noRec="+$scope.Norec).then(function(dat){
			  /*if($scope.sourceHeader != undefined){}*/
		    	$scope.sourceHeader = dat.data.header[0];
				$scope.item.yangMenyerahkan = $scope.sourceHeader.namaMenyerahkan;
				$scope.item.idMenyerahkan = $scope.sourceHeader.idMenyerahkan;
				$scope.item.noRecPelayanan = $scope.sourceHeader.noRec;

				$scope.item.nostruk = $scope.sourceHeader.nostruk;
				$scope.item.tglstruk = new moment(new Date($scope.sourceHeader.tglstruk)).format('YYYY-MM-DD');  
				$scope.item.tglterimakiriman = new moment(new Date($scope.sourceHeader.tglterimakiriman)).format('YYYY-MM-DD');
				$scope.item.keterangan = $scope.sourceHeader.ket;
				$scope.item.yangMenerima = {yangMenerima :$scope.sourceHeader.namaPenerima,
											idPenerima : $scope.sourceHeader.idPenerima
											};
				$scope.item.berat = $scope.sourceHeader.qtyproduk;
				$scope.item.satuan = {
					"id" : 52,
					"satuanStandar" : "Kg"
				}
				$scope.sourceDetail = dat.data.detail;
				$scope.sourceDetail.forEach(function(dataDetailTemp){
					debugger
					var tempDataPenerimaanLinen = {
						"no": $scope.no++,
						"idProduk" : dataDetailTemp.idProduk,
						"namaExternal" : dataDetailTemp.namaExternal,
						"idSatuan" : dataDetailTemp.idSatuan,
						"jumlah" : dataDetailTemp.qtyProduk,
						"satuan" : dataDetailTemp.satuan,
						"noRecStrukPelayanan": dataDetailTemp.noRecStrukPelayanan,
                        "noRec": dataDetailTemp.noRec
					 }
				   $scope.dataPenerimaanLinen.add(tempDataPenerimaanLinen);
				})
			});

			$scope.listPegawai;

			FindSarpras.getSarpras("service/list-generic/?view=Pegawai&select=id,namaExternal").then(function(dat) {
                $scope.listDataPegawai = dat.data;
            });


			FindLaundry.getLaundry("laundry/get-all-satuan").then(function(dat){
				$scope.sourceSatuanStandar = dat.data.data;
			});

			FindLaundry.getLaundry("user/get-all-user/").then(function(dat){
				$scope.sourceUser = dat.data.data.kelompokUser;
			});
			FindLaundry.getLaundry("user/get-user").then(function(dat){
				$scope.item.petugas = dat.data.data.namaUser;
				$scope.item.petugasx = dat.data.data.id;
				 debugger;
			});
			
			ManageLaundry.getOrderList("laundry/generate-no-struk", true).then(function(dat) {
				$scope.listnomesin=dat.data.data;
                $scope.item.noterima=dat.data.data.noStruk;
            });

			$scope.sourcePetugas = [
				{
					"id": "1",
					"petugas": "admin"
				}
			];

			$scope.reset = function(){
				$scope.item.ruangan = "";
				$scope.item.berat = "";
				$scope.item.satuan = "";
			}

			$scope.batal = function(){
				$state.go('home')
			}
			
			
			 $scope.mainGridOptions = {
				pageable:true,
				change:onChange,
				pageSize:10,
				selectable:'row',
				scrollable:true,
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
                columns: [{
                    "field": "namaExternal",
                    "title": "Nama Bahan"	,
				    "width": "200px",
					"filterable":false		
				}, {
                    "field": "satuan",
                    "title": "Satuan",
                    "width": "90px",
					"filterable":false		
                    	
				},{
                    "field": "jumlah",
                    "title": "Jumlah",
                    "width": "50px",
					"filterable":false		
                  
				}, {
		       command: { 
		        	text: "Hapus",
		        	width:"50px", 
	        	align:"center",
				attributes: {align:"center"},
		       	click: $scope.removeDataPenerimaanLinen 
	        	},
		        title: "Action",
		       width: "80px"
                }],
                pageable: true,
                sortable: false,
                selectable: "row",
                editable: "popup"
            };


            $scope.kembali = function(){
            debugger
            	$state.go('RevDaftarPemesananLaundry');
            }
			
			
			  var onChange = function(e) {
                //var inputId = this.element.attr("id");
              //  console.log(inputId);
                var grid = $(this).data("mainGridOptions");

            }
				
			$scope.addDataPenerimaanLinen = function() {
				// var tgl = DateHelper.getTanggalFormatted($scope.item.tanggal);
					var tempDataPenerimaanLinen = {
						"noterima" : $scope.item.noterima,
						"ruangan" : $scope.item.ruangan,
						"berat" : $scope.item.berat,
						"satuan" : $scope.item.satuan
					}
					$scope.dataPenerimaanLinen.add(tempDataPenerimaanLinen);
					$scope.item.ruangan="";
					$scope.item.berat="";
					$scope.item.satuan="";
					ManageLaundry.getOrderList("laundry/generate-no-struk", true).then(function(dat) {
					
					$scope.listnomesin=dat.data.data;
	                $scope.item.noterima=dat.data.data.noStruk;
			    
	            });
			}

			$scope.removeDataPenerimaanLinen= function(e) {
				e.preventDefault();
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    $scope.tempDataPenerimaanLinen = $scope.dataPenerimaanLinen
			    .filter(function(el){
			    	return el.name !== grid[0].name;
			    });
			    grid.removeRow(row);
			};

			$scope.Save = function(){
				$scope.dataSourceData = $scope.dataPenerimaanLinen._data;
				$scope.ProdukLinenx = [];
				$scope.dataSourceData.forEach(function(dataTempSourceData){
					debugger
			     var produkLinens = {
						noRecStrukPelayananDetail : dataTempSourceData.noRecStrukPelayanan,
						produkId : dataTempSourceData.idProduk,
						namaProduk : dataTempSourceData.namaExternal,
						jumlah : dataTempSourceData.jumlah,
						satuanId : dataTempSourceData.idSatuan,
						namaSatuan : dataTempSourceData.satuan,
						tglTerima : $scope.item.tglterimakiriman
					}
				$scope.ProdukLinenx.push(produkLinens)
				})

			 var data = {
						"noRecStrukPelayanan" : $scope.item.noRecPelayanan,
						"noStruk" : $scope.item.nostruk,
						"tglOrder": $scope.item.tglstruk,
						"tglTerima" : $scope.item.tglterimakiriman,
						"pegawaiOrderId": $scope.item.idMenyerahkan ,
						"ruanganAsalId":$scope.item.idRuangan,
						"berat": $scope.item.berat,
						"satuanId": $scope.item.satuan.id,
						"namaSatuan": $scope.item.satuan.satuanStandar,
						"produkLinens": $scope.ProdukLinenx
						}

			   ManageLaundry.saveSarpras(data, "laundry/save-penerimaan-linen-internal").then(function(e) {
			   	$scope.item = {};
				});
			}

		}
	]);
});



/*======================================================== SOURCE OLD ===============================================================			


$scope.Save=function()
			{
				var dat = $scope.dataPenerimaanLinen._data;
				
				var i=0;
				var mapPenerimaanLinen = [];
				dat.forEach(function(data){
					var data ={
						"noStruk" : data.noterima,
						"namaRuangan" : data.ruangan.namaRuangan,
						"noRecStrukPelayanan" : "",
						"ruanganId" : data.ruangan.ruanganId,
						"berat"     : data.berat,
						"satuanId"  : data.satuan.id,
						"namaSatuan" : data.satuan.satuanStandar,
						"tglTerima" :  moment($scope.item.tanggalPenerimaan).format("YYYY-MM-DD hh:mm:ss"),
						"petugasId" : $scope.item.petugasx,
						"namaPetugas":$scope.item.petugas
					}
					mapPenerimaanLinen[i] =data;
					i++;
				})
				ManageLaundry.saveSarpras(mapPenerimaanLinen, "laundry/save-penerimaan-linen").then(function(e) {
					    $timeout(function () {
                            $window.location.reload();
                        }, 5500);
				});

			};*/




		//================================================= SOURCE OLD PENERIMAAN LINEN =============================================	
		//$scope.columndataPenerimaanLinen = [{
		//		"field": "ruangan.namaRuangan",
		//		"title": "<h3 align=center>Nomor Terima<h3>",
		//		"width": "300px"
		//	},{
		//		"field": "ruangan.namaRuangan",
		//		"title": "<h3 align=center>Ruangan<h3>",
		//		"width": "300px"
		//	}, {
		//		"field": "berat",
		//		"title": "<h3 align=center>Berat<h3>",
		//		"width": "100px",
		//		"attributes": {align:"center"}
		//	}, {
		//		"field": "satuan.satuanStandar",
		//		"title": "<h3 align=center>Satuan<h3>",
		//		"width": "100px",
		//		"attributes": {align:"center"}
		//	}, {
		//       command: { 
		//        	text: "Hapus",
		//        	width:"50px", 
		//        	align:"center",
		//			attributes: {align:"center"},
		//        	click: $scope.removeDataPenerimaanLinen 
		//        	},
		//        title: "<h3 align=center>Action</h3>",
		//        width: "80px"
		//	}];


	/*	$scope.mainGridOptions = {
				pageable:true,
				change:onChange,
				pageSize:10,
				selectable:'row',
				scrollable:true,
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
                columns: [{
                    "field": "noterima",
                    "title": "Nomor Terima"	,
				    "width": "200px",
					"filterable":false		
				}, {
                    "field": "ruangan.namaRuangan",
                    "title": "Ruangan",
					"filterable":false		
                  
				}, {
                    "field": "berat",
                    "title": "Berat",
					"filterable":false		
                    	
				}, {
                    "field": "satuan.satuanStandar",
                    "title": "Satuan",
					"filterable":false		
                }, {
		       command: { 
		        	text: "Hapus",
		        	width:"50px", 
	        	align:"center",
				attributes: {align:"center"},
		       	click: $scope.removeDataPenerimaanLinen 
	        	},
		        title: "Action",
		       width: "80px"
                }],
                pageable: true,
                sortable: false,
                selectable: "row",
                editable: "popup"
            };
			*/


						// FindLaundry.getRuangan("/penerimaan-linen/find-ruang-loundry/").then(function(dat){
			// 	$scope.sourceRuangan = dat.data.data;
			// 	// debugger;
			// });
			/*	var tempDataPenerimaanLinen = {
					"no": $scope.no++,
					"namaLinen" : $scope.item.namaProduk.namaProduk,
					"jumlah" : $scope.item.jumlahOrder,
					"satuan" : $scope.item.satuanpotong.satuanStandar,
					"satuanid" : $scope.item.satuanpotong.id,
					"biaya"  : $scope.item.biayaSave,
					"produkid" :$scope.item.namaProduk.id,
					"hargaSatuan" : $scope.item.biayaSave,
					"total" : $scope.item.totalSave
				}
			$scope.daftarorderlaundry.add(tempDataPenerimaanLinen);*/
 
 /*			FindLaundry.getLaundry("laundry/get-all-ruangan").then(function(dat){
				$scope.sourceRuangan = dat.data.data;
			});
*/