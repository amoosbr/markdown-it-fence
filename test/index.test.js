import markdownIt from 'markdown-it'
import mdFence from '../src'

const md = markdownIt()

const testStr = `
  \`\`\`test
  I'm testing
  \`\`\`
`
const res = 'I\'m testing'

test('main', () => {
  expect(typeof mdFence).toBe('function')
})

test('name unmatched', () => {
  const plugin = () => mdFence(md, 'mytest', {
    render: () => res
  })
  expect(md.use(plugin).render(testStr)).toBe(`<pre><code class="language-test">I'm testing\n</code></pre>\n`)
})

// test('name test', () => {
//   const plugin = () => mdFence(md, 'mytest', {
//     render: () => res
//   })
//   expect(md.use(plugin).render(testStr)).toBe(`<pre><code class="language-test">I'm testing\n</code></pre>\n`)
// })

test('custom marker', () => {
  const tStr =
  `
:::test
I'm testing
:::
  `
  const plugin = () => {
    mdFence(md, 'test-marker', {
      marker: ':',
      render: () => res
    })
  }

  expect(md.use(plugin).render(tStr)).toBe(`<pre><code class="language-test">I'm testing\n</code></pre>\n`)
})

test('h3 supported', () => {
  const tStr =
    `
### h3 headline

\`\`\`test
I'm testing
\`\`\`
  `
  const plugin = () => {
    mdFence(md, 'test-h3', {
      render: () => res
    })
  }

  expect(md.use(plugin).render(tStr)).toBe(`<h3>h3 headline</h3>\n<pre><code class="language-test">I'm testing\n</code></pre>\n`)
})

// test('custom render', () => {
//   const plugin = () => {
//     mdFence(md, 'test', {
//       render: () => res
//     })
//   }
//   expect(md.use(plugin).render(testStr)).toBe(res)
// })
