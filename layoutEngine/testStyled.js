import { assert } from 'chai';
import parseHTML from './parse.js'
import { CssRuleSet, IdRule, ClassRule, TagRule } from './microCss.js'

it('styles a tree of nodes with multiple rules', async () => {
  const html = [
    '<col id="name">',
    '<row class="kind">first\nsecond</row>',
    '<row>third\nfourth</row>',
    '</col>'
  ]
  const dom = parseHTML(html.join(''))
  const rules = new CssRuleSet({
    '.kind': { height: 3 },
    '#name': { height: 5 },
    row: { width: 10 }
  })
  dom.findRules(rules)
  assert.deepStrictEqual(dom.rules, [
    new IdRule('#name', { height: 5 })
  ])
  assert.deepStrictEqual(dom.children[0].rules, [
    new ClassRule('.kind', { height: 3 }),
    new TagRule('row', { width: 10 })
  ])
  assert.deepStrictEqual(dom.children[1].rules, [
    new TagRule('row', { width: 10 })
  ])
})
