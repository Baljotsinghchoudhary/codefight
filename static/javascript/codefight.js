var cpp, java, c, python, go, javascript, editor,cpp_undo,java_undo,c_undo,go_undo,javascript_undo,python_undo;
window.onload = function () {
    
    //setting editor
    editor = ace.edit("editor",{
        theme:"ace/theme/nord_dark",

    });
    editor.renderer.setScrollMargin(10, 10, 0, 0);
    editor.setBehavioursEnabled(true);
    editor.setOptions({
        enableSnippets: true,
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true,

    });
    
    //setting session

    EditSession = ace.require("ace/edit_session").EditSession;
    cpp = new EditSession("#include <iostream>\nusing namespace std;\nint main() {\n\n}", "ace/mode/c_cpp");
    java = new EditSession("/* IMPORTANT: Multiple classes and nested static classes are supported */\n/*\n* uncomment this if you want to read input.\n//imports for BufferedReader\nimport java.io.BufferedReader;\nimport java.io.InputStreamReader;\n//import for Scanner and other utility classes\nimport java.util.*;\n*/\n// Warning: Printing unwanted or ill-formatted data to output will cause the test cases to fail\nclass TestClass {\npublic static void main(String args[] ) throws Exception {\n/* Sample code to perform I/O:\n* Use either of these methods for input\n//BufferedReader\nBufferedReader br = new BufferedReader(new InputStreamReader(System.in));\nString name = br.readLine();                // Reading input from STDIN\nSystem.out.println(name);    // Writing output to STDOUT\n//Scanner\nScanner s = new Scanner(System.in);\nString name = s.nextLine();                 // Reading input from STDIN\nSystem.out.println(name);    // Writing output to STDOUT\n*/\n// Write your code here\n}\n}", "ace/mode/java");
    c = new EditSession("#include <stdio.h>\nint main(){\n\n}", "ace/mode/c_cpp");
    python = new EditSession("# Write your code here", "ace/mode/python");
    go = new EditSession("# Write your code here", "ace/mode/golang");
    javascript = new EditSession("// Write your code here", "ace/mode/javascript");

    //setting undo manager
    UndoManager = ace.require("ace/undomanager").UndoManager;
    cpp_undo=new UndoManager();
    cpp.setUndoManager(cpp_undo)
    c_undo=new UndoManager();
    c.setUndoManager(c_undo)
    python_undo=new UndoManager();
    python.setUndoManager(python_undo)
    java_undo=new UndoManager();
    java.setUndoManager(java_undo)
    go_undo=new UndoManager();
    go.setUndoManager(go_undo);
    javscript_undo=new UndoManager();
    javascript.setUndoManager(javascript_undo)


    editor.setSession(c);
}

function setmode(val) {

    if (val == "CPP11") {
        editor.setSession(cpp);
    }
    else if (val == "PYTHON3") {

        editor.setSession(python);
    }
    else if (val == "JAVA") {

        editor.setSession(java);
    }
    else if (val == "GO") {

        editor.setSession(go);
    }
    else if (val == "C") {

        editor.setSession(c);
    }
    else if (val == "JAVASCRIPT") {

        editor.setSession(javascript);
    }

}
