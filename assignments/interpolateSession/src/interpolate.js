const _ = require("lodash");

const interpolate = (conversation, session = {}, options = {}) => {
  // memorizing as a state
  let result = conversation;
  // test for an empty object
  if (!_.isEmpty(session)) {
    Object.entries(session).forEach(([key, value]) => {
      let delimKey = `${options.leftDelimiter}${key}${options.rightDelimiter}`;
      // search each key is contain our string
      if (result.indexOf(`${delimKey}`) != -1) {
        // If match each key in our string then replace your key with delims to options value
        result = result.replace(`${delimKey}`, value);
      }
    });
  } else if (options.leftDelimiter == "{" && options.rightDelimiter == "}") {
    // regex referance here => https://javascript.info/regexp-anchors
    // string regex remove https://stackoverflow.com/questions/14648375/javascript-regex-to-remove-string-inside-bracket
    result = result.replace(/{[^}]*}/, "");
  }

  return result;
};

module.exports = { interpolate };
