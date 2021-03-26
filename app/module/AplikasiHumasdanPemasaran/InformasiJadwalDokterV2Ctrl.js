define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('InformasiJadwalDokterV2Ctrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'InformasiDokter', 'InformasiRuangan', 'TampilPenghargaan', '$state', 'ModelItemAkuntansi',
        function ($rootScope, $scope, ModelItem, dateHelper, InformasiDokter, InformasiRuangan, TampilPenghargaan, $state, modelItemAkuntansi) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.now = new Date();
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };

            $scope.getData = () => {
                let bln = new Date($scope.item.bulan).getMonth(),
                    thn = new Date($scope.item.bulan).getFullYear(),
                    date = moment($scope.now).format('YYYY-MM-DD 00:00'),
                    datatemp = [];

                $.ajax({
                    url: "http://192.168.12.3:5775/kehadiranpasien-service/get-jml-pasien-dokter?X-AUTH-TOKEN=234567890kjdsfkjf&idDokter=" + ($scope.item.dokter ? $scope.item.dokter.id : "") + "&idRuangan=" + ($scope.item.ruangan ? $scope.item.ruangan.id : "") + "&bulan=" + ($scope.item.bulan ? bln + 1 : "") + "&tahun=" + ($scope.item.bulan ? thn : ""),
                    method: "GET",
                    success: (data) => {
                        $scope.jmlPasienDokter = data;
                        console.log(data);
                    }
                })

                modelItemAkuntansi.getDataTableTransaksi('humas/get-data-jadwal?bulan=' + ($scope.item.bulan ? bln + 1 : "") + '&tahun=' + ($scope.item.bulan ? thn : "") + '&ruangan=' + ($scope.item.ruangan ? $scope.item.ruangan.id : "") + '&dokterId=' + ($scope.item.dokter ? $scope.item.dokter.id : "")).then(data => {
                    for (var i = 0; i < data.length; i++) {

                        for (let ii = 0; ii < $scope.jmlPasienDokter.length; ii++) {
                            if (data[i].jampraktek === $scope.jmlPasienDokter[ii].jamPraktik) {
                                data[i].sisaQuota = $scope.jmlPasienDokter[ii].sisaQuota;
                                data[i].jmlAktivasi = $scope.jmlPasienDokter[ii].jmlAktivasi;
                                data[i].jmlDaftar = $scope.jmlPasienDokter[ii].jmlDaftar;
                            }
                        }

                        let listJamPraktek = data[i].jampraktek.split('-');
                        let tglPraktik = dateHelper.formatDate(data[i].tglpraktik, 'YYYY-MM-DD');

                        // start: "2020-08-09 07:30:00"
                        let end = tglPraktik + ' ' + listJamPraktek[1],
                            start = tglPraktik + ' ' + listJamPraktek[0];

                        data[i].no = i + 1
                        datatemp.push({
                            "id": data[i].no,
                            "title": data[i].namaruangan + ' ' + ':' + ' ' + data[i].namalengkap,
                            "quota": data[i].quota,
                            "sisaQuota": data[i].sisaQuota,
                            "jmlAktivasi": data[i].jmlAktivasi,
                            "jmlDaftar": data[i].jmlDaftar,
                            // "pegawaiid": datas[i].pegawaiid,
                            "namalengkap": data[i].namalengkap,
                            // "ruanganid": datas[i].ruanganid,
                            "namaruangan": data[i].namaruangan,
                            // "tanggaljadwal": datas[i].tanggaljadwal,
                            "start": start,
                            "end": end,
                            // "startepoch": '\/date(' +  datas[i].startepoch + ')\/',
                            // "endpoch": '\/date(' + datas[i].endpoch + ')\/',
                            "Description": "Jadwal Dokter",
                            // "StartTimezone": null,
                            // "EndTimezone": null,
                            // "RecurrenceRule": null,
                            // "RecurrenceID": null,
                            // "RecurrenceException": null,
                            // "IsAllDay": false
                        });
                    }
                })
            }

            let init = () => {
                // $scope.getData();

                var itemsSchedule = [
                    {
                      keyfrom: "sf",
                      keyto: "sff",
                      text: "Event 1",
                      bg: "red",
                      days:['sunday']
                    }
                    ,{
                      keyfrom: "st",
                      keyto: "eff",
                      text: "Event 2",
                      bg: "blue",
                      days:['sunday']
                    }
                    ,{
                      keyfrom: "nt",
                      keyto: "nff",
                      text: "Event x S",
                      bg: "green",
                      days:['sunday']
                    }
                    ,{
                      keyfrom: "s",
                      keyto: "sf",
                      text: "Wake up",
                      bg: "green",
                      days:['monday', 'tuesday', 'wednesday', 'thursday','friday']
                    }  
                    ,{
                      keyfrom: "sf",
                      keyto: "sff",
                      text: "Event for monday",
                      bg: "yellow",
                      days:['monday']
                    }
                    ,{
                      keyfrom: "eff",
                      keyto: "nf",
                      text: "Event for monday",
                      bg: "purple",
                      days:['monday']
                    }
                    ,{
                      keyfrom: "n",
                      keyto: "nff",
                      text: "Event for wednesday",
                      bg: "blue",
                      days:['wednesday']
                    }
                    ,{
                      keyfrom: "sf",
                      keyto: "st",
                      text: "Event for w",
                      bg: "red",
                      days:['wednesday']
                    }
                    ,{
                      keyfrom: "st",
                      keyto: "e",
                      text: "Event for thursday",
                      bg: "yellow",
                      days:['thursday']
                    }
                    ,{
                      keyfrom: "eff",
                      keyto: "n",
                      text: "Event x th",
                      bg: "yellow",
                      days:['thursday']
                    }
                    ,{
                      keyfrom: "e",
                      keyto: "eff",
                      text: "Event x friday",
                      bg: "purple",
                      days:['friday']
                    }
                    ,{
                      keyfrom: "n",
                      keyto: "nff",
                      text: "Event x saturday",
                      bg: "red",
                      days:['saturday']
                    }
                  ]
                  
                  itemsSchedule.forEach(function(sitem,index){
                    // console.log(index,sitem)
                    sitem.days.forEach(function(sday, dindex){
                      // console.log(sday, dindex)
                      $(".schedule").append(
                        '<div class="schedule-item'
                        +' schedule-'+ sday
                        +' time-from-'+ sitem.keyfrom
                        +' time-to-'+sitem.keyto
                        +' nt bg-'+sitem.bg+'">'
                          +sitem.text
                        +'</div>'
                       )
                    })
                  })

                modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-pegawai", true, true, 20).then(function (data) {
                    $scope.listdokter = data;
                });

                modelItemAkuntansi.getDataTableTransaksi("humas/get-daftar-combo?", true).then(function (dat) {
                    $scope.ListRuangan = dat.ruangan;
                });
            }

            init();
        }
    ]);
});