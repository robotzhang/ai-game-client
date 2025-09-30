import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("characters", "routes/characters/list.jsx"),
  route("characters/:characterId", "routes/characters/show.jsx"),
  route("chat/characters/:characterId", "routes/chat/show.jsx"),
  route("about", "routes/about/index.jsx"),
] satisfies RouteConfig;
