define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('GigiMulutCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'GetPostOnPengkajianAwal', 'FindPegawai', 'ManagePasien', 'DateHelper',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, getPostOnPengkajianAwal, findPegawai, ManagePasien, dateHelper) {
            $scope.tanggal = $state.params.tanggal;
            $scope.noCM = $state.params.noCM;

            $scope.item = {};
            $scope.item.papGigiKananSatu = {
		        "duaenam": "26",
		        "duaempat": "24",
		        "duadua": "22",
		        "duasatu": "21",
		        "duatiga": "23",
		        "duadelapan": "28",
		        "dualima": "25",
		        "duatujuh": "27"
		    };
		    $scope.item.papGigiKananDua = {
		        "enamlima": "[65]",
		        "enamdua": "[62]",
		        "enamempat": "[64]",
		        "enamsatu": "[61]",
		        "enamtiga": "[63]"
		    };
		    $scope.item.papGigiKananTiga = {
		        "tujuhtiga": "[73]",
		        "tujuhempat": "[74]",
		        "tujuhdua": "[72]",
		        "tujuhsatu": "[71]",
		        "tujuhlima": "[75]"
		    };
		    $scope.item.papGigiKananEmpat = {
		        "tigatujuh": "37",
		        "tigaempat": "34",
		        "tigalima": "35",
		        "tigasatu": "31",
		        "tigadelapan": "38",
		        "tigaenam": "36",
		        "tigatiga": "33",
		        "tigadua": "32"
		    };
			$scope.item.papGigiKiriSatu = {
		        "enambelas": "16",
		        "tigabelas": "13",
		        "duabelas": "12",
		        "tujuhbelas": "17",
		        "delapanbelas": "18",
		        "limabelas": "15",
		        "sebelas": "11",
		        "empatbelas": "14"
		    };
			$scope.item.papGigiKiriDua = {
		        "limalima": "[55]",
		        "limadua": "[52]",
		        "limatiga": "[53]",
		        "limaempat": "[54]",
		        "limasatu": "[51]"
		    };
			$scope.item.papGigiKiriTiga = {
		        "delapandua": "[82]",
		        "delapanlima": "[85]",
		        "delapantiga": "[83]",
		        "delapansatu": "[81]",
		        "delapanempat": "[84]"
		    };
			$scope.item.papGigiKiriEmpat = {
		        "empatsatu": "41",
		        "empattujuh": "47",
		        "empatlima": "45",
		        "empatempat": "44",
		        "empatenam": "46",
		        "empatdua": "42",
		        "empatdelapan": "48",
		        "empattiga": "43"
		    };

		    $scope.Odontogram = function(){
		    	var client = new HttpClient();
                client.get('http://127.0.0.1:1237/formvb/rawat-jalan?form-odontogram=1&noregistrasi=1707000053&view=true', function(response) {
                });
		    }

		    var HttpClient = function() {
                this.get = function(aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function() { 
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open( "GET", aUrl, true );            
                    anHttpRequest.send( null );
                }
            }

		    $q.all([ModelItem.getDataDummyGeneric("PapKeadaanGigi", false),
			    	ModelItem.getDataDummyGeneric("PapBahanRestorasi", false),
			    	ModelItem.getDataDummyGeneric("PapRestorasi", false),
			    	ModelItem.getDataDummyGeneric("PapProtesa", false),
			    	findPasien.getByNoCM($scope.noCM)
                   ]).then(function(data) {
                
                if(data[0].statResponse)
                $scope.listKeadaanGigi = data[0];

             	if(data[1].statResponse)
                $scope.listBahanRestorasi = data[1];

             	if(data[2].statResponse)
                $scope.listRestorasi = data[2];

             	if(data[3].statResponse)
                $scope.listProstesa = data[3];

            	if(data[4].statResponse){
                    $rootScope.currentPasien = data[4].data.data;
                    $scope.pasien = data[4].data.data;
                }

                
                //ambil data current pasien seusia no cm dan tanggal     
                getDataCurentPasien();
            });

            function getDataCurentPasien()
            {
                /*findPasien.getPernafasan($state.params.noCM, $state.params.tanggal).then(function(e) {
                   if(e.data.data.PapPernapasan[0] != undefined){
                        $scope.item.PapPernapasan = e.data.data.PapPernapasan[0];
                        /*if ($scope.item.keluhanUtama !== undefined)
                            $scope.editMode = true;
                        $scope.item.noRec = $scope.item.PapPernapasan.noRec;
                    }
                });*/
            };

            $scope.Save = function(){
            	//cacheHelper.set("kajianAwal", $scope.kajianAwal);
                ManagePasien.saveGigiMulut(ModelItem.beforePost($scope.pasien), dateHelper.toTimeStamp($state.params.tanggal), ModelItem.beforePost($scope.item)).then(function(e) {

                    /*$scope.kajianAwal.pernafasan = $scope.item;
                    cacheHelper.set("kajianAwal", $scope.kajianAwal);
                    $state.go('dashboardpasien.Sirkulasi', {
                        noCM: $scope.noCM,
                        tanggal: $state.params.tanggal
                    });*/
                });
            }
        }
    ]);
});