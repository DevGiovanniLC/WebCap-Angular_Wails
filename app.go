package main

import (
	"context"
	"fmt"
	"time"

	"ScreenCapture/backend/video_funcs"
	"io/ioutil"
	"log"
	"os"
)

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
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
