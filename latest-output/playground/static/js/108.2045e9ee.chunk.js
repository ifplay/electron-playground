(this["webpackJsonpelectron-playground"]=this["webpackJsonpelectron-playground"]||[]).push([[108],{1361:function(n,e){n.exports=["## 1. \u7a97\u53e3\u4e4b\u95f4\u7684\u901a\u4fe1\n### 1.1. \u4e3b\u8fdb\u7a0b\u5e72\u9884\u65b9\u5f0f\n\u4e3b\u8fdb\u7a0b\u662f\u53ef\u4ee5\u5e72\u9884\u6e32\u67d3\u8fdb\u7a0b\u751f\u6210\u65b0\u7684\u7a97\u53e3\u7684\uff0c\u53ea\u9700\u8981\u5728\u521b\u5efa\u7a97\u53e3\u65f6\uff0c`webContents` \u76d1\u542c `new-window` \n\n```javascript\nimport path from 'path'\nimport { PRELOAD_FILE } from 'app/config'\nimport { browserWindow } from 'electron';\n\nconst BaseWebPreferences: Electron.BrowserWindowConstructorOptions['webPreferences'] = {\n  nodeIntegration: true,\n  webSecurity: false,\n  preload: path.resolve(__dirname, PRELOAD_FILE),\n  enableRemoteModule:true,\n}\n\n\n// \u521b\u5efa\u7a97\u53e3\u76d1\u542c\nbrowserWindow.webContents.on('new-window', (event, url, frameName, disposition) => {\n    event.preventDefault()\n    // \u5728\u901a\u8fc7BrowserWindow\u521b\u5efa\u7a97\u53e3\n    const win = new BrowserWindow({ \n      show:false, \n      webPreferences: {\n        ...BaseWebPreferences,\n        additionalArguments:[`--parentWindow=${browserWindow.id}`] // \u628a\u7236\u7a97\u53e3\u7684id\u4f20\u8fc7\u53bb\n        enableRemoteModule:true\n      } \n    });\n    win.loadURl(url);\n    win.once('ready-to-show',()=>{\n        win.show()\n    })\n})\n```\n\u5728preload.js\u6587\u4ef6`window.process.argv`\uff0c\u4fbf\u80fd\u62ff\u5230\u7236\u7a97\u53e3\u7684id\uff0c`window.process.argv`\u662f\u4e00\u4e2a\u5b57\u7b26\u4e32\u6570\u7ec4\uff0c\u53ef\u4ee5\u4f7f\u7528<a href='https://github.com/yargs/yargs'>yargs</a>\u6765\u89e3\u6790\n\npreload.js \u4ee3\u7801\n```javascript\nimport { argv } from 'yargs'\nconsole.log(argv);\n```\n<img src='./img/yargv-parse.png'/>\n\u62ff\u5230\u7236\u7a97\u53e3\u7684id\uff0c\u4fbf\u53ef\u4ee5\u901a\u4fe1\u4e86\n\n__\u8bd5\u4e00\u8bd5__\n\n```javascript\n// @@code-renderer: runner\n// @@code-props: { hideRight: true, height:'600px' }\nconst path = require('path')\nconst { BrowserWindow } = require('electron')\n\nconst BaseWebPreferences = {\n  // // \u96c6\u6210node\n  nodeIntegration: true,\n  // // \u7981\u7528\u540c\u6e90\u7b56\u7565\n  // webSecurity: false,\n  // \u9884\u52a0\u8f7d\u811a\u672c \u901a\u8fc7\u7edd\u5bf9\u5730\u5740\u6ce8\u5165\n  preload: path.resolve(__dirname, './communication1.js'),\n  enableRemoteModule:true\n}\n\n// \u4e3b\u7a97\u53e3\u4ee3\u7801\nconst parent = new BrowserWindow({ webPreferences: BaseWebPreferences, x: 100, y: 0 })\nparent.loadURL(\n  'file:///' + path.resolve(__dirname, '../playground/index.html#/demo/communication-part1/main')\n)\n\nparent.webContents.on('new-window', (event, url, frameName, disposition) => {\n  event.preventDefault()\n\n  // \u5728\u901a\u8fc7BrowserWindow\u521b\u5efa\u7a97\u53e3 // \u5b50\u7a97\u53e3\u4ee3\u7801\n  const son = new BrowserWindow({\n    webPreferences: {\n      ...BaseWebPreferences,\n      additionalArguments: ['--parentWindowId=' + parent.id],\n    },\n  })\n  son.webContents.openDevTools()\n  son.loadURL(\n    'file:///' +\n      path.resolve(__dirname, '../playground/index.html#/demo/communication-part1/client'),\n  )\n})\n```\n__\u5176\u4f59\u4ee3\u7801\u5982\u4e0b__:\n\u4e3b\u7a97\u53e3\u4ee3\u7801\n```javascript\nimport React, { ReactElement, useEffect } from 'react'\nimport style from '../style.module.less'\n\nexport default function Communication(): ReactElement {\n  useEffect(() => {\n    document.title = '\u7236\u7a97\u53e3'\n  }, [])\n\n  return (\n    <div className={style.wrap}>\n      <a href='http://www.github.com' target='__blank'>\n        \u901a\u8fc7a\u6807\u7b7etarget=__blank\u6253\u5f00\u65b0\u7684\u7a97\u53e3\n      </a>\n      <div\n        onClick={() => {\n          window.open('http://www.github.com')\n        }}>\n        \u901a\u8fc7window.open\u6253\u5f00\u65b0\u7684\u7a97\u53e3\n      </div>\n    </div>\n  )\n}\n\n```\n\u5b50\u7a97\u53e3\u4ee3\u7801\n```javascript\nimport React, { ReactElement, useEffect, useState } from 'react'\nimport style from '../style.module.less'\n\nconst COUNT_NUM = 5\n\nexport default function Communication(): ReactElement {\n  const [num, setNum] = useState(COUNT_NUM)\n\n  useEffect(() => {\n    document.title = '\u5b50\u7a97\u53e3'\n    let timer: NodeJS.Timeout\n\n    if (num > 0) {\n      timer = setTimeout(() => {\n        setNum(num - 1)\n      }, 1000)\n    } else {\n      // @ts-ignore\n      window.send('hello')\n      window.close()\n    }\n    return () => {\n      timer && clearTimeout(timer)\n    }\n  }, [num])\n\n  return <div className={style.countDown}>\u5b50\u7a97\u53e3 {num} \u79d2\u4e4b\u540e\uff0c\u8bf7\u770b\u4e3b\u7a97\u53e3</div>\n}\n\n```\n\n\n### 1.2. \u7236\u5b50\u7a97\u53e3\u901a\u4fe1\n\n\u548c\u4e3b\u8fdb\u7a0b\u5e72\u9884\uff0c\u901a\u8fc7`ipc`\u901a\u4fe1\u65b9\u5f0f\u5dee\u4e0d\u591a\uff0c\u53ea\u662f\u5229\u7528\u7236\u5b50\u7a97\u53e3\u8fd9\u70b9\uff0c\u4e0d\u7528\u901a\u8fc7`additionalArguments`\u4f20\u9012\u7236\u7a97\u53e3`id`\uff0c\u5728\u5b50\u7a97\u53e3\u901a\u8fc7`window.parent`\uff0c\u5c31\u53ef\u4ee5\u62ff\u5230\u7236\u7a97\u53e3\n\n```javascript\nbrowserWindow.webContents.on('new-window', (event, url, frameName, disposition) => {\n    event.preventDefault()\n      \n    // \u5728\u901a\u8fc7BrowserWindow\u521b\u5efa\u7a97\u53e3\n    const win = new BrowserWindow({ \n        show:false, \n        webPreferences:BaseWebPreferences,\n        parent:browserWindow // \u6dfb\u52a0\u7236\u7a97\u53e3\n      });\n    win.loadURl(url);\n    win.once('ready-to-show',()=>{\n        win.show()\n    })\n    \n})\n```\n\u5f0a\u7aef\uff1a\u5b50\u7a97\u53e3\u6c38\u8fdc\u5728\u7236\u7a97\u53e3\u4e4b\u4e0a\u3002\n\n```javascript\n// @@code-renderer: runner\n// @@code-props: { hideRight: true, height:'600px' }\nconst path = require('path')\nconst { BrowserWindow } = require('electron')\n\nconst BaseWebPreferences = {\n  // // \u96c6\u6210node\n  nodeIntegration: true,\n  // // \u7981\u7528\u540c\u6e90\u7b56\u7565\n  // webSecurity: false,\n  // \u9884\u52a0\u8f7d\u811a\u672c \u901a\u8fc7\u7edd\u5bf9\u5730\u5740\u6ce8\u5165\n  preload: path.resolve(__dirname, './communication2.js'),\n  enableRemoteModule:true\n}\n\n// \u4e3b\u7a97\u53e3\u4ee3\u7801\nconst parent = new BrowserWindow({ webPreferences: BaseWebPreferences, left: 100, top: 0 })\nparent.loadURL(\n  'file:///' + path.resolve(__dirname, '../playground/index.html#/demo/communication-part2/main'),\n)\nparent.webContents.on('new-window', (event, url, frameName, disposition) => {\n  // \u963b\u6b62\u9ed8\u8ba4\u4e8b\u4ef6\n  event.preventDefault()\n  // \u5728\u901a\u8fc7BrowserWindow\u521b\u5efa\u7a97\u53e3\n  // \u5b50\u7a97\u53e3\u4ee3\u7801\n  const son = new BrowserWindow({\n    webPreferences: BaseWebPreferences,\n    parent,\n    width: 400,\n    height: 400,\n    alwaysOnTop: false,\n  })\n  // son.webContents.openDevTools();\n  son.loadURL(\n    'file:///' +\n      path.resolve(__dirname, '../playground/index.html#/demo/communication-part2/client'),\n  )\n})\n```\n__\u5176\u4f59\u4ee3\u7801\u5982\u4e0b__:\n\n\u4e3b\u7a97\u53e3\u4ee3\u7801\n```javascript\nimport React, { ReactElement, useEffect } from 'react'\nimport style from '../style.module.less'\n\nexport default function Communication(): ReactElement {\n\n  useEffect(() => {\n    document.title = '\u7236\u7a97\u53e3'\n  }, [])\n\n  return (\n    <div className={style.wrap}>\n      <a href='http://www.github.com' target='__blank'>\n        \u901a\u8fc7a\u6807\u7b7etarget=__blank\u6253\u5f00\u65b0\u7684\u7a97\u53e3\n      </a>\n      <div\n        onClick={() => {\n          window.open('http://www.github.com')\n        }}>\n        \u901a\u8fc7window.open\u6253\u5f00\u65b0\u7684\u7a97\u53e3\n      </div>\n    </div>\n  )\n}\n```\n\u5b50\u7a97\u53e3\u4ee3\u7801\n```javascript\nimport React, { ReactElement, useEffect, useState } from 'react'\nimport style from '../style.module.less'\n\nconst COUNT_NUM = 5\n\nexport default function Communication(): ReactElement {\n  const [num, setNum] = useState(COUNT_NUM)\n\n  useEffect(() => {\n    document.title = '\u5b50\u7a97\u53e3'\n    let timer: NodeJS.Timeout\n\n    if (num > 0) {\n      timer = setTimeout(() => {\n        setNum(num - 1)\n      }, 1000)\n    } else {\n      // @ts-ignore\n      window.sendToParent('hello')\n      window.close()\n    }\n    return () => {\n      timer && clearTimeout(timer)\n    }\n  }, [num])\n\n  return <div className={style.countDown}>\u5b50\u7a97\u53e3 {num} \u79d2\u4e4b\u540e\uff0c\u8bf7\u770b\u4e3b\u7a97\u53e3</div>\n}\n\n```\n\n### 1.3. \u4f7f\u7528`window.open`\n\n[window.open\u4ecb\u7ecd](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open)\n\n```javascript\nconst windowObjectReference = window.open(strUrl, strWindowName, [strWindowFeatures]);\n```\n\u901a\u8fc7\u8fd4\u56de\u7684`windowObjectReference`\uff0c\u4f7f\u7528`postMessage`\u5b8c\u6210\u901a\u4fe1  \n\u5177\u4f53\u4f8b\u5b50\uff0c\u53c2\u89c1\n\n\n<div>\n<a href='./index.html#/demo/communication-part3/main' target='_blank'>\u5b50\u9875\u9762\u4ee5\u53ca\u7236\u5b50\u9875\u9762\u7684\u901a\u4fe1</a>\n</div>"].join("")}}]);