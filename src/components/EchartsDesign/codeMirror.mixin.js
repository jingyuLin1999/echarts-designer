import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/lib/codemirror.css"
// js 格式化插件
import { js_beautify } from 'js-beautify'
// 折叠
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
// 搜索框
import 'codemirror/addon/scroll/annotatescrollbar.js'
import 'codemirror/addon/search/matchesonscrollbar.js'
import 'codemirror/addon/search/match-highlighter.js'
import 'codemirror/addon/search/jump-to-line.js'
import 'codemirror/addon/dialog/dialog.js'
import 'codemirror/addon/dialog/dialog.css'
import 'codemirror/addon/search/searchcursor.js'
import 'codemirror/addon/search/search.js'
// 匹配结束符号
import 'codemirror/keymap/sublime' //sublime编辑器效果


export default {
    mounted() {
        this.initCodemirror();
    },
    methods: {
        async initCodemirror({ el = 'code-textarea', code = "" } = {}) {
            await new Promise(resolve => (setTimeout(() => (resolve()), 50)));
            if (!this.editorInstance) {
                const editTextarea = document.getElementById(el);
                if (!editTextarea) return;
                this.editorInstance = CodeMirror.fromTextArea(editTextarea, {
                    value: code,
                    mode: "javascript",
                    // smartInden: true,
                    lineNumbers: true,
                    lineWrapping: true,
                    styleActiveLine: true,
                    matchBrackets: true,// 匹配结束符号，比如"]、}"
                    extraKeys: { "Ctrl-Q": function (cm) { cm.foldCode(cm.getCursor()); } },
                    foldGutter: true,
                    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
                });
            }
            this.editorInstance.setValue(code);
            this.toFormat();
        },
        toFormat() {
            let code = this.editorInstance.getValue();
            // 配置中文解释 http://subline.net/mJBpp
            const formatCode = js_beautify(code, {
                "indent_size": 4,
                "indent_char": " ",
                "indent_with_tabs": false,
                "editorconfig": false,
                "eol": "\n",
                "end_with_newline": false,
                "indent_level": 0,
                "preserve_newlines": true,
                "max_preserve_newlines": 10,
                "space_in_paren": false,
                "space_in_empty_paren": false,
                "jslint_happy": false,
                "space_after_anon_function": false,
                "space_after_named_function": false,
                "brace_style": "collapse",
                "unindent_chained_methods": false,
                "break_chained_methods": false,
                "keep_array_indentation": false,
                "unescape_strings": false,
                "wrap_line_length": 0,
                "e4x": false,
                "comma_first": false,
                "operator_position": "before-newline",
                "indent_empty_lines": false,
                "templating": ["auto"]
            })
            this.editorInstance.setValue(formatCode);
        },
        refreshCode() {
            let { end } = getLocationsInViewport(this.editorInstance);
            let { line, ch } = this.editorInstance.getCursor();
            let curBottomDisLine = end.line - line;
            this.onRunCode();
            this.editorInstance.setCursor({ line: line + curBottomDisLine, ch });
            this.editorInstance.setCursor({ line, ch });
            this.editorInstance.focus();
        },
        onRunCode(setData = true) {
            let filter = this.echarts.filter;
            let responseData = this.hooks.responseData[this.clickedChart.id];
            let globalData = this.hooks.responseData.globalData;
            let attribute = this.echarts.attribute;
            let $echart = this.hooks.$echart;
            let codeStr = this.editorInstance.getValue();
            let runResult = eval(codeStr);
            if (setData) this.$set(this.clickedChart, "data", runResult);
            this.toFormat();
        }
    },
    data() {
        return {
            editorInstance: null,
        }
    }
}

// 获取当前窗口的行数和列数
function getLocationsInViewport(editor) {
    const charWidth = editor.defaultCharWidth();
    const scrollArea = editor.getScrollInfo();
    const { scrollLeft } = editor.doc;
    const rect = editor.getWrapperElement().getBoundingClientRect();

    const topVisibleLine = editor.lineAtHeight(rect.top, "window");
    const bottomVisibleLine = editor.lineAtHeight(
        rect.bottom,
        "window"
    );

    const leftColumn = Math.floor(scrollLeft > 0 ? scrollLeft / charWidth : 0);
    const rightPosition = scrollLeft + (scrollArea.clientWidth - 30);
    const rightColumn = Math.floor(rightPosition / charWidth);
    return {
        start: {
            line: topVisibleLine,
            column: leftColumn
        },
        end: {
            line: bottomVisibleLine,
            column: rightColumn
        }
    };
}