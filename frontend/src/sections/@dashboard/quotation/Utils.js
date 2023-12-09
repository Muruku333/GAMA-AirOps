import axios from "axios";

export const categories = {
    1: {
      label: "₹ 3,60,000 / hour",
      value: 360000,
      valuePerQua: 90000,
      valuePerMin: 6000,
    },
    2: {
      label: "₹ 3,50,000 / hour",
      value: 350000,
      valuePerQua: 87500,
      valuePerMin: 5833.34,
    },
    3: {
      label: "₹ 3,40,000 / hour",
      value: 340000,
      valuePerQua: 85000,
      valuePerMin: 5666.67,
    },
  };

export const paxDetails = ["Ferry", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  
export function formatCurrency (value){
    const numericValue = removeCommas(value);
    const formattedValue = numericValue.replace(
      /\B(?=(?:(\d\d)+(\d)(?!\d))+(?!\d))/g,
      ","
    );
    return formattedValue;
  };
  
export function removeCommas(value){
    return value.replace(/,/g, "");
  };
  
export function covertToTimeString (totalMinutes){
    // Separating Total minutes into hours and minutes.
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
  
    let timeString = "";
    if (hours > 1) {
      timeString += hours + " hrs ";
    } else if (hours > 0) {
      timeString += hours + " hr ";
    }
  
    if (minutes > 1) {
      timeString += minutes + " mins";
    } else if (minutes > 0) {
      timeString += minutes + " min";
    }
  
    return timeString;
  }

export async function getCoordinatesFromNominatim (place){
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          place
        )}`
      );
  
      if (response.data.length > 0) {
        const location = response.data[0];
        return {
          latitude: parseFloat(location.lat),
          longitude: parseFloat(location.lon),
        };
      } else {
        throw new Error("Location not found");
      }
    } catch (error) {
      throw new Error("Error fetching location data");
    }
  };