(function($) {

	$("head").append($("<link rel=\"stylesheet\" href=\"./stick.css\">")); // подключил стили 
	$.fn.extend({
		stick: function(opt) {
			let main_div = document.createElement("div");
			main_div.className = "stick_main_div";
				
			let track = document.createElement("div");
			track.className = "track";

			let progress = document.createElement("div");
			progress.className = "progress";

			let thumb = document.createElement("div");
			thumb.className = "thumb";

			let scale = document.createElement("div");
			scale.className = "scale";

			$(this).append(main_div);
			$(this).children(".stick_main_div").append(track);
			$(this).children(".stick_main_div").append(progress);
			$(this).children(".stick_main_div").append(thumb);
			$(this).children(".stick_main_div").append(scale);

		}
	})
})(jQuery);