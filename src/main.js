import { init } from "../node_modules/z3-solver/build/wrapper";
import initZ3 from "../node_modules/z3-solver/build/z3-built";

(async () => {
  var editor;
  var verification_start;

  var console = window.console;
  var document = window.document;
  var command_line_args = document.getElementById("command-line-args");
  var run_button = document.getElementById("run");
  var stdout_textbox = document.getElementById("stdout");

  function clear(node) {
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
  }

  async function verifyCurrentInput(_event) {
    var input = editor.getValue();
    clear(stdout_textbox);
    disableButton("Running…");
    verification_start = window.performance.now();
    const cfg = Z3.mk_config();
    const ctx = Z3.mk_context(cfg);
    Z3.del_config(cfg);
    var output = "";
    for (const item of input.split("\n")) {
      output = output.concat(await Z3.eval_smtlib2_string(ctx, item));
    }
    enableButton();
    var elapsed = Math.round(window.performance.now() - verification_start);
    logOutput(output, "stdout-msg");
    logOutput("-- Verification complete (" + elapsed + "ms)", "info-msg");
    Z3.del_context(ctx);
  }

  function disableButton(message) {
    run_button.disabled = true;
    run_button.value = message;
  }

  function enableButton() {
    run_button.disabled = false;
    run_button.value = "Run Z3!";
  }

  function logOutput(message, cssClass) {
    var span_node = window.document.createElement("span");
    span_node.className = cssClass;
    span_node.appendChild(window.document.createTextNode(message + "\n"));
    stdout_textbox.appendChild(span_node);
  }

  function setupAceEditor() {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/lisp");
    editor.setOptions({
      fontFamily: "Ubuntu Mono, monospace",
      fontSize: "1rem",
    });
    editor.session.setValue(`(declare-fun x () Int)
(declare-fun y () Int)
(declare-fun z () Int)
(assert (>= (* 2 x) (+ y z)))
(declare-fun f (Int) Int)
(declare-fun g (Int Int) Int)
(assert (< (f x) (g x x)))
(assert (> (f y) (g x x)))
(check-sat)
(get-model)
(push)
(assert (= x y))
(check-sat)
(get-model)
(check-sat)
(pop)
(declare-fun a () Bool)
(simplify (or a true))
(exit)`);
  }

  setupAceEditor();
  clear(stdout_textbox);

  const mod = async () =>
    await initZ3({
      locateFile: (f) => f,
      mainScriptUrlOrBlob: "z3-built.js",
    });
  const { em, Z3 } = await init(mod);
  enableButton();
  run_button.onclick = verifyCurrentInput;
})();
