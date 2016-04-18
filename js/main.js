//	HISTORICIZE AND AJAXIFY OUR SITE
jQuery(document).ready(function() {
	var siteUrl = 'http://'+(document.location.hostname||document.location.host);

	//	Catch all internally-focused links and push a new state.
	//	Note: External links will not be affected by this behavior.
	$(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
		e.preventDefault();
		History.pushState({}, "", this.pathname);
	});

	History.Adapter.bind(window, 'statechange', function(){
		var State = History.getState();
		$.get(State.url, function(data){	// Use AJAX to get the new content.
			document.title = data.match(/<title>(.*?)<\/title>/)[1];
			$('.content').html($(data).find('.content')); 	// Pull the post we want out of the .content class.
															// If you change the class of the post container,
															// you must change it here!!!
			// _gaq.push(['_trackPageview', State.url]);	// This updates Google Analytics with a visit to the new page.
														// If you don't use Google Analytics, you can safety comment or
														// remove that line.
		});
	});


	// var $contactForm = $('#contact-form');
	// $contactForm.submit(function(e) {
	// 	e.preventDefault();
	// 	$.ajax({
	// 		url: '//formspree.io/martin@mcneeladesign.com',
	// 		method: 'POST',
	// 		data: $(this).serialize(),
	// 		dataType: 'json',
	// 		beforeSend: function() {
	// 			$contactForm.append('<div class="alert alert--loading">Sending message…</div>');
	// 		},
	// 		success: function(data) {
	// 			$contactForm.find('.alert--loading').hide();
	// 			$contactForm.append('<div class="alert alert--success">Message sent!</div>');
	// 		},
	// 		error: function(err) {
	// 			$contactForm.find('.alert--loading').hide();
	// 			$contactForm.append('<div class="alert alert--error">Ops, there was an error.</div>');
	// 		}
	// 	});
	// });
	$('#myform').submit(function(event) {
		event.preventDefault();
		/* Act on the event */
		submitdata();
	});
	function submitdata() {
		$.ajax({
		  url: 'http://formspree.io/martin@mcneeladesign.com',
		  method: 'POST',
		  data: $('#myform').serialize(),
		  dataType: 'json',
		  beforeSend: function() {
		  	console.log('sending...');
		  },
		  success: function(data) {
		  	console.log(data);
		  },
		  error: function(err) {
		  	console.log(err);
		  }
		});
	}


});


// Formspree submission
// var contactform =  document.getElementById('contactform');
// contactform.setAttribute('action', '//formspree.io/' + 'martin' + '@' + 'mcneeladesign' + '.' + 'com');