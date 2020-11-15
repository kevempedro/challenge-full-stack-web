# Arquitetura
A arqutetura utilizada foi a MVC (Model, View, Controller), já que o back-end por ser simples, não exige uma outra arquitetura tão robusta.

# Bibliotecas utilizadas

- **Express:** Para o desenvolvimento da API.
- **body-parser:** Analise o corpo das requisições recebidas em um middleware antes de seus manipuladores, disponível na propriedade req.body.
- **cors:** É um pacote node.js para fornecer um middleware Connect / Express que pode ser usado para habilitar CORS com várias opções.
- **helmet:** Ajuda a proteger seus aplicativos Express definindo vários cabeçalhos HTTP.
- **dotenv:** Utilizada para usar as variáveis de ambiente no projeto.
- **nodemon:** Utilizado durante o desenvolvimento para obeservar qualquer reação alteração no código.
- **pg:** Drive do postgres, banco de dados utilizado na aplicação.
- **sequelize:** ORM utilizado no desenvolvimento da aplicação.
- *seuqelize-cli:** Utilizado para rodar os comandos squelize para gerar a tabela e a migrations.

**Observação:** Foram utilizadas outras bibliotecas para se usar a versão mais recente do ECMASCRIPT, as bibliotecas são: babel-cli e babel-preset-env.

# O que faria diferente?

Tentei fazer a melhor arquitetura e esturtura do projeto possível com o tempo que tive e o conhecimento que possuo, caso fosse um projeto real, o que faria
a mais seria colocar um padrão no projeto como um eslint, para padronizar o mesmo.

# Requisitos

Creio que todos os requisitos propostos para a parte do back-end foram atendidas de acordo com o que foi requisitado.
