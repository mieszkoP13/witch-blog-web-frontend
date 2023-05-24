import React, { useEffect, useState } from "react";
import "../styles/Zodiac.css";
import Aquarius from "../imgs/light/zodiac/aquarius.png";
import Aries from "../imgs/light/zodiac/aries.png";
import Cancer from "../imgs/light/zodiac/cancer.png";
import Capricorn from "../imgs/light/zodiac/capricorn.png";
import Gemini from "../imgs/light/zodiac/gemini.png";
import Leo from "../imgs/light/zodiac/leo.png";
import Libra from "../imgs/light/zodiac/libra.png";
import Pisces from "../imgs/light/zodiac/pisces.png";
import Sagittarius from "../imgs/light/zodiac/sagittarius.png";
import Scorpio from "../imgs/light/zodiac/scorpio.png";
import Taurus from "../imgs/light/zodiac/taurus.png";
import Virgo from "../imgs/light/zodiac/virgo.png";
const ZODIAC_IMGS = [
  Aquarius,
  Aries,
  Cancer,
  Capricorn,
  Gemini,
  Leo,
  Libra,
  Pisces,
  Sagittarius,
  Scorpio,
  Taurus,
  Virgo,
];

const Zodiac = ({ id, updateCheck }) => {
  const [check, setCheck] = useState(false);

  const toggleCheck = () => setCheck(!check);

  useEffect(() => {
    updateCheck(check, id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [check]);

  return (
    <img
      onClick={toggleCheck}
      className="zodiac"
      src={ZODIAC_IMGS[id]}
      alt="Card"
    />
  );
};

export default Zodiac;
