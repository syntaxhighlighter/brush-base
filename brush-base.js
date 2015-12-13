import XRegExp from 'xregexp';
import Renderer from 'html-renderer';
import parser from 'parser';

function BrushBase()
{
}

BrushBase.prototype = {
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
  },

  getHtml(code, params = {}) {
    const matches = parser.parse(code, this.regexList, params);
    const renderer = new Renderer(code, matches, params);
    return renderer.getHtml();
  },
};

module.exports = BrushBase;
