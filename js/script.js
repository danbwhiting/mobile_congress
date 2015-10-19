$('document').ready(function() {

	$('.member_selector').select2();
	
	// listens for user selecting Member of Congress
	$('.member_selector').change(function(e) {
		var memberID = $(this).val(); // get value user selected
		// var url = "http://api.nytimes.com/svc/politics/v3/us/legislative/congress/members/"+memberID+".json?api-key=802ef781cc3d418e77197521ebc5ff41%3A4%3A72627634";


		// Default these to not display 
		$('#memberTwitter').addClass('hide_section');
		$('#memberFacebook').addClass('hide_section');
		$('#memberYouTube').addClass('hide_section');
		$('#memberTermEnding').addClass('hide_section');
		$('.photoInfo').addClass('hide_section');

		var sunlightInfo = "https://congress.api.sunlightfoundation.com/legislators?bioguide_id="+memberID+"&apikey=7845a468f0ee48eabda5d401e834fcd0";
		var sunlightCommittees = "https://congress.api.sunlightfoundation.com/committees?member_ids="+memberID+"&apikey=7845a468f0ee48eabda5d401e834fcd0";

		 $.getJSON(sunlightInfo,function(memberInfo){
		    // this is where we can loop through the results in the json object

			 if (memberInfo.results[0].chamber == 'house') {
				 $('#memberName').html("Rep. "+memberInfo.results[0].first_name+" "+memberInfo.results[0].last_name+", "+memberInfo.results[0].party+"-"+memberInfo.results[0].state+"-"+memberInfo.results[0].district);
			 } else {
			 	 $('#memberName').html("Sen. "+memberInfo.results[0].first_name+" "+memberInfo.results[0].last_name+", "+memberInfo.results[0].party+"-"+memberInfo.results[0].state);
			 }  

			 $('#memberPhoto').html("<img id=\"memberPhotoResize\" src=\"https://theunitedstates.io/images/congress/225x275/"+memberID+".jpg\">");
			 $('#memberDCOffice').html(memberInfo.results[0].office);
			 $('#memberDCPhone').html("<a href=\"tel:"+memberInfo.results[0].phone+"\">"+memberInfo.results[0].phone+"</a>");
			 if (memberInfo.results[0].fax !+ 'null') {
				 $('#memberDCFax').html("F:"+memberInfo.results[0].fax);					 	
			 }

			 $('#memberWebsite').html("<a href=\""+memberInfo.results[0].website+"\"target=\"blank\">"+memberInfo.results[0].website+"</a>");

			 if (memberInfo.results[0].twitter_id != 'null') {
			 	 $('#memberTwitter').html("<a href=\"http://www.twitter.com/"+memberInfo.results[0].twitter_id+"\"target=\"blank\">@"+memberInfo.results[0].twitter_id+"</a>");
			 	 $('#memberTwitter').removeClass('hide_section');
			 } // If they have a Twitter account, display it

			 // Fix Facebook so it will check between ID and Name
			 if (memberInfo.results[0].facebook_id != 'null') {
				 $('#memberFacebook').html("<a href=\"http://www.facebook.com/profile.php?id="+memberInfo.results[0].facebook_id+"\"target=\"blank\">Facebook</a>");
	  	 		 $('#memberFacebook').removeClass('hide_section');

			 } // If they have a Facebook account, display it

			 if (memberInfo.results[0].youtube_id != 'undefined') {
		 		 $('#memberYouTube').html("<a href=\"http://www.youtube.com/"+memberInfo.results[0].youtube_id+"\"target=\"blank\">YouTube</a>");
		 		 $('#memberYouTube').removeClass('hide_section');
	  	  	 } // If they have a YouTube account, display it

	  	  	 if (memberInfo.results[0].chamber === 'senate') {
				 $('#memberTermEnding').html("Term Ending: "+memberInfo.results[0].term_end);  	  	 	
				 $('#memberTermEnding').removeClass('hide_section');
	  	  	 } // Only display term ending if they are in the Senate

			 $('#memberBirthday').html("Birthday: "+memberInfo.results[0].birthday);

			 if (memberInfo.results[0].party === "D") {
			 	$('body').css('background', 'none');
			 	$('body').css('background-color', 'rgba(75,136,203,1)');
			 } else if (memberInfo.results[0].party === "R") {
			 	$('body').css('background', 'none');
			 	$('body').css('background-color', 'rgba(255,0,60,1)');
			 } else {
			 	$('body').css('background', 'none');
			 	$('body').css('background-color', 'rgba(127,43,81,.7)');
			 } // Change the background color depending on their party

			 $('#initial_info').removeClass('hide_section');
		 });

		 $.getJSON(sunlightCommittees,function(memberCommittee) {
		 	// Get the committee data

				$('#committees').empty(); // Clears previous committees

				$('#committees').append('<h2>Committee Assignments</h2>');

		 		$.each(memberCommittee.results, function(index) {	
		 			if (memberCommittee.results[index].subcommittee) {
		 				$('#committees').append('<div class="subcommittee">'+memberCommittee.results[index].name+' Subcommittee');	 			
		 			} else {
			 			$('#committees').append('<div>'+memberCommittee.results[index].name);	 			
		 			}
		 		}); // Loop to load committee assignments

		 		$('.committeeInfo').css('border', '1px solid white');
		 }); // End of committee data	

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

