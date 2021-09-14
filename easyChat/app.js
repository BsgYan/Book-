var ws=require('nodejs-websocket');

var server=ws.createServer(function(conn){
    console.log('New connection');

    //接受消息
    conn.on('text',function(str){
        var data=JSON.parse(str);

        switch(data.type){
            case 'setname':
                conn.nickname=data.name;
                boardcast(JSON.stringify({
                    name:'Server',
                    text:data.name+'加入了房间'
                }));
                break;
            case 'chat':
                boardcast(JSON.stringify({
                    name:conn.nickname,
                    text:data.text
                }));
        }
    })

    conn.on('error',function(err){
        console.log(err);
    })

    conn.on('close',function(){
        boardcast(JSON.stringify({
            name:'Server',
            text:data.name+'离开了房间'
        }));
    })

}).listen(2333);


//广播消息
function boardcast(str){
    server.connections.forEach(function(conn){
        conn.sendText(str);
    })
}

// conn.on('text',callback(str))             服务端接收客户端发送的信息
// conn.on('error',callback(err))            服务端接收客户端发送的信息
// conn.on('close',callback())               关闭连接
// conn.sendText                             服务端向客户端发消息
// .listen(2333);                            2333端口号
// server.connections                        包含所有连接