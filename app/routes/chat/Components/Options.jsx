export default function Options({
  content,
  character,
  user,
  onSelected,
}) {
  // 提取 options 内容
  const optionRegex = /<option[^>]*>([\s\S]*?)<\/option>/gi;
  const optionContents = [];
  let match;
  while ((match = optionRegex.exec(content)) !== null) {
    optionContents.push(match[1].trim()); // 只取捕获组里的内容
  }
  //
  let options = [];
  optionContents.forEach((i) => {
    options = options.concat(i.split(/\r\n|\r|\n/));
  });
  // 格式化
  options = options.map((i) => {
    let paragraphs = i.trim().replaceAll('{{user}}', user?.name).replaceAll('{{char}}', character?.name);
    paragraphs = paragraphs.replace(/([「“].*?[」”])/g, (match) => {
      return `<span class="text-orange-400">${match}</span>`;
    });
    return paragraphs;
  });
  //
  if (options.length === 0) {
    return null;
  }
  //
  return (
    <div className="p-4 bg-gray-900/30 rounded-lg text-stone-400">
      <div className="mb-3">
        <div>👇 点击下列选项以继续</div>
      </div>
      <div className="flex flex-col gap-y-2">
        {options.map((i, index) => (
          <div
            key={i}
            className="flex hover:text-stone-200 gap-x-2"
            onClick={() => {
              onSelected(i);
            }}
            dangerouslySetInnerHTML={{
              __html: `<span>${index + 1}.</span><span>${i}</span>`
            }} 
          />
        ))}
      </div>
    </div>
  );
}