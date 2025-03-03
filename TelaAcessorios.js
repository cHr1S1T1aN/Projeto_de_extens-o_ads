import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  Modal,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import estilos from './css/estilos';
import { useCarrinho } from './CarrinhoContext';

const produtos = [
  {
    id: 500,
    nome: 'Abafador para narguile',
    descricao: 'UTLIZE PARA ACENDER MAIS RAPIDO SEU NARGUILE',
    preco: 15.0,
    imagem: require('./img/abafador.png'),
  },
  {
    id: 501,
   nome: 'Pegador para carvão',
   descricao: 'PEGADOR/PINÇA MARCA EMPIRE MELHORES ACESSORIOS',
    preco: 25.0,
    imagem: require('./img/pegador.png'),
  },
  {
    id: 502,
    nome: 'kit forninho/carvão',
    descricao: 'KIT 50 ALUMINIOS, CAIXA DE 500G DE CARVÃO E FORNO',
    preco: 50.0,
    imagem: require('./img/acessorios.png'),
  },
];

export default function TelaAcessorios({ navigation }) {
  const { sacola, setSacola } = useCarrinho();
  const [modalVisible, setModalVisible] = useState(false);
  const [quantidade, setQuantidade] = useState(1);
  const [produtoSelecionado, setProdutoSelecionado] = useState({});
  
  const imagemLogo = require('./img/imagemLogo.png');
  const imagensCategorias = [

  require('./img/narguile.png'),
  require('./img/bebidas.png'),
  require('./img/acessorios.png'),
  require('./img/essencias.png'),
];

  const handleCategoriaNavigation = (categoria) => {
    navigation.navigate(categoria);
  };

  const adicionarProduto = (produto) => {
    setProdutoSelecionado(produto);
    setModalVisible(true);
  };

  const confirmarAdicao = () => {
    if (quantidade > 0) {
      const novoItem = {
        ...produtoSelecionado,
        quantidade,
      };
      setSacola([...sacola, novoItem]);
      alert(`${produtoSelecionado.nome} adicionado ao carrinho!`);
      setModalVisible(false);
      setQuantidade(1);
    } else {
      alert('Quantidade deve ser maior que zero!');
    }
  };

  const calcularTotal = () => produtoSelecionado.preco * quantidade;

  return (
    <View style={estilos.container}>
      <View style={estilos.barraSuperior}>
        <TextInput
          style={estilos.barraPesquisa}
          placeholder="Não encontrou o que procura?"
          placeholderTextColor="#333"
        />
        <Image style={estilos.logo} source={imagemLogo} />
      </View>

       <View style={estilos.categoriasContainer}>
        {[ 'Narguile', 'Bebidas', 'Acessórios', 'Essências'].map((categoria, index) => (
          <View key={index} style={estilos.categoriaContainer}>
            <TouchableOpacity onPress={() => handleCategoriaNavigation(categoria)} style={estilos.bolinha}>
              <Image source={imagensCategorias[index]} style={estilos.imagemBolinha} />
            </TouchableOpacity>
            <Text style={estilos.textoCategoria}>{categoria}</Text>
          </View>
        ))}
      </View>

      <ScrollView style={estilos.conteudo}>
  <View style={estilos.secaoProdutos}>
  <View style={estilos.textsecao}>
    <Text style={estilos.tituloSecao}>Acessórios</Text>
  </View>  
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={estilos.scrollHorizontal}>
      {produtos.map((produto) => (
        <View key={produto.id} style={estilos.itemProduto}>
          <Image style={estilos.imagemProduto} source={produto.imagem} />
          <View style={estilos.infoProduto}>
            <Text style={estilos.nomeProduto}>{produto.nome}</Text>
            <Text style={estilos.descricaoProduto}>{produto.descricao}</Text>
            <Text style={estilos.precoProduto}>R$ {produto.preco.toFixed(2)}</Text>
            <TouchableOpacity
              style={estilos.botaoAdicionar}
              onPress={() => adicionarProduto(produto)}
            >
              <Text style={estilos.textoBotaoAdicionar}>Adicionar</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  </View>
</ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={estilos.modalContainer}>
          <View style={estilos.modalContent}>
            <Text style={estilos.modalTitle}>{produtoSelecionado.nome}</Text>
            <Image style={estilos.imagemProduto} source={produtoSelecionado.imagem} />
            <Text style={estilos.precoProduto}>Preço: R$ {produtoSelecionado.preco}</Text>
            <Text style={estilos.precoProduto}>Total: R$ {calcularTotal().toFixed(2)}</Text>
            <View style={estilos.quantidadeContainer}>
              <TouchableOpacity onPress={() => setQuantidade(Math.max(1, quantidade - 1))}>
                <Text style={estilos.textoBotaoQuantidade}>-</Text>
              </TouchableOpacity>
              <Text>{quantidade}</Text>
              <TouchableOpacity onPress={() => setQuantidade(quantidade + 1)}>
                <Text style={estilos.textoBotaoQuantidade}>+</Text>
              </TouchableOpacity>
            </View>
            <View style={estilos.modalButtons}>
              <TouchableOpacity onPress={confirmarAdicao}>
                <Text style={estilos.botaomodaladicionar}>Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={estilos.botaomodalcancelar}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity style={estilos.botaoCarrinho} onPress={() => navigation.navigate('Carrinho')}>
        <FontAwesome name="shopping-cart" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}