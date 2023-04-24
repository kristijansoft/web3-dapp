import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { ReactComponent as WarningHexagonSvg } from "src/assets/img/icons/warning-hexagon.svg";
import { Toast } from "src/components/Toast";
import {
  ConfirmModal,
  ConnectModal,
  DisconnectModal,
  JoinModal,
  SkipModal,
  ThanksModal,
} from "src/components/modals";
import { SkipQuestionModal } from "src/components/modals/SkipQuestionModal";
import { ModalType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";
import { useToast } from "src/contexts/ToastContext";
import { useWallet } from "src/contexts/WalletContext";
import { useProgress } from "src/hooks/useProgress";
import { Footer } from "src/layout/Footer";
import { useMediaQuery } from "src/utils/useMediaQuery";
import { Introduction } from "./sections/Introduction";
import { Loading } from "./sections/Loading";
import { Questioning } from "./sections/Questioning";
import { Result } from "./sections/Result";

export function Home() {
  const { walletAddress, setWalletAddress, disconnect } = useWallet();
  const { modalType, closeModal } = useModal();
  const { showingToast, showToast } = useToast();
  const isMobile = !useMediaQuery("(min-width: 1024px)");

  const {
    progress: scanningProgress,
    start: startScanning,
    reset: resetScanning,
    isCompleted: scanningCompleted,
  } = useProgress();

  const {
    progress: analyzingProgress,
    start: startAnalyzing,
    stop: stopAnalyzing,
    reset: resetAnalyzing,
    started: analyzingStarted,
    isCompleted: analyzingCompleted,
  } = useProgress();

  const [answers, setAnswers] = useState([]);
  const [riskScore, setRiskScore] = useState(-1);
  const [skip, setSkip] = useState(false);
  const [skipQuestion, setSkipQuestion] = useState(false);
  const [error, setError] = useState("");

  const answersRef = useRef(answers);
  answersRef.current = answers;

  const handleFinishQuestioning = () => {
    startAnalyzing();
    axios
      .post(`${process.env.REACT_APP_API_ENDPOINT}/questionnare/risk-score`, {
        answers: answersRef.current,
      })
      .then((response) => {
        setRiskScore(response.data.risk_score);
      })
      .catch((e) => {
        setError(e.message);
        stopAnalyzing();
      });
  };

  const reset = () => {
    closeModal();
    setError("");
    setSkip(false);
    setSkipQuestion(false);
    resetScanning();
    resetAnalyzing();
    setAnswers([]);
    setRiskScore(-1);
  };

  const handleDisconnect = () => {
    if (walletAddress) showToast();
    disconnect();
    reset();
  };

  const handelWalletSubmit = (newWallet) => {
    setWalletAddress(newWallet);
    closeModal();
  };

  const handleSkip = () => {
    setSkip(true);
    closeModal();
  };

  const handleSkipQuestion = () => {
    setSkipQuestion(true);
    setRiskScore(5);
    closeModal();
  };

  const handleGoToDemo = () => {
    disconnect();
    reset();
    setSkip(true);
    setSkipQuestion(true);
    setRiskScore(5);
  };

  useEffect(() => {
    if (!walletAddress) return;
    closeModal();
    startScanning();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletAddress]);

  return (
    <>
      <div
        className={`flex flex-col h-full ${
          modalType === ModalType.SkipModal ||
          modalType === ModalType.SkipQuestionModal ||
          modalType === ModalType.RestartModal ||
          modalType === ModalType.ThanksModal
            ? "blur-md"
            : ""
        }`}
      >
        {!walletAddress && !skip && <Introduction />}
        {walletAddress && !scanningCompleted && (
          <Loading
            progress={scanningProgress}
            title="Preparing for analysis..."
            description={`Hold on... our systems need a moment to${
              isMobile ? " " : "<br>"
            }scan your blockchain history`}
          />
        )}
        {((walletAddress && scanningCompleted) || skip) &&
          !analyzingStarted &&
          !skipQuestion && (
            <Questioning
              answers={answers}
              setAnswers={setAnswers}
              onFinish={handleFinishQuestioning}
            />
          )}
        {((walletAddress && scanningCompleted) || skip) &&
          analyzingStarted &&
          (!analyzingCompleted || riskScore === -1) && (
            <Loading
              progress={analyzingProgress}
              title="Analyzing your data..."
              description={`Our systems are identifying your risk profile based on${
                isMobile ? " " : "<br>"
              }your answers.`}
              error={error}
              goToDemo={handleGoToDemo}
            />
          )}
        {((walletAddress && scanningCompleted) || skip) &&
          (analyzingCompleted || skipQuestion) &&
          riskScore > -1 && (
            <Result
              skipQuestion={skipQuestion}
              riskScore={riskScore}
              setRiskScore={setRiskScore}
              goToDemo={handleGoToDemo}
              disconnect={handleDisconnect}
            />
          )}
        <div className="mt-auto pt-[72px]">
          {showingToast && (
            <Toast
              title="Wallet has been disconnected"
              description="Reconnect your wallet to start again"
              IconSvg={WarningHexagonSvg}
              className="mt-[-24px] mb-[20px] lg:mb-0"
            />
          )}
          <Footer />
        </div>
      </div>
      {modalType === ModalType.ConnectModal && <ConnectModal />}
      {modalType === ModalType.DisconnectModal && (
        <DisconnectModal handleDisconnect={handleDisconnect} />
      )}
      {modalType === ModalType.JoinModal && <JoinModal />}
      {modalType === ModalType.ThanksModal && <ThanksModal />}
      {modalType === ModalType.SkipModal && (
        <SkipModal
          handleSkip={handleSkip}
          handelWalletSubmit={handelWalletSubmit}
        />
      )}
      {modalType === ModalType.SkipQuestionModal && (
        <SkipQuestionModal handleSkip={handleSkipQuestion} />
      )}
      {modalType === ModalType.RestartModal && (
        <ConfirmModal
          title="Start again?"
          description="Are you sure you want to reset your progress and create a new portfolio again?"
          cancelButtonLabel="Back"
          confirmButtonLabel="Start Again"
          onConfirm={handleDisconnect}
        />
      )}
    </>
  );
}
