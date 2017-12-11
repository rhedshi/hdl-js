/**
 * LR parser generated by the Syntax tool.
 *
 * https://www.npmjs.com/package/syntax-cli
 *
 *   npm install -g syntax-cli
 *
 *   syntax-cli --help
 *
 * To regenerate run:
 *
 *   syntax-cli \
 *     --grammar ~/path-to-grammar-file \
 *     --mode <parsing-mode> \
 *     --output ~/path-to-output-parser-file.js
 */

'use strict';

/**
 * Matched token text.
 */
let yytext;

/**
 * Length of the matched token text.
 */
let yyleng;

/**
 * Storage object.
 */
let yy = {};

/**
 * Result of semantic action.
 */
let __;

/**
 * Result location object.
 */
let __loc;

function yyloc(start, end) {
  if (!yy.options.captureLocations) {
    return null;
  }

  // Epsilon doesn't produce location.
  if (!start || !end) {
    return start || end;
  }

  return {
    startOffset: start.startOffset,
    endOffset: end.endOffset,
    startLine: start.startLine,
    endLine: end.endLine,
    startColumn: start.startColumn,
    endColumn: end.endColumn,
  };
}

const EOF = '$';

/**
 * List of productions (generated by Syntax tool).
 */
const productions = [[-1,1,(_1,_1loc) => { __loc = yyloc(_1loc, _1loc);__ = _1 }],
[0,5,(_1,_2,_3,_4,_5,_1loc,_2loc,_3loc,_4loc,_5loc) => { __loc = yyloc(_1loc, _5loc);
      __ = {
        type: 'Chip',
        name: _2,
        inputs,
        outputs,
        parts,
      };
     }],
[1,3],
[2,1,(_1,_1loc) => { __loc = yyloc(_1loc, _1loc);__ = _1 }],
[2,1,(_1,_1loc) => { __loc = yyloc(_1loc, _1loc);__ = _1 }],
[2,1,(_1,_1loc) => { __loc = yyloc(_1loc, _1loc);__ = _1 }],
[3,3,(_1,_2,_3,_1loc,_2loc,_3loc) => { __loc = yyloc(_1loc, _3loc);
      inputs.push(..._2);
     }],
[4,3,(_1,_2,_3,_1loc,_2loc,_3loc) => { __loc = yyloc(_1loc, _3loc);
      outputs.push(..._2);
     }],
[5,3,(_1,_2,_3,_1loc,_2loc,_3loc) => { __loc = yyloc(_1loc, _3loc);
      parts.push(..._3);
     }],
[6,1,(_1,_1loc) => { __loc = yyloc(_1loc, _1loc); __ = [_1];  }],
[6,3,(_1,_2,_3,_1loc,_2loc,_3loc) => { __loc = yyloc(_1loc, _3loc); _1.push(_3); __ = _1;  }],
[7,1,(_1,_1loc) => { __loc = yyloc(_1loc, _1loc);__ = _1 }],
[7,1,(_1,_1loc) => { __loc = yyloc(_1loc, _1loc);__ = _1 }],
[7,1,(_1,_1loc) => { __loc = yyloc(_1loc, _1loc);__ = _1 }],
[7,1,(_1,_1loc) => { __loc = yyloc(_1loc, _1loc);__ = _1 }],
[7,1,(_1,_1loc) => { __loc = yyloc(_1loc, _1loc);__ = _1 }],
[8,1,(_1,_1loc) => { __loc = yyloc(_1loc, _1loc); __ = [_1]  }],
[8,2,(_1,_2,_1loc,_2loc) => { __loc = yyloc(_1loc, _2loc); _1.push(_2); __ = _1  }],
[9,5,(_1,_2,_3,_4,_5,_1loc,_2loc,_3loc,_4loc,_5loc) => { __loc = yyloc(_1loc, _5loc);
      __ = {
        type: 'ChipCall',
        name: _1,
        arguments: _3,
      }
     }],
[10,1,(_1,_1loc) => { __loc = yyloc(_1loc, _1loc); __ = [_1]  }],
[10,3,(_1,_2,_3,_1loc,_2loc,_3loc) => { __loc = yyloc(_1loc, _3loc); _1.push(_3); __ = _1  }],
[11,3,(_1,_2,_3,_1loc,_2loc,_3loc) => { __loc = yyloc(_1loc, _3loc);
      __ = {
        type: 'Argument',
        name: _1,
        value: _3,
      }
     }]];

/**
 * Encoded tokens map.
 */
const tokens = {"CHIP":"12","IN":"13","OUT":"14","PARTS":"15","ID":"16","'{'":"17","'}'":"18","';'":"19","':'":"20","','":"21","'('":"22","')'":"23","'='":"24","$":"25"};

/**
 * Parsing table (generated by Syntax tool).
 */
const table = [{"0":30,"12":"s1"},{"7":2,"12":"s32","13":"s33","14":"s34","15":"s35","16":"s31"},{"17":"s3"},{"1":4,"2":5,"3":36,"4":37,"5":38,"13":"s6","14":"s7","15":"s8"},{"18":"s39"},{"2":9,"3":36,"4":37,"5":38,"13":"s6","14":"s7","15":"s8"},{"6":10,"7":11,"12":"s32","13":"s33","14":"s34","15":"s35","16":"s31"},{"6":14,"7":11,"12":"s32","13":"s33","14":"s34","15":"s35","16":"s31"},{"20":"s15"},{"2":40,"3":36,"4":37,"5":38,"13":"s6","14":"s7","15":"s8"},{"19":"s41","21":"s12"},{"19":"r9","21":"r9"},{"7":13,"12":"s32","13":"s33","14":"s34","15":"s35","16":"s31"},{"19":"r10","21":"r10"},{"19":"s42","21":"s12"},{"8":16,"9":17,"16":"s18"},{"9":19,"13":"r8","14":"r8","15":"r8","16":"s18","18":"r8"},{"13":"r16","14":"r16","15":"r16","16":"r16","18":"r16"},{"22":"s20"},{"13":"r17","14":"r17","15":"r17","16":"r17","18":"r17"},{"10":21,"11":22,"16":"s23"},{"21":"s25","23":"s24"},{"21":"r19","23":"r19"},{"24":"s28"},{"19":"s26"},{"11":27,"16":"s23"},{"13":"r18","14":"r18","15":"r18","16":"r18","18":"r18"},{"21":"r20","23":"r20"},{"16":"s29"},{"21":"r21","23":"r21"},{"25":"acc"},{"17":"r11","19":"r11","21":"r11"},{"17":"r12","19":"r12","21":"r12"},{"17":"r13","19":"r13","21":"r13"},{"17":"r14","19":"r14","21":"r14"},{"17":"r15","19":"r15","21":"r15"},{"13":"r3","14":"r3","15":"r3","18":"r3"},{"13":"r4","14":"r4","15":"r4","18":"r4"},{"13":"r5","14":"r5","15":"r5","18":"r5"},{"25":"r1"},{"18":"r2"},{"13":"r6","14":"r6","15":"r6","18":"r6"},{"13":"r7","14":"r7","15":"r7","18":"r7"}];

/**
 * Parsing stack.
 */
const stack = [];

/**
 * Tokenizer instance.
 */
let tokenizer;
/**
 * Generic tokenizer used by the parser in the Syntax tool.
 *
 * https://www.npmjs.com/package/syntax-cli
 *
 * See `--custom-tokinzer` to skip this generation, and use a custom one.
 */

const lexRules = [[/^\/\/.*/, function() { /* skip comments */ }],
[/^\/\*(.|\s)*?\*\//, function() { /* skip comments */ }],
[/^\s+/, function() { /* skip whitespace */ }],
[/^CHIP/, function() { return 'CHIP' }],
[/^IN/, function() { return 'IN' }],
[/^OUT/, function() { return 'OUT' }],
[/^PARTS/, function() { return 'PARTS' }],
[/^\w+/, function() { return 'ID' }],
[/^\{/, function() { return "'{'"; }],
[/^\}/, function() { return "'}'"; }],
[/^;/, function() { return "';'"; }],
[/^:/, function() { return "':'"; }],
[/^,/, function() { return "','"; }],
[/^\(/, function() { return "'('"; }],
[/^\)/, function() { return "')'"; }],
[/^=/, function() { return "'='"; }]];
const lexRulesByConditions = {"INITIAL":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]};

const EOF_TOKEN = {
  type: EOF,
  value: '',
};

tokenizer = {
  initString(string) {
    this._string = string;
    this._cursor = 0;

    this._states = ['INITIAL'];
    this._tokensQueue = [];

    this._currentLine = 1;
    this._currentColumn = 0;
    this._currentLineBeginOffset = 0;

    /**
     * Matched token location data.
     */
    this._tokenStartOffset = 0;
    this._tokenEndOffset = 0;
    this._tokenStartLine = 1;
    this._tokenEndLine = 1;
    this._tokenStartColumn = 0;
    this._tokenEndColumn = 0;

    return this;
  },

  /**
   * Returns tokenizer states.
   */
  getStates() {
    return this._states;
  },

  getCurrentState() {
    return this._states[this._states.length - 1];
  },

  pushState(state) {
    this._states.push(state);
  },

  begin(state) {
    this.pushState(state);
  },

  popState() {
    if (this._states.length > 1) {
      return this._states.pop();
    }
    return this._states[0];
  },

  getNextToken() {
    // Something was queued, return it.
    if (this._tokensQueue.length > 0) {
      return this._toToken(this._tokensQueue.shift());
    }

    if (!this.hasMoreTokens()) {
      return EOF_TOKEN;
    }

    let string = this._string.slice(this._cursor);
    let lexRulesForState = lexRulesByConditions[this.getCurrentState()];

    for (let i = 0; i < lexRulesForState.length; i++) {
      let lexRuleIndex = lexRulesForState[i];
      let lexRule = lexRules[lexRuleIndex];

      let matched = this._match(string, lexRule[0]);

      // Manual handling of EOF token (the end of string). Return it
      // as `EOF` symbol.
      if (string === '' && matched === '') {
        this._cursor++;
      }

      if (matched !== null) {
        yytext = matched;
        yyleng = yytext.length;
        let token = lexRule[1].call(this);

        if (!token) {
          return this.getNextToken();
        }

        // If multiple tokens are returned, save them to return
        // on next `getNextToken` call.

        if (Array.isArray(token)) {
          const tokensToQueue = token.slice(1);
          token = token[0];
          if (tokensToQueue.length > 0) {
            this._tokensQueue.unshift(...tokensToQueue);
          }
        }

        return this._toToken(token, yytext);
      }
    }

    if (this.isEOF()) {
      this._cursor++;
      return EOF_TOKEN;
    }

    this.throwUnexpectedToken(
      string[0],
      this._currentLine,
      this._currentColumn
    );
  },

  /**
   * Throws default "Unexpected token" exception, showing the actual
   * line from the source, pointing with the ^ marker to the bad token.
   * In addition, shows `line:column` location.
   */
  throwUnexpectedToken(symbol, line, column) {
    const lineSource = this._string.split('\n')[line - 1];
    let lineData = '';

    if (lineSource) {
      const pad = ' '.repeat(column);
      lineData = '\n\n' + lineSource + '\n' + pad + '^\n';
    }

    throw new SyntaxError(
      `${lineData}Unexpected token: "${symbol}" ` +
      `at ${line}:${column}.`
    );
  },

  getCursor() {
    return this._cursor;
  },

  getCurrentLine() {
    return this._currentLine;
  },

  getCurrentColumn() {
    return this._currentColumn;
  },

  _captureLocation(matched) {
    const nlRe = /\n/g;

    // Absolute offsets.
    this._tokenStartOffset = this._cursor;

    // Line-based locations, start.
    this._tokenStartLine = this._currentLine;
    this._tokenStartColumn =
      this._tokenStartOffset - this._currentLineBeginOffset;

    // Extract `\n` in the matched token.
    let nlMatch;
    while ((nlMatch = nlRe.exec(matched)) !== null) {
      this._currentLine++;
      this._currentLineBeginOffset = this._tokenStartOffset + nlMatch.index + 1;
    }

    this._tokenEndOffset = this._cursor + matched.length;

    // Line-based locations, end.
    this._tokenEndLine = this._currentLine;
    this._tokenEndColumn = this._currentColumn =
      (this._tokenEndOffset - this._currentLineBeginOffset);
  },

  _toToken(tokenType, yytext = '') {
    return {
      // Basic data.
      type: tokenType,
      value: yytext,

      // Location data.
      startOffset: this._tokenStartOffset,
      endOffset: this._tokenEndOffset,
      startLine: this._tokenStartLine,
      endLine: this._tokenEndLine,
      startColumn: this._tokenStartColumn,
      endColumn: this._tokenEndColumn,
    };
  },

  isEOF() {
    return this._cursor === this._string.length;
  },

  hasMoreTokens() {
    return this._cursor <= this._string.length;
  },

  _match(string, regexp) {
    let matched = string.match(regexp);
    if (matched) {
      // Handle `\n` in the matched token to track line numbers.
      this._captureLocation(matched[0]);
      this._cursor += matched[0].length;
      return matched[0];
    }
    return null;
  },
};

/**
 * Expose tokenizer so it can be accessed in semantic actions.
 */
yy.lexer = tokenizer;
yy.tokenizer = tokenizer;

/**
 * Global parsing options. Some options can be shadowed per
 * each `parse` call, if the optations are passed.
 *
 * Initalized to the `captureLocations` which is passed
 * from the generator. Other options can be added at runtime.
 */
yy.options = {
  captureLocations: true,
};

/**
 * Parsing module.
 */
const yyparse = {
  /**
   * Sets global parsing options.
   */
  setOptions(options) {
    yy.options = options;
    return this;
  },

  /**
   * Returns parsing options.
   */
  getOptions() {
    return yy.options;
  },

  /**
   * Parses a string.
   */
  parse(string, parseOptions) {
    if (!tokenizer) {
      throw new Error(`Tokenizer instance wasn't specified.`);
    }

    tokenizer.initString(string);

    /**
     * If parse options are passed, override global parse options for
     * this call, and later restore global options.
     */
    let globalOptions = yy.options;
    if (parseOptions) {
      yy.options = Object.assign({}, yy.options, parseOptions);
    }

    /**
     * Allow callers to do setup work based on the
     * parsing string, and passed options.
     */
    yyparse.onParseBegin(string, tokenizer, yy.options);

    stack.length = 0;
    stack.push(0);

    let token = tokenizer.getNextToken();
    let shiftedToken = null;

    do {
      if (!token) {
        // Restore options.
        yy.options = globalOptions;
        unexpectedEndOfInput();
      }

      let state = stack[stack.length - 1];
      let column = tokens[token.type];

      if (!table[state].hasOwnProperty(column)) {
        yy.options = globalOptions;
        unexpectedToken(token);
      }

      let entry = table[state][column];

      // Shift action.
      if (entry[0] === 's') {
        let loc = null;

        if (yy.options.captureLocations) {
          loc = {
            startOffset: token.startOffset,
            endOffset: token.endOffset,
            startLine: token.startLine,
            endLine: token.endLine,
            startColumn: token.startColumn,
            endColumn: token.endColumn,
          };
        }

        stack.push(
          {symbol: tokens[token.type], semanticValue: token.value, loc},
          Number(entry.slice(1))
        );
        shiftedToken = token;
        token = tokenizer.getNextToken();
      }

      // Reduce action.
      else if (entry[0] === 'r') {
        let productionNumber = entry.slice(1);
        let production = productions[productionNumber];
        let hasSemanticAction = typeof production[2] === 'function';
        let semanticValueArgs = hasSemanticAction ? [] : null;

        const locationArgs = (
          hasSemanticAction && yy.options.captureLocations
            ? []
            : null
        );

        if (production[1] !== 0) {
          let rhsLength = production[1];
          while (rhsLength-- > 0) {
            stack.pop();
            let stackEntry = stack.pop();

            if (hasSemanticAction) {
              semanticValueArgs.unshift(stackEntry.semanticValue);

              if (locationArgs) {
                locationArgs.unshift(stackEntry.loc);
              }
            }
          }
        }

        const reduceStackEntry = {symbol: production[0]};

        if (hasSemanticAction) {
          yytext = shiftedToken ? shiftedToken.value : null;
          yyleng = shiftedToken ? shiftedToken.value.length : null;

          const semanticActionArgs = (
            locationArgs !== null
              ? semanticValueArgs.concat(locationArgs)
              : semanticValueArgs
          );

          production[2](...semanticActionArgs);

          reduceStackEntry.semanticValue = __;

          if (locationArgs) {
            reduceStackEntry.loc = __loc;
          }
        }

        const nextState = stack[stack.length - 1];
        const symbolToReduceWith = production[0];

        stack.push(
          reduceStackEntry,
          table[nextState][symbolToReduceWith]
        );
      }

      // Accept.
      else if (entry === 'acc') {
        stack.pop();
        let parsed = stack.pop();

        if (stack.length !== 1 ||
            stack[0] !== 0 ||
            tokenizer.hasMoreTokens()) {
          // Restore options.
          yy.options = globalOptions;
          unexpectedToken(token);
        }

        if (parsed.hasOwnProperty('semanticValue')) {
          yy.options = globalOptions;
          yyparse.onParseEnd(parsed.semanticValue);
          return parsed.semanticValue;
        }

        yyparse.onParseEnd();

        // Restore options.
        yy.options = globalOptions;
        return true;
      }

    } while (tokenizer.hasMoreTokens() || stack.length > 1);
  },

  setTokenizer(customTokenizer) {
    tokenizer = customTokenizer;
    return yyparse;
  },

  getTokenizer() {
    return tokenizer;
  },

  onParseBegin(string, tokenizer, options) {},
  onParseEnd(parsed) {},
};

/**
 * List of inputs for this chip.
 */
let inputs = [];

/**
 * List of outputs for this chip.
 */
let outputs = [];

/**
 * Actual definitions.
 */
let parts = [];

function unexpectedToken(token) {
  if (token.type === EOF) {
    unexpectedEndOfInput();
  }

  tokenizer.throwUnexpectedToken(
    token.value,
    token.startLine,
    token.startColumn
  );
}

function unexpectedEndOfInput() {
  parseError(`Unexpected end of input.`);
}

function parseError(message) {
  throw new SyntaxError(message);
}

module.exports = yyparse;