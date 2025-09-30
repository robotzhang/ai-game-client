import { ofetch } from "ofetch";
import { buildGenerateParams } from "./chat";

const ST_API_ENDPOINT = 'http://127.0.0.1:8000';

// 获取世界书
export async function fetchWorldBook({ name }) {
  if (!name) return null;
  //
  const response = await ofetch(`${ST_API_ENDPOINT}/api/worldinfo/get`, {
    method: 'POST',
    body: {
      name: `${name}世界书`,
    },
  });
  return response.data;
}

//
export async function fetchAllCharacters() {
  const response = await ofetch(`${ST_API_ENDPOINT}/api/characters/all`, {
    method: 'POST'
  });
  return response.data;
}

// 获取角色信息
export async function fetchCharacter({ avatarUrl }) {
  if (!avatarUrl) return null;
  //
  const response = await ofetch(`${ST_API_ENDPOINT}/api/characters/get`, {
    method: 'POST',
    body: {
      avatar_url: avatarUrl,
    },
  });
  return response.data;
}

// 生成对话
export async function generate({ character, historyMessages, user }) {
  const params = buildGenerateParams({ character, historyMessages, user });
  const response = await ofetch(`${ST_API_ENDPOINT}/api/backends/chat-completions/generate`, {
    method: 'POST',
    body: params,
  });
  return response.data;
}