define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPemeliharaanCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','ManageSarpras',
		function($rootScope, $scope, $state, ModelItem, DateHelper,ManageSarpras) {
		$scope.item = {};
		$scope.now = new Date();
	    $scope.item.awal = $scope.now;
	    $scope.item.akhir = $scope.now;
	    $scope.Rubahdat = false;

		    $scope.dataGrid = [{
				"no" : 1,
				"ruangan" : "Ruangan Dummy 1",
				"nomorAsset" : "1750000000053",
				"namaBarang" : "Dental Unit Dummy - 1",
				"merkBarang" : "Merk Oreo",
				"tipeBarang" : "Barang Bekas",
				"noSeri" : "001",
				"tahunPerolehan" : "2018",
				"teknologi" : "Teknologi Terbaik",
				"tanggal" : "2017-01-01"
		    },{
				"no" : 2,
				"ruangan" : "Ruangan Dummy 2",
				"nomorAsset" : "1750000000052",
				"namaBarang" : "Dental Unit Dummy - 2",
				"merkBarang" : "Merk Kitkat",
				"tipeBarang" : "Barang Bekas",
				"noSeri" : "001",
				"tahunPerolehan" : "2018",
				"teknologi" : "Teknologi Terbaik",
				"tanggal" : "2017-01-01"
		    },
		    {
				"no" : 2,
				"ruangan" : "Ruangan Dummy 3",
				"nomorAsset" : "1750000000052",
				"namaBarang" : "Dental Unit Dummy - 2",
				"merkBarang" : "Merk Milky",
				"tipeBarang" : "Barang Bekas",
				"noSeri" : "001",
				"tahunPerolehan" : "2018",
				"teknologi" : "Teknologi Terbaik",
				"tanggal" : "2017-01-01"
		    }];


		     $scope.sourceDataGrid = new kendo.data.DataSource({
			      pageSize: 10,
				  data: $scope.dataGrid
			});

		     $scope.Cari = function(Pencarians){
		     	debugger
		     	var values = Pencarians;
		     	var DataGrid = $('#grid').data("kendoGrid");
		     	DataGrid.dataSource.query({
		     		page:1,
		     		pageSize:20,
		     		filter:{
		     			logic:"or",
		     				filters:[
					     			 {field:"ruangan", operator:"contains", value:values},
					     			 {field:"nomorAsset", operator:"contains", value:values},
					     			 {field:"namaBarang", operator:"contains", value:values},
					     			 {field:"merkBarang", operator:"contains", value:values}
					     			]
	                        }
		     	})
		     }

			$scope.ClearCari = function(){
			    $scope.Pencarians = "";
			    var gridData = $("#grid").data("kendoGrid");
			    gridData.dataSource.filter({});
		    }

		    
		   $scope.kl = function(current){
		   	debugger
				$scope.current = current;
				$scope.merkBarang = current.merkBarang;
				$scope.namaBarang = current.namaBarang;
				$scope.no = current.no;
				$scope.noSeri = current.noSeri;
				$scope.nomorAsset = current.nomorAsset;
				$scope.ruangan = current.ruangan;
				$scope.tahunPerolehan = current.tahunPerolehan;
				$scope.tglplanning = current.tglplanning
				$scope.tanggal = current.tanggal;
				$scope.teknologi = current.teknologi;
				$scope.tipeBarang = current.tipeBarang;
			 }


		 	 var onChange = function(e) {
	         var grid = $(this).data("mainGridOptions");
	        }

	        $scope.cancel = function(){
	        	$state.go('PenjadwalanPreventive')
	        }
			 $scope.mainGridOptions = {
			 toolbar: ["excel"],
		            excel: {
		                fileName: "DashboardPerbaikan.xlsx",
		                filterable: false
		         },
				pageable:true,
				change:onChange,
				pageSize:10,
				selectable:'row',
				scrollable:true,
	            columns: [
	            {
	                "field": "no",
	                "title": "<h3 align=center>No.<h3>",
					"filterable":true,
				    "width": "30px",
				    "filterable" : false	
				},
	            {
	                "field": "ruangan",
	                "title": "<h3 align=center>Ruangan<h3>",
					"filterable":true,
				    "width": "100px",
				    "filterable" : false	
				},
				{
					"field" : "nomorAsset",
					"title" : "<h3 align=center>Nomor Asset<h3>",
					"filterable" : false,
					"width" : "100px"
				},
	            {
	                "field": "namaBarang",
	                "title": "<h3 align=center>Nama Barang<h3>",
					"filterable":false,
					"width": "100px"
				},
				{
	                "field": "merkBarang",
	                "title": "<h3 align=center>Merk<h3>",
				    "width": "70px",
					"filterable":false
				},
				{
	                "field": "tipeBarang",
	                "title": "<h3 align=center>Tipe<h3>",
	                "width": "70px",
					"filterable":false	
				},
				{
	                "field": "noSeri",
	                "title": "<h3 align=center>No Seri<h3>",
				    "width": "70px",
					"filterable":false
				},
				{
	                "field": "tahunPerolehan",
	                "title": "<h3 align=center>Tahun Perolehan<h3>",
	                "width": "70px",
					"filterable":false		
				},
				{
	                "field": "teknologi",
	                "title": "<h3 align=center>Teknologi<h3>",
	                "width": "70px",
					"filterable":false		
				},				
				{
	                "field": "tanggal",
	                "title": "<h3 align=center>Tanggal Pemeliharaan/Kontrak Service/Kalibrasi<h3>",
	                "width": "80px",
					"filterable":false		
				},
	           
	            ]};

			}
	]);
});

