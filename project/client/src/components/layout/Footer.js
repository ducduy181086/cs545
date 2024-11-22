function Footer() {
  return (
    <div className="bg-black text-white p-6 mt-12">
      {/* Left Section */}
      <div className="flex flex-col items-start space-y-1">
        <label className="text-sm">&copy; 2024, Duc Duy Nguyen, Xuan Loc Le,  Dang Tuan Anh Nguyen </label>
        <label className="text-sm">Maharishi International University</label>
        <label className="text-sm">
          1000 N 4th Street, Fairfield, Iowa - 52557
        </label>
      </div>

      {/* Right Section */}
      <div className="flex space-x-4 mt-4 justify-end">
      </div>
    </div>
  );
}

export default Footer;
