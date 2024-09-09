package handler

import (
	"encoding/json"
	"math/rand"
	"net/http"
)

type ColorResponse struct {
	Color string `json:"color"`
}

func Handler(w http.ResponseWriter, r *http.Request) {
	colors := []string{"red", "blue", "green", "yellow", "purple", "orange"}
	randomColor := colors[rand.Intn(len(colors))]

	response := ColorResponse{
		Color: randomColor,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
