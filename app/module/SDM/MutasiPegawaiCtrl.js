define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MutasiPegawaiCtrl', ['$q', '$rootScope', '$scope', '$state', 'ModelItem','JenisSk','RekamDataPegawai','StatusPerkawinan','ManageSdm','ManageSdmNew','FindSdm',
		function($q, $rootScope, $scope, $state, ModelItem,JenisSk,RekamDataPegawai,StatusPerkawinan,ManageSdm,ManageSdmNew, FindSdm) {
			$scope.no=1;
			$scope.dataVOloaded =true
			$scope.item = {}
			var paramIdPegawai = $state.params.idPegawai

			init()

			function getDataPegawai(paramIdPegawai) {
                if (paramIdPegawai) { // Check parameter noRec pegawai in the url
                    $scope.isRouteLoading = true; // show loading icon
					
                    $scope.disablePegawai = true;
                    $scope.disableJenisSK = true;
                    $scope.disableTanggalSK = true;
                    $scope.disableNomor = true;
                    $scope.disableUraian = true;
                    $scope.disableSKDari = true;
                    $scope.disableStatusPegawai = true;
                    $scope.disableKedudukan = true;
                    $scope.disableTanggalMeninggal = true;
                    $scope.disableGolongan = true;
                    $scope.disableJabatanStruktural = true;
                    $scope.disableJabatanFungsional = true;
                    $scope.disableStatusKawin = true;
                    $scope.disableTanggalTMT = true;
                    $scope.disableTanggalBerlakuAkhir = true;
                    $scope.disableEselon = true;
                    $scope.disableJenisHukuman = true;
                    $scope.disableTanggalKeluar = true;
                    $scope.disableTanggalRekam = true;
                    
            
                    $q.all([
                        // ManageSdm.getOrderList("pegawai/get-pegawai-by-customs/" + paramIdPegawai)
                        ManageSdmNew.getListData("pegawai/get-pegawai-by-customs/" + paramIdPegawai),
                        ManageSdmNew.getListData("sdm/get-load-mutasi-pegawai")
                        ]).then(function(res) {
                            if (res[0].statResponse) {
                                $scope.item = res[0].data.data
                                $scope.item.pegawai ={id:res[0].data.data.id,namaLengkap:res[0].data.data.namaLengkap}
                                $scope.item.nomorAgenda = res[1].data.data.noAgenda
                                $scope.item.tanggalRekam = new Date()
                            }
                            $scope.isRouteLoading = false;
                    }, function(error) {
                        $scope.isRouteLoading = false;
                    })
                } else {
                	$scope.disablePegawai = false;
                    
                    $scope.disableJenisSK = true;
                    $scope.disableTanggalSK = true;
                    $scope.disableNomor = true;
                    $scope.disableUraian = true;
                    $scope.disableSKDari = true;
                    $scope.disableStatusPegawai = true;
                    $scope.disableKedudukan = true;
                    $scope.disableTanggalMeninggal = true;
                    $scope.disableGolongan = true;
                    $scope.disableJabatanStruktural = true;
                    $scope.disableJabatanFungsional = true;
                    $scope.disableStatusKawin = true;
                    $scope.disableTanggalTMT = true;
                    $scope.disableTanggalBerlakuAkhir = true;
                    $scope.disableEselon = true;
                    $scope.disableJenisHukuman = true;
                    $scope.disableTanggalKeluar = true;
                    $scope.disableTanggalRekam = true;
                    
                }
            };

            $scope.resetPegawai=function() {
            	$scope.disablePegawai = !$scope.disablePegawai;
                
            }

            
            $scope.enableDisableIsian=function(object) {
                
                

                if(object=="disableJenisSK"){
                    $scope.disableJenisSK = !$scope.disableJenisSK;    
                }
                
                if(object=="disableTanggalSK"){
                    $scope.disableTanggalSK = !$scope.disableTanggalSK;    
                }
                
                if(object=="disableNomor"){
                    $scope.disableNomor = !$scope.disableNomor;    
                }

                if(object=="disableUraian"){
                    $scope.disableUraian = !$scope.disableUraian;    
                }
                
                if(object=="disableSKDari"){
                    $scope.disableSKDari = !$scope.disableSKDari;    
                }

                if(object=="disableStatusPegawai"){
                    $scope.disableStatusPegawai = !$scope.disableStatusPegawai;   
                    enableDisableIsianTerkaitSK($scope.disableStatusPegawai); 
                }

                if(object=="disableKedudukan"){
                    $scope.disableKedudukan = !$scope.disableKedudukan;   
                    enableDisableIsianTerkaitSK($scope.disableKedudukan);  
                }
                
                if(object=="disableTanggalMeninggal"){
                    $scope.disableTanggalMeninggal = !$scope.disableTanggalMeninggal; 
                    enableDisableIsianTerkaitSK($scope.disableTanggalMeninggal);     
                }

                if(object=="disableGolongan"){
                    $scope.disableGolongan = !$scope.disableGolongan;   
                    enableDisableIsianTerkaitSK($scope.disableGolongan);      
                }
                
                if(object=="disableJabatanStruktural"){
                    $scope.disableJabatanStruktural = !$scope.disableJabatanStruktural;  
                    enableDisableIsianTerkaitSK($scope.disableJabatanStruktural);    
                }
                
                if(object=="disableJabatanFungsional"){
                    $scope.disableJabatanFungsional = !$scope.disableJabatanFungsional;  
                    enableDisableIsianTerkaitSK($scope.disableJabatanFungsional);   
                }
                
                if(object=="disableStatusKawin"){
                    $scope.disableStatusKawin = !$scope.disableStatusKawin;  
                    enableDisableIsianTerkaitSK($scope.disableStatusKawin);    
                }
                
                if(object=="disableTanggalTMT"){
                    $scope.disableTanggalTMT = !$scope.disableTanggalTMT;    
                }
               
                if(object=="disableTanggalBerlakuAkhir"){
                    $scope.disableTanggalBerlakuAkhir = !$scope.disableTanggalBerlakuAkhir;    
                }
                
                if(object=="disableEselon"){
                    $scope.disableEselon = !$scope.disableEselon; 
                    enableDisableIsianTerkaitSK($scope.disableEselon);     
                }
                
                if(object=="disableJenisHukuman"){
                    $scope.disableJenisHukuman = !$scope.disableJenisHukuman;    
                    enableDisableIsianTerkaitSK($scope.disableJenisHukuman);
                }
                
                if(object=="disableTanggalKeluar"){
                    $scope.disableTanggalKeluar = !$scope.disableTanggalKeluar;  
                    enableDisableIsianTerkaitSK($scope.disableTanggalKeluar);  
                }
                
                if(object=="disableTanggalRekam"){
                    $scope.disableTanggalRekam = !$scope.disableTanggalRekam;    
                }
                
    
                
            }

            function enableDisableIsianTerkaitSK(statusDisable) {
                $scope.disableJenisSK = statusDisable;
                $scope.disableTanggalSK = statusDisable;
                $scope.disableNomor = statusDisable;
                $scope.disableUraian = statusDisable;
                $scope.disableSKDari = statusDisable;
                $scope.disableTanggalBerlakuAkhir = statusDisable;
                
            }


            $scope.changePegawai=function(idPegawai) {
            	getDataPegawai(idPegawai)
				$scope.disablePegawai = true;
                // $scope.disablePegawai2 = false;
            }

            function init() {
                $scope.isRouteLoading = true;
                $q.all([
                    ManageSdm.getOrderList("service/list-generic/?view=StatusPerkawinanPegawai&select=id,statusPerkawinan&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=KategoryPegawai&select=id,kategoryPegawai&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Eselon&select=id,eselon&criteria=statusEnabled&values=true", true),
                    ManageSdmNew.getListData("sdm/get-all-golongan"),
                    // FindSdm.getSubUnitKerja(),
                    ManageSdmNew.getListData("sdm/get-all-sub-unit-kerja"),
                    ManageSdmNew.getListData("sdm/get-all-kedudukan"),
                    ManageSdm.getOrderList("service/list-generic/?view=JenisSk&select=*", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Jabatan&select=id,namaJabatan&criteria=jenisJabatanId,statusEnabled&values=1,true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=JenisHukuman&select=id,jenisHukuman&criteria=statusEnabled&values=true", true),
                    ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true", true)
                    ]).then(function(res) {
                   
                    $scope.listStatusKawin = res[0].data;
                    $scope.listStatusPegawai = res[1].data;
                    $scope.listEselon = res[2].data;
                    $scope.listGolongan = res[3].data;
                    $scope.listRuanganKerja = res[4].data;
                    $scope.listKedudukan = res[5].data.data;
                    $scope.listJenisSk = res[6].data;
                    $scope.listJabatanFungsional = res[7].data;
                    $scope.listJenisHukuman = res[8].data;
                    $scope.listPegawai = res[9].data;

                    getDataPegawai(paramIdPegawai);
                    $scope.isRouteLoading = false;
                }, (error) => {
                    throw (error);
                });
            }

			

			$scope.tambah = function() {
                var jenisSK2 = null
                var tanggalSK = null
                var nomor = null
                var uraian = null
                var skDari = null
                var kategoryPegawai = null
                var kedudukan = null
                var tanggalMeninggal = null
                var golonganPegawai = null
                var pensiun = null
                var jabatanStruktural = null
                var jabatanFungsional = null
                var statusPerkawinanPegawai = null
                var grade = null
                var tanggalTmt = null
                var tanggalBerlakuAkhir = null
                var eselon = null
                var jenisHukuman = null
                var tanggalKeluar = null

                if ($scope.item.pegawai == undefined){
                    toastr.error('Silakan pilih pegawai terlebih dahulu!')
                }
                if ($scope.item.jenisSK2 != undefined){
                    jenisSK2 = $scope.item.jenisSK2.id
                }
                if ($scope.item.tanggalSK != undefined){
                    tanggalSK = $scope.item.tanggalSK
                }
                if ($scope.item.nomor != undefined){
                    nomor = $scope.item.nomor
                }
                if ($scope.item.uraian != undefined){
                    uraian = $scope.item.uraian
                }
                if ($scope.item.skDari != undefined){
                    skDari = $scope.item.skDari.id
                }
                if ($scope.item.kategoryPegawai != undefined){
                    kategoryPegawai = $scope.item.kategoryPegawai.id
                }
                if ($scope.item.kedudukan != undefined){
                    kedudukan = $scope.item.kedudukan.id
                }
                if ($scope.item.tanggalMeninggal != undefined){
                    tanggalMeninggal = $scope.item.tanggalMeninggal
                }
                if ($scope.item.golonganPegawai != undefined){
                    golonganPegawai = $scope.item.golonganPegawai.id
                }
                if ($scope.item.pensiun != undefined){
                    pensiun = $scope.item.pensiun
                }
                if ($scope.item.jabatanStruktural != undefined){
                    jabatanStruktural = $scope.item.jabatanStruktural.id
                }
                if ($scope.item.jabatanFungsional != undefined){
                    jabatanFungsional = $scope.item.jabatanFungsional.id
                }
                if ($scope.item.statusPerkawinanPegawai != undefined){
                    statusPerkawinanPegawai = $scope.item.statusPerkawinanPegawai.id
                }
                if ($scope.item.grade != undefined){
                    grade = $scope.item.grade
                }
                if ($scope.item.tanggalTmt != undefined){
                    tanggalTmt = $scope.item.tanggalTmt
                }
                if ($scope.item.tanggalBerlakuAkhir != undefined){
                    tanggalBerlakuAkhir = $scope.item.tanggalBerlakuAkhir
                }
                if ($scope.item.eselon != undefined){
                    eselon = $scope.item.eselon.id
                }
                if ($scope.item.jenisHukuman != undefined){
                    jenisHukuman = $scope.item.jenisHukuman.id
                }
                if ($scope.item.tanggalKeluar != undefined){
                    tanggalKeluar = $scope.item.tanggalKeluar
                }

                var newModel = {
                    "nomorAgenda" : $scope.item.nomorAgenda,
                    "pegawai" :{
                        "id": $scope.item.pegawai.id
                    },
                    "jenisSK" : {
                        "id": jenisSK2
                    },
                    "tanggalSK" : tanggalSK,
                    "nomor" : nomor,
                    "uraian" : uraian,
                    "skDari" : {
                        "id": skDari
                    },
                    "statusPegawai" : {
                        "id": kategoryPegawai
                    },
                    "kedudukan" : {
                        "id" : kedudukan
                    },
                    "tanggalMeninggal" : tanggalMeninggal,
                    "kodeGol" : {
                        "id" : golonganPegawai
                    },
                    "pensiun" : pensiun,
                    "jabatanStruktural" : {
                        "id" : jabatanStruktural
                    },
                    "jabatanFungsional" : {
                        "id" : jabatanFungsional
                    },
                    // "jabatanInternal" : {
                    //     "id" : jabatanInternal
                    // },
                    "statusKawin" : {
                        "id" : statusPerkawinanPegawai
                    },
                    "grade" : grade,
                    "tanggalTMT" : tanggalTmt,
                    "tanggalAkhirBerlaku" : tanggalBerlakuAkhir,
                    "eselon" : {
                        "id" : eselon
                    },
                    "jenisHukuman" : {
                        "id" : jenisHukuman
                    },
                    "tanggalKeluar" : tanggalKeluar,
                    "tanggalRekam" : $scope.item.tanggalRekam
                }

                ManageSdmNew.saveData(newModel, "sdm/save-mutasi-pegawai").then(function(e) {
                    init();
                });
            };

            $scope.batal = function() {
                $scope.item = {}
            };

            $scope.loadDataGrid = function() {
                var grid = $("#grid").data("kendoGrid");

                ManageSdmNew.getListData("map-pegawai-jabatan-unitkerja/get-map-by-pegawai/" + paramIdPegawai).then(function(data) {
                    $scope.dataSource = data.data.data.data;

                    $scope.isRouteLoading = false;
                }, (error) => {
                    $scope.isRouteLoading = false;
                    throw error;
                });
            }

            $scope.gridJabatanInternal = {
                toolbar: [{
                    name: "create",
                    text: "Buat Jabatan Internal Baru",
                    template: '<button ng-click="createNew()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Riwayat</button>'
                }],
                pageable: true,
                scrollable: true,
                columns: [
                    // { field: "statusEnabled", width: "120px", editor: customBoolEditor },
                    {
                        field: "namaJabatan",
                        title: "Jabatan",width:"250px" 
                    }, // editor: jbtnDropDownEditor, template: "#= jabatanInternal.namaJabatan #"},
                    {
                        field: "nameSubUnitKerjaPegawai",
                        title: "Unit Kerja",width:"150px" 
                    }, // editor: unitDropDownEditor, template: "#= unitKerja.name #"},
                    {
                        field: "nameUnitKerjaPegawai",
                        title: "Sub Unit Kerja",width:"150px" 
                    }, // editor: subUnitDropDownEditor, template: "#= subUnitKerja.name #"},
                    {
                        field: "isCanCreateJadwal",
                        title: "Membuat Jadwal",width:"50px" 
                    },
                    {
                        field: "isPrimary",
                        title: "Jabatan Utama",width:"50px" 
                    },
                    {
                        field: "isMonitoring",
                        title: "Monitoring",width:"50px" 
                    },
                    {
                        command: [{
                            text: "Edit",
                            width: "40px",
                            align: "center",
                            attributes: {
                                align: "center"
                            },
                            click: changeRow,
                            imageClass: "k-icon k-i-pencil"
                        }, {
                            text: "Hapus",
                            width: "40px",
                            align: "center",
                            attributes: {
                                align: "center"
                            },
                            click: customClick,
                            imageClass: "k-icon k-delete"
                        }],
                        title: "",
                        width: "100px",
                    }

                    ],
                /*  save: function(e){
                      if(e.model.dirty) $scope.simpanJabatan(e.model);
                  }*/
              }

              function customClick(e) {
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                dataItem.statusEnabled = !dataItem.statusEnabled;
                $scope.simpanJabatan(dataItem);
            }

            function changeRow(e) {
                clearPop();
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr);
                $scope.id = dataItem.id;
                $scope.item.unitKerjaPop = {
                    id: dataItem.unitKerjaPegawaiId,
                    name: dataItem.nameUnitKerjaPegawai
                };
                $scope.ubah();
                $scope.item.subUnitKerjaPop = {
                    id: dataItem.subUnitKerjaPegawaiId,
                    name: dataItem.nameSubUnitKerjaPegawai
                };                 
                $scope.item.jabatanInternalPop = {
                    id: dataItem.jabatanId,
                    namaJabatan: dataItem.namaJabatan
                };
                $scope.vals= dataItem.isPrimary;
                $scope.vals2= dataItem.isCanCreateJadwal;
                $scope.vals1 =dataItem.isMonitoring;
                $scope.item.isPrimary= dataItem.isPrimary;
                $scope.item.isCanCreateJadwal= dataItem.isCanCreateJadwal;
                $scope.item.isMonitoring=dataItem.isMonitoring;
                $scope.changeCB();
                $scope.popUpJabatan.center().open();
            }
		}
	]);
});