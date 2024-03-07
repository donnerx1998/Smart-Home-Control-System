// 引入所需的库
const express = require('express');
const bodyParser = require('body-parser');
const VoiceControl = require('voice-control-library');
const DeviceManager = require('device-manager-library');
const SecurityCamera = require('security-camera-library');
const LightController = require('light-controller-library');
const HeatingController = require('heating-controller-library');

// 初始化应用程序
const app = express();
app.use(bodyParser.json());

// 初始化设备管理器
const deviceManager = new DeviceManager();

// 初始化安全摄像头
const securityCamera = new SecurityCamera();

// 初始化灯光控制器
const lightController = new LightController();

// 初始化供暖控制器
const heatingController = new HeatingController();

// 初始化语音控制
const voiceControl = new VoiceControl();

// API端点：获取所有设备
app.get('/devices', (req, res) => {
  const devices = deviceManager.getAllDevices();
  res.json(devices);
});

// API端点：打开或关闭设备
app.post('/devices/:id/control', (req, res) => {
  const deviceId = req.params.id;
  const { action } = req.body;
  const result = deviceManager.controlDevice(deviceId, action);
  res.json(result);
});

// API端点：触发安全摄像头
app.post('/security-camera/trigger', (req, res) => {
  const { action } = req.body;
  const result = securityCamera.triggerAction(action);
  res.json(result);
});

// API端点：控制灯光
app.post('/lights/control', (req, res) => {
  const { action } = req.body;
  const result = lightController.controlLights(action);
  res.json(result);
});

// API端点：控制供暖
app.post('/heating/control', (req, res) => {
  const { action } = req.body;
  const result = heatingController.controlHeating(action);
  res.json(result);
});

// API端点：语音控制
app.post('/voice-control', (req, res) => {
  const { command } = req.body;
  const result = voiceControl.processVoiceCommand(command);
  res.json(result);
});

// 启动服务器
const port = 3000;
app.listen(port, () => {
  console.log(`智能家居控制系统运行在 http://localhost:${port}`);
});
