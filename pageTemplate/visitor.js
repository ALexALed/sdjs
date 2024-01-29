// HTML pages have a nested structure, so we will process them using the Visitor design pattern.
// Visitor‘s constructor takes the root node of the DOM tree as an argument and saves it.
// When we call Visitor.walk without a value, it starts recursing from that saved root;
// if .walk is given a value (as it is during recursive calls), it uses that instead.


import assert from 'assert'

class Visitor {
    constructor (root) {
        this.root = root
    }

    walk (node = null) {
        if (node === null) {
            node = this.root
        }
        if (this.open(node)) {
            node.children.forEach(child => {
                this.walk(child)
            })
        }
        this.close(node)
    }

    open (node) {
        assert(false,
               'Must implement "open"')
    }

    close (node) {
        assert(false,
               'Must implement "close"')
    }
}

export default Visitor