////header nya
define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('BentukProdukCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService', 'PenerimaanBarangLogistik',
		function($q, $rootScope, $scope,IPSRSService, penerimaanBarangLogistik) {
			$scope.item = {};
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			
			var init = function () {

				var bentukPro = [];
                var departemen = [];
                var kelompokP = [];
                var dataLengkapBentukProduk = [];
                var arrS = {};
                var departemenS;
                var kelompokPS;
                var nomor = 0;
				
                $q.all([
                	IPSRSService.getFieldsMasterTable("get-data-master?className=BentukProduk"),  
                	penerimaanBarangLogistik.getNamaProduk("Departemen&select=id,namaDepartemen"),
                	penerimaanBarangLogistik.getNamaProduk("KelompokProduk&select=id,kelompokProduk")
                	]).then(function(data) {
                		bentukPro = data[0].data.data.BentukProduk;
                		departemen = data[1].data;
                		kelompokP = data[2].data;

                		for (var i = 0; i < bentukPro.length; i++) {
                			nomor += 1
                			for (var j = 0; j < departemen.length; j++) {
                				if (bentukPro[i].departemenId == departemen[j].id) {
                					departemenS = departemen[j]
                					break;
                				}
                			}

                			for (var k = 0; k < kelompokP.length; k++) {
                				if (bentukPro[i].kelompokProdukId == kelompokP[k].id) {
                					kelompokPS = kelompokP[k]
                					break;
                				}
                			}

                			arrS = {
                				nomor: nomor,
                				id: bentukPro[i].id,
                				statusEnabled: bentukPro[i].statusEnabled,
                				kodeExternal: bentukPro[i].kodeExternal,
                				namaExternal: bentukPro[i].namaExternal,
                				reportDisplay: bentukPro[i].reportDisplay, 
                				namaBentukProduk: bentukPro[i].namaBentukProduk,
                				qBentukProduk: bentukPro[i].qBentukProduk,
                				kdBentukProduk: bentukPro[i].kdBentukProduk,
                				departemen: departemenS, 
                				kelompokP:  kelompokPS
                			}
                			dataLengkapBentukProduk.push(arrS)
                		} 

                		$scope.listdepartemen = departemen;
                		$scope.listkelompokproduk = kelompokP;
             			
                		$scope.dataSource = new kendo.data.DataSource({
                			pageSize: 10,
                			data: dataLengkapBentukProduk,
                			autoSync: true

                		});

                	});
			
			}
			init();

			///colom tabel
			$scope.columnBentukProduk = [
					{
						"field": "nomor",
						"title": "No"
					},
					{
						"field": "kdBentukProduk",
						"title": "kode Bentuk Produk"
					},
					{
						"field": "namaBentukProduk",
						"title": "Bentuk Produk"
					},
					{
						"field": "departemen.namaDepartemen",
						"title": "departemen"
					},
					{
						"field": "kelompokP.kelompokProduk",
						"title": "kelompok Produk"
					},
					// {
					// 	"field": "qBentukProduk",
					// 	"title": "q Bentuk Produk"
					// },
					// {
					// 	"field": "id",
					// 	"title": "id"
					// },
					{
						"field": "reportDisplay",
						"title": "report Display"
					},
					{
						"field": "kodeExternal",
						"title": "kode External"
					},
					{
						"field": "namaExternal",
						"title": "nama External"
					},
					{
						"field": "statusEnabled",
						"title": "status Enabled"
					},
					{
						"title" : "Action",
						"width" : "200px",
						"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
						"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
					}
			];

			$scope.mainGridOptions = { 
				pageable: true,
				columns: $scope.columnBentukProduk,
				editable: "popup",
				selectable: "row",
				scrollable: false
			};

			////fungsi klik untuk edit
			$scope.klik = function(current){
				$scope.showEdit = true;
				$scope.current = current;
				$scope.item.kdBentukProduk = current.kdBentukProduk;
				debugger;
				$scope.item.departemen = current.departemen;
			//	$scope.item.departemenId = current.departemenId;
				$scope.item.kelompokProduk = current.kelompokP;
			//	$scope.item.kelompokProdukId = current.kelompokProdukId;
				$scope.item.namaBentukProduk = current.namaBentukProduk;
				$scope.item.qBentukProduk = current.qBentukProduk;
				$scope.item.id = current.id;
//				$scope.item.noRec = current.noRec;
				$scope.item.reportDisplay = current.reportDisplay;
				$scope.item.kodeExternal = current.kodeExternal;
				$scope.item.namaExternal = current.namaExternal;
				$scope.item.statusEnabled = current.statusEnabled;
			};

			$scope.disableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=BentukProduk&&id="+$scope.item.id+"&&statusEnabled=false").then(function(dat){
					init();
				});
			};

			$scope.enableData=function(){
				IPSRSService.getClassMaster("delete-master-table?className=BentukProduk&&id="+$scope.item.id+"&&statusEnabled=true").then(function(dat){
					init();

				});
			};

			//// save 
			$scope.tambah = function()
			{
				var data = {
					"class": "BentukProduk",
					"listField": {
						"kdBentukProduk": $scope.item.kdBentukProduk,
						"departemen": $scope.item.departemen,
						"kelompokProduk": $scope.item.kelompokProduk,
						"namaBentukProduk": $scope.item.namaBentukProduk,
						"qBentukProduk": $scope.item.qBentukProduk,
						"reportDisplay": $scope.item.reportDisplay,
						"kodeExternal": $scope.item.kodeExternal,
						"namaExternal": $scope.item.namaExternal,
					}
				}
				IPSRSService.saveDataMaster(data,"save-master-table").then(function(e) {
					console.log(JSON.stringify(e.data));
					init();
					$scope.item = {};
				});
			}

			////edit
			$scope.edit = function()
			{	
				var data = {
					"class": "BentukProduk",
					"listField": {
						"kdBentukProduk": $scope.item.kdBentukProduk,
						"departemen": $scope.item.departemen,
						"kelompokProduk": $scope.item.kelompokProduk,
						"namaBentukProduk": $scope.item.namaBentukProduk,
						"qBentukProduk": $scope.item.qBentukProduk,
						"id": $scope.item.id,
						"noRec": $scope.item.noRec,
						"reportDisplay": $scope.item.reportDisplay,
						"kodeExternal": $scope.item.kodeExternal,
						"namaExternal": $scope.item.namaExternal,
						"statusEnabled": $scope.item.statusEnabled
					}
				}
				IPSRSService.saveDataMaster(data,"update-master-table").then(function(e){console.log(JSON.stringify(e.data));
					init();
				});
			}

			$scope.batal = function () {
				$scope.showEdit = false;
				$scope.item = {};
			}

		}
	]);
});
