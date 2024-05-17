import { MainView } from "../components/main-view/MainView";
import { Agv } from "../components/main-view/device/Agv";
import { AgvInfo } from "../typings";

// 定时器间隔（单位：毫秒）
const interval = 500; 

export class DsSocket {
  mainView: MainView;
  socket: WebSocket;

  constructor(mainView : MainView) {
    this.mainView = mainView;
    this.socket = this.initSocket();
  }
  
  
  initSocket() {
    const socket = new WebSocket('ws://localhost:9000/ds/websocket')
    // 启动定时器
    const timerId = setInterval(() => this.sendRequest(socket), interval);

    // 连接建立时的回调
    socket.addEventListener("open", (event) => {
      console.log("WebSocket connected:", event);
      // 发送消息到服务器
      socket.send("Hello, WebSocket Server!");
    });

    // 收到消息时的回调
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      // console.log(message);
      message.forEach((agvInfo: AgvInfo) => {
          this.processAgvData(agvInfo);
      });
    });

    // 连接关闭时的回调
    socket.addEventListener("close", (event) => {
      console.log("WebSocket closed:", event);
      clearInterval(timerId);
    });

    // 发生错误时的回调
    socket.addEventListener("error", (event) => {
      console.error("WebSocket error:", event);
      clearInterval(timerId);
    });
    return socket;
  }

  sendRequest(socket : WebSocket) {
    // 检查 WebSocket 连接状态
    if (socket.readyState === WebSocket.OPEN) {
        // 发送请求
        socket.send('Hello, server!');
    } else {
        console.error('WebSocket 连接未打开');
    }
  }

  processAgvData(agvInfo: AgvInfo): void {
    let agv = this.mainView.agvMap.get(agvInfo.agvId);
    if (!agv) {
      agv = new Agv(agvInfo, this.mainView);
    }
    
    agv.updateData(agvInfo);
  }
}