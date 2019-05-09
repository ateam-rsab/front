define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('ProduksiBMHPCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService','$state',
		function($rootScope, $scope, ModelItem, IPSRSService,$state) {
			$scope.item = {};
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.disabledSave = true;
			function init() {
				IPSRSService.getItem("cssd-bmhp/get-stok-by-ruangan").then(function(dat){
					$scope.dataMaster = dat.data.data;
					$scope.dataSourceBMHP = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataMaster
					});
				});
			}
			init();
			$scope.produk = ModelItem.kendoHttpSource('cssd-bmhp/get-stok-by-ruangan', true);
			$scope.mainGridOptions = { 
				pageable: true,
			    filterable: {
						  extra: false,operators: {string: {startsWith: "Pencarian"}}
				},
				columns: [
				{ field:"namaProduk",title:"<h3 align=center>Nama Produk</h3>", width:"160px",filterable:true},
				{ field:"qtyProduk",title:"<h3 align=center>Quantity</h3>", width:"70px",filterable:false},
				{ field:"Totalqty",title:"<h3 align=center>Total Qty</h3>", width:"70px",filterable:false},
				{ field:"stok",title:"<h3 align=center>Stok</h3>",width:"100px",filterable:false}],
				editable: false
			};

			$scope.Batal = function(){
				$state.go('home');
			} 

			$scope.GetDataProduk = function(){
			  $scope.item.jumlah = undefined;
			  var nom = 1;
			  IPSRSService.getItem("cssd-bmhp/get-stok-by-ruangan").then(function(dat){
			  $scope.dataMaster = dat.data.data;
			  $scope.dataMaster.forEach(function (data) {
				 if (data.idProduk == $scope.item.namaBarang.idProduk) {	
				 	$scope.dataBahan = new kendo.data.DataSource({
						pageSize: 10,
						data: data.bahanMentah
					});
				  }
			   })
			 });
			}

		$scope.hitung = function(){
		  $scope.disabledSave = false;
		  $scope.nomor = 1;
		  $scope.isLoading = true;
			if(($scope.item.namaBarang != undefined) && ($scope.item.jumlah != undefined)){
				  IPSRSService.getItem("cssd-bmhp/get-stok-by-ruangan").then(function(dat){
					$scope.dataMaster = dat.data.data;
					$scope.dataMaster.forEach(function (data) {
						if (data.idProduk == $scope.item.namaBarang.idProduk) {	
							data.bahanMentah.forEach(function (e) {
								var TotalProduk = (e.qtyProduk * parseInt($scope.item.jumlah));
						  		e.Totalqty = TotalProduk;
						  		e.no = $scope.nomor++;
					    	 })	
							$scope.dataBahan = new kendo.data.DataSource({
								pageSize: 10,
								data: data.bahanMentah
							});
						}
					})
					$scope.isLoading = false;
					$scope.disabledSave = true;
					});
			}else{
				if($scope.item.namaBarang == undefined){
					window.messageContainer.error('Harap Pilih Nama Barang terlebih dahulu')
				}else{
					window.messageContainer.error('Harap isi jumlah terlebih dahulu')	
				}
				
				$scope.isLoading = false;
				$scope.disabledSave = true;
			}

		}
		  
			$scope.simpan = function () {
				var dataArray = [];
				var dataTotal = []
				for (var i=0;i<$scope.dataBahan._data.length;i++){ 
					if (($scope.dataBahan._data[i].qtyProduk * parseInt($scope.item.jumlah)) > $scope.dataBahan._data[i].stok) {
						dataTotal.push($scope.dataBahan._data[i].namaProduk)
					}
				}
				if (dataTotal.length != 0) {
					window.messageContainer.error(dataTotal.toString()+" Melebihi Jumlah Stok")
				} else {
					for (var i=0;i<$scope.dataBahan._data.length;i++){
						var temp = 
						{
					      "produk": {
					        "id": $scope.dataBahan._data[i].idProduk
					      },
					      "qty": $scope.dataBahan._data[i].qtyProduk
					    }
					    dataArray.push(temp);
					}
					var dataSimpan = 
					{
					  "produk": {
					  	"id": $scope.item.namaBarang.idProduk
					  },
					  "qtyProduk": parseInt($scope.item.jumlah),
					  "harga": parseInt($scope.item.harga),
					  "cssdProduksiBmhpDetail": dataArray
					}
					IPSRSService.saveDataSarPras(dataSimpan, "cssd-bmhp/produksi-bmhp/").then(function(e) {
	                });
				}
				

			}
		}
		]);
});

//=================================Source Old =============================================
/*$scope.getDataTable = function () {
IPSRSService.getItem("cssd-bmhp/get-stok-by-ruangan").then(function(dat){
$scope.dataMaster = dat.data.data;
$scope.dataMaster.forEach(function (data) {
	if (data.idProduk == $scope.item.namaBarang.idProduk) {
		$scope.dataBahan = new kendo.data.DataSource({
			pageSize: 10,
			data: data.bahanMentah
		});
	}
})

});
}*/

/*$scope.$watchGroup(['item.jumlah','item.namaBarang'], function(newValued, oldValue){
debugger
$scope.nomor = 1;
if((newValued[0] != undefined) && (oldValue[1] !=undefined)){
	debugger
	IPSRSService.getItem("cssd-bmhp/get-stok-by-ruangan").then(function(dat){
	$scope.dataMaster = dat.data.data;
	$scope.dataMaster.forEach(function (data) {
		if (data.idProduk == $scope.item.namaBarang.idProduk) {
		    	data.bahanMentah.forEach(function (e) {
				var TotalProduk = (e.qtyProduk * parseInt($scope.item.jumlah));
		  		e.Totalqty = TotalProduk;
		  		e.no = $scope.nomor++;
	    		})	
			$scope.dataBahan = new kendo.data.DataSource({
				pageSize: 10,
				data: data.bahanMentah
			});
		}
	})
});
}
})*/