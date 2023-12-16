
var websiteNameInput = document.getElementById('siteName');
var websiteUrlInput = document.getElementById('siteUrl');


var bookmarksList = [];
if(localStorage.getItem('bookmarks') !== null){
    bookmarksList = JSON.parse(localStorage.getItem('bookmarks'));
    displayBookmarkList();
}

function addBookmark(){
    if(vaildWebsiteName() === true && vaildWebsiteUrl() === true ){
        var bookmark = {
        name : websiteNameInput.value,
        url : websiteUrlInput.value
    }
    bookmarksList.push(bookmark);
    clearInputs();
    localStorage.setItem('bookmarks',JSON.stringify(bookmarksList));
    displayBookmarkList();
    }
    else{
        window.alert("Site Name or Url is not valid");
    }
}
function displayBookmarkList(){
    var content = ``;
    for(i = 0; i < bookmarksList.length ; i++){
        content += ` <tr>
        <td>${i + 1}</td>
        <td>${bookmarksList[i].name}</td>
        <td><a target="_blank" class="btn btn-visit"  href=${bookmarksList[i].url} ><i class="icon-eye"></i>Visit</a></td>
        <td><button onclick="deleteBookmark(${i})" class="btn btn-delete"><i class="icon-trash-empty"></i>Delete</button></td>
    </tr>`;
    }
    document.getElementById('tablecontent').innerHTML = content;
}
function clearInputs(){
    websiteNameInput.value = "";
    websiteUrlInput.value = "";
}
function deleteBookmark(index){
    bookmarksList.splice(index , 1);
    setBookmarkAtLocalStorageAndDisplayIt();
}
function setBookmarkAtLocalStorageAndDisplayIt(){
    displayBookmarkList();
    localStorage.setItem('bookmarks',JSON.stringify(bookmarksList));
}
function vaildWebsiteName(){
    var regName = /^[a-zA-Z]\w{3,}/;
    if(regName.test(websiteNameInput.value) === true){
        return true;
    }else{
       return false;
    }
}
function vaildWebsiteUrl(){
    var regUrl = /^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$/;
    if(regUrl.test(websiteUrlInput.value) === true){
        return true;
    }else{
       return false;
    }
}