import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useCarrinho } from './CarrinhoContext';

export default function TelaCarrinho() {
  const { sacola, setSacola } = useCarrinho(); 
  const [endereco, setEndereco] = useState({
    rua: '',
    numero: '',
    cep: '',
    complemento: '',
  });
  const [cupom, setCupom] = useState('');
  const [desconto, setDesconto] = useState(0); // Percentual de desconto aplicado

  const valorTotal = sacola.reduce((total, produto) => total + produto.preco * produto.quantidade, 0);
  const valorComDesconto = valorTotal * (1 - desconto / 100);

  const aplicarCupom = () => {
    if (cupom === 'DESCONTO10') {
      setDesconto(10); // Aplica 10% de desconto
      Alert.alert('Sucesso', 'Cupom aplicado! 10% de desconto concedido.');
    } else {
      Alert.alert('Erro', 'Cupom inválido!');
      setDesconto(0); // Remove desconto se o cupom for inválido
    }
  };

  const finalizarCompra = () => {
    if (!endereco.rua || !endereco.numero || !endereco.cep) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    Alert.alert('Compra Finalizada!', 'Obrigado por comprar com a nossa adega! 🎉');
  };

  const removerProduto = (id) => {
    const novaSacola = sacola.filter(item => item.id !== id);
    setSacola(novaSacola); 
  };

  const renderProduto = ({ item }) => (
    <View style={styles.produtoContainer}>
      <View style={styles.infoProduto}>
        <Text style={styles.nomeProduto}>{item.nome}</Text>
        <Text style={styles.precoProduto}>
          Preço Unitário: R$ {item.preco.toFixed(2)}
        </Text>
        <Text style={styles.precoProduto}>Quantidade: {item.quantidade}</Text>
        <Text style={styles.precoProduto}>
          Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.botaoRemover}
        onPress={() => removerProduto(item.id)} 
      >
        <Text style={styles.textoBotaoRemover}>Remover</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrinho</Text>
      <FlatList
        data={sacola}
        renderItem={renderProduto}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={<Text style={styles.textoVazio}>O carrinho está vazio.</Text>}
        contentContainerStyle={styles.listaProdutos}
      />
      <Text style={styles.valorTotal}>Valor Total: R$ {valorTotal.toFixed(2)}</Text>
      {desconto > 0 && (
        <Text style={styles.valorDesconto}>
          Valor com desconto: R$ {valorComDesconto.toFixed(2)}
        </Text>
      )}

      {/* Cupom de desconto */}
      <View style={styles.cupomContainer}>
        <Text style={styles.subtitulo}>Possui cupom de desconto?</Text>
        <View style={styles.cupomInputContainer}>
          <TextInput
            style={styles.inputCupom}
            placeholder="Digite o cupom"
            value={cupom}
            onChangeText={setCupom}
          />
          <TouchableOpacity style={styles.botaoAplicar} onPress={aplicarCupom}>
            <Text style={styles.textoBotao}>Aplicar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Endereço */}
      <View style={styles.enderecoContainer}>
        <Text style={styles.subtitulo}>Endereço de Entrega</Text>
        <TextInput
          style={styles.input}
          placeholder="Rua"
          value={endereco.rua}
          onChangeText={(texto) => setEndereco({ ...endereco, rua: texto })}
        />
        <TextInput
          style={styles.input}
          placeholder="Número"
          keyboardType="numeric"
          value={endereco.numero}
          onChangeText={(texto) => setEndereco({ ...endereco, numero: texto })}
        />
        <TextInput
          style={styles.input}
          placeholder="CEP"
          keyboardType="numeric"
          value={endereco.cep}
          onChangeText={(texto) => setEndereco({ ...endereco, cep: texto })}
        />
        <TextInput
          style={styles.input}
          placeholder="Complemento (opcional)"
          value={endereco.complemento}
          onChangeText={(texto) => setEndereco({ ...endereco, complemento: texto })}
        />
      </View>

      <TouchableOpacity style={styles.botaoFinalizar} onPress={finalizarCompra}>
        <Text style={styles.textoBotao}>Finalizar Compra</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004aad',
    textAlign: 'center',
    marginBottom: 16,
  },
  listaProdutos: {
    paddingBottom: 16,
  },
  textoVazio: {
    textAlign: 'center',
    color: '#555',
    marginTop: 16,
  },
  valorTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginVertical: 16,
  },
  enderecoContainer: {
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#004aad',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
  },
  botaoFinalizar: {
    backgroundColor: '#004aad',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  produtoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginBottom: 8,
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoProduto: {
    flex: 1,
    marginRight: 8,
  },
  botaoRemover: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  textoBotaoRemover: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  nomeProduto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  precoProduto: {
    fontSize: 14,
    color: '#555',
  },
  cupomContainer: {
    marginBottom: 16,
  },
  cupomInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputCupom: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 8,
  },
  botaoAplicar: {
    backgroundColor: '#004aad',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginLeft: 8,
  },
  valorDesconto: {
    fontSize: 16,
    color: '#008000',
    textAlign: 'center',
    marginBottom: 8,
  },
});
