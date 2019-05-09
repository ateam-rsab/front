define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('LogBookCtrl', ['$q', '$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper', 'ManageSdm', 'JadwalRencanaPemeriksaanService','RekamDataPegawai', '$document', 'R', 'FindSdm',
		function ($q, $rootScope, $scope, $state, ModelItem, DateHelper, ManageSdm, JadwalRencanaPemeriksaanService,RekamDataPegawai,$document, r, findSdm) {
			$scope.now = new Date();
			$scope.pegawaiPensiun = false;
			$scope.item = {};
			$scope.item.satuanKerja = "";
			$scope.dataVOloaded = true;
			$scope.now = new Date();
			$scope.item.awal= new Date($scope.now).getFullYear();
			// $scope.item.akhir = new Date().getTime();
			$scope.item.akhir = new Date();

			$scope.yearSelected = {
				start: "year", 
				depth: "year",
				format: "MMMM yyyy"
			};
			$q.all([
				ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true"),
				ManageSdm.getOrderList("pegawai/get-all-pegawai-custom/")
			]).then(function(res){
				if(res[0].statResponse){
					$scope.listPegawai = res[0].data;
					$scope.daftarListPegawai = $scope.listPegawai;
				}
				if(res[1].statResponse){
					$scope.listPegawaiPensiun = res[1].data;
				}
			}).then(function(e){
				var pegawaiLogin = ModelItem.getPegawai();
				if (pegawaiLogin.ruangan.departemenId !== 42) {
					ManageSdm.getOrderList("sdm/get-pegawai-bawahan/" + pegawaiLogin.id).then(function (dat) {
						$scope.listPegawai = dat.data;
					}).then(function(){
						if ($scope.listPegawai.data.length === 0) {
							$scope.listPegawai.data.push({"id": pegawaiLogin.id, "namaLengkap": pegawaiLogin.namaLengkap});
							$scope.item.pegawai = $scope.listPegawai.data[0];
							$scope.isLoginPegawai = true;
						}
					})
					// $scope.listPegawai.push({"id": pegawaiLogin.id, "namaLengkap": pegawaiLogin.namaLengkap})
				}
			})
			// ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true").then(function(dat) {
            //     $scope.listPegawai = dat.data;
            // }).then(function(){
			// 	var pegawaiLogin = ModelItem.getPegawai();
			// 	if (pegawaiLogin.ruangan.departemenId !== 42) {
			// 		ManageSdm.getOrderList("sdm/get-pegawai-bawahan/" + pegawaiLogin.id).then(function (dat) {
			// 			$scope.listPegawai = dat.data;
			// 		}).then(function(){
			// 			if ($scope.listPegawai.data.length === 0) {
			// 				$scope.listPegawai.data.push({"id": pegawaiLogin.id, "namaLengkap": pegawaiLogin.namaLengkap});
			// 				$scope.item.pegawai = $scope.listPegawai.data[0];
			// 				$scope.isLoginPegawai = true;
			// 			}
			// 		})
			// 		// $scope.listPegawai.push({"id": pegawaiLogin.id, "namaLengkap": pegawaiLogin.namaLengkap})
			// 	}
			// })
			
            $scope.createColumn = function()
            {
                var year = parseInt(moment($scope.item.akhir).format("Y"))
                var month = parseInt(moment($scope.item.akhir).format("M"))
                var tempDate = new Date(year, month, 0);

                var list = [];

                list.push({ field: "pointQty", aggregate: "sum" });

                for(var i=0; i<tempDate.getDate(); i++){
                    var data = {
                        field: "["+(i+1)+"]",
                        aggregate:"sum",
                        width: "50px"
                    };

                    list.push(data);
                }

                list.push({ field: "count", aggregate: "sum" });

                return list;
            }

            $scope.createColumnHari = function()
            {
                var year = parseInt(moment($scope.item.akhir).format("Y"))
                var month = parseInt(moment($scope.item.akhir).format("M"))
                var tempDate = new Date(year, month, 0);

                var list = [];

                
                for(var i=0; i<tempDate.getDate(); i++){
                    var data = {
                        field: "["+(i+1)+"]",
						title: (i+1).toString(),
						// aggregates: ["sum"],   
						// footerTemplate: " #= kendo.toString(sum,'0')#",
						width: "50px"
                    };

                    list.push(data);
                }

                

                return list;
            }

			$scope.tahun = function(){
				$scope.item.awal= $scope.item.awal.getFullYear();
				$scope.item.akhir= $scope.item.awal+4;
			}
			$scope.onDataBound = function(e){
				var grid = $("#gridOrder").data("kendoGrid");
				$(grid.tbody).on("click", "td", function (e) {
					var row = $(this).closest("tr");
					var rowIdx = $("tr", grid.tbody).index(row);
					var colIdx = $("td", row).index(this);
					var colIdx = colIdx.toString();
					if (colIdx.length === 1){
						colIdx = "0" + colIdx
					}
					var akhir  =  moment($scope.item.akhir).format("YYYY-MM");
					akhir = akhir + "-" + colIdx;
					// alert(rowIdx + '-' + colIdx);
					// findSdm.getDetilPoin(akhir, $scope.item.pegawai.id).then(function(data){
					// 	$scope.dats = data.data.data;
					// }).then(function(){
					// 	if ($scope.dats.listData.length == 0) return;
						$scope.showDetail(akhir, $scope.item.pegawai.id);
					// });
				});
			}
			$scope.showDetail = function(tgl, idPegawai){
				$scope.isLoadingData = true;
				findSdm.getDetilPoin(tgl, idPegawai).then(function(data){
					$scope.dats = data.data.data;
				}).then(function(){
					if ($scope.dats.listData.length == 0) {
						messageContainer.error('Nilai poin Kosong');
						$scope.isLoadingData = false;
					} else {
						var gridDetil = [];
						$scope.dats.listData.forEach(function(items){
							gridDetil.push(items);
						})
						$scope.detilGridOptions = {
							columns: [
								{
									"field": "namaProduk",
									"title": "Nama Tindakan",
								}, {
									"field": "count",
									"title": "Qty",
									"width": 40
								}, {
									"field": "tarif",
									"title": "Tarif",
									"template": "<span class=\"pull-left\">Rp.</span> #= kendo.toString(tarif, 'n0') #",
									"width": 120,
									// "footerTemplate": "<span class=\"pull-right\"><b>Total Poin:</b></span>",
								}, 
								// {
								// 	"field": "point",
								// 	"title": "Poin",
								// 	"aggregates": ["sum"], "footerTemplate": "#= sum #",
								// 	"width": 40
								// }
							]
						}
						$scope.dataDetil = new kendo.data.DataSource({
							data: gridDetil,
							// aggregate: [
							// 	{ field: "point", aggregate: "sum" }
							// ]
						});
						$scope.isLoadingData = false;
						$scope.winDialog.center().open();
					}
				})
			}
			$scope.cari = function() {
				// $scope.grid.refresh();
				var listRawRequired = [
					"item.akhir|k-ng-model|Periode",
					"item.pegawai|k-ng-model|Pegawai"
				]

				var isValid = ModelItem.setValidation($scope, listRawRequired);

                if(isValid.status){
					$scope.isLoadingData = true;
					var akhir  =  moment($scope.item.akhir).format("YYYY-MM");

					var dataGrid = [];
					// RekamDataPegawai.getOrderList("sdm/get-total-tindakan-by-user-id-and-periode/"+akhir).then(function(dat){
					RekamDataPegawai.getOrderList("sdm/get-rekap-poin/"+akhir+"/"+$scope.item.pegawai.id).then(function(dat){
						dat.data.data.periode = kendo.toString($scope.item.akhir, "y");
						dataGrid.push(dat.data.data);
						$scope.sourceOrder = new kendo.data.DataSource({
							data:dataGrid,
							//pageSize: 5,
							// aggregate: $scope.createColumn()

							/*[
							{ field: "pointQty", aggregate: "sum" }
							,{ field: "[1]", aggregate: "sum" }
							,{ field: "[2]", aggregate: "sum" }
							,{ field: "[3]", aggregate: "sum" }
							,{ field: "[4]", aggregate: "sum" }
							,{ field: "[5]", aggregate: "sum" }
							,{ field: "[6]", aggregate: "sum" }
							,{ field: "[7]", aggregate: "sum" }
							,{ field: "[8]", aggregate: "sum" }
							,{ field: "[9]", aggregate: "sum" }
							,{ field: "[10]", aggregate: "sum" }
							,{ field: "[11]", aggregate: "sum" }
							,{ field: "[12]", aggregate: "sum" }
							,{ field: "[13]", aggregate: "sum" }
							,{ field: "[14]", aggregate: "sum" }
							,{ field: "[15]", aggregate: "sum" }
							,{ field: "[16]", aggregate: "sum" }
							,{ field: "[17]", aggregate: "sum" }
							,{ field: "[18]", aggregate: "sum" }
							,{ field: "[19]", aggregate: "sum" }
							,{ field: "[20]", aggregate: "sum" }
							,{ field: "[21]", aggregate: "sum" }
							,{ field: "[22]", aggregate: "sum" }
							,{ field: "[23]", aggregate: "sum" }
							,{ field: "[24]", aggregate: "sum" }
							,{ field: "[25]", aggregate: "sum" }
							,{ field: "[26]", aggregate: "sum" }
							,{ field: "[27]", aggregate: "sum" }
							,{ field: "[28]", aggregate: "sum" }
							,{ field: "[29]", aggregate: "sum" }
							,{ field: "[30]", aggregate: "sum" }
							,{ field: "[31]", aggregate: "sum" }
							,{ field: "count", aggregate: "sum" }
							// { field: "risk", aggregate: "totalRisk" 
							]*/

						});
						$scope.mainGridOptions = {
							columns: [{
								"field": "periode",
								"title": "Periode",
								"width": "150px"
							},{
								title: "<center>Tanggal</center> ",
								columns: $scope.createColumnHari(),
							},{
								
								"field": "nilai",
								"title": "Nilai",
								"template": " #= kendo.toString(nilai,'n2')#",
								"width": "100px"
							},{
								
								"field": "total",
								"title": "Total",
								"template": " #= kendo.toString(total,'n2')#",
								"width": "100px"
							}],
							dataBound: $scope.onDataBound
						}

						// $scope.mainGridOption = [
						// 	// {
						// 	// 	"field": "namaProduk",
						// 	// 	"title": "Nama Pemeriksaan",
						// 	// 	"width": "150px",
						// 	// 	footerTemplate: "Jumlah:"
						// 	// },
						// 	{
						// 		"field": "periode",
						// 		"title": "Periode",
						// 		"width": "150px",
						// 		// footerTemplate: "Jumlah:"
						// 	},
						// 	{
						// 		title: "<center>Tanggal</center> ",
						// 		columns: $scope.createColumnHari(),
						// 	},
						// 	{
								
						// 		"field": "nilai",
						// 		"title": "Nilai",
						// 		"template": " #= kendo.toString(nilai,'n2')#",
						// 		"width": "100px",
						// 		// footerTemplate: " #= kendo.toString(nilai,'n0')#"
						// 	},
						// 	{
								
						// 		"field": "total",
						// 		"title": "Total",
						// 		"template": " #= kendo.toString(total,'n2')#",
						// 		"width": "100px",
						// 		// footerTemplate: " #= kendo.toString(total,'n0')#"
						// 	},
						// 	// {
								
						// 	// 	"field": "count",
						// 	// 	"title": "Total",
						// 	// 	"width": "100px",
						// 	// 	aggregates: ["sum"],   
						// 	// 	footerTemplate: " #= kendo.toString(sum,'0')#"
						// 	// },
						// 	// {
								
						// 	// 	"field": "pointQty",
						// 	// 	"title": "Point x Qty",
						// 	// 	"width": "100px",	
						// 	// 	"format":"{0:n2}",
						// 	// 	aggregates: ["sum"],   
						// 	// 	footerTemplate: " #= kendo.toString(sum,'0.00')#"
						// 	// }
						// ];		

						/*dat.data.data.allProduk.forEach(function(data){
							$scope.sourceOrder.add(data);
						});*/
						var grid = $("#gridOrder").data("kendoGrid");
						if(grid != undefined){
							grid.destroy();
							if(dat.data.data.length > 0){
								$("#gridOrder").empty().kendoGrid({
									dataSource: $scope.sourceOrder
								});
							} else {
								$("#gridOrder").empty().kendoGrid({
									dataSource: new kendo.data.DataSource({data:[]}),
									columns: []
								});
							}
						} else {
							if(dat.data.data.length == 0){
								$scope.sourceOrder = new kendo.data.DataSource({data:[]}),
								$scope.mainGridOption = []
							}
						}

						$scope.isLoadingData = false;

					}, function(error){
						$scope.isLoadingData = false;
					});		
				} else {
					ModelItem.showMessages(isValid.messages);
				}
			}

			$scope.toogleCheckVerifikasi = function(current){
				if(current){
					$scope.daftarListPegawai = $scope.listPegawaiPensiun;
				} else {
					$scope.daftarListPegawai = $scope.listPegawai;
				}
			}

			$scope.$watch('item.pegawai', function(e){
                if (!e) return;
                if(e.id === undefined && e.idPegawai){
                    e.id = e.idPegawai
                }
            })
			
			/*$scope.sourceOrder = new kendo.data.DataSource({
				data: $scope.sourceOrder,
				aggregate: [
				{ field: "pointQty", aggregate: "sum"}
				,{ field: "[1]", aggregate: "sum" }
				,{ field: "[2]", aggregate: "sum" }
				,{ field: "[3]", aggregate: "sum" }
				,{ field: "[4]", aggregate: "sum" }
				,{ field: "[5]", aggregate: "sum" }
				,{ field: "[6]", aggregate: "sum" }
				,{ field: "[7]", aggregate: "sum" }
				,{ field: "[8]", aggregate: "sum" }
				,{ field: "[9]", aggregate: "sum" }
				,{ field: "[10]", aggregate: "sum" }
				,{ field: "[11]", aggregate: "sum" }
				,{ field: "[12]", aggregate: "sum" }
				,{ field: "[13]", aggregate: "sum" }
				,{ field: "[14]", aggregate: "sum" }
				,{ field: "[15]", aggregate: "sum" }
				,{ field: "[16]", aggregate: "sum" }
				,{ field: "[17]", aggregate: "sum" }
				,{ field: "[18]", aggregate: "sum" }
				,{ field: "[19]", aggregate: "sum" }
				,{ field: "[20]", aggregate: "sum" }
				,{ field: "[21]", aggregate: "sum" }
				,{ field: "[22]", aggregate: "sum" }
				,{ field: "[23]", aggregate: "sum" }
				,{ field: "[24]", aggregate: "sum" }
				,{ field: "[25]", aggregate: "sum" }
				,{ field: "[26]", aggregate: "sum" }
				,{ field: "[27]", aggregate: "sum" }
				,{ field: "[28]", aggregate: "sum" }
				,{ field: "[29]", aggregate: "sum" }
				,{ field: "[30]", aggregate: "sum" }
				,{ field: "[31]", aggregate: "sum" }
				,{ field: "count", aggregate: "sum" }

					// { field: "risk", aggregate: "totalRisk" }

					]
				});*/

			/*$scope.mainGridOption = {
				columns : [
				{
					"field": "namaProduk",
					"title": "Nama Pemeriksaan",
					"width": "10%",
					footerTemplate: "Jumlah:"
				},
				{
					
					title: "<center>Tanggal</center> ",
					columns: [
					{
						field: "[1]",
						title: "1",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"
					},
					{
						field: "[2]",
						title: "2",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"

					},
					{
						field: "[3]",
						title: "3",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"
						
						
					},
					{
						field: "[4]",
						title: "4",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"
						
					},
					{
						field: "[5]",
						title: "5",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"
						
					},
					{
						field: "[6]",
						title: "6",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"
						
					},
					{
						field: "[7]",
						title: "7",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"
						
					},
					{
						field: "[8]",
						title: "8",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"		
						
					},
					{
						field: "[9]",
						title: "9",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"	
						
					},
					{
						field: "[10]",
						title: "10",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"	
					},
					{
						field: "[11]",
						title: "11",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"	
						
					},
					{
						field: "[12]",
						title: "12",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"	
					},
					{
						field: "[13]",
						title: "13",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"	
						
					},
					{
						field: "[14]",
						title: "14",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"	
						
					},
					{
						field: "[15]",
						title: "15",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"	
						
					},
					{
						field: "[16]",
						title: "16",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"	
						
					},
					{
						field: "[17]",
						title: "17",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"	
						
					},
					{
						field: "[18]",
						title: "18",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"	
						
					},
					{
						field: "[19]",
						title: "19",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"	
						
					},
					{
						field: "[20]",
						title: "20",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"	
					},
					{
						field: "[21]",
						title: "21",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"	
					},
					{
						field: "[22]",
						title: "22",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"	
						
					},
					{
						field: "[23]",
						title: "23",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"	
					},
					{
						field: "[24]",
						title: "24",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"
						
					},
					{
						field: "[25]",
						title: "25",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"	
						
					},
					{
						field: "[26]",
						title: "26",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"	
						
					},
					{
						field: "[27]",
						title: "27",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"
					},
					{
						field: "[28]",
						title: "28",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"
						
					},
					{
						field: "[29]",
						title: "29",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"
						
					},
					{
						field: "[30]",
						title: "30",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"
					},
					{
						field: "[31]",
						title: "31",
						aggregates: ["sum"],   
						footerTemplate: " #= kendo.toString(sum,'0')#"
					}],

				},
				{
					
					"field": "count",
					"title": "Total",
					"width": "5%",
					aggregates: ["sum"],   
					footerTemplate: " #= kendo.toString(sum,'0')#"
				},
				{
					
					"field": "pointQty",
					"title": "Point x Qty",
					"width": "10%",	
					"format":"{0:n2}",
					aggregates: ["sum"],   
					footerTemplate: " #= kendo.toString(sum,'0.00')#"
					
				}] 		
			}*/
			
			
		//	for(i=0;i<$scope.sourceOrder;i++){
    //if($scope.items[i].namaProduk == 'ted'){
     // $scope.items.shift();
   // }
//}




















}
]);
});