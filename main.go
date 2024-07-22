package main

import (
	"embed"
	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
)

//go:embed frontend/dist
var assets embed.FS

func main() {

	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:  "ScreenCapture",
		MinWidth:          900,
		MinHeight:         800,
		BackgroundColour: &options.RGBA{R: 213, G: 213, B: 213, A: 1},
		Assets:            assets,
		OnStartup: app.startup,
		Bind: []interface{}{
			app,
		},

	})

	if err != nil {
		log.Fatal(err)
	}
}
