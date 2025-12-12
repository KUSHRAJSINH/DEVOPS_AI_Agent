import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Check, Copy } from 'lucide-react';

const CodeBlock = ({ language = "text", code = "" }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="rounded-md overflow-hidden my-4 border border-gray-700 bg-[#1e1e1e]">
            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] text-xs text-gray-400">
                <span className="lowercase">{language}</span>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                >
                    {copied ? <Check size={14} /> : <Copy size={14} />}
                    <span>{copied ? 'Copied!' : 'Copy code'}</span>
                </button>
            </div>

            <SyntaxHighlighter
                language={language}
                style={oneDark}
                customStyle={{ margin: 0, borderRadius: 0, padding: '1rem' }}
                showLineNumbers
            >
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

export default CodeBlock;
