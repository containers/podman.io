import React, { useState } from 'react';

interface TerminalCardProps {
  children: string;
  label?: string;
}

function TerminalCard({ children, label = 'TERMINAL' }: TerminalCardProps): JSX.Element {
  const [copied, setCopied] = useState(false);
  const code = children.trim();
  const lines = code.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="overflow-hidden rounded-xl bg-gray-900 shadow-md dark:bg-black">
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
        <span className="text-xs font-bold tracking-wide text-purple-300">{label}</span>
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-md bg-white/10 px-3 py-1 text-xs font-semibold text-white transition duration-150 ease-linear hover:bg-white/20">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <div className="overflow-x-auto px-5 py-4">
        <pre className="w-max min-w-full !bg-transparent font-mono text-sm leading-relaxed">
          {lines.map((line, index) => {
            const trimmed = line.trimStart();
            const isCommand = trimmed.startsWith('$');
            if (line === '') {
              return <div key={index}>&nbsp;</div>;
            }
            return (
              <div key={index} className={isCommand ? 'text-white' : 'text-gray-300'}>
                {isCommand ? (
                  <>
                    <span className="text-blue-500">$</span>
                    {trimmed.slice(1)}
                  </>
                ) : (
                  line
                )}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}

export default TerminalCard;
