import { Link } from "react-router";
import type { Route } from "./+types/home";

interface Character {
  avatar: string;
  name: string;
  description: string;
  // 其他字段可以根据返回的 JSON 扩展
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function Home() {
  //
  return (
    <div className="p-4">
      <Link to="/characters">所有角色</Link>
    </div>
  );
}
