const locationButton = document.getElementById("get-location");
let locationDiv = document.getElementById("location-details");

locationButton.addEventListener("click", () => {
  if (navigator.geolocation) {
    // return  position (langtitude and longitude)
    navigator.geolocation.getCurrentPosition(showLocation, checkError);
  } else {
    locationDiv.innerText = "the browser not supported";
  }
});

const checkError = (error) => {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationDiv.innerText = "Please allow the location";

      break;
    case error.POSITION_UNAVAILABLE:
      locationDiv.innerText = "loaction information unavaible";

      break;
    case error.TIMEOUT:
      locationDiv.innerText = "the request to get user location time out";

      break;

    default:
      break;
  }
};

const showLocation = async (position) => {
  let reponse = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
  );

  let data = await reponse.json();
  console.log(data);
  console.log(data.address.country);

  locationDiv.innerText = ` City :  ${data.address.city}, 
                            Country :  ${data.address.country}
                            Postcode :  ${data.address.postcode}
                            State  :  ${data.address.state}`;
};
