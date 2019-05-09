define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPenerimaanLinenKotorIntCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper','ManageSarpras','$state',
		function($rootScope, $scope, ModelItem, dateHelper,ManageSarpras,$state) {
		$scope.item = {};
		$scope.now = new Date();
		$scope.item.awal = $scope.now;
		$scope.item.akhir = $scope.now;
		$scope.dataPost=[];
		$scope.datarow=[];
		

		$scope.daftarPenerimaanLinen = new kendo.data.DataSource({
			data: []
		});

		$scope.Proses = function(){
			$scope.no = 1;
			if($scope.item.awal == undefined || $scope.item.akhir == undefined){
				window.messageContainer.error('Tanggal Awal & Tanggal Akhir Harus di isi')
			}else{
		      ManageSarpras.getOrderList("laundry/get-penerimaan-linen-internal-by-periode?startDate="+dateHelper.formatDate($scope.item.awal,'YYYY-MM-DD')+"&endDate="+dateHelper.formatDate($scope.item.akhir,'YYYY-MM-DD')).then(function(dat){
	            $scope.sourceOrder = dat.data.data;
	            for(var i=0; i<$scope.sourceOrder.length; i++){
	            	$scope.sourceOrder[i].no = $scope.no++
	            	$scope.sourceOrder[i].tglStruk = new moment(new Date($scope.sourceOrder[i].tglStruk)).format('DD-MM-YYYY');
	            	$scope.sourceOrder[i].tglTerima= new moment(new Date($scope.sourceOrder[i].tglTerima)).format('DD-MM-YYYY');
	            	 
	            }
			 });	
		   }	
		}
	 
        $scope.mainGridOptions = {
			pageable:true,
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
            columns: [
            {
                "field": "no",
                "title": "<h3 align=center>No.</h3>",
                "width" :"30px"
		    },
            {
                "field": "tglStruk",
                "title": "<h3 align=center>Tanggal Struk</h3>",
                "width" :"90px"
		    },
		    {
                "field": "tglTerima",
                "title": "<h3 align=center>Tanggal Terima</h3>",
                "width" :"90px"

		    },
		    {
                "field": "ruanganAsal",
                "title": "<h3 align=center>Asal Ruangan</h3>",
                "width" :"100px"
		    },  
            {
                "field": "namaMenyerahkan",
                "title": "<h3 align=center>Yang Menyerahkan</h3>",
                "width" :"100px"
		     
		    }, 
		    {
                "field": "petugas",
                "title": "<h3 align=center>Petugas</h3>",
                 "width" :"80px",
                "filterable":true	
		    }, 
		    {
                "field": "berat",
                "title": "<h3 align=center>Berat Linen</h3>",
                "width" :"50px",
				"filterable":true		
	      
			}, 
			{
                "field": "keterangan",
                "title": "<h3 align=center>Keterangan</h3>",
                "width" :"50px"
            } 
		    ],
            };



	  	 
/*		    $scope.Save = function() {
            	ManageSarpras.saveDaftarPenerimaanLinen($scope.dataPost,"laundry/send-penerimaan-to-pencucian").then(function (e) {
			 		$scope.item.berat=e.data.data.berat;
            	});
            }*/
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
		 

