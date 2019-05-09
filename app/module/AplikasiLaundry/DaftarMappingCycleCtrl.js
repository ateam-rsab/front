define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarMappingCycleCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper','$state','FindSarpras','ManageSarpras',
		function($rootScope, $scope, ModelItem, DateHelper, $state,FindSarpras,ManageSarpras) {
		$scope.item = {};
		$scope.daftarMappingCycle = new kendo.data.DataSource({
			data: []
		});

		FindSarpras.getSarpras("mapping-cycle/get-all/").then(function(dat){
         $scope.daftarMappingCycle = dat.data.data.listMappincCycle;
        });

        $scope.Selected =function(current){
        	debugger
        	$scope.idMesin = current.idMesin;
            $scope.idJenisLinen = current.idJenisLinen;
            $scope.prosesCuci = current.prosesCuci;
            $scope.jenisLinen = current.jenisLinen;
            $scope.namaBahan = current.namaBahan;
        	$scope.namaMesin = current.namaMesin;
        	$scope.kapasitas = current.kapasitas;
        	$scope.idProsesCuci = current.idProsesCuci;
        	$scope.noRecInduks = current.noRec;
        }

		$scope.home = function(){
		    $state.go('home');
		}

        $scope.baru = function(){
    		$state.go('MappingCycle');
        }

        $scope.edit = function(){
        	if($scope.noRecInduks != undefined){
        		$state.go("MappingCycle",
					{
						noRec:$scope.noRecInduks
					})
        	}else{
        		toastr.warning("Pilih 1 Daftar Terlebih dahulu !")
        	}
        }

    	$scope.mainGridOptions = { 
			pageable: true,
			filterable: {
						  extra: false,operators: {string: {startsWith: "Pencarian"}}
					    },
            sortable: true,
     	}

		 $("#btnSearch").kendoButton({
		    click:Croot
		 })

		 $("#btnClear").kendoButton({
		  	click:clearFilters
		 });

		 function clearFilters() {
		  	 $scope.Pencarians = "";
		    var gridData = $("#GridKendo").data("kendoGrid");
		    gridData.dataSource.filter({});
		}


		function createMultiSelect(element) {
		  var DataBinding = _.sortBy(_.uniq(_.pluck($scope.daftarMappingCycle, "jenisLinen")), function(n) { return n; });
          element.removeAttr("data-bind");
          element.kendoMultiSelect({
            dataSource: DataBinding,
            change: function(e) {
              var filter = { logic: "or", filters: [] };
              var values = this.value();
              $.each(values, function(i, v) {
                filter.filters.push({field: "jenisLinen", operator: "eq", value: v });
              });
              console.log(this.dataSource.data());
              dataSource.filter(filter);
            }
          });
        }

		 var tabstrip = $("#tabstrip").kendoTabStrip().data("kendoTabStrip");
		 function Croot(){ 
		  	debugger
		      var q = $("#txtSearchString").val();
		      var grid = $("#GridKendo").data("kendoGrid");
		     	  grid.dataSource.query({
		          page:1,
		          pageSize:20,
		          filter:{
		          	logic:"or",
		         		 filters:[
		            		       {field:"namaMesin", operator:"contains",value:q},
		            		       {field:"jenisLinen", operator:"contains",value:q},
		            		       {field:"prosesCuci", operator:"contains",value:q}
		           				 ]
		           }
		      });
		   }

			 $scope.mainGridOptions_1_1 = {
			 	    dataSource : $scope.daftarMappingCycle,
			        pageable: true,
			        scrollable: false,
			        shortable: true,
			        toolbar: ["excel"],
			        pageSize: 20,
			        filterable: {
			        			extra: false,operators: {string: {startsWith: "Pencarian"}}
							    },
			        columns: [
			        {
			            "field": "namaMesin",
			            "title": "<h3 align=center>Nama Mesin</h3>",
			            "width": "30px",
			            "filterable" : {search : true,multi: true}
			        },
			        {
						"field": "jenisLinen",
						"title": "<h3 align=center>Jenis Linen</h3>",
						"width": "100px",
						"filterable":false,
					},
					{
						"field": "kapasitas",
						"title": "<h3 align=center>Kapasitas</h3>",
						"width": "100px",
						"filterable" : {search : true,multi: true}
			        },
			        {
						"field": "prosesCuci",
						"title": "<h3 align=center>Proses Cuci</h3>",
						"width": "200px",
						"filterable" : {search : true,multi: true}
				 	},
				 	{
					    "title": "<h3 align=center>Action</h3>",
			      		"width" : "5px",
			     		"template" : "<center><button class='btnHapus' ng-click='disableData()'>Disable</button></center>"
				     }
			      ]
			  };
/*	    $scope.no = -1;*/
	    $scope.mainGridOptions_1_2 = function(dataItem) {
	    	debugger
	    	var SubDaftarMapping = []
	    	$scope.daftarMappingCycle.forEach(function(data){
	            var noRecDuk = data.noRec
	                 data.namaBahan.forEach(function(Subdata){
	                 	debugger
	                       var dataChild =	{ 
	                       					/* "no" : $scope.no++,*/
	                 					  	 "idBahan": Subdata.idBahan,
	                 					  	 "namaBahan": Subdata.namaBahan,
	        		 					  	 "jumlah": Subdata.jumlah,
	        							 	 "idSatuan": Subdata.idSatuan,
	        							 	 "satuan": Subdata.satuan,
	                 					  	 "noRec": Subdata.noRec,
	                 					  	 "noRecInduk" : noRecDuk
	                                        }
	                        SubDaftarMapping.push(dataChild); 
	                     })
	           })
	    	   $scope.SubdataGrid = SubDaftarMapping; 
	          return {
	                dataSource: {
	                    data: $scope.SubdataGrid,
	                    pageSize: 20,
	                     filter: { field: "noRecInduk", operator: "eq", value: dataItem.noRec}
	                },
	               filterable: {
								 extra: false,operators: {string: {startsWith: "Pencarian"}}
					 			},
	                pageable: true,
	                scrollable: true,
	                shortable: true,
	                columns: 
	                $scope.columns = [
/*	                {
	                    "field": "no",
	                    "title": "No",
	                    "width" : "20px",
	                },*/
	                {
	                    "field": "namaBahan",
	                    "title": "Nama Bahan",
	                    "width" : "80px",
	                },
	                {
	                    "field": "jumlah",
	                    "title": "Jumlah",
	                    "width" : "80px",
	                },
	                {
	                    "field": "satuan",
	                    "title": "satuan",
	                    "width" : "80px",
	                }
	            ]
	          }
	        };

		$scope.disableData = function(){
			if($scope.noRecInduks != undefined){   	
				var dat = $scope.namaBahan;
				console.log(JSON.stringify(dat));
				var i=0;
				var mapCycle = [];
				dat.forEach(function(data){
		            var data ={
								"namaBahan":{"id" : data.idBahan},
							    "jumlah" : parseInt(data.jumlah),
							    "satuan":{"id" : data.idSatuan},
							    "statusEnabled":"false",
							    "noRec" : data.noRec
						      }
						mapCycle[i] = data;
						i++;
					})
					console.log(JSON.stringify(mapCycle));
					var data = {
								    "mesin": 
									{
										"id": $scope.idMesin  
										
									},
									"jenisLinen": 
									{
										"id": $scope.idJenisLinen
									},
									"prosesCuci": 
									{
										"id": $scope.idProsesCuci
									},
									"statusEnabled" : "false",
									"noRec" :$scope.noRecInduks,
									"mapCycle": mapCycle
					            }
		    		console.log(JSON.stringify(data));
		    		ManageSarpras.saveSarpras(data,"mapping-cycle/save-mapping-cycle/").then(function(e) {
		    			$scope.item = {};
		    	    });
		        }else{
		        	toastr.warning("Harap Pilih 1 Data Terlebih dahulu !!")
		        }
	      };

		    $scope.tutup= function(){
		    	$state.go('MappingCycle')
		    }

		}
	]);
});


	//OLD COLUMN ===========================================================================================
		// $scope.columndaftarMappingCycle = [{
		// 	"field": "namaMesin",
		// 	"title": "<h3 align=center>Mesin</h3>",
		// 	"width": "100px"
		// }, 
		// {
		// 	"field": "jenisLinen",
		// 	"title": "<h3 align=center>Jenis Linen</h3>",
		// 	"width": "200px"
		// }, 
		// {
		// 	"field": "kapisitas",
		// 	"title": "<h3 align=center>Kapasitas</h3>",
		// 	"width": "100px",
		// 	"filterable" : false
		// },{
		// 	"field": "prosesCuci",
		// 	"title": "<h3 align=center>Proses Cuci</h3>",
		// 	"width": "100px",
		// 	"filterable" : false
		// },{
		// 	"field": "namaBahan",
		// 	"title": "<h3 align=center>Nama Bahan</h3>",
		// 	"width": "200px"
		// }, {
		// 	"field": "jumlah",
		// 	"title": "<h3 align=center>Jumlah</h3>",
		// 	"width": "100px",
		// 	"filterable" : false
		// },{
		// 	"field": "satuan",
		// 	"title": "<h3 align=center>Satuan</h3>",
		// 	"width": "100px",
		// 	"filterable" : false
		// }, 
		// // {
		// // 	"field": "status",
		// // 	"title": "<h3 align=center>Status</h3>",
		// // 	"width": "100px"
	 // //    }
	 // 	{
		//  "title": "<h3 align=center>Action</h3>",
	 //      "width" : "100px",
	 //     "template" : "<button class='btnHapus' ng-click='disableData()'>Disable</button>"
		// }
	 //    ];

//Old Get=============================================================================================================
	 //      $scope.daftarMapping = {
		//   "data": {
		//     "listMappincCycle": [
		//       {
		//         "idJenisLinen": 3227,
		//         "prosesCuci": null,
		//         "jenisLinen": "VK",
		//         "namaBahan": [
		//           {
		//             "idBahan": 13469,
		//             "namaBahan": "ALAS MEJA OPERASI",
		//             "jumlah": 1,
		//             "idSatuan": 145,
		//             "noRec": "40288c8360d9f8390160e49452af0107",
		//             "satuan": "Potong"
		//           }
		//         ],
		//         "idMesin": 1,
		//         "namaMesin": "Mesin 1",
		//         "kapasitas": 40,
		//         "idProsesCuci": 2021,
		//         "noRec": "40288c8360d9f8390160e49452af0106"
		//       },
		//       {
		//         "idJenisLinen": 3227,
		//         "prosesCuci": "2",
		//         "jenisLinen": "VK",
		//         "namaBahan": [
		//           {
		//             "idBahan": 13472,
		//             "namaBahan": "DUK LOBANG SUNAT",
		//             "jumlah": 20,
		//             "idSatuan": 145,
		//             "noRec": "2c90e3e560f7db9b0160f7f34b660002",
		//             "satuan": "Potong"
		//           }
		//         ],
		//         "idMesin": 1,
		//         "namaMesin": "Mesin 1",
		//         "kapasitas": 40,
		//         "idProsesCuci": 2026,
		//         "noRec": "2c90e3e560f7db9b0160f7f34b650001"
		//       },
		//       {
		//         "idJenisLinen": 3227,
		//         "prosesCuci": "",
		//         "jenisLinen": "VK",
		//         "namaBahan": [
		//           {
		//             "idBahan": 13468,
		//             "namaBahan": "ALAS LANTAI MEJA OPERASI",
		//             "jumlah": 200,
		//             "idSatuan": 145,
		//             "noRec": "2c90e3e560f7db9b0160f815536a0004",
		//             "satuan": "Potong"
		//           }
		//         ],
		//         "idMesin": 1,
		//         "namaMesin": "Mesin 1",
		//         "kapasitas": 40,
		//         "idProsesCuci": 2040,
		//         "noRec": "2c90e3e560f7db9b0160f81553690003"
		//       },
		//       {
		//         "idJenisLinen": 3229,
		//         "prosesCuci": "",
		//         "jenisLinen": "PUTIH",
		//         "namaBahan": [
		//           {
		//             "idBahan": 13469,
		//             "namaBahan": "ALAS MEJA OPERASI",
		//             "jumlah": 300,
		//             "idSatuan": 145,
		//             "noRec": "2c90e3e560f7db9b0160f815c5740006",
		//             "satuan": "Potong"
		//           },
		//           {
		//             "idBahan": 13468,
		//             "namaBahan": "ALAS LANTAI MEJA OPERASI",
		//             "jumlah": 200,
		//             "idSatuan": 145,
		//             "noRec": "2c90e3e560f7db9b0160f815c5760007",
		//             "satuan": "Potong"
		//           }
		//         ],
		//         "idMesin": 1,
		//         "namaMesin": "Mesin 1",
		//         "kapasitas": 40,
		//         "idProsesCuci": 2040,
		//         "noRec": "2c90e3e560f7db9b0160f815c5740005"
		//       },
		//       {
		//         "idJenisLinen": 3227,
		//         "prosesCuci": "",
		//         "jenisLinen": "VK",
		//         "namaBahan": [],
		//         "idMesin": 1,
		//         "namaMesin": "Mesin 1",
		//         "kapasitas": 40,
		//         "idProsesCuci": 2040,
		//         "noRec": "2c90e3e560f8e69d0160f8ec91970000"
		//       }
		//     ]
		//   },
		//   "messages": {
		//     "label-success": "SUKSES"
		//   }
		// }

		//$scope.daftarMappingCycle = $scope.daftarMapping.data.listMappincCycle;
