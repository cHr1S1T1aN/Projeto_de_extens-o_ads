import React, { createContext, useState, useContext } from 'react';

// Cria o contexto
const CarrinhoContext = createContext();

// Provedor do contexto
export const CarrinhoProvider = ({ children }) => {
  const [sacola, setSacola] = useState([]);

  return (
    <CarrinhoContext.Provider value={{ sacola, setSacola }}>
      {children}
    </CarrinhoContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useCarrinho = () => useContext(CarrinhoContext);
