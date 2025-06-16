import background from '../assets/background.png'
const BackgroundWrapper = ({ children }) => {
    return (
      <div
        className="min-h-screen w-full bg-contain bg-center flex items-center justify-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        {children}
      </div>
    );
  };
  
export default BackgroundWrapper;