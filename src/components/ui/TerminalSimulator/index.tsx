import React, { useState, useEffect } from 'react';

const COMMANDS = [
  {
    text: 'podman run -dt -p 8080:80/tcp docker.io/library/httpd',
    output: [
      'Trying to pull docker.io/library/httpd...',
      'Getting image source signatures',
      'Copying blob sha256:a2abf6c4d29d4... done',
      'Copying config sha256:d8b7b227e8f71... done',
      'Writing manifest to image destination',
      'Storing signatures',
      'b8474246ab7c23bc99d9b62615467448db54db687250eb556216a6cb394856f6'
    ]
  },
  {
    text: 'podman ps',
    output: [
      'CONTAINER ID  IMAGE                           COMMAND           CREATED        STATUS            PORTS                 NAMES',
      'b8474246ab7c  docker.io/library/httpd:latest  httpd-foreground  2 seconds ago  Up 2 seconds ago  0.0.0.0:8080->80/tcp  lucid_neumann'
    ]
  },
  {
    text: 'podman generate kube b8474246ab7c',
    output: [
      '# Generation of Kubernetes YAML is still under development!',
      '#',
      '# Save the output of this file and use kubectl create -f to import',
      '# it into Kubernetes.',
      '#',
      '# Created with podman-4.4.1',
      'apiVersion: v1',
      'kind: Pod',
      'metadata:',
      '  creationTimestamp: "2026-08-18T00:00:00Z"',
      '  labels:',
      '    app: lucid_neumann-pod',
      '  name: lucid_neumann-pod',
      '...'
    ]
  }
];

export default function TerminalSimulator() {
  const [cmdIndex, setCmdIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showOutput, setShowOutput] = useState(false);
  const [outputLines, setOutputLines] = useState<string[]>([]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    let outputTimer: NodeJS.Timeout;
    let lineInterval: NodeJS.Timeout;

    const currentCommand = COMMANDS[cmdIndex];
    
    if (charIndex < currentCommand.text.length) {
      timer = setTimeout(() => {
        setCharIndex(charIndex + 1);
      }, 50 + Math.random() * 50);
    } else {
      if (!showOutput) {
        outputTimer = setTimeout(() => {
          setShowOutput(true);
          let lineIdx = 0;
          lineInterval = setInterval(() => {
            if (lineIdx < currentCommand.output.length) {
              // use function update to guarantee we get the latest state
              setOutputLines(prev => {
                // to prevent duplicates from React StrictMode, we can just replace instead of append if we want,
                // but actually we should just set the whole array slice
                return currentCommand.output.slice(0, prev.length + 1);
              });
              lineIdx++;
            } else {
              clearInterval(lineInterval);
              setTimeout(() => {
                setShowOutput(false);
                setOutputLines([]);
                setCharIndex(0);
                setCmdIndex((cmdIndex + 1) % COMMANDS.length);
              }, 4000);
            }
          }, 150);
        }, 400);
      }
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(outputTimer);
      clearInterval(lineInterval);
    };
  }, [charIndex, cmdIndex, showOutput]);

  return (
    <div className="mx-auto w-full max-w-4xl overflow-hidden rounded-xl border border-gray-700 bg-[#1e1e1e] shadow-2xl mt-8 mb-16" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace' }}>
      {/* Mac-like header */}
      <div className="flex items-center gap-2 bg-[#2d2d2d] px-4 py-3">
        <div className="h-3 w-3 rounded-full bg-[#ff5f56]"></div>
        <div className="h-3 w-3 rounded-full bg-[#ffbd2e]"></div>
        <div className="h-3 w-3 rounded-full bg-[#27c93f]"></div>
        <div className="ml-2 flex-1 text-center text-xs font-semibold text-gray-400 pr-12">bash - podman</div>
      </div>
      
      {/* Terminal body */}
      <div className="p-6 text-sm sm:text-base leading-relaxed text-gray-300 min-h-[360px] overflow-x-auto whitespace-pre">
        <div className="flex items-center gap-2">
          <span className="text-[#27c93f] font-bold">➜</span>
          <span className="text-[#58a6ff] font-bold">~</span>
          <span className="text-gray-100">{COMMANDS[cmdIndex].text.substring(0, charIndex)}</span>
          {!showOutput && <span className="w-2 h-5 bg-gray-400 animate-pulse inline-block align-middle ml-1"></span>}
        </div>
        
        {showOutput && (
          <div className="mt-3 flex flex-col gap-1 text-gray-400">
            {outputLines.map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
