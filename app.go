package main

import (
	"context"
	"fmt"
	"os/user"
	"path/filepath"
	"time"

	"ScreenCapture/backend/video_funcs"
	"log"
	"os"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

var folderName = "WebCapVideos"

type App struct {
	ctx context.Context
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func NewApp() *App {
	return &App{}
}

func (a *App) ProcessVideo(data []byte, format string) {

	inputPath := CreateTemporalFile(data)
	defer os.RemoveAll(inputPath)

	outputPath := SelectAndSaveFile(a, format)

	video_funcs.ConvertVideo(inputPath, outputPath)

	fmt.Println("Video saved: ", outputPath)
}

func (a *App) VideoBufferConverter(fileName string, data []byte, format string) {
	
	inputPath := CreateTemporalFile(data)
	defer os.Remove(inputPath)

	userFolder := filepath.Join(GetVideoUserPath(), folderName)
	CreateFolder(userFolder)
	outputPath := filepath.Join(userFolder, fileName+"."+format)

	video_funcs.ConvertVideo(inputPath, outputPath)

	fmt.Println("Video saved: ", outputPath)
}

func CreateTemporalFile(data []byte) string {
	tempDir := "./" + folderName

	inputPath := GetTempPath(tempDir)

	file, err := os.Create(inputPath)
	if err != nil {
		log.Fatal(err)
	}

	file.Write(data)
	file.Close()

	return inputPath
}

func GetTempPath(tempDir string) (string) {
	CreateFolder(tempDir)
	fileName := "video" + time.Now().Format("20060102150405")
	filePath := filepath.Join(tempDir, fileName)
	return filePath
}

func SelectAndSaveFile(a *App, format string) string {
	saveDialogOptions := runtime.SaveDialogOptions{
		DefaultDirectory:           "",
		DefaultFilename:            "video." + format,
		Title:                      "Save File",
		Filters:                    []runtime.FileFilter{{DisplayName: "Video Files", Pattern: fmt.Sprintf("*.%s", format)}},
		ShowHiddenFiles:            false,
		CanCreateDirectories:       true,
		TreatPackagesAsDirectories: false,
	}

	filePath, err := runtime.SaveFileDialog(a.ctx, saveDialogOptions)
	if err != nil {
		return ""
	}

	fmt.Println("Path Selected ", filePath)
	return filePath
}

func CreateFolder(path string) {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		os.Mkdir(path, 0755)
	}

	fmt.Println("Folder created: ", path)
}

func GetVideoUserPath() string {
	usr, err := user.Current()
	if err != nil {
		fmt.Println("Error obteniendo el usuario actual:", err)
		return ""
	}
	return filepath.Join(usr.HomeDir, "Videos")
}
