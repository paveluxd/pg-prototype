//Selected code snippet
let selectedSnip

let state = {
    examples: {
        simple: ['Simple', 'Placeholder code 1'],
        asyncronous: ['Asyncronous', 'Code 1'],
        objectOriented: ['Object-oriented', 'Code 1'],
        functional: ['Functional', 'Code 1'],
        idealForTests: ['Idela for tests', 'Code 1'], 
    },
    snippets: {
        reference: ['Code snippet', ''],
    }
}

let initialState = state

 //Insert after
function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

//Add side-bar items
function genSideBar(stateObj){

    [...document.querySelector('.examples').children].forEach(function(e){e.remove()});
    [...document.querySelector('.snippets').children].forEach(function(e){e.remove()});

    //Add titles

    for(i=0; i < Object.keys(stateObj).length; i++){
        let title = document.createElement("p")
        if(i === 0){
            title.innerHTML = "EXAMPLES"
        }
        else {
            title.innerHTML = "MY SNIPPETS"
        }
        document.querySelector('.' + Object.keys(stateObj)[i]).append(title)

        Object.keys(stateObj[Object.keys(stateObj)[i]]).forEach(function(item){

            //Add container
            let snipItem = document.createElement("div")
            snipItem.classList = "snip-item"

            //Add snippet button
            let snipBnt = document.createElement("button")
            snipBnt.innerHTML = stateObj[Object.keys(stateObj)[i]][item][0]
            snipBnt.setAttribute('onclick','makeActive(this)')

            //Add sub-menu
            let button = document.createElement("button")
            button.classList = "btn-round sub-menu-button"
            button.setAttribute("onclick","viewMenu(this)")
            let icon = document.createElement("img")
            icon.setAttribute('src', './img/more.svg')


            button.append(icon)
            snipItem.append(snipBnt)
            snipItem.append(button)
            document.querySelector('.' + Object.keys(stateObj)[i]).append(snipItem)
        })
    }

    //Set first item to active
    console.log(document.querySelector('.examples').children[1].children[0]);
    makeActive(document.querySelector('.examples').children[1].children[0])
}
genSideBar(initialState)

function makeActive(elem){
    if(document.querySelector('.active') !== null){
        document.querySelector('.active').classList.remove("active")
    }

    elem.parentNode.classList.add('active')

    let itemTitle = elem.innerHTML //"Title"

    //Find this item in object.
    let objItem = Object.keys(state.examples).find(key => state.examples[key][0] === itemTitle)
    let textAreaContent

    if(objItem === undefined){
        objItem = Object.keys(state.snippets).find(key => state.snippets[key][0] === itemTitle)
        textAreaContent = state.snippets[objItem][1]

        //Set selected snip variable
        selectedSnip = state.snippets[objItem]
    } else {
        textAreaContent = state.examples[objItem][1]

        //Set selected snip variable
        selectedSnip = state.examples[objItem]
    }

    

    //Update text area based on obj value.
    document.querySelector('#textarea').value = textAreaContent
}

//Set playground to authenticated state
function authenticate(val){

    if(val === 'sign out'){
        document.querySelector(".signin").classList.toggle('hide')
        document.querySelector(".signout").classList.toggle('hide')
        document.querySelector(".add").classList.toggle('hide')

        genSideBar(initialState)
    } else{
        document.querySelector(".signin").classList.toggle('hide')
        document.querySelector(".signout").classList.toggle('hide')
        document.querySelector(".add").classList.toggle('hide')
        toggleHide('authDialogue')
        notification('signin')
    }
}

//Remove menu
function hideMenu(){
    document.querySelectorAll(".sub-menu").forEach(e => e.remove());
}

//Add menu
function viewMenu(elem){
    //if menu exists, close it
    if(elem.parentNode.children.length > 2){
        hideMenu()
    }
    else {
        //Remove other sub menus
        hideMenu()
    
        //Add dropdown menu
        let menu = document.createElement("div")
        menu.classList = "sub-menu"
    
        let itRename = document.createElement("button")
        let itDelete = document.createElement("button")
    
        itRename.innerHTML = "Rename"
        itRename.setAttribute('onclick', 'toggleHide("deleteDialogue")')
    
        itDelete.innerHTML = "Delete"
        itDelete.setAttribute('onclick', 'deleteItem(this), notification("delete")')
    
        menu.append(itRename, itDelete)
        elem.parentNode.append(menu)
    }  
}

function toggleHide(id){
    document.getElementById(id).classList.toggle('hide')
}

//Show notification
function notification(type){
    if(type === 'delete'){
        document.getElementById('notif-text').innerHTML =  "Snippet deleted."
        document.getElementById('notif-undo').classList.remove("hide")
    }
    else if(type ==="signin"){
        document.getElementById('notif-text').innerHTML =  "You are signed in."
    }

    toggleHide('notification'); 

    setTimeout(function() { 
        toggleHide('notification')
        document.getElementById('notif-undo').classList.add("hide")
    }, 4000);
}

//Add snippet
function addItem(){

    //Add container
    let snipItem = document.createElement("div")
    snipItem.classList = "snip-item"

    //Add snippet button
    let snipBnt = document.createElement("button")
    snipBnt.innerHTML = state.snippets.reference[0]
    snipBnt.setAttribute('onclick','makeActive(this)')

    //Add sub-menu
    let button = document.createElement("button")
    button.classList = "btn-round sub-menu-button"
    button.setAttribute("onclick","viewMenu(this)")
    let icon = document.createElement("img")
    icon.setAttribute('src', './img/more.svg')

    button.append(icon)
    snipItem.append(snipBnt)
    snipItem.append(button)
    document.querySelector('.snippets').append(snipItem)

    //Make new snippet active
    makeActive(snipBnt)
}

//Rename
function rename(elem){
    let modal = document.createElement()
}

//Delete snippet
function deleteItem(itemNode){

    //Check if no snippets
    if(document.querySelector('.snippets').children.length === 3 && itemNode.parentNode.parentNode.parentNode.classList.contains('snippets')){
        //Reset the name
        document.querySelector('.snippets').children[1].children[0].innerHTML = state.snippets.reference[0]
        document.querySelector('#textarea').value=""
        viewMenu(itemNode.parentNode)
        //Hide menu
    }

    //Delete item
    else {
        //Select another snipet
        if(itemNode.parentNode.parentNode.classList.contains('active') && document.querySelector('.examples').children.length !== 2){
            let itemContainer = itemNode.parentNode.parentNode.parentNode

            itemNode.parentNode.parentNode.remove()

            makeActive(itemContainer.children[1].children[0])
        }
        else{
            itemNode.parentNode.parentNode.remove()
        }
    }

    //If last example, delete example titles.
    if(document.querySelector('.examples').children.length === 1){
        document.querySelector('.examples').children[0].remove()
    }
}

//Record new code
function recCode(){

    //Add code to object
    selectedSnip[1] = document.querySelector('#textarea').value
}