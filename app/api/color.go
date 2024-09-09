package handler

import (
	"encoding/json"
	"image"
	_ "image/jpeg"
	_ "image/png"
	"net/http"
)

type rgb struct {
	Red   uint32 `json:"red"`
	Green uint32 `json:"green"`
	Blue  uint32 `json:"blue"`
}

func getCommonColor(url string) (rgb, error) {
	resp, err := http.Get(url)
	if err != nil {
		return rgb{}, err
	}
	defer resp.Body.Close()

	m, _, err := image.Decode(resp.Body)
	if err != nil {
		return rgb{}, err
	}

	bounds := m.Bounds()

	r_total := uint32(0)
	g_total := uint32(0)
	b_total := uint32(0)

	count := uint32(0)

	for x := bounds.Min.X; x < bounds.Max.X; x += 100 {
		r, g, b, _ := m.At(x, 0).RGBA()
		count += 1
		r_total += r >> 8
		g_total += g >> 8
		b_total += b >> 8
	}

	r_total /= count
	g_total /= count
	b_total /= count

	return rgb{r_total, g_total, b_total}, nil
}

func Handler(w http.ResponseWriter, r *http.Request) {
	url := r.URL.Query().Get("url")
	if url == "" {
		http.Error(w, "URL parameter is missing", http.StatusBadRequest)
		return
	}

	color, err := getCommonColor(url)
	if err != nil {
		http.Error(w, "Error processing image", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(color)
}
