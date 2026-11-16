# Pulso

Pulso es una aplicación web de herramientas para practicar música. El metrónomo es la primera utilidad y se abre desde el lanzador de `index.html`. Pulsa **Pulso** en la barra superior para volver al inicio.

## Versión inicial · v0.1.0

- Metrónomo de 30 a 300 BPM con ajuste directo, deslizador y función de marcar el tempo.
- Compases y subdivisiones para practicar con corcheas, tresillos y semicorcheas, entre otras opciones.
- Patrones de púa abajo y arriba, con clic, acento o silencio por golpe. Se puede guardar un patrón personalizado por compás y subdivisión en el navegador.
- Cuenta de entrada opcional de tres o cuatro pulsos. El temporizador corre después de esa cuenta y admite hasta cinco minutos en pasos de quince segundos. En cero, la sesión es libre.
- Tres timbres de clic, control de volumen y batería de acompañamiento opcional.
- Interfaz en español e inglés, con selector **ES / EN** en la barra superior.

## Abrir en local

Abre [index.html](index.html) en un navegador moderno. Puedes servir la carpeta por HTTP si quieres una URL local estable para las pruebas y el almacenamiento del navegador. Con Python 3, ejecuta desde la raíz del repositorio:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Entra en `http://127.0.0.1:8000/` y abre **Metrónomo**. El audio se activa al pulsar **Iniciar**. Los patrones y el idioma se guardan en el navegador cuando permite `localStorage`. Los enlaces entre pantallas también conservan el idioma mediante `?lang=es` o `?lang=en`.

## Tecnología y estructura

Pulso usa HTML, CSS y JavaScript nativo. Se sirve como sitio estático, sin servidor de aplicación, dependencias que instalar ni paso de compilación. Las tipografías DM Sans y Geist se cargan desde Google Fonts, con fuentes del sistema como respaldo.

| Archivo | Función |
| --- | --- |
| `index.html` | Lanzador y cuadrícula donde se añaden las futuras utilidades. |
| `Pulso.html` | Interfaz y lógica del metrónomo, el temporizador, el editor de patrones y la reproducción. |
| `barra.css` | Estilos compartidos de la navegación y el selector de idioma. |
| `idiomas.js` | Textos en español e inglés, cambio de idioma y conservación de la preferencia al navegar. |

El metrónomo usa el reloj de la Web Audio API para programar los clics y sintetizar el bombo, la caja y el charles. La animación lee ese mismo reloj para resaltar los golpes en el patrón compacto y en el editor.

Para añadir otra utilidad, crea su pantalla, enlázala con una nueva tarjeta en `index.html` y reutiliza la barra superior y el selector de idioma. Añade los textos para ambos idiomas en `idiomas.js`.

## Comprobación manual

1. Abre el metrónomo desde el lanzador y cambia entre **ES** y **EN**. Pulsa **Pulso** y comprueba que se conserva el idioma.
2. Ajusta el tempo, selecciona un compás y una subdivisión, y guarda un patrón con clics, acentos y silencios. Recarga y selecciona **Personalizado** con el mismo compás y subdivisión para recuperarlo.
3. Inicia una sesión de 15 segundos con cuenta de entrada. Comprueba que el temporizador arranca después de la cuenta, que los resaltados siguen el pulso y que el metrónomo se detiene al llegar a cero.
4. Prueba el modo **Libre**, la batería de acompañamiento y el control de volumen.

## Subir el repositorio a GitHub

Crea un repositorio vacío en GitHub y copia su URL. Sustituye `URL_DEL_REPOSITORIO` por esa dirección y ejecuta desde esta carpeta:

```sh
git remote add origin URL_DEL_REPOSITORIO
git push -u origin main
git push origin v0.1.0
```
