define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenilaianResikoJatuhPasienRevCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'CacheHelper', 'ManagePasien', 'DateHelper', 'ManagePhp',
		function($q, $rootScope, $scope, ModelItem, $state, findPasien, cacheHelper, ManagePasien, dateHelper, ManagePhp) {
			// copy from PenilaianResikoJatuhPasienAnakCtrl.js
			var isNotClick = true;
			$scope.noCM = $state.params.noCM;
			$rootScope.showMenu = true;
			$rootScope.showMenuDetail = false;

			$scope.noRecPap = cacheHelper.get('noRecPap');
			findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
				$scope.resultData = ModelItem.beforePost(data.data, true);
				if ($scope.resultData.kamar !== null && $scope.resultData.noBed !== undefined)
					$scope.resultData.noKamar = $scope.resultData.kamar.namaKamar + " - " + $scope.resultData.noBed; 
				$scope.resultData.pasien.umurPasien = dateHelper.CountAge($scope.resultData.pasien.tglLahir, data.data.tglRegistrasi);
				var bln = $scope.resultData.pasien.umurPasien.month,
				thn = $scope.resultData.pasien.umurPasien.year,
				usia = ($scope.resultData.pasien.umurPasien.year * 12) + $scope.resultData.pasien.umurPasien.month;
				if (usia >= 1 && usia <= 216) {$scope.isAnak = true}
					if (usia >= 0 && usia < 1) {$scope.isNeonatal = true}
						if (usia >= 217) {$scope.isDewasa = true}
							$scope.resultData.tanggalRegistrasi = new moment($scope.resultData.tglRegistrasi).format('DD-MM-YYYY HH:mm');
						var departemen = data.data.ruangan.departemenId;
						if (departemen === 18 || departemen === 28)

							{$scope.isRawatJalan = true}
						if (departemen === 16 || departemen === 35)
							{$scope.isRawatInap = true}
					});
			$scope.getdata=function(){
				var objectfk = "RSJ";
				var noregistrasifk = $state.params.noRec;
				var status = "t";
				ManagePhp.getData("rekam-medis/get-data-rekam-medis?noregistrasifk="+noregistrasifk+'&objectfk='+objectfk 
					+ '&riwayatfk=' + 	$scope.noRecPap).then(function(e) {
						$scope.dataResikoJatuh = e.data.data;
						
						for (var i = 0; i < $scope.dataResikoJatuh.length; i++) {
							if($scope.dataResikoJatuh[i].objectfk == "RSJ-000001"){
								$scope.noRecAktivitas = $scope.dataResikoJatuh[i].norec
								$scope.item.aktivitas = $scope.dataResikoJatuh[i].nilai
							}
							if($scope.dataResikoJatuh[i].objectfk == "RSJ-000002"){
								$scope.noRecJatuh = $scope.dataResikoJatuh[i].norec
								$scope.item.jatuh = $scope.dataResikoJatuh[i].nilai
							}
							if($scope.dataResikoJatuh[i].objectfk == "RSJ-000003"){
								$scope.noRecAlatBantu = $scope.dataResikoJatuh[i].norec
								$scope.item.alatBantu = $scope.dataResikoJatuh[i].nilai
							}
							if($scope.dataResikoJatuh[i].objectfk == "RSJ-000004"){
								$scope.noRecUmur = $scope.dataResikoJatuh[i].norec
								$scope.item.umur = $scope.dataResikoJatuh[i].nilai
								for (var k = 0; k  < $scope.listUmur[0].detail.length; k++) {
									if($scope.listUmur[0].detail[k].id ==$scope.dataResikoJatuh[i].nilai )  {
										var temp = $scope.listUmur[0].detail[k]
									}
								}
								$scope.cekSkorHumpy($scope.listUmur[0],temp);

							}
							if($scope.dataResikoJatuh[i].objectfk == "RSJ-000005"){
								$scope.noRecJk = $scope.dataResikoJatuh[i].norec
								$scope.item.jk = $scope.dataResikoJatuh[i].nilai
								for (var k = 0; k  < $scope.listJK[0].detail.length; k++) {
									if($scope.listJK[0].detail[k].id ==$scope.dataResikoJatuh[i].nilai )  {
										var temp = $scope.listJK[0].detail[k]
									}
								}
								$scope.cekSkorHumpy($scope.listJK[0],temp);

							}
							if($scope.dataResikoJatuh[i].objectfk == "RSJ-000006"){
								$scope.noRecDiagnosis = $scope.dataResikoJatuh[i].norec
								$scope.item.diagnosis = $scope.dataResikoJatuh[i].nilai
								for (var k = 0; k  < $scope.listDiagnosis[0].detail.length; k++) {
									if($scope.listDiagnosis[0].detail[k].id ==$scope.dataResikoJatuh[i].nilai )  {
										var temp = $scope.listDiagnosis[0].detail[k]
									}
								}
								$scope.cekSkorHumpy($scope.listDiagnosis[0],temp);
								
							}
							if($scope.dataResikoJatuh[i].objectfk == "RSJ-000007"){
								$scope.noRecKognitif = $scope.dataResikoJatuh[i].norec
								$scope.item.kognitif = $scope.dataResikoJatuh[i].nilai
								for (var k = 0; k  < $scope.listKognitif[0].detail.length; k++) {
									if($scope.listKognitif[0].detail[k].id ==$scope.dataResikoJatuh[i].nilai )  {
										var temp = $scope.listKognitif[0].detail[k]
									}
								}
								$scope.cekSkorHumpy($scope.listKognitif[0],temp);
							}
							if($scope.dataResikoJatuh[i].objectfk == "RSJ-000008"){
								$scope.noRecLingkungan = $scope.dataResikoJatuh[i].norec
								$scope.item.lingkungan = $scope.dataResikoJatuh[i].nilai
								for (var k = 0; k  < $scope.listLingkungan[0].detail.length; k++) {
									if($scope.listLingkungan[0].detail[k].id ==$scope.dataResikoJatuh[i].nilai )  {
										var temp = $scope.listLingkungan[0].detail[k]
									}
								}
								$scope.cekSkorHumpy($scope.listLingkungan[0],temp);

							}
							if($scope.dataResikoJatuh[i].objectfk == "RSJ-000009"){
								$scope.noRecRespon = $scope.dataResikoJatuh[i].norec
								$scope.item.respon = $scope.dataResikoJatuh[i].nilai
								for (var k = 0; k  < $scope.listRespon[0].detail.length; k++) {
									if($scope.listRespon[0].detail[k].id ==$scope.dataResikoJatuh[i].nilai )  {
										var temp = $scope.listRespon[0].detail[k]
									}
								}
								$scope.cekSkorHumpy($scope.listRespon[0],temp);

							}
							if($scope.dataResikoJatuh[i].objectfk == "RSJ-000010"){
								$scope.noRecObat = $scope.dataResikoJatuh[i].norec
								$scope.item.obat = $scope.dataResikoJatuh[i].nilai
								for (var k = 0; k  < $scope.listObat[0].detail.length; k++) {
									if($scope.listObat[0].detail[k].id ==$scope.dataResikoJatuh[i].nilai )  {
										var temp = $scope.listObat[0].detail[k]
									}
								}
								$scope.cekSkorHumpy($scope.listObat[0],temp);
								
							}
							if($scope.dataResikoJatuh[i].objectfk == "RSJ-000011"){
								$scope.noRecRiwayatJatuh = $scope.dataResikoJatuh[i].norec
								$scope.item.riwayatJatuh = $scope.dataResikoJatuh[i].nilai
								for (var k = 0; k  < $scope.listRiwayatJatuh[0].detail.length; k++) {
									if($scope.listRiwayatJatuh[0].detail[k].id ==$scope.dataResikoJatuh[i].nilai )  {
										var temp = $scope.listRiwayatJatuh[0].detail[k]
									}
								}
								$scope.cekSkorDewasaPasien($scope.listRiwayatJatuh[0],temp);							
							}
							if($scope.dataResikoJatuh[i].objectfk == "RSJ-000012"){
								$scope.noRecDiagnosisSekunder = $scope.dataResikoJatuh[i].norec
								$scope.item.diagnosisSekunder = $scope.dataResikoJatuh[i].nilai
								for (var k = 0; k  < $scope.listDiagnosisSekunder[0].detail.length; k++) {
									if($scope.listDiagnosisSekunder[0].detail[k].id ==$scope.dataResikoJatuh[i].nilai )  {
										var temp = $scope.listDiagnosisSekunder[0].detail[k]
									}
								}
								$scope.cekSkorDewasaPasien($scope.listDiagnosisSekunder[0],temp);	
							}
							if($scope.dataResikoJatuh[i].objectfk == "RSJ-000013"){
								$scope.noRecAlatBantu = $scope.dataResikoJatuh[i].norec
								$scope.item.alatBantu = $scope.dataResikoJatuh[i].nilai
								for (var k = 0; k  < $scope.listAlatBantu[0].detail.length; k++) {
									if($scope.listAlatBantu[0].detail[k].id ==$scope.dataResikoJatuh[i].nilai )  {
										var temp = $scope.listAlatBantu[0].detail[k]
									}
								}
								$scope.cekSkorDewasaPasien($scope.listAlatBantu[0],temp);	
							}
							if($scope.dataResikoJatuh[i].objectfk == "RSJ-000014"){
								$scope.noRecAkses = $scope.dataResikoJatuh[i].norec
								$scope.item.akses = $scope.dataResikoJatuh[i].nilai
								for (var k = 0; k  < $scope.listAksesIv[0].detail.length; k++) {
									if($scope.listAksesIv[0].detail[k].id ==$scope.dataResikoJatuh[i].nilai )  {
										var temp = $scope.listAksesIv[0].detail[k]
									}
								}
								$scope.cekSkorDewasaPasien($scope.listAksesIv[0],temp);	

							}
							if($scope.dataResikoJatuh[i].objectfk == "RSJ-000015"){
								$scope.noRecCaraBerjalan = $scope.dataResikoJatuh[i].norec
								$scope.item.caraBerjalan = $scope.dataResikoJatuh[i].nilai
								for (var k = 0; k  < $scope.listCaraBerjalan[0].detail.length; k++) {
									if($scope.listCaraBerjalan[0].detail[k].id ==$scope.dataResikoJatuh[i].nilai )  {
										var temp = $scope.listCaraBerjalan[0].detail[k]
									}
								}
								$scope.cekSkorDewasaPasien($scope.listCaraBerjalan[0],temp);	
							}
							if($scope.dataResikoJatuh[i].objectfk == "RSJ-000016"){
								$scope.noRecStatusPasien = $scope.dataResikoJatuh[i].norec
								$scope.item.statusPasien = $scope.dataResikoJatuh[i].nilai
								for (var k = 0; k  < $scope.listStatusPasien[0].detail.length; k++) {
									if($scope.listStatusPasien[0].detail[k].id ==$scope.dataResikoJatuh[i].nilai )  {
										var temp = $scope.listStatusPasien[0].detail[k]
									}
								}
								$scope.cekSkorDewasaPasien($scope.listStatusPasien[0],temp);	
							}

							if($scope.dataResikoJatuh[i].objectfk == "RSJ-000017"){
								$scope.noRecGangguan= $scope.dataResikoJatuh[i].norec
								$scope.listGeriatri[0].detail.forEach(function(e){
									if (e.id ==  $scope.dataResikoJatuh[i].nilai){
										e.isChecked = true
										var dataid = { "id":e.id,
										"descNilai" : "4",
										"isChecked" : true,
										"nama":e.nama}  
										$scope.arrGeriatri.push(dataid)
									}
								})       
								$scope.getSkorGeriatri()    
							} if($scope.dataResikoJatuh[i].objectfk == "RSJ-000018"){
								$scope.noRecPusing= $scope.dataResikoJatuh[i].norec
								$scope.listGeriatri[0].detail.forEach(function(e){
									if (e.id ==  $scope.dataResikoJatuh[i].nilai){
										e.isChecked = true
										var dataid = { "id":e.id,
										"descNilai" : "3",
										"isChecked" : true,
										"nama":e.nama}  
										$scope.arrGeriatri.push(dataid)
									}
								})     
								$scope.getSkorGeriatri()       
							} if($scope.dataResikoJatuh[i].objectfk == "RSJ-000019"){
								$scope.noRecKebingungan= $scope.dataResikoJatuh[i].norec
								$scope.listGeriatri[0].detail.forEach(function(e){
									if (e.id ==  $scope.dataResikoJatuh[i].nilai){
										e.isChecked = true
										var dataid = { "id":e.id,
										"descNilai" : "3",
										"isChecked" : true,
										"nama":e.nama}  
										$scope.arrGeriatri.push(dataid)
									}
								})   
								$scope.getSkorGeriatri()            
							} if($scope.dataResikoJatuh[i].objectfk == "RSJ-000020"){
								$scope.noRecNokturia= $scope.dataResikoJatuh[i].norec
								$scope.listGeriatri[0].detail.forEach(function(e){
									if (e.id ==  $scope.dataResikoJatuh[i].nilai){
										e.isChecked = true
										var dataid = { "id":e.id,
										"descNilai" : "3",
										"isChecked" : true,
										"nama":e.nama}  
										$scope.arrGeriatri.push(dataid)
									}
								})         
								$scope.getSkorGeriatri()      
							} if($scope.dataResikoJatuh[i].objectfk == "RSJ-000021"){
								$scope.noRecIntermiten= $scope.dataResikoJatuh[i].norec
								$scope.listGeriatri[0].detail.forEach(function(e){
									if (e.id ==  $scope.dataResikoJatuh[i].nilai){
										e.isChecked = true
										var dataid = { "id":e.id,
										"descNilai" : "2",
										"isChecked" : true,
										"nama":e.nama}  
										$scope.arrGeriatri.push(dataid)
									}
								})      
								$scope.getSkorGeriatri()         
							} if($scope.dataResikoJatuh[i].objectfk == "RSJ-000022"){
								$scope.noRecKelemahan= $scope.dataResikoJatuh[i].norec
								$scope.listGeriatri[0].detail.forEach(function(e){
									if (e.id ==  $scope.dataResikoJatuh[i].nilai){
										e.isChecked = true
										var dataid = { "id":e.id,
										"descNilai" : "2",
										"isChecked" : true,
										"nama":e.nama}  
										$scope.arrGeriatri.push(dataid)
									}
								})        
								$scope.getSkorGeriatri()       
							} if($scope.dataResikoJatuh[i].objectfk == "RSJ-000023"){
								$scope.noRecObat= $scope.dataResikoJatuh[i].norec
								$scope.listGeriatri[0].detail.forEach(function(e){
									if (e.id ==  $scope.dataResikoJatuh[i].nilai){
										e.isChecked = true
										var dataid = { "id":e.id,
										"descNilai" : "2",
										"isChecked" : true,
										"nama":e.nama}  
										$scope.arrGeriatri.push(dataid)
									}
								})     
								$scope.getSkorGeriatri()          
							} if($scope.dataResikoJatuh[i].objectfk == "RSJ-000024"){
								$scope.noRecRiwayat= $scope.dataResikoJatuh[i].norec
								$scope.listGeriatri[0].detail.forEach(function(e){
									if (e.id ==  $scope.dataResikoJatuh[i].nilai){
										e.isChecked = true
										var dataid = { "id":e.id,
										"descNilai" : "2",
										"isChecked" : true,
										"nama":e.nama}  
										$scope.arrGeriatri.push(dataid)
									}
								})       
								$scope.getSkorGeriatri()        
							} if($scope.dataResikoJatuh[i].objectfk == "RSJ-000025"){
								$scope.noRecOsteo= $scope.dataResikoJatuh[i].norec
								$scope.listGeriatri[0].detail.forEach(function(e){
									if (e.id ==  $scope.dataResikoJatuh[i].nilai){
										e.isChecked = true
										var dataid = { "id":e.id,
										"descNilai" : "1",
										"isChecked" : true,
										"nama":e.nama}  
										$scope.arrGeriatri.push(dataid)
									}
								})    
								$scope.getSkorGeriatri()           
							} if($scope.dataResikoJatuh[i].objectfk == "RSJ-000026"){
								$scope.noRecGangguanPend= $scope.dataResikoJatuh[i].norec
								$scope.listGeriatri[0].detail.forEach(function(e){
									if (e.id ==  $scope.dataResikoJatuh[i].nilai){
										e.isChecked = true
										var dataid = { "id":e.id,
										"descNilai" : "1",
										"isChecked" : true,
										"nama":e.nama}  
										$scope.arrGeriatri.push(dataid)
									}
								})
								$scope.getSkorGeriatri()    								           
							} if($scope.dataResikoJatuh[i].objectfk == "RSJ-000027"){
								$scope.norecUsia= $scope.dataResikoJatuh[i].norec
								$scope.listGeriatri[0].detail.forEach(function(e){
									if (e.id ==  $scope.dataResikoJatuh[i].nilai){
										e.isChecked = true
										var dataid = { "id":e.id,
										"descNilai" : "1",
										"isChecked" : true,
										"nama":e.nama}  
										$scope.arrGeriatri.push(dataid)
									}
								})
								$scope.getSkorGeriatri()               
							}
						}
					})
};

$scope.listUmur=[
{"id":1,"nama":"Umur","detail":[{"id":1,"nama":"Dibawah 3 tahun","descNilai":"4"},{"id":2,"nama":"3 - 7 tahun","descNilai":"3"},{"id":3,"nama":"7 - 13 tahun","descNilai":"2"},{"id":4,"nama":" > 13 tahun","descNilai":"1"}]}
]
$scope.listJK=[
{"id":2,"nama":"Jenis Kelamin","detail":[{"id":1,"nama":"Laki-laki","descNilai":"2"},{"id":2,"nama":"Perempuan","descNilai":"1"}]}
]
$scope.listDiagnosis=[
{"id":3,"nama":"Diagnosis","detail":[{"id":1,"nama":"Gangguan Neurologis","descNilai":"4"},{"id":2,"nama":"Perubahan dalam oksigenisasi (masalah saluran nafas, dehidrasi, anemia,anorexia, sinkop, Sakit kepala dll)","descNilai":"3"},{"id":3,"nama":"Kelainan psikis/ perilaku","descNilai":"2"},{"id":4,"nama":"Diagnosis lain","descNilai":"1"}]}
]
$scope.listKognitif=[
{"id":4,"nama":"Gangguan kognitif","detail":[{"id":1,"nama":"Tidak sadar terhadap keterbatasan","descNilai":"3"},{"id":2,"nama":"Lupa keterbatasan","descNilai":"2"},{"id":3,"nama":"Mengetahui kemampuan diri","descNilai":"1"}]}
]
$scope.listLingkungan=[
{"id":5,"nama":"Faktor Lingkungan","detail":[{"id":1,"nama":"Riwayat jatuh dari tempat tidur saat bayi/ anak","descNilai":"4"},{"id":2,"nama":"Pasien menggunakan alat bantu atau box/ mebel","descNilai":"3"},{"id":3,"nama":"Pasien berada di tempat tidur","descNilai":"2"},{"id":4,"nama":"Pasien diluar ruang rawat","descNilai":"1"}]}
]
$scope.listRespon=[
{"id":6,"nama":"Respon terhadap operasi/obat penenang/efek anasthesi","detail":[{"id":1,"nama":"Dalam 24 jam","descNilai":"3"},{"id":2,"nama":"Dalam 48 jam","descNilai":"2"},{"id":3,"nama":"> 48 jam","descNilai":"1"}]}
]
$scope.listObat=[
{"id":7,"nama":"Penggunaan obat","detail":[{"id":1,"nama":"Penggunaan obat: sedative (kecuali pasien ICU, yang menggunakan sedasi dan paralisis) hipnotik, barbiturat, fenotialin, antidepresan, laksatif/ diuretika, narkotik","descNilai":"3"},{"id":2,"nama":"Salah satu dari pengobatan diatas","descNilai":"2"},{"id":3,"nama":"Pengobatan lain","descNilai":"1"}]}
]
$scope.listRiwayatJatuh=[
{"id":1,"nama":"Riwayat jatuh dalam 3 bulan terakhir","detail":[{"id":1,"nama":"Ya ","descNilai":"25"},{"id":2,"nama":"Tidak Ada ","descNilai":"0"}]}
]
$scope.listDiagnosisSekunder=[
{"id":2,"nama":"Diagnosis sekunder > 1","detail":[{"id":1,"nama":"Ya  ","descNilai":"25"},{"id":2,"nama":"Tidak Ada  ","descNilai":"0"}]}
]
$scope.listAlatBantu=[
{"id":3,"nama":"Alat bantu jalan","detail":[{"id":1,"nama":"Bed Rest/Kursi Roda/Tidak Ada","descNilai":"0"},{"id":2,"nama":"Penopang tongkat/walker","descNilai":"15"},{"id":3,"nama":"Furnitur","descNilai":"30"}]}
]
$scope.listAksesIv=[
{"id":4,"nama":"Akses IV","detail":[{"id":1,"nama":"Ya   ","descNilai":"25"},{"id":2,"nama":"Tidak Ada   ","descNilai":"0"}]}
]
$scope.listCaraBerjalan=[
{"id":5,"nama":"Cara berjalan/berpindah","detail":[{"id":1,"nama":"Normal/bed rest/imobilisasi","descNilai":"0"},{"id":2,"nama":"Lemah","descNilai":"15"}, {"id":3,"nama":"Terganggu","descNilai":"30"}]}
]
$scope.listStatusPasien=[
{"id":6,"nama":"Status mental","detail":[{"id":1,"nama":"Orientasi sesuai kemampuan","descNilai":"0"},{"id":2,"nama":"Lupa keterbatasan diri","descNilai":"15"}]}
]
$scope.listGeriatri=[
{"id":1,"nama":"Geriatri","detail":[
{"id":1,"nama":"Gangguan gaya berjalan (diseret, menghentak, diayun)","descNilai":"4"},
{"id":2,"nama":"Pusing/pingsan pada posisi tegak","descNilai":"3"},
{"id":3,"nama":"Kebingungan setiap saat","descNilai":"3"},
{"id":4,"nama":"Nokturia/inkontinensia","descNilai":"3"},
{"id":5,"nama":"Kebingungan intermiten","descNilai":"2"},
{"id":6,"nama":"Kelemahan umum","descNilai":"2"},
{"id":7,"nama":"Obat-obatan beresiko tinggi (diuretika, narkcba, sedative, laksantif, vasodilator, antiaritmia, antihypertensi, obat hypoglikemik, antidepresan, neoroleptik, NSAID)","descNilai":"2"},
{"id":8,"nama":"Riwayat jatuh dalam 12 bulan sebelumnya","descNilai":"2"},
{"id":9,"nama":"Osteoporosis","descNilai":"1"},
{"id":10,"nama":"Gangguan pendengaran dan atau penglihatan","descNilai":"1"},
{"id":11,"nama":"Usia 70 tahun ke atas","descNilai":"1"}
]}

]


$scope.titlePenilaian = "Pilih salah satu penilaian risiko jatuh untuk rawat jalan atau rawat inap (anak atau dewasa)";
$scope.titleSatu = "Apakah pernah jatuh dalam 3 bulan terakhir";
$scope.titleDua = "Apakah menggunakan alat bantu (tongkat, kursi roda, dll)";
$scope.titleTiga = "Apakah salah satu jawaban “Ya” , maka lakukan intervensi pencegahan pasien jatuh di bawah ini :";
$scope.titleEmpat = "1) Bila pasien menggunakan kursi roda, pastikan kursi roda terkunci pada saat berhenti";
$scope.titleLima = "2) Beritahu pendamping untuk tidak meninggalkan pasien";
$scope.titleHumpty = "Pengkajian risiko jatuh anak (SKALA HUMPTY DUMPTY)";
$scope.titleIntensif ="Dewasa dan pasien yang dirawat di ruang non intensif";
$scope.titleGeriatri ="Geriatri (Risiko tinggi scoring ≥ 4)";

// $scope.isRawatInap = true;

$scope.pasien = {};
$scope.item = {};
var date = new Date();
        // get noRecPap dari local storage yg di ush di halaman dashboard PAP
			$scope.formId = 147; //get master form skrining nyeri

			/*$scope.item.tglInputData = date;*/
			$scope.now = date;
			$scope.kajianAwal = cacheHelper.get("kajianAwal");
			if ($scope.kajianAwal === undefined)
				$scope.kajianAwal = {};
		// 	findPasien.getByNoCM($scope.noCM).then(function(data) {
		// 		$rootScope.currentPasien = data.data.data;
		// 		$scope.pasien = data.data.data;
		// 		var umur = $scope.pasien.umur.split(','),
		// 		thn = parseInt(umur[0]),
		// 		bln = parseInt(umur[1]),
		// 		usia = (thn * 12) + bln;
		// 		// if (usia >= 0 && usia <= 11) {$scope.isNeonatal = true}
		// 		if (usia >= 12 && usia <= 216) {$scope.isAnak = true}
		// 			if (usia >= 217) {$scope.isDewasa = true}
		// 		// //debugger;
		// });
		
		$scope.totalSkorResikoDewasa =0;
		$scope.totalSkorResikoAnak =0; 


		$scope.arrParameterResikoJatuh = [];
		$scope.arrParameterDewasaPasien = [];
		$scope.arrParameterResikoJalan = [];
		$scope.arrGeriatri = [];
			// paste dummy model disini
			$scope.getdata();

			$scope.cekSkorHumpy = function(data, stat) {
				data.value = stat.id;
				data.descNilai = stat.descNilai;
				var result = $.grep($scope.arrParameterResikoJatuh, function(e) { 
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

					$scope.arrParameterResikoJatuh.push(tempData);
					console.log(JSON.stringify($scope.arrParameterResikoJatuh));
				} else {
					for (var i = 0; i < $scope.arrParameterResikoJatuh.length; i++)
						if ($scope.arrParameterResikoJatuh[i].idParent && $scope.arrParameterResikoJatuh[i].idParent === data.id) { 
							$scope.arrParameterResikoJatuh.splice(i, 1);
							break;
						}
						$scope.arrParameterResikoJatuh.push(tempData);
						console.log(JSON.stringify($scope.arrParameterResikoJatuh));

					}
					$scope.getTotalsHumpy();
					//debugger;
				}
				$scope.cekSkorDewasaPasien = function(data, stat) {
					data.value = stat.id;
					data.descNilai = stat.descNilai;
					var result = $.grep($scope.arrParameterDewasaPasien, function(e) { 
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
						//debugger;
						$scope.arrParameterDewasaPasien.push(tempData);
						console.log(JSON.stringify($scope.arrParameterDewasaPasien));
					} else {
						for (var i = 0; i < $scope.arrParameterDewasaPasien.length; i++)
							if ($scope.arrParameterDewasaPasien[i].idParent && $scope.arrParameterDewasaPasien[i].idParent === data.id) { 
								$scope.arrParameterDewasaPasien.splice(i, 1);
								break;
							}
							$scope.arrParameterDewasaPasien.push(tempData);
							console.log(JSON.stringify($scope.arrParameterDewasaPasien));
							//debugger;
						}
						$scope.getTotalDewasa();
					}
					$scope.cekSkors = function(data, stat) {
						//debugger;
						data.value = stat.id;
						data.descNilai = stat.descNilai;
						var result = $.grep($scope.arrParameterResikoInapAnak, function(e) { 
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
							//debugger;
							$scope.arrParameterResikoInapAnak.push(tempData);
							console.log(JSON.stringify($scope.arrParameterResikoInapAnak));
						} else {
							for (var i = 0; i < $scope.arrParameterResikoInapAnak.length; i++)
								if ($scope.arrParameterResikoInapAnak[i].idParent && $scope.arrParameterResikoInapAnak[i].idParent === data.id) { 
									$scope.arrParameterResikoInapAnak.splice(i, 1);
									break;
								}
								$scope.arrParameterResikoInapAnak.push(tempData);
								console.log(JSON.stringify($scope.arrParameterResikoInapAnak));
								//debugger;
							}
							$scope.getTotals();
							//debugger;
						}
						$scope.getTotalsHumpy = function() {
							var skorAwal = 0;
							$scope.arrParameterResikoJatuh.forEach(function(data){
								skorAwal += parseInt(data.descNilai);

							})
							$scope.totalSkorResikoAnak = skorAwal
						}

						$scope.getTotalDewasa = function() {
							var skorAwal = 0;
							$scope.arrParameterDewasaPasien.forEach(function(data){
								skorAwal += parseInt(data.descNilai);
								//debugger;
							})
							$scope.totalSkorResikoDewasa = skorAwal
						}
						$scope.isChecked = function(id){
							var match = false;
							for(var i=0 ; i < $scope.arrGeriatri.length; i++) {
								if($scope.arrGeriatri[i].id == id){
									match = true;
								}
							}
							return match;
						};
						$scope.cekArrGeriatri = function(bool, item) {
							//debugger;
							if(bool){
					// add item
					$scope.arrGeriatri.push(item);
				} else {
					// remove item
					for(var i=0 ; i < $scope.arrGeriatri.length; i++) {
						if($scope.arrGeriatri[i].id == item.id){
							$scope.arrGeriatri.splice(i,1);
						}
					}      
				}

				var skorAwal = 0;
				$scope.arrGeriatri.forEach(function(data){
					skorAwal += parseInt(data.descNilai);
					//debugger;
				})
				$scope.totalSkorResikoGeriatri = skorAwal;

				// getTotalGeriatri();
				console.log('list statResikoGeriatri : ' + JSON.stringify($scope.arrGeriatri));
			};

			
			$scope.Next = function() {
				$rootScope.next();
			}
			$scope.Save = function() {
				var dataForm = [];  
				var tempData = [];
				if($scope.item.aktivitas !== undefined){
					var tmpDataNeo = {
						norec: $scope.noRecAktivitas,
						objectfk: "RSJ-000001",
						nilai: $scope.item.aktivitas.toString(),
						satuan: "-",
						jenisobject : "radio button"
					}
					tempData.push(tmpDataNeo) 
				}
				if($scope.item.jatuh !== undefined){
					var tmpDataNeo = {
						norec: $scope.noRecJatuh,
						objectfk: "RSJ-000002",
						nilai: $scope.item.jatuh.toString(),
						satuan: "-",
						jenisobject : "radio button"
					}
					tempData.push(tmpDataNeo) 
				}
				if($scope.item.alatBantu !== undefined){
					var tmpDataNeo = {
						norec: $scope.noRecAlatBantu,
						objectfk: "RSJ-000003",
						nilai: $scope.item.alatBantu.toString(),
						satuan: "-",
						jenisobject : "radio button"
					}
					tempData.push(tmpDataNeo) 
				}
				if($scope.item.umur !== undefined){
					var tmpDataNeo = {
						norec: $scope.noRecUmur,
						objectfk: "RSJ-000004",
						nilai: $scope.item.umur.toString(),
						satuan: "-",
						jenisobject : "radio button"
					}
					tempData.push(tmpDataNeo) 
				}           
				if($scope.item.jk !== undefined){
					var tmpDataNeo = {
						norec: $scope.noRecJk,
						objectfk: "RSJ-000005",
						nilai: $scope.item.jk.toString(),
						satuan: "-",
						jenisobject : "radio button"
					}
					tempData.push(tmpDataNeo) 
				}           
				if($scope.item.diagnosis !== undefined){
					var tmpDataNeo = {
						norec: $scope.noRecDiagnosis,
						objectfk: "RSJ-000006",
						nilai: $scope.item.diagnosis.toString(),
						satuan: "-",
						jenisobject : "radio button"
					}
					tempData.push(tmpDataNeo) 
				}
				if($scope.item.kognitif !== undefined){
					var tmpDataNeo={
						norec: $scope.noRecKognitif,
						objectfk: "RSJ-000007",
						nilai: $scope.item.kognitif.toString(),
						satuan: "-",
						jenisobject : "radio button"
					}
					tempData.push(tmpDataNeo)
				}
				if($scope.item.lingkungan !== undefined){
					var tmpDataNeo={
						norec: $scope.noRecLingkungan,
						objectfk: "RSJ-000008",
						nilai: $scope.item.lingkungan.toString(),
						satuan: "-",
						jenisobject : "radio button"
					}
					tempData.push(tmpDataNeo)
				}
				if($scope.item.respon !== undefined){
					var tmpDataNeo={
						norec: $scope.noRecRespon,
						objectfk: "RSJ-000009",
						nilai: $scope.item.respon.toString(),
						satuan: "-",
						jenisobject : "radio button"
					}
					tempData.push(tmpDataNeo)
				}
				if($scope.item.obat !== undefined){
					var tmpDataNeo={
						norec: $scope.noRecObat,
						objectfk: "RSJ-000010",
						nilai: $scope.item.obat.toString(),
						satuan: "-",
						jenisobject : "radio button"
					}
					tempData.push(tmpDataNeo)
				}
				if($scope.item.riwayatJatuh !== undefined){
					var tmpDataNeo={
						norec: $scope.noRecRiwayatJatuh,
						objectfk: "RSJ-000011",
						nilai: $scope.item.riwayatJatuh.toString(),
						satuan: "-",
						jenisobject : "radio button"
					}
					tempData.push(tmpDataNeo)
				}
				if($scope.item.diagnosisSekunder !== undefined){
					var tmpDataNeo={
						norec: $scope.noRecDiagnosisSekunder,
						objectfk: "RSJ-000012",
						nilai: $scope.item.diagnosisSekunder.toString(),
						satuan: "-",
						jenisobject : "radio button"
					}
					tempData.push(tmpDataNeo)
				}
				if($scope.item.alatBantu !== undefined){
					var tmpDataNeo={
						norec: $scope.noRecAlatBantu,
						objectfk: "RSJ-000013",
						nilai: $scope.item.alatBantu.toString(),
						satuan: "-",
						jenisobject : "radio button"
					}
					tempData.push(tmpDataNeo)
				}
				if($scope.item.akses !== undefined){
					var tmpDataNeo={
						norec: $scope.noRecAkses,
						objectfk: "RSJ-000014",
						nilai: $scope.item.akses.toString(),
						satuan: "-",
						jenisobject : "radio button"
					}
					tempData.push(tmpDataNeo)
				}
				if($scope.item.caraBerjalan !== undefined){
					var tmpDataNeo={
						norec: $scope.noRecCaraBerjalan,
						objectfk: "RSJ-000015",
						nilai: $scope.item.caraBerjalan.toString(),
						satuan: "-",
						jenisobject : "radio button"
					}
					tempData.push(tmpDataNeo)
				}
				if($scope.item.statusPasien !== undefined){
					var tmpDataNeo={
						norec: $scope.noRecStatusPasien,
						objectfk: "RSJ-000016",
						nilai: $scope.item.statusPasien.toString(),
						satuan: "-",
						jenisobject : "radio button"
					}
					tempData.push(tmpDataNeo)
				}

				
				

				$scope.arrGeriatri.forEach(function(data){
					if(data.id === 1){
						var tmpDataSkorDewasa = {
							norec: $scope.noRecGangguan,
							objectfk: "RSJ-000017",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject : "checkbox",
							status: data.status
						}
						tempData.push(tmpDataSkorDewasa);
					}
					if(data.id === 2){
						var tmpDataSkorDewasa = {
							norec: $scope.noRecPusing,
							objectfk: "RSJ-000018",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject : "checkbox",
							status: data.status
						}
						tempData.push(tmpDataSkorDewasa);
					}
					if(data.id === 3){
						var tmpDataSkorDewasa = {
							norec: $scope.noRecKebingungan,
							objectfk: "RSJ-000019",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject : "checkbox",
							status: data.status
						}
						tempData.push(tmpDataSkorDewasa);
					}
					if(data.id === 4){
						var tmpDataSkorDewasa = {
							norec: $scope.noRecNokturia,
							objectfk: "RSJ-000020",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject : "checkbox",
							status: data.status
						}
						tempData.push(tmpDataSkorDewasa);
					}
					if(data.id === 5){
						var tmpDataSkorDewasa = {
							norec: $scope.noRecIntermiten,
							objectfk: "RSJ-000021",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject : "checkbox",
							status: data.status
						}
						tempData.push(tmpDataSkorDewasa);
					}
					if(data.id === 6){
						var tmpDataSkorDewasa = {
							norec: $scope.noRecKelemahan,
							objectfk: "RSJ-000022",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject : "checkbox",
							status: data.status
						}
						tempData.push(tmpDataSkorDewasa);
					}
					if(data.id === 7){
						var tmpDataSkorDewasa = {
							norec: $scope.noRecObat,
							objectfk: "RSJ-000023",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject : "checkbox",
							status: data.status
						}
						tempData.push(tmpDataSkorDewasa);
					}
					if(data.id === 8){
						var tmpDataSkorDewasa = {
							norec: $scope.noRecRiwayat,
							objectfk: "RSJ-000024",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject : "checkbox",
							status: data.status
						}
						tempData.push(tmpDataSkorDewasa);
					}
					if(data.id === 9){
						var tmpDataSkorDewasa = {
							norec: $scope.noRecOsteo,
							objectfk: "RSJ-000025",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject : "checkbox",
							status: data.status
						}
						tempData.push(tmpDataSkorDewasa);
					}
					if(data.id === 10){
						var tmpDataSkorDewasa = {
							norec: $scope.noRecGangguanPend,
							objectfk: "RSJ-000026",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject : "checkbox",
							status: data.status
						}
						tempData.push(tmpDataSkorDewasa);
					}
					if(data.id === 11){
						var tmpDataSkorDewasa = {
							norec: $scope.norecUsia,
							objectfk: "RSJ-000027",
							nilai: data.id.toString(),
							satuan: "-",
							jenisobject : "checkbox",
							status: data.status
						}
						tempData.push(tmpDataSkorDewasa);
					}
					
				})

				for (var i = tempData.length - 1; i >= 0; i--) {
					if(tempData[i].norec == undefined){
						tempData[i].norec = '-'
					}
					if(tempData[i].nilai == undefined){
						tempData.splice([i],1)
					}
				}
				var jsonSave = {
					data: tempData,
					noregistrasifk: $state.params.noRec,
					riwayatpapfk: $scope.noRecPap
				}
				ManagePhp.saveData(jsonSave).then(function(e) {
					$scope.arrNyeriMempengaruhi=[];  
					$scope.getdata();
					 ManagePhp.postLogging('Pengkajian Keperawatan', 'Norec Antrian Pasien Diperiksa',$state.params.noRec, 'Resiko Jatuh').then(function (res) {
                    })
				});
			}
			// $scope.arrGeriatri=[];
			$scope.addListGeriatri = function(data) {
				var index = $scope.arrGeriatri.indexOf(data);
				if (_.filter($scope.arrGeriatri, {
					id: data.id
				}).length === 0)
					$scope.arrGeriatri.push(data);
					else {
						$scope.arrGeriatri.splice(index, 1);
					// var data2 ={
					// 	descNilai:data.descNilai,
					// 	id:data.id,
					// 	isChecked:false,
					// 	nama:data.nama,
					// 	status:'f'
					// }
					// $scope.arrGeriatri.push(data2);
				}
				$scope.getSkorGeriatri();

			}
			$scope.getSkorGeriatri = function(){
				var skorAwal = 0;
				$scope.arrGeriatri.forEach(function(data){
					skorAwal += parseInt(data.descNilai);
					
				})
				$scope.totalSkorResikoGeriatri = skorAwal;
			}


			

		}
		]);
});