function uploadTable() {
    
    //getTempDrawnEdges();

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

   

    canvas.off("mouse:down", startAddingVertex);
    addingEdgeBtn[0].disabled = true;

    addingVertexBtn[0].disabled = false;
    addingVertexBtn[0].style.backgroundColor = 'lavender';
    
    addingEdgeBtn[0].style.backgroundColor = 'coral';

    var x = numOfVertices;
    var linebreak;

        let matrix = document.getElementById("matrix");
        let a = document.getElementById("a");
    
        

    
        matrix.innerHTML="";
        a.innerHTML="";    
        linebreak = document.createElement("br");
        matrix.appendChild(linebreak);
        matrix.append("Matrica susjedstva:");
        linebreak = document.createElement("br");
        matrix.appendChild(linebreak);
        linebreak = document.createElement("br");
        matrix.appendChild(linebreak);

        for(let j=0; j<x; j++) {
            const input = document.createElement("input");
            input.setAttribute("type", "text");
            input.setAttribute("size", "3");
            input.setAttribute("value", j+1);
            input.style.textAlign = 'center';
            input.style.backgroundColor = 'seashell'; // Prilagodite boju pozadine prema potrebi            
            input.setAttribute('readonly', true); 
            input.style.border = 'none';
            input.style.boxShadow = 'none';
            input.style.borderBottom = 'none';
            input.style.color = 'lightgray';

           

            matrix.append(input);
            
        }
        linebreak = document.createElement("br");
                    matrix.appendChild(linebreak);

        for(let i=0; i<x; i++) {
            const label = document.createElement("label");
            label.append(i+1);
            label.append("   ");
            label.style.color = 'lightgray';
            matrix.appendChild(label);
            for(let j=0; j<x; j++) {
                
                const input_id = i*x + j;
                const input = document.createElement("input");
                input.setAttribute("type", "text");
                input.setAttribute("size", "3");
                input.setAttribute("id", i.toString() + j.toString());
                matrix.append(input);
                arrInput[i*x+j] = input;
                if(j==x-1) {
                    linebreak = document.createElement("br");
                    matrix.appendChild(linebreak);
                }  
                       
            }
              
        }


        if (tempDrawnEdges.length > 0) {
          
           
            
            for(let i=0; i<tempDrawnEdges.length; i++) {
                if(arrInput[tempDrawnEdges[i][0]*x+tempDrawnEdges[i][1]].value > 0) {
                    if(tempDrawnEdges[i][0] == tempDrawnEdges[i][1]) { //petlja
                        arrInput[tempDrawnEdges[i][0]*x+tempDrawnEdges[i][1]].value = parseInt(arrInput[tempDrawnEdges[i][0]*x+tempDrawnEdges[i][1]].value) + 2;
                    }
                    else {
                        arrInput[tempDrawnEdges[i][0]*x+tempDrawnEdges[i][1]].value = parseInt(arrInput[tempDrawnEdges[i][0]*x+tempDrawnEdges[i][1]].value) + 1;
                        arrInput[tempDrawnEdges[i][1]*x+tempDrawnEdges[i][0]].value = parseInt(arrInput[tempDrawnEdges[i][1]*x+tempDrawnEdges[i][0]].value) + 1;
                    }
                }
                else {
                    if(tempDrawnEdges[i][0] == tempDrawnEdges[i][1]) { //petlja
                        arrInput[tempDrawnEdges[i][0]*x+tempDrawnEdges[i][1]].value = 2;
                    }
                    else {
                        arrInput[tempDrawnEdges[i][0]*x+tempDrawnEdges[i][1]].value =  1;
                        arrInput[tempDrawnEdges[i][1]*x+tempDrawnEdges[i][0]].value = 1;
                    }
                }

            }

        }

    if (addingEdgeBtn[0].disabled == true)
        canvas.on("mouse:down", interactive);

    linebreak = document.createElement("br");
    matrix.appendChild(linebreak);
    let button2 = document.createElement("button");
    button2.innerHTML = "Prikaži svojstva";
    button2.setAttribute("name", "btn_svojstva");
    button2.setAttribute("class", "myButton");
    button2.setAttribute("onclick", "calculate()");
    button2.setAttribute("style", "color: black; font-family: 'Maven Pro', sans-serif; font-weight:600; cursor: pointer; padding: 12px 25px;");   
    matrix.appendChild(button2);
    getTempDrawnEdges();

}