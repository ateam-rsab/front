define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('DaftarPemesananPasienCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', '$interval', 'DateHelper', 'ManageGizi', 'FindPasienGizi', 'ManagePasien', 'FindPasien', '$mdDialog',
		function($rootScope, $scope,$state, ModelItem , $interval, DateHelper, ManageGizi, FindPasienGizi, ManagePasien, findPasien, $mdDialog){
			$scope.item = {};
			$scope.now = new Date();
			$scope.item.tglCariAwal=$scope.now;
			$scope.item.tglCariAkhir=$scope.now;
			$scope.dataPost=[];
			$scope.CycleLoad = false;
			$scope.dataLoad = false;
			$scope.produkId = "";
			$scope.showAlert = function(ev) {
                $mdDialog.show(
                  $mdDialog.alert()
                    .parent(angular.element(document.querySelector('#popupContainer')))
                    .clickOutsideToClose(false)
                    .title('Data Belum Diverifikasi')
                    .textContent('Status masih MENUNGGU harap Verfikasi terlebih dahulu')
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK')
                    .targetEvent(ev)
                );
              };

          // hardcord waktu makan   
         $scope.listJenisWaktu = [
         {
         	jenisWaktu:"Pagi"
         },
         {
         	jenisWaktu:"Siang"
         },
         {
         	jenisWaktu:"Sore"
         }]

             // Combo Pencarian Ruangan
			FindPasienGizi.getGizi("service/list-generic/?view=Ruangan&select=id,namaRuangan").then(function(dat){
				$scope.Ruangan = dat;
			});		

			// Combo Pencarian Jenis Waktu
            FindPasienGizi.getGizi("service/list-generic/?view=JenisWaktu&select=id,jenisWaktu").then(function(dat){
				debugger
				$scope.SourceJenisWaktu = dat.data
			})
//========================================================Daftar Permintaan Makanan dan Minuman//========================================================

            // Cari Data Daftar Pemesanan Pasien
			$scope.findData = function(){
				$scope.CycleLoad = true;
                $scope.dataLoad = true;
				if($scope.item.ruangan===undefined){
					var ruanganId = "";
					var jenisWaktuId = "";
					var tglCariAwal = DateHelper.getDateTimeFormattedNew($scope.item.tglCariAwal);
					var tglCariAkhir = DateHelper.getDateTimeFormattedNew($scope.item.tglCariAkhir);
				}else{
					var ruanganId = $scope.item.ruangan.id;
					var jenisWaktuId = $scope.item.jenisWaktu.id;
					var tglCariAwal = DateHelper.getDateTimeFormattedNew($scope.item.tglCariAwal);
					var tglCariAkhir = DateHelper.getDateTimeFormattedNew($scope.item.tglCariAkhir);
				}
				
				// Data Source Untuk Makanan start
				FindPasienGizi.getDataOrderMakananGiziByRuangan(ruanganId,jenisWaktuId,tglCariAwal,tglCariAkhir).then(function(dat){
					$scope.sourceDataOrderMakananGizi = new kendo.data.DataSource({
						pageSize: 10,
						data: dat.data.data.list,
						group: {field: "namaPasien"}
					})
					$scope.modifikasi = dat.data.data.list;
					$scope.dataTemp = [];
					$scope.dataPesananMenunggu = [];
					var dataGrid = "";
					/*$scope.modifikasi.forEach(function(data){
						if (data.status == "MENUNGGU") {
							$scope.dataPesananMenunggu.push(data);
						}
					});*/
					for(var i = 0; i<$scope.modifikasi.length; i++){
						if($scope.modifikasi[i].status == "MENUNGGU"){
							$scope.dataPesananMenunggu.push(data);
						}
					}
					if ($scope.dataPesananMenunggu.length >= 1) {
						$scope.dataPesananMenunggu.forEach(function(data){
							if (data.namaPasien != dataGrid) {
								$scope.dataTemp.push(data);
								dataGrid = data.namaPasien;
							}
						});
						for(var x = 0; $scope.dataPesananMenunggu.length; x++){
							if($scope.dataPesananMenunggu[x].namaPasien != dataGrid){
								$scope.dataTemp.push(data);
							}
						}
					} else {
						$scope.modifikasi.forEach(function(data){
							if (data.namaPasien != dataGrid) {
								$scope.dataTemp.push(data);
								dataGrid = data.namaPasien;
							}
						});
						$scope.dataTemp;
					}
										
				   $scope.getDataTable1_1 = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataTemp
					})

					$scope.getDataTable1_2 = new kendo.data.DataSource({
						pageSize: 10,
						data: dat.data.data.list,
						serverPaging: true,
                        serverSorting: true,
                        serverFiltering: true
					})
					var data = [];
					for (var key in dat.data.data.list) {
						if (dat.data.data.list.hasOwnProperty(key)) {
							var element = dat.data.data.list[key];
							if (element.status === 'MENUNGGU') {
								element.myStyle = { 'background-color': '#FF0000' };
								element.status = "MENUNGGU";
							} else if (element.status === 'Pemesanan Bahan') {
								element.myStyle = { 'background-color': '#FFFC38' };
								element.status = "Pemesanan Bahan";
							} else if (element.status === 'Produksi') {
								element.myStyle = { 'background-color': '#33e46a' };
								element.status = "Produksi";
							} else if (element.status === 'Kirim Menu') {
								element.myStyle = { 'background-color': '#89c9f7' };
								element.status = "Kirim Semua Menu";
							}
							data.push(element);
						}
					}
				});


				// Data Source Untuk Minuman dan Lainnya
				FindPasienGizi.getDataOrderMinumanGiziByRuangan(ruanganId,jenisWaktuId,tglCariAwal,tglCariAkhir).then(function(dat){
					$scope.sourceDataOrderMinumanGizi = new kendo.data.DataSource({
						pageSize: 10,
						data: dat.data.data.list
					})
					$scope.modifikasiMinuman = dat.data.data.list;
					$scope.dataTempMinuman = [];
					$scope.dataPesananMenungguMinuman = [];
					var dataGridMinuman = "";
					$scope.modifikasiMinuman.forEach(function(data){
						if (data.status == "MENUNGGU") {
							$scope.dataPesananMenungguMinuman.push(data);
						}
					});
					if ($scope.dataPesananMenungguMinuman.length >= 1) {
						$scope.dataPesananMenungguMinuman.forEach(function(data){
							if (data.namaPasien != dataGridMinuman) {
								$scope.dataTempMinuman.push(data);
								dataGridMinuman = data.namaPasien;
							}
						});
					} else {
						$scope.modifikasiMinuman.forEach(function(data){
							if (data.namaPasien != dataGridMinuman) {
								$scope.dataTempMinuman.push(data);
								dataGridMinuman = data.namaPasien;
							}
						});
					}
					
					$scope.getDataTable2_1 = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataTempMinuman
					})
					$scope.getDataTable2_2 = new kendo.data.DataSource({
						pageSize: 10,
						data: dat.data.data.list,
						serverPaging: true,
                        serverSorting: true,
                        serverFiltering: true
					})
					var data = [];
					for (var key in dat.data.data.list) {
						if (dat.data.data.list.hasOwnProperty(key)) {
							var element = dat.data.data.list[key];
							if (element.statusAntrian === undefined) {
								element.myStyle = { 'background-color': '#FF0000' };
								element.statusAntrian = "Menunggu";
							} else if (element.statusAntrian === 'Pemesanan Bahan') {
								element.myStyle = { 'background-color': '#FFFC38' };
								element.statusAntrian = "Pemesanan Bahan";
							} else if (element.statusAntrian === 'Produksi') {
								element.myStyle = { 'background-color': '#33e46a' };
								element.statusAntrian = "Produksi";
							} else if (element.statusAntrian === 'Kirim Menu') {
								element.myStyle = { 'background-color': '#89c9f7' };
								element.statusAntrian = "Kirim Semua Menu";
							}
							data.push(element);
						}
					}
				   $scope.CycleLoad = false;
                   $scope.dataLoad = false;
				});

				$scope.getMinutes = function(str) {
					var time = str.split(':');
					return time[0]*60+time[1]*1;
				};
				$scope.getMinutesNow = function() {
					var timeNow = new Date();
					return timeNow.getHours()*60+timeNow.getMinutes();
				};

				if($scope.item.ruangan != undefined){
				  $scope.getKirimMenuMakanan();	
				}
				
			}
			$scope.findData();



			// SET MAINGRID Daftar Permintaan Makanan
			$scope.mainGridOptions_1_1 = {
				pageable: true,
				scrollable: false,
				shortable: true,
				dataBound: function() {
		            var data = this.dataSource.view();
		            for(var i=0; i<data.length; i++){
			            if(data[i].status == "MENUNGGU"){
			                var row = this.tbody.find("tr[data-uid='"+data[i].uid+"']");
			                /*data[i].set("LastName", true);*/ //if the field is boolean and the column contains a checkbox it will be checked
			                row.css("background-color", "red");
			                //this.expandRow(row).first();
			            }
		            }
		        },
				columns: [
				{
	         		width: "50px",
	         		title:  "<center><input id='detailSelectAll' type='checkbox' title='Select all' ng-click='selectAllPesananPasien($event)' />",
	         		template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='selectPesananPasien($event)' </div>"
	         	},
	         	{
					"field": "noCm",
					"title": "<h3 align=center>No.CM<h3>",
					"width": "100px"
				}, {
					"field": "namaPasien",
					"title": "<h3 align=center>Nama Pasien<h3>",
					"width": "300px",
				}, {
					"field": "jenisKelamin",
					"title": "<h3 align=center>Jenis Kelamin<h3>",
					"width": "100px"
				}, {
					"field": "namaKelas",
					"title": "<h3 align=center>Kelas<h3>",
					"width": "100px"
				}, {
					"field": "umur",
					"title": "<h3 align=center>Umur<h3>",
					"width": "150px"
				}, {
					"field": "namaRuangan",
					"title": "<h3 align=center>Nama Ruangan<h3>",
					"width": "200px"
				}, {
					"field": "alergis",
					"title": "<h3 align=center>Alergi<h3>",
					"width": "200px"
				}, {
					"field": "diagnosis",
					"title": "<h3 align=center>Diagnosis<h3>",
					"width": "200px"
				}
				]
			};


			// SET Detail MAINGRID Daftar Permintaan Makanan
			$scope.mainGridOptions_1_2 = function(dataItem) {
                return {
                	dataSource: {
                        data: $scope.modifikasi,
                        pageSize: 5,
                        filter: { field: "namaPasien", operator: "eq", value: dataItem.namaPasien }
                    },
					pageable: true,
					scrollable: true,
					shortable: true,
					columns: [
					{
						width: "50px",
						title:  "<center><input type='checkbox' title='Select all' ng-click='toggleSelectAll($event)' />",
						template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='selectRow(dataItem)' </div>"
					},
					{
						"field": "namaPasien",
						"title": "<h3 align=center>Nama Pasien<h3>",
						"width": "300px",
						hidden: true
					}, 
					{
						"field": "jenisDiet",
						"title": "<h3 align=center>Jenis Diet<h3>",
						filterable: false,
						"width": "120px"
					}, {
						"field": "namaBentukProduk",
						"title": "<h3 align=center>Tipe Makanan<h3>",
						filterable: false,
						"width": "120px"
					}, {
						"field": "jenisWaktu",
						"title": "<h3 align=center>Waktu Makan<h3>",
						filterable: false,
						"width": "100px"
					}, {
						"field": "namaProduk",
						"title": "<h3 align=center>Nama Menu Makanan<h3>",
						filterable: false,
						"width": "250px"
					}, {
						"field": "jumlah",
						"title": "<h3 align=center>Jumlah<h3>",
						filterable: false,
						"width": "70px"
					}, {
						"field": "dokter",
						"title": "<h3 align=center>Nama Petugas Pemesan<h3>",
						filterable: false,
						"width": "250px"
					}, {
						"field": "flag",
						"title": "<h3 align=center>Menu<h3>",
						filterable: false,
						"width": "100px"
					}, {
						"field": "status",
						"title": "<h3 align=center>Status<h3>",
						filterable: false,
						"width": "120px"
					}
					]
				}
			};


			// SET MAINGRID Daftar Permintaan Minuman
			$scope.mainGridOptions_2_1 = {
				pageable: true,
				scrollable: false,
				shortable: true,
				dataBound: function() {
		            var data = this.dataSource.view();
		            for(var i=0; i<data.length; i++){
			            if(data[i].status == "MENUNGGU"){
			                var row = this.tbody.find("tr[data-uid='"+data[i].uid+"']");
			                /*data[i].set("LastName", true);*/ //if the field is boolean and the column contains a checkbox it will be checked
			                row.css("background-color", "red");
			                //this.expandRow(row).first();
			            }
		            }
		        },
				columns: [
				{
	         		width: "50px",
	         		title:  "<center><input id='detailSelectAll' type='checkbox' title='Select all' ng-click='selectAllPesananPasien($event)' />",
	         		template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='selectPesananPasien($event)' </div>"
	         	},	{
					"field": "noCm",
					"title": "<h3 align=center>No.CM<h3>",
					"width": "100px"
				}, {
					"field": "namaPasien",
					"title": "<h3 align=center>Nama Pasien<h3>",
					"width": "300px",
				}, {
					"field": "jenisKelamin",
					"title": "<h3 align=center>Jenis Kelamin<h3>",
					"width": "100px"
				}, {
					"field": "namaKelas",
					"title": "<h3 align=center>Kelas<h3>",
					"width": "100px"
				}, {
					"field": "umur",
					"title": "<h3 align=center>Umur<h3>",
					"width": "150px"
				}, {
					"field": "namaRuangan",
					"title": "<h3 align=center>Nama Ruangan<h3>",
					"width": "200px"
				}, {
					"field": "alergi",
					"title": "<h3 align=center>Alergi<h3>",
					"width": "200px"
				}, {
					"field": "diagnosis",
					"title": "<h3 align=center>Diagnosis<h3>",
					"width": "200px"
				}
				]
			};

			// SET MAINGRID Detail Daftar Permintaan Minuman
			$scope.mainGridOptions_2_2 = function(dataItem) {
                return {
                	dataSource: {
                        data: $scope.modifikasiMinuman,
                        pageSize: 5,
                        filter: { field: "namaPasien", operator: "eq", value: dataItem.namaPasien }
                    },
					pageable: true,
					scrollable: true,
					shortable: true,
					columns: [
					{
						width: "50px",
						title:  "<center><input type='checkbox' title='Select all' ng-click='toggleSelectAll($event)' />",
						template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='selectRow(dataItem)' </div>"
					},
					{
						"field": "namaPasien",
						"title": "<h3 align=center>Nama Pasien<h3>",
						"width": "300px",
						hidden: true
					}, {
						"field": "jenisDiet",
						"title": "<h3 align=center>Jenis Diet<h3>",
						filterable: false,
						"width": "120px"
					}, {
						"field": "namaBentukProduk",
						"title": "<h3 align=center>Tipe Makanan<h3>",
						filterable: false,
						"width": "120px"
					}, {
						"field": "jenisWaktu",
						"title": "<h3 align=center>Waktu Makan<h3>",
						filterable: false,
						"width": "100px"
					}, {
						"field": "namaProduk",
						"title": "<h3 align=center>Nama Menu Makanan<h3>",
						filterable: false,
						"width": "250px"
					}, {
						"field": "jumlah",
						"title": "<h3 align=center>Jumlah<h3>",
						filterable: false,
						"width": "70px"
					}, {
						"field": "dokter",
						"title": "<h3 align=center>Nama Petugas Pemesan<h3>",
						filterable: false,
						"width": "250px"
					}, {
						"field": "flag",
						"title": "<h3 align=center>Menu<h3>",
						filterable: false,
						"width": "100px"
					}, {
						"field": "status",
						"title": "<h3 align=center>Status<h3>",
						filterable: false,
						"width": "120px"
					}
					]
				}
			};

		 //Select Semua Data
		  $scope.selectAllPesananPasien = function(ev) {
				var data = $scope.modifikasi;
				var dataPasien = $scope.getDataTable1_1._data;
				dataPasien.forEach(function(item){
					item.selected = ev.target.checked;
				});
				data.forEach(function(item){
					item.selected = ev.target.checked;
					if (item.selected == true) {
						$scope.selectRow(item);
					} else {
						$scope.selectRow(item);
					}
				});
			};

		//select 1 Group
		$scope.selectPesananPasien = function(ev) {
				var namaPasien = this.dataItem.namaPasien;
				var data = $scope.modifikasi;
				data.forEach(function(item){
					if (item.namaPasien == namaPasien) {
						item.selected = ev.target.checked;
						if (item.selected == true) {
							$scope.selectRow(item);
						} else {
							$scope.selectRow(item);
						}
					}
				});
			};


		$scope.toggleSelectAll = function(ev) {
				var grids = $('#kGrid').data("kendoGrid");
				var grid = $(ev.target).closest("[kendo-grid]").data("kendoGrid");
				var items = grid.dataSource.data();
				items.forEach(function(item){
					item.selected = ev.target.checked;
					if (item.selected == true) {
						$scope.selectRow(item);
					} else {
						$scope.selectRow(item);
					}
					
				});
			};
			
			
		
	       //selectRow Detail
			$scope.selectRow = function(dataItem)
			{
				var dataObj = {
					produkId : dataItem.produkId,
					jenisWaktuId : dataItem.jenisWaktuId,
					noRecOrder : dataItem.noRecOrder,
					status : dataItem.status
				}
				$scope.produkId = dataObj.produkId;

				var isExist = _.find($scope.dataPost, function(dataExist){ 
					if (
					dataExist.produkId == dataObj.produkId &&
					dataExist.jenisWaktuId == dataObj.jenisWaktuId &&
					dataExist.noRecOrder == dataObj.noRecOrder &&
					dataExist.status == dataObj.status) {
						return true;
					} else {
						return undefined;
					}
				});

				if(isExist == undefined)
				{
					$scope.dataPost.push(dataObj);
				}
				else
				{
					$scope.dataPost =  _.without($scope.dataPost, _.findWhere($scope.dataPost, {
						produkId: dataObj.produkId,
						jenisWaktuId: dataObj.jenisWaktuId,
						noRecOrder: dataObj.noRecOrder,
						status : dataItem.status
					}));
				}
			};

	       
//======================================================END Daftar Permintaan Makanan dan Minuman//=========================================//









//=========================================================Daftar Stok Produksi===============================================================//

			//On Cari Menu dan menampilkan daftar grid
		   $scope.cariProduksi = function () {
		   	$scope.numbProduksi = 1;
	        	findPasien.getItem("registrasi-pelayanan/get-produk-produksi-gizi?menu="+$scope.item.menuProduksi.menu).then(function(dat){
		        	$scope.dataCariProduksi = dat.data.data;
		        	$scope.dataCariProduksi.forEach(function(e){
		        		e.no = $scope.numbProduksi++;
		        	})
		        	$scope.dataGridProduksi = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataCariProduksi
					});
		        });
	        }

	        // refresh
	        $scope.clearProduksi = function () {
	        	$scope.ClearNumb = 1;
	        	findPasien.getItem("registrasi-pelayanan/get-produk-produksi-gizi").then(function(dat){
		        	$scope.data_produksi = dat.data.data;
		        	$scope.data_produksi.forEach(function(e){
		        		e.no = $scope.ClearNumb++;
		        	})
		        	$scope.dataGridProduksi = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.data_produksi
					});
		        });
	        }
	        $scope.clearProduksi();

	        //datasource Daftar stok
	        $scope.daftarStokGrid = { 
	        	pageable: true,
				columns: [
				{ field:"no",title:"<h3 align=center>No.<h3>",width:20 },
				{ field:"menu",title:"<h3 align=center>Nama Menu<h3>",width:300 },
				{ field:"jumlah",title:"<h3 align=center>Jumlah Stok<h3>",width:100 }],
				editable: false
			};

//=========================================================End Daftar Stok Produksi===============================================================//




















//=========================================================KIRIM MENU=====================================================================//

		// On Change Kirim Menu Makanan From Ruangan
		 $scope.getKirimMenuMakanan = function () {
		 	debugger
					var ruanganId = $scope.item.ruangan.kirimMenu.id;
					findPasien.getItem("registrasi-pelayanan/get-kirim-menu-gizi-makanan/?ruanganId="+ruanganId).then(function(dat){
						$scope.listData = dat.data.data.list;
						$scope.dataTempKirimMenu = [];
						var dataGrid = "";
						$scope.listData.forEach(function(data){

							if (data.namaPasien != dataGrid) {
								$scope.dataTempKirimMenu.push(data);
								dataGrid = data.namaPasien;
							}
						});
						$scope.sourceDataKirimMenuMakanan_1 = new kendo.data.DataSource({
							pageSize: 10,
							data: $scope.dataTempKirimMenu
						})
					});
				}


			// Dafar Kirim Menu Makanan
		    $scope.getDataTable3 = function () {
					findPasien.getItem("registrasi-pelayanan/get-kirim-menu-gizi-makanan/?ruanganId=").then(function(dat){
						$scope.listData = dat.data.data.list;
						$scope.kirimMenuMakanan = dat.data.data.list;
						$scope.kirimMenuMakananNew = []
						$scope.kirimMenuMakanan.forEach(function(data){
							if (data.status == "PRODUKSI" || data.status == "KIRIM_MENU"){
								$scope.kirimMenuMakananNew.push(data);
							}
						});
						$scope.dataTempKirimMenu = [];
						var dataGrid = "";
						$scope.kirimMenuMakananNew.forEach(function(data){

							if (data.namaPasien != dataGrid) {
								$scope.dataTempKirimMenu.push(data);
								dataGrid = data.namaPasien;
							}
						});
						$scope.sourceDataKirimMenuMakanan_1 = new kendo.data.DataSource({
							pageSize: 10,
							data: $scope.dataTempKirimMenu
						})
						
					});
				}
				$scope.getDataTable3();


			// On Change Kirim Minuman From Ruangan
		   $scope.getKirimMenuMinuman = function () {
		   	$scope.noMinuman = 1;
					var ruanganId = $scope.item.ruangan.kirimMenu.id;
					findPasien.getItem("registrasi-pelayanan/get-kirim-menu-gizi-minuman/?ruanganId="+ruanganId).then(function(dat){
						$scope.listData = dat.data.data.list;
						$scope.dataTempKirimMenuMinuman = [];
						var dataGrid = "";
						$scope.listData.forEach(function(data){

							if (data.namaPasien != dataGrid) {
								data.no = $scope.noMinuman++;
								$scope.dataTempKirimMenuMinuman.push(data);
								dataGrid = data.namaPasien;
							}
						});
						$scope.sourceDataKirimMenuMinuman_1 = new kendo.data.DataSource({
							pageSize: 10,
							data: $scope.dataTempKirimMenuMinuman
						})
				});
			}

			// Daftar Kirim Minuman
			$scope.getDataTable4 = function () {
				$scope.noMinuman2 = 1;
					findPasien.getItem("registrasi-pelayanan/get-kirim-menu-gizi-minuman/?ruanganId=").then(function(dat){
						$scope.listData = dat.data.data.list;
						$scope.kirimMenuMinumanNew = dat.data.data.list;
						$scope.dataTempKirimMenuMinuman = [];
						var dataGrid = "";
						$scope.listData.forEach(function(data){

							if (data.namaPasien != dataGrid) {
								data.no = $scope.noMinuman2++;
								$scope.dataTempKirimMenuMinuman.push(data);
								dataGrid = data.namaPasien;
							}
						});
						$scope.sourceDataKirimMenuMinuman_1 = new kendo.data.DataSource({
							pageSize: 10,
							data: $scope.dataTempKirimMenuMinuman
						})
						
					});
		     }
		    $scope.getDataTable4();


		   // Button Kirim Menu
		  $scope.kirimMenu = function () {
         	$scope.getNoRecProduk();
         	var data = {
		         	"orderPelayanans" : $scope.noRecProduk
		         }
		    console.log(JSON.stringify(data));
		    var jumlahKirimMenu = [];
		    $scope.statusKirimMenu.forEach(function(data) {
		    	if(data.status == "KIRIM_MENU"){
		    		jumlahKirimMenu.push({"name":"KIRIM_MENU"})
		    	}
		    })
		    if(jumlahKirimMenu == 0){
		    	findPasien.saveDataItem(data, "registrasi-pelayanan/save-kirim-menu").then(function(dat){
	         		$scope.getDataTable3();
					$scope.getDataTable4();
					$scope.clearProduksi();
				});
		    } else {
		    	window.messageContainer.error('Menu Sudah Di Kirim')
		    }
          }


         // Button Kirim Minuman
         $scope.kirimMenuMinuman = function () {
         	$scope.getNoRecProdukMinuman();
         	var data = {
		         	"orderPelayanans" : $scope.noRecProduk
		         }
         	findPasien.saveDataItem(data, "registrasi-pelayanan/save-kirim-menu").then(function(dat){
         		console.log(JSON.stringify(dat.$scope.noRecProduk));
			});
         }

         // Set Maingrid For Kirim Menu Makanan		
        $scope.mainGridOptions_3_1 = {
         	pageable: true,
         	scrollable:true,
         	sortable: false,
         	filterable: {
         		extra: false,
         		operators: {
         			string: {
         				startswith: "Starts with"
         			}
         		}
         	},
         	columns: [
         	{
         		width: "50px",
         		title:  "<center><input id='detailSelectAll' type='checkbox' title='Select all' ng-click='toggleSelectAllData($event)' />",
         		template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='selectDataPasien($event)' </div>"
         	},
         	{
         		"field": "namaPasien",
         		"width": "90%",
         		"title": "<h3 align=center>Nama Pasien<h3>",
         		filterable: false
         	}
         	]
         };

         $scope.selectDataPasien = function(ev) {
			var namaPasien = this.dataItem.namaPasien;
			var data = $scope.kirimMenuMakananNew;
			data.forEach(function(item){
				if (item.namaPasien == namaPasien) {
					item.selected = ev.target.checked;
					if (item.selected == true) {
						$scope.selectRowMakanan(item);
					} else {
						$scope.selectRowMakanan(item);
					}
				}
			});
		};

         // Set Maingrid detail For Kirim Menu Makanan	
         $scope.mainGridOptions_3_2 = function(dataItem) {
                return {
                	dataSource: {
                        data: $scope.kirimMenuMakananNew,
                        pageSize: 5,
                        filter: { field: "namaPasien", operator: "eq", value: dataItem.namaPasien }
                    },
					pageable: true,
					scrollable: true,
					shortable: true,
					filterable: {
		         		extra: false,
		         		operators: {
		         			string: {
		         				startswith: "Starts with"
		         			}
		         		}
		         	},
					columns: [
		         	{
		         		width: "50px",
		         		title:  "<center><input type='checkbox' title='Select all' ng-click='toggleSelectAll($event)'  />",
		         		template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='selectRowMakanan(dataItem)' </div>",
		         		filterable: false
		         	},
		         	{
		         		"field": "jenisDiet",
		         		"title": "Tipe Makanan",
		         		"width": "100px",
		         		filterable: false
		         	}, 
		         	{
		         		"field": "namaProduk",
		         		"title": "Menu Makanan",
		         		"width": "300px",
		         		filterable: false
		         	}, 
		         	{
		         		"field": "jenisWaktu",
		         		"title": "Waktu Makan",
		         		"width": "100px",	
		         	}, 
		         	{
		         		"field": "status",
		         		"title": "Status",
		         		"width": "100px",
		         		filterable: false
		         	}
		         	]
				}
			};

	    $scope.toggleSelectAllData = function(ev) {
			var data = $scope.kirimMenuMakananNew;
			var dataPasien = $scope.sourceDataKirimMenuMakanan_1._data;
			dataPasien.forEach(function(item){
				item.selected = ev.target.checked;
			});
			data.forEach(function(item){
				item.selected = ev.target.checked;
				if (item.selected == true) {
					$scope.selectRowMakanan(item);
				} else {
					$scope.selectRowMakanan(item);
				}
			});
		};
       

        // Set Maingrid For Kirim Menu Minuman		
        $scope.mainGridOptions_4_1 = {
         	pageable: true,
         	scrollable:true,
         	sortable: false,
         	filterable: {
         		extra: false,
         		operators: {
         			string: {
         				startswith: "Starts with"
         			}
         		}
         	},
         	columns: [

         	{
         		"field": "no",
         		"width": "10%",
         		"title": "<h3 align=center>No.<h3>",
         		filterable: false
         	},         	
         	{
         		"field": "namaPasien",
         		"width": "90%",
         		"title": "<h3 align=center>Nama Pasien<h3>",
         		filterable: false
         	}
         	]
         };
         

         // Set Maingrid detail For Kirim Menu Minuman		
         $scope.mainGridOptions_4_2 = function(dataItem) {
                return {
                	dataSource: {
                        data: $scope.kirimMenuMinumanNew,
                        pageSize: 5,
                        filter: { field: "namaPasien", operator: "eq", value: dataItem.namaPasien }
                    },
					pageable: true,
					scrollable: true,
					shortable: true,
					filterable: {
		         		extra: false,
		         		operators: {
		         			string: {
		         				startswith: "Starts with"
		         			}
		         		}
		         	},
					columns: [
		         	{
		         		width: "50px",
		         		title:  "<center><input type='checkbox' title='Select all' ng-click='toggleSelectAll($event)' />",
		         		//template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='selectRowMakanan(dataItem)' </div>"
		         		template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='selectRowMinuman(dataItem)' </div>"
		         	},
		         	{
		         		"field": "jenisDiet",
		         		"title": "Tipe Makanan",
		         		"width": "100px",
		         		filterable: false
		         	}, 
		         	{
		         		"field": "namaProduk",
		         		"title": "Menu Makanan",
		         		"width": "300px",
		         		filterable: false
		         	}, 
		         	{
		         		"field": "jenisWaktu",
		         		"title": "Waktu Makan",
		         		"width": "100px",	
		         	}, 
		         	{
		         		"field": "status",
		         		"title": "Status",
		         		"width": "100px",
		         		filterable: false
		         	}
		         	]
				}
			};

				$scope.dataOrderMakanan = [];

	        $scope.selectRowMakanan = function(dataItem)
	        {	
	        	var dataObj = {
	        		produkId : dataItem.produkId,
	        		noRecOrder : dataItem.noRecOrder,
	        		status : dataItem.status
	        	}

	        	var isExist = _.find($scope.dataOrderMakanan, function(dataExist){ 
	        		if (
					dataExist.produkId == dataObj.produkId &&
					dataExist.noRecOrder == dataObj.noRecOrder &&
					dataExist.status == dataObj.status) {
						return true;
					} else {
						return undefined;
					}
	        	});

	        	if(isExist == undefined)
	        	{
	        		$scope.dataOrderMakanan.push(dataObj);
	        	}
	        	else
	        	{
	        		$scope.dataOrderMakanan =  _.without($scope.dataOrderMakanan, _.findWhere($scope.dataOrderMakanan, {
	        			produkId: dataObj.produkId,
	        			noRecOrder : dataObj.noRecOrder,
	        			status : dataObj.status
	        		}));
	        	}
	        	
	        };

	        $scope.dataOrderMinuman = [];


	       $scope.selectRowMinuman = function(dataItem)
	        {
	        	var dataObj = {
	        		produkId : dataItem.produkId,
	        		noRecOrder : dataItem.noRecOrder
	        	}

	        	var isExist = _.find($scope.dataOrderMinuman, function(dataExist){ return 
	        		dataExist.produkId == dataObj.produkId;
	        		dataExist.noRecOrder == dataObj.noRecOrder;
	        		 });

	        	if(isExist == undefined)
	        	{
	        		$scope.dataOrderMinuman.push(dataObj);
	        	}
	        	else
	        	{
	        		$scope.dataOrderMinuman =  _.without($scope.dataOrderMinuman, _.findWhere($scope.dataOrderMinuman, {
	        			produkId: dataObj.produkId,
	        			noRecOrder : dataObj.noRecOrder
	        		}));
	        	}
	        };



			 $scope.getNoRecProduk=function(){
		         	$scope.noRecProduk = [];
		         	$scope.statusKirimMenu = [];
		         	for (var key in $scope.dataOrderMakanan) {
		         		if ($scope.dataOrderMakanan.hasOwnProperty(key)) {
		         			var element = $scope.dataOrderMakanan[key];
		         			if ( element.produkId != undefined) {
		         				$scope.noRecProduk.push({
		         					"noRec" :  element.noRecOrder,
		         					"produk" : {
		         						"id" : element.produkId
		         					}

		         				}),
		         				$scope.statusKirimMenu.push({"status":element.status});
		         			}else {
		         				var confirm = $mdDialog.confirm()
		         				.title('Peringatan!')
		         				.textContent('Data belum di pilih?')
		         				.ariaLabel('Lucky day')
		         				.ok('OK')

		         				$mdDialog.show(confirm).then(function() {
		         					$scope.findData();
		         				});
		         			}
		         		}
		         	}
		         };

         $scope.getNoRecProdukMinuman=function(){
         	$scope.noRecProdukMinuman = [];
         	for (var key in $scope.dataOrderMinuman) {
         		if ($scope.dataOrderMinuman.hasOwnProperty(key)) {
         			var element = $scope.dataOrderMinuman[key];
         			if ( element.produkId != undefined) {
         				$scope.noRecProduk.push({
         					"noRec" :  element.noRecOrder,
         					"produk" : {
         						"id" : element.produkId
         					}
         				});
         			}else {
         				var confirm = $mdDialog.confirm()
         				.title('Peringatan!')
         				.textContent('Data belum di pilih?')
         				.ariaLabel('Lucky day')
         				.ok('OK')

         				$mdDialog.show(confirm).then(function() {
         					$scope.findData();
         				});
         			}
         		}
         	}
         };




//=========================================================END KIRIM MENU=====================================================================//






//============================================================= BUTTON - BUTTON =========================================================//
		

		// Trigger Dari Button Pemesanan
         $scope.getProduk=function(){
         	$scope.produkId = "";
         	$scope.jenisWaktuId="";
         	$scope.noRecOrder="";
         	$scope.dataNoRecorder = [];
         	$scope.status = [];
         	for (var key in $scope.dataPost) {
         		if ($scope.dataPost.hasOwnProperty(key)) {
         			var element = $scope.dataPost[key];
         			if ( element.produkId != undefined) {
         				$scope.produkId +=  element.produkId +",",
         				$scope.jenisWaktuId += element.jenisWaktuId +",",
         				$scope.noRecOrder += element.noRecOrder +",",
         				$scope.dataNoRecorder.push({"noRecOrder":element.noRecOrder}),
         				$scope.status.push({"status":element.status})
         			}else{
         				var confirm = $mdDialog.confirm()
         				.title('Peringatan!')
         				.textContent('Data belum di pilih?')
         				.ariaLabel('Lucky day')
         				.ok('OK')

         				$mdDialog.show(confirm).then(function() {
         					$scope.findData();
         				});
         			}
         		}
         	}
         };
        
         // Button Pemesanan Bahan
         $scope.ProdukFormula = function() {
         	debugger
         	$scope.dataMenunggu = [];
         	$scope.dataPost.forEach(function(data){
         		debugger
				if (data.status == "MENUNGGU") {
					$scope.dataMenunggu.push({"data" : "ada status Menunggu"})
				}
			});
			//Validasikan Data yang menunggu
			if ($scope.dataMenunggu.length != 0){
				debugger
				$scope.showAlert();
				$scope.dataMenunggu = undefined;
			} else {
			//Jika sudah di verifikasi
				debugger
				$scope.getProduk();
	         	$state.go('OrderProdukGizi', {
//* tidak ada triggernya*  noKirimOrder: $scope.noOrder,
	         		        produkId: $scope.produkId
	         	})
			}
         };



        // Button Informasi Gizi
        $scope.navToInfo = function(){
     	$state.go('InformasiGizi',{
     	  produkId: $scope.produkId
     	 })
        };

          //button Verifikasi
        $scope.verifikasi=function(){
        	$scope.getProduk();
        	var data = $scope.dataNoRecorder;
        	findPasien.saveDataItem(data, "registrasi-pelayanan/save-verifikasi").then(function(dat){
			$scope.findData();
			$scope.dataPost = [];
     		console.log(JSON.stringify(dat.data));
		});
       };


	     // Button Produksi  
         $scope.Produksi = function() {	
         	$scope.getProduk();
         	var menunggu = []
         	var produksi = []
         	for (var i=0; i<$scope.status.length;i++){
         		if($scope.status[i].status == "MENUNGGU"){
         			menunggu.push({"data":"ada"})
         		} else if($scope.status[i].status == "PRODUKSI"){
         			produksi.push({"data":"ada"})
         		}
         	}
         	if(menunggu.length>=1){
         		$scope.alertStatusMenunggu();
         	} else if(produksi.length>=1) {
         		$scope.alertStatusProduksi();
         	} else {
         		$state.go('Produksi', {
	         		produkId:$scope.produkId,
					jenisWaktuId:$scope.jenisWaktuId,
					noRecOrder:$scope.noRecOrder
	         	});
         	}
         }

          $scope.alertStatusMenunggu = function(ev) {
	        $mdDialog.show(
	          $mdDialog.alert()
	            .parent(angular.element(document.querySelector('#popupContainer')))
	            .clickOutsideToClose(false)
	            .title('Status masih MENUNGGU')
	            .textContent('Harap Lakukan Verifikasi Sebelum Produksi')
	            .ariaLabel('Alert Dialog Demo')
	            .ok('OK')
	            .targetEvent(ev)
	        );
	     };

	       //button Cetak E-tiket
			$scope.cetakEtiket = function () {
				var tanggalReg = new Date($scope.item.tglRegistrasi);
				var tanggalRegistrasi = DateHelper.getTanggalFormattedNew(tanggalReg);
				if ($scope.item.noCm == undefined) {
					window.messageContainer.error('Pilih data yang ingin di Cetak')
				} else {
					var link = FindPasienGizi.cetakEtiket($scope.item.noCm,tanggalRegistrasi)
					window.open(link);
            	}
            };
			

		}
	])
})


//=============================================================SOURCE OLD===============================================

/*    		$scope.klPermintaan = function(current){
    			debugger
				$scope.current = current;
				$scope.item.tglRegistrasi = current.tglRegistrasi;
				$scope.item.noCm = current.noCm;
				$scope.item.noRecPasienDaftar = current.noRecPasienDaftar;
			};*/
/*			$scope.selectProduk=function(data){
			
            	$scope.produkId = "";
                for (var key in data.produkId) {
                    if (data.produkId.hasOwnProperty(key)) {
                        var element = data.produkId[key];
                        if ( element === true) {
                            $scope.produkId += "," + element.produkId;
                        }
                    }
                }
             $scope.produkId = data.produkId;
             $scope.kelasId = data.kelasId;
         }*/


/*  	        $scope.selectRow2 = function(dataItem)
	        {
	        	var dataObj = {
	        		produkId : dataItem.produkId,
	        		noRecOrder : dataItem.noRecOrder
	        	}

	        	var isExist = _.find($scope.dataPost, function(dataExist){ return 
	        		dataExist.produkId == dataObj.produkId;
	        		dataExist.noRecOrder == dataObj.noRecOrder;
	        		 });

	        	if(isExist == undefined)
	        	{
	        		$scope.dataPost.push(dataObj);
	        	}
	        	else
	        	{
	        		$scope.dataPost =  _.without($scope.dataPost, _.findWhere($scope.dataPost, {
	        			produkId: dataObj.produkId,
	        			noRecOrder : dataObj.noRecOrder
	        		}));
	        	}

	        };
*/

         /*function cityFilter(element) {
         		debugger;
	            element.kendoDropDownList({
	                dataSource: $scope.listJenisWaktu,
	                dataTextField : "jenisWaktu",
	                optionLabel: "--Select Value--"
	            });
	        }*/





/*        $scope.alertStokKurang = function(ev) {
	        $mdDialog.show(
	          $mdDialog.alert()
	            .parent(angular.element(document.querySelector('#popupContainer')))
	            .clickOutsideToClose(false)
	            .title('Stok Ruangan Gizi Kurang')
	            .textContent('Harap lakukan pemesanan terlebih dahulu untuk menambah stok di Ruangan Gizi')
	            .ariaLabel('Alert Dialog Demo')
	            .ok('OK')
	            .targetEvent(ev)
	        );
	     };
	  
	     $scope.alertStatusProduksi = function(ev) {
	        $mdDialog.show(
	          $mdDialog.alert()
	            .parent(angular.element(document.querySelector('#popupContainer')))
	            .clickOutsideToClose(false)
	            .title('Menu Sudah di PRODUKSI')
	            .textContent('Menu Sudah Di PRODUKSI')
	            .ariaLabel('Alert Dialog Demo')
	            .ok('OK')
	            .targetEvent(ev)
	        );
	     };
*/



/*         $scope.navToKalori = function(){
         	$state.go('Kalori',{
         		produkId: $scope.produkId
         	})
         };

         $scope.navToKomposisiMakanan = function(){
         	$state.go('KomposisiMakanan',{
         		produkId: $scope.produkId
         	})
         };

         $scope.navToKomposisiMinuman = function(){
         	$state.go('KomposisiMinuman',{
         		produkId: $scope.produkId
         	})
         };

         $scope.navToKomposisiFormula = function(){
         	$state.go('KomposisiFormula',{
         		produkId: $scope.produkId
         	})
         };*/