$(function (){
	$.webmis.inc({files:[$webmis_plugin+'form/Validform.min.js']});
/* Index */
	$('#listBG').webmis('TableOddColor');
/* Search */
	$('#ico-search').click(function(){
		if(!IsMobile){moWidth = 520; moHeight= 400;}
		$.webmis.win('open',{title:$(this).text(),width:moWidth,height:moHeight,overflow:true});
		// Content
		var url = $('#getUrl').text();
		$.get($base_url+'SysAdmin/sea'+url,function(data){
			$.webmis.win('load',data);
			$('#seaSub').webmis('SubClass');
		});
		return false;
	});
/* Add */
	$('#ico-add').click(function(){
		if(!IsMobile){moWidth = 620; moHeight= 480;}
		$.webmis.win('open',{title:$(this).text(),width:moWidth,height:moHeight,overflow:true});
		// Content
		$.get($base_url+'SysAdmin/add',function(data){
			$.webmis.win('load',data);
			menusForm();
		});
		return false;
	});
/* Edit */
	$('#ico-edit').click(function(){
		var id = $('#listBG').webmis('GetInputID');
		if(id){
			if(!IsMobile){moWidth = 620; moHeight= 420;}
			$.webmis.win('open',{title:$(this).text(),width:moWidth,height:moHeight,overflow:true});
			// Content
			$.post($base_url+'SysAdmin/edit',{'id':id},function(data){
				$.webmis.win('load',data);
				menusForm();
			});
		}else{noSelect();}
		return false;
	});
/* Del */
	$('#ico-del').click(function(){
		var id = $('#listBG').webmis('GetInputID',{type:'json'});
		if(id){
			$.webmis.win('open',{title:$(this).text(),width:280,height:160});
			$.post($base_url+'SysAdmin/del',{'id':id},function(data){
				$.webmis.win('load',data);
				$('#Sub').webmis('SubClass');
				$('#DelID').val(id);
				menusForm();
			});
		}else{noSelect();}
		return false;
	});
});

/* Form validation */
function menusForm(){
	$('#Sub').webmis('SubClass');
	//  Validation
	$("#Form").Validform({ajaxPost:true,tiptype:2,
		beforeCheck:function(data){
			var perm=0;
			$('#PermVal:checked').each(function(){
				perm += parseInt($(this).val());
			});
			$('#menus_perm').val(perm);
		},
		callback:function(data){
			$.Hidemsg();
			if(data.status=="y"){
				var url = $('#getUrl').text();
				$.webmis.win('close','SysAdmin'+url);
			}else{
				$.webmis.win('close');
				$.webmis.win('open',{title:data.title,content:'<b class="red">'+data.msg+'</b>',AutoClose:3,AutoCloseText:data.text});
			}
		}
	});
}