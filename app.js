const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url,
            title: 'this is cur title'
        },
        template: `<div>访问的 URL 是： {{ url }}</div>`
    })

    const content = {
        title: 'this is cur titles'
    }

    renderer.renderToString(app, content,(err, html) => {
        if (err) {
            res.status(500).end('Internal Server Errorss', err)
            return
        }
        res.end(`${html}`)
    })
})

server.listen(8081)
console.log('listening at 8081 port')
