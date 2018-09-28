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
3. Em **Application ID** digite `github.com`
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
Para utilizar o *websocket*, as máquinas devem estar na mesma rede local e o
Java 8 deve estar instalado.

### 5.1 Adaptando o código fonte
A atual implementação do AIT Middleware suporta mais de um mecanismo de
transferência, mas não é possível utilizar mais de um ao mesmo tempo.
Também não é possível escolher o mecanismo de transferência em tempo de execução.

Assim, atualmente, a escolha do mecanismo de transferência é feita adaptando o
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

### 5.3 Cadastrando os IPs dos dispositivos
Esse passo é necessário apenas se *websocket* for escolhido como mecanismo de
transferência.

Suponha que para o dispositivo de ID 101, Desktop PC, o IP seja 10.16.0.101.
Suponha que para o dispositivo de ID 202, Laptop, o IP seja 10.16.0.202.

Abra um terminal (prompt) de comando e utilize o seguinte comando:

```
curl -X PUT -d '[
  {"id": 101, "ip": "10.16.0.101"},
  {"id": 202, "ip": "10.16.0.202"}
]' 'https://<DATABASE_NAME>.firebaseio.com/aitmiddleware/browser-extension/ips.json'
```

Onde **<DATABASE_NAME>** é o mesmo parâmetro utilizado na sessão 4 do [tutorial
de instalação](../installation/INSTALLING.md).

## 6. Disparando um *handoff*
Nesse teste realizaremos o *handoff* da aplicação *github.com*. O teste não
é restrito pelo mecanismo de transferência escolhido, mas tenha certeza de que
o mecanismo de transferência está configurado corretamente.

1. Vá ao navegador associado ao ID 101.
2. Digite a URL *github.com*, precione enter e espere a página carregar.
3. (Opcional) Caso possua uma conta no GitHub, faça o login.
4. Clique no menu do AIT Middleware na barra de ferramentas do navegador.
5. Em **Select your current location!**, escolha **Mobile** e então clique em
   **Handoff**.

Se tudo ocorreu bem, a página do GitHub deve desaparecer do navegador anterior
e aparecer no navegador associado ao ID 202.

## 7. Próximos passos

Cadastre novos disitivos. Para testar os novos dispositivos cadastrados basta
mudar os ID associados aos navegadores ou criar novas máquinas com os navegadores
instalados.

Teste com outras aplicações Web, por exemplo, *facebook.com*. Lembre-se de
cadastrar preferências para essas aplicações.
