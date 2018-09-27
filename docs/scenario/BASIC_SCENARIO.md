# Exemplo de uso
Aqui ser� apresentado um exemplo b�sico de uso do AIT Middleware.

## 1. Requisitos do ambiente
Para os testes ser� necess�rio:

1. Dois navegadores Mozilla Firefox em duas m�quinas distintas. Tanto faz
   f�sicas ou virtuais, o importante � os navegadores estarem em m�quinas distintas.
2. Ter pelo menos dois dipositivos cadastrados.
3. Ter pelo menos uma prefer�ncia que envolve dois dispositivos.
4. Associar os navegadores aos dispositivos.
5. Se testes com o WebSocket ser�o feitos, ent�o as m�quinas tamb�m devem contar
   com o Java 8 instalado e seu IPs cadastrados.

## 2. Cadastrando um dispositivo
Para os testes iremos cadastrar dois dispositivos, um desktop e um laptop.

1. Abra o arquivo *browser-extension/preferences-page/devices.html* em um
   navegador.
2. Clique em **Add Device**.
3. Em **Device Type** escolha **Desktop PC**.
4. Em **Width** digite 1920.
5. Em **Height** digite 1080.
6. Deixe a *checkbox* **Battery** desmarcada. Em nosso cen�rio, um desktop
   est� ligado diretamente na fonte de energia, ou seja, n�o depende de uma
   bateria.
7. Marque a *checkbox* **Keyboard**, j� que ele possui um teclado acoplado.
8. Em **Location** escolha **Home Office**.
9. Clique em **Save Changes**

Cadastre mais um dispositivo, mas agora com os seguintes par�metros: **Device
Type**=Laptop, **Width**=1366, **Height**=768, marque ambas as *checkbox*,
**Location**=Mobile.

Na tabela no topo da p�gina deve ser poss�vel visualizar os dispositivos,
cada um com um ID atribu�do automaticamente. Vamos supor que para o Desktop o ID
atribu�do foi **101** e para o Laptop o ID atribu�do foi **202**.

> **Observa��o**: Podem ser cadastrados mais de um dispositivo para uma mesma
> localiza��o.

## 3. Adicionando uma prefer�ncia
Para os testes iremos cadastrar uma prefer�ncia.

1. Abra o arquivo *browser-extension/preferences-page/preferences.html* em um
   navegador.
2. Clique em **Add Preference**.
3. Em **Application ID** digite `github.com`.
4. Em **Location** escolha **Home Office**.
5. Em **Device Type** escolha **Desktop PC**.
6. Clique em **Save Changes**.

Na tabela **User Preferences** a prefer�ncia rec�m cadastrada deve aparecer, o
valor em **Application ID** deve ser *github.com* e os valores em **Preference**
devem estar relacionados a *Home Office*.

1. Clique em **Edit** na prefer�ncia rec�m cadastrada.
2. Em **Location** escolha **Mobile**.
3. Em **Device Type** escolha **Laptop**.
4. Clique em **Save Changes**

Confira as mudan�as que ocoreram na prefer�ncia.

A prefer�ncia agora significa:
```
"Quando estiver utilizando a aplica��o github.com em 'Home Office',
prefiro utilizar um Desktop PC."
"Quando estiver em movimento e utilizando a aplica��o github.com,
prefiro utilizar um Laptop."
```

Tamb�m � poss�vel determinar arbitrariamente o dispositivo a ser utilizado.
Para isso, basta colocar o ID do dispositivo no campo **Device ID** no momento
de cadastro ou edi��o de uma prefer�ncia.

## 4. Associando um navegador a um dispositivo
Na atual implementa��o do AIT Middleware � necess�rio associar manualmente um
navegador a um dispositivo. Para isso, ap�s adicionar a extens�o ao navegador
e ap�s cadastrar um dispositivo:

1. Clique no bot�o que foi adicionado a barra de ferramentas do navegador no
   momento em que a extens�o foi adicionada.
2. Em **Device ID** digite um dos IDs dos dispositivos cadastrados, por exemplo,
   101.
3. Clique em **Set ID**.

Fa�a o mesmo para outros dispositivos em outros navegadores.

## 5. (Opcional) Iniciando o servidor WebSocket
Certifique-se de que o Java 8 est� instalado nas m�quinas de teste.

### 5.1 Adaptando o c�digo fonte
Na atual implementa��o do AIT Middleware � poss�vel utilizar mais de um
mecanismo de transfer�ncia, mas n�o � poss�vel utilizar mais de um ao mesmo tempo. Tamb�m n�o � poss�vel fazer
essa escolha em tempo de execu��o.

Assim, atualmente, a escolha do mecanismo de transfer�ncia e feita adaptando o
c�digo do middleware e fazendo um *reload* da extens�o no navegador.

Para mudar o mecanismo de transfer�ncia de um servi�o em nuvem para *websocket*,
siga os passos:

1. Abra o arquivo *browser-extension/extensio-scripts/firebase-client.js* em um
   editor de texto ou c�digo.
2. Comente o c�digo da linha 51 a 67.
3. Descomente o c�digo da linha 69 a 94.
4. Abra o arquivo *browser-extension/extensio-scripts/ait-middleware.js* em um
   editor de texto ou c�digo.
5. Descomente a linha 169.

### 5.2 Iniciando o servidor

1. Abra um terminal (prompt) de comando.
2. V� at� a pasta *ait-middleware/java-8-websocket-server*.
3. Digite o comando `java -jar AitWebSocketProxy.jar`

Observe as linhas de log que s�o escritas na tela.
Esse processo ser� necess�rio em todas as m�quinas que fazem parte do teste.

## 6. Disparando um *handoff*
