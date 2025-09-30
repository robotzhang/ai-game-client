export default function buildChatParams({
  character,
}) {
  return {
    char_name: "苏婉清",
    chat_completion_source: "makersuite",
    custom_prompt_post_processing: "",
    enable_web_search: false,
    frequency_penalty: 0,
    group_names: [],
    include_reasoning: false,
    max_tokens: 60000,
    messages: [
      {role: "system", content: ""},
      {role: "assistant", content: "我已明白我的首要职责与任务是在Q内以Sudachi，该VF的身份来为用户创造符合世界观和剧情文本"}
    ],
    model: "gemini-2.0-flash",
    presence_penalty: 0,
    reasoning_effort: "high",
    request_images: false,
    stop: [],
    stream: false,
    temperature: 1.05,
    top_k: 10,
    top_p: 0.95,
    use_makersuite_sysprompt: false,
    user_name: "张星魂"
  };
}