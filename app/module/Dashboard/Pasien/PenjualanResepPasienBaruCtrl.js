define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('PenjualanResepPasienBaruCtrl', ['$mdDialog', '$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','FindPasien','ManagePasien', '$window', '$timeout',
		function($mdDialog, $rootScope, $scope,$state, ModelItem, dateHelper,findPasien, ManagePasien, $window, $timeout){
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.tanggalPelayanan = new Date($scope.now);
			$scope.item.tanggalResep = new Date($scope.now);
			// $scope.item.tglResep = new Date($scope.now);
			$scope.item.totalHarusDibayar = 0;
			var listObat = []

			$scope.formatRupiah = function(value, currency, pageVerifikasi) {
				var ret = "";

				if(value != ""){
					ret = currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
					ret = ret.substring(0, ret.length-3);

				}
			    else{
			    	if(pageVerifikasi)
			    		ret = "";
			    	else
			    		ret = 0;
			    }

			    return ret; 
			};

			findPasien.getDokter().then(function(data) {
                $scope.listDokterPerujuk = data.data.data;
            });

			findPasien.getAllRuangan().then(function(data) {
                $scope.listRuangan = data.data.data;
            });
            findPasien.getPegawaiDokter().then(function(data) {
                $scope.listDokter = data.data.data;
            });

			findPasien.getJenisObat().then(function(data) {
                $scope.listJenisObat = data.data;
            });

			findPasien.getNamaObat().then(function(data) {
				debugger;
                $scope.listNamaObat = data.data;
            });

            findPasien.getAturanPakai().then(function(data) {
                $scope.listAturanPakai = data.data;
            });

			$scope.dataModelGrid = {};
			$scope.dataModelGrid.namaProduk = {};
			$scope.dataModelGrid.asalBarang = {};

			// $scope.dataBoundJenisKemasan = function (e) {
		 //        $(".tbd").parent().click(false);
		 //    };

		    $scope.dataBoundNamaObat = function (e) {
		        $(".tbd").parent().click(false);
		    };

			$scope.templateEffect =  
                "# if (data.hasChild) { #"+
                    "<span class='tbd' style='color: gray;'>#: data.reportDisplay #</span>"+
                "# } else { #"+
                    "<span>#: data.reportDisplay #</span>"+
                "# } #";
       

			$scope.dataSelectedRow = {};
			$scope.sourcePenjualanResepPasienBaru = new kendo.data.DataSource({
				data: [{id:1}],
				pageSize : 10
			});

						// debugger;
			$scope.mainGridOptions = {
                pageable: true,
                toolbar: "<button class='btnTemplate1' style='width:10%' ng-click='tambahTransaksi()'>Tambah Data</button>",
                editable : true,
                scrollable:false,
                columns: [{
					"field": "Rke",
					"title": "<h5 align=center>R/Ke</h5>",
					"width": "70px",
					"attributes": {align:"center"},
					"template": "<input c-text-box type='number' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].Rke'/>"
				}, {
					"field": "jenisObat",
					"title": "<h5 align=center>Jenis Obat</h5>",
					"width": "200px",
					"template": "<input style='width: 100%;' kendo-combo-box k-ng-model='dataModelGrid[#: id #].jenisObat' k-on-data-bound='dataBoundJenisKemasan()' k-data-text-field=\"'jenisKemasan'\" k-data-value-field=\"'id'\" k-filter=\"'contains'\" k-auto-bind=\"'false'\" k-data-source='listJenisObat' />"
				}, {
					"field": "namaBarang",
					"title": "<h5 align=center>Nama Barang</h5>",
					"width": "300px",
					"template": "<input style='width: 100%;'  kendo-combo-box k-ng-model='dataModelGrid[#: id #].namaProduk' k-on-data-bound='dataBoundNamaObat()' k-data-text-field=\"'reportDisplay'\" k-data-value-field=\"'id'\" k-filter=\"'contains'\" k-auto-bind=\"'false'\" k-data-source='listNamaObat' />"
				}, {
					"field": "asalBarang",
					"title": "<h5 align=center>Asal Barang</h5>",
					"width": "100px",
					"attributes": {align:"center"},
					"template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].namaProduk.asalProdukId' disabled/>"
				}, {
					"field": "hargaSatuan",
					"title": "<h5 align=center>Harga Satuan</h5>",
					"width": "100px",
					"attributes": {align:"center"},
					"template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].namaProduk.hargaNetto1' disabled/>"
				}, {
					"field": "stok",
					"title": "<h5 align=center>Stok</h5>",
					"width": "70px",
					"attributes": {align:"center"},
					"template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].namaProduk.qtyProduk' disabled/>"
				}, {
					"field": "jumlah",
					"title": "<h5 align=center>Jumlah</h5>",
					"width": "70px",
					"attributes": {align:"center"},
					"template": "<input c-text-box type='number' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].jumlah' ng-keypress='($event.which == 13)? total():dataModelGrid[#: id #].jumlah'/>"
				}, {
					"field": "totalHarga",
					"title": "<h5 align=center>Total Harga</h5>",
					"width": "100px",
					"attributes": {align:"center"},
					"template": "<input c-text-box type='number' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].totalHarga' disabled/>"
				}, {
					"field": "aturanPakai",
					"title": "<h5 align=center>Aturan Pakai</h5>",
					"width": "200px",
					"attributes": {align:"center"},
					"template": "<input style='width: 100%;' kendo-combo-box k-ng-model='dataModelGrid[#: id #].aturanPakai' k-on-data-bound='dataBoundJenisKemasan()' k-data-text-field=\"'name'\" k-data-value-field=\"'id'\" k-filter=\"'contains'\" k-auto-bind=\"'false'\" k-data-source='listAturanPakai' />"
				}, {
					"field": "keteranganPakai",
					"title": "<h5 align=center>Keterangan Pakai</h5>",
					"width": "200px",
					"attributes": {align:"center"},
					"template": "<input c-text-box type='input' filter='' class='k-textbox' ng-model='dataModelGrid[#: id #].keteranganPakai'/>"
				}, {
	                title: "<h5 align=center>Action</h5>",
	                width: "100px",
	              	template: "<button class='btnTemplate1' style='width:50%' ng-click='hapusTransaksi()'>Hapus</button>"
	            }]
		    };

		    var noID = 1;
	        $scope.tambahTransaksi = function(){
		    	var grid = $('#gridPenjualanResepPasienBaru').data("kendoGrid");
				
				noID += 1;

				$scope.dataModelGrid[noID] = {};

		    	grid.dataSource.add({
			      id: noID
			    });	
		    };

		    $scope.hapusTransaksi = function()
		    {
		    	if($scope.dataSelectedRow)
                {
                    if(this.dataItem.id != $scope.dataSelectedRow.id)
                    {
                        alert("Data Belum Dipilih !!!");
                    }
                    else
                    {
                    	var grid = $('#gridPenjualanResepPasienBaru').data("kendoGrid");
		    			grid.dataSource.remove($scope.dataSelectedRow);
		    			removeDataModelGrid(this.dataItem.id);
                    }
                }   
		    };

		    function removeDataModelGrid(id){
				if($scope.dataModelGrid[id]){
		    		delete $scope.dataModelGrid[id];
		    	}
		    	$scope.total();
		    };

		   
		    $scope.total=function(id){
		    	// var total = $scope.dataModelGrid[grid._data[i].id].totalHarga;
		    	var total = 0
				var grid = $('#gridPenjualanResepPasienBaru').data("kendoGrid");
				// listObat = [];
				for(var i=0; i<grid._data.length; i++){
					$scope.Harga = $scope.dataModelGrid[grid._data[i].id].namaProduk.hargaNetto1;
					$scope.jumlah = $scope.dataModelGrid[grid._data[i].id].jumlah;
					$scope.dataModelGrid[grid._data[i].id].totalHarga = $scope.Harga * $scope.jumlah;
					total = total +($scope.Harga * $scope.jumlah)
		    	}
		    	$scope.item.totalHarusDibayar = total;
		    	$scope.item.totalHarusDibayar2 = total;

		    };

		    $scope.totalHarusDibayar = function(){
		    	debugger;
		    	var total = $scope.item.totalHarusDibayar; 
		    	var grid = $('#gridPenjualanResepPasienBaru').data("kendoGrid");
		    	
		    	$scope.totalSementara = 0
		    	for(var i=0; i<grid._data.length; i++){
		    		$scope.totalSementara = $scope.dataModelGrid[grid._data[i].id].totalHarga;
		    		
		    	}
		    	var total = 0
		    	total = totalSementara + total;
		    	$scope.item.totalHarusDibayar.add(total);
		    }


			$scope.klik = function(r){
				console.log(JSON.stringify(r));
				$scope.current = r;
			};

			$scope.listLabelDokter = [
                {"id": 1, "name": "Dokter Penulis Resep"}
            ];

            $scope.ListRuangan = [
                {"id": 1, "name": "Ruangan Perawatan"}
            ];

            $scope.jumlahResep = [
                {"id": 1, "name": "Jumlah Resep"}
            ];

            $scope.disDokter = true;
            $scope.dokter = function(){
            	if($scope.item.dokter === true){
            		$scope.disDokter = false
            	}else{
            		$scope.disDokter = true
            	}
            };

            $scope.disRuangan = true;
            $scope.ruangan = function(){
            	if($scope.item.ruangan === true){
            		$scope.disRuangan = false
            	}else{
            		$scope.disRuangan = true
            	}
            };

            $scope.disJumlahResep = true;
            $scope.JumlahResep = function(){
            	if($scope.item.resep === true){
            		$scope.disJumlahResep = false
            	}else{
            		$scope.disJumlahResep = true
            	}
            };
            $scope.Save=function(){
            	var confirm = $mdDialog.confirm()
			          .title('Validasi')
			          .textContent('Apakah anda yakin akan menyimpan data ini?')
			          .ariaLabel('Lucky day')
			          .ok('Ya')
			          .cancel('Tidak')

			    $mdDialog.show(confirm).then(function() {
			    	$scope.Simpan();
            	})
            };
            
            $scope.Simpan = function(){
            	debugger;
            	var listRawRequired = [
					"item.namaPasien|ng-model|Nama Pasien",
					"item.jenisKelamin|k-ng-model|Jenis Kelamin",
					"item.umur|ng-model|umur",
					"item.alamat|ng-model|alamat",
					"item.noResep|ng-model|No Resep"
				];

				var isValid = ModelItem.setValidation($scope, listRawRequired);

				var grid = $('#gridPenjualanResepPasienBaru').data("kendoGrid");
				listObat = [];
				for(var i=0; i<grid._data.length; i++){
					listObat.push({
						"resepKe": $scope.dataModelGrid[grid._data[i].id].Rke,
						"kdjeniskemasan": {
							"id":  $scope.dataModelGrid[grid._data[i].id].jenisObat.id
						},
						"kdproduk": {
							"id" : $scope.dataModelGrid[grid._data[i].id].namaProduk.produkId
						},
						"qtyproduk": $scope.dataModelGrid[grid._data[i].id].jumlah,
						"hargasatuan": $scope.dataModelGrid[grid._data[i].id].namaProduk.hargaNetto1,
						"keteranganPakai": $scope.dataModelGrid[grid._data[i].id].aturanPakai.name
							// "resepKe": $scope.dataModelGrid[grid._data[i].id].Rke,
							// "jenisObat": {
							// 	"jenisKemasan": $scope.dataModelGrid[grid._data[i].id].jenisObat.jenisKemasan,
							// 	"id":  $scope.dataModelGrid[grid._data[i].id].jenisObat.id
							// },
							// "produk": {
							// 	"namaObat": $scope.dataModelGrid[grid._data[i].id].namaProduk.namaExternal,
							// 	"id" : $scope.dataModelGrid[grid._data[i].id].namaProduk.produkId
							// },
							// "stock": $scope.dataModelGrid[grid._data[i].id].namaProduk.qtyProduk,
							// "jumlah": $scope.dataModelGrid[grid._data[i].id].jumlah,
							// "hargaSatuan": $scope.dataModelGrid[grid._data[i].id].hargaSatuan,
							// "totalHarga": $scope.dataModelGrid[grid._data[i].id].totalHarga,
							// "keteranganPakai": {
							// 	"id": $scope.dataModelGrid[grid._data[i].id].aturanPakai.id
							
						})
		    	}

            	var TglOrder = dateHelper.getDateTimeFormatted($scope.item.tanggalPelayanan);
            	var TglResep = dateHelper.getDateTimeFormatted($scope.item.tanggalResep);
            	
            	if($scope.item.ruanganPerawatan === undefined){
            		$scope.idRuangan = "";
            		$scope.namaRuangan = "";
            	}else{
            		$scope.idRuangan = $scope.item.ruanganPerawatan.id;
            		$scope.namaRuangan = $scope.item.ruanganPerawatan.namaRuangan;
            	}
            
            	if($scope.item.dokterPerujuk === undefined){
            		$scope.idPerujuk = "";
            		$scope.namaPerujuk = "";
            	}else{
            		$scope.idPerujuk = $scope.item.dokterPerujuk.id;
            		$scope.namaPerujuk = $scope.item.dokterPerujuk.namaLengkap;
            	}
            	
				debugger;
				var data ={
					"pasien":{
						"namaPasien": $scope.item.namaPasien,
						"jenisKelamin": {
							"id": $scope.item.jenisKelamin.id
						},
						"alamat": $scope.item.alamat
					},
					"strukOrder": {
						"tglOrder": $scope.item.tanggalPelayanan,
						"ruanganTujuan": {
							"id": parseInt($scope.idRuangan)
						}
					},
					"strukResep": {
						"tglResep" : $scope.item.tanggalResep,
						"penulisResep" : {
							"id": parseInt($scope.idPerujuk)
						}
					}, 
					"strukPelayanan" : {
						"tglstruk" : $scope.item.tanggalPelayanan,
						"totalharusdibayar" : $scope.item.totalHarusDibayar2,
						"strukPelayananDetail": listObat
						}
				}
            	console.log(JSON.stringify(data));
            	if(isValid.status){
					ManagePasien.savePenjualanResepPasienBaru(data,"registrasi-pelayanan/save-pelayanan-obat-luar/?").then(function(e) {
						// $timeout(function () {
		    //                 $window.location.reload();
		    //           }, 3500);
					});
				}else {
					ModelItem.showMessages(isValid.messages);
				}
            };

            $scope.Batal = function(){
            	$scope.item.namaPasien="";
				$scope.jenisKelamin="";
				$scope.umur="";
				$scope.alamat="";
				$scope.noResep="";
            }

            $scope.ListJK=[
            	{
            		"id": 1,
            		"name": "Laki-Laki"
            	},
            	{
            		"id": 2,
            		"name": "Perempuan"
            	}
            ]
		}
	])
})