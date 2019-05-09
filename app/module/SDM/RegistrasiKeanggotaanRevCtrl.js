define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RegistrasiKeanggotaanRevCtrl', [ '$q', '$timeout', '$rootScope', '$scope', 'MnKeu', '$state','CacheHelper','DateHelper', 'ManageServicePhp', 'ModelItem',
        function($q, $timeout, $rootScope, $scope, mnKeu ,$state,cacheHelper,dateHelper , manageServicePhp,ModelItem) {
            $scope.dataVOloaded = true;
            $scope.now = new Date();

            $scope.item={};
            $scope.dataItem={};
          
            // $scope.dataItem.tanggallahir = new Date();
            $scope.isRouteLoading= false;

            loadCombo();
            init();

            function init (){
                $scope.isRouteLoading= true;
                var nama = ""
                if ($scope.item.namaAnggota!= undefined)
                    nama =$scope.item.namaAnggota

                manageServicePhp.getDataTableTransaksi("perpustakaan/get-registrasi-keanggotaan?"+ 
                    nama
                    ).then(function (e) {
                        var dataPush = [];
                        e.data.data.forEach(function(item){
                            dataPush.push({
                               nomoranggota: item.nomoranggota,
                               norec: item.norec,
                               tanggal: item.tanggal,
                               nama: item.nama,
                               tempatlahir: item.tempatlahir,
                               tanggallahir: item.tanggallahir,
                               asalinstansi: item.asalinstansi,
                               email: item.email,
                               nomorhp: item.nomorhp,
                               alamat: item.alamat,
                               tipekeanggotaan: {
                                id: item.tipekeanggotaanfk,
                                tipekeanggotaan: item.tipekeanggotaan
                            },
                            jeniskelamin: {
                                id: item.jeniskelaminfk,
                                jeniskelamin: item.jeniskelamin
                            },

                        })
                        })
                        $scope.isRouteLoading= false;
                        $scope.dataSource = new kendo.data.DataSource({
                            data : dataPush,
                            schema: {
                                model: {
                                    norec: "",
                                    fields: {
                                       nomoranggota: {editable: true},
                                       tipekeanggotaan: {defaultValue: {id: 0, tipekeanggotaan: "-"} },
                                       tanggal: {defaultValue: null,editable: true, validation: { required: true }},
                                       nama: {editable: true, 
                                        validation:{ required: true }},
                                        jeniskelamin: {defaultValue: {id: 0, jeniskelamin: "-"}},
                                        tempatlahir: {editable: true, validation: { required: true }},
                                        tanggallahir: {defaultValue: null,editable: true},
                                        asalinstansi: {editable: true, validation: { required: true } },
                                        email: {editable: true, validation: { required: true }},
                                        nomorhp: {editable: true, validation: { required: true },type: "number"},
                                        alamat: {editable: true},

                                    }
                                }
                            },
                            pageSize :20,
                            change: function (e) {

                                if(e.field == "norec" && e.action == "itemchange"){
                                    e.items[0].norec = e.items[0].norec ;//? e.items[0].jenisJabatanId.id : e.items[0].jenisJabatanId;
                                } 
                                if (e.action === "remove"){
                                    var item = e.items[0];
                                    if(item.nama !== "" ){
                                        item.action = e.action;
                                        $scope.Save(item);

                                    } else {
                                        $scope.dataSource.sync(); // call sync function to auto update row number w/o click on grid
                                    }
                                }
                                // if (e.action === "sync"){
                                //      var item = e.items[0];
                                //       if(item.nama == "" ){
                                //         toastr.error('Nama Harus di isi')
                                //         return
                                //       }
                                // }
                            }

                        });
                    })

}
function loadCombo() {
    $scope.dataItem.tanggal= new Date();
    manageServicePhp.getDataTableTransaksi("perpustakaan/get-combo").then(function (e) {
        $scope.listJenisKelamin = e.data.jeniskelamin
        $scope.listTipeKeanggotaan = e.data.tipekeanggotaan
    })
}

$scope.columnsGrid = [
{
    "field": "nomoranggota",
    "title": "No Anggota",

},
{
    "field": "tipekeanggotaan",
    "title": "Tipe Keanggotaan",
    "template": "#=tipekeanggotaan.tipekeanggotaan#"
}, {
    "field": "tanggal",
    "title": "Tanggal",
    "template": '# if( tanggal==null) {#<span class="center">-<span># } else {#<span>#= kendo.toString(new Date(tanggal), "dd-MM-yyyy HH:mm") #<span>#} #',

},
{
    "field": "nama",
    "title": "Nama",
}, {
    "field": "jeniskelamin",
    "title": "Jenis Kelamin",
    "template": "#=jeniskelamin.jeniskelamin#"
}, {
    "field": "tempatlahir",
    "title": "Tempat Lahir",

}, {
    "field": "tanggallahir",
    "title": "Tanggal Lahir",
    "template": '# if( tanggallahir==null) {#<span class="center">-<span># } else {#<span>#= kendo.toString(new Date(tanggallahir), "dd-MM-yyyy") #<span>#} #',

}, {
    "field": "asalinstansi",
    "title": "Asal Instansi"
}, {
    "field": "nomorhp",
    "title": "No Hp"
},{
    "field": "email",
    "title": "Email"
},{
    "field": "alamat",
    "title": "Alamat"
}, {
    command: [{
        name: "edit",
        text: "Edit"
    }, {
        name: "destroy",
        text: "Hapus",
    }],
    width: "180px",
}];


$scope.mainGridOptions = {
    pageable: true,
    columns: $scope.columnsGrid,
    toolbar: [{
        "name": "create",
        "text": "Tambah"
    }],
    selectable: "row",
    editable: {
        mode: "popup",
        window: {
            title: "Input Registrasi Keanggotaan"
        },
        template: kendo.template($("#popup-editor").html())
    }, 
    save: function(e){
        $scope.Save(e.model);
    },
    edit: function(e){
        e.sender.columns.forEach(function (element, index /*, array */) {
            if (element.hideMe) {
                e.container.find(".k-edit-label:eq(" + index + "), "
                    + ".k-edit-field:eq( " + index + ")"
                    ).hide();
            }
        });
    }

};
$scope.click = function(selectedItem) {
    var current = selectedItem;
    $scope.dataSelectedPengeluaran = current;
};

$scope.Save = function(data) {
                    //     var listRawRequired = [
                    // "alamat|ng-model|Alamat",

                    // ]
                    // var isValid = ModelItem.setValidation(data, listRawRequired);

                    // if (isValid.status) {

                        var item = {
                            "norec": data.norec !== "" ?  data.norec : "",
                            "alamat": data.alamat,
                            "asalinstansi": data.asalinstansi,
                            "email": data.email,
                            "jeniskelaminfk": data.jeniskelamin.id,
                            "nama": data.nama,
                            "nomorhp": data.nomorhp,
                            "tempatlahir": data.tempatlahir,
                            "tipekeanggotaanfk": data.tipekeanggotaan.id,
                            "tanggal": moment (data.tanggal).format('YYYY-MM-DD HH:mm:ss'),
                            "tanggallahir":data.tanggallahir !== undefined ? moment (data.tanggallahir).format('YYYY-MM-DD') : null,
                        }
                        if(data.action && data.action === "remove") {
                            manageServicePhp.saveDataTransaksi("perpustakaan/delete-registrasi-keanggotaan",item).then(function (e) {

                            }); 
                        }else{
                            manageServicePhp.saveDataTransaksi("perpustakaan/save-registrasi-keanggotaan",item).then(function (e) {
                                init();
                            });
                        }

                    // } else {
                    //     ModelItem.showMessages(isValid.messages);
                    // }
                }
                var timeoutPromise;
                $scope.$watch('item.nomorAnggota', function(newVal, oldVal){
                    if(newVal  && newVal !== oldVal){
                        applyFilter("nomoranggota", newVal)
                    }
                })
                $scope.$watch('item.namaAnggota', function(newVal, oldVal){
                    $timeout.cancel(timeoutPromise);
                    timeoutPromise = $timeout(function(){
                        if(newVal && newVal !== oldVal){
                            applyFilter("nama", newVal)
                        }
                    }, 500)
                })
                function applyFilter(filterField, filterValue){
                    var dataGrid = $("#kGrid").data("kendoGrid");
                    var currFilterObject = dataGrid.dataSource.filter();
                    var currentFilters = currFilterObject ? currFilterObject.filters : [];

                    if (currentFilters && currentFilters.length > 0){
                        for(var i = 0; i < currentFilters.length; i++){
                            if(currentFilters[i].field == filterField){
                                currentFilters.splice(i, 1);
                                break;
                            }
                        }
                    }

                    if(filterValue.id){
                        currentFilters.push({
                            field: filterField,
                            operator: "eq",
                            value: filterValue.id
                        });
                    } else {
                        currentFilters.push({
                            field: filterField,
                            operator: "contains",
                            value: filterValue
                        })
                    }

                    dataGrid.dataSource.filter({
                        logic: "and",
                        filters: currentFilters
                    })
                }
                $scope.resetFilter = function(){
                    var dataGrid = $("#kGrid").data("kendoGrid");
                    dataGrid.dataSource.filter({});
                    $scope.item = {};
                }

            }
            ]);
});
