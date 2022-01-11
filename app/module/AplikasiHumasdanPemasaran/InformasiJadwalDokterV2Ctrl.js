define(['initialize'], function (initialize) {
  'use strict';
  initialize.controller('InformasiJadwalDokterV2Ctrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'InformasiDokter', 'InformasiRuangan', 'TampilPenghargaan', '$state', 'ModelItemAkuntansi', '$mdDialog',
    function ($rootScope, $scope, ModelItem, dateHelper, InformasiDokter, InformasiRuangan, TampilPenghargaan, $state, modelItemAkuntansi, $mdDialog) {
      $scope.item = {};
      $scope.isRouteLoading = false;
      $scope.now = new Date();
      $scope.monthSelectorOptions = {
        start: "year",
        depth: "year"
      };

      let dataSearch = localStorage.getItem("dataSearchJadwalDokter") ? JSON.parse(localStorage.getItem("dataSearchJadwalDokter")) : null;

      function getWeeksInMonth(a, b) {
        var c = [],
          d = new Date(b, a, 1),
          e = new Date(b, a + 1, 0),
          f = e.getDate();
        var g = 1;
        var h = 7 - d.getDay();
        while (g <= f) {
          c.push({
            start: g,
            end: h
          });
          g = h + 1;
          h += 7;
          if (h > f) h = f;
        }
        return c;
      }

      var today = new Date(),
        week_date = getWeeksInMonth(today.getMonth(), today.getFullYear())[2];

      let getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      }

      // let getToken = () => {
      //   var authorization = getCookie("authorization");
      //       for (var i = 0; i < arr.length; i++) {
      //           var element = arr[i].split('=');
      //           if (element[0].indexOf('authorization') != -1) {
      //               return authorization = element[1];
      //           }
      //       }
      // }

      $scope.batalJadwal = (tanggal, keterangan) => {

        console.log(new Date(tanggal));
        let token = getCookie('authorization');
        var confirm = $mdDialog.confirm()
          .title('Apakah anda akan menghapus praktek pada tanggal ' + tanggal)
          .ariaLabel('Lucky day')
          .ok('Ya')
          .cancel('Tidak');

        $mdDialog.show(confirm).then(function () {
          // prod https://smart.rsabhk.co.id:2222

          let dataSave = {
            "dokterfk": $scope.item.dokter.id,
            "tglPraktek": dateHelper.formatDate(new Date(tanggal), "YYYY-MM-DD"),
            "keterangan": keterangan
          }
          $.ajax({
            url: "http://172.16.44.33:9111/pelayanan-service/batal-jadwal-dokter?X-AUTH-TOKEN=" + token,
            dataType: 'json',
            contentType: "application/json;charset=utf-8",
            method: "POST",
            data: JSON.stringify(dataSave),
            success: (res) => {
              toastr.info(res.message);
            }
          })
        }, function (res) {

        });
      }

      $('#calendar').on('selectDate', function (event, activeMonth, monthIndex) {
        // console.log(event);
        var activeEvent = $('#calendar').evoCalendar('getActiveEvents');
        console.log(activeEvent);

        // console.log(activeEvent.length);
        let kelompokUser = getCookie("statusCode");
        if (kelompokUser === "humas" || kelompokUser === "operator") {
          // if(!activeEvent.isCanCancel) {
          //   toastr.info("Tidak bisa membatalkan jadwal karna slot sudah ada yg terisi!");
          //   return;
          // }
          if (activeEvent.length === 0) {
            toastr.info("Tidak ada jadwal");
            return;
          }

          for (let i = 0; i < activeEvent.length; i++) {
            if (!activeEvent[i].isCanCancel) {
              toastr.info("Tidak bisa membatalkan jadwal karna slot sudah ada yg terisi!");
              return;
            }
          }

          var confirm = $mdDialog.prompt()
            .title('Anda akan membatalkan praktek Dokter?')
            .textContent('Silahkan isi Keterangan terlebih dahulu')
            .placeholder('Keterangan')
            .ariaLabel('Keterangan')
            .initialValue('')
            .ok('Simpan')
            .cancel('Batal');


          $mdDialog.show(confirm).then(function (keterangan) {
            $scope.batalJadwal(activeMonth, keterangan);
          }, function () {
            console.log("Batal")
          });
        }
      });

      $scope.getData = () => {
        // $('#calendar').evoCalendar('destroy');
        let token = getCookie('authorization');
        var datatemp = [];
        let bln = new Date($scope.item.bulan).getMonth(),
          thn = new Date($scope.item.bulan).getFullYear()

        $.ajax({
          url: "http://172.16.44.33:9111/pelayanan-service/get-jml-pasien-dokter?namaDokter=" + ($scope.item.dokter ? $scope.item.dokter.namalengkap : "") + "&namaRuangan=" + ($scope.item.ruangan ? $scope.item.ruangan.namaruangan : "") + "&bulan=" + ($scope.item.bulan ? bln + 1 : "") + "&tahun=" + ($scope.item.bulan ? thn : "") + "&X-AUTH-TOKEN=" + token,
          method: "GET",
          headers: {
            "X-AUTH-TOKEN": token
          },
          success: (data) => {

            for (var i = 0; i < data.length; i++) {
              data[i].no = i + 1;

              let date = data[i].tglDokter.split;
              datatemp.push({
                id: data[i].no,
                name: data[i].jamPraktik,
                // <strong>${data[i].namaruangan}</strong>${data[i].namalengkap}<hr><br>
                description: `<strong>Quota:</strong> ${data[i].totalQuota ? data[i].totalQuota : 0}<br><strong>Jumlah Daftar:</strong> ${data[i].jmlDaftar ? data[i].jmlDaftar : 0}<br><strong>Sisa Quota:</strong> ${data[i].sisaQuota ? data[i].sisaQuota : 0}<br> 
                <button class="custom-button" onclick='detailData(${JSON.stringify(data[i])}, ${$scope.item.ruangan.id}, ${$scope.item.dokter.id})'>Detail</button>`,
                date: data[i].tglDokter,
                isCanCancel: !(data[i].sisaQuota < data[i].totalQuota),
                type: data[i].jenisJadwal === "Telekonsultasi" ? "birthday" : "event",
                everyYear: !0,
              });


            }

            $("#calendar").evoCalendar({
              format: "MM dd, yyyy",
              titleFormat: "MM",
              sidebarDisplayDefault: false,
              eventDisplayDefault: datatemp.length === 0,
              calendarEvents: [...datatemp]
            })

            $('#calendar').evoCalendar('selectMonth', parseInt(bln));
            $('#calendar').evoCalendar('selectYear', thn);
          }
        })

        // modelItemAkuntansi.getDataTableTransaksi('humas/get-data-jadwal?bulan=' + ($scope.item.bulan ? bln + 1 : "") + '&tahun=' + ($scope.item.bulan ? thn : "") + '&ruangan=' + ($scope.item.ruangan ? $scope.item.ruangan.id : "") + '&dokterId=' + ($scope.item.dokter ? $scope.item.dokter.id : "")).then(data => {

        //   // for (var i = 0; i < data.length; i++) {

        //   //   for (let ii = 0; ii < $scope.jmlPasienDokter.length; ii++) {
        //   //     if (data[i].jampraktek === $scope.jmlPasienDokter[ii].jamPraktik) {
        //   //       data[i].sisaQuota = $scope.jmlPasienDokter[ii].sisaQuota;
        //   //       data[i].jmlAktivasi = $scope.jmlPasienDokter[ii].jmlAktivasi;
        //   //       data[i].jmlDaftar = $scope.jmlPasienDokter[ii].jmlDaftar;
        //   //     }
        //   //   }

        //   //   let listJamPraktek = data[i].jampraktek.split('-');
        //   //   let tglPraktik = dateHelper.formatDate(data[i].tglpraktik, 'YYYY-MM-DD');
        //   //   data[i].tglKunjungan = tglPraktik;

        //   //   let end = listJamPraktek[1],
        //   //     start = listJamPraktek[0];

        //   //   

        //   // }

        //   // $('#calendar').evoCalendar('selectMonth', parseInt(bln));


        // })
      }

      let init = () => {
        if (dataSearch) {
          $scope.item.dokter = dataSearch.dokter;
          $scope.item.ruangan = dataSearch.ruangan;
          $scope.item.bulan = dataSearch.bulan;
          $scope.getData();
        }
      }
      init();

      function loadDataCombo() {
        modelItemAkuntansi.getDataDummyPHP("humas/get-daftar-combo-pegawai", true, true, 20).then(function (data) {
          $scope.listdokter = data;
        });

        modelItemAkuntansi.getDataTableTransaksi("humas/get-daftar-combo?", true).then(function (dat) {
          $scope.ListRuangan = dat.ruangan;
        });
      }
      loadDataCombo();

      $scope.searchData = function () {
        let data = {
          dokter: $scope.item.dokter,
          ruangan: $scope.item.ruangan,
          bulan: $scope.item.bulan
        }

        localStorage.setItem("dataSearchJadwalDokter", JSON.stringify(data));

        window.location.reload();
      }
    }
  ]);
});