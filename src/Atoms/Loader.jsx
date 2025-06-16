const Spinner = () => {
  return (
    <div className="w-[11.2px] h-[11.2px] rounded-full animate-spin-custom">
      <style>{`
        @keyframes spin-custom {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-custom {
          animation: spin-custom 1s linear infinite;
          box-shadow:
            28px 0px 0 0 rgba(71,75,255,0.2),
            22.7px 16.5px 0 0 rgba(71,75,255,0.4),
            8.68px 26.6px 0 0 rgba(71,75,255,0.6),
            -8.68px 26.6px 0 0 rgba(71,75,255,0.8),
            -22.7px 16.5px 0 0 #474bff;
        }
      `}</style>
    </div>
  );
};

export default Spinner;
