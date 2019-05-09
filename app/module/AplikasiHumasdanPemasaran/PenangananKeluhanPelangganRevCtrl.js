define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenangananKeluhanPelangganRevCtrl', ['$rootScope', '$scope', 'ModelItem','ManageSarpras','DateHelper', '$document', 'R','$state','ModelItemAkuntansi','ManageServicePhp','ManageLogistikPhp','CacheHelper',
		function($rootScope, $scope, ModelItem,ManageSarpras,DateHelper, $document, r,$state,modelItemAkuntansi,manageServicePhp,manageLogistikPhp,dateHelper,cacheHelper) {		
			$scope.title = "Resep elektronik";			
			$scope.dataVOloaded = true;
			$scope.isRouteLoading=false;
            $scope.item={};
            $scope.currentKesimpulanKronologis=[];
            $scope.currentTindakLanjut=[];
            $scope.currentRespon=[];
            $scope.currentSolusiKeluhan=[];
            $scope.currentKategoriKomplain=[];
			$scope.now = new Date();
			var noOrder = '';
			var idKeluhan = ''
            var norec_pp = ''
			var kpid = '';
            var NorecKP = '';
           
			loadDataCombo()
			Load()

            function LoadCache(){
               var chacePeriode = cacheHelper.get('PenangananKeluhanPelangganRevCtrl');
                if(chacePeriode != undefined){
                   kpid = chacePeriode[0]
                   noOrder = chacePeriode[1]

                   init()
                   var chacePeriode ={ 0 : '' ,
                        1 : '',
                        2 : '',
                        3 : '', 
                        4 : '',
                        5 : '',
                        6 : ''
                    }
                    cacheHelper.set('PenangananKeluhanPelangganRevCtrl', chacePeriode);
               }else{
                    init()
               }
           }

           function ClearAll(){
                $scope.item.Pegawai = undefined
                $scope.item.noRm = ''
                $scope.item.namaPasien = ''
                $scope.item.jenisKelamin = undefined
                $scope.item.umur = ''
                $scope.item.noTlp = ''
                $scope.item.email = ''
                $scope.item.pekerjaan = undefined
                $scope.item.noTlpKtr = ''
                $scope.item.Keluhan = ''

           }

           function Load(){
                if($state.params != undefined){
                        kpid = $state.params.kpid;
                        noOrder = $state.params.noOrder;
                        init()
                }else{
                    init()
                }
           }

		   function loadDataCombo(){
				modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-pegawai-all", true, true, 20).then(function(data) {
	                $scope.listDataPegawai=data;
	            });

	            modelItemAkuntansi.getDataTableTransaksi("humas/get-daftar-combo?", true).then(function(dat){
	            	$scope.listDataJenisKelamin=dat.jeniskelamin;
	            	$scope.listDataPekerjaan=dat.pekerjaan;
	            });
		   }

		   function init(){
		   	if (noOrder != '') {
		   		if (noOrder == 'ReplyKeluhan') {
		   				$scope.isRouteLoading=true;
				   		manageLogistikPhp.getDataTableTransaksi("humas/get-keluhan-pelanggan?"
	                    +"IdKeluhan="+kpid, true).then(function(dat){
	                    $scope.isRouteLoading=false;
	                    var datas = dat.data.datas[0];
                        idKeluhan = kpid
                        NorecKP = datas.norec;
	                    $scope.item.Pegawai = {id:datas.pegawaiid,namalengkap:datas.namalengkap}
                        $scope.item.noRm = datas.nocm
                        $scope.item.namaPasien = datas.namapasien
                        $scope.item.jenisKelamin = {id:datas.jkid,jeniskelamin:datas.jeniskelamin}
                        $scope.item.umur = datas.umur
                        $scope.item.noTlp = datas.notlp
                        $scope.item.email = datas.email
                        $scope.item.pekerjaan = {id:datas.pekerjaanid,pekerjaan:datas.pekerjaan}
                        $scope.item.noTlpKtr = datas.notlpkntr
                        $scope.item.tglPenanganankeluhan =  moment($scope.now).format('YYYY-MM-DD HH:mm');
                        $scope.item.keluhanUser = datas.keluhan      
	                });
		   		}else if (noOrder == 'EditPenangananKeluhan') {
                        debugger
                        $scope.isRouteLoading=true;
                        manageLogistikPhp.getDataTableTransaksi("humas/get-penanganan-keluhan-pelanggan?"
                        +"IdKeluhan="+kpid, true).then(function(dat){
                            $scope.isRouteLoading=false;
                            var datas = dat.data.datas[0];
                            idKeluhan = kpid
                            NorecKP = datas.norec;
                            norec_pp = datas.norec_pp
                            $scope.item.Pegawai = {id:datas.pegawaiid,namalengkap:datas.namalengkap}
                            $scope.item.noRm = datas.nocm
                            $scope.item.namaPasien = datas.namapasien
                            $scope.item.jenisKelamin = {id:datas.jkid,jeniskelamin:datas.jeniskelamin}
                            $scope.item.umur = datas.umur
                            $scope.item.noTlp = datas.notlp
                            $scope.item.email = datas.email
                            $scope.item.pekerjaan = {id:datas.pekerjaanid,pekerjaan:datas.pekerjaan}
                            $scope.item.noTlpKtr = datas.notlpkntr
                            $scope.item.Keluhan = datas.reply      
                            $scope.item.tglPenanganankeluhan =  moment(datas.tglpenangganan).format('YYYY-MM-DD HH:mm');
                             if (datas.kesimpulankronologis !='' || datas.kesimpulankronologis != null){
                                 var kesimpulankronologis= datas.kesimpulankronologis.split(',')
                                 kesimpulankronologis.forEach(function(data){
                                    $scope.listKesimpulanKronologis.forEach(function(e){                                        
                                        for (let i in e.detail){
                                            if(e.detail[i].id ==data){
                                                 e.detail[i].isChecked = true
                                                var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
                                                "value": e.detail[i].id,
                                              }  
                                                $scope.currentKesimpulanKronologis.push(dataid)
                                            }
                                        }
                                    })
                                })
                             }

                             if (datas.tindaklanjut !='' || datas.tindaklanjut != null){
                                 var tindaklanjut= datas.tindaklanjut.split(',')
                                 tindaklanjut.forEach(function(data){
                                    $scope.listTindakLanjut.forEach(function(e){                                        
                                        for (let i in e.detail){
                                            if(e.detail[i].id ==data){
                                                 e.detail[i].isChecked = true
                                                var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
                                                "value": e.detail[i].id,
                                              }  
                                                $scope.currentTindakLanjut.push(dataid)
                                            }
                                        }
                                    })
                                })
                             }

                             if (datas.respon !='' || datas.respon != null){
                                 var respon= datas.respon.split(',')
                                 respon.forEach(function(data){
                                    $scope.listRespon.forEach(function(e){                                        
                                        for (let i in e.detail){
                                            if(e.detail[i].id ==data){
                                                 e.detail[i].isChecked = true
                                                var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
                                                "value": e.detail[i].id,
                                              }  
                                                $scope.currentRespon.push(dataid)
                                            }
                                        }
                                    })
                                })
                             }

                             if (datas.solusikeluhan !='' || datas.solusikeluhan != null){
                                 var solusikeluhan= datas.solusikeluhan.split(',')
                                 solusikeluhan.forEach(function(data){
                                    $scope.listSolusiKeluhan.forEach(function(e){                                        
                                        for (let i in e.detail){
                                            if(e.detail[i].id ==data){
                                                 e.detail[i].isChecked = true
                                                var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
                                                "value": e.detail[i].id,
                                              }  
                                                $scope.currentSolusiKeluhan.push(dataid)
                                            }
                                        }
                                    })
                                })
                             }

                             if (datas.kategorikomplain !='' || datas.kategorikomplain != null){
                                 var kategorikomplain= datas.kategorikomplain.split(',')
                                 solusikeluhan.forEach(function(data){
                                    $scope.listKategoriKomplain.forEach(function(e){                                        
                                        for (let i in e.detail){
                                            if(e.detail[i].id ==data){
                                                 e.detail[i].isChecked = true
                                                var dataid = {"id": e.detail[i].id,"nama": e.detail[i].nama,
                                                "value": e.detail[i].id,
                                              }  
                                                $scope.currentKategoriKomplain.push(dataid)
                                            }
                                        }
                                    })
                                })
                             }
                    });
                }
			}        
		}

	    $scope.CariPasien = function(){
				$scope.isRouteLoading=true;
                manageLogistikPhp.getDataTableTransaksi("farmasi/get-detail-pasien?nocm="+$scope.item.noRm, true).then(function(data_ih){
                	$scope.isRouteLoading=false;
                	var datas = data_ih.data;
                    var tanggal = $scope.now;
                    var tanggalLahir = new Date(datas.tgllahir);
                    var umurzz = DateHelper.CountAge(tanggalLahir, tanggal);
                    var usia = umurzz.year
                    $scope.item.noRm = datas.nocm
                    $scope.item.namaPasien = datas.namapasien
                    $scope.item.jenisKelamin = {id:datas.jkid,jeniskelamin:datas.jeniskelamin}
                    // $scope.item.tglLahir = new Date(data_ih.data.tgllahir);
                    $scope.item.umur = usia
                    $scope.item.noTlp = datas.notelepon
                    $scope.item.alamatLengkap = datas.alamatlengkap
                    $scope.item.email = datas.alamatemail
                    $scope.item.pekerjaan = {id:datas.pekerjaanid,pekerjaan:datas.pekerjaan}
                })
        }

			$scope.listKesimpulanKronologis=[
                {
                	"id":1,
                	"nama":"Kesimpulan Kronologis",
                	"detail":[
                		{"id":1,"nama":"Prosedur Pelayanan"},
                		{"id":2,"nama":"Persyaratan Pelayanan"},
                		{"id":3,"nama":"Kejelasan Petugas Pelayanan"},
                		{"id":4,"nama":"Kedisiplinan Petugas Pelayanan"},
                		{"id":5,"nama":"Tanggungjawab Petugas Pelayanan"},
                		{"id":6,"nama":"Kemampuan Petugas Pelayanan"},
                		{"id":7,"nama":"Kecepatan Pelayanan"},
                		{"id":8,"nama":"Keadilan Mendapatkan Pelayanan"},
                		{"id":9,"nama":"Kesopanan dan Keramahan Petugas"},
                		{"id":10,"nama":"Kewajaran Biaya Pelayanan"},
                		{"id":11,"nama":"Kepastian Biaya Pelayanan"},
                		{"id":12,"nama":"Kepastian Jadwal Pelayanan"},
                		{"id":13,"nama":"Kenyamanan lingkungan"},
                		{"id":14,"nama":"Keamanan pelayanan"}
                	]
                }
            ]

            $scope.listTindakLanjut=[
                {
                	"id":2,
                	"nama":"Tindak Lanjut",
                	"detail":[
                		{"id":1,"nama":"Petugas Customer Service mengkonfirmasi ke untuk klarifikasi jawaban terhadap pasien"},
                		{"id":2,"nama":"Petugas Customer Service menyampaikan hasil klarifikasi kepada pasien"}
                	]
                }
            ]

            $scope.listTindakLanjut=[
                {
                	"id":2,
                	"nama":"Tindak Lanjut",
                	"detail":[
                		{"id":1,"nama":"Petugas Customer Service mengkonfirmasi ke untuk klarifikasi jawaban terhadap pasien"},
                		{"id":2,"nama":"Petugas Customer Service menyampaikan hasil klarifikasi kepada pasien"}
                	]
                }
            ]
          
            $scope.listRespon=[
                {
                	"id":3,
                	"nama":"R/(Respon)",
                	"detail":[
                		{"id":1,"nama":"Pasien dapat menerima penjelasan yang disampaikan petugas Customer Service"},
                		{"id":2,"nama":"Keluhan disampaikan melalui Handphone"},
                	]
                }
            ]

            $scope.listSolusiKeluhan=[
                {
                	"id":4,
                	"nama":"Solusi Keluhan/Komplain",
                	"detail":[
                		{"id":1,"nama":"SELESAI"},
                		{"id":2,"nama":"TIDAK SELESAI"},
                	]
                }
            ]
            $scope.listKategoriKomplain=[
                {
                    "id":5,
                    "nama":"Kategory Komplain",
                    "detail":[
                        {"id":1,"nama":"Merah","warna":'red'},
                        {"id":2,"nama":"Kuning","warna":'yellow'},
                        {"id":3,"nama":"Hijau","warna":'#05b72a'},
                    ]
                }
            ]

            
            $scope.addListKesimpulanKronologis = function(bool,data) {
                var index = $scope.currentKesimpulanKronologis.indexOf(data);
                if (_.filter($scope.currentKesimpulanKronologis, {
                        id: data.id
                    }).length === 0)
                    $scope.currentKesimpulanKronologis.push(data);
                else {
                    $scope.currentKesimpulanKronologis.splice(index, 1);
                }
                
            }

           
            $scope.addListTindakLanjut = function(bool,data) {
                var index = $scope.currentTindakLanjut.indexOf(data);
                if (_.filter($scope.currentTindakLanjut, {
                        id: data.id
                    }).length === 0)
                    $scope.currentTindakLanjut.push(data);
                else {
                    $scope.currentTindakLanjut.splice(index, 1);
                }
                
            }

            $scope.addListRespon = function(bool,data) {
                var index = $scope.currentRespon.indexOf(data);
                if (_.filter($scope.currentRespon, {
                        id: data.id
                    }).length === 0)
                    $scope.currentRespon.push(data);
                else {
                    $scope.currentRespon.splice(index, 1);
                }
                
            }

            
            $scope.addListSolusiKeluhan = function(bool,data) {
                var index = $scope.currentSolusiKeluhan.indexOf(data);
                if (_.filter($scope.currentSolusiKeluhan, {
                        id: data.id
                    }).length === 0)
                    $scope.currentSolusiKeluhan.push(data);
                else {
                    $scope.currentSolusiKeluhan.splice(index, 1);
                }
                
            }

            $scope.addListKategoriKomplain = function(bool,data) {
                var index = $scope.currentKategoriKomplain.indexOf(data);
                if (_.filter($scope.currentKategoriKomplain, {
                        id: data.id
                    }).length === 0)
                    $scope.currentKategoriKomplain.push(data);
                else {
                    $scope.currentKategoriKomplain.splice(index, 1);
                }
                
            }

            $scope.cancel=function(){

                window.history.back();
            
            }    
			
			$scope.Save=function(){	
				debugger;
				var dataForm = [];  
                var tempData = [];
                var listkesimpulanKronologis=""
                var listtindakLanjut=""
                var listrespon=""
                var listsolusiKeluhan=""
                var listKategoriKomplain=""
                var a = ""
                var b = ""
                var e = ""
                var f = ""
                var g = ""
                var h = ""
                var i = ""
                var j = ""
                var k = ""
                var l = ""
                var m = ""
                if ($scope.item.Keluhan == undefined) {
                    alert("Hasil Klarifikasi Tidak Boleh Kosong!")
                    return;
                }  

                for (var i =  $scope.currentKesimpulanKronologis.length - 1; i >= 0; i--) {
                    var c = $scope.currentKesimpulanKronologis[i].id
                    b = ","+ c
                    a = a + b
                }
                listkesimpulanKronologis= a.slice(1, a.length)

                if (listkesimpulanKronologis == undefined) {
                    alert("Kesimpulan Kronologis Tidak Boleh Kosong!")
                    return;
                }

                for (var i =  $scope.currentTindakLanjut.length - 1; i >= 0; i--) {
                    var a = $scope.currentTindakLanjut[i].id
                    e = ","+ a
                    f = e + f
                }
                listtindakLanjut= e.slice(1, e.length)

                if (listtindakLanjut.length == 0) {
                    alert("Tindak Lanjut Tidak Boleh Kosong!")
                    return;
                 }

                for (var m =  $scope.currentRespon.length - 1; m >= 0; m--) {
                    var n = $scope.currentRespon[m].id
                    g = ","+ n
                    h = g + h
                }
                listrespon = g.slice(1, g.length)

                if (listrespon.length == undefined) {
                    alert("R/(Respon) Tidak Boleh Kosong!")
                    return;
                 }

                for (var m =  $scope.currentSolusiKeluhan.length - 1; m >= 0; m--) {
                    var p = $scope.currentSolusiKeluhan[m].id
                    i = ","+ p
                    j = i + j
                }
                listsolusiKeluhan = i.slice(1, i.length)

                if (listsolusiKeluhan.length == undefined) {
                    alert("Solusi Keluhan Tidak Boleh Kosong!")
                    return;
                }

                for (var m =  $scope.currentKategoriKomplain.length - 1; m >= 0; m--) {
                    var p = $scope.currentKategoriKomplain[m].id
                    k = ","+ p
                    l = k + l
                }
                listKategoriKomplain = k.slice(1, k.length)

                if (listKategoriKomplain.length == undefined) {
                    alert("Kategori Komplain Tidak Boleh Kosong!")
                    return;
                }

                var petugasid = null
                var namapetugas = ''
                if ($scope.item.Pegawai != undefined) {
                    petugasid = $scope.item.Pegawai.id
                    namapetugas = $scope.item.Pegawai.namalengkap
                }
                var email = ''
                if ($scope.item.email != undefined) {
                    email = $scope.item.email

                }

                var data = 
				{
					"norec_pp" : norec_pp,
					"namapetugas" : namapetugas,
					"email" : email,
					"objectpegawaifk" : petugasid,
					"keluhanpelangganfk" :idKeluhan,
					"reply" : $scope.item.Keluhan,
					"kesimpulanKronologis" : listkesimpulanKronologis,
					"tindakLanjut" : listtindakLanjut,
					"respon" : listrespon,
                    "solusikeluhan" : listsolusiKeluhan,
                    "kategorikomplain" : listKategoriKomplain,
                    "tglpenanganan" : moment($scope.item.tglPenanganankeluhan).format('YYYY-MM-DD HH:mm')
				}

                var objSave = {
                    data: data,
                }

                manageServicePhp.savePenangananKeluhanPelanggan(objSave).then(function (e) {
                    $state.go('DaftarPenangananKeluhanPelangganRev');
                })
			};
		}
	]);
});