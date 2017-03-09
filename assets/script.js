 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD9utzm8ke2XivVYgLERycgWMhyJji_E8o",
    authDomain: "hogwarts-train-schedule.firebaseapp.com",
    databaseURL: "https://hogwarts-train-schedule.firebaseio.com",
    storageBucket: "hogwarts-train-schedule.appspot.com",
    messagingSenderId: "406539299962"
  };


  firebase.initializeApp(config);

 var database = firebase.database();
 console.log(database);
  
	var tFrequency = 5;

	var tFrequency2 = 8;

	var tFrequency3 = 10;

	var tFrequency4 = 7;

    var firstTime = "12:00";
    var secondTime = "12:30";
    var thirdTime = "12:55";
    var fourthTime = "12:55";


//Question: Ask TA to explain this with the time
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    var secondTimeConverted = moment(secondTime, "hh:mm").subtract(1, "years");
    console.log(secondTimeConverted);


    var thirdTimeConverted = moment(thirdTime, "hh:mm").subtract(1, "years");
    console.log(thirdTimeConverted);

    var fourthTimeConverted = moment(fourthTime, "hh:mm").subtract(1, "years");
    console.log(fourthTimeConverted);
    
    
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
   
    var display = document.getElementById('currentTime');
    display.innerHTML = currentTime;

    // Difference between the times
    var diffTime = moment().diff(firstTimeConverted, "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var diffTime2 = moment().diff(secondTimeConverted, "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime2);
    // Time apart (remainder)

   	var diffTime3 = moment().diff(thirdTimeConverted, "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime3);

    var diffTime4 = moment().diff(fourthTimeConverted, "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime4);

    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    var tRemainder2 = diffTime2 % tFrequency;
    console.log(tRemainder2);

	var tRemainder3 = diffTime3 % tFrequency;
    console.log(tRemainder3);

	var tRemainder4 = diffTime4 % tFrequency;
    console.log(tRemainder4);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
 	
 	var tMinutesTillTrain2 = tFrequency2 - tRemainder2;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain2);

    var tMinutesTillTrain3 = tFrequency3 - tRemainder3;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain3);

    var tMinutesTillTrain4 = tFrequency4 - tRemainder4;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain4);

        // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + nextTrain.format("hh:mm"));

    var nextTrain2 = moment().add(tMinutesTillTrain2, "minutes");
    console.log("ARRIVAL TIME: " + nextTrain2.format("hh:mm"));

    var nextTrain3 = moment().add(tMinutesTillTrain3, "minutes");
    console.log("ARRIVAL TIME: " + nextTrain3.format("hh:mm"));

    var nextTrain4 = moment().add(tMinutesTillTrain4, "minutes");
    console.log("ARRIVAL TIME: " + nextTrain4.format("hh:mm"));


    var displayA =  document.getElementById('one');
    displayA.innerHTML = tFrequency;

    var displayB =  document.getElementById('one1');
    displayB.innerHTML = nextTrain;

    var displayC =  document.getElementById('min1');
    displayC.innerHTML = tMinutesTillTrain;


    var displayD =  document.getElementById('two');
    displayD.innerHTML = tFrequency2;

    var displayE =  document.getElementById('two2');
    displayE.innerHTML = nextTrain2;

   	var displayF =  document.getElementById('min2');
    displayF.innerHTML = tMinutesTillTrain2;


    var displayG =  document.getElementById('three');
    displayG.innerHTML = tFrequency3;

    var displayH =  document.getElementById('three3');
    displayH.innerHTML = nextTrain3;

   	var displayI =  document.getElementById('min3');
    displayI.innerHTML = tMinutesTillTrain3;


    var displayJ =  document.getElementById('four');
    displayJ.innerHTML = tFrequency4;

    var displayK =  document.getElementById('four4');
    displayK.innerHTML = nextTrain4;

   var displayL =  document.getElementById('min4');
    displayL.innerHTML = tMinutesTillTrain4;

	  var destination = "";
	  var frequency = firstTimeConverted;
	  var nextArrival = "";
	  var minutes = "";



  $("#clickBut").one("click", function(event){
  	event.preventDefault();

  	//set the variables equal to the HTML Id's for inserting text
  	destination = $("#formGroupExampleInput").val().trim();
    frequency = $("#formGroupExampleInput2").val().trim();
    nextArrival = $("#formGroupExampleInput3").val().trim();
    minutes = $("#formGroupExampleInput4").val().trim();

  
  database.ref().push({

        destination: destination,
        frequency: frequency,
        nextArrival: nextArrival,
        minutes: minutes,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });

    });

  database.ref().on("value", function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      var sv = snapshot.val();
      
      // Getting an array of each key In the snapshot object
      var svArr = Object.keys(sv);
		console.log("svARR");
		console.log(svArr);
      
      // Finding the last user's key
      var lastIndex = svArr.length - 1;
      var lastKey = svArr[lastIndex];
      
      // Using the last user's key to access the last added user object
      var lastObj = sv[lastKey]

      // Console.logging the last user's data
      console.log(lastObj.destination);
      console.log(lastObj.frequency);
      console.log(lastObj.nextArrival);
      console.log(lastObj.minutes);
      // Change the HTML to reflect

	//Also when I refesh the page, it does not reset the values
      $("#para2").html(lastObj.destination);
      $("#para3").html(lastObj.frequency);
      $("#para4").html(lastObj.nextArrival);
      $("#para5").html(lastObj.minutes);


      // Handle the errors
    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);

    });




 //    $("#clickBut").one("click", function(event2){
 //  	event2.preventDefault();

 //  	  $("#para6").html(lastObj.destination);
 //      $("#para7").html(lastObj.frequency);
 //      $("#para8").html(lastObj.nextArrival);
 //      $("#para9").html(lastObj.minutes);

 // });


//   $("#click").one('click', function(){
//   alert("1st click");
//   $("#click").one('click', function(){
//     alert("2nd click");
//   });
// });