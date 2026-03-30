// components/Loader.jsx
export default function Loader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-transparent">
      <style>{`
        @keyframes fadeInOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        .load-text span {
          animation: fadeInOut 1s infinite alternate;
          display: inline-block;
        }

        .load-text span:nth-child(1) { animation-delay: 0s; }
        .load-text span:nth-child(2) { animation-delay: 0.1s; }
        .load-text span:nth-child(3) { animation-delay: 0.2s; }
        .load-text span:nth-child(4) { animation-delay: 0.3s; }
        .load-text span:nth-child(5) { animation-delay: 0.4s; }
        .load-text span:nth-child(6) { animation-delay: 0.5s; }
        .load-text span:nth-child(7) { animation-delay: 0.6s; }
      `}</style>

      <svg
        viewBox="0 0 1000 1000"
        preserveAspectRatio="none"
        className="absolute top-0 w-screen h-screen fill-[#1d1d1d] pointer-events-none"
      >
        <path d="M0 2S175 1 500 1s500 1 500 1V0H0Z" />
      </svg>

      <div className="relative z-20 text-center">
        <div className="load-text text-6xl font-light tracking-widest uppercase">
          <span>G</span>
          <span>R</span>
          <span>E</span>
          <span>E</span>
          <span>N</span>
          <span>H</span>
          <span>A</span>
          <span>R</span>
          <span>V</span>
          <span>e</span>
          <span>S</span>
          <span>T</span>
        </div>
      </div>
    </div>
  );
}