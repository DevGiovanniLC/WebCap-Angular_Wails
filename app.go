package main

import (
	"context"
	"fmt"
	"time"

	"ScreenCapture/backend/video_funcs"
	"log"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

type App struct {
	ctx context.Context
}

func (a *App) startup(ctx context.Context) {
    a.ctx = ctx
}

func NewApp() *App {
	return &App{}
}

func (a *App) VideoConverter(data []byte, format string) {

	tempDir := "./uploads"
	if _, err := os.Stat(tempDir); os.IsNotExist(err) {
		os.Mkdir(tempDir, 0755)
	}

	inputPath := "./uploads/" + time.Now().Format("20060102150405")

	file, err := os.Create(inputPath)
	if err != nil {
		log.Fatal(err)
	}

	file.Write(data)

	outputPath, err := SelectAndSaveFile(a, format)

	video_funcs.ConvertVideo(inputPath, outputPath)

}


func SelectAndSaveFile(a *App,format string) (string, error) {
	saveDialogOptions := runtime.SaveDialogOptions{
		DefaultDirectory:           "",
		DefaultFilename:            "video." + format,
		Title:                      "Save File",
		Filters:                    []runtime.FileFilter{{DisplayName: "Video Files", Pattern: fmt.Sprintf("*.%s", format)}},
		ShowHiddenFiles:            false,
		CanCreateDirectories:       false,
		TreatPackagesAsDirectories: false,
	}

	filePath, err := runtime.SaveFileDialog(a.ctx, saveDialogOptions)
	if err != nil {
		return "", err
	}

	return filePath, nil
}
