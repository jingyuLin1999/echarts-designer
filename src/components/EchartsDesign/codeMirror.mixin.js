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
            if (this.editorInstance) { this.toFormate(); return; }
            if (!this.editorInstance) await new Promise(resolve => (setTimeout(() => (resolve()), 200)))
            const editTextarea = document.getElementById("code-textarea");
            this.editorInstance = CodeMirror.fromTextArea(editTextarea, {
                value: this.code,
                mode: "javascript"
            });
            this.toFormate();
        },
        toFormate() {
            let code = this.editorInstance.getValue() || this.code;
            const formatCode = prettier.format(code, {
                parser: "babel",
                plugins: [parserBabel],
            });
            this.editorInstance.setValue(formatCode);
        },
        onRunCode() {
            let { responseData } = this.clickedChart;
            let codeStr = this.editorInstance.getValue();
            codeStr = codeStr.replace(/return/g, "")
            let runResult = eval(codeStr);
            this.clickedChart.data = runResult;
            // this.toFormate();
        }
    },
    data() {
        return {
            editorInstance: null,
            code: '',
        }
    }
}