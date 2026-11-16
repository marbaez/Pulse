const pulseCopy = {
  es: {
    language: 'Idioma', home: 'Inicio de Pulse', tools: 'Aplicaciones', metronome: 'Metrónomo',
    space: 'Espacio', shortcut: 'Iniciar o parar', practice: 'Ajusta el pulso y practica tu ritmo de guitarra.',
    timer: 'Temporizador', remaining: 'Tiempo restante', duration: 'Duración de la sesión',
    free: 'Libre', seconds: '{seconds} segundos', tempo: 'Tempo', tap: 'Marcar tempo',
    slower: 'Bajar un BPM', faster: 'Subir un BPM', bpm: 'Tempo en BPM', adjustTempo: 'Ajustar el tempo',
    start: 'Iniciar', stop: 'Parar', ready: 'Listo para practicar', playing: 'En marcha',
    finished: 'Sesión completada', prepare: 'Prepárate…', audioError: 'El navegador no pudo iniciar el audio',
    settings: 'Configuración', openSettings: 'Abrir configuración', close: 'Cerrar',
    meterAndSubdivision: 'Compás y subdivisión', meter: 'Compás', subdivision: 'Subdivisión',
    onePerBeat: 'Un clic por pulso', twoPerBeat: 'Dos por pulso', threePerBeat: 'Tres por pulso',
    fourPerBeat: 'Cuatro por pulso', eighth: 'Corcheas · 2', compoundEighth: 'Corcheas · 3',
    triplets: 'Tresillos · 3', sixteenth: 'Semicorcheas · 4', sixteenthPair: 'Semicorcheas · 2',
    thirtySecond: 'Fusas · 4',
    countIn: 'Cuenta de entrada', noCount: 'Sin cuenta', threeBeats: '3 pulsos', fourBeats: '4 pulsos',
    countProgress: 'Cuenta de entrada · {current} de {total}',
    sound: 'Sonido', tone: 'Timbre', wood: 'Madera', click: 'Clic', digital: 'Digital',
    volume: 'Volumen', mute: 'Silenciar', unmute: 'Reactivar sonido', drums: 'Batería de acompañamiento',
    pattern: 'Patrón de guitarra', patternHelp: 'Toca una casilla para alternar entre clic, acento y silencio.',
    preset: 'Patrón predefinido', all: 'Todos los golpes', downOnly: 'Solo púa abajo ↓',
    upOnly: 'Solo púa arriba ↑', custom: 'Personalizado', save: 'Guardar patrón',
    unsaved: 'Cambios sin guardar', saved: 'Patrón guardado en este navegador',
    saveError: 'El navegador no permite guardar el patrón',
    downstroke: 'Púa abajo', upstroke: 'Púa arriba', accent: 'Acento', silence: 'Silencio',
    step: 'Pulso {beat}, golpe {slot}, {direction}, {sound}'
  },
  en: {
    language: 'Language', home: 'Pulse home', tools: 'Apps', metronome: 'Metronome',
    space: 'Space', shortcut: 'Start or stop', practice: 'Set the tempo and practise your guitar rhythm.',
    timer: 'Timer', remaining: 'Time remaining', duration: 'Session duration',
    free: 'Unlimited', seconds: '{seconds} seconds', tempo: 'Tempo', tap: 'Tap tempo',
    slower: 'Decrease by one BPM', faster: 'Increase by one BPM', bpm: 'Tempo in BPM', adjustTempo: 'Adjust tempo',
    start: 'Start', stop: 'Stop', ready: 'Ready to practise', playing: 'Running',
    finished: 'Session complete', prepare: 'Get ready…', audioError: 'The browser could not start audio',
    settings: 'Settings', openSettings: 'Open settings', close: 'Close',
    meterAndSubdivision: 'Time signature and subdivision', meter: 'Time signature', subdivision: 'Subdivision',
    onePerBeat: 'One click per beat', twoPerBeat: 'Two per beat', threePerBeat: 'Three per beat',
    fourPerBeat: 'Four per beat', eighth: 'Eighth notes · 2', compoundEighth: 'Eighth notes · 3',
    triplets: 'Triplets · 3', sixteenth: 'Sixteenth notes · 4', sixteenthPair: 'Sixteenth notes · 2',
    thirtySecond: 'Thirty-second notes · 4',
    countIn: 'Count-in', noCount: 'No count-in', threeBeats: '3 beats', fourBeats: '4 beats',
    countProgress: 'Count-in · {current} of {total}',
    sound: 'Sound', tone: 'Click sound', wood: 'Wood', click: 'Click', digital: 'Digital',
    volume: 'Volume', mute: 'Mute', unmute: 'Unmute', drums: 'Drum backing',
    pattern: 'Strumming pattern', patternHelp: 'Tap a step to cycle through click, accent, and silence.',
    preset: 'Pattern preset', all: 'All strokes', downOnly: 'Downstrokes only ↓',
    upOnly: 'Upstrokes only ↑', custom: 'Custom', save: 'Save pattern',
    unsaved: 'Unsaved changes', saved: 'Pattern saved in this browser',
    saveError: 'The browser could not save the pattern',
    downstroke: 'Downstroke', upstroke: 'Upstroke', accent: 'Accent', silence: 'Silence',
    step: 'Beat {beat}, stroke {slot}, {direction}, {sound}'
  }
};
const copyValues = new WeakMap();
const supportedLanguage = value => value === 'es' || value === 'en';
let pulseLanguage = new URLSearchParams(location.search).get('lang');
if (!supportedLanguage(pulseLanguage)) {
  try { pulseLanguage = localStorage.getItem('pulso.language'); } catch {}
  if (!supportedLanguage(pulseLanguage)) pulseLanguage = 'es';
}
function t(key, values) {
  return (pulseCopy[pulseLanguage][key] ?? '').replace(/\{(\w+)\}/g, (_, name) => values?.[name] ?? '');
}
function setCopy(element, key, values) {
  element.dataset.i18n = key;
  if (values) copyValues.set(element, values);
  else copyValues.delete(element);
  element.textContent = t(key, values);
}
function initLanguage(onChange = () => {}) {
  function refresh() {
    document.documentElement.lang = pulseLanguage;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      element.textContent = t(element.dataset.i18n, copyValues.get(element));
    });
    document.querySelectorAll('[data-i18n-label]').forEach(element => {
      element.setAttribute('aria-label', t(element.dataset.i18nLabel));
    });
    document.querySelectorAll('a[data-page]').forEach(link => {
      link.href = link.dataset.page + '?lang=' + pulseLanguage;
    });
    document.querySelectorAll('[data-language]').forEach(button => {
      button.setAttribute('aria-pressed', String(button.dataset.language === pulseLanguage));
    });
    onChange();
  }
  document.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => {
      pulseLanguage = button.dataset.language;
      try { localStorage.setItem('pulso.language', pulseLanguage); } catch {}
      const page = new URL(location.href);
      page.searchParams.set('lang', pulseLanguage);
      try { history.replaceState(null, '', page.href); } catch {}
      refresh();
    });
  });
  refresh();
}
