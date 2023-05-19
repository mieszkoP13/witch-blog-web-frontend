import React, { useEffect, useState } from 'react'
import "./Zodiac.css"
import Aquarius from './zodiac-signs-assets/Aquarius.jpg';
import Aries from './zodiac-signs-assets/Aries.jpg';
import Cancer from './zodiac-signs-assets/Cancer.jpg';
import Capricorn from './zodiac-signs-assets/Capricorn.jpg';
import Gemini from './zodiac-signs-assets/Gemini.jpg';
import Leo from './zodiac-signs-assets/Leo.jpg';
import Libra from './zodiac-signs-assets/Libra.jpg';
import Pisces from './zodiac-signs-assets/Pisces.jpg';
import Sagittarius from './zodiac-signs-assets/Sagittarius.jpg';
import Scorpio from './zodiac-signs-assets/Scorpio.jpg';
import Taurus from './zodiac-signs-assets/Taurus.jpg';
import Virgo from './zodiac-signs-assets/Virgo.jpg';
const ZODIAC_IMGS = [Aquarius, Aries, Cancer, Capricorn, Gemini, Leo, Libra, Pisces, Sagittarius, Scorpio, Taurus, Virgo]

const Zodiac = ({id,updateCheck}) => {
  const [check,setCheck] = useState(false)

  const toggleCheck = () => setCheck(!check)

  useEffect(() => {
    updateCheck(check,id)
  }, [check])

  return (
    <img onClick={toggleCheck} className="zodiac" src={ZODIAC_IMGS[id]} alt="Card" />
  )
}

export default Zodiac