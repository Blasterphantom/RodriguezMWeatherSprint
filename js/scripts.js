function urlCall(url) {
    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            console.log(data);
            dataBack = data;
        });
}

urlCall(
    "https://api.openweathermap.org/data/2.5/weather?lat=37.961632&lon=-121.275604&appid=a8dee87c18a78757d839fe472c22cfad"
);