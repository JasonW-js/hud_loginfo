// ============================================================
//  岚图HUD CANFD + IIC 协议定义 (外置数据文件)
//  ----------------------------------------------------------
//  用法：直接编辑下方 { ... } 内部即可，格式与 JSON 完全一致。
//  字段偏移(offset)/长度(size)/类型(kind)/中文描述(name)/枚举映射(map)
//  故障位/开关位(entries) 都可修改，保存后刷新页面即生效。
//  注意：只改 {} 里的内容，不要动第一行和最后一行的赋值语句。
// ============================================================
window.VOYAH_PROTOCOL = {
  "meta": {
    "name": "岚图HUD CANFD+IIC 协议定义",
    "version": "V1.0",
    "updated": "2026-08-13",
    "author": "王加顺",
    "note": "本文件为纯协议数据。字段偏移/长度/类型/中文描述/枚举映射/故障位/开关位均可直接编辑；改完保存并刷新页面即可生效。"
  },

  "projects": {
    "H37A":        { "protocol": "iic",   "minVersion": "V2.16", "parserVariant": "H37A",         "swVersion": "SWA.0.18",        "label": "H37A/H37B-8295 (IIC协议)" },
    "H53B-8295":   { "protocol": "iic",   "minVersion": "V2.16", "parserVariant": "H53B",         "swVersion": "8295",             "label": "H53B-8295 (IIC协议)" },
    "H56C-8295":   { "protocol": "iic",   "minVersion": "V2.16", "parserVariant": "H56C_8295",    "swVersion": "SWA.0.11~0.12",    "label": "H56C-8295 (IIC协议)" },
    "H56C-HM":     { "protocol": "iic",   "minVersion": "V2.16", "parserVariant": "H56C_HM",      "swVersion": "SWA.0.05~0.06",    "label": "H56C-HM (IIC协议)" },
    "H56C-8295-v13": { "protocol": "iic", "minVersion": "V2.16", "parserVariant": "H56C_8295_v13","swVersion": "SWA.0.13",         "label": "H56C-8295 (IIC协议)" },
    "H56C-HM-v07":   { "protocol": "iic", "minVersion": "V2.16", "parserVariant": "H56C_HM_v07",  "swVersion": "SWA.0.07",         "label": "H56C-HM (IIC协议)" },
    "H37B":        { "protocol": "canfd", "minVersion": "V1.18", "parserVariant": "H37B",         "swVersion": "SWA.0.18",         "label": "H37B (CANFD协议)" },
    "H53B":        { "protocol": "canfd", "minVersion": "V1.18", "parserVariant": "H53B_CANFD",   "swVersion": "SWB.0.12",         "label": "H53B (CANFD协议)" },
    "H97E":        { "protocol": "canfd", "minVersion": "V1.18", "parserVariant": "H97E",         "swVersion": "SWC.0.15",         "label": "H97E (CANFD协议)" },
    "H77A":        { "protocol": "canfd", "minVersion": "V1.18", "parserVariant": "H77A_CANFD",   "swVersion": "SWA.0.17",         "label": "H77A (CANFD协议)" },
    "H47A":        { "protocol": "canfd", "minVersion": "V1.18", "parserVariant": "H47A",         "swVersion": "SWA.0.10",         "label": "H47A (CANFD协议)" },
    "H66A":        { "protocol": "canfd", "minVersion": "V1.18", "parserVariant": "H66A",         "swVersion": "SWA.0.04",         "label": "H66A (CANFD协议)" },
    "H56E":        { "protocol": "canfd", "minVersion": "V1.18", "parserVariant": "H56E",         "swVersion": "SWA.0.11",         "label": "H56E (CANFD协议)" }
  },

  "protocols": {
    "canfd": {
      "name": "岚图HUD CANFD协议",
      "versions": {
        "V1.18": {
          "supportedCmds": ["0xF1 (心跳状态)", "0xF7 (日志信息2)", "0xF5 (设备信息上报)"],
          "frameHeaders": ["AA0000AA", "BB0000BB"]
        }
      }
    },
    "iic": {
      "name": "岚图HUD IIC通讯协议",
      "versions": {
        "V2.16": {
          "supportedCmds": ["0x0009 (调试日志)", "0x0005 (雨量光传感器)"],
          "frameHeaders": ["44554841", "41485544", "544F4144"],
          "headerNames": { "44554841": "DUHA(HUD上报)", "41485544": "AHUD(设备应答)", "544F4144": "TOAD(APK请求)" }
        }
      }
    }
  },

  "enums": {
    "hwDistType":      { "0": "畸变芯片V42", "1": "畸变芯片V40", "2": "软畸变方案" },
    "vehicleMode":     { "0": "Initial", "1": "Normal", "2": "Factory", "3": "Transportation", "4": "Collision", "5": "OTA", "15": "Invalid" },
    "powerModeReal":   { "0": "DEFAULT", "1": "OFF", "2": "Local ON", "3": "Remote ON", "4": "RESERVE1", "5": "RESERVE2", "6": "RESERVE3", "7": "INVALID" },
    "cdcContent":      { "0": "正常显示", "1": "标准图像1(1点图)", "2": "标准图像2(重影检测)", "3": "标准图像3(畸变检测)", "4": "标准图像4(九点图)", "5": "预留", "80": "初始值", "255": "Invalid" },
    "tftStateMachine": { "0": "关闭状态", "1": "等待上电稳定(>200ms)", "2": "设置D2U/U2D→VGL步骤1(面板放电)", "3": "设置D2U/U2D→VGL步骤2(面板放电)", "4": "设置D2U/U2D恢复", "5": "设置pwr为低(下电序列)", "6": "复位TFT", "7": "等待视频流OK(>200ms)", "8": "TFT已打开" }
  },

  "messages": {
    "canfd": {
      "0xF1": {
        "name": "心跳状态报文 (CANFD 0xF1)",
        "length": 54,
        "remainingLabel": "预留区域",
        "variantLayouts": { "H37B": "c14", "H53B_CANFD": "c14", "H97E": "c14", "H77A_CANFD": "c15" },
        "defaultLayout": "c16",
        "layouts": {
          "c14": {
            "fields": [
              { "name": "故障信息 (2B)", "offset": 0, "size": 2, "kind": "bits", "summary": "fault", "emptyText": "无故障",
                "entries": [
                  { "byte": 0, "bit": 0, "desc": "过热保护" }, { "byte": 0, "bit": 1, "desc": "LED芯片故障脚故障" },
                  { "byte": 0, "bit": 2, "desc": "电机芯片故障脚故障" }, { "byte": 0, "bit": 3, "desc": "电池欠压(<8V)" },
                  { "byte": 0, "bit": 4, "desc": "电池过压(>16.5V)" }, { "byte": 0, "bit": 5, "desc": "辅助电源1故障" },
                  { "byte": 0, "bit": 6, "desc": "辅助电源2故障" }, { "byte": 0, "bit": 7, "desc": "CDC节点丢失故障" },
                  { "byte": 1, "bit": 0, "desc": "LCD屏连接故障" }, { "byte": 1, "bit": 1, "desc": "LED连接故障" },
                  { "byte": 1, "bit": 2, "desc": "预留" }, { "byte": 1, "bit": 3, "desc": "光感连接故障(仅H53B支持)" },
                  { "byte": 1, "bit": 4, "desc": "解串lock丢失故障(和DTC反馈一致)" }, { "byte": 1, "bit": 5, "desc": "防阳光倒灌策略生效(仅H53B支持)" },
                  { "byte": 1, "bit": 6, "desc": "TFT故障引脚故障" }, { "byte": 1, "bit": 7, "desc": "预留" }
                ] },
              { "name": "开关/状态信息 (2B)", "offset": 2, "size": 2, "kind": "bits", "summary": "switch",
                "entries": [
                  { "byte": 0, "bit": 0, "name": "刚上电限位开关", "on": "触发", "off": "未触发" },
                  { "byte": 0, "bit": 1, "name": "实时解串lock电平", "on": "高", "off": "低" },
                  { "byte": 0, "bit": 4, "name": "实时限位开关", "on": "触发", "off": "未触发" },
                  { "byte": 0, "bit": 5, "name": "步进电机PPS策略", "on": "默认PPS", "off": "低温策略PPS" },
                  { "byte": 0, "bit": 6, "name": "KL15信号", "on": "激活", "off": "未激活" },
                  { "byte": 0, "bit": 7, "name": "HUD开关状态", "on": "开", "off": "关" },
                  { "byte": 1, "bit": 0, "name": "车辆模式背光(OTA)", "on": "熄灭(OTA模式)", "off": "正常(no_ota)" },
                  { "byte": 1, "bit": 1, "name": "PEPS背光控制", "on": "熄灭(非LocalOn)", "off": "允许开" },
                  { "byte": 1, "bit": 2, "name": "Byte3-Bit2", "on": "预留", "off": "预留" }
                ] },
              { "name": "电源工作模式(apk下发)", "offset": 4, "size": 1, "kind": "enum", "map": { "0": "关(0x00)", "1": "开(0x01)" }, "fallback": "其他(0x{hex})" },
              { "name": "HUD畸变硬件方案", "offset": 5, "size": 1, "kind": "enum", "enumRef": "hwDistType" },
              { "name": "畸变生效状态", "offset": 6, "size": 1, "kind": "enum", "map": { "1": "已生效" }, "fallback": "未生效(含其他值)" },
              { "name": "LED温度", "offset": 7, "size": 1, "kind": "temp" },
              { "name": "LCD温度", "offset": 8, "size": 1, "kind": "temp" },
              { "name": "亮度等级", "offset": 9, "size": 1, "kind": "num", "rawAs": "dec", "prefix": "等级" },
              { "name": "PWM", "offset": 10, "size": 2, "kind": "pwm" },
              { "name": "高度等级", "offset": 12, "size": 1, "kind": "num", "rawAs": "dec", "prefix": "档位" },
              { "name": "电机绝对步数", "offset": 13, "size": 2, "kind": "num", "suffix": "步" },
              { "name": "解串Lock拉低丢失计数", "offset": 15, "size": 2, "kind": "num", "suffix": "次" },
              { "name": "预留 (Byte17)", "offset": 17, "size": 1, "kind": "hex", "note": "预留" },
              { "name": "H53B光感数值和(>7900触发防阳光倒灌)", "offset": 18, "size": 3, "kind": "num" },
              { "name": "LCD复位次数", "offset": 21, "size": 1, "kind": "num", "suffix": "次" },
              { "name": "畸变错误处理次数", "offset": 22, "size": 1, "kind": "num", "suffix": "次" },
              { "name": "畸变芯片错误寄存器", "offset": 23, "size": 4, "kind": "hex", "note": "V40:0xF0 / V42:0x9006(前2B),0x9008(后2B)" },
              { "name": "畸变矫正系数CRC16", "offset": 27, "size": 2, "kind": "num", "fmt": "hex" },
              { "name": "下线标定参数CRC16", "offset": 29, "size": 2, "kind": "num", "fmt": "hex" },
              { "name": "当前环境光FW", "offset": 31, "size": 2, "kind": "num" },
              { "name": "当前环境光AMB", "offset": 33, "size": 2, "kind": "num" },
              { "name": "零位偏差步数", "offset": 35, "size": 2, "kind": "steps" },
              { "name": "0x297-CDC出图内容", "offset": 37, "size": 1, "kind": "enum", "enumRef": "cdcContent" },
              { "name": "环境光信息", "offset": 38, "size": 1, "kind": "bits",
                "entries": [
                  { "bit": 0, "name": "报文有效", "on": "是", "off": "否" },
                  { "bit": 1, "name": "环境光传感器故障", "on": "故障", "off": "正常" },
                  { "bit": 2, "name": "雨量光传感器故障", "on": "故障", "off": "正常" }
                ] },
              { "name": "输入解串水平分辨率", "offset": 39, "size": 2, "kind": "num", "suffix": " px" },
              { "name": "输入解串垂直分辨率", "offset": 41, "size": 2, "kind": "num", "suffix": " px" },
              { "name": "LCD/畸变状态机", "offset": 43, "size": 1, "kind": "nibbles", "sep": " | ",
                "parts": [
                  { "nibble": "hi", "label": "LCD状态机", "map": { "0": "初始状态(等待视频流输入)", "1": "等待视频流稳定", "2": "正常运行中", "3": "故障恢复中" } },
                  { "nibble": "lo", "label": "畸变状态机", "map": { "0": "初始化中", "1": "时钟切换", "2": "清除故障", "3": "等待时钟锁住", "4": "正常运行中", "5": "故障恢复" } }
                ] },
              { "name": "0x4FE-Vehicle_Mode", "offset": 44, "size": 1, "kind": "enum", "enumRef": "vehicleMode", "fallback": "0x{hex}" },
              { "name": "上次关机电机归零步数(含下压补偿)", "offset": 45, "size": 2, "kind": "num", "suffix": "步" },
              { "name": "SOC回复软畸变状态", "offset": 47, "size": 1, "kind": "enum", "map": { "0": "渲染应答成功", "1": "渲染应答失败", "2": "Soc未回复" }, "fallback": "未知(0x{hex})" },
              { "name": "0x2C1-电源工作模式实时", "offset": 48, "size": 1, "kind": "enum", "enumRef": "powerModeReal" },
              { "name": "背光芯片LED_Fault_Status", "offset": 49, "size": 2, "kind": "num", "fmt": "hex", "prefix": "寄存器值: 0x" },
              { "name": "0x2C8-超级省电状态", "offset": 51, "size": 1, "kind": "enum", "map": { "255": "无效/未收到" }, "fallback": "{v}" },
              { "name": "预留 (Byte52)", "offset": 52, "size": 1, "kind": "hex", "note": "预留" },
              { "name": "MCU复位累加计数", "offset": 53, "size": 1, "kind": "num", "suffix": "次" }
            ]
          },
          "c15": {
            "fields": [
              { "name": "故障信息 (2B) [H77A定义]", "offset": 0, "size": 2, "kind": "bits", "summary": "fault", "emptyText": "无故障",
                "entries": [
                  { "byte": 0, "bit": 0, "desc": "过热保护" }, { "byte": 0, "bit": 1, "desc": "LED芯片故障脚故障" },
                  { "byte": 0, "bit": 2, "desc": "电机芯片故障脚故障" }, { "byte": 0, "bit": 3, "desc": "电池欠压(<8V)" },
                  { "byte": 0, "bit": 4, "desc": "电池过压(>16.5V)" }, { "byte": 0, "bit": 5, "desc": "辅助电源1故障" },
                  { "byte": 0, "bit": 6, "desc": "辅助电源2故障" }, { "byte": 0, "bit": 7, "desc": "CDC节点丢失故障" },
                  { "byte": 1, "bit": 0, "desc": "LCD屏连接故障" }, { "byte": 1, "bit": 1, "desc": "LED连接故障" },
                  { "byte": 1, "bit": 2, "desc": "lcd温感电阻开路/短路(仅H77A)" }, { "byte": 1, "bit": 3, "desc": "预留" },
                  { "byte": 1, "bit": 4, "desc": "解串lock丢失故障(和DTC反馈一致)" }, { "byte": 1, "bit": 5, "desc": "防阳光倒灌策略生效(仅H77A/H53B支持)" },
                  { "byte": 1, "bit": 6, "desc": "预留" }
                ] },
              { "name": "开关/状态信息 (2B)", "offset": 2, "size": 2, "kind": "bits", "summary": "switch",
                "entries": [
                  { "byte": 0, "bit": 0, "name": "刚上电限位开关", "on": "触发", "off": "未触发" },
                  { "byte": 0, "bit": 1, "name": "实时解串lock电平", "on": "高", "off": "低" },
                  { "byte": 0, "bit": 4, "name": "实时限位开关", "on": "触发", "off": "未触发" },
                  { "byte": 0, "bit": 5, "name": "步进电机PPS策略", "on": "默认PPS", "off": "低温策略PPS" },
                  { "byte": 0, "bit": 6, "name": "KL15信号", "on": "激活", "off": "未激活" },
                  { "byte": 0, "bit": 7, "name": "HUD开关状态", "on": "开", "off": "关" },
                  { "byte": 1, "bit": 0, "name": "车辆模式背光(OTA)", "on": "熄灭(OTA模式)", "off": "正常(no_ota)" },
                  { "byte": 1, "bit": 1, "name": "PEPS背光控制", "on": "熄灭(非LocalOn)", "off": "允许开" },
                  { "byte": 1, "bit": 2, "name": "DLP背光开关", "on": "熄灭(投影中)", "off": "可打开" }
                ] },
              { "name": "电源工作模式(apk下发)", "offset": 4, "size": 1, "kind": "enum", "map": { "0": "关(0x00)", "1": "开(0x01)" }, "fallback": "其他(0x{hex})" },
              { "name": "HUD畸变硬件方案", "offset": 5, "size": 1, "kind": "enum", "enumRef": "hwDistType" },
              { "name": "畸变生效状态", "offset": 6, "size": 1, "kind": "enum", "map": { "1": "已生效" }, "fallback": "未生效(含其他值)" },
              { "name": "LED温度", "offset": 7, "size": 1, "kind": "temp" },
              { "name": "LCD温度", "offset": 8, "size": 1, "kind": "temp" },
              { "name": "亮度等级", "offset": 9, "size": 1, "kind": "num", "rawAs": "dec", "prefix": "等级" },
              { "name": "PWM", "offset": 10, "size": 2, "kind": "pwm" },
              { "name": "高度等级", "offset": 12, "size": 1, "kind": "num", "rawAs": "dec", "prefix": "档位" },
              { "name": "电机绝对步数", "offset": 13, "size": 2, "kind": "num", "suffix": "步" },
              { "name": "解串Lock拉低丢失计数", "offset": 15, "size": 2, "kind": "num", "suffix": "次" },
              { "name": "H77A排线NTC最大NTC值", "offset": 17, "size": 1, "kind": "temp", "note": "raw+50", "zeroText": "未使用(0x00)" },
              { "name": "预留 (Byte18-20)", "offset": 18, "size": 3, "kind": "hex", "note": "预留" },
              { "name": "LCD复位次数", "offset": 21, "size": 1, "kind": "num", "suffix": "次" },
              { "name": "解串配置错误次数(H77A)", "offset": 22, "size": 1, "kind": "num", "suffix": "次" },
              { "name": "预留 (Byte23-26)", "offset": 23, "size": 4, "kind": "hex", "note": "预留" },
              { "name": "畸变矫正系数CRC16", "offset": 27, "size": 2, "kind": "num", "fmt": "hex" },
              { "name": "下线标定参数CRC16", "offset": 29, "size": 2, "kind": "num", "fmt": "hex" },
              { "name": "当前环境光FW", "offset": 31, "size": 2, "kind": "num" },
              { "name": "当前环境光AMB", "offset": 33, "size": 2, "kind": "num" },
              { "name": "零位偏差步数", "offset": 35, "size": 2, "kind": "steps" },
              { "name": "0x297-CDC出图内容", "offset": 37, "size": 1, "kind": "enum", "enumRef": "cdcContent" },
              { "name": "环境光信息", "offset": 38, "size": 1, "kind": "bits",
                "entries": [
                  { "bit": 0, "name": "报文有效", "on": "是", "off": "否" },
                  { "bit": 1, "name": "环境光传感器故障", "on": "故障", "off": "正常" },
                  { "bit": 2, "name": "雨量光传感器故障", "on": "故障", "off": "正常" }
                ] },
              { "name": "输入解串水平分辨率", "offset": 39, "size": 2, "kind": "num", "suffix": " px" },
              { "name": "输入解串垂直分辨率", "offset": 41, "size": 2, "kind": "num", "suffix": " px" },
              { "name": "解串状态机(bit7~4，bit3~0预留)", "offset": 43, "size": 1, "kind": "nibbles",
                "parts": [
                  { "nibble": "hi", "label": "解串状态机", "map": { "0": "初始化中", "1": "等待视频流稳定", "2": "正常运行中", "3": "故障恢复中" } }
                ] },
              { "name": "0x4FE-Vehicle_Mode", "offset": 44, "size": 1, "kind": "enum", "enumRef": "vehicleMode", "fallback": "0x{hex}" },
              { "name": "上次关机电机归零步数", "offset": 45, "size": 2, "kind": "num", "suffix": "步" },
              { "name": "SOC回复软畸变状态", "offset": 47, "size": 1, "kind": "enum", "map": { "0": "渲染应答成功", "1": "渲染应答失败", "2": "Soc未回复" }, "fallback": "未知(0x{hex})" },
              { "name": "0x2C1-电源工作模式实时", "offset": 48, "size": 1, "kind": "enum", "enumRef": "powerModeReal" },
              { "name": "背光芯片LED_Fault_Status", "offset": 49, "size": 2, "kind": "num", "fmt": "hex", "prefix": "寄存器值: 0x" },
              { "name": "0x2C8-超级省电状态", "offset": 51, "size": 1, "kind": "enum", "map": { "255": "无效/未收到" }, "fallback": "{v}" },
              { "name": "0x3FC-VCU功率限制状态", "offset": 52, "size": 1, "kind": "enum", "map": { "255": "无效/未收到" }, "fallback": "{v}" },
              { "name": "MCU复位累加计数", "offset": 53, "size": 1, "kind": "num", "suffix": "次" }
            ]
          },
          "c16": {
            "fields": [
              { "name": "故障信息 (2B)", "offset": 0, "size": 2, "kind": "bits", "summary": "fault", "emptyText": "无故障",
                "entries": [
                  { "byte": 0, "bit": 0, "desc": "过热保护" }, { "byte": 0, "bit": 1, "desc": "LED芯片故障脚故障" },
                  { "byte": 0, "bit": 2, "desc": "电机芯片故障脚故障(H66A开路)" }, { "byte": 0, "bit": 3, "desc": "电池欠压(<8V)" },
                  { "byte": 0, "bit": 4, "desc": "电池过压(>16.5V)" }, { "byte": 0, "bit": 5, "desc": "辅助电源1故障" },
                  { "byte": 0, "bit": 6, "desc": "辅助电源2故障" }, { "byte": 0, "bit": 7, "desc": "CDC节点丢失故障" },
                  { "byte": 1, "bit": 0, "desc": "LCD屏连接故障" }, { "byte": 1, "bit": 1, "desc": "LED连接故障" },
                  { "byte": 1, "bit": 2, "desc": "预留" }, { "byte": 1, "bit": 3, "desc": "预留" },
                  { "byte": 1, "bit": 4, "desc": "解串lock丢失故障(>10s)" }, { "byte": 1, "bit": 5, "desc": "预留" },
                  { "byte": 1, "bit": 6, "desc": "TFT故障引脚故障" }
                ] },
              { "name": "开关/状态信息 (2B)", "offset": 2, "size": 2, "kind": "bits", "summary": "switch",
                "entries": [
                  { "byte": 0, "bit": 0, "name": "刚上电限位开关", "on": "触发", "off": "未触发" },
                  { "byte": 0, "bit": 1, "name": "实时解串lock电平", "on": "高", "off": "低" },
                  { "byte": 0, "bit": 4, "name": "实时限位开关", "on": "触发", "off": "未触发" },
                  { "byte": 0, "bit": 5, "name": "步进电机PPS策略", "on": "默认PPS", "off": "低温策略PPS" },
                  { "byte": 0, "bit": 6, "name": "KL15信号", "on": "激活", "off": "未激活" },
                  { "byte": 0, "bit": 7, "name": "HUD开关状态", "on": "开", "off": "关" },
                  { "byte": 1, "bit": 0, "name": "车辆模式背光(OTA)", "on": "熄灭(OTA模式)", "off": "正常(no_ota)" },
                  { "byte": 1, "bit": 1, "name": "PEPS背光控制", "on": "熄灭(非LocalOn)", "off": "允许开" },
                  { "byte": 1, "bit": 2, "name": "DLP背光开关", "on": "熄灭(投影中)", "off": "可打开" }
                ] },
              { "name": "电源工作模式(apk下发)", "offset": 4, "size": 1, "kind": "enum", "map": { "0": "关(0x00)", "1": "开(0x01)" }, "fallback": "其他(0x{hex})" },
              { "name": "HUD畸变硬件方案", "offset": 5, "size": 1, "kind": "enum", "enumRef": "hwDistType" },
              { "name": "畸变生效状态", "offset": 6, "size": 1, "kind": "enum", "map": { "1": "已生效" }, "fallback": "未生效(含其他值)" },
              { "name": "LED温度", "offset": 7, "size": 1, "kind": "temp" },
              { "name": "LCD温度", "offset": 8, "size": 1, "kind": "temp" },
              { "name": "亮度等级", "offset": 9, "size": 1, "kind": "num", "rawAs": "dec", "prefix": "等级" },
              { "name": "PWM", "offset": 10, "size": 2, "kind": "pwm" },
              { "name": "高度等级", "offset": 12, "size": 1, "kind": "num", "rawAs": "dec", "prefix": "档位" },
              { "name": "电机绝对步数", "offset": 13, "size": 2, "kind": "num", "suffix": "步" },
              { "name": "解串Lock拉低丢失计数", "offset": 15, "size": 2, "kind": "num", "suffix": "次" },
              { "name": "预留 (Byte17-20)", "offset": 17, "size": 4, "kind": "hex", "note": "预留" },
              { "name": "LCD复位次数", "offset": 21, "size": 1, "kind": "num", "suffix": "次" },
              { "name": "畸变错误处理次数", "offset": 22, "size": 1, "kind": "num", "suffix": "次" },
              { "name": "畸变芯片错误寄存器", "offset": 23, "size": 4, "kind": "hex", "note": "V40:0xF0 / V42:0x9006(前2B),0x9008(后2B)" },
              { "name": "畸变矫正系数CRC16", "offset": 27, "size": 2, "kind": "num", "fmt": "hex" },
              { "name": "下线标定参数CRC16", "offset": 29, "size": 2, "kind": "num", "fmt": "hex" },
              { "name": "当前环境光FW", "offset": 31, "size": 2, "kind": "num" },
              { "name": "当前环境光AMB", "offset": 33, "size": 2, "kind": "num" },
              { "name": "零位偏差步数", "offset": 35, "size": 2, "kind": "steps" },
              { "name": "0x297-CDC出图内容", "offset": 37, "size": 1, "kind": "enum", "enumRef": "cdcContent" },
              { "name": "环境光信息", "offset": 38, "size": 1, "kind": "bits",
                "entries": [
                  { "bit": 0, "name": "报文有效", "on": "是", "off": "否" },
                  { "bit": 1, "name": "环境光传感器故障", "on": "故障", "off": "正常" },
                  { "bit": 2, "name": "雨量光传感器故障", "on": "故障", "off": "正常" }
                ] },
              { "name": "输入解串水平分辨率", "offset": 39, "size": 2, "kind": "num", "suffix": " px" },
              { "name": "输入解串垂直分辨率", "offset": 41, "size": 2, "kind": "num", "suffix": " px" },
              { "name": "解串/畸变状态机(C16定义)", "offset": 43, "size": 1, "kind": "nibbles", "sep": " | ",
                "parts": [
                  { "nibble": "hi", "label": "解串状态机", "map": { "0": "测试模式", "1": "等待视频流稳定", "2": "正常运行中", "3": "故障恢复中" } },
                  { "nibble": "lo", "label": "畸变状态机", "map": { "0": "测试模式", "1": "等待视频流", "2": "故障处理", "3": "等待时钟锁住", "4": "正常运行中", "5": "等待恢复" } }
                ] },
              { "name": "0x4FE-Vehicle_Mode", "offset": 44, "size": 1, "kind": "enum", "enumRef": "vehicleMode", "fallback": "0x{hex}" },
              { "name": "上次关机电机归零步数(含下压补偿)", "offset": 45, "size": 2, "kind": "num", "suffix": "步" },
              { "name": "SOC回复软畸变状态", "offset": 47, "size": 1, "kind": "enum", "map": { "0": "渲染应答成功", "1": "渲染应答失败", "2": "Soc未回复" }, "fallback": "未知(0x{hex})" },
              { "name": "0x2C1-电源工作模式实时", "offset": 48, "size": 1, "kind": "enum", "enumRef": "powerModeReal" },
              { "name": "背光芯片LED_Fault_Status", "offset": 49, "size": 2, "kind": "num", "fmt": "hex", "prefix": "寄存器值: 0x" },
              { "name": "0x2C8-超级省电状态", "offset": 51, "size": 1, "kind": "enum", "map": { "255": "无效/未收到" }, "fallback": "{v}" },
              { "name": "0x3FC-VCU功率限制状态", "offset": 52, "size": 1, "kind": "enum", "map": { "255": "无效/未收到" }, "fallback": "{v}" },
              { "name": "MCU复位累加计数", "offset": 53, "size": 1, "kind": "num", "suffix": "次" }
            ]
          }
        }
      },
      "0xF7": {
        "name": "日志信息2报文 (CANFD 0xF7)",
        "remainingLabel": "预留区域",
        "variantLayouts": { "H37B": "c14", "H53B_CANFD": "c14", "H97E": "c14", "H77A_CANFD": "c15" },
        "defaultLayout": "c16",
        "layouts": {
          "c14": {
            "fields": [
              { "name": "MCU复位原因", "offset": 0, "size": 1, "kind": "hex" },
              { "name": "TFT硬件方案", "offset": 1, "size": 1, "kind": "enum", "map": { "0": "京瓷", "1": "友达" }, "fallback": "未知(0x{hex})" },
              { "name": "TFT屏故障信息(友达屏,3B)", "offset": 2, "size": 3, "kind": "hex", "prefix": "原始3字节: " },
              { "name": "当前电机归零步数", "offset": 5, "size": 2, "kind": "num", "suffix": "步" }
            ]
          },
          "c15": {
            "fields": [
              { "name": "友达屏page1_50h读出值", "offset": 0, "size": 1, "kind": "enum", "map": { "20": "vtotal_max=680", "6": "vtotal_max=700" }, "fallback": "0x{hex}" },
              { "name": "TFT屏方案(bit7~4)", "offset": 1, "size": 1, "kind": "nibbles",
                "parts": [
                  { "nibble": "hi", "map": { "0": "京瓷屏", "1": "友达屏" } }
                ] },
              { "name": "TFT屏故障寄存器信息", "offset": 2, "size": 3, "kind": "hex", "prefix": "原始3字节: " },
              { "name": "当前电机归零步数", "offset": 5, "size": 2, "kind": "num", "suffix": "步" },
              { "name": "背光芯片Boost相关故障寄存器", "offset": 7, "size": 2, "kind": "num", "fmt": "hex" },
              { "name": "背光芯片Supply相关故障寄存器", "offset": 9, "size": 2, "kind": "num", "fmt": "hex" },
              { "name": "预留 (Byte11-17)", "offset": 11, "size": 7, "kind": "hex", "note": "预留" },
              { "name": "TFT code刷新失败次数(高字节在前)", "offset": 18, "size": 4, "kind": "num", "suffix": "次" },
              { "name": "TFT故障状态机(友达屏)", "offset": 22, "size": 1, "kind": "enum", "enumRef": "tftStateMachine" },
              { "name": "解串断流恢复复位次数", "offset": 23, "size": 1, "kind": "num", "suffix": "次" },
              { "name": "TFT流程通信故障标记", "offset": 24, "size": 1, "kind": "bits", "emptyText": "无通信故障",
                "entries": [
                  { "bit": 0, "desc": "D2U/U2D→VGL步骤1失败" }, { "bit": 1, "desc": "D2U/U2D→VGL步骤2失败" },
                  { "bit": 2, "desc": "D2U/U2D恢复失败" }, { "bit": 3, "desc": "故障读取切页失败" }
                ] },
              { "name": "TFT故障寄存器完整值(P0-34h/37h/39h/3Ah)", "offset": 25, "size": 4, "kind": "hex", "prefix": "原始4字节: " },
              { "name": "预留 (Byte29)", "offset": 29, "size": 1, "kind": "hex", "note": "预留" }
            ]
          },
          "c16": {
            "fields": [
              { "name": "预留 (Byte0)", "offset": 0, "size": 1, "kind": "hex", "note": "预留" },
              { "name": "TFT屏方案(bit7~4)", "offset": 1, "size": 1, "kind": "nibbles",
                "parts": [
                  { "nibble": "hi", "map": { "0": "京瓷屏", "1": "友达屏" } }
                ] },
              { "name": "TFT屏故障寄存器信息", "offset": 2, "size": 3, "kind": "hex", "prefix": "原始3字节: " },
              { "name": "当前电机归零步数", "offset": 5, "size": 2, "kind": "num", "suffix": "步" },
              { "name": "背光芯片Boost相关故障寄存器", "offset": 7, "size": 2, "kind": "num", "fmt": "hex" },
              { "name": "背光芯片Supply相关故障寄存器", "offset": 9, "size": 2, "kind": "num", "fmt": "hex" },
              { "name": "MCU复位原因", "offset": 11, "size": 4, "kind": "hex", "prefix": "原始4字节: " },
              { "name": "故障信息补充1(电机开路检测)", "offset": 15, "size": 2, "kind": "bits", "emptyText": "无电机故障",
                "entries": [
                  { "byte": 0, "bit": 0, "desc": "电机OAP开路" }, { "byte": 0, "bit": 1, "desc": "电机OAM开路" },
                  { "byte": 0, "bit": 2, "desc": "电机OBP开路" }, { "byte": 0, "bit": 3, "desc": "电机OBM开路" }
                ] },
              { "name": "外设驱动配置失败标记", "offset": 17, "size": 1, "kind": "bits", "emptyText": "无配置失败",
                "entries": [
                  { "bit": 0, "desc": "背光配置失败" }, { "bit": 1, "desc": "电机配置失败" },
                  { "bit": 2, "desc": "解串配置失败" }, { "bit": 3, "desc": "畸变配置失败" },
                  { "bit": 4, "desc": "TFT配置失败" }
                ] },
              { "name": "预留 (Byte18-21)", "offset": 18, "size": 4, "kind": "hex", "note": "预留" },
              { "name": "TFT故障状态机(友达屏)", "offset": 22, "size": 1, "kind": "enum", "enumRef": "tftStateMachine" },
              { "name": "解串断流恢复复位次数", "offset": 23, "size": 1, "kind": "num", "suffix": "次" },
              { "name": "TFT流程通信故障标记", "offset": 24, "size": 1, "kind": "bits", "emptyText": "无通信故障",
                "entries": [
                  { "bit": 0, "desc": "D2U/U2D→VGL步骤1失败" }, { "bit": 1, "desc": "D2U/U2D→VGL步骤2失败" },
                  { "bit": 2, "desc": "D2U/U2D恢复失败" }, { "bit": 3, "desc": "故障读取切页失败" }
                ] },
              { "name": "TFT故障寄存器完整值(P0-34h/37h/39h/3Ah)", "offset": 25, "size": 4, "kind": "hex", "prefix": "原始4字节: " },
              { "name": "收到0x466关闭应用报文外发信号次数", "offset": 29, "size": 1, "kind": "num", "suffix": "次" }
            ]
          }
        }
      },
      "0xF5": {
        "name": "设备信息上报报文 (CANFD 0xF5)",
        "length": 54,
        "remainingLabel": "预留区域",
        "defaultLayout": "v18",
        "layouts": {
          "v18": {
            "fields": [
              { "name": "供应商BOOT版本号 (Byte0-7)", "offset": 0, "size": 8, "kind": "ascii" },
              { "name": "供应商硬件版本号 (Byte8-15)", "offset": 8, "size": 8, "kind": "ascii" },
              { "name": "供应商软件版本号 (Byte16-23)", "offset": 16, "size": 8, "kind": "ascii" },
              { "name": "岚图客户软件版本号 (Byte24-36)", "offset": 24, "size": 13, "kind": "ascii" },
              { "name": "准确零部件号 (Byte37-48)", "offset": 37, "size": 12, "kind": "ascii" },
              { "name": "高度偏移值 (Byte49-52)", "offset": 49, "size": 4, "kind": "ascii", "suffix": " (ASCII: 如\"-450\"~\"+450\")" },
              { "name": "预留 (Byte53)", "offset": 53, "size": 1, "kind": "hex", "note": "预留" }
            ]
          }
        }
      }
    },
    "iic": {
      "0x0009": {
        "name": "调试日志信息报文 (IIC 0x0009)",
        "remainingLabel": "尾随数据",
        "variantLayouts": { "H53B": "H53B", "H56C_8295": "H56C", "H56C_HM": "H56C", "H56C_8295_v13": "H56C_v13", "H56C_HM_v07": "H56C_v13" },
        "defaultLayout": "H37A",
        "layouts": {
          "H37A": {
            "fields": [
              { "name": "故障信息 (2B)", "offset": 0, "size": 2, "kind": "bits", "emptyText": "无故障",
                "entries": [
                  { "byte": 0, "bit": 0, "desc": "过热保护" }, { "byte": 0, "bit": 1, "desc": "LED芯片故障脚故障" },
                  { "byte": 0, "bit": 2, "desc": "电机芯片故障脚故障" }, { "byte": 0, "bit": 3, "desc": "电池欠压(<8V)" },
                  { "byte": 0, "bit": 4, "desc": "电池过压(>16.5V)" }
                ] },
              { "name": "状态信息 (Byte2)", "offset": 2, "size": 1, "kind": "bits",
                "entries": [
                  { "bit": 0, "name": "刚上电时限位开关", "on": "触发", "off": "未触发" },
                  { "bit": 4, "name": "实时限位开关", "on": "触发", "off": "未触发" },
                  { "bit": 5, "name": "步进电机PPS", "on": "默认PPS", "off": "低温策略PPS" },
                  { "bit": 6, "name": "解串lock脚状态", "on": "正常", "off": "异常" }
                ] },
              { "name": "LCD/畸变状态 (Byte3)", "offset": 3, "size": 1, "kind": "nibbles",
                "parts": [
                  { "nibble": "hi", "label": "LCD状态", "map": { "0": "等待初始化", "1": "正常工作中", "2": "故障恢复中" } },
                  { "nibble": "lo", "label": "畸变芯片状态", "map": { "0": "等待初始化", "1": "切换内外时钟", "2": "清除故障", "3": "等待时钟锁住", "4": "正常工作中", "5": "故障恢复中" } }
                ] },
              { "name": "HUD开关状态", "offset": 4, "size": 1, "kind": "enum", "map": { "0": "HUD打开" }, "fallback": "HUD关闭(0x{hex})" },
              { "name": "自适应高度开关", "offset": 5, "size": 1, "kind": "enum", "map": { "0": "开" }, "fallback": "关" },
              { "name": "自适应亮度开关", "offset": 6, "size": 1, "kind": "enum", "map": { "0": "开" }, "fallback": "关" },
              { "name": "LED温度", "offset": 7, "size": 1, "kind": "temp" },
              { "name": "LCD温度", "offset": 8, "size": 1, "kind": "temp" },
              { "name": "整车电源工作模式（非激活：背光熄灭+电机归零，激活：背光打开+电机到位）", "offset": 9, "size": 1, "kind": "enum", "map": { "0": "激活" }, "fallback": "未激活" },
              { "name": "PWM", "offset": 10, "size": 2, "kind": "pwm" },
              { "name": "电机绝对步数", "offset": 12, "size": 2, "kind": "num", "suffix": "步" },
              { "name": "电机归零回转步数", "offset": 14, "size": 2, "kind": "num", "suffix": "步" },
              { "name": "零位偏差步数", "offset": 16, "size": 2, "kind": "steps" },
              { "name": "解串Lock拉低丢失计数", "offset": 18, "size": 2, "kind": "num", "suffix": "次" },
              { "name": "畸变芯片错误寄存器(V42:0x9006/0x9008)", "offset": 20, "size": 4, "kind": "hex", "prefix": "原始4字节: " },
              { "name": "背光芯片0x0E寄存器", "offset": 24, "size": 2, "kind": "num", "fmt": "hex" },
              { "name": "背光芯片0x10寄存器", "offset": 26, "size": 2, "kind": "num", "fmt": "hex" },
              { "name": "背光芯片0x12寄存器", "offset": 28, "size": 2, "kind": "num", "fmt": "hex" }
            ]
          },
          "H53B": {
            "fields": [
              { "name": "故障信息 (2B) [H53B定义]", "offset": 0, "size": 2, "kind": "bits", "emptyText": "无故障",
                "entries": [
                  { "byte": 0, "bit": 0, "desc": "过热保护" }, { "byte": 0, "bit": 1, "desc": "LED芯片故障脚故障" },
                  { "byte": 0, "bit": 2, "desc": "电机芯片故障脚故障" }, { "byte": 0, "bit": 3, "desc": "电池欠压(<8V)" },
                  { "byte": 0, "bit": 4, "desc": "电池过压(>16.5V)" }, { "byte": 0, "bit": 5, "desc": "TFT屏故障脚故障(友达屏)" },
                  { "byte": 0, "bit": 6, "desc": "阳光倒灌报警" }, { "byte": 0, "bit": 7, "desc": "阳光传感器未连接" },
                  { "byte": 1, "bit": 0, "desc": "LED灯板未连接" }, { "byte": 1, "bit": 1, "desc": "TFT未连接" }
                ] },
              { "name": "状态信息/控制信号", "offset": 2, "size": 1, "kind": "bits",
                "entries": [
                  { "bit": 0, "name": "刚上电时限位开关", "on": "触发", "off": "未触发" },
                  { "bit": 2, "name": "实时限位开关", "on": "触发", "off": "未触发" },
                  { "bit": 4, "name": "步进电机PPS", "on": "默认PPS", "off": "低温策略PPS" }
                ] },
              { "name": "当前PCB硬件版本(TFT屏版本)", "offset": 3, "size": 1, "kind": "nibbles",
                "parts": [
                  { "nibble": "lo", "map": { "0": "京瓷屏", "1": "友达屏" }, "fallback": "未知({v})" }
                ] },
              { "name": "HUD开关状态", "offset": 4, "size": 1, "kind": "enum", "map": { "0": "HUD打开" }, "fallback": "HUD关闭(0x{hex})" },
              { "name": "自适应高度开关", "offset": 5, "size": 1, "kind": "enum", "map": { "0": "开" }, "fallback": "关" },
              { "name": "自适应亮度开关", "offset": 6, "size": 1, "kind": "enum", "map": { "0": "开" }, "fallback": "关" },
              { "name": "LED温度", "offset": 7, "size": 1, "kind": "temp" },
              { "name": "TFT温度", "offset": 8, "size": 1, "kind": "temp" },
              { "name": "整车电源工作模式（0激活4.1寸/0x30激活3.1寸/1未激活）", "offset": 9, "size": 1, "kind": "enum", "map": { "0": "激活(4.1寸)", "48": "激活(3.1寸)" }, "fallback": "未激活(0x{hex})" },
              { "name": "PWM", "offset": 10, "size": 2, "kind": "pwm" },
              { "name": "电机绝对步数", "offset": 12, "size": 2, "kind": "num", "suffix": "步" },
              { "name": ">>> 可变区域 <<<", "kind": "tagged", "offset": 14, "size": 2,
                "cases": [
                  { "when": "0x2222", "desc": "区域2222(零位偏差/背光寄存器)", "base": 16,
                    "fields": [
                      { "name": "[ID=0x2222] 低温零位补偿偏差值", "offset": 16, "size": 2, "kind": "steps" },
                      { "name": "[ID=0x2222] 畸变芯片处理次数", "offset": 18, "size": 1, "kind": "num", "suffix": "次" },
                      { "name": "[ID=0x2222] LCD复位次数", "offset": 19, "size": 1, "kind": "num", "suffix": "次" },
                      { "name": "[ID=0x2222] 背光Supply寄存器", "offset": 20, "size": 2, "kind": "num", "fmt": "hex" },
                      { "name": "[ID=0x2222] 背光Boost寄存器", "offset": 22, "size": 2, "kind": "num", "fmt": "hex" },
                      { "name": "[ID=0x2222] 背光Status寄存器", "offset": 24, "size": 2, "kind": "num", "fmt": "hex" },
                      { "name": "[ID=0x2222] 背光配置失败标记", "offset": 26, "size": 1, "kind": "enum", "map": { "0": "无失败", "1": "配置失败" }, "fallback": "未知(0x{hex})" },
                      { "name": "硬件MCU类型", "offset": 27, "size": 2, "kind": "enum", "map": { "0": "NXP芯片", "19014": "AutoChip芯片" }, "fallback": "未知(0x{hex})" },
                      { "name": "HUD下电次数", "offset": 29, "size": 1, "kind": "num", "suffix": "次" }
                    ] },
                  { "when": "0x3333", "desc": "区域3333(MCU复位/阳光传感器)", "base": 16,
                    "fields": [
                      { "name": "[ID=0x3333] MCU复位原因", "offset": 16, "size": 4, "kind": "hex", "prefix": "原始4字节: " },
                      { "name": "[ID=0x3333] 阳光传感器和(H53B)", "offset": 20, "size": 3, "kind": "num", "suffix": " (超过7900触发防阳光倒灌)" },
                      { "name": "[ID=0x3333] 预留", "offset": 23, "size": 4, "kind": "hex", "prefix": "原始值: " },
                      { "name": "硬件MCU类型", "offset": 27, "size": 2, "kind": "enum", "map": { "0": "NXP芯片", "19014": "AutoChip芯片" }, "fallback": "未知(0x{hex})" },
                      { "name": "HUD下电次数", "offset": 29, "size": 1, "kind": "num", "suffix": "次" }
                    ] },
                  { "when": "0x4444", "desc": "区域4444(TFT通讯故障)", "base": 16,
                    "fields": [
                      { "name": "[ID=0x4444] TFT通讯失败标记", "offset": 16, "size": 1, "kind": "bits", "emptyText": "无故障",
                        "entries": [
                          { "bit": 0, "desc": "bit0: D2U/U2D→VGL步骤1失败" }, { "bit": 1, "desc": "bit1: D2U/U2D→VGL步骤2失败" },
                          { "bit": 2, "desc": "bit2: D2U/U2D恢复失败" }, { "bit": 3, "desc": "bit3: 故障读取切页失败" }
                        ] },
                      { "name": "[ID=0x4444] TFT故障具体信息(P0-34h/37h/39h/3Ah)", "offset": 17, "size": 4, "kind": "hex", "prefix": "原始4字节: " },
                      { "name": "[ID=0x4444] 预留", "offset": 21, "size": 6, "kind": "hex", "prefix": "原始值: " },
                      { "name": "硬件MCU类型", "offset": 27, "size": 2, "kind": "enum", "map": { "0": "NXP芯片", "19014": "AutoChip芯片" }, "fallback": "未知(0x{hex})" },
                      { "name": "HUD下电次数", "offset": 29, "size": 1, "kind": "num", "suffix": "次" }
                    ] },
                  { "when": "*", "desc": "默认区域(电机归零步数={v}步)", "base": 16,
                    "fields": [
                      { "name": "电机归零回转步数", "kind": "num", "source": "tag", "suffix": "步" },
                      { "name": "档位信息(亮度/高度)", "offset": 16, "size": 1, "kind": "nibbles", "sep": " | ",
                        "parts": [
                          { "nibble": "hi", "label": "亮度档位" },
                          { "nibble": "lo", "label": "高度档位" }
                        ] },
                      { "name": "显示状态机(LCD+畸变芯片)", "offset": 17, "size": 1, "kind": "nibbles", "sep": " | ",
                        "parts": [
                          { "nibble": "hi", "label": "LCD", "map": { "0": "LCD关闭", "1": "等待视频流", "2": "正常运行", "3": "故障恢复" } },
                          { "nibble": "lo", "label": "畸变芯片", "map": { "0": "测试模式", "1": "初始化状态", "2": "等待视频流输入", "3": "等待输入时钟锁住", "4": "正常运行中", "5": "等待回复中" } }
                        ] },
                      { "name": "解串Lock拉低丢失计数", "offset": 18, "size": 2, "kind": "num", "suffix": "次" },
                      { "name": "预留 (Byte20-21)", "offset": 20, "size": 2, "kind": "hex", "note": "预留" },
                      { "name": "畸变芯片错误寄存器值", "offset": 22, "size": 2, "kind": "num", "fmt": "hex", "prefix": "V42:0x9006 → 0x" },
                      { "name": "屏故障信息(友达屏P0-34h~39h)", "offset": 24, "size": 3, "kind": "hex", "prefix": "原始3字节: " },
                      { "name": "硬件MCU类型", "offset": 27, "size": 2, "kind": "enum", "map": { "0": "NXP芯片", "19014": "AutoChip芯片" }, "fallback": "未知(0x{hex})" },
                      { "name": "HUD下电次数", "offset": 29, "size": 1, "kind": "num", "suffix": "次" }
                    ] }
                ] }
            ]
          },
          "H56C": {
            "fields": [
              { "name": "故障信息 (2B) [H56C]", "offset": 0, "size": 2, "kind": "bits", "emptyText": "无故障",
                "entries": [
                  { "byte": 0, "bit": 0, "desc": "过热保护" }, { "byte": 0, "bit": 1, "desc": "LED芯片故障脚故障" },
                  { "byte": 0, "bit": 2, "desc": "电机芯片故障脚故障" }, { "byte": 0, "bit": 3, "desc": "电池欠压(<8V)" },
                  { "byte": 0, "bit": 4, "desc": "电池过压(>16.5V)" },
                  { "byte": 1, "bit": 1, "desc": "不归零HUD标记(100次不归零)" }
                ] },
              { "name": "HUD下电次数", "offset": 2, "size": 2, "kind": "num", "suffix": "次" },
              { "name": "HUD开关状态", "offset": 4, "size": 1, "kind": "enum", "map": { "0": "HUD打开" }, "fallback": "HUD关闭(0x{hex})" },
              { "name": "自适应高度开关", "offset": 5, "size": 1, "kind": "enum", "map": { "0": "开" }, "fallback": "关" },
              { "name": "自适应亮度开关", "offset": 6, "size": 1, "kind": "enum", "map": { "0": "开" }, "fallback": "关" },
              { "name": "LED温度", "offset": 7, "size": 1, "kind": "temp" },
              { "name": "LCD温度", "offset": 8, "size": 1, "kind": "temp" },
              { "name": "整车电源工作模式（非激活：背光熄灭，激活：背光打开）", "offset": 9, "size": 1, "kind": "enum", "map": { "0": "激活" }, "fallback": "未激活" },
              { "name": "PWM", "offset": 10, "size": 2, "kind": "pwm" },
              { "name": "电机绝对步数", "offset": 12, "size": 2, "kind": "num", "suffix": "步" },
              { "name": "HUD唤醒硬线状态", "offset": 14, "size": 1, "kind": "hex", "prefix": "0x" },
              { "name": "扩展字段 (H56C-HM)", "kind": "ifremaining", "offset": 15, "minLen": 6,
                "fields": [
                  { "name": "I2C-Busy引起复位计数(H56C-HM)", "offset": 15, "size": 2, "kind": "num", "suffix": "次" },
                  { "name": "MCU复位原因(H56C-HM)", "offset": 17, "size": 4, "kind": "hex", "prefix": "原始4字节: " }
                ] }
            ]
          },
          "H56C_v13": {
            "fields": [
              { "name": "故障信息 (2B) [H56C-SWA.0.13/0.07]", "offset": 0, "size": 2, "kind": "bits", "emptyText": "无故障",
                "entries": [
                  { "byte": 0, "bit": 0, "desc": "过热保护" }, { "byte": 0, "bit": 1, "desc": "LED芯片故障脚故障" },
                  { "byte": 0, "bit": 2, "desc": "电机芯片故障脚故障" }, { "byte": 0, "bit": 3, "desc": "电池欠压(<8V)" },
                  { "byte": 0, "bit": 4, "desc": "电池过压(>16.5V)" }, { "byte": 0, "bit": 5, "desc": "TFT屏故障脚故障(友达屏)" },
                  { "byte": 0, "bit": 6, "name": "解串lock脚状态", "on": "正常(拉高)", "off": "拉低(未连接)" }
                ] },
              { "name": "状态信息/控制信号", "offset": 2, "size": 1, "kind": "bits",
                "entries": [
                  { "bit": 0, "name": "刚上电时限位开关", "on": "触发", "off": "未触发" },
                  { "bit": 1, "name": "不归零HUD标记", "on": "标记(100次不归零)", "off": "无" },
                  { "bit": 2, "name": "实时限位开关", "on": "触发", "off": "未触发" },
                  { "bit": 3, "name": "KL15信号(硬线)", "on": "有效", "off": "无效" },
                  { "bit": 4, "name": "步进电机PPS", "on": "默认PPS", "off": "低温PPS" }
                ] },
              { "name": "当前PCB硬件版本(TFT屏版本)", "offset": 3, "size": 1, "kind": "nibbles",
                "parts": [
                  { "nibble": "lo", "map": { "0": "京瓷屏", "1": "友达屏" }, "fallback": "未知({v})" }
                ] },
              { "name": "HUD开关状态", "offset": 4, "size": 1, "kind": "enum", "map": { "0": "HUD打开" }, "fallback": "HUD关闭(0x{hex})" },
              { "name": "自适应高度开关", "offset": 5, "size": 1, "kind": "enum", "map": { "0": "开" }, "fallback": "关" },
              { "name": "自适应亮度开关", "offset": 6, "size": 1, "kind": "enum", "map": { "0": "开" }, "fallback": "关" },
              { "name": "LED温度", "offset": 7, "size": 1, "kind": "temp" },
              { "name": "TFT温度", "offset": 8, "size": 1, "kind": "temp" },
              { "name": "整车电源工作模式", "offset": 9, "size": 1, "kind": "enum", "map": { "0": "激活" }, "fallback": "非激活" },
              { "name": "PWM", "offset": 10, "size": 2, "kind": "pwm" },
              { "name": "电机绝对步数", "offset": 12, "size": 2, "kind": "num", "suffix": "步" },
              { "name": "电机归零回转步数(上次掉电归零)", "offset": 14, "size": 2, "kind": "num", "suffix": "步" },
              { "name": "档位信息(亮度/高度)", "offset": 16, "size": 1, "kind": "nibbles", "sep": " | ",
                "parts": [
                  { "nibble": "hi", "label": "亮度档位" },
                  { "nibble": "lo", "label": "高度档位" }
                ] },
              { "name": "显示状态机(畸变芯片+LCD)", "offset": 17, "size": 1, "kind": "nibbles", "sep": " | ",
                "parts": [
                  { "nibble": "hi", "label": "LCD状态机", "map": { "0": "初始化(等待视频流输入)", "1": "等待视频稳定(>200ms)", "2": "正常运行" } },
                  { "nibble": "lo", "label": "畸变芯片状态机", "map": { "0": "空闲(诊断)", "1": "触发畸变生效", "2": "触发畸变清除", "3": "触发进入测试图", "4": "触发退出测试图" } }
                ] },
              { "name": "解串Lock拉低丢失计数", "offset": 18, "size": 2, "kind": "num", "suffix": "次" },
              { "name": "I2C-Busy引起复位计数", "offset": 20, "size": 2, "kind": "num", "suffix": "次" },
              { "name": "畸变芯片错误寄存器值", "offset": 22, "size": 2, "kind": "num", "fmt": "hex", "prefix": "V40:0xF0 → 0x" },
              { "name": "屏故障信息1(友达屏P0-34h/37h/39h)", "offset": 24, "size": 3, "kind": "hex", "prefix": "原始3字节: " },
              { "name": "预留 (Byte27)", "offset": 27, "size": 1, "kind": "hex", "note": "预留" },
              { "name": "MCU复位原因", "offset": 28, "size": 1, "kind": "hex", "prefix": "0x" },
              { "name": "HUD下电次数", "offset": 29, "size": 1, "kind": "num", "suffix": "次" }
            ]
          }
        }
      },
      "0x0005": {
        "name": "雨量光传感器值 (IIC 0x0005)",
        "remainingLabel": "尾随数据",
        "defaultLayout": "v216",
        "layouts": {
          "v216": {
            "branches": [
              { "when": 1, "fields": [
                  { "name": "应答结果", "offset": 0, "size": 1, "kind": "enum", "map": { "0": "SUCCESS (接收成功)", "1": "FAIL (接收失败)" }, "fallback": "未知({v})" }
                ] },
              { "when": "*", "minLen": 8, "fields": [
                  { "name": "FW前照值 (2B)", "offset": 0, "size": 2, "kind": "enum", "map": { "65535": "无效(未收到)" }, "fallback": "{v}" },
                  { "name": "IR采集值 (2B)", "offset": 2, "size": 2, "kind": "enum", "map": { "65535": "无效(未收到)" }, "fallback": "{v}" },
                  { "name": "AMB环境光值 (2B)", "offset": 4, "size": 2, "kind": "enum", "map": { "65535": "无效(未收到)" }, "fallback": "{v}" },
                  { "name": "HUD前照值 (2B)", "offset": 6, "size": 2, "kind": "enum", "map": { "65535": "无效(未收到)" }, "fallback": "{v}" }
                ] }
            ]
          }
        }
      }
    }
  }
};
