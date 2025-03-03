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
import estilos from './css/estilos';
import { useCarrinho } from './CarrinhoContext';

const essencias = [
  {
    id: 1000,
    nome: 'Essencia Ziggy menta',
    descricao:'ESSÊNCIA ZIGGY 50G',
    preco: 10.00,
    imagem: require('./img/ziggybuley.jpg'),
  },
  {
  id: 1001,
    nome: 'Essencia Mix',
    descricao:'ESSÊNCIA ZIGGY 50G',
    preco: 10.0,
    imagem: require('./img/ziggymorangoelaranj.jpg'),
  },
  {
    id: 1002,
    nome: 'Essencia Ziggy manga',
    descricao:'ESSÊNCIA ZIGGY 50G',
    preco: 10.0,
    imagem: require('./img/ziggymanga.jpg'),
  },
];

const produtos = [
  {
    id: 4,
    nome: 'Narguile Triton',
    descricao: 'NARGUILÉ COMPLETO, CARVÃO, E FORNINHO',
    preco: 180.0,
    imagem: require('./img/narguileazulepreto.jpg'),
  },
  {
    id: 5,
    nome: 'Whisky Chivas Regal',
    descricao: 'CHIVAS 1L ACOMPANHA 5 GELOS E 5 REDBULLS',
    preco: 250.0,
    imagem: require('./img/chivasregal.jpg'),
  },
  {
    id: 6,
    nome: 'Vodka Maracuja',
    descricao:'Vodka saborizada 1L SABOR MARACUJA',
    preco: 25.99,
    imagem: require('./img/kidlamaracuja.jpg'),
  },
];

export default function TelaInicial({ navigation }) {
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
      <ScrollView style={estilos.conteudo}>
        <View style={estilos.categoriasContainer}>
          {['Narguile', 'Bebidas', 'Acessórios', 'Essências'].map((categoria, index) => (
            <View key={index} style={estilos.categoriaContainer}>
              <TouchableOpacity onPress={() => handleCategoriaNavigation(categoria)} style={estilos.bolinha}>
                <Image source={imagensCategorias[index]} style={estilos.imagemBolinha} />
              </TouchableOpacity>
              <Text style={estilos.textoCategoria}>{categoria}</Text>
            </View>
          ))}
        </View>

        
        <View style={estilos.secaoProdutos}>
        <View style={estilos.textsecao}>
          <Text style={estilos.tituloSecao}>Recomendamos para você</Text>
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

        <View style={estilos.bannerContainer}>
          <Image
            style={estilos.bannerImagem}
            source={require('./img/bannerziggy.jpg')}
          />
        </View>

        <View style={estilos.secaoProdutos}>
        <View style={estilos.textsecao}>
          <Text style={estilos.tituloSecao}>Essências ZIGGS</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={estilos.scrollHorizontal}>
            {essencias.map((essencia) => (
              <View key={essencia.id} style={estilos.itemProduto}>
                <Image style={estilos.imagemProduto} source={essencia.imagem} />
                <View style={estilos.infoProduto}>
                  <Text style={estilos.nomeProduto}>{essencia.nome}</Text>
                  <Text style={estilos.descricaoProduto}>{essencia.descricao}</Text>
                  <Text style={estilos.precoProduto}>R$ {essencia.preco.toFixed(2)}</Text>
                  <TouchableOpacity
                    style={estilos.botaoAdicionar}
                    onPress={() => adicionarProduto(essencia)}
                  >
                    <Text style={{ color: 'white',fontWeight: 'bold' }}>Adicionar</Text>
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
            <TouchableOpacity
              style={estilos.botaoConfirmarAdicao}
              onPress={confirmarAdicao}
            >
              <Text style={estilos.botaomodaladicionar}>Adicionar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={estilos.botaomodalcancelar}>Fechar</Text>
            
            
            </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}