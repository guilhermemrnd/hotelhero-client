# HotelHero: Plataforma de Reservas de Hotéis

Bem-vindo ao **HotelHero**, uma plataforma de reservas de hotéis centrada no usuário, projetada para atender tanto aos viajantes quanto aos proprietários de hotéis. Desenvolvido com paixão e atenção aos detalhes, este projeto não apenas apresenta as características de uma plataforma de reserva típica, mas também as decisões técnicas, desafios e aprendizados por trás de seu desenvolvimento. Experimente a aplicação ao vivo [aqui](https://hotelhero.vercel.app/).

## Índice
- [Desafios Enfrentados](#desafios-enfrentados)
- [O Que Aprendi](#o-que-aprendi)
- [Melhorias Futuras](#melhorias-futuras)

## Desafios Enfrentados
- **Seleção de Framework:** Um dos primeiros desafios foi escolher o framework frontend adequado. Enquanto Vue.js era um território desconhecido, React.js, apesar de performático, parecia menos organizado para a escala que eu imaginava para o HotelHero. No final, optei pelo Angular, valorizando sua estrutura e escalabilidade, mesmo com uma pequena compensação no desempenho.

- **Gerenciamento de Estado com NGXS:** A aplicação exigia um gerenciamento de estado consistente em várias páginas, especialmente para recursos como o formulário de busca de hotéis, estado de autenticação e detalhes da reserva. Usar armazenamento do navegador ou parâmetros de URL para informações sensíveis não era uma opção. NGXS foi escolhido em vez de NgRx por sua simplicidade, garantindo que estados como o estado de autenticação pudessem ditar ações da barra de navegação e que os detalhes da reserva permanecessem seguros.

- **Autenticação JWT:** Para garantir a segurança dos dados do usuário, implementei a autenticação JWT via cookies. Esta abordagem foi escolhida para equilibrar segurança e experiência do usuário, eliminando a necessidade de atualizações frequentes de tokens ou dependência de tokens rolante, dadas as exigências de segurança da aplicação.

- **Estratégia de Deploy:** O deploy do frontend na Vercel envolveu a integração com o GitHub Actions. Isso não apenas acelerou o processo de deploy, mas também garantiu um pipeline simplificada onde testes unitários e automatizados eram executados usando Karma antes do deploy.

- **Integração Backend:** O plano inicial era aproveitar uma API pública para dados reais de hotéis. No entanto, limitações com APIs públicas disponíveis levaram à decisão de criar um backend personalizado. Este backend atenderia especificamente às necessidades do frontend, conectaria a um banco de dados armazenando dados obtidos da API externa (eliminando buscas redundantes de dados) e lidaria com segredos da API de forma mais segura.

- **Design do Banco de Dados:** O banco de dados foi projetado para ser minimalista, armazenando apenas os dados essenciais exigidos pelo frontend. A ênfase foi colocada na estruturação eficaz das relações. Para uma visão detalhada do esquema do banco de dados e das colunas da tabela, consulte o README do repositório do backend.

## O Que Aprendi
- **Habilidades de Design Frontend:** Antes deste projeto, eu tinha receios sobre minha proficiência em HTML e CSS, especialmente quando se tratava de replicar designs. No entanto, ao implementar o design com base em um template da [Visily](https://www.visily.ai/), fiquei agradavelmente surpreso com minha capacidade de dar vida ao design, aumentando minha confiança no desenvolvimento frontend.

- **Integração de API com Observables:** Embora eu já tivesse experiência anterior com integração de APIs usando promises, este projeto foi um mergulho exclusivo no mundo dos Observables usando a biblioteca Rxjs. A mudança me tornou mais hábil e confortável com essa abordagem de programação reativa.

- **Estrutura do Projeto e Autenticação:** Minha experiência profissional inicial me fez mergulhar em um projeto em andamento, deixando-me com exposição limitada a decisões fundamentais como estruturação de projeto e mecanismos de autenticação. Com o HotelHero, tive a oportunidade de arquitetar o projeto desde o início e aprofundar-me na autenticação. Aproveitar os robustos recursos do Angular, como Route Guards, Interceptors e manipulação de JWT com cookies, foi uma experiência esclarecedora.

- **Gerenciamento de Estado:** No passado, eu frequentemente recorria ao uso de propriedades nos serviços para compartilhar dados entre componentes, o que não está de acordo com o princípio de *stateless service*. A introdução às ferramentas de gerenciamento de estado neste projeto foi transformadora. Não apenas simplificou o compartilhamento de dados, mas também se tornou um aspecto do desenvolvimento que realmente aprecio.

- **DevOps e Deploy:** Este projeto foi a aplicação frontend que pude fazer o deploy. A jornada foi rica em aprendizado, desde entender as complexidades do DevOps, configurar pipelines usando GitHub Actions (Jenkins foi considerado, mas parecia exagero para este projeto), até ter experiência prática com Docker e solucionar problemas de deploy.

## Melhorias Futuras
- **Integrações de Pagamento:** Para oferecer uma experiência de reserva contínua, integrações com plataformas de pagamento de terceiros como Stripe, PayPal e Google Payments estão planejadas. Isso proporcionará aos usuários uma variedade de opções de pagamento, melhorando a experiência geral do usuário.

- **Cadastros Sociais:** Para simplificar o processo de cadastro e melhorar a acessibilidade do usuário, a integração com plataformas sociais como Facebook, Google e Apple para criação e login de contas está planejada.

- **Confirmação de Email:** Para garantir a autenticidade dos usuários e melhorar a segurança, uma etapa de confirmação de email será adicionada ao processo de cadastro.

- **Gerenciamento de Perfil do Usuário:** Uma página de perfil está em desenvolvimento, permitindo que os usuários atualizem e gerenciem suas informações pessoais, garantindo que seus detalhes estejam sempre atualizados.

- **Gerenciamento de Reservas:** Está planejada uma página abrangente de gerenciamento de reservas, onde os usuários podem visualizar suas reservas anteriores, gerenciar as pendentes e até mesmo cancelar ou reagendar conforme necessário.

- **Listagem de Propriedades:** Para proprietários e gerentes de hotéis, será introduzido um recurso para listar e gerenciar suas propriedades. Isso permitirá que eles disponibilizem seus hotéis para reserva, definam preços e gerenciem a disponibilidade.

- **Chat de Suporte:** Para melhorar o suporte ao cliente, será introduzido um recurso de chat, permitindo que os usuários se comuniquem diretamente com o suporte do hotel para dúvidas, problemas ou qualquer assistência que possam precisar.
