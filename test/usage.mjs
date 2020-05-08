// -*- coding: utf-8, tab-width: 2 -*-

import 'p-fatal';
import assert from 'assert';

// ¦mjsUsageDemo¦+
import tcn from '..';
// ¦mjsUsageDemo¦- importPkgName

const same = assert.deepStrictEqual;

// ¦mjsUsageDemo¦+

// simple style lookup: name to number
same(tcn('reset'), 0);
same(tcn('bold'), 1);
same(tcn('green'), 32);
same(tcn('brgreen'), 92);   // br… = bright
same(tcn('bggreen'), 42);   // bg… = background
same(tcn('bgbrgreen'), 102);

same(tcn('brown'), 33);
same(tcn('brbrown'), false);
same(tcn('yellow'), 93);
same(tcn('bryellow'), false);

same(tcn('cyan'), 96);
same(tcn('brturquoise'), 96);
same(tcn('turquoise'), 36);
same(tcn('teal'), 36);

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
same(tcn.esc('air'), '');   // unknown words are ignored
same(tcn.esc('yellow bgred'),         '\u001B[93;41m');
same(tcn.esc('yellow air bgred'),     '\u001B[93;41m');
// ¦mjsUsageDemo¦-







console.info('+OK basics test passed.');
