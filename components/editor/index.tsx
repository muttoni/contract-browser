"use client"
import React, { useEffect } from 'react';
import Editor, { useMonaco } from "@monaco-editor/react";
import configureCadence from "./cadence"
import { useTheme } from "next-themes"
import { cn } from '@/lib/utils';
//import {CadenceDocgen} from "@onflow/cadence-docgen"


function setEditorReadOnly(readOnly) {
  return (editor, monaco)=>{
    editor.updateOptions({ readOnly: readOnly })
    editor.updateOptions({ scrollBeyondLastLine: false });
  }
}

export default function CadenceEditor({prefix="", type="", index=0, code = "", onChange = null, name = "RAWR", lang="cadence", className="" }) {
  const monaco  = useMonaco();
  const { theme } = useTheme();

  async function loadDocgen () {
    // const docgen = await CadenceDocgen.create("cadence-docgen.wasm")
    // const docs = docgen.generate(`
    //   /// This is a simple function with a doc-comment.
    //   pub fun hello() {
    //   }
    // `)
    // console.log("DOCS", docs);
  }

  useEffect(() => {
    if (!monaco) return
    configureCadence(monaco)
    console.log("theme", theme)
    monaco.editor.defineTheme('cb', {
      base: `${theme === 'light' ? "vs" : "vs-dark"}`,
      inherit: true,
      colors: {
        "editor.background": `${theme === 'light' ? "#ffffff" : "#020815"}`,
      },
      rules: []
    });
    monaco.editor.setTheme('cb');
    //loadDocgen()
  }, [monaco, theme]);

  return (
    <Editor
      language="cadence"
      theme="cb"
      className={cn("max-h-screen border rounded-lg overflow-hidden ", className)}
      options={{ 
        fontSize: 14,
        padding: {
          top: 16,
          bottom: 16,
        },
      }}
      value={code}
      onChange={onChange}
      onMount={onChange ? setEditorReadOnly(false) : setEditorReadOnly(true)}
    />
  )
}