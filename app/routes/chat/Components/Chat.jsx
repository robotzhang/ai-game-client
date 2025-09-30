import { Settings2, Send, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { generate } from "../../../utils/st/api";
import Message from "./Message";
import Options from "./Options";

export default function Chat({
  character,
  messages: initialMessages = [],
  user,
}) {
  const [messages, setMessages] = useState();
  const [currentMessage, setCurrentMessage] = useState('');
  const [status, setStatus] = useState('ready');
  // 发送对话消息
  const onSendMessage = async (content) => {
    const message = content || currentMessage;
    if (!message?.trim()) return;
    setStatus('generating');
    //
    const newMessages = messages;
    newMessages.push({
      role: 'user',
      user,
      content: message.trim(),
    });
    //
    setMessages(newMessages);
    setCurrentMessage('');
    //
    try {
      const chatResponse = await generate({ character, historyMessages: newMessages, user });
      if ((chatResponse?.choices?.length || 0) > 0) {
        newMessages.push({
          role: 'assistant',
          character,
          user,
          content: chatResponse?.choices[0]?.message?.content,
        });
        setMessages(newMessages);
      }
      setStatus('ready');
    } catch (error) {
      setStatus('generate-error');
    }
  };
  //
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);
  //
  return (
    <div className="flex flex-col gap-1 h-full">
      <div className="flex-1 p-4 whitespace-break-spaces break-all break-words overflow-y-scroll text-shadow leading-7">
        
        {(messages || []).map((i) => (
          <Message
            key={i.content}
            message={i}
            user={user}
            character={character}
          />
        ))}

        {status === 'ready' && (messages?.length || 0) > 1 && (
          <div className="mt-4">
            <Options
              content={(messages[messages.length - 1])?.content || ''}
              user={user}
              character={character}
              onSelected={onSendMessage}
            />
          </div>
        )}

        {status === 'generating' && (
          <div className="flex gap-x-2 items-center p-4 bg-gray-900/30 rounded-lg text-stone-400 mt-4 max-w-3/4">
            <div>{character?.name}</div>
            <LoaderCircle className="animate-spin w-4 h-4" />
          </div>
        )}
      </div>
      
      <div className="p-2 flex gap-x-2 items-center m-2 bg-gray-900/20 rounded-lg">
        <div>
          <Settings2 className="hover:text-purple-400 cursor-pointer" />
        </div>
        <div className="flex-1 flex items-center">
          <textarea
            id="message-input"
            className="outline-0 w-full"
            rows={1}
            placeholder="输入消息，按回车发送..."
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.shiftKey) { // Shift + Enter => 换行（不拦截）
                  return;
                }
                // Enter => 发送消息
                e.preventDefault(); // 阻止 textarea 换行
                if (currentMessage.trim()) {
                  onSendMessage();
                  setCurrentMessage(''); // 清空输入框
                }
              }
            }}
          />
        </div>
        <div>
          <Send className="hover:text-purple-400 cursor-pointer" onClick={onSendMessage} />
        </div>
      </div>
    </div>
  );
}
