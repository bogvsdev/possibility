var $ = require('jquery');

$(function(){

	$('#qu').on('focus', function(){
		if($(this).val().length>0){
			$(this).val('');
			var i = 100, stop = 1, pxls = 1.3;
			var interval = setInterval(function(){
				var $span = $('#result').find('span');
				pxls += 1.3;
				$span.next().css('bottom', '-'+pxls+'px');
				$span.text(i-stop+'%');
				stop++;
				if(i==(stop-1)){
					$span.next().css('background', 'rgba(221, 0, 0, 0.82)');
					clearInterval(interval);
					return;
				}
			}, 5);
		}
	});

	$('#f').on('submit', function(e){
		e.preventDefault();
		$('#btn').prop('disabled', true);
		$('#result').fadeIn(150);
		var i = 1, stop = 100, pxls = 131;
		var interval = setInterval(function(){
			var $span = $('#result').find('span');
			pxls -= 1.3;
			$span.next().css('bottom', '-'+pxls+'px');
			$span.text(i+'%');
			i++;
			if(pxls<110 && pxls >= 60){
				$span.next().css('background', 'rgba(255, 214, 0, 0.77)');
			}else if(pxls<95){
				$span.next().css('background', 'rgba(100, 221, 23, 0.65)');
			}

			if(i==(stop+1)){
				$('#btn').prop('disabled', false);
				clearInterval(interval);
				return;
			}
		}, 50 * i);
	});

	$('.switch.back').on('click', function(e){
		e.preventDefault();
		var item = parseInt($(this).data('item'))-1;
		$(this).data('item', item);
		$('.switch.forward').data('item', item);
		$('body').css({
			'background-image':'url(http://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-'+item+'.jpg)',
			'background-size':'cover'
		});
	});
	$('.switch.forward').on('click', function(e){
		e.preventDefault();
		var item = parseInt($(this).data('item'))+1;
		$(this).data('item', item);
		$('.switch.back').data('item', item);
		$('body').css({
			'background-image':'url(http://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-'+item+'.jpg)',
			'background-size':'cover'
		});
	});
});