define(['initialize'], function(initialize){
	'use strict';
	initialize.controller('KamarInapCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras','FindSarpras','$state', 'ModelItemAkuntansi',
		function($rootScope, $scope, ModelItem, DateHelper, ManageSarpras,FindSarpras,$state, modelItemAkuntansi){
			$scope.title = "";
			$scope.dataVOloaded = true;
            $rootScope.isOpen = true;
			$scope.item = {};
			$scope.instruksi = $state.params.instruksi;

            var dataItem = ModelItem.kendoHttpSource('/ruangan/get-all-ruangan-by-id-dept');
            dataItem.fetch(function() {
                    $scope.nmRuangan = dataItem._data;
                })

            debugger;
              $scope.$watch('item.ruangan', function(e) {
              	debugger
                if (e === undefined) return;
                var ruanganId = $scope.item.ruangan.id;
                FindSarpras.getKamarId(ruanganId).then(function(a) {
                    $scope.listKelas = a.data.data.data;
                    debugger;
                })
            });

              $scope.$watch('item.kamar', function(e) {
              	debugger;
                if (e === undefined) return;
                var ruanganId = $scope.item.kamar.idRuangan;
                // var KamarId = $scope.item.kamar.idKamar;
                FindSarpras.getfasilitas(ruanganId).then(function(a) {
                	debugger
                    $scope.listfasilitas = a.data.data.data;
                    // for (var i = 0; i < $scope.listfasilitas.length; i++) {
                    // 	$scope.listfasilitas[i].nmFasilitas;
                    // }
                    $scope.item.nmFasilitas = a.data.data.data[0].deskDetailFal;
                    $scope.item.nmDept = a.data.data.data[0].nmDept;
                    $scope.item.nmRuangan = a.data.data.data[0].nmRuangan;
                    $scope.item.nmKelas = a.data.data.data[0].nmKelas;
                    $scope.item.deskDetailFal = a.data.data.data[0].deskDetailFal;
                    // debugger;
                    $scope.item.pathGambar1 = a.data.data.data[0].pathGambar1;
                    $scope.item.pathGambar2 = a.data.data.data[0].pathGambar2;
                    $scope.item.pathGambar3 = a.data.data.data[0].pathGambar3;
                    $scope.item.pathGambar4 = a.data.data.data[0].pathGambar4;
                    
                })
            });

            $scope.getFasilitas = function () {
            	debugger;
				$scope.Ruangan = $scope.item.ruangan;
				$scope.Kelas = $scope.item.kamar;
				ManageSarpras.getItem("fasilitas/get-list-fasilitas-by-kelas-ruangan?idKelas="+$scope.Kelas+"&idRuangan="+$scope.Ruangan, true).then(function(dat){
					
					$scope.item.namaDept = dat;
					// $scope.item.nip = dat.data.data.nip;
					// $scope.item.ruangan = dat.data.data.namaRuangan;
					// $scope.item.ruanganId = dat.data.data.ruanganId
				});
			}

			 // $scope.uploadFile = function() {
			 //                var f = $scope.files; {
			 //                var fr = new FileReader();
			 //                if (FileReader && f && f.length) {
			 //                    fr.readAsDataURL(f[0].rawFile);
			 //                    fr.onload = function() {
			 //                    var imageData = fr.result
			 //                    var tempArray = imageData.split(",");

			 //                    var dataPost = {
			 //                        // Create a view
			 //                        fileInput: tempArray[1],
			 //                        fileName: f[0].name
			 // };

$scope.batal = function()
			{
			  $scope.item= {};
			}			

			$scope.now = new Date();
			$scope.tanggal = DateHelper.getTanggalFormatted($scope.now);
			var HH = $scope.now.getHours();
			var mm = $scope.now.getMinutes();
			var ss = $scope.now.getSeconds();
			if(HH<10) HH = "0" + HH;
			if(mm<10) mm = "0" + mm;
			if(ss<10) ss = "0" + ss;
			$scope.jam = HH + ":" + mm + ":" + ss;

			$scope.Search = function(){
				var ruangan = $scope.item.ruangan.id;
				var kelas = $scope.item.kelas.id;
				// console.log(JSON.stringify(kamar));

				ManageSarpras.getOrderList("ketersediaan-tempat-tidur/find-kamar-by-ruangan-and-kelas/"+ruangan+"/"+kelas).then(function(data){
					// debugger;
					$scope.sourceInfoKamar = data.data.data;
				});
			}
	


	}])
})
