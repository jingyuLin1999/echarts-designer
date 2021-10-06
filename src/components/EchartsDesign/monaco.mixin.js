import * as monaco from "monaco-editor";
export default {
    data() {
        return {
            monacoEditor: {}, // 代码编辑器
        }
    },
    mounted() {
        // this.initMonaco();
    },
    beforeDestroy() {
        this.destroyEditor();
    },
    methods: {
        // 初始化代码编辑器
        initMonaco() {
            this.$nextTick(async () => {
                // https://www.cnblogs.com/zzsdream/p/14055963.html
                this.monacoEditor = await monaco.editor.create(document.getElementById("monaco-codding"), {
                    value: "",
                    language: "javascript",
                    readOnly: false,
                    theme: "vs", // vs  vs-dark  hc-black
                    minimap: { enabled: true },
                    selectOnLineNumbers: true,
                    roundedSelection: false,
                    cursorStyle: 'line', // 光标样式
                    automaticLayout: false, // 自动布局
                    glyphMargin: true, // 字形边缘
                    useTabStops: false,
                    fontSize: 16, // 字体大小
                    autoIndent: true //自动布局
                });
            });
        },
        // 销毁编辑器
        destroyEditor() {
            if (Object.keys(this.monacoEditor).length > 0) this.monacoEditor.dispose();
        },
        // 格式化
        formatCode() {
            setTimeout(() => {
                this.monacoEditor.getAction("editor.action.formatDocument").run();
            }, 50);
        },
        // 运行代码
        onRunCode() {
            let { responseData } = this.clickedChart;
            let codeStr = this.monacoEditor.getValue();
            codeStr = codeStr.replace(/return/g, "")
            let runResult = eval(codeStr);
            this.clickedChart.data = runResult;
        },
        setValue(text) {
            setTimeout(() => {
                this.monacoEditor.setValue(text);
                this.formatCode();
            }, 100);
        },
        // 获取选中的值
        selectText() {
            //获取编辑器选中的参数，包括起始行等等
            let selection = this.monacoEditor.getSelection();
            //获取当前选中的文本
            let text = this.currentFn(this.monacoEditor, selection.startLineNumber, selection.startColumn, selection.endLineNumber, selection.endColumn);
            return text;
        },
        currentFn(monacoEditor, startLineNumber, startColumn, endLineNumber, endColumn) {
            let currentText = '' //选中文字的内容
            let num = 0;//累计回车的数量
            let startIndex = null;//截取编辑器内容的起始下标
            let endIndex = null;//截取编辑器内容的结束下标
            // monacoEditor.getValue().split('')  :  获取编辑器内容，并拆成数组，并把每一个字符作为数组的每一项
            if (startLineNumber < endLineNumber) {//当起始行<结束行（方向：从上到下，从左到右）
                monacoEditor.getValue().split('').map((item, index) => {
                    if (startLineNumber === 1) {//判断起始行当前行数，为1 则前面没有回车
                        startIndex = startColumn - 1;//获取起始下标
                        if (item === '\n') {
                            num += 1;//累计回车数量（针对于结束行）
                            if (num === endLineNumber - 1) {//获取结束行最近的回车的下标+结束行的结束列
                                endIndex = index + endColumn
                            }
                        }
                    } else {//判断起始行当前行数，大于1 则前面有回车
                        if (item === '\n') {//累计回车数量
                            num += 1
                            if (num === startLineNumber - 1) {//获取起始行最近的回车的下标+起始行的起始列
                                startIndex = index + startColumn
                            }
                            if (num === endLineNumber - 1) {//获取结束行最近的回车的下标+结束行的结束列
                                endIndex = index + endColumn
                            }
                        }
                    }
                })
            } else if (startLineNumber > endLineNumber) {//当起始行>结束行（方向：从下到上，从右到左）
                monacoEditor.getValue().split('').map((item, index) => {
                    if (endLineNumber === 1) {//判断结束行当前行数，为1 则前面没有回车
                        startIndex = endColumn - 1;//获取起始下标
                        if (item === '\n') {
                            num += 1;//累计回车数量（针对于起始行）
                            if (num === startLineNumber - 1) {//获取结束下标：起始行最近的回车的下标+起始行的起始列
                                endIndex = index + startColumn
                            }
                        }
                    } else {//判断结束行当前行数，大于1 则前面有回车
                        if (item === '\n') {//累计回车数量
                            num += 1
                            if (num === endLineNumber - 1) {//获取结束行最近的回车的下标+结束行的结束列
                                startIndex = index + endColumn
                            }
                            if (num === startLineNumber - 1) {//获取起始行最近的回车的下标+起始行的起始列
                                endIndex = index + startColumn
                            }
                        }
                    }
                })
            } else if (startLineNumber === endLineNumber) {//当起始行=结束行（方向：从左到右，从右到左）
                monacoEditor.getValue().split('').map((item, index) => {
                    if (endLineNumber === 1) {
                        startIndex = startColumn < endColumn ? startColumn - 1 : endColumn - 1
                        endIndex = startColumn > endColumn ? startColumn - 1 : endColumn - 1
                    } else {
                        if (item === '\n') {
                            num += 1
                            if (num === endLineNumber - 1) {
                                startIndex = startColumn < endColumn ? startColumn + index : endColumn + index
                                endIndex = startColumn > endColumn ? startColumn + index : endColumn + index
                            }
                        }
                    }
                })
            }
            currentText = monacoEditor.getValue().slice(startIndex, endIndex)
            return currentText
        }
    }
}