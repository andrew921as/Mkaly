function listadoUsuarios(){
    $.ajax({
        url: "/json/",
        type:"get",
        dataType: "jsonp",
        success: function(response){
            console.log(response);
            },
            error: function(error){
            console.log(error);
        }
    });
}

$(document).ready(function (){
    listadoUsuarios();  
});