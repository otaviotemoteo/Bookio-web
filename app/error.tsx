"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <h2>Ocorreu um erro!</h2>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Tentar novamente</button>
      </body>
    </html>
  );
}
