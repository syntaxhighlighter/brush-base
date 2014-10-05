require 'coffee-errors'

chai = require 'chai'
{Brush} = require '..'
expect = chai.expect

describe 'brush', ->
  describe 'new brush', ->
    brush = null

    before ->
      class TestBrush extends Brush
        constructor: ->
          @regexList = [
            {regex: new RegExp @getKeywords 'foo bar', css: 'test'}
          ]

      brush = new TestBrush()

    describe 'instance', ->
      it 'has `regexList`', ->
        expect(brush).to.have.property 'regexList'

      it 'sets keywords', ->
        expect(brush.regexList[0].regex.toString()).to.equal '/\\b(?:foo|bar)\\b/'
