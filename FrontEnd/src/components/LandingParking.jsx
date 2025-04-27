import "../css/LandingParking.css";
import { useState, useRef, useEffect } from "react";

const parkingData = [
  {
    image: "images/g1__ictc.png",
    title: "Parking Spots",
    description: "Gate 1: near ICTC Building",
  },
  {
    image: "images/g1__magdalo.png",
    title: "Magdalo Gate",
    description: "Parking Spots near Gate 1",
  },
  {
    image: "images/g1__ADG.png",
    title: "Parking Spots",
    description: "Gate 1: near Ayuntamiento De Gonzales",
  },
];

const ParkingSection = () => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const cardWidth = containerRef.current.children[0].offsetWidth;
      const gap = 16; // Keep the same gap
      const offset = -(index * (cardWidth + gap));

      containerRef.current.style.transition = "transform 0.5s ease-in-out";
      containerRef.current.style.transform = `translateX(${offset}px)`;
    }
  }, [index]);

  const showNextCard = () => {
    if (index < parkingData.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  const showPrevCard = () => {
    if (index > 0) {
      setIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="parking section" id="parking">
      <div className="parking__container">
        <div className="parking__content">
          <p className="mini__section__title">Parking</p>
          <p className="mini_section_subheading">
            La Spot is still in development. For now, these are the available
            parking <br />
            areas you can view. More parking locations will be added soon!
          </p>

          <div className="parking__card__wrapper">
            {/* Navigation Buttons */}
            <button
              className="nav-btn prev"
              onClick={showPrevCard}
              disabled={index === 0}
            >
              &#10094;
            </button>

            <div className="parking__card__container" ref={containerRef}>
              {parkingData.map((spot, i) => (
                <div key={i} className="parking__card">
                  <img
                    src={spot.image}
                    alt={spot.title}
                    className="parking__card__image"
                  />
                  <p className="parking__card__title">{spot.title}</p>
                  <p className="parking__card__description">
                    {spot.description}
                  </p>
                </div>
              ))}
            </div>

            <button
              className="nav-btn next"
              onClick={showNextCard}
              disabled={index === parkingData.length - 1}
            >
              &#10095;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParkingSection;
