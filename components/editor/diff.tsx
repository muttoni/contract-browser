"use client"
import React, { useEffect } from 'react';
import { DiffEditor, useMonaco } from "@monaco-editor/react";
import configureCadence from "./cadence"
import { useTheme } from "next-themes"
import { cn } from '@/lib/utils';

function setEditorReadOnly(readOnly) {
  return (editor, monaco)=>{
    editor.updateOptions({ readOnly: readOnly })
    editor.updateOptions({ scrollBeyondLastLine: false });
  }
}

export default function DiffViewer({prefix="", type="", index=0, original = "", modified= "", onChange = null, lang="cadence", className="" }) {
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
        "editor.background": `${theme === 'light' ? "#ffffff" : "#020815"}`,
      },
      rules: []
    });
    monaco.editor.setTheme('cb');
  }, [monaco, theme]);

  return (
    <DiffEditor
      theme="cb"
      language="cadence"
      original={original}
      modified={modified}
      className={cn("max-h-screen border rounded-lg overflow-hidden ", className)}
      options={{ 
        fontSize: 14,
        padding: {
          top: 16,
          bottom: 16,
        },
      }}
      onMount={onChange?setEditorReadOnly(false):setEditorReadOnly(true)}
    />
  )
}