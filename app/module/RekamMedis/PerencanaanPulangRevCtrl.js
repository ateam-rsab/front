
define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('PerencanaanPulangRevCtrl', ['$timeout','$q','$rootScope', '$scope', 'ModelItem', 'DateHelper','FindPasien', '$state','ManagePasien','ManagePhp',
        function($timeout,$q,$rootScope, $scope, ModelItem, DateHelper, findPasien, $state, ManagePasien,ManagePhp) {
			// get noRecPap dari local storage yg di ush di halaman dashboard PAP
            $scope.noRecPap = window.localStorage.getItem('noRecPap');
            $scope.dataVOloaded = true;
            $scope.item = {};
            $rootScope.showMenu = true;

            $scope.title = "Perencanaan Pulang";

            $scope.listHomeCare=[
                {"id":1,"nama":"Perlu pelayanan home care","detail":[{"id":1,"nama":"Ya"},{"id":2,"nama":"Tidak"}]}
            ]
            $scope.listImplant=[
                {"id":2,"nama":"Perlu pemasangan implant","detail":[{"id":1,"nama":"Ya "},{"id":2,"nama":"Tidak "}]}
            ]
            $scope.listAlatBantu=[
                {"id":3,"nama":"Penggunaan alat bantu ","detail":[{"id":1,"nama":"Ya  "},{"id":2,"nama":"Tidak  "}]}
            ]
            $scope.listAlat=[
                {"id":4,"nama":"Telah dilakukan pemesanan alat","detail":[{"id":1,"nama":"Ya   "},{"id":2,"nama":"Tidak   "}]}
            ]
            $scope.listKomunitas=[
                {"id":5,"nama":"Dirujuk ke komunitas tertentu","detail":[{"id":1,"nama":"Ya    "},{"id":2,"nama":"Tidak    "}]}
            ]
            $scope.listTerapis=[
                {"id":6,"nama":"Dirujuk ke tim terapis","detail":[{"id":1,"nama":"Ya     "},{"id":2,"nama":"Tidak     "}]}
            ]
            $scope.listGizi=[
                {"id":7,"nama":"Dirujuk ke ahli gizi","detail":[{"id":1,"nama":"Ya      "},{"id":2,"nama":"Tidak      "}]}
            ]

            $scope.getdata=function(){
                var objectfk = "PPP";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk).then(function(e) {
                    $scope.dataGet = e.data.data;
                    if($scope.dataGet.length != 0){
                        for (var i = 0; i < $scope.dataGet.length; i++) {
                            if($scope.dataGet[i].objectfk == "PPP-000001"){
                                $scope.noRecHomeCare = $scope.dataGet[i].norec
                                $scope.item.homeCare = $scope.dataGet[i].nilai;
                            }
                            if($scope.dataGet[i].objectfk == "PPP-000002"){
                                $scope.noRecKetHomeCare = $scope.dataGet[i].norec
                                $scope.item.ketHomeCare = $scope.dataGet[i].nilai;
                            }
                            if($scope.dataGet[i].objectfk == "PPP-000003"){
                                $scope.noRecImplant = $scope.dataGet[i].norec
                                $scope.item.implant = $scope.dataGet[i].nilai;
                            }
                            if($scope.dataGet[i].objectfk == "PPP-000004"){
                                $scope.noRecKetImplant = $scope.dataGet[i].norec
                                $scope.item.ketImplant = $scope.dataGet[i].nilai;
                            }
                            if($scope.dataGet[i].objectfk == "PPP-000005"){
                                $scope.noRecAlatBantu= $scope.dataGet[i].norec
                                $scope.item.alatBantu = $scope.dataGet[i].nilai;
                            }
                            if($scope.dataGet[i].objectfk == "PPP-000006"){
                                $scope.noRecKetAlatBantu = $scope.dataGet[i].norec
                                $scope.item.ketAlatBantu = $scope.dataGet[i].nilai;
                            }
                            if($scope.dataGet[i].objectfk == "PPP-000007"){
                                $scope.noRecAlat = $scope.dataGet[i].norec
                                $scope.item.alat = $scope.dataGet[i].nilai;
                            }
                            if($scope.dataGet[i].objectfk == "PPP-000008"){
                                $scope.noRecKetAlat = $scope.dataGet[i].norec
                                $scope.item.ketAlat = $scope.dataGet[i].nilai;
                            }
                            if($scope.dataGet[i].objectfk == "PPP-000009"){
                                $scope.noRecKomunitas = $scope.dataGet[i].norec
                                $scope.item.komunitas = $scope.dataGet[i].nilai;
                            }
                            if($scope.dataGet[i].objectfk == "PPP-000010"){
                                $scope.noRecKetKomunitas = $scope.dataGet[i].norec
                                $scope.item.ketKomunitas = $scope.dataGet[i].nilai;
                            }
                            if($scope.dataGet[i].objectfk == "PPP-000011"){
                                $scope.noRecTerapis= $scope.dataGet[i].norec
                                $scope.item.terapis = $scope.dataGet[i].nilai;
                            }
                            if($scope.dataGet[i].objectfk == "PPP-000012"){
                                $scope.noRecKetTerapis = $scope.dataGet[i].norec
                                $scope.item.ketTerapis = $scope.dataGet[i].nilai;
                            }
                            if($scope.dataGet[i].objectfk == "PPP-000013"){
                                $scope.noRecGizi = $scope.dataGet[i].norec
                                $scope.item.gizi = $scope.dataGet[i].nilai;
                            }
                            if($scope.dataGet[i].objectfk == "PPP-000014"){
                                $scope.noRecKetGizi = $scope.dataGet[i].norec
                                $scope.item.ketGizi = $scope.dataGet[i].nilai;
                            }
                        }
                    }
                })
            }
            $scope.getdata();

            $scope.Save = function() {
                var dataForm = [];  
                var tempData = [];

                if($scope.item.homeCare !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecHomeCare,
                        objectfk: "PPP-000001",
                        nilai: $scope.item.homeCare.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if($scope.item.ketHomeCare !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecKetHomeCare,
                        objectfk: "PPP-000002",
                        nilai: $scope.item.ketHomeCare.toString(),
                        satuan: "-",
                        jenisobject : "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if($scope.item.implant !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecImplant,
                        objectfk: "PPP-000003",
                        nilai: $scope.item.implant.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if($scope.item.ketImplant !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecKetImplant,
                        objectfk: "PPP-000004",
                        nilai: $scope.item.ketImplant.toString(),
                        satuan: "-",
                        jenisobject : "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if($scope.item.alatBantu !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecAlatBantu,
                        objectfk: "PPP-000005",
                        nilai: $scope.item.alatBantu.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if($scope.item.ketAlatBantu !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecKetAlatBantu,
                        objectfk: "PPP-000006",
                        nilai: $scope.item.ketAlatBantu.toString(),
                        satuan: "-",
                        jenisobject : "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if($scope.item.alat !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecAlat,
                        objectfk: "PPP-000007",
                        nilai: $scope.item.alat.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if($scope.item.ketAlat !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecKetAlat,
                        objectfk: "PPP-000008",
                        nilai: $scope.item.ketAlat.toString(),
                        satuan: "-",
                        jenisobject : "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if($scope.item.komunitas !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecKomunitas,
                        objectfk: "PPP-000009",
                        nilai: $scope.item.komunitas.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if($scope.item.ketKomunitas !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecKetKomunitas,
                        objectfk: "PPP-000010",
                        nilai: $scope.item.ketKomunitas.toString(),
                        satuan: "-",
                        jenisobject : "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if($scope.item.terapis !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecTerapis,
                        objectfk: "PPP-000011",
                        nilai: $scope.item.terapis.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                if($scope.item.ketTerapis !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecKetTerapis,
                        objectfk: "PPP-000012",
                        nilai: $scope.item.ketTerapis.toString(),
                        satuan: "-",
                        jenisobject : "text box"
                    }
                    tempData.push(tmpStatus);
                }
                if($scope.item.gizi !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecGizi,
                        objectfk: "PPP-000013",
                        nilai: $scope.item.gizi.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpStatus);
                }
                 if($scope.item.ketGizi !== undefined){
                    var tmpStatus = {
                        norec: $scope.noRecKetGizi,
                        objectfk: "PPP-000014",
                        nilai: $scope.item.ketGizi.toString(),
                        satuan: "-",
                        jenisobject : "text box"
                    }
                    tempData.push(tmpStatus);
                }
                for (var i = tempData.length - 1; i >= 0; i--) {
                    if(tempData[i].nilai == undefined){
                        tempData.splice([i],1)
                    }
                    if(tempData[i].norec == undefined){
                        tempData[i].norec = '-'
                    }

                }
                debugger;
                var jsonSave = {
                    data: tempData,
                    noregistrasifk: $state.params.noRec
                }
                ManagePhp.saveData(jsonSave).then(function(e) { 
                    $scope.item={};
                    $scope.getdata();
                    ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa',$state.params.noRec, 'Perencanaan Pulang').then(function (res) {
                    })
                });
            }
		}
	]);
});
  