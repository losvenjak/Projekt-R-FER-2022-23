function checkEulerForConnected(arr) {
    var len = Math.sqrt(arr.length);          
    var numOfOdd = 0;
    for(let i=0; i<len; i++) {
        var sum = 0;
        for(let j=0; j<len; j++) {
            if(arr[i*len+j]!=0) {
                sum += parseInt(arr[i*len+j]);
            }
        }
        if(sum%2!=0) {
            numOfOdd += 1;
        }
        if(i==len-1) {
            if(numOfOdd==0) {
                a.innerHTML += "Graf je eulerovski";
                
                linebreak = document.createElement("br");
                a.append(linebreak);
            }
            else {
                a.innerHTML += "Graf nije eulerovski";
                
                linebreak = document.createElement("br");
                a.append(linebreak);
            }
        }
    }
    if(numOfOdd==2) {
        a.innerHTML += "Graf je semieulerovski";
        linebreak = document.createElement("br");
        a.append(linebreak);
    }
    else {
        a.innerHTML += "Graf nije semieulerovski";
        linebreak = document.createElement("br");
        a.append(linebreak);
    }

}
function checkEulerForDisconnected(arr, edgeArr) {

    var indexOfDisconnected = checkConnected(arr);

    var len = Math.sqrt(arr.length);        
    for(let i=0; i<len; i++) {
        if(arr[i*len+indexOfDisconnected]!=0 ) { 

                //ako nije vrh bez bridova
            if(i==indexOfDisconnected && edgeArr.length==arr[i*len+i]/2) {
                var len = Math.sqrt(arr.length);
                var tempArr = new Array();
                for(let i=0; i<len; i++) {
                    for(let j=0; j<len; j++) {
                        if(i!=indexOfDisconnected && j!=indexOfDisconnected) {
                            tempArr.push(arr[i*len+j]);
                        }
                    }
                }
                var arr = new Array();
                var tempLen = Math.sqrt(tempArr.length);
                for(let i=0; i<tempLen; i++) {
                    for(let j=0; j<tempLen; j++) {
                        arr.push(tempArr[i*tempLen+j]);
                    }
                }
                if(checkConnected(arr)===true) {                    
                    checkEulerForConnected(arr);
                    break;
                }
                else {                    
                    checkEulerForDisconnected(arr, edgeArr);
                break;
                }                        
            }
            else {
                a.innerHTML += "Graf nije eulerovski\n";
                linebreak = document.createElement("br");
                a.append(linebreak);
                a.innerHTML += "Graf nije semieulerovski\n";
                linebreak = document.createElement("br");
                a.append(linebreak);
                break;
            }
        }
        else if(i==len-1){  //graf je nepovezan zbog vrha bez bridova 
                // gledamo je li povezan ako tu tocku iskljucimo

            var len = Math.sqrt(arr.length);
            var tempArr = new Array();
            for(let i=0; i<len; i++) {
                for(let j=0; j<len; j++) {
                    if(i!=indexOfDisconnected && j!=indexOfDisconnected) {
                        tempArr.push(arr[i*len+j]);
                    }
                }
            }
            var arr = new Array();
            var tempLen = Math.sqrt(tempArr.length);
            for(let i=0; i<tempLen; i++) {
                for(let j=0; j<tempLen; j++) {
                    arr.push(tempArr[i*tempLen+j]);
                }
            }
            if(checkConnected(arr)===true) {

                checkEulerForConnected(arr);
                break;
            }
            else {

                checkEulerForDisconnected(arr, edgeArr);
                break;
            }                        
        }
    }
}