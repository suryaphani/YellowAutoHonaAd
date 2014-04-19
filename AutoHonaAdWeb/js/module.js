/**
 * 
 */

        var selDiv = "";
	document.addEventListener("DOMContentLoaded", init, false);

	function init() {
		document.querySelector('#upload_file').addEventListener('change', handleFileSelect, false);
		selDiv = document.querySelector("#selectedFiles");
	}
		
	function handleFileSelect(e) {
		if(!e.target.files) return;
		var files = e.target.files;
		for(var i=0; i<files.length; i++) {
			var f = files[i];
			selDiv.innerHTML += "<div class='file_list'>"+f.name + "</div>";
		}
                $('#uploadimages').show();
	}
	
	$(document).ready(function(){
 
	    $('#Form1').on('submit',(function(e) {
	        e.preventDefault();
	        var formData = new FormData(this);

	        $.ajax({
	            type:'POST',
	            url: 'http://autohonatest.meximas.com/service/upload.php',
	            data:formData,
	            cache:false,
	            contentType: false,
	            processData: false,
	            success:function(data){
		            $("#selectedFiles").html("");
					$("#uploadimages").hide();
	            	 reset("success");
	            	 
	            },
	            error: function(data){
	            	 $("#selectedFiles").html("");
	            	reset("error");
	            }
	        });
	    }));

	     
	    
	    $("#uploadTrigger").click(function(){
		$("#upload_file").click();
            });	
	});

	
	
	function reset(status) {
		$("#toggleCSS").attr("href", "css/themes/alertify.default.css");
		alertify.set({
			labels : {
				ok : "OK",
				cancel : "Cancel"
			},
			delay : 5000,
			buttonReverse : false,
			buttonFocus : "ok"
		});
		if (status == "success")
			alertify.success("Successfully uploaded");
		else
			alertify.error("Error upload again or try again later");
	}

	$("#success").on('click', function() {
		reset();
		alertify.success("Successfully uploaded");
		return false;
	});

	$("#error").on('click', function() {
		reset();
		alertify.error("Error upload again or try again later");
		return false;
	});