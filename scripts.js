
//----------------------------------------------------------------------------------------------
/// REGISTRATION

// Form Main Validation Function 
function validateRegistrationForm(){

  //Remove Previous error texts on each attempt
  hideErrors();

  //Get form data
  var user_first_name = document.getElementById("first_name").value;
  var user_last_name = document.getElementById("last_name").value;
  var user_email = document.getElementById("email").value;
  var user_password1 = document.getElementById("password1").value;
  var user_password2 = document.getElementById("password2").value;
  var user_terms = document.getElementById("terms");

  //Run various tests to make sure data is valid and store return as boolean
  var ValidFirstName = validateNotNull("first_name", user_first_name)
  var ValidLastName = validateNotNull("last_name", user_last_name)
  var ValidEmail = validateEmail("email",user_email);
  var ValidPassword1 = validatePassword1("password1",user_password1);
  var ValidPassword2 = validatePassword2("password2",user_password1, user_password2);
  var ValidTerms = validateTerms("terms",user_terms);

  //If all data is valid, return true, navigate to next page: TripPlanner.html
  if (ValidFirstName && ValidLastName && ValidEmail && ValidPassword1 && ValidPassword2 && ValidTerms) {

    // Store these variables for later use
    // Was using localStorage... but it stopped working for some reason.
    // Maybe JSON data storage would be best... no idea. No experience with Front End + DATA
    // Just for Didactic purposes... Would find a more reliable solution in a real project.
    window.sessionStorage.setItem("Pname", user_first_name + " " + user_last_name);
    window.sessionStorage.setItem("Pemail", user_email);

    return true;
  }
  return false;
}


//Loop through all error messages and hide them.
function hideErrors(){
  var invalidMsg = document.getElementsByClassName("invalid");
  for (var i = 0; i < invalidMsg.length; i++) {
    invalidMsg[i].style.display="none";
  } 
}

function toLower(v){
  v.value = v.value.toLowerCase();
}

///ALL VALIDATE FUNCTIONS
//Return true if data is valid
//Returns false and displays error message if not valid.

// self explanatory function name
function validateNotNull(what, value){
  if (value == "" || value == null){
    var errorMsg = document.getElementById("invalid_" + what)
    errorMsg.style.display = "block";
    errorMsg.innerHTML = "*Required";
    return false;
  } 
  return true;
  
}

//Not very familiar wigh regex...
//Found this formulation on the interwebs
//Makes sure the email contains and '@ and then a '. but no further '@ afterwards.
function validateEmail(what, value){
  if (!validateNotNull(what, value))
    return false;
  var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(value)){
    var errorMsg = document.getElementById("invalid_" + what)
    errorMsg.style.display = "block";
    errorMsg.innerHTML = "*Enter a valid email";
    return false;
  } 
  return true;
}

//More interweb regex...
//Pasword needs between 8 and 20 chars
//needs at least 1 upper, 1 lower, 1 number and 1 special
function validatePassword1(what, value){
  if(value.length< 8 || value.length> 20){
    var errorMsg = document.getElementById("invalid_" + what)
    errorMsg.style.display = "block";
    errorMsg.innerHTML = "*Between 8 and 20 charaters";
    return false;
  }
  var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;
  if (!value.match(re)){
    var errorMsg = document.getElementById("invalid_" + what)
    errorMsg.style.display = "block";
    errorMsg.innerHTML = "*Needs 1 of each: upper-case, lower-case, number and special character";
    return false;
  } 
  return true;
}

//must math password 1
function validatePassword2(what, value1, value2){
  if (!validateNotNull(what, value2)){
    return false;
  }
  if(value1 != value2){
    var errorMsg = document.getElementById("invalid_" + what)
    errorMsg.style.display = "block";
    errorMsg.innerHTML = "*The Passwords don't match";
    return false;
  }
  return true;
}

//Needs terms checked
function validateTerms(what, value){
  if(!value.checked){
    var errorMsg = document.getElementById("invalid_" + what)
    errorMsg.style.display = "block";
    errorMsg.innerHTML = "*Required";
    return false;
  }
  return true;
}


//----------------------------------------------------------------------------------------------

/// PLANNING

// Form Main Validation Function
// Idential logic to last form validation:
// hide old errors, get data, validate data, if valid store data and navigate to next page.
function validatePlanningForm(){

  hideErrors();

  var user_adult = document.getElementById("adult").value;
  var user_room = document.getElementById("room").value;
  var user_duration = document.getElementById("duration").value;
  var user_service = document.getElementById("service").value;


  var ValidBase = ValidateBase("base_cost",user_adult, user_room)
  var ValidOption = ValidateOption("option_modifier",user_duration, user_service)
  
  if (ValidBase && ValidOption) {
    Padv = document.getElementById("adventure")
    if (Padv.options[Padv.selectedIndex].value == 0){
      Padventure = "travel";
    } else{
      Padventure = Padv.options[Padv.selectedIndex].text.toLowerCase();
    }
    //use Adventure Select Field to save background jpg file name
    //Couldn't use name attribute... used text data instead

    Pbackground = "url('img/"+Padventure+".jpg') no-repeat fixed center";
    Ptotal = dollarUS.format(total_cost);

    // Store these variables for success.html page
    // Was using localStorage... but it stopped working for some reason.
    // Maybe JSON data storage would be best... no idea. No experience with Front End + DATA
    // Just for Didactic purposes... Would find a more reliable solution in a real project.
    window.sessionStorage.setItem("Ptotal", Ptotal);
    window.sessionStorage.setItem("Padventure", Padventure);
    window.sessionStorage.setItem("Pbackground", Pbackground);
    return true;
  }
  return false;
}


//Makes sure at least 1 adult and 1 room (children optional)
function ValidateBase(what, v1, v2){
  if (v1 < 1 || v2 < 1){
    var errorMsg = document.getElementById("invalid_" + what)
    errorMsg.style.display = "block";
    errorMsg.innerHTML = "*Need at least 1 Adult and 1 Room";
    return false;
  }
  return true;
}

//Makes sure at both duration and service are selected (not 0 default values)
function ValidateOption(what, v1, v2){
  if (v1 ==0 || v2 == 0){
    var errorMsg = document.getElementById("invalid_" + what)
    errorMsg.style.display = "block";
    errorMsg.innerHTML = "*Select both a Duration and a Service";
    return false;
  }
  return true;
}


//For fun mainly, no functional use, but looks pretty...
//Tried to use a switch case here, but it didn't work...
function changeAdventure(){
  adventure = document.getElementById("adventure").value;
  
  if (adventure == 0){
    document.body.style.background= "url('img/travel.jpg') no-repeat fixed center ";

  } else if (adventure == 1){
    document.body.style.background ="url('img/tropical.jpg') no-repeat fixed center ";

  } else if (adventure == 2){
    document.body.style.background ="url('img/frozen.jpg') no-repeat fixed center ";

  } else if (adventure == 3){
    document.body.style.background ="url('img/beachy.jpg') no-repeat fixed center ";

  }else if (adventure == 4){
    document.body.style.background ="url('img/temperate.jpg') no-repeat fixed center ";

  }else if (adventure == 5){
    document.body.style.background ="url('img/mountany.jpg') no-repeat fixed center ";

  }else if (adventure == 6){
    document.body.style.background ="url('img/desert.jpg') no-repeat fixed center ";

  }
  document.body.style.backgroundSize ="100% 100%";
}


//Found this function on the cyberweb, formats numbers into currency 
let dollarUS = Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});


//The sub totals and total values.
var base_cost = 0;
var option_modifier = 0;
var extra_cost = 0;
var total_cost = 0;


//ALL CALCULATE FUNCTIONS
// -Update values automatically as soon as you update an input
// -No need for a CALCULATE/ESTIMATE button
// -Run the calculateTotal() function, meaning the entire estimate is always updated.
// -Are called on page reload (see the Script at the end of tripPlanner.html)


function calculateBase(){
  //get data
  var user_adult = document.getElementById("adult");
  var user_child = document.getElementById("child");
  var user_room = document.getElementById("room");

  //validate data
  validatePositiveNumber(user_adult);
  validatePositiveNumber(user_child);
  validatePositiveNumber(user_room);

  var adult_cost = user_adult.value * 295.95;
  var child_cost = user_child.value * 195.95;
  var child_room = user_room.value * 425;

  //calculate, format as currency
  base_cost = adult_cost + child_cost+ child_room ;
  document.getElementById("base_cost").innerHTML= "Base Cost: " + dollarUS.format(base_cost) ;
  calculateTotal();
}

//between 0 and 9, otherwise set to null
function validatePositiveNumber(v){
  var reg = new RegExp('^[0-9]$');
  if(v.value < 0|| v.value > 9 || !reg.test(v.value) ){
    v.value=null;
  }

}

//Options is a multiplier which affects base cost.
function calculateOption(){
  var duration = document.getElementById("duration").value;
  //var duration_index =duration.selectedIndex;
  //var duration_value = duration.options[duration_index].value

  var service = document.getElementById("service").value;
  //var service_index =service.selectedIndex;
  //var service_value = service.options[service_index].value

  option_modifier = duration * service ;

  document.getElementById("option_modifier").innerHTML= "Options Modifier: X " + option_modifier ;

  calculateTotal();
}




//Extra costs are fixed single cost if checked

//USING HTML NAME ATTRIBUTE TO STORE ITEM COSTS!!!!!
// Not a solution I would use in a real project (didactic purposes only)
// using a database, price data would be stored in an appropriate fiels.
function calculateExtra(){

  /*
  var extra=document.getElementById(id);
  f = parseFloat(extra.name)
  if (extra.checked){
    extra_cost+= f;
  } else{
    extra_cost-= f;
  }*/
  
  // The above function, is faster, using only the affected checkbox
  // However, the bellow loop also works when function called on page reload.

  

  extra_cost = 0;  
  var extras = document.getElementsByClassName("extra")
  for(var i = 0; i< extras.length; i++){

    if(extras[i].checked){
      f = parseFloat(extra[i].Price);
      extra_cost+= f;
    }
  }
  document.getElementById("extra_cost").innerHTML= "Extra Cost: " + dollarUS.format(extra_cost) ;
  calculateTotal();
}


//Function is called almost all the time on input update.
//Meaning total cost is always up to date
function calculateTotal(){
  total_cost = (base_cost * option_modifier ) + extra_cost;
  document.getElementById("total_cost").innerHTML= "Total Cost: " + dollarUS.format(total_cost) ;
}


//----------------DATA


// This is just for didactic purposes:
// Data would obviously not be stored locally but accessed from a data base
// Wanted to experiment with dynamically populating an html page with data. 
// See appendData function bellow



var extra =[ 
  {
      "ID": "0",
      "Name": "Car Rental",
      "Price": "475.95"
  },
  {
      "ID": "1",
      "Name": "1st Class Flight",
      "Price": "905.75"
  },
  {
      "ID": "2",
      "Name": "Golf Course",
      "Price": "237.95"
  },
  {
      "ID": "3",
      "Name": "Private Kitchen",
      "Price": "205.55"
  },
  {
      "ID": "4",
      "Name": "VIP Access",
      "Price": "2055.95"
  },
  {
      "ID": "5",
      "Name": "Guided Tour",
      "Price": "325.25"
  }

];


//This function is called at the end of tripPlanner.html
// It populates, the greating message with the user's name,
// Fills out the Extras Section, based on data above
// Runs the calculate totals functions

function runTripPlanner(){



  // Retrieving the text input's value which was stored into localStorage
  var Pname = window.sessionStorage.getItem("Pname");
  // Writing the value in the document
  document.getElementById("greeting_message").innerHTML="Greetings "+Pname + "!";

  function appendData(extra) {
      var mainContainer = document.getElementById("extra_container");
      for (var i = 0; i < extra.length; i++) {
          //alert(extra[i].Name);

          var div1 = document.createElement("div");
          div1.className = "col_third";
          div1.id="sub_extra" + i;
          mainContainer.appendChild(div1);

          var subContainer = document.getElementById("sub_extra" + i)
          var div2 = document.createElement("div");
          div2.className = "input_field checkbox_option";
          div2.id="sub_sub_extra" + i;
          subContainer.appendChild(div2);

          var subsubContainer = document.getElementById("sub_sub_extra" + i)
          
          var input = document.createElement("input");
          input.name = extra[i].Name;
          input.id = "extra"+ i;
          input.type= "checkbox";
          input.setAttribute("class","extra");
          //input.class = "extra";
          input.setAttribute("onchange","calculateExtra()");
          //input.onchange="calculateExtra(this.id)";
          subsubContainer.appendChild(input);

          var label = document.createElement("label");
          label.setAttribute("for","extra"+ i);
          label.innerHTML = extra[i].Name + " (" + dollarUS.format(extra[i].Price) + ")";

          subsubContainer.appendChild(label);
      }
  }
  appendData(extra);

  // Ince inputs are saved on page reload:
  //If user reloads page totals are calculated anew.
  changeAdventure();
  calculateBase();
  calculateOption();
  calculateExtra();

}


// SUCESSSSS---------------------------------------

//Nothing much here but displaying the info gathered on both previous pages.

function runSucess(){
  //Get previously stored data
  var Pname = window.sessionStorage.getItem("Pname");
  var Pemail = window.sessionStorage.getItem("Pemail");
  var Padventure = window.sessionStorage.getItem("Padventure");
  var Pbackground = window.sessionStorage.getItem("Pbackground");
  var Ptotal = window.sessionStorage.getItem("Ptotal");

  //Set backgroud to same as Planning page
  document.body.style.background =Pbackground;
  document.body.style.backgroundSize ="100% 100%";

  //Populate Messages
  document.getElementById("success_message1").innerHTML=
  "Very well "+ Pname + ", a travel agent will contact you soon at " + Pemail;

  document.getElementById("success_message2").innerHTML=
  "Your "+ Padventure + " adventure should cost you about "+ Ptotal;

}





