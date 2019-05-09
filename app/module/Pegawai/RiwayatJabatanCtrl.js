define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RiwayatJabatanCtrl', ['$q', '$rootScope', '$scope', 'ManageSarprasPhp','$state','CacheHelper','DateHelper','ModelItemAkuntansi',
		function($q, $rootScope, $scope, manageSarprasPhp,$state,cacheHelper,dateHelper, modelItemAkuntansi) { 
			$scope.item={};
			$scope.norec="";
			$scope.item.id="";
			$scope.now = new Date();
			$scope.pegawaiTambah={id:0,namalengkap:"System Anali / Programmer",nip_pns:"0101010101010101"};
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
				{  
					field: "nosk",title: "No SK",width:"150px" 
				},
				{  
					field: "tglsk", title: "Tanggal SK", width:"100px" 
				}, 
				{  
					field: "jenisjabatan",title: "Jenis Jabatan",width:"150px" 
				},
				{  
					field: "namajabatan",title: "Jabatan",width:"250px" 
				},
				{  
					field: "namalengkapttd", title: "ttd SK", width:"150px" 
				},
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
				$scope.norec=dataItem.norec;
				$scope.item.jenisJabatan ={id:dataItem.idjenisjabatan,jenisjabatan:dataItem.jenisjabatan};
				$scope.ubah();
				$scope.item.noSK = dataItem.nosk;
				$scope.item.tglSK =dataItem.tglsk;
				$scope.item.ttdSK ={id:dataItem.idpgwttd,namalengkap:dataItem.namalengkapttd,nip_pns:dataItem.nippgwttd};
				$scope.item.keterangan = dataItem.keterangan; 
				$scope.item.jabatan = {id:dataItem.idjabatan,namajabatan:dataItem.namajabatan};
				$scope.item.jabatanTtd = {id:dataItem.idjabatanttd,namajabatan:dataItem.namajabatanttd};
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
				manageSarprasPhp.saveDataTransaksi("historypegawai/delete-data-riwayat-jabatan",dataObjPost).then(function(e) {					
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
				manageSarprasPhp.getDataTableTransaksi("historypegawai/get-drop-down-riwayat-jabatan")
				.then(function(data){
					$scope.listJenisJabatan=data.data.dataJenisJabatan;
					$scope.listJabatanInternal=data.data.dataJabatanInternal;
					$scope.listFungsional=data.data.dataJabatanFungsional;
					$scope.listPgw=data.data.pegawai
					if($scope.listPgw!=undefined){
			          	$scope.listPgw.push($scope.pegawaiTambah)
			        }
				});
			}


				function clearField(){
					$scope.norec="";
					$scope.item.jenisJabatan =undefined;
					$scope.item.jabatan = undefined;
					$scope.item.jabatanTtd = undefined;
					$scope.item.noSK = "";
					$scope.item.tglSK ="";
					$scope.item.ttdSK =undefined;
					$scope.item.keterangan = "";
				}


				$scope.save = function(){
				// debugger;
				if($scope.item.jenisJabatan == "" || $scope.item.jenisJabatan == undefined){
					toastr.error("jenis jabatan belum diisi!");
					return;
				} if($scope.item.jabatan == ""|| $scope.item.jabatan == undefined){
					toastr.error("jabatan belum diisi!");
					return;
				} if($scope.item.noSK == ""|| $scope.item.noSK == undefined){
					toastr.error("no sk belum diisi!");
					return;
				} if($scope.item.tglSK == ""|| $scope.item.tglSK == undefined){
					toastr.error("tanggal sk belum diisi!");
					return;
				}  if($scope.item.ttdSK == ""|| $scope.item.ttdSK == undefined){
					toastr.error("tanda tangan sk belum diisi!");
					return;
				}  if($scope.item.jabatanTtd == ""|| $scope.item.jabatanTtd == undefined){
					toastr.error("jabatan tanda tangan sk belum diisi!");
					return;
				}

				var dataObjPost ={};	 

				dataObjPost = {
					objectpegawaifk :$state.params.idPegawai,
					norec:$scope.norec, 
					statusenabled :true,
					objectjenisjabatanfk :$scope.item.jenisJabatan.id,
					keterangan: $scope.item.keterangan,
					nosk:$scope.item.noSK,
					objectpegawaittdfk :$scope.item.ttdSK.id,
					tglsk : moment($scope.item.tglSK).format('YYYY-MM-DD'),
					objectjabatanfk :$scope.item.jabatan.id,
					objectjabatanttdfk :$scope.item.jabatanTtd.id		 
				} 
				manageSarprasPhp.saveDataTransaksi("historypegawai/save-riwayat-jabatan",dataObjPost).then(function(e) {
				})   
				$scope.batal();
				loadData() ;
			}

			//$scope.$watch('item.jenisJabatan', function(e) { 
				$scope.ubah = function(){
					if($scope.item.jabatan !== undefined){
						$scope.item.jabatan="";
					}
					if($scope.item.jabatanTtd !== undefined){
						$scope.item.jabatanTtd="";
					}
					if($scope.item.jenisJabatan !== undefined){
						if ($scope.item.jenisJabatan.id === 1) { 
							$scope.listJabatan =$scope.listFungsional;							 
						}  else
						if ($scope.item.jenisJabatan.id === 3) { 
							$scope.listJabatan =$scope.listJabatanInternal; 
						} else{
							$scope.listJabatan=[];
						}	
					}

					
				}
				$scope.batal=function(){
					clearField();
					$scope.popUpRiwayat.close();
				};

				function loadData(){
					$scope.isRouteLoading=true;
					manageSarprasPhp.getDataTableTransaksi("historypegawai/get-data-riwayat-jabatan?id=" +	$state.params.idPegawai ).then(function(data) {
						$scope.isRouteLoading=false;	 

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