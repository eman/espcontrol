
const fs = require('fs');
const path = require('path');

// Mock a browser environment slightly
global.document = {
    createElement: () => ({ appendChild: () => {}, classList: { add: () => {}, remove: () => {} } }),
    activeElement: {},
    addEventListener: () => {}
};

// Read the generated www.js
const wwwJsPath = 'docs/public/webserver/seeed-sensecap-indicator/www.js';
if (!fs.existsSync(wwwJsPath)) {
    console.error("www.js not found at " + wwwJsPath);
    process.exit(1);
}

const content = fs.readFileSync(wwwJsPath, 'utf8');

// The JS is wrapped in an IIFE. We want to peek at the logic.
// We'll search for the state handling logic.

const stateMatch = content.match(/e\.addEventListener\("state",function\(r\)\{var a;try\{a=JSON\.parse\(r\.data\)\}catch\{return\}Zr\(a\);for\(var o=Kn\(a\),l=o\[0\]\|\|a\.id,c=a\.state!=null\?String\(a\.state\):"",f=0;f<o\.length;f++\)if\(t\[o\[f\]\]\)\{t\[o\[f\]\]\(c,a\);return\}/);

if (stateMatch) {
    console.log("Found state handler!");
} else {
    console.log("State handler NOT found. The JS structure might have changed.");
}

// Check the CFG object
const cfgMatch = content.match(/var CFG\s*=\s*(\{.*?\});/);
if (cfgMatch) {
    console.log("CFG found:", cfgMatch[1]);
} else {
    console.log("CFG NOT found.");
}
