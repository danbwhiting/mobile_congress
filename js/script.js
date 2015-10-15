$('document').ready(function() {

	$('.member_selector').select2( {
		placeholder: "Select a member"
	});

	
	// listens for user selecting Member of Congress
	$('.member_selector').change(function(e) {
		var memberID = $(this).val(); // get value user selected
		// var url = "http://api.nytimes.com/svc/politics/v3/us/legislative/congress/members/"+memberID+".json?api-key=802ef781cc3d418e77197521ebc5ff41%3A4%3A72627634";

		var sunlightInfo = "https://congress.api.sunlightfoundation.com/legislators?bioguide_id="+memberID+"&apikey=7845a468f0ee48eabda5d401e834fcd0";

		 $.getJSON(sunlightInfo,function(memberInfo){
		    // this is where we can loop through the results in the json object

			 // $('#memberName').html(memberInfo.results[0].first_name+" "+memberInfo.results[0].last_name+", "+memberInfo.results[0].roles[0].party+"-"+memberInfo.results[0].roles[0].state);
			 // $('#memberDCOffice').html("325 Russell");
			 // $('#memberDCPhone').html("202-224-1100");
			 // $('#memberWebsite').html(memberInfo.results[0].url);
			 // $('#memberTwitter').html("@"+memberInfo.results[0].twitter_account);
			 // $('#memberFacebook').html("Facebook");


			 if (memberInfo.results[0].chamber == 'house') {
				 $('#memberName').html("Rep. "+memberInfo.results[0].first_name+" "+memberInfo.results[0].last_name+", "+memberInfo.results[0].party+"-"+memberInfo.results[0].state+"-"+memberInfo.results[0].district);
			 } else {
			 	 $('#memberName').html("Sen. "+memberInfo.results[0].first_name+" "+memberInfo.results[0].last_name+", "+memberInfo.results[0].party+"-"+memberInfo.results[0].state);
			 }

			 $('#memberDCOffice').html(memberInfo.results[0].office);
			 $('#memberDCPhone').html("Phone: "+memberInfo.results[0].phone);
			 $('#memberWebsite').html(memberInfo.results[0].website);
			 $('#memberTwitter').html("<a href=\"http://www.twitter.com/"+memberInfo.results[0].twitter_id+"\"target=\"blank\">@"+memberInfo.results[0].twitter_id+"</a>");
			 $('#memberFacebook').html("<a href=\"http://www.facebook.com/profile.php?id="+memberInfo.results[0].facebook_id+"\"target=\"blank\">Facebook</a>");

			 // Check for null on Twitter, Facebook, and YouTube

			 $('#memberYouTube').html("<a href=\"http://www.youtube.com/"+memberInfo.results[0].youtube_id+"\"target=\"blank\">YouTube</a>");
			 $('#memberTermEnding').html("Term Ending: "+memberInfo.results[0].term_end);
			 $('#memberDCFax').html("Fax: "+memberInfo.results[0].fax);
			 $('#memberBirthday').html("Birthday: "+memberInfo.results[0].birthday);

			 if (memberInfo.results[0].party === "D") {
			 	$('body').css('background-color', 'rgba(75,136,203,1)');
			 } else if (memberInfo.results[0].party === "R") {
			 	$('body').css('background-color', 'rgba(242,108,79,1)');
			 }

			 // Check for null on Twitter, Facebook, and YouTube

			 $('#initial_info').removeClass('hide_section');

			 // $('.member_selector').addClass('hide_section');
			 // $('#newSearchButton').removeClass('hide_section');

			 // $('#memberFacebook').html("<a href=\"http://www.facebook.com/"+memberInfo.results[0].facebook_account+"\" target=\"_blank\">Facebook</a>");
		 });
	 });

	// 	$('#initial_info').css('visibility', 'visible');

	// 		    // $.each(json.results[0].members,function(i, memberInfo){
	// 	     // 		// this is where we do what we want with each tweet
	// 	   		//  $('#results').append('<p>'+cnyt.twitter_account+'</p>');
	// });


	//Page 1 Navigation 

	$('#page1Arrow').click(function() {
		event.preventDefault();
		$("#input_screen").hide();
		$("#initial_info").hide();
		$("#page2").slideUp("slow", function() {
			$("#page2").show();
			console.log("here");
		});
	});

	//Page 2 Navigation 

	$('#page2UpArrow').click(function() {
		event.preventDefault();
		$("#page2").hide();
		$("#initial_info").slideUp("slow", function() {
			$("#input_screen").show();
			$("#initial_info").show();

		});
	});

	//Page 3 Navigation 

	$('#page2UpArrow').click(function() {
		event.preventDefault();
		$("#page2").hide();
		$("#initial_info").slideUp("slow", function() {
			$("#input_screen").show();
			$("#initial_info").show();

		});
	});







	//Page 4 Navigation

	$('#page4UpArrow').click(function() {
		event.preventDefault();
		$("#page2").hide();
		$("#initial_info").slideUp("slow", function() {
			$("#input_screen").show();
			$("#initial_info").show();

		});
	});

});



// Listen for a click on the House button. Change it to primary, and Senate to default

	// $('#house_button').click(function() {
	// 	$('#house_button').attr('class','btn btn-primary');
	// 	$('#senate_button').attr('class', 'btn btn-default');
	// });

	// Listen for a click on the Senate button. Change it to primary, and House to default

	// $('#senate_button').click(function() {
	// 	$('#senate_button').attr('class','btn btn-primary');
	// 	$('#house_button').attr('class', 'btn btn-default');
	// });

	// $(function() {
	//     var members = [
	//       "Risch",
	//       "Crapo",
	//       "McCarthy",
	//       "Labrador",
	//       "Simpson",
	//       "Hoyer"
	//     ];
	//     $( "#memberSelector" ).autocomplete({
	//       source: members
	//     });
	//   });

	// Retrieve info for member search

	// User selects from dropdown
	// Use id to pull info from api
	// Update HTML in info section based on info from api
	// Unhide info section

	// var data = [{ id: 'A000360', text: 'Crapo'}, 
	// 				{ id: 'R000584', text: 'Risch'}, 
	// 				{ id: 'C000800', text: 'Alexander'}, 
	// 				{ id: 'M000303', text: 'McCain'} 
	// 				];

	// $('.member_selector').select2( {
	// 	placeholder: "Select a Member",
	// 	// allowClear: true,
	// 	data: data
	// });


// var url = "http://api.nytimes.com/svc/politics/v3/us/legislative/congress/113/senate/members/current.json?api-key=802ef781cc3d418e77197521ebc5ff41%3A4%3A72627634";

	// get the json file
	// $('#start').click(function() {
	// 	 console.log("Started");
	// 	 $.getJSON(url,function(json){
	//     // this is where we can loop through the results in the json object

	// 	    $.each(json.results[0].members,function(i, cnyt){
	//      		// this is where we do what we want with each tweet
	//    		 $('#results').append('<p>'+cnyt.twitter_account+'</p>');
	// 		});		
	// 	});
	// });


