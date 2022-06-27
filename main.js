let selectedSnip      //Selected code snippet
let snippetSerial = 1 //Serial

// let auth = false
let state = {
    external:{
        external: ['Test code 1', 
            '//External snippet\n'+
            '//Test code\n\n'+
            'fun main() {\n'+
            '    val placeholder = "test"\n'+
            '    println(placeholder)\n'+
            '}\n'
        ]
    },
    examples: {
        simple: ['Simple', 
            'fun main() {\n'+
            '    val name = "stranger"        // Declare your first variable\n'+
            '    println("Hi, $name!")        // ...and use it!\n'+
            '    print("Current count:")\n'+
            '    for (i in 0..10) {           // Loop over a range from 0 to 10\n'+
            '        print(" $i")\n'+
            '    }\n'+
            '}\n'
        ],
        asyncronous: ['Asyncronous', 
            'import kotlinx.coroutines.*\n\n'+

            'suspend fun main() {                                // A function that can be suspended and resumed later\n'+
            '    val start = System.currentTimeMillis()\n'+
            '    coroutineScope {                                // Create a scope for starting coroutines\n'+
            '        for (i in 1..10) {\n'+
            '            launch {                                // Start 10 concurrent tasks\n'+
            '                delay(3000L - i * 300)              // Pause their execution\n'+
            '                log(start, "Countdown: $i")\n'+
            '            }\n'+
            '        }\n'+
            '    }\n'+
            '    // Execution continues when all coroutines in the scope have finished\n'+
            '    log(start, "Liftoff!")\n'+
            '}\n\n'+
        
            'fun log(start: Long, msg: String) {\n'+
            '    println("$msg " +\n'+
            '            "(on ${Thread.currentThread().name}) " +\n'+
            '            "after ${(System.currentTimeMillis() - start)/1000F}s")\n'+
            '}'
        ],
        objectOriented: ['Object-oriented', 
            'abstract class Person(val name: String) {\n'+
            '    abstract fun greet()\n'+
            '}\n\n'+
            
            'interface FoodConsumer {\n'+
            '    fun eat()\n'+
            '    fun pay(amount: Int) = println("Delicious! Here\'s $amount bucks!")\n'+
            '}\n\n'+
            
            'class RestaurantCustomer(name: String, val dish: String) : Person(name), FoodConsumer {\n'+
            '    fun order() = println("$dish, please!")\n'+
            '    override fun eat() = println("*Eats $dish*")\n'+
            '    override fun greet() = println("It\'s me, $name.")\n'+
            '}\n\n'+
            
            'fun main() {\n'+
            '    val sam = RestaurantCustomer("Sam", "Mixed salad")\n'+
            '    sam.greet() // An implementation of an abstract function\n'+
            '    sam.order() // A member function\n'+
            '    sam.eat() // An implementation of an interface function\n'+
            '    sam.pay(10) // A default implementation in an interface\n'+
            '}'
        ],
        functional: ['Functional', 
            'fun main() {\n'+
            '    // Who sent the most messages?\n'+
            '    val frequentSender = messages\n'+
            '        .groupBy(Message::sender)\n'+
            '        .maxByOrNull { (_, messages) -> messages.size }\n'+
            '        ?.key                                                 // Get their names\n'+
            '    println(frequentSender) // [Ma]\n\n'+
            
            '    // Who are the senders?\n'+
            '    val senders = messages\n'+
            '        .asSequence()                                         // Make operations lazy (for a long call chain)\n'+
            '        .filter { it.body.isNotBlank() && !it.isRead }        // Use lambdas...\n'+
            '        .map(Message::sender)                                 // ...or member references\n'+
            '        .distinct()\n'+
            '        .sorted()\n'+
            '        .toList()                                             // Convert sequence back to a list to get a result\n'+
            '    println(senders) // [Adam, Ma]\n'+
            '}\n\n'+
            
            'data class Message(                                          // Create a data class\n'+
            '    val sender: String,\n'+
            '    val body: String,\n'+
            '    val isRead: Boolean = false,                              // Provide a default value for the argument\n'+
            ')\n\n'+
            
            'val messages = listOf(                                       // Create a list\n'+
            '    Message("Ma", "Hey! Where are you?"),\n'+
            '    Message("Adam", "Everything going according to plan today?"),\n'+
            '    Message("Ma", "Please reply. I\'ve lost you!"),\n'+
            ')\n'
        ],
        idealForTests: ['Idela for tests', 
            '// Tests\n'+
            '// The following example works for JVM only\n'+
            'import org.junit.Test\n'+
            'import kotlin.test.*\n\n'+

            'class SampleTest {\n'+
            '    @Test\n'+
            '    fun `test sum`() {                  // Write test names with whitespaces in backticks\n'+
            '        val a = 1\n'+
            '        val b = 41\n'+
            '        assertEquals(42, sum(a, b), "Wrong result for sum($a, $b)")\n'+
            '    }\n\n'+

            '    @Test\n'+
            '    fun `test computation`() {\n'+
            '        assertTrue("Computation failed") {\n'+
            '            setup()                     // Use lambda returning the test subject\n'+
            '            compute()\n'+
            '        }\n'+
            '    }\n'+
            '}\n\n'+

            '// Sources\n'+
            'fun sum(a: Int, b: Int) = a + b\n'+
            'fun setup() {}\n'+
            'fun compute() = true\n'
        ], 
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
function genSideBar(stateObj, snippetsGroup){
    //Clear old nav
    // [...document.querySelector('.examples').children].forEach(function(e){e.remove()});

    //Add items
    for(i=0; i < Object.keys(stateObj).length; i++){

        //Remove container
        if(document.querySelector('.' + Object.keys(stateObj)[i]) !== null){
            document.querySelector('.' + Object.keys(stateObj)[i]).remove()
            console.log(1);
        }

        //Generaate container
        let container = document.createElement('div')
        container.classList = Object.keys(stateObj)[i]

        //Gen container title
        let containerTitle = document.createElement("p")
        containerTitle.innerHTML = Object.keys(stateObj)[i].toUpperCase() 

        //Append
        container.append(containerTitle)
        document.querySelector('.top-section').append(container)

        //Append items
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
            
            if(localStorage.getItem('Auth') === 'n'){
                button.disabled = true
            }
            
            snipItem.append(snipBnt)
            snipItem.append(button)
            button.append(icon)

            document.querySelector('.' + Object.keys(stateObj)[i]).append(snipItem)    
        })
    }

    if(snippetsGroup !== 'external'){
        document.querySelector('.external').remove()
    }

    //Set first item to active
    makeActive(document.querySelector('.top-section').children[0].children[1].children[0])
}

function makeActive(elem){
    //Remove previously active
    if(document.querySelector('.active') !== null){
        document.querySelector('.active').classList.remove("active")
    }

    //Mod save button for external
    if(elem.innerHTML === state.external.external[0]){
        document.querySelector('.save').disabled = false
        document.querySelector('.save').innerHTML = '<img src="./img/save.svg" alt="">Add to snippets'
    } else {
        document.querySelector('.save').disabled = true
        document.querySelector('.save').innerHTML = '<img src="./img/save.svg" alt="">Save'
    }

    elem.parentNode.classList.add('active')

    let itemTitle = elem.innerHTML //"Title"

    //Find this item in object based on elements innerHtml
    let objItem
    Object.keys(state).forEach(function(elem){
        Object.keys(state[elem]).forEach(function(snippetRecord){
            // console.log(state[elem][snippetRecord][0]);
            if(itemTitle === state[elem][snippetRecord][0]){
                objItem = state[elem][snippetRecord]
            }
        })
    })

    let textAreaContent

    //If undefined create
    if(objItem === undefined){
        
        //Create new snippet record
        state.snippets['snippet' + snippetSerial] = [itemTitle, '']
        objItem = state.snippets['snippet' + snippetSerial]

        //Update text area
        textAreaContent = objItem[1]

        //Set selected snip variable
        selectedSnip = objItem
    } 
    
    else {
        //Update text area
        textAreaContent = objItem[1]

        //Set selected snip variable
        selectedSnip = objItem
    }

    //Update text area based on obj value.
    document.querySelector('#textarea').value = textAreaContent
}

//Set playground to authenticated state
if(localStorage.getItem('Auth') === undefined){
    localStorage.setItem('Auth', 'n');
} 
else if (localStorage.getItem('Auth') === 'y'){
    authenticate()
    toggleHide('authDialogue')
}

function authenticate(val){

    if(val === 'sign out'){
        // auth = false
        localStorage.setItem('Auth', 'n')
    } else{
        // auth = true
        localStorage.setItem('Auth', 'y')
        toggleHide('authDialogue')
        notification('signin')
    }


    document.querySelector(".signin").classList.toggle('hide')
    document.querySelector(".signout").classList.toggle('hide')
    document.querySelector(".add").classList.toggle('hide')
    document.querySelector(".save").classList.toggle('hide')
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
        itRename.setAttribute('onclick', 'toggleHide("deleteDialogue"), viewMenu(this)')
        
        itDelete.setAttribute('onclick', 'deleteItem(this), notification("delete")')

        console.log(elem.parentNode.children[0].innerHTML, state.external.external[0]);
        
        if(elem.parentNode.children[0].innerHTML !== state.external.external[0]){
            itDelete.innerHTML = "Delete"
            menu.append(itRename, itDelete)
        }
        else {
            itDelete.innerHTML = "Close"
            menu.append(itDelete)
        }

        elem.parentNode.append(menu)
    }  
}

function toggleHide(id){
    document.getElementById(id).classList.toggle('hide')
}

//Show notification
function notification(type){
    if(type === 'delete'){
        document.getElementById('notif-text').innerHTML =  "Snippet deleted"
        document.getElementById('notif-undo').classList.remove("hide")
    }
    else if(type ==="signin"){
        document.getElementById('notif-text').innerHTML =  "You are signed in"
    }
    else if(type ==="save"){
        document.getElementById('notif-text').innerHTML =  "Changes saved"
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
    snipBnt.innerHTML = state.snippets.reference[0] + ' ' + snippetSerial
    snippetSerial++
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
    //
    if(
        document.querySelector('.snippets').children.length === 3 && 
        itemNode.parentNode.parentNode.parentNode.classList.contains('snippets'))
    {
        //Reset the name
        document.querySelector('.snippets').children[1].children[0].innerHTML = state.snippets.reference[0]
        document.querySelector('#textarea').value=""
        viewMenu(itemNode.parentNode)
        //Hide menu
    }

    //Delete item
    else {
        //Select another snipet
        if(
            itemNode.parentNode.parentNode.classList.contains('active') && 
            document.querySelector('.examples').children.length !== 1)
        {
            let itemContainer = itemNode.parentNode.parentNode.parentNode
            console.log(itemContainer);
            
            makeActive(itemContainer.children[1].children[0])

            //Delete item
            itemNode.parentNode.parentNode.remove()
        }
        else{
            //Delete item
            itemNode.parentNode.parentNode.remove()
        }
    }

    //If last example, delete example titles.
    Object.keys(state).forEach(function(group){
        if(document.querySelector('.' + group).children.length === 1){
            document.querySelector('.' + group).children[0].remove()
        }
    })
}

function save(){
    //Add code to object
    selectedSnip[1] = document.querySelector('#textarea').value    

    document.querySelector('.save').disabled = true
    notification("save")

    //Record state in local storage
    localStorage.setItem('Saved', 'y');
}

//Record new code
function enableSave(){
    //Enable save button
    document.querySelector('.save').disabled = false   

    //Record state in local storage
    localStorage.setItem('Saved', 'n');
}