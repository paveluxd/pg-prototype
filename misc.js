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