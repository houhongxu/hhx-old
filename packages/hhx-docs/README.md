# mvp 版本

## 如何不进行 link 执行脚手架

cd 进入当前文件夹
执行`node bin/cli.js dev docs`

## path.join 和 path.resolve 区别

1. join 是把各个 path 片段连接在一起， resolve 把'/'当成根目录

2. resolve 在传入的第一参数为非根路径时，会返回一个带当前目录路径的绝对路径，而 join 仅仅用于路径拼接
