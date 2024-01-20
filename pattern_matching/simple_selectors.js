import assert from 'assert'
import * as htmlparser2 from "htmlparser2";

const select = (root, selector) => {
  const selectors = selector.split(' ').filter(s => s.length > 0)
  return firstMatch(root, selectors)
}

const firstMatch = (node, selectors) => {
  assert(selectors.length > 0,
    'Require selector(s)')

  // Not a tag.
  if (node.type !== 'tag') {
    return null
  }

    // This node matches.
    if (matchHere(node, selectors[0])) {
        // This is the last selector, so matching worked.
        if (selectors.length === 1) {
            return node
        }

        // Try to match remaining selectors.
        return firstChildMatch(node, selectors.slice(1))
    }

    // This node doesn't match, so try further down.
    return firstChildMatch(node, selectors)
}

// [skip]
// [firstChild]
const firstChildMatch = (node, selectors) => {
    assert(node.type === 'tag',
           `Should only try to match first child of tags, not ${node.type}`)

    // First working match.
    for (const child of node.children) {
        const match = firstMatch(child, selectors)
        if (match) {
            return match
        }
    }

    // Nothing worked.
    return null
}
// [/firstChild]

// [matchHere]
const matchHere = (node, selector) => {
    let name = null
    let id = null
    let cls = null
    if (selector.includes('#')) {
        [name, id] = selector.split('#')
    } else if (selector.includes('.')) {
        [name, cls] = selector.split('.')
    } else {
        name = selector
    }
    return (node.name === name) &&
    ((id === null) || (node.attribs.id === id)) &&
    ((cls === null) || (node.attribs.class === cls))
}

const HTML = `<main>
  <p>text of first p</p>
  <p id="id-01">text of p#id-01</p>
  <p id="id-02">text of p#id-02</p>
  <p class="class-03">text of p.class-03</p>
  <div>
    <p>text of div / p</p>
    <p id="id-04">text of div / p#id-04</p>
    <p class="class-05">text of div / p.class-05</p>
    <p class="class-06">should not be found</p>
  </div>
  <div id="id-07">
    <p>text of div#id-07 / p</p>
    <p class="class-06">text of div#id-07 / p.class-06</p>
  </div>
</main>`

const getText = (node) => {
    if (!node) {
        return 'MISSING NODE'
    }
    if (!('children' in node)) {
        return 'MISSING CHILDREN'
    }
    if (node.children.length !== 1) {
        return 'WRONG NUMBER OF CHILDREN'
    }
    if (node.children[0].type !== 'text') {
        return 'NOT TEXT'
    }
    return node.children[0].data
}

const main = () => {
    const doc = htmlparser2.parseDOM(HTML)[0]
    const tests = [
        ['p', 'text of first p'],
        ['p#id-01', 'text of p#id-01'],
        ['p#id-02', 'text of p#id-02'],
        ['p.class-03', 'text of p.class-03'],
        ['div p', 'text of div / p'],
        ['div p#id-04', 'text of div / p#id-04'],
        ['div p.class-05', 'text of div / p.class-05'],
        ['div#id-07 p', 'text of div#id-07 / p'],
        ['div#id-07 p.class-06', 'text of div#id-07 / p.class-06']
    ]
    tests.forEach(([selector, expected]) => {
        const node = select(doc, selector)
        const actual = getText(node)
        const result = (actual === expected) ? 'pass' : 'fail'
        console.log(`"${selector}": ${result}`)
    })
}

main()