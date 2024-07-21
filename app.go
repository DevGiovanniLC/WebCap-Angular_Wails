package main

import (
	"context"
	"fmt"
	"time"

	"ScreenCapture/backend/video_funcs"
	"io/ioutil"
	"log"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called at application startup
func (b *App) startup(ctx context.Context) {
	// Perform your setup here
	b.ctx = ctx
}

// domReady is called after the front-end dom has been loaded
func (b *App) domReady(ctx context.Context) {
	// Add your action here
}

// shutdown is called at application termination
func (b *App) shutdown(ctx context.Context) {
	// Perform your teardown here
}

// Greet returns a greeting for the given name
func (b *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (b *App) VideoConverter(data []byte, format string)  {

	tempDir := "./uploads"
	if _, err := os.Stat(tempDir); os.IsNotExist(err) {
		os.Mkdir(tempDir, 0755)
	}

	tempFilePath := "./uploads/" + time.Now().Format("20060102150405")

    err := ioutil.WriteFile(tempFilePath, data, 0644)
    if err != nil {
        log.Println("Error saving the video:", err)
    }
	
	outputPath := tempFilePath + "." + format

	if err := video_funcs.ConvertVideo(tempFilePath, outputPath); err != nil {
		fmt.Println("Error converting the video: ", err)
		return
	}

	fmt.Println("video converted successfully "+ outputPath)

}

// Shows a Dialog
func (b *App) ShowDialog() {
	_, err := runtime.MessageDialog(b.ctx, runtime.MessageDialogOptions{
		Type:    runtime.InfoDialog,
		Title:   "Native Dialog from Go",
		Message: "This is a Native Dialog send from Go.",
	})

	if err != nil {
		panic(err)
	}
}
