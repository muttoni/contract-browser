"use client"
import React, { useEffect } from 'react';
import Editor,  { useMonaco } from "@monaco-editor/react";
import configureCadence from "./cadence"
import { useTheme } from "next-themes"

function setEditorReadOnly(readOnly) {
  return (editor, monaco)=>{
    editor.updateOptions({ readOnly: readOnly })
    editor.updateOptions({ scrollBeyondLastLine: false });
  }
}

export default function CodeEditor({prefix="", type="", index=0, code = "", onChange = null, name = "RAWR", lang="cadence" }) {
  const monaco  = useMonaco();
  const { theme } = useTheme();

  
  useEffect(() => {
    if (!monaco) return
    configureCadence(monaco)
    console.log("theme", theme)
    monaco.editor.defineTheme('cb', {
      base: `${theme === 'light' ? "vs" : "vs-dark"}`,
      inherit: true,
      colors: {
        "editor.background": `${theme === 'light' ? "#ffffff" : "#0c0a09"}`,
      },
      rules: []
    });
    monaco.editor.setTheme('cb');
  }, [monaco, theme]);

  return (
    <Editor
      language="cadence"
      theme="cb"
      className="max-h-screen border rounded-lg overflow-hidden"
      options={{
        fontSize: 14,
        padding: {
          top: 16,
          bottom: 16,
        },
      }}
      value={code}
      onChange={onChange}
      onMount={onChange?setEditorReadOnly(false):setEditorReadOnly(true)}
    />
  )
}