import * as GUI from './engine/gui.js';
//import * as Wrap from './engine/wrappers.js';

let S = new GUI.Stream(
	'input',
	'stream',
	30
);

S.Run( S.Wrap(function () { return; }) );