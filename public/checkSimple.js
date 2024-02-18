function checkSimple(x) {
    for(let i=0; i<x; i++) {
        for (let j=0; j<x; j++) {
            if(arr[i*x+j]>1) {
                return false;
            }
            if(j==i) {
                if(arr[i*x+j] != 0) {
                    return false;
                }
            }
        }
    }
    return true;
}
