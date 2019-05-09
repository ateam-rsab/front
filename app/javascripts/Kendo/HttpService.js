 define(['Configuration'], function(config) {

     var baseUrlSerelize = config.baseUrlSerelize;
     var baseUrlListData = config.baseUrlListData;
     var baseUrlApiData = config.baseApiUrlData;
     var httpServices = angular.module('HttpServices', []);
     httpServices.service('R', ['$q', '$http', function($q, $http) {
         return {
             get: function(obj) {
                 var deffer = $q.defer();
                 if (obj.method === undefined)
                     obj.method = "GET";
                 var authorization = "";
                 var arr = document.cookie.split(';')
                 for (var i = 0; i < arr.length; i++) {
                     var element = arr[i].split('=');
                     if (element[0].indexOf('authorization') > 0) {
                         authorization = element[1];
                     }
                 }
                 var url = "";
                 if (obj.url.indexOf("?") >= 0) {
                     url = obj.url + "&X-AUTH-TOKEN=" + authorization;
                 } else
                     url = obj.url + "?X-AUTH-TOKEN=" + authorization;

                 $http.get(url, {
                     headers: {
                         'Content-Type': 'application/json',
                         'X-AUTH-TOKEN': authorization
                     }
                 }).then(function successCallback(response) {
                     response.statResponse = true;
                     deffer.resolve(response);
                 }, function errorCallback(response, err, da) {
                     response.statResponse = false;
                     deffer.reject(response);
                 });
                 return deffer.promise;
             },
             post: function(obj, data) {
                 console.log(JSON.stringify(data));
                 var deffer = $q.defer();
                 if (obj.method === undefined)
                     obj.method = "GET";
                 var authorization = "";
                 var arr = document.cookie.split(';')
                 for (var i = 0; i < arr.length; i++) {
                     var element = arr[i].split('=');
                     if (element[0].indexOf('authorization') > 0) {
                         authorization = element[1];
                     }
                 }
                 var url = "";
                 if (obj.url.indexOf("?") >= 0) {
                     url = obj.url + "&X-AUTH-TOKEN=" + authorization;
                 } else
                     url = obj.url + "?X-AUTH-TOKEN=" + authorization;
                 var req = {
                     method: 'POST',
                     url: url,
                     headers: {
                         'Content-Type': 'application/json',
                         'X-AUTH-TOKEN': authorization
                     },
                     data: data
                 }
                 $http(req).then(function successCallback(response) {
                     if (response.data.data !== null) {
                         if (response.data.data.message != undefined) {
                             var msg = response.data.data.message;
                             window.messageContainer.log(msg);
                         } else if (response.data.messages) {
                             var msg = response.data.messages;
                             window.messageContainer.log(msg['label-success']);
                         } else if (response.data.messages != undefined) {
                             var msg = response.data.messages;
                             window.messageContainer.log(msg['label-success']);
                         }
                     }
                     deffer.resolve(response);
                 }, function errorCallback(response) {
                     var msgError = "";
                     if (response.data.fieldErrors != undefined) {

                         for (var i = 0; i < response.data.fieldErrors.length; i++) {
                             msgError = response.data.fieldErrors[i].message;
                             window.messageContainer.error(msgError);
                         }
                     } else {
                         msgError = response.statusText;
                         window.messageContainer.error(msgError);
                     }

                     deffer.reject(response);
                 });
                 return deffer.promise;
             }
         }
     }]);
     httpServices.service('ModelItem', ['$q', '$http', '$resource', 'TextHelper', 'R',
         function($q, $http, $resource, textHelper, r) {
             var beforeSubmit =
                 function(data, back) {
                     var item = {};
                     if ($.isFunction(data)) return;
                     if (data instanceof Array)
                         item = [];
                     for (var key in data) {
                         if (key === '$$hashKey') continue;
                         if (key === '_events') continue;
                         if (key === '_handlers') continue;
                         if (key === 'uid') continue;
                         if (key === 'dirty') continue;
                         if (key === 'parent') continue; //
                         if (key === 'attributes') continue;
                         if (data.hasOwnProperty(key)) {
                             var element = data[key];
                             if (element instanceof Array) {
                                 var temp = [];
                                 for (var i in element) {
                                     if (element.hasOwnProperty(i)) {
                                         var detailElement = element[i];
                                         temp.push(beforeSubmit(detailElement, back));
                                     }
                                 }
                                 if (data instanceof Array)
                                     item.push(temp);
                                 else
                                     item[key] = temp;
                             } else {
                                 if (key.indexOf('tanggal') > -1 || key.indexOf('tgl') > -1) {
                                     if (back) {
                                         if (typeof back === 'string') {
                                             item[key] = moment(element).format(back);
                                         } else {
                                             item[key] = new Date(element)
                                         }
                                     } else {
                                         if (element === undefined) {
                                             item[key] = null;
                                         } else
                                         if (element === 0 || element === null)
                                             item[key] = undefined;
                                         else
                                         if (isNaN(Date.parse(element)))
                                             item[key] = new Date(element)
                                         else
                                             item[key] = Date.parse(element);

                                     }
                                 } else {
                                     if (data instanceof Array) {
                                         var temp = element;
                                         if (temp instanceof Object)
                                             temp = beforeSubmit(temp, back);
                                         item.push(temp);
                                     } else if (element instanceof Object) {
                                         item[key] = beforeSubmit(element, back);
                                     } else
                                         item[key] = element;
                                 }
                             }
                         }
                     }
                     return item;
                 }
             var items = [];
             return {

                 CopyObject: function(obj, source) {
                     for (var key in source) {
                         if (source.hasOwnProperty(key)) {
                             var element = source[key];
                             obj[key] = element;
                         }
                     }
                     return obj;
                 },
                 getAuthorize: function() {

                     var authorization = "";
                     var arr = document.cookie.split(';')
                     for (var i = 0; i < arr.length; i++) {
                         var element = arr[i].split('=');
                         if (element[0].indexOf('authorization') > 0) {
                             authorization = element[1];
                         }
                     }
                     return authorization;
                 },
                 getSettingDataFixed: function(prefix) {
                     return r.get({
                         url: baseUrlApiData + "service/get-setting/?prefix=" + prefix
                     });
                 },
                 getPegawai: function() {
                     return JSON.parse(window.localStorage.getItem('pegawai'));
                 },
                 getRuangans: function() {
                     return null;
                 },
                 getStatusUser: function() {
                     var arr = document.cookie.split(';')
                     for (var i = 0; i < arr.length; i++) {
                         var element = arr[i].split('=');
                         if (element[0].indexOf('statusCode') >= 0) {
                             return element[1];
                         }
                     }
                     return null;
                 },
                 translate: function(keyword, i) {
                     return textHelper.convertToStatement(keyword, i);
                 },
                 beforePost: function(data, back) {
                     return beforeSubmit(data, back);
                 },
                 post: function(urlDetail, dataVO) {

                     /*var authorization = "";
                     var arr = document.cookie.split(';')
                     for (var i = 0; i < arr.length; i++) {
                         var element = arr[i].split('=');
                         if (element[0] === 'authorization') {
                             authorization = element[1];
                         }
                     }*/

                     var deffer = $q.defer();
                     $http({
                         method: 'POST',
                         url: baseUrlSerelize + urlDetail,
                         headers: {
                             'Content-Type': 'application/json',
                             'Content-Length': Buffer.byteLength(dataVO)
                                 //'Authorization': 'Basic ' + authorization
                         },
                         data: JSON.stringify(dataVO)
                     }).then(function successCallback(response) {

                         if (response.status === 200)
                             deffer.resolve(response.data);
                     }, function errorCallback(response) {
                         deffer.reject(response);
                     });
                     return deffer.promise;
                 },
                 get: function(name) {
                     var deffer = $q.defer();
                     var item = _.filter(items, {
                         name: name
                     });



                     if (item.length === 0)
                         $http({
                             method: 'GET',
                             url: baseUrlSerelize + name
                                 /*headers: {
                                     'Authorization': 'Basic ' + authorization
                                 }*/

                         }).then(function successCallback(response) {

                             if (response.status === 200) {
                                 //window.localStorage.setItem(name, response.data);
                                 var item = _.filter(items, {
                                     name: name
                                 });
                                 var data = response.data;
                                 var result = {};
                                 if (item.length === 0) {
                                     for (var i in data) {
                                         if (i === 'model') {
                                             for (var j in data[i]) {
                                                 result[j] = data[i][j];
                                             }
                                         } else {
                                             result[i] = data[i];
                                         }
                                     }
                                     items.push({
                                         name: name,
                                         data: result
                                     });
                                 } else {
                                     result = item[0].data;
                                 }

                                 result.statResponse = true;
                                 deffer.resolve(result);
                             }
                         }, function errorCallback(response) {
                             deffer.reject(response);
                         });
                     else {

                         item[0].data.statResponse = true;
                         deffer.resolve(item[0].data);
                     }
                     return deffer.promise;
                 },

                 set: function(name, model) {
                     var valid = false;
                     for (var i in items) {
                         if (items[i].name === name) {
                             valid = true;
                             items[i] = {
                                 name: name,
                                 data: model
                             };
                         }
                     }
                     if (!valid)
                         items.push({
                             name: name,
                             data: model
                         });
                 },
                 getGridOption: function(dataOrUrl, arrColumn, isInputMode) {
                     var deffer = $q.defer();
                     var gridOption = {
                         height: 400,
                         sortable: true,
                         pageable: true,
                         columns: arrColumn,
                         scrollable: true
                     };

                     if (isInputMode) {
                         gridOption.dataSource = new kendo.data.DataSource({
                             data: dataOrUrl,
                             pageSize: 5,
                             serverPaging: false,
                             serverSorting: false
                         });
                     } else {
                         gridOption.dataSource = new kendo.data.DataSource({
                             transport: {
                                 read: {
                                     type: 'GET',
                                     url: baseUrlApiData + dataOrUrl,
                                     dataType: "json" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                 }
                             },
                             pageSize: 5,
                             serverPaging: true,
                             serverSorting: false
                         });
                     }

                     deffer.resolve(gridOption);
                     return deffer.promise;
                 },
                 genericService: function() {
                     return $resource(baseUrlListData + ':table&select=*&value=:value&Select=:select', {}, {
                         query: {
                             method: 'GET',
                             params: {},
                             isArray: true
                         }
                     });
                 },
                 kendoHttpSource: function(url, serverFiltering) {
                     var authorization = "";
                     var arr = document.cookie.split(';')
                     for (var i = 0; i < arr.length; i++) {
                         var element = arr[i].split('=');
                         if (element[0].indexOf('authorization') > 0) {
                             authorization = element[1];
                         }
                     }
                     if (serverFiltering === undefined)
                         serverFiltering = false;
                     var tempurl = baseUrlApiData + url;
                     if (tempurl.indexOf('?') > 0)
                         tempurl = tempurl + "&X-AUTH-TOKEN=" + authorization
                     else
                         tempurl = tempurl + "?X-AUTH-TOKEN=" + authorization
                     var kendoSourceData = new kendo.data.DataSource({
                         serverFiltering: serverFiltering,
                         transport: {
                             read: {
                                 type: 'GET',
                                 url: tempurl,
                                 beforeSend: function(req) {
                                     req.setRequestHeader('X-AUTH-TOKEN', authorization);
                                 },
                                 dataType: "json" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                             }
                         },
                         pageSize: 20,
                         serverPaging: true,
                         schema: {
                             model: {
                                 id: "id"
                             },
                             data: function(a, e, r, t) {
                                 if (a.data !== undefined) {
                                     if (a.data.data !== undefined)
                                         return a.data.data;
                                     return a.data;
                                 }
                                 kendoSourceData.total(50);
                                 return a;
                             },
                             total: function(e) {
                                 if (e.messages !== undefined && e.messages["Total-Count"] !== undefined)
                                     return e.messages["Total-Count"];
                                 return undefined;
                             },
                             totalPages: function(e) {}
                         }

                     });

                     return kendoSourceData;

                 },
                 kendoSource: function(nameVO, arrFieldSelect, isServerFiltering, take, skip, page, pageSize) {
                     var strFieldSelect = "";
                     var strTakeOption = "";
                     if (take === undefined) {
                         take = 10;
                         strTakeOption = "&take=" + take;
                     }
                     if (take == undefined || take == "") {
                         strTakeOption = "";
                     } else {
                         //strTakeOption = "&take=" + take + "&skip=" + skip + "&page=" + page + "&pageSize=" + pageSize;
                     }

                     if (arrFieldSelect == undefined || arrFieldSelect == "") {
                         strFieldSelect = "*";
                     } else {
                         strFieldSelect = arrFieldSelect.join();
                     }
                     var authorization = "";
                     var arr = document.cookie.split(';')
                     for (var i = 0; i < arr.length; i++) {
                         var element = arr[i].split('=');
                         if (element[0].indexOf('authorization') > 0) {
                             authorization = element[1];
                         }
                     }
                     var kendoSourceData = new kendo.data.DataSource({
                         serverFiltering: isServerFiltering,
                         transport: {
                             read: {
                                 type: 'GET',
                                 url: baseUrlListData + nameVO + "&select=" + strFieldSelect + strTakeOption + "&X-AUTH-TOKEN=" + authorization,
                                 dataType: "json" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                             }
                         },
                         schema: {
                             model: {
                                 id: "id"
                             }
                         }

                     });

                     return kendoSourceData;

                 },
                 getKendoSource: function(nameVO, arrFieldSelect, isServerFiltering, take, skip, page, pageSize) {
                     var strFieldSelect = "";
                     var strTakeOption = "";
                     var authorization = "";
                     var arr = document.cookie.split(';')
                     for (var i = 0; i < arr.length; i++) {
                         var element = arr[i].split('=');
                         if (element[0].indexOf('authorization') > 0) {
                             authorization = element[1];
                         }
                     }
                     if (take == undefined || take == "") {
                         strTakeOption = "";
                     } else {
                         strTakeOption = "&take=" + take + "&skip=" + skip + "&page=" + page + "&pageSize=" + pageSize;
                     }

                     if (arrFieldSelect == undefined || arrFieldSelect == "") {
                         strFieldSelect = "*";
                     } else {
                         strFieldSelect = arrFieldSelect.join();
                     }

                     var deffer = $q.defer();


                     var kendoSourceData = new kendo.data.DataSource({
                         serverFiltering: isServerFiltering,
                         transport: {
                             read: {
                                 type: 'GET',
                                 url: baseUrlListData + nameVO + "&select=" + strFieldSelect + strTakeOption + "&X-AUTH-TOKEN=" + authorization,
                                 dataType: "json" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                             }
                         },
                         schema: {
                             model: {
                                 id: "id"
                             }
                         }

                     });

                     deffer.resolve(kendoSourceData);

                     return deffer.promise;

                 },

                 getDataDummyGeneric: function(nameGeneric, kendoSource, isServerFiltering, top, filter, select) {

                     var deffer = $q.defer();
                     if (isServerFiltering === undefined)
                         isServerFiltering = false;
                     var arr = document.cookie.split(';')
                     var authorization = "";

                     for (var i = 0; i < arr.length; i++) {
                         var element = arr[i].split('=');
                         if (element[0].indexOf('authorization') > 0) {
                             authorization = element[1];
                         }
                     }
                     if (kendoSource) {
                         var currentTop = '';
                         if (top !== undefined)
                             if (baseUrlListData.indexOf('?') >= 0)
                                 currentTop = "&take=" + top;
                             else
                                 currentTop = "?take=" + top;
                         if (!select) {
                             if (baseUrlListData.indexOf('?') >= 0)
                                 currentTop += "&select=*";
                             else
                                 currentTop += "?select=*";
                         } else {
                             if (baseUrlListData.indexOf('?') >= 0)
                                 currentTop += "&select=" + select
                             else
                                 currentTop += "?select=" + select;
                         };

                         var url = "";
                         url = baseUrlListData + nameGeneric + currentTop;
                         if (url.indexOf("?") >= 0) {
                             url = url + "&X-AUTH-TOKEN=" + authorization;
                         } else
                             url = url + "?X-AUTH-TOKEN=" + authorization;
                         var kendoSourceData = new kendo.data.DataSource({
                             filter: filter,
                             serverFiltering: isServerFiltering,
                             transport: {
                                 read: {
                                     type: 'GET',
                                     url: url,
                                     dataType: "json" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                 }
                             }
                         });

                         if (kendoSourceData != undefined) {
                             deffer.resolve(kendoSourceData);
                         } else {

                             deffer.reject();
                         }


                     } else {
                         var currentTop = '';

                         if (top !== undefined) {
                             if (baseUrlListData.indexOf('?') >= 0)
                                 currentTop = "&take=" + top;
                             else
                                 currentTop = "?take=" + top;
                         }
                         var url = "";
                         if (!select) {
                             if (baseUrlListData.indexOf('?') >= 0)
                                 currentTop += "&select=*";
                             else
                                 currentTop += "?select=*";
                         } else {
                             if (baseUrlListData.indexOf('?') >= 0)
                                 currentTop += "&select=" + select
                             else
                                 currentTop += "?select=" + select;
                         };
                         url = baseUrlListData + nameGeneric + currentTop;
                         if (url.indexOf("?") >= 0) {
                             url = url + "&X-AUTH-TOKEN=" + authorization;
                         } else
                             url = url + "?X-AUTH-TOKEN=" + authorization;

                         $http({
                             method: 'GET',
                             url: url,
                             headers: {
                                 'Content-Type': 'application/json',
                                 'X-AUTH-TOKEN': authorization
                             }

                         }).then(function successCallback(response) {
                             if (response.status === 200) {

                                 var data = response.data;
                                 data.statResponse = true;
                                 deffer.resolve(data);
                             }
                         }, function errorCallback(response) {
                             var data = {
                                 "statResponse": false,
                             }
                             deffer.resolve(data);
                         });
                     }

                     return deffer.promise;

                 },


                 convertObjectLoadData: function(list, idItem) {
                     var data = _.filter(list, function(e) {
                         return e.id === idItem
                     })[0];

                     return data;
                 },
                 getDataNotGeneric: function(nameGeneric, kendoSource, isServerFiltering, top, filter, select) {

                     var deffer = $q.defer();
                     if (isServerFiltering === undefined)
                         isServerFiltering = false;
                     var arr = document.cookie.split(';')
                     var authorization = "";

                     for (var i = 0; i < arr.length; i++) {
                         var element = arr[i].split('=');
                         if (element[0].indexOf('authorization') > 0) {
                             authorization = element[1];
                         }
                     }
                     if (kendoSource) {
                         var currentTop = '';
                         if (top !== undefined)
                             if (baseUrlApiData.indexOf('?') >= 0)
                                 currentTop = "&take=" + top;
                             else
                                 currentTop = "?take=" + top;
                         if (!select) {
                             if (baseUrlApiData.indexOf('?') >= 0)
                                 currentTop += "&select=*";
                             else
                                 currentTop += "?select=*";
                         } else {
                             if (baseUrlApiData.indexOf('?') >= 0)
                                 currentTop += "&select=" + select
                             else
                                 currentTop += "?select=" + select;
                         };

                         var url = "";
                         url = baseUrlApiData + nameGeneric + currentTop;
                         if (url.indexOf("?") >= 0) {
                             url = url + "&X-AUTH-TOKEN=" + authorization;
                         } else
                             url = url + "?X-AUTH-TOKEN=" + authorization;
                         var kendoSourceData = new kendo.data.DataSource({
                             filter: filter,
                             serverFiltering: isServerFiltering,
                             transport: {
                                 read: {
                                     type: 'GET',
                                     url: url,
                                     dataType: "json" // "jsonp" is required for cross-domain requests; use "json" for same-domain requests
                                 }
                             }
                         });

                         if (kendoSourceData != undefined) {
                             deffer.resolve(kendoSourceData);
                         } else {

                             deffer.reject();
                         }


                     } else {
                         var currentTop = '';

                         if (top !== undefined) {
                             if (baseUrlApiData.indexOf('?') >= 0)
                                 currentTop = "&take=" + top;
                             else
                                 currentTop = "?take=" + top;
                         }
                         var url = "";
                         if (!select) {
                             if (baseUrlApiData.indexOf('?') >= 0)
                                 currentTop += "&select=*";
                             else
                                 currentTop += "?select=*";
                         } else {
                             if (baseUrlApiData.indexOf('?') >= 0)
                                 currentTop += "&select=" + select
                             else
                                 currentTop += "?select=" + select;
                         };
                         url = baseUrlApiData + nameGeneric + currentTop;
                         if (url.indexOf("?") >= 0) {
                             url = url + "&X-AUTH-TOKEN=" + authorization;
                         } else
                             url = url + "?X-AUTH-TOKEN=" + authorization;

                         $http({
                             method: 'GET',
                             url: url,
                             headers: {
                                 'Content-Type': 'application/json',
                                 'X-AUTH-TOKEN': authorization
                             }

                         }).then(function successCallback(response) {
                             if (response.status === 200) {

                                 var data = response.data;
                                 data.statResponse = true;
                                 deffer.resolve(data);
                             }
                         }, function errorCallback(response) {
                             var data = {
                                 "statResponse": false,
                             }
                             deffer.resolve(data);
                         });
                     }

                     return deffer.promise;

                 },
                 setObjCollectionForCheckbox: function(listGeneric, listTickGeneric, nameObjCollection) {

                     var arrResult = [];

                     for (var i = 0; i < listGeneric.length; i++) {
                         var obj = {
                             "noRec": "",
                             "isNilai": false
                         }

                         if (listGeneric[i].noRec != undefined) {
                             obj.noRec = listGeneric[i].noRec;
                         }

                         obj[nameObjCollection] = listGeneric[i];
                         arrResult.push(obj);
                     }

                     for (var i = 0; i < listTickGeneric.length; i++) {
                         var currentData = _.find(arrResult, function(arr) {
                             return arr[nameObjCollection].id == listTickGeneric[i].id;
                         });
                         var indexArray = _.indexOf(arrResult, currentData);

                         if (indexArray != -1) {
                             arrResult[indexArray].isNilai = true;
                         }
                     }

                     return arrResult;
                 },

                 setCheckedForListCheckbox: function(listCurrentData, listMaster, arrTick, nameObjCollection) {
                     for (var i = 0; i < listCurrentData.length; i++) {
                         for (var j = 0; j < listMaster.length; j++) {
                             if (listMaster[j].id == listCurrentData[i][nameObjCollection].id) {
                                 listMaster[j].isChecked = listCurrentData[i].isNilai;
                                 listMaster[j].noRec = listCurrentData[i].noRec;

                                 if (listMaster[j].isChecked) {
                                     arrTick.push(listMaster[j]);
                                 }
                             }
                         }
                     }
                 },

                 tickUntickCheckbox: function(data, currentArray) {
                     var isExist = _.find(currentArray, function(dataExist) {
                         return dataExist == data;
                     });

                     if (isExist == undefined) {
                         currentArray.push(data);
                     } else {
                         currentArray = _.without(currentArray, data);
                     }

                     return currentArray;
                 },

                 addCheckedAtribute: function(data, currentList) {
                     for (var i = 0; i < data.length; i++) {
                         currentList = data;
                         data[i].isChecked = false;
                     }

                     return data;
                 },

                 setTandaVitalCurrentData: function(listDataTandaVital, arrTandaVital) {
                     for (var i = 0; i < listDataTandaVital.length; i++) {
                         for (var j = 0; j < arrTandaVital.length; j++) {
                             if (listDataTandaVital[i].dataTandaVital.name == arrTandaVital[j].name) {
                                 arrTandaVital[j].nilai = listDataTandaVital[i].nilai;
                                 arrTandaVital[j].noRec = listDataTandaVital[j].noRec;
                             }
                         }
                     }

                     return arrTandaVital;
                 },

                 setTandaVitalForSend: function(masterTandaVital, arrTandaVital) {
                     var listDataTandaVital = [];
                     for (var i = 0; i < masterTandaVital.length; i++) {

                         var nilai = "";
                         var noRec = "";
                         var objDataTandaVital = "";

                         for (var j = 0; j < arrTandaVital.length; j++) {
                             if (arrTandaVital[j].name == masterTandaVital[i].name) {
                                 noRec = arrTandaVital[j].noRec;
                                 nilai = arrTandaVital[j].nilai;
                                 break;
                             }
                         }

                         if (masterTandaVital[i] != "") {
                             var obj = {
                                 "noRec": noRec,
                                 "nilai": nilai,
                                 "dataTandaVital": masterTandaVital[i]
                             }

                             listDataTandaVital.push(obj);
                         }
                     }

                     return listDataTandaVital;
                 },

                 initActiveMenu: function(data, role, noRecSoap, disableInput) {
                     /*helper list menu
                     [0] KeluhanUtama 
                     [1] Alergi
                     [2] RiwayatKesehatan
                     [3] RiwayatKelahiran
                     [4] RiwayatPsikososial
                     [5] PemeriksaanKesehatan
                     [6] RiwayatPemeriksaan
                     [7] SkriningNyeri
                     [8] AsesmenGiziAwal
                     [9] RiwayatLalu
                     [10] RiwayatImunisasiDasar
                     [11] RiwayatTumbuhKembang
                     [12] RiwayatKeluarga
                     [13] CapKakiBayi
                     [14] CatatanTindakanKeperawatan
                     [15] KebutuhanEdukasi
                     [16] MasalahKeperawatan
                     */

                     var arrMenu = [
                         "KeluhanUtama",
                         "Alergi",
                         "RiwayatKesehatan",
                         "RiwayatKelahiran",
                         "RiwayatPsikososial",
                         "PemeriksaanKesehatan",
                         "RiwayatPemeriksaan",
                         "SkriningNyeri",
                         "SkriningGizi",
                         "AsesmenGiziAwal",
                         "RiwayatLalu",
                         "RiwayatImunisasiDasar",
                         "RiwayatTumbuhKembang",
                         "RiwayatKeluarga",
                         "CapKakiBayi",
                         "CatatanTindakanKeperawatan",
                         "KebutuhanEdukasi",
                         "MasalahKeperawatan",
                         "PengkajianMedis",
                         "PemeriksaanFisik",
                         "InformasiIbu",
                         "StatusFungsional",
                         "SOAP"
                     ];
                     if (role === "operator" && noRecSoap === undefined) {
                         for (var i = 1; i < arrMenu.length; i++) {
                             data[arrMenu[i]] = true;
                         }
                         if (disableInput !== undefined)
                             disableInput = true;
                     }
                     if (role === "suster" && noRecSoap === undefined) {

                         for (var i = 1; i < arrMenu.length; i++) {
                             data[arrMenu[i]] = false;
                         }
                         data.PemeriksaanFisik = true;
                         data.KeluhanUtama = true;
                     } else if (role === "dokter" || noRecSoap !== undefined) {
                         for (var i = 0; i < arrMenu.length; i++) {
                             data[arrMenu[i]] = true;
                         }
                     }


                 },

                 setActiveMenu: function(data, namePage) {
                     data[namePage] = false;
                 },
                 setValidation:function(scope, listRawRequired){
                    var listFixRequired = [];
                    var msg = "";

                    for(var i=0; i<listRawRequired.length; i++){
                        var arr = listRawRequired[i].split("|");
                        var arrModel = arr[0].split(".");
                        var obj = {
                            ngModel : scope[arrModel[0]][arrModel[1]],
                            ngModelText : arr[0],
                            type : arr[1],
                            label : arr[2]
                        };

                        listFixRequired.push(obj);
                    }

                    for(var i=0; i<listFixRequired.length; i++){
                        if(listFixRequired[i].ngModel === undefined || listFixRequired[i].ngModel === ""){
                            this.cekValidation(listFixRequired[i].type, listFixRequired[i].ngModelText, false);
                            msg += listFixRequired[i].label + " tidak boleh kosong|";
                        }
                        else
                        {
                            this.cekValidation(listFixRequired[i].type, listFixRequired[i].ngModelText, true);
                        }
                    }

                    var result = {};
                    if(msg == ""){
                        result = {
                            status : true
                        };
                    }
                    else
                    {
                        result = {
                            status : false,
                            messages : msg
                        };
                    }

                    return result;
                 },

                 cekEnableDisableButton: function(buttonDisabled) {

                     if(!buttonDisabled)
                     {
                        var element = angular.element('[class="btnTemplate1"]');
                        element.addClass("button-disabled");
                     }
                     else
                     {
                        var element = angular.element('[class="btnTemplate1 button-disabled"]');
                        element.removeClass("button-disabled")
                     }
                 },

                 cekValidation: function(ngModelType, ngModelName, statusValidation) {
                     var element = angular.element('['+ngModelType+'="'+ngModelName+'"]');

                     if(!statusValidation)
                     {
                        element.addClass("validation-error");
                     }
                     else
                     {
                        element.removeClass("validation-error")
                     }
                 },

                 showMessages: function(messages){
                    var arrMsgError = messages.split("|");
                    for(var i=0; i<arrMsgError.length-1; i++){
                        window.messageContainer.error(arrMsgError[i]);
                    }
                 }
             };
         }
     ]);

     httpServices.service('GenericRequest', [
         function() {
             return function(fields, data, isServer, url, model) {
                 if (isServer === undefined)
                     isServer = false;
                 if (!isServer)
                     return new kendo.data.DataSource({
                         serverFiltering: isServer,
                         data: data,
                         schema: {
                             model: {
                                 fields: fields
                             }
                         }
                     });
                 else
                 if (url === undefined) {
                     var select = "";
                     for (var i in fields) {
                         if (select === "")
                             select += i;
                         else
                             select += "," + i;
                     }
                     return new kendo.data.DataSource({
                         serverFiltering: isServer,
                         serverPaging: true,
                         pageSize: 10,
                         transport: {
                             read: {
                                 type: 'GET',
                                 url: "Super/ListTable/?view=" + model + "&select=" + select,
                                 dataType: 'json',
                                 beforeSend: function(req) {

                                 }
                             },
                         },
                         schema: {
                             model: {
                                 fields: fields
                             }
                         }
                     });

                 } else
                     return new kendo.data.DataSource({
                         serverFiltering: isServer,
                         data: data,
                         schema: {
                             model: {
                                 fields: fields
                             }
                         }
                     });
             };
         }
     ]);

 });