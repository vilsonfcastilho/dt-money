# dt-money
Financial Control project develop in React to study

## Anotações de estudo

### Fluxo de renderização de um componente no Ract
* Por que que um componente renderiza?
- Hooks changed (mudou estado, contexto, reduce);
- Props chanded (mudou propriedade);
- Parent rendered (componente pai renderizou);

* Qual o fluxo de renderização?
1. O React recria o HTML da interface daeuele componente;
2. Compara a versão do HTML reciado com a versão anterior;
3. Se mudou alguma coisa, ele reescreve o HTML na tela;

* Usando o Memo o fluxo de renderização muda:
0.0. Hooks changed, Props changed (deep comparison);
0.1. Compara a versão anterior dos hooks e props;
0.2. Se mudou algo, ele vai permitir a nova renderização;
(Obs: se essa condição bater, ele volta para o fluxo de renderização normal, caso contrário para no fluxo do memo)
