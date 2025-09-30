import { Link, useParams } from "react-router";
import { ChevronLeft, UserRound, Gift, Maximize, Minimize } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import Chat from "./Components/Chat";
import { fetchCharacter } from "../../utils/st/api";


export default function ChatPage() {
  const user = {
    name: '张星魂',
  }
  //
  const { characterId } = useParams();
  const bg = "/game/bedroom-clean.jpg";
  const characterAvatarUrl = `${characterId}.png`;
  //
  const [character, setCharacter] = useState();
  const [chatScreenMode, setChatScreenMode] = useState('default');
  // 获取角色卡信息
  useEffect(() => {
    const fetchData = async () => {
      const characterData = await fetchCharacter({ avatarUrl: characterAvatarUrl });
      setCharacter(characterData);
    };
    fetchData();
  }, []);
  //
  const initialMessages = useMemo(() => {
    if (!character?.data) return [];
    return [{
      role: "assistant",
      isFirstMessage: true,
      character,
      user,
      content: character.data.first_mes
    }];
  }, [character]);
  //
  return (
    <div className="h-screen w-screen relative bg-cover" style={{ backgroundImage: `url(${bg})` }}>
      <div className="px-6 h-12 text-gray-200 rounded-lg bg-gradient-to-b from-gray-900/40  flex justify-between items-center">
        <div className="flex items-center gap-x-2 h-full">
          <Link to="/characters">
            <ChevronLeft className="cursor-pointer hover:text-purple-400" />
          </Link>
          <img src="/game/avatar.png" alt="avatar" className="h-7 w-7 rounded-full object-cover" />
          <div>{character?.data?.name}</div>
        </div>
        <div className="flex items-center gap-x-3">
          <div className="flex gap-x-1 items-center">
            <Gift />
            {/* <div>首充大礼包</div> */}
          </div>
          <UserRound />
        </div>
      </div>

      <div className="fixed z-10 top-20 bottom-0 w-screen">
        <div className="flex items-end w-full h-full justify-center">
          <img src="/game/role.png" alt="role" className="h-full animate-up-and-down" />
        </div>
      </div>

      {/* <div className="fixed top-16 left-6 bg-gray-900/20 text-white rounded-lg sm:min-w-sm">
        <div className="p-3">状态栏</div>
      </div> */}
      
      <div className={`fixed z-10 bottom-4 left-4 right-4 ${chatScreenMode === 'full' ? 'h-10/12' : 'h-1/3'}`}>
        <div className="max-w-5xl m-auto relative h-full">
          <div className="flex gap-x-4 justify-end absolute right-0 -top-8">
            <div
              onClick={() => {
                setChatScreenMode(chatScreenMode === 'full' ? 'normal' : 'full');
              }}
              className="w-6 h-6 flex items-center justify-center bg-gray-900/40 text-stone-200 rounded-lg hover:bg-pink-400/50 cursor-pointer"
            >
              {chatScreenMode === 'full' ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <Maximize className="w-4 h-4" />
              )}
            </div>
          </div>

          <div className="bg-gray-900/40 text-stone-200 rounded-lg h-full">
            {character?.data && (
              <Chat
                character={character}
                user={user}
                messages={initialMessages}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
