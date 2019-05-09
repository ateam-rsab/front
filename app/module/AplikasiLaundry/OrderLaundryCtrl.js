define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('OrderLaundryCtrl', ['$rootScope', '$scope', 'ModelItem','FindSarpras','ManageSarpras','DateHelper',
		function($rootScope, $scope, ModelItem, FindSarpras, ManageSarpras, dateHelper) {
			ModelItem.get("Laundry/MappingCycle").then(function(data) {
			//$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			$scope.item = {};
			$scope.batal = function(){
				$state.go('home');
			}

		    $scope.no=1;
		    $scope.formatRupiah = function(value, currency) {
			  return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
			}

			$scope.noOrderr = function(){
				ManageSarpras.getOrderList("laundry/generate-no-struk", true).then(function(dat) {
					$scope.listnomesin=dat.data.data;
                	$scope.item.nomorOrder=dat.data.data.noStruk;
           		 });	
            }
            $scope.noOrderr();

		   FindSarpras.getSarpras("laundry/get-produk-penerimaan-linen-external").then(function(dat){
		   $scope.sourceLinen = dat.data.data;
		   });

		   FindSarpras.getSarpras("psrsPermintaanPerbaikan/get-user-login", true).then(function(dat){
				$scope.item.namaOrder = dat.data.namaPegawai;
			});

		   FindSarpras.getSarpras("psrsPermintaanPerbaikan/get-ruangan-by-user-login", true).then(function(dat){
				$scope.item.ruangan = dat.data.namaRuangan;
				$scope.item.idRuangan = dat.data.id;
			});

			 $scope.caritotal = function ()  {
				var a = $scope.item.jumlahOrder;
				var b = $scope.item.biayaSave;
				var c = a*b;
				var parseTotalUang = $scope.formatRupiah(c,'Rp.');
				$scope.item.total = parseTotalUang;
				$scope.item.totalSave = c;		
			}

            FindSarpras.getSarpras("mapping-cycle/find-nama-bahan/").then(function(dat){
            	$scope.sourceMasterProduk= dat.data;
            });
			FindSarpras.getSarpras("service/list-generic/?view=SatuanStandar&select=id,satuanStandar").then(function(dat){
				$scope.sourceMasterSatuan= dat;
			});

			FindSarpras.getSarpras("laundry/get-satuan-potong").then(function(dat){
			$scope.sourceSatuan = dat.data.data;
			});

		    FindSarpras.getSarpras("laundry/get-all-satuan").then(function(dat){
			$scope.sourceSatuanStandar = dat.data.data;
			});

		    $scope.satuanBahan = function() {
				if($scope.item.namaProduk != undefined){
				var HargaSatuan = $scope.item.namaProduk.hargaSatuan;
				$scope.item.biayaSave = $scope.item.namaProduk.hargaSatuan;
				var parseHargauang = $scope.formatRupiah(HargaSatuan,'Rp.');
				$scope.item.biaya = parseHargauang; 
				}
			};

			 $scope.addDataOrderLaundry = function() {
			 	debugger
				var tempDataPenerimaanLinen = {
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

				$scope.daftarorderlaundry.add(tempDataPenerimaanLinen);
				$scope.item.namaProduk="",
				$scope.item.jumlah="",
				$scope.item.jumlahOrder="",
				$scope.item.total="",
				$scope.item.satuanpotong="",
				$scope.item.biaya = "",
				$scope.item.namaProduk=undefined			
			}

			$scope.removeDataBahanLinen= function(e) {
				e.preventDefault();
				var grid = this;
				var viewDataCurrent = grid.dataItem(grid.tbody.find(">tr"));
				var row = $(e.currentTarget).closest("tr");
				$scope.tempDataPenerimaanLinen = $scope.daftarorderlaundry
				.filter(function(el){
					return el.name !== grid[0].name;
				});
				grid.removeRow(row);
			};

			$scope.daftarorderlaundry = new kendo.data.DataSource({
				data: []
			});
			$scope.columndaftarorderlaundry = [
			{
				"field": "no",
				"title": "<h3 align=center>No</h3>",
				"width": "30px"
			}, {
				"field": "namaLinen",
				"title": "<h3 align=center>Nama Linen<h3>",
				"width": "200px"
			}, {
				"field": "jumlah",
				"title": "<h3 align=center>Jumlah Order<h3>",
				"width": "100px"
			}, {
				"field": "satuan",
				"title": "<h3 align=center>Satuan<h3>",
				"width": "100px"
			},
			{
				command: { 
					text: "Hapus",
					width:"70px", 
					align:"center", 
					click: $scope.removeDataBahanLinen 
				},
				title: "<h3 align=center>Action</h3>",
				width: "80px"
			}];




			$scope.Save = function(){
				debugger
			$scope.dataTempLinen = [];
				var data2 = $scope.daftarorderlaundry._data;
				data2.forEach(function(data){
				debugger
					var dataLinen = {
						"produkId" : data.produkid,
						"namaProduk" : data.namaLinen,
						"jumlah" : data.jumlah,
						"satuanId" : data.satuanid,
						"namaSatuan" : data.satuan,
						"tglTerima" : dateHelper.formatDate($scope.item.tanggalTerima,"YYYY-MM-DD")

					}
					$scope.dataTempLinen.push(dataLinen);
				})
				var data1 = {
								"noStruk" : $scope.item.nomorOrder,
								"tglTerima" : dateHelper.formatDate($scope.item.tanggalTerima,"YYYY-MM-DD"),
								"tglOrder": dateHelper.formatDate($scope.item.tanggalPemesanan,"YYYY-MM-DD"),
								"berat": $scope.item.berat,
								"satuanId": $scope.item.satuanBesar.id,
								"namaSatuan": $scope.item.satuanBesar.satuanStandar,
								"produkLinens": $scope.dataTempLinen 
						     }
			    console.log(JSON.stringify(data1));
			   ManageSarpras.saveSarpras(data1,"laundry/save-order-linen-internal").then(function(e) {
                $scope.item = {};
            	});
			}
           }
         ]);
  });



/*	========================================== SOURCE DARA OLD ==========================================		

			$scope.Save = function(){
			debugger
				$scope.item.idRuangan;
				$scope.item.idPemesan = 7;
				debugger
				var dat = $scope.daftarorderlaundry._data;
				console.log(JSON.stringify(dat));
				var i=0;
				var mapLinen = [];
				dat.forEach(function(data){
					debugger
				var data ={
						
						"namaLinen":{
							"id" : data.produkid
						},
						"jumlah" : parseInt(data.jumlah),
						"satuan":{
							"id" : data.satuanid
						}
					}
					mapLinen[i] =data;
					i++;
				})
				var data = {
					"ruanganPemesan": 
					{
						"id": $scope.item.idRuangan
						
					},
					"namaPemesan": 
					{
						"id": $scope.item.idPemesan
					},
					"nomorOrder": $scope.item.nomorOrder,
					"tanggalPemesanan": $scope.item.tanggalPemesanan,

					"mapLinen": mapLinen
					
				}
            		console.log(JSON.stringify(data));
            		ManageSarpras.saveSarpras(data,"order-laundry/save/").then(function(e) {
            			$scope.item = {};
            	});
            	};*/
 
 /*=====================================COLUMN OLD DATA================================================ */

 /*			{
				"field": "hargaSatuan",
				"title": "<h3 align=center>Harga Satuan<h3>",
				"width": "100px",
				"template": "{{formatRupiah('#: hargaSatuan #', 'Rp.')}}"		
			},*/ 
/*			{
				"field": "total",
				"title": "<h3 align=center>Total<h3>",
				"width": "100px",
				"template": "{{formatRupiah('#: total #', 'Rp.')}}"		
			},  */