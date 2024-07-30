package main

import (
	"embed"
	"log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed frontend/dist
var assets embed.FS

func main() {

	// Create an instance of the app structure
	app := NewApp()

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "WebCap",
		Width:         800,
		Height:        600,
		MinWidth:         800,
		MinHeight:        650,
		BackgroundColour: &options.RGBA{R: 213, G: 213, B: 213, A: 1},
		AssetServer: &assetserver.Options{
            Assets: assets,
        },
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
		},	
	})

	if err != nil {
		log.Fatal(err)
	}
}
