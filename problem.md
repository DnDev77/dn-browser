O problema é que o Cloudflare Turnstile (o captcha invisível ou com checkbox) detecta o ambiente do FiveM como suspeito e bloqueia o login.

Por quê isso acontece:

- O FiveM usa um navegador embutido chamado CEF (uma versão antiga e modificada do Chrome).
- Esse navegador não tem todas as funções que um Chrome normal tem.
- O Cloudflare verifica coisas como: versão do navegador, movimentos do mouse, etc.
- Quando vê que é um navegador "embutido" e não um browser real, ele considera risco (como se fosse um robô) e falha no teste de confiança.

O que não adianta:

- Tirar o sandbox do iframe
- Usar proxy reverso
- Mudar headers ou allow
