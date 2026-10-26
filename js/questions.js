// questions.js — 24 preguntas de Pandas con espacios en blanco
// Secciones: Fundamentos del DataFrame, Índice, Operaciones, Gráficos
// ── Total: 50 pts (22 preguntas de 2 pts + 2 preguntas de 3 pts) ─────────

const QUIZ_SECTIONS = [
  { id: 1, name: "Fundamentos del DataFrame",            abbrev: "DataFrame",   color: "#3B82F6" },
  { id: 2, name: "El Índice y su Uso",                   abbrev: "Índice",      color: "#8B5CF6" },
  { id: 3, name: "Operaciones Matemáticas y Estadísticas", abbrev: "Operaciones", color: "#10B981" },
  { id: 4, name: "Generación de Gráficos",               abbrev: "Gráficos",    color: "#F59E0B" },
];

const QUIZ_QUESTIONS = [

  // ══════════════════════════════════════════════════════
  // SECCIÓN 1 — Fundamentos del DataFrame (12 pts)
  // ══════════════════════════════════════════════════════

  {
    id: 1, section: 1, points: 2,
    topic: "Importar Pandas",
    question: "Importa la librería Pandas con su alias estándar `pd`.",
    code:
`[1] pandas [2] pd # Rellena: Comando para importar pandas como pd
print("Pandas importado")`,
    blanks: [
      { id: 1, options: ["import", "from", "include", "require"], correct: "import" },
      { id: 2, options: ["=", "in", "as", "like"],                correct: "as" },
    ],
  },

  {
    id: 2, section: 1, points: 2,
    topic: "Crear una Serie",
    question: "Crea una Serie de Pandas, que representa una columna de datos con un índice.",
    code:
`import pandas as pd
datos_lista = [10, 20, 30]
mi_serie = pd.[1](datos_lista) # Rellena: Función para crear una Serie
print(mi_serie)`,
    blanks: [
      { id: 1, options: ["Serie", "Series", "series", "Array"], correct: "Series" },
    ],
  },

  {
    id: 3, section: 1, points: 2,
    topic: "Crear un DataFrame",
    question: "Crea la estructura fundamental de Pandas, un DataFrame (tabla), a partir de un diccionario.",
    code:
`import pandas as pd
datos_dict = {'ColumnaA': [1, 2, 3], 'ColumnaB': ['X', 'Y', 'Z']}
mi_df = pd.[1](datos_dict) # Rellena: Función para crear un DataFrame
print(mi_df)`,
    blanks: [
      { id: 1, options: ["Table", "dataframe", "Dataframe", "DataFrame"], correct: "DataFrame" },
    ],
  },

  {
    id: 4, section: 1, points: 2,
    topic: "Dimensiones del DataFrame",
    question: "Obtén las dimensiones (número de filas y columnas) del DataFrame `df`.",
    code:
`import pandas as pd
data = {'A': [1, 2], 'B': [3, 4], 'C': [5, 6]}
df = pd.DataFrame(data)
dimensiones = df.[1] # Rellena: Atributo para obtener la forma (filas, columnas)
print(dimensiones) # Debería mostrar (2, 3)`,
    blanks: [
      { id: 1, options: ["shape", "size", "dim", "len"], correct: "shape" },
    ],
  },

  {
    id: 5, section: 1, points: 2,
    topic: "Nombres de las columnas",
    question: "Obtén una lista (o un objeto Index) con los nombres de las columnas del DataFrame `df`.",
    code:
`import pandas as pd
data = {'Nombre': ['Ana', 'Luis'], 'Edad': [25, 30]}
df = pd.DataFrame(data)
nombres_columnas = df.[1] # Rellena: Atributo para obtener los nombres de columna
print(nombres_columnas)`,
    blanks: [
      { id: 1, options: ["cols", "columns", "names", "keys"], correct: "columns" },
    ],
  },

  {
    id: 6, section: 1, points: 2,
    topic: "Tipos de datos por columna",
    question: "Obtén los tipos de datos (dtypes) de cada columna en el DataFrame `df`.",
    code:
`import pandas as pd
data = {'Enteros': [1, 2], 'Flotantes': [1.1, 2.2], 'Texto': ['a', 'b']}
df = pd.DataFrame(data)
tipos_datos = df.[1] # Rellena: Atributo para obtener los tipos de datos
print(tipos_datos)`,
    blanks: [
      { id: 1, options: ["types", "dtype", "typeof", "dtypes"], correct: "dtypes" },
    ],
  },

  // ══════════════════════════════════════════════════════
  // SECCIÓN 2 — El Índice y su Uso (12 pts)
  // ══════════════════════════════════════════════════════

  {
    id: 7, section: 2, points: 2,
    topic: "Acceder al Índice",
    question: "Obtén el índice (las etiquetas de las filas) del DataFrame `df`.",
    code:
`import pandas as pd
data = {'A': [10, 20, 30]}
df = pd.DataFrame(data, index=['x', 'y', 'z'])
indice_df = df.[1] # Rellena: Atributo para acceder al índice
print(indice_df)`,
    blanks: [
      { id: 1, options: ["index", "rows", "indice", "labels"], correct: "index" },
    ],
  },

  {
    id: 8, section: 2, points: 2,
    topic: "Establecer Columna como Índice",
    question: "Usa la columna 'ID' como el nuevo índice del DataFrame `df`. (Crea un nuevo DataFrame o modifica inplace).",
    code:
`import pandas as pd
data = {'ID': [101, 102], 'Valor': [50, 60]}
df = pd.DataFrame(data)
df_con_indice = df.[1]('ID') # Rellena: Método para establecer una columna como índice
print(df_con_indice)`,
    blanks: [
      { id: 1, options: ["reset_index", "setIndex", "set_index", "index"], correct: "set_index" },
    ],
  },

  {
    id: 9, section: 2, points: 2,
    topic: "Resetear el Índice",
    question: "Convierte el índice actual del DataFrame `df_con_indice` de nuevo en una columna regular, restableciendo el índice numérico por defecto.",
    code:
`import pandas as pd
data = {'Valor': [50, 60]}
df_con_indice = pd.DataFrame(data, index=pd.Index([101, 102], name='ID')) # DF con índice 'ID'
df_reseteado = df_con_indice.[1]() # Rellena: Método para resetear el índice
print(df_reseteado)`,
    blanks: [
      { id: 1, options: ["drop_index", "reindex", "set_index", "reset_index"], correct: "reset_index" },
    ],
  },

  {
    id: 10, section: 2, points: 2,
    topic: "Selección por Etiqueta de Índice (.loc)",
    question: "Selecciona la fila cuya etiqueta de índice es 'y' usando el accesor `.loc`.",
    code:
`import pandas as pd
data = {'A': [10, 20, 30]}
df = pd.DataFrame(data, index=['x', 'y', 'z'])
fila_y = df.[1]['y'] # Rellena: Selección basada en etiqueta con .loc
print(fila_y)`,
    blanks: [
      { id: 1, options: ["iloc", "loc", "at", "get"], correct: "loc" },
    ],
  },

  {
    id: 11, section: 2, points: 2,
    topic: "Selección por Posición de Índice (.iloc)",
    question: "Selecciona la primera fila (posición 0) del DataFrame usando el accesor `.iloc`.",
    code:
`import pandas as pd
data = {'A': [10, 20, 30]}
df = pd.DataFrame(data, index=['x', 'y', 'z'])
primera_fila = df.[1][0] # Rellena: Selección basada en posición con .iloc
print(primera_fila)`,
    blanks: [
      { id: 1, options: ["iloc", "loc", "index", "get"], correct: "iloc" },
    ],
  },

  {
    id: 12, section: 2, points: 2,
    topic: "Reindexar DataFrame",
    question: "Crea un nuevo DataFrame `df_reindexado` conformando `df` a un nuevo índice ['w', 'x', 'y']. Rellena los valores faltantes con 0.",
    code:
`import pandas as pd
data = {'A': [10, 20]}
df = pd.DataFrame(data, index=['x', 'y'])
nuevo_indice = ['w', 'x', 'y']
df_reindexado = df.[1](nuevo_indice, fill_value=0) # Rellena: Método para reindexar
print(df_reindexado)`,
    blanks: [
      { id: 1, options: ["reset_index", "rename", "reindex", "set_index"], correct: "reindex" },
    ],
  },

  // ══════════════════════════════════════════════════════
  // SECCIÓN 3 — Operaciones Matemáticas y Estadísticas (16 pts)
  // ══════════════════════════════════════════════════════

  {
    id: 13, section: 3, points: 2,
    topic: "Seleccionar una Columna (Serie)",
    question: "Selecciona la columna 'Precio' del DataFrame `df` como un objeto Serie.",
    code:
`import pandas as pd
data = {'Producto': ['A', 'B'], 'Precio': [100, 150]}
df = pd.DataFrame(data)
serie_precio = df[1] # Rellena: Selección de la columna 'Precio'
print(type(serie_precio)) # Debería mostrar <class 'pandas.core.series.Series'>`,
    blanks: [
      { id: 1, options: [".Precio()", "['Precio']", "('Precio')", "{'Precio'}"], correct: "['Precio']" },
    ],
  },

  {
    id: 14, section: 3, points: 2,
    topic: "Operación Matemática en Columna",
    question: "Crea una nueva columna 'PrecioConIVA' calculando el 19% de IVA sobre la columna 'Precio'. (IVA = Precio * 0.19)",
    code:
`import pandas as pd
data = {'Producto': ['A', 'B'], 'Precio': [100, 200]}
df = pd.DataFrame(data)
df['PrecioConIVA'] = df['Precio'] + (df['Precio'] [1] 0.19) # Rellena: Operador de multiplicación
print(df)`,
    blanks: [
      { id: 1, options: ["**", "+", "*", "//"], correct: "*" },
    ],
  },

  {
    id: 15, section: 3, points: 2,
    topic: "Suma de una Columna",
    question: "Calcula la suma total de todos los valores en la columna 'Cantidad'.",
    code:
`import pandas as pd
data = {'Producto': ['A', 'B', 'C'], 'Cantidad': [10, 5, 8]}
df = pd.DataFrame(data)
total_cantidad = df['Cantidad'].[1]() # Rellena: Método para calcular la suma
print(total_cantidad) # Debería ser 23`,
    blanks: [
      { id: 1, options: ["sum", "total", "count", "add"], correct: "sum" },
    ],
  },

  {
    id: 16, section: 3, points: 2,
    topic: "Media de una Columna",
    question: "Calcula el valor promedio (media) de la columna 'Puntuacion'.",
    code:
`import pandas as pd
data = {'Examen': [1, 2, 3], 'Puntuacion': [80, 90, 70]}
df = pd.DataFrame(data)
media_puntuacion = df['Puntuacion'].[1]() # Rellena: Método para calcular la media
print(media_puntuacion) # Debería ser 80.0`,
    blanks: [
      { id: 1, options: ["average", "promedio", "mean", "avg"], correct: "mean" },
    ],
  },

  {
    id: 17, section: 3, points: 2,
    topic: "Valor Máximo en Columna",
    question: "Encuentra el valor máximo en la columna 'Temperatura'.",
    code:
`import pandas as pd
data = {'Dia': [1, 2, 3], 'Temperatura': [25, 28, 22]}
df = pd.DataFrame(data)
max_temp = df['Temperatura'].[1]() # Rellena: Método para encontrar el máximo
print(max_temp) # Debería ser 28`,
    blanks: [
      { id: 1, options: ["maximum", "top", "max_value", "max"], correct: "max" },
    ],
  },

  {
    id: 18, section: 3, points: 2,
    topic: "Estadísticas Descriptivas",
    question: "Genera un resumen de estadísticas descriptivas (conteo, media, std, min, max, etc.) para las columnas numéricas del DataFrame `df`.",
    code:
`import pandas as pd
data = {'A': [1, 2, 3, 4, 5], 'B': [10, 20, 30, 40, 50]}
df = pd.DataFrame(data)
estadisticas = df.[1]() # Rellena: Método para obtener estadísticas descriptivas
print(estadisticas)`,
    blanks: [
      { id: 1, options: ["info", "describe", "summary", "stats"], correct: "describe" },
    ],
  },

  {
    id: 19, section: 3, points: 2,
    topic: "Aplicar una Función",
    question: "Usa el método `.apply()` para aplicar una función lambda que duplique cada valor de la columna 'Valor'.",
    code:
`import pandas as pd
data = {'Valor': [10, 20, 30]}
df = pd.DataFrame(data)
df['ValorDuplicado'] = df['Valor'].[1](lambda x: x * 2) # Rellena: Método para aplicar una función
print(df)`,
    blanks: [
      { id: 1, options: ["apply", "lambda", "run", "execute"], correct: "apply" },
    ],
  },

  {
    id: 20, section: 3, points: 2,
    topic: "Conteo de Valores Únicos",
    question: "Cuenta cuántas veces aparece cada valor único en la columna 'Categoria'.",
    code:
`import pandas as pd
data = {'Categoria': ['A', 'B', 'A', 'C', 'B', 'A']}
df = pd.DataFrame(data)
conteo = df['Categoria'].[1]() # Rellena: Método para contar valores únicos
print(conteo)`,
    blanks: [
      { id: 1, options: ["unique", "count", "value_counts", "nunique"], correct: "value_counts" },
    ],
  },

  // ══════════════════════════════════════════════════════
  // SECCIÓN 4 — Generación de Gráficos (10 pts)
  // ══════════════════════════════════════════════════════

  {
    id: 21, section: 4, points: 2,
    topic: "Gráfico de Líneas desde Serie",
    question: "Genera un gráfico de líneas simple directamente desde la Serie `mi_serie`.",
    code:
`import pandas as pd
import matplotlib.pyplot as plt # Necesario para .show()
mi_serie = pd.Series([5, 8, 6, 10, 7])
mi_serie.[1]() # Rellena: Método para generar un gráfico
plt.show() # Muestra el gráfico`,
    blanks: [
      { id: 1, options: ["show", "draw", "plot", "graph"], correct: "plot" },
    ],
  },

  {
    id: 22, section: 4, points: 2,
    topic: "Gráfico de Líneas desde DataFrame",
    question: "Genera un gráfico de líneas usando el índice como eje X y cada columna numérica como una línea separada.",
    code:
`import pandas as pd
import matplotlib.pyplot as plt
data = {'Serie1': [10, 12, 15], 'Serie2': [8, 9, 7]}
df = pd.DataFrame(data, index=[2020, 2021, 2022])
df.[1]() # Rellena: Método para graficar el DataFrame
plt.show()`,
    blanks: [
      { id: 1, options: ["plot", "line", "chart", "show"], correct: "plot" },
    ],
  },

  {
    id: 23, section: 4, points: 3,
    topic: "Gráfico de Barras",
    question: "Genera un gráfico de barras a partir del DataFrame `df`, usando el índice como categorías.",
    code:
`import pandas as pd
import matplotlib.pyplot as plt
data = {'Ventas': [150, 220, 180]}
df = pd.DataFrame(data, index=['TiendaA', 'TiendaB', 'TiendaC'])
df.[1](kind='bar') # Rellena: Método plot especificando tipo 'bar'
plt.ylabel('Ventas')
plt.show()`,
    blanks: [
      { id: 1, options: ["bar", "graph", "draw", "plot"], correct: "plot" },
    ],
  },

  {
    id: 24, section: 4, points: 3,
    topic: "Histograma de una Columna",
    question: "Genera un histograma para visualizar la distribución de los valores en la columna 'Edad'.",
    code:
`import pandas as pd
import matplotlib.pyplot as plt
data = {'Edad': [22, 25, 30, 25, 40, 35, 30, 28, 22, 50]}
df = pd.DataFrame(data)
df['Edad'].[1](kind='hist', bins=5) # Rellena: Método plot especificando tipo 'hist'
plt.xlabel('Edad')
plt.show()`,
    blanks: [
      { id: 1, options: ["hist", "plot", "show", "chart"], correct: "plot" },
    ],
  },
];
