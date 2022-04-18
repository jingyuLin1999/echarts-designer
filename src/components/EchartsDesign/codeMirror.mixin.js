import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript.js";
// import "codemirror/lib/codemirror.css"
// import "codemirror/lib/codemirror.css";
import prettier from "prettier/esm/standalone";
import parserBabel from "prettier/esm/parser-babel.mjs";

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
                    mode: "javascript"
                });
            }
            this.editorInstance.setValue(code);
            this.toFormat();
        },
        toFormat() {
            let code = this.editorInstance.getValue();
            const formatCode = prettier.format(code, {
                parser: "babel",
                plugins: [parserBabel],
            });
            this.editorInstance.setValue(formatCode);
        },
        onRunCode(setData = true) {
            let filter = this.echarts.filter;
            let responseData = this.hooks.responseData[this.clickedChart.id];
            let globalData = this.hooks.responseData.globalData;
            let codeStr = this.editorInstance.getValue();
            codeStr = codeStr.replace(/return/g, "")
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