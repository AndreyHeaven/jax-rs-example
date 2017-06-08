/**
 * Created by araigorodskiy on 08.06.2017.
 */
var ddd2 = angular.module("App", []);
function addressController($scope){
    $scope.newContact = function(){ //add new record in database
        var addItem = document.querySelector('.addItem');
        if(!addItem.querySelector('.fname').value || !addItem.querySelector('.phone').value){
            if(!$scope.fname) addItem.querySelector('.fname').classList.add('bg-danger');
            if(!$scope.phone) addItem.querySelector('.phone').classList.add('bg-danger');
            return false;
        }
        addItem.querySelector('.fname').classList.remove('bg-danger');
        addItem.querySelector('.phone').classList.remove('bg-danger');
        $scope.list.push({
            fname: addItem.querySelector('.fname').value,
            surname: addItem.querySelector('.surname').value,
            phone: addItem.querySelector('.phone').value,
            group: addItem.querySelector('.group').options[addItem.querySelector('.group').selectedIndex].value
        });
        addItem.querySelector('.fname').value ='';
        addItem.querySelector('.surname').value ='';
        addItem.querySelector('.phone').value ='';
        addItem.querySelector('.group').selectedIndex =0;
        addItem.style.display ='none';

    };
    $scope.removeContact = function(item){
        for(var i in $scope.list) if($scope.list[i] === item)
            $scope.list.splice(i, 1);
    };
    $scope.notSpam = function(listItem){
        listItem.group = listItem.groupSaved;
        delete listItem.groupSaved;
    };
    $scope.toggleAddForm = function(){
        var addItem = document.querySelector('.addItem');
        addItem.style.display = addItem.style.display =='block' ?'none':'block';
    };
};
function addressEditController($scope){ //edit record in database
    $scope.editorEnabled = false;

    $scope.enableEditor = function(){
        $scope.editorEnabled = true;
        this.fname = this.listItem.fname;
        this.surname = this.listItem.surname;
        this.phone = this.listItem.phone;
        this.group = this.listItem.group;
    };
    $scope.disableEditor = function(){
        $scope.editorEnabled = false;
    };
    $scope.save = function(){
        if(this.fname =='')
            return false;
        this.listItem.fname = this.fname;
        this.listItem.surname = this.surname;
        this.listItem.phone = this.phone;
        this.listItem.group = this.group;
        $scope.disableEditor();
    };
    $scope.toSpa = function(){
        $scope.listItem.groupSaved = $scope.listItem.group;
        $scope.listItem.group ='spam';
    };
};