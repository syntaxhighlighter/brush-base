var XRegExp = require('xregexp');

function Brush()
{
  // not putting any code in here because of the prototype inheritance
};

Brush.prototype = {
  /**
   * Returns value of the parameter passed to the highlighter.
   * @param {String} name       Name of the parameter.
   * @param {Object} defaultValue   Default value.
   * @return {Object}         Returns found value or default value otherwise.
   */
  getParam: function(name, defaultValue)
  {
    var result = this.params[name];
    return utils.toBoolean(result == null ? defaultValue : result);
  },

  /**
   * Converts space separated list of keywords into a regular expression string.
   * @param {String} str    Space separated keywords.
   * @return {String}       Returns regular expression string.
   */
  getKeywords: function(str)
  {
    str = str
      .replace(/^\s+|\s+$/g, '')
      .replace(/\s+/g, '|')
      ;

    return '\\b(?:' + str + ')\\b';
  },

  /**
   * Makes a brush compatible with the `html-script` functionality.
   * @param {Object} regexGroup Object containing `left` and `right` regular expressions.
   */
  forHtmlScript: function(regexGroup)
  {
    var regex = {'end': regexGroup.right.source};

    if(regexGroup.eof)
      regex.end = "(?:(?:" + regex.end + ")|$)";

    this.htmlScript = {
      left: {regex: regexGroup.left, css: 'script'},
      right: {regex: regexGroup.right, css: 'script'},
      code: XRegExp(
        "(?<left>" + regexGroup.left.source + ")" +
        "(?<code>.*?)" +
        "(?<right>" + regex.end + ")",
        "sgi"
        )
    };
  }
};

module.exports = {
  Brush: Brush
};
