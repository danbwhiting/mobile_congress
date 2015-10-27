$('document').ready(function() {

	// Load members into menu


	var sunlightInfoAll = "https://congress.api.sunlightfoundation.com/legislators?in_office=true&apikey=7845a468f0ee48eabda5d401e834fcd0&per_page=all&order=last_name_dsc";
	var sunlightAllCommittees = "https://congress.api.sunlightfoundation.com/committees?apikey=7845a468f0ee48eabda5d401e834fcd0&per_page=all";

	// gets all members in descending order 

	$.getJSON(sunlightInfoAll, function(membersForSelect) {
		$.each(membersForSelect.results, function(index) {	
		 	if (membersForSelect.results[index].chamber === 'house') {
					$('.member_selector').append('<option value=\"'+membersForSelect.results[index].bioguide_id+'\">'+membersForSelect.results[index].last_name+', '+membersForSelect.results[index].first_name+', '+membersForSelect.results[index].state+'-'+membersForSelect.results[index].district+'</option>');
	 			} else {
					$('.member_selector').append('<option value=\"'+membersForSelect.results[index].bioguide_id+'\">'+membersForSelect.results[index].last_name+', '+membersForSelect.results[index].first_name+', '+membersForSelect.results[index].state+'</option>');
	 			}
		});
	 }); 

	// load all committees in descending order

	$.getJSON(sunlightAllCommittees, function(committeesForSelect) {
		$.each(committeesForSelect.results, function(index) {	
			if (!committeesForSelect.results[index].subcommittee) {
				$('.member_selector').append('<option value=\"'+committeesForSelect.results[index].committee_id+'\">'+committeesForSelect.results[index].name+' Committee</option>');
			}
		});
	 }); 


	$('.member_selector').select2( {
		placeholder: "Name, State, District, Committee"
	}); // Plugin for type-ahead 
	
	// listens for user selecting Member of Congress
	$('.member_selector').change(function(e) {
		var memberID = $(this).val(); // get value user selected

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
			 // if (memberInfo.results[0].fax != null) {
				//  $('#memberDCFax').html("F:"+memberInfo.results[0].fax);					 	
			 // } -- No one cares about the fax number, right?

			 $('#memberWebsite').html("<a href=\""+memberInfo.results[0].website+"\"target=\"blank\">Website</a>");

			 if (memberInfo.results[0].twitter_id != null) {
			 	 $('#memberTwitter').html("<a href=\"http://www.twitter.com/"+memberInfo.results[0].twitter_id+"\"target=\"blank\">@"+memberInfo.results[0].twitter_id+"</a>");
			 	 $('#memberTwitter').removeClass('hide_section');
			 } // If they have a Twitter account, display it

			 // Fix Facebook so it will check between ID and Name

			 if (memberInfo.results[0].facebook_id != null) {
				 $('#memberFacebook').html("<a href=\"http://www.facebook.com/profile.php?id="+memberInfo.results[0].facebook_id+"\"target=\"blank\">Facebook</a>");
	  	 		 $('#memberFacebook').removeClass('hide_section');
			 } // If they have a Facebook account, display it

			 if (memberInfo.results[0].youtube_id != undefined) {
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
			 	$('body').css('background-color', 'rgba(15,56,255,.7)');
			 } else if (memberInfo.results[0].party === "R") {
			 	$('body').css('background', 'none');
			 	$('body').css('background-color', 'rgba(255,22,54,1)');
			 } else {
			 	$('body').css('background', 'none');
			 	$('body').css('background-color', 'rgba(164,37,232,.7)');
			 } // Change the background color depending on their party

			 $('#contactInfo').removeClass('hide_section')
			 $('#committees').removeClass('hide_section');
		 });

		 $.getJSON(sunlightCommittees,function(memberCommittee) {
		
				$('#committees').empty(); // Clears previous committees

				$('#committees').append('<h2>Committee Assignments</h2>');


		 		$.each(memberCommittee.results, function(index) {
		 			if (!memberCommittee.results[index].subcommittee) {
		 				$('#committees').append('<div id='+memberCommittee.results[index].committee_id+'>'+memberCommittee.results[index].name);	 			
		 			} 
		 		}); // Loop to load committee assignments

		 		$.each(memberCommittee.results, function(index) {
		 			if (memberCommittee.results[index].subcommittee) {
		 				$('#'+memberCommittee.results[index].parent_committee_id).append('<div class="subcommittee">'+memberCommittee.results[index].name+' Subcommittee');
		 			}
		 		}); // Loop again to load subcommittee assignments and place under parent committee

		 }); // End of committee data	

	 });

});

	// Display the help and info slide down section
	$('.glyphicon-info-sign').on('click', function() {
	      $('.dropDownWrap').slideToggle();
	 });

