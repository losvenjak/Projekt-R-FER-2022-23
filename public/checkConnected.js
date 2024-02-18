function checkConnected(arr) {
        var x = numOfVertices;
        var indexOfDisconnected;
        var len = Math.sqrt(arr.length);
        var tempArr = new Array();
        var count=0;

        for(let i=0; i<len; i++) {
            tempArr.push(0);
        }
        tempArr[0] = 1;

        for (let i=0; i<len; i++) {
            for(let j=0; j<len; j++) {
                if(i==0 && arr[i*x+j]!=0) {
                    tempArr[j] = 1;
                }
                else if(i!=0 && arr[i*len+j]!=0 && tempArr[j]==0) {
                    for(let k=i+1; k<len; k++) {
        
                        if(tempArr[k]!=0 && arr[k*len+j]!=0) {

                            tempArr[j] = 1;
                        }
                    }
                    if(tempArr[i] == 1) {
                        tempArr[j] = 1;
                    }
                }
            }                
        }
        for(let i=0; i<len; i++) {
            if(tempArr[i]==0) {
                count += 1;
            }
        }
        for(let h=0; h<count; h++) {
            for (let i=0; i<len; i++) {
                for(let j=0; j<len; j++) {
                    if(i==0 && arr[i*x+j]!=0) {
                        tempArr[j] = 1;
                    }
                    else if(i!=0 && arr[i*len+j]!=0 && tempArr[j]==0) {
                        for(let k=i+1; k<len; k++) {                    
                            if(tempArr[k]!=0 && arr[k*len+j]!=0) {                                  
                                tempArr[j] = 1;
                            }
                        }
                        if(tempArr[i] == 1) {
                            tempArr[j] = 1;
                        }
                    }
                }

            }
        }
        for(let i=0; i<len; i++) {
            if(i==0) {
                for(let j=1; j<len; j++) {
                    if(tempArr[j] != 0) {
                        break
                    }
                    else if(j==len-1) {
                        indexOfDisconnected = 0;
                        return indexOfDisconnected;
                    }
                }
            }
            if(tempArr[i]==0) {
                indexOfDisconnected = i;
    
                
                return indexOfDisconnected;
            }
        }
        return true;    
    }
