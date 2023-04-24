import axios from "axios";
import { useState } from "react";
import { ModalType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";

export function useJoinWaitlist() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { showModal } = useModal();

  const joinWaitlist = ({
    email,
    discordUsername,
    discordId,
    discordEmail,
    walletAddress,
  }) => {
    setIsLoading(true);
    setError("");
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/waitlist/join`, {
        email,
        discord_username: discordUsername,
        discord_id: discordId,
        discord_email: discordEmail,
        wallet_address: walletAddress,
      })
      .then((response) => {
        setIsLoading(false);
        showModal(ModalType.ThanksModal);
      })
      .catch((error) => {
        setIsLoading(false);
        setError(`${error.response.data.message}`);
      });
  };

  return { joinWaitlist, isLoading, error };
}
