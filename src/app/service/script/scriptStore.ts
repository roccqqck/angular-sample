interface Scripts {
    name: string;
    src: string;
}  
export const ScriptStore: Scripts[] = [
    { name: 'FirstCardObject_js', src: 'js/FirstCardObject_js.js'},
    { name: 'FirstCardObjectNew', src: 'js/FirstCardObjectNew.js'},
    { name: 'fcb_ws_base', src: 'js/fxml/asyn/fcb_ws_base.js' },
    { name: 'fcb_plugin_detect', src: 'js/fxml/asyn/fcb_plugin_detect.js' },
    { name: 'fcb_plugin_msg', src: 'js/fxml/asyn/fcb_plugin_msg.js' },
    { name: 'fcb_token_function', src: 'js/fxml/asyn/fcb_token_function.js' },
    { name: 'FBCertClient', src: 'js/fxml/FBCertClient.js' },
    { name: 'PKCS7CodeMapping', src: 'js/fxml/PKCS7CodeMapping.js' },
    { name: 'PKCS7SignClient', src: 'js/fxml/PKCS7SignClient.js' }
];