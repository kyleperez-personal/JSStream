// Class that holds all the relevant information of the gui.
export class Stream {

	// Important Characters for formatting in HTML
	static #_Tab = "&nbsp;&nbsp;&nbsp;&nbsp;";
	static Tab(i=1) { return GUI.#_Tab.repeat(i); }

	Input;
	Output;
	#_MaxStackSize;
	#_HasRunCommand;
	#_InputLine;
	self = this;

	constructor(
		input,
		output,
		max_stack_size = 30
	) {

		this.Input = document.getElementById(input);
		this.Output = document.getElementById(output);

		this.#_MaxStackSize = max_stack_size;

		this.#_HasRunCommand = false;
		this.#_InputLine = "";

		self = this;

	}

	

	// Return the above
	HasRunCommand() { return self.#_HasRunCommand; }
	Input() { return self.#_InputLine; }


	// Read then clear the input boxes
	ReadInput() {
		self.#_InputLine = self.Input.value;
		self.Input.value = "";
	}



	// Add an additional string to the storystream
	WritetoOutput( some_str, style="stream" ) {

		let nstyle = style.toLowerCase();
		let some_line = "";

		// Create a new div
		let newdiv = document.createElement('div');
	

		// Pick the style of the string
		switch(nstyle) {
			
			case "stream":
			case "s":
				some_line = "<p>" + "<span class=\"Stream\">" + some_str + "</span></p>";
				break;
			case "picked":
			case "p":
				some_line = "<p>" + "<span class=\"Picked\">" + some_str + "</span></p>";
				break;
			case "question":
			case "q":
			case "?":
				some_line = "<p>" + "<span class=\"Question\">" + some_str + "</span></p>";
				break;
			case "notice":
			case "n":
			case "!":
				some_line = "<p>" + "<span class=\"Notice\">" + some_str + "</span></p>";
				break;
			case "info":
			case "i":
				some_line = "<p>" + "<span class=\"Info\">" + some_str + "</span></p>";
				break;
			default:
				some_line = "<p>" + "<span class=\"Notice\">" + "ERROR: Invalid identifier in function 'WritetoStorystream' in argument 'style'" + "</span></p>";
				break;
			
		}

		// Append div to storystream
		newdiv.innerHTML = some_line;
		self.Output.scrollIntoView(false);
		self.Output.appendChild(newdiv);

		// If storystream too long, remove first element
		if ( self.Output.children.length >= self.#_MaxStackSize ) {
			self.Output.removeChild(self.Output.children[0]);
		}
		
	}

	TryAgain() { self.WritetoOutput("Try Again.", "n"); }



	// Run commands for the story/infostream
	RunCommand( some_command ) {

		let lwr_cmd = some_command.toLowerCase(); // Convert the command to lowercase
		self.#_HasRunCommand = true; // Assume a command has been run

		// Check to see which command to run
		switch(lwr_cmd) {

			case "clear":
				self.WritetoOutput("<br>".repeat(20));
				self.Output.scrollIntoView(false);
				break;
			case "clear hard":
				while ( self.Output.firstChild ) self.Output.removeChild(self.Output.firstChild);
				break;
			case "help":
				self.WritetoOutput("Help here");
				break;
			// If no command
			default:
				self.#_HasRunCommand = false; // Assert that no command has been run
				break;

		}

	}


	// Add a function to the event listeners
	Run( some_func, prerun_func = function () { return; }, args = [] ) {
	
		// First run the prerun function
		prerun_func(args);
	
		// Then queue up the the next function
		self.Input.addEventListener( 'keyup', some_func );
		return;
	
	}
	
	
	// Remove a function from the event listener
	Remove( some_func, prerun_func = none, args = [] ) {
	
		prerun_func(args);
	
		self.Input.removeEventListener( 'keyup', some_func );
		return;
	
	}
	
	
	// Wrapping function that takes a function as an argument
	// Essentially prepares it for use in the 'Run'/'Remove' functions
	Wrap( some_func ) {
	
		// Declare a function that accepts some keypress 'e'
		let f = function(e) {
			// Looking at the keypress code
			switch(e.code) {
				// If it's 'Enter'
				case "Enter":
	
					// First read the input box and clear it
					self.ReadInput();
					// Do nothing if the input is empty
					if( !self.#_InputLine ) return;
					// Then check to see if the input is a command (help, etc); run it if true
					self.RunCommand( self.#_InputLine );
		
					// If the input is not a command, write out the input then run the function
					if ( !self.#_HasRunCommand ) {
						self.WritetoOutput( ">> " + self.#_InputLine );
						some_func();
						self.Output.scrollIntoView(false);
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
	

}//end class Stream