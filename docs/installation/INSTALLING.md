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
**Observa��o**: O Java � necess�rio para executar o servidor WebSocket, que �
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
basta ter uma conta do GMail.

Acesse a p�gina do [Firebase](https://firebase.google.com/?hl=pt-br) para
acessar o painel de controle.

### 3.1 - Criando um projeto
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
TODO

## 5. Cadastro de prefer�ncias
TODO

## 6. Adicionado a extens�o ao navegador
TODO

## 7. Testando
TODO
