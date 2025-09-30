export default function Message({ message }) {
  const { role, content, user, character, isFirstMessage } = message;
  // 提取 content 内容
  const contentMatch = content.match(/<content>([\s\S]*?)<\/content>/i);
  let paragraphs = contentMatch ? contentMatch[1].trim() : content.trim();
  // 替换用户和角色名
  paragraphs = paragraphs.replaceAll('{{user}}', user?.name).replaceAll('{{char}}', character?.name);
  // 按段落分割并包裹<p>标签
  paragraphs = paragraphs
    .split(/\n\s*\n/) // 按两个换行分割，忽略多余空格
    .filter(p => p.trim() !== "") // 去掉空行
    .map(p => `<p>${p.trim()}</p>`) // 包裹段落
    .join("");
  // 高亮对话内容  
  paragraphs = paragraphs.replace(/([「“].*?[」”])/g, (match) => {
    return `<span class="text-orange-400">${match}</span>`;
  });
  //
  if (role === 'user') {
    return (
      <div className="flex flex-col items-end max-w-3/4 ml-auto">
        <div className="text-sm text-stone-400 mb-2">
          {user?.name}
        </div>
        <div
          className="p-2 flex flex-col gap-4 rounded-lg bg-gray-900/20"
          dangerouslySetInnerHTML={{
            __html: paragraphs
          }}
        />
      </div>
    );
  }

  if (role === 'assistant') {
    return (
      <div className="flex justify-start">
        <div className="flex-1">
          {isFirstMessage !== true && character?.name && (
            <div className="text-sm text-stone-400 mb-2">{character?.name}</div>
          )}
          <div
            className="flex flex-col gap-4"
            dangerouslySetInnerHTML={{
              __html: paragraphs
            }}
          />
        </div>
      </div>
    );
  }
  //
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: paragraphs
      }}
    />
  );
}