package video_funcs

import (
	"fmt"
	"unsafe"
	"golang.org/x/sys/windows"
)

func ConvertVideo(inputPath string, outputPath string) error {

	exePath := fmt.Sprintf("./bin/ffmpeg  -i  %s %s", inputPath, outputPath)


	var si windows.StartupInfo
	var pi windows.ProcessInformation


	si.Cb = uint32(unsafe.Sizeof(si))
	si.Flags = windows.STARTF_USESHOWWINDOW
	si.ShowWindow = windows.SW_HIDE


	err := windows.CreateProcess(
		nil,                              
		windows.StringToUTF16Ptr(exePath),
		nil,                               
		nil,                               
		false,                             
		windows.CREATE_NO_WINDOW,          
		nil,                               
		nil,                               
		&si,                               
		&pi,                               
	)
	if err != nil {
		fmt.Println("Error creating process", err)
		return err
	}
	defer windows.CloseHandle(pi.Process)
	defer windows.CloseHandle(pi.Thread)

	_, err = windows.WaitForSingleObject(pi.Process, windows.INFINITE)
	if err != nil {
		fmt.Println("Error waiting process", err)
		return err
	}

	fmt.Println("process finished")

	return nil
}
