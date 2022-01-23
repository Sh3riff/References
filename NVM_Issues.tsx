nvm unalias default

UNINSTALL

nvm deactivate
nvm unload
"CLEAR .zshrc of"
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm
vim ~/.zshrc
i (insert mode)
esc (escape)
:w + enter (save)
:x + enter (save & quit)
