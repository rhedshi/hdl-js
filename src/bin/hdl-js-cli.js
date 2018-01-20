/**
 * The MIT License (MIT)
 * Copyright (c) 2017-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

'use strict';

const colors = require('colors');
const fs = require('fs');
const hdl = require('../../index');
const path = require('path');
const vm = require('vm');

const {int16} = require('../util/numbers');

const {SystemClock} = require('../emulator/hardware/Clock');

function enforceUnique(v) {
  return Array.isArray(v) ? v[v.length - 1] : v;
}

const options = require('yargs')
  .usage('Usage: $0 [options]')
  .options({
    gate: {
      alias: 'g',
      describe: 'Name of a built-in gate or path to an HDL file',
      requiresArg: true,
      coerce: enforceUnique,
    },
    parse: {
      alias: 'p',
      describe: 'Parse the HDL file, and print AST',
    },
    list: {
      alias: 'l',
      describe: 'List supported built-in gates',
    },
    describe: {
      alias: 'd',
      describe: 'Prints gate\'s specification',
    },
    'exec-on-data': {
      alias: 'e',
      describe: 'Evaluates gate\'s logic on passed data; ' +
        'validates outputs if passed',
      requiresArg: true,
      coerce: enforceUnique,
    },
    format: {
      alias: 'f',
      describe: 'Values format (binary, hexadecimal, decimal)',
      nargs: 1,
      choices: ['bin', 'hex', 'dec'],
      coerce: enforceUnique,
    },
    run: {
      alias: 'r',
      describe: 'Runs sequentially the rows from --exec-on-data table',
    },
    'clock-rate': {
      alias: 'c',
      describe: 'Rate (number of cycles per second) for the System clock',
      requiresArg: true,
      coerce: enforceUnique,
    },
  })
  .alias('help', 'h')
  .alias('version', 'v')
  .argv;

/**
 * Directory with all built-in gates.
 */
const BUILTINS_DIR = __dirname + '/../emulator/hardware/builtin-gates';

/**
 * Format to radix.
 */
const FORMAT_VALUES = {
  bin: {radix: 2, pad: 16}, // 0000000000001111
  hex: {radix: 16, pad: 4}, // 000F
  dec: {radix: 10, pad: 0}, // no padding
};

/**
 * Parse input data.
 */
function parseInputData(data, formatRadix) {
  const parsed = vm.runInNewContext(`(${data})`);
  parsed.forEach(row => {
    for (const prop in row) {
      row[prop] = processInputValue(row[prop], formatRadix);
    }
  });
  return parsed;
}

/**
 * Process input data.
 */
function processInputValue(value, formatRadix) {
  // Strings are converted to numbers according to the `formatRadix`.
  if (typeof value === 'string') {
    value = Number.parseInt(value, formatRadix);
  }

  // Truncate numbers to 16-bits.
  if (typeof value === 'number') {
    return int16(value);
  }

  return value;
}

/**
 * Lists built-in gates.
 */
function listBuiltInGates() {
  const builtinGates = fs.readdirSync(BUILTINS_DIR)
    .filter(file => /^[A-Z]/.test(file))
    .map(file => '  - ' + path.basename(file, '.js'));

  console.info('');
  console.info(colors.bold('Built-in gates:'));
  console.info('');
  console.info(builtinGates.join('\n'), '\n');
}

/**
 * Loads built-in gate class.
 */
function loadBuiltInGate(name) {
  try {
    return require(BUILTINS_DIR + '/' + name);
  } catch (_e) {
    console.error(colors.red(`\nUnknown gate: "${name}".`));
    listBuiltInGates();
    process.exit(1);
  }
}

/**
 * Prints specification and truth table of a built-in gate.
 */
function describeBuiltInGate(gate, formatRadix, formatStringLengh) {
  const {
    run,
  } = options;

  const GateClass = loadBuiltInGate(gate);
  const spec = GateClass.Spec;

  console.info('');
  console.info(colors.bold(`"${GateClass.name}"`) + ' gate:');

  const toFullName = (name) => {
    return name = typeof name === 'string'
      ? `  - ${name}`
      : `  - ${name.name}[${name.size}]`;
  };

  // Description:

  const description = spec.description.split('\n')
    .map(line => '  ' + line)
    .join('\n');

  console.info('\n' + colors.bold('Description:\n\n') + description);

  // Input pins:

  const inputPins = spec.inputPins
    .map(input => toFullName(input))
    .join('\n');

  console.info('\n' + colors.bold('Inputs:\n\n') + inputPins);

  // Output pins:

  const outputPins = spec.outputPins
    .map(output => toFullName(output))
    .join('\n');

  console.info('\n' + colors.bold('Outputs:\n\n') + outputPins);
  console.info('');

  const {truthTable} = spec;

  const printTable = table => {
    GateClass.printTruthTable({
      table,
      formatRadix,
      formatStringLengh,
    });
  };

  if (run) {
    console.info(colors.bold('\nCurrent results for pins:'), '\n');
    runSlice(truthTable, 0, printTable);
    return;
  }

  // Truth table:
  console.info(colors.bold('Truth table:'), '\n');
  printTable(truthTable);
}

/**
 * Runs a slice of calculation, printing a table
 * one row at a time.
 */
function runSlice(data, index, action) {
  const slice = data.slice(index, index + 1);
  action(slice);

  if (index === data.length - 1) {
    // Reset and run forever in a loop.
    index = -1;
  }

  setTimeout(() => {
    // Clear 6 previous lines, which take a previous table row.
    process.stdout.write('\r\x1B[K\r\x1B[1A'.repeat(6));
    runSlice(data, index + 1, action);
  }, 1000 / SystemClock.getRate());
}

function main() {
  const {
    gate,
    parse,
    list,
    describe,
    execOnData,
    format = 'bin',
    run,
    clockRate,
  } = options;

  if (clockRate) {
    SystemClock.setRate(clockRate);
  }

  const formatRadix = FORMAT_VALUES[format].radix;
  const formatStringLengh = FORMAT_VALUES[format].pad;

  if (gate && !describe && !execOnData) {
    console.info(
      `\nHint: pass ${colors.bold('--describe')} option to see ` +
      `${colors.bold('"' + gate + '"')} gate specification.\n`
    );
  }

  if (describe && !gate) {
    console.info(
      `\nHint: pass ${colors.bold('--gate')} option to see ` +
      `the specification of a built-in or custom gate.\n`
    );
  }

  // HDL file to be parsed.
  let hdlFile;

  // ------------------------------------------------------
  // Handle gate (built-in or custom).

  if (gate && fs.existsSync(gate)) {
    hdlFile = fs.readFileSync(gate, 'utf-8');
  }

  // ------------------------------------------------------
  // List built-in gates.

  if (list) {
    listBuiltInGates();
  }

  // ------------------------------------------------------
  // Describes a gate (built-in or composite).

  if (gate && describe) {
    // Custom gates from HDL files:
    if (hdlFile) {
      console.error(colors.red(
        `\n--describe currently works only with built-in gates.\n`
      ));
      process.exit(1);
    }

    // Built-in gates:
    describeBuiltInGate(gate, formatRadix, formatStringLengh);
  }

  // ------------------------------------------------------
  // Exec on data.

  if (execOnData) {
    if (!gate) {
      console.info(
        `\nHint: pass ${colors.bold('--gate')} option to execute ` +
        `gate logic on the passed data.\n`
      );
      return;
    }
    const GateClass = loadBuiltInGate(gate);
    const gateInstance = GateClass.defaultFromSpec();

    const data = parseInputData(execOnData, formatRadix);
    const conflictingRows = {};

    /**
     * Prints truth table from the result.
     */
    const printTable = table => {
      GateClass.printTruthTable({
        table,
        formatRadix,
        formatStringLengh,
        transformValue(value, row, column) {
          if (
            conflictingRows[row] &&
            conflictingRows[row].hasOwnProperty(column)
          ) {
            const pinInfo = GateClass.getPinInfo(column);

            let expected = (data[row][column].expected >>> 0)
              .toString(formatRadix)
              .padStart(formatRadix !== 10 ? pinInfo.size : 0, '0')
              .toUpperCase();

            if (expected.length > formatStringLengh) {
              expected = expected.slice(-formatStringLengh);
            }

            return colors.red(expected) + ' / ' + colors.green(value);
          }
          return value;
        }
      });
    };

    if (run) {
      console.info(colors.bold('\nCurrent results for pins:'), '\n');
      runSlice(data, 0, printTable);
      return;
    }

    const {result, conflicts} = gateInstance.execOnData(data);

    if (conflicts.length) {
      console.info(
        colors.red(colors.bold(
          `\nFound ${conflicts.length} conflicts in:\n`
        ))
      );

      conflicts.forEach(conflict => {
        const {row, pins} = conflict;
        const pinNames = Object.keys(pins);

        conflictingRows[row] = pins;

        console.info(`  - row: ${row}, pins: ${pinNames.join(', ')}`, '\n');
      });
    } else {
      // No conflicts.
      console.info(colors.bold('\nTruth table for data:'), '\n');
    }

    // Always print correct table eventually,
    // showing conflicting values in red.
    printTable(result);
  }

  // ------------------------------------------------------
  // Parser.

  if (parse && hdlFile) {
    const parsed = hdl.parse(hdlFile);
    console.info('');
    console.info(colors.bold('Parsed:'));
    console.info('');
    console.info(JSON.stringify(parsed, null, 2), '\n');
    return;
  }
}

module.exports = main;

if (require.main === module) {
  main();
}