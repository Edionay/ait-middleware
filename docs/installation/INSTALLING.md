# Instalando o AIT Middleware
Aqui são encontrados os passos para instalar o AIT Middleware e deixá-lo
pronto para testes.

# 1. Instalando pré-requisitos

## 1.1 Mozilla Firefox
Siga os passos nos links abaixo para instalar o navegador Mozilla Firefox.

**Linux**:

Via PPA: https://sempreupdate.com.br/como-instalar-firefox-ubuntu-linux-min/

Manualmente: https://www.edivaldobrito.com.br/firefox-no-linux-manualmente/


**Windows**: https://support.mozilla.org/pt-BR/kb/como-baixar-e-instalar-firefox-windows

**MAC**: https://support.mozilla.org/pt-BR/kb/como-baixar-e-instalar-firefox-mac

## 1.2 Java
**Observação**: O Java é necessário para executar o servidor WebSocket, que é
um dos possíveis mecanismos de transferência utilizado pelo AIT Middleware.
Se não tem a intenção de utilizar o servidor WebSocket, então esse passo é
opcional.

**Linux e Windows**: https://www.devmedia.com.br/instalacao-e-configuracao-do-pacote-java-jdk/23749

**MAC**: https://www.java.com/pt_BR/download/help/mac_install.xml

## 2. Download do código fonte
Faça um clone do código no repositório GitHub:
```shell
git clone https://github.com/vinicius-lima/ait-middleware.git
```
Para utilizar essa opção é necessário ter o utilitário do Git instalado em sua
máquina. Confira esse [link](https://git-scm.com/book/pt-br/v1/Primeiros-passos-Instalando-Git)
para mais informações.
****
Ou se preferir acesse a [página principal](https://github.com/vinicius-lima/ait-middleware)
do repositório no GitHub e baixe o arquivo compactado e o descompacte.

## 3. Criando uma conta no Firebase
O Firebase é um serviço oferecido pela Google. Para criar uma conta no Firebase
basta ter uma conta do GMail.

Acesse a página do [Firebase](https://firebase.google.com/?hl=pt-br) para
acessar o painel de controle.

### 3.1 - Criando um projeto
Para adicionar o Firebase ao seu app, são necessários um projeto do Firebase e
um pequeno snippet de código de inicialização com alguns detalhes sobre seu
projeto.

1. Crie um projeto do Firebase no [Console do Firebase](https://console.firebase.google.com/?authuser=0).
    - Se você não tiver um projeto do Firebase, clique em **Adicionar projeto**
    e insira um nome de projeto existente do Google Cloud Platform ou um novo nome.
    - Se você tiver um projeto do Firebase que gostaria de usar, selecione-o no
    Console do Firebase.
2. Na página de visão geral do projeto no [Console do Firebase](https://console.firebase.google.com/?authuser=0),
   clique em **Adicionar o Firebase ao seu aplicativo da Web**. Se o projeto já
   tiver um aplicativo, selecione **Adicionar app** na página de visão geral do
   projeto.
3. Um snippet de código personalizado do seu projeto deve aparecer na tela.

> :star: **Observação**: caso o snippet não apareça na tela ou se precisar
recuperar o código de configuração novamente, acesse **Desenvolver** >
**Autenticação** no [Console do Firebase](https://console.firebase.google.com/?authuser=0)
e clique em **Configuração da Web**.

Abaixo está um exemplo de snippet de código de inicialização:
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

Informações extras podem ser encontradas no [link](https://firebase.google.com/docs/web/setup?authuser=0).

### 3.2 Inserindo as credenciais
Para o AIT Middleware a informação importante do snippet é variável *config*.
Logo, selecione e copie (CTRL+C) as linhas do snippet que contém os dados da variável
*config*.

No arquivo *browser-extension/extension-scripts/firebase-client.js*, selecione as linhas 2 a 9 e cole as informações
do projeto (CTRL+V).

## 4. Cadastro de dispositivos
TODO

## 5. Cadastro de preferências
TODO

## 6. Adicionado a extensão ao navegador
TODO

## 7. Testando
TODO
