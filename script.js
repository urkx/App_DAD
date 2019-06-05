function getData(selector){
    var estadoTabla = document.getElementById('estadoTabla');
    var request = new XMLHttpRequest;
    request.open('GET', 'https://my-json-server.typicode.com/typicode/demo/posts');
    request.onload = function () {
        var data = JSON.parse(this.response);
    
        if(request.status >= 200 && request.status < 400){
            
                var columns = addAllColumnHeaders(data, selector);
              
                for (var i = 0; i < data.length; i++) {
                  var row$ = $('<tr/>');
                  for (var colIndex = 0; colIndex < columns.length; colIndex++) {
                    var cellValue = data[i][columns[colIndex]];
                    if (cellValue == null) cellValue = "";
                    row$.append($('<td/>').html(cellValue));
                  }
                  $(selector).append(row$);
                }
             estadoTabla.innerHTML += 'Datos cargados correctamente';

        }else{
           estadoTabla.innerHTML += 'No se pudieron cargar los datos';
        }
    };
    request.onerror = function(){
        estadoTabla.innerHTML += 'Fallo de conexión';
    }
    request.send();
}

function addAllColumnHeaders(myList, selector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');
  
    for (var i = 0; i < myList.length; i++) {
      var rowHash = myList[i];
      for (var key in rowHash) {
        if ($.inArray(key, columnSet) == -1) {
          columnSet.push(key);
          headerTr$.append($('<th/>').html(key));
        }
      }
    }
    $(selector).append(headerTr$);
  
    return columnSet;
  }


function sendForm(){
    /*var output = document.getElementById("output");
    var postRequest = new XMLHttpRequest();
    var id = document.getElementById('id').value;
    var titulo =document.getElementById('titulo').value;
    var json = '{"id": ' + id + ',' +
    '"title": ' + titulo + '}';
    postRequest.open("PUT", 'https://my-json-server.typicode.com/typicode/demo/posts');
    postRequest.send(json);
    postRequest.onerror = function(){alert('fallo');}
    if(postRequest.status == 200){
        output.innerHTML += "Añadida";
    }else{
        output.innerHTML += "Error" + postRequest.status + json;
    }*/
    var output = document.getElementById("output");
    var id = document.getElementById('id').value;
    var titulo =document.getElementById('titulo').value;
    var json = '{"id": ' + id + ',' +
    '"title": ' + titulo + '}';
    $.ajax({
      url: 'https://my-json-server.typicode.com/typicode/demo/posts',
      type: 'POST',
      success: function(json){
        output.innerHTML += JSON.stringify(json);
      },
      data: json,
      error: function(){
        output.innerHTML += 'Fallo';
      }
    });
  }