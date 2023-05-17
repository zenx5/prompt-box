const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path')

const ruleForStyle = {
    test: /\.css$/,
    use: ['style-loader','css-loader']
}

const ruleForJS = {
    test: /\.js$/,
    loader: 'babel-loader',
    options: {
        presets: [
            [
                '@babel/preset-react',
                {
                    runtime: 'automatic'
                }
            ]
        ]
    }
}

const rules = [ruleForJS, ruleForStyle]

module.exports = (env, argv) => {


    return {
        output: {
            filename: 'app.js',
            path: path.resolve(__dirname, 'app')
        },
        plugins:[
            new HtmlWebpackPlugin({template:'src/static/index.html'}),
            new CopyWebpackPlugin({
                patterns: [
                  { from: 'src/static/manifest.json', to: 'manifest.json' },
                  { from: 'src/static/background.js', to: 'background.js' }
                ]
            })
        ],
        module:{
            rules
        }
    }
}