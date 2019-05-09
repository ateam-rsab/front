define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DashboardPerbaikanCtrl', ['$rootScope', '$scope', 'ModelItem', 'IPSRSService', 'DateHelper', '$state', '$mdDialog',
		function($rootScope, $scope, ModelItem, IPSRSService, DateHelper, $state, $mdDialog) {
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.item.tanggalAwal = $scope.now;
			$scope.item.tanggalAkhir = $scope.now;
			$scope.listRuangan = ModelItem.kendoHttpSource('service/list-generic/?view=Ruangan&select=namaRuangan,id', true);
			$scope.listAlat = ModelItem.kendoHttpSource('service/list-generic/?view=Produk&select=namaProduk,id', true);
			
			$scope.refresh = function(){
			  $scope.item.tanggalAwal = $scope.now;
			  $scope.item.tanggalAkhir = $scope.now;
			  $scope.init();
			}

			$scope.init = function () {
				debugger
				var tanggalAwal = DateHelper.getTanggalFormattedNew($scope.item.tanggalAwal);
				var tanggalAkhir = DateHelper.getTanggalFormattedNew($scope.item.tanggalAwal); 
			    //IPSRSService.getItem("psrsPermintaanPerbaikan/monitoring").then(function(dat){
			    IPSRSService.getItem("psrsPermintaanPerbaikan/monitoring?ruanganId=&noAset=&produkId=&dateStart="+tanggalAwal+"&dateEnd="+tanggalAkhir).then(function(dat){
			    	debugger
				    $scope.dataMaster = dat.data.data;
				    $scope.nomor = 1;
				    $scope.dataMaster.forEach(function (data) {
				    	debugger
				    	if(data.tanggalKonfirmasi != null){
				    		var date1 = new Date(data.tanggalKonfirmasi);
				    	}else{
				    		var date1 = "-"
				    	}
				    	if(data.tanggalRespon != null){
				    		var date2 = new Date(data.tanggalRespon);	
				    	}else{
				    		var date2 = "-"
				    	}
				    	if(data.tanggalMulai != null){
				    	    var date3 = new Date(data.tanggalMulai);	
				    	}else{
				    		var date3 = "-"
				    	}
				    	if(data.tanggalLapor != null){
				    		var date4 = new Date(data.tanggalLapor);
				    	}else{
				    		var date4 = "-"
				    	}
				    	if(data.tanggalSelesai != null){
				    		var date5 = new Date(data.tanggalSelesai);
				    	}else{
				    		var date5 = "-"
				    	}
				    	
				    	if(date3 == "-"){
				    		data.mulai = "-"	
				    	}else{	
				    		data.mulai = DateHelper.formatDate(date3,"YYYY-MM-DD");	
				    	}
				    	
				    	if (data.tanggalSelesai == null) {
				    		data.selesai = "-";
				    	} else {
				    		data.selesai = DateHelper.formatDate(date5,"YYYY-MM-DD");
				    	}
				    	if(data.noVerifikasi == null){
				    	   data.noVerifikasi = "Belum Diverifikasi";
				    	}
				    	
				    	if(date4 == "-"){
							data.lapor = "-";	
				    	}else{
				    		data.lapor = DateHelper.formatDate(date4,"YYYY-MM-DD");
				    	}

				    	if(date2 == "-"){
				    		data.respon = "-";
				    	}else{
				    		data.respon = DateHelper.formatDate(date2,"YYYY-MM-DD");
				    	}

				    	if(date1 == "-"){
				    		data.tiba = "-";
				    	}else{
				    	    data.tiba = DateHelper.formatDate(date1,"YYYY-MM-DD");
				    	}
				    	
				    	data.no = $scope.nomor++
				    })
					$scope.dataGrid = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataMaster
					});
				});
			}
			$scope.init()
			$scope.cari = function () {
				debugger
				if ($scope.item.ruangan == undefined) {
					$scope.ruangan = "";
				} else {
					$scope.ruangan = $scope.item.ruangan.id;
				}
				if ($scope.item.noAsset == undefined) {
					$scope.noAsset = "";
				} else {
					$scope.noAsset = $scope.item.noAsset;
				}
				if ($scope.item.alat == undefined) {
					$scope.produk = "";
				} else {
					$scope.produk = $scope.item.alat.id;
				}
				if ($scope.item.tanggalAwal == undefined) {
					$scope.tanggalAwal = "";
				} else {
					var tglAwal = new Date($scope.item.tanggalAwal);
					$scope.tanggalAwal = DateHelper.getTanggalFormattedNew(tglAwal);
				}
				if ($scope.item.tanggalAkhir == undefined) {
					$scope.tanggalAkhir = "";
				} else {
					var tglAkhir = new Date($scope.item.tanggalAkhir);
					$scope.tanggalAkhir = DateHelper.getTanggalFormattedNew(tglAkhir);
				}
				IPSRSService.getItem("psrsPermintaanPerbaikan/monitoring?ruanganId="+$scope.ruangan+"&noAset="+$scope.noAsset+"&produkId="+$scope.produk+"&dateStart="+$scope.tanggalAwal+"&dateEnd="+$scope.tanggalAkhir).then(function(dat){
				    $scope.dataMaster = dat.data.data;
				    $scope.nomor = 1;
				    $scope.dataMaster.forEach(function (data) {
				    	if(data.tanggalKonfirmasi != null){
				    		var date1 = new Date(data.tanggalKonfirmasi);
				    	}else{
				    		var date1 = "-";
				    	}

				    	if(data.tanggalRespon != null){
				    		var date2 = new Date(data.tanggalRespon);	
				    	}else{
				    		var date2 = "-";
				    	}
				    	
				    	if(data.tanggalMulai != null){
				    		var date3 = new Date(data.tanggalMulai);
				    	}else{
				    		var date3 = "-";
				    	}

				    	if(data.tanggalLapor != null){
				    		var date4 = new Date(data.tanggalLapor);
				    	}else{
				    		var date4 = "-";
				    	}
				    	
				    	if(data.tanggalSelesai != null){
				    		var date5 = new Date(data.tanggalSelesai);	
				    	}else{
				    		var date5 = "-";
				    	}
				    	
				    	if(date3 == "-"){
				    		data.mulai = "-";
				    	}else{
				    		data.mulai = DateHelper.formatDate(date3,"YYYY-MM-DD");
				    	}
				    	
				    	if (data.tanggalSelesai == null) {
				    		data.selesai = "-";
				    	} else {
				    		data.selesai = DateHelper.formatDate(date5,"YYYY-MM-DD");
				    	}
				    	if(data.noVerifikasi == null){
				    	   data.noVerifikasi = "Belum Diverifikasi";
				    	}
				    	
				    	if(date4 != "-"){
				    		data.lapor = DateHelper.formatDate(date4,"YYYY-MM-DD");	
				    	}else{
				    		data.lapor = "-";
				    	}

				    	if(date2 != "-"){
				    		data.respon = DateHelper.formatDate(date2,"YYYY-MM-DD");	
				    	}else{
				    		data.respon = "-";
				    	}
				    	
				    	if(date1 != "-"){
				    		data.tiba = DateHelper.formatDate(date1,"YYYY-MM-DD"); 
				    	}else{
				    		data.tiba = "-";
				    	}
				    	
				    	data.no = $scope.nomor++
				    })
					$scope.dataGrid = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataMaster
					});
				});
			};

			var onDataBound = function() {
			debugger
    		$('td').each(function(){
    			if($(this).text()=="Pending")
    				{$(this).addClass('yellow')}});
    		$('td').each(function(){
    			if($(this).text()=="Selesai")
    			    {$(this).addClass('green')}
    		 });
    		$('td').each(function(){
    			if($(this).text()=="Belum Dikerjakan")
    				{$(this).addClass('red')}
    		})
            };

			$scope.mainGridOptions = { 
				pageable: true,
				dataBound: onDataBound,
			   filterable: {
                   extra: false,
                   operators: {
                      string: {
                      startsWith: "Pencarian"
                      }
                   }
                },
				columns: [
				{ field:"no",title:"<h3 align=center>No<h3>", width: "40px", filterable : false },
				{ field:"ruanganPemesan",title:"<h3 align=center>Ruangan<h3>", width:"100px", filterable : {search : true,multi: true} },
				{ field:"noOrder",title:"<h3 align=center>No Seri<h3>", width:"100px" },
				{ field:"namaProduk",title:"<h3 align=center>Nama Alat<h3>",width:"150px" },
				{ field:"userPemesan",title:"<h3 align=center>Pelaksanaan Teknisi<h3>",width:"100px" },
				{ field:"keteranganOrder",title:"<h3 align=center>Proses Pelaksanaan<h3>", width:"200px" },
				{ field:"tanggal",title:"<h3 align=center>Tanggal<h3>",headerAttributes: { style: "text-align : center"},
					columns:[
						{ field:"mulai", title:"<h3 align=center>Mulai Kedatangan<h3>", width:100, filterable : false},
						{ field:"selesai", title:"<h3 align=center>Selesai Pekerjaan<h3>", width:100, filterable : false}], width:"300px" },
				{ field:"waktu",title:"<h3 align=center>Waktu<h3>",headerAttributes: { style: "text-align : center"},
					columns:[
						{ field:"lapor", title:"<h3 align=center>Lapor<h3>", width:100, filterable : false},
						{ field:"tiba", title:"<h3 align=center>Tiba<h3>", width:100, filterable : false},
						{ field:"respon", title:"<h3 align=center>Respon<h3>", width:100, filterable : false}], width:"360px", filterable : false },
				{ field:"noVerifikasi",title:"<h3 align=center>Serah Terima Selesai<h3>", width:"100px"},
				{ field:"statusPekerjaan",title:"<h3 align=center>Finalisasi Hasil Pekerjaan<h3>", width:"100px" }]
			};
			
			$scope.click = function(current){
				$scope.current = current;
				$scope.strukOrderId = current.noRec;
				$scope.noRegistrasiAset = current.noRecRegistrasiAset;
			};
			$scope.tutup = function(){
				$state.go("home");

			}

			$scope.detail = function () {
				if ($scope.strukOrderId == undefined) {
					window.messageContainer.error('Silahkan pilih data')
				} else {
					$state.go('DetailDashboardPerbaikan',{
						strukOrderId: $scope.strukOrderId,
						noRegistrasiAset: $scope.noRegistrasiAset
					})
				}
			}
		}
		]);
});