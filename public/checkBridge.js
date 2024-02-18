var hasBridge = -2;
function checkBridge(arr) {
    var tempArr = new Array();
    var len = Math.sqrt(arr.length);                
    var most = 0 //nema
    for(let i=0; i<len; i++) {
        for(let j=0; j<len; j++) {
            tempArr.push(arr[i*len+j]);
        }
    }
    for(let i=0; i<len; i++) {
        for(let j=0; j<len; j++) {
            if(arr[i*len+j]!=0) {                           
                arr[i*len+j]=parseInt(arr[i*len+j])-1;
                arr[j*len+i]=parseInt(arr[j*len+i])-1;
                if(checkConnected(arr) === true) {                               
                    arr[i*len+j]=tempArr[i*len+j];
                    arr[j*len+i]=tempArr[j*len+i];
                }
                else {
                    most = 1;                            
                    arr[i*len+j]=tempArr[i*len+j];
                    arr[j*len+i]=tempArr[j*len+i];
                    break;
                }
            }
        }
        if(most==1) break;
    }
    if(most==1) {
        hasBridge=1;
    }
    else {
        hasBridge=0;
    }
}
function bridgeRecursion(arr) {
    var tempArr = new Array();
    var len = Math.sqrt(arr.length);
    for(let i=0; i<len; i++) {
        for(let j=0; j<len; j++) {
            tempArr.push(arr[i*len+j]);
        }
    }
    if(checkConnected(arr) === true) {
        checkBridge(arr);
        if(hasBridge==0) {
            a.innerHTML += "Graf nema mostove\n";
            linebreak = document.createElement("br");
            a.append(linebreak);
        }
        else {
            a.innerHTML += "Graf ima mostove\n";
            linebreak = document.createElement("br");
            a.append(linebreak);
        }
    }
    else {  
        var verticesArray = new Array();
        for(let i=0; i<len; i++) {
            verticesArray.push(0);      //kada budemo prolazili po vrhovima, stavljat cemo 1
        }
        verticesArray[0] = 1;           //prvi vrh posjecen, krecemo traziti ciklus
        for(let i=0; i<len; i++) {
            for(let j=0; j<len; j++) {
                if(arr[i*len+j]!=0) {                
                    if(i==0) {
                        verticesArray[j] = 1;                            
                    }                        
                    else {
                        if(verticesArray[j] == 1) {
                            for(let k=0; k<len; k++) {
                                if(arr[i*len+k]!=0 && verticesArray[k]==0) {
                                    verticesArray[k] = 1;                                                
                                }
                            }                                        
                        }
                        break;
                    }                    
                }                
            }            
        }
        var tempArr = new Array();
        var tempArr2 = new Array();
        for(let i=0; i<len; i++) {
            for(let j=0; j<len; j++) {
                if(verticesArray[i] !=0 && verticesArray[j] != 0) {
                    tempArr.push(arr[i*len+j]);
                }
                else if (verticesArray[i] ==0 && verticesArray[j] == 0){
                    tempArr2.push(arr[i*len+j]);
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
        checkBridge(arr);
        if(hasBridge==1) {
            a.innerHTML += "Graf ima mostove\n";
            linebreak = document.createElement("br");
            a.append(linebreak);
        }
        else {
            var arr = new Array();
            var tempLen2 = Math.sqrt(tempArr2.length);
            
            for(let i=0; i<tempLen2; i++) {
                for(let j=0; j<tempLen2; j++) {
                    arr.push(tempArr2[i*tempLen2+j]);
                }
            }
            bridgeRecursion(arr);                
        }            
    }                
}
