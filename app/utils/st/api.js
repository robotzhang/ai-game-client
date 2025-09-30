import axios from "axios";
import { buildGenerateParams } from "./chat";

const ST_API_ENDPOINT = 'http://127.0.0.1:8000';

// 获取世界书
export async function fetchWorldBook({ name }) {
  if (!name) return null;
  //
  const response = await axios.post(`${ST_API_ENDPOINT}/api/worldinfo/get`, {
    name: `${name}世界书`,
  });
  return response.data;
}

//
export async function fetchAllCharacters() {
  const response = await axios.post(`http://127.0.0.1:8000/api/characters/all`);
  return response.data;
}

// 获取角色信息
export async function fetchCharacter({ avatarUrl }) {
  if (!avatarUrl) return null;
  //
  const response = await axios.post(`${ST_API_ENDPOINT}/api/characters/get`, {
    avatar_url: avatarUrl
  });
  return response.data;
}

// 生成对话
export async function generate({ character, historyMessages, user }) {
  const params = buildGenerateParams({ character, historyMessages, user });
  const response = await axios.post(`${ST_API_ENDPOINT}/api/backends/chat-completions/generate`, params);
  return response.data;
}