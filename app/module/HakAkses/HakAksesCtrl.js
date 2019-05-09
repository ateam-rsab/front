define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('HakAksesCtrl', ['$mdDialog', '$timeout', '$state', '$q', '$rootScope', '$scope', 'ModelItemDataMaster', 'ManageDataMaster', 'ModelItemAkuntansi',
		function($mdDialog, $timeout, $state, $q, $rootScope, $scope, modelItemDataMaster, manageDataMaster, modelItemAkuntansi) {
		   
		$q.all([
			//modelItemAkuntansi.getDataGeneric("ruangan", false),
			modelItemAkuntansi.getDataGeneric("pegawai", false),
			modelItemAkuntansi.getDataGeneric("kelompokUser", false),
			//manageDataMaster.getMenuTreeView("get-view-modul/", false),
		]).then(function(data) {
            /*if (data[0].statResponse)
            {
            	$scope.listRuangan = data[0]
            }*/

            if (data[0].statResponse)
            {
            	$scope.daftarPegawai = new kendo.data.DataSource({
					data: data[0],
				});
            } 

            if (data[1].statResponse)
            {
            	$scope.listKelompokuser = new kendo.data.DataSource({
					data: data[1],
				});
            } 

            /*$scope.treeDataMenu = new kendo.data.HierarchicalDataSource(
		        { 
		            data: data[3].data.data.listData
		        }
	        )*/
        });

        $scope.checkboxes = {
            checkChildren: true
        }

		/*$scope.treeDataMenu = new kendo.data.HierarchicalDataSource(
        { 
            data: [
	            {
	                id: 1, text: "Akuntansi", expanded: true, items: [
	                    {
	                        id: 1, text: "Setup Account", expanded: true, items: [
	                            { id: 1, text: "Chart Of Account" },
	                            { id: 2, text: "Periode Akuntansi"},
	                            { id: 3, text: "Mapping Coa"}
	                        ]
	                    },
	                    {
	                        id: 2, text: "Jurnal", expanded: true, items: [
	                            { id: 1, text: "Jurnal Umum Manual" },
	                            { id: 2, text: "Jurnal Entri"}
	                        ]
	                    },
	                    {
	                        id: 3, text: "Laporan", expanded: true, items: [
	                            { id: 1, text: "Buku Besar" },
	                            { id: 2, text: "Jurnal Utang"},
	                            { id: 3, text: "Laporan Keuangan" },
	                            { id: 4, text: "Neraca Percobaan"}
	                        ]
	                    }
	                ]
	            },
	            {
	                id: 2, text: "Kasir", expanded: true, items: [
	                    { id: 1, text: "Daftar Non Layanan"},
	                    { id: 2, text: "Daftar Tagihan Pasien"},
	                    { id: 3, text: "Daftar Penerimaan"},
	                    { id: 4, text: "Daftar Penjualan Apotek"},
	                    { id: 5, text: "Daftar Piutang"},
	                    { id: 6, text: "Daftar Pasien Aktif"}
	                ]
	            }
	        ]
        });*/

		

	    $scope.columnDaftarPegawai = [
			{
				"field": "id",
				"title": "Id Pegawai",
				"width":"50px",
				"template": "<span class='style-left'>#: id #</span>"
			},
			{
				"field": "namaLengkap",
				"title": "Nama Pegawai",
				"width":"200px",
				"template": "<span class='style-left'>#: namaLengkap #</span>"
			},
			{
				"title": "Action",
				"headerAttributes": {
			      	"style": "text-align: center"
		    	},
				"width":"50px",
				"template": "<span class='style-center'><button class='btnEdit' ng-click='editCoa()'>Edit</button> </span>"
			}
		];

		$scope.$watch('searchNamaPegawai', function(newValue, oldValue) {
            $scope.SearchData();
        });


		//fungsi search data
		$scope.SearchData = function()
		{
		  var nama = checkValue($scope, ["searchNamaPegawai"]);
		  var kriteriaFilter = [
		  	{ text:"namaLengkap", operator:"contains", value:nama }
		  ];

		  prosesSearch(kriteriaFilter);
		}

		function prosesSearch(kriteriaFilter){
			 var arrFilter = [];
			  for(var i=0; i<kriteriaFilter.length; i++){
			  	if(kriteriaFilter[i].value != "")
			  	{
			  		var obj = {
			  			field: kriteriaFilter[i].text, 
			  			operator: kriteriaFilter[i].operator, 
			  			value: kriteriaFilter[i].value
			  		};

			  		arrFilter.push(obj);
			  	}
			  }

		      var grid = $("#kGrid").data("kendoGrid");
		      grid.dataSource.query({
		      	page:1,
		        pageSize: 10,
		        filter:{
		          logic: "and",
		          filters: arrFilter
		         }
		      });
		}

		function checkValue(obj, param){
			var res="";
			var data = undefined;

			if(param.length > 1){
				if(obj[param[0]] != undefined)
				   data = obj[param[0]][param[1]]; 
			}
			else
			{
				data = obj[param[0]];
			}

			if(data != undefined)
			  var res = data;
		
			return res;
		}

    }]);
});