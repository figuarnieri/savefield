(function($){
	$.fn.saveFields = function(e){
		var t = this
		, item = $.extend(true, {
			not: null
		}, e)
		, localFields = localStorage.getItem('localFields')
		;
		if(!t.length)return;
		if(e==='clear')return localStorage.removeItem('localFields');
		$('form').each(function(e,f){
			$(f).attr('data-save-forms', e);
		});
		if(localFields){
			var json = JSON.parse(localFields);
			for(i of json){
				if(i.url===location.pathname){
					if(i.type!=='checkbox' && i.type!=='radio'){
						$('[name="'+i.name+'"]', '[data-save-forms="'+i.form+'"]').val(i.value);
					} else {
						if(i.checked===true)$('[name="'+i.name+'"][value="'+i.value+'"]', '[data-save-forms="'+i.form+'"]').attr('checked','checked')
						
					}
				};
			}
		};
		localArray = [];
		if(t[0].tagName==='FORM'){
			$(':input:not(button,:submit)', t).on('input change', function(f){
				$(':input:not(button,:submit)', t).each(function(g,h){
					if($(h).is(item.not))return;
					var formClass = $(h).closest('form').data('saveForms')
					, checked = h.checked||false
					, path = location.pathname
					;
					localArray.push('{"url": "'+path+'","form": "'+formClass+'","name": "'+h.name+'","type": "'+h.type+'","checked":'+checked+',"value": "'+h.value+'"}');
				});
				localStorage.setItem('localFields', '['+localArray+']');
			});
		} else {
			t.on('input change', function(){
				$(t).each(function(g,h){
					var formClass = $(h).closest('form').data('saveForms')
					localArray.push('{"url": "'+location.pathname+'","form": "'+formClass+'","name": "'+this.name+'","type": "'+this.type+'","value": "'+this.value+'"}');
					localStorage.setItem('localFields', '['+localArray+']');
				})
			});
		}
	}
})(jQuery);
