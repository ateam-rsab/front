define(['initialize'], function(initialize) {

'use strict';

initialize.controller('KelompokKerjaCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService', 'ManagePhp','$state', 
function($q, $rootScope, $scope,IPSRSService,ManagePhp,$state) {
	$scope.item = {};
	$scope.dataVOloaded = true;
	$scope.now = new Date();
 	
 	var init = function () {
		// IPSRSService.getFieldsMasterTable("get-data-master?className=Kamar", true).then(function(dat){
		// $scope.listDataMaster = dat.data.data.Kamar;
                                    					
		// $scope.dataSource = new kendo.data.DataSource({
		// pageSize: 10,
		// data: $scope.listDataMaster,
		// autoSync: true

		// });

		// });

		loadData();
	}

init();


$scope.cari = function () {
	// debugger
	// $scope.isRouteLoading = true;
	loadData()
}  

function loadData(){
	var namaKelompokKerja = "";
	if ($scope.item.cariNamaKelompokKerja != undefined) {
		namaKelompokKerja = "&namakelompokkerja=" + $scope.item.cariNamaKelompokKerja;
	}

	ManagePhp.getData("generic/get-kelompok-kerjas?"+ namaKelompokKerja).then(function(dat){
		// debugger
		$scope.listDataMaster = dat.data.kelompokkerjas;
		// debugger	                                    					
			$scope.dataSource = new kendo.data.DataSource({
				pageSize: 10,
				data: $scope.listDataMaster,
				autoSync: true

			});

	});
}

// ManagePhp.getData("generic/get-kelass").then(function(dat){
// 	$scope.listKelas= dat.data.kelass;
	
// });

// ManagePhp.getData("generic/get-ruangans").then(function(dat){
// 	$scope.listRuangan= dat.data.ruangans;
	
// });

$scope.columnKamar = [
	{
		"field": "no",
		"title": "No"
	},
	
	{
		"field": "kdkelompokkerja",
		"title": "Kd Kelompok Kerja",
	},

	{
		"field": "objectkelompokkerjahead",
		"title": "objectkelompokkerjahead",
		"hidden": "true"
	},

	{
		"field": "kelompokkerja",
		"title": "Kelompok Kerja"
	},

	{
		"field": "qkelompokkerja",
		"title": "Q Kelompok Kerja"
	},

	
	{
		"field": "reportdisplay",
		"title": "Report Display"
	},

	{
		"field": "kodeexternal",
		"title": "Kode External"
	},

	{
		"field": "namaexternal",
		"title": "Nama External"
	},

	{
		"field": "statusenabled",
		"title": "Status Enabled"
	},

	// {
	// 	"title" : "Action",
	// 	"width" : "200px",
	// 	"template" : "<button class='btnEdit' ng-click='enableData()'>Enable</button>"+
	// 	"<button class='btnHapus' ng-click='disableData()'>Disable</button>"
	// }

	{
							"command":
								[
									{
										text: "Enabled", 
										click: enableData, 
										// imageClass: "k-icon k-floppy"
									},
								
									{
										text: "Disable", 
										click: disableData, 
										// imageClass: "k-icon k-delete"	
									}
								],

							title: "",
							width: "200px",
						}	
];

$scope.mainGridOptions = { 
 pageable: true,
 columns: $scope.columnKamar,
 editable: "popup",
 selectable: "row",
 scrollable: false
 };

////fungsi klik untuk edit
$scope.klik = function(current){
	$scope.showEdit = true;
	$scope.current = current;
	
	$scope.item.kdKelompokKerja = Number(current.kdkelompokkerja);
	$scope.item.kelompokKerja = current.kelompokkerja;
	$scope.item.qKelompokKerja = current.qkelompokkerja;
	$scope.item.id = current.id;
	$scope.item.noRec = current.norec;
	$scope.item.reportDisplay = current.reportdisplay;
	$scope.item.kodeExternal = current.kodeexternal;
	$scope.item.namaExternal = current.namaexternal;
	$scope.item.statusEnabled = current.statusenabled;	
	
	
};

function disableData(e){
 

 		e.preventDefault();
				var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

				if(!dataItem){
					toastr.error("Data Tidak Ditemukan");
					return;
				}

 		ManagePhp.getData("kelompok-kerja/update-status-enabled-kelompok-kerja?id="+dataItem.id+"&statusenabled=false").then(function(dat){
				 
			toastr.success(dat.data.message);
			init();
		});

 };

function enableData(e){
 
		e.preventDefault();
					var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

					if(!dataItem){
						toastr.error("Data Tidak Ditemukan");
						return;
					}

			ManagePhp.getData("kelompok-kerja/update-status-enabled-kelompok-kerja?id="+dataItem.id+"&statusenabled=true").then(function(dat){
				 
			toastr.success(dat.data.message);
			init();
		});
};




//// save 
$scope.simpan = function(){

	var kodeexternal="";
	var namaexternal="";
	var reportdisplay="";

	var objectkelompokkerjahead=null;
	
	var kdkelompokkerja=0;
	var kelompokkerja="";
	var qkelompokkerja=0;
	

	var id="";
	
	if ($scope.item.kelompokKerja == undefined || $scope.item.kelompokKerja=="") {
		alert("Nama kelompok kerja harus di isi!")
		return
	}else{
		kelompokkerja = $scope.item.kelompokKerja
	}
	
	if ($scope.item.kodeExternal != undefined) {
		kodeexternal=$scope.item.kodeExternal
	}
	if ($scope.item.namaExternal != undefined) {
		namaexternal=$scope.item.namaExternal
	}

	if ($scope.item.reportDisplay != undefined) {
		reportdisplay=$scope.item.reportDisplay
	}

	
	if($scope.item.kdKelompokKerja !=undefined){
		kdkelompokkerja=$scope.item.kdKelompokKerja
	}

	
	
	if($scope.item.qKelompokKerja !=undefined){
		qkelompokkerja=$scope.item.qKelompokKerja
	}
	
	

	if ($scope.item.id != undefined) {
		id=$scope.item.id
	}

	var data = {
						

						kodeexternal:kodeexternal,
						namaexternal:namaexternal,
						reportdisplay:reportdisplay,
						objectkelompokkerjahead:objectkelompokkerjahead,
						kdkelompokkerja:kdkelompokkerja,
						kelompokkerja:kelompokkerja,
						qkelompokkerja:qkelompokkerja,
						id:id,
						
		

	}

	var objSave =
		{
			kelompokkerja: data

		}
	
		ManagePhp.postData2("kelompok-kerja/simpan-kelompok-kerja",objSave).then(function (e) {

			loadData();
			$scope.item = {};
			

		});

  }


// 

$scope.tambahKelompokKerjaHead = function () {
			// $state.go("KelompokKerjaHead",,location:false);
			window.open("#/KelompokKerjaHead",'_blank');
			
		}


$scope.batal = function () {
	$scope.showEdit = false;
	$scope.item = {};
}


}
]);
});
