# Teste para candidatos à vaga de Desenvolvedor Pleno.
Olá caro desenvolvedor, nesse teste analisaremos seu conhecimento geral e inclusive velocidade de desenvolvimento. Abaixo explicaremos tudo o que será necessário.


#### Introdução ao Projeto de Sistema de Agendamento Médico


Bem-vindo ao desafio de desenvolvimento da __TUYETOMAKER__! Estamos em busca de um desenvolvedor com experiência sólida em __Node.js__, boas práticas de código, padronização, familiaridade com o ecossistema __React__, e que compreenda o processo completo de modelagem de banco de dados, desde o __modelo conceitual até o físico__. 


![](./web.png)
>Neste projeto, você será responsável por desenvolver um sistema completo de agendamento médico. O sistema será dividido em duas partes: uma aplicação mobile, voltada para o uso de pacientes, e uma aplicação web, para o hospital e médicos gerenciarem os agendamentos e horários.
________________
#### Objetivo
>O sistema tem como objetivo permitir que pacientes agendem consultas médicas de forma rápida e eficiente, enquanto os hospitais e médicos podem gerenciar esses agendamentos com praticidade. A parte do paciente será desenvolvida em React Native para dispositivos móveis, e a parte administrativa, voltada ao hospital, será uma aplicação web desenvolvida com React.js.
______________
#### Suas Responsabilidades
> - Você será responsável por desenvolver tanto o front-end quanto o back-end da aplicação. O seu foco estará em garantir que o sistema seja eficiente, seguro, escalável e fácil de usar. Isso inclui:

>- Criar interfaces de usuário intuitivas e responsivas para pacientes e administradores.

>- Desenvolver APIs robustas em Node.js para gerenciar a autenticação, médicos, agendamentos e notificações.

>- Modelar o banco de dados de maneira eficiente, levando em consideração as melhores práticas de desempenho e integridade dos dados.

>- Implementar boas práticas de código, utilizando princípios de arquitetura de software como SOLID e Service Pattern.
_________________

#### Expectativas Técnicas
- Mobile (React Native): O paciente poderá se cadastrar, fazer login, visualizar médicos, agendar e acompanhar suas consultas.
- Web (React.js): O hospital poderá gerenciar médicos, horários e confirmar ou cancelar agendamentos.
- Back-End (Node.js): Implementar uma API que conecte os dois sistemas (mobile e web), garantindo a comunicação segura e a integridade dos dados no banco de dados relacional.
___________________
### Layout No figma
Sinta-se avontade em reajustar essa [ui](https://www.figma.com/design/HX6VyFLrL8bWiZW1NNrahN/Agendei(Tuyetomaker-test)?node-id=0-1&node-type=canvas&t=ovrCj3bigRJgMGK5-0).



## 2. Requisitos do Sistema
__Mobile (React Native) - Parte do Paciente__

1.  Autenticação e Cadastro:
    - Login com validação JWT.
    - Cadastro de novas contas para pacientes com validação de email e senha.

1. Dashboard de Agendamentos:

    - Exibir agendamentos futuros e passados do paciente.
    - Filtrar por datas, especialidades ou médicos.

1. Agendar Consulta:
    - Seleção de médicos disponíveis.
    - Seleção de datas e horários disponíveis.
    - Confirmação do agendamento com opção de cancelamento.

1. Notificações:
    - Notificações sobre consultas agendadas, próximas ou canceladas.

1- Perfil do Usuário:
    - Gerenciamento de dados pessoais.
    - Alteração de senha e informações de contato.
__________________________________________

__Web (React.js) - Parte do Hospital__

1. Autenticação e Controle de Acesso:
    - Login de médicos e administradores com roles (funções) diferentes.
    - Sistema de permissões para gerenciar acesso aos módulos.

1. Dashboard Administrativo:
    - Visualização geral dos agendamentos futuros e consultas realizadas.
    - Filtrar consultas por status (pendente, confirmada, cancelada).

1. Gerenciamento de Médicos:
    - CRUD completo para adicionar, editar e remover médicos.
    - Associe médicos a horários disponíveis e especialidades.

1. Gerenciamento de Agendamentos:
    - Visualizar agendamentos feitos pelos pacientes.
    - Confirmar, cancelar ou reagendar consultas.
    - Visualizar histórico de agendamentos de cada paciente.

1. Relatórios:

    - Gerar relatórios de consultas realizadas, canceladas e pendentes.
_____________________________________
#### 2.2 Requisitos do Back-End (Node.js com Express)
1. Diagramas
    - Criar diagrama entidade relacinal e o modelo lógico.
    - Criar diagrama de class com 5 classes no mínimo.

1. Autenticação e Autorização:
    - Implementar JWT para autenticação de pacientes e staff hospitalar.
    - Middleware para verificar permissões de usuários.

__Exemplo de modelagem de dados usando modelo entidade relacional__
- __*Paciente*__: nome, email, senha, telefone, data de nascimento. 
- __*Médico*__: nome, especialidade, horários disponíveis.
- __*Agendamento*__: id do paciente, id do médico, data/hora, status (pendente, confirmado, cancelado).
___________________________________________
__API RESTful:__
1. Autenticação:
    - Endpoint para login (retorna token JWT).
    - Endpoint para cadastro de pacientes.
1. Gerenciamento de Agendamentos:
    - Endpoint para listar médicos e horários disponíveis.
    - Endpoint para criar, visualizar, atualizar e excluir agendamentos.
    - Endpoint para visualizar histórico de agendamentos por paciente.

1. Gerenciamento de Médicos:
    - Endpoint para CRUD de médicos.
    - Endpoint para associar médicos a especialidades e horários.

1. Banco de Dados:
    - Modelagem conceitual com relacionamentos entre Paciente, Médico e Agendamento.
    - Implementação no banco de dados relacional (MySQL ou PostgreSQL).

1. Notificações:
    - Notificações push para pacientes sobre consultas agendadas ou canceladas.

1. Validação e Tratamento de Erros:
    -Implementar middleware para validação de entradas de dados e tratamento de erros.
_________________________________

##### Padrões de Código e Boas Práticas
1. Front-End:
    - Usar hooks e componentes funcionais no React.
    - Manter uma estrutura organizada com pastas para components, services, e assets.
    - Gerenciar estado com Redux ou Context API.
    - Usar TypeScript para tipagem.
1. Back-End:
    - Usar arquitetura baseada em serviços (Service Pattern).
    - Seguir o padrão MVC (Model-View-Controller) para organização do código.
    - Aplicar princípios SOLID no código.
    - Utilizar TypeScript para segurança de tipos.
    - Documentar a API com Swagger ou outra ferramenta de documentação.
______________________

### Entrega

Para iniciar o teste, faça um fork deste repositório, crie uma branch com o seu nome completo e depois envie-nos o pull request. Se você apenas clonar o repositório não vai conseguir fazer push e depois vai ser mais complicado fazer o pull request.
_____________________

### Nossa análise

- Organização do código, separação de módulos, legibilidade e comentários.
- Tempo de entrega de um produto.
- Histórico de commits.
- Originalidade das inter-face
________________
##### Boa Sorte!