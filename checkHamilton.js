var hamiltonian;
var semihamiltonian = 0;
function addVertex(v, position, tempArr, arr) {
    var x = numOfVertices;
    if(arr[tempArr[(position-1)]*x + v]==0) {                       
        return false; //nisu susjedi
    }
    for(let k=0; k<position; k++) {
        if(tempArr[k] == v) return false; //vec ukljucen vrh
    }
    return true;
}

function hamiltonianRecursion(position, tempArr, arr) {  
    var x = numOfVertices;              
    if(position==x) {     

        if(arr[tempArr[position-1]*x+tempArr[0]]!=0) {
            if(x==2 && arr[tempArr[position-1]*x+tempArr[0]]==1) {
                semihamiltonian=1;
                return false;
            }
            else {
                semihamiltonian = 0;
                return true; //ako postoji brid izmedu prvog i zadnjeg
            }
        }
        else {
            semihamiltonian = 1;
            return false;
        }
    }
    for(var v=0; v<x; v++) {
        if(addVertex(v, position, tempArr, arr)==true) {
            tempArr[position] = v;  //pokusavamo dobiti ciklus u arrayu
            if(hamiltonianRecursion(position+1, tempArr, arr)==true) {                              
                return true;
            }
            tempArr[position] = 0;
        }
    }
    return false;
}         

function checkHamiltonian(arr) {    
    var x = numOfVertices;
    var tempArr = new Array();
    for(let i=0; i<x; i++) {
        tempArr.push(0);
    }
    for(let i=0; i<x; i++) {
        tempArr[0] = i;
        if(hamiltonianRecursion(1, tempArr, arr) === true) {
            hamiltonian = 1;
        }
        else {
            hamiltonian = 0;
        }                    
    }
    return [hamiltonian, semihamiltonian];    
}