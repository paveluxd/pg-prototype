//Selected code snippet
let selectedSnip   

//Serial
let snippetSerial = 1 

//Snippet data
let state = {
    snippets: {
        link: ['Code snippet',
            'fun main() {\n'+
            '    val name = "placeholder"       // Declare a variable\n'+
            '    println("Test, $name!")\n'+
            '    print("Current count:")\n'+
            '    for (i in 0..10) {             // Loop over a range from 0 to 10\n'+
            '        print(" $i")\n'+
            '    }\n'+
            '}\n'
        ],

        reference: ['My snippet', '//You can add your code here.'],
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
}

//Default state
let initialState = {
    snippets: {
        link: ['Code snippet',
            'fun main() {\n'+
            '    val name = "placeholder"       // Declare a variable\n'+
            '    println("Test, $name!")\n'+
            '    print("Current count:")\n'+
            '    for (i in 0..10) {             // Loop over a range from 0 to 10\n'+
            '        print(" $i")\n'+
            '    }\n'+
            '}\n'
        ],

        reference: ['My snippet', '//You can add your code here.'],
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
}

//Set playground to authenticated state
if (localStorage.getItem('Auth') === 'y'){
    authenticate()
    toggleHide('authDialogue')
} 
else { 
    localStorage.setItem('Auth', 'n');
    genSideBar(initialState)
}


//Functions
//Reorder items to match layout
function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

//Add side-bar items
function genSideBar(stateObj){

    //Add items
    for(i=0; i < Object.keys(stateObj).length; i++){

        //Remove container
        if(document.querySelector('.' + Object.keys(stateObj)[i]) !== null){
            document.querySelector('.' + Object.keys(stateObj)[i]).remove()
        }

        //Generaate container
        let container = document.createElement('div')
        container.classList = Object.keys(stateObj)[i]

        //Gen container title
        let containerTitle = document.createElement("p")
        containerTitle.innerHTML = '' + Object.keys(stateObj)[i].toUpperCase() 

        //Append
        container.append(containerTitle)
        document.querySelector('.top-section').append(container)

        //Append items
        Object.keys(stateObj[Object.keys(stateObj)[i]]).forEach(function(item){

            //Add container
            let snipItem = document.createElement("div")
            snipItem.classList = "snip-item"
            snipItem.id = stateObj[Object.keys(stateObj)[i]][item][0]

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

    //If link, hide non-link item
    if (pageType === 'link' && localStorage.getItem('Auth') === 'n'){
        document.getElementById(state.snippets.reference[0]).remove()
    }
    else if(pageType === 'link'){

    }
    else {
        document.getElementById(state.snippets.link[0]).remove()
    }

    //Move add button
    document.querySelector('.top-section').insertBefore(document.querySelector('.add'), document.querySelector('.examples'));

    //Set first item to active
    makeActive(document.querySelector('.top-section').children[0].children[1].children[0], 'initial')
}

//Make menu item active
function makeActive(elem, activeState){

    // if(localStorage.getItem('Saved')==='n' && activeState !== 'initial'){
    //     console.log(1);
    // }
    // else{

        
        //Remove previously active
        if(document.querySelector('.active') !== null){
            document.querySelector('.active').classList.remove("active")
        }

        //Mod save button for external
        // if(elem.innerHTML === state.external.external[0]){
        //     document.querySelector('.save').disabled = false
        //     document.querySelector('.save').innerHTML = '<img src="./img/save.svg" alt="">Add to snippets'
        // } else {
            document.querySelector('.save').disabled = true
            // document.querySelector('.save').innerHTML = '<img src="./img/save.svg" alt="">Save'
        // }

        elem.parentNode.classList.add('active')

        let itemTitle = elem.innerHTML //"Title"

        //Find item in obj based on innerHtml
        let objItem
        let snippetObj

        if(localStorage.getItem('Auth') === 'y'){
            snippetObj = state
        } else {
            snippetObj = initialState
        }

        Object.keys(snippetObj).forEach(function(elem){
            Object.keys(snippetObj[elem]).forEach(function(snippetRecord){
                if(itemTitle === snippetObj[elem][snippetRecord][0]){
                    objItem = snippetObj[elem][snippetRecord]
                }
            })
        })

        let textAreaContent

        //If snippet is new create record in state
        if(objItem === undefined){
            
            //Create new snippet record
            state.snippets['snippet' + snippetSerial] = [itemTitle, '']
            objItem = state.snippets['snippet' + snippetSerial]

            //Update text area
            textAreaContent = objItem[1]

            //Set selected snip variable
            selectedSnip = objItem

            //Add new state to LS
            localStorage.setItem('state', JSON.stringify(state))
        } 
        
        else {
            //Update text area
            textAreaContent = objItem[1]

            //Set selected snip variable
            selectedSnip = objItem
        }

        //Update text area
        document.querySelector('#textarea').value = textAreaContent

        //Enable save for link item
        if(selectedSnip[0] === 'Code snippet'){
            enableSave()
        }
    }
// }

//Authentication
function authenticate(val){

    //Sign out
    if(val === 'sign out'){
        localStorage.setItem('Auth', 'n')
        genSideBar(initialState)
    } 
    //Sign in
    else{
        //Update auth state
        localStorage.setItem('Auth', 'y')

        //Manage state in LS
        if(localStorage.getItem('state') !== null){
            state = JSON.parse(localStorage.getItem('state'))
        } else {
            localStorage.setItem('state', JSON.stringify(state))
        }

        genSideBar(JSON.parse(localStorage.getItem('state')))
        toggleHide('authDialogue')
        notification('signin')
    }

    //Toggle ui elements
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
        
        //Update label if external snippet
        if(elem.parentNode.children[0].innerHTML !== ''){
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

//Hide modals and dialogues
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

    //Record new item in LS
    //New item is recorded in makeActive()

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

//Delete snippet
function deleteItem(itemNode){

    //Check if no snippets, reset the last item
    if(
        document.querySelector('.snippets').children.length === 2 && 
        itemNode.parentNode.parentNode.parentNode.classList.contains('snippets'))
    {
        //Reset the name
        document.querySelector('.snippets').children[1].children[0].innerHTML = state.snippets.reference[0]
        document.querySelector('#textarea').value=""
        viewMenu(itemNode.parentNode)
    }

    //Delete item
    else {
        //Select another snippet
        if(
            itemNode.parentNode.parentNode.classList.contains('active') && 
            document.querySelector('.examples').children.length !== 1)
        {
            let itemContainer = itemNode.parentNode.parentNode.parentNode
            makeActive(itemContainer.children[1].children[0])
        }
        
        
        //Record new state
        //Find item by innerHTML
        let itemTitle = itemNode.parentNode.parentNode.children[0].innerHTML //"Title"
        

        //Find this item in object based on elements innerHtml and delete it
        Object.keys(state).forEach(function(elem){
            Object.keys(state[elem]).forEach(function(snippetRecord){
                if(itemTitle === state[elem][snippetRecord][0]){
                    delete state[elem][snippetRecord]
                }
            })
        })
        
        //Update LS
        localStorage.setItem('state', JSON.stringify(state))

        //Delet html elem
        itemNode.parentNode.parentNode.remove() 
    }

    //If last snippet in the group, delete group title.
    Object.keys(state).forEach(function(group){
        if(
            document.querySelector('.' + group) !== null && 
            document.querySelector('.' + group).children.length === 1
        ){
            document.querySelector('.' + group).children[0].remove()
        }
    })
}

//Rename
function rename(elem){
    let modal = document.createElement()
}

//Save changes to snippet
function save(){
    //Add code to object
    selectedSnip[1] = document.querySelector('#textarea').value
    localStorage.setItem('state', JSON.stringify(state))    

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

//Activate save for external
// if(selectedSnip[0] === 'Code snippet'){
//     enableSave()
// }