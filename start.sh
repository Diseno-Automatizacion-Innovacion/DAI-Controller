#!/bin/bash
cd /app/

# Realiza un fetch para obtener la información sobre el estado
git fetch

# Verifica el estado de la rama actual
status=$(git status)

# Inicializa la variable que almacenará la cantidad de commits por detrás
commits_behind=0

# Busca el patrón específico en la salida de git status y extrae el número de commits
if [[ $status == *"Your branch is behind"* ]]; then
  # Utiliza un patrón de expresión regular para extraer el número de commits
  if [[ $status =~ "Your branch is behind '.*' by ([0-9]+) commit" ]]; then
    commits_behind="${BASH_REMATCH[1]}"
  fi
  echo "$commits_behind updates available"

  echo "Downloading updates" 
  git pull > /dev/null

  echo "Updating dependencies"
  npm i > /dev/null

  echo "Building changes"
  npm run build > /dev/null

else
  echo "Up to date"
fi

npm run start