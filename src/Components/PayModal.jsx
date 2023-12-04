
import React from 'react';
import ReactModal from 'react-modal'; 
import './PayModal.css'; 
import { useSaleContext } from '../context/SaleContext';
import axios from 'axios';

ReactModal.setAppElement('#root'); 
function PaymentMethodModal({ isOpen, onRequestClose,onSelectPaymentMethod , id  }) {

    const {paySale} = useSaleContext();

    
  return (
    <ReactModal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="payment-modal"
      overlayClassName="payment-modal-overlay"
    >
      <h2>Selecciona el método de pago</h2> 
      <div className="payment-options">
        <button onClick={() => { paySale(id)}}>QR</button>
        <button onClick={() => { paySale(id) }}>Tarjeta</button>
        <button onClick={() => {paySale(id) }}>Efectivo</button>
        
      </div>
    </ReactModal >
  );
}

export default PaymentMethodModal;