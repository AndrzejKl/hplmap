// 1. Inicjalizacja mapy (ustaw środek i zoom)
var map = L.map("map").setView([52.2297, 21.0122], 6); // Polska

// 2. Dodanie warstwy mapy (OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);

// 3. Link do Twojego pliku CSV z Google Drive (Wklej tutaj swój link z kroku 1)
// Pamiętaj, że link musi kończyć się na output=csv lub format=csv
var googleCsvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQvdeoTLWSDvqONRt3AMRk1VDRBTPRp6-O8vmZ8U_pvkuedXNVRZzfB2IAe3ZvR7yRy0aCz4KX-1d5J/pub?gid=662332958&single=true&output=csv";

// 4. Pobieranie i przetwarzanie danych
Papa.parse(googleCsvUrl, {
  download: true,
  header: true, // Ważne: używa pierwszego wiersza jako nazw kluczy
  complete: function (results) {
    var data = results.data;

    data.forEach(function (row) {
      // Sprawdź czy wiersz ma dane współrzędnych
      // Dostosuj nazwy 'Lat', 'Lng', 'Nazwa' do nagłówków w Twoim Excelu
      var lat = parseFloat(row.Lat);
      var lng = parseFloat(row.Lng);
      var title = row.nazwa;

      console.log("Przetwarzanie wiersza:", row); // Debugowanie

      if (!isNaN(lat) && !isNaN(lng)) {
        L.marker([lat, lng])
          .addTo(map)
          .bindPopup(title || "Brak nazwy");
      }
    });
  },
  error: function (err) {
    console.error("Błąd pobierania CSV:", err);
    alert("Nie udało się pobrać danych z Google Drive. Sprawdź konsolę (F12).");
  },
});
