Open with title and one search box - typeahead selector

** To fill the typeahead selector **

Dynamic option - Pull members of Congress, House and Senate, JSON data into an array 

Static option - Setup array of members of Congress, House and Senate. 

Array has: 

	MemberID; Last Name; State; District if House

** Selector **

Typeahead selector pulls from array
Suggests based on last name

** Selector **

Once selection is made, use MemberID to pull information from JSON from Sunlight API

Pull all data in at once:

	First Name
	Last Name
	Title
	Nickname
	Name Suffix
	Party
	State (Postal)
	State Name
	District
	Gender
	Birthdate
	Term Starting
	Term Ending
	VoteSmart ID
	FEC ID
	GovTrack ID
	CRP ID
	Website URL
	Contact Form
	Facebook URL
	Twitter
	YouTube
	DC Phone
	DC Fax
	DC office

If Mobile

	Remove search box and place magnifying glass in top right; shrink title
	Display values for: 
		Title, First Name, Last Name, and Suffix and Nickname (if present), Party and State/District
		Term Ending
		DC Phone
		DC Office 
		Website URL

	Next Page Button/Back Page Buttons or Magnifying Glass for New Search 

	Next page dislays: 

		Website Contact Form
		Facebook URL
		Twitter Handle w/ Link 
		YouTube URL
		DC Fax

	Back Page Button/Magnifying Glass for New Search

If Desktop

	Pull search box to top right
	Last box acroos top displays Member's title, full name, party, district/state, DC phone, DC office, DC Fax
	Box display links to Website, Contact Form, Facebook, Twitter, YouTube
		(Could have box switch between latest tweets, facebooke, youtube)
	Box displays latest Tweets
	Box displays a couple of YouTube videos
	Box displays recent news

	User can enter new search and page updates dynamicaly







