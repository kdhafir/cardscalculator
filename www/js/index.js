var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();


// Generate Whatsapp msg
function whatsgen(){
	msgtext = "فاتورة كروت \n\n";
	for (var i = 0; i < localStorage.length; i++){
		var cardtobuy = document.getElementById("cardcount" + i).value;
		if(cardtobuy > 0){
			var msgtext = msgtext + cardtobuy + " ";
			var msgtext = msgtext + document.getElementById("cardlabel" + i).innerHTML+ "\r\n";
		}
	}
	msgtext = msgtext + "----\n";
	msgtext = msgtext + "*اجمالي عدد الكروت* " + document.getElementById("totalcards").innerHTML + "\r\n";
	msgtext = msgtext + "*اجمالي مبلغ الكروت* " + document.getElementById("totalmony").innerHTML + "\r\n";
    document.getElementById("summarybody").innerHTML = msgtext;
    document.getElementById("sharebtn").setAttribute("onclick", "sharefun()");//\""+ msgtext +"\"
	
	$("#summaryModal").modal();
}

// Share to Whatsapp , telegram ... etc 
function sharefun(){
    var sharedmsg = document.getElementById("summarybody").innerHTML;
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    var options = {
    message: sharedmsg, // not supported on some apps (Facebook, Instagram)
    subject: 'فاتورة كروت', // fi. for email
    files: ['', ''], // an array of filenames either locally or remotely
    url: '',
    chooserTitle: 'اختر تطبيق لارسال الفاتورة', // Android only, you can override the default share sheet title, //
    appPackageName: '' // Android only, you can provide id of the App you want to share with
    };
  
    var onSuccess = function(result) {
    console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
    console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)
    };
  
  var onError = function(msg) {
    console.log("Sharing failed with message: " + msg);
  };
  
  window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
}
// Formating Numbers by adding commas
function addCommas(nStr)
{
	nStr += '';
	x = nStr.split('.');
	x1 = x[0];
	x2 = x.length > 1 ? '.' + x[1] : '';
	var rgx = /(\d+)(\d{3})/;
	while (rgx.test(x1)) {
		x1 = x1.replace(rgx, '$1' + ',' + '$2');
	}
	return x1 + x2;
}

  //doing the math 
  function sumcards(){
	var grandtotal = 0;
  var totalcards = 0;
	var cardcount = 0;
	var cardprice = 0;
	var subtotl = 0;
	var cardcountid;
	var cardpriceid;
	for (var i = 0; i < localStorage.length; i++){
		cardcountid = "cardcount"+i;
		cardpriceid = "cardprice"+i;
		cardcount = parseInt(document.getElementById(cardcountid).value);
	cardprice = parseInt(document.getElementById(cardpriceid).value);
	if (!isNaN(cardcount)){
	  subtotl = cardcount * cardprice;
			grandtotal = grandtotal + subtotl;
			totalcards = totalcards + cardcount;
	}
	}              
  document.getElementById("totalcards").innerHTML = totalcards;
  document.getElementById("totalmony").innerHTML = addCommas(grandtotal);
}

//Local Storage test
if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
} else {
    // Sorry! No Web Storage support..
}

if (localStorage.length > 0){
	  var cardpriceArray = new Array([]);
	  for (var i = 0; i < localStorage.length; i++){
		  cardpriceArray[i] = localStorage.key(i);
	  }
	  cp_array = cardpriceArray.sort();
	  //cp_array = cardpriceArray.reverse();
	  for (var i = 0; i < localStorage.length; i++){
		  //var row = "<div class=\"form-group\"><label class=\"control-label\" for=\"cardcount" + i + "\">" + localStorage.key(i) + "</label><input class=\"form-control inputTab\" type=\"number\" id=\"cardcount" + i + "\"><input type=\"hidden\" id=\"cardprice" + i + "\" value=\"" + localStorage.getItem(localStorage.key(i)) + "\"></div>";
		  var row = "<div class=\"form-group\"><label class=\"control-label\" id=\"cardlabel"+ i +"\" for=\"cardcount" + i + "\">" + localStorage.getItem(cp_array[i]) + "</label><input class=\"form-control inputTab\" type=\"number\" id=\"cardcount" + i + "\"><input type=\"hidden\" id=\"cardprice" + i + "\" value=\"" + cp_array[i] + "\"></div>";
		  $('#formcontent').append(row);
	  }
	  $('#formcontent').append("<button class=\"btn btn-primary col-sm-6\" type=\"button\" onclick=\"sumcards();\"> احسب </button>");
	  $('#formcontent').append("<a class=\"btn btn-success col-sm-4\" id=\"whatsappbtn\" href=\"#\" onclick=\"whatsgen()\">الملخص</a>");
	  $('#formcontent').append("<button class=\"btn btn-danger col-sm-2 pull-left\" type=\"reset\"> مسح </button>");
	  //$('#formcontent').append("<a class=\"btn\" href=\"https://api.whatsapp.com/send?phone=whatsappphonenumber&text=" + encodeURIComponent(urlencodedtext) + "\">ارسل</a>");
	  
	  
	  document.getElementById("cardcount0").focus();
  }else{
	  var startmsg = "أضف مجموعة من فئات الكروت وأسعارها في شاشة " + "<br><a href=\"settings.html\" class=\"btn btn-default\"> الإعدادات </a>";
	  $('#formcontent').append(startmsg);
  }
  

    
  $(".inputTab").keyup(function (event) {
  if (event.keyCode == 13) {
		  textboxes = $("input.form-control");
		  currentBoxNumber = textboxes.index(this);
		  if (textboxes[currentBoxNumber + 1] !== null) {
				  nextBox = textboxes[currentBoxNumber + 1];
				  nextBox.focus();
				  nextBox.select();
		  }
		  event.preventDefault();
		  return false;
  }
  });