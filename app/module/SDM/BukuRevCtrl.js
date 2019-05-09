define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('BukuRevCtrl', ['$rootScope', '$scope', 'ModelItem','ModelItemAkuntansi', 'ManageServicePhp' ,'$window', '$timeout',
		function($rootScope, $scope, ModelItem ,ModelItemAkuntansi, manageServicePhp, $window, $timeout) {
			$scope.item = {};
			$scope.search = {};
			$scope.isRouteLoading=false;
			$scope.item.tahunTerbit = new Date();

			$scope.yearSelected = {
				start: "year", 
				depth: "year",
				format: "yyyy"
			};
			loadCombo();
			loadData();
			$scope.Search = function(){
				loadData()
			}
			$scope.Clear = function (){
				$scope.item={}	
				$scope.search={}

			}
			function loadCombo (){

				manageServicePhp.getDataTableTransaksi("perpustakaan/get-combo").then(function(e){
					$scope.ListTipeKoleksi=e.data.tipekoleksi
				})
			}


			
			function loadData(){
				$scope.isRouteLoading=true;
				
				var judulBuku =""
				if ($scope.search.judulBuku!= undefined){
					judulBuku ="&judulBuku=" +$scope.search.judulBuku
				}
				var namaPengarang =""
				if ($scope.search.namaPengarang != undefined){
					namaPengarang ="&namaPengarang=" +$scope.search.namaPengarang
				}
				
				
				manageServicePhp.getDataTableTransaksi("perpustakaan/get-bibliography-buku?"
					+judulBuku
					+namaPengarang

					).then(function(data) {
						$scope.isRouteLoading=false;
						for (var i = 0; i < data.data.data.length; i++) {
							data.data.data[i].no = i+1
						}
						$scope.dataSource = new kendo.data.DataSource({
							data: data.data.data,
							pageSize: 10,
							serverPaging: true,


						});



					})
				}
				$scope.columnGrid = {
					toolbar: [
					{
						name: "add",text: "Tambah",
						template: '<button ng-click="Tambah()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah</button>'	
					},
					],	
					pageable: true,
					scrollable: true,
					columns: [{
						"field": "no",
						"title": "No",
						"width": "30px",
						"attributes": {align: "center"}

					}, 

					{
						"field": "judulbuku",
						"title": "Judul Buku",
						"width": "200px"
					},
					{
						"field": "kodeeksemplar",
						"title": "Kode Eksemplar",
						"width": "100px"
					},
					{
						"field": "namapengarang",
						"title": "Nama Pengarang",
						"width": "150px"
					},
					{
						"field": "tipekoleksi",
						"title": "Tipe Koleksi",
						"width": "80px"
					},
					{
						"field": "edisi",
						"title": "Edisi",
						"width": "80px"
					},
					{
						"field": "issn",
						"title": "ISSN",
						"width": "80px"
					},
					{
						"field": "tahunterbit",
						"title": "Tahun Terbit",
						"width": "80px"
					},
					{
						"field": "jumlahhalaman",
						"title": "Jumlah Halaman",
						"width": "90px"
					},
					{
						"command":[{
							text: "Hapus", 
							click: hapusData, 
							imageClass: "k-icon k-delete"
						},{
							text: "Edit", 
							click: editData, 
							imageClass: "k-icon k-i-pencil"
						}],
						title: "",
						width: "80px",
					}

					]
				};

				$scope.Tambah = function(){
					$scope.popUps.center().open();
				}
				$scope.save = function(){
					var norec_bb =""
					if ($scope.norecBB !=undefined)
						norec_bb=$scope.norecBB
					
					// var nomor=null
					// if ($scope.item.nomor !=undefined)
					// 	nomor =$scope.item.nomor 

					// var judulBuku=null
					// if ($scope.item.judulBuku !=undefined)
					// 	judulBuku =$scope.item.judulBuku 

					// var kodeEksemplar=null
					// if ($scope.item.kodeEksemplar !=undefined)
					// 	kodeEksemplar =$scope.item.kodeEksemplar 

					// var namaPengarang=null
					// if ($scope.item.namaPengarang !=undefined)
					// 	namaPengarang =$scope.item.namaPengarang 

					var tipeKoleksi=null
					if ($scope.item.tipeKoleksi !=undefined)
						tipeKoleksi =$scope.item.tipeKoleksi.id 

					// var edisi=null
					// if ($scope.item.edisi !=undefined)
					// 	edisi =$scope.item.edisi

					// var issn=null
					// if ($scope.item.issn !=undefined)
					// 	issn =$scope.item.issn

					// var tahunTerbit=null
					// if ($scope.item.tahunTerbit !=undefined)
					// 	tahunTerbit =$scope.item.tahunTerbit

					// var jumlahHalaman=null
					// if ($scope.item.jumlahHalaman !=undefined)
					// 	jumlahHalaman =$scope.item.jumlahHalaman
					var listRawRequired = [
					"item.nomor|ng-model|Nomor",
					"item.judulBuku|ng-model|Judul Buku",
					"item.kodeEksemplar|ng-model|Kode Eksemplar",
					"item.namaPengarang|ng-model|Nama Pengarang",
					"item.edisi|ng-model|Edisi",
					"item.issn|ng-model|ISSN",
					"item.tahunTerbit|ng-model|Tahun Terbit"



					]
					var isValid = ModelItem.setValidation($scope, listRawRequired);

					if(isValid.status){

						var objSave = {
							"norec_bb" :norec_bb,
							"nomor" :$scope.item.nomor,
							"judulbuku" :$scope.item.judulBuku,
							"kodeeksemplar" :$scope.item.kodeEksemplar,
							"namapengarang" :$scope.item.namaPengarang,
							"tipekoleksifk" :tipeKoleksi,
							"edisi" :$scope.item.edisi,
							"issn" :$scope.item.issn,
							"tahunterbit" : moment ($scope.item.tahunTerbi).format('YYYY'),
							"jumlahhalaman" :$scope.item.jumlahHalaman,


						}
						manageServicePhp.saveDataTransaksi("perpustakaan/save-bibliography-buku",objSave).then(function(res){
							loadData();
							$scope.Clear ();
						})
					} else {
						ModelItem.showMessages(isValid.messages);
					}
				}



				function hapusData(e){
					e.preventDefault();
					var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

					if(!dataItem){
						toastr.error("Data Tidak Ditemukan");
						return;
					}
					var itemDelete = {
						"norec_bb": dataItem.norec
					}

					manageServicePhp.saveDataTransaksi("perpustakaan/delete-bibliography-buku",itemDelete).then(function(e){
						if(e.status === 201){
							loadData();
							
						}
					})

				}
				function editData(e){
					$scope.Clear ();
					e.preventDefault();
					var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

					if(!dataItem){
						toastr.error("Data Tidak Ditemukan");
						return;
					}


					$scope.norecBB =dataItem.norec
					if (dataItem.nomor != null)
						$scope.item.nomor =dataItem.nomor

					if (dataItem.judulbuku !=null)
						$scope.item.judulBuku =dataItem.judulbuku

					if (dataItem.kodeeksemplar !=null)
						$scope.item.kodeEksemplar =dataItem.kodeeksemplar
					
					if (dataItem.namapengarang !=null)
						$scope.item.namaPengarang =dataItem.namapengarang

					if (dataItem.tipekoleksi !=null)
						$scope.item.tipeKoleksi ={id:dataItem.tipekoleksifk,tipekoleksi:dataItem.tipekoleksi}

					if (dataItem.edisi !=null)
						$scope.item.edisi=dataItem.edisi

					if (dataItem.issn !=null)
						$scope.item.issn=dataItem.issn

					if (dataItem.tahunterbit !=null)
						$scope.item.tahunTerbit=dataItem.tahunterbit

					if (dataItem.jumlahhalaman !=null)
						$scope.item.jumlahHalaman=dataItem.jumlahhalaman

					$scope.popUps.center().open();

				}

				$scope.tutup = function(){
					$scope.popUps.close();

				}

			}
			]);
});

