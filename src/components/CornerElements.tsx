const CornerElements = () => {
  return (
    <>
      {/* Top Left Corner */}
      <div className="absolute top-0 left-0 w-6 h-6 border-l-4 border-t-4 border-primary/60 rounded-tl-lg shadow-lg transform scale-110"></div>
      
      {/* Top Right Corner */}
      <div className="absolute top-0 right-0 w-6 h-6 border-r-4 border-t-4 border-primary/60 rounded-tr-lg shadow-lg transform scale-110"></div>
      
      {/* Bottom Left Corner */}
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-4 border-b-4 border-primary/60 rounded-bl-lg shadow-lg transform scale-110"></div>
      
      {/* Bottom Right Corner */}
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-4 border-b-4 border-primary/60 rounded-br-lg shadow-lg transform scale-110"></div>
    </>
  );
};

export default CornerElements;
