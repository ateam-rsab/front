define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPencucianLinenDetEksCtrl', ['$rootScope', '$scope', '$state', 'ModelItem', 'DateHelper','ManageSarpras',
		function($rootScope, $scope, $state, ModelItem, DateHelper,ManageSarpras) {
		$scope.item = {};
		$scope.now = new Date();
		$scope.daftarPencucianLinen = new kendo.data.DataSource({
			data: []
		});

		 var nomor = 1;
		 $scope.no = 1;
		 $scope.item.BeratLinen = $state.params.beratLinen
		 $scope.item.namaMesin = $state.params.namaAlat
		 $scope.noRec = $state.params.noRec;
		 ManageSarpras.getOrderList("laundry/get-proses-cuci-external-by-norec?noRec="+$scope.noRec).then(function(dat){
		 debugger
		 var sourceOrderBahan = [];
		 //Cek data di dalam
		 $scope.sourceall = dat.data.data;
		 for(var i = 0; i < $scope.sourceall.length; i++){
		 	debugger
		 	if($scope.sourceall[i].beratLinen != undefined && $scope.sourceall[i].idMesin != undefined){
		 	   $scope.sourceOrderHeader = $scope.sourceall[i];
		 	    $scope.item.tglplanning =  new moment(new Date($scope.sourceOrderHeader.tglplanning)).format('DD-MM-YYYY');
		         $scope.item.tglPlanningAkhir = new moment(new Date($scope.sourceOrderHeader.tglPlanningAkhir)).format('DD-MM-YYYY'); 
		 	}
		 	if($scope.sourceall[i].bahan != undefined){
		 		debugger
		 		var bilascuci = "• "+$scope.sourceall[i].bilas;
		 		var no = 1;
		 		var number = nomor++
		 		$scope.sourceall[i].bahan.forEach(function(dataTemp){
		 			debugger
		 		//Cek Apakah Kode Data Bilas sama, Jika sama maka kosongkan !!
		 			for(var x = 0; x<sourceOrderBahan.length; x++){
		 			    if(sourceOrderBahan[x].bilas == bilascuci){
		 			    	bilascuci = ""
		 			    	number = ""
		 			    }
		 			} 
		 			var dataBahan = {
		 			"nomor" : number,
		 			"norut" : no++,
		 			"bilas" : bilascuci,
		 			"idProduk" : dataTemp.idProduk,
		 			"idSatuan" : dataTemp.idSatuan,
		 			"jumlahBahan" :dataTemp.jumlahBahan,
		 			"namaProduk" : dataTemp.namaProduk,
		 			"satuan" : dataTemp.satuan
		 			}
		 			sourceOrderBahan.push(dataBahan);
		 		})
		 	}
		 	$scope.sourceOrderBahan = sourceOrderBahan;
		 }
		/* $scope.sourceOrderBahan = dat.data.data[0].bahan;*/
		 });	

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
                "field": "nomor",
                "title": "No.",
				"filterable":false,
				"width": "20px",
				"attributes": {
                             "class": "table-cell",
                              style: "text-align: center; font-weight: bold"
                           },
               	
		},
           {
                "field": "bilas",
                "title": "Proses Cuci",
				"filterable":false,
			    "attributes": {
                             "class": "table-cell",
                              style: "text-align: left; font-weight: bold"
                           },
                "width": "90px"
               	
			},
			{
                "field": "norut",
                "title": "No Urut",
				"filterable":false,
				"width": "30px",
				"attributes": {
                             "class": "table-cell",
                              style: "text-align: center; font-weight: bold"
                           },
               	
			},
			{
                "field": "namaProduk",
                "title": "Nama Bahan Baku Pencucian",
				"filterable":false,
				"width": "170px"
               	
			}, {
                "field": "jumlahBahan",
                "title": "Jumlah",
				"filterable":false,
				"width": "50px"	
               		
			},{
                "field": "satuan",
                "title": "Satuan",
				"filterable":false,
				"width": "50px"		
			}]			
            };

        $scope.Tutup = function(){
        	$state.go("DaftarPencucianLinenEks")
        }

		}
	]);
});

/*		 $scope.pindah = function(current){ 
			$state.go("PembilasanLinen",{nmmesin:$scope.item.nmmesin,kapasitas:$scope.item.kapasitas,namaPetugas:$scope.item.namaPetugas,beratLinen:$scope.item.beratLinen,prosesCuci:$scope.item.prosesCuci,mesinId:$scope.item.mesinId,petugasId:$scope.item.petugasId,ruanganAsalId:$scope.item.ruanganAsalId,noRecStrukPelayanan:$scope.item.noRecStrukPelayanan});
		 }*/