"use client"
import React, { useEffect } from 'react';
import Editor,  { useMonaco } from "@monaco-editor/react";
import configureCadence from "./cadence"

function setEditorReadOnly(readOnly) {
  return (editor, monaco)=>{
    editor.updateOptions({ readOnly: readOnly })
    editor.updateOptions({ scrollBeyondLastLine: false });
  }
}

export default function CodeEditor({prefix="", type="", index=0, code = "", onChange = null, name = "RAWR", lang="cadence" }) {
  const monaco  = useMonaco();

  useEffect(() => {
      if (!monaco) return
      configureCadence(monaco)

  }, [monaco]);

  return (
    <Editor
      language="cadence"
      className="max-h-screen"
      theme="vs-dark"
      value={code}
      onChange={onChange}
      onMount={onChange?setEditorReadOnly(false):setEditorReadOnly(true)}
    />
  )
}