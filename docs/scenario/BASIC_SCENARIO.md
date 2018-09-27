# Exemplo de uso
Aqui será apresentado um exemplo básico de uso do AIT Middleware.

## 1. Requisitos do ambiente
Para os testes será necessário:

1. Dois navegadores Mozilla Firefox em duas máquinas distintas. Tanto faz
   físicas ou virtuais, o importante é os navegadores estarem em máquinas distintas.
2. Ter pelo menos dois dipositivos cadastrados.
3. Ter pelo menos uma preferência que envolve dois dispositivos.
4. Associar os navegadores aos dispositivos.
5. Se testes com o WebSocket serão feitos, então as máquinas também devem contar
   com o Java 8 instalado e seu IPs cadastrados.

## 2. Cadastrando um dispositivo
Para os testes iremos cadastrar dois dispositivos, um desktop e um laptop.

1. Abra o arquivo *browser-extension/preferences-page/devices.html* em um
   navegador.
2. Clique em **Add Device**.
3. Em **Device Type** escolha **Desktop PC**.
4. Em **Width** digite 1920.
5. Em **Height** digite 1080.
6. Deixe a *checkbox* **Battery** desmarcada. Em nosso cenário, um desktop
   está ligado diretamente na fonte de energia, ou seja, não depende de uma
   bateria.
7. Marque a *checkbox* **Keyboard**, já que ele possui um teclado acoplado.
8. Em **Location** escolha **Home Office**.
9. Clique em **Save Changes**

Cadastre mais um dispositivo, mas agora com os seguintes parâmetros: **Device
Type**=Laptop, **Width**=1366, **Height**=768, marque ambas as *checkbox*,
**Location**=Mobile.

Na tabela no topo da página deve ser possível visualizar os dispositivos,
cada um com um ID atribuído automaticamente. Vamos supor que para o Desktop o ID
atribuído foi **101** e para o Laptop o ID atribuído foi **202**.

> **Observação**: Podem ser cadastrados mais de um dispositivo para uma mesma
> localização.

## 3. Adicionando uma preferência
Para os testes iremos cadastrar uma preferência.

1. Abra o arquivo *browser-extension/preferences-page/preferences.html* em um
   navegador.
2. Clique em **Add Preference**.
3. Em **Application ID** digite `github.com`.
4. Em **Location** escolha **Home Office**.
5. Em **Device Type** escolha **Desktop PC**.
6. Clique em **Save Changes**.

Na tabela **User Preferences** a preferência recém cadastrada deve aparecer, o
valor em **Application ID** deve ser *github.com* e os valores em **Preference**
devem estar relacionados a *Home Office*.

1. Clique em **Edit** na preferência recém cadastrada.
2. Em **Location** escolha **Mobile**.
3. Em **Device Type** escolha **Laptop**.
4. Clique em **Save Changes**

Confira as mudanças que ocoreram na preferência.

A preferência agora significa:
```
"Quando estiver utilizando a aplicação github.com em 'Home Office',
prefiro utilizar um Desktop PC."
"Quando estiver em movimento e utilizando a aplicação github.com,
prefiro utilizar um Laptop."
```

Também é possível determinar arbitrariamente o dispositivo a ser utilizado.
Para isso, basta colocar o ID do dispositivo no campo **Device ID** no momento
de cadastro ou edição de uma preferência.

## 4. Associando um navegador a um dispositivo
Na atual implementação do AIT Middleware é necessário associar manualmente um
navegador a um dispositivo. Para isso, após adicionar a extensão ao navegador
e após cadastrar um dispositivo:

1. Clique no botão que foi adicionado a barra de ferramentas do navegador no
   momento em que a extensão foi adicionada.
2. Em **Device ID** digite um dos IDs dos dispositivos cadastrados, por exemplo,
   101.
3. Clique em **Set ID**.

Faça o mesmo para outros dispositivos em outros navegadores.

## 5. (Opcional) Iniciando o servidor WebSocket
Certifique-se de que o Java 8 está instalado nas máquinas de teste.

### 5.1 Adaptando o código fonte
Na atual implementação do AIT Middleware é possível utilizar mais de um
mecanismo de transferência, mas não é possível utilizar mais de um ao mesmo tempo. Também não é possível fazer
essa escolha em tempo de execução.

Assim, atualmente, a escolha do mecanismo de transferência e feita adaptando o
código do middleware e fazendo um *reload* da extensão no navegador.

Para mudar o mecanismo de transferência de um serviço em nuvem para *websocket*,
siga os passos:

1. Abra o arquivo *browser-extension/extensio-scripts/firebase-client.js* em um
   editor de texto ou código.
2. Comente o código da linha 51 a 67.
3. Descomente o código da linha 69 a 94.
4. Abra o arquivo *browser-extension/extensio-scripts/ait-middleware.js* em um
   editor de texto ou código.
5. Descomente a linha 169.

### 5.2 Iniciando o servidor

1. Abra um terminal (prompt) de comando.
2. Vá até a pasta *ait-middleware/java-8-websocket-server*.
3. Digite o comando `java -jar AitWebSocketProxy.jar`

Observe as linhas de log que são escritas na tela.
Esse processo será necessário em todas as máquinas que fazem parte do teste.

## 6. Disparando um *handoff*
