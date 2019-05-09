define(['initialize'], function(initialize) {

	'use strict';
	initialize.controller('RouteFarmasiCtrl', 
		
		['$q', '$rootScope', '$scope', 'IPSRSService','ManagePhp',

			function($q, $rootScope, $scope, IPSRSService,ManagePhp) {
				$scope.item = {};
	
				$scope.dataVOloaded = true;
				$scope.now = new Date();


				// $scope.dataRouteFarmasi = new kendo.data.DataSource({
				// 	data: []
				// });

				$scope.columnRouteFarmasi = [
					{
						"field": "no",
						"title": "No"
					},
					{
						"field": "name",
						"title": "name"
					},
					{
						"field": "reportdisplay",
						"title": "report Display"
					},
					{
						"field": "kodeexternal",
						"title": "kode External"
					},
					{
						"field": "namaexternal",
						"title": "nama External"
					},
					{
						"field": "statusenabled",
						"title": "status Enabled"
					},

					{
							"command":
								[
									{
										text: "Enabled", 
										click: enableData, 
										// imageClass: "k-icon k-floppy"
									},
								
									{
										text: "Disable", 
										click: disableData, 
										// imageClass: "k-icon k-delete"	
									}
								],

							title: "",
							width: "200px",
					}

			];


				$scope.mainGridOptions = { 
					pageable: true,
		 		    columns: $scope.columnRouteFarmasi,
		 		    editable: "popup",
		 			selectable: "row",
		 		    scrollable: false
	 			};


				var init = function () {
					
					loadData();
				}

				init();


				function loadData(){
					var routeFarmasi = "";
					if ($scope.item.cariRouteFarmasi != undefined) {
						routeFarmasi = "&routefarmasi=" + $scope.item.cariRouteFarmasi;
					}

					ManagePhp.getData("generic/get-route-farmasis?"+ routeFarmasi).then(function(dat){
						// debugger
						$scope.listDataMaster = dat.data.routefarmasis;
						 // debugger	                                    					
							$scope.dataSource = new kendo.data.DataSource({
								pageSize: 10,
								data: $scope.listDataMaster,
								autoSync: true

							});

					});
				}

				$scope.batal = function () {
						$scope.showEdit = false;
						$scope.item = {};
				}


				$scope.cari = function () {
					// debugger

					loadData()
				}

				
				function disableData(e){
 

	 				e.preventDefault();
					var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

					if(!dataItem){
						toastr.error("Data Tidak Ditemukan");
						return;
					}

		 			ManagePhp.getData("route-farmasi/update-status-enabled-route-farmasi?id="+dataItem.id+"&statusenabled=false").then(function(dat){
						 
							toastr.success(dat.data.message);
							init();
					});

 				};


				function enableData(e){
	 
					e.preventDefault();
						var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

						if(!dataItem){
							toastr.error("Data Tidak Ditemukan");
							return;
						}

						ManagePhp.getData("route-farmasi/update-status-enabled-route-farmasi?id="+dataItem.id+"&statusenabled=true").then(function(dat){
					 
						toastr.success(dat.data.message);
						init();
					});
				}; 


				//// save 
				$scope.simpan = function(){

				var kodeexternal="";
				var namaexternal="";
				var reportdisplay="";
				var name="";

				var id="";
	
				if ($scope.item.name == undefined || $scope.item.name=="") {
						alert("Name harus di isi!")
						return
				}else{
					name = $scope.item.name
				}
	
				if ($scope.item.kodeExternal != undefined) {
					kodeexternal=$scope.item.kodeExternal
				}
				if ($scope.item.namaExternal != undefined) {
					namaexternal=$scope.item.namaExternal
				}

				if ($scope.item.reportDisplay != undefined) {
					reportdisplay=$scope.item.reportDisplay
				}

				if ($scope.item.id != undefined) {
					id=$scope.item.id
				}

				var data = {
									

							kodeexternal:kodeexternal,
							namaexternal:namaexternal,
							reportdisplay:reportdisplay,
							name:name,
							id:id,
									
				}

				var objSave =
					{
						routefarmasi: data

					}
				
				ManagePhp.postData2("route-farmasi/simpan-route-farmasi",objSave).then(function (e) {

					loadData();
					$scope.item = {};
					

				});

				


  			}

  			////fungsi klik untuk edit

				$scope.klik = function(current){
					// debugger
					$scope.showEdit = true;
					$scope.current = current;
					
					
					$scope.item.name = current.name;
					$scope.item.id = current.id;
					$scope.item.noRec = current.norec;
					$scope.item.reportDisplay = current.reportdisplay;
					$scope.item.kodeExternal = current.kodeexternal;
					$scope.item.namaExternal = current.namaexternal;
					$scope.item.statusEnabled = current.statusenabled;	
					
					
				};


// 
 


			}

		]
	);

});