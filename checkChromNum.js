function addColorNum( v, tempArr, c) {
    var x = numOfVertices;
    for(let i=0; i<x; i++) {
        if(arr[v*x+i]!=0 && c==tempArr[i]) return false;
    }   
    var point = tempPoints[v];
    var color = colorArray[c-1];
    point.set("fill", color);
    canvas.add(point);
    canvas.requestRenderAll();
    return true;        
}

function chromaticNumRecursion( m, tempArr, v) {    
    var x = numOfVertices;
    if(v==x) return true;                                 
    var c;
    for(c=1; c<=m; c++) {                                    
        if(addColorNum( v, tempArr, c)) {                    
            tempArr[v] = c;
            if(chromaticNumRecursion( m, tempArr, v+1)==true)      
                return true;  
            tempArr[v] = 0;                                         
        }                                                       
    }  
    return false;                                                
}

function isChromaticNum(m) {
    var x = numOfVertices;
    var tempArr = new Array();
    for(let i=0; i<x; i++) {
        tempArr.push(0);                                 //inicijalizacija svih boja na 0
    }   
    if(chromaticNumRecursion(m, tempArr, 0)==false) 
        return false;        
    return true;
}

function checkChromaticNum (arr) {
    var x = numOfVertices;
    var m;
    for(m=1; m<=x; m++) {                    
        if(isChromaticNum(m)==true) {
            var chromaticNumber = m;
            
            break;
        }
    }
    return chromaticNumber;
}