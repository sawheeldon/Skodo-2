/* global $ */

//global var


var userName;
var userID;

//login user


function loginUser(username, password) {
    $('p.error').empty();
    var q_string = {
        'username':username,
        'password':password
    };
    $.ajax({
            type:"POST",
            url:"/login",
            data: q_string,
            dataType:'json',
        })
        .done(function (result) { //this waits for the ajax to return with a succesful promise object
            //When successful, set globals from result object
            console.log("worked", result);
            userName = result.username;
            userID = result._id;
            if(result) {
                    //go to main page
                    mainDisplay(result);
            } else {
                    //Doesn't have a team yet, go to team builder so they can create a team
                    mainDisplay(result);
            }
        })
        .fail(function (jqXHR, error) {
                //User login was unsuccessful, due to pw/username combination was wrong
                $('p.loginErr').text("We're sorry, that username and password combination was incorrect.");
        });
}

// new user set up

function newUser(username, password) {
    $('p.error').empty();
    var q_string = {
        'username':username,
        'password':password
    };    
    $.ajax({
            type:"POST",
            url:"/users/create",
            data: q_string,
            dataType:'json',
        })
        .done(function (result) {
            //If successful, set some globals instead of using result object
            console.log("worked", result);
            userName = result.username;
            userID = result._id;
           
            if(result.username) {
                mainDisplay(result);
            } else {
                $('p.newLoginErr').text("Sorry, that is taken, try another username");
            }
        })
        .fail(function (jqXHR, error) { //this waits for the ajax to return with an error promise object
                $('p.newLoginErr').text("We're sorry, there was a system error, try again.");
        });
}


       function mainDisplay(result) {
        //   alert('here');
        $('#mainDisplay').css('display', 'block');
        $('#signLog').css('display', 'none');
}

//video search

var videoSearch = function (data) {
    //alert(query);
    var getResult = $("#team-name").val() + " football ";

    var html = "";

    $.getJSON("https://www.googleapis.com/youtube/v3/search", {
            part: "snippet",
            maxResults: 10,
            key: "AIzaSyAWblRjcTmS4TactzoaSQz-vhAQeXXb7as",
            q: getResult,
            type: "video"
        },
        function (data) {
            //console.log(data);
            if (data.pageInfo.totalResults == 0) {
                $('.errorMessage').html("Sorry there are no videos for your club, please try another one.");
            }
            displaySearchResults(data.items);
        });
    var displaySearchResults = function (videoArray) {
        var buildTheHtmlOutput = "";

        $.each(videoArray, function (videoArrayKey, videoArrayValue) {
            buildTheHtmlOutput += "<li>";
            buildTheHtmlOutput += "<h2>" + videoArrayValue.snippet.title + "</h2>";
            buildTheHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + videoArrayValue.id.videoId + "' target='_blank'>";
            buildTheHtmlOutput += "<img src='" + videoArrayValue.snippet.thumbnails.high.url + "' width='100%'/>";
            buildTheHtmlOutput += "</a>";
            buildTheHtmlOutput += "</li>";

        });
        $(".video-container ul").html(buildTheHtmlOutput);
    };
};



//*on click hide || show

//backButton

var backButton = function () {
  $('#backB').click(function() {
  $('#mainDisplay').show( 1, function() {
    // alert( "Animation complete." );
    $('.wholePage').show();
    $('.backButton').hide();
    $('.video-container').hide();
    $('.serieA').hide();
    $('.EPL').hide();
    $('#team-name').val("");
    $('#logos').css('display', 'block');
    $('#latestNewsArea').css('display', 'block');
  });
});
};

//italian league
var SerieA = function () {
    
            //new on serie A page

            var italyNews = function (data) {
              $.ajax({
                  type: 'GET',
                  url:'https://newsapi.org/v1/articles?source=football-italia&sortBy=latest&apiKey=9e6d16842a6b4368b4937a31ccf54035',
                  success: function(data){
                      console.log('success', data);
                      console.log(data);
                    
                      var itemResults = ' <div class="col-xs-12  latestItNewsT" id="latestItNewsTitle">'+ data.articles[1].title +'</div>';
                          itemResults += '<div class = "col-xs-12 latestItImage" id="latestItImageOne" style="background-image: url(' + data.articles[1].urlToImage + ')"></div>';
                          itemResults += ' <div class="col-xs-12 latestItNews" id="latestItNewsOne">'+ data.articles[1].description +'</div>';
                          itemResults += '<div class="col-xs-12 latestItNews" id="latestItNewsTwo">'+ data.articles[2].description +'</div>';
                          itemResults += '<div class="col-xs-12 latestItNews" id="latestItNewsThree">'+ data.articles[3].description +'</div>';
                          itemResults += '<div class="col-xs-12 latestItNews" id="latestItNewsFour">'+ data.articles[4].description +'</div>';
                          itemResults += '<div class="col-xs-12 latestItNews" id="latestItNewsFive">'+ data.articles[5].description +'</div>';
                      
                      $("#serieAPI").html(itemResults); 
                  }
                  }); 
            };
    
  $('#italyLogo').click(function() {
  $('.wholePage').hide( 1, function() {
    // alert( "Animation complete." );
    $('.backButton').show();
    $('.serieA').show();
    italyNews();
  });
});
};

//english league

var EPL = function () {
    
    //new on serie A page

            var englishNews = function (data) {
              $.ajax({
                  type: 'GET',
                  url:'https://newsapi.org/v1/articles?source=talksport&sortBy=top&apiKey=9e6d16842a6b4368b4937a31ccf54035',
                  success: function(data){
                      console.log('success', data);
                      console.log(data);
                    
                      var itemResults = ' <div class="col-xs-12 latestEnNewsT" id="latestEnNewsTitle">'+ data.articles[1].title +'</div>';
                          itemResults += '<div class = "col-xs-12 latestEnImage" id="latestEnImageOne" style="background-image: url(' + data.articles[1].urlToImage + ')"></div>';
                          itemResults += ' <div class="col-xs-12 latestEnNews" id="latestEnNewsOne">'+ data.articles[1].description +'</div>';
                          itemResults += '<div class="col-xs-12 latestEnNews" id="latestEnNewsTwo">'+ data.articles[2].description +'</div>';
                          itemResults += '<div class="col-xs-12 latestEnNews" id="latestEnNewsThree">'+ data.articles[3].description +'</div>';
                          itemResults += '<div class="col-xs-12 latestEnNews" id="latestEnNewsFour">'+ data.articles[4].description +'</div>';
                          itemResults += '<div class="col-xs-12 latestEnNews" id="latestEnNewsFive">'+ data.articles[5].description +'</div>';
                      
                      $("#englishAPI").html(itemResults); 
                  }
                  }); 
            };
    
  $('#englishLogo').click(function() {
  $('.wholePage').hide( 1, function() {
    // alert( "Animation complete." );
    $('.backButton').show();
    $('.EPL').show();
    englishNews();
  });
});
};

//news on main page API

var news = function (data) {
  $.ajax({
      type: 'GET',
      url:'https://newsapi.org/v1/articles?source=four-four-two&sortBy=top&apiKey=9e6d16842a6b4368b4937a31ccf54035',
      success: function(data){
          console.log('success', data);
          console.log(data);

          var latNewsOne = data.articles[0].description;
          var latNewsTwo = data.articles[1].description;
          var latNewsThree = data.articles[2].description;
          var latNewsFour = data.articles[3].description;
          var latNewsFive = data.articles[4].description;
          var latNewsSix = data.articles[5].description;
          var latNewsSeven = data.articles[6].description;

          document.getElementById("latestNewsOne").innerHTML = latNewsOne ;
          document.getElementById("latestNewsTwo").innerHTML = latNewsTwo ;
          document.getElementById("latestNewsThree").innerHTML = latNewsThree ;
          document.getElementById("latestNewsFour").innerHTML = latNewsFour ;
          document.getElementById("latestNewsFive").innerHTML = latNewsFive ;
          document.getElementById("latestNewsSix").innerHTML = latNewsSix ;
          document.getElementById("latestNewsSeven").innerHTML = latNewsSeven ;
      }
      }); 
};


$(document).ready(function() {
       //existing user
       $('#mainDisplay').hide();
          
            $('#existingUser').submit(function (event) {
                  event.preventDefault();
                  var username = $('input#username').val();
                  var password = $('input#password').val();
                  loginUser(username,password);
          });
          
         //new user   
            $('#newUser').submit(function (event) {
                // alert("here!!!");
                event.preventDefault();
                // var username = $('#username').val();
                // var password = $('#password').val();
                var username = $(this).find("input[name='username']").val();
                var password = $(this).find("input[name='password']").val();
                // console.log(password);
                if(!username && password) {
                    $('p.error').text("Must enter a username/password for a new user signup.");
                } else {
                    newUser(username, password);
                }
             });
             
        //video search submit
        
        $('#submitTeam').on("click", function (e) {
                e.preventDefault();
                // alert('working');
                $('.video-container').show();
                videoSearch();
                $('.backButton').show();
                $('#logos').css('display', 'none');
                $('#latestNewsArea').css('display', 'none');
    });
  
    $('.backButton').hide();
    $('.addtionalPages').hide();
    backButton();
    news();
    SerieA();
    EPL();
});