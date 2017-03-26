$(document).ready(function(){
    $("#searchinput").val("");
    $('.wrapper').append("<div class='content'></div>");
    $('.content').fadeOut(0);
    // $('.content').css({"height":"0", "opacity":"0"});
    // $('.content').hide();
});

var apiURL = "https://en.wikipedia.org/w/api.php";
var wikiURL = "https://en.wikipedia.org/wiki/";
var emptySearch = false;

$('.magnify').on('click', function(){
    ajaxQuery();
});
$('#searchinput').keypress(function(e){
    if(e.which === 13){
        ajaxQuery();
        return false;
    }
});

function successCallback(data){
    if(!emptySearch){
        $('.searchbutton').fadeOut(50);
    }
    $('.content').empty();
    // $('html').append(JSON.stringify(data));

    data.query.search.forEach(function(data, index){
        var title = data.title;
        var snippet = data.snippet;

        $('.content').append("<a href='"+wikiURL+title+"' target='_blank'><div class='resultmodal'>"+
        "<div class='title'>"+title+"</div>"+
        "<div class='snippet'>"+snippet+"...</div>"+
        "</div></a>");
    });
    // $('.content').fadeIn(200);
    console.log("butt");
    $('.content').fadeIn(200);
    $('.content').css({"height":"75%"});
    $('.content').scrollTop(0);

    // $('.searcher').css({'margin-top':'-80%'});

    // $('.searchtitle').css({'flex-grow':'1'})
    // $('.searchfield').css({'flex-grow':'1'})
    // $('.searchbutton').css({'flex-grow':'1'})

    // $('.title').append(data.query.search[0].title);
    // $('.snippet').append(data.query.search[0].snippet+"...");
}
function errorCallback(err){
    console.log(err);
}

function ajaxQuery(){

    if($('#searchinput').val() === ''){
        $('.searchbutton').fadeIn(200);
        emptySearch = true;
    }else if($('#searchinput').val()){
        emptySearch = false;
    }

    // $('.content').empty();
    var jsonData = {
        "action":"query",
        "list":"search",
        "srsearch":$('#searchinput').val(),
        "format":"json",
    };
    console.log(JSON.stringify(jsonData));
    $.ajax({
        // type:"POST",
        dataType:"jsonp",
        url:apiURL,
        data:jsonData,
        success:successCallback,
        error:errorCallback
    });
    console.log("ass");
    $('.content').fadeOut(200);
    $('.content').css({"height":"0"});
}
