import React from "react";
import CodeBlock from "./CodeBlock";

const ChatMessage = ({ message }) => {
    if (!message || message.content == null) return null;

    const content = String(message.content ?? "");
    const isUser = message.role === "user";

    const renderContent = () => {
        if (content.includes("```")) {
            const parts = content.split("```");

            return (
                <div className="flex flex-col gap-2">
                    {parts.map((part, i) =>
                        i % 2 === 1 ? (
                            <CodeBlock key={i} language="python" code={part.trim()} />
                        ) : (
                            <p key={i} className="whitespace-pre-wrap">
                                {part}
                            </p>
                        )
                    )}
                </div>
            );
        }

        return <p className="whitespace-pre-wrap">{content}</p>;
    };

    return (
        <div className={`w-full flex ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[80%] rounded-lg px-4 py-2 text-sm ${
                    isUser ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-100"
                }`}
            >
                {renderContent()}
            </div>
        </div>
    );
};

export default ChatMessage;
