define(['initialize'], function(initialize) {
  'use strict';
  initialize.controller('LaporanPelayananCtrl', ['CacheHelper','$q', '$rootScope', '$scope','ModelItemAkuntansi','DateHelper','$http','$state','ReportPelayanan','ManageSdm',
    function(cacheHelper,$q, $rootScope, $scope,modelItemAkuntansi,DateHelper,$http,$state,ReportPelayanan,ManageSdm) {
    		//Inisial Variable 
        $scope.dataVOloaded = true;
        $scope.now = new Date();
        $scope.dataSelected={};
        $scope.item={};
        
        
        //sdm service hanya sementara, nanti harus diganti pake service kasir !!
        ManageSdm.getItem("service/list-generic/?view=Pegawai&select=id,namaLengkap", true).then(function(dat){
	    $scope.listPegawai = dat.data;
	    });

	    ManageSdm.getItem("service/list-generic/?view=Ruangan&select=id,reportDisplay").then(function(dat) {
	    $scope.listRuangan = dat.data;
	    });

	    ManageSdm.getItem("service/list-generic/?view=KelompokPasien&select=*").then(function(dat) {
	    $scope.listPasien = dat.data;
	    });

	    ManageSdm.getItem("service/list-generic/?view=Departemen&select=*").then(function(dat) {
	    $scope.listDepartemen = dat.data;
	    });


        $scope.tglPelayanan = $scope.item.pelayanan;
        $scope.dokter = $scope.item.namaPegawai;

        $scope.listDataFormat = [

             {
             "id":1, "format":"pdf"
             },
             {
              "id":2, "format":"xls"
             }

			 ]
        
        debugger;
        $scope.date = new Date();
        var tanggals = DateHelper.getDateTimeFormatted3($scope.date);
        
        //Tanggal Default
        $scope.item.tglawal = tanggals+" 00:00";
        $scope.item.tglakhir= tanggals+" 12:59";
        debugger;
        if(($scope.item.tglawal = tanggals+" 00:00")&&($scope.item.tglakhir= tanggals+" 12:59")){
            $scope.item.setSehari = "sehari"; 
        }
       
        // Tanggal Inputan
        $scope.tglawal = $scope.item.tglawal;
        $scope.tglakhir = $scope.item.tglakhir;
		
        $scope.CetakGeneral = function() {
        debugger;
        if($scope.item.format == undefined){
        	alert('format file harus dipilih terlebih dahulu !!!')
        }
        if($scope.item.tglawal != $scope.tglawal && $scope.item.tglakhir != $scope.tglakhir){
        var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm"); 
        var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
        }else if($scope.item.tglawal != $scope.tglawal){
        var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
        var tglakhir = $scope.item.tglakhir;
        }
        else if($scope.item.tglakhir != $scope.tglakhir){
        var tglawal = $scope.item.tglawal;
        var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
        }
        else{
        var tglawal = $scope.item.tglawal;
        var tglakhir = $scope.item.tglakhir;
        }
        if($scope.item.KelompokPasien == undefined && $scope.item.ruangan == undefined){
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasien?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien=&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
        }
        else if($scope.item.ruangan == undefined){
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasien?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien="+$scope.item.KelompokPasien.id+"&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
        }
        else if($scope.item.KelompokPasien == undefined){
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasien?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien=&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
        }else{
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasien?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien="+$scope.item.KelompokPasien.id+"&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
        }
	    };


	    $scope.CetakKarcis = function() {
        if($scope.item.format == undefined){
        	alert('format file harus dipilih terlebih dahulu !!!')
        }
        if($scope.item.tglawal != $scope.tglawal && $scope.item.tglakhir != $scope.tglakhir){
        var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm"); 
        var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
        }else if($scope.item.tglawal != $scope.tglawal){
        var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
        var tglakhir = $scope.item.tglakhir;
        }
        else if($scope.item.tglakhir != $scope.tglakhir){
        var tglawal = $scope.item.tglawal;
        var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
        }
        else{
        var tglawal = $scope.item.tglawal;
        var tglakhir = $scope.item.tglakhir;
        }
		if($scope.item.KelompokPasien == undefined && $scope.item.ruangan == undefined){	
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienKarcis?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien=&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
        }
        else if($scope.item.KelompokPasien == undefined){	
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienKarcis?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien=&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
        }
        else if($scope.item.ruangan == undefined){	
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienKarcis?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien="+$scope.item.KelompokPasien.id+"&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
        }else{
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienKarcis?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien="+$scope.item.KelompokPasien.id+"&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
        }
	    };

	    $scope.CetakTanpaKarcis = function() {
        debugger;
	    if($scope.item.format == undefined){
        	alert('format file harus dipilih terlebih dahulu !!!')
        }
        if($scope.item.tglawal != $scope.tglawal && $scope.item.tglakhir != $scope.tglakhir){
        var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm"); 
        var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
        }else if($scope.item.tglawal != $scope.tglawal){
        var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
        var tglakhir = $scope.item.tglakhir;
        }
        else if($scope.item.tglakhir != $scope.tglakhir){
        var tglawal = $scope.item.tglawal;
        var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
        }
        else{
        var tglawal = $scope.item.tglawal;
        var tglakhir = $scope.item.tglakhir;
        }
	    if($scope.item.KelompokPasien == undefined && $scope.item.ruangan == undefined){
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByDokter?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien=&idDokter="+$scope.item.namaPegawai.id+"&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
	    }

	    else if($scope.item.KelompokPasien == undefined){
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByDokter?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien=&idDokter="+$scope.item.namaPegawai.id+"&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
	    }
	    else if ($scope.item.ruangan == undefined){
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByDokter?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien="+$scope.item.KelompokPasien.id+"&idDokter="+$scope.item.namaPegawai.id+"&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
	    }else{
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByDokter?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien="+$scope.item.KelompokPasien.id+"&idDokter="+$scope.item.namaPegawai.id+"&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
	    }
	    };

	    $scope.CetakTanpaKarcisAll = function() {
	    if($scope.item.format == undefined){
        	alert('format file harus dipilih terlebih dahulu !!!')
        }
        if($scope.item.tglawal != $scope.tglawal && $scope.item.tglakhir != $scope.tglakhir){
        var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm"); 
        var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
        }else if($scope.item.tglawal != $scope.tglawal){
        var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
        var tglakhir = $scope.item.tglakhir;
        }
        else if($scope.item.tglakhir != $scope.tglakhir){
        var tglawal = $scope.item.tglawal;
        var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
        }
        else{
        var tglawal = $scope.item.tglawal;
        var tglakhir = $scope.item.tglakhir;
        }
	    if($scope.item.KelompokPasien == undefined && $scope.item.ruangan == undefined){
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByAllDokter?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien=&idDokter=&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
        }
        else if($scope.item.KelompokPasien == undefined){
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByAllDokter?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien=&idDokter=&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
        }
        else if($scope.item.ruangan == undefined){
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByAllDokter?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien="+$scope.item.KelompokPasien.id+"&idDokter=&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
        }else{
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByAllDokter?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien="+$scope.item.KelompokPasien.id+"&idDokter=&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
	    }
	    };

	    $scope.CetakRincianPenerimaan = function() {
	    debugger;
	    if($scope.item.format == undefined){
        	alert('format file harus dipilih terlebih dahulu !!!')
        }
        if($scope.item.tglawal != $scope.tglawal && $scope.item.tglakhir != $scope.tglakhir){
        var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm"); 
        var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
        }else if($scope.item.tglawal != $scope.tglawal){
        var tglawal = DateHelper.getDateTimeFormatted2($scope.item.tglawal, "dd-MM-yyyy HH:mm");
        var tglakhir = $scope.item.tglakhir;
        }
        else if($scope.item.tglakhir != $scope.tglakhir){
        var tglawal = $scope.item.tglawal;
        var tglakhir = DateHelper.getDateTimeFormatted2($scope.item.tglakhir, "dd-MM-yyyy HH:mm");
        }
        else{
        var tglawal = $scope.item.tglawal;
        var tglakhir = $scope.item.tglakhir;
        }
	    if($scope.item.KelompokPasien == undefined && $scope.item.ruangan == undefined && $scope.item.namaPegawai == undefined){
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByDokterWithKarcis?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien=&idDokter=&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
        }
        else if($scope.item.KelompokPasien == undefined && $scope.item.ruangan == undefined){
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByDokterWithKarcis?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien=&idDokter="+$scope.item.namaPegawai.id+"&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
        }
        else if($scope.item.ruangan == undefined){
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByDokterWithKarcis?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan=&idjenisPasien="+$scope.item.KelompokPasien.id+"&idDokter="+$scope.item.namaPegawai.id+"&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
        }
        else if($scope.item.KelompokPasien == undefined){
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByDokterWithKarcis?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien=&idDokter="+$scope.item.namaPegawai.id+"&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
        }
        else{
        var urlLaporan = ReportPelayanan.open("reporting/lapPelayananPasienByDokterWithKarcis?startDate="+tglawal+"&endDate="+tglakhir+"&idRuangan="+$scope.item.ruangan.id+"&idjenisPasien="+$scope.item.KelompokPasien.id+"&idDokter="+$scope.item.namaPegawai.id+"&idDepartemen="+$scope.item.departement.id+"&format="+$scope.item.format.format);
        window.open(urlLaporan, '_blank');
	    }
	    };
       
        }
        ]);
});