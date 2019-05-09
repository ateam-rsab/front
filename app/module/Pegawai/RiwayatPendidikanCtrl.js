define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RiwayatPendidikanCtrl', ['$q', '$rootScope', '$scope'
		,'ManageSarprasPhp','$state','CacheHelper','DateHelper','ModelItemAkuntansi',
		function($q, $rootScope, $scope, manageSarprasPhp,$state,cacheHelper,dateHelper, modelItemAkuntansi) { 
			$scope.item={};
			$scope.norec="";
			$scope.item.id="";
			$scope.now = new Date();
			loadCombo();
			loadData();
			
			$scope.item.nama = $state.params.namaLengkap;
			$scope.item.nip = $state.params.nip;
			
			$scope.columnGrid = {
				toolbar: [
				{
					name: "create",text: "Buat Riwayat Jabatan",
					template: '<button ng-click="createNew()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Riwayat</button>'	
				} 
				],
				sortable: false,
				reorderable: true,
				filterable: false,
				pageable: true,
				columnMenu: false,
				resizable: true,
				selectable: 'row',
				columns:	[  
				// {  
				// 	field: "nosk",title: "No SK",width:"150px" 
				// },
				// {  
				// 	field: "tglsk", title: "Tanggal SK", width:"100px" 
				// }, 
				// {  
				// 	field: "tingkatkelulusan",title: "Tingkat Kelulusan",width:"150px" 
				// }, 
				{  
					field: "namatempatpendidikan",title: "Nama Institusi",width:"150px" 
				},
				{  
					field: "pendidikan",title: "Profesi",width:"100px" 
				},
				{  
					field: "jurusan",title: "Jurusan",width:"150px" 
				},
				{  
					field: "tgllulus",title: "Tanggal Kelulusan",width:"100px" 
				},
				{  
					field: "nilaiipk",title: "IPK",width:"75px" 
				},
				{  
					field: "noijazah",title: "No Ijazah",width:"100px" 
				},
				{  
					field: "tglijazah",title: "Tanggal Ijazah",width:"100px" 
				},
				// {  
				// 	field: "namalengkapttd", title: "ttd SK", width:"150px" 
				// },
				{
					command:[ 
					{ 
						text: "Edit", width:"40px", align:"center",
						attributes: {align:"center"},
						click: changeRow,
						imageClass: "k-icon k-i-pencil"
					}, { 
						text: "Hapus", width:"40px", align:"center",
						attributes: {align:"center"},
						click: removeRow,
						imageClass: "k-icon k-delete"
					}],
					title: "",
					width: "100px",
				}
				],
				sortable: {
					mode: "single",
					allowUnsort: false,
				},
				pageable:{
					messages: {
						display: "Menampilkan {0} - {1} data dari {2} data"
					},
					refresh: true,
					pageSizes: true,
					buttonCount: 5
				}
			};


			function changeRow(e){
				clearField();
				e.preventDefault();
				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				var tr = $(e.target).closest("tr");
				var dataItem = this.dataItem(tr); 
				$scope.norec = dataItem.norec;
				$scope.item.noSK = dataItem.nosk;
				$scope.item.tglSK =dataItem.tglsk;
				$scope.item.ttdSK ={id:dataItem.idpgwttd,namalengkap:dataItem.namalengkapttd};
				$scope.item.keterangan = dataItem.keterangan; 
				$scope.item.alamat=dataItem.alamattempatpendidikan;
				$scope.item.jurusan=dataItem.jurusan;
				$scope.item.namaTempat=dataItem.namatempatpendidikan;
				$scope.item.ipk=dataItem.nilaiipk;
				$scope.item.noIjasah=dataItem.noijazah;
				$scope.item.pimpinanPendidikan=dataItem.pimpinanpendidikan;
				$scope.item.tglIjasah=dataItem.tglijazah;
				$scope.item.tglLulus=dataItem.tgllulus;
				$scope.item.tglMasuk=dataItem.tglmasuk; 
				$scope.item.ttdIjasah=dataItem.ttdijazah; 
				$scope.item.pendidikan= {id:dataItem.objectpendidikanfk,namalengkap:dataItem.pendidikan};
				$scope.item.tingkatKelulusan={id:dataItem.objecttingkatkelulusanfk,namalengkap:dataItem.tingkatkelulusan};

				$scope.popUpRiwayat.center().open();
			}

			function removeRow(e){

				e.preventDefault();
				var grid = this;
				var row = $(e.currentTarget).closest("tr");
				var tr = $(e.target).closest("tr");
				var dataItem = this.dataItem(tr); 

				var dataObjPost ={};	 

				dataObjPost = {
					norec: dataItem.norec 		 
				} 
				manageSarprasPhp.saveDataTransaksi("historypegawai/delete-data-riwayat-pendidikan",dataObjPost).then(function(e) {					
					if(e.status === 201){
						loadData();
						grid.removeRow(row);
					}
					$scope.ClearData(); 	
				})  
			}
			
			$scope.createNew = function(){
				$scope.popUpRiwayat.center().open();
				var actions = $scope.popUpRiwayat.options.actions; 
				actions.splice(actions.indexOf("Close"), 1); 
				$scope.popUpRiwayat.setOptions({ actions : actions });
			};

			function loadCombo(){ 
				manageSarprasPhp.getDataTableTransaksi("historypegawai/get-drop-down-riwayat-pendidikan").then(function(data){
					$scope.listPendidikan=data.data.dataPendidikan;
					$scope.listTingkatKelulusan=data.data.dataTingkatKelulusan; 
				});

				modelItemAkuntansi.getDataDummyPHP("jadwaldokter/get-drop-down-pegawai", true, true, 10).then(function(data) {
					$scope.listPgw= data;
				});
			}


				function clearField(){
					$scope.norec="";
					$scope.item.alamat="";
					$scope.item.jurusan="";
					$scope.item.namaTempat="";
					$scope.item.ipk="";
					$scope.item.noIjasah="";
					$scope.item.pimpinanPendidikan="";
					$scope.item.tglIjasah=$scope.now;
					$scope.item.tglLulus=$scope.now;
					$scope.item.tglMasuk=$scope.now;
					$scope.item.keterangan="";
					$scope.item.ttdIjasah="";
					$scope.item.noSK="";	
					$scope.item.tglSK=$scope.now; 
					$scope.item.ttdSK="";
					$scope.item.pendidikan="";
					$scope.item.tingkatKelulusan="";
				}


			$scope.save = function(){
				// debugger;
				if($scope.item.pendidikan == "" || $scope.item.pendidikan == undefined){
					toastr.error("pendidikan belum diisi!");
					return;
				// } if($scope.item.ipk == ""|| $scope.item.ipk == undefined){
				// 	toastr.error("ipk belum diisi!");
				// 	return;
				} if($scope.item.noIjasah == ""|| $scope.item.noIjasah == undefined){
					toastr.error("no Ijasah belum diisi!");
					return;
				} if($scope.item.tglIjasah == ""|| $scope.item.tglIjasah == undefined){
					toastr.error("tanggal Ijasah belum diisi!");
					return;
				} if($scope.item.tglLulus == ""|| $scope.item.tglLulus == undefined){
					toastr.error("tanggal lulus belum diisi!");
					return;
				// }  if($scope.item.tglMasuk == ""|| $scope.item.tglMasuk == undefined){
				// 	toastr.error("tanggal masuk belum diisi!");
				// 	return;
				}  if($scope.item.ipk == ""|| $scope.item.ipk == undefined){
					$scope.item.ipk = 0;
				// } if($scope.item.ipk == ""|| $scope.item.ipk == undefined){
				// 	toastr.error("ipk belum diisi!");
				// 	return;
				// } if($scope.item.noSK == ""|| $scope.item.noSK == undefined){
				// 	toastr.error("no sk belum diisi!");
				// 	return;
				// } if($scope.item.tglSK == ""|| $scope.item.tglSK == undefined){
				// 	toastr.error("tanggal sk belum diisi!");
				// 	return;
				// }  if($scope.item.ttdSK == ""|| $scope.item.ttdSK == undefined){
				// 	toastr.error("tanda tangan sk belum diisi!");
				// 	return;
				}  

				var dataObjPost ={};	 

				dataObjPost = { 
					norec : $scope.norec, 
					statusenabled : true,
					alamattempatpendidikan : $scope.item.alamat,
					jurusan : $scope.item.jurusan,
					namatempatpendidikan : $scope.item.namaTempat,
					nilaiipk : $scope.item.ipk,
					noijazah : $scope.item.noIjasah,
					pimpinanpendidikan : '',//$scope.item.pimpinanPendidikan,
					tglijazah : moment($scope.item.tglIjasah).format('YYYY-MM-DD'),
					tgllulus : moment($scope.item.tglLulus).format('YYYY-MM-DD'), 
					tglmasuk : null,//$scope.item.tglMasuk,
					keterangan :'',//$scope.item.keterangan,
					ttdijazah :'',//$scope.item.ttdIjasah,
					nosk : '',//$scope.item.noSK,	
					tglsk : null,//$scope.item.tglSK,
					objectpegawaifk : $state.params.idPegawai,
					objectpegawaittdfk: null,//$scope.item.ttdSK.id,
					objectpendidikanfk:  $scope.item.pendidikan.id,
					objecttingkatkelulusanfk :  4 //$scope.item.tingkatKelulusan.id (status tingkat kelulusan id 4 = -)
				} 
				manageSarprasPhp.saveDataTransaksi("historypegawai/save-riwayat-pendidikan",dataObjPost).then(function(e) {
				})   
				$scope.batal();
				loadData();
			}

			$scope.batal=function(){
				clearField();
				$scope.popUpRiwayat.close();
			};

			function loadData(){
				$scope.isRouteLoading=true;
				manageSarprasPhp.getDataTableTransaksi("historypegawai/get-data-riwayat-pendidikan?id=" +	$state.params.idPegawai ).then(function(data) {
					$scope.isRouteLoading=false;	 
					for (var i = data.data.length - 1; i >= 0; i--) {
						data.data[i].nilaiipk = parseFloat(Math.round(data.data[i].nilaiipk * 100) / 100).toFixed(2);
					}
					$scope.dataSource ={	
						data: data.data,
						_data: data.data,
						pageSize: 30,
						selectable: true,
						refresh: true,
						total: data.data.length,
						serverPaging: false,
					};
				});
			};

///end
}
]);
});