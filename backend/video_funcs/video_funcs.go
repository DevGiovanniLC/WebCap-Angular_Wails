package video_funcs

import (
	"fmt"
	"os/exec"
)

func ConvertVideo(inputPath string, outputPath string) error {
	cmd := exec.Command("./bin/ffmpeg", "-i", inputPath, outputPath)
	
	err := cmd.Run()

	if err := cmd.Wait(); err != nil {
		fmt.Println("Error esperando el comando:", err)
	}

	fmt.Println("Ejecución completada.")

	return err
}
