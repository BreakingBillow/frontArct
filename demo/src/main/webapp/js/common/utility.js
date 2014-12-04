function getHMAC(hashInput, privateKey) {
	try {
		hashInput = hashInput + '';
		privateKey = privateKey + '';
		var hmac = new jsSHA(hashInput, "TEXT");
		return hmac.getHMAC(privateKey, 'TEXT', "SHA-256", 'B64');
	} catch(e) {
		return "";
	}
}	

function calcHash(hashInput) {
	try {
		hashInput = hashInput + '';
		var hashObj = new jsSHA(hashInput, "TEXT");
		return hashObj.getHash("SHA-256", 'B64', 1);
	} catch(e) {
		return "";
	}
}	

function cloneObject(obj){
    if(obj == null || typeof(obj) != 'object'){
        return obj;
    }

    var temp = obj.constructor(); // changed

    for(var key in obj) {
        temp[key] = cloneObject(obj[key]);
    }
    
    return temp;
}

function copyObject(srcObj, dstObj){
    if(srcObj == null || typeof(srcObj) != 'object'){
        dstObj = srcObj;
        return;
    }

	if(dstObj == null){
		dstObj = new Object();
	}

	for(var key in srcObj) {
    	if(srcObj[key] == null || typeof(srcObj[key]) != 'object'){
    		dstObj[key] = srcObj[key];
    	} else {
        	copyObject(srcObj[key], dstObj[key]);
    	}
    }
}

function moveArrayElement(arr, fromIndex, toIndex) {
	if(arr == null){
		return;
	}
	if(fromIndex < 0 || toIndex < 0){
		return;
	}
	if(fromIndex >= arr.length || toIndex >= arr.length){
		return;
	}
    element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}				

function getSecureHeader(){
	var timestamp = new Date().getTime();
	var hmac = getHMAC(apiKey, privateKey);
	return {'apiKey': apiKey, 'hmac':hmac, 'timestamp':timestamp};
}

function getTheDateOfNextYear(){
	var date = new Date();

	//GET YYYY, MM AND DD FROM THE DATE OBJECT
	var yyyy = (date.getFullYear() + 1).toString();
	var mm = (date.getMonth()+1).toString();
	var dd  = date.getDate().toString();

	//CONVERT mm AND dd INTO chars
	var mmChars = mm.split('');
	var ddChars = dd.split('');

	//CONCAT THE STRINGS IN YYYY-MM-DD FORMAT
	return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}

