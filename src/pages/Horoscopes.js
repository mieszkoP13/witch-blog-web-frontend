import { useState } from "react";
import Zodiac from "../components/Zodiac";
import "./Horoscopes.css";
const HOROSCOPES = ["Appreciating the comfort you've created for yourself could currently help you plan to get more of it. In particular, the New Moon in your 4th House of Security symbolizes a great time to pin down what feels most nourishing to you. Although your sign has a reputation for preferring logic over the softer sides of life, your powers of reason are surprisingly useful here. Think through what's working well to identify the underlying needs that must be met, and order your priorities accordingly.",
                    "Your current thinking about money is probably stable and based on a realistic sense of what you have. Still, this New Moon in your finance sector gives you an opportunity to thoughtfully refine the details. If you're considering any changes to your home or living situation, you're ideally positioned to dig further into that issue. Try to get a clear idea of the outcome you're looking for so that you can eventually ask anyone who's advising you the right questions.",
                    "Feeling like a valued member of a community could presently be nourishing for you. As the current New Moon lands in your social sector, your connection to your peers might also solidify your allegiance to a particular belief system that you share with them. Any big commitment tends to limit your options, and you may currently feel aware of that restraint. That said, having some major questions answered, at least for the time being, can free you up to move on to your next task.",
                    "Expressing yourself clearly might require more restraint than normal. Although you may have a thorough understanding of a particular issue, trying to convey every little detail to your listeners right away is likely to lose their focus. As the invigorating New Moon calls attention to your creative 5th house, sticking to a few main points gives you room to fill in the gaps with a more personal approach. Make your topic relatable, and you'll probably gain an audience asking you to dig deeper.",
                    "Building your inner strength could be crucial for you. Although the authority figures in your life aren't necessarily opposed to a particular goal of yours, they also probably won't hand their approval to you easily. The New Moon in your 12th House of Solitude is an occasion to get in touch with your own motives for your quest. You may have to sacrifice some comforts in order to succeed, so make sure your commitment is strong enough to weather any storm.",
                    "Financial constraints can currently shape the way you approach a major goal of yours. With the energetic New Moon in your ambitious 10th house, your eyes are definitely on whatever prize you're seeking! Someone may be willing to help you with a loan or other funding, but their assistance could have certain limits. Rather than trying to convince them to bend the rules, look at this as an opportunity to refine your strategy. Knowing the possibilities aren't infinite might give you needed focus.",
                    "Working together at this time can make you stronger. With the New Moon in your 8th House of Shared Resources, you have an opportunity to start a significant collaboration off on the right foot. Although all the paperwork involved may seem tedious, giving extra attention to the details of any agreements should definitely be worth your time. Think of your future self, since addressing as many potential issues as possible now will be a lot easier than sorting them out on the fly later.",
                    "Delivering an important message to the people around you could be necessary today. You may need to set a boundary about something you've let slide for too long. Acknowledging the possibility of fault on both sides can help you set the right tone. With the refreshing New Moon in your communication sector, you have a chance to figure out how you'll handle your end of the equation differently going forward. If you're able to explain clearly what you need from others, you should get it.",
                    "Getting your daily routine under control may be a major focus for you at the moment. To get the most out of the New Moon in your 6th House of Habits, it's probably best to concentrate on starting fresh instead of punishing yourself or anyone else for whatever went wrong in the past. Going forward, you might need to simplify things at home or set boundaries with a family member. The clearer your plan is, the more likely they'll go along with it.",
                    "A close relationship may provide whatever direction you seek. You might be feeling a little ungrounded and unsure of what you'd find personally fulfilling. With the New Moon in your 7th House of Partnership, unraveling what your companion is interested in doing together could narrow your search for the perfect course of action. If you're not satisfied with their offer, that's useful information for you too! Sometimes you must hear what you don't want to find out what you'd prefer instead.",
                    "Updating your image is a good idea at the moment. With the replenishing New Moon in your sign, you may be ready to announce a change you've been considering for a while. This might be hard on people you've known forever -- they're used to the old you! Even if their initial reaction isn't quite as positive as you'd like, it's not necessarily the end of the story. Over time, perhaps your shift will empower them to make transformations of their own.",
                    "Your intellectual life could be exciting at the moment. The New Moon in your philosophy sector makes for a gorgeous guide toward the clearest possible expression of your big thoughts. You're better off not keeping this process to yourself, though. Having a skeptical companion around can help you identify any flaws in your logic. Even if you don't succeed in convincing them of everything you want them to believe, you'll at least gain a stronger sense of your own path forward."
                    ]

const Horoscopes = (props) => {

    const [selectId, setSelectId] = useState()
    const [select, setSelect] = useState(false)
    const [reveal, setReveal] = useState(false)

    const updateCheck = (_check, _id) => {
        setReveal(false)
        if (_check) {
            setSelectId(_id)
            setSelect(true)
        }
    };

    return (
    <>
    <div className="wrap-horoscope">
        <div className="box-horoscope">
            <div className="top-panel-horoscopes">
              <h1 className="horoscope-h1">Read Your Daily Horoscope</h1>
              <h2 className="horoscope-h2">Choose your zodiac sign and see your <br/> daily horoscope for today. </h2>
            </div>
            <div className="bottom-panel-horoscopes">
            {[...Array(12)].map((x, id) =>
                <div className={`zodiac-div ${id === selectId ? "select" : null}`}>
                    <Zodiac updateCheck={updateCheck} id={id}/>
                </div>
            )}
            </div>
        </div>
        <button onClick={() => select && setReveal(true)} className="btn-horoscope" type="submit">Reveal Horoscope</button>
        {reveal ? 
        (
        <div className="horoscope-result">
          <h1 className="horoscope-result-h1">These are your results:</h1>
          <h2 className="horoscope-result-h2">{HOROSCOPES[selectId]}</h2>
        </div>) : (<></>)}
    </div>
    </>
    );
};

export default Horoscopes;