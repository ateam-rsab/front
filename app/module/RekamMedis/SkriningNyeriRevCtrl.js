define(['initialize'], function(initialize) {
    'use strict';

    initialize.controller('SkriningNyeriRevCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper','ManagePhp',
        function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper,ManagePhp) {
        
            // $rootScope.listActive -> data listMenu
            // ModelItem.setActiveMenu($rootScope.listActive, "SkriningNyeri");
            // get noRecPap dari local storage yg di ush di halaman dashboard PAP
            $scope.noRecPap = cacheHelper.get('noRecPap');

            var norecPap ='';
			loadCache()
            function loadCache (){
                var cache = cacheHelper.get('noRecPap');
                if (cache != undefined){
                    norecPap =cache

                }
            }
            // indikator harap tunggu
            $scope.dataVOloaded = true;
            $rootScope.doneLoad = false;
            $scope.isFrekuensi= true;
            $scope.isLokasi = true;
            $scope.isDurasi = true;
            $rootScope.isNyeri = true; // disable input text box rasa nyeri
            
            $scope.title = {};
            $scope.titleNyeriAnak = "Penilaian nyeri untuk anak";
            $scope.titleNeonatus = "Penilaian nyeri untuk neonatus"
            $scope.titleFlacc = "Penilaian Nyeri FLACC Scale (Untuk anak umur 2 bulan-7 tahun)"
            $scope.item = {};

            $scope.noCM = $state.params.noCM;
            $rootScope.showMenu = true;
            $rootScope.showMenuDetail = false;
            $scope.pasien = {};
            
			$scope.arrSkorNeonatus = [];
			$scope.arrSkorDewasa = [];
			$scope.arrSkorflacc = [];
			$scope.papNyeri = {};
			$scope.opsiYaTidak = [{"id": 67,"nama": "Tidak","descNilai": "0","value": null},{"id": 66,"nama": "Ya","descNilai": "1","value": null}]
            $scope.listWajah=[
                {"id":1,"nama":"Ekspresi Wajah","detail":[{"id":1,"nama":"Otot wajah rileks, Ekspresi netral","descNilai":"0"},{"id":2,"nama":"Otot wajah tegang, alis berkerut, rahang dagu mengunci","descNilai":"1"}]}
            ]
            $scope.listTangisan=[
                {"id":2,"nama":"Tangisan","detail":[{"id":1,"nama":"Tenang, tidak menangis","descNilai":"0"},{"id":2,"nama":"Mengerang, sebentar-sebentar menangis","descNilai":"1"},{"id":3,"nama":"Terus menerus menangis, menangis kencang, melengking","descNilai":"2"}]}
            ]
            $scope.listPolaNapas=[
                {"id":3,"nama":"Pola Napas","detail":[{"id":1,"nama":"Rileks, napas reguler","descNilai":"0"},{"id":2,"nama":"Pola napas berubah: tidak teratur, lebih cepat dari biasanya, tersedak, menahan napas","descNilai":"1"}]}
            ]
            $scope.listTangan=[
                {"id":4,"nama":"Tangan","detail":[{"id":1,"nama":"Rileks, otot tangan tidak kaku, kadang bergerak tidak beraturan","descNilai":"0"},{"id":2,"nama":"Fleksi/ekstensi yang kaku, meluruskan tangan tapi dengan cepat melakukan fleksi/ekstensi yang kaku","descNilai":"1"}]}
            ]
            $scope.listKaki=[
                {"id":5,"nama":"Kaki","detail":[{"id":1,"nama":"Rileks, otot-otot tidak kaku, kadang kaki bergerak tidak beraturan","descNilai":"0"},{"id":2,"nama":"Fleksi/ekstensi yang kaku, meluruskan kaki tapi dengan cepat melakukan fleksi/ekstensi yang kaku","descNilai":"1"}]}
            ]
            $scope.listKesadaran=[
                {"id":6,"nama":"Kesadaran","detail":[{"id":1,"nama":"Tidur pulas atau cepat bangun, alert dan tenang","descNilai":"0"},{"id":2,"nama":"Rewel, gelisah dan meronta-ronta","descNilai":"1"}]}
            ]
            $scope.listNyeriAnak=[
                {"id":7,"nama":"Hurts","detail":[{"id":1,"nama":"No Hurt","descNilai":"0  "},{"id":2,"nama":"Hurts Little Bit","descNilai":"2  "},{"id":3,"nama":"Hurts Little More","descNilai":"4  "},{"id":4,"nama":"Hurts Even More","descNilai":"6  "},{"id":5,"nama":"Hurts Whole Lot","descNilai":"8  "},{"id":6,"nama":"Hurts whorts","descNilai":"10  "}]}
            ]
            $scope.listRasaNyeri=[
                {"id":8,"nama":"Adakah Rasa Nyeri","detail":[{"id":81,"nama":"Ya","descNilai":"0","detail":[{"id":811,"nama":"Lokasi"},{"id":812,"nama":"Frekuensi"},{"id":813,"nama":"Durasi"}]},{"id":82,"nama":"Tidak","descNilai":"2"}]}
            ]
            $scope.listTipeNyeri=[
                {"id":9,"nama":"Tipe Nyeri","detail":[{"id":1,"nama":"Terus menerus"},{"id":2,"nama":"Hilang Timbul"}]}
            ]
            $scope.listKarakteristikNyeri=[
                {"id":10,"nama":"Karakteristik Nyeri","detail":[{"id":1,"nama":"Terbakar"},{"id":2,"nama":"Tertusuk"},{"id":3,"nama":"Tumpul"},{"id":4,"nama":"Tertekan"},{"id":5,"nama":"Berat"},{"id":6,"nama":"Tajam"},{"id":7,"nama":"Kram"}]}
            ]
            $scope.listNyeriMempengaruhi=[
                {"id":11,"nama":"Nyeri Mempengaruhi","detail":[{"id":1,"nama":"Tidur"},{"id":2,"nama":"Aktivitas fisik"},{"id":3,"nama":"Emosi"},{"id":4,"nama":"Konsentrasi"},{"id":5,"nama":"Nafsu Makan"}]}
            ]
            $scope.listFlaccFace=[
                {"id":12,"nama":"Face (Wajah)","detail":[{"id":1,"nama":"senyum","descNilai":"0"},{"id":2,"nama":"Kadang-kadang meringis, cemberut, lesu/tidak bersemangat","descNilai":"1"},{"id":3,"nama":"Sering/terus menerus meringis, geraham menutup, dagu bergetar menahan sakit","descNilai":"2"}]}
            ]
            $scope.listFlaccLegs=[
                {"id":13,"nama":"Legs (Ekstremitas)","detail":[{"id":1,"nama":"Rileks/tenang","descNilai":"0"},{"id":2,"nama":"Tidak bisa tenang/ tegang","descNilai":"1"},{"id":3,"nama":"Menendang-nendang","descNilai":"2"}]}
            ]
            $scope.listFlaccActivity=[
                {"id":14,"nama":"Activity (Gerakan)","detail":[{"id":1,"nama":"Berbaring tenang, mudah bergerak, posisi tubuh normal","descNilai":"0"},{"id":2,"nama":"Gerakan berubah-ubah, tegang","descNilai":"1"},{"id":3,"nama":"Posisi tubuh meringkuk, spasme atau kejang","descNilai":"2"}]}
            ]
            $scope.listFlaccCry=[
                {"id":15,"nama":"Cry (Menangis)","detail":[{"id":1,"nama":"Tidak menangis","descNilai":"0"},{"id":2,"nama":"Merintih, kadang-kadang mengeluh","descNilai":"1"},{"id":3,"nama":"Menangis tersedu-sedu, menjerit & sering mengeluh","descNilai":"2"}]}
            ]
            $scope.listFlaccConsolability=[
                {"id":16,"nama":"Consolability (Kemampuan ditenangkan)","detail":[{"id":1,"nama":" Tenang","descNilai":"0"},{"id":2,"nama":" Dapat ditenangkan dengan sentuhan, pelukan, distraksi","descNilai":"1"},{"id":3,"nama":"Sulit untuk ditenangkan","descNilai":"2"}]}
            ]

            $scope.arrParameterNeonatus = [];
            $scope.arrParameterDewasa = [];
            $scope.arrParameterflacc = [];

            $scope.getdata=function(){
                var objectfk = "SKN";
                var noregistrasifk = $state.params.noRec;
                var status = "t";
                ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk
            	+ '&riwayatfk=' + norecPap).then(function(e) {
                    $scope.dataSkrining = e.data.data;
                    if($scope.dataSkrining.length != 0){
                        for (var i = 0; i < $scope.dataSkrining.length; i++) {
                            if($scope.dataSkrining[i].objectfk == "SKN-000001"){
                                $scope.noRecWajah = $scope.dataSkrining[i].norec
                                $scope.item.ekpresiWajah = $scope.dataSkrining[i].nilai;
                                if($scope.item.ekpresiWajah === "1"){
                                    var temp = {
                                        "id": 1,
                                        "idParent": 1,
                                        "descNilai": '0'
                                    }                                    
                                }
                                if($scope.item.ekpresiWajah === "2"){
                                    var temp = {
                                        "id": 2,
                                        "idParent": 1,
                                        "descNilai": '1'
                                    }
                                }  
                                $scope.getSkor($scope.listWajah[0],temp);
                            }
                             if($scope.dataSkrining[i].objectfk == "SKN-000002"){
                                $scope.noRecTangisan = $scope.dataSkrining[i].norec
                                $scope.item.tangisan = $scope.dataSkrining[i].nilai;
                                if($scope.item.tangisan === "1"){
                                    var temp = {
                                        "id": 1,
                                        "idParent": 2,
                                        "descNilai": '0'
                                    }
                                }
                                if($scope.item.tangisan === "2"){
                                    var temp = {
                                        "id": 2,
                                        "idParent": 2,
                                        "descNilai": '1'
                                    }
                                }
                                if($scope.item.tangisan === "3"){
                                    var temp = {
                                        "id": 3,
                                        "idParent": 2,
                                        "descNilai": '2'
                                    }
                                }          
                                $scope.getSkor($scope.listTangisan[0],temp);
                            }
                             if($scope.dataSkrining[i].objectfk == "SKN-000003"){
                                $scope.noRecPolaNapas = $scope.dataSkrining[i].norec
                                $scope.item.polaNapas = $scope.dataSkrining[i].nilai;
                                if($scope.item.polaNapas === "1"){
                                    var temp = {
                                        "id": 1,
                                        "idParent": 3,
                                        "descNilai": '0'
                                    }
                                }
                                if($scope.item.polaNapas === "2"){
                                    var temp = {
                                        "id": 2,
                                        "idParent": 3,
                                        "descNilai": '1'
                                    }
                                }
                                $scope.getSkor($scope.listPolaNapas[0],temp);
                            }
                             if($scope.dataSkrining[i].objectfk == "SKN-000004"){
                                $scope.noRecTangan = $scope.dataSkrining[i].norec
                                $scope.item.tangan = $scope.dataSkrining[i].nilai;
                                if($scope.item.tangan === "1"){
                                    var temp = {
                                        "id": 1,
                                        "idParent": 4,
                                        "descNilai": '0'
                                    }
                                }
                                if($scope.item.tangan === "2"){
                                    var temp = {
                                        "id": 2,
                                        "idParent": 4,
                                        "descNilai": '1'
                                    }
                                }
                                $scope.getSkor($scope.listTangan[0],temp);
                            }
                             if($scope.dataSkrining[i].objectfk == "SKN-000005"){
                                $scope.noRecKaki = $scope.dataSkrining[i].norec
                                $scope.item.kaki = $scope.dataSkrining[i].nilai;
                                if($scope.item.kaki === "1"){
                                    var temp = {
                                        "id": 1,
                                        "idParent": 5,
                                        "descNilai": '0'
                                    }
                                }
                                if($scope.item.kaki === "2"){
                                    var temp = {
                                        "id": 2,
                                        "idParent": 5,
                                        "descNilai": '1'
                                    }
                                }
                                $scope.getSkor($scope.listKaki[0],temp);
                            }
                             if($scope.dataSkrining[i].objectfk == "SKN-000006"){
                                $scope.noRecKesadaran = $scope.dataSkrining[i].norec
                                $scope.item.kesadaran = $scope.dataSkrining[i].nilai;
                                if($scope.item.kesadaran === "1"){
                                    var temp = {
                                        "id": 1,
                                        "idParent": 6,
                                        "descNilai": '0'
                                    }
                                }
                                if($scope.item.kesadaran === "2"){
                                    var temp = {
                                        "id": 2,
                                        "idParent": 6,
                                        "descNilai": '1'
                                    }
                                }
                                $scope.getSkor($scope.listKesadaran[0],temp);
                            }
                             if($scope.dataSkrining[i].objectfk == "SKN-000007"){
                                $scope.noRecSkalaNyeri = $scope.dataSkrining[i].norec
                                $scope.item.skalaNyeri = $scope.dataSkrining[i].nilai;
                            }
                             if($scope.dataSkrining[i].objectfk == "SKN-000008"){
                                $scope.noRecSkorNyeri = $scope.dataSkrining[i].norec
                                $scope.item.skorNyeri = $scope.dataSkrining[i].nilai;
                            }
                             if($scope.dataSkrining[i].objectfk == "SKN-000009"){
                                $scope.noRecRasaNyeri = $scope.dataSkrining[i].norec
                                $scope.item.rasaNyeri = $scope.dataSkrining[i].nilai;
                            }
                             if($scope.dataSkrining[i].objectfk == "SKN-000010"){
                                $scope.noRecTipeNyeri = $scope.dataSkrining[i].norec
                                $scope.item.tipeNyeri = $scope.dataSkrining[i].nilai;
                            }
                             if($scope.dataSkrining[i].objectfk == "SKN-000011"){
                                $scope.noRecKarakteristikNyeri= $scope.dataSkrining[i].norec
                                $scope.item.karakteristikNyeri = $scope.dataSkrining[i].nilai;
                            }
                             if($scope.dataSkrining[i].objectfk == "SKN-000012"){
                                $scope.noRecFrekuensi = $scope.dataSkrining[i].norec
                                $scope.item.frekuensi = $scope.dataSkrining[i].nilai;
                            }
                             if($scope.dataSkrining[i].objectfk == "SKN-000013"){
                                $scope.noRecLokasi= $scope.dataSkrining[i].norec
                                $scope.item.lokasi = $scope.dataSkrining[i].nilai;
                            }
                             if($scope.dataSkrining[i].objectfk == "SKN-000014"){
                                $scope.noRecDurasi = $scope.dataSkrining[i].norec
                                $scope.item.durasi = $scope.dataSkrining[i].nilai;
                            }
                             if($scope.dataSkrining[i].objectfk == "SKN-000015"){
                                $scope.noRecTidur = $scope.dataSkrining[i].norec
                                $scope.listNyeriMempengaruhi[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataSkrining[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentNyeriMempengaruhi.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataSkrining[i].objectfk == "SKN-000016"){
                                $scope.noRecAktivitasFisik = $scope.dataSkrining[i].norec
                                $scope.listNyeriMempengaruhi[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataSkrining[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentNyeriMempengaruhi.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataSkrining[i].objectfk == "SKN-000017"){
                                $scope.noRecEmosi = $scope.dataSkrining[i].norec
                                $scope.listNyeriMempengaruhi[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataSkrining[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentNyeriMempengaruhi.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataSkrining[i].objectfk == "SKN-000018"){
                                $scope.noRecKonsentrasi = $scope.dataSkrining[i].norec
                                $scope.listNyeriMempengaruhi[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataSkrining[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentNyeriMempengaruhi.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataSkrining[i].objectfk == "SKN-000019"){
                                $scope.noRecNafsuMakan = $scope.dataSkrining[i].norec
                                $scope.listNyeriMempengaruhi[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataSkrining[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama,                                                    
                                                    }  
                                         $scope.currentNyeriMempengaruhi.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataSkrining[i].objectfk == "SKN-000020"){
                                $scope.noRecFlaccWajah = $scope.dataSkrining[i].norec
                                $scope.item.flaccWajah = $scope.dataSkrining[i].nilai;
                                if($scope.item.flaccWajah === "1"){
                                    var temp = {
                                        "id": 1,
                                        "idParent": 12,
                                        "descNilai": '0'
                                    }
                                }
                                if($scope.item.flaccWajah === "2"){
                                    var temp = {
                                        "id": 2,
                                        "idParent": 12,
                                        "descNilai": '1'
                                    }
                                }
                                if($scope.item.flaccWajah === "3"){
                                    var temp = {
                                        "id": 3,
                                        "idParent": 12,
                                        "descNilai": '2'
                                    }
                                }          
                                $scope.getSkorFlacc($scope.listFlaccFace[0],temp);
                            }
                            if($scope.dataSkrining[i].objectfk == "SKN-000021"){
                                $scope.noRecFlaccEkstremitas = $scope.dataSkrining[i].norec
                                $scope.item.flaccEkstremitas = $scope.dataSkrining[i].nilai;
                                if($scope.item.flaccEkstremitas === "1"){
                                    var temp = {
                                        "id": 1,
                                        "idParent": 13,
                                        "descNilai": '0'
                                    }
                                }
                                if($scope.item.flaccEkstremitas === "2"){
                                    var temp = {
                                        "id": 2,
                                        "idParent": 13,
                                        "descNilai": '1'
                                    }
                                }
                                if($scope.item.flaccEkstremitas === "3"){
                                    var temp = {
                                        "id": 3,
                                        "idParent": 13,
                                        "descNilai": '2'
                                    }
                                }          
                                $scope.getSkorFlacc($scope.listFlaccLegs[0],temp);
                            }
                            if($scope.dataSkrining[i].objectfk == "SKN-000022"){
                                $scope.noRecFlaccGerakan = $scope.dataSkrining[i].norec
                                $scope.item.flaccGerakan = $scope.dataSkrining[i].nilai;
                                if($scope.item.flaccGerakan === "1"){
                                    var temp = {
                                        "id": 1,
                                        "idParent": 14,
                                        "descNilai": '0'
                                    }
                                }
                                if($scope.item.flaccGerakan === "2"){
                                    var temp = {
                                        "id": 2,
                                        "idParent": 14,
                                        "descNilai": '1'
                                    }
                                }
                                if($scope.item.flaccGerakan === "3"){
                                    var temp = {
                                        "id": 3,
                                        "idParent": 14,
                                        "descNilai": '2'
                                    }
                                }          
                                $scope.getSkorFlacc($scope.listFlaccActivity[0],temp);
                            }
                            if($scope.dataSkrining[i].objectfk == "SKN-000023"){
                                $scope.noRecFlaccMenangis = $scope.dataSkrining[i].norec
                                $scope.item.flaccMenangis = $scope.dataSkrining[i].nilai;
                                if($scope.item.flaccMenangis === "1"){
                                    var temp = {
                                        "id": 1,
                                        "idParent": 15,
                                        "descNilai": '0'
                                    }
                                }
                                if($scope.item.flaccMenangis === "2"){
                                    var temp = {
                                        "id": 2,
                                        "idParent": 15,
                                        "descNilai": '1'
                                    }
                                }
                                if($scope.item.flaccMenangis === "3"){
                                    var temp = {
                                        "id": 3,
                                        "idParent": 15,
                                        "descNilai": '2'
                                    }
                                }          
                                $scope.getSkorFlacc($scope.listFlaccCry[0],temp);
                            }
                            if($scope.dataSkrining[i].objectfk == "SKN-000024"){
                                $scope.noRecFlaccKetenangan = $scope.dataSkrining[i].norec
                                $scope.item.flaccKetenangan = $scope.dataSkrining[i].nilai;
                                if($scope.item.flaccKetenangan === "1"){
                                    var temp = {
                                        "id": 1,
                                        "idParent": 16,
                                        "descNilai": '0'
                                    }
                                }
                                if($scope.item.flaccKetenangan === "2"){
                                    var temp = {
                                        "id": 2,
                                        "idParent": 16,
                                        "descNilai": '1'
                                    }
                                }
                                if($scope.item.flaccKetenangan === "3"){
                                    var temp = {
                                        "id": 3,
                                        "idParent": 16,
                                        "descNilai": '2'
                                    }
                                }          
                                $scope.getSkorFlacc($scope.listFlaccConsolability[0],temp);
                            }
                            if($scope.dataSkrining[i].objectfk == "SKN-000025"){
                                $scope.noRecTerbakar = $scope.dataSkrining[i].norec
                                $scope.listKarakteristikNyeri[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataSkrining[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentKarakteristikNyeri.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataSkrining[i].objectfk == "SKN-000026"){
                                $scope.noRecTertusuk = $scope.dataSkrining[i].norec
                                $scope.listKarakteristikNyeri[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataSkrining[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentKarakteristikNyeri.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataSkrining[i].objectfk == "SKN-000027"){
                                $scope.noRecTumpul = $scope.dataSkrining[i].norec
                                $scope.listKarakteristikNyeri[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataSkrining[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentKarakteristikNyeri.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataSkrining[i].objectfk == "SKN-000028"){
                                $scope.noRecTertekan = $scope.dataSkrining[i].norec
                                $scope.listKarakteristikNyeri[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataSkrining[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentKarakteristikNyeri.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataSkrining[i].objectfk == "SKN-000029"){
                                $scope.noRecBerat = $scope.dataSkrining[i].norec
                                $scope.listKarakteristikNyeri[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataSkrining[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentKarakteristikNyeri.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataSkrining[i].objectfk == "SKN-000030"){
                                $scope.noRecTajam = $scope.dataSkrining[i].norec
                                $scope.listKarakteristikNyeri[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataSkrining[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentKarakteristikNyeri.push(dataid)
                                    }
                                })
                            }
                            if($scope.dataSkrining[i].objectfk == "SKN-000031"){
                                $scope.noRecKram = $scope.dataSkrining[i].norec
                                $scope.listKarakteristikNyeri[0].detail.forEach(function(e){
                                 if (e.id ==  $scope.dataSkrining[i].nilai){
                                        e.isChecked = true
                                        var dataid = {"id":e.id,
                                                     "nama":e.nama                                                    
                                                    }  
                                         $scope.currentKarakteristikNyeri.push(dataid)
                                    }
                                })
                            }
                        
                        
                        }
                    }
                })
            }
            $scope.getdata();
            $scope.arrSkorSkalaNyeri = [];
            $scope.arrNyeriMempengaruhi = [];
            $scope.listSkorNeonatus = [];
            $scope.listSkorFlacc= [];

            $scope.getSkor = function(data, stat) {
                var result = $.grep($scope.listSkorNeonatus, function(e) { 
                    return e.idParent == data.id;
                });
                var tempData = {
                    "id": stat.id,
                    "idParent": data.id,
                    "descNilai": stat.descNilai,
                    "nama": stat.nama,
                    "value": "true"
                }
                if (result.length == 0) {
                    $scope.listSkorNeonatus.push(tempData);
                } else {
                    for (var i = 0; i < $scope.listSkorNeonatus.length; i++)
                        if ($scope.listSkorNeonatus[i].idParent && $scope.listSkorNeonatus[i].idParent === data.id) { 
                            $scope.listSkorNeonatus.splice(i, 1);
                            break;
                        }
                    $scope.listSkorNeonatus.push(tempData);
                }
                getTotalNeo();
            }
            $scope.getSkalaNyeri = function(data, stat) {
                $scope.item.skalaNyeri = stat.descNilai;
            }
            $scope.rasaNyeri = function(data, stat) {
                switch (stat.id) {
                    case 81:
                        $scope.isFrekuensi = false;
                        $scope.isLokasi = false;
                        $scope.isDurasi = false;
                        break;
                    case 82:
                        $scope.isFrekuensi= true;
                        $scope.isLokasi = true;
                        $scope.isDurasi = true;
                        $scope.item.frekuensi = "";
                        $scope.item.lokasi = "";
                        $scope.item.durasi = "";
                        break;
                }
            }
            $scope.cekSkalaNyeri = function(data, stat) {
                debugger;
                $scope.item.skalaNyeri = stat.descNilai;
				var result = $.grep($scope.arrSkorSkalaNyeri, function(e) { 
					return e.idParent == data.id;
				});
				var tempData = {
					"id": stat.id,
					"idParent": data.id,
					"descNilai": stat.descNilai,
					"nama": stat.nama,
					"value": "true"
				}
				if (result.length == 0) {
					$scope.arrSkorSkalaNyeri.push(tempData);
				} else {
					for (var i = 0; i < $scope.arrSkorSkalaNyeri.length; i++)
						if ($scope.arrSkorSkalaNyeri[i].idParent && $scope.arrSkorSkalaNyeri[i].idParent === data.id) { 
							$scope.arrSkorSkalaNyeri.splice(i, 1);
							break;
						}
					$scope.arrSkorSkalaNyeri.push(tempData);
				}
			}
            $scope.getSkorFlacc = function(data, stat) {
                data.value = stat.id;
                data.descNilai = stat.descNilai;
                var result = $.grep($scope.listSkorFlacc, function(e) { 
                    return e.idParent == data.id;
                });
                var tempData = {
                    "id": stat.id,
                    "idParent": data.id,
                    "descNilai": stat.descNilai,
                    "nama": stat.nama,
                    "value": "true"
                }
                if (result.length == 0) {
                    $scope.listSkorFlacc.push(tempData);
                } else {
                    for (var i = 0; i < $scope.listSkorFlacc.length; i++)
                        if ($scope.listSkorFlacc[i].idParent && $scope.listSkorFlacc[i].idParent === data.id) { 
                            $scope.listSkorFlacc.splice(i, 1);
                            break;
                        }
                    $scope.listSkorFlacc.push(tempData);
                }
                getTotalFlacc();
            }
            
            var getTotalNeo = function() {
                var skorAwal = 0;
                $scope.listSkorNeonatus.forEach(function(data){
                    skorAwal += parseInt(data.descNilai);
                })
                $scope.totalSkorNeonatus = skorAwal
            }
            
            var getTotalFlacc = function() {
                var skorAwal = 0;
                $scope.listSkorFlacc.forEach(function(data){
                    skorAwal += parseInt(data.descNilai);
                })
                $scope.totalSkorFlacc = skorAwal
            }
			
            $scope.currentNyeriMempengaruhi=[];
            $scope.addListNyeriMempengaruhi = function(bool,data) {
                var index = $scope.currentNyeriMempengaruhi.indexOf(data);
                if (_.filter($scope.currentNyeriMempengaruhi, {
                        id: data.id
                    }).length === 0)
                    $scope.currentNyeriMempengaruhi.push(data);
                else {
                    $scope.currentNyeriMempengaruhi.splice(index, 1);
                }
                
            }

            $scope.currentKarakteristikNyeri=[];
            $scope.addListKarakteristikNyeri = function(bool,data) {
                var index = $scope.currentKarakteristikNyeri.indexOf(data);
                if (_.filter($scope.currentKarakteristikNyeri, {
                        id: data.id
                    }).length === 0)
                    $scope.currentKarakteristikNyeri.push(data);
                else {
                    $scope.currentKarakteristikNyeri.splice(index, 1);
                }
            }
            

            $scope.Next = function() {
                $rootScope.next();
            }
        
            $scope.Save = function() {
                var dataForm = [];  
                var tempData = [];
                if($scope.item.ekpresiWajah !== undefined){
                    var tmpDataNeo = {
                        norec: $scope.noRecEkspresiWajah,
                        objectfk: "SKN-000001",
                        nilai: $scope.item.ekpresiWajah.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpDataNeo) 
                }
                if($scope.item.tangisan !== undefined){
                    var tmpDataNeo = {
                        norec: $scope.noRecTangisan,
                        objectfk: "SKN-000002",
                        nilai: $scope.item.tangisan.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpDataNeo) 
                }
                if($scope.item.polaNapas !== undefined){
                    var tmpDataNeo = {
                        norec: $scope.noRecPolaNapas,
                        objectfk: "SKN-000003",
                        nilai: $scope.item.polaNapas.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpDataNeo) 
                }
                if($scope.item.tangan !== undefined){
                    var tmpDataNeo = {
                        norec: $scope.noRecTangan,
                        objectfk: "SKN-000004",
                        nilai: $scope.item.tangan.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpDataNeo) 
                }           
                if($scope.item.kaki !== undefined){
                    var tmpDataNeo = {
                        norec: $scope.noRecKaki,
                        objectfk: "SKN-000005",
                        nilai: $scope.item.kaki.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpDataNeo) 
                }           
                if($scope.item.kesadaran !== undefined){
                    var tmpDataNeo = {
                        norec: $scope.noRecKesadaran,
                        objectfk: "SKN-000006",
                        nilai: $scope.item.kesadaran.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpDataNeo) 
                }
                if($scope.item.skalaNyeri !== undefined){
                    var dataSkalaNyeri={
                        norec: $scope.noRecSkalaNyeri,
                        objectfk: "SKN-000007",
                        nilai: $scope.item.skalaNyeri.toString(),
                        satuan: "-",
                        jenisobject : "text box"
                    }
                    tempData.push(dataSkalaNyeri)
                }

                if($scope.item.skorNyeri !== undefined){
                    var dataSkorSkalaNyeri = {
                        norec: $scope.noRecSkorNyeri,
                        objectfk: "SKN-000008",
                        nilai: $scope.item.skorNyeri.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(dataSkorSkalaNyeri) 
                }
                if($scope.item.rasaNyeri !== undefined){
                    var tmpDataSkorDewasa = {
                        norec: $scope.noRecRasaNyeri,
                        objectfk: "SKN-000009",
                        nilai: $scope.item.rasaNyeri.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpDataSkorDewasa);
                }
                if($scope.item.tipeNyeri !== undefined){
                    var tmpDataSkorDewasa = {
                        norec: $scope.noRecTipeNyeri,
                        objectfk: "SKN-000010",
                        nilai: $scope.item.tipeNyeri.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpDataSkorDewasa);
                }
                if($scope.item.karakteristikNyeri !== undefined){
                    var tmpDataSkorDewasa = {
                        norec: $scope.noRecKarakteristikNyeri,
                        objectfk: "SKN-000011",
                        nilai: $scope.item.karakteristikNyeri.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpDataSkorDewasa);
                }
                if($scope.item.frekuensi !== undefined){
                    var tmpDataSkorDewasa = {
                        norec: $scope.noRecFrekuensi,
                        objectfk: "SKN-000012",
                        nilai: $scope.item.frekuensi.toString(),
                        satuan: "-",
                        jenisobject : "textbox"
                    }
                    tempData.push(tmpDataSkorDewasa);
                }
                if($scope.item.lokasi !== undefined){
                    var tmpDataSkorDewasa = {
                        norec: $scope.noRecLokasi,
                        objectfk: "SKN-000013",
                        nilai: $scope.item.lokasi.toString(),
                        satuan: "-",
                        jenisobject : "textbox"
                    }
                    tempData.push(tmpDataSkorDewasa);
                }
                if($scope.item.durasi !== undefined){
                    var tmpDataSkorDewasa = {
                        norec: $scope.noRecDurasi,
                        objectfk: "SKN-000014",
                        nilai: $scope.item.durasi.toString(),
                        satuan: "-",
                        jenisobject : "textbox"
                    }
                    tempData.push(tmpDataSkorDewasa);
                }
                $scope.currentNyeriMempengaruhi.forEach(function(data){
                    if(data.id === 1){
                        var tmpDataSkorDewasa = {
                            norec: $scope.noRecTidur,
                            objectfk: "SKN-000015",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataSkorDewasa);
                    }
                    if(data.id === 2){
                        var tmpDataSkorDewasa = {
                            norec: $scope.noRecAktivitasFisik,
                            objectfk: "SKN-000016",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataSkorDewasa);
                    }
                    if(data.id === 3){
                        var tmpDataSkorDewasa = {
                            norec: $scope.noRecEmosi,
                            objectfk: "SKN-000017",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataSkorDewasa);
                    }
                    if(data.id === 4){
                        var tmpDataSkorDewasa = {
                            norec: $scope.noRecKonsentrasi,
                            objectfk: "SKN-000018",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataSkorDewasa);
                    }
                    if(data.id === 5){
                        var tmpDataSkorDewasa = {
                            norec: $scope.noRecNafsuMakan,
                            objectfk: "SKN-000019",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataSkorDewasa);
                    }
                })

                $scope.currentKarakteristikNyeri.forEach(function(data){
                    if(data.id === 1){
                        var tmpDataSkorDewasa = {
                            norec: $scope.noRecTerbakar,
                            objectfk: "SKN-000025",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataSkorDewasa);
                    }
                    if(data.id === 2){
                        var tmpDataSkorDewasa = {
                            norec: $scope.noRecTertusuk,
                            objectfk: "SKN-000026",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataSkorDewasa);
                    }
                    if(data.id === 3){
                        var tmpDataSkorDewasa = {
                            norec: $scope.noRecTumpul,
                            objectfk: "SKN-000027",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataSkorDewasa);
                    }
                    if(data.id === 4){
                        var tmpDataSkorDewasa = {
                            norec: $scope.noRecTertekan,
                            objectfk: "SKN-000028",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataSkorDewasa);
                    }
                    if(data.id === 5){
                        var tmpDataSkorDewasa = {
                            norec: $scope.noRecBerat,
                            objectfk: "SKN-000029",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataSkorDewasa);
                    }
                    if(data.id === 6){
                        var tmpDataSkorDewasa = {
                            norec: $scope.noRecTajam,
                            objectfk: "SKN-000030",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataSkorDewasa);
                    }
                    if(data.id === 7){
                        var tmpDataSkorDewasa = {
                            norec: $scope.noRecKram,
                            objectfk: "SKN-000031",
                            nilai: data.id.toString(),
                            satuan: "-",
                            jenisobject : "checkbox"
                        }
                        tempData.push(tmpDataSkorDewasa);
                    }
                })

                if($scope.item.flaccWajah !== undefined){
                    var tmpDataFlacc = {
                        norec: $scope.noRecFlaccWajah,
                        objectfk: "SKN-000020",
                        nilai: $scope.item.flaccWajah.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpDataFlacc);
                }
                if($scope.item.flaccEkstremitas !== undefined){
                    var tmpDataFlacc = {
                        norec: $scope.noRecFlaccEkstremitas,
                        objectfk: "SKN-000021",
                        nilai: $scope.item.flaccEkstremitas.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpDataFlacc);
                }
                if($scope.item.flaccGerakan !== undefined){
                    var tmpDataFlacc = {
                        norec: $scope.noRecFlaccGerakan,
                        objectfk: "SKN-000022",
                        nilai: $scope.item.flaccGerakan.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpDataFlacc);
                }
                if($scope.item.flaccMenangis !== undefined){
                    var tmpDataFlacc = {
                        norec: $scope.noRecFlaccMenangis,
                        objectfk: "SKN-000023",
                        nilai: $scope.item.flaccMenangis.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpDataFlacc);
                }
                if($scope.item.flaccKetenangan !== undefined){
                    var tmpDataFlacc = {
                        norec: $scope.noRecFlaccKetenangan,
                        objectfk: "SKN-000024",
                        nilai: $scope.item.flaccKetenangan.toString(),
                        satuan: "-",
                        jenisobject : "radio button"
                    }
                    tempData.push(tmpDataFlacc);
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
                    noregistrasifk: $state.params.noRec,
                    riwayatpapfk: norecPap
                }
                ManagePhp.saveData(jsonSave).then(function(e) {
                    $scope.arrNyeriMempengaruhi=[];  
                    $scope.getdata();
                    ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa',$state.params.noRec, 'Skrining Nyeri').then(function (res) {
                    })
                });
                // return

                // $scope.listSkorNeonatus.forEach(function(data){
                //     if(data.idParent == 1){
                //         var tmpDataNeo = {
                //             norec: $scope.noRecNeoSatu,
                //             objectfk: "SKN-000001",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "radio button"
                //         }
                //         tempData.push(tmpDataNeo) 
                //     }
                //     if(data.idParent == 2){
                //         var tmpDataNeo = {
                //             norec: $scope.noRecNeoDua,
                //             objectfk: "SKN-000002",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "radio button"
                //         }
                //         tempData.push(tmpDataNeo) 
                //     }
                //     if(data.idParent == 3){
                //         var tmpDataNeo = {
                //             norec: $scope.noRecNeoTiga,
                //             objectfk: "SKN-000003",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "radio button"
                //         }
                //         tempData.push(tmpDataNeo) 
                //     }
                //     if(data.idParent == 4){
                //         var tmpDataNeo = {
                //             norec: $scope.noRecNeoEmpat,
                //             objectfk: "SKN-000004",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "radio button"
                //         }
                //         tempData.push(tmpDataNeo) 
                //     }           
                //     if(data.idParent == 5){
                //         var tmpDataNeo = {
                //             norec: $scope.noRecNeoLima,
                //             objectfk: "SKN-000005",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "radio button"
                //         }
                //         tempData.push(tmpDataNeo) 
                //     }           
                //     if(data.idParent == 6){
                //         var tmpDataNeo = {
                //             norec: $scope.noRecNeoEnam,
                //             objectfk: "SKN-000006",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "radio button"
                //         }
                //         tempData.push(tmpDataNeo) 
                //     }            
                // });

                // if($scope.item.skalaNyeri !== undefined){
                //     var dataSkalaNyeri={
                //         norec: $scope.noRecSkalaNyeri,
                //         objectfk: "SKN-000007",
                //         nilai: $scope.item.skalaNyeri.toString(),
                //         satuan: "-",
                //         jenisobject : "text box"
                //     }
                //     tempData.push(dataSkalaNyeri)
                // }

                // if($scope.item.skorNyeri !== undefined){
                //     var dataSkorSkalaNyeri = {
                //         norec: $scope.noRecSkorSkalaNyeri,
                //         objectfk: "SKN-000008",
                //         nilai: $scope.item.skorNyeri.id.toString(),
                //         satuan: "-",
                //         jenisobject : "radio button"
                //     }
                //     tempData.push(dataSkorSkalaNyeri) 
                // }

                // $scope.arrSkorDewasa.forEach(function(data){
                //     if(data.idParent == 100){
                //         var tmpDataSkorDewasa = {
                //             norec: $scope.noRecDewasaSatu,
                //             objectfk: "SKN-000009",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "radio button"
                //         }
                //         tempData.push(tmpDataSkorDewasa);
                //     }
                //     if(data.idParent == 107){
                //         var tmpDataSkorDewasa = {
                //             norec: $scope.noRecDewasaDua,
                //             objectfk: "SKN-000010",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "radio button"
                //         }
                //         tempData.push(tmpDataSkorDewasa);
                //     }
                //     if(data.idParent == 110){
                //         var tmpDataSkorDewasa = {
                //             norec: $scope.noRecDewasaTiga,
                //             objectfk: "SKN-000011",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "radio button"
                //         }
                //         tempData.push(tmpDataSkorDewasa);
                //     }

                //     if (data.id === 101) {
                //         $scope.arrTextBoxNyeri.forEach(function(items){
                //             if(items.id === 103){
                //                 var tmpDataSkorDewasa = {
                //                     norec: $scope.noRecDewasaEmpat,
                //                     objectfk: "SKN-000011",
                //                     nilai: items.id.toString(),
                //                     satuan: "-",
                //                     jenisobject : "textbox"
                //                 }
                //                 tempData.push(tmpDataSkorDewasa);
                //             }
                //             if(items.id === 104){
                //                 var tmpDataSkorDewasa = {
                //                     norec: $scope.noRecDewasaLima,
                //                     objectfk: "SKN-000012",
                //                     nilai: items.id.toString(),
                //                     satuan: "-",
                //                     jenisobject : "textbox"
                //                 }
                //                 tempData.push(tmpDataSkorDewasa);
                //             }
                //             if(items.id === 105){
                //                 var tmpDataSkorDewasa = {
                //                     norec: $scope.noRecDewasaEnam,
                //                     objectfk: "SKN-000013",
                //                     nilai: items.id.toString(),
                //                     satuan: "-",
                //                     jenisobject : "textbox"
                //                 }
                //                 tempData.push(tmpDataSkorDewasa);
                //             }
                //         })
                //     }
                // })

                // $scope.arrNyeriMempengaruhi.forEach(function(data){
                //     if(data.id === 1){
                //         var tmpDataSkorDewasa = {
                //             norec: $scope.noRecDewasaTujuh,
                //             objectfk: "SKN-000014",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "checkbox"
                //         }
                //         tempData.push(tmpDataSkorDewasa);
                //     }
                //     if(data.id === 2){
                //         var tmpDataSkorDewasa = {
                //             norec: $scope.noRecDewasaDelapan,
                //             objectfk: "SKN-000015",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "checkbox"
                //         }
                //         tempData.push(tmpDataSkorDewasa);
                //     }
                //     if(data.id === 3){
                //         var tmpDataSkorDewasa = {
                //             norec: $scope.noRecDewasaSembilan,
                //             objectfk: "SKN-000016",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "checkbox"
                //         }
                //         tempData.push(tmpDataSkorDewasa);
                //     }
                //     if(data.id === 4){
                //         var tmpDataSkorDewasa = {
                //             norec: $scope.noRecDewasaSepuluh,
                //             objectfk: "SKN-000017",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "checkbox"
                //         }
                //         tempData.push(tmpDataSkorDewasa);
                //     }
                //     if(data.id === 5){
                //         var tmpDataSkorDewasa = {
                //             norec: $scope.noRecDewasaSebelas,
                //             objectfk: "SKN-000018",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "checkbox"
                //         }
                //         tempData.push(tmpDataSkorDewasa);
                //     }
                // })

                // $scope.arrSkorflacc.forEach(function(data){
                //     if(data.idParent === 126){
                //         var tmpDataFlacc = {
                //             norec: $scope.noRecFlaccSatu,
                //             objectfk: "SKN-000019",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "radio button"
                //         }
                //         tempData.push(tmpDataFlacc);
                //     }
                //     if(data.idParent === 130){
                //         var tmpDataFlacc = {
                //             norec: $scope.noRecFlaccDua,
                //             objectfk: "SKN-000020",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "radio button"
                //         }
                //         tempData.push(tmpDataFlacc);
                //     }
                //     if(data.idParent === 134){
                //         var tmpDataFlacc = {
                //             norec: $scope.noRecFlaccTiga,
                //             objectfk: "SKN-000021",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "radio button"
                //         }
                //         tempData.push(tmpDataFlacc);
                //     }
                //     if(data.idParent === 138){
                //         var tmpDataFlacc = {
                //             norec: $scope.noRecFlaccEmpat,
                //             objectfk: "SKN-000022",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "radio button"
                //         }
                //         tempData.push(tmpDataFlacc);
                //     }
                //     if(data.idParent === 142){
                //         var tmpDataFlacc = {
                //             norec: $scope.noRecFlaccLima,
                //             objectfk: "SKN-000023",
                //             nilai: data.id.toString(),
                //             satuan: "-",
                //             jenisobject : "radio button"
                //         }
                //         tempData.push(tmpDataFlacc);
                //     }
                    
                // })

                // for (var i = tempData.length - 1; i >= 0; i--) {
                //     if(tempData[i].nilai == undefined){
                //         tempData.splice([i],1)
                //     }
                //     if(tempData[i].norec == undefined){
                //         tempData[i].norec = '-'
                //     }

                // }
                // var jsonSave = {
                //     data: tempData,
                //     noregistrasifk: $state.params.noRec
                // }
                // ManagePhp.saveData(jsonSave).then(function(e) {
                //     $scope.arrSkriningGiziAnak=[];  
                //     $scope.getdata();
                // });

                // if ($scope.item.skalaNyeri !== undefined) {
                //      if ($scope.isDewasa) {
                //         var tmpData = {
                //             "pengkajianAwal": {
                //                 "id": 106
                //             },
                //             "nilai": $scope.item.skalaNyeri.toString()
                //         }
                //         dataForm.push(tmpData);
                //     }
                // } 

                // $scope.arrSkorSkalaNyeri.forEach(function(data){
                //     var tmpData = {
                //         "pengkajianAwal": {
                //             "id": data.idParent
                //         },
                //         "nilai": data.id.toString()
                //     }
                //     dataForm.push(tmpData);
                //     debugger;
                // });
                // $scope.arrSkorNeonatus.forEach(function(data){
                //     var tmpData = {
                //         "pengkajianAwal": {
                //             "id": data.idParent
                //         },
                //         "nilai": data.id.toString()
                //     }
                //     dataForm.push(tmpData);
                //     debugger;
                // });
                // $scope.arrSkorflacc.forEach(function(data){
                //     var tmpData = {
                //         "pengkajianAwal": {
                //             "id": data.idParent
                //         },
                //         "nilai": data.id.toString()
                //     }
                //     dataForm.push(tmpData);
                //     debugger;
                // });
                // $scope.arrNyeriMempengaruhi.forEach(function(data){
                //     var tmpData = {
                //         "pengkajianAwal": {
                //             "id": data.id
                //         },
                //         "nilai": "true"
                //     }
                //     dataForm.push(tmpData)
                //     debugger;
                // });
                // $scope.arrSkorDewasa.forEach(function(data){
                //     var tmpData = {
                //         "pengkajianAwal": {
                //             "id": data.idParent
                //         },
                //         "nilai": data.id.toString()
                //     }
                //     dataForm.push(tmpData);

                //     if (data.id  === 101) {
                //         $scope.arrTextBoxNyeri.forEach(function(items){
                //             var tmpDataText = {
                //                 "pengkajianAwal": {
                //                     "id": items.id
                //                 },
                //                 "nilai": items.value === null ? "-" : items.value 
                //             }
                //             dataForm.push(tmpDataText);
                //             // console.log(JSON.stringify(tmpDataText))
                //         })
                //     }
                //     debugger;
                // })

                // if ($scope.noRecTransaksi) {
                //     $scope.tempData = {   
                //         "noRec": $scope.noRecTransaksi,
                //         "pengkajianAwalBaru":{  
                //             "noRec": $scope.noRecPap
                //         },
                //         "detailPengkajianAwal": dataForm
                //     }
                //     ManagePasien.updatePengkajianAwalPasien($scope.tempData).then(function(e) {
                //         // $scope.Next();
                //     })
                // } else {
                //     $scope.tempData = {  
                //         "pengkajianAwalBaru":{  
                //             "noRec": $scope.noRecPap
                //         },
                //         "detailPengkajianAwal": dataForm
                //     }
                //     ManagePasien.simpanPengkajianAwalPasien($scope.tempData).then(function(e) {
                //         // console.log(JSON.stringify(e.data));
                //         // $scope.Next();
                //     })
                // }
            };
        }
    ]);
});