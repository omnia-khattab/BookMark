let websiteName = document.getElementById("bookMarkName");
let websiteUrl = document.getElementById("bookMarkURL");
let addBtn = document.getElementById("addBtn");
let bookmarkList;

if (localStorage.getItem("bookmarkStorage") == null) {
    bookmarkList = [];
} else {
    bookmarkList = JSON.parse(localStorage.getItem("bookmarkStorage"));
    displayBookmark();
}
let urlRegExp = /^([w]{3})\.([A-z]+)\.([A-z]{2,})/;
let nameRegExp=/^[A-z]/;


    websiteUrl.addEventListener("keyup",function(){
        if(urlRegExp.test(websiteUrl.value)==false){

            websiteUrl.classList.remove("is-valid");
            websiteUrl.classList.add("is-invalid");
            
        }
        else{
            websiteUrl.classList.add("is-valid");
            websiteUrl.classList.remove("is-invalid");
        }
    });
    


    websiteName.addEventListener("keyup",function(){
        if(nameRegExp.test(websiteName.value)==false){
            
            websiteName.classList.add("is-invalid");
        }
        else{
            websiteName.classList.add("is-valid");
        
        }
    }); 
    


function addBookmark() {

        
        if (websiteName.value == null || websiteName.value == ""||nameRegExp.test(websiteName.value)==false) {
                
            websiteName.classList.add("is-invalid");
            websiteName.classList.add("animated","shake");

        }
        if (websiteUrl.value == null || websiteUrl.value == ""||urlRegExp.test(websiteUrl.value)==false){
            websiteUrl.classList.add("is-invalid");
            websiteName.classList.add("animated","shake");
        }

        else{ 
            let bookmarksObj = {
            name: websiteName.value,
            url: websiteUrl.value,
        }
        bookmarkList.push(bookmarksObj);
        localStorage.setItem("bookmarkStorage", JSON.stringify(bookmarkList));
        displayBookmark();
        clear();
        console.log(bookmarkList);
    
    }
}

function displayBookmark() {
    let bookmarksContainer = ``;
    for (let i = 0; i < bookmarkList.length; i++) {
        bookmarksContainer +=
            `<div id="bookmarksDivChild" class="container bookmarks my-4 p-5 "> 
            <h4 class="mr-4" id="websiteName">` + bookmarkList[i].name + `</h4>
            <a href= https://` + bookmarkList[i].url + ` target="_blank" class="btn btn-primary mr-3">Visit</a> 
            <button  onclick="deleteDiv(` + i + `)" class="btn btn-danger mr-3">Delete</button>
            <button  onclick="updateDiv(` + i + `)" class="btn btn-warning ">Update</button>
        </div>`;
    }
    document.getElementById("bookmarksDiv").innerHTML = bookmarksContainer;
    

}

function deleteDiv(index) {
    bookmarkList.splice(index, 1);
    localStorage.setItem("bookmarkStorage", JSON.stringify(bookmarkList));

    var div = document.getElementById("bookmarksDivChild");
    div.parentNode.removeChild(div);
    displayBookmark();
}

function clear() {
    websiteName.value = "";
    websiteUrl.value = "";
}


function updateDiv(index) {
    let submitUpdateBtn = ``;
    websiteName.value = bookmarkList[index].name;
    websiteUrl.value = bookmarkList[index].url;

    submitUpdateBtn=`<button  onclick="update2(` + index + `)" class="btn btn-primary ">Submit Update</button>`;
    document.getElementById("updatebtn").innerHTML = submitUpdateBtn;
    addBtn.disabled=true;

}

function update2(index){
    document.getElementById("updatebtn").innerHTML = "";
    addBtn.disabled=false;

    bookmarkList[index].name=websiteName.value;
    bookmarkList[index].url=websiteUrl.value;

    localStorage.setItem("bookmarkStorage", JSON.stringify(bookmarkList));
    displayBookmark();
    clear();
}

function search(term){
    let searchContainer=``;
    for(let i=0;i<bookmarkList.length;i++){
        if(bookmarkList[i].name.toLowerCase().includes(term.toLowerCase())==true){
            searchContainer +=`<div id="bookmarksDivChild" class="container bookmarks my-4 p-5 "> 
            <h4 class="mr-4" id="websiteName">` + bookmarkList[i].name + `</h4>
            <a href= https://` + bookmarkList[i].url + ` target="_blank" class="btn btn-primary mr-3">Visit</a> 
            <button  onclick="deleteDiv(` + i + `)" class="btn btn-danger mr-3">Delete</button>
            <button  onclick="updateDiv(` + i + `)" class="btn btn-warning ">Update</button>
        </div>` ;
        }
    }
    document.getElementById("bookmarksDiv").innerHTML=searchContainer;
}

