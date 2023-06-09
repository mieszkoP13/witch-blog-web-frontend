import "../styles/History.css";

const History = ({ history, images }) => {
  return (
    <>
      {history.map((data) => {
        const date = new Date(data.createdAt);
        const stringDate = date.toLocaleString("pl-PL", {
          timeZone: "UTC",
        });
        const contains0 = (string) => {
          const str = string.split(".")[0];
          return str.includes(
            data.divinationResponse.cardsResponse[0].card.img.split(".")[0]
          );
        };
        const contains1 = (string) => {
          const str = string.split(".")[0];
          return str.includes(
            data.divinationResponse.cardsResponse[1].card.img.split(".")[0]
          );
        };
        const contains2 = (string) => {
          const str = string.split(".")[0];
          return str.includes(
            data.divinationResponse.cardsResponse[2].card.img.split(".")[0]
          );
        };

        return (
          <>
            <p className="history-date">{stringDate}</p>
            <div className="history-container">
              <div className="history-cards-container">
                <div className="history-card-and-name-container">
                  <div
                    style={{
                      backgroundImage: `url(${
                        images[images.findIndex(contains0)]
                      })`,
                    }}
                    className={
                      data.divinationResponse.cardsResponse[0].reversed
                        ? "history-single-card-container reversed"
                        : "history-single-card-container"
                    }
                  ></div>
                  <p>{data.divinationResponse.cardsResponse[0].card.name}</p>
                  <p>
                    {data.divinationResponse.cardsResponse[0].reversed
                      ? " upside down"
                      : ""}
                  </p>
                </div>
                <div className="history-card-and-name-container">
                  <div
                    style={{
                      backgroundImage: `url(${
                        images[images.findIndex(contains1)]
                      })`,
                    }}
                    className={
                      data.divinationResponse.cardsResponse[1].reversed
                        ? "history-single-card-container reversed"
                        : "history-single-card-container"
                    }
                  ></div>
                  <p>{data.divinationResponse.cardsResponse[1].card.name}</p>
                  <p>
                    {data.divinationResponse.cardsResponse[1].reversed
                      ? " upside down"
                      : ""}
                  </p>
                </div>
                <div className="history-card-and-name-container">
                  <div
                    style={{
                      backgroundImage: `url(${
                        images[images.findIndex(contains2)]
                      })`,
                    }}
                    className={
                      data.divinationResponse.cardsResponse[2].reversed
                        ? "history-single-card-container reversed"
                        : "history-single-card-container"
                    }
                  ></div>
                  <p>{data.divinationResponse.cardsResponse[2].card.name}</p>
                  <p>
                    {data.divinationResponse.cardsResponse[2].reversed
                      ? " upside down"
                      : ""}
                  </p>
                </div>
              </div>
              <p className="history-prediction">
                {data.divinationResponse.prediction}
              </p>
            </div>
          </>
        );
      })}
    </>
  );
};

export default History;
