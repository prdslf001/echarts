interface sendData {
    action: string;
    socketType: string;
    chartName: string;
    value: string;
}

export default class SocketService {
    // 定义静态属性   static instance 使用 SocketService | null 类型
    private static instance: SocketService | null = null;
    // 定义 WebSocket 实例属性   ws 属性使用 WebSocket | null 类型
    private ws: WebSocket | null = null;

    //标识是否连接成功
    private isConnect: Boolean = false;
    //记录重试的次数
    private sendRetryCount: number = 0;
    //重新连接尝试次数
    private connectRetryCount: number = 0;

    // private callbackMap: Map<string, (data: any) => void> = new Map();
    // 私有构造函数，防止外部直接 new
    private constructor() {}

    // 获取单例的静态方法
    public static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }

    // 定义回调映射的接口
    private callBackMapping: { [key: string]: (data: any) => void } = {};

    // 注册回调（map实现方式）
    // registerCallback(key: string, callback: (data: any) => void): void {
    //     this.callbackMap.set(key, callback);
    // }

    // 取消注册回调
    // unregisterCallback(key: string): void {
    //     this.callbackMap.delete(key);
    // }

    // 添加参数类型和返回值类型
    public registerCallback(socketType: string, callBack: (data: any) => void): void {
        this.callBackMapping[socketType] = callBack;
    }

    public unregisterCallback(socketType: string): void {
        if (this.callBackMapping[socketType]) {
            delete this.callBackMapping[socketType];
        }
        // this.callBackMapping[socketType] = null
    }
    // 连接方法
    connect(): void {
        if (!this.ws) {
            this.ws = new WebSocket('ws://localhost:9999');

            //连接服务端成功
            this.ws.onopen = () => {
                console.log('WebSocket连接成功');
                this.isConnect = true;
                this.connectRetryCount = 0;
            };
            //连接服务端失败或者连接成功后服务器关闭；
            this.ws.onclose = () => {
                console.log('WebSocket连接关闭');
                this.isConnect = false;
                this.connectRetryCount++;
                setTimeout(() => {
                    this.connect();
                }, this.connectRetryCount * 500);
            };

            this.ws.onerror = () => {
                console.log('WebSocket连接错误');
            };

            this.ws.onmessage = (msg) => {
                // console.log('收到消息xxxxx:', msg.data);
                const recvData = JSON.parse(msg.data);
                const socketType = recvData.socketType;
                if (this.callBackMapping[socketType]) {
                    const action = recvData.action;
                    if (action === 'getData') {
                        const realData = JSON.parse(recvData.data);
                        // console.log(realData)
                        // this.callBackMapping[socketType].call(this, realData)
                        this.callBackMapping[socketType](realData); //这里不加this也可以；
                    } else if (action === 'fullScreen') {
                        this.callBackMapping[socketType](recvData);
                    }
                }
            };
        }
    }

    // 发送消息方法
    send(data: sendData): void {
        if (this.isConnect) {
            this.sendRetryCount = 0;
            // this.ws.send(data);
            this.ws?.send(JSON.stringify(data));
        } else {
            console.error('WebSocket未连接22');
            this.sendRetryCount++;
            setTimeout(() => {
                this.send(data);
            }, this.sendRetryCount * 500);
        }
    }

    // 关闭连接方法
    close(): void {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
    }
}
