var scene = document.getElementById('scene');
var parallax = new Parallax(scene);
//	HISTORICIZE AND AJAXIFY OUR SITE
jQuery(document).ready(function() {


	if ($(".scene")[0]){
	    
	}

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


	


	// Form submission
	$('#myform').submit(function(event) {
		event.preventDefault();
		submitdata();
	});
	function submitdata() {
		var url = 'http' + '://' + 'formspree' + '.io/' + 'martin' + '@' + 'mcneeladesign' + '.' + 'com'
		console.log(url);
		$.ajax({
			url: 'http://formspree.io/martin@mcneeladesign.com',
			method: 'POST',
			data: $('#myform').serialize(),
			dataType: 'json',
			beforeSend: function() {
				$('#myform').append('<div class="alert alert--loading">Sending message…</div>');
			},
			success: function(data) {
				$('#myform').find('.alert--loading').hide();
				$('#myform').append('<div class="alert alert--success">Message sent!</div>');
			},
			error: function(err) {
				$('#myform').find('.alert--loading').hide();
				$('#myform').append('<div class="alert alert--error">Ops, there was an error.</div>');
			}
		});
	}


});