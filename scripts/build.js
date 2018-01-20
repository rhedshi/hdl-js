/**
 * The MIT License (MIT)
 * Copyright (c) 2017-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

const colors = require('colors');
const shell = require('shelljs');

// Whether we're in the watch mode (continuous JS code transpiling).
const watchMode = process.argv[2] || '';

let watchMsg = '';
if (watchMode) {
  watchMsg = ` (watch mode)`;
}

console.info(colors.bold(`Building${watchMsg}...\n`));


// ----------------------------------------------------------
// Rebuild parser.

console.info(colors.bold('[1/3] Generating parser module...\n'));

shell.exec(`node node_modules/syntax-cli/bin/syntax -g src/parser/hdl.g -o src/parser/generated/hdl-parser.js -m lalr1 --loc`);

// ----------------------------------------------------------
// Git hooks.

console.info(colors.bold('[2/3] Installing Git hooks...\n'));

// Setup pre-commit hook.
console.info('  - pre-commit: .git/hooks/pre-commit');
if (!shell.test('-f', '.git/hooks/pre-commit')) {
  shell.ln('-s', '../../scripts/git-pre-commit', '.git/hooks/pre-commit');
}

// Setup pre-push hook.
console.info('  - pre-push:   .git/hooks/pre-push\n');
if (!shell.test('-f', '.git/hooks/pre-push')) {
  shell.ln('-s', '../../scripts/git-pre-push', '.git/hooks/pre-push');
}


// ----------------------------------------------------------
// Transform code for older Node versions.

console.info(colors.bold('[3/3] Transpiling JS code...\n'));

shell.exec(`"node_modules/.bin/babel" ${process.argv[2] || ''} src/ --out-dir dist/ --ignore __tests__`);

console.info(colors.bold('\nAll done.\n'));