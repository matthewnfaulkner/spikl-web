  // Initialize app and store it to myApp variable for futher access to its methods
var myApp = new Framework7({
});

// We need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

myApp.loginScreen();

$$("#addLangModal").on('click', function(event){
  if(event.target == $$('#addLangModal')[0]){
    $$('.modal-overlay.modal-overlay-visible')[0].className = 'modal-overlay modal-overlay-invisible';
    $$('.add-new-lang-cont').addClass("invisible");
    $$('.add-note-input-cont').addClass("invisible");
    $$('.change-lang-cont').addClass("invisible");
  }
})
var name = "Nickssy1";
var passd = "Shebssa123"
var sid = "";
  document.getElementById("custom-overlay").style.display = "none";

function stripSpecialChar(string){
  var result = string.replace(/-| |\+|\$|£|\^|&|\*|\)|\}|\#|>|\:|@\||\"|'/g, "");
  if(string != result){
    return false;
  }
  else{
    return true;
  }
}

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(york.ac.uk)$/;
  return re.test(email);
}

//login("mf840@york.ac.uk", "Password1");
function login(email, pword){
  var nonce ="";
  var salt;
  if(pword.length < 6){
    $$('.signin-error')[0].innerHTML = "Password must be 6 or more characters";
    return;
  }
  $$.ajax({
      type: "POST",
      url: 'http://www.spikl.co.uk/login.php',
      data: {'functionName': 'getSalt', 'email' : email},
      success: function(response) {
          salt = response;
          var saltHash = SHA512(pword + salt);
          var newSaltHash = SHA512(pword + salt);
          salty = salt;
          $$.ajax({
              type: "POST",
              url: 'http://www.spikl.co.uk/login.php',
              data: {'functionName': 'checkAndUpdate', 'saltHash': saltHash, 'newSaltHash' : newSaltHash, 'salt' : salt, 'email': email},
              success: function(response) {
                  console.log(response);
                  result = response.split(" ");
                  console.log(sid);
                  if(result[0] == 'true'){
                    sid = result[1];
                    $$('.signin-error')[0].innerHTML = "";
                    console.log("logged in");
                    myApp.closeModal();
                    myApp.closeModal('.popup-signup');
                    fetchLangFromServer();
                    return true;
                  }
                  else{
                    $$('.signin-error')[0].innerHTML = "Invalid username or password";
                    console.log("Denied")
                    return false;
                  }
              }
          });
      }
  });
}
$$('.login-button').on('click', function(){
  login($$('#login-username').val(), $$('#login-password').val());
});

$$('#email-check-cross').on('click', function(){
  if(!$$('#email-rulez').hasClass("active")){
    $$('#email-rule-text')[0].style.display = "block";
  }
  else{
    $$('#email-rule-text')[0].style.display = "none";
  }
  $$('#email-rulez').toggleClass("active");
});

$$('#password-check-cross').on('click', function(){
  if(!$$('#password-rulez').hasClass("active")){
    $$('#password-rule-text')[0].style.display= "block"
  }
  else{
    $$('#password-rule-text')[0].style.display= "none";
  }
  $$('#password-rulez').toggleClass("active");
});

$$('#password-ver-check-cross').on('click', function(){
  if(!$$('#password-ver-rulez').hasClass("active")){
    $$('#password-ver-rule-text')[0].style.display= "block"
  }
  else{
    $$('#password-ver-rule-text')[0].style.display= "none";
  }
  $$('#password-ver-rulez').toggleClass("active");
});

$$('#signup-email').on('keyup', function(){
  email = $$('#signup-email').val();
  if(!validateEmail(email)){
    console.log("dasd");
    $$('#email-rule-text')[0].innerHTML = "Invalid Email";
    displayWarning("#email")
  }
  /*stripSpecialChar(userName);
  if(userName.length < 4 || userName.split(" ").length > 1){
    $$('#username-rule-text')[0].innerHTML = "UserName must be contain 6 or more characters";
    displayWarning("#username")
      }
  else{
    if(!stripSpecialChar(userName)){
      $$('#username-rule-text')[0].innerHTML = "Characters allowed: a..z, A..Z, 0-9, _";
      displayWarning("#username");
    }*/
  else{
    displayLoading("#email");
  $$.ajax({
      type: "POST",
      url: 'http://www.spikl.co.uk/signUp.php',
      data: {'functionName': 'checkEmail', 'email': email},
      success: function(response) {
          console.log(response);
          if(response == "true"){
            $$('#email-rule-text')[0].innerHTML = "email already in Use";
            displayWarning('#email');
          }
          else if(response == "false"){
            displayTick('#email');
          }
        }
      });
    }

});

$$('#signup-password').on('keyup', function(){
    console.log($$('#signup-password').val());
    password = $$('#signup-password').val();
    passwordVer = $$('#signup-password-ver').val();
    var numbers = password.match(/\d+/g);
    if(password != passwordVer){
      displayWarning("#password-ver");
      $$('#password-ver-rule-text')[0].innerHTML = "Passwords do not match";
    }
    if(password.length < 6 || (password == password.toLowerCase()) || !numbers){

      $$('#password-rule-text')[0].innerHTML = "Password must be contain 6 or more characters and both a capital letter and number";
      displayWarning("#password");
          return;
    }
    else{
      if(!stripSpecialChar(password)){
        $$('#password-rule-text')[0].innerHTML = "Characters allowed: a..z, A..Z, 0-9, _";
        displayWarning("#password");
      }
      else{
        displayTick("#password");
      }
    }

});

$$('.signup-button').on("click", function(){
  console.log($$('#imgInput')[0].files);
  var formData = new FormData($$('#signUpForm')[0]);
  console.log($$('#signUpForm'));
  var dataSend = {"functionName": "signUp", "email" : "", "first" : "", "last" : "", "password": "", "salt": "", "dob": "" , "gender": "", "study" : "", "nationality": "", "course" : "", "pic": ""};
  if($$("#email-check-cross").hasClass("tick")){
    dataSend["email"] = $$('#signup-email').val();

  }
  else{
    $$('.signup-form-error')[0].style.opacity = "1";
    return;
  }
  dataSend["first"] = $$('#signup-first').val();
  dataSend["last"] = $$('#signup-last').val();
  dataSend["dob"] = $$('#signup-dob').val();
  dataSend["gender"] = $$('#signup-gender').val();
  dataSend["course"] =  $$('#signup-course').val();
  dataSend["nationality"] = $$('#signup-nationality').val();
  console.log($$('.signup-pic-cont'));
  dataSend["pic"] = $$('.signup-pic-cont')[0].style.backgroundImage;
  if($$("#password-check-cross").hasClass("tick") && $$("#password-ver-check-cross").hasClass("tick") ){
    var pword = $$('#signup-password').val();
    var salt = "";
    $$.ajax({
        type: "POST",
        url: 'http://www.spikl.co.uk/login.php',
        data: {'functionName': 'getFreshSalt'},
        success: function(response) {
            salt = response;
            var saltHash = SHA512(pword + salt);
            dataSend["password"] = saltHash;
            dataSend["salt"] = salt;
            formData.append("password", saltHash);
            formData.append("salt", salt);
          $$.ajax({
              type: "POST",
              url: 'http://www.spikl.co.uk/signUp.php',
              data: formData,
              success: function(response) {
                  console.log(response);
                  //login(dataSend["email"], pword);

                }
              });
            }
        });
    }
});

$$('#signup-password-ver').on('keyup', function(){
    passwordVer = $$('#signup-password-ver').val();
    password = $$('#signup-password').val();
    if(password != passwordVer || !$$('#password-check-cross').hasClass("tick")){
      $$('#password-ver-rule-text')[0].innerHTML = "Passwords do not match";
      displayWarning("#password-ver");
          return;
    }
    else{
        displayTick("#password-ver");
    }

});

function displayTick(id){
  $$(id + '-rulez')[0].style.display = "block";
  $$(id + '-load')[0].style.display = "none";
  $$(id + '-check-cross')[0].style.display = "block";
  $$(id + '-check-cross')[0].innerHTML = "check_round_fill";
  if($$(id + '-check-cross').hasClass("cross")){
    $$(id + '-check-cross').toggleClass("cross");
  }
  $$(id + '-check-cross').addClass("tick");
}

function displayWarning(id){
  $$(id + '-rulez')[0].style.display = "block";
  $$(id + '-load')[0].style.display = "none";
  $$(id + '-check-cross')[0].style.display = "block";
  $$(id + '-check-cross')[0].innerHTML = "close_round_fill";
  if($$(id + '-check-cross').hasClass("tick")){
    $$(id + '-check-cross').toggleClass("tick");
  }
  console.log("here");
  $$(id + '-check-cross').addClass("cross");
}

function displayLoading(id){
  $$(id + '-rulez')[0].style.display = "none";
  $$(id + '-load')[0].style.display = "block";
  $$(id + '-check-cross')[0].style.display = "none";
  $$(id + '-check-cross')[0].innerHTML = "circle";
  if($$(id + '-check-cross').hasClass("cross")){
    $$(id + '-check-cross').toggleClass("cross");
  }
  $$(id + '-check-cross').addClass("loading");

}

$$('.signup').on('click', function(){
  var popupSignUp = myApp.popup('.popup-signup', function(){
  });
});

// Add view
var mainView = myApp.addView('.view-main', {
  // Because we want to use dynamic navbar, we need to enable it for this view:
  dynamicNavbar: true
});

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
    console.log(navigator.camera);

}

var mainPageSwiper = myApp.swiper('.main-page-swiper', {
  spaceBetween: 0,
  slidesPerView: 4,
  freeModeMomentum: true,

});

var imagev = new Image();
imagev.onload = function(){
   imagev.src = this.src;
};
imagev.src = "img/nicky.jpeg";

var profilePageSwiper;
$$('.increase-lang-prof').on('click', function () {
      var progress = document.getElementById("change-lang-prof");
      var index = profilePageSwiper.clickedIndex;
      if(myLanguages[index].prof < 10){
          myLanguages[index].prof += 1;
      }
      progress.className ="c100 big orange up p" + 10* myLanguages[index].prof;


  });

  $$('.decrease-lang-prof').on('click', function () {
      var progress = document.getElementById("change-lang-prof");
      var index = profilePageSwiper.clickedIndex;
      if(myLanguages[index].prof > 0){
          myLanguages[index].prof -= 1;
      }
      if(myLanguages[index].prof == 5){
          progress.className ="c100 down big orange up p" + 10* myLanguages[index].prof;
      }
      else{
          progress.className ="c100 big orange up p" + 10* myLanguages[index].prof;
          }
  });

  $$('.submit-lang-update').on('click', function () {

      $$('.modal-overlay.modal-overlay-visible')[0].className = 'modal-overlay modal-overlay-invisible';
      $$('.change-lang-cont').addClass('invisible');
      updateLanguageProf();
  });

  $$('.submit-new-lang').on('click', function () {
      $$('.modal-overlay.modal-overlay-visible')[0].className = 'modal-overlay modal-overlay-invisible';
      $$('.add-new-lang-cont')[0].addClass('invisible');
      var language = $$('#autocomplete-dropdown')[0].value;
      var id = "lang-ring" + profilePageSwiper.clickedIndex;
      profilePageSwiper.clickedSlide.innerHTML = ('<div class="assigned c100 p0 orange lang-ring" id="' + id + '"> <span>' + language + '</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div>')
      var newLang = {"name" : language, "prof": 0};
      myLanguages.push(newLang);
      console.log(language);
      $$.ajax({
          type: "POST",
          url: 'http://www.spikl.co.uk/updateUser.php',
          data: {'sid': sid, "language" : language},
          success: function(response) {
              console.log(response);

          }
      });

  });

  function updateLanguageProf(){
      var activeLang = document.getElementById("lang-ring" + profilePageSwiper.clickedIndex);
      activeLang.className = "c100 orange assigned p" + 10* myLanguages[profilePageSwiper.clickedIndex].prof + " lang-ring";

  }
  var currentPopupUserEmail = "";

$$('#home').on('show', function () {
  console.log("hjhj");
});

$$('#profile').on('show', function () {
  loadLanguageProf();
    profilePageSwiper = myApp.swiper('.profile-page-swiper', {
    spaceBetween: 0,
    slidesPerView: 3,
    freeModeMomentum: true,
    loop: false,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev'
    });






    profilePageSwiper.on('DoubleTap', function(){
        var id = "lang-ring" + profilePageSwiper.clickedIndex;
        var activeLang = document.getElementById(id);
        $$('.modal-overlay.modal-overlay-invisible')[0].className = 'modal-overlay modal-overlay-visible';
        if($$('#' + id).hasClass("assigned")){
            $$('.change-lang-cont.invisible').toggleClass('invisible');
            var progress = document.getElementById("change-lang-prof");
            progress.childNodes[1].innerHTML = myLanguages[profilePageSwiper.clickedIndex].name;
            progress.className = "c100 p0 big orange p" + 10 * myLanguages[profilePageSwiper.clickedIndex].prof;
        }
        else if($$('#' + id).hasClass("vacant")){
            $$('.add-new-lang-cont').toggleClass('invisible');
        }

    });

    var fruits = ('Afrikaans Albanian Amharic Arabic Bahasa Bengali Bosnian Bravanese Bulgarian Catalan Chinese Croatian Czech Danish Dutch Estonian English Farsi Finnish French German Greek Gujarati Haitian Creole Hebrew Hindi Hmong Hungarian Icelandic Italian Japanese Javanese Kashmiri Kazakh Khmer Korean Laotian Latvian Lithuanian Macedonian Malay Malayalam Mandinka Marathi Norwegian Oromo Polish Portuguese Punjabi Romanian Russian Serbian Sinhalese Slovak Somali Spanish (Iberian) Spanish (Latin) SudaneseArabic Swedish Tagalog Tamil Telegu Thai Turkish Ukrainian Urdu Vietnamese').split(' ');

    var autocompleteDropdownSimple = myApp.autocomplete({
        input: '#autocomplete-dropdown',
        openIn: 'dropdown',
        source: function (autocomplete, query, render) {
            var results = [];
            if (query.length === 0) {
                render(results);
                return;
            }
            // Find matched items
            for (var i = 0; i < fruits.length; i++) {
                if (fruits[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(fruits[i]);
            }
            // Render items by passing array with result items
            render(results);
        }
    });

    function onSuccess(imageURI) {
            var image = document.getElementById('myImage');
            image.src = imageURI;
        }
    function onFail(message) {
            alert('Failed because: ' + message);
        }

    $$('.change-profile-pic').on('click', function(){
        openFilePicker();
    });

    function openFilePicker() {

        var srcType = Camera.PictureSourceType.SAVEDPHOTOALBUM;
        var options = setOptions(srcType);

        navigator.camera.getPicture(function cameraSuccess(imageUri) {

                $$('#main-profile-pic').css('background-image', 'uri(' +  imageUri + ')');
                pic = imageURI;
        // Do something

        }, function cameraError(error) {
        console.debug("Unable to obtain picture: " + error, "app");

        }, options);
    };

    function setOptions(srcType) {
    var options = {
        // Some common settings are 20, 50, and 100
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        // In this app, dynamically set the picture source, Camera or photo gallery
        sourceType: srcType,
        encodingType: Camera.EncodingType.JPEG,
        mediaType: Camera.MediaType.PICTURE,
        allowEdit: true,
        correctOrientation: true  //Corrects Android orientation quirks
    };
    return options;
    };


});


     var languages = ('Afrikaans Albanian Amharic Arabic Bahasa Bengali Bosnian Bravanese Bulgarian Catalan Chinese Croatian Czech Danish Dutch Estonian English Farsi Finnish French German Greek Gujarati Haitian Creole Hebrew Hindi Hmong Hungarian Icelandic Italian Japanese Javanese Kashmiri Kazakh Khmer Korean Laotian Latvian Lithuanian Macedonian Malay Malayalam Mandinka Marathi Norwegian Oromo Polish Portuguese Punjabi Romanian Russian Serbian Sinhalese Slovak Somali Spanish (Iberian) Spanish (Latin) SudaneseArabic Swedish Tagalog Tamil Telegu Thai Turkish Ukrainian Urdu Vietnamese').split(' ');
     var locations = ('York London Birmingham Manchester').split(' ');
     var searchTerm = {"language": "", "location": "", "name": ""};

var users = [];
var friends = [];
friends["nadc500@york.ac.uk"] = {"name" : "nicky", "pic" :"img/nicky.jpeg"};
var myLanguages =  [];
var myConversations = [];


     var autocompleteDropdownSimple = myApp.autocomplete({
        input: '#autocomplete-dropdown-search-page',
        openIn: 'dropdown',
        source: function (autocomplete, query, render) {
            var results = [];
            if (query.length === 0) {
                render(results);
                return;
            }
            // Find matched items

            if ($$('#autocomplete-dropdown-search-page').hasClass("language")){
                for (var i = 0; i < languages.length; i++) {
                    if (languages[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(languages[i]);
                }
            }
            else if ($$('#autocomplete-dropdown-search-page').hasClass("location")){
                for (var i = 0; i < locations.length; i++) {
                    if (locations[i].toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(locations[i]);
                }
            }
            // Render items by passing array with result items
            render(results);
        },
        onChange: function (autocomplete, value) {
          users = [];
          searchByLang(value);
        }
    });

    function searchByLang(value){
      $$('#search-page-list')[0].innerHTML = "";
      $$.ajax({
          type: "POST",
          url: 'http://www.spikl.co.uk/search.php',
          data: {'functionName': 'searchByLang', 'lang': value, "sid" : sid},
          success: function(response) {
              console.log(response);
              var parseResponse = JSON.parse(response);
              for(var i in parseResponse){

                var lang = parseResponse[i]["languages"];
                var prof = parseResponse[i]["languages"];
                var first = parseResponse[i]["firstName"];
                var last = parseResponse[i]["lastName"];
                var pic = parseResponse[i]["pic"];
                var email = parseResponse[i]["email"];
                var newUser = {"firstName" : first, "lastName" : last, "languages" : lang, "pic" : pic, "email": email }

                users[[email]] = newUser;
                $$('#search-page-list').append(buildSearchItem(email));
              }


          }
      });
    }

        // Loading flag
    var loading = false;

    // Last loaded index
    var lastIndex = $$('.list-block li').length;

    // Max items to load
    var maxItems = 6;

    // Append items per load
    var itemsPerLoad = 3;
    $$('#search-bar-input').on('keyup', function()  {
        $$('#search-page-list')[0].innerHTML = "";
        searchTerm.name = $$('#search-bar-input')[0].value;
         for(var i = 0; i < maxItems; i++){
            if(users[i].name.toLowerCase().indexOf(searchTerm.name.toLowerCase()) >= 0){
                //$$('#search-page-list').append(buildSearchItem(i));
                $$('#search-page-list')[0].childNodes[$$('.search-li').length-1].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].childNodes[0].style.backgroundImage = "url('" + users[i].pic + "')";
            };
        }


    });


    $$('#search-bar-language').on('click', function() {

        $$('#search-bar-language').toggleClass("active");
        $$('#search-bar-location').removeClass("active");
        $$('#autocomplete-dropdown-search-page').removeClass("location");
        $$('#autocomplete-dropdown-search-page').toggleClass("language");
        $$('.autocomplete-dropdown-search-page').attr('placeholder','Language');
        $$('.autocomplete-dropdown-search-page')[0].value = "";

    });

    $$('#search-bar-location').on('click', function() {
        $$('#search-bar-location').toggleClass("active");
        $$('#search-bar-language').removeClass("active");
        $$('#autocomplete-dropdown-search-page').toggleClass("location");
        $$('#autocomplete-dropdown-search-page').removeClass("language");
        $$('.autocomplete-dropdown-search-page').attr('placeholder','Location');
        $$('.autocomplete-dropdown-search-page')[0].value = "";

    });

    $$('#autocomplete-dropdown-search-page').on('close', function() {
        $$('#search-page-list')[0].innerHTML = "";
        $$.ajax({
            type: "POST",
            url: 'http://www.spikl.co.uk/search.php',
            data: {'functionName': 'searchByLang', 'lang': 'Eng'},
            success: function(response) {
                var parseResponse = JSON.parse(response);
                console.log(parseResponse);
                for(var i in parseResponse){

                  var lang = parseResponse[i]["languages"];
                  var first = parseResponse[i]["firstName"];
                  var last = parseResponse[i]["lastName"];
                  var pic = parseResponse[i]["pic"];
                  var email = parseResponse[i]["email"];
                  var prof;
                  var newUser = {"firstName" : first, "lastName" : last, "languages" : lang, "pic" : pic, "email" : email }

                  users[[email]] = newUser;
                  $$('#search-page-list').append(buildSearchItem(email, prof));
                }


            }
        });
      /*  if($$('#autocomplete-dropdown-search-page').hasClass("language")){
            searchTerm.language = $$('#autocomplete-dropdown-search-page')[0].value;
            for(var i = 0; i < maxItems; i++){
               for(var j =0; j< users[i].languages.length; j++){
                    if(users[i].languages[j].name.toLowerCase().indexOf(searchTerm.language.toLowerCase()) >= 0){
                        $$('#search-page-list').append(buildSearchItem(i));
                        };
                    }
            }
        }
        else if($$('#autocomplete-dropdown-search-page').hasClass("location")){
            searchTerm.location = $$('#autocomplete-dropdown-search-page')[0].value;
            for(var i = 0; i < maxItems; i++){
                    if(users[i].Uni.toLowerCase().indexOf(searchTerm.location.toLowerCase()) >= 0){
                        $$('#search-page-list').append(buildSearchItem(i));
                        };
            }
        }*/

    });
    $$('#search-page-list').on("click", "li", function(event){


        if (!$$(this).hasClass("active")){
            $$(this)[0].childNodes[1].className = "search-item-prof shown";
            }
        else{
            $$(this)[0].childNodes[1].className = "search-item-prof";
        }
        $$(this).toggleClass("active");


    });

    $$('#search-page-list').on("click", "i", function(){
        var parent = $$(this)[0].parentNode.parentNode;
        var id = parent.id.split(" ");
        var index = id[1];
        var popupUser = myApp.popup('.popup-user', function(){

        });
        var popupPageSwiper = myApp.swiper('.popup-page-swiper', {
                spaceBetween: 0,
                slidesPerView: 3,
                freeModeMomentum: true,
                loop: false,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev'
                });
        popupPageSwiper.removeAllSlides();
        currentPopupUserEmail = users[index].email;
        console.log(users[index].email);
        $$('#popup-main-profile-pic')[0].style.backgroundImage = "url('" + users[index].pic + "')";
        $$('#popup-name')[0].innerHTML = users[index].firstName + " " + users[index].lastName ;
        //$$('#popup-uni')[0].innerHTML = users[index].Uni;
        for(var i = 0; i < users[index].languages.length; i++){
            popupPageSwiper.appendSlide('<div class="swiper-slide"><div class="vacant c100 p' + 20* users[index].languages[i].prof + ' orange lang-ring" id="popup-lang-ring0"><span>' + users[index].languages[i].name +'</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>');
        };
    });

    function buildSearchItem(index, prof){
        var html = "";
        searchTerm.language = "Eng";

        html += '<li class="item-content search-li" id ="search-item ' + index + '"><div class="item-input"><table><tr><td><div  class="c100 p' + 20*prof +' big orange search-item-ring" ><span class="search-item-img-span"><img class="search-item-img" src="' + users[index].pic + '">    </span><div class="slice" ><div class="bar"></div><div class="fill"></div></div></div></td> <td class="search-item-outer-right-cell"><div><p class="search-item-text search-item-name">';
        html += users[index].firstName + " " + users[index].lastName ;
        html += '</p><p class="search-item-text search-item-uni">';
        html += "York";
        html += '</p></div><table><tr>';
        for(var i =0; i < users[index].languages.length; i++){
            html+= '<td class="search-item-inner-bottom-cell"><div class="c100 p' + (20 * users[index].languages[i].prof) +  ' big orange search-item-inner-ring"  ><span>' + users[index].languages[i].name + '</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></td>';
        }
        html += '</tr></table></td></tr></table></div><a href="#" class="search-item-prof"><i class="f7-icons search-item-icon">person<i></a></li>';
        return html;
    }

$$('#floating-button-chat').on('click', function(){
    activeUserEmail=currentPopupUserEmail;
    for(var i in myConversations){
      if(currentPopupUserEmail in myConversations){
          loadPopupChat(activeUserEmail);
          loadConversation(activeUserEmail);
          myApp.showTab('#messenger');
          return;
        }
    }
    getNewConversation(activeUserEmail);
    loadPopupChat(activeUserEmail);
    myApp.showTab('#messenger');
})

var myMessages = "";
var messageList = [];
var notes = [];
notes[""] = [];
notes["nadc500@york.ac.uk"] = []
for(var i =0; i< 1000; i++){
  notes["nadc500@york.ac.uk"].push({'name' : 'nicky', 'title': "", "body": "hello" + i, "date": ""});
}

$$('#messenger').on('show', function () {
    $$('#chat-page-list')[0].innerHTML = "";
    console.log(myConversations);
     for(var i in myConversations){
       var body, date, time = "";
       if(myConversations[i]["chat"].length > 0){
        var body = myConversations[i]["chat"][0]["body"]
        var date = new Date(0);
        date.setUTCSeconds(myConversations[i]["chat"][0]["date"]);
        time = getTime(date);
      }
        var firstName = myConversations[i]["firstName"];
        var pic = myConversations[i]["pic"]
        messageList.push(myConversations[i]["email"]);
        $$('#chat-page-list').append(buildConvItem(firstName, body, time, pic, i));

     }
});

 function buildConvItem(name, message, time, pic, id){
   var html = "";
   html += '<li id="chat-list-item_' + id + '" class="item-content chat-list-item"><div class="item-input chat-list-input"><table><tr><td><div class="chat-profile-pic"><img class="chat-profile-pic" src="' + pic + '"></img></div></td><td class="chat-item-outer-cell"><table><tr><td class="chat-item-inner-name-cell">';
   html += name;
   html += '</td><td class="chat-item-inner-time-cell">';
   html += time;
   html += '</td></tr></table><div class="chat-item-message-cont">';
   html += message;
   html += '</div></td></tr></table></div></li>';
   return html;
 }

function getNewConversation(email){
   $$.ajax({
       type: "POST",
       url: 'http://www.spikl.co.uk/chat.php',
       data: {'sid': sid, 'functionName' : "getNewConvo", "email" :  email},
       success: function(response) {
             var parseResponse = JSON.parse(response);
             var newConvo = {"email" : email, "firstName" : parseResponse["firstName"], "chat" : [] , "pic" : parseResponse["avatar"]};
             myConversations[[email]] = newConvo;
             messageList.unshift(email);
             $$('#chat-page-list').prepend(buildConvItem(parseResponse["firstName"], "" , "",  parseResponse["avatar"], email));
             return;
           }

   });
}

function receiveNewConversation(email, messageText, messageType, messageDate){
  $$.ajax({
      type: "POST",
      url: 'http://www.spikl.co.uk/chat.php',
      data: {'sid': sid, 'functionName' : "getNewConvo", "email" :  email},
      success: function(response) {
            var parseResponse = JSON.parse(response);
            var newConvo = {"email" : email, "firstName" : parseResponse["firstName"], "chat" : [{"body" : messageText, "date" : messageDate, "type" : messageType}] , "pic" : parseResponse["avatar"]};
            myConversations[[email]] = newConvo;
            messageList.unshift(email);
            $$('#chat-page-list').prepend(buildConvItem(parseResponse["firstName"], "" , "",  parseResponse["avatar"], email));
            addNewMessages(email, messageText, messageType, messageDate)
            return;
          }

  });

}
//setInterval(checkPendingMessages, 3000);
var myMessagebar = "";
var activeUserEmail = "";

function loadPopupChat(index){
   activeUserEmail = index;
   if(myMessages != ""){
     myMessages.clean();
   }

   myMessages = myApp.messages('.messages', {
     autoLayout:true
   });

    var popupUser = myApp.popup('.popup-chat', function(){

    });
    if(index in myConversations){
      $$('.message-title')[0].innerHTML = myConversations[index]["firstName"];
    }
    else{

        $$('.message-title')[0].innerHTML = users[index]["firstName"];
    }


    // Init Messages


    // Init Messagebar
    myMessagebar = myApp.messagebar('.messagebar');

}
var conversationStarted = false;

function addNewMessages(email, messageText, messageType, messageDate){

  var friendName = myConversations[email]["firstName"];
  avatar = myConversations[email]["pic"];
  var lastmessageDate = myConversations[email]["chat"][1]["date"]
  //if (lastmessageDate < messages[message]["date"] + 1800){
//    conversationStarted = true;
//  }
  var now = new Date();
  if((now.getTime() - (now.getMinutes * 60000) - now.getSeconds() * 1000  + (24-now.getHours()) * 3600000) < messageDate.getTime()){
    var day = weekday[messageDate.getDay()];
  }
  else{
    var day = 'Today';
  }
  if(activeUserEmail == email){
    myMessages.addMessage({
      // Message text
      text: messageText,
      // Random message type
      type: messageType,
      // Avatar and name:
      name: friendName,

      avatar: avatar,
      // Day
      day: !conversationStarted ? day : false,
      time: !conversationStarted ? messageDate.getHours() + ':' + messageDate.getMinutes() : false
    })
}
  var messageListIndex = messageList.indexOf(email);
  var ul = $$('#chat-page-list');
  console.log(email);

  if (messageListIndex > 0){
      console.log(messageList);
      messageList.splice(messageListIndex, 1);
      console.log(messageList);
    messageList.unshift(email);
    console.log(ul[0].childNodes[messageListIndex]);
    ul[0].removeChild(ul[0].childNodes[messageListIndex]);
    $$('#chat-page-list').prepend(buildConvItem(friendName, messageText, getTime(messageDate), avatar, email));
  }
  else{
    var listItem = ul[0].childNodes[0];
    $$('.chat-item-message-cont', listItem)[0].innerHTML = messageText;
    $$('.chat-item-inner-time-cell', listItem)[0].innerHTML = getTime(messageDate);
  }
}

function checkPendingMessages(){
    $$.ajax({
        type: "POST",
        url: 'http://www.spikl.co.uk/chat.php',
        data: {'sid': sid, 'functionName' : "checkPendingMessages"},
        success: function(response) {
              var messages = JSON.parse(response);
              for(var message in messages){
                  var messageDate = new Date(0);
                  var date = messages[message]["date"]
                  var email = messages[message]["email"]
                  messageDate.setUTCSeconds(date);
                  var messageText = messages[message]["body"];
                  var messageType = 'received';
                  var newMessage = {"body" : messageText, "date" : date, "type": messageType}
                  if(email in myConversations){
                      myConversations[messages[message]['email']]["chat"].unshift(newMessage);
                      addNewMessages(email, messageText, messageType, messageDate);
                  }
                  else{
                    receiveNewConversation(email, messageText, messageType, messageDate)
                  }
          }
        }
    });
  }


function loadConversation(email){
    for(var message = myConversations[email]["chat"].length -1 ; message >= 0;  message--){
      var messageDate = new Date(0);
      messageDate.setUTCSeconds(myConversations[email]["chat"][message]["date"]);
      var chatName, avatar;
      if(myConversations[email]["chat"][message]["type"] == 'sent'){
        chatName = name;
        avatar = "";
      }
      else{
        chatName = myConversations[email]["firstName"];
        avatar = myConversations[email]["pic"];

      }
      console.log(email);
      myMessages.addMessage({
        // Message text
        text: myConversations[email]["chat"][message]["body"],
        // Random message type
        type: myConversations[email]["chat"][message]["type"],
        // Avatar and name:
        avatar : avatar,

        name: chatName,
        // Day
      //  time: !conversationStarted ? messageDate.getHours() + ':' + messageDate.getMinutes() : false
      })
    }
    /*$$.ajax({
        type: "POST",
        url: 'http://www.spikl.co.uk/chat.php',
        data: {'sid': sid, 'functionName' : "getMessages", 'message' : myMessagebar.value().trim(), "email" :  myConversations[index]["email"]},
        success: function(response) {
              var parseResponse = JSON.parse(response);
              var messages = parseResponse["messages"];
              var friendName = parseResponse["name"];
              for(var message in messages){
                var messageDate = new Date(0);
                messageDate.setUTCSeconds(messages[message]["date"]);
                var messageText = messages[message]["body"];
                var messageType = messages[message]["type"];
                avatar = parseResponse["avatar"];
                if (messageType == 'sent'){
                  var messageName = name;
                  avatarForRec = "";
                }
                else {
                  var messageName = friendName;
                  avatarForRec = avatar;
                }
                var newDate = new Date(0);

                newDate.setUTCSeconds(messages[message]["date"]);
                myMessages.addMessage({
                  // Message text
                  text: messageText,
                  // Random message type
                  type: messageType,
                  // Avatar and name:
                  avatar : avatarForRec,

                  name: messageName,
                  // Day
                  time: !conversationStarted ? messageDate.getHours() + ':' + messageDate.getMinutes() : false
                })
            }
        }
    });*/
  }
  //loadConversation();

  // Handle message
$$('.messagebar .link').on('click', function () {
  // Message text
  if(myMessagebar.value().trim() == ""){
    return;
  }
  else{
  var messageText = myMessagebar.value().trim();
    data = {'sid': sid, 'functionName' : "sendMessage", 'message' : myMessagebar.value().trim(), "email" :  activeUserEmail, "firstName" : name, "friendName": myConversations[activeUserEmail]["firstName"]};

  var date = new Date();
  var newChat = {"body" : messageText, "date" :  date.getTime(), "type" : 'sent'};
  myConversations[activeUserEmail]["chat"].unshift(newChat);
  $$.ajax({
      type: "POST",
      url: 'http://www.spikl.co.uk/chat.php',
      data: data,
      success: function(response) {
            var parseResponse = JSON.parse(response);
            //myConversations[activeUserEmail]["chat"].unshift(parseResponse);
            console.log(parseResponse);
            myMessages.addMessage({
              // Message text
              text: messageText,
              // Random message type
              type: 'sent',
              // Avatar and name:
              name: name,
              // Day
              day: !conversationStarted ? 'Today' : false,
              time: !conversationStarted ? (new Date()).getHours() + ':' + (new Date()).getMinutes() : false
            })
      }
    });
  }
  // Exit if empy message
  if (messageText.length === 0) return;

  // Empty messagebar
  myMessagebar.clear();

  // Update conversation flag
  conversationStarted = true;
});

var selectedChatItem = "";

$$('#chat-page-list').on("click", "li", function(){

   var id = $$(this)[0].id.split("_")[1];
   selectedChatItem = this;
   loadPopupChat(id);
   loadConversation(id);



});
  // Conversation flag




var activeIndex = 4;
var activeSpikler = "";

mainPageSwiper.on('Tap', function(){
  //document.documentElement.style.setProperty('--spiklMainColour', 'red');
//  document.documentElement.style.setProperty('--spiklbkDarkColour', 'purple');
///  document.documentElement.style.setProperty('--spiklbkLightColour', 'blue');
//  document.documentElement.style.setProperty('--spiklTextColour', 'green');
    //if (activeIndex >= 0){
    //    mainPageSwiper.slides[activeIndex].childNodes[1].childNodes[1].className = 'image-container';
    // }
    var prevActiveContact = $$('.contact-container')[0].getElementsByClassName("active")[0];
    $$(prevActiveContact).toggleClass("active");
    var activeContact =mainPageSwiper.slides[mainPageSwiper.clickedIndex].getElementsByClassName("image-container")[0];
    if(prevActiveContact != activeContact){
      $$(activeContact).toggleClass("active");
      activeSpikler = mainPageSwiper.slides[mainPageSwiper.clickedIndex].id;
      $$('#notes-left')[0].innerHTML = "";
      $$('#notes-right')[0].innerHTML = "";
      organiseNotes(activeSpikler, 0);
      currentNotes = 0;
      $$('#notes-left').toggleClass("show");
      $$('#notes-right').toggleClass("show");
    }
    else{
      activeSpikler = "";
      currentNotes = 0;
      $$('#notes-left')[0].innerHTML = "";
      $$('#notes-right')[0].innerHTML = "";
      organiseNotes(activeSpikler, 0);
    }
    activeIndex = mainPageSwiper.clickedIndex;
});

function organiseNotes(email, startIndex){
  leftNotesHeight = 0;
  for(var note = startIndex; note < notes[email].length; note++){
    if(note > startIndex + 21){
      break;
    }
    makeNewNote(notes[email][note].title, notes[email][note].name, notes[email][note].body,  notes[email][note].time);
  }
}

var currentNotes = 0;
$$('.infinite-scroll').on('infinite', function () {
  var maxItems = notes[activeSpikler].length;
  currentNotes += 21;
  organiseNotes(activeSpikler, currentNotes);
});

$$('#notes-block').on('touchstart', '.note', function(){
  var note = this;
  var interval = setInterval(function(){
    console.log("Hello");
    clearInterval(interval);
    var clickedLink = note;
    myApp.popover('.popover-notes', clickedLink);
    //note.parentNode.parentNode.removeChild(note.parentNode);
  }, 1000);
  $$(this).on('touchend', function(){
    clearInterval(interval);
  })
});

mainPageSwiper.on('DoubleTap', function(){
    if (activeIndex >= 0){
        mainPageSwiper.slides[activeIndex].childNodes[1].childNodes[1].className = 'image-container';
    }
    mainPageSwiper.slides[mainPageSwiper.clickedIndex].childNodes[1].childNodes[1].className += " active"
    activeIndex = mainPageSwiper.clickedIndex;
    document.getElementById("home").className = document.getElementById("home").className.replace( /(?:^|\s)active(?!\S)/g , '' );
    document.getElementById("messenger").className += " active";
    document.getElementById("messenger-tab").className += " active";
});

$$('.form-to-json').on('click', function(){
  var formData = myApp.formToJSON('#login-form');
  alert(JSON.stringify(formData));
});

function notes_active(){
    document.getElementById("notes").className += " active";
}

var original_top = 0;

function openNotes() {
  var elem = document.getElementById("notes-cont");
  var block = document.getElementById("notes-block");
  var top = $$('#notes-cont').offset().top;
  original_top = top;
  var height = $$('#notes-cont').height();
  var set_to_scroll = false;
  var id = setInterval(frame, 1);
  function frame() {
    if (top <= 110) {
      clearInterval(id);
    } else {
      top -= 10;
      height += 10;
      elem.style.height = height + 'px';
      elem.style.top = top + 'px';
      if (!set_to_scroll){
        set_to_scroll = true;
        elem.style.position = 'absolute';
        elem.style.width = '100%';
        block.className = 'page-content infinite-scroll notes-sub-container active';
      }
    }
  }
}

function openNotes1(){
  var elem = document.getElementById("notes-cont");
  var block = document.getElementById("notes-block");
  var top = $$('#notes-cont').offset().top;
  original_top = top;
  var height = $$('#notes-cont').height();
  var set_to_scroll = false;
  elem.style.top = '110px';
  elem.style.height = (height + (top - 110)) + 'px';
  elem.className= 'content-block notes-container up'
  block.className = 'page-content infinite-scroll notes-sub-container active';
}

function closeNotes1(){
  var elem = document.getElementById("notes-cont");
  var block = document.getElementById("notes-block");
  var top = $$('#notes-cont').offset().top;
  var height = $$('#notes-cont').height();
  var set_to_scroll = false;
  elem.style.height = (height - (original_top - top)) + 'px';
  elem.style.top = original_top + 'px';
  elem.className = 'content-block notes-container'
  block.className = 'notes-sub-container';

}

function closeNotes() {
  var elem = document.getElementById("notes-cont");
  var block = document.getElementById("notes-block");
  var top = $$('#notes-cont').offset().top;
  var height = $$('#notes-cont').height();
  var set_to_scroll = true;
  var id = setInterval(frame, 1);
  function frame() {
    if (top >= original_top) {
      clearInterval(id);
      block.className = 'notes-sub-container';
    } else {
      top += 10;
      height -= 10;
      console.log(height);
      elem.style.height = height + 'px';
      elem.style.top = top + 'px';
    }
  }
}

$$('.add-text-note').on('click', function () {
    $$('.modal-overlay.modal-overlay-invisible')[0].className = 'modal-overlay modal-overlay-visible';
    $$('.add-note-input-cont').toggleClass('invisible');
    if(activeSpikler != ""){
      $$('.add-note-input.spikler')[0].value = friends[activeSpikler].name;
    }
    else{
      $$('.add-note-input.spikler')[0].value = "";
    }

});

$$('#search-bar').on('mousedown', function() {
    setInterval(drag, 50);
    //console.log(event.srcElement.clientX)
    event.pageX;
    function drag(event){
        console.log("asad")
    }

});


var alternate = true;
var note_id = 0;
var leftNotesHeight = 0;
var rightNotesHeight = 0;

$$('.submit-note').on('click', function () {
    var spikler = $$('.add-note-input.spikler')[0].value;
    var title = $$('.add-note-input.title')[0].value;
    var body = $$('.add-note-input.body')[0].value;
    if(body == ""){
      $$('.add-note-input.body')[0].placeholder = "you must add content to a new note.";
      return;
    }
    //var date = new Date();
    var time = 5;
    if($$('.notes-sub-container-left')[0].offsetHeight <= $$('.notes-sub-container-right')[0].offsetHeight){
      var container = $$('.notes-sub-container-left');
    }
    else{
      var container = $$('.notes-sub-container-right');
    }
    var note_cont = document.createElement("DIV");
    note_cont.className = "indie-note-container"
    note_cont.id = note_cont.className + note_id;
    var note = document.createElement("DIV");
    note.className = "note";
    note.id = note.className + note_id;
    note_id++;
    container.prepend(note_cont);
    var dom_note_container = $$('#'+ note_cont.id);
    dom_note_container.prepend(note);
    var note_title = document.createElement("DIV");
    note_title.className = "note-title";
    note_title.innerHTML = title;
    var note_spikler = document.createElement("DIV");
    note_spikler.className = "note-spikler";
    note_spikler.innerHTML = spikler;
    var dom_note = $$('#'+ note.id);
    dom_note.append(note_title);
    dom_note.append(note_spikler);
    dom_note.append(body);
    $$('.add-note-input.title')[0].value = "";
    $$('.add-note-input.spikler')[0].value = "";
    $$('.add-note-input.body')[0].value = "";
    var date = new Date();
    var newNote = {"name" : spikler, "title" : title, "body" : body, "time" : date};
    notes[activeSpikler].unshift(newNote);
    console.log(notes);
    $$('.modal-overlay.modal-overlay-visible')[0].className = "modal-overlay modal-overlay-invisible";
    $$('.add-note-input-cont').toggleClass('invisible');
});


function makeNewNote(title, spikler, body, time){
   // note.setAttribute('data-time', time);
   if($$('.notes-sub-container-left')[0].offsetHeight <= $$('.notes-sub-container-right')[0].offsetHeight){
     var container = $$('.notes-sub-container-left');
   }
   else{
     var container = $$('.notes-sub-container-right');
   }
   var note_cont = document.createElement("DIV");
   note_cont.className = "indie-note-container"
   note_cont.id = note_cont.className + note_id;
   var note = document.createElement("DIV");
   note.className = "note";
   note.id = note.className + note_id;
   note_id++;
   container.append(note_cont);
   var dom_note_container = $$('#'+ note_cont.id);
   dom_note_container.prepend(note);
   var note_title = document.createElement("DIV");
   note_title.className = "note-title";
   note_title.innerHTML = title;
   var note_spikler = document.createElement("DIV");
   note_spikler.className = "note-spikler";
   note_spikler.innerHTML = spikler;
   var dom_note = $$('#'+ note.id);
   dom_note.append(note_title);
   dom_note.append(note_spikler);
   dom_note.append(body);
   leftNotesHeight += note_cont.offsetHeight;
   document.documentElement.style.setProperty('--notesHeight', '-' + leftNotesHeight + 'px');

}

function testSave(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fs) {

    console.log('file system open: ' + fs.name);
    fs.root.getFile("newPersistentFile.txt", { create: true, exclusive: false }, function (fileEntry) {

        console.log("fileEntry is file?" + fileEntry.isFile.toString());
        // fileEntry.name == 'someFile.txt'
        // fileEntry.fullPath == '/someFile.txt'
        writeFile(fileEntry, null);

        }, onErrorCreateFile);

    }, onErrorLoadFs);
}

function testLang(){
   $$('.lang-border.no-color2')[0].className = "lang.border no-color2 up";


}

function loadFriends(){
  var i = 0;
  if(friends == []){
    $$('.main-page-swiper')[0].innerHTML = "No Spiklers";
  }
  for(var friend in friends){
    mainPageSwiper.appendSlide(buildFriend(friends[friend].name, friends[friend].pic, friend));
    //notes[friend] = [];
  }
}

function buildFriend(name, pic, email){
  var html ='<div class="swiper-slide main-page-contact" id="' + email + '"><div class="contact-container"><img class="image-container" src="' + pic + '">';
  html += '<table class="contact-name-table"><tr><td class="contact-name-side-td"></td><td><p class="name-contact">' + name + '</p></td><td><p class="contact-name-notif"></p></td></tr></table></div></div>';
  return html;
}

function loadLanguageProf(){
        var len = myLanguages.length;
        for(var i= 0; i < len; i++){
             var langRing = document.getElementById("lang-ring" + i);
             langRing.childNodes[1].innerHTML = myLanguages[i].name;
             langRing.className = "c100 orange assigned p" + 10* myLanguages[i].prof + " lang-ring";
        }
}

function fetchLangFromServer(){
      $$.ajax({
              type: "POST",
              url: 'http://www.spikl.co.uk/loadUser.php',
              data: {'sid': sid},
              success: function(response) {
                    var parseResponse = JSON.parse(response);
                    name = parseResponse["firstName"]
                    var lang = parseResponse["languages"];
                    var pic = parseResponse["pic"];
                    var convo = parseResponse["convo"];
                    $$('.greeting-name')[0].innerHTML = name;
                    $$('.profile-name')[0].innerHTML = name;
                    $$('#profilepicmain')[0].src = pic;
                    for(var i in lang){
                      myLanguages.push(lang[i]);
                    }
                    for(var i in convo){
                      console.log(convo);
                      var email = parseResponse["convo"][i]["email"];
                      convo[i]["pic"] = parseResponse["friendPics"][i];
                      convo[i]["firstName"] = parseResponse["convo"][i]["firstName"];
                      myConversations[[email]] = convo[i];
                    }
                    //myConversations.push(newConvo);
                    console.log(myConversations);
              }
          });
  }

$$.getJSON("languag-codes.json", function(json) {
    console.log(json); // this will show the info it in firebug console
});
var month = new Array();
month[0] = "January";
month[1] = "February";
month[2] = "March";
month[3] = "April";
month[4] = "May";
month[5] = "June";
month[6] = "July";
month[7] = "August";
month[8] = "September";
month[9] = "October";
month[10] = "November";
month[11] = "December";
var weekday = new Array(7);
weekday[0] =  "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}
function getTime(time){
  return addZero(time.getHours()) + ':' + addZero(time.getMinutes());
}

$$('.theme-choice').on('click', function(){
  console.log(this.parentNode);
  var parent = this.parentNode;
  var active = $$(parent)[0].getElementsByClassName('active')[0];
  $$(active).removeClass("active");
  if(!$$(this).hasClass("active")){
    $$(this).toggleClass("active");
    if($$(this).hasClass("light")){
      document.documentElement.style.setProperty('--spiklMainColour', '#ff6600');
      document.documentElement.style.setProperty('--spiklbkDarkColour', '#ffffff');
      document.documentElement.style.setProperty('--spiklbkLightColour', '#ffffff');
      document.documentElement.style.setProperty('--spiklTextColour', '#2b2b2b');
      document.documentElement.style.setProperty('--spiklAltTextColour', '#2b2b2b');
      document.documentElement.style.setProperty('--spiklBorderColour', '#2b2b2b');

    }
    else if($$(this).hasClass("dark")){
      document.documentElement.style.setProperty('--spiklMainColour', '#ff6600');
      document.documentElement.style.setProperty('--spiklbkDarkColour', '#2B2C2B');
      document.documentElement.style.setProperty('--spiklbkLightColour', '#494746');
      document.documentElement.style.setProperty('--spiklTextColour', 'white');
      document.documentElement.style.setProperty('--spiklAltTextColour', '#c1c1c1');
      document.documentElement.style.setProperty('--spiklBorderColour', '#494746');
    }
  }
})

loadFriends();
