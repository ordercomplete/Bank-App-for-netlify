import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import arrowBackOutline from "../../IconsSvg/arrow-back-outline-3.svg";

export const NavigationLink = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [hasHistory, setHasHistory] = useState(false);

  useEffect(() => {
    // Check if there is previous history
    setHasHistory(window.history.length > 2); // Навігація не спрацьовує, якщо нема історії в браузері
  }, []);

  const getDestination = (isAuthenticated) => {
    return isAuthenticated ? "/balance" : "/";
  };

  const destination = getDestination(isAuthenticated);

  const handleNavigateBack = () => {
    if (hasHistory) {
      navigate(-1);
    } else {
      navigate(destination); // If no history, navigate to destination
    }
  };

  return (
    <button onClick={handleNavigateBack} className="nav_back-button">
      <img src={arrowBackOutline} alt="Back" />
    </button>
  );
};

export default NavigationLink;
