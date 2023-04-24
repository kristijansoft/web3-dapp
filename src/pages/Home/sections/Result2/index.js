import { useEffect, useMemo, useRef } from "react";
import PoolLinesSvg1 from "src/assets/img/icons/pool-lines-1.svg";
import PoolLinesSvg2 from "src/assets/img/icons/pool-lines-2.svg";
import PoolLinesSvg3 from "src/assets/img/icons/pool-lines-3.svg";
import PoolLinesSvg4 from "src/assets/img/icons/pool-lines-4.svg";
import PoolLinesSvg5 from "src/assets/img/icons/pool-lines-5.svg";
import { ReactComponent as TwitterSvg } from "src/assets/img/icons/twitter-button.svg";
import { Rate } from "src/components/Rate";
import { Button } from "src/components/lib";
import { ModalType } from "src/constants/enums";
import { useModal } from "src/contexts/ModalContext";
import { useTwitterShare } from "src/hooks/useTwitterShare";
import { ChainLogo } from "./components/ChainLogo";
import { DeFiChart } from "./components/DeFiChart";
import { PoolBox } from "./components/PoolBox";
import { RiskLevel } from "./components/RiskLevel";
import { ClipLoader } from "react-spinners";
import { HowItWorks } from "./components/HowItWorks";

const poolRiskMap = { A: 1, B: 2, C: 3, D: 4, F: 5 };

export function Result2({ analysis, goBack, className }) {
  const { showModal } = useModal();
  const { isLoading: isSharing, twitterShare } = useTwitterShare();

  useEffect(() => {
    const timeout = setTimeout(() => {
      showModal(ModalType.JoinModal);
    }, 30000);
    return () => {
      clearTimeout(timeout);
    };
  }, [showModal]);

  const cellWidth = [14.5, 13.5, 33.9, 10.9, 8.6];

  const screenCaptureRef = useRef();
  const claimRef = useRef();

  const portfolioData = useMemo(() => {
    const result = [];
    analysis.portfolio.forEach((item) => {
      let obj = result.find(
        (e) => e.name === item.protocol_name && e.chain === item.chain_name
      );
      if (!obj) {
        obj = {
          name: item.protocol_name,
          chain: item.chain_name,
          imageId: item.protocol_image_id,
          color: item.protocol_color,
          twitterUsername: item.protocol_twitter_username,
          pools: [],
        };
        result.push(obj);
      }
      obj.pools.push({
        name: item.pool_name.split(" ").slice(1).join(" "),
        yield: item.pool_yield,
        risk: poolRiskMap[item.pool_risk],
        weight: Number(item.portfolio_weight.split("%")[0]),
      });
    });
    return result
      .map((item) => ({
        ...item,
        share: item.pools.reduce((s, e) => s + e.weight, 0),
      }))
      .sort((a, b) => b.share - a.share);
  }, [analysis.portfolio]);

  const chartData = useMemo(() => {
    return {
      labels: portfolioData.map((item) => item.chain),
      images: portfolioData.map((item) => {
        const image = new Image();
        image.src = `/images/protocols/Logo-${item.imageId}.png`;
        return image;
      }),
      logoImage: (function () {
        const image = new Image();
        image.src = `/logo192.png`;
        return image;
      })(),
      datasets: [
        {
          label: "# of Interactions",
          data: portfolioData.map((item) => item.share),
          backgroundColor: portfolioData.map((item) => item.color),
          borderColor: portfolioData.map((item) =>
            item.color === "#FFFFFF" ? "#BBBFC3" : "#FFFFFF"
          ),
        },
      ],
    };
  }, [portfolioData]);

  const topProtocols = useMemo(() => {
    const protocols = [];
    portfolioData.forEach((item) => {
      let obj = protocols.find((e) => e.name === item.name);
      if (!obj) {
        obj = {
          name: item.name,
          twitterUsername: item.twitterUsername,
          share: 0,
        };
        protocols.push(obj);
      }
      obj.share += item.share;
    });
    return protocols.sort((a, b) => b.share - a.share).slice(0, 3);
  }, [portfolioData]);

  const tweetText = `My @oneclickcrypto DeFi risk score is ${
    analysis.risk_score
  }/10. My suggested portfolio consists of ${
    portfolioData.length
  } protocols & ${analysis.portfolio.length} pools across ${
    new Set(portfolioData.map((item) => item.chain)).size
  } chains with ${analysis.avg_yield} average APY. Top-${
    topProtocols.length
  } protocols are ${
    topProtocols.length === 1
      ? topProtocols[0].twitterUsername
      : topProtocols
          .slice(0, -1)
          .map((item) => item.twitterUsername)
          .join(", ") +
        ", and " +
        topProtocols[topProtocols.length - 1].twitterUsername
  }, with an average "${analysis.avg_risk}" rating. #1CC`;

  const claimText = `This is a theoretical portfolio that doesn’t account for position size or any fees (gas fees, bridging fees, management fees) associated with the listed pools. The APY data is dated ${analysis.pool_data_updated_at}. The APY data doesn’t account for the asset in which payout is made, potential boosts, and requirements for participating in any listed pool. Although we tried our best to develop a system that generates a robust portfolio from a risk-reward perspective, exercise caution and conduct independent research.`;

  const handleTwitterShare = () => {
    twitterShare({
      captureDOM: screenCaptureRef.current,
      analysis,
      tweetText,
      beforeCapture: () => {
        claimRef.current.style.opacity = "0";
      },
      afterCapture: () => {
        claimRef.current.style.opacity = "1";
      },
    });
  };

  const handleShowJoinModal = () => {
    showModal(ModalType.JoinModal);
  };

  return (
    <>
      <div
        className={`px-[24px] lg:px-[64px] py-[14px] ${className} animate-fadeIn`}
      >
        <div className="flex flex-col lg:flex-row items-center gap-[16px]">
          <Rate size="small" score={analysis.risk_score} />
          <div>
            <div className="text-center lg:text-left">
              <p className="font-caption font-medium text-[20px] lg:text-[32px] leading-[1.1] text-grey-dark">
                Your Risk Profile
              </p>
              <button
                className="border-none background-none font-body font-bold text-[14px] lg:text-[18px] leading-[1.2] spacing-[-0.5px] text-yellow-dark hover:text-yellow-deep transition-all duration-300"
                onClick={goBack}
              >
                Explore Risk
              </button>
            </div>
          </div>
          <div className="flex lg:ml-auto gap-[18px]">
            <Button type={6} onClick={handleTwitterShare} disabled={isSharing}>
              <TwitterSvg />
              {isSharing ? (
                <>
                  Sharing
                  <ClipLoader color="white" size={15} />
                </>
              ) : (
                "Share"
              )}
            </Button>
            {/* <Button type={15} className="lg:hidden">
              <SettingSvg />
              Customize
            </Button> */}
          </div>
        </div>
        <div
          className="flex flex-col mt-[14px] lg:mt-0 lg:flex-row gap-[14px]"
          ref={screenCaptureRef}
        >
          <div>
            <div
              className="relative w-[327px] h-[327px] lg:w-[402px] lg:h-[402px] bg-white mx-auto lg:mr-[35.55px] rounded-full"
              style={{
                boxShadow: "1.83144px 21.0615px 32.9658px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(6.41002px)",
              }}
            >
              <DeFiChart data={chartData} />
            </div>
            {/* <div className="mt-[32px]">
              <p className="font-caption font-medium text-[20px] leading-[1.46] text-grey-dark">
                Portfolio Highlights
              </p>
              <div className="flex flex-col gap-[16px] mt-[12px]">
                <div
                  className="flex items-center px-[14px] py-[12px] bg-white rounded-[8px]"
                  style={{
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <SandGlassSvg className="w-[26px]" />
                  <p className="font-caption font-medium text-[18px] leading-[1.1] text-grey-black w-[77px] ml-[8px]">
                    96%
                  </p>
                  <p className="text-[14px] leading-[1.1] text-grey-dark">
                    protocols are live for{" "}
                    <span className="text-yellow-deep">2.4+ years</span>
                  </p>
                </div>
                <div
                  className="flex items-center px-[14px] py-[12px] bg-white rounded-[8px]"
                  style={{
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <SearchConfirmSvg className="w-[26px]" />
                  <p className="font-caption font-medium text-[18px] leading-[1.1] text-grey-black w-[77px] ml-[8px]">
                    78%
                  </p>
                  <p className="text-[14px] leading-[1.1] text-grey-dark">
                    protocols were audited in the last{" "}
                    <span className="text-yellow-deep">6 months</span>
                  </p>
                </div>
                <div
                  className="flex items-center px-[14px] py-[12px] bg-white rounded-[8px]"
                  style={{
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.06)",
                  }}
                >
                  <LockSvg className="w-[26px]" />
                  <p className="font-caption font-medium text-[18px] leading-[1.1] text-grey-black w-[77px] ml-[8px]">
                    88%
                  </p>
                  <p className="text-[14px] leading-[1.1] text-grey-dark">
                    assets are{" "}
                    <span className="text-yellow-deep">low-risk</span> assets
                  </p>
                </div>
              </div>
            </div> */}
          </div>
          <div className="flex flex-col">
            <div className="lg:px-[16px] py-[22.5px] text-center lg:text-left">
              <HowItWorks />
              <p className="font-caption font-medium capitalize text-[32px] leading-[1.1] text-grey-dark mt-[3.5px]">
                Your personalized DeFi portfolio
              </p>
              <p className="text-[14px] font-normal leading-[1.2] tracking-[-0.5px] mt-[12px] lg:mt-[8px] text-grey-black child-span:text-yellow-dark">
                Your personalized DeFI Portfolio has{" "}
                <span>{portfolioData.length} protocols</span> &{" "}
                <span>{analysis.portfolio.length} pools</span> across{" "}
                <span>
                  {new Set(portfolioData.map((item) => item.chain)).size} chains
                </span>
                . It delivers <span>{analysis.avg_yield} APY</span> on average.{" "}
                {topProtocols.map((item) => item.name).join(", ")} are among the
                top-{topProtocols.length} of the protocols, and are rated as{" "}
                {analysis.avg_risk} for their security and liquidity.
              </p>
            </div>
            <div className="hidden lg:flex flex-col flex-grow-[1] bg-white rounded-[8px] mt-[8px]">
              <div className="flex font-body font-medium text-grey-deep text-[14px] leading-[1.1] px-[16px] py-[8px] border-b-[1px] border-b-grey-light38 overflow-y-scroll">
                <div
                  style={{
                    width: `${cellWidth[0]}%`,
                  }}
                >
                  Share
                </div>
                <div
                  style={{
                    width: `${cellWidth[1]}%`,
                  }}
                >
                  Protocol
                </div>
                <div
                  style={{
                    width: `${cellWidth[2]}%`,
                  }}
                >
                  <p className="ml-[40%]">Pool</p>
                </div>
                <div
                  style={{
                    width: `${cellWidth[3]}%`,
                  }}
                >
                  APY
                </div>
                <div
                  style={{
                    width: `${cellWidth[4]}%`,
                  }}
                >
                  Risk
                </div>
                <div className="flex-grow-[1]">Chain</div>
              </div>
              <div className="overflow-y-scroll">
                {portfolioData.map((protocol) => (
                  <div
                    key={protocol.name + protocol.chain}
                    className="flex px-[16px] py-[15px]"
                  >
                    <div
                      className="font-normal text-[14px] leading-[1.1] text-grey-black"
                      style={{
                        width: `${cellWidth[0]}%`,
                      }}
                    >
                      {protocol.share.toFixed(2)}%
                    </div>
                    <div
                      className="font-bold text-[14px] leading-[1.1] text-grey-darkest"
                      style={{
                        width: `${cellWidth[1]}%`,
                      }}
                    >
                      {protocol.name}
                    </div>
                    <div
                      className="flex font-normal text-[10px] leading-[1.5] text-grey-black"
                      style={{
                        width: `${cellWidth[2]}%`,
                      }}
                    >
                      <div className="w-[40%] py-[2px] px-[9px]">
                        {protocol.pools.length === 1 && (
                          <div className="flex items-center h-[11px]">
                            <img
                              className="w-full my-auto"
                              src={`${PoolLinesSvg1}#svgView(preserveAspectRatio(none))`}
                              alt="Pool Lines 1"
                            />
                          </div>
                        )}
                        {protocol.pools.length === 2 && (
                          <img
                            className="w-full h-[26px]"
                            src={`${PoolLinesSvg2}#svgView(preserveAspectRatio(none))`}
                            alt="Pool Lines 2"
                          />
                        )}
                        {protocol.pools.length === 3 && (
                          <img
                            className="w-full h-[41px]"
                            src={`${PoolLinesSvg3}#svgView(preserveAspectRatio(none))`}
                            alt="Pool Lines 3"
                          />
                        )}
                        {protocol.pools.length === 4 && (
                          <img
                            className="w-full h-[56px]"
                            src={`${PoolLinesSvg4}#svgView(preserveAspectRatio(none))`}
                            alt="Pool Lines 4"
                          />
                        )}
                        {protocol.pools.length === 5 && (
                          <img
                            className="w-full h-[71px]"
                            src={`${PoolLinesSvg5}#svgView(preserveAspectRatio(none))`}
                            alt="Pool Lines 5"
                          />
                        )}
                      </div>
                      <div className="max-w-[60%] w-[60%] pr-[15px]">
                        {protocol.pools.map((pool) => (
                          <div
                            key={pool.name}
                            className="cursor-default whitespace-nowrap text-ellipsis overflow-clip"
                            title={[pool.name]}
                          >
                            {pool.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className="font-normal text-[10px] leading-[1.5] text-grey-black"
                      style={{
                        width: `${cellWidth[3]}%`,
                      }}
                    >
                      {protocol.pools.map((pool) => (
                        <div className="w-[34px] text-right">
                          {typeof pool.yield === "undefined"
                            ? "-------"
                            : pool.yield}
                        </div>
                      ))}
                    </div>
                    <div
                      className="font-normal text-[12px] leading-[1.25]"
                      style={{
                        width: `${cellWidth[4]}%`,
                      }}
                    >
                      {protocol.pools.map((pool, index) => (
                        <RiskLevel key={index} value={pool.risk} />
                      ))}
                    </div>
                    <div className="flex text-grey-black flex-grow-[1]">
                      <div className="flex gap-[8px] items-center h-min">
                        <ChainLogo chain={protocol.chain} /> {protocol.chain}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div
              className="hidden lg:flex items-center px-[14px] py-[12px] bg-white rounded-[8px] overflow-y-scroll"
              style={{
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.06)",
              }}
            >
              <p
                className="flex items-center font-caption font-medium text-[18px] leading-[1.46] text-grey-black child-span:ml-[4px] child-span:text-[14px] child-span:font-bold child-span:leading-[1.1] child-span:text-grey-deep child-span:font-body"
                style={{ width: `${cellWidth[0]}%` }}
              >
                {Math.round(
                  portfolioData.reduce((s, item) => s + item.share, 0)
                )}
                %
              </p>
              <p
                className="flex items-center font-caption font-medium text-[18px] leading-[1.46] text-grey-black child-span:ml-[4px] child-span:text-[14px] child-span:font-bold child-span:leading-[1.1] child-span:text-grey-deep child-span:font-body"
                style={{ width: `${cellWidth[1]}%` }}
              >
                {portfolioData.length}
                <span>Protocols</span>
              </p>
              <p
                className="flex items-center justify-center font-caption font-medium text-[18px] leading-[1.46] text-grey-black child-span:ml-[4px] child-span:text-[14px] child-span:font-bold child-span:leading-[1.1] child-span:text-grey-deep child-span:font-body"
                style={{ width: `${cellWidth[2]}%` }}
              >
                {analysis.portfolio.length}
                <span>Pools</span>
              </p>
              <p
                className="flex items-center font-caption font-medium text-[18px] leading-[1.46] text-grey-black"
                style={{ width: `${cellWidth[3]}%` }}
              >
                {analysis.avg_yield}
              </p>
              <p
                className="flex items-center font-caption font-medium text-[18px] leading-[1.46] text-grey-black"
                style={{ width: `${cellWidth[4]}%` }}
              >
                <RiskLevel
                  value={poolRiskMap[analysis.avg_risk]}
                  className="text-grey-black"
                />
              </p>
              <p className="flex flex-grow-[1] items-center font-caption font-medium text-[18px] leading-[1.46] text-grey-black child-span:ml-[4px] child-span:text-[14px] child-span:font-bold child-span:leading-[1.1] child-span:text-grey-deep child-span:font-body">
                {new Set(portfolioData.map((item) => item.chain)).size}
                <span>Chains</span>
              </p>
            </div>
            <div
              className="hidden lg:flex items-center mt-[18px]"
              ref={claimRef}
            >
              <p className="ml-auto font-normal text-[12px] leading-[1.25] italic text-grey-darker2">
                {claimText}
              </p>
              <Button
                type={7}
                className="ml-[14px] hidden lg:flex"
                onClick={handleShowJoinModal}
              >
                Farm all with One Click
              </Button>
            </div>
          </div>
        </div>
        <h3 className="text-[32px] leading-[1.1] text-greay-dark mt-[24px] lg:mt-[28px] text-center lg:text-left">
          List of Pools
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-[20px] gap-y-[20px] lg:gap-y-[64px] mt-[24px] lg:mt-[48px]">
          {analysis.portfolio.map((item, index) => (
            <PoolBox
              key={index}
              share={Number(item.portfolio_weight.split("%")[0])}
              risk={poolRiskMap[item.pool_risk]}
              apy={item.pool_yield}
              pool={item.pool_name.split(" ").slice(1).join(" ")}
              protocol={item.protocol_name}
              chain={item.chain_name}
              url={item.pool_url}
              color={item.protocol_color}
              assetImageIds={item.asset_image_ids}
              protocolImageId={item.protocol_image_id}
            />
          ))}
        </div>
        <div className="flex flex-col px-[28px] py-[17px] lg:flex-row justify-center lg:items-center mx-auto mt-[48px] gap-[20px] bg-yellow-dark hover:bg-yellow-deep rounded-[24px] border-[2px] border-yellow-light text-[20px] leading-[1.46] font-caption lg:w-[607px] lg:h-[76px]">
          Create this portfolio with One Click
          <Button type={12} onClick={handleShowJoinModal}>
            Start
          </Button>
        </div>
        <p className="lg:hidden mt-[20px] font-normal italic text-[12px] leading-1.25] text-grey-darker2">
          {claimText}
        </p>
      </div>
    </>
  );
}
