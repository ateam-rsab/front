define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarCheckListMFKCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageSarpras',
		function ($rootScope, $scope, ModelItem, ManageSarpras) {
            $scope.detilCeklistFasilitas = false;
            $scope.gridOption = {
                selectable: 'row',
                pageable: true,
                editable: false,
                columns: [
                    {field: "noRec", title: "&nbsp;", hidden: true},
                    {field: "tanggal", title: "Tanggal", template: "#= kendo.toString(new Date(tanggal), \"dd/MM/yyyy\") #"},
                    {field: "namaRuangan", title: "Nama Ruangan"},
                    {field: "facillityCheck", title: "Facility Check"},
                    {field: "idFasilitasCheck", title: "&nbsp;", hidden: true},
                    {command: [{text:"Detil", click: getDetail, imageClass: "k-icon k-i-pencil"}], width: "80px",}
                ]
            };
            function initPage(){
                $scope.isRouteLoading = true;
                ManageSarpras.getOrderList("k3-checklist-facillity-sefety/get-k3-check-list-fasilitas-dan-keamanan").then(function(res){
                    if(res.data.data.data.length>0){
                        var grid = $("#gridCeklisMFK").data("kendoGrid");
                        var ds = new kendo.data.DataSource({
                            data: res.data.data.data,
                            pageSize: 12
                        });
                        grid.setDataSource(ds);
                        grid.dataSource.fetch();
                        $scope.isRouteLoading = false;
                    }
                },function(err){
                    $scope.isRouteLoading = false;
                    return err;
                });
            };
            initPage();
            function getDetail(e){
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                if(dataItem) {
                    $scope.isRouteLoading = true;
                    ManageSarpras.getOrderList("k3-checklist-facillity-sefety/get-k3-check-list-fasilitas-dan-keamanan-detail?k3FacillityCheckId="+dataItem.idFasilitasCheck+"&noRec="+dataItem.noRec)
                    .then(function(res){
                        $scope.detilTransaksi = res.data.data.listKelompok;
                        $scope.isRouteLoading = false;
                        toogleShowDetil();
                    },(err) => {
                        $scope.isRouteLoading = false;
                        throw err;
                    });
                }
            }
            function toogleShowDetil(){
                $scope.detilCeklistFasilitas = !$scope.detilCeklistFasilitas;
                console.log($scope.detilCeklistFasilitas);
            }

            $scope.back = function(){
                toogleShowDetil();
            }
		}
	]);
});