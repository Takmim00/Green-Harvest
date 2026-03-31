import { useEffect } from "react";

export default function Loader({ hide }) {

   useEffect(() => {
    document.body.style.overflow = "hidden";

    if (hide) {
      setTimeout(() => {
        document.body.style.overflow = "auto";
      }, 1200); 
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [hide]);
  return (
    <div className={`loader-wrap ${hide ? "loader-hide" : ""}`}>
      <style>{`
        .loader-wrap{
          position:fixed;
          inset:0;
          z-index:9999;
          display:flex;
          align-items:center;
          justify-content:center;
          overflow:hidden;
          background:#ffff;   /* dark background */
          transition:transform 1.2s cubic-bezier(0.76,0,0.24,1);
        }

        .loader-hide{
          transform:translateY(-120%);
        }

        .loader-wrap svg{
          position:absolute;
          top:0;
          width:100vw;
          height:110vh;
          fill:#1d1d1d;
        }

        .load-text{
          font-size:60px;
          font-weight:300;
          letter-spacing:5px;
          text-transform:uppercase;
          color:#1d1d1d;
        }

        .load-text span{
          display:inline-block;
          animation:loading 1s infinite alternate;
        }

        .load-text span:nth-child(1){animation-delay:0s}
        .load-text span:nth-child(2){animation-delay:.1s}
        .load-text span:nth-child(3){animation-delay:.2s}
        .load-text span:nth-child(4){animation-delay:.3s}
        .load-text span:nth-child(5){animation-delay:.4s}
        .load-text span:nth-child(6){animation-delay:.5s}
        .load-text span:nth-child(7){animation-delay:.6s}
        .load-text span:nth-child(8){animation-delay:.7s}
        .load-text span:nth-child(9){animation-delay:.8s}
        .load-text span:nth-child(10){animation-delay:.9s}
        .load-text span:nth-child(11){animation-delay:1s}
        .load-text span:nth-child(12){animation-delay:1.1s}

        @keyframes loading{
          0%{opacity:1}
          100%{opacity:0}
        }
      `}</style>

      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none">
        <path d="M0 2S175 1 500 1s500 1 500 1V0H0Z"/>
      </svg>

      <div className="load-text">
        <span>G</span>
        <span>R</span>
        <span>E</span>
        <span>E</span>
        <span>N</span>
        <span>H</span>
        <span>A</span>
        <span>R</span>
        <span>V</span>
        <span>E</span>
        <span>S</span>
        <span>T</span>
      </div>
    </div>
  );
}