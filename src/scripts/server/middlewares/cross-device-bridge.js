import MobileDetect from 'mobile-detect';

const CrossDeviceBridge = (req, res, next) => {
  const detector = new MobileDetect(req.headers['user-agent']);
  const hostname = req.hostname;
  if(!detector.mobile()){
    res.redirect(`PUT_YOUR_DESKTOP_VERSION_URL_HERE`);
    return;
  }
  next();
};

export default CrossDeviceBridge;
