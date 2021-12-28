import CodeMirror from "codemirror";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/lib/codemirror.css";
import prettier from "prettier/esm/standalone";
import parserBabel from "prettier/esm/parser-babel.mjs";

export default {
    mounted() {
        this.initCodemirror();
    },
    methods: {
        async initCodemirror() {
            await new Promise(resolve => (setTimeout(() => (resolve()), 50)));
            if (!this.editorInstance) {
                const editTextarea = document.getElementById("code-textarea");
                if (!editTextarea) return;
                this.editorInstance = CodeMirror.fromTextArea(editTextarea, {
                    value: this.code,
                    mode: "javascript"
                });
            }
            this.editorInstance.setValue(this.code);
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
        onRunCode() {
            let responseData = this.hooks.responseData[this.clickedChart.id];
            let codeStr = this.editorInstance.getValue();
            codeStr = codeStr.replace(/return/g, "")
            let runResult = eval(codeStr);
            this.clickedChart.data = runResult;
            this.toFormat();
        }
    },
    data() {
        return {
            editorInstance: null,
            code: '',
        }
    }
}