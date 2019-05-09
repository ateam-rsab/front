define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPenerimaanLinenCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper','ManageSarpras','$state',
		function($rootScope, $scope, ModelItem, DateHelper,ManageSarpras,$state) {
		$scope.item = {};
		$scope.now = new Date();
		$scope.dataPost=[];
		$scope.datarow=[];

		$scope.daftarPenerimaanLinen = new kendo.data.DataSource({
			data: []
		});
	 
		 $scope.selectRow = function(dataItem){
			var dataObj = {
				noRecStrukPelayanan : dataItem.noRecStrukPelayanan,
				noStruk : dataItem.noStruk,
				tglTerima : dataItem.tglTerima,
				ruanganAsalId : dataItem.ruanganAsalId,
				namaRuangan : dataItem.namaRuanganAsal,
				berat : dataItem.berat,
				satuanId : dataItem.satuanId,
				namaSatuan : dataItem.namaSatuan	
			}
			var dataAaa = {
			noRecStrukPelayanan : dataItem.noRecStrukPelayanan,
			ruanganAsalId       :dataItem.ruanganAsalId
			}
				
		    var isExist = _.find($scope.datarow, function(dataExist){ 
				if (
				dataExist.noStruk == dataAaa.noStruk) {
					return true;
				} else {
					return undefined;
				}
			});

			if(isExist == undefined){
				$scope.datarow.push(dataAaa);
			 }else{
				$scope.datarow =  _.without($scope.datarow, _.findWhere($scope.datarow, {
				noStruk: dataAaa.noStruk
				}));
			 }
					
			var isExist = _.find($scope.dataPost, function(dataExist){ 
				if (
				dataExist.noStruk == dataObj.noStruk) {
					return true;
				} else {
					return undefined;
				}
			});

			if(isExist == undefined){
				$scope.dataPost.push(dataObj);
			}
			else{
				$scope.dataPost =  _.without($scope.dataPost, _.findWhere($scope.dataPost, {
					noStruk: dataObj.noStruk
				}));
			}
		}
			 
		 
		 $scope.Proses = function () {
			var period1 =  moment($scope.item.awal).format("YYYY-MM-DD 00:00:00");
			var period2 =  moment($scope.item.akhir).format("YYYY-MM-DD hh:mm:ss");
			ManageSarpras.getOrderList("laundry/get-all-penerimaan-linen-filter?startPeriode="+period1+"&endPeriode="+period2 ).then(function(dat){
				$scope.sourceOrder = new kendo.data.DataSource({
	            data: dat.data.data
	            });
			});		
		}
			
		  var onChange = function(e) {
                //var inputId = this.element.attr("id");
              //  console.log(inputId);
                var grid = $(this).data("mainGridOptions");

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
                     title: "<center><input type='checkbox' title='Select All' ng-click='toggleSelectAll($event)'></center>",
                    width: "3%",
                    template: "<div class='center'><input type='checkbox' class='checkbox' ng-model='dataItem.selected' ng-click='selectRow(dataItem)''></div>"
               }, {
                    "field": "noRecStrukPelayanan",
                    "title": "noRecStrukPelayanan",
			        hidden : true
			    }, {
                    "field": "noStruk",
                    "title": "Nomor Struk",
                    "filterable":true	
			   }, {
                    "field": "status",
                    "title": "Asal Linen",
					"filterable":true		
		      
					
				 }, {
                    "field": "ruanganId",
                    "title": "ruanganId",
                    hidden :true
                }, {
                    "field": "satuanId",
                    "title": "satuanId",
                    hidden :true	
					

                }, {
                    "field": "tglTerima",
                    "title": "Tanggal"	,
				    "width": "200px",
					"template": "#= new moment(new Date(tglTerima)).format('DD-MM-YYYY') #",
					"filterable":false
				}, {
                    "field": "namaRuanganAsal",
                    "title": "Ruangan",
                   "filterable":true			
				}, {
                    "field": "berat",
                    "title": "Berat",
                    "filterable":true				
				}, {
                    "field": "namaSatuan",
                    "title": "Satuan",
                    "filterable":true
				}, {
                    "field": "statusBayar",
                    "title": "Status Bayar",
                    "filterable":true
				}, {
                     "command": [{
                                   name: "edit",
                                        text: "Detail",
                                        text: { cancel: "", edit: "Detail" },
                                        icon: { cancel: "" },
                                        button: { cancel: "" }
                                 }],
                                    "title": "Detail",
                                     width: "100px"
                    }	
			     ],
                        //editable: "popup",
                        editable: {
                            mode: "popup",
							window : {
							title: "confirmation form"
							},
                            template: kendo.template($("#template").html())
                        },
                        //Change kendo window title
                        edit: function(e) {
                            e.container.kendoWindow("title", "Detail");
							
                        },
                        dataBound: function(e) {
                            $("#grid tbody tr .k-grid-edit").each(function() {
                                var currentDataItem = $("#grid").data("kendoGrid").dataItem($(this).closest("tr"));
                                debugger;
                                if (currentDataItem.status == "Internal") {
                                    $(this).closest("tr").find(".k-grid-edit").hide();
                                } else {

                                }
                            })
                        }
               };
	  
	  
	  
	   $scope.mainGridOptions_1_2 = function(dataItem) {
               return {
                    dataSource: new kendo.data.DataSource({
						data: dataItem.produkLinens
					}),
                    columns: [
                    {
	                    field: "namaProduk",
	                    title: "Nama Linen"
	                },
	                {
	                    field: "qtyProduk",
	                    title: "Jumlah"
					   
	                },
					    {
	                    field: "namaSatuan",
	                    title: "Satuan"
					   
	                },{
	                    field: "hargaSatuan",
	                    title: "Biaya"
					   
	                }
					
					
					]
                }
			}
	
		 
		 
		$scope.toggleSelectAll = function(ev) {
			debugger
				var grids = $('#kGrid').data("kendoGrid");
				var grid = $(ev.target).closest("[kendo-grid]").data("kendoGrid");
				var items = grid.dataSource.data();
				items.forEach(function(item){
					item.selected = ev.target.checked;
					var dataObj = {
					
					noRecStrukPelayanan : item.noRecStrukPelayanan,
					noStruk : item.noStruk,
					tglTerima : item.tglTerima,
					ruanganAsalId : item.ruanganAsalId,
					namaRuangan : item.namaRuanganAsal,
					berat : item.berat,
					satuanId : item.satuanId,
					namaSatuan : item.namaSatuan
							
				}
				var dataAaa = {
				noRecStrukPelayanan : item.noRecStrukPelayanan,
				ruanganAsalId:item.ruanganAsalId
				}
					$scope.dataPost.push(dataObj);
					$scope.datarow.push(dataAaa);
				});
			}; 
		 
		 
		    $scope.Save = function() {
            	ManageSarpras.saveDaftarPenerimaanLinen($scope.dataPost,"laundry/send-penerimaan-to-pencucian").then(function (e) {
			 		$scope.item.berat=e.data.data.berat;
            	});
            }
		 
		 
		 
		    $scope.CuciLinen = function() {
		    	debugger
				 ManageSarpras.saveDaftarPenerimaanLinen($scope.dataPost,"laundry/send-penerimaan-to-pencucian").then(function (e) {
					debugger
					$scope.item.berat=e.data.data.berat;
					var data = {
						"bobot" :$scope.item.berat,
						"berat" : $scope.datarow
				}
					console.log(JSON.stringify(data));
					 $state.go("PencucianLinenEksternal2", 
					 	{berat : JSON.stringify(data)
					 });
					 });
			}
		}
	]);
});
		 


//======================================================================SOURCE OLD DATA

	  //  $scope.item= {};
                 // init();  
                    /*$state.go('dashboardpasien.TandaVital', {
                     noCM: $scope.noCM
                     });*

	/*var search={};


	search.goleti=function(){
	ManageSarpras.saveDaftarPenerimaanLinen($scope.dataPost,"laundry/send-penerimaan-to-pencucian").then(function (e) {
	debugger;
	$scope.item.berat=e.data.data.berat;
	});
	};

	search.find=function(){
	$state.go("PenerimaanLinen",{berat:$scope.item.berat});
	};	
	search.goleti();
	search.find ();*/


	//	$scope.columndaftarPenerimaanLinen = [{
	//		"field": "tanggal",
	//		"title": "<h3 align=center>Tanggal</h3>",
	//		"width": "100px"
	//	}, {
	//		"field": "ruangan",
	//		"title": "<h3 align=center>Ruangan</h3>",
	//		"width": "100px"
	//	},{
	//		"field": "berat	",
	//		"title": "<h3 align=center>Berat</h3>",
	//		"width": "100px"
	//	}, {
	//		"field": "satuan",
	//		"title": "<h3 align=center>Satuan</h3>",
	//		"width": "100px"
	 //   }];
		 

