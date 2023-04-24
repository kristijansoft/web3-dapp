/* eslint-disable jsx-a11y/anchor-is-valid */
export function ErrorBox({ error, reset, scanning = false, className }) {
  if (!error) return null;

  return (
    <p className={`text-red-light ${className}`}>
      {scanning ? (
        <>
          Error 500: Looks like there was an error scanning your wallet.
          <br />
          <a onClick={reset} className="underline cursor-pointer ml-[12px]">
            Click Here
          </a>{" "}
          to explore the demo portfolio.
        </>
      ) : (
        <>
          Error: {error}{" "}
          {reset && (
            <a onClick={reset} className="underline cursor-pointer ml-[12px]">
              Restart
            </a>
          )}
        </>
      )}
    </p>
  );
}
