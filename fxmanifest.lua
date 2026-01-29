game 'gta5'
fx_version 'cerulean'

author 'dn 👑'
description 'a resource for bet in h2.bet.br within  game'

--ui_page 'ui/dist/index.html'
ui_page 'http://localhost:5173'

shared_script { '@vrp/lib/Utils.lua', 'core/shared/*.lua' }
server_script 'core/server/*.lua'
client_script 'core/client/*.lua'
nui_devtools 'false'
files {
    'ui/dist/index.html',
    'ui/dist/assets/**/*'
}