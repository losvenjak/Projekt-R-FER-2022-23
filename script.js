var arrInput = new Array();
var points = [];
var tempPoints = [];
var tempEdges = [];
var tempText = [];
var tempDrawnEdges = []
var tempEdgesLen = 0;
var numOfVertices = 0;
var brBrisi = 0;
var verArr = new Array();
var povezi = [];
var kalk = 0;
var prvi = 0;

let canvas = new fabric.Canvas("canvas", {
    width: window.innerWidth/2,
    height: innerHeight,
    evented: false
});

const addingVertexBtn = document.getElementsByName("adding-vertex");
const addingEdgeBtn = document.getElementsByName("adding-edge");

function getTempDrawnEdges() {
    tempDrawnEdges = []
    for(let i=0; i<numOfVertices; i++) {
        for(let j=i; j<numOfVertices; j++) {
            if(arrInput[i*numOfVertices+j] != undefined) {
                if(j==i) {
                    for(let k=0; k<arrInput[i*numOfVertices+j].value; k = k+2) {
                        coordinatesOfEdges = new Array(2);
                        coordinatesOfEdges[0] = i;
                        coordinatesOfEdges[1] = j;
                        tempDrawnEdges.push(coordinatesOfEdges);
                    }
                }
                else {
                    for(let k=0; k<arrInput[i*numOfVertices+j].value; k++) {
                        coordinatesOfEdges = new Array(2);
                        coordinatesOfEdges[0] = i;
                        coordinatesOfEdges[1] = j;
                        tempDrawnEdges.push(coordinatesOfEdges);
                    }
                }
            }
        }
    }
}

function interactive(o) {
    


    let pointer = canvas.getPointer(o.e);
    var positionX = pointer.x;
    var positionY = pointer.y;

    

    

    for(let i=0; i<numOfVertices; i++) {
       
        if(positionX < verArr[i][0] + 10.1 && positionX > verArr[i][0] - 10.1 
            && positionY < verArr[i][1] + 10.1 && positionY > verArr[i][1] - 10.1) {



            tempPoints[i].set({fill: 'lavender'});
            canvas.renderAll();

            if(povezi[0] == null) {

            
                povezi[0] = i;
                
            }
            else {
                povezi[1] = i;

                if(arrInput[povezi[0] * numOfVertices + povezi[1]].value != 0) {
                    if(povezi[1] == povezi[0]) {  //petlja
                        arrInput[povezi[0] * numOfVertices + povezi[1]].value = parseInt((arrInput[povezi[0] * numOfVertices + povezi[1]]).value) + 2;
                    }
                    else {
                        arrInput[povezi[0] * numOfVertices + povezi[1]].value = parseInt((arrInput[povezi[0] * numOfVertices + povezi[1]]).value) + 1;
                        arrInput[povezi[1] * numOfVertices + povezi[0]].value = parseInt((arrInput[povezi[1] * numOfVertices + povezi[0]]).value) + 1;
                    }
                }
                else {

                    if(povezi[1] == povezi[0]) {  //petlja
                        arrInput[povezi[0] * numOfVertices + povezi[1]].value = 2;
                    }

                    else {
                        arrInput[povezi[0] * numOfVertices + povezi[1]].value = 1;
                        arrInput[povezi[1] * numOfVertices + povezi[0]].value = 1;
                    }
                }

               

                povezi = [null, null];
                for(let i=0; i<numOfVertices; i++) {
                    tempPoints[i].set({fill: 'coral'});
                    canvas.renderAll();
                }

                drawEdges(0);
                getTempDrawnEdges(); //možda
                
                
            }

          
           
            break;

        }

        if (i == numOfVertices - 1) {
            povezi = [null, null];
            for(let i=0; i<numOfVertices; i++) {
                tempPoints[i].set({fill: 'coral'});
                canvas.renderAll();
            }
        
        }
        
        
        
    }

    


    
   
    

}

function calculate() { 
    canvas.getObjects().forEach(function (obj) {
        if (obj.type === "line" || obj.type === 'circle' || obj.type === 'curve' || obj.type === 'shape') {
          canvas.remove(obj);
        }
    });      
    canvas.renderAll();
    getTempDrawnEdges();   
    addingEdgeBtn[0].disabled = false;
    addingEdgeBtn[0].style.backgroundColor = 'lavender';
    for(let i=0; i<numOfVertices; i++) {
        for(let j=0; j<numOfVertices; j++) {
            let upis = arrInput[i*numOfVertices+j];
            upis.removeAttribute('readonly');
            upis.style.backgroundColor = 'white';
        }
    }
    canvas.off("mouse:down", interactive);
    kalk = 1;
    var x = numOfVertices; 
    arr = new Array();
    var nijeBroj=0;
    for(let i=0; i<x; i++) {
        for(let j=0; j<x; j++) {
            arr.push(arrInput[i*x+j].value);
            if(arrInput[i*x+j].value%1!=0) {
                nijeBroj=1;
                alert("Unesen je znak koji nije cijeli broj!");
                return;
            }
            if(arrInput[i*x+j].value%2!=0 && j==i) {
                alert("Ako vrh ima n petlji, unesite broj 2n");
                return;
            }
        }       
    }
    for(let i=0; i<x; i++) {
        for(let j=0; j<i; j++) {
            if(arr[i*x+j]!=arr[j*x+i]) {
                alert("Matrica mora biti simetrična!");
                return;
            }
        }
    }
    let a = document.getElementById("a");     
    a.innerHTML="";
    const button2 = document.getElementsByName("btn_svojstva");
    addingVertexBtn[0].disabled = false;
    addingVertexBtn[0].style.backgroundColor = 'lavender';
    linebreak = document.createElement("br");
    a.append(linebreak);
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

    //JEDNOSTAVAN  (nema petlji ni 2 brida za isti vrh)       
    if(checkSimple(numOfVertices) === true) {
        a.innerHTML += "Graf je jednostavan";
    } else {
        a.innerHTML += "Graf nije jednostavan";
    }            
    linebreak = document.createElement("br");
    a.append(linebreak);

    //POVEZAN & EULEROVSKI (vrhovi parnog stupnja)    
    if(checkConnected(arr) === true) {
        a.innerHTML += "Graf je povezan\n";
        linebreak = document.createElement("br");
        a.append(linebreak);
        checkEulerForConnected(arr);        
    } else {        //ako nije povezan
        a.innerHTML += "Graf nije povezan\n";
        linebreak = document.createElement("br");
        a.append(linebreak);
        checkEulerForDisconnected(arr, edgeArr);
    }
    
    //HAMILTONOVSKI -trazimo hamiltonov ciklus (ciklus koji obuhvaca sve vrhove)             
    var semihamiltonian = 0; 
    var hamiltonian = -1; 

    let result = [];
    if(x==1) {
        hamiltonian = 1;
        semihamiltonian = 0;
    }
    else {
        result = checkHamiltonian(arr);
        hamiltonian = result[0];
        semihamiltonian = result[1];
    }
    
    if(hamiltonian==0) {
        a.innerHTML += "Graf nije hamiltonovski\n";
        linebreak = document.createElement("br");
        a.append(linebreak);
    }
    else if(hamiltonian==1) {
        a.innerHTML += "Graf je hamiltonovski\n";
        linebreak = document.createElement("br");
        a.append(linebreak);
    }
    if(semihamiltonian==0) {
        a.innerHTML += "Graf nije semihamiltonovski\n";
        linebreak = document.createElement("br");
        a.append(linebreak);
    }
    else if(semihamiltonian==1) {
        a.innerHTML += "Graf je semihamiltonovski\n";
        linebreak = document.createElement("br");
        a.append(linebreak);
    }

    //IMA MOSTOVE - ako je graf povezan: brisemo brid -> ako postane nepovezan, to je most (ako ne, vracamo brid i ponavljamo sa sljedecim)
    //           -ako je graf nepovezan: razdvajamo matricu u dvije (prvu cine vrhovi povezani s prvim vrhom, drugu nepovezani), gledamo je li prva matrica ima most,
    //              ako ne, saljemo drugu matricu u rekuzriju
          
    bridgeRecursion(arr);    

    //KROMATSKI INDEKS
    getTempDrawnEdges();
    drawEdges(1);  
    var chromaticIndex = checkChromaticIndex(tempEdges);    
    a.innerHTML += "Kromatski indeks je\n";
    a.innerHTML += chromaticIndex;
    linebreak = document.createElement("br");
    a.append(linebreak);

    //KROMATSKI BROJ - najmanji br za bojanje vrhova
    var chromaticNumber = checkChromaticNum(arr);
    a.innerHTML += "Kromatski broj je \n";
    a.innerHTML += chromaticNumber;
    linebreak = document.createElement("br");
    a.append(linebreak);
    getTempDrawnEdges();
    tempEdges = [];        
}

function activateAddingVertex() {
    canvas.off("mouse:down", interactive);
    if(tempText.length>0) {     
        for(let i=0; i<tempText.length; i++) {
            tempText[i].bringToFront();
            canvas.renderAll();
        }
    }
    if(tempPoints.length>0) {
        for(let i=0; i<tempPoints.length; i++) {
            tempPoints[i].set({fill: 'coral'});
            canvas.renderAll();
        }
    }
    addingVertexBtn[0].disabled = true;
    addingEdgeBtn[0].disabled = false;
    if(addingVertexBtn[0].disabled == true && addingEdgeBtn[0].disabled == false) {
        addingVertexBtn[0].style.backgroundColor = 'coral';
        addingEdgeBtn[0].style.backgroundColor = 'lavender';
        for(let i=0; i<numOfVertices; i++) {
            for(let j=0; j<numOfVertices; j++) {
                let upis = arrInput[i*numOfVertices+j];
                if(upis != undefined) {
                    upis.setAttribute('readonly', true); 
                    upis.style.backgroundColor = 'lavender';
                }
            }
        }        
        canvas.on("mouse:down", startAddingVertex);       
    }
}

function startAddingVertex(o) {
    if(addingVertexBtn[0].disabled == true && addingEdgeBtn[0].disabled == false) {
        var buttons = document.getElementsByName("btn_svojstva");
        if (buttons.length > 0) {
            var button3 = buttons[0];   
            button3.disabled = true;
            button3.style.backgroundColor = 'coral';
        } else { 
        }
        numOfVertices = numOfVertices + 1;
        var array = [];
        let pointer = canvas.getPointer(o.e);
        var positionX = pointer.x;
        var positionY = pointer.y;
        array.push(positionX);
        array.push(positionY);
        verArr.push(array);
        var circlePoint = new fabric.Circle({
            radius: 10,
            fill: "coral",
            left: positionX,
            top: positionY,
            selectable: false,
            evented: false,
            originX: "center",
            originY: "center",
            hoverCursor: "auto",
            dirty: "false",            
        });
        var text = new fabric.Text(numOfVertices.toString(), {
            fontFamily: 'Calibri',
            fontSize: 20,
            left: positionX,
            top: positionY,
            originX: 'center',
            originY: 'center',
            fill:'black',
            selectable: false,
            evented: false
        });
        canvas.add(circlePoint);
        tempPoints.push(circlePoint);
        canvas.add(text);
        tempText.push(text);
        points.push(array);        
        canvas.requestRenderAll();      
    }
}

canvas.requestRenderAll();
var coordinatesOfEdges;

function drawEdges(bojanje) {
    var x = numOfVertices;
    for(let i=0; i<x; i++) {
        for(let j=i; j<x; j++) {
            if(arrInput[i*x+j].value!=0) {
                if(i==j) addLoop(i);
                if (bojanje == 1) {
                    if(i==j) addLoop(i, 1);
                    else addEdge(i,j, 1);
                }
                else if(bojanje == 0) {
                    if(i==j) addLoop(i, 0);
                    else addEdge(i,j, 0);
                }
            }
        }
    }
    getTempDrawnEdges();
}

function addLoop(i, bojanje) {
    var x = numOfVertices;
    var numOfLoops = arrInput[i*x+i].value / 2;
    for(let k=0; k<numOfLoops; k++) {
        var circle = new fabric.Circle({radius: 20 + k*5,
        fill: '',
        stroke: 'coral',
        strokeWidth: 3,
        left: points[i][0] - (20 + k*5),
        top: points[i][1],
        selectable: false,
        evented: false,
        type:'circle'
        });
        canvas.add(circle);
        if(bojanje == 1) {                
            coordinatesOfEdges = new Array(3);
            coordinatesOfEdges[0] = i;
            coordinatesOfEdges[1] = i;              
            coordinatesOfEdges[2] = circle;          
            tempEdges.push(coordinatesOfEdges);
            tempEdgesLen = tempEdgesLen + 1;
        }      
        circle.sendToBack();
        canvas.requestRenderAll();
    }     
}

function addEdge(i,j, bojanje) { 
    getTempDrawnEdges();
    var x = numOfVertices;
    var numOfEdges = arrInput[i*x+j].value;
    for(let k=0; k<numOfEdges; k++) {
        if(k==0) {
            var line = new fabric.Line([points[i][0], points[i][1], points[j][0], points[j][1]], {
                stroke: 'coral',
                strokeWidth: 3,
                selectable: false,
                evented: false,
                type: 'line'
            });
            canvas.add(line);            
            if(bojanje == 1) {                
                coordinatesOfEdges = new Array(3);
                coordinatesOfEdges[0] = i;
                coordinatesOfEdges[1] = j;              
                coordinatesOfEdges[2] = line;          
                tempEdges.push(coordinatesOfEdges);
                tempEdgesLen = tempEdgesLen + 1;
            }            
            line.sendToBack();
            line.set("selectable", false);
            line.set("evented", false);
            if (kalk == 0) 
                line.set({ stroke: '#ff7f51' });
            canvas.requestRenderAll();
        }
        else {
            var curveAmount;
            var x1 = points[i][0];
            var y1 = points[i][1];
            var x2 = points[j][0];
            var y2 = points[j][1];
            let mx = (x1 + x2) / 2;
            let my = (y1 + y2) / 2;
            let vx = x2 - x1;
            let vy = y2 - y1;
            let px = -vy;  // perpendicular
            let py = vx;
            if(k%2!=0) {
                curveAmount = 0.05 + k/20;
            }
            else {
                curveAmount = -0.05 - (k-1)/20;
            }
            let cx = mx - px * (curveAmount * 2);
            let cy = my - py * (curveAmount * 2);        
            var curve = new fabric.Path('M '+ x1 +' '+ y1 +' Q ' + cx + ', ' + cy + ', ' + x2 +', '+ y2 +'', { 
                fill: '', 
                stroke: 'coral',
                strokeWidth: 3,
                selectable: false,
                evented: false,
                type: 'curve'
            });
            canvas.add(curve);
            coordinatesOfEdges = new Array(3);
            coordinatesOfEdges[0] = i;
            coordinatesOfEdges[1] = j;              
            coordinatesOfEdges[2] = curve;
            if(bojanje == 1) {                
                coordinatesOfEdges = new Array(3);
                coordinatesOfEdges[0] = i;
                coordinatesOfEdges[1] = j;              
                coordinatesOfEdges[2] = curve;        
                tempEdges.push(coordinatesOfEdges);
                tempEdgesLen = tempEdgesLen + 1;
            }         
            curve.sendToBack();
            curve.set("selectable", false);
            curve.set("evented", false);
            canvas.requestRenderAll();
        }
    }
}

function resetProgram() {
    location.reload();
}