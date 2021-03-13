function updateCapsuleLocalStorge(capsule) {
    const data = capsule.getAllData();
    localStorage.setItem('myCapsule', JSON.stringify(data));
}

function getCapsuleLocalStorge() {
    const json = localStorage.getItem('myCapsule');
    const data = JSON.parse(json);

    return(data);
}

function removeCapsuleLocalStorge() {
    localStorage.clear('myCapsule');
}