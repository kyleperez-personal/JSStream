import * as GUI from './gui.js';

//const Input = document.getElementById('input');
//const Output = document.getElementById('stream');

// Class for running functions in the story section
export class Wrappers {


	// Add a function to the event listeners
	static Run( stream, some_func, prerun_func = none, args = [] ) {

		// First run the prerun function
		prerun_func(args);

		// Then queue up the the next function
		stream.Input.addEventListener( 'keyup', some_func );
		return;

	}


	// Remove a function from the event listener
	static Remove( stream, some_func, prerun_func = none, args = [] ) {

		prerun_func(args);

		stream.Input.removeEventListener( 'keyup', some_func );
		return;

	}


	// Wrapping function that takes a function as an argument
	// Essentially prepares it for use in the 'Run'/'Remove' functions
	static Wrap( stream, some_func ) {

		// Declare a function that accepts some keypress 'e'
		let f = function(e) {
			// Looking at the keypress code
			switch(e.code) {
				// If it's 'Enter'
				case "Enter":

					// First read the input box and clear it
					//stream.ReadInput();
					// Do nothing if the input is empty
					if( !stream.Input() ) return;
					// Then check to see if the input is a command (help, etc); run it if true
					stream.RunCommand( stream.Input() );
	
					// If the input is not a command, write out the input then run the function
					if ( !stream.HasRunCommand() ) {
						stream.WritetoOutput( ">> " + stream.Input() );
						some_func();
						stream.Output.scrollIntoView(false);
					}//end if
			}//end switch
		}//end f
	
		return f;		

	}

	// Write some dialogue
	/*
	static WriteDialogue( person, line ) {

		let ln = "<p><span class=\"Character\">" + person + "</span>" + ": ";
		ln += "<span class=\"Dialogue\">" + line + "</span></p>";

		Engine.GUI.PushToStorystack(ln);
		Engine.GUI.WriteStorystream();

	}*/


	static FreeInput = Wrappers.Wrap(none);



}//end Wrappers


// Function that does absolutely nothing.
function none() { return; }