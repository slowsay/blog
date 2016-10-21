// slowsay
var $cs2d, $e, sw = 200, sh = 200;
$(function() {
	_wid = $(window).width(), _hei = $(window).height();

	Home.init();
	Home.addEvent();
	Home.Size();

});
var Home = {
	init : function() {
		if ( typeof FileReader == 'undefined') {
			$('#getpic').hide();
		} else {
			$('#getpic').show();
		}
		$('.popbox').append('all pic load ok');
		//create div canvas
		Comm.addCanvas('div0', 'pic0', sw, sh);
		$e = document.getElementById('pic0');
		$cs2d = $e.getContext('2d');

		$('#div0').css({
			left : 200
		});
	},
	render : function() {

		// _setint = setTimeout(Home.render, 100);
	},
	addEvent : function() {
		Comm.click('#dosave', function(e) {
			$('.popbox').append('<br/>create img...<br/>');
			var s = $e.toDataURL();
			$e.toBlob(function(e) {
				saveAs(e, 'myphone.png', 'image/png');
			});
		});
		//get bitmmap
		$('#getpic').change(function(e) {

			if ( typeof FileReader == undefined) {
				$('.popbox').html('sorry,不支持');
			} else {

				var _filereader = new FileReader();
				var file = e.target.files[0];
				_filereader.readAsDataURL(file);
				$('.popbox').append('<br/>loading...');
				_filereader.onload = function(e) {
					var img = new Image();
					img.src = e.target.result;
					img.onload = function() {
						$cs2d.clearRect(0, 0, sw, sh);
						$cs2d.drawImage(img, 0, 0, img.width, img.height, 0, 0, sw, sh);
						//input text

						with ($cs2d) {
							beginPath();
							lineWidth = 2;
							strokeStyle = 'red';
							rect(0, 0, sw, sh);
							stroke();
							font = '40px 宋体';
							fillStyle = '#ff0000';
							fillText('slowsay', 0, 40);
						}
						img = null;
						//post php
						// console.log($e.toDataURL().replace('data:image/png;base64,', ''));
					};
				};
			}
		});

		//resize
		$(window).resize(function() {
			_wid = $(window).width(), hei = $(window).height();
			Home.Size();
		});
		$(window).scroll(function() {
			Home.Size();
		});
	},
	Size : function() {

	},
	fixedlayer : function(obj, _w, _h, _left, _top) {
		$(obj).css({
			width : _w,
			height : _h,
			left : _left,
			top : _top
		});
	}
};

