  // Initialize app and store it to myApp variable for futher access to its methods
var myApp = new Framework7({
  tapHold: true
});

// We need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

myApp.loginScreen();


function keyboardShowHandler(e){
    myApp.hideToolbar('#spikl-tabbar');
}

function keyboardHideHandler(e){
    myApp.showToolbar('#spikl-tabbar');
}

function changeGreeting(){
  var greetings = {"Amharic" : "ታዲያስ", "Arabic": "مرحبا", "Croatian" : "Bok", "Czech" : "ahoj", "Danish" : "Hej", "Dutch": "Hallo", "English" : "Hello", "Estonian" : "Tere", "Finnish": "Terve", "French" : "Bonjour", "German" : "Hallo", "Greek" : "Γεια σου", "Hawaiian" : "Aloha", "Hebrew" : "שלום", "Hindi" : "नमस्ते", "Hungarian" : "Szia", "Indonesian" : "Halo", "Irish" : "Dia dhuit", "Italian" : "Ciao", "Japanese" : "こんにちは", "Korean" : "안녕", "Malay" : ["Selamat petang", "Selamat tengahari"], "Mandarin": "你好", "Norwegian" : "Hei", "Polish": "Hej", "Portuguese": "Oi", "Romanian": "alo", "Russian": "Привет", "Spanish" : "Hola", "Tamil" : "வனக்கம்", "Thai": ["สวัสดีค่ะ", "สวัสดีครับ"], "Turkish" : "Merhaba"}
  var keys = Object.keys(greetings);
  var index = Math.floor(Math.random() * keys.length);
  console.log(keys[index]);
  $$('.greeting-word')[0].innerHTML = greetings[keys[index]] + " ";
}


$$("#addLangModal").on('click', function(event){
  if(event.target == $$('#addLangModal')[0]){
    $$('.modal-overlay')[0].className = 'modal-overlay modal-overlay-invisible';
    $$('.add-new-lang-cont').addClass("invisible");
    $$('.add-note-input-cont').addClass("invisible");
    $$('.change-lang-cont').addClass("invisible");
  }
})
var name = "Nicky1";
var passd = "Sheb a123"
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

//ogin("nadc500@york.ac.uk", "Password1");
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
                    changeGreeting();
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
  $$(id + '-check-cross').addClass("loading text-color-alt-" + colorScheme);

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
      var lang = profilePageSwiper.clickedSlide.id;
      if(myLanguages[lang]< 10){
          myLanguages[lang] += 1;
      }
      else{
        return;
      }
      progress.className ="first c100 big orange up p" + 10* myLanguages[lang] + ' text-color-alt-' + colorScheme;
      $$('#change-lang-prof').once("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
              function(event) {
                myLanguages[lang] += 1;
                progress.className ="second c100 big orange up p" + 10* myLanguages[lang] + ' text-color-alt-' + colorScheme;
      })

  });

  $$('.decrease-lang-prof').on('click', function () {
      var progress = document.getElementById("change-lang-prof");
      var index = profilePageSwiper.clickedIndex;
      var lang = profilePageSwiper.clickedSlide.id;
      if(myLanguages[lang] > 0){
          myLanguages[lang] -= 1;
      }
      else{
        return;
      }
      if(myLanguages[lang] == 5){
          progress.className ="first c100 down big orange up p" + 10* myLanguages[lang]  + " text-color-alt-" + colorScheme;
          $$('#change-lang-prof').once("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                  function(event) {
                    myLanguages[lang] -= 1;
                    progress.className ="second c100 big orange up p" + 10* myLanguages[lang] + ' text-color-alt-' + colorScheme;
          })
      }
      else{
          progress.className ="first c100 big orange up p" + 10* myLanguages[lang]  + " text-color-alt-" + colorScheme;
          $$('#change-lang-prof').once("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
                  function(event) {
                    myLanguages[lang] -= 1;
                    progress.className ="second c100 big orange up p" + 10* myLanguages[lang] + ' text-color-alt-' + colorScheme;
          })

          }
  });

  $$('.submit-lang-update').on('click', function () {

      $$('.modal-overlay.modal-overlay-visible')[0].className = 'modal-overlay modal-overlay-invisible';
      $$('.change-lang-cont').addClass('invisible');
      $$('.add-new-lang-cont').addClass("invisible");
      $$('.add-note-input-cont').addClass("invisible");
      $$('.change-lang-cont').addClass("invisible");
      updateLanguageProf();
      var language = profilePageSwiper.clickedSlide.id;
      $$.ajax({
          type: "POST",
          url: 'http://www.spikl.co.uk/updateUser.php',
          data: {'functionName' : 'submitNewProf', 'sid': sid, "language" : language, "prof" : myLanguages[language]},
          success: function(response) {
              console.log(response);

          }
      });
  });

  $$('.submit-new-lang').on('click', function () {
      $$('.modal-overlay.modal-overlay-visible')[0].className = 'modal-overlay modal-overlay-invisible';
      $$('.add-new-lang-cont').addClass('invisible');
      var language = $$('#autocomplete-dropdown')[0].value;
      var slide = profilePageSwiper.clickedSlide;
      $$(slide).removeClass('vacant');
      $$(slide).addClass('assigned');
      $$(slide)[0].id = language;
      if(Object.keys(myLanguages).length == 0){
        $$('.profile-page-swiper .swiper-wrapper')[0].innerHTML = "";
        //.innerHTML = ('<div class="c100 p0 orange lang-ring text-color-alt-' + colorScheme + '"> <span>' + language + '</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div>')
        var index = profilePageSwiper.slides.length
        profilePageSwiper.appendSlide('<div class="swiper-slide assigned"></div>');
        profilePageSwiper.appendSlide('<div class="swiper-slide assigned"></div>');
        profilePageSwiper.appendSlide('<div class="swiper-slide assigned"></div>');
        profilePageSwiper.appendSlide('<div class="swiper-slide assigned"></div>');
        profilePageSwiper.appendSlide('<div class="swiper-slide assigned"></div>');
        profilePageSwiper.appendSlide('<div class="swiper-slide assigned" id="' + language + '"><div class="assigned roll c100 p0 orange lang-ring text-color-alt-' + colorScheme + '"><span>' + language + ' </span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>');
        profilePageSwiper.appendSlide('<div class="swiper-slide assigned"></div>');
        profilePageSwiper.appendSlide('<div class="swiper-slide assigned"></div>');
        profilePageSwiper.slideTo(7, 1000);
      }
      else{
      //  slide.innerHTML = '<div class="swiper-slide assigned" id="' + language + '"><div class="assigned c100 p0 orange lang-ring text-color-alt-' + colorScheme + '"><span>' + language + ' </span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>';
        profilePageSwiper.removeSlide(profilePageSwiper.clickedIndex);
        profilePageSwiper.appendSlide('<div class="swiper-slide assigned" id="' + language + '"><div class="assigned c100 p0 orange lang-ring text-color-alt-' + colorScheme + '"><span>' + language + ' </span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>');

      }
      //profilePageSwiper.onSlideChangeEnd(function(){  profilePageSwiper.removeSlide([0, 1, 2, 3, 4, 6, 7]);});
      //profilePageSwiper.removeSlide([0, 1, 2, 3, 4, 6, 7]);
      var newLang = {"name" : language, "prof": 0};
      myLanguages[language] = 0;

      console.log(myLanguages);
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
      var slide = profilePageSwiper.clickedSlide;
      var lang = profilePageSwiper.clickedSlide.id;
      console.log($$(slide));
      $$(slide)[0].childNodes[0].className = "c100 orange assigned p" + 10* myLanguages[lang] + " lang-ring" + " text-color-alt-" + colorScheme;;

  }
  var currentPopupUserEmail = "";

$$('#home').on('show', function () {
  console.log("hjhj");
});

$$('#profile').on('show', function () {
    profilePageSwiper = myApp.swiper('.profile-page-swiper', {
    spaceBetween: 0,
    slidesPerView: 3,
    freeModeMomentum: true,
    loop: false,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
    //onTransitionEnd: function(){ profilePageSwiper.removeSlide([0, 1, 2, 3, 4, 6, 7]);}
    });
    //loadLanguageProf(profilePageSwiper);
    console.log(myLanguages);
    profilePageSwiper.removeAllSlides();
    if(Object.keys(myLanguages).length == 0){
      profilePageSwiper.appendSlide('<div class="swiper-slide vacant"><div class="vacant c100 p0 orange lang-ring lang-ring text-color-alt-' + colorScheme + '"><span> + </span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>');
      profilePageSwiper.appendSlide('<div class="add-new-lang-message text-color-alt- ' + colorScheme + '">Add a Language</div>');
    }
    for(var i in myLanguages){
        profilePageSwiper.appendSlide('<div class="swiper-slide assigned" id="' + i + '"><div class="vacant c100 p' + 10* myLanguages[i] + ' orange lang-ring lang-ring text-color-alt-' + colorScheme + '"><span>' +  i  +'</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>');
    };




    profilePageSwiper.on('Tap', function(){
        var slide = profilePageSwiper.clickedSlide;
        if(Object.keys(myLanguages).length == 0){
          profilePageSwiper.on('slideChangeEnd', function(){profilePageSwiper.removeSlide([0, 1, 2, 3, 4, 6, 7]);});
        }
        else{
            profilePageSwiper.off('slideChangeEnd');
        }
        console.log($$('.modal-overlay'));
        console.log(myLanguages);
        $$('.modal-overlay')[0].className = 'modal-overlay modal-overlay-visible';
        if($$(slide).hasClass("assigned")){
            console.log("hjsadhjska");
            $$('.change-lang-cont.invisible').removeClass('invisible');
            var progress = document.getElementById("change-lang-prof");
            $$('#change-lang-name')[0].innerHTML = profilePageSwiper.clickedSlide.id;
            profilePageSwiper.appendSlide('<div class="swiper-slide vacant"><div class="vacant c100 p0 orange lang-ring lang-ring text-color-alt-' + colorScheme + '"><span> + </span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>');

            //progress.childNodes[1].innerHTML = myLanguages[profilePageSwiper.clickedIndex].name;
            progress.className = "text-color-alt-" + colorScheme + " c100 p0 big orange p" + 10 * myLanguages[profilePageSwiper.clickedSlide.id];
        }
        else if($$(slide).hasClass("vacant")){
            $$('.add-new-lang-cont').removeClass('invisible');
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
var friends = {};
var friendRequests = {};
friendRequests["nadc500@york.ac.uk"] = {"name" : "nicky", "pic" :"img/nicky.jpeg", "type" : "received", "message" : "hello" };
//friends["nadc500@york.ac.uk"] = {"name" : "nicky", "pic" :"img/nicky.jpeg"};
var myLanguages =  {};
var myConversations = {};
myConversations["nadc500@york.ac.uk"] = {"firstName" : "nicky", "pic" :"img/nicky.jpeg", "chat" : [] };


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
        if(currentPopupUserEmail in friends){
          $$('.friend-request').addClass("hide");
          $$('#floating-button-spikler').addClass('showk');
        }
        console.log(users[index].email);
        $$('#popup-main-profile-pic')[0].style.backgroundImage = "url('" + users[index].pic + "')";
        $$('#popup-name')[0].innerHTML = users[index].firstName + " " + users[index].lastName ;
        //$$('#popup-uni')[0].innerHTML = users[index].Uni;
        for(var i = 0; i < users[index].languages.length; i++){
            popupPageSwiper.appendSlide('<div class="swiper-slide"><div class="vacant c100 p' + 10* users[index].languages[i].prof + ' orange lang-ring lang-ring text-color-alt-' + colorScheme + '" id="popup-lang-ring0"><span>' + users[index].languages[i].name +'</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>');
        };
    });

    $$('#popup-user-back').on('click', closePopupUser);

    function closePopupUser(){
      console.log("haskjdahjk");
      $$('#floating-button-spikler').removeClass('showk');
      $$('.friend-request.hide').removeClass("hide");
    }

    function buildSearchItem(index, prof){
        var html = "";
        searchTerm.language = "Eng";

        html += '<li class="item-content search-li background-color-dark-' + colorScheme +' border-color-light-' + colorScheme +'" id ="search-item ' + index + '"><div class="item-input"><table><tr><td><div  class="c100 p' + 10*prof +' big orange search-item-ring background-color-light-' + colorScheme +'" ><span class="search-item-img-span"><img class="search-item-img" src="' + users[index].pic + '">    </span><div class="slice" ><div class="bar"></div><div class="fill"></div></div></div></td> <td class="search-item-outer-right-cell"><div><p class="search-item-text text-color-alt-' + colorScheme +' search-item-name">';
        html += users[index].firstName + " " + users[index].lastName ;
        html += '</p><p class="search-item-text text-color-alt-' + colorScheme +' search-item-uni">';
        html += "York";
        html += '</p></div><table><tr>';
        for(var i =0; i < users[index].languages.length; i++){
            html+= '<td class="search-item-inner-bottom-cell"><div class="c100 p' + (10 * users[index].languages[i].prof) +  ' big orange search-item-inner-ring lang-ring text-color-alt-' + colorScheme + '"  ><span>' + users[index].languages[i].name + '</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></td>';
        }
        html += '</tr></table></td></tr></table></div><a href="#" class="search-item-prof"><i class="f7-icons search-item-icon">person<i></a></li>';
        return html;
    }
    currentPopupUserEmail= "nadc500@york.ac.uk";

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

$$('#friend-request').on('click', function(){
  $$.ajax({
      type: "POST",
      url: 'http://www.spikl.co.uk/friend.php',
      data: {'sid': sid, 'functionName' : "requestFriend", "friendEmail": currentPopupUserEmail},
      success: function(response) {
          console.log(response);

            return;
          }

  });
})

var myMessages = "";
var messageList = [];
var notes = {}  ;
notes["nadc500@york.ac.uk"] = {};
for(var i =0; i< 50; i++){
  var noteId = 'note' + i;
  var date = new Date();
  notes["nadc500@york.ac.uk"][date.getTime()] = {'name' : 'nicky', 'title': "", "body": "hello" + i, "date": date.getTime()};
}
console.log(notes);

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
   html += '<li id="chat-list-item_' + id + '" class="item-content chat-list-item background-color-alt-' + colorScheme + '"><div class="item-input chat-list-input"><table><tr><td><div class="chat-profile-pic border-color-light-' + colorScheme +'"><img class="chat-profile-pic" src="' + pic + '"></img></div></td><td class="chat-item-outer-cell text-color-alt-' + colorScheme + '"><table><tr><td class="chat-item-inner-name-cell">';
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
setInterval(checkPendingMessages, 3000);
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
              var parseResponse = JSON.parse(response);
              var friendRequests = parseResponse["friendRequests"];
              console.log(parseResponse);
              console.log(friendRequests);
              var messages = parseResponse["messages"]
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
    var friendRequestBox = myMessages.addMessage({
      // Message text
      text: myConversations[email]["friendRequest"],
      // Random message type
      type: "received",
      // Avatar and name:
      avatar : myConversations[email]["pic"],

      name: "Friend Request",
      // Day
    //  time: !conversationStarted ? messageDate.getHours() + ':' + messageDate.getMinutes() : false
    })
    //friendRequestBox.childNodes[1].innerHTML += '<table><tr><td class="friend-request-message-table"><div class="notes-button button friend-request-message-button">Decline</div></td class="friend-request-message-table"><td class="friend-request-message-table"><div class="notes-button  button friend-request-message-button accept">Accept</div></td></tr></table>';
    $$(friendRequestBox).on('click', function(){
      console.log("hjad");
      $$.ajax({
          type: "POST",
          url: 'http://www.spikl.co.uk/friend.php',
          data: {'sid': sid, 'functionName' : "acceptFriend", "friendEmail": activeUserEmail},
          success: function(response) {
              console.log(response);

                return;
              }

      });
    });
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
$$('.friend-request-message-button.decline').on('click', function(){

});



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
      $$('#notes-left').removeClass("show");
      $$('#notes-right').removeClass("show");
      $$('#notes-left')[0].innerHTML = "";
      $$('#notes-right')[0].innerHTML = "";
      organiseNotes(activeSpikler, 0);
      currentNotes = 0;
      $$('#notes-left').addClass("show");
      $$('#notes-right').addClass("show");
    }
    else{
      deselectNotes();
      activeSpikler = "";
      currentNotes = 0;
      console.log("jljk");
      $$('#notes-left').removeClass("show");
      $$('#notes-right').removeClass("show");
      $$('#notes-left')[0].innerHTML = "";
      $$('#notes-right')[0].innerHTML = "";
      organiseNotes(activeSpikler, 0);
      $$('#notes-left').addClass("show");
      $$('#notes-right').addClass("show");

    }
    activeIndex = mainPageSwiper.clickedIndex;
});

function organiseNotes(email, startIndex){
  leftNotesHeight = 0;
  var keys = Object.keys(notes[email]);
  keys.sort(function(a, b){
    var keyA = a,
        keyB = b;
    // Compare the 2 dates
    if(keyA < keyB) { return 1;}
    if(keyA > keyB) {return -1;}
    return 0;
});
  for(var note = startIndex; note< keys.length; note++){
    if(note > startIndex + 21){
      break;
    }
    makeNewNote(notes[email][keys[note]].title, notes[email][keys[note]].firstName, notes[email][keys[note]].body,  notes[email][keys[note]].date);
  }
}

$$('#search-notes').on('change', function(){
  var tempNotes = [];
  $$('#notes-left')[0].innerHTML = "";
  $$('#notes-right')[0].innerHTML = "";
  for(var i in notes[activeSpikler]){
      if(notes[activeSpikler][i].body.toLowerCase().indexOf(this.value.toLowerCase()) >= 0){
        tempNotes.push(notes[activeSpikler][i]);
      }
  }
  console.log(tempNotes);
  for(var i in tempNotes){
    makeNewNote(tempNotes[i].title, tempNotes[i].firstName, tempNotes[i].body,  tempNotes[i].date);
  }
})

var currentNotes = 0;
$$('.infinite-scroll').on('infinite', function () {
  var maxItems = notes[activeSpikler].length;
  currentNotes += 21;
  organiseNotes(activeSpikler, currentNotes);
});
var clickedLink = "";
var selectedNotes = [];

//$$('#notes-block').on('click', '.note', handleNoteClick);

var timeoutId = 0;

$$('#notes-selection-close').on('click', deselectNotes);

function deselectNotes(){
  $$('#notes-selection').removeClass('show');
  $$('#notes-block').on("click", '#notes-block', handleNoteClick);
  $$('#notes-block').off("click", '.note', handleNoteHold);
  $$('#notes-block').on("taphold", '.note', handleNoteTapAndHold);
  $$('.note.active').removeClass("active");
  clickedLink = "";
  selectedNotes = [];
}
$$('#notes-block').on('taphold', '.note',  handleNoteTapAndHold);

function handleNoteTapAndHold(){
  $$('#notes-selection').addClass('show');
  $$('#selection-count')[0].innerHTML = 1;
  $$('#notes-block').off("click", '#notes-block', handleNoteClick);
  $$('#notes-block').on("click", '.note', handleNoteHold);
  $$('#notes-block').off("taphold", '#notes-block', handleNoteTapAndHold);
  $$(this).addClass('active');
  selectedNotes.push(this);
}

function handleNoteHold(){
  var note = this;
  if($$(this).hasClass("active")){
    $$('#selection-count')[0].innerHTML--;
    selectedNotes.pop(this);
  }
  else{
    $$('#selection-count')[0].innerHTML++;
    selectedNotes.push(this);
  }
  $$(this).toggleClass('active');

}


function handleNoteClick(){
  var note = this;
  clickedLink = note;
  //myApp.popover('.popover-notes', clickedLink);
  var popupAddNote = myApp.popup('.popup-addnote', function(){
  });
  CKEDITOR.instances['add-note-text-area'].setData(clickedLink.getElementsByClassName('note-body')[0].innerHTML);
  $$('.spikler').val(clickedLink.getElementsByClassName('note-spikler')[0].innerHTML);
  $$('.title').val(clickedLink.getElementsByClassName('note-title')[0].innerHTML);
  var interval = setInterval(function(){
    clearInterval(interval);
    clickedLink = note;
    //note.parentNode.parentNode.removeChild(note.parentNode);
  }, 1000);
  $$(this).on('touchend', function(){
    clearInterval(interval);
  })
}
$$('#notes-block').on('click', '.note', handleNoteClick);

$$('#notes-selection-delete').on('click' , function(){
  for(var note in selectedNotes){
    $$(selectedNotes[note].parentNode.parentNode.removeChild(selectedNotes[note].parentNode));
    console.log(notes[activeSpikler]);
    console.log(selectedNotes[note]);
    delete notes[activeSpikler][selectedNotes[note].id];
  }
  selectedNotes = [];
  $$('#selection-count')[0].innerHTML = 0;
})


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
var bottom = $$('#spikl-tabbar').offset().top;
var top = 150;
var addNoteHeight = bottom -150;
console.log(addNoteHeight);
//var addNoteHeight = window.innerHeight *0.55;

CKEDITOR.replace( 'add-note-text-area' ,{
   height: addNoteHeight,
   extraPlugins: 'autogrow',
   autoGrow_maxHeight: addNoteHeight,
   autoGrow_minHeight: addNoteHeight,
   removePlugins: 'resize'
});

$$('.add-text-note').on('click', function () {
    clickedLink = "";
    var popupAddNote = myApp.popup('.popup-addnote', function(){
    });

    CKEDITOR.instances['add-note-text-area'].setData('');
    if(activeSpikler != ""){
      $$('.add-note-input.spikler')[0].value = friends[activeSpikler].firstName;
    }
    else{
      $$('.add-note-input.spikler')[0].value = "";
    }

});





var alternate = true;
var note_id = 0;
var leftNotesHeight = 0;
var rightNotesHeight = 0;
var tempUsers = {};

var autocompleteNoteSpikler= myApp.autocomplete({
   input: '#autocomplete-dropdown-spikler',
   openIn: 'dropdown',
   source: function (autocomplete, query, render) {
       var results = [];

       if (query.length === 0) {
           render(results);
           return;
       }
       // Find matched items

             for (var i in friends) {
                 if (friends[i].firstName.toLowerCase().indexOf(query.toLowerCase()) >= 0) results.push(friends[i].firstName); tempUsers[friends[i].firstName] = i;
             }
             console.log(tempUsers);
       // Render items by passing array with result items
       render(results);
   },
   onChange: function (autocomplete, value) {
     activeSpikler = tempUsers[value];
   }
});

//loadFriends();

$$('.submit-note').on('click', function () {
    var spikler = $$('.add-note-input.spikler')[0].value;
    var title = $$('.add-note-input.title')[0].value;
    var body = $$('.add-note-input.body')[0].value;
    var body = CKEDITOR.instances['add-note-text-area'].getData()
    // send your ajax request with value
    // profit!
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
    var date = new Date;
    var time = date.getTime();
    var note_cont = document.createElement("DIV");
    note_cont.className = "indie-note-container"
    note_cont.id = note_cont.className + note_id;
    note_cont.className += " border-color-dark-"  + colorScheme + " text-color-alt-" +  + colorScheme;
    var note = document.createElement("DIV");
    note.className = "note";
    note.id = time;
    note.className += " background-color-light-" + colorScheme +  " border-color-dark-"  + colorScheme;
    note_id++;
    var tick = document.createElement("SPAN");
    tick.innerHTML= '<i class="f7-icons note-tick">check_round_fill</i>';
    container.prepend(note_cont);
    if (clickedLink != ""){
        clickedLink.parentNode.parentNode.removeChild(clickedLink.parentNode);
    }
    var dom_note_container = $$('#'+ note_cont.id);
    dom_note_container.prepend(note);
    var note_title = document.createElement("DIV");
    note_title.className = "note-title";
    note_title.innerHTML = title;
    var note_spikler = document.createElement("DIV");
    note_spikler.className = "note-spikler";
    note_spikler.innerHTML = spikler;
    var note_body = document.createElement("DIV");
    note_body.className = "note-body";
    note_body.innerHTML = body;
    var dom_note = $$('#'+ note.id);
     dom_note.append(tick);
    dom_note.append(note_title);
    dom_note.append(note_spikler);
    dom_note.append(note_body);
    $$('.add-note-input.title')[0].value = "";
    $$('.add-note-input.spikler')[0].value = "";
    $$('.add-note-input.body')[0].value = "";

    var newNote = {"firstName" : spikler, "title" : title, "body" : body, "date" : date.getTime()};
    console.log(notes);
    notes[activeSpikler][time] = newNote;

    myApp.closeModal('.popup-addnote');
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
   note_cont.className += " border-color-dark-"  + colorScheme + " text-color-alt-" +  + colorScheme;
   var note = document.createElement("DIV");
   note.className = "note";
   note.id = time;
   note.className += " background-color-light-" + colorScheme +  " border-color-dark-"  + colorScheme;
   note_id++;
   var tick = document.createElement("SPAN");
   tick.innerHTML= '<i class="f7-icons note-tick">check_round_fill</i>';
   container.append(note_cont);
   var dom_note_container = $$('#'+ note_cont.id);
   dom_note_container.prepend(note);
   var note_title = document.createElement("DIV");
   note_title.className = "note-title";
   note_title.innerHTML = title;
   var note_spikler = document.createElement("DIV");
   note_spikler.className = "note-spikler";
   note_spikler.innerHTML = spikler;
   var note_body = document.createElement("DIV");
   note_body.className = "note-body";
   note_body.innerHTML = body;
   var dom_note = $$('#'+ note.id);
   dom_note.append(tick);
   dom_note.append(note_title);
   dom_note.append(note_spikler);
   dom_note.append(note_body);
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
    console.log(friend);
    mainPageSwiper.appendSlide(buildFriend(friends[friend].firstName, friends[friend].friendPic, friend));
    //notes[friend] = [];
  }
}


function buildFriend(name, pic, email){
  var html ='<div class="swiper-slide main-page-contact" id="' + email + '"><div class="contact-container"><img class="image-container border-color-dark-' + colorScheme +'" src="' + pic + '">';
  html += '<table class="contact-name-table"><tr><td class="contact-name-side-td"></td><td><p class="name-contact text-color-main-' + colorScheme +'">' + name + '</p></td><td><p class="contact-name-notif"></p></td></tr></table></div></div>';
  return html;
}


function loadLanguageProf(){
        if (myLanguages == []){
          console.log("hdajsd");
          profilePageSwiper.appendSlide('<div class="swiper-slide"><div class="vacant c100 p0 orange lang-ring lang-ring text-color-alt-' + colorScheme + '"><span> + </span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>');
        }
        for(var i in myLanguages){
            profilePageSwiper.appendSlide('<div class="swiper-slide"><div class="vacant c100 p' + 10* myLanguages[i].prof + ' orange lang-ring lang-ring text-color-alt-' + colorScheme + '"><span>' +  myLanguages[i].name  +'</span><div class="slice"><div class="bar"></div><div class="fill"></div></div></div></div>');
        };
        /*var len = myLanguages.length;
        for(var i= 0; i < len; i++){
             var langRing = document.getElementById("lang-ring" + i);
             langRing.childNodes[1].innerHTML = myLanguages[i].name;
             langRing.className = "c100 orange assigned p " + 10* myLanguages[i].prof + " lang-ring text-color-alt-" + colorScheme;
        }*/
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
                    var requests = parseResponse["friendRequests"];
                    var friendList =  parseResponse["friends"];
                    console.log(lang);
                    $$('.greeting-name')[0].innerHTML = name;
                    $$('.profile-name')[0].innerHTML = name;
                    $$('#profilepicmain')[0].src = pic;
                    for(var i in lang){
                      myLanguages[[lang[i].name]] = 2 * lang[i].prof;
                      //myLanguages.push(lang[i]);
                    }
                    for(var i in convo){
                      var email = parseResponse["convo"][i]["email"];
                      convo[i]["pic"] = parseResponse["friendPics"][i];
                      convo[i]["firstName"] = parseResponse["convo"][i]["firstName"];
                      myConversations[[email]] = convo[i];
                    }
                    for(var i in requests){
                      friendRequests[requests[i]["email"]] = requests[i][requests[i]["email"]];
                      myConversations[requests[i]["email"]]["friendRequest"] =  "Hello";
                    }
                    for(var i in friendList){
                      friends[friendList[i]["email"]] = friendList[i][friendList[i]["email"]];
                      notes[friendList[i]["email"]] = {};
                    }
                    console.log(friends);
                    loadFriends();
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

var colorScheme = 1;

$$('.theme-choice').on('click', function(){
  console.log(this.parentNode);
  var parent = this.parentNode;
  var active = $$(parent)[0].getElementsByClassName('active')[0];
  $$(active).removeClass("active");
  if(!$$(this).hasClass("active")){
    $$(this).toggleClass("active");
    if($$(this).hasClass("light")){
      colorScheme = 2;
      $$('.background-color-dark-1').addClass('background-color-dark-2');
      $$('.background-color-dark-1').removeClass('background-color-dark-1');
      $$('.background-color-light-1').addClass('background-color-light-2');
      $$('.background-color-light-1').removeClass('background-color-light-1');
      $$('.border-color-dark-1').addClass('border-color-dark-2');
      $$('.border-color-dark-1').removeClass('border-color-dark-1');
      $$('.border-color-light-1').addClass('border-color-light-2');
      $$('.border-color-light-1').removeClass('border-color-light-1');
      $$('.text-color-main-1').addClass('text-color-main-2');
      $$('.text-color-main-1').removeClass('text-color-main-1');
      $$('.text-color-alt-1').addClass('text-color-alt-2');
      $$('.text-color-alt-1').removeClass('text-color-alt-1');
    //  $$('.background-color-dark-1').toggleClass('background-color-dark-1');
    //  $$('.text-color-main-1').addClass('text-color-main-2');
    //  $$('.text-color-main-1').toggleClass('text-color-main-1');
      //document.documentElement.style.setProperty('--spiklMainColour', '#ff6600');
      //document.documentElement.style.setProperty('--spiklbkDarkColour', '#ffffff');
      //document.documentElement.style.setProperty('--spiklbkLightColour', '#ffffff');
    //  document.documentElement.style.setProperty('--spiklTextColour', '#2b2b2b');
    //  document.documentElement.style.setProperty('--spiklAltTextColour', '#2b2b2b');
    //  document.documentElement.style.setProperty('--spiklBorderColour', '#2b2b2b');

    }
    else if($$(this).hasClass("dark")){
      colorScheme = 1;
      $$('.background-color-dark-2').addClass('background-color-dark-1');
      $$('.background-color-dark-2').removeClass('background-color-dark-2');
      $$('.background-color-light-2').addClass('background-color-light-1');
      $$('.background-color-light-2').removeClass('background-color-light-2');
      $$('.border-color-dark-2').addClass('border-color-dark-1');
      $$('.border-color-dark-2').removeClass('border-color-dark-2');
      $$('.border-color-light-2').addClass('border-color-light-1');
      $$('.border-color-light-2').removeClass('border-color-light-2');
      $$('.text-color-main-2').addClass('text-color-main-1');
      $$('.text-color-main-2').removeClass('text-color-main-2');
      $$('.text-color-alt-2').addClass('text-color-alt-1');
      $$('.text-color-alt-2').removeClass('text-color-alt-2');
    }
  }
})



colorScheme =2;
$$('.background-color-dark-1').addClass('background-color-dark-2');
$$('.background-color-dark-1').removeClass('background-color-dark-1');
$$('.background-color-light-1').addClass('background-color-light-2');
$$('.background-color-light-1').removeClass('background-color-light-1');
$$('.border-color-dark-1').addClass('border-color-dark-2');
$$('.border-color-dark-1').removeClass('border-color-dark-1');
$$('.border-color-light-1').addClass('border-color-light-2');
$$('.border-color-light-1').removeClass('border-color-light-1');
$$('.text-color-main-1').addClass('text-color-main-2');
$$('.text-color-main-1').removeClass('text-color-main-1');
$$('.text-color-alt-1').addClass('text-color-alt-2');
$$('.text-color-alt-1').removeClass('text-color-alt-1');
