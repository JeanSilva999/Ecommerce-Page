# Ecommerce Page

### Requisitos Implementados

- Imagens do produto: Uma imagem principal que ocupe cerca de 35% da tela, e abaixo dela, miniaturas de outras imagens do mesmo produto. É necessário que ao clicar nas miniaturas, a imagem principal seja alterada.

- Título e preço do produto

- Seletores de variantes de Produto: Tamanho e Cor. Esses campos precisam ser gerados de maneira dinâmica, não gere campos sem que sigam um array ou objeto dinâmico.

- Campo de disponibilidade de Entrega: Crie um campo que formata e verifica do frete digitado, caso o CEP exista, exiba o endereço completo. Consulte o CEP utilizando o `https://viacep.com.br/`

- Todas as ações feitas pelo usuário, precisam ser salvas e mantidas caso a página seja atualizada, por 15 minutos.

### Observações

As ações realizadas pelo usuário, como alteração de cor, tamanho do produto e modificação do CEP, são gerenciadas pela URL por meio de parâmetros de query. Isso garante que, quando o usuário recarregar a página, os filtros selecionados se mantenham, além de possibilitar o compartilhamento de um produto com uma configuração específica, uma funcionalidade comum em E-commerces
