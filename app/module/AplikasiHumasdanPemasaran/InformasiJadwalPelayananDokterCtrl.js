define(['initialize'], function(initialize) {
	'use strict';
	 initialize.controller('InformasiJadwalPelayananDokterCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper','InformasiDokter','InformasiRuangan','TampilPenghargaan','$state','ModelItemAkuntansi',
     function($rootScope, $scope, ModelItem,dateHelper,InformasiDokter,InformasiRuangan,TampilPenghargaan,$state,modelItemAkuntansi) {
	 $scope.item = {};
	 $scope.now = new Date();
	 $scope.item.periodeAwal =  new Date();
	 $scope.item.periodeAkhir = new Date();
	 $scope.isRouteLoading=false;
	 loadDataCombo();

	$scope.formatTanggal = function(tanggal){
		return moment(tanggal).format('DD-MMM-YYYY HH:mm');
	}

	function loadDataCombo(){
		$scope.item.periodeAwal=moment($scope.now).format('YYYY-MM-DD 00:00')
		$scope.item.periodeAkhir=moment($scope.now).format('YYYY-MM-DD 23:59')
		modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-pegawai", true, true, 20).then(function(data) {
            $scope.ListDokter=data;
        });

        modelItemAkuntansi.getDataTableTransaksi("humas/get-daftar-combo?", true).then(function(dat){
        	$scope.ListRuangan=dat.ruangan;
        });
        LoadData();
	}

	function LoadData(){
		$scope.isRouteLoading=true;
		var tglAwal=moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm')
		var tglAkhir=moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm')
		var dokter="";
		if($scope.item.dokter != undefined){
			dokter = $scope.item.dokter.id
		}
		var ruangan="";
		if($scope.item.ruangan != undefined){
			ruangan = $scope.item.ruangan.id
		}
		modelItemAkuntansi.getDataTableTransaksi("humas/get-daftar-jadwal-dokter?"
			+ "tglAwal=" + tglAwal
			+ "&tglAkhir=" + tglAkhir
			+ "&dokterId=" + dokter
			+ "&ruanganId=" + ruangan, true).then(function(dat){
			var datas = dat.callback;
			$scope.isRouteLoading=false;
            $scope.sourceJadwal = new kendo.data.DataSource({
				data: datas,//data[0].details,
        		// pageSize: 20,
				group: [
                    {field: "namaruangan"}
                ],
            	// pageSize: 10,
			});
        })
	}
	
	// debugger;
	// InformasiRuangan.getOrderList("service/list-generic/?view=Ruangan&select=*", true).then(function(dat){
	//  	$scope.ListDataRuangan = dat;
	 	

	// });

	// InformasiDokter.getOrderList("pegawai/get-all-dokter2", true).then(function(dat){
	// 	$scope.ListDataDokter = dat.data;
	// });
	
	// $scope.$watch("item.ruangan",function(){
	// 	if ( $scope.item.dokter != undefined )
			
	// 	    {
	// 			$scope.tampil=true;
	// 		}   
		
	//      }
		// )

	$scope.columndataMasterDataJadwal= [
		
		{
			"field": "namalengkap",
			"title": "Nama Dokter",
			"width": "300px"
		},
		// {
		// 	"field": "namaruangan",
		// 	"title": "Ruangan",
		// 	"width": "300px"
		// },
		{
			"field": "tanggaljadwal",
			"title": "Tanggal Praktek",
			"width": "300px"
		},
		{
			"field": "jampraktek",
			"title": "Jam Praktek",
			"width": "300px"	
		
	    }
	   
    ];
	
	$scope.SearchData = function(){
		LoadData();
	}		
			
		
	// $scope.cari = function()
	// {
	// 	LoadData();	
		// var listRawRequired = [
  //         "item.dokter|k-ng-model|Dokter",
  //         "item.ruangan|k-ng-model|Ruangan",
  //         "item.tanggalawal|k-ng-model|Tanggal Daftar",
  //         "item.tanggalakhir|k-ng-model|Tanggal Daftar"
         
  //       ];
  //       var isValid = ModelItem.setValidation($scope, listRawRequired);
	 
		// var idruang = $scope.item.ruangan.id;
		// var iddokter = $scope.item.dokter.id;
		
		// DateHelper.getPeriodeFormatted(new Date(tanggalawal));
		// DateHelper.getPeriodeFormatted(new Date(tanggalakhir));

		// var tanggalawal = DateHelper.getPeriodeFormatted($scope.item.tanggalawal);
		// var tanggalakhir = DateHelper.getPeriodeFormatted($scope.item.tanggalakhir);

  //           debugger;

		//  	InformasiRuangan.getOrderList("jadwalDokter/find-by-periode-ruangan-dokter?iddok="+iddokter+"&id="+idruang+"&from="+tanggalawal+"&to="+tanggalakhir+"").then(function(dat){
		//  			 debugger;
		//  	$scope.listData = dat.data.data.data;
		//  	if ($scope.listData == undefined){
		//  		alert("Data tidak ada!!, Dokter Belum Mempunyai Jadwal Pelayanan");
		//  	}
		//  	$scope.sourceOrde = new kendo.data.DataSource({data:$scope.listData });	
		
		// });
	// }
	
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		
		}
	]);
});