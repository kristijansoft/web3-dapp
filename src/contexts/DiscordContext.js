import axios from "axios";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

const DiscordContext = createContext();
DiscordContext.displayName = "Discord Context";

function DiscordProvider({ children }) {
  const [discordUser, setDiscordUser] = useState(null);
  const tokenRef = useRef(null);

  const getUserDetails = useCallback(async (accessToken, tokenType) => {
    try {
      let [response1, response2] = await Promise.all([
        axios.get("https://discord.com/api/users/@me", {
          headers: {
            authorization: `${tokenType} ${accessToken}`,
          },
        }),
        axios.get("https://discord.com/api/users/@me/guilds", {
          headers: {
            authorization: `${tokenType} ${accessToken}`,
          },
        }),
      ]);
      const {
        id,
        username,
        discriminator,
        avatar: avatarHash,
        email,
      } = response1.data;
      const guilds = response2.data;

      setDiscordUser({
        id,
        username: username + "#" + discriminator,
        email,
        imageUrl: `https://cdn.discordapp.com/avatars/${id}/${avatarHash}.png`,
        joined: Boolean(
          guilds.find(
            (guild) => guild.id === process.env.REACT_APP_1CC_GUILD_ID
          )
        ),
      });
    } catch {
      console.log("error getting user");
    }
  }, []);

  const retryDiscord = useCallback(() => {
    const { tokenType, accessToken } = tokenRef.current;

    axios
      .get("https://discord.com/api/users/@me/guilds", {
        headers: {
          authorization: `${tokenType} ${accessToken}`,
        },
      })
      .then((response) => {
        const guilds = response.data;
        setDiscordUser((user) => ({
          ...user,
          joined: Boolean(
            guilds.find(
              (guild) => guild.id === process.env.REACT_APP_1CC_GUILD_ID
            )
          ),
        }));
      });
  }, []);

  const connectDiscord = useCallback(() => {
    const popup = window.open(
      process.env.REACT_APP_DISCORD_AUTH_LINK,
      "Discord OAuth2",
      "popup"
    );

    const interval = setInterval(() => {
      popup.postMessage("", process.env.REACT_APP_ORIGIN); // Replace * with your origin
    }, 500);

    window.addEventListener(
      "message",
      (event) => {
        if (event.data.accessToken) {
          clearInterval(interval);
          popup.close();

          tokenRef.current = {
            accessToken: event.data.accessToken,
            tokenType: event.data.tokenType,
          };
          getUserDetails(event.data.accessToken, event.data.tokenType);
        }
      },
      false
    );
  }, [getUserDetails]);

  const value = useMemo(
    () => ({
      discordUser,
      retryDiscord,
      connectDiscord,
    }),
    [discordUser, connectDiscord, retryDiscord]
  );

  return (
    <DiscordContext.Provider value={value}>{children}</DiscordContext.Provider>
  );
}

const useDiscord = () => {
  const value = useContext(DiscordContext);
  if (!value)
    throw new Error("useDiscord hook must be used within DiscordProvider");
  return value;
};

export { useDiscord, DiscordProvider };

