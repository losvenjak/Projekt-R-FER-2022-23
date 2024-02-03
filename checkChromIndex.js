var colorArray = ['black', 'red', 'blue', 'green', 'purple', 'chocolate', 'slategray', 'tan', 'darkgreen', 'aqua', 'darkred', 'navy',
                    'gray', 'fuchsia', 'lime', 'maroon', 'olive', 'yellow', 'cadetblue',
                        'darkslategray', 'goldenrod',
                            'indianred', 'lightcyan', 'lightpink', 'lightsteelblue',
                            'mediumpurple', 'mediumseagreen', 'olivedrab', 'orchid', 'powderblue',
                            'royalblue', 'sienna', 'teal', 'tomato']


function addColorInd( v, tempArr, c, edgeMatrix, edgeArr) {
    for(let i=0; i<Math.sqrt(edgeMatrix.length); i++) {
        if(edgeMatrix[v*Math.sqrt(edgeMatrix.length)+i]!=0 && c==tempArr[i]) return false;
    }       
    return true;        
}

function chromaticIndRecursion( m, tempArr, v, tempEdges, edgeMatrix, edgeArr) { 
    if(v==Math.sqrt(edgeMatrix.length)) return true;                                 
    var c;
    for(c=1; c<=m; c++) {                                    
        if(addColorInd( v, tempArr, c, edgeMatrix, edgeArr)) {                    
            tempArr[v] = c;                
            var edge = new Array(2);
            edge = edgeArr[v];
            var color = colorArray[c-1];
            var len = tempEdges.length;
            for(let k=0; k<len; k++) {
                var coordinates = new Array(3);
                coordinates = tempEdges[k];
                if((edge[0]==coordinates[0] && edge[1]==coordinates[1])) {                        
                    var shape = coordinates[2];
                    if(shape.stroke != "coral") {
                        continue;
                    }
                    canvas.remove(shape);
                    canvas.renderAll();
                    shape.set({"stroke": color});                    
                    canvas.add(shape);
                    shape.set("selectable", false);
                    shape.set("evented", false);
                    //shape.sendToBack();
                    canvas.requestRenderAll();                
                    break;
                }        
            }
            if(chromaticIndRecursion( m, tempArr, v+1, tempEdges, edgeMatrix, edgeArr)==true) {                
                return true;  
            }                
            tempArr[v] = 0;     //nije dobra boja, micemo je                        
            for(let k=len-1; k>=0; k--) {
                var coordinates = new Array(3);
                coordinates = tempEdges[k];
                if((edge[0]==coordinates[0] && edge[1]==coordinates[1])) {                        
                    var shape = coordinates[2];
                    if(shape.stroke == "coral") {
                        continue;
                    }
                    canvas.remove(shape);
                    canvas.renderAll();
                    shape.set("stroke", "coral");
                    
                    canvas.add(shape);

                    shape.set("selectable", false);
                    shape.set("evented", false);
                    shape.sendToBack();
                    canvas.renderAll();               
                    break;
                }        
            }              
        }                                                       
    }  
    return false;                                                
}

function isChromaticIndex(m, tempEdges, edgeMatrix, edgeArr) {
    var tempArr = new Array();
    for(let i=0; i<Math.sqrt(edgeMatrix.length); i++) {
        tempArr.push(0);                                 //inicijalizacija svih boja na 0
    }   
    if(chromaticIndRecursion(m, tempArr, 0, tempEdges, edgeMatrix, edgeArr)==false) 
        return false;        
    return true;
}

function checkChromaticIndex (tempEdges) {
    var x = numOfVertices;
    var edgeArr = new Array();  //polje bridova
    for(let i=0; i<x; i++) {
        for(let j=i; j<x; j++) {
            if(arr[i*x+j]!=0) {
                if(j==i) {
                    for(let k=0; k<arr[i*x+j]/2; k++) {
                        var coordinates = new Array(2);
                        coordinates[0]=i;
                        coordinates[1]=j;
                        edgeArr.push(coordinates);
                    }
                }
                else{
                    for(let k=0; k<arr[i*x+j]; k++) {
                        var coordinates = new Array(2);
                        coordinates[0]=i;
                        coordinates[1]=j;
                        edgeArr.push(coordinates);
                    }
                }                    
            }
        }
    }
    var chromaticIndex;
    var d = [];
    var edgeMatrix = [edgeArr.length* edgeArr.length];
    for(let i=0; i<edgeArr.length; i++) {
        for(let j=0; j<edgeArr.length; j++) {
            edgeMatrix[i*edgeArr.length+j] = 0;
        }
    }
    for(let i=0; i<edgeArr.length; i++) {
        let edge = new Array(2);
        edge = edgeArr[i];
            
        for(let k=i+1; k<edgeArr.length; k++) {
            let neighbours = new Array(2);
            neighbours = edgeArr[k];                            
            if(edge[0] == neighbours[0] || edge[1] == neighbours[1] ||
                edge[1] == neighbours[0] || edge[0] == neighbours[1]) {
                edgeMatrix[i*edgeArr.length+k] = edgeMatrix[i*edgeArr.length+k] + 1;
                edgeMatrix[k*edgeArr.length+i] = edgeMatrix[i*edgeArr.length+k]
            }
        }        
    }
    var m;
    for(m=1; m<=Math.sqrt(edgeMatrix.length); m++) {                    
        if(isChromaticIndex(m, tempEdges, edgeMatrix, edgeArr)==true) {                
            chromaticIndex = m;        
            break;
        }
    }
    return chromaticIndex;
} 