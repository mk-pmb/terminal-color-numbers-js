
<!--#echo json="package.json" key="name" underline="=" -->
terminal-color-numbers-pmb
==========================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Named raw terminal color palette for the linux virtual console and lots of
terminal emulators. No open/close/nesting or state machine. Just the numbers,
and some minimal utility functions.
<!--/#echo -->



Usage
-----

from [test/usage.mjs](test/usage.mjs):

<!--#include file="test/usage.mjs" transform="mjsUsageDemo1802" -->
<!--#verbatim lncnt="32" -->
```javascript
import tcn from 'terminal-color-numbers-pmb';

// simple style lookup: name to number
same(tcn('reset'), 0);
same(tcn('bold'), 1);
same(tcn('green'), 32);
same(tcn('brgreen'), 92);   // br… = bright
same(tcn('bggreen'), 42);   // bg… = background
same(tcn('bgbrgreen'), 102);

same(tcn('grey'), 37);
same(tcn('gray'), 37);
same(tcn('brgray'), 37);
same(tcn('brgrey'), 37);
same(tcn('darkgrey'), 90);
same(tcn('darkgray'), 90);

// simple style lookup: number to names
same(tcn.names(0), ['reset']);
same(tcn.names(3), false);
same(tcn.names(35), ['purple', 'violet']);
same(tcn.names(97), ['white']);

// construct ANSI escape sequences
same(tcn.esc(), '');
same(tcn.esc(''), '');
same(tcn.esc('reset'), '\u001B[0m');
same(tcn.esc('blueish'), '');   // unknown words are ignored
same(tcn.esc('bryellow bgred'),         '\u001B[93;41m');
same(tcn.esc('bryellow blueish bgred'), '\u001B[93;41m');
```
<!--/include-->




<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
