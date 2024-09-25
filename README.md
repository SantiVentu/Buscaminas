# BuscaminasAngular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


# Características
Juego clásico de Buscaminas:

El usuario puede seleccionar diferentes niveles de dificultad: fácil (9x9, 10 minas), medio (16x16, 30 minas) y difícil (24x24, 80 minas).
Implementación básica del juego con revelación de celdas, colocación de banderas y detección de minas.

1 Guardar y cargar partidas:
Se pueden guardar múltiples partidas en LocalStorage.
Opción para cargar partidas guardadas.

2 Temporizador:
Temporizador que comienza al iniciar el juego y se detiene al ganar o perder.
Control de sonido:

2 Botón para activar/desactivar sonidos en la esquina superior izquierda que afecta a todo el juego.
Efectos de sonido al iniciar el juego y durante eventos clave como ganar o perder.

3 Interfaz gráfica:
Fondo de pantalla personalizado para diferentes componentes del juego.
Diseño responsivo para diferentes tamaños de tablero.
Se utilizó los Alerts a modo de notificación por comodidad y tiempo, pero podria ser reemplazado por algo como SweetAlert2 
