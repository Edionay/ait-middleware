# Instalando o AIT Middleware
Aqui s�o encontrados os passos para instalar o AIT Middleware e deix�-lo
pronto para testes.

# 1. Instalando pr�-requisitos

## 1.1 Mozilla Firefox
Siga os passos nos links abaixo para instalar o navegador Mozilla Firefox.

**Linux**:

Via PPA: https://sempreupdate.com.br/como-instalar-firefox-ubuntu-linux-min/

Manualmente: https://www.edivaldobrito.com.br/firefox-no-linux-manualmente/


**Windows**: https://support.mozilla.org/pt-BR/kb/como-baixar-e-instalar-firefox-windows

**MAC**: https://support.mozilla.org/pt-BR/kb/como-baixar-e-instalar-firefox-mac

## 1.2 Java
**Observa��o**: O Java 8 � necess�rio para executar o servidor WebSocket, que �
um dos poss�veis mecanismos de transfer�ncia utilizado pelo AIT Middleware.
Se n�o tem a inten��o de utilizar o servidor WebSocket, ent�o esse passo �
opcional.

**Linux e Windows**: https://www.devmedia.com.br/instalacao-e-configuracao-do-pacote-java-jdk/23749

**MAC**: https://www.java.com/pt_BR/download/help/mac_install.xml

## 2. Download do c�digo fonte
Fa�a um clone do c�digo no reposit�rio GitHub:
```shell
git clone https://github.com/vinicius-lima/ait-middleware.git
```
Para utilizar essa op��o � necess�rio ter o utilit�rio do Git instalado em sua
m�quina. Confira esse [link](https://git-scm.com/book/pt-br/v1/Primeiros-passos-Instalando-Git)
para mais informa��es.
****
Ou se preferir acesse a [p�gina principal](https://github.com/vinicius-lima/ait-middleware)
do reposit�rio no GitHub e baixe o arquivo compactado e o descompacte.

## 3. Criando uma conta no Firebase
O Firebase � um servi�o oferecido pela Google. Para criar uma conta no Firebase
basta ter uma conta do GMail. O Firebase disp�e 1GB gratu�tos de armazenamento
e 10GB/m�s para downloads no banco de dados.

Acesse a p�gina do [Firebase](https://firebase.google.com/?hl=pt-br) para
acessar o painel de controle. Acesse [pricing](https://firebase.google.com/pricing/?authuser=0)
para conferir os pre�os e os limites do plano gratuito do Firebase.

### 3.1 Criando um projeto
Para adicionar o Firebase ao seu app, s�o necess�rios um projeto do Firebase e
um pequeno snippet de c�digo de inicializa��o com alguns detalhes sobre seu
projeto.

1. Crie um projeto do Firebase no [Console do Firebase](https://console.firebase.google.com/?authuser=0).
    - Se voc� n�o tiver um projeto do Firebase, clique em **Adicionar projeto**
    e insira um nome de projeto existente do Google Cloud Platform ou um novo nome.
    - Se voc� tiver um projeto do Firebase que gostaria de usar, selecione-o no
    Console do Firebase.
2. Na p�gina de vis�o geral do projeto no [Console do Firebase](https://console.firebase.google.com/?authuser=0),
   clique em **Adicionar o Firebase ao seu aplicativo da Web**. Se o projeto j�
   tiver um aplicativo, selecione **Adicionar app** na p�gina de vis�o geral do
   projeto.
3. Um snippet de c�digo personalizado do seu projeto deve aparecer na tela.

> :star: **Observa��o**: caso o snippet n�o apare�a na tela ou se precisar
recuperar o c�digo de configura��o novamente, acesse **Desenvolver** >
**Autentica��o** no [Console do Firebase](https://console.firebase.google.com/?authuser=0)
e clique em **Configura��o da Web**.

Abaixo est� um exemplo de snippet de c�digo de inicializa��o:
```html
<script src="https://www.gstatic.com/firebasejs/5.4.1/firebase.js"></script>
<script>
  // Initialize Firebase
  // TODO: Replace with your project's customized code snippet
  var config = {
    apiKey: "<API_KEY>",
    authDomain: "<PROJECT_ID>.firebaseapp.com",
    databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
    projectId: "<PROJECT_ID>",
    storageBucket: "<BUCKET>.appspot.com",
    messagingSenderId: "<SENDER_ID>",
  };
  firebase.initializeApp(config);
</script>
```

Informa��es extras podem ser encontradas no [link](https://firebase.google.com/docs/web/setup?authuser=0).

### 3.2 Inserindo as credenciais
Para o AIT Middleware a informa��o importante do snippet � vari�vel *config*.
Logo, selecione e copie (CTRL+C) as linhas do snippet que cont�m os dados da vari�vel
*config*.

No arquivo *browser-extension/extension-scripts/firebase-client.js*, selecione as linhas 2 a 9 e cole as informa��es
do projeto (CTRL+V).

## 4. Cadastro de dispositivos
Na vari�vel *config* do snippet h� o atributo
`databaseURL:"https://<DATABASE_NAME>.firebaseio.com"`.
Copie o valor que substitue `<DATABASE_NAME>`, ou seja, que est� entre as
duas barras e `.firebaseio.com"`, por exemplo `fiery-inferno-5050`

Abra o arquivo *browser-extension/preferences-page/devicesModule.js* em um editor
de texto ou de c�digo. Nas linha 8 e 17, substitua `<DATABASE_NAME>` pelo
valor que copiou no passo imediatamente anterior.

Abra o arquivo *browser-extension/preferences-page/devices.html* em um navegador.
Para adicionar um dispositivo clique em **Add Device**. Preencha o formul�rio e
clique em **Save Changes**. O dispositivo rec�m cadastrado deve aparecer na tabela
no topo da p�gina.

Acesse o banco de dados do projeto no [Console do Firebase](https://console.firebase.google.com/?authuser=0)
para acompanhar as mudan�as.

## 5. Cadastro de prefer�ncias
Na vari�vel *config* do snippet h� o atributo
`databaseURL:"https://<DATABASE_NAME>.firebaseio.com"`.
Copie o valor que substitue `<DATABASE_NAME>`, ou seja, que est� entre as
duas barras e `.firebaseio.com"`, por exemplo `fiery-inferno-5050`

Abra o arquivo *browser-extension/preferences-page/preferencesModule.js* em um editor
de texto ou de c�digo. Nas linha 9, 18 e 27, substitua `<DATABASE_NAME>` pelo
valor que copiou no passo imediatamente anterior.

Abra o arquivo *browser-extension/preferences-page/preferences.html* em um navegador.
Para adicionar uma prefer�ncia clique em **Add Preference**. Preencha o formul�rio e
clique em **Save Changes**. A prefer�ncia rec�m cadastrada deve aparecer na tabela
no topo da p�gina.

Acesse o banco de dados do projeto no [Console do Firebase](https://console.firebase.google.com/?authuser=0)
para acompanhar as mudan�as.


## 6. Adicionado a extens�o ao navegador
Abra o navegador Mozilla Firefox. No campo onde se digita as URLs para navega��o
digite `about:debugging`. Na p�gina que � apresentada, habilite o debug
marcando a caixa **Enable add-on debugging**.

Clique no bot�o **Load Temporary Add-on** e escolha o arquivo
*browser-extension/manifest.json*. A extens�o deve ser listada como instalada
temporariamente e um menu deve ser adicionado a barra de ferramentas.

O �cone do menu � ![popup icon](img/toolbar-icon.png)

> **Nota**: Como a extens�o foi adicionada no modo de debugging, ela
> ser� desinstalada toda vez que o navegador for fechado. Logo, esse passo para
> adcionar a extens�o ao navegador deve ser realizado todas as vezes que o
> navegador for aberto.

Mais informa��es podem ser encontradas no [link](https://developer.mozilla.org/pt-BR/docs/Tools/about:debugging#Enabling_add-on_debugging#Connecting_the_Add-on_Debugger)


## 7. Pr�ximos passos
Fa�a um teste da extens�o para saber se est� funcionando. Um exemplo b�sico de
teste pode ser conferido no seguinte [documento](../scenario/BASIC_SCENARIO.md).

