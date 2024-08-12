# Guia de estilo para mensagens de commit do Github

## Formato
As mensagens de commit devem seguir o seguinte formato:

tipo: assunto (rodapé)

Onde:
- tipo: Uma palavra que descreve a natureza da mudança (ex: "feat", "fix", "docs", etc.).
- assunto: Uma breve descrição do que foi feito (ex: "Adicionar validação de e-mail no formulário de cadastro").
- rodapé: Informações adicionais, como número de issues relacionadas, referências a outras mudanças, etc.

## Tipos
Os tipos de mensagens de commit devem ser apenas um dentre as opções a seguir:
- feat: Uma nova funcionalidade adicionada
- fix: Alterações que afetam o sistema de compilação ou dependências externas, uma correção de bug
- refactor: Uma alteração de código que não corrige um bug nem adiciona um recurso, mas torna o código mais limpo, eficiente ou bem documentado
- docs: Documentação
- revert: Reverter um commit anterior
- test: Adiciona testes ausentes ou corrige testes existentes
- style: Alterações que não afetam o comportamento do código (espaço em branco, formatação, falta ponto e vírgula, etc.)
- perf: Uma alteração de código que melhora o desempenho da aplicação
- build: Alterações que afetam o sistema de compilação ou dependências externas
- chore: Alterações na configuração, build, ou outras alterações que não modificam os arquivos src ou de teste
- ci: Alterações em nossos arquivos e scripts de configuração de CI (exemplos de escopos: Travis, Circle, BrowserStack, SauceLabs)
- typo: Correção ortográfica atribuída a comentários ou nomes de variáveis
- func: Criação de uma função unitária no corpo do código
- in: Arquivos de entrada que servem para popular o sistema
- update: Atualização de arquivo ou documento contendo nova prescrição/conteúdo
- conflict: Resolução de conflito 

## Assunto
O assunto deve ser uma descrição clara e sucinta do que foi feito. Ele deve ser escrito em letras minúsculas e sem ponto final.

## Rodapé
O rodapé é opcional e pode ser usado para fornecer informações adicionais, como números de issues relacionadas, referências a outras mudanças, etc. Ele deve ser escrito em letras minúsculas.

## Exemplo
docs: adiciona documentação de commits semânticos (close #1) 