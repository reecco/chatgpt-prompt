PATH_USER="/home/$USER";

if [ -d "$PATH_USER/chatgpt" ]; then
  rm -rf $PATH_USER/chatgpt;
fi

mkdir $PATH_USER/chatgpt;

file="script.txt";

if [ ! -f "$PATH_USER/chatgpt/index.sh" ]; then
  while IFS= read -r line || [[ -n "$line" ]]; do
    echo "$line" >> $PATH_USER/chatgpt/index.sh;
  done < "$file"
fi

chmod +x "$PATH_USER/chatgpt/index.sh";

echo -e "Script instalado com sucesso.\nPara executá-lo, digite ./index.sh na raiz do diretório.";