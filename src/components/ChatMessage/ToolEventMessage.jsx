import React from "react";

const ToolEventMessage = ({ event }) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-xs text-gray-300 my-2">
      <div className="font-bold text-yellow-400 mb-1">
        🔧 Tool Event: {event.type}
      </div>

      <pre className="whitespace-pre-wrap text-gray-200">
        {JSON.stringify(event.data, null, 2)}
      </pre>
    </div>
  );
};

export default ToolEventMessage;
