package video_funcs

import (
	"fmt"
	"unsafe"

	"golang.org/x/sys/windows"
)

func ConvertVideo(inputPath string, outputPath string) error {

	exePath := fmt.Sprintf("./bin/ffmpeg  -i  %s %s", inputPath, outputPath)

	// Estructura para la información de inicio del proceso
	var si windows.StartupInfo
	var pi windows.ProcessInformation

	// Inicializar el struct StartupInfo
	si.Cb = uint32(unsafe.Sizeof(si))
	si.Flags = windows.STARTF_USESHOWWINDOW
	si.ShowWindow = windows.SW_HIDE // Ocultar la ventana de la consola

	// Crear el proceso
	err := windows.CreateProcess(
		nil,                               // Nombre del archivo (usamos nil para usar la ruta directamente)
		windows.StringToUTF16Ptr(exePath), // Comando
		nil,                               // Atributos de seguridad del proceso
		nil,                               // Atributos de seguridad del hilo
		false,                             // No heredar los handles
		windows.CREATE_NO_WINDOW,          // No mostrar ventana
		nil,                               // Variables de entorno
		nil,                               // Directorio de trabajo
		&si,                               // Información de inicio
		&pi,                               // Información del proceso
	)
	if err != nil {
		fmt.Println("Error creating process", err)
		return err
	}
	defer windows.CloseHandle(pi.Process)
	defer windows.CloseHandle(pi.Thread)

	// Esperar a que el proceso termine
	_, err = windows.WaitForSingleObject(pi.Process, windows.INFINITE)
	if err != nil {
		fmt.Println("Error waiting process", err)
		return err
	}

	fmt.Println("process finished")

	return nil
}
