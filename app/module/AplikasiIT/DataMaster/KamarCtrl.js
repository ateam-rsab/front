define(['initialize'], function(initialize) {

'use strict';

initialize.controller('KamarCtrl', ['$q', '$rootScope', '$scope', 'IPSRSService', 'ManagePhp', 
function($q, $rootScope, $scope,IPSRSService,ManagePhp) {
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
	var namaKamar = "";
	if ($scope.item.cariNamaKamar != undefined) {
		namaKamar = "&namaKamar=" + $scope.item.cariNamaKamar;
	}

	ManagePhp.getData("generic/get-kamars?"+ namaKamar).then(function(dat){
		$scope.listDataMaster = dat.data.kamars;
		                                    					
			$scope.dataSource = new kendo.data.DataSource({
				pageSize: 10,
				data: $scope.listDataMaster,
				autoSync: true

			});

	});
}

ManagePhp.getData("generic/get-kelass").then(function(dat){
	$scope.listKelas= dat.data.kelass;
	
});

ManagePhp.getData("generic/get-ruangans").then(function(dat){
	$scope.listRuangan= dat.data.ruangans;
	
});

$scope.columnKamar = [
	{
		"field": "no",
		"title": "No"
	},
	
	{
		"field": "kdkamar",
		"title": "Kd Kamar",
		"hidden": "true"
	},

	{
		"field": "objectkelasfk",
		"title": "objectkelasfk",
		"hidden": "true"
	},

	{
		"field": "kelas",
		"title": "Kelas"
	},

	{
		"field": "objectruanganfk",
		"title": "objectruanganfk",
		"hidden": "true"
	},

	{
		"field": "ruangan",
		"title": "Ruangan"
	},

	{
		"field": "keterangan",
		"title": "Keterangan"
	},

	{
		"field": "jumlakamarisi",
		"title": "Jumlah Kamar Isi"
	},

	{
		"field": "jumlakamarkosong",
		"title": "Jumlah Kamar Kosong"
	},

	{
		"field": "namakamar",
		"title": "Nama Kamar"
	},

	{
		"field": "qkamar",
		"title": "Q Kamar",
		"hidden": "true"
	},

	{
		"field": "qtybed",
		"title": "Qty Bed"
	},

	{
		"field": "reportdisplay",
		"title": "Report Display",
		"hidden": "true"
	},

	{
		"field": "kodeexternal",
		"title": "Kode External",
		"hidden": "true"
	},

	{
		"field": "namaexternal",
		"title": "Nama External",
		"hidden": "true"
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
	$scope.item.kdKamar = current.kdkamar;

	$scope.item.kelas = {id:current.objectkelasfk,namakelas:current.kelas};

	$scope.item.ruangan = {id:current.objectruanganfk,namaruangan:current.ruangan};

	$scope.item.keterangan = current.keterangan;
	$scope.item.jumlaKamarIsi = current.jumlakamarisi;
	$scope.item.jumlaKamarKosong = current.jumlakamarkosong;
	$scope.item.namaKamar = current.namakamar;
	$scope.item.qKamar = current.qkamar;
	$scope.item.qtyBed = current.qtybed;
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

 		ManagePhp.getData("kamar/update-status-enabled-kamar?id="+dataItem.id+"&statusenabled=false").then(function(dat){
				 
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

			ManagePhp.getData("kamar/update-status-enabled-kamar?id="+dataItem.id+"&statusenabled=true").then(function(dat){
				 
			toastr.success(dat.data.message);
			init();
		});
};




//// save 
$scope.simpan = function(){

	var kodeexternal="";
	var namaexternal="";
	var reportdisplay="";

	var objectkelasfk=null;
	var objectruanganfk=null;
	var kdkamar=0;
	var namakamar="";
	var qkamar=0;
	var qtybed=0;
	var jumlakamarisi=0;
	var jumlakamarkosong=0;
	var keterangan="";

	var id="";
	
	if ($scope.item.namaKamar == undefined || $scope.item.namaKamar=="") {
		alert("Nama kamar harus di isi!")
		return
	}else{
		namakamar = $scope.item.namaKamar
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

	
	if($scope.item.kelas.id !=undefined){
		objectkelasfk=$scope.item.kelas.id
	}

	if($scope.item.ruangan.id !=undefined){
		objectruanganfk=$scope.item.ruangan.id
	}

	if($scope.item.kdKamar !=undefined){
		kdkamar=$scope.item.kdKamar
	}

	if($scope.item.namaKamar !=undefined){
		namakamar=$scope.item.namaKamar
	}
	
	if($scope.item.qKamar !=undefined){
		qkamar=$scope.item.qKamar
	}
	
	if($scope.item.qtyBed !=undefined){
		qtybed=$scope.item.qtyBed
	}
	
	if($scope.item.jumlaKamarIsi !=undefined){
		jumlakamarisi=$scope.item.jumlaKamarIsi
	}
	
	if($scope.item.jumlaKamarKosong !=undefined){
		jumlakamarkosong=$scope.item.jumlaKamarKosong
	}
	
	if($scope.item.keterangan !=undefined){
		keterangan=$scope.item.keterangan
	}
	

	if ($scope.item.id != undefined) {
		id=$scope.item.id
	}

	var data = {
						

						kodeexternal:kodeexternal,
						namaexternal:namaexternal,
						reportdisplay:reportdisplay,
						objectkelasfk:objectkelasfk,
						objectruanganfk:objectruanganfk,
						kdkamar:kdkamar,
						namakamar:namakamar,
						qkamar:qkamar,
						qtybed:qtybed,
						jumlakamarisi:jumlakamarisi,
						jumlakamarkosong:jumlakamarkosong,
						keterangan:keterangan,
						id:id,
						
		

	}

	var objSave =
		{
			kamar: data

		}
	
		ManagePhp.postData2("kamar/simpan-kamar",objSave).then(function (e) {

			loadData();
			$scope.item = {};
			

		});

  }


// 


$scope.batal = function () {
	$scope.showEdit = false;
	$scope.item = {};
}


}
]);
});
